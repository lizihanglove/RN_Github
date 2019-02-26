import Types from "../types";
import DataStore, {STORAGE_FLAG} from "../../extend/dao/DataStore";
import {handleData} from '../ActionUtil'

/**
 * 请求流行界面数据
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {Function}
 */
export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, STORAGE_FLAG.popular)
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({type: Types.POPULAR_REFRESH_FAILED, storeName: storeName});
            });
    }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callback) {
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
                    projectModes: dataArray
                });
            } else {
                let number = pageSize * pageIndex;
                let max = number > dataArray.length ? dataArray.length : number;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                });
            }
        }, 500)
    }
}
