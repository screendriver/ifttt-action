import * as actionsCore from '@actions/core';
import { GotInstance } from 'got';
import { run } from '../src/run';

function createCore() {
  const getInput = jest
    .fn()
    .mockReturnValueOnce('my-event')
    .mockReturnValueOnce('foobar123');
  return {
    getInput,
    setFailed: jest.fn(),
  };
}

function createGot() {
  return {
    post: jest.fn().mockResolvedValue({
      statusCode: 200,
      body: 'Testbody',
    }),
  };
}

test('calls getInput() with "event" name', async () => {
  const core = createCore();
  const got = createGot();
  await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  expect(core.getInput).toHaveBeenCalledWith('event', { required: true });
});

test('calls getInput() with "key" name', async () => {
  const core = createCore();
  const got = createGot();
  await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  expect(core.getInput).toHaveBeenCalledWith('key', { required: true });
});

test('calls correct ifttt.com webhook URL', async () => {
  const core = createCore();
  const got = createGot();
  await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  expect(got.post).toHaveBeenCalledWith(
    'https://maker.ifttt.com/trigger/my-event/with/key/foobar123',
  );
});

test('returns statusCode and body', async () => {
  const core = createCore();
  const got = createGot();
  const { statusCode, body } = await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  expect(statusCode).toBe(200);
  expect(body).toBe('Testbody');
});

test('calls setFailed() when an error occurred', async () => {
  expect.assertions(1);
  const core = createCore();
  const got = {
    post: jest.fn(() => {
      throw new Error('Test error');
    }),
  };
  try {
    await run(
      (core as unknown) as typeof actionsCore,
      (got as unknown) as GotInstance,
    );
  } catch {
    expect(core.setFailed).toHaveBeenCalledWith('Test error');
  }
});
