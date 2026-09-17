from typing import Any, Dict, List, Optional
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.graph import StateGraph, START, END
from app.agents.state import OrchestratorState
from app.agents.tools.sanitizer import sanitize_tool_output
from app.agents.token_tracker import merge_token_usage

class BaseAgent:
    def __init__(self, agent_type: str, system_prompt: str, tools: List[Any], model: Any):
        self.agent_type = agent_type
        self.system_prompt = system_prompt
        self.tools = tools
        self.model = model
        self.llm_with_tools = self.model.bind_tools(self.tools) if self.tools else self.model
        
    def _reasoning(self, state: OrchestratorState):
        messages = [SystemMessage(content=self.system_prompt)] + state.get("messages", [])
        response = self.llm_with_tools.invoke(messages)
        
        usage = state.get("usage", {})
        if hasattr(response, "usage_metadata") and response.usage_metadata:
            meta = response.usage_metadata
            new_usage = {
                "prompt_tokens": meta.get("input_tokens", 0),
                "completion_tokens": meta.get("output_tokens", 0),
                "total_tokens": meta.get("total_tokens", 0),
            }
            usage = merge_token_usage(usage, new_usage)
            
        return {"messages": [response], "usage": usage}
        
    def _tool_execution(self, state: OrchestratorState):
        messages = state.get("messages", [])
        last_message = messages[-1]
        
        tool_results = []
        if hasattr(last_message, "tool_calls"):
            for tool_call in last_message.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                tool_instance = next((t for t in self.tools if t.name == tool_name), None)
                if tool_instance:
                    # Execute tool
                    raw_result = tool_instance.invoke(tool_args)
                    sanitized_result = sanitize_tool_output(str(raw_result))
                    
                    from langchain_core.messages import ToolMessage
                    tool_results.append(ToolMessage(
                        content=sanitized_result,
                        tool_call_id=tool_call["id"],
                        name=tool_name
                    ))
        
        return {"messages": tool_results}
        
    def _should_continue(self, state: OrchestratorState) -> str:
        messages = state.get("messages", [])
        last_message = messages[-1]
        if hasattr(last_message, "tool_calls") and last_message.tool_calls:
            return "tool_execution"
        return END

    def build_graph(self):
        workflow = StateGraph(OrchestratorState)
        workflow.add_node("reasoning", self._reasoning)
        workflow.add_node("tool_execution", self._tool_execution)
        
        workflow.add_edge(START, "reasoning")
        workflow.add_conditional_edges("reasoning", self._should_continue)
        workflow.add_edge("tool_execution", "reasoning")
        
        return workflow.compile()
