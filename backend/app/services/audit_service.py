import uuid
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog

def log_action(
    db: Session,
    org_id: str,
    actor_type: str,
    actor_id: str,
    action: str,
    resource_type: str,
    resource_id: str,
    details: Dict[str, Any],
    ip: Optional[str] = None
) -> AuditLog:
    """Create an audit log entry."""
    log = AuditLog(
        id=str(uuid.uuid4()),
        organization_id=org_id,
        actor_type=actor_type,
        actor_id=actor_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        details=details,
        ip_address=ip
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log
