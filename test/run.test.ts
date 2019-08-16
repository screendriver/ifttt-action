import test from 'tape';
import sinon from 'sinon';
import * as actionsCore from '@actions/core';
import { GotInstance } from 'got';
import { run } from '../src/run';

function createCore() {
  const getInput = sinon.stub();
  getInput.withArgs('event', { required: true }).returns('my-event');
  getInput.withArgs('key', { required: true }).returns('foobar123');
  return {
    getInput,
    setFailed: sinon.fake(),
  };
}

function createGot() {
  return {
    post: sinon.fake.resolves({
      statusCode: 200,
      body: 'Testbody',
    }),
  };
}

test('calls correct ifttt.com webhook URL', async t => {
  t.plan(1);
  const core = createCore();
  const got = createGot();
  await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  sinon.assert.calledWith(
    got.post,
    'https://maker.ifttt.com/trigger/my-event/with/key/foobar123',
  );
  t.pass();
});

test('returns statusCode and body', async t => {
  t.plan(2);
  const core = createCore();
  const got = createGot();
  const { statusCode, body } = await run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
  t.equal(statusCode, 200);
  t.equal(body, 'Testbody');
});

test('calls setFailed() when an error occurred', async t => {
  t.plan(1);
  const core = createCore();
  const got = {
    post: sinon.fake.throws('Test error'),
  };
  try {
    await run(
      (core as unknown) as typeof actionsCore,
      (got as unknown) as GotInstance,
    );
  } catch {
    sinon.assert.calledWith(core.setFailed, 'Test error');
    t.pass();
  }
});
