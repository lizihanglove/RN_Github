import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import {connect} from "react-redux";
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from "react-navigation-redux-helpers";
import FetchPage from "../page/FetchPage";
import StoragePage from "../page/StoragePage";
import DataStorePage from "../page/DataStorePage";

export const rootCom = 'Init';
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        },
    },
});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        },
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            title: '详情界面',
            headerStyle: {
                backgroundColor: '#ededed',
            },
            headerTintColor: '#666',
        },
    },
    FetchPage: {
        screen: FetchPage,
        navigationOptions: {
            title: '网络请求界面',
            headerStyle: {
                backgroundColor: '#ededed',
            },
            headerTintColor: '#666',
        },
    },
    StoragePage: {
        screen: StoragePage,
        navigationOptions: {
            title: '数据存储界面',
            headerStyle: {
                backgroundColor: '#ededed',
            },
            headerTintColor: '#666',
        },
    },
    DataStorePage: {
        screen: DataStorePage,
        navigationOptions: {
            title: '数据存储界面',
            headerStyle: {
                backgroundColor: '#ededed',
            },
            headerTintColor: '#666',
        },
    },
});

export const RootNavigator = createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,

    }, {
        navigationOptions: {},
    },
);

export const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({state: state.nav});

export default connect(mapStateToProps)(AppWithNavigationState)