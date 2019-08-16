import * as core from '@actions/core';

try {
  const event = core.getInput('event', { required: true });
  const key = core.getInput('key', { required: true });

  core.debug(`Event: ${event}`);
  core.debug(`Key: ${key}`);
} catch (error) {
  core.setFailed(error.message);
}
