const inquirer = require('inquirer');
import { GlueStackPlugin } from 'src';
import { signInUser } from '../apis/handlers/gql';

export const auth = async (glueStackPlugin: GlueStackPlugin) => {
  const creds = {
    email: glueStackPlugin.gluePluginStore.get('email'),
    password: glueStackPlugin.gluePluginStore.get('password')
  };

  // prompts to collect credentials from users
  if (!creds.email || !creds.password) {
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

  // signin with stored credentials
  const response = await signInUser(creds);
  if (!response || !response.signInUser || !response.signInUser.data) {
    console.log('Authentication failed. Please check your credentials and try again.');
    process.exit(1);
  }

  // store user data in the store
  glueStackPlugin.gluePluginStore.set('team', response.signInUser.data.team);
  delete response.signInUser.data.team;
  glueStackPlugin.gluePluginStore.set('user', response.signInUser.data);
};
