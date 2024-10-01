import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const generateFile = async (pallet) => {
    console.log('generateFile called.')
    const data = pallet;
    const fileUri = FileSystem.documentDirectory + `pallet${data.pallet_id}.json`

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify( data, null, '\t' ) );
    console.log("file generated at: ", fileUri)

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri.startsWith('file://') ? fileUri.replace('file://', '') : fileUri, // Ensure correct URI format
      name: `pallet${pallet.pallet_id}.json`,
      type: 'application/json',
    });

    formData.append('pallet_id', pallet.pallet_id)

    console.log("form data: ", formData)

    // Step 3: Upload the file
    try {
      const response = await fetch('http://192.168.50.96:5050/api/document/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        } ,
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'File uploaded successfully');
        console.log(result);
      } else {
        Alert.alert('Error', result.error || 'File upload failed');
        console.error('File upload failed:', result.error);
      }
    } catch (error) {
      console.error('File upload failed:', error);
      Alert.alert('Error', 'File upload failed: ' + error.message);
    }
  };


export default generateFile;