import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    BackHandler
} from 'react-native';
//导入Video组件
import Video from 'react-native-video';
// 导入 Silder组件
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";

import MoviesScreen from "./MoviesScreen";
import PropTypes from "prop-types";
// 屏幕方向锁定: 他需要改变 原来Android文件代码，当然适配两端的话，IOS也是需要更改的。

let screenWidth  = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
console.log(screenWidth+"   "+screenHeight+"带有小数");

const styles = StyleSheet.create({
    myVideo:{
        width: 340,
        height: 240
    },
    playBtn:{
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "absolute",
        alignItems:'center',
        justifyContent:"center",
        top: "50%",
        left: "50%",
        marginLeft: -25,
        marginTop:-25,
        zIndex:999
    },
    sliderBox:{
        flex:0,
        flexDirection:'row',
        alignItems:'center'
    }
});

const PlayerScreen = ({navigation, route}) => {
    const { params } = route.params;
    console.log("zwj " + params.url)
    return (
        <PlayerScreenF navigation = {navigation}
        route1 = {params.url}
        />
    );
}
class PlayerScreenF extends React.Component{
    // static defaultProps={
    //
    //     route1: 'XiaoHong'
    //
    // }
    //
    // static propTypes={
    //
    //     route1: PropTypes.string,
    //
    // }

    constructor(props){
        super(props);

        this.changePausedState   = this.changePausedState.bind(this);
        this.customerSliderValue = this.customerSliderValue.bind(this);
        this.enterFullScreen     = this.enterFullScreen.bind(this);
        this._changePauseSliderFullState = this._changePauseSliderFullState.bind(this);
        this._onStartShouldSetResponder = this._onStartShouldSetResponder.bind(this);
        this.state = {
            isPaused: true,  //是暂停
            duration: 0,      //总时长
            currentTime: 0, //当前播放时间
            sliderValue: 0,   //进度条的进度

            //用来控制进入全屏的属性
            videoWidth: screenWidth,
            videoHeight: 226,
            isFullScreen: false,
            isVisiblePausedSliderFullScreen: false
        }
    }

    changePausedState(){ //控制按钮显示播放，要显示进度条3秒钟，之后关闭显示
        this.setState({
            isPaused: this.state.isPaused?false:true,
            isVisiblePausedSliderFullScreen: true
        })
        //这个定时调用失去了this指向
        let that = this;
        setTimeout(function(){
            that.setState({
                isVisiblePausedSliderFullScreen: false
            })
        },3000)
    }
    _changePauseSliderFullState(){ // 单击事件，是否显示 “暂停、进度条、全屏按钮 盒子”
        let flag = this.state.isVisiblePausedSliderFullScreen?false:true;
        this.setState({
            isVisiblePausedSliderFullScreen: flag
        })
        //这个定时调用失去了this指向
        let that = this;
        setTimeout(function(){
            that.setState({
                isVisiblePausedSliderFullScreen: false
            })
        },3000)
    }
    //格式化音乐播放的时间为0：00。借助onProgress的定时器调用，更新当前时间
    formatMediaTime(time) {
        let minute = Math.floor(time / 60);
        let second = parseInt(time - minute * 60);
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
        return minute + ":" + second;

    }
    //加载视频调用，主要是拿到 “总时间”，并格式化
    customerOnload(e){
        let time = e.duration;
        this.setState({
            duration: time
        })
    }
    // 获得当前的，播放时间数，但这个数是0.104，需要处理
    customerOnprogress(e){
        let time = e.currentTime;   // 获取播放视频的秒数
        this.setState({
            currentTime: time,
            sliderValue: time
        })
    }
    // 移动滑块，改变视频播放进度
    customerSliderValue(value){
        this.player.seek(value);
    }
    enterFullScreen(){ //1.改变宽高  2.允许进入全屏模式  3.如何配置屏幕旋转,不需要改变进度条盒子的显示和隐藏
        this.setState({
            videoWidth: screenHeight,
            videoHeight: screenWidth,
            isFullScreen: true
        })
        // 直接设置方向

    }
    _onStartShouldSetResponder(e){
        console.log(e);
    }

    render(){
        console.log("zwj111 " + this.props.route1)
        // 播放按钮组件：是否显示
        let playButtonComponent = (
            <TouchableWithoutFeedback
                onPress={this.changePausedState}
            >
                <View style={styles.playBtn}>
                    <Ionicons name={'ios-play'} size={40} color={'white'}/>
                </View>
            </TouchableWithoutFeedback>
        );
        let pausedBtn = this.state.isPaused?playButtonComponent:null;
        // 暂停按钮、进度条、全屏按钮 是否显示
        let pausedSliderFullComponent = (
            <View style={{position:"absolute",bottom:0}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {/* 进度条按钮     */}
                    <View style={styles.sliderBox}>
                        <Text>{this.formatMediaTime(this.state.currentTime)}</Text>
                        <Slider
                            style={{width: 200, height: 40}}
                            value={this.state.sliderValue}
                            maximumValue={this.state.duration}
                            thumbTintColor="#000" //开关夹点的yanse
                            minimumTrackTintColor="red"
                            maximumTrackTintColor="#ccc"
                            step={1}
                            onValueChange={this.customerSliderValue}
                        />
                        <Text>{this.formatMediaTime(this.state.duration)}</Text>
                    </View>
                    {/* 全屏按钮 */}
                    <View>
                        <TouchableOpacity
                            onPress={this.changePausedState}
                        >
                            <Text style={{backgroundColor:'#00ff00',padding:5}}>全屏</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        );
        let pausedSliderFull = this.state.isVisiblePausedSliderFullScreen?pausedSliderFullComponent:null;
        return (
            <View>
                <View>
                    <TouchableWithoutFeedback
                        onPress={this._changePauseSliderFullState}
                        onResponderMove={this._onStartShouldSetResponder}
                    >
                        <Video source={{uri: this.props.route1}}
                               ref={(ref) => {
                                   this.player = ref
                               }}
                               style={{width: this.state.videoWidth,height: this.state.videoHeight,backgroundColor:"#FFC1C1"}}
                               allowsExternalPlayback={false} // 不允许导出 或 其他播放器播放
                               paused = {this.state.isPaused} // 控制视频是否播放
                               resizeMode="cover"
                               onLoad={(e)=>this.customerOnload(e)}
                               onProgress={(e)=>this.customerOnprogress(e)}
                               fullscreen={true}
                        />
                    </TouchableWithoutFeedback>
                    {/* 播放的按钮：点击之后需要消失 */}
                    {pausedBtn}
                    {/* 暂停按钮，进度条，全屏按钮 */}
                    {pausedSliderFull}
                </View>
            </View>
        )
    }
}
export default PlayerScreen;