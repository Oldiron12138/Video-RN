import React, {Component, useState} from "react";
import {
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions, View, Image, RefreshControl, Button, ImageBackground, TextInput, TouchableHighlight
} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Account from "./Account";
import {NavigationActions, StackActions} from "react-navigation";
import DeviceStorage from "./AsynManager";
import {CommonActions} from "@react-navigation/native";

const screenW=Dimensions.get('window').width;//获取屏幕宽度

const AccountSelectP = ({navigation}) => {
    return(
        <AccountSelect navigation = {navigation}/>
    )
}
class AccountSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alreadyLogin: false,
        };
        this.getLoginState = this.getLoginState.bind(this);

        //  this.fetchAction1 = this.fetchAction1.bind(this);
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

    refreshStatus() {

    }

    componentDidMount() {
        this.getLoginState()
    }
    render() {
        if (this.state.alreadyLogin) {
            return (
                <Account navigation = {this.props.navigation}/>
            );
        } else {
            return (
                <LoginScreen navigation = {this.props.navigation} callBack = {this.getLoginState()}/>
            );
        }
    }


}

class LoginScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            accountId: '',
            pwd:''
        };

      //  this.fetchAction1 = this.fetchAction1.bind(this);
    }

    onChangeUsername(text: string) {
        this.setState({
            accountId: text
        });
    }

    onChangePassword(text: string) {
        this.setState({
            pwd: text
        });
    }


    login() {
        console.log('zwj start login')
        let params = {'name':this.state.accountId,'pwd':this.state.pwd}
        let url = 'http://124.223.86.146:8080/QQQ/servlet/Searchall'
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        this.setState({accountId: '',coin:''});
        const init = {
            method: 'GET',

            header:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            }
            // body: JSON.stringify({
            //
            // })
        };

        fetch(url, init)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.num != null) {
                    console.log('zwj start login success')
                    DeviceStorage.save('alreadyLogin',true)
                    // let resetAction = CommonActions.reset({
                    //     index: 0,
                    //     actions: [
                    //         NavigationActions.navigate({ routeName: 'Home' }),
                    //     ]
                    // });
                   // this.props.navigation.dispatch(resetAction);
                    // this.props.navigation.dispatch(
                    //     StackActions.popToTop()
                    // );
                    this.props.callBack()
                    this.props.navigation.navigate('Home')
                } else {

                }
            })
            .catch(e => {console.log(`zwj error ${e}`)});
    }

    componentDidMount() {
       // this.fetchAction1('http://124.223.86.146:8080/QQQ/servlet/Searchall',{'name':'15940850830','pwd':'111111'})
    }

    render() {
        return (
            <ImageBackground source={{uri: "https://img2.baidu.com/it/u=2674742870,1913215722&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753"}} style={{width:'100%',height:'100%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#E1F7DDD2',marginRight:20,marginLeft:20,borderRadius:10,width:screenW-40,marginTop:30,padding:20}}>

                    <TextInput
                        style={{height: 40}}
                        placeholder="请输入账号"
                        onChangeText={(Text) => this.onChangeUsername(Text)}

                    />
                </View>

                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#E1F7DDD2',marginRight:20,marginLeft:20,borderRadius:10,width:screenW-40,marginTop:30,padding:20}}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="请输入密码"
                        password={true}
                        onChangeText={(Text) => this.onChangePassword(Text)}
                    />
                </View>

                <View style={{width:screenW,flexDirection:'row',alignItems:'center',marginTop:30,justifyContent:'space-around'}}>
                    <TouchableHighlight
                        underlayColor={'#E1F7DDD2'}
                        style={{backgroundColor:'#E1F7DDD2',borderRadius:10,padding:12}}
                        onPress={()=>this.login()}
                        activeOpacity={0.5}>
                        <Text style={{fontSize:20,color:'red'}}>{'登录'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={'#E1F7DDD2'}
                        style={{backgroundColor:'#E1F7DDD2',borderRadius:10,padding:12}}

                        activeOpacity={0.5}>
                        <Text style={{fontSize:20,color:'red'}}>{'注册'}</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        );
    }

}

export default AccountSelectP;
