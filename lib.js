/* 
 *
 * Copyright (c) 2016 Owen Shepherd
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

 /*
  *
  * This is Nutmeg. a tiny client-side website generator.
  * See https://github.com/414owen/Nutmeg
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
