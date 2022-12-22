// npm dependencies
import { join } from 'path';
import { access, constants } from 'node:fs/promises';

// local dependencies
import { GlueStackPlugin } from 'src';
import { auth, upload, zip } from '../../helpers/deploy';
import { IPluginObject, IPluginCollection } from 'src/interfaces';
import IInstance from '@gluestack/framework/types/plugin/interface/IInstance';
import IHasContainerController from '@gluestack/framework/types/plugin/interface/IHasContainerController';

export default class DeployClass {
  glueStackPlugin: GlueStackPlugin;
  plugins: IPluginCollection = [];
  zipPath: string;
  cwd: string = process.cwd();

  constructor(glueStackPlugin: GlueStackPlugin) {
    this.glueStackPlugin = glueStackPlugin;
  }

  // Gathers the "stateless" plugins from the filesystem
  async statelessPlugins() {
    const plugins: IPluginCollection = this.plugins;
    this.glueStackPlugin.app
      .getContainerTypePluginInstances(false)
      // @ts-ignore
      .forEach((instance: IInstance & IPlugin & IHasContainerController) => {
        if (
          instance &&
          instance?.containerController &&
          instance?.callerPlugin &&
          instance.getCallerPlugin().getType() === 'stateless'
        ) {
          plugins.push({
            name: instance.getCallerPlugin().getName(),
            directory: instance.getInstallationPath()
          });
        }
      });
    this.plugins = plugins;
  }

  // Verifies that each plugin has a Dockerfile
  async verifyPlugin(
    plugin: IPluginObject,
    filename: string = 'Dockerfile'
  ) {
    const cwd = this.cwd;
    const pluginPath = join(cwd, plugin.directory);

    try {
      await access(join(pluginPath, filename), constants.R_OK);
      return true;
    } catch (e) {
      console.error(
        '> Plugin "%s" does not have a "%s" file. ' +
        'Please run glue build and try again!',
        plugin.directory,
        filename
      );
      process.exit(1);
    }
  }

  // Create project zip file ignoring unnecessary files
  async createZip() {
    const cwd = this.cwd;
    const { createZipPromise, zipPath } = await zip(cwd);

    this.zipPath = zipPath;
    return createZipPromise;
  }

  // Authenticates users credentials and
  // stores the details into the project's store
  async auth() {
    await auth(this.glueStackPlugin);
  }

  // uploads the zip into minio
  async upload() {
    await upload(this.zipPath, this.glueStackPlugin);
  }
}