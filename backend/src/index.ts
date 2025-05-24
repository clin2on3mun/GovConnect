import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { xss } from 'express-xss-sanitizer';

import connectDb from './config/db';
import router from './routes/userRoutes';
import agencyRouter from './routes/agencyRoutes';
import categoryRouter from './routes/categoryRoutes';
import submissionRouter from './routes/submissionRoutes';
import globalErrorHandler from './util/globalErrorHandler';

dotenv.config();

connectDb();
const Port = process.env.PORT;
const app = express();

// Rate limiting
const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173', // your Vite frontend
    credentials: true,
  }),
);

app.use('/api', limiter);

// Parse cookies and JSON first
app.use(express.json());
app.use(cookieParser());

// ✅ Clone req body/query/params here (AFTER express.json())
// app.use((req, res, next) => {
//   req.body = { ...req.body };
//   req.query = { ...req.query };
//   req.params = { ...req.params };
//   next();
// });

// Then sanitize
app.use(hpp());
app.use(xss());

app.use('/api/v1/users', router);
app.use('/api/v1/agencies', agencyRouter);
app.use('/api/v1/submissions', submissionRouter);
app.use('/api/categories', categoryRouter);

app.use(globalErrorHandler);

app.listen(Port, () => {
  console.log(`App running .............${Port}`);
});
