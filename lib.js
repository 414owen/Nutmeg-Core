var D = document,
    W = window;

function setStyles(el, styles) {
    styles.unshift({});
    Object.assign(el.style, styles.reduce(function(acc, curr) {
        return Object.assign(acc, curr);
    }));
}

function appendChildren(el, children) {
    children.forEach(function(child) {
        el.appendChild(child.val);
    });
}

function setClasses(el, classes) {
    classes.forEach(function(classname) {
        el.classList.add(classname);
    });
}

function elify(el) {
    function elified() {
        var scope = this;
        this.val = el;
        this.append = function(children) {
            appendChildren(this.val, children);
            return scope;
        }
        this.onclick = function(todo) {
            scope.val.onclick = todo;
            return scope;
        }
        this.style = function(styles) {
            setStyles(scope.val, styles);
            return scope;
       }
       this.classes = function(classes) {
            setClasses(scope.val, classes);
            return scope;
       }
    }
    return new elified();

}

function get(name) {
    return elify(D.createElement(name));
}

function text(text) {
    return elify(D.createTextNode(text));
}

var elNames = [
    'div',
    'span',
    'em',
    'p',
    'strong',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'ol',
    'ul',
    'li',
    'br',
    'i'
]

elNames.forEach(function(elName) {
    window[elName] = function() {
        return get(elName);
    }
});

function mergeStyle(root) {
    function merge(styleOne, styleTwo) {
        return Object.assign({}, styleOne, styleTwo);
    }
    for (var style in root) {
        if (style.depends !== undefined) {

        }
    }
}