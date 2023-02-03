import { createReadStream } from 'fs';
import { GlueStackPlugin } from 'src';
import { SEAL_DOMAIN } from '../../config';
import { projects } from '../apis/handlers/gql';
import { Glue } from '@gluestack/glue-server-sdk-js';
import { createDeployment } from '../apis/handlers/gql/create-deployment';

const inquirer = require('inquirer');

export const upload = async (
  filepath: string,
  glueStackPlugin: GlueStackPlugin
) => {
  let projectHash = glueStackPlugin.gluePluginStore.get('project_hash');
  const team = glueStackPlugin.gluePluginStore.get('team');
  const user = glueStackPlugin.gluePluginStore.get('user');

  // prompts to collect Project ID from user
  if (!projectHash) {
    const tmp = await projects(team.id, team.token);

    // transform key-value pairs
    const choices: any = [{name: 'Create a new Project', value: 'new'}];
    choices.push(...tmp.projects.map((project: any) => {
      return { name: project.name, value: project.project_hash };
    }));

    // prompt to collect right project from user
    const results = await inquirer.prompt([{
      name: 'projectHash',
      message: 'Please choose an existing project or create one',
      type: 'list',
      choices: choices
    }]);

    if (!results || !results.projectHash) {
      console.error('> Error collecting project id');
      process.exit(-1);
    }

    // store project id in the store
    projectHash = results.projectHash;
    glueStackPlugin.gluePluginStore.set('project_hash', results.projectHash);
  }

  // upload the project zip file to minio
  const glue = new Glue(SEAL_DOMAIN);
  try {
    const response = await glue.storage.upload(
      createReadStream(filepath)
    );

    if (
      response && !response.id
    ) {
      console.error('Error uploading the project zip file to minio');
      process.exit(1);
    }

    glueStackPlugin.gluePluginStore.set('file_id', response.id);
    console.log('> File uploaded successfully...');

  } catch (error) {
    console.log('> Uploading failed due to following reason:', error.message || error);
    console.log(error);
    process.exit(-1);
  }

  // submits the deployment
  console.log('> Submitting the deployment now...');
  try {
    const fileID = glueStackPlugin.gluePluginStore.get('file_id');
    const user = glueStackPlugin.gluePluginStore.get('user')
    const response = await createDeployment('', team.id, user.access_token, fileID);

    if (response && response.createdbdeployment && response.createdbdeployment.data) {
      const { deployment_id, project_hash } = response.createdbdeployment.data;

      // store the deployment id in the store
      glueStackPlugin.gluePluginStore.set('deployment_id', deployment_id);
      glueStackPlugin.gluePluginStore.set('project_hash', project_hash);
    }
    console.log('> Deployment submitted successfully...');
  } catch (error) {
    console.log('> Uploading failed due to following reason:', error.response.errors || error);
  }
};

