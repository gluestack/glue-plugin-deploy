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
exports.auth = void 0;
var inquirer = require('inquirer');
var gql_1 = require("../apis/handlers/gql");
var auth = function (glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    var creds, results, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                creds = {
                    email: glueStackPlugin.gluePluginStore.get('email'),
                    password: glueStackPlugin.gluePluginStore.get('password')
                };
                if (!(!creds.email || !creds.password)) return [3, 2];
                return [4, inquirer.prompt([{
                            name: 'email',
                            message: 'Please enter your email',
                            type: 'input'
                        }, {
                            name: 'password',
                            message: 'Please enter your password',
                            type: 'password'
                        }])];
            case 1:
                results = _a.sent();
                creds.email = results.email;
                creds.password = results.password;
                glueStackPlugin.gluePluginStore.set('email', results.email);
                glueStackPlugin.gluePluginStore.set('password', results.password);
                _a.label = 2;
            case 2: return [4, (0, gql_1.signInUser)(creds)];
            case 3:
                response = _a.sent();
                if (!response || !response.signInUser || !response.signInUser.data) {
                    console.log('Authentication failed. Please check your credentials and try again.');
                    process.exit(1);
                }
                glueStackPlugin.gluePluginStore.set('team', response.signInUser.data.team);
                delete response.signInUser.data.team;
                glueStackPlugin.gluePluginStore.set('user', response.signInUser.data);
                return [2];
        }
    });
}); };
exports.auth = auth;
//# sourceMappingURL=auth.js.map