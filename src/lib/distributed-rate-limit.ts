import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? Redis.fromEnv()
  : null;

export async function distributedRateLimit(key:string,limit=5,windowMs=60000){
  if(!redis){
    const {rateLimit}=await import("@/lib/rate-limit");
    return rateLimit(key,limit,windowMs);
  }

  const window=Math.floor(Date.now()/windowMs);
  const redisKey=`rate:${key}:${window}`;
  const count=await redis.incr(redisKey);
  if(count===1) await redis.pexpire(redisKey,windowMs);
  return {
    success:count<=limit,
    remaining:Math.max(0,limit-count),
    resetAt:(window+1)*windowMs,
  };
}
