import express from 'express';
import rootRouter from './routes/index';
import { PORT } from './secrets'
import cookieParser from 'cookie-parser';
import {errorHandler} from "./middleware/errorHandler";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(errorHandler);

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
