import React, {Component} from 'react';
import { , FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Toast from "react-native-easy-toast";
import {connect} from "react-redux";
import actions from "../action/index";
import PopularItem from "../common/PopularItem";
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";
import {STORAGE_FLAG} from "../extend/dao/DataStore";
import FavoriteDao from "../extend/dao/FavoriteDao";
import FavoriteUtil from "../util/FavoriteUtil";
import TrendItem from "../common/TrendItem";
import EventTypes from "../util/EventTypes";
import EventBus from "react-native-event-bus";

const THEME_COLOR = "red";
type Props = {};
export default class FavoritePage extends Component<Props> {

    render() {
        const TopNavigator = createMaterialTopTabNavigator({
                'Popular': {
                    screen: props => <FavoriteTabPage {...props} flag={STORAGE_FLAG.popular}/>,
                    navigationOptions: {title: "最新"}
                },
                'Trend': {
                    screen: props => <FavoriteTabPage {...props} flag={STORAGE_FLAG.trend}/>,
                    navigationOptions: {title: "趋势"}
                }
            }
            , {
                tabBarOptions: {
                    animationEnabled: true,
                    upperCaseLabel: false,
                    labelStyle: styles.label,
                    indicatorStyle: styles.indicator
                },
            });
        return (
            <View style={{flex: 1}}>
                <NavigationBar title={"最新"} hide={false}/>
                <TopNavigator/>
            </View>
        );
    }
}

class FavoriteTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount() {
        this.loadData(true);
        EventBus.getInstance().addListener(EventTypes.BOTTOM_TAB_SELECT, this.listener = data => {
            if (data.to === 2) {
                this.loadData(false);
            }
        });
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }

    /**
     * 加载数据
     * @param isShowLoading
     */
    loadData(isShowLoading) {
        const {onRefreshFavorite} = this.props;
        onRefreshFavorite(this.storeName, isShowLoading);
    }

    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],
            }
        }
        return store;
    }

    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.storeName);


    }

    /**
     *渲染条目
     * @param data
     * @returns {*}
     */
    renderItem(data) {
        const item = data.item;
        let Item = this.storeName === STORAGE_FLAG.popular ? PopularItem : TrendItem;
        return (
            <Item
                projectModel={item}
                onSelect={(callback) => {
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: this.storeName,
                        callback,
                    }, 'DetailPage');
                }}
                onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}

            />);
    }

    render() {

        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + (item.item.id || item.item.fullName)}
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
    favorite: state.favorite
});

const mapDispatchToProps = dispatch => ({
    onRefreshFavorite: (storeName, isShowLoading) => dispatch(actions.onRefreshFavorite(storeName, isShowLoading)),

});

const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
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
