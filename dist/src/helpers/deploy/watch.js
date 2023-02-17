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
exports.watch = void 0;
var gql_1 = require("../apis/handlers/gql");
var count = 50;
var watch = function (glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    var deploymentId, interval;
    return __generator(this, function (_a) {
        deploymentId = glueStackPlugin.gluePluginStore.get("deployment_id");
        if (!deploymentId) {
            console.log("> Deployment not saved properly... Please try again later.");
            return [2];
        }
        interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var isDone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, getDeployment(deploymentId, glueStackPlugin)];
                    case 1:
                        isDone = _a.sent();
                        if (isDone) {
                            clearInterval(interval);
                        }
                        return [2];
                }
            });
        }); }, 5 * 1000);
        return [2];
    });
}); };
exports.watch = watch;
function getDeployment(deploymentId, glueStackPlugin) {
    return __awaiter(this, void 0, void 0, function () {
        var team, db_deployments_by_pk, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    team = glueStackPlugin.gluePluginStore.get("team");
                    return [4, (0, gql_1.deployment)(deploymentId, team.token)];
                case 1:
                    db_deployments_by_pk = (_a.sent()).db_deployments_by_pk;
                    return [4, showAndGetProgress(db_deployments_by_pk.infra_json, glueStackPlugin)];
                case 2: return [2, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    console.log("> Error fetching deployment... Please try again later.");
                    return [2, true];
                case 4: return [2];
            }
        });
    });
}
function parseToTable(obj) {
    return {
        Step: obj.deployment_task.action.replaceAll("_", " "),
        Status: obj.status,
        "Started at": obj.started_at
            ? new Date(obj.started_at).toLocaleString()
            : "N/A",
        "Ended at": obj.ended_at ? new Date(obj.ended_at).toLocaleString() : "N/A"
    };
}
function showAndGetProgress(infra_json, glueStackPlugin) {
    return __awaiter(this, void 0, void 0, function () {
        var infra_object_1, myTable_1, flag_1;
        return __generator(this, function (_a) {
            if (!infra_json) {
                if (--count === 0) {
                    console.log("> Error fetching deployment... Please try again later.");
                    return [2, true];
                }
                return [2, false];
            }
            try {
                infra_object_1 = JSON.parse(infra_json);
                if (infra_object_1.error) {
                    console.log("> Error : ".concat(infra_object_1.error));
                    return [2, true];
                }
                myTable_1 = [];
                flag_1 = true;
                Object.keys(infra_object_1).map(function (key) {
                    if (infra_object_1[key].status === "inprogress" || infra_object_1[key].status === "pending") {
                        flag_1 = false;
                    }
                    myTable_1.push(parseToTable(infra_object_1[key]));
                });
                console.clear();
                console.log('> Watching deployment!\n');
                console.log("> Refreshed at...", new Date().toLocaleString());
                console.table(myTable_1);
                if (flag_1) {
                    Object.keys(infra_object_1).map(function (key) {
                        if (infra_object_1[key].deployment_task.action === "domain_mapping") {
                            try {
                                var comments = JSON.parse(infra_object_1[key].comments);
                                var endpoints = comments.data.endpoints.map(function (endpoint) {
                                    return {
                                        "Domain": "https://".concat(endpoint.domain)
                                    };
                                });
                                console.table(endpoints);
                            }
                            catch (e) {
                            }
                        }
                    });
                }
                return [2, flag_1];
            }
            catch (e) {
            }
            return [2, true];
        });
    });
}
//# sourceMappingURL=watch.js.map