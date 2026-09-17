import time
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.clients = {}

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        
        if client_ip not in self.clients:
            self.clients[client_ip] = []
        
        # Clean up old requests
        self.clients[client_ip] = [req_time for req_time in self.clients[client_ip] if now - req_time < self.window_seconds]
        
        if len(self.clients[client_ip]) >= self.max_requests:
            return request.app.router.default_response_class(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"detail": "Too Many Requests"}
            )
            
        self.clients[client_ip].append(now)
        
        return await call_next(request)
