import uuid
from sqlalchemy.orm import Session
from app.models.approval import Approval
from datetime import datetime, timezone, timedelta

def create_approval(db: Session, task: dict, risk_level: str, context: dict) -> Approval:
    """Create a new approval request."""
    approval = Approval(
        id=str(uuid.uuid4()),
        organization_id=task.get("organization_id", ""),
        workflow_run_id=task.get("workflow_run_id", ""),
        task_id=task.get("id", ""),
        status="pending",
        risk_level=risk_level,
        context_data=context,
        expires_at=datetime.now(timezone.utc) + timedelta(hours=24)
    )
    db.add(approval)
    db.commit()
    db.refresh(approval)
    return approval

def decide_approval(db: Session, approval_id: str, user_id: str, action: str, notes: str) -> Approval:
    """Make a decision on an approval."""
    approval = db.query(Approval).filter(Approval.id == approval_id).first()
    if approval:
        approval.status = "approved" if action == "approve" else "rejected"
        approval.reviewer_id = user_id
        approval.reviewer_notes = notes
        approval.reviewed_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(approval)
    return approval

def check_expired_approvals(db: Session):
    """Find and escalate overdue approvals."""
    now = datetime.now(timezone.utc)
    expired = db.query(Approval).filter(
        Approval.status == "pending",
        Approval.expires_at < now
    ).all()
    
    for approval in expired:
        approval.status = "expired"
    
    if expired:
        db.commit()
        
    return expired
