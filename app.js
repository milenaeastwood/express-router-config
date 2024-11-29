import express from 'express';
import {userRouter} from './routes/userRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', userRouter);

export default app;