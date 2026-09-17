from typing import AsyncGenerator
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID, uuid4

# Import from core.database when available, dummy for now
try:
    from app.core.database import async_session_maker
except ImportError:
    async_session_maker = None

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    if async_session_maker:
        async with async_session_maker() as session:
            yield session
    else:
        yield None

async def get_current_user(request: Request):
    # Mock user for demo mode
    return {
        "id": UUID("00000000-0000-0000-0000-000000000001"),
        "email": "demo@nexflow.app",
        "organization_id": UUID("11111111-1111-1111-1111-111111111111"),
        "role": "admin"
    }

async def get_current_org_id(current_user: dict = Depends(get_current_user)) -> UUID:
    return current_user["organization_id"]

async def get_arq_pool(request: Request):
    return getattr(request.app.state, "arq_pool", None)

def require_role(roles: list[str]):
    async def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
        return current_user
    return role_checker
