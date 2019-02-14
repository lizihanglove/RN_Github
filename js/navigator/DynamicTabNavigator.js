import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PopularPage from '../page/PopularPage'
import TrendPage from '../page/TrendPage'
import FavoritePage from '../page/FavoritePage'
import PersonalPage from '../page/PersonalPage'

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
export default class DynamicTabNavigator extends Component<Props> {

    constructor(props) {
        super(props);
    }

    _tabNavigator() {//此处动态配置底部导航栏的各种数据
        const {PopularPage, TrendPage, FavoritePage, PersonalPage} = TABS;
        PopularPage.navigationOptions.tabBarLabel = '最新';//动态配置底部导航栏属性
        const tabs = {PopularPage, TrendPage, FavoritePage, PersonalPage};
        return createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent
        });
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab/>
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
        const {routes, index} = this.props.navigation.state;
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
