import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ViewUtil {

    static getLeftBackButton(callback) {
        return (
            <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={callback}>
                <Ionicons name={'ios-arrow-back'} size={36} style={{color: 'white'}}/>
            </TouchableOpacity>
        );
    }

    /**
     * 生成分享按钮
     * @param callback
     * @returns {*}
     */
    static getShareButton(callback) {
        return (
            <TouchableOpacity underlayColor={'transparent'} onPress={callback}>
                <Ionicons
                    name={'md-share'}
                    size={20}
                    style={{color: 'white', opacity: 0.9, marginRight: 10}}
                />
            </TouchableOpacity>
        );
    }

    /**
     *生成设置条目
     * @param callback 点击回调
     * @param text 文字
     * @param color 颜色
     * @param Icons icon
     * @param icon 左侧图标
     * @param expandableIcon 右侧图标
     */
    static getSettingItem(callback, text, color, Icons, icon, expandableIcon) {
        return (
            <TouchableOpacity
                onPress={callback}
                style={styles.setting_item_container}
            >
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    {Icons && icon ?
                        <Icons
                            name={icon}
                            size={16}
                            style={{color: color, marginRight: 10}}
                        /> :
                        <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
                    }
                    <Text>{text}</Text>
                </View>
                <Ionicons
                    name={expandableIcon ? expandableIcon : 'ios-arrow-forward'}
                    size={16}
                    style={{
                        marginRight: 10,
                        alignSelf: 'center',
                        color: color || 'black',
                    }}/>
            </TouchableOpacity>
        );
    }

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param menu @MORE_MENU
     * @param color 图标着色
     * @param expandableIcon 右侧图标
     * @return
     */
    static getMenuItem(callBack, menu, color, expandableIcon) {
        return ViewUtil.getSettingItem(callBack, menu.name, color, menu.Icons, menu.icon, expandableIcon)
    }
}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});