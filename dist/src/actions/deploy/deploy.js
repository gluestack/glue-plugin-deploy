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
var path_1 = require("path");
var promises_1 = require("node:fs/promises");
var deploy_1 = require("../../helpers/deploy");
var DeployClass = (function () {
    function DeployClass(glueStackPlugin) {
        this.plugins = [];
        this.cwd = process.cwd();
        this.glueStackPlugin = glueStackPlugin;
    }
    DeployClass.prototype.statelessPlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plugins;
            return __generator(this, function (_a) {
                plugins = this.plugins;
                this.glueStackPlugin.app
                    .getContainerTypePluginInstances(false)
                    .forEach(function (instance) {
                    if (instance &&
                        (instance === null || instance === void 0 ? void 0 : instance.containerController) &&
                        (instance === null || instance === void 0 ? void 0 : instance.callerPlugin) &&
                        instance.getCallerPlugin().getType() === 'stateless') {
                        plugins.push({
                            name: instance.getCallerPlugin().getName(),
                            directory: instance.getInstallationPath()
                        });
                    }
                });
                this.plugins = plugins;
                return [2];
            });
        });
    };
    DeployClass.prototype.verifyPlugin = function (plugin, filename) {
        if (filename === void 0) { filename = 'Dockerfile'; }
        return __awaiter(this, void 0, void 0, function () {
            var cwd, pluginPath, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cwd = this.cwd;
                        pluginPath = (0, path_1.join)(cwd, plugin.directory);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, (0, promises_1.access)((0, path_1.join)(pluginPath, filename), promises_1.constants.R_OK)];
                    case 2:
                        _a.sent();
                        return [2, true];
                    case 3:
                        e_1 = _a.sent();
                        console.error('> Plugin "%s" does not have a "%s" file. ' +
                            'Please run glue build and try again!', plugin.directory, filename);
                        process.exit(1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    DeployClass.prototype.createZip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cwd, _a, createZipPromise, zipPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cwd = this.cwd;
                        return [4, (0, deploy_1.zip)(cwd)];
                    case 1:
                        _a = _b.sent(), createZipPromise = _a.createZipPromise, zipPath = _a.zipPath;
                        this.zipPath = zipPath;
                        return [2, createZipPromise];
                }
            });
        });
    };
    DeployClass.prototype.auth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, deploy_1.auth)(this.glueStackPlugin)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DeployClass.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, deploy_1.upload)(this.zipPath, this.glueStackPlugin)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DeployClass;
}());
exports["default"] = DeployClass;
//# sourceMappingURL=deploy.js.map