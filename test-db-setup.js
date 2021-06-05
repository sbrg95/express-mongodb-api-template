/* eslint-disable jest/no-done-callback */
import mongoose from 'mongoose';
import cuid from 'cuid';
import config from './src/config';

import Todo from './src/resources/todo/todo.model';
import User from './src/resources/user/user.model';

const models = { User, Todo };

const url = config.dbUrl;

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/api-test-database';

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.deleteMany((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

beforeEach(async (done) => {
  const db = cuid();
  function clearDB() {
    const collections = { ...mongoose.connection.collections };
    return Promise.all(
      Object.keys(collections).map((collection) =>
        remove(collections[collection])
      )
    );
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      await clearDB();
      await Promise.all(
        Object.keys(models).map((model) => models[model].init())
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  } else {
    await clearDB();
  }
  done();
});

afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});

afterAll((done) => done());
