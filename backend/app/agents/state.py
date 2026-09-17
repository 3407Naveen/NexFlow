import operator
from typing import Annotated, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

def merge_token_usage(left: dict, right: dict) -> dict:
    if not left: return right
    if not right: return left
    return {
        "prompt_tokens": left.get("prompt_tokens", 0) + right.get("prompt_tokens", 0),
        "completion_tokens": left.get("completion_tokens", 0) + right.get("completion_tokens", 0),
        "total_tokens": left.get("total_tokens", 0) + right.get("total_tokens", 0),
        "total_cost": left.get("total_cost", 0.0) + right.get("total_cost", 0.0),
    }

class OrchestratorState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    user_request: str
    parsed_intent: dict  # {goal, entities, constraints, implied_agents}
    plan: list[dict]  # list of task definitions
    current_task_index: int
    task_results: Annotated[list[dict], operator.add]
    verification_results: Annotated[list[dict], operator.add]
    approval_required: bool
    approval_response: dict | None
    workflow_run_id: str
    organization_id: str
    final_output: dict
    error: str | None
    usage: Annotated[dict, merge_token_usage]  # tracks tokens/cost
