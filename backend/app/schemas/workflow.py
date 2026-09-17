from datetime import datetime
from uuid import UUID
from typing import Any
from pydantic import BaseModel, Field
from app.schemas.common import AppBaseSchema

class WorkflowNodeSchema(AppBaseSchema):
    id: str
    type: str
    position: dict[str, float]
    data: dict[str, Any]

class WorkflowEdgeSchema(AppBaseSchema):
    id: str
    source: str
    target: str
    animated: bool = False
    label: str | None = None

class WorkflowDefinitionDict(AppBaseSchema):
    nodes: list[WorkflowNodeSchema] = Field(default_factory=list)
    edges: list[WorkflowEdgeSchema] = Field(default_factory=list)

class WorkflowDefinitionCreate(AppBaseSchema):
    name: str
    description: str | None = None
    trigger_type: str = "manual"
    definition: WorkflowDefinitionDict = Field(default_factory=WorkflowDefinitionDict)

class WorkflowDefinitionUpdate(AppBaseSchema):
    name: str | None = None
    description: str | None = None
    trigger_type: str | None = None
    definition: WorkflowDefinitionDict | None = None
    is_active: bool | None = None

class WorkflowDefinitionResponse(AppBaseSchema):
    id: UUID
    organization_id: UUID
    name: str
    description: str | None = None
    trigger_type: str
    definition: WorkflowDefinitionDict
    version: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

class WorkflowGenerateRequest(AppBaseSchema):
    prompt: str

class WorkflowGenerateResponse(AppBaseSchema):
    name: str
    description: str
    definition: WorkflowDefinitionDict
    suggested_agents: list[str]

class WorkflowRunCreate(AppBaseSchema):
    workflow_definition_id: UUID
    input_data: dict[str, Any] | None = Field(default_factory=dict)

class WorkflowRunResponse(AppBaseSchema):
    id: UUID
    workflow_definition_id: UUID
    status: str
    input_data: dict[str, Any]
    output_data: dict[str, Any] | None = None
    error_message: str | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
