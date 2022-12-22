"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.gql = exports.request = exports.clientREST = exports.clientGQL = void 0;
var axios_1 = __importDefault(require("axios"));
var graphql_request_1 = require("graphql-request");
exports.clientGQL = new graphql_request_1.GraphQLClient('http://10.30.1.84:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': 'backend-productised-services'
    }
});
exports.clientREST = axios_1["default"].create({
    baseURL: 'http://10.30.1.84:9011'
});
var graphql_request_2 = require("graphql-request");
__createBinding(exports, graphql_request_2, "request");
__createBinding(exports, graphql_request_2, "gql");
//# sourceMappingURL=client.js.map