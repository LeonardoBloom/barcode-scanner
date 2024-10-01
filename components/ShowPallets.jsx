import { useEffect, useState } from "react"
import { Text , StyleSheet, View, TouchableOpacity, ActivityIndicator, Button} from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler"
import { RefreshControl } from "react-native"
import { useNavigation } from '@react-navigation/native';
import generateFile from '../scripts/generateDocument'
import uploadFile from '../scripts/uploadFile';
import * as FileSystem from 'expo-file-system';


export default function ShowPallets( { }) {

    const navigation = useNavigation()

    const [pallets, setPallets] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false) // refresh

    useEffect(() => {
        getPallets()
    }, [])

    const getPallets = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://192.168.50.96:5050/api/pallets/get`, {
                method: 'GET', // Use GET if you're retrieving data
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to retrieve pallets: ${errorText}`);
            }

            const data = await response.json(); // Await the json() call

            setPallets(data);
        } catch (error) {
            console.error('Error Retrieving Pallets:', error.message);
        } finally {
            setLoading(false); // Set loading to false after the fetch completes
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getPallets();
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


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView 
            style={styles.showPallets}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Text style={styles.showPalletsHeading}>Show ALL Pallets:</Text>
                <View style={styles.palletList}>
                    {loading ? <ActivityIndicator size='large'></ActivityIndicator> : (

                    pallets.map(pallet => (                        
                        <TouchableOpacity key={pallet.pallet_id} onPress={() => navigation.navigate("PalletInfo", pallet)} style={styles.touchable}>

                            <View key={pallet.pallet_id} style={styles.singlePallet}>
                                <View style={styles.palletInfo}>
                                    <View style={styles.palletSupplier}>
                                        <Text style={styles.palletSupplierText}>{pallet.supplier_name}</Text>
                                    </View>
                                    <View style={styles.palletId}>
                                        <Text style={styles.palletIdText}>Pallet #{pallet.pallet_id}</Text>
                                    </View>
                                </View>
                                <View style={styles.palletDate}>
                                    <Text style={styles.palletDateDate}>{parseDate(pallet.date_created)}</Text>
                                    <Text style={styles.palletDateTime}>{parseTime(pallet.date_created)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>                        
                    ))
                    )}
                </View>

                <Button title='Generate file' onPress={() => console.log("pressed generate file")}></Button>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create ({
    palletList: {
        // borderWidth:2,
        flexDirection: 'column-reverse',
    },
    showPallets: {
        flex: 1,
        backgroundColor: 'white',
        height: 300,
    },
    showPalletsHeading: {
        fontSize: 30,
        marginHorizontal: 'auto',
        padding: 20,
    },
    singlePallet: {
        padding: 20,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 'auto',
        marginVertical: 10,
        width: '90%',
    },
    palletInfo: {
        flex: 2,
    },
    palletSupplierText: {
        fontSize: 20,
        color: 'coralblue',
    },
    palletIdText: {
        fontSize:15,
    },
    palletDate: {
        flexDirection: 'column',
    },
    palletDateDate: {
        fontSize: 15,
    },
    palletDateTime: {
        fontSize: 15,
        marginHorizontal: 'auto',
    }
})