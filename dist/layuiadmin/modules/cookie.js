var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};layui.define(["jquery"],function(e){var o=layui.jquery;!function(n){!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):n("object"===("undefined"==typeof e?"undefined":_typeof(e))?require("jquery"):o)}(function(e){function o(e){return c.raw?e:encodeURIComponent(e)}function n(e){return c.raw?e:decodeURIComponent(e)}function t(e){return o(c.json?JSON.stringify(e):String(e))}function i(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(u," ")),c.json?JSON.parse(e):e}catch(o){}}function r(o,n){var t=c.raw?o:i(o);return e.isFunction(n)?n(t):t}var u=/\+/g,c=e.cookie=function(i,u,f){if(void 0!==u&&!e.isFunction(u)){if(f=e.extend({},c.defaults,f),"number"==typeof f.expires){var p=f.expires,a=f.expires=new Date;a.setTime(+a+864e5*p)}return document.cookie=[o(i),"=",t(u),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var d=i?void 0:{},y=document.cookie?document.cookie.split("; "):[],s=0,l=y.length;s<l;s++){var m=y[s].split("="),v=n(m.shift()),b=m.join("=");if(i&&i===v){d=r(b,u);break}i||void 0===(b=r(b))||(d[v]=b)}return d};c.defaults={},e.removeCookie=function(o,n){return void 0!==e.cookie(o)&&(e.cookie(o,"",e.extend({},n,{expires:-1})),!e.cookie(o))}})}(o),e("cookie",null)});
//# sourceMappingURL=src/maps/cookie.js.map
