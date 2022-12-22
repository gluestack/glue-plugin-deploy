import { clientGQL, gql } from '../../client';

export const projects = async (teamId: number, token: string) => {
  console.log('Project', teamId);

  const query = gql`
    query projects ($teamId: Int!) {
      projects(where: {team_id: {_eq: $teamId}}) {
        project_hash
        name
      }
    }
  `;

  const variables = {
    teamId
  };

  const requestHeaders = {
    'Authorization': `Bearer ${token}`
  };

  return clientGQL.request(query, variables, requestHeaders);
};
