import './scss/index.scss';

async function getSome() {
	await setTimeout( () => {
		return 'test';
	}, 3000 );
}

getSome.then(data => {
	console.log(data);
});