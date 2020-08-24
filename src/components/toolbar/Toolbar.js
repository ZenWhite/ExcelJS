import ExcelStateComponent from '@core/ExcelStateComponent';
import createToolbar from './toolbar.template';
import $ from '@core/DOM';
import { defaultStyles } from '@/constants';

export default class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'], 
            subscribe: ['currentStyles'],
            ...options
        });
    }
    prepare() {
        this.initState(defaultStyles);
    }
    get template() {
        return createToolbar(this.state);
    }
    toHTML() {
        return this.template;
    }
    onClick(event) {
        const $target = $(event.target);
        if($target.data.type === 'button') {
            const value = JSON.parse( $target.data.value );
            this.$emit('toolbar:applyStyle', value);
        }
    }
    storeChanged({currentStyles}) {
        this.setState(currentStyles);
    }
}