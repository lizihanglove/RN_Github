import Types from '../../action/types';

const defaultState = {};
export default function onAction(state = defaultState, action) {
    switch (action.type) {

        case Types.FAVORITE_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true
                }
            };
        case Types.FAVORITE_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items,
                    projectModels: action.projectModels,
                    isLoading: false
                }
            };

        case Types.FAVORITE_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
        // case Types.POPULAR_LOAD_MORE_SUCCESS:
        //     return {
        //         ...state,
        //         [action.storeName]: {
        //             ...state[action.storeName],
        //             projectModels: action.projectModels,
        //             hideLoadingMore: false,
        //             pageIndex: action.pageIndex,
        //         }
        //     };
        // case Types.POPULAR_LOAD_MORE_FAILED:
        //     return {
        //         ...state,
        //         [action.storeName]: {
        //             ...state[action.storeName],
        //             projectModels: action.projectModels,
        //             hideLoadingMore: true,
        //             pageIndex: action.pageIndex,
        //         }
        //     };
        default:
            return state;
    }
}