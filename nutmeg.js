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

function nutmeg() {    
    this.D = document;
    this.W = window;
    var nutmeg = {};

    var setStyles = function(el, styles) {
        styles.forEach(function(style) {
            Object.assign(el.style, style);
        });
    };

    var appendChildren = function(el, children) {
        children.forEach(function(child) {
            el.appendChild(child.val);
        });
    };

    var setClasses = function(el, classes) {
        classes.forEach(function(classname) {
            el.classList.add(classname);
        });
    };

    var addClickEvent = function(el, event) {
        el.onclick = function() {
            if (el.onclick !== undefined) {
                el.onclick();
            }
            event();
        }
    };

    nutmeg.elify = function(el) {
        return new function () {
            var scope = this;
            this.val = el;
            this.append = function(children) {
                appendChildren(scope.val, children);
                return scope;
            };
            this.onclick = function(todo) {
                addClickEvent(scope.val, todo);
                return scope;
            };
            this.link = function(url) {
                addClickEvent(function() {W.location = url;});
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
    };

    nutmeg.text = function(text) {
        return nutmeg.elify(D.createTextNode(text));
    };

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

    nutmeg.bod = function() {return elify(D.body);}

    elNames.forEach(function(elName) {
        nutmeg[elName] = function() {
            return elify(D.createElement(elName));
        }
    });

    nutmeg.mergeStyle = function(root) {
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

    nutmeg.global = function() {
        Object.keys(nutmeg).forEach(function(key) {
            W[key] = nutmeg[key];
        });
    }
    debugger;
    return nutmeg;
}