import ExcelComponent from '@core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import {shouldResize} from './table.functions';

export default class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
       super($root, {
           listeners: ['mousedown']
       })
    }

    toHTML() {
        return createTable(20);
    }

    onMousedown(e) {
        if( shouldResize(e) ) {
            resizeHandler(this.$root, e);
        }
    }
}