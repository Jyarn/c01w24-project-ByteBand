import { AppRegistry, Platform } from 'react-native';
import App from './App.js';

AppRegistry.registerComponent('main', () => App);
const rootTag = document.getElementById('root') || document.getElementById('main');
AppRegistry.runApplication('main', { rootTag });
