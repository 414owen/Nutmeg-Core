/**
 * @license
 * Copyright (c) 2016 Owen Shepherd
 * This software is open-source under the MIT license.
 * The full license can be viewed here: https://opensource.org/licenses/MIT
 *
 */

 /**
  * @preserve
  * This is Nutmeg. a tiny client-side website generator.
  * Homepage: https://github.com/414owen/Nutmeg
  *
  */

function nutmeg() {
    var D = document;
    var W = window;
    var nutmeg = {};

    var setStyles = function(el, styles) {
        styles.forEach(function(style) {
            Object.assign(el.style, style);
        });
    };

    var appendChildren = function(el, child) {
        var type = typeof(child);
        switch(type) {
            case 'function':
                el.appendChild(child.val);
                break;
            case 'string': 
                appendChildren(el, text(child));
                break;
            case 'object':
                for (var i = 0; i < child.length; i++) {
                    appendChildren(el, child[i]);
                }
                break;
            case 'number': 
                appendChildren(el, child.toString())
        }
    }

    var setClasses = function(el, classes) {
        classes.forEach(function(classname) {
            el.classList.add(classname);
        });
    };

    var addClickEvent = function(el, event) {
        var curr = el.onclick;
        if (curr === null) {
            el.onclick = event;
        } else {
            el.onclick = function() {
                curr();
                event();
            };
        }
    };

    nutmeg.elify = function(elem) {
        var elified = function() {
            elified.append(Array.from(arguments));
            return elified;
        }
        elified.val = elem;
        elified.append = function(children) {
            appendChildren(elem, children);
            return elified;
        };
        elified.onclick = function(todo) {
            addClickEvent(elem, todo);
            return elified;
        };
        elified.link = function(url) {
            addClickEvent(elem, function() {W.location = url;});
            return elified.style([{cursor: 'pointer'}]);
        };
        elified.style = function(styles) {
            Array.from(arguments).forEach(function(arg) {setStyles(elem, arg)});
            return elified;
        };
        elified.classes = function(classes) {
            setClasses(elem, classes);
            return elified;
        };
        elified.src = function(source) {
            return elified.attr('src', source);
        };
        elified.href = function(ref) {
            return elified.attr('href', ref);
        };
        elified.attr = function(key, value) {
            elem[key] = value;
            return elified;
        }

        return elified;
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
        'i',
        'b',
        'pre',
        'item',
        'nav',
        'footer',
        'header',
        'audio',
        'video',
        'canvas',
        'script',
        'noscript',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'button',
        'input',
        'select',
        'datalist',
        'form',
        'label',
        'meter',
        'progress',
        'textarea',
        'menu',
        'menuitem'
    ];

    nutmeg.body = function() {return elify(D.body).append(Array.from(arguments));};

    elNames.forEach(function(elName) {
        nutmeg[elName] = function() {
            return elify(D.createElement(elName)).append(Array.from(arguments));
        }
    });

    nutmeg.mergeStyle = function(root) {
        const styleGroups = {};
        for (var key in root) {
            var styles = [];
            function merge(style) {
                if (style.depends !== undefined) {
                    style.depends.forEach(function(dep) {
                        merge(root[dep]);
                    });
                }
                styles.push(style);
            }
            merge(root[key])
            styleGroups[key] = styles;
        }
        return styleGroups;
    }

    nutmeg.global = function() {
        Object.keys(nutmeg).forEach(function(key) {
            W[key] = nutmeg[key];
        });
    }

    return nutmeg;
}
