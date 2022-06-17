import React from 'react';
import { TouchableOpacity, } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text } from './Themed';

function RetryButon({ onPress }: { onPress: () => any }) {

    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 120, height: 48,
                borderWidth: 1,
                borderColor: Colors[colorScheme].text,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text >Retry</Text>
        </TouchableOpacity>
    );
}


export default RetryButon;