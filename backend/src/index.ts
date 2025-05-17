import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db';
import router from './routes/userRoutes';
import agencyRouter from './routes/agencyRoutes';
import submissionRouter from './routes/submissionRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();
console.log(typeof process.env.JWT_EXPIRES_IN);
connectDb();
const Port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
  res.send(`Port Running on ${Port}`);
});

app.use('/api/v1/users', router);
app.use('/api/v1/agencies', agencyRouter);
app.use('/api/v1/submissions', submissionRouter);
app.listen(Port, () => {
  console.log(`App running .............${Port}`);
});
