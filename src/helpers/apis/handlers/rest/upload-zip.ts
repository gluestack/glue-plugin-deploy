import { createReadStream } from 'fs';
import { clientREST } from '../../client';

const FormData = require('form-data');

export const uploadZip = async (params: any) => {
  const headers = {'Content-Type': 'multipart/form-data'};

  const form = new FormData();

  form.append('file', createReadStream(params.filepath));
  if (params.project_id && params.project_id !== 'new') {
    form.append('project_hash_id', params.project_id);
  }

  form.append('team_id', params.team_id);
  form.append('access_token', params.access_token);

  return clientREST.post('/upload', form, { headers });
};
