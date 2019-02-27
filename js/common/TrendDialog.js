import React, {Component} from "react";
import {Modal, TouchableOpacity, StyleSheet, View, Text} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TimeSpan from '../model/TimeSpan';

export const timeSpans = [
    new TimeSpan('今天', 'since=daily'),
    new TimeSpan('本周', 'since=weekly'),
    new TimeSpan('本月', 'since=monthly')
];
export default class TrendDialog extends Component {

    state = {
        visible: false,
    };

    show() {
        this.setState({
            visible: true,
        });
    }

    dismiss() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {onClose, onSelect} = this.props;
        return (
            <Modal
                visible={this.state.visible}
                transparent={true}
                onRequestClose={() => onClose}
            >
                <TouchableOpacity
                    onPress={() => this.dismiss()}
                    style={styles.container}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {
                            timeSpans.map((timeSpan, index, timeSpans) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        underlayColor={'transparent'}
                                        onPress={() => onSelect(timeSpans[index])}
                                    >
                                        <View style={styles.textContainer}>
                                            <Text style={styles.text}>
                                                {timeSpans[index].showText}
                                            </Text>
                                        </View>
                                        {
                                            index === timeSpans.length - 1
                                                ? null
                                                : <View style={styles.line}/>
                                        }
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center'
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor:'white',
        paddingBottom: 3,
        paddingTop: 3,
        marginRight: 3,
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#333',
        fontSize: 16,
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26,
    },
    line: {
        height: 0.3,
        backgroundColor: '#666',
    },
});
