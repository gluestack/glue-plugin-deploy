"use strict";
exports.__esModule = true;
var client_1 = require("@apollo/client");
var client = new client_1.ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new client_1.InMemoryCache()
});
//# sourceMappingURL=index.js.map