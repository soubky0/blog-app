import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

const connectRedis = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error('Redis client connection error:', error);
        return;
    }
};

export { client, connectRedis };