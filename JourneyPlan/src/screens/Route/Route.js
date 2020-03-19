import { Button,View,Text } from "react-native";

export default function Route( { navigation } ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Route screen</Text>
                <Button
                title="Go to Route"
                onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
}