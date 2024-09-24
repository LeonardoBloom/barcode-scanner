import { useNavigation } from "@react-navigation/native"
import { useEffect, useState, Component } from "react"
import { Text , StyleSheet, View, TouchableOpacity, RefreshControl, ActivityIndicator} from "react-native"
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler"
import { Table, Row, Rows } from 'react-native-table-component';


export default function PalletInfo( { route }) {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)

    const [tableHead] = useState(['Head', 'Head2', 'Head3', 'Head4']);
    const [tableData] = useState([
        ['Head', 'Head2', 'Head3', 'Head4'],
        ['Head', 'Head2', 'Head3', 'Head4'],
        ['Head', 'Head2', 'Head3', 'Head4'],
        ['Head', 'Head2', 'Head3', 'Head4'],
    ]);

    let pallet = route.params || {}
    // pallet_id
    // supplier_name
    // date_created

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
                    {loading && <ActivityIndicator size='large'></ActivityIndicator>}
                </Text>
            </ScrollView>
            </GestureHandlerRootView>
        </>
    )
}


const styles = StyleSheet.create( {
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