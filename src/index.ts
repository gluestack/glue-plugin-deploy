//@ts-ignore
import packageJSON from "../package.json";
import { PluginInstance } from "./PluginInstance";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";

import { deploy as deployCommand, deployWatch as deployWatchCommand } from "./commands";

//Do not edit the name of this class
export class GlueStackPlugin implements IPlugin, IManagesInstances, ILifeCycle {
  app: IApp;
  instances: IInstance[];
  type: "stateless" | "stateful" | "devonly" = "stateless";
  gluePluginStore: IGlueStorePlugin;

  constructor(app: IApp, gluePluginStore: IGlueStorePlugin) {
    this.app = app;
    this.instances = [];
    this.gluePluginStore = gluePluginStore;
  }

  init() {
    this.app.addCommand((program: any) => deployCommand(program, this));
    this.app.addCommand((program: any) => deployWatchCommand(program, this));
  }

  destroy() {
    //
  }

  getName(): string {
    return packageJSON.name;
  }

  getType(): "stateless" | "stateful" | "devonly" {
    return this.type;
  }

  getVersion(): string {
    return packageJSON.version;
  }

  getInstallationPath(target: string): string {
    return "";
  }

  getTemplateFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/template`;
  }

  async runPostInstall(instanceName: string, target: string) {
    const deployPlugin: GlueStackPlugin = this.app.getPluginByName(
      "@gluestack/glue-plugin-deploy",
    );
    //Validation
    if (
      deployPlugin &&
      deployPlugin.getInstances() &&
      deployPlugin.getInstances()[0]
    ) {
      throw new Error(
        `Deploy instance already installed as ${deployPlugin
          .getInstances()[0]
          .getName()}`,
      );
    }
  }

  createInstance(
    key: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ): IInstance {
    const instance = new PluginInstance(
      this.app,
      this,
      key,
      gluePluginStore,
      installationPath,
    );
    this.instances.push(instance);
    return instance;
  }

  getInstances(): IInstance[] {
    return this.instances;
  }
}
