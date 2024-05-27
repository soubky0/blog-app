import { createClient } from 'redis';
import logger from "./logger";

const client = createClient();

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