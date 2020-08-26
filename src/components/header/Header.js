import ExcelComponent from '@core/ExcelComponent';
import $ from '@core/DOM';
import { changeTitle } from '@/redux/actions';
import {defaultTitle} from '@/constants';
import { debounce } from '@/core/utils';
import ActiveRoute from '@/core/routes/ActiveRoute';

export default class Header extends ExcelComponent {
	static className = 'excel__header';
	
	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		});
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300);
	}

    toHTML() {
		const title = this.store.getState().title || defaultTitle;
        return `
            <input type="text" class="input" value="${title}"/>
			<div>
				<div class="button" data-btn="exit">
					<i class="material-icons" data-action="exit">exit_to_app</i>
				</div>
				<div class="button" data-btn="delete">
					<i class="material-icons" data-action="delete">delete</i>
				</div>
			</div>
        `;
	}

	onInput(event) {
		const $target = $( event.target );
		this.$dispatch( changeTitle($target.text()) );
	}

	onClick(event) {
		const $target = $(event.target);
		if( $target.data.action === 'exit' ) {
			ActiveRoute.navigate('');
		}
		if( $target.data.action === 'delete' ) {
			const decision = confirm('Вы точно хотите удалить эту таблицу');
			if(decision) {
				localStorage.removeItem(`excel: ${ActiveRoute.param}`);
				ActiveRoute.navigate('');
			}
		}
	}
}