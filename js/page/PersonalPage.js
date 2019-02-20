import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import actions from "../action/index";
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};
class PersonalPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PersonalPage</Text>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
    onChangeTheme: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)

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
