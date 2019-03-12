import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {connect} from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../action/index";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import {MENU} from "../common/Menu";
import GlobalStyles from "../res/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import {FLAG_LANGUAGE} from "../extend/dao/LanguageDao";

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

    onClick(menu) {
        let a = 0;
        const {theme} = this.props;
        let RouteName, params = {theme};
        switch (menu) {
            case MENU.tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MENU.about:
                RouteName = 'AboutPage';
                break;
            case MENU.customTheme:
                const {onShowCustomThemeView} = this.props;
                onShowCustomThemeView(true);
                break;
            case MENU.codePush:
                RouteName = 'CodePushPage';
                break;
            case MENU.sortKey:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MENU.sortLanguage:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MENU.customKey:
            case MENU.customLanguage:
            case MENU.removeKey:
                RouteName = 'CustomKeyPage';
                RouteName = 'CustomKeyPage';
                params.isRemoveKey = menu === MENU.removeKey;
                params.flag = menu !== MENU.customLanguage ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
            case MENU.aboutAuthor:
                RouteName = 'AboutMePage';
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR)
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
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.onClick(MENU.about)}
                    >
                        <View style={styles.item}>
                            <Ionicons
                                name={MENU.about.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR
                                }}
                            />
                            <Text style={styles.text}>{MENU.about.name}</Text>
                            <Ionicons
                                name={'ios-arrow-forward'}
                                size={36}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.tutorial)}
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MENU.customLanguage)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.sortLanguage)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MENU.customKey)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.sortKey)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.removeKey)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MENU.customTheme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.aboutAuthor)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MENU.feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MENU.codePush)}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
    onChangeTheme: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'

    },
    text: {
        flex: 1
    },
    aboutIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupTitle: {
        margin: 10,
        fontSize: 12,
        color: 'gray',
    }
});
