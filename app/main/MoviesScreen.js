import React, {Component} from "react";
import {
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions, View, Image, RefreshControl, Button
} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PlayerScreen from "./PlayerScreen";
import DeviceStorage from "./AsynManager";

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

const screenW=Dimensions.get('window').width;//获取屏幕宽度
const test = require('http://124.223.86.146:8080/test/test3.json');
let navigation;

class MoviesList extends Component{
    constructor(props){
        super(props);


        //模拟数据源
        this.state={
            dataSource:[],
            showCustomDialog: false,
            showScaleDialog: false
        }
    }

    componentDidMount() {
        this.loadingMovies();
    }

    _onRefresh(type) {
        this.setState({
            showFoot: 2,
            isRefreshing: true
        });
        this.loadingMovies();
    }

    loginClick() {
        this.props.navigation.navigate('Account');
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList

                    data={this.state.movieList}
                    renderItem={({item, index}) => this._renderMovies(item, index)}
                    keyExtractor={(item, index) => item + index}
                    numColumns={2}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this, 0)}
                        />
                    }
                />
                <Dialog
                    onDismiss={() => {
                        this.setState({showCustomDialog: false});
                    }}
                    width={0.85}
                    visible={this.state.showCustomDialog}
                    rounded
                    actionsBordered
                    dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                    dialogTitle={
                        <DialogTitle
                            title="未登录"
                            textStyle={{
                                fontSize: 17,
                            }}
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            hasTitleBar={false}
                            align="center"/>
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="登录"
                                textStyle={{
                                    fontSize: 15,
                                }}
                                bordered
                                onPress={() => {
                                    this.setState({showCustomDialog: false});
                                    this.loginClick()
                                }}
                                key="button-1"/>
                            <DialogButton
                                text="取消"
                                textStyle={{
                                    fontSize: 15,
                                }}
                                bordered
                                onPress={() => {
                                    this.setState({showCustomDialog: false});
                                }}
                                key="button-2"/>
                        </DialogFooter>
                    }>
                    <DialogContent
                        style={{
                            backgroundColor: '#ffffff',
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                        <Text>您还没有登录，请登录</Text>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }

    _onItemClick(item, index) {
        console.log("zwjDialog item click")
        DeviceStorage.get('alreadyLogin').then((value) => {
            console.log('zwj logedloged' + value)
            if(value) {
                console.log("zwjDialog item click111")
                this.props.navigation.navigate('Player', {params: { url: item.video.toString() }});
            } else {
                console.log("zwjDialog item click222")
                this.setState({
                    showCustomDialog: true
                });
            }
        })
    }

    callback() {

    }

    _renderMovies(item, index) {
        return (
            <TouchableOpacity
                //     onPress={()=>{
                //     this.props.navigation.navigate('Player', {params: { url: item.video.toString() }});
                // }}
                onPress={() => this._onItemClick(item, index)}
                style={{
                    elevation: 10,
                    width: screenW / 2 - 20,
                    height: 200,
                    backgroundColor: '#E1F7DD',
                    borderRadius: 10,
                    margin: 10,
                    justifyItems: 'center',
                    alignItems: 'center'
                }}
            >
                <View style={{
                    flexDirection: 'column',
                    borderRadius: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    <Image style={{
                        width: '100%',
                        height: '80%',
                        resizeMode: 'cover',
                        justifyContent: 'center',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}
                           source={{uri: item.url.toString()}}
                    />
                    <Text style={{
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        fontStyle: 'italic',
                        fontWeight: '400',
                        fontSize: 20
                    }}>
                        {item.num}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    loadingMovies() {
        let that = this;

        function queryMoviesList() {
            return "http://124.223.86.146:8080/test/test3.json"
        }

        fetch(queryMoviesList()).then((response) => response.json()).then((json) => {
            console.log(json);
            let movies = json;
            that.setState({
                movieList: movies,
                loaded: true,
                isRefreshing: false,
            })
        }).catch((e) => {
            console.log("加载失败");
            that.setState({
                isRefreshing: false,
                loaded: true
            })
        }).done();
    }
}

const ShowDialog = () => {
    return(<Dialog ref="dialog"/>)
}

const MoviesScreen = ({navigation}) => {
    return (
        <MoviesList navigation = {navigation}
        text = "第一个"/>
    );
}
export default MoviesScreen;
