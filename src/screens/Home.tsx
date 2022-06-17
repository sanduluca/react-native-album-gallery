import React from 'react';
import {
    FlatList, ActivityIndicator,
    ListRenderItemInfo, RefreshControl
} from 'react-native';
import { Text, View } from '../components/Themed'
import Copyright from '../components/Copyright';
import { NavigationProps, } from '../navigation'
import { Album } from '../types/api.type'
import AlbumItem from '../components/AlbumItem'
import { useGetAlbumsListQuery } from '../services/galleryApi'
import RetryButon from '../components/RetryButon';

type Props = NavigationProps<'Gallery'>;
function HomeScreen({ navigation }: Props) {

    const { data, error, isLoading, refetch, isFetching } = useGetAlbumsListQuery()



    if (isLoading || isFetching) {
        return <ActivityIndicator size='large' />
    }

    if (error) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>Could not get the albums</Text>
                <RetryButon onPress={refetch} />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <FlatList<Album>
                data={data}
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
                        refreshing={isLoading}
                        onRefresh={refetch}
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