import React, { useState } from 'react';
import { Text,ActivityIndicator, Alert, Button, StyleSheet, View, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import { Camera, CameraView, useCameraPermissions} from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
 // Import the CameraType enum
 import { useNavigation } from '@react-navigation/native';
//  import './api/fetchBarcodeData'


export default function BarcodeScanner( {}) {

  const [cameraType, setCameraType] = useState(CameraType.back); // Initialize with CameraType.back
  const [permission, requestPermission] = useCameraPermissions();
  const [barcodeScanned, setBarcodeScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const navigation = useNavigation();

  if(!permission) {
    return <View />
  }
  if (!permission.granted) {

    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    )
  }

  function handleBarcode(scanningResult) {
    
  
    if (barcodeScanned) {
      setBarcodeScanned(false)
      // Alert.alert(`Scanned ${scanningResult.type} of ${scanningResult.data} on ${currentDate}`)
      
      //compare with db
      
      fetchBarcodeData(scanningResult.data)
      setLoading(true);


    }
  }


  const fetchBarcodeData = async (number) => {
    try {
      const response = await fetch(
        `http://192.168.17.103:5050/api/items/${number}`,
        {
          method: 'GET'
        }
      );
      const data = await response.json()
      const result = data[0]
      console.log('this is result', result)
      if (!result) {
        throw err;
      }
      // Alert.alert(`${result.item_name} at ${result.item_price}`)
      navigation.navigate("AddPalette", result)
      } catch (err) {
        Alert.alert("Sorry, we could not find the scanned item :(")
    }
    }


  // Function to toggle between front and back camera
  const toggleCameraType = () => {
    setCameraType(currentType => 
      currentType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={styles.container}>
    <Text>
      {loading & <ActivityIndicator />}

    </Text>
      <CameraView 
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", 'aztec' , 'ean13' , 'ean8', 'pdf417' , 'upc_e' , 'datamatrix' , 'code39' , 'code93' , 'itf14' , 'codabar', 'upc_a'],
        }}
        onBarcodeScanned={handleBarcode}
        
        enableTorch={true}
        style={styles.camera} 
        facing={cameraType} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setBarcodeScanned(true)}>
              <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  message: {
    textAlign: 'center',
  },
  camera: {
    flex: 3,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    

  },
  button: {
    alignItems: 'center',
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: '#0060fd',
    // height: 100,
    // width: 200,
    paddingHorizontal: 100,
    paddingVertical: 50,
    margin: 'auto',
    borderRadius: 10,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 50,
    color: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});