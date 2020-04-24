import React, { Component } from "react";
import { 
	View,
	Text, 
	StyleSheet, 
	Image,
} from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Ionicons from "react-native-vector-icons/Ionicons";
import { imgArr } from "../../assets/img_arr";
import  homedata from "../../../json/routedata.json";

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
                this.setState({
                    data: homedata.imgList,
                    loaded: true
                })  
    }

    render() {
      let prefix = Platform.OS === "ios"?'ios-':'md-'
      let iconAdd = prefix+'add'
      return (
        <View style={styles.main}>
            <MasonryList
                data={this.state.data}
                renderItem={(item) => this.renderViewpoint(item)}
                getHeightForItem={({ item }) => 0}
                numColumns={1}
                keyExtractor={item => item.id}
            />
            <View style={styles.addRoute}>
                <Ionicons style={styles.iconAdd} name={iconAdd} size={20} color={'white'} />
                <Text style={styles.addText}>Add route</Text>
            </View>
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
    
    renderViewpoint({ item }){
        let prefix = Platform.OS === "ios"?'ios-':'md-'
        let iconListBox = prefix+'list-box'
        // let iconIcecream = prefix+'ice-cream'
        // let urlStr = item.url+''
        let currentImg = ''
        for(var key in imgArr){
          if(item.url.indexOf(key)!=-1){
             currentImg = imgArr[key]
          }
        }
        return (
          <View 
                activeOpacity={0.7}
                style={styles.item} 
              >
              <Image 
                source={currentImg}
                style={styles.itemImage}
              />       
              <View style={styles.itemText}>
                <View style={styles.itemRoute}>
                  <Ionicons style={styles.iconListBox} name={iconListBox} size={20} color={'white'} />
                  <Text style={styles.routeText}>{"Route "+item.id}</Text>
                </View>
                <View style={styles.itemLocation}>
                  <Text style={styles.locationText}>{"location • "+item.locationNum}</Text>
                </View>
              </View>
           </View>
        );
    }
}


const styles = StyleSheet.create({
    main:{
        alignItems:"stretch",
        justifyContent:"space-evenly",
        flexDirection:"column"
    },
    addRoute:{
        width,
        height:100,
        flexDirection:"row",
        backgroundColor:"#34BAC0",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:16,
        borderColor:"white"
    },
    iconAdd:{
        color:"white",
        fontSize:30,
        marginRight:20
    },
    addText:{
        fontSize:30,
        color:"white"
    },
    item: {
        margin: 1,
        flexGrow:0,
        borderWidth:16,
        borderColor:"white",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
    },
    itemImage:{
        width:width-32,
        height:100
    },
    itemText: {
        width,
        position:"absolute",
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center"
    },
    itemRoute:{
        flex:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        color:"white"
    },
    itemLocation:{
        flex:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center"
    },
    routeText:{
        color:"white",
        fontSize:30
    },
    locationText:{
        color:"white",
        fontSize:20
    },
    iconListBox: {
      marginRight:10,
      fontSize:20
    }
  })