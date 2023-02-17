import DeployClass from "./deploy";
import { GlueStackPlugin } from "src";

export const deployAction = async (
  options: any,
  glueStackPlugin: GlueStackPlugin,
  isWatch: boolean = false,
) => {
  console.log('\n> Note: Please remove any zip file or unnecessary files/folders from your project before deploying!');
  console.log('\n> Deploying project...');

  const deploy = new DeployClass(glueStackPlugin);

  console.log('\n> Gathering all deployable plugins...');

  // Gathers the "stateless" plugins from the filesystem
  await deploy.statelessPlugins();

  // Showcase the plugins that are going to be deployed
  console.log('> Found %d deployable plugins...\n', deploy.plugins.length);
  if (!deploy.plugins.length) {
    console.log('> No plugins found! Please run glue build and try again!');
    process.exit(1);
  }

  // Create project's zip file
  console.log('> Compressing the project...');
  await deploy.createZip();

  // authenticate the user & store creds in local store
  console.log('\n> Authenticating user credentials...');
  await deploy.auth(options.auth);
  console.log('> Authentication successful!\n');

  // uploads the project zip file to minio
  console.log('> Uploading project zip file...');
  await deploy.upload();
  console.log('> Project zip file uploaded successfully!\n');

  if (isWatch) {
    console.log("> Fetching deployment details...\n");
    await deploy.watch();
  }
};
