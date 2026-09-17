from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class KnowledgeBaseCreate(AppBaseSchema):
    name: str
    description: str | None = None
    source_type: str

class KnowledgeBaseResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    name: str
    description: str | None = None
    source_type: str
    status: str
    created_at: datetime
    updated_at: datetime

class KnowledgeSearchRequest(AppBaseSchema):
    query: str
    top_k: int = 5

class KnowledgeSearchResult(AppBaseSchema):
    chunk_id: UUID
    content: str
    similarity_score: float
    source_name: str
    metadata: dict[str, Any]
