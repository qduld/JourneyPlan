import React, { Component } from "react";
import { Button,View,Text,StyleSheet,DeviceEventEmitter } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';

export default class TopOptions extends Component{

    _searchPosSection(inputData){
        DeviceEventEmitter.emit('searchPosSet',inputData)
    }

    render(){
        let prefix = Platform.OS === "ios"?'ios-':'md-'
        let iconCamera = prefix+'camera'
        let iconSearch = prefix+'search'
        let iconMail = prefix+'mail'
        return (
            <View style={styles.section}>
                <View style={styles.search}>
                    <Ionicons style={styles.searchIcon} name={iconSearch} size={20} color={"#34BAC0"} />
                    <TextInput style={styles.searchInput} onChangeText={this._searchPosSection}></TextInput>  
                    <Ionicons style={styles.cameraIcon} name={iconCamera} size={20} color={"#34BAC0"} />
                </View>
                <Ionicons style={styles.mailIcon} name={iconMail} size={20} color={"#34BAC0"} />
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
        justifyContent: 'space-between'
    },
    search:{
        borderRadius:18,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
        width:width*0.8,
        height:40
    },
    searchIcon:{
        marginLeft:10
    },
    searchInput:{
        flex:1
    },
    cameraIcon:{
        marginRight:10
    },
    mailIcon:{
        flexGrow:1,
        justifyContent: 'center',
        textAlign:"center"
    }
})