import * as FileSystem from 'expo-file-system';

const uploadFile = async () => {
    
    const fileUri = FileSystem.documentDirectory + 'myFile.txt';
    const fileExists = await FileSystem.getInfoAsync(fileUri);
    if (!fileExists.exists) {
        console.error('File does not exist at the specified URI:', fileUri);
        return;
    }

    const formData = new FormData();

    console.log('file to upload is: ', fileUri)

    formData.append('file', {
        uri: fileUri,
        name: 'myfile.txt',
        type: 'text/plain',
    });

    try {
        console.log('uploading file...')
        const response = await fetch('http://192.168.3.215:5050/api/document/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log('File uploaded successfully', result);

    } catch (error) {
        console.error('File upload failed', error);
    }
};

export default uploadFile;