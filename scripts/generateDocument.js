import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const generateFile = async (palletInformation) => {
    console.log('generateFile called.')
    const data = 'This is the content of the file';
    const fileUri = FileSystem.documentDirectory + 'myFile.txt'

    await FileSystem.writeAsStringAsync(fileUri, data);
    console.log("file generated at: ", fileUri)

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'myFile.txt',
      type: 'text/plain',
    });

    // Step 3: Upload the file
    try {
      const response = await fetch('http://192.168.3.215:5050/api/document/upload', {
        method: 'POST',
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