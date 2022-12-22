import { clientREST } from '../../client';

export const downloadZip = async (file_id: string, token: string) => {
  const headers = {
    'Authorization': 'Bearer ' + token
  }

  return clientREST.get(`/download?file_id=${file_id}`, { headers });
};
