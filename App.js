import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  StyleSheet,
  SectionList,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { BleManager, Characteristic } from "react-native-ble-plx";

export const manager = new BleManager();

export default App = () => {
  const [test, setTest] = useState([]);

  function scanAndConnect() {
    console.log("Scan");
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        return;
      }

      /*
        if (device.name !== null){
          
          console.log(device.serviceUUIDs)
          if (test=== device.name){
            console.log("wiederholung")
            
          }
          else{
            setTest(test => test.concat(device.name))
          }
        }
        setTimeout (() => {
          manager.stopDeviceScan();
        }, 5000)
      */

      if (device.name === "DSD TECH" || device.name === "SensorTag") {
        console.log("Connecting to DSD TECH");
        console.log("UUID");
        console.log(device.serviceUUIDs);
        console.log(device.id);
        console.log(device.readCharacteristicForService);
        manager.stopDeviceScan();
        device
          .connect()
          .then((device) => {
            console.log("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            console.log("Setting notifications");

            let characteristics = [];

            // first, get all the services advertised by the device
            device.services().then((services) => {
              const characteristics = [];

              // second, get the characteristics for each service
              services.forEach((service, i) => {
                service.characteristics().then((c) => {
                  characteristics.push(c);

                  if (i === services.length - 1) {
                    /**
                     *  Here we log an array of arrays so you can cherrypick UUID's
                     *  as well as info on how they can be used.
                     *
                     *  You should figure out which characteristics you need,
                     *  and grab the serviceUUID and characteristicUUID, saving them
                     *  as constants to use later when reading/writing/monitoring.
                     *
                     *  Once you have constants set up, you can scrap this and
                     *  just use the device or BleManager after connecting.
                     */

                    console.log(characteristics);
                  }
                });
              });
            });
          })
          .then(
            () => {
              console.log("Listening...");
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text>Bluetooth Low Energy2</Text>
      <Text></Text>
      <Button mode="contained" onPress={scanAndConnect}>
        Load Devices
      </Button>
      <Text></Text>
      <FlatList data={test} renderItem={({ item }) => <Text> {item} </Text>} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
