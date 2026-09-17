from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class AuditLogResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    actor_id: UUID | None = None
    actor_type: str
    action: str
    resource_type: str
    resource_id: UUID | None = None
    details: dict[str, Any]
    ip_address: str | None = None
    created_at: datetime

class AuditLogFilter(AppBaseSchema):
    actor_type: str | None = None
    action: str | None = None
    resource_type: str | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None
