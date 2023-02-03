import { clientGQL, gql } from '../../client';

export const createDeployment = async (projectHash: string, teamID: number, token: string, fileID: number) => {
  const query = gql`
    mutation ($projectHash: String!, $teamID: Int!, $token: String!, $fileID: Int!) {
      createdbdeployment(input: {
        project_hash: $projectHash,
        team_id : $teamID,
        access_token: $token
        file_id: $fileID
      }) {
        success
        data {
          deployment_id
          project_hash
        }
        message
      }
    }
  `;

  const variables = {
    projectHash,
    teamID,
    token,
    fileID
  };

  const requestHeaders = {};

  return clientGQL.request(query, variables, requestHeaders);
};
