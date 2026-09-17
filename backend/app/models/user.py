import enum
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

class RoleEnum(str, enum.Enum):
    owner = "owner"
    admin = "admin"
    member = "member"

class User(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String)
    avatar_url: Mapped[str | None] = mapped_column(String, nullable=True)
    clerk_id: Mapped[str] = mapped_column(String, unique=True, index=True)
    role: Mapped[RoleEnum] = mapped_column(Enum(RoleEnum))
    organization_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), index=True, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
