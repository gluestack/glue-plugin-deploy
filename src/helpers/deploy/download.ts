
import { GlueStackPlugin } from 'src';
import { downloadZip } from '../apis/handlers/rest';

export const download = async (glueStackPlugin: GlueStackPlugin) => {
  const file_id = glueStackPlugin.gluePluginStore.get('file_id');
  const team = glueStackPlugin.gluePluginStore.get('team');

  const response = await downloadZip(file_id, team.token);
  if (!response || !response.data || !response.data.data || !response.data.data.file_url) {
    console.error('Error downloading file');
    process.exit(1);
  }

  glueStackPlugin.gluePluginStore.set('file_url', response.data.data.file_url);
  glueStackPlugin.gluePluginStore.set('env', response.data.data.env);
};
