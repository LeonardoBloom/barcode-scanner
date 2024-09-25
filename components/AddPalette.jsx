import { useState, useEffect } from 'react';
import { Image, Modal, Button, StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
// import Logo from './../assets/images/partial-react-logo.png'
import { useNavigation } from '@react-navigation/native';
import PalletItem from './PalletItem';
// import { savePallet } from './api/savePallet'
import { FlatList } from 'react-native-gesture-handler';

export default function AddPalette( { route }) {
    const navigation = useNavigation()
    const currentDate = new Date().toLocaleDateString();

    let result = route.params || {};
    const [count, setCount] = useState(1);
    const [newData, setNewData] = useState({})

    const [supplier, setsupplier] = useState('')
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState({})

    const addItems = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem])
    } 

    // if(items.includes(result.item_id)) {
    //         Alert.alert("This item has already been scanned, please modify quantities")
    //         navigation.navigate("AddItem")
    //     }

    useEffect(() => {
        if (result.item_name) {
            const itemExists = items.some(item => item.id === result.item_id);
        
            if (!itemExists) {
            addItems({
            id: result.item_id,
            name: result.item_name,
            price: result.item_price,
            litres: result.item_quantity,
            image_url: result.item_image,
            item_count: 1,
            });
              setCount((prevCount) => prevCount + 1); // Increment the count for the next item
            } else {
            Alert.alert("Item already added", `${result.item_name} is already in your list.`);
            }
        }
        console.log(items);
        console.log("# of items: ", count);
      }, [result.item_id, result.item_price, result.item_name, result.item_image]); // Dependency array to trigger effect when cakeName or cakePrice changes
    



    const validateForm = () => {
        let errors = {}

        console.log(items.length);
        if (!supplier) errors.supplier = "Please name the Supplier";
        if (items.length < 1) errors.items = "No items added in pallet";
        
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const updateItemCount = (id, newCount) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, item_count: newCount } : item
            )
        );
    };

    const removeItem = (id) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    // Save Pallet into the DB
    const savePallet = async (items, supplier) => {
        const requestBody = {
            supplier: supplier,
            items: items,
        };
        try {
            const response = await fetch(
                `http://192.168.48.132:5050/api/pallets/save`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error (`failed to send items: ${errorText}`)
                }
                const data = await response.json();
                
                console.log('Items sent successfully', data);
                return data;
            
        } catch (error) {
            console.error('Error Saving Pallet with items: ', error.message);
            throw error;
        }
    }

    const handleSubmit = () => {
        if(validateForm()) {
            console.log(`Submitted ${supplier} on ${currentDate}\n`);
            console.log(`\nWith items: `)
            items.map(item => {
                console.log(item.item_count, " x ", item.name)
            });

            console.log("sending: ", JSON.stringify(items))
            
            // go do POST request to save Pallet
            savePallet(items, supplier)
            Alert.alert(`Saved Pallet from ${supplier} on ${currentDate}`);
            setItems([])
            setsupplier("")
            console.log(`Saved pallet from "${supplier}" on ${currentDate}`);
            // setPaletteName("");
            

            setErrors({})
        }
    }

    const [modalVisible, setModalVisible] = useState(false);

    const handleYes = () => {
        console.log("User chose Yes");
        setModalVisible(false);
    };

    const handleNo = () => {
        console.log("User chose No");
        setModalVisible(false);
    };

    return (
        
        <KeyboardAvoidingView behavior='padding' style={styles.container}>

                            {/* <Button title="Make a Decision" onPress={() => setModalVisible(true)} />
                                
                                <Modal
                                    transparent={true}
                                    animationType="fade"
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(false)}
                                >
                                    <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        
                                        <Image
                                        source={{uri: 'https://preppykitchen.com/wp-content/uploads/2022/07/Red-Velvet-Recipe-Card-1a.jpg'}} // Replace with your image
                                        style={styles.image}
                                        />
                                        
                                        <Text style={styles.modalText}>Do you want to proceed?</Text>
                                        
                                        <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={handleNo}>
                                            <Text style={styles.buttonText}>No</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.button} onPress={handleYes}>
                                            <Text style={styles.buttonText}>Yes</Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                    </View>
                                </Modal> */}

            <ScrollView style={styles.form}>

                <Text style={styles.labels}>
                    Supplier Name:
                </Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Supplier Name" 
                    placeholderTextColor={'gray'}
                    value={supplier} 
                    onChangeText={setsupplier}
                    // autoCorrect={true}
                    autoCapitalize="characters"
                />
                {
                    errors.supplier ? <Text style={styles.errorText}>{errors.supplier}</Text> : null
                }
                <Text style={styles.text}>{supplier}</Text>
                        {
                            errors.items ? <Text style={styles.errorText}>{errors.items}</Text> : null
                        }
                
                
                        <PalletItem
                            keyExtractor={item=>item.id}
                            items={items} 
                            onUpdateItemCount={updateItemCount}
                            onRemove={removeItem}
                        />

                <Button title="+ Add Item"
                    onPress={() => navigation.navigate("AddItem", 
                        {name: "james"})}
                    />

                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText} >Save Pallet</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create ({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%', // Adjust width as needed
      },
      image: {
        width: 100,
        height: 100,
        marginBottom: 20, // Spacing between image and text
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        flex: 1, // Equal width for both buttons
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        // paddingTop: StatusBar.currentHeight,
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5, 
        backgroundColor: 'lightblue',
    },
    text: {
        fontSize: 30,
        padding: 10,
    },
    labels: {
        fontSize: 20,
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },

    itemInfo: {
        flexDirection: 'row',
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
    saveButton: {
        marginHorizontal: 'auto',
        marginTop: 20,
        backgroundColor: 'coral',
        paddingHorizontal: 50,
        paddingVertical:10,
        fontSize: 20,
        borderRadius: 10,
    },
    saveButtonText: {
        fontSize: 30,
        color: 'white',
    }
})