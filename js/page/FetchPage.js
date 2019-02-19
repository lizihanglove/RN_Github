import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {};
export default class FetchPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: ""
        };
    }

    loadData = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText
                });
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FetchPage</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={"请输入url"}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button title={"获取数据"} onPress={this.loadData()}/>
                </View>
                    <Text>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    content: {
        flexDirection: 'row',
    },
    input: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    }
});
