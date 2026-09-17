from fastapi import APIRouter, Depends
from app.api.deps import get_current_user
from app.schemas.analytics import DashboardStats, TokenUsageByAgent, WorkflowRunStats

router = APIRouter()

@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    return DashboardStats(
        active_workflows=5,
        pending_approvals=2,
        tasks_today=12,
        tokens_used_today=15000,
        cost_today_usd=0.45
    )

@router.get("/tokens", response_model=list[TokenUsageByAgent])
async def get_token_usage(current_user: dict = Depends(get_current_user)):
    return [
        TokenUsageByAgent(
            agent_type="researcher",
            total_tokens=10000,
            total_cost_usd=0.30,
            call_count=50
        )
    ]

@router.get("/workflows", response_model=WorkflowRunStats)
async def get_workflow_stats(current_user: dict = Depends(get_current_user)):
    return WorkflowRunStats(
        total_runs=100,
        completed=95,
        failed=5,
        avg_duration_ms=4500.0,
        avg_tokens_per_run=150.0
    )
