import asyncio
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from uuid import UUID

router = APIRouter()

async def event_generator(run_id: UUID):
    # Dummy events for SSE
    yield f"data: {{\"event\": \"started\", \"run_id\": \"{run_id}\"}}\n\n"
    await asyncio.sleep(1)
    yield f"data: {{\"event\": \"completed\", \"run_id\": \"{run_id}\"}}\n\n"

@router.get("/{run_id}/stream")
async def stream_execution(run_id: UUID):
    return StreamingResponse(event_generator(run_id), media_type="text/event-stream")
