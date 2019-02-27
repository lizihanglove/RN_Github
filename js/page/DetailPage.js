import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, WebView} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from "../util/ViewUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigationUtil from "../navigator/NavigationUtil";

const THEME_COLOR = "red";
const TREND_URL = 'https://github.com/';
type Props = {};
export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel} = this.params;
        const url = TREND_URL + (projectModel.html_url ? +projectModel.html_url : +projectModel.fullName);
        const title = projectModel.full_name ? projectModel.full_name : projectModel.fullName;
        this.state = {title, url, canGoBack: false};
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.state.navigation)
        }
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                    }}
                >
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

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            LeftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            rightButton={this.getRightButton()}
            style={{backgroundColor: THEME_COLOR}}
        />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    source={{uri: this.state.url}}
                    ref={(webView => this.webView = webView)}
                    startInLoadingState={true}
                    onNavigationStateChange={(state) => {
                        this.onNavigationStateChange(state)
                    }}
                    style={{}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
