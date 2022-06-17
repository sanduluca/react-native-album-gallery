import React, { useState, useCallback, useMemo } from 'react';
import {
    View, FlatList, Dimensions, Modal, ActivityIndicator, Text, ListRenderItemInfo, RefreshControl,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'
import FastImage from 'react-native-fast-image'
import ImageItem from './ImageItem'
import ImageViewerHeader from './ImageViewerHeader'
import ImageViewerLoadingIndicator from '../../components/LoadingIndicator'
import { NavigationProps } from '../../navigation'
import { Photo } from '../../types/api.type';
import Copyright from '../../components/Copyright';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAlbumPhotosById, setAlbumPhotos } from '../../redux/gallerySlice';
import { getPhotosByAlbum } from '../../services/api';


const { width: screenWidth, } = Dimensions.get('screen')
const IMG_PER_ROW = 3

function AlbumScreen({ route }: NavigationProps<'Album'>) {
    const { albumId } = route.params

    const dispatch = useAppDispatch()
    const [refreshing, setRefreshing] = useState(false)

    const photos = useAppSelector(state => getAlbumPhotosById(state, albumId))

    const [activePhoto, setActivePhoto] = useState<null | number>(null)

    const hideImageViewer = useCallback(() => {
        setActivePhoto(null)
    }, [])

    const imageUrls = useMemo(() => {
        if (!photos) {
            return []
        }
        return photos.map((img) => ({ url: img.url }))
    }, [photos])

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

    const loadPhotos = useCallback(async () => {
        getPhotosByAlbum(albumId).then(response => {
            dispatch(setAlbumPhotos({ id: albumId, photos: response.data }))
        }).catch((e) => {
            console.log('Error on loading photos', e)
        })
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        loadPhotos().finally(() => {
            setRefreshing(false)
        })
    }, [])

    if (!photos) {
        return <Loading />
    }

    return (
        <View style={{}}>
            <FlatList<Photo>
                data={photos}
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
                        refreshing={refreshing}
                        onRefresh={onRefresh}
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

const Loading = () => {
    return (
        <View style={{
            marginVertical: 32,
            flex: 1,
            alignItems: 'center'
        }}>
            <ActivityIndicator size='large' />
            <Text style={{ marginTop: 8 }}>Loading...</Text>
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