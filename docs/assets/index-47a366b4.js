var q=Object.defineProperty;var F=(s,e,t)=>e in s?q(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var m=(s,e,t)=>(F(s,typeof e!="symbol"?e+"":e,t),t),A=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var n=(s,e,t)=>(A(s,e,"read from private field"),t?t.call(s):e.get(s)),h=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},f=(s,e,t,r)=>(A(s,e,"write to private field"),r?r.call(s,t):e.set(s,t),t);var P=(s,e,t)=>(A(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function S(s){let e=0;for(let t=0;t<s.length;t++)e=s[e]<=s[t]?e:t;return e}function j(s,{getW:e,setW:t,getH:r,setH:i,getPad:o,setX:p,setY:C,getChildren:W},{cols:v,gap:g}){const[E,z,x,H]=o(s),y=W(s),M=y.length;if(M){const I=(e(s)-g*(v-1)-(H+z))/v;Array.prototype.forEach.call(y,c=>t(c,I));const R=Array.prototype.map.call(y,c=>r(c)),b=Array(v).fill(E);for(let c=0;c<M;c++){const N=y[c],L=S(b);C(N,b[L]),p(N,H+(I+g)*L),b[L]+=R[c]+g}i(s,Math.max(...b)-g+x)}else i(s,E+x)}var l,d,a,u,w,T;const O=class extends HTMLElement{constructor(){super();h(this,w);m(this,"_fl_w");m(this,"_fl_h");h(this,l,void 0);h(this,d,void 0);h(this,a,void 0);h(this,u,!1)}get gap(){return+(this.getAttribute("gap")||O.default_props.gap)}set gap(t){this.setAttribute("gap",t+"")}get cols(){return+(this.getAttribute("cols")||O.default_props.cols)}set cols(t){this.setAttribute("cols",t+"")}connectedCallback(){f(this,l,new ResizeObserver(t=>t.some(({target:r})=>r._fl_w!=r.offsetWidth||r._fl_h!=r.offsetHeight)&&this.relayout())),n(this,l).observe(this),Array.prototype.forEach.call(this.children,t=>n(this,l).observe(t)),this.relayout(),f(this,d,new MutationObserver(t=>{t.forEach(r=>{r.addedNodes.forEach(i=>i instanceof HTMLElement&&n(this,l).observe(i)),r.removedNodes.forEach(i=>i instanceof HTMLElement&&n(this,l).unobserve(i))}),this.relayout()})),n(this,d).observe(this,{childList:!0,attributes:!1}),f(this,a,new MutationObserver(()=>this.relayout())),n(this,a).observe(this,{childList:!1,attributes:!0})}disconnectedCallback(){n(this,l).disconnect(),n(this,d).disconnect(),n(this,a).disconnect()}relayout(){n(this,u)||(f(this,u,!0),requestAnimationFrame(()=>{P(this,w,T).call(this),f(this,u,!1)}))}};let _=O;l=new WeakMap,d=new WeakMap,a=new WeakMap,u=new WeakMap,w=new WeakSet,T=function(){j(this,{getW:t=>t.offsetWidth,setW:(t,r)=>t.style.width=r+"px",getH:t=>(t._fl_w=t.offsetWidth,t._fl_h=t.offsetHeight),setH:(t,r)=>t.style.height=r+"px",getPad:t=>{const r=getComputedStyle(t);return[parseInt(r.paddingTop),parseInt(r.paddingRight),-parseInt(r.paddingTop),parseInt(r.paddingLeft)]},setX:(t,r)=>t.style.left=r+"px",setY:(t,r)=>t.style.top=r+"px",getChildren:t=>t.children},{cols:this.cols,gap:this.gap}),this._fl_w=this.offsetWidth,this._fl_h=this.offsetHeight,n(this,a).takeRecords()},m(_,"default_props",Object.freeze({cols:2,gap:4}));customElements.define("wc-waterfall",_);
