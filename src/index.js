//JS Modules Imoports
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Table from '@/components/table/Table';
import Formula from '@/components/formula/Formula';
import createStore from '@core/createStore';
import rootReduces from '@/redux/rootReduces';
import { storage, debounce } from '@core/utils';
import {initialState} from '@/redux/initialState'
//Style Import
import './scss/index.scss';
const store = createStore( rootReduces, initialState );

const stateListener = debounce(state => {
	storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store
});

excel.render();