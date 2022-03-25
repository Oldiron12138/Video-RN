import React, {Component} from "react";
import {
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions, View, Image, RefreshControl, Button, ImageBackground, DeviceEventEmitter
} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DeviceStorage from "./AsynManager";

const screenW=Dimensions.get('window').width;//获取屏幕宽度
export default class Account extends Component{
    listener=null;
    constructor(props) {
        super(props);
        this.state = {
            accountId: '',
            coin:''
        };

        this.fetchAction = this.fetchAction.bind(this);
    }

    fetchAction(url,params) {

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
                this.setState({accountId: `${responseJson.name}`});
                this.setState({coin: `${responseJson.coin}`});
            })
            .catch(e => {console.log(`zwj error ${e}`)});
    }

    componentDidMount() {
        this.getAccountId()
        this.listener = DeviceEventEmitter.addListener('refreshAccount', (refresh) => {
            this.getAccountId()
        });
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    render() {

        return (

            <ImageBackground source={{uri: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpad.mydrivers.com%2Fimg%2F20210415%2Ff6e89ace-c558-46a6-8b58-b511c2d90ba7.jpg&refer=http%3A%2F%2Fpad.mydrivers.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650528261&t=ef988df7b98e48ae7084ab34cf273816"}} style={{width:'100%',height:'100%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#E1F7DDD2',marginRight:20,marginLeft:20,borderRadius:10,width:screenW-40,marginTop:30,padding:20}}>

                    <Text style={{fontSize:30,fontWeight:'bold'}}>
                       {"账号:   "}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {this.state.accountId?this.state.accountId : "Empty"}
                        </Text>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#E1F7DDD2',marginRight:20,marginLeft:20,borderRadius:10,width:screenW-40,marginTop:30,padding:20}}>
                    <Text style={{fontSize:30,fontWeight:'bold'}}>
                        {"金币:   "}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {this.state.coin?this.state.coin : "Empty"}
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    getAccountId() {
        DeviceStorage.get('accountName').then((value) => {
                this.setAccountId(value)
            console.log("zwjAccountTest"+ value)
                DeviceStorage.get('accountPwd').then((value) => {
                        this.setAccountPwd(value)
                    console.log("zwjAccountTest"+ value)
                    this.fetchAction('http://124.223.86.146:8080/QQQ/servlet/Searchall',{'name':this.state.accountId,'pwd':this.state.pwd})
                    }
                )
            }
        )
    }

    setAccountId(text) {
        this.setState({
            accountId: text
        });
    }

    setAccountPwd(text) {
        this.setState({
            pwd: text
        });
    }


}
