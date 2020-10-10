import * as core from '@actions/core';
import got from 'got';
import { run } from './run';

function crash(error: Error) {
  console.error('An error occurred:', error.message);
}

run(core, got).catch(crash);
