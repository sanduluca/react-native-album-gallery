import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View, FlatList, Dimensions, Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'
import FastImage from 'react-native-fast-image'
import ImageItem from './ImageItem'
import ImageViewerHeader from './ImageViewerHeader'
import ImageViewerLoadingIndicator from '../../components/LoadingIndicator'
import { NavigationProps } from '../../navigation'
import { api } from '../../services/api'
import { Photo } from '../../types/api.type';
import Copyright from '../../components/Copyright';


const { width: screenWidth, } = Dimensions.get('screen')
const IMG_PER_ROW = 3

function AlbumScreen({ route }:  NavigationProps<'Album'>) {
    const { albumId } = route.params

    const [photos, setPhotos] = useState<Photo[]>([])
    const [activePhoto, setActivePhoto] = useState<null | number>(null)

    const hideImageViewer = useCallback(() => {
        setActivePhoto(null)
    }, [])

    const imageUrls = useMemo(() => {
        return photos.map((img) => ({ url: img.url }))
    }, [photos])

    const renderImageViewerHeader = useCallback(() => {
        return (
            <ImageViewerHeader onClosePress={hideImageViewer} />
        )
    }, [imageUrls])


    const loadPhotos = useCallback(async () => {
        api.get(`/photos?albumId=${albumId}`).then(response => {
            setPhotos(response.data)
        }).catch((e) => {
            console.log('Error on loading photos', e)
        })
    }, [])

    useEffect(() => {
        loadPhotos()
    }, [])

    return (
        <View style={{}}>
            <FlatList<Photo>
                data={photos}
                initialNumToRender={10}
                scrollEventThrottle={16}
                numColumns={IMG_PER_ROW}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <ImageItem
                            key={item.url}
                            item={item}
                            index={index}
                            size={screenWidth / IMG_PER_ROW}
                            setActivePhoto={setActivePhoto}
                        />
                    )
                }}
                ListFooterComponent={Copyright}
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

const renderImageViewerImage = (props: any) => {
    return <FastImage {...props} source={{
        ...props.source,
        headers: { 'User-Agent': 'GalleryApp' },
    }} />
}

const renderIndicator = () => <></>


export default AlbumScreen;