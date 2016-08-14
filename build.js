(function(){/*

 This is Nutmeg. a tiny client-side website generator.
 Homepage: https://github.com/414owen/Nutmeg


 Copyright (c) 2016 Owen Shepherd
 This software is open-source under the MIT license.
 The full license can be viewed here: https://opensource.org/licenses/MIT

*/
function nutmeg(){function k(b,a){a.forEach(function(a){for(var c in a)b.style[c]=a[c]})}function g(b,a){switch(typeof a){case "function":b.appendChild(a.val);break;case "string":var e=h.createTextNode(a);b.appendChild(e);break;case "object":for(e=0;e<a.length;e++)g(b,a[e]);break;default:g(b,a.toString())}}function l(b,a){a.forEach(function(a){b.classList.add(a)})}var h=document,m=window,f={elify:function(b){var a=function(){a.append(arguments);return a};a.append=function(c){g(b,c);return a};a.function______$link=
function(b){a.style([{cursor:"pointer"}]);return a};a.style=function(c){Array.prototype.slice.call(arguments).forEach(function(a){k(b,a)});return a};a.classes=function(c){l(b,c);return a};a.attr=function(c,d){b.setAttribute(c,d);return a};a.prop=function(c,d){b[c]=d;return a};a.function______$clear=function(){for(;b.firstChild;)b.removeChild(b.firstChild);return a};n.forEach(function(c){a[c]=function(d){b.setAttribute(c,d);return a}});p.forEach(function(c){a[c]=function(d){b[c]=d;return a}});var e=
{};q.forEach(function(c){var d=c+"funcs";e[d]={};a["rem"+c]=function(b){delete e[d][b];return a};a[c]=function(b,c){e[d][b]=c;return a};b[c]=function(){var a=e[d],b;for(b in a)a[b]()}});a.val=b;return a}},n="alt contenteditable href id readonly src title type".split(" "),p="checked disabled height selected value width".split(" "),q="onblur onchange onclick ondblclick onfocus onkeydown onkeyup onmousedown onmouseout onmouseover onmouseup".split(" ");f.body=function(){return f.elify(h.body).append(arguments)};
"a audio b br button canvas datalist div em footer form h1 h2 h3 h4 h5 h6 header hr i input item label li menu menuitem meter nav noscript ol p pre progress script select span strong table tbody td textarea tfoot th thead tr ul video".split(" ").forEach(function(b){f[b]=function(){return f.elify(h.createElement(b)).append(arguments)}});f.mergeStyle=function(b){var a={},e;for(e in b){var c=function(a){void 0!==a.depends&&a.depends.forEach(function(a){c(b[a])});d.push(a)},d=[];c(b[e]);a[e]=d}return a};
f.global=function(){Object.keys(f).forEach(function(b){m[b]=f[b]})};return f};}).call(window);
