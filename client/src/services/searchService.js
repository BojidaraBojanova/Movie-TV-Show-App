import * as request from '../lib/request';

export const search = async(query) => {
    const result = await request.get(`http://localhost:3000/search?q=${query}`);
    return result;
}