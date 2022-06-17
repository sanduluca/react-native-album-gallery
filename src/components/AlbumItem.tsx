import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed'
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
            style={styles.touchable}
            onPress={() => navigation.navigate('Album', { albumId: item.id })}
            disabled={isError}
        >
            <View>

                {error && (
                    <View style={[styles.imageContainerSize, {
                        borderWidth: 1,
                        borderColor: '#000',
                    }]}>
                        <Text>Could not load the album</Text>
                    </View>
                )}

                {data.length > 0 && <FastImage
                    key={item.id}
                    style={styles.imageContainerSize}
                    source={{
                        uri: data[0].thumbnailUrl,
                        headers: { 'User-Agent': 'GalleryApp' },
                    }}
                    resizeMode="cover"
                />}
            </View>

            <View style={styles.titleAndTotalImgContainer}>
                <View style={styles.albumTitleContainer}>
                    <Text numberOfLines={2} style={styles.text}>{item.title} </Text>
                </View>
                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <Text style={[styles.text, { opacity: 0.4 }]}>{data.length}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}


export default AlbumItem;

const styles = StyleSheet.create({
    albumTitleContainer: {
        flex: 8,
        marginRight: 4,
    },
    titleAndTotalImgContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 16
    },
    imageContainerSize: {
        width: 200,
        height: 200,
    },
    touchable: {
        maxWidth: 200,
        margin: 10
    },
})