import React from "react";
import { Button,View,Text } from "react-native";

export default function Home( { navigation } ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home screen</Text>
                <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
}