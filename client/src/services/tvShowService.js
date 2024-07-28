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