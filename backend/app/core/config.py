from functools import lru_cache
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, RedisDsn

class Settings(BaseSettings):
    APP_NAME: str = "NexFlow"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "dev"
    DEBUG: bool = True
    
    DATABASE_URL: PostgresDsn
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    
    REDIS_URL: RedisDsn
    
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4o"
    
    S3_BUCKET: str
    S3_ENDPOINT: Optional[str] = None
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    
    CLERK_SECRET_KEY: str
    CLERK_PUBLISHABLE_KEY: str
    
    CORS_ORIGINS: List[str] = []
    
    PER_ORG_MONTHLY_TOKEN_BUDGET: int = 1_000_000
    PER_WORKFLOW_RUN_TOKEN_CAP: int = 50_000
    APPROVAL_EXPIRY_HOURS: int = 24
    KNOWLEDGE_CHUNK_SIZE: int = 500
    KNOWLEDGE_CHUNK_OVERLAP: int = 50
    DEMO_MODE: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

@lru_cache
def get_settings() -> Settings:
    return Settings()
