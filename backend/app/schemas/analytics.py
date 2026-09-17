from pydantic import BaseModel

class DashboardStats(BaseModel):
    active_workflows: int
    pending_approvals: int
    tasks_today: int
    tokens_used_today: int
    cost_today_usd: float

class TokenUsageByAgent(BaseModel):
    agent_type: str
    total_tokens: int
    total_cost_usd: float
    call_count: int

class WorkflowRunStats(BaseModel):
    total_runs: int
    completed: int
    failed: int
    avg_duration_ms: float
    avg_tokens_per_run: float
