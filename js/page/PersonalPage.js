import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../action/index";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";

const THEME_COLOR = '#678';

type Props = {};

class PersonalPage extends Component<Props> {

    getRightButton() {
        return (<View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather name={'search'}
                             size={24}
                             style={{color: 'white'}}/>
                </View>
            </TouchableOpacity>
        </View>);
    }

    getLeftButton(callback) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callback}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}
            />

        </TouchableOpacity>
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = (
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{backgroundColor: THEME_COLOR,}}
                LeftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        );

        return (
            <View style={styles.container}>
                {navigationBar}
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
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
