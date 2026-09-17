import enum
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Enum, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base, UUIDPrimaryKeyMixin, OrgScopedMixin

class ActorType(str, enum.Enum):
    user = "user"
    agent = "agent"
    system = "system"

# Note: this table should be append-only
# UPDATE/DELETE should be revoked at DB level
class AuditLog(Base, UUIDPrimaryKeyMixin, OrgScopedMixin):
    __tablename__ = "audit_logs"

    actor_type: Mapped[ActorType] = mapped_column(Enum(ActorType))
    actor_id: Mapped[str] = mapped_column(String)
    action: Mapped[str] = mapped_column(String)
    resource_type: Mapped[str] = mapped_column(String)
    resource_id: Mapped[str] = mapped_column(String)
    details: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
