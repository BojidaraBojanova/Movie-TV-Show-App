import * as request from "../lib/request";

const baseUrl = 'http://localhost:3000/movies'

export const add = async(movieData) => {
    const result = await request.post(`${baseUrl}/add`, movieData);

    return result.data;
}

export const getAll = async() => {
    const result = await request.get(baseUrl);

    return result;
}

export const getOne = async(movieId) => {
    const result = await request.get(`${baseUrl}/${movieId}`,);

    return result;
}

export const rateMovie = async(movieId, userId, rating) => {
    return await request.post(`${baseUrl}/${movieId}/rate`, {userId, rating: Number(rating)})
}

export const edit = async (movieId, movieData) => {
    const result = await request.put(`${baseUrl}/edit/${movieId}`, movieData)

    return result;
}

export const remove = async (movieId) => request.remove(`${baseUrl}/${movieId}`)