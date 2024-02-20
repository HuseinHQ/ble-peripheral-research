/**
 * @format
 */
// import advertiseBLEInBackground from './BLEAdvertise';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// AppRegistry.registerHeadlessTask('BLEAdvertise', () =>
//   advertiseBLEInBackground(),
// );

AppRegistry.registerComponent(appName, () => App);
