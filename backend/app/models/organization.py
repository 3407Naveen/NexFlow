from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

class Organization(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "organizations"

    name: Mapped[str] = mapped_column(String)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True)
    logo_url: Mapped[str | None] = mapped_column(String, nullable=True)
    monthly_token_budget: Mapped[int] = mapped_column(Integer, default=1_000_000)
    monthly_tokens_used: Mapped[int] = mapped_column(Integer, default=0)
    settings: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
