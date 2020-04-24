import React, { Component } from "react";
import { View,Text,StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height, statusBarHeight, ios, isIPhoneX } from '../../config/Device';


export default class RouteTop extends Component{
    render(){
        let prefix = Platform.OS === "ios"?'ios-':'md-'
        let iconPerson = prefix+'person'
        return (
            <View style={styles.section}>
                    <Ionicons style={styles.iconPerson} name={iconPerson} size={30} color={"#34BAC0"} />
                    <Text style={styles.routeTitle}>My Route</Text>  
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
        justifyContent: 'center'
    },
    iconPerson:{
        marginRight:20
    },
    routeTitle:{
        fontSize:20
    }
})