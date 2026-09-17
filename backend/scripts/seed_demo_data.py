"""
NexFlow Seed Script — Populates initial demo workflows, agents, approvals, and audit logs.
"""
import uuid
import datetime
import asyncio

INITIAL_DEMO_WORKFLOWS = [
    {
        "id": "wf-lead-qualification",
        "name": "Lead Qualification & Inactive Follow-up",
        "description": "Scans CRM for leads inactive for 30+ days, drafts personalized re-engagement emails, verifies tone and compliance, and routes to sales rep for approval.",
        "trigger_type": "scheduled",
        "version": 1,
        "is_active": True,
        "definition": {
            "nodes": [
                {"id": "node-1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Schedule: Weekly Monday 9AM", "triggerType": "scheduled"}},
                {"id": "node-2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Find Inactive Leads (>30d)", "agentType": "sales", "status": "idle"}},
                {"id": "node-3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Draft Re-engagement Brief", "agentType": "marketing", "status": "idle"}},
                {"id": "node-4", "type": "agent", "position": {"x": 250, "y": 400}, "data": {"label": "Verify Content & Compliance", "agentType": "verification", "status": "idle"}},
                {"id": "node-5", "type": "approval", "position": {"x": 250, "y": 520}, "data": {"label": "Manager Approval (Email Batch)", "riskLevel": "medium", "status": "pending"}},
                {"id": "node-6", "type": "agent", "position": {"x": 250, "y": 640}, "data": {"label": "Send Personalized Emails", "agentType": "sales", "status": "idle"}},
                {"id": "node-7", "type": "end", "position": {"x": 250, "y": 760}, "data": {"label": "Log to CRM & Complete"}},
            ],
            "edges": [
                {"id": "e1-2", "source": "node-1", "target": "node-2", "animated": True},
                {"id": "e2-3", "source": "node-2", "target": "node-3"},
                {"id": "e3-4", "source": "node-3", "target": "node-4"},
                {"id": "e4-5", "source": "node-4", "target": "node-5"},
                {"id": "e5-6", "source": "node-5", "target": "node-6"},
                {"id": "e6-7", "source": "node-6", "target": "node-7"},
            ]
        }
    },
    {
        "id": "wf-invoice-approval",
        "name": "Vendor Invoice Processing & Payment Gate",
        "description": "Ingests incoming invoices, checks PO matching and payment terms, triggers automated verification, and pauses at human approval gate before disbursing funds.",
        "trigger_type": "webhook",
        "version": 1,
        "is_active": True,
        "definition": {
            "nodes": [
                {"id": "inv-1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Webhook: Inbound Invoice PDF", "triggerType": "webhook"}},
                {"id": "inv-2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Extract & Match PO Data", "agentType": "finance", "status": "idle"}},
                {"id": "inv-3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Check Vendor Ledger & Terms", "agentType": "finance", "status": "idle"}},
                {"id": "inv-4", "type": "agent", "position": {"x": 250, "y": 400}, "data": {"label": "Automated Line-Item Audit", "agentType": "verification", "status": "idle"}},
                {"id": "inv-5", "type": "approval", "position": {"x": 250, "y": 520}, "data": {"label": "CFO Payment Approval (> $5,000)", "riskLevel": "high", "status": "pending"}},
                {"id": "inv-6", "type": "agent", "position": {"x": 250, "y": 640}, "data": {"label": "Execute Disbursement & Receipt", "agentType": "finance", "status": "idle"}},
                {"id": "inv-7", "type": "end", "position": {"x": 250, "y": 760}, "data": {"label": "Audit Trail Recorded"}},
            ],
            "edges": [
                {"id": "e-inv-1-2", "source": "inv-1", "target": "inv-2", "animated": True},
                {"id": "e-inv-2-3", "source": "inv-2", "target": "inv-3"},
                {"id": "e-inv-3-4", "source": "inv-3", "target": "inv-4"},
                {"id": "e-inv-4-5", "source": "inv-4", "target": "inv-5"},
                {"id": "e-inv-5-6", "source": "inv-5", "target": "inv-6"},
                {"id": "e-inv-6-7", "source": "inv-6", "target": "inv-7"},
            ]
        }
    },
    {
        "id": "wf-employee-onboarding",
        "name": "New Hire Onboarding & Provisioning",
        "description": "Coordinates HR profile setup, schedules team welcome meetings, pulls onboarding docs from Knowledge Base, and alerts IT for credential provisioning.",
        "trigger_type": "manual",
        "version": 1,
        "is_active": True,
        "definition": {
            "nodes": [
                {"id": "onb-1", "type": "trigger", "position": {"x": 250, "y": 40}, "data": {"label": "Manual: Onboard Candidate", "triggerType": "manual"}},
                {"id": "onb-2", "type": "agent", "position": {"x": 250, "y": 160}, "data": {"label": "Create Employee Profile", "agentType": "hr", "status": "idle"}},
                {"id": "onb-3", "type": "agent", "position": {"x": 250, "y": 280}, "data": {"label": "Schedule 1:1s & Orientation", "agentType": "hr", "status": "idle"}},
                {"id": "onb-4", "type": "agent", "position": {"x": 250, "y": 400}, "data": {"label": "Fetch Department Handbook", "agentType": "support", "status": "idle"}},
                {"id": "onb-5", "type": "agent", "position": {"x": 250, "y": 520}, "data": {"label": "Verify Provisioning Checklist", "agentType": "verification", "status": "idle"}},
                {"id": "onb-6", "type": "approval", "position": {"x": 250, "y": 640}, "data": {"label": "HR Director Sign-off", "riskLevel": "low", "status": "pending"}},
                {"id": "onb-7", "type": "end", "position": {"x": 250, "y": 760}, "data": {"label": "Employee Ready on Day 1"}},
            ],
            "edges": [
                {"id": "e-onb-1-2", "source": "onb-1", "target": "onb-2", "animated": True},
                {"id": "e-onb-2-3", "source": "onb-2", "target": "onb-3"},
                {"id": "e-onb-3-4", "source": "onb-3", "target": "onb-4"},
                {"id": "e-onb-4-5", "source": "onb-4", "target": "onb-5"},
                {"id": "e-onb-5-6", "source": "onb-5", "target": "onb-6"},
                {"id": "e-onb-6-7", "source": "onb-6", "target": "onb-7"},
            ]
        }
    }
]

def get_demo_seed_summary():
    return {
        "organization": "Acme Innovations Inc.",
        "workflows": len(INITIAL_DEMO_WORKFLOWS),
        "agents": 5,
        "tools": 12,
        "token_budget": 1_000_000,
    }

if __name__ == "__main__":
    summary = get_demo_seed_summary()
    print("NexFlow Seed Config:")
    for k, v in summary.items():
        print(f"  {k}: {v}")
