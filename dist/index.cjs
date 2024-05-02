"use strict";var E=Object.defineProperty;var J=(s,e,t)=>e in s?E(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var f=(s,e,t)=>(J(s,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var R=function(){function s(){var e=this;this.resolve=function(t){e._resolve(t)},this.reject=function(t){e._reject(t)},this._promise=new Promise(function(t,r){e._resolve=t,e._reject=r})}return Object.defineProperty(s.prototype,"promise",{get:function(){return this._promise},enumerable:!0,configurable:!0}),s}(),g=R,D=function(s){return s._tag==="Left"},z=function(s){return{_tag:"Left",left:s}},W=function(s){return{_tag:"Right",right:s}},F=z,U=W,$=D,O=function(s,e){return function(t){return $(t)?s(t.left):e(t.right)}},j=O,L=j;class l{constructor(e){f(this,"_after",null);this._after=e}get after(){return this._after==null?null:this._after()}static Seq(e,t){return new l(()=>{let r=e==null?void 0:e.after;return r!=null?new Promise(n=>r.then(i=>l.Seq(i,t)).then(n)):t==null?void 0:t.after})}seq(e){return l.Par(this,e)}par(e){return l.Par(this,e)}submit(){return l.Submit(this)}static Submit(e){let t=new g;if(e!=null){const r=e.after;r!=null?r.then(n=>{n!=null?l.Submit(n).then(i=>t.resolve(i),i=>t.reject(i)):t.resolve(null)}):t.resolve(null)}else t.resolve(null);return t.promise}static Par(e,t){let r=e.after??Promise.resolve(l.Unit()),n=t.after??Promise.resolve(l.Unit()),i=Promise.all([r,n]);return l.Pure(i.then(([a,o])=>a!=null&&o!=null?l.Par(a,o):a??o))}static Unit(){return new l(null)}static Pure(e){return new l(()=>e)}}class w{constructor(e){f(this,"_apply");this._apply=e}apply(e){return this._apply(e)}}class Z extends w{}class M extends Z{}class v extends M{flat_fold(e,t){return new v(r=>this.apply(new w(n=>{let a=n.then(c=>j(e,t)(c)).then(c=>c.apply(r));return new l(()=>a)})))}handler(e,t){return j(r=>e(r),r=>{if(t)t(r);else throw t})}zip(e){return v.Zip(this,e)}static Zip(e,t){return new v(r=>{var n=null,i=null;let a=e.apply(new w(c=>(n=c,l.Unit())));var o=t.apply(new w(c=>(i=c,l.Unit())));return a.par(o).seq(new l(()=>{let c=n,S=i,q=c.then(y=>S.then(m=>({fst:y,snd:m}))).then(y=>L(m=>L(b=>F([m,b]),b=>U(b))(y.snd),m=>U(m))(y.fst)),B=r.apply(q);return new Promise(y=>y(B))}))})}}class p extends M{receive(e){return e.apply(new w(t=>this.apply(new w(r=>{let n=t.then(i=>{r.resolve(i)});return new l(()=>n.then(i=>l.Unit()))}))))}static later(e){return new v(t=>t.apply(e))}static issue(e){return new v(function(t){let r=new Promise(n=>{n(e)});return t.apply(r)})}static value(e){return p.issue(F(e))}static error(e){return p.issue(U(e))}static Pure(e){return new p(t=>t.apply(e))}}class P{constructor(e){f(this,"_apply");this._apply=e}defer(e,t){return t.receive(p.value(this._apply(e)))}}class x{constructor(e){f(this,"_defer");this._defer=e}defer(e,t){return this._defer(e,t)}}function d(s,e){return new v(t=>{let r=new g,n=s.defer(e,new p(a=>a.apply(r))),i=t.apply(r.promise);return l.Seq(n,i)})}function k(s,e){let t=new g;return s.defer(e,p.Pure(t)).submit().then(()=>t.promise.then(i=>i))}function N(){return new P(s=>null)}class G{constructor(e){f(this,"_emiter");this._emiter=e}defer(e,t){let r=new g,n=this,i={handleEvent:function(a){r.resolve(F(a)),n._emiter.removeEventListener(e,i)}};return this._emiter.addEventListener(e,i),t.receive(p.later(r.promise))}}class H{constructor(e,t){f(this,"lhs");f(this,"rhs");this.lhs=e,this.rhs=t}defer(e,t){var r=d(this.lhs,e);return t.receive(r.flat_fold(n=>d(this.rhs,n),n=>p.error(n)))}}class T extends P{constructor(){super(e=>e)}}class u{constructor(e){f(this,"_apply");this._apply=e}apply(e){return this._apply(e)}next(e){return new u(t=>{let r=this.apply(t);return e.apply(r)})}static Make(e){return new u(e)}static Unit(){return new u(e=>e)}static Pure(e){return new u(t=>e)}static Then(e){return new u(t=>new H(t,e))}then(e){return this.next(u.Then(e))}static Pair(e){return new u(t=>new x((r,n)=>{let[i,a]=r,o=d(t,i),c=d(e,a);return n.receive(o.zip(c))}))}pair(e){return this.next(u.Pair(e))}static Split(e){return new u(t=>new x((r,n)=>u.Pair(e).apply(t).defer([r,r],n)))}split(e){return this.next(u.Split(e))}static FlatMap(e){return new u(t=>new x((r,n)=>n.receive(d(t,r).flat_fold(i=>d(e(i),r),i=>p.error(i)))))}flat_map(e){return this.next(u.FlatMap(e))}static First(){return new u(e=>{let t=u.Pure(new P(n=>n));return u.Pair(t.apply(e)).apply(e)})}first(){return this.next(u.First())}static Second(){return new u(e=>{let t=u.Pure(new P(n=>n));return u.Pair(e).apply(t.apply(e))})}second(){return this.next(u.Second())}static Pinch(e){return new u(t=>new x((r,n)=>n.receive(d(t,r).zip(d(e,r)))))}pinch(e){return this.next(u.Pinch(e))}static Joint(e){return new u(t=>u.Then(u.Pure(u.Split(e).apply(new T)).apply(new T)).apply(t))}joint(e){return this.next(u.Joint(e))}static Bound(e){return new u(t=>{let r=new T,n=u.Then(e),i=u.Joint(t).apply(r);return n.apply(i)})}bound(e){return this.next(u.Bound(e))}static Broach(){return new u(e=>{let t=new P(r=>r);return u.Bound(t).apply(e)})}broach(){return this.next(u.Broach())}resolve(e){return k(this.apply(N()),e)}static Compose(e,t){return t.next(e)}compose(e){return u.Compose(this,e)}}function I(s){function e(t){switch(typeof t){case"function":return t(e);default:s(t)}}return e}class h{static Terminal(){return new p(e=>e.apply(new g))}static Arrow(){return u}static Fun1R(e){return new P(e)}static Pure(e){return h.Fun1R(t=>e)}static Anon(e){return new x(e)}static Resolve(e,t){return k(e,t)}static Forward(e,t){return d(e,t)}static Event(e){return new G(e)}static Then(e){return h.Arrow().Then(e)}static Pair(e){return h.Arrow().Pair(e)}static FlatMap(e){return h.Arrow().FlatMap(e)}static First(){return h.Arrow().First()}static Second(){return h.Arrow().Second()}static Pinch(e){return h.Arrow().Pinch(e)}static Joint(e){return h.Arrow().Joint(e)}static Next(e,t){return e.next(t)}static React(e,t){}}exports.Fletcher=h;exports.useReducerWithThunk=I;
