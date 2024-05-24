import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', rootRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
