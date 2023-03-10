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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deployAction = void 0;
var deploy_1 = __importDefault(require("./deploy"));
var deployAction = function (options, glueStackPlugin, isWatch) {
    if (isWatch === void 0) { isWatch = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var deploy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n> Note: Please remove any zip file or unnecessary files/folders from your project before deploying!');
                    console.log('\n> Deploying project...');
                    deploy = new deploy_1["default"](glueStackPlugin);
                    console.log('\n> Gathering all deployable plugins...');
                    return [4, deploy.statelessPlugins()];
                case 1:
                    _a.sent();
                    console.log('> Found %d deployable plugins...\n', deploy.plugins.length);
                    if (!deploy.plugins.length) {
                        console.log('> No plugins found! Please run glue build and try again!');
                        process.exit(1);
                    }
                    console.log('> Compressing the project...');
                    return [4, deploy.createZip()];
                case 2:
                    _a.sent();
                    console.log('\n> Authenticating user credentials...');
                    return [4, deploy.auth(options.auth)];
                case 3:
                    _a.sent();
                    console.log('> Authentication successful!\n');
                    console.log('> Uploading project zip file...');
                    return [4, deploy.upload()];
                case 4:
                    _a.sent();
                    console.log('> Project zip file uploaded successfully!\n');
                    if (!isWatch) return [3, 6];
                    console.log("> Fetching deployment details...\n");
                    return [4, deploy.watch()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
};
exports.deployAction = deployAction;
//# sourceMappingURL=index.js.map