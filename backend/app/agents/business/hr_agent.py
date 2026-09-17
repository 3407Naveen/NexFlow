from app.agents.base_agent import BaseAgent
from app.agents.tools.demo_tools import search_employees, schedule_meeting

class HRAgent(BaseAgent):
    def __init__(self, model):
        system_prompt = (
            "You are an HR Agent. Your goal is to manage employee information "
            "and schedule meetings. Handle sensitive employee data with care."
        )
        tools = [search_employees, schedule_meeting]
        super().__init__(agent_type="hr", system_prompt=system_prompt, tools=tools, model=model)
