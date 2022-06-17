import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../navigation'
import { getAlbumPhotosById, setAlbumPhotos } from '../redux/gallerySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { api } from '../services/api';
import { Album, Photo } from '../types/api.type';

interface Props {
    item: Album
};

function AlbumItem({ item }: Props) {

    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const albumId = item.id
    const photos = useAppSelector(state => getAlbumPhotosById(state, albumId)) || []

    const loadPhotos = useCallback(async () => {
        api.get<Photo[]>(`/photos?albumId=${albumId}`).then(response => {
            dispatch(setAlbumPhotos({ id: albumId, photos: response.data }))
        }).catch((e) => {
            console.log('Error on loading photos', e)
        })
    }, [])

    useEffect(() => {
        if (photos.length === 0) {
            loadPhotos()
        }
    }, [])

    return (
        <TouchableOpacity
            style={{ maxWidth: 200, margin: 10 }}
            onPress={() => navigation.navigate('Album', { albumId: item.id })}
        >
            <View style={{ width: 200, height: 200 }}>
                {photos.length > 0 && <FastImage
                    key={item.id}
                    style={{
                        width: 200,
                        height: 200,
                        borderWidth: 1,
                        borderColor: '#fff',

                    }}
                    source={{
                        uri: photos[0].thumbnailUrl,
                        headers: { 'User-Agent': 'GalleryApp' },
                    }}
                    resizeMode="cover"
                />}
            </View>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 8, marginRight: 4 }}>
                    <Text numberOfLines={2} style={{ fontSize: 16, color: '#000' }}>{item.title} </Text>
                </View>
                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <Text style={{ opacity: 0.4, fontSize: 16, color: '#000' }}>{photos.length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default AlbumItem;