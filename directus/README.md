# AgencyOS - Directus Backend

This directory contains the Directus backend configuration for AgencyOS.

## Contents

- `docker-compose.yaml` – Docker Compose file for running a local Directus instance with PostgreSQL and Redis
- `.env.example` – Environment variables for the Docker setup
- `template/` – Directus template data (schema, content, and files) used by the [Directus Template CLI](https://github.com/directus-community/directus-template-cli)
- `run-scripts/` – Scripts used by Directus Flows > Run Script operations

## Quick Start

```bash
cp .env.example .env
docker compose up -d
```

Directus will be available at [http://localhost:8055](http://localhost:8055).

See the main [README](../README.md) for full setup instructions.
