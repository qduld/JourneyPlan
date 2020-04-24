import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Container, Header, Button, Content,Text } from "native-base";
import { ActionSheetCus, ActionHeaderCus, ActionDomCus } from '../../components/common/ActionSheetCus';
import Mapbox from '@react-native-mapbox-gl/maps';
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';

// import exampleIcon from '../../assets/img/example.png';
import pinIcon from '../../assets/img/pin.png';
import {featureCollection, feature} from '@turf/helpers';

// var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

const appToken = 'pk.eyJ1IjoiZnJhbmtsaW56ZWxvIiwiYSI6ImNrOG1uaGZwOTBkeDMzZHF6a211cDdicWIifQ.iUOl-NATdNYTybttdo8CTw' 
const appTokenFree = 'pk.eyJ1IjoiZnJhbmtsaW56ZWxvIiwiYSI6ImNrODQ1ZDVneTA2cDgzbG1ybGxoMWN6dXUifQ.G9Woaz_2LZHv6GLDVs_vFg'

Mapbox.setAccessToken(appToken);

const styles1 = {
  icon: {
    iconImage: pinIcon,
    iconAllowOverlap: true,
  },
};

// const featureCollection = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
//       properties: {
//         icon: 'example',
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [-118.2439, 34.0544],
//       },
//     },
//     {
//       type: 'Feature',
//       id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
//       properties: {
//         icon: 'airport-15',
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [-118.2434, 34.0544],
//       },
//     },
//     {
//       type: 'Feature',
//       id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
//       properties: {
//         icon: 'pin',
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [-118.2439, 34.0546],
//       },
//     },
//     {
//       type: 'Feature',
//       id: '9d10456e-bdda-4aa9-9269-04c1667d4553',
//       properties: {
//         icon: 'pin3',
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [-118.2435, 34.0543],
//       },
//     },
//   ],
// };

export default class mapBoxShow extends Component{

  constructor(props) {
    super(props);

    this.state = {
      userLoc:{
        timestamp: 0,
        latitude: 0.0,
        longitude: 0.0,
        altitude: 0.0,
        heading: 0.0,
        accuracy: 0.0,
        speed: 0.0
      },
      searchLoc:{
        latitude: 0.0,
        longitude: 0.0
      },
      currentLoc:{
        latitude: 0.0,
        longitude: 0.0
      },
      curLoclist:[],
      followUserLocation:true,
      showSearchAction:false,
      featureCollection: featureCollection([]),
      searchBackData:[]
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.fetchSearchInfo = this.fetchSearchInfo.bind(this);
    this._fetchSearchInfo = this._fetchSearchInfo.bind(this);
    this.showPinOnPos = this.showPinOnPos.bind(this);
    this.onSourceLayerPress = this.onSourceLayerPress.bind(this);
  }

  componentWillMount() {
  }
  

  fetchSearchInfo(placeStr){            //查询对应位置
    let REQUEST_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    this.setState({followUserLocation:false});
    if(placeStr){
      REQUEST_URL = REQUEST_URL + placeStr+'.json?access_token='+ appTokenFree
      fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
          this.setState({
            searchLoc:{
              latitude: responseData.features[0].center[0],
              longitude: responseData.features[0].center[1]
            }
          })
      });
    }
  }

  _fetchSearchInfo=(placeStr)=>{           //查询对应位置
    let REQUEST_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    if(placeStr){
      REQUEST_URL = REQUEST_URL + placeStr+'.json?access_token='+ appTokenFree
      this.setState({followUserLocation:false});
      fetch(REQUEST_URL)
        .then(response => response.json())
        .then(responseData => {
          // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
            this.setState({
               searchBackData:responseData.features
            })
        });
    }
  }

  fetchSearchInfoByPos(geometry){             //通过地图经纬度去选点
    let _this = this
       let llStr = geometry.coordinates[0]+','+geometry.coordinates[1]
       let REQUEST_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        if(llStr){
          REQUEST_URL = REQUEST_URL + llStr + '.json?access_token='+ appTokenFree
          return  new Promise((resolve, reject) => {  
              fetch(REQUEST_URL)
              .then(response => response.json())
              .then(responseData => {
                let posCache = responseData.features[0]
                  if(posCache && posCache.text){
                      _this.state.curLoclist.push({name:posCache.text,
                                    latitude:posCache.center[0],
                              longitude:posCache.center[1]});

                      _this.setState({
                        curLoclist:_this.state.curLoclist
                      })

                      resolve(posCache)
                  }
                  reject(false)
              });
            })
        }
  }

  onUserLocationUpdate(location) {          //用户位置更新
    this.setState({
      userLoc:{
        timestamp: location.timestamp,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
        heading: location.coords.heading,
        accuracy: location.coords.accuracy,
        speed: location.coords.speed,
      }
    });
  }

  renderCurLocList(locInfo,locIdx){            //渲染已选的地图位置
    let prefix = Platform.OS === "ios"?'ios-':'md-'
    let iconPin = prefix+'pin'
    let iconClose = prefix+'close'

    return (
      <View style={styles.selLocItem} key={locIdx}>
        <View style={styles.selLocPoint}>
              <Text style={styles.selLocNum}>
                    {locIdx+1}
              </Text>
              {/* <Ionicons style={styles.iconPin} name={iconPin} size={20} color={"#11C2C3"} ></Ionicons> */}
        </View>
        <View style={styles.selLocText}>
              <TouchableHighlight style={styles.posLocItem} onPress={()=>{this.posLocCenter(locInfo)}}>
                <Text style={styles.selLocTextName} numberOfLines={1}>
                      {locInfo.name}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.delLocItem} onPress={()=>{this.delPosFromCurList(locIdx)}}>
                  <Ionicons style={styles.iconClose} name={iconClose} size={20} color={"black"} /> 
              </TouchableHighlight>
        </View> 
      </View>
    )
  }

  posLocCenter(posItem){               //定位选定中心
    this.setState({
      followUserLocation:false,
      searchLoc:{
        latitude: posItem.latitude,
        longitude: posItem.longitude
      }
    });
  }

  delPosFromCurList(idx){                  //从当前列表删除位置
      this.state.curLoclist.splice(idx,1);
      this.state.featureCollection.features.splice(idx,1);
      this.setState({
        curLoclist:this.state.curLoclist,
        featureCollection: featureCollection([
          ...this.state.featureCollection.features
        ])
      })
  }

  renderAddLoction(){                 //渲染添加位置的标签
    let prefix = Platform.OS === "ios"?'ios-':'md-'
    let iconAdd = prefix+'add'

    return (
      <View style={styles.selLocItem}>
          <View style={styles.addLocEmpty}></View>
          <TouchableHighlight style={styles.addLocItem} onPress={()=>{this.setShowAction()}}>
                <View style={styles.addLocItemView}>
                  <Ionicons style={styles.iconAdd} name={iconAdd} size={20} color={"#11C2C3"} ></Ionicons>
                  <Text style={styles.addLocText}>
                        {"Add location"}
                  </Text>
                </View>
          </TouchableHighlight>
      </View>
    )
  }

  setShowAction(){         //设置上拉表格显示
     this.setState({
         showSearchAction:!this.state.showSearchAction
     })
  }

  renderSearchSheet(){         //渲染查询的上拉表格
    if(this.state.showSearchAction){
      return (
        <ActionSheetCus
            showAction={this.state.showSearchAction}
            cancel={()=>{this.setState({showSearchAction:false})}}
            >
            <ActionHeaderCus
                onPress={this._fetchSearchInfo}
            />
            {
              this.state.searchBackData.map((info, index) => {
                return this.renderSearchBack(info,index);
              })
            }
        </ActionSheetCus>
      )
    }
  }

  renderSearchBack(item,idx){              //渲染查询返回的列表
    return (
      <ActionDomCus 
          actionName={item.text}
          onPress={()=>{
            this._posSearchOnMap(item,idx)
          }}
      />
    )
  }

  _posSearchOnMap(item,idx){               //定位查询对应的位置
    let latitudeC = this.state.searchBackData[idx].center[0]
    let longitudeC = this.state.searchBackData[idx].center[1]

      this.setState({
        searchLoc:{
          latitude: latitudeC,
          longitude: longitudeC
        }
      });

      this.state.curLoclist.push({name:item.text,latitude:latitudeC,longitude:longitudeC});

      this.showPinOnPos(item,true);

      this.setState({
          curLoclist:this.state.curLoclist
      })
      this.setShowAction()
  }


  async showPinOnPos(e,search){          //在点击位置显示Pin
        if(!search){
          let posBack = await this.fetchSearchInfoByPos(e.geometry)
          if(!posBack){
            return ;
          }
            this.setShowPin(e)
        }else{
            this.setShowPin(e)
        }
  }

  setShowPin(e){
    const aFeature = feature(e.geometry);
    aFeature.id = `${Date.now()}`;

    this.setState({
      featureCollection: featureCollection([
        ...this.state.featureCollection.features,
        aFeature,
      ]),
    });
  }

  onSourceLayerPress({features, coordinates, point}) {           
    console.log(
      'You pressed a layer here are your features:',
      features,
      coordinates,
      point,
    );
  }

  render() {
    let prefix = Platform.OS === "ios"?'ios-':'md-'
    let iconNutri = prefix+"nutrition"
    const {images} = this.state;
    return (
      <ScrollView style={styles.container}>
                  <Mapbox.MapView
                      styleURL={Mapbox.StyleURL.Street}
                      zoomLevel={15}
                      showUserLocation={true}
                      style={styles.container}
                      onPress={this.showPinOnPos}
                      >
                        <Mapbox.ShapeSource
                          id="symbolLocationSource"
                          hitbox={{width: 20, height: 20}}
                          onPress={this.onSourceLayerPress}
                          shape={this.state.featureCollection}>
                          <Mapbox.SymbolLayer
                            id="symbolLocationSymbols"
                            minZoomLevel={1}
                            style={styles1.icon}
                          />
                        </Mapbox.ShapeSource>

                        <Mapbox.Camera
                          zoomLevel={14}
                          animationMode={'flyTo'}
                          followUserLocation={this.state.followUserLocation}
                          followUserMode={'normal'}
                          animationDuration={700}
                          centerCoordinate={[this.state.searchLoc.latitude,this.state.searchLoc.longitude]}
                        />
                        <Mapbox.UserLocation
                          onUpdate={this.onUserLocationUpdate}
                          minDisplacement={200}>
                        </Mapbox.UserLocation>
                  </Mapbox.MapView>
                  <View style={styles.selLocList}>
                          {this.state.curLoclist.map((info, index) => {
                              return this.renderCurLocList(info,index);
                          })}
                          {this.renderAddLoction()}
                  </View> 
                  <View style={styles.planYourJourney}>
                        <Ionicons style={styles.iconNutri} name={iconNutri} size={20} color={"white"} ></Ionicons>
                        <Text style={styles.addLocText}>
                              {"Plan Your Journey"}
                        </Text>
                  </View>
                  {this.renderSearchSheet()}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height:2*height/5
  },
  selLocList:{
    width,
    marginTop:20,
    paddingHorizontal:20,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  selLocItem:{
    flex:1,
    marginVertical:4,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  selLocPoint:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  selLocNum:{
    position:"absolute",
    zIndex:1,
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
    color:"white",
    borderRadius:13,
    backgroundColor:'#11C2C3',
    width:26,
    height:26
  },
  iconPin:{
  },
  selLocText:{
    flex:8,
    paddingHorizontal:8,
    paddingVertical:4,
    shadowColor:"black",
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  posLocItem:{
    flex:12,
    textAlign:"center",
    alignItems:'center'
  },
  selLocTextName:{
    flexWrap:'wrap'
  },
  delLocItem:{
    flex:1,
    backgroundColor:'white'
  },
  iconClose:{
    backgroundColor:'white'
  },
  iconAdd:{
    marginRight:10,
  },
  // addLocEmpty:{
  //   flex:1,
  // },
  addLocItem:{
    flex:8
  },
  addLocItemView:{
    flex:1,
    paddingHorizontal:8,
    paddingVertical:4,
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  planYourJourney:{
    width:width-40,
    marginHorizontal:20,
    marginVertical:20,
    paddingHorizontal:8,
    paddingVertical:4,
    backgroundColor:"#11C2C3",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
});
