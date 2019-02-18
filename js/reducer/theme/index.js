import Types from '../../action/types';

const defaultState = {
};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            console.log({
                ...state,
                theme: action.theme
            }.toString());
            return {
                ...state,
                theme: action.theme
            };
        default:
            return defaultState;
    }
}