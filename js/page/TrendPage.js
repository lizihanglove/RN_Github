import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Toast from "react-native-easy-toast";
import {connect} from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import actions from "../action/index";
import NavigationBar from "../common/NavigationBar";
import TrendItem from "../common/TrendItem";
import TrendDialog, {timeSpans} from "../common/TrendDialog";
import NavigationUtil from "../navigator/NavigationUtil";

const EVENT_TYPE_TIME_SPAN_CHANG = 'EVENT_TYPE_TIME_SPAN_CHANG';
const URL = "https://github.com/trending/";
const THEME_COLOR = "red";
const pageSize = 10;
type Props = {};
export default class TrendPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['All', 'C', 'PHP', 'React', 'JavaScript'];
        this.state = {timeSpan: timeSpans[0],};
    }

    genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => (<TrendTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>),
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;
    }

    onSelectTimeSpan(timeSpan) {
        this.dialog.dismiss();
        this.setState({
            timeSpan
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANG, timeSpan);
    }

    renderTitleView() {
        return (
            <TouchableOpacity underlayColor={'transparent'} onPress={() => this.dialog.show()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#fff', fontWeight: '400'}}>
                        趋势 {this.state.timeSpan.showText}
                    </Text>
                    <MaterialIcon name={'arrow-drop-down'} size={22} style={{color: 'white'}}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderTrendDialog() {
        return (
            <TrendDialog
                ref={dialog => this.dialog = dialog}
                onSelect={timeSpan => this.onSelectTimeSpan(timeSpan)}
            />
        );
    }

    /**
     * 初始化tab标签
     * @returns {*}
     */
    initTopNavigator() {
        if (!this.tabNavigation) {
            let option = {};
            option.tabBarOptions = {
                swipeEnabled: true,
                scrollEnabled: true,
                animationEnabled: true,
                upperCaseLabel: false,
                tabStyle: styles.tab,
                labelStyle: styles.label,
                indicatorStyle: styles.indicator
            };
            this.tabNavigation = createMaterialTopTabNavigator(this.genTabs(), option);
        }
        return this.tabNavigation;
    }

    render() {
        const TopNavigation = this.initTopNavigator();
        return (
            <View style={{flex: 1}}>
                <NavigationBar titleView={this.renderTitleView()} hide={false}/>
                <TopNavigation/>
                {this.renderTrendDialog()}
            </View>
        );
    }
}

class TrendTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }

    componentDidMount() {
        this.loadData();
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANG, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        });
    }

    componentWillUnmount() {
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }
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
        return URL + storeName + '?' + this.timeSpan.searchText;
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
                    NavigationUtil.goPage({projectModel: item}, 'DetailPage');}}
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
});
;
