export default class Page {
    constructor(params) {
        this.params = params;
    }
    getRoot() {
        throw new Error('Method "getRoot" must be implemented!');
    }
    afterRender() {

    }
    destroy() {

    }
}