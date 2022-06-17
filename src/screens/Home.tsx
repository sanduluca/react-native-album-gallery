import React, { useCallback, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, ListRenderItemInfo } from 'react-native';
import Copyright from '../components/Copyright';
import { NavigationProps, } from '../navigation'
import { getAlbumList, setAlbumsList } from '../redux/gallerySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { api } from '../services/api'
import { Album } from '../types/api.type'
import AlbumItem from '../components/AlbumItem'

type Props = NavigationProps<'Gallery'>;
function HomeScreen({ navigation }: Props) {

    const dispatch = useAppDispatch()

    const loadAlbums = useCallback(async () => {
        const response = await api.get<Album[]>('/albums')
        dispatch(setAlbumsList(response.data))
    }, [])

    const albums = useAppSelector(getAlbumList)

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