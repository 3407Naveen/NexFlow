from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
from datetime import datetime
from app.api.deps import get_current_user
from app.schemas.common import PaginatedResponse
from app.schemas.workflow import (
    WorkflowDefinitionResponse, WorkflowDefinitionCreate,
    WorkflowDefinitionUpdate, WorkflowGenerateRequest,
    WorkflowGenerateResponse, WorkflowRunCreate, WorkflowRunResponse
)

router = APIRouter()

@router.get("", response_model=PaginatedResponse[WorkflowDefinitionResponse])
async def list_workflows(is_active: bool = True, current_user: dict = Depends(get_current_user)):
    return PaginatedResponse(
        items=[],
        total=0,
        page=1,
        size=10,
        pages=1
    )

@router.post("", response_model=WorkflowDefinitionResponse)
async def create_workflow(data: WorkflowDefinitionCreate, current_user: dict = Depends(get_current_user)):
    return WorkflowDefinitionResponse(
        id=uuid4(),
        organization_id=current_user["organization_id"],
        name=data.name,
        description=data.description,
        trigger_type=data.trigger_type,
        definition=data.definition,
        version=1,
        is_active=True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.get("/{id}", response_model=WorkflowDefinitionResponse)
async def get_workflow(id: UUID, current_user: dict = Depends(get_current_user)):
    return WorkflowDefinitionResponse(
        id=id,
        organization_id=current_user["organization_id"],
        name="Demo Workflow",
        trigger_type="manual",
        definition={"nodes": [], "edges": []},
        version=1,
        is_active=True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.put("/{id}", response_model=WorkflowDefinitionResponse)
async def update_workflow(id: UUID, data: WorkflowDefinitionUpdate, current_user: dict = Depends(get_current_user)):
    return WorkflowDefinitionResponse(
        id=id,
        organization_id=current_user["organization_id"],
        name=data.name or "Demo Workflow",
        description=data.description,
        trigger_type=data.trigger_type or "manual",
        definition=data.definition or {"nodes": [], "edges": []},
        version=2,
        is_active=data.is_active if data.is_active is not None else True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.delete("/{id}")
async def delete_workflow(id: UUID, current_user: dict = Depends(get_current_user)):
    return {"message": "Workflow deleted"}

@router.post("/generate", response_model=WorkflowGenerateResponse)
async def generate_workflow(data: WorkflowGenerateRequest, current_user: dict = Depends(get_current_user)):
    """Generate a workflow from a natural language prompt. Returns demo data in DEMO_MODE."""
    prompt_lower = data.prompt.lower()

    if any(kw in prompt_lower for kw in ["lead", "crm", "sales", "follow", "email", "contact"]):
        name = "Lead Re-engagement Follow-up"
        description = "Scans CRM for inactive leads, drafts personalized emails, verifies tone, and routes for manager approval."
        suggested_agents = ["sales", "marketing", "verification"]
        nodes = [
            {"id": "n1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Manual Trigger", "triggerType": "manual"}},
            {"id": "n2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Find Inactive Leads (30d+)", "agentType": "sales", "status": "idle"}},
            {"id": "n3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Draft Re-engagement Emails", "agentType": "marketing", "status": "idle"}},
            {"id": "n4", "type": "agent", "position": {"x": 250, "y": 400}, "data": {"label": "Verify Email Content", "agentType": "verification", "status": "idle"}},
            {"id": "n5", "type": "approval", "position": {"x": 250, "y": 520}, "data": {"label": "Manager Approval", "riskLevel": "medium"}},
            {"id": "n6", "type": "agent", "position": {"x": 250, "y": 640}, "data": {"label": "Send Approved Emails", "agentType": "sales", "status": "idle"}},
            {"id": "n7", "type": "end", "position": {"x": 250, "y": 760}, "data": {"label": "Log Results & Complete"}},
        ]
        edges = [{"id": f"e{i}", "source": f"n{i}", "target": f"n{i+1}", "animated": i == 1} for i in range(1, 7)]
    elif any(kw in prompt_lower for kw in ["invoice", "payment", "finance", "vendor", "expense", "bill"]):
        name = "Vendor Invoice Processing"
        description = "Ingests invoices, checks PO matching, audits line items, gates payment on CFO approval."
        suggested_agents = ["finance", "verification"]
        nodes = [
            {"id": "n1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Webhook: Inbound Invoice", "triggerType": "webhook"}},
            {"id": "n2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Extract & Match PO Data", "agentType": "finance", "status": "idle"}},
            {"id": "n3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Audit Line Items", "agentType": "verification", "status": "idle"}},
            {"id": "n4", "type": "approval", "position": {"x": 250, "y": 400}, "data": {"label": "CFO Payment Approval", "riskLevel": "high"}},
            {"id": "n5", "type": "agent", "position": {"x": 250, "y": 520}, "data": {"label": "Execute Disbursement", "agentType": "finance", "status": "idle"}},
            {"id": "n6", "type": "end", "position": {"x": 250, "y": 640}, "data": {"label": "Audit Trail Recorded"}},
        ]
        edges = [{"id": f"e{i}", "source": f"n{i}", "target": f"n{i+1}", "animated": i == 1} for i in range(1, 6)]
    else:
        name = "Employee Onboarding"
        description = "Coordinates new hire setup: profile creation, scheduling, handbook retrieval, IT provisioning sign-off."
        suggested_agents = ["hr", "support", "verification"]
        nodes = [
            {"id": "n1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Manual: Start Onboarding", "triggerType": "manual"}},
            {"id": "n2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Create Employee Profile", "agentType": "hr", "status": "idle"}},
            {"id": "n3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Schedule Orientation & 1:1s", "agentType": "hr", "status": "idle"}},
            {"id": "n4", "type": "agent", "position": {"x": 250, "y": 400}, "data": {"label": "Fetch Department Handbook", "agentType": "support", "status": "idle"}},
            {"id": "n5", "type": "agent", "position": {"x": 250, "y": 520}, "data": {"label": "Verify Provisioning Checklist", "agentType": "verification", "status": "idle"}},
            {"id": "n6", "type": "approval", "position": {"x": 250, "y": 640}, "data": {"label": "HR Director Sign-off", "riskLevel": "low"}},
            {"id": "n7", "type": "end", "position": {"x": 250, "y": 760}, "data": {"label": "Employee Ready on Day 1"}},
        ]
        edges = [{"id": f"e{i}", "source": f"n{i}", "target": f"n{i+1}", "animated": i == 1} for i in range(1, 7)]

    return WorkflowGenerateResponse(
        name=name,
        description=description,
        definition={"nodes": nodes, "edges": edges},
        suggested_agents=suggested_agents,
    )

@router.post("/{id}/run", response_model=WorkflowRunResponse)
async def run_workflow(id: UUID, data: WorkflowRunCreate, current_user: dict = Depends(get_current_user)):
    return WorkflowRunResponse(
        id=uuid4(),
        workflow_definition_id=id,
        status="pending",
        input_data=data.input_data or {},
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.get("/{id}/runs", response_model=PaginatedResponse[WorkflowRunResponse])
async def list_runs(id: UUID, current_user: dict = Depends(get_current_user)):
    return PaginatedResponse(
        items=[],
        total=0,
        page=1,
        size=10,
        pages=1
    )

@router.get("/runs/{run_id}", response_model=WorkflowRunResponse)
async def get_run(run_id: UUID, current_user: dict = Depends(get_current_user)):
    return WorkflowRunResponse(
        id=run_id,
        workflow_definition_id=uuid4(),
        status="completed",
        input_data={},
        output_data={},
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.get("/runs/{run_id}/stream")
async def stream_run(run_id: UUID, current_user: dict = Depends(get_current_user)):
    # Handled by sse endpoint actually
    pass
