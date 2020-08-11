import {getStyleName} from './utils';

class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? 
            document.querySelector(selector) : selector;
    }
    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }
    clear() {
        this.html('');
        return this;
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
    //Element
    append(node) {
        if(node instanceof Dom) {
            node = node.$el;
        }
        if(Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }
    get data() {
        return this.$el.dataset;
    }
    get width() {
        return this.$el.offsetWidth;
    }
    closest(selector) {
        return $( this.$el.closest(selector) );
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }
    css(styles = {}) {
        Object.keys(styles).forEach(styleItem => {
            const styleName = getStyleName(styleItem);
            this.$el.style[styleName] = styles[styleItem];
        }) ;
    }
}

export default function $(selector) {
    return new Dom(selector);
}

$.create = (tag, classes = '') => {
    const el = document.createElement(tag);
    if(classes) {
        el.classList.add(classes);
    }
    return $(el);
}