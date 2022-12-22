import { GlueStackPlugin } from 'src';
import { deployAction } from '../actions/deploy';

export function deploy(program: any, gluePluginStore: GlueStackPlugin) {
  program
    .command('deploy')
    .description('Prepares the compressed project & initiates the deployment')
    .action(() => deployAction(gluePluginStore));
}
