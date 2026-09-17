from typing import Dict, Any, List, Optional
from langchain_core.tools import BaseTool
import jsonschema

class ToolRegistry:
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}
        self._agent_tools: Dict[str, List[str]] = {}

    def register(self, tool: BaseTool, agent_types: List[str]):
        self._tools[tool.name] = tool
        for agent_type in agent_types:
            if agent_type not in self._agent_tools:
                self._agent_tools[agent_type] = []
            self._agent_tools[agent_type].append(tool.name)

    def get_tool(self, name: str) -> Optional[BaseTool]:
        return self._tools.get(name)

    def get_tools_for_agent(self, agent_type: str) -> List[BaseTool]:
        tool_names = self._agent_tools.get(agent_type, [])
        return [self._tools[name] for name in tool_names if name in self._tools]

    def validate_tool_args(self, tool_name: str, args: Dict[str, Any]) -> bool:
        tool = self.get_tool(tool_name)
        if not tool or not tool.args_schema:
            return True
        schema = tool.args_schema.schema()
        try:
            jsonschema.validate(instance=args, schema=schema)
            return True
        except jsonschema.ValidationError:
            return False

    def check_permission(self, org_id: str, agent_type: str, tool_name: str) -> bool:
        # Simplified permission check for demo
        return tool_name in self._agent_tools.get(agent_type, [])

# Global registry instance
global_tool_registry = ToolRegistry()
