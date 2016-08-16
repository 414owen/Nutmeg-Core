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
function nutmeg(){function n(t,e){if(void 0===e.length)if(void 0!==e.base)n(t,e.base),l.forEach(function(o){var r=o[0];0!==e[r].length&&(t[o[1]](function(){n(t,e[r])}),t[o[2]](function(){var o=t.val.style;e[r].forEach(function(e){for(var r in e)o[r]="";n(t,toApply)})}))});else{var o=t.val.style;for(var r in e)o[r]=e[r]}else for(var i=0;i<e.length;i++)n(t,e[i])}function t(n,e){switch(typeof e){case"function":n.appendChild(e.val);break;case"string":var r=o.createTextNode(e);n.appendChild(r);break;case"object":for(var i=0;i<e.length;i++)t(n,e[i]);break;default:t(n,e.toString())}}function e(n,t){t.forEach(function(t){n.classList.add(t)})}var o=document,r=window,i={};i.elify=function(o){var r=function(){return r.append(arguments),r};r.append=function(n){return t(o,n),r},r.link=function(n){return r.style({cursor:"pointer"}),r.onclick(function(){window.location=n}),r},r.style=function(t){return n(r,t),r},r.classes=function(n){return e(o,n),r},r.attr=function(n,t){return o.setAttribute(n,t),r},r.prop=function(n,t){return o[n]=t,r},r.clear=function(){for(;o.firstChild;)o.removeChild(o.firstChild);return r},c.forEach(function(n){r[n]=function(t){return o.setAttribute(n,t),r}}),u.forEach(function(n){r[n]=function(t){return o[n]=t,r}});var i={},a=0;return f.forEach(function(n){var t=n+"funcs";i[t]={},r["rem"+n]=function(n){return delete i[t][n],r},r[n]=function(n,e){var o=e;return void 0===e&&(o="_priv_"+a++),i[t][o]=n,r},o[n]=function(){var n=i[t];for(var e in n)n[e]()}}),r.val=o,r};var a=["a","audio","b","br","button","canvas","datalist","div","em","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","input","item","label","li","menu","menuitem","meter","nav","noscript","ol","p","pre","progress","script","select","span","strong","table","tbody","td","textarea","tfoot","th","thead","tr","ul","video"],c=["alt","contenteditable","href","id","readonly","src","title","type"],u=["checked","disabled","height","selected","value","width"],f=["onactivate","onblur","onchange","onclick","ondblclick","ondeactivate","onfocus","onkeydown","onkeyup","onmousedown","onmouseout","onmouseover","onmouseup"],l=[["hover","onmouseover","onmouseout"],["focus","onfocus","onblur"],["active","onactivate","ondeactivate"]];return i.body=function(){return i.elify(o.body).append(arguments)},a.forEach(function(n){i[n]=function(){return i.elify(o.createElement(n)).append(arguments)}}),i.mergeStyle=function(n){function t(e){void 0!==e.depends&&e.depends.forEach(function(e){t(n[e])}),l.forEach(function(n){var t=n[0];void 0!==e[t]&&r[t].push(e[t])}),r.base.push(e)}var e={};for(var o in n){var r={base:[]};l.forEach(function(n){r[n[0]]=[]}),t(n[o]),e[o]=r}return e},i.global=function(){Object.keys(i).forEach(function(n){r[n]=i[n]})},i}