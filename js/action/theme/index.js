import Types from '../types';

export function onThemeChange(theme) {
    console.log('11');
    return {
        type: Types.THEME_CHANGE,
        theme: theme
    }
}