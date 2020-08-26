import Page from "@core/Page";
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Table from '@/components/table/Table';
import Formula from '@/components/formula/Formula';
import createStore from '@core/createStore';
import rootReduces from '@/redux/rootReduces';
import { storage, debounce } from '@core/utils';
import { normalizeInitialState } from "@/redux/initialState";

function storageName(param) {
    return `excel: ${param}`;
}

export default class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params));
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReduces, initialState);

        const stateListener = debounce(state => {
            storage(storageName(this.params), state);
        }, 300); 

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }
    afterRender() {
        this.excel.init();
    }
    destroy() {
        this.excel.destroy();
    }
}