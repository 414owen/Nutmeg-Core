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
 
var Nutmeg = (function() {
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
        var elified = function() {
            elified.append(arguments);
            return elified;
        }
        elified.val = elem;
        var evs = elified.events = {};
        events.forEach(function(ev) {
            var name = ev[0];
            var callbacks = {};
            evs[name] = callbacks;
            elem[name] = function(e) {
                for (var key in callbacks) {
                    callbacks[key].apply(elified, [e]);
                }
            }
        });
        elified.privateID = 0;
        elFuncNames.forEach(function(func) {
            elified[func[0]] = function() {
                func[1].apply(elified, arguments);
                return elified;
            }
        });

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
        'img',
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

    var specialFuncs = [
        ["append", function() {
            appendChildren(this.val, arguments);
        }],
        ["link", function(url) {
            this.style({cursor: 'pointer'});
            this.onclick(function() {window.location = url;});
        }],
        ["style", function() {
            processStyles(this, arguments);
        }],
        ["class", function() {
            setClasses(this.val, arguments);
        }],
        ["attr", function(key, value) {
            this.val.setAttribute(key, value);
        }],
        ["prop", function(key, value) {
            this.val[key] = value;
        }],
        ["clear", function() {
            var elem = this.val;
            while(elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
        }]
    ];

    var attributes = [
        'alt',
        'contenteditable',
        'href',
        'id',
        'readonly',
        'src',
        'title',
        'type',
        'placeholder'
    ].map(function(attrName) {
        return [attrName, function(value) {
            this.attr(attrName, value);
        }];
    });

    var properties = [
        'checked',
        'disabled',
        'height',
        'selected',
        'value',
        'width'
    ].map(function(propName) {
        return [propName, function(value) {
            this.prop(value);
        }]
    });

    var events = [
        'onactivate', 
        'onblur',
        'onchange',
        'onclick',
        'ondblclick',
        'ondeactivate',
        'onfocus',
        'onkeydown',
        'onkeypress',
        'onkeyup',
        'onmousedown',
        'onmouseout',
        'onmouseover',
        'onmouseup'
    ].map(function(evName) {
        return [evName, function(func, funcID) {
            if (func === null) {
                delete this.events[evName][funcID];
            } else {
                if (funcID === undefined) {
                    funcID = '_priv_' + this.privateID++;
                }
                this.events[evName][funcID] = function(e) {
                    func.apply(this, [e]);
                }
            }
        }]
    });

    var pseudoEls = [
        ['hover', 12, 11],
        ['focus', 6, 1],
        ['active', 0, 5]
    ].map(function (p) {return [p[0], events[p[1]][0], events[p[2]][0]];});

    var elFuncNames = events.concat(
        properties, 
        attributes, 
        specialFuncs
    );

    // Allow *el*.style(...) syntax as well as *el*().style(...)
    function shortCircuit(elGetter) {
        elFuncNames.forEach(function(func) {
            elGetter[func[0]] = function() {
                return elGetter()[func[0]].apply(null, arguments);
            }
        });
        return elGetter;
    }

    nutmeg.body = shortCircuit(function() {
        return nutmeg.elify(D.body).append(arguments);
    });

    elNames.forEach(function(elName) {
        nutmeg[elName] = shortCircuit(function() {
            return nutmeg.elify(D.createElement(elName)).append(arguments);
        });
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

    return nutmeg;
})();