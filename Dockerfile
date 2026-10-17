FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public build-time flags (inlined into the client bundle). Set NEXT_PUBLIC_ASK_ALPHA=false to remove the chat button.
ARG NEXT_PUBLIC_ASK_ALPHA=true
ARG NEXT_PUBLIC_ASK_ALPHA_URL=
ENV NEXT_PUBLIC_ASK_ALPHA=$NEXT_PUBLIC_ASK_ALPHA
ENV NEXT_PUBLIC_ASK_ALPHA_URL=$NEXT_PUBLIC_ASK_ALPHA_URL
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
