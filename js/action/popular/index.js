import Types from "../types";
import DataStore from "../../extend/dao/DataStore";


/**
 * 请求流行界面数据
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {Function}
 */
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch(
            {
                type: Types.POPULAR_REFRESH,
                storeName: storeName
            }
        );
        let dataStore = new DataStore();
        dataStore.fetData(url)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAILED,
                    storeName: storeName
                });
            });
    }
}

export function onLoadMorePopularData(storeName, pageIndex, pageSize, dataArray = [], callback) {
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

/**
 * 处理数据
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: data && data.data.items,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName,
        pageIndex: 1
    });
}
