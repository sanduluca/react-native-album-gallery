import axios from 'axios';
import { Album, Photo } from '../types/api.type';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})


export const getPhotosByAlbum = (albumId: string | number) => api.get<Photo[]>(`/photos?albumId=${albumId}`)
export const getAlbums = () => api.get<Album[]>('/albums')