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
var inquirer = require('inquirer');
var projects_1 = require("./apis/handlers/projects");
var upload_zip_1 = require("./apis/handlers/upload-zip");
var upload = function (filepath, glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, team, user, tmp, choices, results, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = glueStackPlugin.gluePluginStore.get('project_id');
                team = glueStackPlugin.gluePluginStore.get('team');
                user = glueStackPlugin.gluePluginStore.get('user');
                if (!!projectId) return [3, 3];
                return [4, (0, projects_1.projects)(team.id, team.token)];
            case 1:
                tmp = _a.sent();
                choices = [{ name: 'Create a new Project', value: 'new' }];
                choices.push.apply(choices, tmp.projects.map(function (project) {
                    return { name: project.name, value: project.project_hash };
                }));
                return [4, inquirer.prompt([{
                            name: 'projectId',
                            message: 'Please choose an existing project or create one',
                            type: 'list',
                            choices: choices
                        }])];
            case 2:
                results = _a.sent();
                projectId = results.projectId;
                glueStackPlugin.gluePluginStore.set('project_id', results.projectId);
                _a.label = 3;
            case 3: return [4, (0, upload_zip_1.uploadZip)({
                    project_id: projectId,
                    team_id: team.id,
                    access_token: user.access_token,
                    filepath: filepath
                })];
            case 4:
                response = _a.sent();
                if (!response || !response.data || !response.data.data || !response.data.data.file_id) {
                    console.error('Error uploading the project zip file to minio');
                    process.exit(1);
                }
                glueStackPlugin.gluePluginStore.set('file_id', response.data.data.file_id);
                glueStackPlugin.gluePluginStore.set('deployment_id', response.data.data.deployment_id);
                return [2];
        }
    });
}); };
exports.upload = upload;
//# sourceMappingURL=upload.js.map