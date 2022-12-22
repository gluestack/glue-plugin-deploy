import { GlueStackPlugin } from 'src';
import { projects } from '../apis/handlers/gql';
import { uploadZip } from '../apis/handlers/rest';

const inquirer = require('inquirer');

export const upload = async (
  filepath: string,
  glueStackPlugin: GlueStackPlugin
) => {
  let projectId = glueStackPlugin.gluePluginStore.get('project_id');
  const team = glueStackPlugin.gluePluginStore.get('team');
  const user = glueStackPlugin.gluePluginStore.get('user');

  // prompts to collect Project ID from user
  if (!projectId) {
    const tmp = await projects(team.id, team.token);

    // transform key-value pairs
    const choices = [{name: 'Create a new Project', value: 'new'}];
    choices.push(...tmp.projects.map((project: any) => {
      return { name: project.name, value: project.project_hash };
    }));

    // prompt to collect right project from user
    const results = await inquirer.prompt([{
      name: 'projectId',
      message: 'Please choose an existing project or create one',
      type: 'list',
      choices: choices
    }]);

    // store project id in the store
    projectId = results.projectId;
    glueStackPlugin.gluePluginStore.set('project_id', results.projectId);
  }

  // upload the project zip file to minio
  const response = await uploadZip({
    project_id: projectId,
    team_id: team.id,
    access_token: user.access_token,
    filepath: filepath
  });

  if (
    !response || !response.data || !response.data.data
      || !response.data.data.file_id
  ) {
    console.error('Error uploading the project zip file to minio');
    process.exit(1);
  }

  glueStackPlugin.gluePluginStore.set('file_id', response.data.data.file_id);
  glueStackPlugin.gluePluginStore.set('deployment_id', response.data.data.deployment_id);
};
