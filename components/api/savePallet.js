

export default savePallet = async (items) => {
    try {
        const response = await fetch(
            `http://192.168.17.103:5050/api/pallets/save`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(items)
            })
            if (!response.ok) {
                throw new Error ('failed to send items')
            }
            const data = await response.json();
            
            console.log('Items sent successfully', data);
            return data;
        
    } catch (error) {
        console.error('Error Saving Pallet with items: ', error);
        throw error;
    }
}