import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Copyright from '../components/Copyright';
import { NavigationProps } from '../navigation'
import { api } from '../services/api'
import { Album } from '../types/api.type'

type Props = NavigationProps<'Gallery'>;
function HomeScreen({ navigation }: Props) {
    const [albums, setAlbums] = useState<Album[]>([])

    const loadAlbums = async () => {
        const response = await api.get('/albums')
        setAlbums(response.data)
    }

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
                contentContainerStyle={{ alignItems: 'center'}}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{ width: 250, height: 250, borderWidth: 1, margin: 10 }}
                            onPress={() => navigation.navigate('Album', { albumId: item.id })}
                        >
                            <Text> {item.title} </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Copyright />
            {/* <Text>Home Screen</Text>
            <Button
                title="Go to Album"
                onPress={() => navigation.navigate('Album')}
            /> */}
        </View>
    );
}


export default HomeScreen;