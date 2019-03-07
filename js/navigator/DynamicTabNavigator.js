import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import EventBus from "react-native-event-bus";


import {BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import PopularPage from '../page/PopularPage'
import TrendPage from '../page/TrendPage'
import FavoritePage from '../page/FavoritePage'
import PersonalPage from '../page/PersonalPage'
import EventTypes from "../util/EventTypes";

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => {
                return <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            },
        },
    },
    TrendPage: {
        screen: TrendPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => {
                return <MaterialIcons
                    name={'trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            },
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => {
                return <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            },
        },
    },
    PersonalPage: {
        screen: PersonalPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => {
                return <MaterialIcons
                    name={'person'}
                    size={26}
                    style={{color: tintColor}}
                />
            },
        },
    },
};
type Props = {};

class DynamicTabNavigator extends Component<Props> {

    constructor(props) {
        super(props);
    }

    _tabNavigator() {//此处动态配置底部导航栏的各种数据

        if (this.tabs) {
            return this.tabs;
        }
        const {PopularPage, TrendPage, FavoritePage, PersonalPage} = TABS;
        PopularPage.navigationOptions.tabBarLabel = '最新';//动态配置底部导航栏属性
        const tabs = {PopularPage, TrendPage, FavoritePage, PersonalPage};
        return this.tabs = createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props}/>
            }
        });
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab onNavigationStateChange={(prevState, newState, action) => {
            EventBus.getInstance().fireEvent(EventTypes.BOTTOM_TAB_SELECT, {
                from: prevState.index,
                to: newState.index
            });
        }}/>
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        console.log(this.props.theme);
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
});

export default connect(mapStateToProps, null)(DynamicTabNavigator);