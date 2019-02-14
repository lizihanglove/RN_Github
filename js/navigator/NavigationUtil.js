export default class NavigationUtil {

    /**
     * 跳转至指定页面
     * @param params 要传递的参数
     * @param page 要跳转的参数名
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('navigation can not be null');
            alert('为空');
            return;
        }
        navigation.navigate(page);
    }

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