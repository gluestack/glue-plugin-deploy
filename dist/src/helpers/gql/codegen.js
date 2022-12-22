"use strict";
exports.__esModule = true;
var config = {
    schema: '<URL_OF_YOUR_GRAPHQL_API>',
    documents: ['src/**/*.tsx'],
    generates: {
        './src/helpers/gql/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    },
    ignoreNoDocuments: true
};
exports["default"] = config;
//# sourceMappingURL=codegen.js.map