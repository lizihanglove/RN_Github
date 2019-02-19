import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil'

type Props = {};
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React Native', 'Flutter'];
    }

    genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => (<PopularTab {...props} tabLabel={item}/>),
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;
    }

    render() {
        const TopNavigator = createMaterialTopTabNavigator(this.genTabs()
            , {
                tabBarOptions: {
                    swipeEnabled: true,
                    scrollEnabled: true,
                    animationEnabled: true,
                    upperCaseLabel: false,
                    tabStyle: styles.tab,
                    labelStyle: styles.label,
                    indicatorStyle: styles.indicator
                },
            });
        return (
            <View style={{flex: 1}}>
                <TopNavigator/>
            </View>
        );
    }
}

class PopularTab extends Component<Props> {
    render() {
        const {tabLabel} = this.props;
        console.log(tabLabel);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{tabLabel}</Text>
                <Text style={styles.welcome} onPress={() => {
                    NavigationUtil.goPage({navigation: this.props.navigation}, "DetailPage");
                }}>跳转详情界面</Text>

                <Text style={styles.welcome} onPress={() => {
                    NavigationUtil.goPage({navigation: this.props.navigation}, "FetchPage");
                }}>跳转网络请求界面</Text>

                <Text style={styles.welcome} onPress={() => {
                    NavigationUtil.goPage({navigation: this.props.navigation}, "StoragePage");
                }}>跳转数据存储界面</Text>

                <Text style={styles.welcome} onPress={() => {
                    NavigationUtil.goPage({navigation: this.props.navigation}, "DataStorePage");
                }}>跳转离线缓存界面</Text>
            </View>
        );
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
        tab: {
            width: 120,
        },
        label: {
            fontSize: 13,
            marginTop: 6,
        },
        indicator: {
            height: 2,
            backgroundColor: 'white',
        }
    })
;
