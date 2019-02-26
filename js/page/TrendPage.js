import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Toast from "react-native-easy-toast";
import {connect} from "react-redux";
import actions from "../action/index";
import PopularItem from "../common/PopularItem";
import NavigationBar from "../common/NavigationBar";
import TrendItem from "../common/TrendItem";


const URL = "https://github.com/trending/";
const QUERY_STRING = "?since=daily";
const THEME_COLOR = "red";
const pageSize = 10;
type Props = {};
export default class TrendPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['All', 'C', 'PHP', 'React', 'JavaScript'];
    }
    genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => (<TrendTabPage {...props} tabLabel={item}/>),
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
                <NavigationBar title={"趋势"} hide={false}/>
                <TopNavigator/>
            </View>
        );
    }
}

class TrendTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData()
    }

    /**
     * 加载数据
     * @param loadMore
     */
    loadData(loadMore) {
        const {onRefreshTrend, onLoadMoreTrend} = this.props;
        const store = this._store();
        const url = this.genUrl(this.storeName);
        if (loadMore) {
            onLoadMoreTrend(this.storeName, ++store.pageIndex, pageSize, store.items, (error) => {
                this.refs.toast.show("没有更多了");
            });
        } else {
            onRefreshTrend(this.storeName, url, pageSize);
        }
    }

    _store() {
        const {trend} = this.props;
        let store = trend[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true
            }
        }
        return store;
    }

    /**
     * 返回tab类型请求链接
     * @param storeName
     * @returns {string}
     */
    genUrl(storeName) {
        return URL + storeName + QUERY_STRING;
    }

    /**
     *渲染底部
     */
    genIndicator() {
        if (!this._store().hideLoadingMore) {
            return (<View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.activityIndicator}/>
                <Text>正在加载更多</Text>
            </View>)
        }
        return null;
    }

    /**
     *渲染条目
     * @param data
     * @returns {*}
     */
    renderItem(data) {
        const item = data.item;
        return (
            <TrendItem
                item={item}
                onSelect={() => {
                }}
            />);
    }

    render() {
        const {trend} = this.props;
        let store = trend[this.storeName];
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
                    data={store.projectModes}
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
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        this.loadData(true);
                    }}
                    onEndReachedThreshold={0.5}
                />
                <Toast ref={'toast'}
                       position={'center'}
                       style={{backgroundColor: "#d1d5da"}}
                       textStyle={{color: "#333"}}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    trend: state.trend
});

const mapDispatchToProps = dispatch => ({
    onRefreshTrend: (storeName, url, pageSize) => dispatch(actions.onRefreshTrend(storeName, url, pageSize)),
    onLoadMoreTrend: (storeName, pageIndex, pageSize, items, callback) => {
        dispatch(actions.onLoadMoreTrend(storeName, pageIndex, pageSize, items, callback));
    },
});

const TrendTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendTab);

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
        },
        indicatorContainer: {
            alignItems: 'center',
        },
        activityIndicator: {
            color: 'red',
            margin: 10,
        },
    })
;
