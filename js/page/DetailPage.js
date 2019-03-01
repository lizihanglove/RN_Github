import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity,} from 'react-native';
import {WebView} from "react-native-webview";
import NavigationBar from '../common/NavigationBar';
import ViewUtil from "../util/ViewUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import {NavigationActions} from "react-navigation";

const THEME_COLOR = "#2196f3";
const TREND_URL = 'https://github.com/';
type Props = {};
export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel} = this.params;
        const url = projectModel.html_url ? projectModel.html_url : '' + TREND_URL + projectModel.fullName;
        const title = projectModel.full_name ? projectModel.full_name : projectModel.fullName;
        this.state = {title, url, canGoBack: false};
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

    getRightButton() {
        return (<View>
                <TouchableOpacity onPress={() => {
                }}>
                    <FontAwesome name={'star-o'} size={20} style={{color: 'white', marginRight: 10}}/>
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

    genNavigationBar() {
        if (!this.navigationBar) {
            this.navigationBar = <NavigationBar
                title={this.state.title}
                LeftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
                rightButton={this.getRightButton()}
                titleLayoutStyle={{backgroundColor: THEME_COLOR}}
                style={{backgroundColor: THEME_COLOR}}
            />;
        }
        return this.navigationBar;
    }

    render() {
        let navigationBar = this.genNavigationBar();
        return (
            <View style={styles.container}>
                <View>{navigationBar}</View>
                <WebView
                    source={{uri: this.state.url}}
                    ref={(webView => this.webView = webView)}
                    startInLoadingState={true}
                    onNavigationStateChange={(state) => {
                        this.onNavigationStateChange(state)
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },
});
