import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItemInfo, RefreshControl } from 'react-native';
import Copyright from '../components/Copyright';
import { NavigationProps, } from '../navigation'
import { getAlbumList, setAlbumsList } from '../redux/gallerySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAlbums } from '../services/api'
import { Album } from '../types/api.type'
import AlbumItem from '../components/AlbumItem'

type Props = NavigationProps<'Gallery'>;
function HomeScreen({ navigation }: Props) {

    const dispatch = useAppDispatch()
    const [refreshing, setRefreshing] = useState(false)

    const loadAlbums = useCallback(async () => {
        getAlbums()
            .then(response => {
                dispatch(setAlbumsList(response.data))
            }).catch(() => {
                console.log('Got error on loading albums')
            })
    }, [])

    const albums = useAppSelector(getAlbumList)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        loadAlbums().finally(() => {
            setRefreshing(false)
        })
    }, [])

    useEffect(() => {
        loadAlbums()
    }, [])

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        }}>
            <FlatList<Album>
                data={albums}
                horizontal
                initialNumToRender={10}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={listEmptyComponent}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        colors={["#7D4D8F", "#019592", "#FF7B16"]}
                        tintColor={"#DFDFE0"}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <Copyright />
        </View>
    );
}

const listEmptyComponent = () => {
    return <ActivityIndicator size='large' />
}

const renderItem = ({ item }: ListRenderItemInfo<Album>) => {
    return <AlbumItem item={item} />
}

export default HomeScreen;