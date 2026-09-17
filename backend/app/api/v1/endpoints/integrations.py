from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
from datetime import datetime
from app.api.deps import get_current_user
from app.schemas.common import PaginatedResponse
from app.schemas.integration import IntegrationCreate, IntegrationResponse, IntegrationUpdate

router = APIRouter()

@router.get("", response_model=PaginatedResponse[IntegrationResponse])
async def list_integrations(current_user: dict = Depends(get_current_user)):
    return PaginatedResponse(
        items=[],
        total=0,
        page=1,
        size=10,
        pages=1
    )

@router.post("", response_model=IntegrationResponse)
async def create_integration(data: IntegrationCreate, current_user: dict = Depends(get_current_user)):
    return IntegrationResponse(
        id=uuid4(),
        organization_id=current_user["organization_id"],
        name=data.name,
        provider=data.provider,
        settings=data.settings,
        status="active",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.put("/{id}", response_model=IntegrationResponse)
async def update_integration(id: UUID, data: IntegrationUpdate, current_user: dict = Depends(get_current_user)):
    return IntegrationResponse(
        id=id,
        organization_id=current_user["organization_id"],
        name=data.name or "Demo Integration",
        provider="github",
        settings=data.settings,
        status=data.status or "active",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@router.delete("/{id}")
async def delete_integration(id: UUID, current_user: dict = Depends(get_current_user)):
    return {"message": "Integration deleted"}
