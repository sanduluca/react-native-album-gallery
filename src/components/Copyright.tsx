import React from 'react';
import { Text, View } from './Themed';


export default function Copyright() {
    return (
        <View style={{
            flex: 1,
            maxHeight: 48,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 4,
            marginTop: 16,
        }}>
            <Text >&copy; Sandu Luca</Text>
        </View>
    );
}
