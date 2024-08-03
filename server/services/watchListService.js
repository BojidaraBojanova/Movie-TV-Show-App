const User = require('../models/User');
const WatchList = require('../models/WatchList')

const addToWatchList = async(userId, itemId, itemType) => {
    try {
        const allowedTypes = ['Movie', 'Series'];
        if(!allowedTypes.includes(itemType)){
            throw new Error('Invalid item type');
        }

        const user = await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }

        const existingItem = user.watchList.find(watchListItem => watchListItem.item.toString() === itemId && watchListItem.watchListModel === itemType)
    
        if(existingItem){
            throw new Error(`${itemType} already in watch list`);
        }

        user.watchList.push({
            item: itemId,
            watchListModel: itemType
        });

        await user.save()

        let watchList = await WatchList.findOne({ user: userId });

        if(!watchList) {
            watchList = new WatchList({ user: userId, items: [] });
        }

        watchList.items.push({
            item: itemId,
            itemModel: itemType
        })

        await watchList.save();

        return { success: true, message: `${itemType} added to watch list`};
    } catch (error) {
        console.error(error);
        return {success: false, message: error.message};
    }
}

const getWatchList = async(userId) => {
    try {
        const watchList = await WatchList.findOne({ user: userId }).populate('items.item');
        console.log('WatchList data:', watchList)
        if (!watchList) {
            return { success: true, watchList: [] };
        }
        if (Array.isArray(watchList.items)) {
            return { success: true, watchList: watchList.items };
        } else {
            throw new Error('Invalid watchlist data structure');
        }
        return { success: true, watchList: watchList.items };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

const removeFromWatchList = async (userId, itemId, itemType) => {
    try {
        const allowedTypes = ['Movie', 'Series'];
        if (!allowedTypes.includes(itemType)) {
            throw new Error('Invalid item type');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.watchList = user.watchList.filter(
            (watchListItem) => !(watchListItem.item.toString() === itemId && watchListItem.watchListModel === itemType)
        );
        await user.save();

        let watchList = await WatchList.findOne({ user: userId });
        if (watchList) {
            watchList.items = watchList.items.filter(
                (item) => !(item.item.toString() === itemId && item.itemModel === itemType)
            );
            await watchList.save();
        }

        return { success: true, message: `${itemType} removed from watch list` };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
};

module.exports = {
    addToWatchList,
    getWatchList,
    removeFromWatchList
}