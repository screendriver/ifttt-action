import test from 'ava';
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

function doRun(core = createCore(), got = createGot()) {
  return run(
    (core as unknown) as typeof actionsCore,
    (got as unknown) as GotInstance,
  );
}

test('calls correct ifttt.com webhook URL', async t => {
  const core = createCore();
  const got = createGot();
  await doRun(core, got);
  sinon.assert.calledWith(
    got.post,
    'https://maker.ifttt.com/trigger/my-event/with/key/foobar123',
  );
  t.pass();
});

test('returns statusCode and body', async t => {
  const core = createCore();
  const got = createGot();
  const { statusCode, body } = await doRun(core, got);
  t.is(statusCode, 200);
  t.is(body, 'Testbody');
});

test('calls setFailed() when an error occurred', async t => {
  t.plan(1);
  const core = createCore();
  const got = {
    post: sinon.fake.throws(new Error('Test error')),
  };
  try {
    await doRun(core, got);
  } catch {
    sinon.assert.calledWith(core.setFailed, 'Test error');
    t.pass();
  }
});
