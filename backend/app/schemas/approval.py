from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class ApprovalResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    workflow_run_id: UUID
    task_id: UUID
    requester_id: UUID
    approver_id: UUID | None = None
    status: str
    context_data: dict[str, Any]
    notes: str | None = None
    expires_at: datetime | None = None
    decided_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

class ApprovalDecision(AppBaseSchema):
    action: str = Field(pattern="^(approve|reject)$")
    notes: str | None = None
