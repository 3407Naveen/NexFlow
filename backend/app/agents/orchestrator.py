from typing import Any, Dict
from langgraph.graph import StateGraph, START, END
from pydantic import BaseModel, Field
from app.agents.state import OrchestratorState
from app.agents.verification_agent import VerificationAgent
from app.agents.business.sales_agent import SalesAgent
from app.agents.business.finance_agent import FinanceAgent
from app.agents.business.hr_agent import HRAgent
from app.agents.business.support_agent import SupportAgent
from app.agents.business.marketing_agent import MarketingAgent

class IntentModel(BaseModel):
    goal: str
    entities: dict
    constraints: list[str]
    implied_agents: list[str]

def create_orchestrator(model: Any):
    def intent_parser(state: OrchestratorState):
        request = state.get("user_request", "")
        # Dummy structured output for intent
        structured_llm = model.with_structured_output(IntentModel)
        result = structured_llm.invoke(f"Extract intent from: {request}")
        return {"parsed_intent": result.dict()}

    def planner(state: OrchestratorState):
        intent = state.get("parsed_intent", {})
        agents = intent.get("implied_agents", [])
        if not agents:
            agents = ["sales"] # Default
            
        plan = []
        for i, agent in enumerate(agents):
            plan.append({
                "id": f"task_{i}",
                "agent_type": agent,
                "description": f"Execute task for {agent}",
                "status": "pending",
                "risk_level": "medium"
            })
        return {"plan": plan, "current_task_index": 0}

    def agent_executor(state: OrchestratorState):
        plan = state.get("plan", [])
        index = state.get("current_task_index", 0)
        
        if index >= len(plan):
            return {}
            
        task = plan[index]
        agent_type = task["agent_type"]
        
        # Instantiate agent based on type
        agent = None
        if agent_type == "sales": agent = SalesAgent(model)
        elif agent_type == "finance": agent = FinanceAgent(model)
        elif agent_type == "hr": agent = HRAgent(model)
        elif agent_type == "support": agent = SupportAgent(model)
        elif agent_type == "marketing": agent = MarketingAgent(model)
        else: agent = SalesAgent(model) # fallback
        
        graph = agent.build_graph()
        # Mock execution for simplicity since tools are deterministic demo tools
        result = {"output": f"Completed {task['description']} via {agent_type}"}
        
        return {"task_results": [result]}

    def verifier(state: OrchestratorState):
        plan = state.get("plan", [])
        index = state.get("current_task_index", 0)
        results = state.get("task_results", [])
        
        if not plan or index >= len(plan) or not results:
            return {}
            
        task = plan[index]
        result = results[-1]
        
        v_agent = VerificationAgent(model)
        v_result = v_agent.verify(task, result)
        
        return {"verification_results": [v_result]}

    def approval_gate(state: OrchestratorState):
        # We simulate approval check
        results = state.get("verification_results", [])
        if results:
            last_v = results[-1]
            if last_v.get("verdict") == "NEEDS_REVIEW":
                return {"approval_required": True}
        
        return {"approval_required": False, "current_task_index": state.get("current_task_index", 0) + 1}

    def reporter(state: OrchestratorState):
        results = state.get("task_results", [])
        return {"final_output": {"status": "success", "tasks_completed": len(results), "details": results}}

    def route_after_verifier(state: OrchestratorState):
        v_results = state.get("verification_results", [])
        if not v_results:
            return "next_task"
            
        last_v = v_results[-1]
        if last_v.get("verdict") == "FAIL":
            return "handle_failure"
        elif last_v.get("verdict") == "NEEDS_REVIEW":
            return "approval_gate"
        return "approval_gate" # Move to approval gate to increment index if PASS

    def route_after_approval(state: OrchestratorState):
        if state.get("approval_required") and not state.get("approval_response"):
            # Normally interrupt() here in LangGraph v0.1+, but for demo we just move to reporter
            return "reporter"
            
        # Check if more tasks
        plan = state.get("plan", [])
        index = state.get("current_task_index", 0)
        if index < len(plan):
            return "agent_executor"
        return "reporter"

    def handle_failure(state: OrchestratorState):
        return {"error": "Task failed verification", "approval_required": True}

    workflow = StateGraph(OrchestratorState)
    workflow.add_node("intent_parser", intent_parser)
    workflow.add_node("planner", planner)
    workflow.add_node("agent_executor", agent_executor)
    workflow.add_node("verifier", verifier)
    workflow.add_node("approval_gate", approval_gate)
    workflow.add_node("reporter", reporter)
    workflow.add_node("handle_failure", handle_failure)

    workflow.add_edge(START, "intent_parser")
    workflow.add_edge("intent_parser", "planner")
    workflow.add_edge("planner", "agent_executor")
    workflow.add_edge("agent_executor", "verifier")
    
    workflow.add_conditional_edges("verifier", route_after_verifier)
    workflow.add_conditional_edges("approval_gate", route_after_approval)
    
    workflow.add_edge("handle_failure", "approval_gate")
    workflow.add_edge("reporter", END)

    return workflow.compile()
