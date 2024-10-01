import { useNavigation } from "@react-navigation/native"
import { useEffect, useState, Component } from "react"
import { Text , StyleSheet, View, TouchableOpacity, RefreshControl, ActivityIndicator} from "react-native"
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler"
import { Table, Row, Rows } from 'react-native-table-component';
import generateFile from '../scripts/generateDocument';


export default function PalletInfo( { route }) {

    // const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState([])

    const [tableHead] = useState(['Item', 'Qty', 'Count']);
    const [tableData, setTableData] = useState([
        // [item_name, item_quantity, item_count],
        // [item_name, item_quantity, item_count],
    ]);

    
    useEffect(() => {
        getPalletInfo()
    }, []);

    const fillTable = (data) => {
        let tableInfo = []
        for(let x = 0; x < data.length; x ++) {
            tableInfo.push([data[x].item_name, data[x].item_quantity, data[x].item_count])
        }
        console.log(tableInfo)
        setTableData(tableInfo)
    }

    let pallet = route.params || {}
    // pallet_id
    // supplier_name
    // date_created
    
    const getPalletInfo = async() => {
        console.log("The pallet: ", pallet)
        try {
            const response = await fetch(`http://192.168.50.96:5050/api/pallets/get/${pallet.pallet_id}`, {
                method: 'GET',
            })

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to retrieve Pallet Items: ${errorText}`);
            }

            const data = await response.json()
            setItem(data)
            fillTable(data)
            console.log("items: ", item)
            
        } catch (error) {
            console.error('Error retrieving pallet items: ', error.message)
        } finally {
            setLoading(false);
        }
    }


    const handleGenerateFile = async () => { 
        
        const pallet_and_item_to_JSON = {
            pallet_id: pallet.pallet_id,
            date_created: pallet.date_created,
            supplier_name: pallet.supplier_name,
            items: item
        }    

        await generateFile(pallet_and_item_to_JSON);

    }


    return (
        <>
        <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView 
            style={styles.showPalletInfo}>
                {/* <Text style={styles.showPalletsHeading}>Pallet Details:</Text> */}
                <View style={styles.palletHeader}>
                    <Text style={styles.palletNumber}>
                        Pallet #{pallet.pallet_id}
                    </Text>
                    <Text style={styles.palletSupplier}>
                        Supplied by: {pallet.supplier_name}
                    </Text >
                    <Text style={styles.palletDateTime}>
                        On {parseDate(pallet.date_created)} at {parseTime(pallet.date_created)}
                    </Text>
                </View>

                <Text style={styles.loadingIcon}>
                    {loading && <ActivityIndicator size='large'></ActivityIndicator> }
                </Text>
                <View style={styles.tableContainer}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableHeadText} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </View>
                <View>
                    <TouchableOpacity style={styles.generateButton} onPress={handleGenerateFile}>
                        <Text style={styles.generateButtonText}>Generate Document</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </GestureHandlerRootView>
        </>
    )
}

const parseDate = (jsonDate) => {
    const dateObject = new Date(jsonDate);

    const date = dateObject.toLocaleDateString();
    return date
}

const parseTime = (jsonTime) => {
    const timeObject = new Date(jsonTime);

    const time = timeObject.toLocaleTimeString();
    return time
}

const styles = StyleSheet.create( {
    generateButton: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'coral',
        marginHorizontal: 'auto',
        marginTop: 50,
        padding: 20,
    },
    generateButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    tableHeadText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 15,
    },
    loadingIcon: {
        marginHorizontal: 'auto',
        marginTop: 100,
        fontSize: 20,
    },
    showPalletInfo: {
        backgroundColor: 'white',
    },
    showPalletsHeading: {
        fontSize: 25,
        marginHorizontal: 'auto',
        marginVertical: 20,
    },
    palletHeader: {
        marginHorizontal: 'auto',
        marginTop: 20,
    },
    palletNumber: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    palletSupplier: {
        textAlign: 'center',
        fontSize: 15,
    },
    palletDateTime: {
        textAlign: 'center',
        fontSize: 15,
    },
})