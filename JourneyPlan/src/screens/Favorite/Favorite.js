import { imgArr } from "../../assets/img_arr";
import React, { Component } from "react";
import { 
    View,
    Text, 
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import  favoritedata from "../../../json/favoritedata.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import MasonryList from '@appandflow/masonry-list';

import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';

export default class Favorite extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                comments:[],
                mainComment:null,
                loaded: false,
                slider1ActiveSlide: 0,
                isRefreshing:true
            };
            this.fetchData = this.fetchData.bind(this);
            DeviceEventEmitter.addListener('imgInfoTransfer',this.imgInfoTransfer.bind(this))
        }
    
        componentDidMount() {
            this.fetchData();
        }
     
        imgInfoTransfer(imgId){
            this.setState({
                slider1ActiveSlide:Number(imgId)-1
            })  
        }

        fetchData() {
            this.setState({
                data: favoritedata.imgList,
                mainComment:favoritedata.mainComment,
                comments:favoritedata.comments,
                loaded: true
            })  
        }

        _renderItem( {item} ) {
            let currentImg = ''
            for(var key in imgArr){
              if(item.url.indexOf(key)!=-1){
                 currentImg = imgArr[key]
              }
            }
            return (
              <View style={styles.sliderWrapper}>
                    <Image
                        source={currentImg}
                        style={styles.itemImage}
                    >
                    </Image>
              </View>
            )
        }

        _signToLove(signIdx){
            let mainCache = this.state.comments
            for(let i=0;i<mainCache.length;i++){
                if( mainCache[i].id === signIdx ) {
                    if(mainCache[i].loveFlag){
                        mainCache[i].loveNum--;
                    }else{
                        mainCache[i].loveNum++;
                    }
                    mainCache[i].loveFlag=!mainCache[i].loveFlag
                    break;
                }
            }
            this.setState({
                comments: mainCache
            })
        }
        
        renderReviews( { item } ){
            let prefix = Platform.OS === "ios"?'ios-':'md-'
            let iconHeartEmpty = prefix+'heart-empty'
            let iconHeartFull = prefix+'heart'

            let currentImg = ''
            for(var key in imgArr){
              if(item.url.indexOf(key)!=-1){
                 currentImg = imgArr[key]
              }
            }
            
            let loveState = null
            if(item.loveFlag){
                loveState = <Ionicons style={styles.iconHeartFull} name={iconHeartFull} size={30} color={"#34BAC0"} /> 
            }else{
                loveState = <Ionicons style={styles.iconHeartEmpty} name={iconHeartEmpty} size={30} color={"#34BAC0"} /> 
            }

            return (
                <View style={styles.reviewWrapper}>
                    <View style={styles.reviewUser}>
                        <Image
                            source={currentImg}
                            style={styles.reviewAvatar}
                        >
                        </Image>
                        <View style={styles.reviewText}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.reviewItem}>{item.review}</Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={()=>{this._signToLove(item.id)}}>
                        <View style={styles.reviewLove}> 
                                {loveState}
                                <Text style={styles.loveNum}>{item.loveNum}</Text>
                        </View> 
                    </TouchableHighlight>
                </View>
            )  
        }

        render () {
            const { slider1ActiveSlide } = this.state;
            let prefix = Platform.OS === "ios"?'ios-':'md-'
            let iconHeart = prefix+'heart'
            let iconAdd = prefix+'add'
            let iconListBox = prefix+'list-box'

            return (
            <View>
                <ScrollView style={styles.main}>
                    <View style={styles.carousel}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            sliderWidth={width}
                            itemWidth={width}
                            loop={true}
                            layout={'stack'}
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        />
                        <Pagination
                            dotsLength={this.state.data.length}
                            activeDotIndex={slider1ActiveSlide}
                            containerStyle={styles.paginationContainer}
                            dotColor={'rgba(253, 88, 86, 0.92)'}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={"white"}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.8}
                            inactiveDotStyle={styles.paginationDot}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                        />  
                    </View>
                    <View style={styles.mainComment}>
                        <Text style={styles.mainText}><Ionicons style={styles.iconHeart} name={iconHeart} size={20} color={"#FF3D2F"} />
                                {this.state.mainComment}
                        </Text>  
                    </View> 
                    <View style={styles.addRoute}>
                        <Ionicons style={styles.iconAdd} name={iconAdd} size={20} color={'white'} />
                        <Text style={styles.addText}>Add it to my route</Text>
                        <Ionicons style={styles.iconListBox} name={iconListBox} size={20} color={'white'} />
                    </View>
                    <View style={styles.comments}>
                        <View style={styles.commentsHeader}>
                            <Text style={styles.reviews}>Reviews</Text>
                            <TextInput style={styles.saySomeThing}
                                placeholder="say something..."
                                placeholderTextColor="#34BAC0"
                            >
                            </TextInput>  
                        </View>
                        <MasonryList
                            data={this.state.comments}
                            renderItem={(item,index) => this.renderReviews(item)}
                            getHeightForItem={({ item }) => 2}
                            numColumns={1}
                            keyExtractor={item => item.id}
                            style={styles.masonry}
                        />
                    </View>
                </ScrollView>
            </View>
            )
        }
}

const styles = StyleSheet.create({
    main:{
        flexDirection:"column",
        backgroundColor:"white",
    },
    carousel:{
        justifyContent:"center",
        alignItems:"center"
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth:1,
        borderColor:"#A09D9C"
    },
    sliderWrapper:{
        width
    },
    itemImage:{
        width,
        height:2*height/5
    },
    mainComment:{
        width:width-12,
        marginLeft:6,
        marginRight:6,
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        minHeight:80,
        borderBottomWidth:3,
        borderBottomColor:"#EEEEEE",
        shadowColor:'black',
        shadowOffset:{h:100,w:100},
        shadowRadius:3,
        shadowOpacity:0.8
    },
    mainText:{
        flexWrap:"wrap"
    },
    addRoute:{
        width:width-10,
        height:100,
        flexDirection:"row",
        backgroundColor:"#34BAC0",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:20,
        borderColor:"white"
    },
    iconAdd:{
        color:"white",
        fontSize:20,
        marginRight:20
    },
    addText:{
        fontSize:20,
        color:"white"
    },
    iconListBox:{
        color:"white",
        fontSize:20,
        marginLeft:20
    },
    iconHeartEmpty:{

    },
    iconHeartFull:{

    },
    commentsHeader:{
        borderTopWidth:3,
        borderColor:"#E6E5E5",
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"space-evenly",
        alignItems:"center",
        height:60,
    },
    reviews:{
        fontSize:30,
        color:"#34BAC0"
    },
    saySomeThing:{
        borderRadius:18,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
        width:width*0.6,
        height:40,
        borderColor:"#34BAC0",
        borderWidth:2,
        textAlign:"center"
    },
    masonry:{
    },
    reviewWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:80,
        borderBottomWidth:2,
        borderBottomColor:"#E6E5E5",
        backgroundColor:"white",
    },
    reviewUser:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    reviewAvatar:{
        width:60,
        height:60,
        borderRadius:120,
        marginRight:10
    },
    reviewText:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    userName:{
        color:"#34BAC0"
    },
    reviewItem:{
        justifyContent:"flex-start",
        textAlign:"left"
    },
    reviewLove:{
        borderRightColor:'white',
        borderRightWidth:20,
        backgroundColor:'white',
        justifyContent:"center",
        alignItems:"center"
    }
  })