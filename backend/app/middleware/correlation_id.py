import time
from uuid import uuid4
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging

logger = logging.getLogger(__name__)

class CorrelationIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        correlation_id = request.headers.get("X-Request-ID", str(uuid4()))
        request.state.correlation_id = correlation_id
        start_time = time.time()
        
        response = await call_next(request)
        
        duration = time.time() - start_time
        logger.info(
            f"Method={request.method} Path={request.url.path} "
            f"Status={response.status_code} Duration={duration:.3f}s CorrelationId={correlation_id}"
        )
        
        response.headers["X-Request-ID"] = correlation_id
        return response
