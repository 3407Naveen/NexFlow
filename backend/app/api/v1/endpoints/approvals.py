from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
from datetime import datetime
from app.api.deps import get_current_user
from app.schemas.common import PaginatedResponse
from app.schemas.approval import ApprovalResponse, ApprovalDecision

router = APIRouter()

@router.get("", response_model=PaginatedResponse[ApprovalResponse])
async def list_approvals(status: str | None = None, current_user: dict = Depends(get_current_user)):
    return PaginatedResponse(
        items=[],
        total=0,
        page=1,
        size=10,
        pages=1
    )

@router.get("/count")
async def count_approvals(current_user: dict = Depends(get_current_user)):
    return {"count": 0}

@router.get("/{id}", response_model=ApprovalResponse)
async def get_approval(id: UUID, current_user: dict = Depends(get_current_user)):
    return ApprovalResponse(
        id=id,
        organization_id=current_user["organization_id"],
        workflow_run_id=uuid4(),
        task_id=uuid4(),
        requester_id=uuid4(),
        status="pending",
        context_data={},
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.post("/{id}/decide", response_model=ApprovalResponse)
async def decide_approval(id: UUID, decision: ApprovalDecision, current_user: dict = Depends(get_current_user)):
    return ApprovalResponse(
        id=id,
        organization_id=current_user["organization_id"],
        workflow_run_id=uuid4(),
        task_id=uuid4(),
        requester_id=uuid4(),
        approver_id=current_user["id"],
        status="approved" if decision.action == "approve" else "rejected",
        context_data={},
        notes=decision.notes,
        decided_at=datetime.now(),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
