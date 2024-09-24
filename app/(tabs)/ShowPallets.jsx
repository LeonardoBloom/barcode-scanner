import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowPallets from '../../components/ShowPallets';
import PalletInfo from '../../components/PalletInfo';

const Stack = createNativeStackNavigator();

export default function PalletScreen() {
    return (

        <>
            <Stack.Navigator initialRouteName='ShowPallets'>
                <Stack.Screen name='ShowPallets' component={ShowPallets} />
                <Stack.Screen name='PalletInfo' component={PalletInfo} />

            </Stack.Navigator>
        </>

    )
}