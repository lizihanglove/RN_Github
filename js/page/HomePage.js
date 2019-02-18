import React, {Component} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {connect} from "react-redux";

import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from "../navigator/NavigationUtil";
import {NavigationActions} from "react-navigation";


type Props = {};

class HomePage extends Component<Props> {

    componentDidMount() {
        console.log(BackHandler);

        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        console.log(BackHandler);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(HomePage)