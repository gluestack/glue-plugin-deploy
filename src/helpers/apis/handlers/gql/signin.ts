import { clientGQL, gql } from '../../client';

export const signInUser = async (params: any) => {
  const mutation = gql`
    mutation SignInUser ($email: String!, $password: String!) {
      signInUser(input: {email: $email, password: $password, role: "owner"}) {
        data {
          access_token
          email
          id
          name
          team {
            expires_in
            id
            name
            refresh_token_expires_in
            refresh_token
            role
            token
          }
        }
      }
    }
  `;

  const variables = {
    email: params.email,
    password: params.password
  };

  return clientGQL.request(mutation, variables);
};
