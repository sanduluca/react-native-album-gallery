import React, { useState, useCallback, useMemo } from 'react';
import {
    FlatList, Modal, ActivityIndicator,
    ListRenderItemInfo, RefreshControl,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'
import FastImage from 'react-native-fast-image'
import { View, Text } from '../../components/Themed'
import layout from '../../constants/Layout'
import ImageItem from './ImageItem'
import ImageViewerHeader from './ImageViewerHeader'
import ImageViewerLoadingIndicator from '../../components/LoadingIndicator'
import { NavigationProps } from '../../navigation'
import { Photo } from '../../types/api.type';
import Copyright from '../../components/Copyright';
import { useGetAlbumPhotosByIdQuery } from '../../services/galleryApi';
import RetryButon from '../../components/RetryButon';


const { width: screenWidth, } = layout.window
const IMG_PER_ROW = 3

function AlbumScreen({ route }: NavigationProps<'Album'>) {
    const { albumId } = route.params


    const { data, error, isLoading, isFetching, refetch } = useGetAlbumPhotosByIdQuery(albumId)

    const [activePhoto, setActivePhoto] = useState<null | number>(null)

    const hideImageViewer = useCallback(() => {
        setActivePhoto(null)
    }, [])

    const imageUrls = useMemo(() => {
        if (!data) {
            return []
        }
        return data.map((img) => ({ url: img.url }))
    }, [data])

    const renderImageViewerHeader = useCallback(() => {
        return <ImageViewerHeader onClosePress={hideImageViewer} />
    }, [imageUrls])

    const renderItem = useCallback(({ item, index }: ListRenderItemInfo<Photo>) => {
        return (
            <ImageItem
                key={item.url}
                item={item}
                index={index}
                size={screenWidth / IMG_PER_ROW}
                setActivePhoto={setActivePhoto}
            />
        )
    }, [])

    if (isLoading || isFetching) {
        return <ActivityIndicator size='large' />
    }

    if (error) {
        return (
            <View>
                <Text>Could not get the album photos</Text>
                <RetryButon onPress={refetch} />
            </View>
        )
    }


    return (
        <View>
            <FlatList<Photo>
                data={data}
                initialNumToRender={10}
                scrollEventThrottle={16}
                numColumns={IMG_PER_ROW}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={listEmptyComponent}
                ListFooterComponent={Copyright}
                refreshControl={
                    <RefreshControl
                        colors={["#7D4D8F", "#019592", "#FF7B16"]}
                        tintColor={"#DFDFE0"}
                        refreshing={isLoading}
                        onRefresh={refetch}
                    />
                }
            />
            <Modal visible={activePhoto !== null} onRequestClose={hideImageViewer}>
                <ImageViewer
                    imageUrls={imageUrls}
                    index={activePhoto || 0}
                    renderIndicator={renderIndicator}
                    renderImage={renderImageViewerImage}
                    useNativeDriver
                    doubleClickInterval={350}
                    enableSwipeDown
                    swipeDownThreshold={130}
                    enablePreload
                    loadingRender={ImageViewerLoadingIndicator}
                    saveToLocalByLongPress={false}
                    onSwipeDown={hideImageViewer}
                    onCancel={hideImageViewer}
                    renderHeader={renderImageViewerHeader}
                />
            </Modal>
        </View>
    );
}

const keyExtractor = (_: Photo, index: number) => index.toString()

const listEmptyComponent = () => {
    return (
        <View style={{
            marginVertical: 32,
            flex: 1,
            alignItems: 'center'
        }}>
            <Text style={{ marginTop: 8 }}>Album has no photos</Text>
        </View>
    )
}

const renderImageViewerImage = (props: any) => {
    return <FastImage {...props} source={{
        ...props.source,
        headers: { 'User-Agent': 'GalleryApp' },
    }} />
}

const renderIndicator = () => <></>


export default AlbumScreen;