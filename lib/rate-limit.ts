import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * 5 submissions per 10 minutes per IP.
 *
 * Upstash Redis is used when configured (the correct setup on Vercel, where
 * every request can hit a different instance). Without it we fall back to a
 * per-instance in-memory window so local development and preview deploys are
 * still protected — that fallback is best-effort only, so set the Upstash
 * variables in production.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hasUpstash =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const upstashLimiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
      analytics: false,
      prefix: "aerotel:lead",
    })
  : null;

const memoryHits = new Map<string, number[]>();

function memoryLimit(key: string) {
  const now = Date.now();
  const hits = (memoryHits.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );

  if (memoryHits.size > 5000) memoryHits.clear();

  if (hits.length >= MAX_REQUESTS) {
    memoryHits.set(key, hits);
    return { success: false, reset: hits[0] + WINDOW_MS };
  }

  hits.push(now);
  memoryHits.set(key, hits);
  return { success: true, reset: now + WINDOW_MS };
}

export async function checkRateLimit(key: string) {
  if (upstashLimiter) {
    const result = await upstashLimiter.limit(key);
    return { success: result.success, reset: result.reset };
  }
  return memoryLimit(key);
}

export const usingDistributedRateLimit = hasUpstash;
