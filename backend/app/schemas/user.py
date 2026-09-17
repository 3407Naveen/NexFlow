from datetime import datetime
from uuid import UUID
from pydantic import EmailStr
from app.schemas.common import AppBaseSchema

class UserCreate(AppBaseSchema):
    email: EmailStr
    full_name: str
    clerk_id: str
    role: str = "member"
    organization_id: UUID

class UserUpdate(AppBaseSchema):
    full_name: str | None = None
    avatar_url: str | None = None
    role: str | None = None

class UserResponse(AppBaseSchema):
    id: UUID
    email: EmailStr
    full_name: str
    avatar_url: str | None = None
    role: str
    organization_id: UUID
    is_active: bool
    created_at: datetime
