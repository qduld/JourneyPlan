import React, { Component } from "react";
import { 
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';
import  userInfo from "../../../json/userInfo.json";
import { imgArr } from "../../assets/img_arr";

export default class FavoriteTop extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        let prefix = Platform.OS === "ios"?'ios-':'md-'
        let iconBack = prefix+'arrow-back'
        let iconHeart = prefix+'heart'
        let iconShare = prefix+'share'

        let currentImg = ''
        for(var key in imgArr){
          if(userInfo.url.indexOf(key)!=-1){
             currentImg = imgArr[key]
          }
        }

        const navigation = this.props;
        return (
            <View style={styles.section}>
                    <View style={styles.userInfo}>
                        <TouchableHighlight style={styles.backPress} onPress={()=>{navigation.goBack()}}>
                            <Ionicons style={styles.iconBack} name={iconBack} size={30} color={"black"} />  
                        </TouchableHighlight>
                        <Image 
                            source={currentImg}
                            style={styles.avatar}
                        /> 
                        <Text style={styles.routeTitle}>{userInfo.name}</Text>
                    </View>
                    <View style={styles.iconArea}>
                        <Ionicons style={styles.iconHeart} name={iconHeart} size={30} color={"#34BAC0"} />  
                        <Ionicons style={styles.iconShare} name={iconShare} size={30} color={"#34BAC0"} />  
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    section: {
        flex:1,
        width,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    userInfo: {
        flex:2,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#fff'
    },
    iconArea:{
        flex:1, 
        right:40,
        position:"absolute",
        flexDirection:"row",
        alignItems: 'center',
    },
    backPress:{
        backgroundColor:'#fff',
    },
    iconBack:{  
        borderRightWidth:20,
        borderRightColor:'#fff',
        backgroundColor:'#fff'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:100,
        marginRight:10
    },
    iconHeart:{
        marginRight:20
    },
    iconShare:{
    }
})