import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesScreen from "./MoviesScreen";
import InfoScreen from "./InfoScreen";
import PlayerScreen from "./PlayerScreen";
import Account from "./Account";
import LoginScreen from "./LoginScreen";
import DeviceStorage from "./AsynManager";
import {Component} from "react";
import AccountSelect from "./LoginScreen";
import AccountSelectP from "./LoginScreen";

const Tab = createBottomTabNavigator();

class TabNa extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alreadyLogin: false,
        };
        this.getLoginState = this.getLoginState.bind(this);
    }

    getLoginState() {
        DeviceStorage.get('alreadyLogin').then((value) => {
            const jsonValue = JSON.parse(value);
            console.log("zwjstore"+ jsonValue)
            this.setState({
                alreadyLogin: value
            });
        })
        // console.log('zwjMMMM' +(DeviceStorage.get('alreadyLogin') == 'null') )
        // this.setState({
        //     alreadyLogin: DeviceStorage.get('alreadyLogin')
        // });
    }

    componentDidMount() {
        this.getLoginState()
    }

    render() {
        return (
            <Tab.Navigator
                style={{alpha:0.5}}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-film'
                                : 'ios-film-outline';
                        } else if (route.name === 'Info') {
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }else if (route.name === 'Account') {
                            iconName = focused ? 'ios-person' : 'ios-person-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}>

                <Tab.Screen name='Home' component={MoviesScreen} options={{statusBarHidden:true ,headerShown:false}}/>
                <Tab.Screen name='Info' component={InfoScreen} options={{ statusBarHidden:true ,headerShown:false}}/>
                <Tab.Screen name='Account' component={AccountSelectP} options={{statusBarHidden:true,headerShown:false }}/>
            </Tab.Navigator>
        )
    }
}

const TabNavi =({navigation}) => {
    return(
        <TabNa navigation = {navigation}/>
    );
}
const LoginS = ({navigation}) => {
    return (
        <LoginScreen navigation = {navigation}/>
    )

}

export default TabNavi;