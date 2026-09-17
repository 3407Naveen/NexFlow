import enum
import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, Integer, Float, Text, Enum, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin, OrgScopedMixin

class TriggerType(str, enum.Enum):
    manual = "manual"
    scheduled = "scheduled"
    webhook = "webhook"

class WorkflowStatus(str, enum.Enum):
    pending = "pending"
    running = "running"
    paused = "paused"
    completed = "completed"
    failed = "failed"
    cancelled = "cancelled"

class WorkflowDefinition(Base, UUIDPrimaryKeyMixin, TimestampMixin, OrgScopedMixin):
    __tablename__ = "workflow_definitions"

    name: Mapped[str] = mapped_column(String)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    trigger_type: Mapped[TriggerType] = mapped_column(Enum(TriggerType))
    definition: Mapped[dict] = mapped_column(JSONB)
    version: Mapped[int] = mapped_column(Integer, default=1)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))

class WorkflowRun(Base, UUIDPrimaryKeyMixin, TimestampMixin, OrgScopedMixin):
    __tablename__ = "workflow_runs"

    workflow_definition_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("workflow_definitions.id"), index=True)
    definition_version: Mapped[int] = mapped_column(Integer)
    status: Mapped[WorkflowStatus] = mapped_column(Enum(WorkflowStatus), index=True)
    input_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    output_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    total_tokens_used: Mapped[int] = mapped_column(Integer, default=0)
    total_cost_usd: Mapped[float] = mapped_column(Float, default=0.0)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id"), nullable=True)
