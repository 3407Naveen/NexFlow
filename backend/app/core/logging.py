import structlog
import logging
from contextvars import ContextVar
import sys

request_id_var: ContextVar[str | None] = ContextVar("request_id", default=None)
workflow_run_id_var: ContextVar[str | None] = ContextVar("workflow_run_id", default=None)
task_id_var: ContextVar[str | None] = ContextVar("task_id", default=None)

def context_processor(logger, log_method, event_dict):
    req_id = request_id_var.get()
    wf_id = workflow_run_id_var.get()
    t_id = task_id_var.get()
    
    if req_id:
        event_dict["request_id"] = req_id
    if wf_id:
        event_dict["workflow_run_id"] = wf_id
    if t_id:
        event_dict["task_id"] = t_id
        
    return event_dict

structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        context_processor,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()
