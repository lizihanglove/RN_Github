import Types from "../types";
import DataStore, {STORAGE_FLAG} from "../../extend/dao/DataStore";
import {_projectModels, handleData} from '../ActionUtil'

/**
 * 请求流行界面数据
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {Function}
 */
export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, STORAGE_FLAG.popular)
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({type: Types.POPULAR_REFRESH_FAILED, storeName: storeName});
            });
    }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
    return dispatch => {
        setTimeout(() => {
            //已加载完全
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAILED,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModels: dataArray
                });
            } else {
                let number = pageSize * pageIndex;
                let max = number > dataArray.length ? dataArray.length : number;
                _projectModels(dataArray.slice(0, max), favoriteDao, models => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: models
                    });
                });
            }
        }, 500)
    }
}
