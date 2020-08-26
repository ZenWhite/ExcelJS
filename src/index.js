import DashboardPage from '@/pages/DashboardPage';
import Router from '@core/routes/Router';
import './scss/index.scss';
import ExcelPage from './pages/ExcelPage';

new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage
});