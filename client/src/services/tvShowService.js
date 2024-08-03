import * as request from "../lib/request";

const baseUrl = 'http://localhost:3000/tvShows'

export const add = async(tvShowData) => {
    const result = await request.post(`${baseUrl}/add`, tvShowData);

    return result.data;
}

export const getAll = async() => {
    const result = await request.get(baseUrl);

    return result;
}

export const getOne = async(tvShowId) => {
    const result = await request.get(`${baseUrl}/${tvShowId}`,);

    return result;
}


export const getAllTvShowByUser = async(userId) => {
    const result = await request.get(`${baseUrl}/${userId}/addedTvShows`)

    return result;
}

export const rateTvShow = async(tvShowId, userId, rating) => {
    return await request.post(`${baseUrl}/${tvShowId}/rate`, {userId, rating: Number(rating)})
}

export const edit = async (tvShowId, tvShowData) => {
    const result = await request.put(`${baseUrl}/edit/${tvShowId}`, tvShowData)

    return result;
}

export const remove = async (tvShowId) => request.remove(`${baseUrl}/${tvShowId}`)