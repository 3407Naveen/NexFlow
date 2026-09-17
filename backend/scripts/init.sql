-- NexFlow Database Initialization Script
-- This runs on first PostgreSQL container start

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create application role with restricted permissions
-- In production, the app connects as this role (not superuser)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'nexflow_app') THEN
        CREATE ROLE nexflow_app WITH LOGIN PASSWORD 'nexflow_app_pass';
    END IF;
END
$$;

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO nexflow_app;
GRANT CREATE ON SCHEMA public TO nexflow_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO nexflow_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO nexflow_app;
