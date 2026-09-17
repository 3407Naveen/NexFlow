from fastapi import APIRouter, Depends
from typing import Any
from app.api.deps import get_current_user
from app.schemas.organization import OrganizationResponse, OrganizationUpdate
from datetime import datetime
from uuid import UUID

router = APIRouter()

@router.get("/current", response_model=OrganizationResponse)
async def get_current_org(current_user: dict = Depends(get_current_user)):
    return OrganizationResponse(
        id=current_user["organization_id"],
        name="Demo Organization",
        slug="demo-org",
        monthly_token_budget=1000000,
        monthly_tokens_used=50000,
        created_at=datetime.now()
    )

@router.put("/current", response_model=OrganizationResponse)
async def update_current_org(data: OrganizationUpdate, current_user: dict = Depends(get_current_user)):
    return OrganizationResponse(
        id=current_user["organization_id"],
        name=data.name or "Demo Organization",
        slug="demo-org",
        logo_url=data.logo_url,
        monthly_token_budget=data.monthly_token_budget or 1000000,
        monthly_tokens_used=50000,
        created_at=datetime.now()
    )
