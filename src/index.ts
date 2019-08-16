import core from '@actions/core';

export function run() {
  const event = core.getInput('event', { required: true });
  const key = core.getInput('key', { required: true });

  core.debug(`Event: ${event}`);
  core.debug(`Key: ${key}`);
}
