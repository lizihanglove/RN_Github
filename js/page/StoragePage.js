import React, {Component} from 'react';
import {AsyncStorage, Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {};
export default class StoragePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            storeValue: "",
            output: ""
        };
    }

    store = () => {
        console.log(this.state.storeValue);
        AsyncStorage.setItem("key", this.state.storeValue, (error) => {
            if (error) {
                console.log(error.toString());
            } else {
                console.log("存储成功！");
            }
        });
    };

    out = () => {
        AsyncStorage.getItem("key", (error, data) => {
            if (error) {
                console.log(error.toString());
            } else {
                console.log(data);
                this.setState({
                    output: data
                });
            }
        });
    };

    delete = () => {
        AsyncStorage.removeItem("key", error => {
            if (error) {
                alert("删除失败");
            } else {
                alert("删除成功");
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>StoragePage</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"请输入存储的数据"}
                    onChangeText={text => {
                        console.log("text:" + text);
                        this.setState({
                            storeValue: text
                        })
                    }}
                />
                <View>
                    <Button style={{margin: 3}} title={"存储"} onPress={() => {
                        this.store();
                    }}/>
                    <Button style={{margin: 3}} title={"获取"} onPress={() => {
                        this.out();
                    }}/>
                    <Button style={{margin: 3}} title={"删除"} onPress={() => {
                        this.delete();
                    }}/></View>
                <Text>{this.state.output}</Text>
            </View>
        );
    }
}

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
