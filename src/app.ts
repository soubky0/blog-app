import express from "express";
import cookieParser from "cookie-parser";
import rootRouter from "./routes";
import {errorHandler} from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api', rootRouter)
app.use(errorHandler);

export default app;