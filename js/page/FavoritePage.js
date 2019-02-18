import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import actions from "../action/index";


type Props = {};

class FavoritePage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FavoritePage</Text>
                <Button title={'改变主题颜色'} onPress={() => {
                    this.props.onChangeTheme('#ff6600');
                }}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
    onChangeTheme: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)

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
