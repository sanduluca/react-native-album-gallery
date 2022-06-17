// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Album, Photo } from '../types/api.type'

// Define a service using a base URL and expected endpoints
export const galleryApi = createApi({
    reducerPath: 'galleryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getAlbumsList: builder.query<Album[], void>({
            query: () => `albums`,
        }),
        getAlbumPhotosById: builder.query<Photo[], number>({
            query: (id) => `photos?albumId=${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAlbumsListQuery, useGetAlbumPhotosByIdQuery } = galleryApi