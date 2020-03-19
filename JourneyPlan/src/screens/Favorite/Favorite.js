import { Button,View,Text } from "react-native";

export default function Favorite( { navigation } ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Favorite</Text>
                <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
}