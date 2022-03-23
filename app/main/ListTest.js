import React,{Component} from 'react';
import {
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions, View, Image, RefreshControl
} from 'react-native';

const screenW=Dimensions.get('window').width;//获取屏幕宽度
const test = require('http://124.223.86.146:8080/test/test4.json');
export default class CKFlatList extends Component{
    constructor(props){
        super(props);
        //模拟数据源
        this.state={
            dataSource:[]


        }
    }

    componentDidMount() {
        this.loadDisplayingMovies();
    }

    _onRefresh(type) {
        this.setState({
            showFoot: 2,
            isRefreshing: true
        });
        this.loadDisplayingMovies();
    }

    render(){
        return(
            <FlatList
                data={this.state.movieList}
                renderItem={({item,index})=>this._renderRow(item,index)}
                keyExtractor={(item,index)=>item+index}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this, 0)}
                    />
                }
            />
        )
    }

    _renderRow(item, index) {
        return (
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Detail', {params: { city: item}})}

                style={{
                    elevation:10,
                    width: screenW-20,
                    height: 180,
                    borderRadius:10,
                    margin:10,
                    justifyItems: 'center',
                    alignItems: 'center'
                }}
            >
                <View style={{backgroundColor:'#E1F7DD',flexDirection:'row',width: '100%',height: 178,borderRadius:10,alignItems:'center'}}>
                    <Image style={{width: 160, height: 160, resizeMode: 'cover',borderRadius:80,justifyContent:'center',marginLeft:10,marginRight:10}}
                           source={{uri: item.url[0].toString()}}
                    />

                    <View style={{flexDirection:'column'}}>
                        <View style={{backgroundColor:'#ADD8E6',borderRadius:10}}>
                            <Text style={{padding:10,fontSize:15}}>
                                {item.title}
                            </Text>
                        </View>

                        <Text style={[styles.itemContentStyle,{marginTop:10}]}>
                            {'城市：   ' + item.city}
                        </Text>
                        <Text style={styles.itemContentStyle}>
                            {'街道：   ' + item.street}
                        </Text>
                        <Text style={styles.itemContentStyle}>
                            {'消费：   ' + item.price}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    loadDisplayingMovies() {
        let that = this;

        /// 查询正在上映的电影
        function queryMovies() {
            return "http://124.223.86.146:8080/test/test4.json"
        }

        fetch(queryMovies()).then((response) => response.json()).then((json) => {
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

const styles=StyleSheet.create({
    itemStyle:{
        width:'100%',
        height:'100%',
        borderRadius:10,
        backgroundColor:'E1F7DD',

    },

    itemContentStyle:{
      fontSize:12,
      marginLeft:5
    }

});