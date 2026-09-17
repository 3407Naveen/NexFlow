from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
from datetime import datetime
from app.api.deps import get_current_user
from app.schemas.common import PaginatedResponse
from app.schemas.task import TaskListResponse, TaskResponse

router = APIRouter()

@router.get("", response_model=PaginatedResponse[TaskListResponse])
async def list_tasks(status: str | None = None, agent_type: str | None = None, workflow_run_id: UUID | None = None, current_user: dict = Depends(get_current_user)):
    return PaginatedResponse(
        items=[],
        total=0,
        page=1,
        size=10,
        pages=1
    )

@router.get("/{id}", response_model=TaskResponse)
async def get_task(id: UUID, current_user: dict = Depends(get_current_user)):
    return TaskResponse(
        id=id,
        name="Demo Task",
        agent_type="researcher",
        status="completed",
        execution_steps=[],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
