import * as actionsCore from '@actions/core';
import { GotInstance } from 'got';
import { when } from 'jest-when';
import { run } from '../src/run';

function createCore() {
  const getInput = jest.fn();
  when(getInput)
    .calledWith('event', { required: true })
    .mockReturnValue('my-event')
    .calledWith('key', { required: true })
    .mockReturnValue('foobar123');
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

function doRun(core = createCore(), got = createGot()) {
  return run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
}

test('calls correct ifttt.com webhook URL', async () => {
  const core = createCore();
  const got = createGot();
  await doRun(core, got);
  expect(got.post).toHaveBeenCalledWith(
    'https://maker.ifttt.com/trigger/my-event/with/key/foobar123',
  );
});

test('returns statusCode and body', async () => {
  const core = createCore();
  const got = createGot();
  const { statusCode, body } = await doRun(core, got);
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
    await doRun(core, got);
  } catch {
    expect(core.setFailed).toHaveBeenCalledWith('Test error');
  }
});
