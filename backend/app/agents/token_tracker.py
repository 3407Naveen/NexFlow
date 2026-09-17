from typing import Optional
from sqlalchemy.orm import Session
from app.models.llm_call import LLMCall
import uuid

PRICING = {
    "gpt-4o": {"input": 0.005, "output": 0.015},
    "gpt-4o-mini": {"input": 0.00015, "output": 0.0006},
}

def calculate_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    pricing = PRICING.get(model, PRICING["gpt-4o-mini"])
    input_cost = (input_tokens / 1000) * pricing["input"]
    output_cost = (output_tokens / 1000) * pricing["output"]
    return input_cost + output_cost

def merge_token_usage(left: dict, right: dict) -> dict:
    if not left: return right
    if not right: return left
    return {
        "prompt_tokens": left.get("prompt_tokens", 0) + right.get("prompt_tokens", 0),
        "completion_tokens": left.get("completion_tokens", 0) + right.get("completion_tokens", 0),
        "total_tokens": left.get("total_tokens", 0) + right.get("total_tokens", 0),
        "total_cost": left.get("total_cost", 0.0) + right.get("total_cost", 0.0),
    }

def log_llm_call(
    db_session: Session,
    org_id: str,
    run_id: str,
    task_id: Optional[str],
    agent_type: str,
    model: str,
    tokens: int,
    cost: float,
    latency: float,
    purpose: str
) -> LLMCall:
    call = LLMCall(
        id=str(uuid.uuid4()),
        organization_id=org_id,
        workflow_run_id=run_id,
        task_id=task_id,
        agent_type=agent_type,
        model=model,
        tokens=tokens,
        cost=cost,
        latency_ms=int(latency * 1000),
        purpose=purpose
    )
    db_session.add(call)
    db_session.commit()
    db_session.refresh(call)
    return call
