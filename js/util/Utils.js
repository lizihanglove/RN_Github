export default class Utils {

    /**
     * 检查条目是否被收藏
     * @param item
     * @param keys
     * @returns {boolean}
     */
    static checkFavorite(item, keys = []) {
        if (!item) return false;
        if (!keys) return false;
        for (let i = 0, length = keys.length; i < length; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }
}