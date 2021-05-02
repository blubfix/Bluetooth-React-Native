import { StatusBar } from "expo-status-bar";
import React, {Component, useState} from "react";
import { StyleSheet, SectionList, Text, TextInput, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { BleManager} from 'react-native-ble-plx';

export const manager = new BleManager();


export default App =() => {

  const [test, setTest] = useState([]);
  

  function scanAndConnect() {
    console.log("Scan")
    manager.startDeviceScan(null, null, (error, device) => {
      
  
        if (error) {
            // Handle error (scanning will be stopped automatically)
            return
        }
  
        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        //console.log(device.name)
        if (device.name !== null){
          //console.log(device.name)
          //setTest(device.name)
          //console.log(test.length)
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
        
        //console.log(test)
        //console.log(this.devices)
       
    });
  }

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>Bluetooth Low Energy2</Text>
      <Text></Text>
      <Button mode="contained" onPress={scanAndConnect}>
        Load Devices
      </Button>
      <Text></Text>
      <FlatList data= {test}
      renderItem={({item}) => <Text> {item} </Text>}/>  

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});