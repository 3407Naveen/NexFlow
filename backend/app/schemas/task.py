from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class TaskResponse(AppBaseSchema):
    id: UUID
    workflow_run_id: UUID | None = None
    name: str
    agent_type: str
    status: str
    input_data: dict[str, Any] | None = None
    output_data: dict[str, Any] | None = None
    error_message: str | None = None
    tokens_used: int = 0
    execution_steps: list[dict[str, Any]] = Field(default_factory=list)
    started_at: datetime | None = None
    completed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

class TaskListResponse(AppBaseSchema):
    id: UUID
    name: str
    agent_type: str
    status: str
    tokens_used: int = 0
    started_at: datetime | None = None
    completed_at: datetime | None = None
