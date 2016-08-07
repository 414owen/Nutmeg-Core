/**
 *
 * @license
 * Copyright (c) 2016 Owen Shepherd
 * This software is open-source under the MIT license.
 * The full license can be viewed here: https://opensource.org/licenses/MIT
 *
 */

 /**
  * 
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
        function elified(el) {
            var elified = this;
            elified.val = el;
            elified.append = function(children) {
                appendChildren(elified.val, children);
                return elified;
            };
            elified.onclick = function(todo) {
                addClickEvent(elified.val, todo);
                return elified;
            };
            elified.link = function(url) {
                addClickEvent(elified.val, function() {W.location = url;});
                return elified.style([{cursor: 'pointer'}]);
            };
            elified.style = function(styles) {
                setStyles(elified.val, styles);
                return elified;
            };
            elified.classes = function(classes) {
                setClasses(elified.val, classes);
                return elified;
            };
        }
        return new elified(elem);
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

    nutmeg.body = function() {return elify(D.body);}

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