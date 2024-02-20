/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BLEPeripheral from 'react-native-ble-peripheral';
import BackgroundService from 'react-native-background-actions';

const SERVICE_UUID = 'E093F3B5-00A3-A9E5-9ECA-40016E0EDC24';
const CS_CHAR_P2C_UUID = 'E093F3B5-00A3-A9E5-9ECA-40026E0EDC24';
const CS_CHAR_C2P_UUID = 'E093F3B5-00A3-A9E5-9ECA-40036E0EDC24';

const initPeripheral = async () => {
  try {
    // Definisi UUID untuk layanan dan karakteristik
    // const SERVICE_UUID = '24DC0E6E-0140-CA9E-E5A9-A300B5F393E0';
    // const CS_SVC_UUID = '24DC0E6E-0140-CA9E-E5A9-A300B5F393E0';
    // const CHARACTERISTIC_TX_UUID = '24DC0E6E-0340-CA9E-E5A9-A300B5F393E0';
    // const CHARACTERISTIC_RX_UUID = '24DC0E6E-0240-CA9E-E5A9-A300B5F393E0';
    // const CHARACTERISTIC_TX_LONG_UUID = '24DC0E6E-0440-CA9E-E5A9-A300B5F393E0';

    // const CHARACTERISTIC_RX_LONG_UUID = '24DC0E6E-0540-CA9E-E5A9-A300B5F393E0';
    // const CS_CHAR_P2C_UUID = '24DC0E6E-0240-CA9E-E5A9-A300B5F393E0';
    // const CS_CHAR_C2P_UUID = '24DC0E6E-0340-CA9E-E5A9-A300B5F393E0';

    // Menambahkan layanan
    BLEPeripheral.addService(SERVICE_UUID, true);
    console.log('Service added successfully');

    // BLEPeripheral.addCharacteristicToService(
    //   SERVICE_UUID,
    //   CHARACTERISTIC_TX_UUID,
    //   16,
    //   1,
    // );

    // BLEPeripheral.addCharacteristicToService(
    //   SERVICE_UUID,
    //   CHARACTERISTIC_RX_UUID,
    //   16,
    //   1,
    // );

    // BLEPeripheral.addCharacteristicToService(
    //   SERVICE_UUID,
    //   CHARACTERISTIC_TX_LONG_UUID,
    //   16,
    //   1,
    // );

    // BLEPeripheral.addCharacteristicToService(
    //   SERVICE_UUID,
    //   CHARACTERISTIC_RX_LONG_UUID,
    //   16,
    //   1,
    // );

    BLEPeripheral.addCharacteristicToService(
      SERVICE_UUID,
      CS_CHAR_P2C_UUID,
      1 | 16,
      16 | 32,
    );

    BLEPeripheral.addCharacteristicToService(
      SERVICE_UUID,
      CS_CHAR_C2P_UUID,
      1 | 16,
      2 | 4 | 8,
    );

    // BLEPeripheral.addDescriptorToCharacteristic(
    //   SERVICE_UUID,
    //   CS_CHAR_P2C_UUID,
    //   '00000000-0000-0000-0000-000000002902',
    //   1 | 16,
    // );

    BLEPeripheral.addCCCDToCharacteristic(SERVICE_UUID, CS_CHAR_P2C_UUID);
    BLEPeripheral.addCCCDToCharacteristic(SERVICE_UUID, CS_CHAR_C2P_UUID);

    BLEPeripheral.addCharacteristicUserDescriptionToCharacteristic(
      SERVICE_UUID,
      CS_CHAR_P2C_UUID,
      'TX_VALUE',
    );
    BLEPeripheral.addCharacteristicUserDescriptionToCharacteristic(
      SERVICE_UUID,
      CS_CHAR_C2P_UUID,
      'RX_VALUE',
    );

    // print descriptor
    BLEPeripheral.printCharacteristicUserDescription(
      SERVICE_UUID,
      CS_CHAR_P2C_UUID,
    );

    BLEPeripheral.printCharacteristicUserDescription(
      SERVICE_UUID,
      CS_CHAR_C2P_UUID,
    );

    BLEPeripheral.setName('gen-keyless');
    const name = await BLEPeripheral.getName();
    console.log('Set name success:', name);

    // Memulai perangkat sebagai Peripheral
    console.log('Peripheral starting...');
    const response = await BLEPeripheral.start();
    console.log('Response BLE: ', response);
    console.log('Peripheral started');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    const isAdvertising = await BLEPeripheral.isAdvertising();
    console.log('Is advertising:', isAdvertising);
  }
};

const sendNotification = () => {
  // send notification
  BLEPeripheral.sendNotificationToDevices(
    SERVICE_UUID,
    CS_CHAR_P2C_UUID,
    [
      0x0b, 0x5e, 0xa6, 0x7e, 0x3e, 0x08, 0x41, 0x05, 0xe7, 0x1d, 0xe7, 0xfb,
      0xe1, 0x10, 0xf2, 0x28,
    ],
  );

  console.log('Notification Sent');
};

const options = {
  taskName: 'BLE Advertising',
  taskTitle: 'BLE Advertising',
  taskDesc: 'The app is running BLE advertising in the background.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};

const App = () => {
  let playing = BackgroundService.isRunning();
  console.log(playing);

  /**
   * Toggles the background task
   */
  const toggleBackground = async () => {
    const sleep = (time: number) =>
      new Promise<void>(resolve => setTimeout(() => resolve(), time));

    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    const veryIntensiveTask = async (taskDataArguments: any) => {
      // Example of an infinite loop task
      // const {delay} = taskDataArguments;
      await new Promise(async () => {
        // for (let i = 0; BackgroundService.isRunning(); i++) {
        //   console.log(i);
        //   await sleep(delay);
        // }
        await initPeripheral();
      });
    };

    playing = !playing;
    if (playing) {
      try {
        console.log('Trying to start background service');
        await BackgroundService.start(veryIntensiveTask, options);
        console.log(playing);
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundService.stop();
    }
  };

  // useEffect(() => {
  //   initPeripheral();
  //   return () => BLEPeripheral.stop();
  // }, []);

  return (
    <View style={styles.ViewStyle}>
      <Text>BLE Peripheral Example</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonBlue]}
        onPress={sendNotification}>
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonRed]}
        onPress={toggleBackground}>
        <Text style={styles.buttonText}>Start in background</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonBlue: {
    backgroundColor: 'blue',
  },
  buttonRed: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
