import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {connect} from "react-redux";
import actions from "../action/index";
import PopularItem from "../common/PopularItem";


const URL = "https://api.github.com/search/repositories?q=";
const QUERY_STRING = "&sort=stars";
const THEME_COLOR = "red";

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
                screen: props => (<PopularTabPage {...props} tabLabel={item}/>),
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

    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genUrl(this.storeName);
        onLoadPopularData(this.storeName, url);
    }

    genUrl(storeName) {
        return URL + storeName + QUERY_STRING;
    }

    renderItem(data) {
        const item = data.item;
        return (<PopularItem item={item} onSelect={() => {
        }}/>)
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        console.log(JSON.stringify(store));
        if (!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            tintColor={THEME_COLOR}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                        />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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
