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
exports.__esModule = true;
exports.gql = exports.request = exports.clientGQL = void 0;
var graphql_request_1 = require("graphql-request");
var config_1 = require("../../config");
exports.clientGQL = new graphql_request_1.GraphQLClient(config_1.SEAL_GQL);
var graphql_request_2 = require("graphql-request");
__createBinding(exports, graphql_request_2, "request");
__createBinding(exports, graphql_request_2, "gql");
//# sourceMappingURL=client.js.map