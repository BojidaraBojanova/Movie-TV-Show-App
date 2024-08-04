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

export const editUser = async (userId, updates) => {
    try {
        const result = await request.put(`${baseUrl}/${userId}`, updates);
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const getUserById = async(userId) => {
    try {
        const result = await request.get(`${baseUrl}/${userId}`)
        return result
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
