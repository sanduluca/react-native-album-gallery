import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Album as IAlbum, Photo as IPhoto } from '../types/api.type';

export interface GalleryState {
    albumsList: IAlbum[]
    albums: Record<number, IPhoto[]>
}

const initialState: GalleryState = {
    albumsList: [],
    albums: {},
};

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        setAlbumsList: (state, action: PayloadAction<IAlbum[]>) => {
            state.albumsList = action.payload
        },
        setAlbumPhotos: (state, action: PayloadAction<{ id: number, photos: IPhoto[] }>) => {
            state.albums[action.payload.id] = action.payload.photos
        },
    },
});

export const { setAlbumsList, setAlbumPhotos } = gallerySlice.actions;

export const getAlbumList = (state: RootState) => state.gallery.albumsList;
export const getAlbums = (state: RootState) => state.gallery.albums;
export const getAlbumPhotosById = (state: RootState, albumId: number) => state.gallery.albums[albumId];

export default gallerySlice.reducer;