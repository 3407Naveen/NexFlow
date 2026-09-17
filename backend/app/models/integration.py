import enum
import uuid
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Enum, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin, OrgScopedMixin

class Provider(str, enum.Enum):
    gmail = "gmail"
    hubspot = "hubspot"
    slack = "slack"
    google_calendar = "google_calendar"
    stripe = "stripe"
    other = "other"

class IntegrationStatus(str, enum.Enum):
    connected = "connected"
    disconnected = "disconnected"
    error = "error"

class Integration(Base, UUIDPrimaryKeyMixin, TimestampMixin, OrgScopedMixin):
    __tablename__ = "integrations"

    name: Mapped[str] = mapped_column(String)
    provider: Mapped[Provider] = mapped_column(Enum(Provider))
    status: Mapped[IntegrationStatus] = mapped_column(Enum(IntegrationStatus), default=IntegrationStatus.disconnected)
    credentials_encrypted: Mapped[str] = mapped_column(Text)
    settings: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    connected_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
