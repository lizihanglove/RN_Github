import Types from "../types";
import {_projectModels} from '../ActionUtil'
import FavoriteDao from "../../extend/dao/FavoriteDao";
import ProjectModel from "../../model/ProjectModel";

/**
 * 请求收藏界面数据
 * @param flag 标志位
 * @param isShowLoading 是否在显示中
 * @returns {Function}
 */
export function onRefreshFavorite(flag, isShowLoading) {
    return dispatch => {
        if (isShowLoading){
            dispatch({type: Types.FAVORITE_REFRESH, storeName: flag});
        }
        let favoriteDao = new FavoriteDao(flag);
        favoriteDao.getAllFavoriteItems()
            .then(items => {
                console.log(items);
                if (items) {
                    let resultData = items.map((item, index, items) => {
                        return new ProjectModel(item, true);
                    });
                    dispatch({
                        type: Types.FAVORITE_REFRESH_SUCCESS,
                        projectModels: resultData,
                        storeName: flag
                    });
                } else {
                 throw new Error('暂无数据');
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.FAVORITE_REFRESH_FAIL,
                    error: error,
                    storeName: flag
                });
            });
    }
}

export function onLoadMoreFavorite(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
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
