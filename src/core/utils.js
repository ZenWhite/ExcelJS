export function capitalize(str) {
    if(typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getStyleName(style) {
    if( !/[A-Z]/g.test(style) ) {
        return style;
    }
    return style.split('').map(char => {
        if( char == char.toUpperCase() ) {
            return '-' + char.toLowerCase();
        } 
        return char;
    }).join('');
}