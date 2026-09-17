from datetime import datetime
from uuid import UUID
from pydantic import Field
from app.schemas.common import AppBaseSchema

class OrganizationCreate(AppBaseSchema):
    name: str
    slug: str

class OrganizationUpdate(AppBaseSchema):
    name: str | None = None
    logo_url: str | None = None
    monthly_token_budget: int | None = None
    settings: dict | None = None

class OrganizationResponse(AppBaseSchema):
    id: UUID
    name: str
    slug: str
    logo_url: str | None = None
    monthly_token_budget: int | None = None
    monthly_tokens_used: int = 0
    created_at: datetime
