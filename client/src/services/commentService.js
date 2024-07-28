import * as request from '../lib/request';

const movieBaseUrl = 'http://localhost:3000/movies';
const tvShowBaseUrl = 'http://localhost:3000/tvShows';


export const getAllMoviesComments = async(movieId) => {

    const result = await request.get(`${movieBaseUrl}/${movieId}/comments`);

    return result;
}

export const getAllTvShowComments = async(tvShowId) => {

    const result = await request.get(`${tvShowBaseUrl}/${tvShowId}/comments`);

    return result;
}

export const createMovie = async (movieId, commentData) => {
    const newComment = await request.post(`${movieBaseUrl}/${movieId}/comments`, commentData)

    return newComment;
}

export const createTvShow = async (tvShowId, commentData) => {
    const newComment = await request.post(`${tvShowBaseUrl}/${tvShowId}/comments`, commentData)

    return newComment;
}