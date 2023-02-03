"use strict";
exports.__esModule = true;
exports.deploy = void 0;
var deploy_1 = require("../actions/deploy");
function deploy(program, gluePluginStore) {
    program
        .command('deploy')
        .option('-a, --auth [true]', 'Re-enter credentials, do not use presisted credentials from earlier', false)
        .description('Prepares the compressed project & initiates the deployment')
        .action(function (options) { return (0, deploy_1.deployAction)(options, gluePluginStore); });
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map