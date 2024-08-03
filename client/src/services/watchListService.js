import * as request from "../lib/request";

const baseUrl = 'http://localhost:3000/watchList';

export const add = async (userId, itemId, itemType) => {
    try {
        const response = await request.post(`${baseUrl}/add`, { userId, itemId, itemType });
        if (response.success) {
            return response;
        } else {
            throw new Error('Failed to add item');
        }
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        throw error;
    }
};

export const getWatchList = async (userId) => {
    try {
        const result = await request.get(`${baseUrl}/${userId}`);
        console.log('Watchlist fetch result:', result);
        if (result.success && Array.isArray(result.watchList)) {
            return result;
        } else {
            throw new Error('Invalid watchlist data');
        }

    } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw error; // Ensure you throw errors to be caught by the caller
    }
};

export const remove = async (userId, itemId, itemType) => {
    try {
        const response = await request.remove(`${baseUrl}/remove`, { userId, itemId, itemType });
        if (response.success) {
            return response;
        } else {
            throw new Error('Failed to remove item');
        }
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        throw error;
    }
    
};

