// /* eslint-disable no-bitwise */
// import BLEPeripheral from 'react-native-ble-peripheral';
// import BackgroundService from 'react-native-background-actions';

// const initPeripheral = async () => {
//   try {
//     // Definisi UUID untuk layanan dan karakteristik
//     const SERVICE_UUID = 'E093F3B5-00A3-A9E5-9ECA-40016E0EDC24';
//     const CS_CHAR_P2C_UUID = 'E093F3B5-00A3-A9E5-9ECA-40026E0EDC24';
//     const CS_CHAR_C2P_UUID = 'E093F3B5-00A3-A9E5-9ECA-40036E0EDC24';

//     // Menambahkan layanan
//     BLEPeripheral.addService(SERVICE_UUID, true);
//     console.log('Service added successfully');

//     BLEPeripheral.addCharacteristicToService(
//       SERVICE_UUID,
//       CS_CHAR_P2C_UUID,
//       1 | 16,
//       16 | 32,
//     );

//     BLEPeripheral.addCharacteristicToService(
//       SERVICE_UUID,
//       CS_CHAR_C2P_UUID,
//       1 | 16,
//       2 | 4 | 8,
//     );

//     BLEPeripheral.addCCCDToCharacteristic(SERVICE_UUID, CS_CHAR_P2C_UUID);
//     BLEPeripheral.addCCCDToCharacteristic(SERVICE_UUID, CS_CHAR_C2P_UUID);

//     BLEPeripheral.addCharacteristicUserDescriptionToCharacteristic(
//       SERVICE_UUID,
//       CS_CHAR_P2C_UUID,
//       'TX_VALUE',
//     );
//     BLEPeripheral.addCharacteristicUserDescriptionToCharacteristic(
//       SERVICE_UUID,
//       CS_CHAR_C2P_UUID,
//       'RX_VALUE',
//     );

//     // print descriptor
//     BLEPeripheral.printCharacteristicUserDescription(
//       SERVICE_UUID,
//       CS_CHAR_P2C_UUID,
//     );

//     BLEPeripheral.printCharacteristicUserDescription(
//       SERVICE_UUID,
//       CS_CHAR_C2P_UUID,
//     );

//     BLEPeripheral.setName('gen-key');
//     const name = await BLEPeripheral.getName();
//     console.log('Set name success:', name);

//     // Memulai perangkat sebagai Peripheral
//     console.log('Peripheral starting...');
//     await BLEPeripheral.start();
//     console.log('Peripheral started');
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     const isAdvertising = await BLEPeripheral.isAdvertising();
//     console.log('Is advertising:', isAdvertising);
//   }
// };

// const options = {
//   taskName: 'BLE Advertising',
//   taskTitle: 'BLE Advertising',
//   taskDesc: 'The app is running BLE advertising in the background.',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   parameters: {
//     delay: 1000,
//   },
// };

// // const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

// // // You can do anything in your task such as network requests, timers and so on,
// // // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// // // React Native will go into "paused" mode (unless there are other tasks running,
// // // or there is a foreground app).
// // const veryIntensiveTask = async taskDataArguments => {
// //   // Example of an infinite loop task
// //   const {delay} = taskDataArguments;
// //   await new Promise(async resolve => {
// //     for (let i = 0; BackgroundService.isRunning(); i++) {
// //       console.log(i);
// //       await sleep(delay);
// //     }
// //   });
// // };

// export default async function advertiseBLEInBackground() {
//   await BackgroundService.start(initPeripheral, options);
// }
