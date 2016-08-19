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
function nutmeg(){function n(n,t,o){n[o[1]](function(){e(n,t[o[0]])}),n[o[2]](function(){var r=n.val.style;t[o[0]].forEach(function(o){for(var i in o)r[i]="";e(n,t.base)})})}function e(t,o){if(void 0===o.length)if(void 0!==o.base)e(t,o.base),s.forEach(function(e){0!==o[e[0]].length&&n(t,o,e)});else{var r=t.val.style;for(var i in o)r[i]=o[i]}else for(var a=0;a<o.length;a++)e(t,o[a])}function t(n,e){switch(typeof e){case"function":n.appendChild(e.val);break;case"string":var o=r.createTextNode(e);n.appendChild(o);break;case"object":for(var i=0;i<e.length;i++)t(n,e[i]);break;default:t(n,e.toString())}}function o(n,e){e.forEach(function(e){n.classList.add(e)})}var r=document,i=window,a={};a.elify=function(n){var r=function(){return r.append(arguments),r};r.append=function(e){return t(n,e),r},r.link=function(n){return r.style({cursor:"pointer"}),r.onclick(function(){window.location=n}),r},r.style=function(n){return e(r,n),r},r.classes=function(e){return o(n,e),r},r.attr=function(e,t){return n.setAttribute(e,t),r},r.prop=function(e,t){return n[e]=t,r},r.clear=function(){for(;n.firstChild;)n.removeChild(n.firstChild);return r},u.forEach(function(e){r[e]=function(t){return n.setAttribute(e,t),r}}),f.forEach(function(e){r[e]=function(t){return n[e]=t,r}});var i={},a=0;return l.forEach(function(e){var t=e+"funcs";i[t]={},r["rem"+e]=function(n){return delete i[t][n],r},r[e]=function(n,e){return null==n?delete i[t][e]:(void 0===e&&(e="_priv_"+a++),i[t][e]=n),r},n[e]=function(){var n=i[t];for(var e in n)n[e]()}}),r.val=n,r};var c=["a","audio","b","br","button","canvas","datalist","div","em","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","input","item","label","li","menu","menuitem","meter","nav","noscript","ol","p","pre","progress","script","select","span","strong","table","tbody","td","textarea","tfoot","th","thead","tr","ul","video"],u=["alt","contenteditable","href","id","readonly","src","title","type"],f=["checked","disabled","height","selected","value","width"],l=["onactivate","onblur","onchange","onclick","ondblclick","ondeactivate","onfocus","onkeydown","onkeyup","onmousedown","onmouseout","onmouseover","onmouseup"],s=[["hover","onmouseover","onmouseout"],["focus","onfocus","onblur"],["active","onactivate","ondeactivate"]];return a.body=function(){return a.elify(r.body).append(arguments)},c.forEach(function(n){a[n]=function(){return a.elify(r.createElement(n)).append(arguments)}}),a.mergeStyle=function(n){function e(t){void 0!==t.depends&&t.depends.forEach(function(t){e(n[t])}),s.forEach(function(n){var e=n[0];void 0!==t[e]&&r[e].push(t[e])}),r.base.push(t)}var t={};for(var o in n){var r={base:[]};s.forEach(function(n){r[n[0]]=[]}),e(n[o]),t[o]=r}return t},a.global=function(){Object.keys(a).forEach(function(n){i[n]=a[n]})},a}