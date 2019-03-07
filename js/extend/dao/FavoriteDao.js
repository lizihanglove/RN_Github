import {AsyncStorage}  from "react-native";

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteDao {

    /**
     *
     * @param flag
     */
    constructor(flag) {
        this.favoriteKey = '' + FAVORITE_KEY_PREFIX + flag;
    }

    /**
     * 保存收藏的数据
     * @param key
     * @param value
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, true);
            }
        });
    }


    /**
     * 更新数据
     * @param key
     * @param isAdd
     */
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1);
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        });
    }


    /**
     * 返回所有收藏的key
     */
    getAllFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        });
    }

    /**
     * 获取所有收藏的条目
     */
    getAllFavoriteItems() {
        return new Promise((resolve, reject) => {
            this.getAllFavoriteKeys()
                .then(keys => {
                    let items = [];
                    if (keys) {
                        AsyncStorage.multiGet(keys, (error, stores) => {
                            try {
                                stores.map((result, i, store) => {
                                    let key = store[i][0];
                                    let value = store[i][1];
                                    if (value) {
                                        items.push(JSON.parse(value));
                                    }
                                });
                                resolve(items);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    } else {
                        resolve(items);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * 移除收藏条目
     * @param key 关键字
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }

}