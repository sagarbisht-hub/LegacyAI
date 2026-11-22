"""Central settings — loaded once at startup from the .env file."""
from __future__ import annotations

import os
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Database
    DATABASE_URL: str = "sqlite:///./legacyai.db"

    # JWT
    JWT_SECRET: str = "change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 480

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    # Storage
    UPLOAD_DIR: str = "./uploads"

    # Embedding
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"

    # Optional OpenAI
    OPENAI_API_KEY: str = ""

    # Seed credentials
    SEED_COMPANY_NAME: str = "TechCorp Solutions"
    SEED_ADMIN_EMAIL: str = "admin@techcorp.com"
    SEED_ADMIN_PASSWORD: str = "CompanyAdmin@123"
    SEED_SUPER_EMAIL: str = "superadmin@legacyai.com"
    SEED_SUPER_PASSWORD: str = "SuperAdmin@123"
    SEED_EMP_EMAIL: str = "employee@techcorp.com"
    SEED_EMP_PASSWORD: str = "Employee@123"


@lru_cache
def get_settings() -> Settings:
    return Settings()
