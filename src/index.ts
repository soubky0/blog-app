import express from 'express';
import rootRouter from './routes/index';
import { PORT } from './secrets'
import cookieParser from 'cookie-parser';
import {errorHandler} from "./middleware/errorHandler";
import pino from 'pino';

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'hostname,pid',
        }
    }
});

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api', rootRouter)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
