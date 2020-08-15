import {range} from '@core/utils';

export function shouldResize(e) {
    return e.target.dataset.resize;
}

export function isCell(e) {
    return e.target.dataset.type === 'cell'
}

export function matrix(target, current) {
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols.reduce( (acc, col) => {
        rows.forEach( row => acc.push(`${row}:${col}`) );
        return acc;
    }, [] );
}

export function nextSelector(key, {col, row}, {MAX_ROWS, MAX_COLLS}) {
    const MIN_VALUE = 0;
    switch(key) {
        case 'Enter': 
        case 'ArrowDown':
            row = row + 1 === MAX_ROWS ? MAX_ROWS - 1 : row + 1;
            break;
        case 'Tab':
        case 'ArrowRight': 
            col = col + 1 === MAX_COLLS ? MAX_COLLS - 1 : col + 1;
            break;
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
            break;
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break;
    }

    return `[data-id="${row}:${col}"]`;
}