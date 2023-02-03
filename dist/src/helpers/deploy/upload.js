"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.upload = void 0;
var fs_1 = require("fs");
var config_1 = require("../../config");
var gql_1 = require("../apis/handlers/gql");
var glue_server_sdk_js_1 = require("@gluestack/glue-server-sdk-js");
var create_deployment_1 = require("../apis/handlers/gql/create-deployment");
var inquirer = require('inquirer');
var upload = function (filepath, glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    var projectHash, team, user, tmp, choices, results, glue, response, error_1, fileID, user_1, response, _a, deployment_id, project_hash, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                projectHash = glueStackPlugin.gluePluginStore.get('project_hash');
                team = glueStackPlugin.gluePluginStore.get('team');
                user = glueStackPlugin.gluePluginStore.get('user');
                if (!!projectHash) return [3, 3];
                return [4, (0, gql_1.projects)(team.id, team.token)];
            case 1:
                tmp = _b.sent();
                choices = [{ name: 'Create a new Project', value: 'new' }];
                choices.push.apply(choices, tmp.projects.map(function (project) {
                    return { name: project.name, value: project.project_hash };
                }));
                return [4, inquirer.prompt([{
                            name: 'projectHash',
                            message: 'Please choose an existing project or create one',
                            type: 'list',
                            choices: choices
                        }])];
            case 2:
                results = _b.sent();
                if (!results || !results.projectHash) {
                    console.error('> Error collecting project id');
                    process.exit(-1);
                }
                projectHash = results.projectHash;
                glueStackPlugin.gluePluginStore.set('project_hash', results.projectHash);
                _b.label = 3;
            case 3:
                glue = new glue_server_sdk_js_1.Glue(config_1.SEAL_DOMAIN);
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4, glue.storage.upload((0, fs_1.createReadStream)(filepath))];
            case 5:
                response = _b.sent();
                if (response && !response.id) {
                    console.error('Error uploading the project zip file to minio');
                    process.exit(1);
                }
                glueStackPlugin.gluePluginStore.set('file_id', response.id);
                console.log('> File uploaded successfully...');
                return [3, 7];
            case 6:
                error_1 = _b.sent();
                console.log('> Uploading failed due to following reason:', error_1.message || error_1);
                console.log(error_1);
                process.exit(-1);
                return [3, 7];
            case 7:
                console.log('> Submitting the deployment now...');
                _b.label = 8;
            case 8:
                _b.trys.push([8, 10, , 11]);
                fileID = glueStackPlugin.gluePluginStore.get('file_id');
                user_1 = glueStackPlugin.gluePluginStore.get('user');
                return [4, (0, create_deployment_1.createDeployment)('', team.id, user_1.access_token, fileID)];
            case 9:
                response = _b.sent();
                if (response && response.createdbdeployment && response.createdbdeployment.data) {
                    _a = response.createdbdeployment.data, deployment_id = _a.deployment_id, project_hash = _a.project_hash;
                    glueStackPlugin.gluePluginStore.set('deployment_id', deployment_id);
                    glueStackPlugin.gluePluginStore.set('project_hash', project_hash);
                }
                console.log('> Deployment submitted successfully...');
                return [3, 11];
            case 10:
                error_2 = _b.sent();
                console.log('> Uploading failed due to following reason:', error_2.response.errors || error_2);
                return [3, 11];
            case 11: return [2];
        }
    });
}); };
exports.upload = upload;
//# sourceMappingURL=upload.js.map