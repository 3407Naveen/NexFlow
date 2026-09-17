from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import Field
from app.schemas.common import AppBaseSchema

class AgentConfigCreate(AppBaseSchema):
    agent_type: str
    display_name: str
    description: str | None = None
    system_prompt: str | None = None
    capabilities: list[str] = Field(default_factory=list)
    allowed_tools: list[str] = Field(default_factory=list)
    settings: dict[str, Any] = Field(default_factory=dict)

class AgentConfigUpdate(AppBaseSchema):
    display_name: str | None = None
    description: str | None = None
    system_prompt: str | None = None
    is_active: bool | None = None
    capabilities: list[str] | None = None
    allowed_tools: list[str] | None = None
    settings: dict[str, Any] | None = None

class AgentConfigResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    agent_type: str
    display_name: str
    description: str | None = None
    system_prompt: str | None = None
    is_active: bool
    capabilities: list[str]
    allowed_tools: list[str]
    settings: dict[str, Any]
    created_at: datetime
    updated_at: datetime

class AgentStatusResponse(AppBaseSchema):
    agent_type: str
    display_name: str
    is_active: bool
    active_tasks: int
    completed_today: int
    tokens_used_today: int
