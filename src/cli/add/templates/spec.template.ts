import { capitalize } from '../../../utils/strings';

const specTemplate = (singular: string) => `\
/*  eslint-disable  @typescript-eslint/no-explicit-any  */

import httpStatus from 'http-status-codes';

import Requester from '../../appRequester';
import db from '../../appDatabase';
import logger from '../../appLogger';
import waitApp from '../../utils/waitApp';
import closeApp from '../../utils/closeApp';

const app = new Requester();

const user = {
  email: 'test@test.test',
  username: 'Test',
  password: 'password',
  id: '',
};

// Wait for all external services (db, redis...)
beforeAll(async () => {
  await waitApp();
});

// Gracefully terminate external services connections
afterAll(async () => {
  await closeApp();
});

// Reset session before each test, create a user and log in
beforeEach(async () => {
  logger.debug('');
  logger.debug(\`Running test '\${expect.getState().currentTestName}'\`);

  app.resetSession();

  user.id = (await app.signup(user)).id;
  await app.signin(user);
});

// Clean db after each test
afterEach(async () => {
  await db.${singular}.deleteMany();
  await db.user.deleteMany();
});

function validate${capitalize(singular)}(${singular}: any) {
  expect(${singular}.id).toBeDefined();
  expect(${singular}.userId).toBe(user.id);
  expect(${singular}.createdAt).toBeDefined();
}

test.todo('${capitalize(singular)}');
`;

export default specTemplate;
