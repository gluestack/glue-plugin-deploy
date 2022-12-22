"use strict";
exports.__esModule = true;
exports.client = void 0;
var client_1 = require("@apollo/client");
exports.client = new client_1.ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new client_1.InMemoryCache()
});
//# sourceMappingURL=config.js.map