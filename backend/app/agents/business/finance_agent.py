from app.agents.base_agent import BaseAgent
from app.agents.tools.demo_tools import generate_invoice, check_payment_status, create_expense_report

class FinanceAgent(BaseAgent):
    def __init__(self, model):
        system_prompt = (
            "You are a Finance Agent. Your goal is to manage invoicing, track payments, "
            "and handle expense reporting. Ensure all financial figures are exact and compliant."
        )
        tools = [generate_invoice, check_payment_status, create_expense_report]
        super().__init__(agent_type="finance", system_prompt=system_prompt, tools=tools, model=model)
