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
        // Alert.alert(`${result.item_name} at ${result.item_price}`)
        navigation.navigate("AddPalette", result)
    } catch (err) {
        Alert.alert("Sorry, we could not find the scanned item :(")
    }
}

export default fetchBarcodeData;

