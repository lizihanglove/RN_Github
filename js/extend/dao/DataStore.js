import {AsyncStorage} from "react-native";
import GitHubTrending from "GitHubTrending";

export const STORAGE_FLAG = {popular: 'popular', trend: 'trend'};

export default class DataStore {

    /**
     * 请求数据
     * @param url
     * @param flag
     * @returns {Promise<any> | Promise}
     */
    fetchData(url, flag) {

        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(wrappedData => {
                    console.log(wrappedData);
                    let valid = wrappedData && DataStore.checkTimestampValid(wrappedData.timestamp);
                    if (valid) {
                        resolve(wrappedData);
                    } else {
                        this.fetchNetData(url, flag)
                            .then(data => {
                                console.log(data);
                                resolve(DataStore._wrapData(data));
                            })
                            .catch(error => {
                                console.log(error);
                                reject(error);
                            });
                    }
                })
                .catch(error => {
                    this.fetchNetData(url, flag)
                        .then((data) => {
                            console.log(data);
                            resolve(DataStore._wrapData(data));
                        })
                        .catch((error => {
                            console.log(error);
                            reject(error);
                        }));
                });
        });
    }


    /**
     * 获取本地数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    console.log(result);
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.log(e);
                    }
                } else {
                    console.log(error);
                    reject(error);
                }
            });
        });
    }

    /**
     * 请求网络数据
     * @param url
     * @param flag
     * @returns {Promise<any> | Promise}
     */
    fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {

            if (flag === STORAGE_FLAG.popular) {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(responseData => {
                        console.log(responseData);
                        this.saveData(url, responseData);
                        resolve(responseData);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            } else {
                new GitHubTrending().fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw new Error('responseData is null');
                        }
                        console.log(items);
                        this.saveData(url, items);
                        resolve(items);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    })
            }
        })
    }

    /**
     * 检查时间是否有效
     * @param timestamp
     * @returns {boolean}
     */
    static checkTimestampValid(timestamp) {
        const currentTime = new Date();
        const targetTime = new Date();

        targetTime.setTime(timestamp);

        if (currentTime.getMonth() !== targetTime.getMonth()) {
            return false;
        }
        if (currentTime.getDate() !== targetTime.getDate()) {
            return false;
        }
        return currentTime.getHours() === targetTime.getHours();
    }

    /**
     * 存储数据
     * @param url
     * @param data
     * @param callback
     * @returns {number}
     */
    saveData(url, data, callback) {
        if (!data || !url) {
            return 0;
        }
        AsyncStorage.setItem(url, JSON.stringify(DataStore._wrapData(data)), callback)
    }

    /**
     * 为存储的数据添加时间戳
     * @param data
     * @returns {{data: *, timestamp: number}}
     * @private
     */
    static _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()}
    }

}