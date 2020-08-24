import DOMListener from '@core/DOMListener';

export default class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.subscribe = options.subscribe || [];
		this.unsubscribers = [];
		this.storeSub = null;

		this.prepare();
	}
	//Настраиваем наш компонент до init
	prepare() {
		
	}

	toHTML() {
		return '';
	}

	//Уведомляем слушателей про событие
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	//Подписка на событие event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	//Уведомляем стор
	$dispatch(action) {
		this.store.dispatch(action);
	}
 
	//Инициализация компонента
	init() {
		this.initDOMListeners();
	}
	
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach( unsub => unsub() );
		this.storeSub.unsubscribe();
	}
}