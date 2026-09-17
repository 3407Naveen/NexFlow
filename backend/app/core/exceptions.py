from fastapi import Request
from fastapi.responses import JSONResponse

class NexFlowException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class NotFoundError(NexFlowException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, status_code=404)

class PermissionDeniedError(NexFlowException):
    def __init__(self, message: str = "Permission denied"):
        super().__init__(message, status_code=403)

class ValidationError(NexFlowException):
    def __init__(self, message: str = "Validation error"):
        super().__init__(message, status_code=422)

class TokenBudgetExceededError(NexFlowException):
    def __init__(self, message: str = "Token budget exceeded"):
        super().__init__(message, status_code=429)

class WorkflowExecutionError(NexFlowException):
    def __init__(self, message: str = "Workflow execution failed"):
        super().__init__(message, status_code=500)

async def nexflow_exception_handler(request: Request, exc: NexFlowException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.__class__.__name__, "message": exc.message}
    )
