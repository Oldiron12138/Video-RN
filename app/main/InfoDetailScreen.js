import React, {Component} from 'react';
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
import MyViewPager from "./ImagePager";
const screenW=Dimensions.get('window').width;//获取屏幕宽度

const InfoDetailScreen = ({navigation, route}) => {
    const { params } = route.params;
    console.log("zwj " + params.city.url)
    return (
        <InfoDetail itemList = {params.city}/>
    );
}

class InfoDetail extends Component {
    static defaultProps={

        itemList: 'XiaoHong'

    }
    constructor(props){
        super(props);


        //模拟数据源
        this.state={
        }
    }

    render() {
        console.log("zwj list size" + this.props.itemList.url.length)
        return (
            <View style={{flexDirection : 'column',width:'100%',height:'100%',alignItems:'center'}}>
                <Image source={{uri: "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/s=220/sign=b1889182d01b0ef468e89f5cedc551a1/cefc1e178a82b9015fda1a9f718da9773912ef23.jpg"}}></Image>

                <MyViewPager  item = {this.props.itemList.url}/>
                <View style={{width:'100%',height:3,backgroundColor:'black'}}></View>

                <View style={{marginLeft:40,width:'100%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            {this.props.itemList.title}
                        </Text>


                    </View>

                    <ItemContent content={this.props.itemList.city} title={'城市：'}></ItemContent>
                    <ItemContent content={this.props.itemList.street} title={'街道：'}></ItemContent>
                    <ItemContent content={this.props.itemList.price} title={'消费：'}></ItemContent>
                    <ItemContent content={this.props.itemList.phone} title={'微信：'}></ItemContent>
                    <ItemContent content={this.props.itemList.desc} title={'描述：'}></ItemContent>
                </View>

            </View>
        )
    }
}

function ItemContent ({title,content}) {
    return (
        <View style={{width:screenW - 120,flexDirection:'row', justifyContent: 'flex-start',marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20}}>
                {title}
            </Text>
            <Text style={{fontSize:20}}>
                {content}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleView : {
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#E1F7DD'
    },
    titleText:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        fontSize:30,
        fontWeight:'bold',

    },
    itemContentStyle:{
        fontSize:12,
        marginLeft:5
    }

});

export default InfoDetailScreen;