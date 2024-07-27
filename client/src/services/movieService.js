import * as request from "../lib/request";

const baseUrl = 'http://localhost:3000/movies'

export const add = async(movieData) => {
    const result = await request.post(`${baseUrl}/add`, movieData);

    return result.data;
}