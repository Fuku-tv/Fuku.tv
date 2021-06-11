import { env } from 'fuku.tv-shared';
import * as redis from 'redis';

const FUKU_REDIS_URL = env.fukuRedisServerURL();

export const redisSubscriber = redis.createClient(6379, FUKU_REDIS_URL);

export const redisPublisher = redis.createClient(6379, FUKU_REDIS_URL);
