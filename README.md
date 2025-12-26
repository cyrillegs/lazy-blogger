# Lazy Blogger - Dockerized Next.js App with CI/CD

This repository contains the **Lazy Blogger** Next.js application, fully dockerized and deployed using **Docker Compose** and automated **CI/CD** with GitHub Actions. It includes integrations with **Clerk** (authentication) and **Supabase** (database).

---

## Features

- Next.js 15.x with Turbopack
- Dockerized for consistent environments
- Clerk authentication
- Supabase backend
- Automated CI/CD:
  - Build & push Docker images to Docker Hub
  - Pull latest image and deploy to VPS via SSH
- Custom domain support

---

## Prerequisites

- Docker & Docker Compose installed locally and on VPS
- Docker Hub account
- VPS with SSH access
- GitHub repository for CI/CD
- Clerk and Supabase accounts

---

## Environment Variables

Create a `.env` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<pk_here>
CLERK_SECRET_KEY=<sk_here>
```

> The `.env` file is **not committed** to GitHub for security. Secrets are injected via GitHub Actions.

---

## Docker Setup

### Local Development

1. Build and run the container locally:

```bash
docker compose build
docker compose up -d
```

2. Access the app at [http://localhost:3000](http://localhost:3000)

3. Stop the container:

```bash
docker compose down
```

---

### Production on VPS

1. Clone repo or pull Docker image:

```bash
docker pull cyrillegs/lazy-blogger:latest
```

2. Ensure you have a `docker-compose.yml` on the VPS:

```yaml
services:
  lazy-blogger:
    image: cyrillegs/lazy-blogger:latest
    container_name: lazy-blogger
    env_file: .env
    ports:
      - "3000:3000"
    restart: unless-stopped
```

3. Deploy:

```bash
docker compose pull
docker compose up -d --remove-orphans
```

4. The app should be accessible via your VPS IP or domain.

---

## CI/CD Setup (GitHub Actions)

1. Add secrets in GitHub:

```
DOCKER_HUB_USERNAME
DOCKER_HUB_PASSWORD
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
VPS_HOST
VPS_USER
VPS_SSH_KEY
VPS_SSH_PORT
```

2. Example `.github/workflows/deploy.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            cyrillegs/lazy-blogger:latest
          build-args: |
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${{ secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }}
            CLERK_SECRET_KEY=${{ secrets.CLERK_SECRET_KEY }}
            NEXT_PUBLIC_SUPABASE_URL=${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
            NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: SSH and deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_SSH_PORT }}
          script: |
            cd ~/docker/lazy-blogger
            docker compose pull
            docker compose up -d --remove-orphans
```

> This workflow builds the Docker image, pushes it to Docker Hub, and deploys the latest image to your VPS.

---

## Notes

- The **latest tag** is used in production for automatic updates.
- Old Docker images on VPS can be cleaned with:

```bash
docker image prune -f
```

- The `.env` file must exist on the VPS for runtime environment variables.

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Docs](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
