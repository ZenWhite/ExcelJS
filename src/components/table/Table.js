import ExcelComponent from '@core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import TableSelection from './TableSelection';
import $ from '@core/DOM';
import * as actions from '@/redux/actions';
import { defaultStyles } from '@/constants';
import parse from '@core/parse';

export default class Table extends ExcelComponent {
    static className = 'excel__table';
    static ROW_COUNT = 20;

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable( Table.ROW_COUNT, this.store.getState() );
    }

    prepare() {
		this.selection = new TableSelection();
	}

    init() {
        super.init();
        
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current
                .attr('data-value', text)
                .text( parse(text) );
            
            this.updateTextInStore(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    selectCell($cell) {
        const styles = $cell.getStyles( Object.keys(defaultStyles) );

        this.selection.select($cell);
        
        this.$emit('table:select', $cell);
        this.$dispatch( actions.changeStyles(styles) );
    }

    async resizeTable(e) {
        try {
            const data = await resizeHandler(this.$root, e);
            this.$dispatch( actions.tableResize(data) );
        } catch(error) {
            console.warn('Resize Error: ', error.message);
        }
    }

    onMousedown(e) {
        if( shouldResize(e) ) {
            this.resizeTable(e);
        } else if( isCell(e) ) {
            const $target = $(e.target);
            if(e.shiftKey) {
                const target = $target.id(1);
                const current = this.selection.current.id(1);

                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selectCell($target);
            }
        }
    } 

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
        const {key} = event;

        if( keys.includes(key) && !event.shiftKey ) {
            event.preventDefault();
            const id = this.selection.current.id(1);
            const borders = {
                MAX_ROWS: Table.ROW_COUNT,
                MAX_COLLS: this.$root.findAll('.row .column').length
            }
            const $next = this.$root.find( nextSelector(key, id, borders) );
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        const text = $(event.target).text();
        this.updateTextInStore(text);
    }
}