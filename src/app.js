import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';


const app = express();
// app.use(cors( { origin: "http://localhost:5173"}));
app.use(cors());

app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json()); // used to receive json objects

app.use('/api', authRoutes);
app.use('/api', taskRoutes);





export default app;