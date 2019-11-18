import { expect } from 'chai';
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

suite('run', () => {
  test('calls correct ifttt.com webhook URL', async () => {
    const core = createCore();
    const got = createGot();
    await doRun(core, got);
    expect(got.post).to.have.been.calledWith(
      'https://maker.ifttt.com/trigger/my-event/with/key/foobar123',
    );
  });

  test('returns statusCode and body', async () => {
    const core = createCore();
    const got = createGot();
    const { statusCode, body } = await doRun(core, got);
    expect(statusCode).to.equal(200);
    expect(body).to.equal('Testbody');
  });

  test('calls setFailed() when an error occurred', async () => {
    const core = createCore();
    const got = {
      post: sinon.fake.throws(new Error('Test error')),
    };
    try {
      await doRun(core, got);
      expect.fail();
    } catch {
      expect(core.setFailed).to.have.been.calledWith('Test error');
    }
  });
});
