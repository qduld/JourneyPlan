import React, { Component } from "react";
import { 
	View,
	Text, 
	StyleSheet, 
    Image,
    TouchableHighlight
} from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Ionicons from "react-native-vector-icons/Ionicons";
import { imgArr } from "../../assets/img_arr";
import  userInfo from "../../../json/userInfo.json";
import  homedata from "../../../json/homedata.json";

import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';


export default class Route extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loaded: false,
        isRefreshing:true
      };
      // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
      // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
      this.fetchData = this.fetchData.bind(this);
    }
  
    componentDidMount() {
        this.fetchData();
    }
   
    fetchData() { 
        let numRange = homedata.imgList.length
        let randomNum = Math.floor(Math.random()*numRange)
        let randomArr = []
        for(let i = 0;i<=randomNum;i++){
            let randomIdx = Math.floor(Math.random()*numRange)
            randomArr.push(homedata.imgList[randomIdx])
        }
        this.setState({
            data: randomArr,
            loaded: true
        })  
    }

    render() {
      let prefix = Platform.OS === "ios"?'ios-':'md-'

      let currentImg = ''
      for(var key in imgArr){
        if(userInfo.url.indexOf(key)!=-1){
           currentImg = imgArr[key]
        }
      }

      return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Image
                        source={currentImg}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.following}> 
                    <Text style={styles.followText}>{userInfo.following}</Text>
                    <Text style={styles.followText}>Following</Text>
                </View>
                <View style={styles.followers}>
                    <Text style={styles.followText}>{userInfo.followers}</Text>
                    <Text style={styles.followText}>Followers</Text>
                </View>
            </View>
            <MasonryList
                data={this.state.data}
                renderItem={(item) => this.renderViewpoint(item)}
                getHeightForItem={({ item }) => 0}
                numColumns={1}
                keyExtractor={item => item.id}
            />
        </View>
      )
    }

    renderLoading() {
        return (
          <View style={styles.container}>
            <Text>Loading img...</Text>
          </View>
        )
    }

    _editItem(id){

    }

    _deleteItem(id){

    }

    renderViewpoint({item}){
        let currentImg = ''

        for(var key in imgArr){
          if(item.url.indexOf(key)!=-1){
             currentImg = imgArr[key]
          }
        }

        return (
            <View style={styles.item}>
                    <TouchableHighlight onPress={()=>{this._editItem(item.id)}}>
                        <Image 
                            source={currentImg}
                            style={styles.itemImage}
                        /> 
                    </TouchableHighlight>
                    <View style={styles.itemDetails}>
                        <TouchableHighlight onPress={()=>{this._editItem(item.id)}}>
                            <Text style={styles.details}>{item.description}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.itemOptions}>
                        <TouchableHighlight onPress={()=>{this._editItem(item.id)}}>
                            <Text style={styles.optionBtn}>Edit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this._deleteItem(item.id)}}>
                            <Text style={[styles.optionBtn,styles.optionBtnRight]}>Delete</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"stretch",
        flexDirection:"column",
        backgroundColor:'white'
    },
    header:{
        width,
        lineHeight:100,
        alignItems:"stretch",
        flexDirection:'row',
        marginTop:20
    },
    avatar:{
        flex:1,
        width:80,
        height:80,
        borderRadius:80,
        marginLeft:20 
    },
    following:{
        flex:1,
        width:80,
        height:80,
        flexDirection:'column',
        justifyContent:"center",
        alignContent:"center"
    },
    followers:{
        flex:1,
        width:80,
        height:80,
        flexDirection:'column',
        justifyContent:"center",
        alignContent:"center"
    },
    followText:{
        width:80,
        textAlign:"center"
    },
    item:{
        width:width-8,
        marginHorizontal:4,
        paddingVertical:8,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    itemImage:{
        width:width-8,
        height:height/3,
    },
    itemDetails:{
        width:width-8,
    },
    itemOptions:{
        width:width-8,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderTopColor:"#BDC0C0",
        borderTopWidth:1,
        borderBottomColor:"#BDC0C0",
        borderBottomWidth:1,
        shadowColor:"#BDC0C0",
        shadowRadius:20
    },
    optionBtn:{
        flex:1,
        backgroundColor:'white',
        color:'#11C2C3',
        paddingHorizontal:8,
        paddingVertical:8,
        textAlign:"center",
        width:100
    },
    optionBtnRight:{
        marginLeft:10
    }
  })