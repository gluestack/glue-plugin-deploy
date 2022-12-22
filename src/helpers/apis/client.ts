import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { GQL_SERVER, FS_SERVER } from '../../config';

export const clientGQL = new GraphQLClient(GQL_SERVER);

export const clientREST = axios.create({
  baseURL: FS_SERVER
});

export { request, gql } from 'graphql-request';
