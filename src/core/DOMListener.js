import {capitalize} from '@core/utils';

export default class DOMListener {
	constructor($root, listeners = []) {
        if(!$root) {
            throw new Error('Не удалось найти корневой элемент!');
        }
        this.$root = $root;
        this.listeners = listeners;
    }
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if(!this[method]) {
                throw new Error('Method is not defined!');
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener,  this[method]);
        });
    }
    removeDOMListeners() {
        console.log('removeDOM');
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off( listener,  this[method] );
        });
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}