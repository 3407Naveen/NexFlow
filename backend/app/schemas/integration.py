from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class IntegrationCreate(AppBaseSchema):
    name: str
    provider: str
    credentials: dict[str, Any]
    settings: dict[str, Any] | None = None

class IntegrationUpdate(AppBaseSchema):
    name: str | None = None
    settings: dict[str, Any] | None = None
    status: str | None = None

class IntegrationResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    name: str
    provider: str
    settings: dict[str, Any] | None = None
    status: str
    created_at: datetime
    updated_at: datetime
