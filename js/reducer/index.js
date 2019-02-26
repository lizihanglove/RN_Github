import {combineReducers} from "redux";
import theme from "./theme";
import popular from "./popular";
import trend from "./trend";
import {rootCom, RootNavigator} from "../navigator/AppNavigator";

let actionForPathAndParams = RootNavigator.router.getActionForPathAndParams(rootCom);
const navState = RootNavigator.router.getStateForAction(actionForPathAndParams);

const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

const index = combineReducers({
    nav: navReducer,
    theme: theme,
    popular: popular,
    trend: trend,
});

export default index