// import React, { useState } from 'react';
// import { Alert, Button, StyleSheet, View, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
// import { Text, Camera, CameraView, useCameraPermissions} from 'expo-camera';
// import { CameraType } from 'expo-camera/build/legacy/Camera.types';
//  // Import the CameraType enum

// export default function BarcodeScanner() {
//   const [cameraType, setCameraType] = useState(CameraType.back); // Initialize with CameraType.back
//   const [permission, requestPermission] = useCameraPermissions();
//   const [barcodeScanned, setBarcodeScanned] = useState('false');

//   if(!permission) {
//     return <View />
//   }
//   if (!permission.granted) {

//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     )
//   }

//   function handleBarcode(scanningResult) {
    
//     if (barcodeScanned) {
//       setBarcodeScanned(false)
//       Alert.alert(`Scanned ${scanningResult.type} of ${scanningResult.data}`)
//     }
//   }

//   // Function to toggle between front and back camera
//   const toggleCameraType = () => {
//     setCameraType(currentType => 
//       currentType === CameraType.back ? CameraType.front : CameraType.back
//     );
    
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView 
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr", "code128", 'aztec' , 'ean13' , 'ean8', 'pdf417' , 'upc_e' , 'datamatrix' , 'code39' , 'code93' , 'itf14' , 'codabar', 'upc_a'],
//         }}
//         onBarcodeScanned={handleBarcode}
        
//         enableTorch={true}
//         style={styles.camera} 
//         facing={cameraType} 
//       />
//       <View style={styles.buttonContainer}>
//         <Pressable 
//           style={styles.button}
//           onPress={() => setBarcodeScanned(true)}>
//               <Button style={styles.buttonText} title="Scan"/>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//   },
//   camera: {
//     flex: 3,
//   },
//   buttonContainer: {
//     flex: 2,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     alignSelf: 'center',
    
//     margin: '0 auto',
//   },
//   button: {
//     alignItems: 'center',
//     // alignSelf: 'flex-end',
//     // alignItems: 'center',
//     borderColor: 'black',
//     borderStyle: 'solid',
//     backgroundColor: 'lightblue',
//     // height: 100,
//     // width: 200,
//     paddingHorizontal: 100,
//     paddingVertical: 50,
//     margin: 'auto',
//     borderRadius: 10,
//     fontSize: 20,
//   },
//   buttonText: {
//     fontSize: 30,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });