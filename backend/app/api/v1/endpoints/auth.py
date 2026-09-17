from fastapi import APIRouter, Depends
from uuid import UUID

router = APIRouter()

@router.post("/login")
async def login():
    return {"access_token": "demo_token", "token_type": "bearer"}

@router.post("/register")
async def register():
    return {"message": "User registered"}

@router.get("/me")
async def get_me():
    return {
        "id": "00000000-0000-0000-0000-000000000001",
        "email": "demo@nexflow.app",
        "full_name": "Demo User",
        "role": "admin"
    }
