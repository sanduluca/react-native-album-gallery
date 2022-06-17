import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Photo } from '../../types/api.type';

interface ImageItemProps {
    item: Photo
    setActivePhoto: (i: number) => void
    index: number
    size: number
}

const ImageItem = ({ item, setActivePhoto, index, size }: ImageItemProps) => {

    return (
        <TouchableWithoutFeedback onPress={() => setActivePhoto(index)}>
            <FastImage
                key={item.id}
                style={{
                    width: size,
                    height: size,
                    borderWidth: 1,
                    borderColor: '#fff'
                }}
                source={{
                    uri: item.thumbnailUrl,
                    headers: { 'User-Agent': 'GalleryApp' },
                }}
                resizeMode="cover"
            />
        </TouchableWithoutFeedback>
    )
}


export default ImageItem;