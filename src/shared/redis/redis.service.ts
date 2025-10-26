import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

    async setValue(key: string, value: unknown, ttl?: number): Promise<void> {
        let serializedValue: string;
        if (typeof value === 'string') {
            serializedValue = value;
        } else if (value === null || value === undefined) {
            serializedValue = '';
        } else {
            try {
                serializedValue = JSON.stringify(value);
            } catch (error) {
                throw new Error(`Failed to serialize value to JSON: ${error}`);
            }
        }

        if (ttl) {
            await this.redis.set(key, serializedValue, 'EX', ttl);
        } else {
            await this.redis.set(key, serializedValue);
        }
    }

    async getValue<T = unknown>(key: string): Promise<T | null> {
        const rawValue = await this.redis.get(key);
        if (rawValue === null) {
            return null;
        }

        try {
            return JSON.parse(rawValue) as T;
        } catch (error) {
            return rawValue as T;
        }
    }

    async deleteKey(key: string): Promise<void> {
        await this.redis.del(key);
    }
}