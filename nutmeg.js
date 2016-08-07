/* 
 *
 * @license
 * Copyright (c) 2016 Owen Shepherd
 * This software is open-source under the MIT license.
 * The full license can be viewed here: https://opensource.org/licenses/MIT
 *
 */

 /*
  * 
  * @preserve
  * This is Nutmeg. a tiny client-side website generator.
  * Homepage: https://github.com/414owen/Nutmeg
  *
  */

var D = document,
    W = window;

function setStyles(el, styles) {
    styles.forEach(function(style) {
        Object.assign(el.style, style);
    });
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

function addClickEvent(el, event) {
    el.onclick = function() {
        if (el.onclick !== undefined) {
            el.onclick();
        }
        event();
    }
}

function elify(el) {
    function elified() {
        var scope = this;
        this.val = el;
        this.append = function(children) {
            appendChildren(this.val, children);
            return scope;
        };
        this.onclick = function(todo) {
            scope.val.onclick = todo;
            return scope;
        };
        this.link = function(url) {
            scope.onclick(function() {
                window.location = url;
            });
            return scope.style([{cursor: 'pointer'}]);
        };
        this.style = function(styles) {
            setStyles(scope.val, styles);
            return scope;
        };
        this.classes = function(classes) {
            setClasses(scope.val, classes);
            return scope;
        };
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
];

function bod() {return elify(D.body);}

elNames.forEach(function(elName) {
    window[elName] = function() {
        return get(elName);
    }
});

function mergeStyle(root) {
    const styleGroups = {};
    for (var key in root) {
        var styles = [];
        function merge(style) {
            var deps = style.depends;
            if (deps !== undefined) {
                deps.forEach(function(dep) {
                    merge(root[dep]);
                });
            }
            styles.push(style);
        }
        merge(root[key])
        delete styles.depends;
        styleGroups[key] = styles;
    }
    return styleGroups;
}
