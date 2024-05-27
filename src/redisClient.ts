import { createClient } from 'redis';
import logger from "./logger";
import {REDIS_URL} from "./secrets";

const client = createClient({
    url: REDIS_URL,
});

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

const connectRedis = async () => {
    try {
        await client.connect();
    } catch (error) {
        logger.error('Redis client connection error:', error);
        return;
    }
};

export { client, connectRedis };