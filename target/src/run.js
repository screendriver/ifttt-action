"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function run(core, got) {
    try {
        const event = core.getInput('event', { required: true });
        const key = core.getInput('key', { required: true });
        const { statusCode, body } = await got.post(`https://maker.ifttt.com/trigger/${event}/with/key/${key}`);
        return { statusCode, body };
    }
    catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}
exports.run = run;
