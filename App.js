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
        const services = device.services();
        console.log("Services:", services);
        const characteristics = services[1].characteristics();
        console.log("Characteristics:", characteristics);

        console.log("characteristics for service");
        console.log(device.characteristicsForService(device.serviceUUIDs));

        manager.stopDeviceScan();
        device
          .connect()
          .then((device) => {
            console.log("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            console.log("Setting notifications");
            device
              .writeCharacteristicWithResponseForService(
                device.serviceUUIDs,
                "34cd",
                "aGVsbG8gbWlzcyB0YXBweQ=="
              )
              .then((characteristic) => {
                console.log(characteristic.value);
                return;
              });
            //return this.setupNotifications(device)
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

      //console.log(test)
      //console.log(this.devices)
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
