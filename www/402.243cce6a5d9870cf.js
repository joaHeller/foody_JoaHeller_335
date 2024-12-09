"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[402],{7402:(q,O,L)=>{L.r(O),L.d(O,{startInputShims:()=>Z});var g=L(467),l=L(4878),P=L(7849),y=L(1656),R=L(5680);const T=new WeakMap,M=(e,t,s,r=0,o=!1)=>{T.has(e)!==s&&(s?j(e,t,r,o):G(e,t))},j=(e,t,s,r=!1)=>{const o=t.parentNode,n=t.cloneNode(!1);n.classList.add("cloned-input"),n.tabIndex=-1,r&&(n.disabled=!0),o.appendChild(n),T.set(e,n);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${s}px,0) scale(0)`},G=(e,t)=>{const s=T.get(e);s&&(T.delete(e),s.remove()),e.style.pointerEvents="",t.style.transform=""},C="input, textarea, [no-blur], [contenteditable]",U="$ionPaddingTimer",B=(e,t,s)=>{const r=e[U];r&&clearTimeout(r),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[U]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),s&&s()},120)},W=(e,t,s)=>{e.addEventListener("focusout",()=>{t&&B(t,0,s)},{once:!0})};let A=0;const x="data-ionic-skip-scroll-assist",V=(e,t,s,r,o,n,i,a=!1)=>{const S=n&&(void 0===i||i.mode===R.a.None);let m=!1;const u=void 0!==l.w?l.w.innerHeight:0,f=h=>{!1!==m?F(e,t,s,r,h.detail.keyboardHeight,S,a,u,!1):m=!0},c=()=>{m=!1,null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c)},_=function(){var h=(0,g.A)(function*(){t.hasAttribute(x)?t.removeAttribute(x):(F(e,t,s,r,o,S,a,u),null==l.w||l.w.addEventListener("ionKeyboardDidShow",f),e.addEventListener("focusout",c))});return function(){return h.apply(this,arguments)}}();return e.addEventListener("focusin",_),()=>{e.removeEventListener("focusin",_),null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c)}},p=e=>{document.activeElement!==e&&(e.setAttribute(x,"true"),e.focus())},F=function(){var e=(0,g.A)(function*(t,s,r,o,n,i,a=!1,S=0,m=!0){if(!r&&!o)return;const u=((e,t,s,r)=>{var o;return((e,t,s,r)=>{const o=e.top,n=e.bottom,i=t.top,S=i+15,u=Math.min(t.bottom,r-s)-50-n,f=S-o,c=Math.round(u<0?-u:f>0?-f:0),_=Math.min(c,o-i),w=Math.abs(_)/.3;return{scrollAmount:_,scrollDuration:Math.min(400,Math.max(150,w)),scrollPadding:s,inputSafeY:4-(o-S)}})((null!==(o=e.closest("ion-item,[ion-item]"))&&void 0!==o?o:e).getBoundingClientRect(),t.getBoundingClientRect(),s,r)})(t,r||o,n,S);if(r&&Math.abs(u.scrollAmount)<4)return p(s),void(i&&null!==r&&(B(r,A),W(s,r,()=>A=0)));if(M(t,s,!0,u.inputSafeY,a),p(s),(0,y.r)(()=>t.click()),i&&r&&(A=u.scrollPadding,B(r,A)),typeof window<"u"){let f;const c=function(){var h=(0,g.A)(function*(){void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",_),window.removeEventListener("ionKeyboardDidShow",c),r&&(yield(0,P.c)(r,0,u.scrollAmount,u.scrollDuration)),M(t,s,!1,u.inputSafeY),p(s),i&&W(s,r,()=>A=0)});return function(){return h.apply(this,arguments)}}(),_=()=>{window.removeEventListener("ionKeyboardDidShow",_),window.addEventListener("ionKeyboardDidShow",c)};if(r){const h=yield(0,P.g)(r);if(m&&u.scrollAmount>h.scrollHeight-h.clientHeight-h.scrollTop)return"password"===s.type?(u.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",_)):window.addEventListener("ionKeyboardDidShow",c),void(f=setTimeout(c,1e3))}c()}});return function(s,r,o,n,i,a){return e.apply(this,arguments)}}(),Z=function(){var e=(0,g.A)(function*(t,s){if(void 0===l.d)return;const r="ios"===s,o="android"===s,n=t.getNumber("keyboardHeight",290),i=t.getBoolean("scrollAssist",!0),a=t.getBoolean("hideCaretOnScroll",r),S=t.getBoolean("inputBlurring",!1),m=t.getBoolean("scrollPadding",!0),u=Array.from(l.d.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,c=new WeakMap,_=yield R.K.getResizeMode(),h=function(){var v=(0,g.A)(function*(d){yield new Promise(I=>(0,y.c)(d,I));const K=d.shadowRoot||d,b=K.querySelector("input")||K.querySelector("textarea"),D=(0,P.a)(d),k=D?null:d.closest("ion-footer");if(b){if(D&&a&&!f.has(d)){const I=((e,t,s)=>{if(!s||!t)return()=>{};const r=a=>{(e=>e===e.getRootNode().activeElement)(t)&&M(e,t,a)},o=()=>M(e,t,!1),n=()=>r(!0),i=()=>r(!1);return(0,y.a)(s,"ionScrollStart",n),(0,y.a)(s,"ionScrollEnd",i),t.addEventListener("blur",o),()=>{(0,y.b)(s,"ionScrollStart",n),(0,y.b)(s,"ionScrollEnd",i),t.removeEventListener("blur",o)}})(d,b,D);f.set(d,I)}if("date"!==b.type&&"datetime-local"!==b.type&&(D||k)&&i&&!c.has(d)){const I=V(d,b,D,k,n,m,_,o);c.set(d,I)}}});return function(K){return v.apply(this,arguments)}}();S&&(()=>{let e=!0,t=!1;const s=document;(0,y.a)(s,"ionScrollStart",()=>{t=!0}),s.addEventListener("focusin",()=>{e=!0},!0),s.addEventListener("touchend",i=>{if(t)return void(t=!1);const a=s.activeElement;if(!a||a.matches(C))return;const S=i.target;S!==a&&(S.matches(C)||S.closest(C)||(e=!1,setTimeout(()=>{e||a.blur()},50)))},!1)})();for(const v of u)h(v);l.d.addEventListener("ionInputDidLoad",v=>{h(v.detail)}),l.d.addEventListener("ionInputDidUnload",v=>{(v=>{if(a){const d=f.get(v);d&&d(),f.delete(v)}if(i){const d=c.get(v);d&&d(),c.delete(v)}})(v.detail)})});return function(s,r){return e.apply(this,arguments)}}()}}]);