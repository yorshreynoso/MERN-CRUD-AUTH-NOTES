import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import config from "config";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const { MODE } = config.get("Morgan");

const corsOptions = {
    origin: 'http://www.azliproject.tech.s3-website-us-east-1.amazonaws.com', // Replace with your actual origin
    credentials: true,
  };
const app = express();

app.use(cors(corsOptions));

app.use(morgan(MODE));
app.use(cookieParser());

app.use(express.json()); // used to receive json objects

app.use('/api', authRoutes);
app.use('/api', taskRoutes);





export default app;