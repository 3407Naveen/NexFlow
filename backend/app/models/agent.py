from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin, OrgScopedMixin

class AgentConfig(Base, UUIDPrimaryKeyMixin, TimestampMixin, OrgScopedMixin):
    __tablename__ = "agent_configs"

    agent_type: Mapped[str] = mapped_column(String)
    display_name: Mapped[str] = mapped_column(String)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    system_prompt: Mapped[str | None] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    capabilities: Mapped[list | None] = mapped_column(JSONB, nullable=True)
    allowed_tools: Mapped[list | None] = mapped_column(JSONB, nullable=True)
    settings: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
