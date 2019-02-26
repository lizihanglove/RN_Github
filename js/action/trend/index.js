import Types from "../types";
import DataStore, {STORAGE_FLAG} from "../../extend/dao/DataStore";
import {handleData} from "../ActionUtil";


/**
 * 请求流行界面数据
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {Function}
 */
export function onRefreshTrend(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.TRENDING_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, STORAGE_FLAG.trend)
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({type: Types.TRENDING_REFRESH_FAIL,storeName: storeName});
            });
    }
}

/**
 *上拉加载更多
 *
 * @param storeName
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param callback
 * @returns {Function}
 */
export function onLoadMoreTrend(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            //已加载完全
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                });
            } else {
                let number = pageSize * pageIndex;
                let max = number > dataArray.length ? dataArray.length : number;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                });
            }
        }, 500);
    }
}

