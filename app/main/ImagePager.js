import {Component} from "react";
import React from 'react';
import {Image, Text, View,StyleSheet} from "react-native";
import ViewPager from "@react-native-community/viewpager";
const styles = StyleSheet.create({
    container1: {
        height:'30%',
        width: "80%",
        resizeMode: 'cover',
        backgroundColor: '#F5FCFF',
    },
    imageStyle1: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    viewPagerStyle: {
        height: '100%',
    },
    txtStyle1: {
        flex: 1,
        textAlign: 'center',
        marginTop: 10
    },
});
export default class MyViewPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    onPageSelected = (e) => {
        this.setState({page: e.nativeEvent.position});
    };

    render() {
        let images = this.props.item;
        let pageViews = [];
        for (let i = 0; i < images.length; i++) {
            pageViews.push(
                <Image
                    style={styles.imageStyle1}
                    source={{uri: images[i]}}>
                </Image>
            );
        }
        return (
            <View style={styles.container1}>
                <ViewPager style={styles.viewPagerStyle}
                           onPageSelected={this.onPageSelected}>
                    {pageViews}
                </ViewPager>
            </View>
        );
    }
}

