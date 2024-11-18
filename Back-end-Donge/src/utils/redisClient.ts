import {singleton} from "tsyringe";
import { createClient } from "redis"
import logger from "../core/logger";

@singleton()
export class RedisClient {
    private client = createClient({url: process.env.REDIS_URL || 'redis://localhost:6379'});

    constructor() {
        this.client.on('error', (err) => {
            logger.error(`Redis Client error: ${err}`);
        });
        this.client.connect();
    }

    async setEx(key: string, duration: number, value: string) {
        await this.client.setEx(key, duration, value);
    }

    async get(key: string) {
        return await this.client.get(key);
    }

    async exists(key: string) {
        return await this.client.exists(key) === 1;
    }
}