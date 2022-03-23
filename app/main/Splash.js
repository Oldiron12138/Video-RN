import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

class Splash extends Component {


    render() {
        return(
            // 启动页
            <Image source={{uri:'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/s=220/sign=b1889182d01b0ef468e89f5cedc551a1/cefc1e178a82b9015fda1a9f718da9773912ef23.jpg'}} style={styles.imageStyle} />
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})

export default Splash;