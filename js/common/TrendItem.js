import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HTMLView from "react-native-htmlview";


export default class TrendItem extends Component {

    render() {
        const {item} = this.props;
        if (!item) return null;
        let favoriteButton = <TouchableOpacity
            style={{padding: 6}}
            underlayColor={"transparent"}
            onPress={() => {
            }}>
            <FontAwesome
                name={'star-o'}
                size={16}
                style={{color: 'red'}}
            />
        </TouchableOpacity>;
        return (
            <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <View style={styles.description}>
                        <HTMLView value={item.description}>
                        </HTMLView>
                    </View>
                    <View style={styles.row}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text>Author:</Text>
                            {
                                item.contributors.map((result, i, arr) => {
                                    return (
                                        <Image
                                            key={i}
                                            style={{height: 22, width: 22}}
                                            source={{uri: arr[i]}}
                                        />)
                                })
                            }

                        </View>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text>Stars:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        <View>
                            {favoriteButton}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginVertical: 3,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

});