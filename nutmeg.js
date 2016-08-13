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
    var D = document,
        W = window,
        nutmeg = {};

    function setStyles(el, styles) {
        styles.forEach(function(style) {
            for (var key in style) {
                el.style[key] = style[key];
            }
        });
    };

    function appendChildren(el, child) {
        switch(typeof(child)) {
            case 'function':
                el.appendChild(child.val);
                break;
            case 'string':
                var node = D.createTextNode(child);
                el.appendChild(node);
                break;
            case 'object':
                for (var i = 0; i < child.length; i++)
                    appendChildren(el, child[i]);
                break;
            default:
                appendChildren(el, child.toString())
        }
    }

    function setClasses(el, classes) {
        classes.forEach(function(classname) {
            el.classList.add(classname);
        });
    };

    function addClickEvent(el, event) {
        var curr = el.onclick;
        if (curr === null)
            el.onclick = event;
        else {
            el.onclick = function() {
                curr();
                event();
            };
        }
    };

    nutmeg.elify = function(elem) {
        var elified = function() {
            elified.append(arguments);
            return elified;
        }
        elified.append = function(children) {
            appendChildren(elem, children);
        };
        elified.onclick = function(todo) {
            addClickEvent(elem, todo);
        };
        elified.link = function(url) {
            addClickEvent(elem, function() {W.location = url;});
            elified.style([{cursor: 'pointer'}]);
        };
        elified.style = function(styles) {
            // To array, to use forEach.
            var args = Array.prototype.slice.call(arguments);
            args.forEach(function(arg) {setStyles(elem, arg)});
        };
        elified.classes = function(classes) {
            setClasses(elem, classes);
        };
        /** Change an attribute on the element. */
        elified.attr = function(key, value) {
            elem.setAttribute(key, value);
        };
        /** Change a property on the element. */
        elified.prop = function(key, value) {
            elem[key] = value;
        };

        // Add attributes to elified.
        attrNames.forEach(function(attrName) {
            elified[attrName] = function(value) {
                elem.setAttribute(attrName, value);
            }
        });
        // Add properties to elified.
        propNames.forEach(function(propName) {
            elified[propName] = function(value) {
                elem[propName] = value;
            }
        });

        for (var funkey in elified) {
            var scope = function() {
                var func = elified[funkey];
                elified[funkey] = function() {
                    func.apply(null, arguments);
                    return elified;
                };
            };
            scope();
        }
        elified.val = elem;
        return elified;
    };

    var elNames = [
        'a',
        'audio',
        'b',
        'br',
        'button',
        'canvas',
        'datalist',
        'div',
        'em',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hr',
        'i',
        'input',
        'item',
        'label',
        'li',
        'menu',
        'menuitem'
        'meter',
        'nav',
        'noscript',
        'ol',
        'p',
        'pre',
        'progress',
        'script',
        'select',
        'span',
        'strong',
        'table',
        'tbody',
        'td',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'tr',
        'ul',
        'video'
    ];
    var attrNames = [
        'alt',
        'contenteditable',
        'href',
        'id',
        'readonly',
        'src',
        'title',
        'type'
    ];
    var propNames = [
        'checked',
        'disabled',
        'height',
        'selected',
        'value',
        'width'
    ];
    var functions = [
        'onblur',
        'onchange',
        'onclick',
        'ondblclick'
        'onfocus',
        'onkeydown',
        'onkeyup',
        'onmousedown',
        'onmouseout',
        'onmouseover',
        'onmouseup'
    ];

    nutmeg.body = function() {return elify(D.body).append(arguments);};

    elNames.forEach(function(elName) {
        nutmeg[elName] = function() {
            return elify(D.createElement(elName)).append(arguments);
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
