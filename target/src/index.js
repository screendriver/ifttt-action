"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const got_1 = tslib_1.__importDefault(require("got"));
const run_1 = require("./run");
run_1.run(core, got_1.default);
