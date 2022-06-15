import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProps } from '../navigation'

type Props = NavigationProps<'Gallery'>;

function HomeScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Album"
                onPress={() => navigation.navigate('Album')}
            />
        </View>
    );
}


export default HomeScreen;