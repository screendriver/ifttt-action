import * as actionsCore from '@actions/core';
import { GotInstance } from 'got';

export async function run(core: typeof actionsCore, got: GotInstance) {
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const { statusCode, body } = await got.post(
      `https://maker.ifttt.com/trigger/${event}/with/key/${key}`,
    );
    return { statusCode, body };
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}
