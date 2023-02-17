"use strict";
exports.__esModule = true;
exports.deployWatch = void 0;
var deploy_1 = require("../actions/deploy");
function deployWatch(program, gluePluginStore) {
    program
        .command('deploy:watch')
        .option('-a, --auth [true]', 'Re-enter credentials, do not use presisted credentials from earlier', false)
        .description('Prepares the compressed project & initiates the deployment')
        .action(function (options) { return (0, deploy_1.deployAction)(options, gluePluginStore, true); });
}
exports.deployWatch = deployWatch;
//# sourceMappingURL=deployWatch.js.map