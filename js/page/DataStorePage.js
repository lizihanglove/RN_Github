import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import DataStore from "../extend/dao/DataStore";

type Props = {};
export default class DataStorePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: ""
        };
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetData(url)
            .then(data => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)} \n ${JSON.stringify(data)}`;
                this.setState({
                    showText: showData
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    showText: error
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>DataStorePage</Text>
                <TextInput
                    placeholder={'请输入关键字'}
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />

                <Button title={'获取'} onPress={() => {
                    this.loadData();
                }}/>
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
