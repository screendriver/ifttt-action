import core from '@actions/core';

const event = core.getInput('event', { required: true });
const key = core.getInput('key', { required: true });

core.debug(`Event: ${event}`);
core.debug(`Key: ${key}`);
