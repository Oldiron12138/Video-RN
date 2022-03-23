/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {
    Image, ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Dimensions,
    PixelRatio,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CKFlatList from "./ListTest";

const Main = ({navigation}) => {
    return (
        <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <StatusBar backgroundColor="#ff0000"
                       translucent={true}
                       hidden={true}
                       animated={true}/>
            <TitleBar>
            </TitleBar>
            <CKFlatList navigation = {navigation}/>
        </View>

    );
}

const TitleBar = () => {
    return (
        <View style={{width:Dimensions.get("window").width,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:40,marginBottom:10}}>
            <Text style={[styles.titleBarStyle,{marginLeft:10}]}>
                {"当前城市"}
            </Text>

            <Text style={{color:'black',fontSize:20}}>
                {"北京"}
            </Text>

            <Text style={[styles.titleBarStyle,{marginRight:10}]}>
                {"其他城市"}
            </Text>
        </View>
    );
}

const CardView = ({children}) => {
    return (
        <View style={[styles.cardViewStyle,{flexDirection:"row",alignItems:'center'}]}>
            <Image source={{uri: "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/s=220/sign=b1889182d01b0ef468e89f5cedc551a1/cefc1e178a82b9015fda1a9f718da9773912ef23.jpg"}}
                   style={{width:200, height: 100, flex:1,resizeMode:'stretch'}}
            />
            <Text numberOfLines={3} style={{flex:1}}>
                {children}
            </Text>

            <ImageBackground
                style={{width: 30, height: 100, backgroundColor: 'transparent',alignContent:'center',flex:1,resizeMode:'stretch'}}
                imageStyle={{resizeMode:'stretch'}}
                source={{uri: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/s=220/sign=b1889182d01b0ef468e89f5cedc551a1/cefc1e178a82b9015fda1a9f718da9773912ef23.jpg'}}
            >
                <Text style={{color:'blue',fontSize:20,textAlign:'center'}}>
                    React
                </Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    cardViewStyle: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 4,
        marginTop: 40,
        backgroundColor: 'red',
        elevation: 20,
        width: '30%'
    },
    textStyle: {fontSize: 20.0, textAlign: 'right', fontStyle: 'italic', color: 'blue'},
    titleBarStyle:{
        fontSize:15,
        color:"#36AA90",

    }
})

export default Main;
