import React, { Component } from "react";
import { 
	View,
	Text, 
	StyleSheet, 
  Image,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Ionicons from "react-native-vector-icons/Ionicons";
import { imgArr } from "../../assets/img_arr";
import  homedata from "../../../json/homedata.json";

import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';

export default class ShowMain extends Component {
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
      DeviceEventEmitter.addListener('searchPosSet',this.searchPosSet.bind(this))
    }
  
    componentDidMount() {
        this.fetchData();
    }
    
    searchPosSet(inputData){
      let orgData = homedata.imgList
      let filterData = null
      if(inputData){
        let toUpperInput = inputData.substr(0,1).toUpperCase()+(inputData.length>1?inputData.substr(1):'')
        let toAllUpperInput = inputData.toUpperCase()
        filterData = orgData.filter((item)=>{
          return item.description.indexOf(inputData)!=-1 || item.description.indexOf(toUpperInput)!=-1 || item.description.indexOf(toAllUpperInput)!=-1
        })
      }

        this.setState({
          data: filterData?filterData:orgData,
          loaded: true
        })  
    }

    fetchData() {
        this.setState({
            data: homedata.imgList,
            loaded: true
        })  
    }

    render() {
      let prefix = Platform.OS === "ios"?'ios-':'md-'
      let iconPeople = prefix+'people'
      let iconList = prefix+'list'
      let iconPin = prefix+'pin'
      return (
        <View style={styles.main}>
            <View style={styles.filters}>
              <View style={styles.filterItem}>
                  <Ionicons style={styles.filterIcon} name={iconPeople} size={20} color={'#34BAC0'} />
                  <Text>Following</Text>
              </View>
              <View style={styles.filterItem}>
                  <Ionicons style={styles.filterIcon} name={iconList} size={20} color={'#34BAC0'} />
                  <Text>Explore</Text>
              </View>
              <View style={styles.filterItem}>
                  <Ionicons style={styles.filterIcon} name={iconPin} size={20} color={'#34BAC0'} />
                  <Text>Near by</Text>
              </View>
            </View>
            <MasonryList
                data={this.state.data}
                renderItem={(item) => this.renderViewpoint(item)}
                getHeightForItem={({ item }) => 2}
                numColumns={2}
                keyExtractor={item => item.id}
                style={styles.masonry}
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

    _navigateAndParams(imgInfo){
       this.props.navigation.navigate('Favorite');
       DeviceEventEmitter.emit('imgInfoTransfer',imgInfo)
    }

    renderViewpoint({ item }){
        let prefix = Platform.OS === "ios"?'ios-':'md-'
        let iconHeart = prefix+'heart-empty'
        let iconPin = prefix+'pin'
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
              <TouchableHighlight onPress={()=>{this._navigateAndParams(item.id)}}>
                <Image 
                  source={currentImg}
                  style={styles.itemImage}
                /> 
              </TouchableHighlight>
              <View style={styles.itemDescription}>
                  <Text>{item.description}</Text>
              </View>       
              <View style={styles.itemText}>
                <View style={styles.loveNum}>
                  <Ionicons style={styles.itemIcon} name={iconPin} size={20} color={'#34BAC0'} />
                  <Text>{item.distance}</Text>
                </View>
                <View style={styles.distance}>
                  <Ionicons style={styles.itemIcon} name={iconHeart} size={20} color={'#34BAC0'} />
                  <Text>{item.loveNum}</Text>
                </View>
              </View>
           </View>
        );
    }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:"space-evenly",
    alignItems:"stretch",
    flexDirection:"column"
  },
  masonry:{
    marginTop:32
  },
  filters:{
    width,
    borderWidth:1,
    borderColor:"#fff",
    height:30,
    flex:1,
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  filterItem:{
    height:30,
    flex:1,
    margin:2,
    width:width/3-6,
    backgroundColor:"white",
    borderRadius:4,
    flexDirection:"row",
    alignItems:"center"
  },
  filterIcon:{
    margin:4
  },
  item: {
    margin: 1,
    flexGrow:0,
    borderWidth:8,
    borderColor:"#fff",
    borderRadius:12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    marginBottom:8
  },
  itemImage:{
    width: width/2-8,
  },
  itemText: {
    flex:1,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  itemIcon: {
    marginRight:10,
  },
  itemDescription:{
    flex:1,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  loveNum: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  distance: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'
  }
})
