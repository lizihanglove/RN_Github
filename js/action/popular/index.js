import Types from "../types";
import DataStore from "../../extend/dao/DataStore";


/**
 * 请求流行界面数据
 * @param storeName
 * @param url
 * @returns {Function}
 */
export function onLoadPopularData(storeName, url) {
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
                handleData(dispatch, storeName, data);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.LOAD_POPULAR_FAILED,
                    storeName: storeName
                });
            });
    }
}

/**
 * 处理数据
 * @param dispatch
 * @param storeName
 * @param data
 */
function handleData(dispatch, storeName, data) {
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data.items,
        storeName: storeName,
    })
}
