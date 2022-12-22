"use strict";
exports.__esModule = true;
exports.deploy = void 0;
var deploy_1 = require("../actions/deploy");
function deploy(program, gluePluginStore) {
    program
        .command('deploy')
        .description('Prepares the compressed project & initiates the deployment')
        .action(function () { return (0, deploy_1.deployAction)(gluePluginStore); });
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map