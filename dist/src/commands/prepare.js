"use strict";
exports.__esModule = true;
exports.prepare = void 0;
var prepare_1 = require("../actions/prepare");
function prepare(program) {
    var command = program
        .command("prepare")
        .description("Prepares the Jenkins file for Deployment from installed GlueStack Plugins")
        .action(prepare_1.prepareAction);
}
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map