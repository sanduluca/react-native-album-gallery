import React from 'react';
import {
    Text, TouchableOpacity,
} from 'react-native';

function RetryButon({ onPress }: { onPress: () => any }) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 120, height: 48,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{ color: '#000' }}>Retry</Text>
        </TouchableOpacity>
    );
}


export default RetryButon;