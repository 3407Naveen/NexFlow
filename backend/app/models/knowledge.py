import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Text, ForeignKey, Enum, DateTime
from sqlalchemy.dialects.postgresql import JSONB, UUID
from pgvector.sqlalchemy import Vector
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin, OrgScopedMixin

class SourceType(str, enum.Enum):
    file = "file"
    url = "url"
    text = "text"

class KnowledgeStatus(str, enum.Enum):
    processing = "processing"
    ready = "ready"
    failed = "failed"

class KnowledgeBase(Base, UUIDPrimaryKeyMixin, TimestampMixin, OrgScopedMixin):
    __tablename__ = "knowledge_bases"

    name: Mapped[str] = mapped_column(String)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    source_type: Mapped[SourceType] = mapped_column(Enum(SourceType))
    source_url: Mapped[str | None] = mapped_column(String, nullable=True)
    file_key: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[KnowledgeStatus] = mapped_column(Enum(KnowledgeStatus), default=KnowledgeStatus.processing)
    chunk_count: Mapped[int] = mapped_column(Integer, default=0)

class KnowledgeChunk(Base, UUIDPrimaryKeyMixin, OrgScopedMixin):
    __tablename__ = "knowledge_chunks"

    knowledge_base_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("knowledge_bases.id"), index=True)
    content: Mapped[str] = mapped_column(Text)
    metadata_: Mapped[dict | None] = mapped_column("metadata", JSONB, nullable=True)
    embedding = mapped_column(Vector(1536))
    chunk_index: Mapped[int] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
