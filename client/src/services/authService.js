import * as request from '../lib/request';

const baseUrl = 'http://localhost:3000/users';

export const register = (firstName, lastName, email, password) => request.post(`${baseUrl}/register`, {
    firstName,
    lastName,
    email,
    password
})

export const login = async(email, password) => {
    const result = await request.post(`${baseUrl}/login`,{
        email,
        password
    })

    return result;
}

export const logout = () => request.get(`${baseUrl}/logout`);