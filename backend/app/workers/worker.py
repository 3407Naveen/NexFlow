import logging

logger = logging.getLogger(__name__)

async def startup(ctx):
    logger.info("Arq worker starting up...")
    ctx["db_engine"] = "mock_engine"

async def shutdown(ctx):
    logger.info("Arq worker shutting down...")

async def execute_workflow_run(ctx, run_id: str):
    logger.info(f"Executing workflow run: {run_id}")
    return {"status": "completed"}

async def process_knowledge_upload(ctx, upload_id: str):
    logger.info(f"Processing knowledge upload: {upload_id}")
    return {"status": "processed"}

async def check_approval_expiry(ctx):
    logger.info("Checking approval expiry...")
    return {"expired_count": 0}

class WorkerSettings:
    functions = [
        execute_workflow_run,
        process_knowledge_upload,
        check_approval_expiry
    ]
    on_startup = startup
    on_shutdown = shutdown
