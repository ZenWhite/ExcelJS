import ExcelComponent from '@core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import TableSelection from './TableSelection';
import $ from '@core/DOM';

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
        return createTable(Table.ROW_COUNT);
    }

    prepare() {
		this.selection = new TableSelection();
	}

    init() {
        super.init();
        
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    onMousedown(e) {
        if( shouldResize(e) ) {
            resizeHandler(this.$root, e);
        } else if( isCell(e) ) {
            const $target = $(e.target);

            if(e.shiftKey) {
                const target = $target.id(1);
                const current = this.selection.current.id(1);

                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
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

    onInput(event) {
        this.$emit( 'table:input', $(event.target) )
    }
}