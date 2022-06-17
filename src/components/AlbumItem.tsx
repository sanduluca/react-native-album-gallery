import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../navigation'
import { useGetAlbumPhotosByIdQuery } from '../services/galleryApi';
import { Album } from '../types/api.type';

interface Props {
    item: Album
};

function AlbumItem({ item }: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const albumId = item.id
    const { data, error, isLoading, isError, isFetching } = useGetAlbumPhotosByIdQuery(albumId)


    if (isLoading || isFetching) {
        <ActivityIndicator size='large' />
    }

    if (!data) return null


    return (
        <TouchableOpacity
            style={{ maxWidth: 200, margin: 10 }}
            onPress={() => navigation.navigate('Album', { albumId: item.id })}
            disabled={isError}
        >
            <View style={{ width: 200, height: 200 }}>
                {error && (
                    <View style={{
                        width: 200,
                        height: 200,
                        borderWidth: 1,
                        borderColor: '#000',
                    }}>
                        <Text style={{ color: '#000' }}>Could not load the album</Text>
                    </View>
                )}
                {data.length > 0 && <FastImage
                    key={item.id}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={{
                        uri: data[0].thumbnailUrl,
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
                    <Text style={{ opacity: 0.4, fontSize: 16, color: '#000' }}>{data.length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default AlbumItem;