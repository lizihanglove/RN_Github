export default class NavigationUtil {

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    };

    /**
     * 跳转首页面
     * @param params
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    };
}