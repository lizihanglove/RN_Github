import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const MENU = {
    customLanguage: {name: '自定义语言', Icons: Ionicons, icon: 'md-checkbox-outline'},
    sortLanguage: {name: '语言排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    customTheme: {name: '自定义主题', Icons: Ionicons, icon: 'ios-color-palette'},
    customKey: {name: '自定义标签', Icons: Ionicons, icon: 'md-checkbox-outline'},
    sortKey: {name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    removeKey: {name: '标签移除', Icons: Ionicons, icon: 'md-remove'},
    aboutAuthor: {name: '关于作者', Icons: Octicons, icon: 'smiley'},
    about: {name: '关于', Icons: Ionicons, icon: 'logo-github'},
    tutorial: {name: '教程', Icons: Ionicons, icon: 'ios-bookmarks'},
    feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
    share: {name: '分享', Icons: Ionicons, icon: 'md-share'},
    codePush: {name: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
};