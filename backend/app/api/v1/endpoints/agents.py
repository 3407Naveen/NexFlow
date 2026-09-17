from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
from datetime import datetime
from app.api.deps import get_current_user
from app.schemas.agent import AgentConfigResponse, AgentConfigUpdate, AgentStatusResponse

router = APIRouter()

@router.get("", response_model=list[AgentStatusResponse])
async def list_agents(current_user: dict = Depends(get_current_user)):
    return [
        AgentStatusResponse(
            agent_type="researcher",
            display_name="Researcher Agent",
            is_active=True,
            active_tasks=0,
            completed_today=5,
            tokens_used_today=1200
        )
    ]

@router.get("/{agent_type}", response_model=AgentConfigResponse)
async def get_agent(agent_type: str, current_user: dict = Depends(get_current_user)):
    return AgentConfigResponse(
        id=uuid4(),
        organization_id=current_user["organization_id"],
        agent_type=agent_type,
        display_name=f"{agent_type.capitalize()} Agent",
        is_active=True,
        capabilities=[],
        allowed_tools=[],
        settings={},
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.put("/{agent_type}", response_model=AgentConfigResponse)
async def update_agent(agent_type: str, data: AgentConfigUpdate, current_user: dict = Depends(get_current_user)):
    return AgentConfigResponse(
        id=uuid4(),
        organization_id=current_user["organization_id"],
        agent_type=agent_type,
        display_name=data.display_name or f"{agent_type.capitalize()} Agent",
        is_active=data.is_active if data.is_active is not None else True,
        capabilities=data.capabilities or [],
        allowed_tools=data.allowed_tools or [],
        settings=data.settings or {},
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
