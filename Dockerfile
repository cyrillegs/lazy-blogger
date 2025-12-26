# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files
COPY . .

# Build Next.js (no secrets required at build time)
RUN npm run build

# ---------- Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Runtime environment variables (set via docker-compose or docker run)
CMD ["npm", "start"]
