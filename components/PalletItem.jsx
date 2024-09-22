import { useState, useEffect } from 'react';
import { Image, Modal, Button, StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';


export default function PalletItem({ items, onUpdateItemCount, onRemove }) {

    const [qty, setQty] = useState({})


    useEffect(() => {
        const initialQuantities = items.reduce((acc, item) => {
            acc[item.id] = item.item_count || 1; // Use existing item_count or default to 1
            return acc;
        }, {});
        setQty(initialQuantities);
    }, [items]);

    // const onUpdateItemCount = (id, newCount) => {
    //     console.log(`Updated item ${id} count to: ${newCount}`);
    //     onUpdateItemCount({ ...qty, [id]: newCount }); // Notify parent of update
    // };

    const handleRemoveItem = () => {

    }

    const increaseQty = (id) => {
        setQty(prevQty => {
            const newCount = (prevQty[id] || 0) + 1;
            onUpdateItemCount(id, newCount);
            return {
                ...prevQty,
                [id]: newCount
            };
    })};
    const decreaseQty = (id) => {
        setQty(prevQty => {
            const newCount = Math.max(0, (prevQty[id] || 1) - 1);
            onUpdateItemCount(id, newCount);
            return {
                ...prevQty,
                [id]: newCount
            };
        });
    }

    return (
        <>
            <View style={styles.addedItems}>
                { items.map(item => (
                    <View style={styles.itemInfo} key={item.id}>
                        <Image 
                            source={{ uri: item.image_url}}
                            style={styles.Image}
                        />

                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.litres}</Text>
                            <Text style={styles.itemDescription}>Code: #{item.id}</Text>
                        </View>

                        <View style={styles.qty}>
                            <Text style={styles.itemQTY}>QTY: {qty[item.id]}</Text>
                            <View style={styles.qtyChange}>
                                <TouchableOpacity style={styles.button} onPress={() => increaseQty(item.id)}>
                                    <Text style={styles.qtyButton}>+</Text>
                                </TouchableOpacity>

                                <View style={styles.qtyBox}>
                                    <TextInput 
                                    style={styles.input}
                                    value={(qty[item.id] || "").toString()}
                                    onChangeText={text => {
                                            // Allow direct user input
                                            const value = text.replace(/[^0-9]/g, ''); // Allow only numbers
                                            setQty(prevQty => {
                                                const newValue = value ? parseInt(value) : ""; // Convert to number or fallback to 1
                                                onUpdateItemCount(item.id, newValue); // Update item_count
                                                return {
                                                    ...prevQty,
                                                    [item.id]: newValue
                                                };
                                            });
                                        }}
                                    placeholder={(qty[item.id] || "").toString()}
                                    placeholderTextColor= 'black'
                                    keyboardType='numeric'
                                    textAlign='right'>

                                    </TextInput>
                                </View>

                                <TouchableOpacity style={styles.button} onPress={() => decreaseQty(item.id)}>
                                    <Text style={styles.qtyButton}>-</Text>
                                </TouchableOpacity>
                            </View>
                        <Button
                        title='Remove Item'
                        onPress={() => onRemove(item.id)}>

                        </Button>
                        </View>
                    </View>
                ))
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    addedItems: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'coralblue',
    },
    qty: {
        marginLeft: 0,
    },
    itemQTY: {
        margin: 'auto',
    },
    qtyChange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBox: {
        borderWidth: 2,
        borderColor: 'black',
        width: 50,
        height: 30,
        margin: 10,
        
    },  
    input: {
        margin: 'auto',
        fontSize: 20,
        paddingHorizontal: 10,
    
    },
    qtyButton: {
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
    },
    itemInfo: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'coralblue',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    Image: {
        width: 75,
        height: 75,
        marginBottom: 20,
    }, 
})