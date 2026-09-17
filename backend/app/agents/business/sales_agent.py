from app.agents.base_agent import BaseAgent
from app.agents.tools.demo_tools import search_crm_contacts, update_crm_deal, send_follow_up_email

class SalesAgent(BaseAgent):
    def __init__(self, model):
        system_prompt = (
            "You are a Sales and CRM Agent. Your goal is to manage CRM operations, "
            "handle lead management, and send follow-ups. Ensure all CRM updates are accurate."
        )
        tools = [search_crm_contacts, update_crm_deal, send_follow_up_email]
        super().__init__(agent_type="sales", system_prompt=system_prompt, tools=tools, model=model)
