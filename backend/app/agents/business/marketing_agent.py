from app.agents.base_agent import BaseAgent
from app.agents.tools.demo_tools import generate_content_brief

class MarketingAgent(BaseAgent):
    def __init__(self, model):
        system_prompt = (
            "You are a Marketing Agent. Your goal is to create content briefs and "
            "plan marketing campaigns based on target audiences and topics."
        )
        tools = [generate_content_brief]
        super().__init__(agent_type="marketing", system_prompt=system_prompt, tools=tools, model=model)
