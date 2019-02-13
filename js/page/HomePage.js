import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import PopularPage from './PopularPage'
import TrendPage from './TrendPage'
import FavoritePage from './FavoritePage'
import PersonalPage from './PersonalPage'

type Props = {};
export default class HomePage extends Component<Props> {

    _tabNavigator() {
        return createBottomTabNavigator({
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
        });
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab/>
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
