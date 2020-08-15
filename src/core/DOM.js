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
    text(txt) {
        if(typeof txt === 'string') {
            this.$el.textContent = txt;
            return this;
        }
        if(this.$el.tagName.toLowerCase === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
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
    id(parse) {
        if(parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id;
    }
    closest(selector) {
        return $( this.$el.closest(selector) );
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    find(selector) {
        return $( this.$el.querySelector(selector) );
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
    focus() {
        this.$el.focus();
        return this;
    }
    addClass(className) {
        this.$el.classList.add(className);
    }
    removeClass(className) {
        this.$el.classList.remove(className);
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