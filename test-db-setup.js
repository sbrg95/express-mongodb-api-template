import mongoose from 'mongoose';
import cuid from 'cuid';
import Logger from './src/utils/logger';

import Todo from './src/resources/todo/todo.model';
import User from './src/resources/user/user.model';

const models = { User, Todo };

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/api-test-database';

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.remove((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

beforeEach(async () => {
  const db = cuid();
  function clearDB() {
    return Promise.all(mongoose.connection.collections.map((c) => remove(c)));
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
      });

      await clearDB();
      await Promise.all(models.map((model) => model.init()));
    } catch (err) {
      Logger.error(`Database connection failled: ${err}`);
    }
  } else {
    await clearDB();
  }
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
