import { Button,View,Text } from "react-native";

export default function Create( { navigation } ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Create screen</Text>
                <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
}