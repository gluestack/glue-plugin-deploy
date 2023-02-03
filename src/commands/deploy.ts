import { GlueStackPlugin } from 'src';
import { deployAction } from '../actions/deploy';

export function deploy(program: any, gluePluginStore: GlueStackPlugin) {
  program
    .command('deploy')
    .option('-a, --auth [true]', 'Re-enter credentials, do not use presisted credentials from earlier', false)
    .description('Prepares the compressed project & initiates the deployment')
    .action((options: any) => deployAction(options, gluePluginStore));
}
