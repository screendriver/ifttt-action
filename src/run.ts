import * as actionsCore from '@actions/core';
import { Got } from 'got';

function hasMessage(arg: unknown): arg is { message: string } {
  return typeof arg === 'object' && arg !== null && 'message' in arg;
}

interface Response {
  statusCode: number;
  body: string;
}

export async function run(core: typeof actionsCore, got: Got): Promise<Response> {
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const { statusCode, body } = await got.post(`https://maker.ifttt.com/trigger/${event}/with/key/${key}`);
    return { statusCode, body };
  } catch (error: unknown) {
    if (hasMessage(error)) {
      core.setFailed(error.message);
    }
    throw error;
  }
}
