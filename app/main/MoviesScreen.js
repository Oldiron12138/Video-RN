import React, {Component} from "react";
import {
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions, View, Image, RefreshControl, Button, DeviceEventEmitter
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
            showChargeDialog:false,
            showConfirmDialog:false,
            showScaleDialog: false,
            currentUrl:'',
            accountId: '',
            pwd:'',
            id: '',
            coin:0
        }
    }

    componentDidMount() {
        this.loadingMovies();
        this.getAccountId()
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

    unLockClick() {
        this.setState({coin: this.state.coin-- })
        this.chargeProcess()

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
                    <Dialog
                        onDismiss={() => {
                            this.setState({showChargeDialog: false});
                        }}
                        width={0.85}
                        visible={this.state.showChargeDialog}
                        rounded
                        actionsBordered
                        dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                        dialogTitle={
                            <DialogTitle
                                title="金币不足"
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
                                    text="充值"
                                    textStyle={{
                                        fontSize: 15,
                                    }}
                                    bordered
                                    onPress={() => {
                                        this.setState({showChargeDialog: false});
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
                                        this.setState({showChargeDialog: false});
                                    }}
                                    key="button-2"/>
                            </DialogFooter>
                        }>
                        <DialogContent
                            style={{
                                backgroundColor: '#ffffff',
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                            <Text>金币不足，请充值</Text>
                        </DialogContent>

                </Dialog>
                <Dialog
                    onDismiss={() => {
                        this.setState({showConfirmDialog: false});
                    }}
                    width={0.85}
                    visible={this.state.showConfirmDialog}
                    rounded
                    actionsBordered
                    dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                    dialogTitle={
                        <DialogTitle
                            title="收费内容"
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
                                text="解锁"
                                textStyle={{
                                    fontSize: 15,
                                }}
                                bordered
                                onPress={() => {
                                    this.setState({showConfirmDialog: false});
                                    this.unLockClick()
                                }}
                                key="button-1"/>
                            <DialogButton
                                text="取消"
                                textStyle={{
                                    fontSize: 15,
                                }}
                                bordered
                                onPress={() => {
                                    this.setState({showConfirmDialog: false});
                                }}
                                key="button-2"/>
                        </DialogFooter>
                    }>
                    <DialogContent
                        style={{
                            backgroundColor: '#ffffff',
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                        <Text>是否花费一金币解锁此内容</Text>
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

                this.getAccountInfo(item)
                //this.props.navigation.navigate('Player', {params: { url: item.video.toString() }});
            } else {
                console.log("zwjDialog item click222")
                this.setState({
                    showCustomDialog: true
                });
            }
        })
    }

    getAccountId() {
        DeviceStorage.get('accountName').then((value) => {
                this.setAccountId(value)
                DeviceStorage.get('accountPwd').then((value) => {
                        this.setAccountPwd(value)
                    }
                )
            }
        )
    }

    chargeProcess() {
        let account1 = {'id':this.state.id,'name':this.state.accountId,'pwd':this.state.pwd,'coin':this.state.coin}
        let url = 'http://124.223.86.146:8080/QQQ/servlet/UpdateServlet'
        if (account1) {
            let paramsArray = [];
            //拼接参数
            Object.keys(account1).forEach(key => paramsArray.push(key + '=' + account1[key]))
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
        console.log('zwj start login success coin '+ url)
        fetch(url, init)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('zwj start login success coin '+ responseJson.coin)
                this.setState({showChargeDialog: false})
                this.props.navigation.navigate('Player', {params: { url: this.state.currentUrl }});

                    //准备值，发监听
                    const message = 'refresh';
                    DeviceEventEmitter.emit('refreshAccount', message);
            })
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

    getAccountInfo(item) {
        console.log('zwj start getAccount')
        let account = {'name':this.state.accountId,'pwd':this.state.pwd}
        let url = 'http://124.223.86.146:8080/QQQ/servlet/Searchall'
        if (account) {
            let paramsArray = [];
            //拼接参数
            Object.keys(account).forEach(key => paramsArray.push(key + '=' + account[key]))
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
        console.log('zwj start login success coin '+ url)
        fetch(url, init)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({id:responseJson.id})
                this.setState({coin:responseJson.coin})
                console.log('zwj start login success coin '+ responseJson.coin)
                if (responseJson.coin != null && responseJson.coin > 0) {

                    this.setState({showConfirmDialog: true});
                    this.setState({currentUrl: item.video.toString()})
                    //this.props.navigation.navigate('Player', {params: { url: item.video.toString() }});
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
                } else {
                    this.setState({showChargeDialog: true});
                }
            })
            .catch(e => {console.log(`zwj error ${e}`)});
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
