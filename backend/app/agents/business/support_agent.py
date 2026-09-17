from app.agents.base_agent import BaseAgent
from app.agents.tools.demo_tools import search_tickets, create_ticket, search_knowledge_base

class SupportAgent(BaseAgent):
    def __init__(self, model):
        system_prompt = (
            "You are a Customer Support Agent. Your goal is to manage support tickets "
            "and search the knowledge base to resolve customer issues. "
            "Provide citations back to knowledge_chunk IDs when answering questions."
        )
        tools = [search_tickets, create_ticket, search_knowledge_base]
        super().__init__(agent_type="support", system_prompt=system_prompt, tools=tools, model=model)
