const inquirer = require('inquirer');
import { GlueStackPlugin } from 'src';
import { SEAL_DOMAIN } from '../../config';
import { Glue } from '@gluestack/glue-server-sdk-js';

export const auth = async (doAuth: boolean, glueStackPlugin: GlueStackPlugin) => {
  const creds = {
    email: glueStackPlugin.gluePluginStore.get('email'),
    password: glueStackPlugin.gluePluginStore.get('password')
  };

  // prompts to collect credentials from users
  if (doAuth || !creds.email || !creds.password) {
    const results = await inquirer.prompt([{
      name: 'email',
      message: 'Please enter your email',
      type: 'input'
    }, {
      name: 'password',
      message: 'Please enter your password',
      type: 'password'
    }]);

    creds.email = results.email;
    creds.password = results.password;

    // store credentials in the store
    glueStackPlugin.gluePluginStore.set('email', results.email);
    glueStackPlugin.gluePluginStore.set('password', results.password);
  }

  const glue = new Glue(SEAL_DOMAIN);
  const response = await glue.auth.login({...creds, role: "owner"});
  if (!response || !response.id) {
    console.log(`> Authentication failed. Message: ${response}`);
    process.exit(-1);
  }
  if (!response.is_verified) {
    console.log(`> Authentication failed. Message: Account is not verified`);
    process.exit(-1);
  }

  // store user data in the store
  glueStackPlugin.gluePluginStore.set('team', response.team);
  delete response.team;
  glueStackPlugin.gluePluginStore.set('user', response);
};
