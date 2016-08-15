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

    function setStyles(elified, styles) {
        if (styles.length === undefined) {
            var elstyle = elified.val.style;
            for (var key in styles) {
                elstyle[key] = styles[key];
            }
        } else {
            for (var i = 0; i < styles.length; i++) {
                setStyles(elified, styles[i]);
            }
        }
    }

    function processStyles(elified, styles) {
        var toApply;
        if (styles.base === undefined) {
            toApply = styles;
        } else {
            toApply = styles.base;
            pseudoEls.forEach(function(pseudo) {
                var name = pseudo[0];
                if (styles[name].length !== 0) {
                    elified.val[pseudo[1]] = function() {
                        setStyles(elified, styles[name]);
                    }
                    elified.val[pseudo[2]] = function() {
                        var toSet = elified.val.style;
                        styles[name].forEach(function(style) {
                            for (var key in style) {
                                toSet[key] = '';
                            }
                            setStyles(elified, toApply);
                        });
                    }
                }
            });
        }
        setStyles(elified, toApply);
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
        classes.forEach(function(classname) {
            el.classList.add(classname);
        });
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
        elified.style = function(styles) {
            processStyles(elified, styles);
            return elified;
        };
        elified.classes = function(classes) {
            setClasses(elem, classes);
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
            elified['rem' + eventName] = function(funcID) {
                delete events[key][funcID];
                return elified;
            };
            elified[eventName] = function(func, funcID) {
                var id = funcID;
                if (funcID === undefined) {
                    id = '_priv_' + privateID++;
                }
                events[key][id] = func;
                return elified;
            };
            elem[eventName] = function() {
                var callbacks = events[key];
                for (var callback in callbacks) {
                    callbacks[callback]();
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


    // TODO, make stylegroups have this structure:
    // {
    //     bordered: {
    //         base: [{color: 'blue'}],
    //         active: [{color: 'yellow'}],
    //         hover: [{color: 'green'}]
    //     }
    // }
    // 
    // Then, make the styles apply like that, under elified.style.
    nutmeg.mergeStyle = function(root) {
        var styleGroups = {};
        for (var key in root) {
            var styles = {base: []};
            pseudoEls.forEach(function(el) {
                styles[el[0]] = [];
            });

            /**
             * @param {Object} style
             * @type  {(Array.string|undefined)} style.depends
             */
            function merge(style) {
                if (style.depends !== undefined) {
                    style.depends.forEach(function(dep) {
                        merge(root[dep]);
                    });
                }
                pseudoEls.forEach(function(pseudoEl) {
                    var name = pseudoEl[0];
                    if(style[name] !== undefined) {
                        styles[name].push(style[name]);
                    }
                });
                styles.base.push(style);
            }
            merge(root[key])
            styleGroups[key] = styles;
        }
        return styleGroups;
    };

    nutmeg.global = function() {
        Object.keys(nutmeg).forEach(function(key) {
            W[key] = nutmeg[key];
        });
    };

    return nutmeg;
}
