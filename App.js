import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Splash from "./app/main/Splash";
import MoviesScreen from "./app/main/MoviesScreen";
import PlayerScreen from "./app/main/PlayerScreen";
import LoginScreen from "./app/main/LoginScreen";
import TabNavi from "./app/main/TabNavi";
import InfoDetailScreen from "./app/main/InfoDetailScreen";
import Account from "./app/main/Account";
import DeviceStorage from "./app/main/AsynManager";
const Stack = createNativeStackNavigator();
function App() {
    console.log('zwjAAA' +DeviceStorage.get('alreadyLogin'))
    return (
        <NavigationContainer fullscreen={true}>
            <StatusBar backgroundColor="#ff0000"
                       translucent={true}
                       hidden={true}
                       animated={true}/>
            <Stack.Navigator  initialRouteName="TabNavi">
                <Stack.Screen name="TabNavi" component={TabNavi} options={{headerShown:false,fullscreen:true}}/>
                <Stack.Screen name="Player" component={PlayerScreen} options={{headerShown:true,hideBackButton:false}}/>
                <Stack.Screen name="MoviesScreen" component={MoviesScreen} options={{headerShown:false,fullscreen:true}}/>
                <Stack.Screen name="Detail" component={InfoDetailScreen} options={{headerShown:false,fullscreen:true}}/>
                <Stack.Screen name="Account" component={Account} options={{headerShown:false,fullscreen:true}}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;