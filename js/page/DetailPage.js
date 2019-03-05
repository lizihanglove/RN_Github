import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity,} from 'react-native';
import {WebView} from "react-native-webview";
import NavigationBar from '../common/NavigationBar';
import ViewUtil from "../util/ViewUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import FavoriteDao from "../extend/dao/FavoriteDao";

const THEME_COLOR = "#2196f3";
const TREND_URL = 'https://github.com/';
type Props = {};
export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel, flag} = this.params;
        const {item, isFavorite} = projectModel;
        this.favoriteDao = new FavoriteDao(flag);
        const url = item.html_url ? item.html_url : '' + TREND_URL + item.fullName;
        const title = item.full_name ? item.full_name : item.fullName;
        this.state = {
            title,
            url,
            canGoBack: false,
            isFavorite,
        };
        this.backPress = new BackPressComponent({
            backPress: () => {
                this.onBackPress()
            }
        });
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    onFavoriteButtonClick() {
        const {projectModel,callback} = this.params;
        let {item, isFavorite} = projectModel;
        isFavorite = !isFavorite;
        this.setState({
            isFavorite
        });
        let key = item.fullName ? item.fullName : item.id.toString();
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
        callback(isFavorite);

    }

    getRightButton() {
        return (<View>
                <TouchableOpacity onPress={() => {
                    this.onFavoriteButtonClick();
                }}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}/>
                </TouchableOpacity>
            </View>
        )
    }

    onNavigationStateChange(state) {
        this.setState({
            canGoBack: state.canGoBack,
            url: state.url
        })
    }

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            LeftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            rightButton={this.getRightButton()}
            titleLayoutStyle={{backgroundColor: THEME_COLOR}}
            style={{backgroundColor: THEME_COLOR}}
        />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    source={{uri: this.state.url}}
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(state) =>
                        this.onNavigationStateChange(state)
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        overflow: 'hidden'
    },
});
