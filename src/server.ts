import { PORT } from './secrets'
import {connectRedis} from "./redisClient";
import app from "./app";
import logger from "./logger";

connectRedis().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running at http://localhost:${PORT}`);
    });
}).catch(() => {
    logger.error("Redis Failed")
})