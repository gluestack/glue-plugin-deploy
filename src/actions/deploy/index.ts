import DeployClass from './deploy';
import { GlueStackPlugin } from 'src';

export const deployAction = async (glueStackPlugin: GlueStackPlugin) => {
  console.log('\n> Note: Please remove any zip file or unnecessary files/folders from your project before deploying!');
  console.log('\n> Deploying project...');

  const deploy = new DeployClass(glueStackPlugin);

  console.log('\n> Gathering all deployable plugins...');

  // Gathers the "stateless" plugins from the filesystem
  await deploy.statelessPlugins();

  console.log('> Found %d plugins...', deploy.plugins.length);
  if (!deploy.plugins.length) {
    console.log('> No plugins found! Please run glue build and try again!');
    process.exit(1);
  }

  console.log('> Verifying plugins & compressing the project...');

  // Verifies that each plugin has a Dockerfile
  for await (const plugin of deploy.plugins) {
    await deploy.verifyPlugin(plugin, 'Dockerfile');
  }

  // Create project's zip file
  await deploy.createZip();

  // authenticate the user & store creds in local store
  console.log('\n> Authenticating user credentials...');
  await deploy.auth();
  console.log('> Authentication successful!\n');

  // uploads the project zip file to minio
  console.log('> Uploading project zip file...');
  await deploy.upload();
  console.log('> Project zip file uploaded successfully!\n');
};
