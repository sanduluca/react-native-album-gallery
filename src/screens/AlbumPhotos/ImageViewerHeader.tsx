import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ImageViewerHeader = ({ onClosePress }: { onClosePress: () => void }) => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                overflow: "hidden",
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 52,
                alignItems: 'center',
                backgroundColor: 'black'
            }}
        >
            <TouchableOpacity style={{
                width: 48,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}
                onPress={onClosePress}>
                <Text style={{ color: 'white' }}>X</Text>
            </TouchableOpacity>

        </View>
    )
}




export default ImageViewerHeader;