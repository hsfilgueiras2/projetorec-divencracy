import express, { json } from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(json());
app.use(cors());
app.use(userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server running at port ' + port);
});