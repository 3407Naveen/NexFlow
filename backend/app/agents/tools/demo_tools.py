from typing import List, Optional, Dict, Any
from langchain_core.tools import tool
import uuid

# --- Sales & CRM ---

@tool
def search_crm_contacts(query: str, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    """Search CRM contacts based on a query and optional filters."""
    return [
        {"id": "cnt_1", "name": "Alice Smith", "email": "alice@example.com", "company": "Acme Corp", "status": "active", "last_contact": "2023-10-01"},
        {"id": "cnt_2", "name": "Bob Jones", "email": "bob@example.com", "company": "Globex", "status": "lead", "last_contact": "2023-09-15"},
    ]

@tool
def update_crm_deal(deal_id: str, stage: Optional[str] = None, value: Optional[float] = None, notes: Optional[str] = None) -> Dict[str, Any]:
    """Update an existing CRM deal with new stage, value, or notes."""
    return {
        "deal_id": deal_id,
        "stage": stage or "negotiation",
        "value": value or 15000.0,
        "notes": notes or "Updated via NexFlow",
        "updated_at": "2023-10-05T12:00:00Z"
    }

@tool
def send_follow_up_email(to: str, subject: str, body: str, template: Optional[str] = None) -> Dict[str, Any]:
    """Send a follow-up email to a contact."""
    return {"sent": True, "message_id": f"msg_{uuid.uuid4().hex[:8]}"}


# --- Finance ---

@tool
def generate_invoice(client_id: str, items: List[Dict[str, Any]], due_date: str) -> Dict[str, Any]:
    """Generate a new invoice for a client based on line items."""
    total = sum(item.get("price", 0) * item.get("quantity", 1) for item in items)
    return {
        "invoice_id": f"inv_{uuid.uuid4().hex[:8]}",
        "client_id": client_id,
        "total": total,
        "due_date": due_date,
        "pdf_url": "https://example.com/invoices/inv_123.pdf"
    }

@tool
def check_payment_status(invoice_id: str) -> Dict[str, Any]:
    """Check the payment status of an invoice."""
    return {
        "invoice_id": invoice_id,
        "status": "partial",
        "amount_due": 5000.0,
        "amount_paid": 2000.0,
        "due_date": "2023-10-31"
    }

@tool
def create_expense_report(items: List[Dict[str, Any]], category: str, notes: Optional[str] = None) -> Dict[str, Any]:
    """Create a new expense report."""
    total = sum(item.get("amount", 0) for item in items)
    return {
        "report_id": f"exp_{uuid.uuid4().hex[:8]}",
        "total": total,
        "category": category,
        "status": "pending_approval"
    }


# --- HR ---

@tool
def search_employees(query: Optional[str] = None, department: Optional[str] = None, status: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search the employee directory."""
    return [
        {"emp_id": "emp_1", "name": "Charlie Davis", "department": "Engineering", "role": "Senior Dev", "status": "active"},
        {"emp_id": "emp_2", "name": "Diana Evans", "department": "Marketing", "role": "Manager", "status": "active"}
    ]

@tool
def schedule_meeting(title: str, attendees: List[str], datetime: str, duration_minutes: int) -> Dict[str, Any]:
    """Schedule a meeting on the calendar with attendees."""
    return {
        "meeting_id": f"mtg_{uuid.uuid4().hex[:8]}",
        "title": title,
        "calendar_link": "https://calendar.example.com/event/123",
        "status": "scheduled"
    }


# --- Customer Support ---

@tool
def search_tickets(query: Optional[str] = None, status: Optional[str] = None, priority: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search customer support tickets."""
    return [
        {"ticket_id": "tkt_1", "title": "Login issue", "status": "open", "priority": "high", "customer_id": "cust_1"},
        {"ticket_id": "tkt_2", "title": "Billing question", "status": "resolved", "priority": "medium", "customer_id": "cust_2"}
    ]

@tool
def create_ticket(title: str, description: str, priority: str, customer_id: str) -> Dict[str, Any]:
    """Create a new customer support ticket."""
    return {
        "ticket_id": f"tkt_{uuid.uuid4().hex[:8]}",
        "status": "open",
        "title": title,
        "priority": priority
    }

@tool
def search_knowledge_base(query: str, top_k: Optional[int] = 3) -> List[Dict[str, Any]]:
    """Search the knowledge base for articles and documentation."""
    return [
        {"chunk_id": "kb_1", "title": "Password Reset Guide", "content": "To reset your password, click 'Forgot Password' on the login page.", "relevance": 0.95},
        {"chunk_id": "kb_2", "title": "SSO Setup", "content": "SSO configuration requires domain verification.", "relevance": 0.82}
    ]


# --- Marketing ---

@tool
def generate_content_brief(topic: str, target_audience: str, content_type: str, tone: Optional[str] = None) -> Dict[str, Any]:
    """Generate a content brief for marketing materials."""
    return {
        "brief": f"Content brief for {content_type} about {topic}.",
        "keywords": ["innovation", "AI", "workflow"],
        "outline": ["1. Introduction", "2. Core benefits", "3. Case studies", "4. Call to Action"]
    }
