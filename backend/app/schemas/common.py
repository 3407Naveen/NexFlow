from typing import Any, Generic, TypeVar
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")

class AppBaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        str_strip_whitespace=True,
        use_enum_values=True,
        extra="forbid"
    )

class PaginatedResponse(AppBaseSchema, Generic[T]):
    items: list[T]
    total: int
    page: int
    size: int
    pages: int

class APIResponse(AppBaseSchema, Generic[T]):
    success: bool = True
    data: T | None = None
    message: str | None = None

class IDResponse(AppBaseSchema):
    id: UUID
