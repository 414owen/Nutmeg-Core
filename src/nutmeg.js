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
 
function nutmeg(func) {
    var D = document,
        W = window,
        nutmeg = {};

    function addPseudoElEvents(elified, styles, pseudo) {
        elified[pseudo[1]](function() {
            processStyles(elified, styles[pseudo[0]]);
        });
        elified[pseudo[2]](function() {
            var toSet = elified.val.style;
            styles[pseudo[0]].forEach(function(style) {
                for (var key in style) {
                    toSet[key] = '';
                }
                processStyles(elified, styles.base);
            });
        });
    }

    function processStyles(elified, styles) {
        if (styles.length === undefined) {
            // If from mergeStyles
            if (styles.base !== undefined) {
                // Apply base styles
                processStyles(elified, styles.base);
                // Add events for supplied pseudo-elements
                pseudoEls.forEach(function(pseudo) {
                    if (styles[pseudo[0]].length !== 0) {
                        addPseudoElEvents(elified, styles, pseudo);
                    }
                });
            } else {
                // Apply style
                var elstyle = elified.val.style;
                for (var key in styles) {
                    elstyle[key] = styles[key];
                }
            }
        } else {
            // If an array, attempt to apply all elements
            for (var i = 0; i < styles.length; i++) {
                processStyles(elified, styles[i]);
            }
        }
    }

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
        if (typeof(classes) === 'string') {
            el.classList.add(classes);
        } else {
            for (var i = 0; i < classes.length; i++) {
                setClasses(el, classes[i]);
            }
        }
    }

    nutmeg.elify = function(elem) {
        /**
         * Elified - A Nutmeg Element
         */
        var elified = function() {
            elified.append(arguments);
            return elified;
        }
        elified.append = function(children) {
            appendChildren(elem, children);
            return elified;
        };
        elified.link = function(url) {
            elified.style({cursor: 'pointer'});
            elified.onclick(function() {window.location = url;});
            return elified;
        };
        elified.style = function() {
            processStyles(elified, arguments);
            return elified;
        };
        elified.classes = function() {
            setClasses(elem, arguments);
            return elified;
        };
        /** Change an attribute on the element. */
        elified.attr = function(key, value) {
            elem.setAttribute(key, value);
            return elified;
        };
        /** Change a property on the element. */
        elified.prop = function(key, value) {
            elem[key] = value;
            return elified;
        };
        /** Remove all children of the element. */
        elified.clear = function() {
            while(elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
            return elified;
        };

        // Add attributes to elified.
        attrNames.forEach(function(attrName) {
            elified[attrName] = function(value) {
                elem.setAttribute(attrName, value);
                return elified;
            };
        });
        // Add properties to elified.
        propNames.forEach(function(propName) {
            elified[propName] = function(value) {
                elem[propName] = value;
                return elified;
            };
        });

        var events = {};
        var privateID = 0;
        eventNames.forEach(function(eventName) {
            var key = eventName + 'funcs';
            events[key] = {};
            elified[eventName] = function(func, funcID) {
                if (func === null) {
                    delete events[key][funcID];
                } else {
                    if (funcID === undefined) {
                        funcID = '_priv_' + privateID++;
                    }
                    events[key][funcID] = func;
                }
                return elified;
            };
            elem[eventName] = function(e) {
                var callbacks = events[key];
                for (var callback in callbacks) {
                    callbacks[callback](e, elified);
                }
            };
        });

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
        'menuitem',
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
        'video',
        'canvas'
    ];
    var attrNames = [
        'alt',
        'contenteditable',
        'href',
        'id',
        'readonly',
        'src',
        'title',
        'type',
        'placeholder'
    ];
    var propNames = [
        'checked',
        'disabled',
        'height',
        'selected',
        'value',
        'width'
    ];
    var eventNames = [
        'onactivate', 
        'onblur',
        'onchange',
        'onclick',
        'ondblclick',
        'ondeactivate',
        'onfocus',
        'onkeydown',
        'onkeyup',
        'onmousedown',
        'onmouseout',
        'onmouseover',
        'onmouseup'
    ];
    var pseudoEls = [
        ['hover', 'onmouseover', 'onmouseout'],
        ['focus', 'onfocus', 'onblur'],
        ['active', 'onactivate', 'ondeactivate']
    ];

    nutmeg.body = function() {return nutmeg.elify(D.body).append(arguments);};

    elNames.forEach(function(elName) {
        nutmeg[elName] = function() {
            return nutmeg.elify(D.createElement(elName)).append(arguments);
        }
    });

    nutmeg.mergeStyle = function(root) {
        var styleGroups = {};
        for (var key in root) {
            var styles = {base: []};
            pseudoEls.forEach(function(el) {
                styles[el[0]] = [];
            });
            function merge(style, category) {
                if (style.depends !== undefined) {
                    style.depends.forEach(function(dep) {
                        merge(root[dep], 'base');
                    });
                }
                pseudoEls.forEach(function(pseudoEl) {
                    var name = pseudoEl[0];
                    if(style[name] !== undefined) {
                        if (style[name].depends !== undefined) {
                            style[name].depends.forEach(function(dep) {
                                merge(root[dep], name);
                            });
                        }
                        styles[name].push(style[name]);
                    }
                });
                styles[category].push(style);
            }
            merge(root[key], 'base');
            styleGroups[key] = styles;
        }
        return styleGroups;
    };

    nutmeg.bind = function(scope) {
        Object.keys(nutmeg).forEach(function(key) {
            scope[key] = nutmeg[key];
        });
    };

    nutmeg.global = function() {nutmeg.bind(W);};

    if (func !== undefined) {
        nutmeg.global();
        window.onload = func;
    }

    return nutmeg;
}
