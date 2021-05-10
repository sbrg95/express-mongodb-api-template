import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import config from './config';
import connect from './utils/db';
import Logger from './utils/logger';
import { signup, signin, protect } from './utils/auth';

import userRouter from './resources/user/user.router';
import todoRouter from './resources/todo/todo.router';

import { signinValidation, signupValidation } from './utils/validation';
import { errorHandler, morganMiddleware } from './utils/middlewares';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

app.use(morganMiddleware);

// Signup and signin Routes
app.post('/auth/signup', signupValidation, signup);
app.post('/auth/signin', signinValidation, signin);

// Protected Routes
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

// catching errors
app.use(errorHandler);

const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      Logger.debug(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    Logger.error(err);
  }
};

export default start;
