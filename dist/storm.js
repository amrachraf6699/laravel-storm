// @__NO_SIDE_EFFECTS__
function rd(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const r of t.split(",")) e[r] = 1;
  return (r) => r in e;
}
const Ut = {}, Ui = [], Zr = () => {
}, x_ = () => !1, sf = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), lf = (t) => t.startsWith("onUpdate:"), le = Object.assign, nd = (t, e) => {
  const r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}, Xw = Object.prototype.hasOwnProperty, It = (t, e) => Xw.call(t, e), ct = Array.isArray, Jn = (t) => Rs(t) === "[object Map]", In = (t) => Rs(t) === "[object Set]", Yp = (t) => Rs(t) === "[object Date]", wt = (t) => typeof t == "function", te = (t) => typeof t == "string", an = (t) => typeof t == "symbol", Ft = (t) => t !== null && typeof t == "object", C_ = (t) => (Ft(t) || wt(t)) && wt(t.then) && wt(t.catch), D_ = Object.prototype.toString, Rs = (t) => D_.call(t), Kw = (t) => Rs(t).slice(8, -1), M_ = (t) => Rs(t) === "[object Object]", id = (t) => te(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Fo = /* @__PURE__ */ rd(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), uf = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return ((r) => e[r] || (e[r] = t(r)));
}, qw = /-\w/g, wr = /* @__PURE__ */ uf((t) => t.replace(qw, (e) => e.slice(1).toUpperCase())), Zw = /\B([A-Z])/g, ci = /* @__PURE__ */ uf(
  (t) => t.replace(Zw, "-$1").toLowerCase()
), A_ = /* @__PURE__ */ uf((t) => t.charAt(0).toUpperCase() + t.slice(1)), $f = /* @__PURE__ */ uf((t) => t ? `on${A_(t)}` : ""), Yr = (t, e) => !Object.is(t, e), Xl = (t, ...e) => {
  for (let r = 0; r < t.length; r++)
    t[r](...e);
}, I_ = (t, e, r, n = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, Os = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let $p;
const ff = () => $p || ($p = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ad(t) {
  if (ct(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const n = t[r], i = te(n) ? tx(n) : ad(n);
      if (i)
        for (const a in i)
          e[a] = i[a];
    }
    return e;
  } else if (te(t) || Ft(t))
    return t;
}
const jw = /;(?![^(]*\))/g, Jw = /:([^]+)/, Qw = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function tx(t) {
  const e = {};
  return t.replace(Qw, (r) => r.startsWith("/*") ? "" : r).split(jw).forEach((r) => {
    if (r) {
      const n = r.split(Jw);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function br(t) {
  let e = "";
  if (te(t))
    e = t;
  else if (ct(t))
    for (let r = 0; r < t.length; r++) {
      const n = br(t[r]);
      n && (e += n + " ");
    }
  else if (Ft(t))
    for (const r in t)
      t[r] && (e += r + " ");
  return e.trim();
}
const ex = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", rx = /* @__PURE__ */ rd(ex);
function L_(t) {
  return !!t || t === "";
}
function nx(t, e, r) {
  if (t.length !== e.length) return !1;
  let n = !0;
  for (let i = 0; n && i < t.length; i++)
    n = Ln(t[i], e[i], r);
  return n;
}
function Xp(t, e, r) {
  if (t.size !== e.size) return !1;
  const n = Array.from(e), i = new Uint8Array(n.length);
  for (const a of t) {
    let o = -1;
    for (let s = 0; s < n.length; s++)
      if (!i[s] && Ln(a, n[s], r)) {
        o = s;
        break;
      }
    if (o < 0) return !1;
    i[o] = 1;
  }
  return !0;
}
function ix(t, e, r) {
  let n = Jn(t), i = Jn(e);
  if (n || i || (n = In(t), i = In(e), n || i))
    return n && i ? Xp(t, e, r) : !1;
  const a = Object.keys(t).length, o = Object.keys(e).length;
  if (a !== o)
    return !1;
  for (const s in t) {
    const l = t.hasOwnProperty(s), u = e.hasOwnProperty(s);
    if (l && !u || !l && u || !Ln(t[s], e[s], r))
      return !1;
  }
  return String(t) === String(e);
}
function Kp(t, e, r, n) {
  r || (r = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, a] = r;
  if (i.has(t) || a.has(e))
    return i.get(t) === e && a.get(e) === t;
  i.set(t, e), a.set(e, t);
  const o = n(t, e, r);
  return i.delete(t), a.delete(e), o;
}
function Ln(t, e, r) {
  if (t === e) return !0;
  let n = Yp(t), i = Yp(e);
  return n || i ? n && i ? t.getTime() === e.getTime() : !1 : (n = an(t), i = an(e), n || i ? t === e : (n = ct(t), i = ct(e), n || i ? n && i ? Kp(t, e, r, nx) : !1 : (n = Ft(t), i = Ft(e), n || i ? !n || !i ? !1 : Kp(t, e, r, ix) : String(t) === String(e))));
}
function od(t, e) {
  return t.findIndex((r) => Ln(r, e));
}
const E_ = (t) => !!(t && t.__v_isRef === !0), st = (t) => te(t) ? t : t == null ? "" : ct(t) || Ft(t) && (t.toString === D_ || !wt(t.toString)) ? E_(t) ? st(t.value) : JSON.stringify(t, P_, 2) : String(t), P_ = (t, e) => E_(e) ? P_(t, e.value) : Jn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (r, [n, i], a) => (r[Xf(n, a) + " =>"] = i, r),
    {}
  )
} : In(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((r) => Xf(r))
} : an(e) ? Xf(e) : Ft(e) && !ct(e) && !M_(e) ? String(e) : e, Xf = (t, e = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    an(t) ? `Symbol(${(r = t.description) != null ? r : e})` : t
  );
};
let ve;
class ax {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ve && (ve.active ? (this.parent = ve, this.index = (ve.scopes || (ve.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, r;
      if (this.scopes) {
        const n = this.scopes.slice();
        for (e = 0, r = n.length; e < r; e++)
          n[e].pause();
      }
      for (e = 0, r = this.effects.length; e < r; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, r;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (e = 0, r = i.length; e < r; e++)
          i[e].resume();
      }
      const n = this.effects.slice();
      for (e = 0, r = n.length; e < r; e++)
        n[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const r = ve;
      try {
        return ve = this, e();
      } finally {
        ve = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ve, ve = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ve === this)
        ve = this.prevScope;
      else {
        let e = ve;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++)
        this.effects[r].stop();
      for (this.effects.length = 0, r = 0, n = this.cleanups.length; r < n; r++)
        this.cleanups[r]();
      if (this.cleanups.length = 0, this.scopes) {
        const i = this.scopes.slice();
        for (r = 0, n = i.length; r < n; r++)
          i[r].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ox() {
  return ve;
}
let $t;
const Kf = /* @__PURE__ */ new WeakSet();
class R_ {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ve && (ve.active ? ve.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Kf.has(this) && (Kf.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || k_(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, qp(this), B_(this);
    const e = $t, r = xr;
    $t = this, xr = !0;
    try {
      return this.fn();
    } finally {
      N_(this), $t = e, xr = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        ud(e);
      this.deps = this.depsTail = void 0, qp(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Kf.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ah(this) && this.run();
  }
  get dirty() {
    return Ah(this);
  }
}
let O_ = 0, Ho, zo;
function k_(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = zo, zo = t;
    return;
  }
  t.next = Ho, Ho = t;
}
function sd() {
  O_++;
}
function ld() {
  if (--O_ > 0)
    return;
  if (zo) {
    let e = zo;
    for (zo = void 0; e; ) {
      const r = e.next;
      e.next = void 0, e.flags &= -9, e = r;
    }
  }
  let t;
  for (; Ho; ) {
    let e = Ho;
    for (Ho = void 0; e; ) {
      const r = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (n) {
          t || (t = n);
        }
      e = r;
    }
  }
  if (t) throw t;
}
function B_(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function N_(t) {
  let e, r = t.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), ud(n), sx(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  t.deps = e, t.depsTail = r;
}
function Ah(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (F_(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function F_(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === ss) || (t.globalVersion = ss, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ah(t))))
    return;
  t.flags |= 2;
  const e = t.dep, r = $t, n = xr;
  $t = t, xr = !0;
  try {
    B_(t);
    const i = t.fn(t._value);
    (e.version === 0 || Yr(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    $t = r, xr = n, N_(t), t.flags &= -3;
  }
}
function ud(t, e = !1) {
  const { dep: r, prevSub: n, nextSub: i } = t;
  if (n && (n.nextSub = i, t.prevSub = void 0), i && (i.prevSub = n, t.nextSub = void 0), r.subs === t && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let a = r.computed.deps; a; a = a.nextDep)
      ud(a, !0);
  }
  !e && !--r.sc && r.map && r.map.delete(r.key);
}
function sx(t) {
  const { prevDep: e, nextDep: r } = t;
  e && (e.nextDep = r, t.prevDep = void 0), r && (r.prevDep = e, t.nextDep = void 0);
}
let xr = !0;
const H_ = [];
function on() {
  H_.push(xr), xr = !1;
}
function sn() {
  const t = H_.pop();
  xr = t === void 0 ? !0 : t;
}
function qp(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const r = $t;
    $t = void 0;
    try {
      e();
    } finally {
      $t = r;
    }
  }
}
let ss = 0;
class lx {
  constructor(e, r) {
    this.sub = e, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class fd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!$t || !xr || $t === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== $t)
      r = this.activeLink = new lx($t, this), $t.deps ? (r.prevDep = $t.depsTail, $t.depsTail.nextDep = r, $t.depsTail = r) : $t.deps = $t.depsTail = r, z_(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = $t.depsTail, r.nextDep = void 0, $t.depsTail.nextDep = r, $t.depsTail = r, $t.deps === r && ($t.deps = n);
    }
    return r;
  }
  trigger(e) {
    this.version++, ss++, this.notify(e);
  }
  notify(e) {
    sd();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      ld();
    }
  }
}
function z_(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let n = e.deps; n; n = n.nextDep)
        z_(n);
    }
    const r = t.dep.subs;
    r !== t && (t.prevSub = r, r && (r.nextSub = t)), t.dep.subs = t;
  }
}
const Ih = /* @__PURE__ */ new WeakMap(), Xi = /* @__PURE__ */ Symbol(
  ""
), Lh = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
);
function Se(t, e, r) {
  if (xr && $t) {
    let n = Ih.get(t);
    n || Ih.set(t, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new fd()), i.map = n, i.key = r), i.track();
  }
}
function Dn(t, e, r, n, i, a) {
  const o = Ih.get(t);
  if (!o) {
    ss++;
    return;
  }
  const s = (l) => {
    l && l.trigger();
  };
  if (sd(), e === "clear")
    o.forEach(s);
  else {
    const l = ct(t), u = l && id(r);
    if (l && r === "length") {
      const f = Number(n);
      o.forEach((c, h) => {
        (h === "length" || h === ls || !an(h) && h >= f) && s(c);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && s(o.get(r)), u && s(o.get(ls)), e) {
        case "add":
          l ? u && s(o.get("length")) : (s(o.get(Xi)), Jn(t) && s(o.get(Lh)));
          break;
        case "delete":
          l || (s(o.get(Xi)), Jn(t) && s(o.get(Lh)));
          break;
        case "set":
          Jn(t) && s(o.get(Xi));
          break;
      }
  }
  ld();
}
function sa(t) {
  const e = /* @__PURE__ */ Et(t);
  return e === t || (Se(e, "iterate", ls), /* @__PURE__ */ vr(t)) ? e : /* @__PURE__ */ ln(t) ? /* @__PURE__ */ Qn(t) ? e.map((r) => ii(gr(r))) : e.map(ii) : e.map(gr);
}
function cf(t) {
  return Se(t = /* @__PURE__ */ Et(t), "iterate", ls), t;
}
function Vr(t, e) {
  return /* @__PURE__ */ ln(t) ? ii(/* @__PURE__ */ Qn(t) ? gr(e) : e) : gr(e);
}
const ux = {
  __proto__: null,
  [Symbol.iterator]() {
    return qf(this, Symbol.iterator, (t) => Vr(this, t));
  },
  concat(...t) {
    return sa(this).concat(
      ...t.map((e) => ct(e) ? sa(e) : e)
    );
  },
  entries() {
    return qf(this, "entries", (t) => (t[1] = Vr(this, t[1]), t));
  },
  every(t, e) {
    return yn(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return yn(
      this,
      "filter",
      t,
      e,
      (r) => r.map((n) => Vr(this, n)),
      arguments
    );
  },
  find(t, e) {
    return yn(
      this,
      "find",
      t,
      e,
      (r) => Vr(this, r),
      arguments
    );
  },
  findIndex(t, e) {
    return yn(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return yn(
      this,
      "findLast",
      t,
      e,
      (r) => Vr(this, r),
      arguments
    );
  },
  findLastIndex(t, e) {
    return yn(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return yn(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Zf(this, "includes", t);
  },
  indexOf(...t) {
    return Zf(this, "indexOf", t);
  },
  join(t) {
    return sa(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return Zf(this, "lastIndexOf", t);
  },
  map(t, e) {
    return yn(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return oo(this, "pop");
  },
  push(...t) {
    return oo(this, "push", t);
  },
  reduce(t, ...e) {
    return jp(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return jp(this, "reduceRight", t, e);
  },
  shift() {
    return oo(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return yn(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return oo(this, "splice", t);
  },
  toReversed() {
    return sa(this).toReversed();
  },
  toSorted(t) {
    return sa(this).toSorted(t);
  },
  toSpliced(...t) {
    return sa(this).toSpliced(...t);
  },
  unshift(...t) {
    return oo(this, "unshift", t);
  },
  values() {
    return qf(this, "values", (t) => Vr(this, t));
  }
};
function qf(t, e, r) {
  const n = cf(t), i = n[e], a = i.call(n);
  if (n !== t && !/* @__PURE__ */ vr(t)) {
    if (a[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(a));
      return o.next = () => Zp(a.next(), r), i !== V_[e] && Object.defineProperties(o, {
        return: {
          get() {
            const s = a.return;
            return typeof s == "function" ? s.bind(a) : s;
          }
        },
        throw: {
          get() {
            const s = a.throw;
            return typeof s == "function" ? s.bind(a) : s;
          }
        }
      }), o;
    }
    a._next = a.next, a.next = () => Zp(a._next(), r);
  }
  return a;
}
function Zp(t, e) {
  return t.done || (t.value = e(t.value)), t;
}
const V_ = Array.prototype;
function yn(t, e, r, n, i, a) {
  const o = cf(t), s = o !== t && !/* @__PURE__ */ vr(t), l = o[e];
  if (l !== V_[e]) {
    const c = l.apply(t, a);
    return s ? gr(c) : c;
  }
  let u = r;
  o !== t && (s ? u = function(c, h) {
    return r.call(this, Vr(t, c), h, t);
  } : r.length > 2 && (u = function(c, h) {
    return r.call(this, c, h, t);
  }));
  const f = l.call(o, u, n);
  return s && i ? i(f) : f;
}
function jp(t, e, r, n) {
  const i = cf(t), a = i !== t && !/* @__PURE__ */ vr(t);
  let o = r, s = !1;
  i !== t && (a ? (s = n.length === 0, o = function(u, f, c) {
    return s && (s = !1, u = Vr(t, u)), r.call(this, u, Vr(t, f), c, t);
  }) : r.length > 3 && (o = function(u, f, c) {
    return r.call(this, u, f, c, t);
  }));
  const l = i[e](o, ...n);
  return s ? Vr(t, l) : l;
}
function Zf(t, e, r) {
  const n = /* @__PURE__ */ Et(t);
  Se(n, "iterate", ls);
  const i = n[e](...r);
  return (i === -1 || i === !1) && /* @__PURE__ */ dd(r[0]) ? (r[0] = /* @__PURE__ */ Et(r[0]), n[e](...r)) : i;
}
function oo(t, e, r = []) {
  on(), sd();
  const n = (/* @__PURE__ */ Et(t))[e].apply(t, r);
  return ld(), sn(), n;
}
const fx = /* @__PURE__ */ rd("__proto__,__v_isRef,__isVue"), U_ = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(an)
);
function cx(t) {
  an(t) || (t = String(t));
  const e = /* @__PURE__ */ Et(this);
  return Se(e, "has", t), e.hasOwnProperty(t);
}
class G_ {
  constructor(e = !1, r = !1) {
    this._isReadonly = e, this._isShallow = r;
  }
  get(e, r, n) {
    if (r === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, a = this._isShallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return a;
    if (r === "__v_raw")
      return n === (i ? a ? bx : X_ : a ? $_ : Y_).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const o = ct(e);
    if (!i) {
      let l;
      if (o && (l = ux[r]))
        return l;
      if (r === "hasOwnProperty")
        return cx;
    }
    const s = Reflect.get(
      e,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Te(e) ? e : n
    );
    if ((an(r) ? U_.has(r) : fx(r)) || (i || Se(e, "get", r), a))
      return s;
    if (/* @__PURE__ */ Te(s)) {
      const l = o && id(r) ? s : s.value;
      return i && Ft(l) ? /* @__PURE__ */ Ph(l) : l;
    }
    return Ft(s) ? i ? /* @__PURE__ */ Ph(s) : /* @__PURE__ */ hd(s) : s;
  }
}
class W_ extends G_ {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, r, n, i) {
    let a = e[r];
    const o = ct(e) && id(r);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ ln(a);
      if (!/* @__PURE__ */ vr(n) && !/* @__PURE__ */ ln(n) && (a = /* @__PURE__ */ Et(a), n = /* @__PURE__ */ Et(n)), !o && /* @__PURE__ */ Te(a) && !/* @__PURE__ */ Te(n))
        return u || (a.value = n), !0;
    }
    const s = o ? Number(r) < e.length : It(e, r), l = Reflect.set(
      e,
      r,
      n,
      /* @__PURE__ */ Te(e) ? e : i
    );
    return e === /* @__PURE__ */ Et(i) && l && (s ? Yr(n, a) && Dn(e, "set", r, n) : Dn(e, "add", r, n)), l;
  }
  deleteProperty(e, r) {
    const n = It(e, r);
    e[r];
    const i = Reflect.deleteProperty(e, r);
    return i && n && Dn(e, "delete", r, void 0), i;
  }
  has(e, r) {
    const n = Reflect.has(e, r);
    return (!an(r) || !U_.has(r)) && Se(e, "has", r), n;
  }
  ownKeys(e) {
    return Se(
      e,
      "iterate",
      ct(e) ? "length" : Xi
    ), Reflect.ownKeys(e);
  }
}
class hx extends G_ {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, r) {
    return !0;
  }
  deleteProperty(e, r) {
    return !0;
  }
}
const vx = /* @__PURE__ */ new W_(), dx = /* @__PURE__ */ new hx(), px = /* @__PURE__ */ new W_(!0);
const Eh = (t) => t, Js = (t) => Reflect.getPrototypeOf(t);
function gx(t, e, r) {
  return function(...n) {
    const i = this.__v_raw, a = /* @__PURE__ */ Et(i), o = Jn(a), s = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, u = i[t](...n), f = r ? Eh : e ? ii : gr;
    return !e && Se(
      a,
      "iterate",
      l ? Lh : Xi
    ), le(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: c, done: h } = u.next();
          return h ? { value: c, done: h } : {
            value: s ? [f(c[0]), f(c[1])] : f(c),
            done: h
          };
        }
      }
    );
  };
}
function Qs(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function mx(t, e) {
  const r = {
    get(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ Et(a), s = /* @__PURE__ */ Et(i);
      t || (Yr(i, s) && Se(o, "get", i), Se(o, "get", s));
      const { has: l } = Js(o), u = e ? Eh : t ? ii : gr;
      if (l.call(o, i))
        return u(a.get(i));
      if (l.call(o, s))
        return u(a.get(s));
      a !== o && a.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && Se(/* @__PURE__ */ Et(i), "iterate", Xi), i.size;
    },
    has(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ Et(a), s = /* @__PURE__ */ Et(i);
      return t || (Yr(i, s) && Se(o, "has", i), Se(o, "has", s)), i === s ? a.has(i) : a.has(i) || a.has(s);
    },
    forEach(i, a) {
      const o = this, s = o.__v_raw, l = /* @__PURE__ */ Et(s), u = e ? Eh : t ? ii : gr;
      return !t && Se(l, "iterate", Xi), s.forEach((f, c) => i.call(a, u(f), u(c), o));
    }
  };
  return le(
    r,
    t ? {
      add: Qs("add"),
      set: Qs("set"),
      delete: Qs("delete"),
      clear: Qs("clear")
    } : {
      add(i) {
        const a = /* @__PURE__ */ Et(this), o = Js(a), s = /* @__PURE__ */ Et(i), l = !e && !/* @__PURE__ */ vr(i) && !/* @__PURE__ */ ln(i) ? s : i;
        return o.has.call(a, l) || Yr(i, l) && o.has.call(a, i) || Yr(s, l) && o.has.call(a, s) || (a.add(l), Dn(a, "add", l, l)), this;
      },
      set(i, a) {
        !e && !/* @__PURE__ */ vr(a) && !/* @__PURE__ */ ln(a) && (a = /* @__PURE__ */ Et(a));
        const o = /* @__PURE__ */ Et(this), { has: s, get: l } = Js(o);
        let u = s.call(o, i);
        u || (i = /* @__PURE__ */ Et(i), u = s.call(o, i));
        const f = l.call(o, i);
        return o.set(i, a), u ? Yr(a, f) && Dn(o, "set", i, a) : Dn(o, "add", i, a), this;
      },
      delete(i) {
        const a = /* @__PURE__ */ Et(this), { has: o, get: s } = Js(a);
        let l = o.call(a, i);
        l || (i = /* @__PURE__ */ Et(i), l = o.call(a, i)), s && s.call(a, i);
        const u = a.delete(i);
        return l && Dn(a, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Et(this), a = i.size !== 0, o = i.clear();
        return a && Dn(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    r[i] = gx(i, t, e);
  }), r;
}
function cd(t, e) {
  const r = mx(t, e);
  return (n, i, a) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_isShallow" ? e : i === "__v_raw" ? n : Reflect.get(
    It(r, i) && i in n ? r : n,
    i,
    a
  );
}
const yx = {
  get: /* @__PURE__ */ cd(!1, !1)
}, _x = {
  get: /* @__PURE__ */ cd(!1, !0)
}, Sx = {
  get: /* @__PURE__ */ cd(!0, !1)
};
const Y_ = /* @__PURE__ */ new WeakMap(), $_ = /* @__PURE__ */ new WeakMap(), X_ = /* @__PURE__ */ new WeakMap(), bx = /* @__PURE__ */ new WeakMap();
function Tx(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function hd(t) {
  return /* @__PURE__ */ ln(t) ? t : vd(
    t,
    !1,
    vx,
    yx,
    Y_
  );
}
// @__NO_SIDE_EFFECTS__
function xx(t) {
  return vd(
    t,
    !1,
    px,
    _x,
    $_
  );
}
// @__NO_SIDE_EFFECTS__
function Ph(t) {
  return vd(
    t,
    !0,
    dx,
    Sx,
    X_
  );
}
function vd(t, e, r, n, i) {
  if (!Ft(t) || t.__v_raw && !(e && t.__v_isReactive) || t.__v_skip || !Object.isExtensible(t))
    return t;
  const a = i.get(t);
  if (a)
    return a;
  const o = Tx(Kw(t));
  if (o === 0)
    return t;
  const s = new Proxy(
    t,
    o === 2 ? n : r
  );
  return i.set(t, s), s;
}
// @__NO_SIDE_EFFECTS__
function Qn(t) {
  return /* @__PURE__ */ ln(t) ? /* @__PURE__ */ Qn(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ln(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function vr(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function dd(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Et(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ Et(e) : t;
}
function Cx(t) {
  return !It(t, "__v_skip") && Object.isExtensible(t) && I_(t, "__v_skip", !0), t;
}
const gr = (t) => Ft(t) ? /* @__PURE__ */ hd(t) : t, ii = (t) => Ft(t) ? /* @__PURE__ */ Ph(t) : t;
// @__NO_SIDE_EFFECTS__
function Te(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(t) {
  return Dx(t, !1);
}
function Dx(t, e) {
  return /* @__PURE__ */ Te(t) ? t : new Mx(t, e);
}
class Mx {
  constructor(e, r) {
    this.dep = new fd(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? e : /* @__PURE__ */ Et(e), this._value = r ? e : gr(e), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const r = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ vr(e) || /* @__PURE__ */ ln(e);
    e = n ? e : /* @__PURE__ */ Et(e), Yr(e, r) && (this._rawValue = e, this._value = n ? e : gr(e), this.dep.trigger());
  }
}
function Vo(t) {
  return /* @__PURE__ */ Te(t) ? t.value : t;
}
const Ax = {
  get: (t, e, r) => e === "__v_raw" ? t : Vo(Reflect.get(t, e, r)),
  set: (t, e, r, n) => {
    const i = t[e];
    return /* @__PURE__ */ Te(i) && !/* @__PURE__ */ Te(r) ? (i.value = r, !0) : Reflect.set(t, e, r, n);
  }
};
function K_(t) {
  return /* @__PURE__ */ Qn(t) ? t : new Proxy(t, Ax);
}
class Ix {
  constructor(e, r, n) {
    this.fn = e, this.setter = r, this._value = void 0, this.dep = new fd(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ss - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    $t !== this)
      return k_(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return F_(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
// @__NO_SIDE_EFFECTS__
function Lx(t, e, r = !1) {
  let n, i;
  return wt(t) ? n = t : (n = t.get, i = t.set), new Ix(n, i, r);
}
const tl = {}, pu = /* @__PURE__ */ new WeakMap();
let Hi;
function Ex(t, e = !1, r = Hi) {
  if (r) {
    let n = pu.get(r);
    n || pu.set(r, n = []), n.push(t);
  }
}
function Px(t, e, r = Ut) {
  const { immediate: n, deep: i, once: a, scheduler: o, augmentJob: s, call: l } = r, u = (S) => i ? S : /* @__PURE__ */ vr(S) || i === !1 || i === 0 ? Mn(S, 1) : Mn(S);
  let f, c, h, v, d = !1, p = !1;
  if (/* @__PURE__ */ Te(t) ? (c = () => t.value, d = /* @__PURE__ */ vr(t)) : /* @__PURE__ */ Qn(t) ? (c = () => u(t), d = !0) : ct(t) ? (p = !0, d = t.some((S) => /* @__PURE__ */ Qn(S) || /* @__PURE__ */ vr(S)), c = () => t.map((S) => {
    if (/* @__PURE__ */ Te(S))
      return S.value;
    if (/* @__PURE__ */ Qn(S))
      return u(S);
    if (wt(S))
      return l ? l(S, 2) : S();
  })) : wt(t) ? e ? c = l ? () => l(t, 2) : t : c = () => {
    if (h) {
      on();
      try {
        h();
      } finally {
        sn();
      }
    }
    const S = Hi;
    Hi = f;
    try {
      return l ? l(t, 3, [v]) : t(v);
    } finally {
      Hi = S;
    }
  } : c = Zr, e && i) {
    const S = c, b = i === !0 ? 1 / 0 : i;
    c = () => Mn(S(), b);
  }
  const m = ox(), g = () => {
    f.stop(), m && m.active && nd(m.effects, f);
  };
  if (a && e) {
    const S = e;
    e = (...b) => {
      try {
        return S(...b);
      } finally {
        g();
      }
    };
  }
  let y = p ? new Array(t.length).fill(tl) : tl;
  const _ = (S) => {
    if (!(!(f.flags & 1) || !f.dirty && !S))
      if (e) {
        const b = f.run();
        if (S || i || d || (p ? b.some((T, C) => Yr(T, y[C])) : Yr(b, y))) {
          const T = Hi;
          on();
          try {
            h && h(), Hi = f;
            const C = [
              b,
              // pass undefined as the old value when it's changed for the first time
              y === tl ? void 0 : p && y[0] === tl ? [] : y,
              v
            ];
            y = b, l ? l(e, 3, C) : (
              // @ts-expect-error
              e(...C)
            );
          } finally {
            Hi = T, sn();
          }
        }
      } else
        f.run();
  };
  return s && s(_), f = new R_(c), f.scheduler = o ? () => o(_, !1) : _, v = (S) => Ex(S, !1, f), h = f.onStop = () => {
    const S = pu.get(f);
    if (S) {
      if (l)
        l(S, 4);
      else
        for (const b of S) b();
      pu.delete(f);
    }
  }, e ? n ? _(!0) : y = f.run() : o ? o(_.bind(null, !0), !0) : f.run(), g.pause = f.pause.bind(f), g.resume = f.resume.bind(f), g.stop = g, g;
}
function Mn(t, e = 1 / 0, r) {
  if (e <= 0 || !Ft(t) || t.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(t) || 0) >= e))
    return t;
  if (r.set(t, e), e--, /* @__PURE__ */ Te(t))
    Mn(t.value, e, r);
  else if (ct(t))
    for (let n = 0; n < t.length; n++)
      Mn(t[n], e, r);
  else if (In(t) || Jn(t))
    t.forEach((n) => {
      Mn(n, e, r);
    });
  else if (M_(t)) {
    for (const n in t)
      Mn(t[n], e, r);
    for (const n of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, n) && Mn(t[n], e, r);
  }
  return t;
}
function ks(t, e, r, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    hf(i, e, r);
  }
}
function Dr(t, e, r, n) {
  if (wt(t)) {
    const i = ks(t, e, r, n);
    return i && C_(i) && i.catch((a) => {
      hf(a, e, r, void 0, !0);
    }), i;
  }
  if (ct(t)) {
    const i = [];
    for (let a = 0; a < t.length; a++)
      i.push(Dr(t[a], e, r, n));
    return i;
  }
}
function hf(t, e, r, n = !0, i = !1) {
  const a = e ? e.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = e && e.appContext.config || Ut;
  if (e) {
    let l = e.parent;
    const u = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; l; ) {
      const c = l.ec;
      if (c && !l.isUnmounted && // Async failures may outlive stopped scopes whose unmount effects
      // are deferred or discarded by Suspense.
      (!i || l.scope.active)) {
        for (let h = 0; h < c.length; h++)
          if (c[h](t, u, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      on(), ks(o, null, 10, [
        t,
        u,
        f
      ]), sn();
      return;
    }
  }
  Rx(t, r, a, n, s);
}
function Rx(t, e, r, n = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const Ie = [];
let Tr = -1;
const Ur = [];
let Xn = null, xa = 0;
const q_ = /* @__PURE__ */ Promise.resolve();
let gu = null;
function pd(t) {
  const e = gu || q_;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ox(t) {
  let e = Tr + 1, r = Ie.length;
  for (; e < r; ) {
    const n = e + r >>> 1, i = Ie[n], a = us(i);
    a < t || a === t && i.flags & 2 ? e = n + 1 : r = n;
  }
  return e;
}
function gd(t) {
  if (!(t.flags & 1)) {
    const e = us(t), r = Ie[Ie.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= us(r) ? Ie.push(t) : Ie.splice(Ox(e), 0, t), t.flags |= 1, Z_();
  }
}
function Z_() {
  gu || (gu = q_.then(Q_));
}
function kx(t) {
  if (!ct(t))
    Xn && t.id === -1 ? Xn.splice(xa + 1, 0, t) : t.flags & 1 || (Ur.push(t), t.flags |= 1);
  else
    for (let e = 0; e < t.length; e++)
      Ur.push(t[e]);
  Z_();
}
function j_(t, e, r, n = Tr + 1) {
  for (; n < Ie.length; n++) {
    const i = Ie[n];
    if (i && i.flags & 2) {
      if (t && i.id !== t.uid || e !== void 0 && !(i.id >= e))
        continue;
      Ie.splice(n, 1), n = t ? n - 1 : Tr, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function J_(t, e, r = 0) {
  if (Ur.length) {
    let n = Ur, i = 0;
    if (e) {
      n = [];
      for (let o = 0; o < Ur.length; o++) {
        const s = Ur[o];
        (s.i !== void 0 ? !s.i || s.i.uid < r : e.has(s)) ? Ur[i++] = s : n.push(s);
      }
    }
    const a = [...new Set(n)].sort((o, s) => us(o) - us(s));
    if (Ur.length = i, Xn) {
      for (let o = 0; o < a.length; o++)
        Xn.push(a[o]);
      return;
    }
    for (Xn = a, xa = 0; xa < Xn.length; xa++) {
      const o = Xn[xa];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    Xn = null, xa = 0;
  }
}
let jf = !1;
function Bx(t, e) {
  if (jf) {
    t();
    return;
  }
  const r = e === void 0 ? void 0 : new Set(Ur);
  t(), jf = !0;
  try {
    j_(void 0, e), J_(void 0, r, e);
  } finally {
    jf = !1;
  }
}
const us = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function Q_(t) {
  try {
    for (Tr = 0; Tr < Ie.length; Tr++) {
      const e = Ie[Tr];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), ks(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Tr < Ie.length; Tr++) {
      const e = Ie[Tr];
      e && (e.flags &= -2);
    }
    Tr = -1, Ie.length = 0, J_(), gu = null, (Ie.length || Ur.length) && Q_();
  }
}
let hr = null, t1 = null;
function mu(t) {
  const e = hr;
  return hr = t, t1 = t && t.type.__scopeId || null, e;
}
function Nx(t, e = hr, r) {
  if (!e || t._n)
    return t;
  const n = (...i) => {
    n._d && lg(-1);
    const a = mu(e), o = qi.length;
    let s;
    try {
      s = t(...i);
    } finally {
      for (let l = qi.length; l > o; l--) w1();
      mu(a), n._d && lg(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Ce(t, e) {
  if (hr === null)
    return t;
  const r = yf(hr), n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [a, o, s, l = Ut] = e[i];
    a && (wt(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && Mn(o), n.push({
      dir: a,
      instance: r,
      value: o,
      oldValue: void 0,
      arg: s,
      modifiers: l
    }));
  }
  return t;
}
function vi(t, e, r, n) {
  let i = t;
  if (n === "beforeMount")
    t._mount = t;
  else if (n === "beforeUpdate") {
    const s = e && e._mount;
    s && (s._latest = t, t._mount = s);
  } else if (n === "mounted") {
    const s = t._latest;
    t._mount = t._latest = void 0, s && (i = s, s._mount = void 0);
  }
  const a = i.dirs, o = e && e.dirs;
  for (let s = 0; s < a.length; s++) {
    let l = a[s];
    o ? l.oldValue = o[s].value : n === "mounted" && l.oldValue !== void 0 && (l = le({}, l, { oldValue: void 0 }));
    let u = l.dir[n];
    u && (on(), Dr(u, r, 8, [
      t.el,
      l,
      i,
      e
    ]), sn());
  }
}
function Fx(t, e) {
  if (Le) {
    let r = Le.provides;
    const n = Le.parent && Le.parent.provides;
    n === r && (r = Le.provides = Object.create(n)), r[t] = e;
  }
}
function Kl(t, e, r = !1) {
  const n = BC();
  if (n || Oa) {
    let i = Oa ? Oa._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return r && wt(e) ? e.call(n && n.proxy) : e;
  }
}
const Hx = /* @__PURE__ */ Symbol.for("v-scx"), zx = () => Kl(Hx);
function Ki(t, e, r) {
  return e1(t, e, r);
}
function e1(t, e, r = Ut) {
  const { immediate: n, deep: i, flush: a, once: o } = r, s = le({}, r), l = e && n || !e && a !== "post";
  let u;
  if (vs) {
    if (a === "sync") {
      const v = zx();
      u = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!l) {
      const v = () => {
      };
      return v.stop = Zr, v.resume = Zr, v.pause = Zr, v;
    }
  }
  const f = Le;
  s.call = (v, d, p) => Dr(v, f, d, p);
  let c = !1;
  a === "post" ? s.scheduler = (v) => {
    v.i = f, Me(v, f && f.suspense);
  } : a !== "sync" && (c = !0, s.scheduler = (v, d) => {
    d ? v() : gd(v);
  }), s.augmentJob = (v) => {
    e && (v.flags |= 4), c && (v.flags |= 2, f && (v.id = f.uid, v.i = f));
  };
  const h = Px(t, e, s);
  return vs && (u ? u.push(h) : l && h()), h;
}
function Vx(t, e, r) {
  const n = this.proxy, i = te(t) ? t.includes(".") ? r1(n, t) : () => n[t] : t.bind(n, n);
  let a;
  wt(e) ? a = e : (a = e.handler, r = e);
  const o = Bs(this), s = e1(i, a.bind(n), r);
  return o(), s;
}
function r1(t, e) {
  const r = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < r.length && n; i++)
      n = n[r[i]];
    return n;
  };
}
const Ux = /* @__PURE__ */ Symbol("_vte"), vf = (t) => t.__isTeleport, Jf = /* @__PURE__ */ Symbol("_leaveCb");
function Gx(t) {
  let e = t[0];
  if (t.length > 1) {
    for (const r of t)
      if (r.type !== Mr) {
        e = r;
        break;
      }
  }
  return e;
}
function n1(t) {
  if (!yd(t))
    return vf(t.type) && t.children ? Gx(t.children) : t;
  if (t.component)
    return t.component.subTree;
  const { shapeFlag: e, children: r } = t;
  if (r) {
    if (e & 16)
      return r[0];
    if (e & 32 && wt(r.default))
      return r.default();
  }
}
function Uo(t, e) {
  if (t.shapeFlag & 6 && t.component) {
    t.transition = e;
    const r = t.component.subTree;
    Uo(
      vf(r.type) && n1(r) || r,
      e
    );
  } else if (t.shapeFlag & 128) {
    const r = t.suspense;
    if (r) {
      const n = r.isHydrating ? r.pendingBranch : r.activeBranch;
      n && Uo(n, e.clone(n));
    } else
      t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback);
  } else if (t.transition = e, t.type === Ot && ct(t.children)) {
    const r = f1(t.children, !1);
    r && Uo(r, e);
  }
}
function Rh(t) {
  if (t.component)
    return Rh(t.component.subTree);
  if (t.type === Ot) {
    const e = ct(t.children) && f1(t.children, !1);
    return e ? Rh(e) : void 0;
  }
  if (t.type !== Mr)
    return t;
}
// @__NO_SIDE_EFFECTS__
function md(t, e) {
  return wt(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    le({ name: t.name }, e, { setup: t })
  ) : t;
}
function i1(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Jp(t, e) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(t, e)) && !r.configurable);
}
const yu = /* @__PURE__ */ new WeakMap();
function Go(t, e, r, n, i = !1) {
  if (ct(t)) {
    t.forEach(
      (p, m) => Go(
        p,
        e && (ct(e) ? e[m] : e),
        r,
        n,
        i
      )
    );
    return;
  }
  if (Wo(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Go(t, e, r, n.component.subTree);
    return;
  }
  const a = n.shapeFlag & 4 ? yf(n.component) : n.el, o = i ? null : a, { i: s, r: l } = t, u = e && e.r, f = s.refs === Ut ? s.refs = {} : s.refs, c = s.setupState, h = /* @__PURE__ */ Et(c), v = c === Ut ? x_ : (p) => Jp(f, p) ? !1 : It(h, p), d = (p, m) => !(m && Jp(f, m));
  if (u != null && u !== l) {
    if (Qp(e), te(u))
      f[u] = null, v(u) && (c[u] = null);
    else if (/* @__PURE__ */ Te(u)) {
      const p = e;
      d(u, p.k) && (u.value = null), p.k && (f[p.k] = null);
    }
  }
  if (wt(l))
    ks(l, s, 12, [o, f]);
  else {
    const p = te(l), m = /* @__PURE__ */ Te(l);
    if (p || m) {
      const g = () => {
        if (t.f) {
          const y = p ? v(l) ? c[l] : f[l] : d() || !t.k ? l.value : f[t.k];
          if (i)
            ct(y) && nd(y, a);
          else if (ct(y))
            y.includes(a) || y.push(a);
          else if (p)
            f[l] = [a], v(l) && (c[l] = f[l]);
          else {
            const _ = [a];
            d(l, t.k) && (l.value = _), t.k && (f[t.k] = _);
          }
        } else p ? (f[l] = o, v(l) && (c[l] = o)) : m && (d(l, t.k) && (l.value = o), t.k && (f[t.k] = o));
      };
      if (o) {
        const y = () => {
          g(), yu.delete(t);
        };
        y.id = -1, yu.set(t, y), Me(y, r);
      } else
        Qp(t), g();
    }
  }
}
function Qp(t) {
  const e = yu.get(t);
  e && (e.flags |= 8, yu.delete(t));
}
ff().requestIdleCallback;
ff().cancelIdleCallback;
const Wo = (t) => !!t.type.__asyncLoader, yd = (t) => t.type.__isKeepAlive;
function Wx(t, e) {
  a1(t, "a", e);
}
function Yx(t, e) {
  a1(t, "da", e);
}
function a1(t, e, r = Le) {
  const n = t.__wdc || (t.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (fs(e, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; )
      yd(i.parent.vnode) && $x(n, e, r, i), i = i.parent;
  }
}
function $x(t, e, r, n) {
  const i = fs(
    e,
    t,
    n,
    !0
    /* prepend */
  ), a = fs(
    "um",
    () => nd(n[e], i),
    r
  );
  a.flags = 16;
}
function fs(t, e, r = Le, n = !1) {
  if (r) {
    const i = r[t] || (r[t] = []), a = e.__weh || (e.__weh = (...o) => {
      on();
      const s = Bs(r), l = Dr(e, r, t, o);
      return s(), sn(), l;
    });
    return n ? i.unshift(a) : i.push(a), a;
  }
}
const On = (t) => (e, r = Le) => {
  (!vs || t === "sp") && fs(t, (...n) => e(...n), r);
}, Xx = On("bm"), df = On("m"), Kx = On(
  "bu"
), qx = On("u"), Zx = On(
  "bum"
), pf = On("um"), jx = On(
  "sp"
), Jx = On("rtg"), Qx = On("rtc");
function tC(t, e = Le) {
  fs("ec", t, e);
}
const eC = /* @__PURE__ */ Symbol.for("v-ndc");
function Je(t, e, r, n) {
  let i;
  const a = r, o = ct(t);
  if (o || te(t)) {
    const s = o && /* @__PURE__ */ Qn(t);
    let l = !1, u = !1;
    s && (l = !/* @__PURE__ */ vr(t), u = /* @__PURE__ */ ln(t), t = cf(t)), i = new Array(t.length);
    for (let f = 0, c = t.length; f < c; f++)
      i[f] = e(
        l ? u ? ii(gr(t[f])) : gr(t[f]) : t[f],
        f,
        void 0,
        a
      );
  } else if (typeof t == "number")
    if (!Number.isInteger(t) || t < 0)
      i = [];
    else {
      i = new Array(t);
      for (let s = 0; s < t; s++)
        i[s] = e(s + 1, s, void 0, a);
    }
  else if (Ft(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (s, l) => e(s, l, void 0, a)
      );
    else {
      const s = Object.keys(t);
      i = new Array(s.length);
      for (let l = 0, u = s.length; l < u; l++) {
        const f = s[l];
        i[l] = e(t[f], f, l, a);
      }
    }
  else
    i = [];
  return i;
}
const Oh = (t) => t ? M1(t) ? yf(t) : Oh(t.parent) : null, Yo = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ le(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Oh(t.parent),
    $root: (t) => Oh(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => s1(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      gd(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = pd.bind(t.proxy)),
    $watch: (t) => Vx.bind(t)
  })
), Qf = (t, e) => t !== Ut && !t.__isScriptSetup && It(t, e), rC = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: r, setupState: n, data: i, props: a, accessCache: o, type: s, appContext: l } = t;
    if (e[0] !== "$") {
      const h = o[e];
      if (h !== void 0)
        switch (h) {
          case 1:
            return n[e];
          case 2:
            return i[e];
          case 4:
            return r[e];
          case 3:
            return a[e];
        }
      else {
        if (Qf(n, e))
          return o[e] = 1, n[e];
        if (i !== Ut && It(i, e))
          return o[e] = 2, i[e];
        if (It(a, e))
          return o[e] = 3, a[e];
        if (r !== Ut && It(r, e))
          return o[e] = 4, r[e];
        kh && (o[e] = 0);
      }
    }
    const u = Yo[e];
    let f, c;
    if (u)
      return e === "$attrs" && Se(t.attrs, "get", ""), u(t);
    if (
      // css module (injected by vue-loader)
      (f = s.__cssModules) && (f = f[e])
    )
      return f;
    if (r !== Ut && It(r, e))
      return o[e] = 4, r[e];
    if (
      // global properties
      c = l.config.globalProperties, It(c, e)
    )
      return c[e];
  },
  set({ _: t }, e, r) {
    const { data: n, setupState: i, ctx: a } = t;
    return Qf(i, e) ? (i[e] = r, !0) : n !== Ut && It(n, e) ? (n[e] = r, !0) : It(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (a[e] = r, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: r, ctx: n, appContext: i, props: a, type: o }
  }, s) {
    let l;
    return !!(r[s] || t !== Ut && s[0] !== "$" && It(t, s) || Qf(e, s) || It(a, s) || It(n, s) || It(Yo, s) || It(i.config.globalProperties, s) || (l = o.__cssModules) && l[s]);
  },
  defineProperty(t, e, r) {
    return r.get != null ? t._.accessCache[e] = 0 : It(r, "value") && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r);
  }
};
function tg(t) {
  return ct(t) ? t.reduce(
    (e, r) => (e[r] = null, e),
    {}
  ) : t;
}
let kh = !0;
function nC(t) {
  const e = s1(t), r = t.proxy, n = t.ctx;
  kh = !1, e.beforeCreate && eg(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: a,
    methods: o,
    watch: s,
    provide: l,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: c,
    mounted: h,
    beforeUpdate: v,
    updated: d,
    activated: p,
    deactivated: m,
    beforeDestroy: g,
    beforeUnmount: y,
    destroyed: _,
    unmounted: S,
    render: b,
    renderTracked: T,
    renderTriggered: C,
    errorCaptured: E,
    serverPrefetch: A,
    // public API
    expose: M,
    inheritAttrs: R,
    // assets
    components: B,
    directives: O,
    filters: F
  } = e;
  if (u && iC(u, n, null), o)
    for (const W in o) {
      const V = o[W];
      wt(V) && (n[W] = V.bind(r));
    }
  if (i) {
    const W = i.call(r, r);
    Ft(W) && (t.data = /* @__PURE__ */ hd(W));
  }
  if (kh = !0, a)
    for (const W in a) {
      const V = a[W], j = wt(V) ? V.bind(r, r) : wt(V.get) ? V.get.bind(r, r) : Zr, rt = !wt(V) && wt(V.set) ? V.set.bind(r) : Zr, tt = zr({
        get: j,
        set: rt
      });
      Object.defineProperty(n, W, {
        enumerable: !0,
        configurable: !0,
        get: () => tt.value,
        set: (it) => tt.value = it
      });
    }
  if (s)
    for (const W in s)
      o1(s[W], n, r, W);
  if (l) {
    const W = wt(l) ? l.call(r) : l;
    Reflect.ownKeys(W).forEach((V) => {
      Fx(V, W[V]);
    });
  }
  f && eg(f, t, "c");
  function H(W, V) {
    ct(V) ? V.forEach((j) => W(j.bind(r))) : V && W(V.bind(r));
  }
  if (H(Xx, c), H(df, h), H(Kx, v), H(qx, d), H(Wx, p), H(Yx, m), H(tC, E), H(Qx, T), H(Jx, C), H(Zx, y), H(pf, S), H(jx, A), ct(M))
    if (M.length) {
      const W = t.exposed || (t.exposed = {});
      M.forEach((V) => {
        Object.defineProperty(W, V, {
          get: () => r[V],
          set: (j) => r[V] = j,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  b && t.render === Zr && (t.render = b), R != null && (t.inheritAttrs = R), B && (t.components = B), O && (t.directives = O), A && i1(t);
}
function iC(t, e, r = Zr) {
  ct(t) && (t = Bh(t));
  for (const n in t) {
    const i = t[n];
    let a;
    Ft(i) ? "default" in i ? a = Kl(
      i.from || n,
      i.default,
      !0
    ) : a = Kl(i.from || n) : a = Kl(i), /* @__PURE__ */ Te(a) ? Object.defineProperty(e, n, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (o) => a.value = o
    }) : e[n] = a;
  }
}
function eg(t, e, r) {
  Dr(
    ct(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy),
    e,
    r
  );
}
function o1(t, e, r, n) {
  let i = n.includes(".") ? r1(r, n) : () => r[n];
  if (te(t)) {
    const a = e[t];
    wt(a) && Ki(i, a);
  } else if (wt(t))
    Ki(i, t.bind(r));
  else if (Ft(t))
    if (ct(t))
      t.forEach((a) => o1(a, e, r, n));
    else {
      const a = wt(t.handler) ? t.handler.bind(r) : e[t.handler];
      wt(a) && Ki(i, a, t);
    }
}
function s1(t) {
  const e = t.type, { mixins: r, extends: n } = e, {
    mixins: i,
    optionsCache: a,
    config: { optionMergeStrategies: o }
  } = t.appContext, s = a.get(e);
  let l;
  return s ? l = s : !i.length && !r && !n ? l = e : (l = {}, i.length && i.forEach(
    (u) => _u(l, u, o, !0)
  ), _u(l, e, o)), Ft(e) && a.set(e, l), l;
}
function _u(t, e, r, n = !1) {
  const { mixins: i, extends: a } = e;
  a && _u(t, a, r, !0), i && i.forEach(
    (o) => _u(t, o, r, !0)
  );
  for (const o in e)
    if (!(n && o === "expose")) {
      const s = aC[o] || r && r[o];
      t[o] = s ? s(t[o], e[o]) : e[o];
    }
  return t;
}
const aC = {
  data: rg,
  props: ng,
  emits: ng,
  // objects
  methods: Io,
  computed: Io,
  // lifecycle
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  // assets
  components: Io,
  directives: Io,
  // watch
  watch: sC,
  // provide / inject
  provide: rg,
  inject: oC
};
function rg(t, e) {
  return e ? t ? function() {
    return le(
      wt(t) ? t.call(this, this) : t,
      wt(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function oC(t, e) {
  return Io(Bh(t), Bh(e));
}
function Bh(t) {
  if (ct(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++)
      e[t[r]] = t[r];
    return e;
  }
  return t;
}
function De(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Io(t, e) {
  return t ? le(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function ng(t, e) {
  return t ? ct(t) && ct(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : le(
    /* @__PURE__ */ Object.create(null),
    tg(t),
    tg(e ?? {})
  ) : e;
}
function sC(t, e) {
  if (!t) return e;
  if (!e) return t;
  const r = le(/* @__PURE__ */ Object.create(null), t);
  for (const n in e)
    r[n] = De(t[n], e[n]);
  return r;
}
function l1() {
  return {
    app: null,
    config: {
      isNativeTag: x_,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let lC = 0;
function uC(t, e) {
  return function(n, i = null) {
    wt(n) || (n = le({}, n)), i != null && !Ft(i) && (i = null);
    const a = l1(), o = /* @__PURE__ */ new WeakSet(), s = [];
    let l = !1;
    const u = a.app = {
      _uid: lC++,
      _component: n,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: UC,
      get config() {
        return a.config;
      },
      set config(f) {
      },
      use(f, ...c) {
        return o.has(f) || (f && wt(f.install) ? (o.add(f), f.install(u, ...c)) : wt(f) && (o.add(f), f(u, ...c))), u;
      },
      mixin(f) {
        return a.mixins.includes(f) || a.mixins.push(f), u;
      },
      component(f, c) {
        return c ? (a.components[f] = c, u) : a.components[f];
      },
      directive(f, c) {
        return c ? (a.directives[f] = c, u) : a.directives[f];
      },
      mount(f, c, h) {
        if (!l) {
          const v = u._ceVNode || Cr(n, i);
          return v.appContext = a, h === !0 ? h = "svg" : h === !1 && (h = void 0), t(v, f, h), l = !0, u._container = f, f.__vue_app__ = u, yf(v.component);
        }
      },
      onUnmount(f) {
        s.push(f);
      },
      unmount() {
        l && (Dr(
          s,
          u._instance,
          16
        ), t(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, c) {
        return a.provides[f] = c, u;
      },
      runWithContext(f) {
        const c = Oa;
        Oa = u;
        try {
          return f();
        } finally {
          Oa = c;
        }
      }
    };
    return u;
  };
}
let Oa = null;
const fC = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${wr(e)}Modifiers`] || t[`${ci(e)}Modifiers`];
function cC(t, e, ...r) {
  if (t.isUnmounted) return;
  const n = t.vnode.props || Ut;
  let i = r;
  const a = e.startsWith("update:"), o = a && fC(n, e.slice(7));
  o && (o.trim && (i = r.map((f) => te(f) ? f.trim() : f)), o.number && (i = i.map(Os)));
  let s, l = n[s = $f(e)] || // also try camelCase event handler (#2249)
  n[s = $f(wr(e))];
  !l && a && (l = n[s = $f(ci(e))]), l && Dr(
    l,
    t,
    6,
    i
  );
  const u = n[s + "Once"];
  if (u) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[s])
      return;
    t.emitted[s] = !0, Dr(
      u,
      t,
      6,
      i
    );
  }
}
const hC = /* @__PURE__ */ new WeakMap();
function u1(t, e, r = !1) {
  const n = r ? hC : e.emitsCache, i = n.get(t);
  if (i !== void 0)
    return i;
  const a = t.emits;
  let o = {}, s = !1;
  if (!wt(t)) {
    const l = (u) => {
      const f = u1(u, e, !0);
      f && (s = !0, le(o, f));
    };
    !r && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  return !a && !s ? (Ft(t) && n.set(t, null), null) : (ct(a) ? a.forEach((l) => o[l] = null) : le(o, a), Ft(t) && n.set(t, o), o);
}
function gf(t, e) {
  return !t || !sf(e) ? !1 : (e = e.slice(2), e = e === "Once" ? e : e.replace(/Once$/, ""), It(t, e[0].toLowerCase() + e.slice(1)) || It(t, ci(e)) || It(t, e));
}
function ig(t) {
  const {
    type: e,
    vnode: r,
    proxy: n,
    withProxy: i,
    propsOptions: [a],
    slots: o,
    attrs: s,
    emit: l,
    render: u,
    renderCache: f,
    props: c,
    data: h,
    setupState: v,
    ctx: d,
    inheritAttrs: p
  } = t, m = mu(t);
  let g, y;
  try {
    if (r.shapeFlag & 4) {
      const S = i || n, b = S;
      g = Gr(
        u.call(
          b,
          S,
          f,
          c,
          v,
          h,
          d
        )
      ), y = s;
    } else {
      const S = e;
      g = Gr(
        S.length > 1 ? S(
          c,
          { attrs: s, slots: o, emit: l }
        ) : S(
          c,
          null
        )
      ), y = e.props ? s : vC(s);
    }
  } catch (S) {
    qi.length = 0, hf(S, t, 1), g = Cr(Mr);
  }
  let _ = g;
  if (y && p !== !1) {
    const S = Object.keys(y), { shapeFlag: b } = _;
    S.length && b & 7 && (a && S.some(lf) && (y = dC(
      y,
      a
    )), _ = Ga(_, y, !1, !0));
  }
  if (r.dirs && (_ = Ga(_, null, !1, !0), _.dirs = _.dirs ? _.dirs.concat(r.dirs) : r.dirs), r.transition) {
    const S = vf(_.type) && n1(_) || _;
    Uo(S, r.transition);
  }
  return g = _, mu(m), g;
}
function f1(t, e = !0) {
  let r;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (bd(i)) {
      if (i.type !== Mr || i.children === "v-if") {
        if (r)
          return;
        r = i;
      }
    } else
      return;
  }
  return r;
}
const vC = (t) => {
  let e;
  for (const r in t)
    (r === "class" || r === "style" || sf(r)) && ((e || (e = {}))[r] = t[r]);
  return e;
}, dC = (t, e) => {
  const r = {};
  for (const n in t)
    (!lf(n) || !(n.slice(9) in e)) && (r[n] = t[n]);
  return r;
};
function pC(t, e, r) {
  const { props: n, children: i, component: a } = t, { props: o, children: s, patchFlag: l } = e, u = a.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? ag(n, o, u) : !!o;
    if (l & 8) {
      const f = e.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        const h = f[c];
        if (c1(o, n, h) && !gf(u, h))
          return !0;
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : n === o ? !1 : n ? o ? ag(n, o, u) : !0 : !!o;
  return !1;
}
function ag(t, e, r) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (!It(t, a) || c1(e, t, a) && !gf(r, a))
      return !0;
  }
  return !1;
}
function c1(t, e, r) {
  const n = t[r], i = e[r];
  return r === "style" && Ft(n) && Ft(i) ? !Ln(n, i) : n !== i;
}
function gC({ vnode: t, parent: e, suspense: r }, n) {
  for (; e; ) {
    const i = e.subTree;
    if (i.suspense && i.suspense.activeBranch === t && (i.suspense.vnode.el = i.el = n, t = i), i === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
  r && r.activeBranch === t && (r.vnode.el = n);
}
const h1 = {}, v1 = () => Object.create(h1), d1 = (t) => Object.getPrototypeOf(t) === h1;
function mC(t, e, r, n = !1) {
  const i = {}, a = v1();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), p1(t, e, i, a);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  r ? t.props = n ? i : /* @__PURE__ */ xx(i) : t.type.props ? t.props = i : t.props = a, t.attrs = a;
}
function yC(t, e, r, n) {
  const {
    props: i,
    attrs: a,
    vnode: { patchFlag: o }
  } = t, s = /* @__PURE__ */ Et(i), [l] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = t.vnode.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        let h = f[c];
        if (gf(t.emitsOptions, h))
          continue;
        const v = e[h];
        if (l)
          if (It(a, h))
            v !== a[h] && (a[h] = v, u = !0);
          else {
            const d = wr(h);
            i[d] = Nh(
              l,
              s,
              d,
              v,
              t,
              !1
            );
          }
        else
          v !== a[h] && (a[h] = v, u = !0);
      }
    }
  } else {
    p1(t, e, i, a) && (u = !0);
    let f;
    for (const c in s)
      (!e || // for camelCase
      !It(e, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = ci(c)) === c || !It(e, f))) && (l ? r && // for camelCase
      (r[c] !== void 0 || // for kebab-case
      r[f] !== void 0) && (i[c] = Nh(
        l,
        s,
        c,
        void 0,
        t,
        !0
      )) : delete i[c]);
    if (a !== s)
      for (const c in a)
        (!e || !It(e, c)) && (delete a[c], u = !0);
  }
  u && Dn(t.attrs, "set", "");
}
function p1(t, e, r, n) {
  const [i, a] = t.propsOptions;
  let o = !1, s;
  if (e)
    for (let l in e) {
      if (Fo(l))
        continue;
      const u = e[l];
      let f;
      i && It(i, f = wr(l)) ? !a || !a.includes(f) ? r[f] = u : (s || (s = {}))[f] = u : gf(t.emitsOptions, l) || (!(l in n) || u !== n[l]) && (n[l] = u, o = !0);
    }
  if (a) {
    const l = /* @__PURE__ */ Et(r), u = s || Ut;
    for (let f = 0; f < a.length; f++) {
      const c = a[f];
      r[c] = Nh(
        i,
        l,
        c,
        u[c],
        t,
        !It(u, c)
      );
    }
  }
  return o;
}
function Nh(t, e, r, n, i, a) {
  const o = t[r];
  if (o != null) {
    const s = It(o, "default");
    if (s && n === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && wt(l)) {
        const { propsDefaults: u } = i;
        if (r in u)
          n = u[r];
        else {
          const f = Bs(i);
          n = u[r] = l.call(
            null,
            e
          ), f();
        }
      } else
        n = l;
      i.ce && i.ce._setProp(r, n);
    }
    o[
      0
      /* shouldCast */
    ] && (a && !s ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === ci(r)) && (n = !0));
  }
  return n;
}
const _C = /* @__PURE__ */ new WeakMap();
function g1(t, e, r = !1) {
  const n = r ? _C : e.propsCache, i = n.get(t);
  if (i)
    return i;
  const a = t.props, o = {}, s = [];
  let l = !1;
  if (!wt(t)) {
    const f = (c) => {
      l = !0;
      const [h, v] = g1(c, e, !0);
      le(o, h), v && s.push(...v);
    };
    !r && e.mixins.length && e.mixins.forEach(f), t.extends && f(t.extends), t.mixins && t.mixins.forEach(f);
  }
  if (!a && !l)
    return Ft(t) && n.set(t, Ui), Ui;
  if (ct(a))
    for (let f = 0; f < a.length; f++) {
      const c = wr(a[f]);
      og(c) && (o[c] = Ut);
    }
  else if (a)
    for (const f in a) {
      const c = wr(f);
      if (og(c)) {
        const h = a[f], v = o[c] = ct(h) || wt(h) ? { type: h } : le({}, h), d = v.type;
        let p = !1, m = !0;
        if (ct(d))
          for (let g = 0; g < d.length; ++g) {
            const y = d[g], _ = wt(y) && y.name;
            if (_ === "Boolean") {
              p = !0;
              break;
            } else _ === "String" && (m = !1);
          }
        else
          p = wt(d) && d.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = p, v[
          1
          /* shouldCastTrue */
        ] = m, (p || It(v, "default")) && s.push(c);
      }
    }
  const u = [o, s];
  return Ft(t) && n.set(t, u), u;
}
function og(t) {
  return t[0] !== "$" && !Fo(t);
}
const _d = (t) => t === "_" || t === "_ctx" || t === "$stable", Sd = (t) => ct(t) ? t.map(Gr) : [Gr(t)], SC = (t, e, r) => {
  if (e._n)
    return e;
  const n = Nx((...i) => Sd(e(...i)), r);
  return n._c = !1, n;
}, m1 = (t, e, r) => {
  const n = t._ctx;
  for (const i in t) {
    if (_d(i)) continue;
    const a = t[i];
    if (wt(a))
      e[i] = SC(i, a, n);
    else if (a != null) {
      const o = Sd(a);
      e[i] = () => o;
    }
  }
}, y1 = (t, e) => {
  const r = Sd(e);
  t.slots.default = () => r;
}, _1 = (t, e, r) => {
  for (const n in e)
    (r || !_d(n)) && (t[n] = e[n]);
}, bC = (t, e, r) => {
  const n = t.slots = v1();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (_1(n, e, r), r && I_(n, "_", i, !0)) : m1(e, n);
  } else e && y1(t, e);
}, TC = (t, e, r) => {
  const { vnode: n, slots: i } = t;
  let a = !0, o = Ut;
  if (n.shapeFlag & 32) {
    const s = e._;
    s ? r && s === 1 ? a = !1 : _1(i, e, r) : (a = !e.$stable, m1(e, i)), o = e;
  } else e && (y1(t, e), o = { default: 1 });
  if (a)
    for (const s in i)
      !_d(s) && o[s] == null && delete i[s];
}, Me = AC;
function wC(t) {
  return xC(t);
}
function xC(t, e) {
  const r = ff();
  r.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: a,
    createElement: o,
    createText: s,
    createComment: l,
    setText: u,
    setElementText: f,
    parentNode: c,
    nextSibling: h,
    setScopeId: v = Zr,
    insertStaticContent: d
  } = t, p = (x, D, N, k = null, w = null, I = null, G = void 0, Y = null, $ = !!D.dynamicChildren) => {
    if (x === D)
      return;
    x && !so(x, D) && (k = jt(x), it(x, w, I, !0), x = null), D.patchFlag === -2 && ($ = !1, D.dynamicChildren = null), D.dynamicChildren && x && x.dynamicChildren && x.dynamicChildren.hasOnce && (D.dynamicChildren === Ui && (D.dynamicChildren = []), D.dynamicChildren.hasOnce = !0);
    const { type: z, ref: nt, shapeFlag: X } = D;
    switch (z) {
      case mf:
        m(x, D, N, k);
        break;
      case Mr:
        g(x, D, N, k);
        break;
      case ec:
        x == null && y(D, N, k, G);
        break;
      case Ot:
        B(
          x,
          D,
          N,
          k,
          w,
          I,
          G,
          Y,
          $
        );
        break;
      default:
        X & 1 ? b(
          x,
          D,
          N,
          k,
          w,
          I,
          G,
          Y,
          $
        ) : X & 6 ? O(
          x,
          D,
          N,
          k,
          w,
          I,
          G,
          Y,
          $
        ) : (X & 64 || X & 128) && z.process(
          x,
          D,
          N,
          k,
          w,
          I,
          G,
          Y,
          $,
          Ct
        );
    }
    nt != null && w ? Go(nt, x && x.ref, I, D || x, !D) : nt == null && x && x.ref != null && Go(x.ref, null, I, x, !0);
  }, m = (x, D, N, k) => {
    if (x == null)
      n(
        D.el = s(D.children),
        N,
        k
      );
    else {
      const w = D.el = x.el;
      D.children !== x.children && u(w, D.children);
    }
  }, g = (x, D, N, k) => {
    x == null ? n(
      D.el = l(D.children || ""),
      N,
      k
    ) : D.el = x.el;
  }, y = (x, D, N, k) => {
    [x.el, x.anchor] = d(
      x.children,
      D,
      N,
      k,
      x.el,
      x.anchor
    );
  }, _ = ({ el: x, anchor: D }, N, k) => {
    let w;
    for (; x && x !== D; )
      w = h(x), n(x, N, k), x = w;
    n(D, N, k);
  }, S = ({ el: x, anchor: D }) => {
    let N;
    for (; x && x !== D; )
      N = h(x), i(x), x = N;
    i(D);
  }, b = (x, D, N, k, w, I, G, Y, $) => {
    if (D.type === "svg" ? G = "svg" : D.type === "math" && (G = "mathml"), x == null)
      T(
        D,
        N,
        k,
        w,
        I,
        G,
        Y,
        $
      );
    else {
      const z = x.el && x.el._isVueCE ? x.el : null;
      try {
        z && z._beginPatch(), A(
          x,
          D,
          w,
          I,
          G,
          Y,
          $
        );
      } finally {
        z && z._endPatch();
      }
    }
  }, T = (x, D, N, k, w, I, G, Y) => {
    let $, z;
    const { props: nt, shapeFlag: X, transition: et, dirs: dt } = x;
    if ($ = x.el = o(
      x.type,
      I,
      nt && nt.is,
      nt
    ), X & 8 ? f($, x.children) : X & 16 && E(
      x.children,
      $,
      null,
      k,
      w,
      tc(x, I),
      G,
      Y
    ), dt && vi(x, null, k, "created"), C($, x, x.scopeId, G, k), nt) {
      for (const zt in nt)
        zt !== "value" && !Fo(zt) && a($, zt, null, nt[zt], I, k);
      "value" in nt && a($, "value", null, nt.value, I), (z = nt.onVnodeBeforeMount) && Or(z, k, x);
    }
    dt && vi(x, null, k, "beforeMount");
    const Dt = CC(w, et);
    Dt ? et.beforeEnter($) : et && !et.persisted && ($[MC] = !0), n($, D, N), ((z = nt && nt.onVnodeMounted) || Dt || dt) && Me(() => {
      z && Or(z, k, x), Dt && et.enter($), dt && vi(x, null, k, "mounted");
    }, w);
  }, C = (x, D, N, k, w) => {
    if (N && v(x, N), k)
      for (let I = 0; I < k.length; I++)
        v(x, k[I]);
    if (w) {
      let I = w.subTree;
      if (D === I || T1(I.type) && (I.ssContent === D || I.ssFallback === D)) {
        const G = w.vnode;
        C(
          x,
          G,
          G.scopeId,
          G.slotScopeIds,
          w.parent
        );
      }
    }
  }, E = (x, D, N, k, w, I, G, Y, $ = 0) => {
    for (let z = $; z < x.length; z++) {
      const nt = x[z] = Y ? Cn(x[z]) : Gr(x[z]);
      p(
        null,
        nt,
        D,
        N,
        k,
        w,
        I,
        G,
        Y
      );
    }
  }, A = (x, D, N, k, w, I, G) => {
    const Y = D.el = x.el;
    let { patchFlag: $, dynamicChildren: z, dirs: nt } = D;
    $ |= x.patchFlag & 16;
    const X = x.props || Ut, et = D.props || Ut;
    let dt;
    if (N && di(N, !1), (dt = et.onVnodeBeforeUpdate) && Or(dt, N, D, x), nt && vi(D, x, N, "beforeUpdate"), N && di(N, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    z && (!x.dynamicChildren || x.dynamicChildren.length !== z.length) && ($ = 0, G = !1, z = null), (X.innerHTML && et.innerHTML == null || X.textContent && et.textContent == null) && f(Y, ""), z ? M(
      x.dynamicChildren,
      z,
      Y,
      N,
      k,
      tc(D, w),
      I
    ) : G || V(
      x,
      D,
      Y,
      null,
      N,
      k,
      tc(D, w),
      I,
      !1
    ), $ > 0) {
      if ($ & 16)
        R(Y, X, et, N, w);
      else if ($ & 2 && X.class !== et.class && a(Y, "class", null, et.class, w), $ & 4 && a(Y, "style", X.style, et.style, w), $ & 8) {
        const Dt = D.dynamicProps;
        for (let zt = 0; zt < Dt.length; zt++) {
          const Rt = Dt[zt], ne = X[Rt], he = et[Rt];
          (he !== ne || Rt === "value") && a(Y, Rt, ne, he, w, N);
        }
      }
      $ & 1 && x.children !== D.children && f(Y, D.children);
    } else !G && z == null && R(Y, X, et, N, w);
    ((dt = et.onVnodeUpdated) || nt) && Me(() => {
      dt && Or(dt, N, D, x), nt && vi(D, x, N, "updated");
    }, k);
  }, M = (x, D, N, k, w, I, G) => {
    for (let Y = 0; Y < D.length; Y++) {
      const $ = x[Y], z = D[Y], nt = $.el || $o($), X = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        nt && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === Ot || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !so($, z) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 198) ? c(nt) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          N
        )
      );
      p(
        $,
        z,
        X,
        null,
        k,
        w,
        I,
        G,
        !0
      );
    }
  }, R = (x, D, N, k, w) => {
    if (D !== N) {
      if (D !== Ut)
        for (const I in D)
          !Fo(I) && !(I in N) && a(
            x,
            I,
            D[I],
            null,
            w,
            k
          );
      for (const I in N) {
        if (Fo(I)) continue;
        const G = N[I], Y = D[I];
        G !== Y && I !== "value" && a(x, I, Y, G, w, k);
      }
      "value" in N && a(x, "value", D.value, N.value, w);
    }
  }, B = (x, D, N, k, w, I, G, Y, $) => {
    const z = D.el = x ? x.el : s(""), nt = D.anchor = x ? x.anchor : s("");
    let { patchFlag: X, dynamicChildren: et, slotScopeIds: dt } = D;
    dt && (Y = Y ? Y.concat(dt) : dt), x == null ? (n(z, N, k), n(nt, N, k), E(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      D.children || [],
      N,
      nt,
      w,
      I,
      G,
      Y,
      $
    )) : X > 0 && X & 64 && et && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    x.dynamicChildren && x.dynamicChildren.length === et.length ? (M(
      x.dynamicChildren,
      et,
      N,
      w,
      I,
      G,
      Y
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (D.key != null || w && D === w.subTree) && S1(
      x,
      D,
      !0
      /* shallow */
    )) : V(
      x,
      D,
      N,
      nt,
      w,
      I,
      G,
      Y,
      $
    );
  }, O = (x, D, N, k, w, I, G, Y, $) => {
    D.slotScopeIds = Y, x == null ? D.shapeFlag & 512 ? w.ctx.activate(
      D,
      N,
      k,
      G,
      $
    ) : F(
      D,
      N,
      k,
      w,
      I,
      G,
      $
    ) : U(x, D, $);
  }, F = (x, D, N, k, w, I, G) => {
    const Y = x.component = kC(
      x,
      k,
      w
    );
    if (yd(x) && (Y.ctx.renderer = Ct), NC(Y, !1, G), Y.asyncDep) {
      if (w && w.registerDep(
        Y,
        H,
        G,
        I
      ), !x.el) {
        const $ = Y.subTree = Cr(Mr);
        g(null, $, D, N), x.placeholder = $.el;
      }
    } else
      H(
        Y,
        x,
        D,
        N,
        w,
        I,
        G
      );
  }, U = (x, D, N) => {
    const k = D.component = x.component;
    if (pC(x, D, N))
      if (k.asyncDep && !k.asyncResolved) {
        D.el = x.el, D.placeholder = x.placeholder, W(k, D, N);
        return;
      } else
        k.next = D, k.update();
    else
      D.el = x.el, D.placeholder = x.placeholder, k.vnode = D;
  }, H = (x, D, N, k, w, I, G) => {
    const Y = () => {
      if (x.isMounted) {
        let { next: X, bu: et, u: dt, parent: Dt, vnode: zt } = x;
        {
          const Pr = b1(x);
          if (Pr) {
            X && (X.el = zt.el, W(x, X, G)), Pr.asyncDep.then(() => {
              const mn = () => {
                x.job.flags & 8 || (w && w.pendingBranch ? Me(mn, w) : z());
              };
              mn.flags = 48, Me(mn, w);
            });
            return;
          }
        }
        let Rt = X, ne;
        di(x, !1), X ? (X.el = zt.el, W(x, X, G)) : X = zt, et && Xl(et), (ne = X.props && X.props.onVnodeBeforeUpdate) && Or(ne, Dt, X, zt), di(x, !0);
        const he = ig(x), mr = x.subTree;
        x.subTree = he, p(
          mr,
          he,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          c(
            mr.el || $o(mr)
          ),
          // anchor may have changed if it's in a fragment
          jt(mr),
          x,
          w,
          I
        ), X.el = he.el, Rt === null && gC(x, he.el), dt && Me(dt, w), (ne = X.props && X.props.onVnodeUpdated) && Me(
          () => Or(ne, Dt, X, zt),
          w
        );
      } else {
        let X;
        const { el: et, props: dt } = D, { bm: Dt, m: zt, parent: Rt, root: ne, type: he } = x, mr = Wo(D);
        di(x, !1), Dt && Xl(Dt), !mr && (X = dt && dt.onVnodeBeforeMount) && Or(X, Rt, D), di(x, !0);
        {
          ne.ce && ne.ce._hasShadowRoot() && ne.ce._injectChildStyle(
            he,
            x.parent ? x.parent.type : void 0
          );
          const Pr = x.subTree = ig(x);
          p(
            null,
            Pr,
            N,
            k,
            x,
            w,
            I
          ), D.el = Pr.el;
        }
        if (zt && Me(zt, w), !mr && (X = dt && dt.onVnodeMounted)) {
          const Pr = D;
          Me(
            () => Or(X, Rt, Pr),
            w
          );
        }
        (D.shapeFlag & 256 || Rt && Wo(Rt.vnode) && Rt.vnode.shapeFlag & 256) && x.a && Me(x.a, w), x.isMounted = !0, D = N = k = null;
      }
    };
    x.scope.on();
    const $ = x.effect = new R_(Y);
    x.scope.off();
    const z = x.update = $.run.bind($), nt = x.job = $.runIfDirty.bind($);
    nt.i = x, nt.id = x.uid, $.scheduler = () => gd(nt), di(x, !0), z();
  }, W = (x, D, N) => {
    D.component = x;
    const k = x.vnode.props;
    x.vnode = D, x.next = null, yC(x, D.props, k, N), TC(x, D.children, N), on(), j_(x), sn();
  }, V = (x, D, N, k, w, I, G, Y, $ = !1) => {
    const z = x && x.children, nt = x ? x.shapeFlag : 0, X = D.children, { patchFlag: et, shapeFlag: dt } = D;
    if (et > 0) {
      if (et & 128) {
        rt(
          z,
          X,
          N,
          k,
          w,
          I,
          G,
          Y,
          $
        );
        return;
      } else if (et & 256) {
        j(
          z,
          X,
          N,
          k,
          w,
          I,
          G,
          Y,
          $
        );
        return;
      }
    }
    dt & 8 ? (nt & 16 && St(z, w, I), X !== z && f(N, X)) : nt & 16 ? dt & 16 ? rt(
      z,
      X,
      N,
      k,
      w,
      I,
      G,
      Y,
      $
    ) : St(z, w, I, !0) : (nt & 8 && f(N, ""), dt & 16 && E(
      X,
      N,
      k,
      w,
      I,
      G,
      Y,
      $
    ));
  }, j = (x, D, N, k, w, I, G, Y, $) => {
    x = x || Ui, D = D || Ui;
    const z = x.length, nt = D.length, X = Math.min(z, nt);
    let et;
    for (et = 0; et < X; et++) {
      const dt = D[et] = $ ? Cn(D[et]) : Gr(D[et]);
      p(
        x[et],
        dt,
        N,
        null,
        w,
        I,
        G,
        Y,
        $
      );
    }
    z > nt ? St(
      x,
      w,
      I,
      !0,
      !1,
      X
    ) : E(
      D,
      N,
      k,
      w,
      I,
      G,
      Y,
      $,
      X
    );
  }, rt = (x, D, N, k, w, I, G, Y, $) => {
    let z = 0;
    const nt = D.length;
    let X = x.length - 1, et = nt - 1;
    for (; z <= X && z <= et; ) {
      const dt = x[z], Dt = D[z] = $ ? Cn(D[z]) : Gr(D[z]);
      if (so(dt, Dt))
        p(
          dt,
          Dt,
          N,
          null,
          w,
          I,
          G,
          Y,
          $
        );
      else
        break;
      z++;
    }
    for (; z <= X && z <= et; ) {
      const dt = x[X], Dt = D[et] = $ ? Cn(D[et]) : Gr(D[et]);
      if (so(dt, Dt))
        p(
          dt,
          Dt,
          N,
          null,
          w,
          I,
          G,
          Y,
          $
        );
      else
        break;
      X--, et--;
    }
    if (z > X) {
      if (z <= et) {
        const dt = et + 1, Dt = dt < nt ? D[dt].el : k;
        for (; z <= et; )
          p(
            null,
            D[z] = $ ? Cn(D[z]) : Gr(D[z]),
            N,
            Dt,
            w,
            I,
            G,
            Y,
            $
          ), z++;
      }
    } else if (z > et)
      for (; z <= X; )
        it(x[z], w, I, !0), z++;
    else {
      const dt = z, Dt = z, zt = /* @__PURE__ */ new Map();
      for (z = Dt; z <= et; z++) {
        const Ue = D[z] = $ ? Cn(D[z]) : Gr(D[z]);
        Ue.key != null && zt.set(Ue.key, z);
      }
      let Rt, ne = 0;
      const he = et - Dt + 1;
      let mr = !1, Pr = 0;
      const mn = new Array(he);
      for (z = 0; z < he; z++) mn[z] = 0;
      for (z = dt; z <= X; z++) {
        const Ue = x[z];
        if (ne >= he) {
          it(Ue, w, I, !0);
          continue;
        }
        let Rr;
        if (Ue.key != null)
          Rr = zt.get(Ue.key);
        else
          for (Rt = Dt; Rt <= et; Rt++)
            if (mn[Rt - Dt] === 0 && so(Ue, D[Rt])) {
              Rr = Rt;
              break;
            }
        Rr === void 0 ? it(Ue, w, I, !0) : (mn[Rr - Dt] = z + 1, Rr >= Pr ? Pr = Rr : mr = !0, p(
          Ue,
          D[Rr],
          N,
          null,
          w,
          I,
          G,
          Y,
          $
        ), ne++);
      }
      const Up = mr ? DC(mn) : Ui;
      for (Rt = Up.length - 1, z = he - 1; z >= 0; z--) {
        const Ue = Dt + z, Rr = D[Ue], Gp = D[Ue + 1], Wp = Ue + 1 < nt ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Gp.el || $o(Gp)
        ) : k;
        mn[z] === 0 ? p(
          null,
          Rr,
          N,
          Wp,
          w,
          I,
          G,
          Y,
          $
        ) : mr && (Rt < 0 || z !== Up[Rt] ? tt(Rr, N, Wp, 2) : Rt--);
      }
    }
  }, tt = (x, D, N, k, w = null) => {
    const { el: I, type: G, transition: Y, children: $, shapeFlag: z } = x;
    if (z & 6) {
      tt(x.component.subTree, D, N, k);
      return;
    }
    if (z & 128) {
      x.suspense.move(D, N, k);
      return;
    }
    if (z & 64) {
      G.move(x, D, N, Ct);
      return;
    }
    if (G === Ot) {
      n(I, D, N);
      for (let X = 0; X < $.length; X++)
        tt($[X], D, N, k);
      n(x.anchor, D, N);
      return;
    }
    if (G === ec) {
      _(x, D, N);
      return;
    }
    if (k !== 2 && z & 1 && Y)
      if (k === 0)
        Y.persisted && !I[Jf] ? n(I, D, N) : (Y.beforeEnter(I), n(I, D, N), Me(() => Y.enter(I), w));
      else {
        const { leave: X, delayLeave: et, afterLeave: dt } = Y, Dt = () => {
          x.ctx.isUnmounted ? i(I) : n(I, D, N);
        }, zt = () => {
          const Rt = I._isLeaving || !!I[Jf];
          I._isLeaving && I[Jf](
            !0
            /* cancelled */
          ), Y.persisted && !Rt ? Dt() : X(I, () => {
            Dt(), dt && dt();
          });
        };
        et ? et(I, Dt, zt) : zt();
      }
    else
      n(I, D, N);
  }, it = (x, D, N, k = !1, w = !1) => {
    const {
      type: I,
      props: G,
      ref: Y,
      children: $,
      dynamicChildren: z,
      shapeFlag: nt,
      patchFlag: X,
      dirs: et,
      cacheIndex: dt,
      memo: Dt
    } = x;
    if ((X === -2 || z && z.hasOnce) && (w = !1), Y != null && (on(), Go(Y, null, N, x, !0), sn()), dt != null && (!x.ctx || x.ctx === D) && (D.renderCache[dt] = void 0), nt & 256 && D.ctx.deactivate(x))
      return;
    const zt = nt & 1 && et, Rt = !Wo(x);
    let ne;
    if (Rt && (ne = G && G.onVnodeBeforeUnmount) && Or(ne, D, x), nt & 6)
      bt(x.component, N, k);
    else {
      if (nt & 128) {
        x.suspense.unmount(N, k);
        return;
      }
      zt && vi(x, null, D, "beforeUnmount"), nt & 64 ? x.type.remove(
        x,
        D,
        N,
        Ct,
        k
      ) : z && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !z.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (I !== Ot || X > 0 && X & 64) ? St(
        z,
        D,
        N,
        !1,
        !0
      ) : (I === Ot && X & 384 || !w && nt & 16) && St($, D, N), k && ot(x);
    }
    const he = Dt != null && dt == null;
    (Rt && (ne = G && G.onVnodeUnmounted) || zt || he) && Me(() => {
      ne && Or(ne, D, x), zt && vi(x, null, D, "unmounted"), he && (x.el = null);
    }, N);
  }, ot = (x) => {
    const { type: D, el: N, anchor: k, transition: w } = x, I = D === Ot;
    if (I && !w) {
      Z(N, k);
      return;
    }
    if (D === ec) {
      S(x), w && !w.persisted && w.afterLeave && w.afterLeave();
      return;
    }
    const G = I ? Rh(x) : x, Y = () => {
      I ? c(N) && Z(N, k) : i(N), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (G && G.shapeFlag & 1 && w && !w.persisted) {
      const { leave: $, delayLeave: z } = w, nt = G.el, X = () => $(nt, Y);
      z ? z(nt, Y, X) : X();
    } else
      Y();
  }, Z = (x, D) => {
    let N;
    for (; x !== D; )
      N = h(x), i(x), x = N;
    i(D);
  }, bt = (x, D, N) => {
    const { bum: k, scope: w, job: I, subTree: G, um: Y, m: $, a: z } = x;
    sg($), sg(z), k && Xl(k), w.stop(), I ? (I.flags |= 8, it(G, x, D, N)) : G && (G.transition = x.vnode.transition, it(G, x, D, N)), Y && Me(Y, D);
    const nt = () => {
      x.isUnmounted = !0;
    };
    nt.flags = 16, Me(nt, D);
  }, St = (x, D, N, k = !1, w = !1, I = 0) => {
    for (let G = I; G < x.length; G++)
      it(x[G], D, N, k, w);
  }, jt = (x) => {
    if (x.shapeFlag & 6)
      return jt(x.component.subTree);
    if (x.shapeFlag & 128)
      return x.suspense.next();
    const D = h(x.anchor || x.el), N = D && D[Ux];
    return N ? h(N) : D;
  }, ge = (x, D, N) => {
    const k = x && D._vnode ? void 0 : x && x.component ? x.component.uid : OC();
    Bx(() => {
      x == null ? D._vnode && it(D._vnode, null, null, !0) : p(
        D._vnode || null,
        x,
        D,
        null,
        null,
        null,
        N
      ), D._vnode = x;
    }, k);
  }, Ct = {
    p,
    um: it,
    m: tt,
    r: ot,
    mt: F,
    mc: E,
    pc: V,
    pbc: M,
    n: jt,
    o: t
  };
  return {
    render: ge,
    hydrate: void 0,
    createApp: uC(ge)
  };
}
function tc({ type: t, props: e }, r) {
  return r === "svg" && t === "foreignObject" || r === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : r;
}
function di({ effect: t, job: e }, r) {
  r ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function CC(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function S1(t, e, r = !1) {
  const n = t.children, i = e.children;
  if (ct(n) && ct(i))
    for (let a = 0; a < n.length; a++) {
      const o = n[a];
      let s = i[a];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[a] = Cn(i[a]), s.el = o.el), !r && s.patchFlag !== -2 && S1(o, s)), s.type === mf && (s.patchFlag === -1 && (s = i[a] = Cn(s)), s.el = o.el), s.type === Mr && !s.el && (s.el = o.el);
    }
}
function DC(t) {
  const e = t.slice(), r = [0];
  let n, i, a, o, s;
  const l = t.length;
  for (n = 0; n < l; n++) {
    const u = t[n];
    if (u !== 0) {
      if (i = r[r.length - 1], t[i] < u) {
        e[n] = i, r.push(n);
        continue;
      }
      for (a = 0, o = r.length - 1; a < o; )
        s = a + o >> 1, t[r[s]] < u ? a = s + 1 : o = s;
      u < t[r[a]] && (a > 0 && (e[n] = r[a - 1]), r[a] = n);
    }
  }
  for (a = r.length, o = r[a - 1]; a-- > 0; )
    r[a] = o, o = e[o];
  return r;
}
function b1(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : b1(e);
}
function sg(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
function $o(t) {
  if (t.placeholder)
    return t.placeholder;
  const e = t.component;
  if (e)
    return $o(e.subTree);
  const r = t.suspense;
  return r && r.activeBranch ? $o(r.activeBranch) : null;
}
const T1 = (t) => t.__isSuspense, MC = /* @__PURE__ */ Symbol("_deferredEnter");
function AC(t, e) {
  e && e.pendingBranch ? ct(t) ? e.effects.push(...t) : e.effects.push(t) : kx(t);
}
const Ot = /* @__PURE__ */ Symbol.for("v-fgt"), mf = /* @__PURE__ */ Symbol.for("v-txt"), Mr = /* @__PURE__ */ Symbol.for("v-cmt"), ec = /* @__PURE__ */ Symbol.for("v-stc"), qi = [];
let Xe = null;
function lt(t = !1) {
  qi.push(Xe = t ? null : []);
}
function w1() {
  qi.pop(), Xe = qi[qi.length - 1] || null;
}
let cs = 1;
function lg(t, e = !1) {
  cs += t, t < 0 && Xe && e && (Xe.hasOnce = !0);
}
function x1(t) {
  return t.dynamicChildren = cs > 0 ? Xe || Ui : null, w1(), cs > 0 && Xe && Xe.push(t), t;
}
function ut(t, e, r, n, i, a) {
  return x1(
    L(
      t,
      e,
      r,
      n,
      i,
      a,
      !0
    )
  );
}
function IC(t, e, r, n, i) {
  return x1(
    Cr(
      t,
      e,
      r,
      n,
      i,
      !0
    )
  );
}
function bd(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function so(t, e) {
  return t.type === e.type && t.key === e.key;
}
const C1 = ({ key: t }) => t ?? null, ql = ({
  ref: t,
  ref_key: e,
  ref_for: r
}) => (typeof t == "number" && (t = "" + t), t != null ? te(t) || /* @__PURE__ */ Te(t) || wt(t) ? { i: hr, r: t, k: e, f: !!r } : t : null);
function L(t, e = null, r = null, n = 0, i = null, a = t === Ot ? 0 : 1, o = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && C1(e),
    ref: e && ql(e),
    scopeId: t1,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: hr
  };
  return s ? (Su(l, r), a & 128 && t.normalize(l)) : r && (l.shapeFlag |= te(r) ? 8 : 16), cs > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Xe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Xe.push(l), l;
}
const Cr = LC;
function LC(t, e = null, r = null, n = 0, i = null, a = !1) {
  if ((!t || t === eC) && (t = Mr), bd(t)) {
    const s = Ga(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return r && Su(s, r), cs > 0 && !a && Xe && (s.shapeFlag & 6 ? Xe[Xe.indexOf(t)] = s : Xe.push(s)), s.patchFlag = -2, s;
  }
  if (VC(t) && (t = t.__vccOpts), e) {
    e = EC(e);
    let { class: s, style: l } = e;
    s && !te(s) && (e.class = br(s)), Ft(l) && (/* @__PURE__ */ dd(l) && !ct(l) && (l = le({}, l)), e.style = ad(l));
  }
  const o = te(t) ? 1 : T1(t) ? 128 : vf(t) ? 64 : Ft(t) ? 4 : wt(t) ? 2 : 0;
  return L(
    t,
    e,
    r,
    n,
    i,
    o,
    a,
    !0
  );
}
function EC(t) {
  return t ? /* @__PURE__ */ dd(t) ? le({}, t) : d1(t) ? le({}, t[I1] || t) : t : null;
}
function Ga(t, e, r = !1, n = !1) {
  const { props: i, ref: a, patchFlag: o, children: s, transition: l } = t, u = e ? PC(i || {}, e) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: u,
    key: u && C1(u),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? ct(a) ? a.concat(ql(e)) : [a, ql(e)] : ql(e)
    ) : a,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: s,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Ot ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ga(t.ssContent),
    ssFallback: t.ssFallback && Ga(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
    cacheIndex: t.cacheIndex
  };
  return l && n && Uo(
    f,
    l.clone(f)
  ), f;
}
function yt(t = " ", e = 0) {
  return Cr(mf, null, t, e);
}
function ee(t = "", e = !1) {
  return e ? (lt(), IC(Mr, null, t)) : Cr(Mr, null, t);
}
function Gr(t) {
  return t == null || typeof t == "boolean" ? Cr(Mr) : ct(t) ? Cr(
    Ot,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : bd(t) ? Cn(t) : Cr(mf, null, String(t));
}
function Cn(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Ga(t);
}
function Su(t, e) {
  let r = 0;
  const { shapeFlag: n } = t;
  if (e == null)
    e = null;
  else if (ct(e))
    r = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Su(t, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = e._;
      !i && !d1(e) ? e._ctx = hr : i === 3 && hr && (hr.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else if (wt(e)) {
    if (n & 65) {
      Su(t, { default: e });
      return;
    }
    e = { default: e, _ctx: hr }, r = 32;
  } else
    e = String(e), n & 64 ? (r = 16, e = [yt(e)]) : r = 8;
  t.children = e, t.shapeFlag |= r;
}
function PC(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    for (const i in n)
      if (i === "class")
        e.class !== n.class && (e.class = br([e.class, n.class]));
      else if (i === "style")
        e.style = ad([e.style, n.style]);
      else if (sf(i)) {
        const a = e[i], o = n[i];
        o && a !== o && !(ct(a) && a.includes(o)) ? e[i] = a ? [].concat(a, o) : o : o == null && a == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !lf(i) && (e[i] = o);
      } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Or(t, e, r, n = null) {
  Dr(t, e, 7, [
    r,
    n
  ]);
}
const RC = /* @__PURE__ */ l1();
let D1 = 0;
function OC() {
  return D1;
}
function kC(t, e, r) {
  const n = t.type, i = (e ? e.appContext : t.appContext) || RC, a = {
    uid: D1++,
    vnode: t,
    type: n,
    parent: e,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ax(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: g1(n, i),
    emitsOptions: u1(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ut,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Ut,
    data: Ut,
    props: Ut,
    attrs: Ut,
    slots: Ut,
    refs: Ut,
    setupState: Ut,
    setupContext: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = e ? e.root : a, a.emit = cC.bind(null, a), t.ce && t.ce(a), a;
}
let Le = null;
const BC = () => Le || hr;
let bu, hs;
{
  const t = ff(), e = (r, n) => {
    let i;
    return (i = t[r]) || (i = t[r] = []), i.push(n), (a) => {
      i.length > 1 ? i.forEach((o) => o(a)) : i[0](a);
    };
  };
  bu = e(
    "__VUE_INSTANCE_SETTERS__",
    (r) => Le = r
  ), hs = e(
    "__VUE_SSR_SETTERS__",
    (r) => vs = r
  );
}
const Bs = (t) => {
  const e = Le;
  return bu(t), t.scope.on(), () => {
    t.scope.off(), bu(e);
  };
}, ug = () => {
  Le && Le.scope.off(), bu(null);
};
function M1(t) {
  return t.vnode.shapeFlag & 4;
}
let vs = !1;
function NC(t, e = !1, r = !1) {
  e && hs(e);
  const { props: n, children: i } = t.vnode, a = M1(t);
  mC(t, n, a, e), bC(t, i, r || e);
  const o = a ? FC(t, e) : void 0;
  return e && hs(!1), o;
}
function FC(t, e) {
  const r = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, rC);
  const { setup: n } = r;
  if (n) {
    on();
    const i = t.setupContext = n.length > 1 ? zC(t) : null, a = Bs(t), o = ks(
      n,
      t,
      0,
      [
        t.props,
        i
      ]
    ), s = C_(o);
    if (sn(), a(), (s || t.sp) && !Wo(t) && i1(t), s) {
      if (o.then(ug, ug), e)
        return o.then((l) => {
          hs(!0);
          try {
            fg(t, l, e);
          } finally {
            hs(!1);
          }
        }).catch((l) => {
          hf(l, t, 0, void 0, !0), t.ssrRender = (u, f) => f("<!---->");
        });
      t.asyncDep = o;
    } else
      fg(t, o);
  } else
    A1(t);
}
function fg(t, e, r) {
  wt(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ft(e) && (t.setupState = K_(e)), A1(t);
}
function A1(t, e, r) {
  const n = t.type;
  t.render || (t.render = n.render || Zr);
  {
    const i = Bs(t);
    on();
    try {
      nC(t);
    } finally {
      sn(), i();
    }
  }
}
const I1 = /* @__PURE__ */ Symbol(), HC = {
  get(t, e) {
    return Se(t, "get", ""), e === I1 ? t : t[e];
  }
};
function zC(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  return {
    attrs: new Proxy(t.attrs, HC),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function yf(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(K_(Cx(t.exposed)), {
    get(e, r) {
      if (r in e)
        return e[r];
      if (r in Yo)
        return Yo[r](t);
    },
    has(e, r) {
      return r in e || r in Yo;
    }
  })) : t.proxy;
}
function VC(t) {
  return wt(t) && "__vccOpts" in t;
}
const zr = (t, e) => /* @__PURE__ */ Lx(t, e, vs), UC = "3.5.45";
let Fh;
const cg = typeof window < "u" && window.trustedTypes;
if (cg)
  try {
    Fh = /* @__PURE__ */ cg.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const L1 = Fh ? (t) => Fh.createHTML(t) : (t) => t, GC = "http://www.w3.org/2000/svg", WC = "http://www.w3.org/1998/Math/MathML", wn = typeof document < "u" ? document : null, hg = wn && /* @__PURE__ */ wn.createElement("template"), YC = {
  insert: (t, e, r) => {
    e.insertBefore(t, r || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, r, n) => {
    const i = e === "svg" ? wn.createElementNS(GC, t) : e === "mathml" ? wn.createElementNS(WC, t) : r ? wn.createElement(t, { is: r }) : wn.createElement(t);
    return t === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (t) => wn.createTextNode(t),
  createComment: (t) => wn.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => wn.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, r, n, i, a) {
    const o = r ? r.previousSibling : e.lastChild;
    if (i && (i === a || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), r), !(i === a || !(i = i.nextSibling)); )
        ;
    else {
      hg.innerHTML = L1(
        n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t
      );
      const s = hg.content;
      if (n === "svg" || n === "mathml") {
        const l = s.firstChild;
        for (; l.firstChild; )
          s.appendChild(l.firstChild);
        s.removeChild(l);
      }
      e.insertBefore(s, r);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      r ? r.previousSibling : e.lastChild
    ];
  }
}, $C = /* @__PURE__ */ Symbol("_vtc");
function XC(t, e, r) {
  const n = t[$C];
  n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? t.removeAttribute("class") : r ? t.setAttribute("class", e) : t.className = e;
}
const vg = /* @__PURE__ */ Symbol("_vod"), KC = /* @__PURE__ */ Symbol("_vsh"), qC = /* @__PURE__ */ Symbol(""), ZC = /(?:^|;)\s*display\s*:/;
function jC(t, e, r) {
  const n = t.style, i = te(r);
  let a = !1;
  if (r && !i) {
    if (e)
      if (te(e))
        for (const o of e.split(";")) {
          const s = o.slice(0, o.indexOf(":")).trim();
          r[s] == null && Lo(n, s, "");
        }
      else
        for (const o in e)
          r[o] == null && Lo(n, o, "");
    for (const o in r) {
      o === "display" && (a = !0);
      const s = r[o];
      s != null ? QC(
        t,
        o,
        !te(e) && e ? e[o] : void 0,
        s
      ) || Lo(n, o, s) : Lo(n, o, "");
    }
  } else if (i) {
    if (e !== r) {
      const o = n[qC];
      o && (r += ";" + o), n.cssText = r, a = ZC.test(r);
    }
  } else e && t.removeAttribute("style");
  vg in t && ((!i || e !== r) && (t[vg] = a ? n.display : ""), t[KC] && (n.display = "none"));
}
const el = /\s*!important$/;
function Lo(t, e, r) {
  if (ct(r))
    r.forEach((n) => Lo(t, e, n));
  else if (r == null && (r = ""), e.startsWith("--"))
    el.test(r) ? t.setProperty(e, r.replace(el, ""), "important") : t.setProperty(e, r);
  else {
    const n = JC(t, e);
    el.test(r) ? t.setProperty(
      ci(n),
      r.replace(el, ""),
      "important"
    ) : t[n] = r;
  }
}
const dg = ["Webkit", "Moz", "ms"], rc = {};
function JC(t, e) {
  const r = rc[e];
  if (r)
    return r;
  let n = wr(e);
  if (n !== "filter" && n in t)
    return rc[e] = n;
  n = A_(n);
  for (let i = 0; i < dg.length; i++) {
    const a = dg[i] + n;
    if (a in t)
      return rc[e] = a;
  }
  return e;
}
function QC(t, e, r, n) {
  return t.tagName === "TEXTAREA" && (e === "width" || e === "height") && te(n) && r === n;
}
const pg = "http://www.w3.org/1999/xlink";
function gg(t, e, r, n, i, a = rx(e)) {
  n && e.startsWith("xlink:") ? r == null ? t.removeAttributeNS(pg, e.slice(6, e.length)) : t.setAttributeNS(pg, e, r) : r == null || a && !L_(r) ? t.removeAttribute(e) : t.setAttribute(
    e,
    a ? "" : an(r) ? String(r) : r
  );
}
function mg(t, e, r, n, i) {
  if (e === "innerHTML" || e === "textContent") {
    r != null && (t[e] = e === "innerHTML" ? L1(r) : r);
    return;
  }
  const a = t.tagName;
  if (e === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    const s = a === "OPTION" ? t.getAttribute("value") || "" : t.value, l = r == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(r);
    (s !== l || !("_value" in t)) && (t.value = l), r == null && t.removeAttribute(e), t._value = r;
    return;
  }
  let o = !1;
  if (r === "" || r == null) {
    const s = typeof t[e];
    s === "boolean" ? r = L_(r) : r == null && s === "string" ? (r = "", o = !0) : s === "number" && (r = 0, o = !0);
  }
  try {
    t[e] = r;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function Kn(t, e, r, n) {
  t.addEventListener(e, r, n);
}
function tD(t, e, r, n) {
  t.removeEventListener(e, r, n);
}
const yg = /* @__PURE__ */ Symbol("_vei");
function eD(t, e, r, n, i = null) {
  const a = t[yg] || (t[yg] = {}), o = a[e];
  if (n && o)
    o.value = n;
  else {
    const [s, l] = iD(e);
    if (n) {
      const u = a[e] = sD(
        n,
        i
      );
      Kn(t, s, u, l);
    } else o && (tD(t, s, o, l), a[e] = void 0);
  }
}
const rD = /(Once|Passive|Capture)$/, nD = /^on:?(?:Once|Passive|Capture)$/;
function iD(t) {
  let e, r;
  for (; (r = t.match(rD)) && !nD.test(t); )
    e || (e = {}), t = t.slice(0, t.length - r[1].length), e[r[1].toLowerCase()] = !0;
  return [t[2] === ":" ? t.slice(3) : ci(t.slice(2)), e];
}
let nc = 0;
const aD = /* @__PURE__ */ Promise.resolve(), oD = () => nc || (aD.then(() => nc = 0), nc = Date.now());
function sD(t, e) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    const i = r.value;
    if (ct(i)) {
      const a = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        a.call(n), n._stopped = !0;
      };
      const o = i.slice(), s = [n];
      for (let l = 0; l < o.length && !n._stopped; l++) {
        const u = o[l];
        u && Dr(
          u,
          e,
          5,
          s
        );
      }
    } else
      Dr(
        i,
        e,
        5,
        [n]
      );
  };
  return r.value = t, r.attached = oD(), r;
}
const _g = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, lD = (t, e, r, n, i, a) => {
  const o = i === "svg";
  e === "class" ? XC(t, n, o) : e === "style" ? jC(t, r, n) : sf(e) ? lf(e) || eD(t, e, r, n, a) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : uD(t, e, n, o)) ? (mg(t, e, n), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && gg(t, e, n, o, a, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (fD(t, e) || // @ts-expect-error _def is private
  t._def.__asyncLoader && (/[A-Z]/.test(e) || !te(n))) ? mg(t, wr(e), n, a, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), gg(t, e, n, o));
};
function uD(t, e, r, n) {
  if (n)
    return !!(e === "innerHTML" || e === "textContent" || e in t && _g(e) && wt(r));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return _g(e) && te(r) ? !1 : e in t;
}
function fD(t, e) {
  const r = (
    // @ts-expect-error _def is private
    t._def.props
  );
  if (!r)
    return !1;
  const n = wr(e);
  return Array.isArray(r) ? r.some((i) => wr(i) === n) : Object.keys(r).some((i) => wr(i) === n);
}
const Wa = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return ct(e) ? (r) => Xl(e, r) : e;
};
function cD(t) {
  t.target.composing = !0;
}
function Sg(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Xr = /* @__PURE__ */ Symbol("_assign"), rl = /* @__PURE__ */ Symbol("_initialValue");
function ic(t, e, r) {
  return e && (t = t.trim()), r && (t = Os(t)), t;
}
const Bn = {
  created(t, { modifiers: { lazy: e, trim: r, number: n } }, i) {
    t.parentNode && (t.type === "text" ? t[rl] = t.defaultValue.replace(/[\r\n]/g, "") : t.type === "textarea" && (t[rl] = t.defaultValue.replace(/\r\n?/g, `
`))), t[Xr] = Wa(i);
    const a = n || i.props && i.props.type === "number";
    Kn(t, e ? "change" : "input", (o) => {
      o.target.composing || t[Xr](ic(t.value, r, a));
    }), (r || a) && Kn(t, "change", () => {
      t.value = ic(t.value, r, a);
    }), e || (Kn(t, "compositionstart", cD), Kn(t, "compositionend", Sg), Kn(t, "change", Sg));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e, modifiers: { trim: r, number: n } }) {
    const i = e ?? "", a = t[rl];
    delete t[rl], a !== void 0 && (t.type === "text" || t.type === "textarea") && t.value !== a ? t[Xr](ic(t.value, r, n)) : t.value = i;
  },
  beforeUpdate(t, { value: e, oldValue: r, modifiers: { lazy: n, trim: i, number: a } }, o) {
    if (t[Xr] = Wa(o), t.composing) return;
    const s = (a || t.type === "number") && !/^0\d/.test(t.value) ? Os(t.value) : t.value, l = e ?? "";
    if (s === l)
      return;
    const u = t.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === t && t.type !== "range" && (n && e === r || i && t.value.trim() === l) || (t.value = l);
  }
}, bg = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(t, e, r) {
    t[Xr] = Wa(r), Kn(t, "change", () => {
      const n = t._modelValue, i = ds(t), a = t.checked, o = t[Xr];
      if (ct(n)) {
        const s = od(n, i), l = s !== -1;
        if (a && !l)
          o(n.concat(i));
        else if (!a && l) {
          const u = [...n];
          u.splice(s, 1), o(u);
        }
      } else if (In(n)) {
        const s = new Set(n);
        a ? s.add(i) : s.delete(i), o(s);
      } else
        o(E1(t, a));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Tg,
  beforeUpdate(t, e, r) {
    t[Xr] = Wa(r), Tg(t, e, r);
  }
};
function Tg(t, { value: e, oldValue: r }, n) {
  t._modelValue = e;
  let i;
  if (ct(e))
    i = od(e, n.props.value) > -1;
  else if (In(e))
    i = e.has(n.props.value);
  else {
    if (e === r) return;
    i = Ln(e, E1(t, !0));
  }
  t.checked !== i && (t.checked = i);
}
const lo = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: r } }, n) {
    t._modelValue = e, Kn(t, "change", () => {
      const i = Array.prototype.filter.call(t.options, (l) => l.selected).map(
        (l) => r ? Os(ds(l)) : ds(l)
      ), a = t.multiple, o = a ? In(t._modelValue) ? new Set(i) : i : i[0], s = t._pendingValue = [
        a,
        a ? ct(o) ? i.slice() : i : o
      ];
      try {
        t[Xr](o);
      } finally {
        pd(() => {
          t._pendingValue === s && (t._pendingValue = void 0);
        });
      }
    }), t[Xr] = Wa(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e, modifiers: { number: r } }) {
    wg(t, e, r);
  },
  beforeUpdate(t, { value: e }, r) {
    t._modelValue = e, t[Xr] = Wa(r);
  },
  updated(t, { value: e, modifiers: { number: r } }) {
    const n = t._pendingValue;
    t._pendingValue = void 0, (!n || n[0] !== t.multiple || !hD(e, n[1], n[0])) && wg(t, e, r);
  }
};
function hD(t, e, r) {
  if (!r || ct(t)) return Ln(t, e);
  if (In(t)) {
    if (t.size !== e.length) return !1;
    for (const n of e)
      if (!t.has(n)) return !1;
    return !0;
  }
  return !1;
}
function wg(t, e, r = !1) {
  const n = t.multiple, i = ct(e);
  if (!(n && !i && !In(e))) {
    for (let a = 0, o = t.options.length; a < o; a++) {
      const s = t.options[a], l = ds(s);
      if (n)
        if (i) {
          const u = typeof l;
          u === "string" || u === "number" ? s.selected = e.some((f) => String(f) === String(l)) : s.selected = od(e, l) > -1;
        } else
          s.selected = e.has(l) || r && typeof l == "string" && e.has(Os(l));
      else if (Ln(ds(s), e)) {
        t.selectedIndex !== a && (t.selectedIndex = a);
        return;
      }
    }
    !n && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function ds(t) {
  return "_value" in t ? t._value : t.value;
}
function E1(t, e) {
  const r = e ? "_trueValue" : "_falseValue";
  return r in t ? t[r] : e;
}
const vD = ["ctrl", "shift", "alt", "meta"], dD = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => vD.some((r) => t[`${r}Key`] && !e.includes(r))
}, xg = (t, e) => {
  if (!t) return t;
  const r = t._withMods || (t._withMods = {}), n = e.join(".");
  return r[n] || (r[n] = ((i, ...a) => {
    for (let o = 0; o < e.length; o++) {
      const s = dD[e[o]];
      if (s && s(i, e)) return;
    }
    return t(i, ...a);
  }));
}, pD = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, gD = (t, e) => {
  const r = t._withKeys || (t._withKeys = {}), n = e.join(".");
  return r[n] || (r[n] = ((i) => {
    if (!("key" in i))
      return;
    const a = ci(i.key);
    if (e.some(
      (o) => o === a || pD[o] === a
    ))
      return t(i);
  }));
}, mD = /* @__PURE__ */ le({ patchProp: lD }, YC);
let Cg;
function yD() {
  return Cg || (Cg = wC(mD));
}
const _D = ((...t) => {
  const e = yD().createApp(...t), { mount: r } = e;
  return e.mount = (n) => {
    const i = bD(n);
    if (!i) return;
    const a = e._component;
    !wt(a) && !a.render && !a.template && (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = r(i, !1, SD(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
});
function SD(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function bD(t) {
  return te(t) ? document.querySelector(t) : t;
}
const P1 = document.querySelector("#storm")?.dataset.base ?? "/storm";
async function Ge(t, e, r) {
  const n = await fetch(P1 + "/api/" + t, {
    method: e === void 0 ? "GET" : "POST",
    credentials: "same-origin",
    headers: { Accept: "application/json", "Content-Type": "application/json", "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content ?? "" },
    body: e === void 0 ? void 0 : JSON.stringify(e)
  }), i = await n.json();
  if (!n.ok) throw new Error(i.message ?? `Request failed (${n.status})`);
  return i;
}
function Dg(t, e) {
  const r = URL.createObjectURL(new Blob([JSON.stringify(e, null, 2)], { type: "application/json" })), n = document.createElement("a");
  n.href = r, n.download = t, n.click(), URL.revokeObjectURL(r);
}
class TD {
  constructor(e = 120) {
    this.limit = e;
  }
  limit;
  particles = [];
  cursor = 0;
  ingest(e, r, n) {
    for (const i of e)
      i.cursor <= this.cursor || (this.cursor = i.cursor, n && this.particles.length < this.limit && this.particles.push({ time: r, duration: 1500, color: i.status_code === null ? "#b899ef" : i.status_code >= 400 ? "#f87e87" : i.duration_ms > 500 ? "#efbd6b" : "#6de6c6" }));
  }
  prune(e) {
    for (let r = this.particles.length - 1; r >= 0; r--) e - this.particles[r].time >= this.particles[r].duration && this.particles.splice(r, 1);
  }
  reset() {
    this.particles.splice(0), this.cursor = 0;
  }
}
const wD = { class: "traffic" }, xD = { class: "traffic-legend" }, CD = { key: 0 }, DD = /* @__PURE__ */ md({
  __name: "Traffic",
  props: {
    samples: {},
    active: { type: Boolean }
  },
  setup(t) {
    const e = t, r = /* @__PURE__ */ ae(), n = new TD(), i = n.particles;
    let a = 0, o;
    const s = window.matchMedia("(prefers-reduced-motion: reduce)");
    Ki(() => e.samples, (c) => {
      c.length || n.reset(), n.ingest(c, performance.now(), !s.matches && !document.hidden), l();
    }, { deep: !1 }), Ki(() => e.active, l);
    function l() {
      !a && !document.hidden && (a = requestAnimationFrame(u));
    }
    function u(c) {
      a = 0;
      const h = r.value, v = h?.getContext("2d");
      if (!h || !v) return;
      const d = h.clientWidth, p = h.clientHeight;
      v.clearRect(0, 0, d, p);
      const m = [[d * 0.15, p / 2], [d / 2, p / 2], [d * 0.85, p / 2]];
      v.strokeStyle = "#2a3b44", v.lineWidth = 1, v.setLineDash([4, 6]);
      for (let g = 0; g < 2; g++)
        v.beginPath(), v.moveTo(...m[g]), v.lineTo(...m[g + 1]), v.stroke();
      v.setLineDash([]);
      for (let g = 0; g < 3; g++) {
        const [y, _] = m[g];
        v.fillStyle = "#14231f", v.strokeStyle = "#416a5c", v.beginPath(), v.arc(y, _, g === 1 ? 31 : 23, 0, Math.PI * 2), v.fill(), v.stroke(), v.fillStyle = "#b6d6cc", v.textAlign = "center", v.font = "12px system-ui", v.fillText(["VUs", "ϟ", "HTTP"][g], y, _ + 4), v.fillStyle = "#8c9ba7", v.fillText(["Engine", "Laravel target", "Responses"][g], y, _ + 60);
      }
      for (let g = i.length - 1; g >= 0; g--) {
        const y = i[g], _ = (c - y.time) / y.duration;
        if (_ >= 1 || document.hidden || s.matches) {
          i.splice(g, 1);
          continue;
        }
        v.fillStyle = y.color, v.beginPath(), v.arc(d * (0.15 + 0.7 * _), p / 2 + Math.sin(_ * Math.PI * 2) * 18, 3, 0, Math.PI * 2), v.fill();
      }
      !s.matches && !document.hidden && (e.active || i.length) && l();
    }
    function f() {
      document.hidden ? (cancelAnimationFrame(a), a = 0, n.reset()) : l();
    }
    return df(() => {
      o = new ResizeObserver(() => {
        if (!r.value) return;
        const c = r.value, h = window.devicePixelRatio || 1;
        c.width = c.clientWidth * h, c.height = c.clientHeight * h, c.getContext("2d")?.scale(h, h), l();
      }), r.value && o.observe(r.value), document.addEventListener("visibilitychange", f), s.addEventListener("change", l), l();
    }), pf(() => {
      cancelAnimationFrame(a), o?.disconnect(), document.removeEventListener("visibilitychange", f), s.removeEventListener("change", l), n.reset();
    }), (c, h) => (lt(), ut("div", wD, [
      h[4] || (h[4] = L("div", { class: "panel-heading" }, [
        L("span", null, "TRAFFIC FLOW"),
        L("span", { class: "badge" }, "Observed samples · capped at 120 particles")
      ], -1)),
      L("canvas", {
        ref_key: "canvas",
        ref: r,
        role: "img",
        "aria-label": "Sampled requests moving from the load engine through Laravel to HTTP responses"
      }, null, 512),
      L("div", xD, [
        h[0] || (h[0] = L("span", null, "● Success", -1)),
        h[1] || (h[1] = L("span", { class: "amber" }, "● Slow", -1)),
        h[2] || (h[2] = L("span", { class: "red" }, "● HTTP error", -1)),
        h[3] || (h[3] = L("span", { class: "purple" }, "● Transport failure", -1)),
        Vo(s).matches ? (lt(), ut("span", CD, "Reduced motion enabled")) : ee("", !0)
      ])
    ]));
  }
});
var Hh = function(t, e) {
  return Hh = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Hh(t, e);
};
function Q(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Hh(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var MD = /* @__PURE__ */ (function() {
  function t() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return t;
})(), AD = /* @__PURE__ */ (function() {
  function t() {
    this.browser = new MD(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return t;
})(), Tt = new AD();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (Tt.wxa = !0, Tt.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? Tt.worker = !0 : !Tt.hasGlobalWindow || "Deno" in window || typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Node.js") > -1 ? (Tt.node = !0, Tt.svgSupported = !0) : ID(navigator.userAgent, Tt);
function ID(t, e) {
  var r = e.browser, n = t.match(/Firefox\/([\d.]+)/), i = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(t);
  n && (r.firefox = !0, r.version = n[1]), i && (r.ie = !0, r.version = i[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), e.svgSupported = typeof SVGRect < "u", e.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, e.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11);
  var s = e.domSupported = typeof document < "u";
  if (s) {
    var l = document.documentElement.style;
    e.transform3dSupported = (r.ie && "transition" in l || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in l) && !("OTransition" in l), e.transformSupported = e.transform3dSupported || r.ie && +r.version >= 9;
  }
}
var Td = 12, LD = "sans-serif", ai = Td + "px " + LD, ED = 20, PD = 100, RD = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function OD(t) {
  var e = {};
  if (typeof JSON > "u")
    return e;
  for (var r = 0; r < t.length; r++) {
    var n = String.fromCharCode(r + 32), i = (t.charCodeAt(r) - ED) / PD;
    e[n] = i;
  }
  return e;
}
var kD = OD(RD), Ke = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var t, e;
    return function(r, n) {
      if (!t) {
        var i = Ke.createCanvas();
        t = i && i.getContext("2d");
      }
      if (t)
        return e !== n && (e = t.font = n || ai), t.measureText(r);
      r = r || "", n = n || ai;
      var a = /((?:\d+)?\.?\d*)px/.exec(n), o = a && +a[1] || Td, s = 0;
      if (n.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = kD[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(t, e, r) {
    var n = new Image();
    return n.onload = e, n.onerror = r, n.src = t, n;
  },
  getTime: function() {
    return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
  }
}, R1 = eo([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(t, e) {
  return t["[object " + e + "]"] = !0, t;
}, {}), O1 = eo([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(t, e) {
  return t["[object " + e + "Array]"] = !0, t;
}, {}), Ns = Object.prototype.toString, _f = Array.prototype, BD = _f.forEach, ND = _f.filter, wd = _f.slice, FD = _f.map, Mg = (function() {
}).constructor, nl = Mg ? Mg.prototype : null, xd = "__proto__", ac = 2311, HD = Math.pow(2, 53) - 1;
function k1() {
  return ac >= HD && (ac = 0), ac++;
}
function Cd() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  typeof console < "u" && console.error.apply(console, t);
}
function xt(t) {
  if (t == null || typeof t != "object")
    return t;
  var e = t, r = Ns.call(t);
  if (r === "[object Array]") {
    if (!Xo(t)) {
      e = [];
      for (var n = 0, i = t.length; n < i; n++)
        e[n] = xt(t[n]);
    }
  } else if (O1[r]) {
    if (!Xo(t)) {
      var a = t.constructor;
      if (a.from)
        e = a.from(t);
      else {
        e = new a(t.length);
        for (var n = 0, i = t.length; n < i; n++)
          e[n] = t[n];
      }
    }
  } else if (!R1[r] && !Xo(t) && !ps(t)) {
    e = {};
    for (var o in t)
      t.hasOwnProperty(o) && o !== xd && (e[o] = xt(t[o]));
  }
  return e;
}
function Pt(t, e, r) {
  if (!ft(e) || !ft(t))
    return r ? xt(e) : t;
  for (var n in e)
    if (e.hasOwnProperty(n) && n !== xd) {
      var i = t[n], a = e[n];
      ft(a) && ft(i) && !J(a) && !J(i) && !ps(a) && !ps(i) && !Ag(a) && !Ag(i) && !Xo(a) && !Xo(i) ? Pt(i, a, r) : (r || !(n in t)) && (t[n] = xt(e[n]));
    }
  return t;
}
function q(t, e) {
  if (Object.assign)
    Object.assign(t, e);
  else
    for (var r in e)
      e.hasOwnProperty(r) && r !== xd && (t[r] = e[r]);
  return t;
}
function zD(t, e, r) {
  t = t || {};
  for (var n = 0; n < r.length; n++) {
    var i = r[n];
    t[i] = e[i];
  }
  return t;
}
function Ht(t, e, r) {
  for (var n = Kt(e), i = 0, a = n.length; i < a; i++) {
    var o = n[i];
    t[o] == null && (t[o] = e[o]);
  }
  return t;
}
function At(t, e) {
  if (t) {
    if (t.indexOf)
      return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
      if (t[r] === e)
        return r;
  }
  return -1;
}
function VD(t, e) {
  var r = t.prototype;
  function n() {
  }
  n.prototype = e.prototype, t.prototype = new n();
  for (var i in r)
    r.hasOwnProperty(i) && (t.prototype[i] = r[i]);
  t.prototype.constructor = t, t.superClass = e;
}
function vn(t, e, r) {
  if (t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, Object.getOwnPropertyNames)
    for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
      var a = n[i];
      a !== "constructor" && t[a] == null && (t[a] = e[a]);
    }
  else
    Ht(t, e);
}
function He(t) {
  return !t || typeof t == "string" ? !1 : typeof t.length == "number";
}
function P(t, e, r) {
  if (t && e)
    if (t.forEach && t.forEach === BD)
      t.forEach(e, r);
    else if (t.length === +t.length)
      for (var n = 0, i = t.length; n < i; n++)
        e.call(r, t[n], n, t);
    else
      for (var a in t)
        t.hasOwnProperty(a) && e.call(r, t[a], a, t);
}
function pt(t, e, r) {
  if (!t)
    return [];
  if (!e)
    return Dd(t);
  if (t.map && t.map === FD)
    return t.map(e, r);
  for (var n = [], i = 0, a = t.length; i < a; i++)
    n.push(e.call(r, t[i], i, t));
  return n;
}
function eo(t, e, r, n) {
  if (t && e) {
    for (var i = 0, a = t.length; i < a; i++)
      r = e.call(n, r, t[i], i, t);
    return r;
  }
}
function be(t, e, r) {
  if (!t)
    return [];
  if (!e)
    return Dd(t);
  if (t.filter && t.filter === ND)
    return t.filter(e, r);
  for (var n = [], i = 0, a = t.length; i < a; i++)
    e.call(r, t[i], i, t) && n.push(t[i]);
  return n;
}
function UD(t, e, r) {
  if (t && e) {
    for (var n = 0, i = t.length; n < i; n++)
      if (e.call(r, t[n], n, t))
        return t[n];
  }
}
function Kt(t) {
  if (!t)
    return [];
  if (Object.keys)
    return Object.keys(t);
  var e = [];
  for (var r in t)
    t.hasOwnProperty(r) && e.push(r);
  return e;
}
function GD(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return function() {
    return t.apply(e, r.concat(wd.call(arguments)));
  };
}
var Xt = nl && _t(nl.bind) ? nl.call.bind(nl.bind) : GD;
function oe(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  return function() {
    return t.apply(this, e.concat(wd.call(arguments)));
  };
}
function J(t) {
  return Array.isArray ? Array.isArray(t) : Ns.call(t) === "[object Array]";
}
function _t(t) {
  return typeof t == "function";
}
function at(t) {
  return typeof t == "string";
}
function zh(t) {
  return Ns.call(t) === "[object String]";
}
function qt(t) {
  return typeof t == "number";
}
function ft(t) {
  var e = typeof t;
  return e === "function" || !!t && e === "object";
}
function Ag(t) {
  return !!R1[Ns.call(t)];
}
function ze(t) {
  return !!O1[Ns.call(t)];
}
function ps(t) {
  return typeof t == "object" && typeof t.nodeType == "number" && typeof t.ownerDocument == "object";
}
function Sf(t) {
  return t.colorStops != null;
}
function WD(t) {
  return t.image != null;
}
function gs(t) {
  return t !== t;
}
function Tu() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] != null)
      return t[r];
}
function vt(t, e) {
  return t ?? e;
}
function ka(t, e, r) {
  return t ?? e ?? r;
}
function Dd(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  return wd.apply(t, e);
}
function Md(t) {
  if (typeof t == "number")
    return [t, t, t, t];
  var e = t.length;
  return e === 2 ? [t[0], t[1], t[0], t[1]] : e === 3 ? [t[0], t[1], t[2], t[1]] : t;
}
function En(t, e) {
  if (!t)
    throw new Error(e);
}
function Kr(t) {
  return t == null ? null : typeof t.trim == "function" ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var B1 = "__ec_primitive__";
function Vh(t) {
  t[B1] = !0;
}
function Xo(t) {
  return t[B1];
}
var YD = (function() {
  function t() {
    this.data = {};
  }
  return t.prototype.delete = function(e) {
    var r = this.has(e);
    return r && delete this.data[e], r;
  }, t.prototype.has = function(e) {
    return this.data.hasOwnProperty(e);
  }, t.prototype.get = function(e) {
    return this.data[e];
  }, t.prototype.set = function(e, r) {
    return this.data[e] = r, this;
  }, t.prototype.keys = function() {
    return Kt(this.data);
  }, t.prototype.forEach = function(e) {
    var r = this.data;
    for (var n in r)
      r.hasOwnProperty(n) && e(r[n], n);
  }, t;
})(), N1 = typeof Map == "function";
function $D() {
  return N1 ? /* @__PURE__ */ new Map() : new YD();
}
var XD = (function() {
  function t(e) {
    var r = J(e);
    this.data = $D();
    var n = this;
    e instanceof t ? e.each(i) : e && P(e, i);
    function i(a, o) {
      r ? n.set(a, o) : n.set(o, a);
    }
  }
  return t.prototype.hasKey = function(e) {
    return this.data.has(e);
  }, t.prototype.get = function(e) {
    return this.data.get(e);
  }, t.prototype.set = function(e, r) {
    return this.data.set(e, r), r;
  }, t.prototype.each = function(e, r) {
    this.data.forEach(function(n, i) {
      e.call(r, n, i);
    });
  }, t.prototype.keys = function() {
    var e = this.data.keys();
    return N1 ? Array.from(e) : e;
  }, t.prototype.removeKey = function(e) {
    this.data.delete(e);
  }, t;
})();
function gt(t) {
  return new XD(t);
}
function KD(t, e) {
  for (var r = new t.constructor(t.length + e.length), n = 0; n < t.length; n++)
    r[n] = t[n];
  for (var i = t.length, n = 0; n < e.length; n++)
    r[n + i] = e[n];
  return r;
}
function bf(t, e) {
  var r;
  if (Object.create)
    r = Object.create(t);
  else {
    var n = function() {
    };
    n.prototype = t, r = new n();
  }
  return e && q(r, e), r;
}
function F1(t) {
  var e = t.style;
  e.webkitUserSelect = "none", e.userSelect = "none", e.webkitTapHighlightColor = "rgba(0,0,0,0)", e["-webkit-touch-callout"] = "none";
}
function qe(t, e) {
  return t.hasOwnProperty(e);
}
function we() {
}
var qD = 180 / Math.PI;
function ro(t, e) {
  return t == null && (t = 0), e == null && (e = 0), [t, e];
}
function ZD(t) {
  return [t[0], t[1]];
}
function oc(t, e, r) {
  return t[0] = e, t[1] = r, t;
}
function Ig(t, e, r) {
  return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t;
}
function jD(t, e, r) {
  return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t;
}
function JD(t) {
  return Math.sqrt(QD(t));
}
function QD(t) {
  return t[0] * t[0] + t[1] * t[1];
}
function sc(t, e, r) {
  return t[0] = e[0] * r, t[1] = e[1] * r, t;
}
function tM(t, e) {
  var r = JD(e);
  return r === 0 ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / r, t[1] = e[1] / r), t;
}
function Uh(t, e) {
  return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
}
var eM = Uh;
function rM(t, e) {
  return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
}
var Ba = rM;
function dr(t, e, r) {
  var n = e[0], i = e[1];
  return t[0] = r[0] * n + r[2] * i + r[4], t[1] = r[1] * n + r[3] * i + r[5], t;
}
function Ma(t, e, r) {
  return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t;
}
function Aa(t, e, r) {
  return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t;
}
var la = /* @__PURE__ */ (function() {
  function t(e, r) {
    this.target = e, this.topTarget = r && r.topTarget;
  }
  return t;
})(), nM = (function() {
  function t(e) {
    this.handler = e, e.on("mousedown", this._dragStart, this), e.on("mousemove", this._drag, this), e.on("mouseup", this._dragEnd, this);
  }
  return t.prototype._dragStart = function(e) {
    for (var r = e.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.handler.dispatchToElement(new la(r, e), "dragstart", e.event));
  }, t.prototype._drag = function(e) {
    var r = this._draggingTarget;
    if (r) {
      var n = e.offsetX, i = e.offsetY, a = n - this._x, o = i - this._y;
      this._x = n, this._y = i, r.drift(a, o, e), this.handler.dispatchToElement(new la(r, e), "drag", e.event);
      var s = this.handler.findHover(n, i, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new la(l, e), "dragleave", e.event), s && s !== l && this.handler.dispatchToElement(new la(s, e), "dragenter", e.event));
    }
  }, t.prototype._dragEnd = function(e) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new la(r, e), "dragend", e.event), this._dropTarget && this.handler.dispatchToElement(new la(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null;
  }, t;
})(), dn = (function() {
  function t(e) {
    e && (this._$eventProcessor = e);
  }
  return t.prototype.on = function(e, r, n, i) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof r == "function" && (i = n, n = r, r = null), !n || !e)
      return this;
    var o = this._$eventProcessor;
    r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)), a[e] || (a[e] = []);
    for (var s = 0; s < a[e].length; s++)
      if (a[e][s].h === n)
        return this;
    var l = {
      h: n,
      query: r,
      ctx: i || this,
      callAtLast: n.zrEventfulCallAtLast
    }, u = a[e].length - 1, f = a[e][u];
    return f && f.callAtLast ? a[e].splice(u, 0, l) : a[e].push(l), this;
  }, t.prototype.isSilent = function(e) {
    var r = this._$handlers;
    return !r || !r[e] || !r[e].length;
  }, t.prototype.off = function(e, r) {
    var n = this._$handlers;
    if (!n)
      return this;
    if (!e)
      return this._$handlers = {}, this;
    if (r) {
      if (n[e]) {
        for (var i = [], a = 0, o = n[e].length; a < o; a++)
          n[e][a].h !== r && i.push(n[e][a]);
        n[e] = i;
      }
      n[e] && n[e].length === 0 && delete n[e];
    } else
      delete n[e];
    return this;
  }, t.prototype.trigger = function(e) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (!this._$handlers)
      return this;
    var i = this._$handlers[e], a = this._$eventProcessor;
    if (i)
      for (var o = r.length, s = i.length, l = 0; l < s; l++) {
        var u = i[l];
        if (!(a && a.filter && u.query != null && !a.filter(e, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, r[0]);
              break;
            case 2:
              u.h.call(u.ctx, r[0], r[1]);
              break;
            default:
              u.h.apply(u.ctx, r);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(e), this;
  }, t.prototype.triggerWithContext = function(e) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (!this._$handlers)
      return this;
    var i = this._$handlers[e], a = this._$eventProcessor;
    if (i)
      for (var o = r.length, s = r[o - 1], l = i.length, u = 0; u < l; u++) {
        var f = i[u];
        if (!(a && a.filter && f.query != null && !a.filter(e, f.query)))
          switch (o) {
            case 0:
              f.h.call(s);
              break;
            case 1:
              f.h.call(s, r[0]);
              break;
            case 2:
              f.h.call(s, r[0], r[1]);
              break;
            default:
              f.h.apply(s, r.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(e), this;
  }, t;
})(), iM = Math.log(2);
function Gh(t, e, r, n, i, a) {
  var o = n + "-" + i, s = t.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (e === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~i) / iM);
    return t[r][l];
  }
  for (var u = n | 1 << r, f = r + 1; n & 1 << f; )
    f++;
  for (var c = 0, h = 0, v = 0; h < s; h++) {
    var d = 1 << h;
    d & i || (c += (v % 2 ? -1 : 1) * t[r][h] * Gh(t, e - 1, f, u, i | d, a), v++);
  }
  return a[o] = c, c;
}
function Lg(t, e) {
  var r = [
    [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
    [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
    [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
    [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
    [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
    [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
    [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
    [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
  ], n = {}, i = Gh(r, 8, 0, 0, 0, n);
  if (i !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Gh(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, n) / i * e[o];
    return function(l, u, f) {
      var c = u * a[6] + f * a[7] + 1;
      l[0] = (u * a[0] + f * a[1] + a[2]) / c, l[1] = (u * a[3] + f * a[4] + a[5]) / c;
    };
  }
}
var wu = "___zrEVENTSAVED", lc = [];
function aM(t, e, r, n, i) {
  return Wh(lc, e, n, i, !0) && Wh(t, r, lc[0], lc[1]);
}
function oM(t, e) {
  t && r(t), e && r(e);
  function r(n) {
    var i = n[wu];
    i && (i.clearMarkers && i.clearMarkers(), delete n[wu]);
  }
}
function Wh(t, e, r, n, i) {
  if (e.getBoundingClientRect && Tt.domSupported && !H1(e)) {
    var a = e[wu] || (e[wu] = {}), o = sM(e, a), s = lM(o, a, i);
    if (s)
      return s(t, r, n), !0;
  }
  return !1;
}
function sM(t, e) {
  var r = e.markers;
  if (r)
    return r;
  r = e.markers = [];
  for (var n = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, l = a % 2, u = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      n[l] + ":0",
      i[u] + ":0",
      n[1 - l] + ":auto",
      i[1 - u] + ":auto",
      ""
    ].join("!important;"), t.appendChild(o), r.push(o);
  }
  return e.clearMarkers = function() {
    P(r, function(f) {
      f.parentNode && f.parentNode.removeChild(f);
    });
  }, r;
}
function lM(t, e, r) {
  for (var n = r ? "invTrans" : "trans", i = e[n], a = e.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var f = t[u].getBoundingClientRect(), c = 2 * u, h = f.left, v = f.top;
    o.push(h, v), l = l && a && h === a[c] && v === a[c + 1], s.push(t[u].offsetLeft, t[u].offsetTop);
  }
  return l && i ? i : (e.srcCoords = o, e[n] = r ? Lg(s, o) : Lg(o, s));
}
function H1(t) {
  return t.nodeName.toUpperCase() === "CANVAS";
}
var uM = /([&<>"'])/g, fM = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function ke(t) {
  return t == null ? "" : (t + "").replace(uM, function(e, r) {
    return fM[r];
  });
}
var cM = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, uc = [], hM = Tt.browser.firefox && +Tt.browser.version.split(".")[0] < 39;
function Yh(t, e, r, n) {
  return r = r || {}, n ? Eg(t, e, r) : hM && e.layerX != null && e.layerX !== e.offsetX ? (r.zrX = e.layerX, r.zrY = e.layerY) : e.offsetX != null ? (r.zrX = e.offsetX, r.zrY = e.offsetY) : Eg(t, e, r), r;
}
function Eg(t, e, r) {
  if (Tt.domSupported && t.getBoundingClientRect) {
    var n = e.clientX, i = e.clientY;
    if (H1(t)) {
      var a = t.getBoundingClientRect();
      r.zrX = n - a.left, r.zrY = i - a.top;
      return;
    } else if (Wh(uc, t, n, i)) {
      r.zrX = uc[0], r.zrY = uc[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function Ad(t) {
  return t || window.event;
}
function rr(t, e, r) {
  if (e = Ad(e), e.zrX != null)
    return e;
  var n = e.type, i = n && n.indexOf("touch") >= 0;
  if (i) {
    var o = n !== "touchend" ? e.targetTouches[0] : e.changedTouches[0];
    o && Yh(t, o, e, r);
  } else {
    Yh(t, e, e, r);
    var a = vM(e);
    e.zrDelta = a ? a / 120 : -(e.detail || 0) / 3;
  }
  var s = e.button;
  return e.which == null && s !== void 0 && cM.test(e.type) && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e;
}
function vM(t) {
  var e = t.wheelDelta;
  if (e)
    return e;
  var r = t.deltaX, n = t.deltaY;
  if (r == null || n == null)
    return e;
  var i = Math.abs(n !== 0 ? n : r), a = n > 0 ? -1 : n < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * i * a;
}
function dM(t, e, r, n) {
  t.addEventListener(e, r, n);
}
function pM(t, e, r, n) {
  t.removeEventListener(e, r, n);
}
var z1 = function(t) {
  t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
}, gM = (function() {
  function t() {
    this._track = [];
  }
  return t.prototype.recognize = function(e, r, n) {
    return this._doTrack(e, r, n), this._recognize(e);
  }, t.prototype.clear = function() {
    return this._track.length = 0, this;
  }, t.prototype._doTrack = function(e, r, n) {
    var i = e.touches;
    if (i) {
      for (var a = {
        points: [],
        touches: [],
        target: r,
        event: e
      }, o = 0, s = i.length; o < s; o++) {
        var l = i[o], u = Yh(n, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, t.prototype._recognize = function(e) {
    for (var r in fc)
      if (fc.hasOwnProperty(r)) {
        var n = fc[r](this._track, e);
        if (n)
          return n;
      }
  }, t;
})();
function Pg(t) {
  var e = t[1][0] - t[0][0], r = t[1][1] - t[0][1];
  return Math.sqrt(e * e + r * r);
}
function mM(t) {
  return [
    (t[0][0] + t[1][0]) / 2,
    (t[0][1] + t[1][1]) / 2
  ];
}
var fc = {
  pinch: function(t, e) {
    var r = t.length;
    if (r) {
      var n = (t[r - 1] || {}).points, i = (t[r - 2] || {}).points || n;
      if (i && i.length > 1 && n && n.length > 1) {
        var a = Pg(n) / Pg(i);
        !isFinite(a) && (a = 1), e.pinchScale = a;
        var o = mM(n);
        return e.pinchX = o[0], e.pinchY = o[1], {
          type: "pinch",
          target: t[0].target,
          event: e
        };
      }
    }
  }
};
function jr() {
  return [1, 0, 0, 1, 0, 0];
}
function Fs(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
}
function Id(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function Ko(t, e, r) {
  var n = e[0] * r[0] + e[2] * r[1], i = e[1] * r[0] + e[3] * r[1], a = e[0] * r[2] + e[2] * r[3], o = e[1] * r[2] + e[3] * r[3], s = e[0] * r[4] + e[2] * r[5] + e[4], l = e[1] * r[4] + e[3] * r[5] + e[5];
  return t[0] = n, t[1] = i, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;
}
function $h(t, e, r) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + r[0], t[5] = e[5] + r[1], t;
}
function Ld(t, e, r, n) {
  n === void 0 && (n = [0, 0]);
  var i = e[0], a = e[2], o = e[4], s = e[1], l = e[3], u = e[5], f = Math.sin(r), c = Math.cos(r);
  return t[0] = i * c + s * f, t[1] = -i * f + s * c, t[2] = a * c + l * f, t[3] = -a * f + c * l, t[4] = c * (o - n[0]) + f * (u - n[1]) + n[0], t[5] = c * (u - n[1]) - f * (o - n[0]) + n[1], t;
}
function yM(t, e, r) {
  var n = r[0], i = r[1];
  return t[0] = e[0] * n, t[1] = e[1] * i, t[2] = e[2] * n, t[3] = e[3] * i, t[4] = e[4] * n, t[5] = e[5] * i, t;
}
function Hs(t, e) {
  var r = e[0], n = e[2], i = e[4], a = e[1], o = e[3], s = e[5], l = r * o - a * n;
  return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = r * l, t[4] = (n * s - o * i) * l, t[5] = (a * i - r * s) * l, t) : null;
}
var Vt = (function() {
  function t(e, r) {
    this.x = e || 0, this.y = r || 0;
  }
  return t.prototype.copy = function(e) {
    return this.x = e.x, this.y = e.y, this;
  }, t.prototype.clone = function() {
    return new t(this.x, this.y);
  }, t.prototype.set = function(e, r) {
    return this.x = e, this.y = r, this;
  }, t.prototype.equal = function(e) {
    return e.x === this.x && e.y === this.y;
  }, t.prototype.add = function(e) {
    return this.x += e.x, this.y += e.y, this;
  }, t.prototype.scale = function(e) {
    this.x *= e, this.y *= e;
  }, t.prototype.scaleAndAdd = function(e, r) {
    this.x += e.x * r, this.y += e.y * r;
  }, t.prototype.sub = function(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }, t.prototype.dot = function(e) {
    return this.x * e.x + this.y * e.y;
  }, t.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, t.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, t.prototype.normalize = function() {
    var e = this.len();
    return this.x /= e, this.y /= e, this;
  }, t.prototype.distance = function(e) {
    var r = this.x - e.x, n = this.y - e.y;
    return Math.sqrt(r * r + n * n);
  }, t.prototype.distanceSquare = function(e) {
    var r = this.x - e.x, n = this.y - e.y;
    return r * r + n * n;
  }, t.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, t.prototype.transform = function(e) {
    if (e) {
      var r = this.x, n = this.y;
      return this.x = e[0] * r + e[2] * n + e[4], this.y = e[1] * r + e[3] * n + e[5], this;
    }
  }, t.prototype.toArray = function(e) {
    return e[0] = this.x, e[1] = this.y, e;
  }, t.prototype.fromArray = function(e) {
    this.x = e[0], this.y = e[1];
  }, t.set = function(e, r, n) {
    e.x = r, e.y = n;
  }, t.copy = function(e, r) {
    e.x = r.x, e.y = r.y;
  }, t.len = function(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }, t.lenSquare = function(e) {
    return e.x * e.x + e.y * e.y;
  }, t.dot = function(e, r) {
    return e.x * r.x + e.y * r.y;
  }, t.add = function(e, r, n) {
    e.x = r.x + n.x, e.y = r.y + n.y;
  }, t.sub = function(e, r, n) {
    e.x = r.x - n.x, e.y = r.y - n.y;
  }, t.scale = function(e, r, n) {
    e.x = r.x * n, e.y = r.y * n;
  }, t.scaleAndAdd = function(e, r, n, i) {
    e.x = r.x + n.x * i, e.y = r.y + n.y * i;
  }, t.lerp = function(e, r, n, i) {
    var a = 1 - i;
    e.x = a * r.x + i * n.x, e.y = a * r.y + i * n.y;
  }, t;
})(), Gi = Math.min, Ia = Math.max, Xh = Math.abs, Rg = ["x", "y"], _M = ["width", "height"], pi = new Vt(), gi = new Vt(), mi = new Vt(), yi = new Vt(), $e = V1(), Eo = $e.minTv, Kh = $e.maxTv, qo = [0, 0], mt = (function() {
  function t(e, r, n, i) {
    cc(this, e, r, n, i);
  }
  return t.set = function(e, r, n, i, a) {
    return i < 0 && (r = r + i, i = -i), a < 0 && (n = n + a, a = -a), e.x = r, e.y = n, e.width = i, e.height = a, e;
  }, t.prototype.union = function(e) {
    var r = Gi(e.x, this.x), n = Gi(e.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Ia(e.x + e.width, this.x + this.width) - r : this.width = e.width, isFinite(this.y) && isFinite(this.height) ? this.height = Ia(e.y + e.height, this.y + this.height) - n : this.height = e.height, this.x = r, this.y = n;
  }, t.prototype.applyTransform = function(e) {
    t.applyTransform(this, this, e);
  }, t.prototype.calculateTransform = function(e) {
    return SM(jr(), this, e);
  }, t.prototype.intersect = function(e, r, n) {
    return t.intersect(this, e, r, n);
  }, t.intersect = function(e, r, n, i) {
    n && Vt.set(n, 0, 0);
    var a = i && i.outIntersectRect || null, o = i && i.clamp;
    if (a && (a.x = a.y = a.width = a.height = NaN), !e || !r)
      return !1;
    e instanceof t || (e = cc(bM, e.x, e.y, e.width, e.height)), r instanceof t || (r = cc(TM, r.x, r.y, r.width, r.height));
    var s = !!n;
    $e.reset(i, s);
    var l = $e.touchThreshold, u = e.x + l, f = e.x + e.width - l, c = e.y + l, h = e.y + e.height - l, v = r.x + l, d = r.x + r.width - l, p = r.y + l, m = r.y + r.height - l;
    if (u > f || c > h || v > d || p > m)
      return !1;
    var g = !(f < v || d < u || h < p || m < c);
    return (s || a) && (qo[0] = 1 / 0, qo[1] = 0, kg(u, f, v, d, 0, s, a, o), kg(c, h, p, m, 1, s, a, o), s && Vt.copy(n, g ? $e.useDir ? $e.dirMinTv : Eo : Kh)), g;
  }, t.contain = function(e, r, n) {
    return r >= e.x && r <= e.x + e.width && n >= e.y && n <= e.y + e.height;
  }, t.prototype.contain = function(e, r) {
    return t.contain(this, e, r);
  }, t.prototype.clone = function() {
    return new t(this.x, this.y, this.width, this.height);
  }, t.prototype.copy = function(e) {
    Og(this, e);
  }, t.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, t.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, t.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, t.create = function(e) {
    return new t(e ? e.x : 0, e ? e.y : 0, e ? e.width : 0, e ? e.height : 0);
  }, t.copy = function(e, r) {
    return e.x = r.x, e.y = r.y, e.width = r.width, e.height = r.height, e;
  }, t.applyTransform = function(e, r, n) {
    if (!n) {
      e !== r && Og(e, r);
      return;
    }
    if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
      var i = n[0], a = n[3], o = n[4], s = n[5];
      e.x = r.x * i + o, e.y = r.y * a + s, e.width = r.width * i, e.height = r.height * a, e.width < 0 && (e.x += e.width, e.width = -e.width), e.height < 0 && (e.y += e.height, e.height = -e.height);
      return;
    }
    pi.x = mi.x = r.x, pi.y = yi.y = r.y, gi.x = yi.x = r.x + r.width, gi.y = mi.y = r.y + r.height, pi.transform(n), yi.transform(n), gi.transform(n), mi.transform(n), e.x = Gi(pi.x, gi.x, mi.x, yi.x), e.y = Gi(pi.y, gi.y, mi.y, yi.y);
    var l = Ia(pi.x, gi.x, mi.x, yi.x), u = Ia(pi.y, gi.y, mi.y, yi.y);
    e.width = l - e.x, e.height = u - e.y;
  }, t.calculateTransform = function(e, r, n) {
    var i = n.width / r.width, a = n.height / r.height;
    return e = Fs(e || []), $h(e, e, oc(hc, -r.x, -r.y)), yM(e, e, oc(hc, i, a)), $h(e, e, oc(hc, n.x, n.y)), e;
  }, t;
})();
mt.create;
var cc = mt.set, Og = mt.copy, SM = mt.calculateTransform;
mt.applyTransform;
mt.contain;
var bM = new mt(0, 0, 0, 0), TM = new mt(0, 0, 0, 0), hc = [];
function kg(t, e, r, n, i, a, o, s) {
  var l = Xh(e - r), u = Xh(n - t), f = Gi(l, u), c = Rg[i], h = Rg[1 - i], v = _M[i];
  e < r || n < t ? l < u ? (a && (Kh[c] = -l), s && (o[c] = e, o[v] = 0)) : (a && (Kh[c] = u), s && (o[c] = t, o[v] = 0)) : (o && (o[c] = Ia(t, r), o[v] = Gi(e, n) - o[c]), a && (f < qo[0] || $e.useDir) && (qo[0] = Gi(f, qo[0]), (l < u || !$e.bidirectional) && (Eo[c] = l, Eo[h] = 0, $e.useDir && $e.calcDirMTV()), (l >= u || !$e.bidirectional) && (Eo[c] = -u, Eo[h] = 0, $e.useDir && $e.calcDirMTV())));
}
function V1() {
  var t = 0, e = new Vt(), r = new Vt(), n = {
    minTv: new Vt(),
    maxTv: new Vt(),
    useDir: !1,
    dirMinTv: new Vt(),
    touchThreshold: 0,
    bidirectional: !0,
    negativeSize: !1,
    reset: function(a, o) {
      n.touchThreshold = 0, a && a.touchThreshold != null && (n.touchThreshold = Ia(0, a.touchThreshold)), n.negativeSize = !1, o && (n.minTv.set(1 / 0, 1 / 0), n.maxTv.set(0, 0), n.useDir = !1, a && a.direction != null && (n.useDir = !0, n.dirMinTv.copy(n.minTv), r.copy(n.minTv), t = a.direction, n.bidirectional = a.bidirectional == null || !!a.bidirectional, n.bidirectional || e.set(Math.cos(t), Math.sin(t))));
    },
    calcDirMTV: function() {
      var a = n.minTv, o = n.dirMinTv, s = a.y * a.y + a.x * a.x, l = Math.sin(t), u = Math.cos(t), f = l * a.y + u * a.x;
      if (i(f)) {
        i(a.x) && i(a.y) && o.set(0, 0);
        return;
      }
      if (r.x = s * u / f, r.y = s * l / f, i(r.x) && i(r.y)) {
        o.set(0, 0);
        return;
      }
      (n.bidirectional || e.dot(r) > 0) && r.len() < o.len() && o.copy(r);
    }
  };
  function i(a) {
    return Xh(a) < 1e-10;
  }
  return n;
}
var U1 = "silent";
function wM(t, e, r) {
  return {
    type: t,
    event: r,
    target: e.target,
    topTarget: e.topTarget,
    cancelBubble: !1,
    offsetX: r.zrX,
    offsetY: r.zrY,
    gestureEvent: r.gestureEvent,
    pinchX: r.pinchX,
    pinchY: r.pinchY,
    pinchScale: r.pinchScale,
    wheelDelta: r.zrDelta,
    zrByTouch: r.zrByTouch,
    which: r.which,
    stop: xM
  };
}
function xM() {
  z1(this.event);
}
var CM = (function(t) {
  Q(e, t);
  function e() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return e.prototype.dispose = function() {
  }, e.prototype.setCursor = function() {
  }, e;
})(dn), uo = /* @__PURE__ */ (function() {
  function t(e, r) {
    this.x = e, this.y = r;
  }
  return t;
})(), DM = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], vc = new mt(0, 0, 0, 0), G1 = (function(t) {
  Q(e, t);
  function e(r, n, i, a, o) {
    var s = t.call(this) || this;
    return s._hovered = new uo(0, 0), s.storage = r, s.painter = n, s.painterRoot = a, s._pointerSize = o, i = i || new CM(), s.proxy = null, s.setHandlerProxy(i), s._draggingMgr = new nM(s), s;
  }
  return e.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (P(DM, function(n) {
      r.on && r.on(n, this[n], this);
    }, this), r.handler = this), this.proxy = r;
  }, e.prototype.mousemove = function(r) {
    var n = r.zrX, i = r.zrY, a = W1(this, n, i), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new uo(n, i) : this.findHover(n, i), u = l.target, f = this.proxy;
    f.setCursor && f.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, e.prototype.mouseout = function(r) {
    var n = r.zrEventControl;
    n !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), n !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, e.prototype.resize = function() {
    this._hovered = new uo(0, 0);
  }, e.prototype.dispatch = function(r, n) {
    var i = this[r];
    i && i.call(this, n);
  }, e.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, e.prototype.setCursorStyle = function(r) {
    var n = this.proxy;
    n.setCursor && n.setCursor(r);
  }, e.prototype.dispatchToElement = function(r, n, i) {
    r = r || {};
    var a = r.target;
    if (!(a && a.silent)) {
      for (var o = "on" + n, s = wM(n, r, i); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(n, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(n, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(n, s);
      }));
    }
  }, e.prototype.findHover = function(r, n, i) {
    var a = this.storage.getDisplayList(), o = new uo(r, n);
    if (Bg(a, o, r, n, i), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, f = new mt(r - u, n - u, l, l), c = a.length - 1; c >= 0; c--) {
        var h = a[c];
        h !== i && !h.ignore && !h.ignoreCoarsePointer && (!h.parent || !h.parent.ignoreCoarsePointer) && (vc.copy(h.getBoundingRect()), h.transform && vc.applyTransform(h.transform), vc.intersect(f) && s.push(h));
      }
      if (s.length)
        for (var v = 4, d = Math.PI / 12, p = Math.PI * 2, m = 0; m < u; m += v)
          for (var g = 0; g < p; g += d) {
            var y = r + m * Math.cos(g), _ = n + m * Math.sin(g);
            if (Bg(s, o, y, _, i), o.target)
              return o;
          }
    }
    return o;
  }, e.prototype.processGesture = function(r, n) {
    this._gestureMgr || (this._gestureMgr = new gM());
    var i = this._gestureMgr;
    n === "start" && i.clear();
    var a = i.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (n === "end" && i.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new uo();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, e;
})(dn);
P(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(t) {
  G1.prototype[t] = function(e) {
    var r = e.zrX, n = e.zrY, i = W1(this, r, n), a, o;
    if ((t !== "mouseup" || !i) && (a = this.findHover(r, n), o = a.target), t === "mousedown")
      this._downEl = o, this._downPoint = [e.zrX, e.zrY], this._upEl = o;
    else if (t === "mouseup")
      this._upEl = o;
    else if (t === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || eM(this._downPoint, [e.zrX, e.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, t, e);
  };
});
function MM(t, e, r) {
  if (t[t.rectHover ? "rectContain" : "contain"](e, r)) {
    for (var n = t, i = void 0, a = !1; n; ) {
      if (n.ignoreClip && (a = !0), !a) {
        var o = n.getClipPath();
        if (o && !o.contain(e, r))
          return !1;
      }
      n.silent && (i = !0);
      var s = n.__hostTarget;
      n = s ? n.ignoreHostSilent ? null : s : n.parent;
    }
    return i ? U1 : !0;
  }
  return !1;
}
function Bg(t, e, r, n, i) {
  for (var a = t.length - 1; a >= 0; a--) {
    var o = t[a], s = void 0;
    if (o !== i && !o.ignore && (s = MM(o, r, n)) && (!e.topTarget && (e.topTarget = o), s !== U1)) {
      e.target = o;
      break;
    }
  }
}
function W1(t, e, r) {
  var n = t.painter;
  return e < 0 || e > n.getWidth() || r < 0 || r > n.getHeight();
}
var Y1 = 32, fo = 7;
function AM(t) {
  for (var e = 0; t >= Y1; )
    e |= t & 1, t >>= 1;
  return t + e;
}
function Ng(t, e, r, n) {
  var i = e + 1;
  if (i === r)
    return 1;
  if (n(t[i++], t[e]) < 0) {
    for (; i < r && n(t[i], t[i - 1]) < 0; )
      i++;
    IM(t, e, i);
  } else
    for (; i < r && n(t[i], t[i - 1]) >= 0; )
      i++;
  return i - e;
}
function IM(t, e, r) {
  for (r--; e < r; ) {
    var n = t[e];
    t[e++] = t[r], t[r--] = n;
  }
}
function Fg(t, e, r, n, i) {
  for (n === e && n++; n < r; n++) {
    for (var a = t[n], o = e, s = n, l; o < s; )
      l = o + s >>> 1, i(a, t[l]) < 0 ? s = l : o = l + 1;
    var u = n - o;
    switch (u) {
      case 3:
        t[o + 3] = t[o + 2];
      case 2:
        t[o + 2] = t[o + 1];
      case 1:
        t[o + 1] = t[o];
        break;
      default:
        for (; u > 0; )
          t[o + u] = t[o + u - 1], u--;
    }
    t[o] = a;
  }
}
function dc(t, e, r, n, i, a) {
  var o = 0, s = 0, l = 1;
  if (a(t, e[r + i]) > 0) {
    for (s = n - i; l < s && a(t, e[r + i + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i;
  } else {
    for (s = i + 1; l < s && a(t, e[r + i - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(t, e[r + f]) > 0 ? o = f + 1 : l = f;
  }
  return l;
}
function pc(t, e, r, n, i, a) {
  var o = 0, s = 0, l = 1;
  if (a(t, e[r + i]) < 0) {
    for (s = i + 1; l < s && a(t, e[r + i - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u;
  } else {
    for (s = n - i; l < s && a(t, e[r + i + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(t, e[r + f]) < 0 ? l = f : o = f + 1;
  }
  return l;
}
function LM(t, e) {
  var r = fo, n, i, a = 0, o = [];
  n = [], i = [];
  function s(v, d) {
    n[a] = v, i[a] = d, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var v = a - 2;
      if (v >= 1 && i[v - 1] <= i[v] + i[v + 1] || v >= 2 && i[v - 2] <= i[v] + i[v - 1])
        i[v - 1] < i[v + 1] && v--;
      else if (i[v] > i[v + 1])
        break;
      f(v);
    }
  }
  function u() {
    for (; a > 1; ) {
      var v = a - 2;
      v > 0 && i[v - 1] < i[v + 1] && v--, f(v);
    }
  }
  function f(v) {
    var d = n[v], p = i[v], m = n[v + 1], g = i[v + 1];
    i[v] = p + g, v === a - 3 && (n[v + 1] = n[v + 2], i[v + 1] = i[v + 2]), a--;
    var y = pc(t[m], t, d, p, 0, e);
    d += y, p -= y, p !== 0 && (g = dc(t[d + p - 1], t, m, g, g - 1, e), g !== 0 && (p <= g ? c(d, p, m, g) : h(d, p, m, g)));
  }
  function c(v, d, p, m) {
    var g = 0;
    for (g = 0; g < d; g++)
      o[g] = t[v + g];
    var y = 0, _ = p, S = v;
    if (t[S++] = t[_++], --m === 0) {
      for (g = 0; g < d; g++)
        t[S + g] = o[y + g];
      return;
    }
    if (d === 1) {
      for (g = 0; g < m; g++)
        t[S + g] = t[_ + g];
      t[S + m] = o[y];
      return;
    }
    for (var b = r, T, C, E; ; ) {
      T = 0, C = 0, E = !1;
      do
        if (e(t[_], o[y]) < 0) {
          if (t[S++] = t[_++], C++, T = 0, --m === 0) {
            E = !0;
            break;
          }
        } else if (t[S++] = o[y++], T++, C = 0, --d === 1) {
          E = !0;
          break;
        }
      while ((T | C) < b);
      if (E)
        break;
      do {
        if (T = pc(t[_], o, y, d, 0, e), T !== 0) {
          for (g = 0; g < T; g++)
            t[S + g] = o[y + g];
          if (S += T, y += T, d -= T, d <= 1) {
            E = !0;
            break;
          }
        }
        if (t[S++] = t[_++], --m === 0) {
          E = !0;
          break;
        }
        if (C = dc(o[y], t, _, m, 0, e), C !== 0) {
          for (g = 0; g < C; g++)
            t[S + g] = t[_ + g];
          if (S += C, _ += C, m -= C, m === 0) {
            E = !0;
            break;
          }
        }
        if (t[S++] = o[y++], --d === 1) {
          E = !0;
          break;
        }
        b--;
      } while (T >= fo || C >= fo);
      if (E)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (r = b, r < 1 && (r = 1), d === 1) {
      for (g = 0; g < m; g++)
        t[S + g] = t[_ + g];
      t[S + m] = o[y];
    } else {
      if (d === 0)
        throw new Error();
      for (g = 0; g < d; g++)
        t[S + g] = o[y + g];
    }
  }
  function h(v, d, p, m) {
    var g = 0;
    for (g = 0; g < m; g++)
      o[g] = t[p + g];
    var y = v + d - 1, _ = m - 1, S = p + m - 1, b = 0, T = 0;
    if (t[S--] = t[y--], --d === 0) {
      for (b = S - (m - 1), g = 0; g < m; g++)
        t[b + g] = o[g];
      return;
    }
    if (m === 1) {
      for (S -= d, y -= d, T = S + 1, b = y + 1, g = d - 1; g >= 0; g--)
        t[T + g] = t[b + g];
      t[S] = o[_];
      return;
    }
    for (var C = r; ; ) {
      var E = 0, A = 0, M = !1;
      do
        if (e(o[_], t[y]) < 0) {
          if (t[S--] = t[y--], E++, A = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (t[S--] = o[_--], A++, E = 0, --m === 1) {
          M = !0;
          break;
        }
      while ((E | A) < C);
      if (M)
        break;
      do {
        if (E = d - pc(o[_], t, v, d, d - 1, e), E !== 0) {
          for (S -= E, y -= E, d -= E, T = S + 1, b = y + 1, g = E - 1; g >= 0; g--)
            t[T + g] = t[b + g];
          if (d === 0) {
            M = !0;
            break;
          }
        }
        if (t[S--] = o[_--], --m === 1) {
          M = !0;
          break;
        }
        if (A = m - dc(t[y], o, 0, m, m - 1, e), A !== 0) {
          for (S -= A, _ -= A, m -= A, T = S + 1, b = _ + 1, g = 0; g < A; g++)
            t[T + g] = o[b + g];
          if (m <= 1) {
            M = !0;
            break;
          }
        }
        if (t[S--] = t[y--], --d === 0) {
          M = !0;
          break;
        }
        C--;
      } while (E >= fo || A >= fo);
      if (M)
        break;
      C < 0 && (C = 0), C += 2;
    }
    if (r = C, r < 1 && (r = 1), m === 1) {
      for (S -= d, y -= d, T = S + 1, b = y + 1, g = d - 1; g >= 0; g--)
        t[T + g] = t[b + g];
      t[S] = o[_];
    } else {
      if (m === 0)
        throw new Error();
      for (b = S - (m - 1), g = 0; g < m; g++)
        t[b + g] = o[g];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function Zl(t, e, r, n) {
  r || (r = 0), n || (n = t.length);
  var i = n - r;
  if (!(i < 2)) {
    var a = 0;
    if (i < Y1) {
      a = Ng(t, r, n, e), Fg(t, r, n, r + a, e);
      return;
    }
    var o = LM(t, e), s = AM(i);
    do {
      if (a = Ng(t, r, n, e), a < s) {
        var l = i;
        l > s && (l = s), Fg(t, r, r + l, r + a, e), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), i -= a, r += a;
    } while (i !== 0);
    o.forceMergeRuns();
  }
}
var Fe = 1, Po = 2, Ca = 4, Hg = !1;
function gc() {
  Hg || (Hg = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function zg(t, e) {
  return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
}
var EM = (function() {
  function t() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = zg;
  }
  return t.prototype.traverse = function(e, r) {
    for (var n = 0; n < this._roots.length; n++)
      this._roots[n].traverse(e, r);
  }, t.prototype.getDisplayList = function(e, r) {
    r = r || !1;
    var n = this._displayList;
    return (e || !n.length) && this.updateDisplayList(r), n;
  }, t.prototype.updateDisplayList = function(e) {
    this._displayListLen = 0;
    for (var r = this._roots, n = this._displayList, i = 0, a = r.length; i < a; i++)
      this._updateAndAddDisplayable(r[i], null, e);
    n.length = this._displayListLen, Zl(n, zg);
  }, t.prototype._updateAndAddDisplayable = function(e, r, n) {
    if (!(e.ignore && !n)) {
      e.beforeUpdate(), e.update(), e.afterUpdate();
      var i = e.getClipPath(), a = r && r.length, o = 0, s = e.__clipPaths;
      if (!e.ignoreClip && (a || i)) {
        if (s || (s = e.__clipPaths = []), a)
          for (var l = 0; l < r.length; l++)
            s[o++] = r[l];
        for (var u = i, f = e; u; )
          u.parent = f, u.updateTransform(), s[o++] = u, f = u, u = u.getClipPath();
      }
      if (s && (s.length = o), e.childrenRef) {
        for (var c = e.childrenRef(), h = 0; h < c.length; h++) {
          var v = c[h];
          e.__dirty && (v.__dirty |= Fe), this._updateAndAddDisplayable(v, s, n);
        }
        e.__dirty = 0;
      } else {
        var d = e;
        isNaN(d.z) && (gc(), d.z = 0), isNaN(d.z2) && (gc(), d.z2 = 0), isNaN(d.zlevel) && (gc(), d.zlevel = 0), this._displayList[this._displayListLen++] = d;
      }
      var p = e.getDecalElement && e.getDecalElement();
      p && this._updateAndAddDisplayable(p, s, n);
      var m = e.getTextGuideLine();
      m && this._updateAndAddDisplayable(m, s, n);
      var g = e.getTextContent();
      g && this._updateAndAddDisplayable(g, s, n);
    }
  }, t.prototype.addRoot = function(e) {
    e.__zr && e.__zr.storage === this || this._roots.push(e);
  }, t.prototype.delRoot = function(e) {
    if (e instanceof Array) {
      for (var r = 0, n = e.length; r < n; r++)
        this.delRoot(e[r]);
      return;
    }
    var i = At(this._roots, e);
    i >= 0 && this._roots.splice(i, 1);
  }, t.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, t.prototype.getRoots = function() {
    return this._roots;
  }, t.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, t;
})(), xu;
xu = Tt.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
  return setTimeout(t, 16);
};
var Zo = {
  linear: function(t) {
    return t;
  },
  quadraticIn: function(t) {
    return t * t;
  },
  quadraticOut: function(t) {
    return t * (2 - t);
  },
  quadraticInOut: function(t) {
    return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
  },
  cubicIn: function(t) {
    return t * t * t;
  },
  cubicOut: function(t) {
    return --t * t * t + 1;
  },
  cubicInOut: function(t) {
    return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
  },
  quarticIn: function(t) {
    return t * t * t * t;
  },
  quarticOut: function(t) {
    return 1 - --t * t * t * t;
  },
  quarticInOut: function(t) {
    return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
  },
  quinticIn: function(t) {
    return t * t * t * t * t;
  },
  quinticOut: function(t) {
    return --t * t * t * t * t + 1;
  },
  quinticInOut: function(t) {
    return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
  },
  sinusoidalIn: function(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  },
  sinusoidalOut: function(t) {
    return Math.sin(t * Math.PI / 2);
  },
  sinusoidalInOut: function(t) {
    return 0.5 * (1 - Math.cos(Math.PI * t));
  },
  exponentialIn: function(t) {
    return t === 0 ? 0 : Math.pow(1024, t - 1);
  },
  exponentialOut: function(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  exponentialInOut: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : (t *= 2) < 1 ? 0.5 * Math.pow(1024, t - 1) : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
  },
  circularIn: function(t) {
    return 1 - Math.sqrt(1 - t * t);
  },
  circularOut: function(t) {
    return Math.sqrt(1 - --t * t);
  },
  circularInOut: function(t) {
    return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  elasticIn: function(t) {
    var e, r = 0.1, n = 0.4;
    return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)));
  },
  elasticOut: function(t) {
    var e, r = 0.1, n = 0.4;
    return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1);
  },
  elasticInOut: function(t) {
    var e, r = 0.1, n = 0.4;
    return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), (t *= 2) < 1 ? -0.5 * (r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)) : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * 0.5 + 1);
  },
  backIn: function(t) {
    var e = 1.70158;
    return t * t * ((e + 1) * t - e);
  },
  backOut: function(t) {
    var e = 1.70158;
    return --t * t * ((e + 1) * t + e) + 1;
  },
  backInOut: function(t) {
    var e = 2.5949095;
    return (t *= 2) < 1 ? 0.5 * (t * t * ((e + 1) * t - e)) : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
  },
  bounceIn: function(t) {
    return 1 - Zo.bounceOut(1 - t);
  },
  bounceOut: function(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  bounceInOut: function(t) {
    return t < 0.5 ? Zo.bounceIn(t * 2) * 0.5 : Zo.bounceOut(t * 2 - 1) * 0.5 + 0.5;
  }
}, il = Math.pow, ti = Math.sqrt, Cu = 1e-8, $1 = 1e-4, Vg = ti(3), al = 1 / 3, $r = ro(), ar = ro(), Na = ro();
function qn(t) {
  return t > -Cu && t < Cu;
}
function X1(t) {
  return t > Cu || t < -Cu;
}
function de(t, e, r, n, i) {
  var a = 1 - i;
  return a * a * (a * t + 3 * i * e) + i * i * (i * n + 3 * a * r);
}
function Ug(t, e, r, n, i) {
  var a = 1 - i;
  return 3 * (((e - t) * a + 2 * (r - e) * i) * a + (n - r) * i * i);
}
function Du(t, e, r, n, i, a) {
  var o = n + 3 * (e - r) - t, s = 3 * (r - e * 2 + t), l = 3 * (e - t), u = t - i, f = s * s - 3 * o * l, c = s * l - 9 * o * u, h = l * l - 3 * s * u, v = 0;
  if (qn(f) && qn(c))
    if (qn(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[v++] = d);
    }
  else {
    var p = c * c - 4 * f * h;
    if (qn(p)) {
      var m = c / f, d = -s / o + m, g = -m / 2;
      d >= 0 && d <= 1 && (a[v++] = d), g >= 0 && g <= 1 && (a[v++] = g);
    } else if (p > 0) {
      var y = ti(p), _ = f * s + 1.5 * o * (-c + y), S = f * s + 1.5 * o * (-c - y);
      _ < 0 ? _ = -il(-_, al) : _ = il(_, al), S < 0 ? S = -il(-S, al) : S = il(S, al);
      var d = (-s - (_ + S)) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d);
    } else {
      var b = (2 * f * s - 3 * o * c) / (2 * ti(f * f * f)), T = Math.acos(b) / 3, C = ti(f), E = Math.cos(T), d = (-s - 2 * C * E) / (3 * o), g = (-s + C * (E + Vg * Math.sin(T))) / (3 * o), A = (-s + C * (E - Vg * Math.sin(T))) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d), g >= 0 && g <= 1 && (a[v++] = g), A >= 0 && A <= 1 && (a[v++] = A);
    }
  }
  return v;
}
function K1(t, e, r, n, i) {
  var a = 6 * r - 12 * e + 6 * t, o = 9 * e + 3 * n - 3 * t - 9 * r, s = 3 * e - 3 * t, l = 0;
  if (qn(o)) {
    if (X1(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var f = a * a - 4 * o * s;
    if (qn(f))
      i[0] = -a / (2 * o);
    else if (f > 0) {
      var c = ti(f), u = (-a + c) / (2 * o), h = (-a - c) / (2 * o);
      u >= 0 && u <= 1 && (i[l++] = u), h >= 0 && h <= 1 && (i[l++] = h);
    }
  }
  return l;
}
function Mu(t, e, r, n, i, a) {
  var o = (e - t) * i + t, s = (r - e) * i + e, l = (n - r) * i + r, u = (s - o) * i + o, f = (l - s) * i + s, c = (f - u) * i + u;
  a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = f, a[6] = l, a[7] = n;
}
function PM(t, e, r, n, i, a, o, s, l, u, f) {
  var c, h = 5e-3, v = 1 / 0, d, p, m, g;
  $r[0] = l, $r[1] = u;
  for (var y = 0; y < 1; y += 0.05)
    ar[0] = de(t, r, i, o, y), ar[1] = de(e, n, a, s, y), m = Ba($r, ar), m < v && (c = y, v = m);
  v = 1 / 0;
  for (var _ = 0; _ < 32 && !(h < $1); _++)
    d = c - h, p = c + h, ar[0] = de(t, r, i, o, d), ar[1] = de(e, n, a, s, d), m = Ba(ar, $r), d >= 0 && m < v ? (c = d, v = m) : (Na[0] = de(t, r, i, o, p), Na[1] = de(e, n, a, s, p), g = Ba(Na, $r), p <= 1 && g < v ? (c = p, v = g) : h *= 0.5);
  return ti(v);
}
function RM(t, e, r, n, i, a, o, s, l) {
  for (var u = t, f = e, c = 0, h = 1 / l, v = 1; v <= l; v++) {
    var d = v * h, p = de(t, r, i, o, d), m = de(e, n, a, s, d), g = p - u, y = m - f;
    c += Math.sqrt(g * g + y * y), u = p, f = m;
  }
  return c;
}
function Be(t, e, r, n) {
  var i = 1 - n;
  return i * (i * t + 2 * n * e) + n * n * r;
}
function Gg(t, e, r, n) {
  return 2 * ((1 - n) * (e - t) + n * (r - e));
}
function OM(t, e, r, n, i) {
  var a = t - 2 * e + r, o = 2 * (e - t), s = t - n, l = 0;
  if (qn(a)) {
    if (X1(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var f = o * o - 4 * a * s;
    if (qn(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u);
    } else if (f > 0) {
      var c = ti(f), u = (-o + c) / (2 * a), h = (-o - c) / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u), h >= 0 && h <= 1 && (i[l++] = h);
    }
  }
  return l;
}
function q1(t, e, r) {
  var n = t + r - 2 * e;
  return n === 0 ? 0.5 : (t - e) / n;
}
function Au(t, e, r, n, i) {
  var a = (e - t) * n + t, o = (r - e) * n + e, s = (o - a) * n + a;
  i[0] = t, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = r;
}
function kM(t, e, r, n, i, a, o, s, l) {
  var u, f = 5e-3, c = 1 / 0;
  $r[0] = o, $r[1] = s;
  for (var h = 0; h < 1; h += 0.05) {
    ar[0] = Be(t, r, i, h), ar[1] = Be(e, n, a, h);
    var v = Ba($r, ar);
    v < c && (u = h, c = v);
  }
  c = 1 / 0;
  for (var d = 0; d < 32 && !(f < $1); d++) {
    var p = u - f, m = u + f;
    ar[0] = Be(t, r, i, p), ar[1] = Be(e, n, a, p);
    var v = Ba(ar, $r);
    if (p >= 0 && v < c)
      u = p, c = v;
    else {
      Na[0] = Be(t, r, i, m), Na[1] = Be(e, n, a, m);
      var g = Ba(Na, $r);
      m <= 1 && g < c ? (u = m, c = g) : f *= 0.5;
    }
  }
  return ti(c);
}
function BM(t, e, r, n, i, a, o) {
  for (var s = t, l = e, u = 0, f = 1 / o, c = 1; c <= o; c++) {
    var h = c * f, v = Be(t, r, i, h), d = Be(e, n, a, h), p = v - s, m = d - l;
    u += Math.sqrt(p * p + m * m), s = v, l = d;
  }
  return u;
}
var NM = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Z1(t) {
  var e = t && NM.exec(t);
  if (e) {
    var r = e[1].split(","), n = +Kr(r[0]), i = +Kr(r[1]), a = +Kr(r[2]), o = +Kr(r[3]);
    if (isNaN(n + i + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Du(0, n, a, 1, l, s) && de(0, i, o, 1, s[0]);
    };
  }
}
var FM = (function() {
  function t(e) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = e.life || 1e3, this._delay = e.delay || 0, this.loop = e.loop || !1, this.onframe = e.onframe || we, this.ondestroy = e.ondestroy || we, this.onrestart = e.onrestart || we, e.easing && this.setEasing(e.easing);
  }
  return t.prototype.step = function(e, r) {
    if (this._inited || (this._startTime = e + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += r;
      return;
    }
    var n = this._life, i = e - this._startTime - this._pausedTime, a = i / n;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = i % n;
        this._startTime = e - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, t.prototype.pause = function() {
    this._paused = !0;
  }, t.prototype.resume = function() {
    this._paused = !1;
  }, t.prototype.setEasing = function(e) {
    this.easing = e, this.easingFunc = _t(e) ? e : Zo[e] || Z1(e);
  }, t;
})(), j1 = /* @__PURE__ */ (function() {
  function t(e) {
    this.value = e;
  }
  return t;
})(), HM = (function() {
  function t() {
    this._len = 0;
  }
  return t.prototype.insert = function(e) {
    var r = new j1(e);
    return this.insertEntry(r), r;
  }, t.prototype.insertEntry = function(e) {
    this.head ? (this.tail.next = e, e.prev = this.tail, e.next = null, this.tail = e) : this.head = this.tail = e, this._len++;
  }, t.prototype.remove = function(e) {
    var r = e.prev, n = e.next;
    r ? r.next = n : this.head = n, n ? n.prev = r : this.tail = r, e.next = e.prev = null, this._len--;
  }, t.prototype.len = function() {
    return this._len;
  }, t.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, t;
})(), Ya = (function() {
  function t(e) {
    this._list = new HM(), this._maxSize = 10, this._map = {}, this._maxSize = e;
  }
  return t.prototype.put = function(e, r) {
    var n = this._list, i = this._map, a = null;
    if (i[e] == null) {
      var o = n.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = n.head;
        n.remove(l), delete i[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new j1(r), s.key = e, n.insertEntry(s), i[e] = s;
    }
    return a;
  }, t.prototype.get = function(e) {
    var r = this._map[e], n = this._list;
    if (r != null)
      return r !== n.tail && (n.remove(r), n.insertEntry(r)), r.value;
  }, t.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, t.prototype.len = function() {
    return this._list.len();
  }, t;
})(), Wg = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function ei(t) {
  return t = Math.round(t), t < 0 ? 0 : t > 255 ? 255 : t;
}
function qh(t) {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function mc(t) {
  var e = t;
  return e.length && e.charAt(e.length - 1) === "%" ? ei(parseFloat(e) / 100 * 255) : ei(parseInt(e, 10));
}
function Zi(t) {
  var e = t;
  return e.length && e.charAt(e.length - 1) === "%" ? qh(parseFloat(e) / 100) : qh(parseFloat(e));
}
function yc(t, e, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? t + (e - t) * r * 6 : r * 2 < 1 ? e : r * 3 < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t;
}
function ol(t, e, r) {
  return t + (e - t) * r;
}
function tr(t, e, r, n, i) {
  return t[0] = e, t[1] = r, t[2] = n, t[3] = i, t;
}
function Zh(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
var J1 = new Ya(20), sl = null;
function ua(t, e) {
  sl && Zh(sl, e), sl = J1.put(t, sl || e.slice());
}
function Jr(t, e) {
  if (t) {
    e = e || [];
    var r = J1.get(t);
    if (r)
      return Zh(e, r);
    t = t + "";
    var n = t.replace(/ /g, "").toLowerCase();
    if (n in Wg)
      return Zh(e, Wg[n]), ua(t, e), e;
    var i = n.length;
    if (n.charAt(0) === "#") {
      if (i === 4 || i === 5) {
        var a = parseInt(n.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          tr(e, 0, 0, 0, 1);
          return;
        }
        return tr(e, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(n.slice(4), 16) / 15 : 1), ua(t, e), e;
      } else if (i === 7 || i === 9) {
        var a = parseInt(n.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          tr(e, 0, 0, 0, 1);
          return;
        }
        return tr(e, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(n.slice(7), 16) / 255 : 1), ua(t, e), e;
      }
      return;
    }
    var o = n.indexOf("("), s = n.indexOf(")");
    if (o !== -1 && s + 1 === i) {
      var l = n.substr(0, o), u = n.substr(o + 1, s - (o + 1)).split(","), f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? tr(e, +u[0], +u[1], +u[2], 1) : tr(e, 0, 0, 0, 1);
          f = Zi(u.pop());
        case "rgb":
          if (u.length >= 3)
            return tr(e, mc(u[0]), mc(u[1]), mc(u[2]), u.length === 3 ? f : Zi(u[3])), ua(t, e), e;
          tr(e, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            tr(e, 0, 0, 0, 1);
            return;
          }
          return u[3] = Zi(u[3]), jh(u, e), ua(t, e), e;
        case "hsl":
          if (u.length !== 3) {
            tr(e, 0, 0, 0, 1);
            return;
          }
          return jh(u, e), ua(t, e), e;
        default:
          return;
      }
    }
    tr(e, 0, 0, 0, 1);
  }
}
function jh(t, e) {
  var r = (parseFloat(t[0]) % 360 + 360) % 360 / 360, n = Zi(t[1]), i = Zi(t[2]), a = i <= 0.5 ? i * (n + 1) : i + n - i * n, o = i * 2 - a;
  return e = e || [], tr(e, ei(yc(o, a, r + 1 / 3) * 255), ei(yc(o, a, r) * 255), ei(yc(o, a, r - 1 / 3) * 255), 1), t.length === 4 && (e[3] = t[3]), e;
}
function zM(t) {
  if (t) {
    var e = t[0] / 255, r = t[1] / 255, n = t[2] / 255, i = Math.min(e, r, n), a = Math.max(e, r, n), o = a - i, s = (a + i) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + i) : u = o / (2 - a - i);
      var f = ((a - e) / 6 + o / 2) / o, c = ((a - r) / 6 + o / 2) / o, h = ((a - n) / 6 + o / 2) / o;
      e === a ? l = h - c : r === a ? l = 1 / 3 + f - h : n === a && (l = 2 / 3 + c - f), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var v = [l * 360, u, s];
    return t[3] != null && v.push(t[3]), v;
  }
}
function Yg(t, e) {
  var r = Jr(t);
  if (r) {
    for (var n = 0; n < 3; n++)
      r[n] = r[n] * (1 - e) | 0, r[n] > 255 ? r[n] = 255 : r[n] < 0 && (r[n] = 0);
    return zs(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function VM(t, e, r) {
  if (!(!(e && e.length) || !(t >= 0 && t <= 1))) {
    var n = t * (e.length - 1), i = Math.floor(n), a = Math.ceil(n), o = Jr(e[i]), s = Jr(e[a]), l = n - i, u = zs([
      ei(ol(o[0], s[0], l)),
      ei(ol(o[1], s[1], l)),
      ei(ol(o[2], s[2], l)),
      qh(ol(o[3], s[3], l))
    ], "rgba");
    return r ? {
      color: u,
      leftIndex: i,
      rightIndex: a,
      value: n
    } : u;
  }
}
function Jh(t, e, r, n) {
  var i = Jr(t);
  if (t)
    return i = zM(i), r != null && (i[1] = Zi(_t(r) ? r(i[1]) : r)), n != null && (i[2] = Zi(_t(n) ? n(i[2]) : n)), zs(jh(i), "rgba");
}
function zs(t, e) {
  if (!(!t || !t.length)) {
    var r = t[0] + "," + t[1] + "," + t[2];
    return (e === "rgba" || e === "hsva" || e === "hsla") && (r += "," + t[3]), e + "(" + r + ")";
  }
}
function Iu(t, e) {
  var r = Jr(t);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * e : 0;
}
var $g = new Ya(100);
function Xg(t) {
  if (at(t)) {
    var e = $g.get(t);
    return e || (e = Yg(t, -0.1), $g.put(t, e)), e;
  } else if (Sf(t)) {
    var r = q({}, t);
    return r.colorStops = pt(t.colorStops, function(n) {
      return {
        offset: n.offset,
        color: Yg(n.color, -0.1)
      };
    }), r;
  }
  return t;
}
function UM(t) {
  return t.type === "linear";
}
function GM(t) {
  return t.type === "radial";
}
(function() {
  return typeof Buffer < "u" && typeof Buffer.from == "function" ? function(t) {
    return Buffer.from(t).toString("base64");
  } : typeof btoa == "function" && typeof unescape == "function" && typeof encodeURIComponent == "function" ? function(t) {
    return btoa(unescape(encodeURIComponent(t)));
  } : function(t) {
    return null;
  };
})();
var Qh = Array.prototype.slice;
function xn(t, e, r) {
  return (e - t) * r + t;
}
function _c(t, e, r, n) {
  for (var i = e.length, a = 0; a < i; a++)
    t[a] = xn(e[a], r[a], n);
  return t;
}
function WM(t, e, r, n) {
  for (var i = e.length, a = i && e[0].length, o = 0; o < i; o++) {
    t[o] || (t[o] = []);
    for (var s = 0; s < a; s++)
      t[o][s] = xn(e[o][s], r[o][s], n);
  }
  return t;
}
function ll(t, e, r, n) {
  for (var i = e.length, a = 0; a < i; a++)
    t[a] = e[a] + r[a] * n;
  return t;
}
function Kg(t, e, r, n) {
  for (var i = e.length, a = i && e[0].length, o = 0; o < i; o++) {
    t[o] || (t[o] = []);
    for (var s = 0; s < a; s++)
      t[o][s] = e[o][s] + r[o][s] * n;
  }
  return t;
}
function YM(t, e) {
  for (var r = t.length, n = e.length, i = r > n ? e : t, a = Math.min(r, n), o = i[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, n); s++)
    i.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function $M(t, e, r) {
  var n = t, i = e;
  if (!(!n.push || !i.push)) {
    var a = n.length, o = i.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        n.length = o;
      else
        for (var l = a; l < o; l++)
          n.push(r === 1 ? i[l] : Qh.call(i[l]));
    }
    for (var u = n[0] && n[0].length, l = 0; l < n.length; l++)
      if (r === 1)
        isNaN(n[l]) && (n[l] = i[l]);
      else
        for (var f = 0; f < u; f++)
          isNaN(n[l][f]) && (n[l][f] = i[l][f]);
  }
}
function jl(t) {
  if (He(t)) {
    var e = t.length;
    if (He(t[0])) {
      for (var r = [], n = 0; n < e; n++)
        r.push(Qh.call(t[n]));
      return r;
    }
    return Qh.call(t);
  }
  return t;
}
function Jl(t) {
  return t[0] = Math.floor(t[0]) || 0, t[1] = Math.floor(t[1]) || 0, t[2] = Math.floor(t[2]) || 0, t[3] = t[3] == null ? 1 : t[3], "rgba(" + t.join(",") + ")";
}
function XM(t) {
  return He(t && t[0]) ? 2 : 1;
}
var ul = 0, Ql = 1, Q1 = 2, Ro = 3, tv = 4, ev = 5, qg = 6;
function Zg(t) {
  return t === tv || t === ev;
}
function fl(t) {
  return t === Ql || t === Q1;
}
var co = [0, 0, 0, 0], KM = (function() {
  function t(e) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = e;
  }
  return t.prototype.isFinished = function() {
    return this._finished;
  }, t.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, t.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, t.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, t.prototype.addKeyframe = function(e, r, n) {
    this._needsSort = !0;
    var i = this.keyframes, a = i.length, o = !1, s = qg, l = r;
    if (He(r)) {
      var u = XM(r);
      s = u, (u === 1 && !qt(r[0]) || u === 2 && !qt(r[0][0])) && (o = !0);
    } else if (qt(r) && !gs(r))
      s = ul;
    else if (at(r))
      if (!isNaN(+r))
        s = ul;
      else {
        var f = Jr(r);
        f && (l = f, s = Ro);
      }
    else if (Sf(r)) {
      var c = q({}, l);
      c.colorStops = pt(r.colorStops, function(v) {
        return {
          offset: v.offset,
          color: Jr(v.color)
        };
      }), UM(r) ? s = tv : GM(r) && (s = ev), l = c;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === qg) && (o = !0), this.discrete = this.discrete || o;
    var h = {
      time: e,
      value: l,
      rawValue: r,
      percent: 0
    };
    return n && (h.easing = n, h.easingFunc = _t(n) ? n : Zo[n] || Z1(n)), i.push(h), h;
  }, t.prototype.prepare = function(e, r) {
    var n = this.keyframes;
    this._needsSort && n.sort(function(p, m) {
      return p.time - m.time;
    });
    for (var i = this.valType, a = n.length, o = n[a - 1], s = this.discrete, l = fl(i), u = Zg(i), f = 0; f < a; f++) {
      var c = n[f], h = c.value, v = o.value;
      c.percent = c.time / e, s || (l && f !== a - 1 ? $M(h, v, i) : u && YM(h.colorStops, v.colorStops));
    }
    if (!s && i !== ev && r && this.needsAnimate() && r.needsAnimate() && i === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var d = n[0].value, f = 0; f < a; f++)
        i === ul ? n[f].additiveValue = n[f].value - d : i === Ro ? n[f].additiveValue = ll([], n[f].value, d, -1) : fl(i) && (n[f].additiveValue = i === Ql ? ll([], n[f].value, d, -1) : Kg([], n[f].value, d, -1));
    }
  }, t.prototype.step = function(e, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var n = this._additiveTrack != null, i = n ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === Ro, f, c = this._lastFr, h = Math.min, v, d;
      if (s === 1)
        v = d = o[0];
      else {
        if (r < 0)
          f = 0;
        else if (r < this._lastFrP) {
          var p = h(c + 1, s - 1);
          for (f = p; f >= 0 && !(o[f].percent <= r); f--)
            ;
          f = h(f, s - 2);
        } else {
          for (f = c; f < s && !(o[f].percent > r); f++)
            ;
          f = h(f - 1, s - 2);
        }
        d = o[f + 1], v = o[f];
      }
      if (v && d) {
        this._lastFr = f, this._lastFrP = r;
        var m = d.percent - v.percent, g = m === 0 ? 1 : h((r - v.percent) / m, 1);
        d.easingFunc && (g = d.easingFunc(g));
        var y = n ? this._additiveValue : u ? co : e[l];
        if ((fl(a) || u) && !y && (y = this._additiveValue = []), this.discrete)
          e[l] = g < 1 ? v.rawValue : d.rawValue;
        else if (fl(a))
          a === Ql ? _c(y, v[i], d[i], g) : WM(y, v[i], d[i], g);
        else if (Zg(a)) {
          var _ = v[i], S = d[i], b = a === tv;
          e[l] = {
            type: b ? "linear" : "radial",
            x: xn(_.x, S.x, g),
            y: xn(_.y, S.y, g),
            colorStops: pt(_.colorStops, function(C, E) {
              var A = S.colorStops[E];
              return {
                offset: xn(C.offset, A.offset, g),
                color: Jl(_c([], C.color, A.color, g))
              };
            }),
            global: S.global
          }, b ? (e[l].x2 = xn(_.x2, S.x2, g), e[l].y2 = xn(_.y2, S.y2, g)) : e[l].r = xn(_.r, S.r, g);
        } else if (u)
          _c(y, v[i], d[i], g), n || (e[l] = Jl(y));
        else {
          var T = xn(v[i], d[i], g);
          n ? this._additiveValue = T : e[l] = T;
        }
        n && this._addToTarget(e);
      }
    }
  }, t.prototype._addToTarget = function(e) {
    var r = this.valType, n = this.propName, i = this._additiveValue;
    r === ul ? e[n] = e[n] + i : r === Ro ? (Jr(e[n], co), ll(co, co, i, 1), e[n] = Jl(co)) : r === Ql ? ll(e[n], e[n], i, 1) : r === Q1 && Kg(e[n], e[n], i, 1);
  }, t;
})(), Ed = (function() {
  function t(e, r, n, i) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = e, this._loop = r, r && i) {
      Cd("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = i, this._allowDiscrete = n;
  }
  return t.prototype.getMaxTime = function() {
    return this._maxTime;
  }, t.prototype.getDelay = function() {
    return this._delay;
  }, t.prototype.getLoop = function() {
    return this._loop;
  }, t.prototype.getTarget = function() {
    return this._target;
  }, t.prototype.changeTarget = function(e) {
    this._target = e;
  }, t.prototype.when = function(e, r, n) {
    return this.whenWithKeys(e, r, Kt(r), n);
  }, t.prototype.whenWithKeys = function(e, r, n, i) {
    for (var a = this._tracks, o = 0; o < n.length; o++) {
      var s = n[o], l = a[s];
      if (!l) {
        l = a[s] = new KM(s);
        var u = void 0, f = this._getAdditiveTrack(s);
        if (f) {
          var c = f.keyframes, h = c[c.length - 1];
          u = h && h.value, f.valType === Ro && u && (u = Jl(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        e > 0 && l.addKeyframe(0, jl(u), i), this._trackKeys.push(s);
      }
      l.addKeyframe(e, jl(r[s]), i);
    }
    return this._maxTime = Math.max(this._maxTime, e), this;
  }, t.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, t.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, t.prototype.isPaused = function() {
    return !!this._paused;
  }, t.prototype.duration = function(e) {
    return this._maxTime = e, this._force = !0, this;
  }, t.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var e = this._doneCbs;
    if (e)
      for (var r = e.length, n = 0; n < r; n++)
        e[n].call(this);
  }, t.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var e = this.animation, r = this._abortedCbs;
    if (e && e.removeClip(this._clip), this._clip = null, r)
      for (var n = 0; n < r.length; n++)
        r[n].call(this);
  }, t.prototype._setTracksFinished = function() {
    for (var e = this._tracks, r = this._trackKeys, n = 0; n < r.length; n++)
      e[r[n]].setFinished();
  }, t.prototype._getAdditiveTrack = function(e) {
    var r, n = this._additiveAnimators;
    if (n)
      for (var i = 0; i < n.length; i++) {
        var a = n[i].getTrack(e);
        a && (r = a);
      }
    return r;
  }, t.prototype.start = function(e) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var r = this, n = [], i = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, f = u.length;
        if (s.prepare(i, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var c = u[f - 1];
            c && (r._target[s.propName] = c.rawValue), s.setFinished();
          } else
            n.push(s);
      }
      if (n.length || this._force) {
        var h = new FM({
          life: i,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(v) {
            r._started = 2;
            var d = r._additiveAnimators;
            if (d) {
              for (var p = !1, m = 0; m < d.length; m++)
                if (d[m]._clip) {
                  p = !0;
                  break;
                }
              p || (r._additiveAnimators = null);
            }
            for (var m = 0; m < n.length; m++)
              n[m].step(r._target, v);
            var g = r._onframeCbs;
            if (g)
              for (var m = 0; m < g.length; m++)
                g[m](r._target, v);
          },
          ondestroy: function() {
            r._doneCallback();
          }
        });
        this._clip = h, this.animation && this.animation.addClip(h), e && h.setEasing(e);
      } else
        this._doneCallback();
      return this;
    }
  }, t.prototype.stop = function(e) {
    if (this._clip) {
      var r = this._clip;
      e && r.onframe(1), this._abortedCallback();
    }
  }, t.prototype.delay = function(e) {
    return this._delay = e, this;
  }, t.prototype.during = function(e) {
    return e && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(e)), this;
  }, t.prototype.done = function(e) {
    return e && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(e)), this;
  }, t.prototype.aborted = function(e) {
    return e && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(e)), this;
  }, t.prototype.getClip = function() {
    return this._clip;
  }, t.prototype.getTrack = function(e) {
    return this._tracks[e];
  }, t.prototype.getTracks = function() {
    var e = this;
    return pt(this._trackKeys, function(r) {
      return e._tracks[r];
    });
  }, t.prototype.stopTracks = function(e, r) {
    if (!e.length || !this._clip)
      return !0;
    for (var n = this._tracks, i = this._trackKeys, a = 0; a < e.length; a++) {
      var o = n[e[a]];
      o && !o.isFinished() && (r ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < i.length; a++)
      if (!n[i[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, t.prototype.saveTo = function(e, r, n) {
    if (e) {
      r = r || this._trackKeys;
      for (var i = 0; i < r.length; i++) {
        var a = r[i], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[n ? 0 : s.length - 1];
          l && (e[a] = jl(l.rawValue));
        }
      }
    }
  }, t.prototype.__changeFinalValue = function(e, r) {
    r = r || Kt(e);
    for (var n = 0; n < r.length; n++) {
      var i = r[n], a = this._tracks[i];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, e[i]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, t;
})();
function La() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var qM = (function(t) {
  Q(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, r = r || {}, n.stage = r.stage || {}, n;
  }
  return e.prototype.addClip = function(r) {
    r.animation && this.removeClip(r), this._head ? (this._tail.next = r, r.prev = this._tail, r.next = null, this._tail = r) : this._head = this._tail = r, r.animation = this;
  }, e.prototype.addAnimator = function(r) {
    r.animation = this;
    var n = r.getClip();
    n && this.addClip(n);
  }, e.prototype.removeClip = function(r) {
    if (r.animation) {
      var n = r.prev, i = r.next;
      n ? n.next = i : this._head = i, i ? i.prev = n : this._tail = n, r.next = r.prev = r.animation = null;
    }
  }, e.prototype.removeAnimator = function(r) {
    var n = r.getClip();
    n && this.removeClip(n), r.animation = null;
  }, e.prototype.update = function(r) {
    for (var n = La() - this._pausedTime, i = n - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(n, i);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = n, r || (this.trigger("frame", i), this.stage.update && this.stage.update());
  }, e.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function n() {
      r._running && (xu(n), !r._paused && r.update());
    }
    xu(n);
  }, e.prototype.start = function() {
    this._running || (this._time = La(), this._pausedTime = 0, this._startLoop());
  }, e.prototype.stop = function() {
    this._running = !1;
  }, e.prototype.pause = function() {
    this._paused || (this._pauseStart = La(), this._paused = !0);
  }, e.prototype.resume = function() {
    this._paused && (this._pausedTime += La() - this._pauseStart, this._paused = !1);
  }, e.prototype.clear = function() {
    for (var r = this._head; r; ) {
      var n = r.next;
      r.prev = r.next = r.animation = null, r = n;
    }
    this._head = this._tail = null;
  }, e.prototype.isFinished = function() {
    return this._head == null;
  }, e.prototype.animate = function(r, n) {
    n = n || {}, this.start();
    var i = new Ed(r, n.loop);
    return this.addAnimator(i), i;
  }, e;
})(dn), ZM = 300, Sc = Tt.domSupported, bc = (function() {
  var t = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], e = [
    "touchstart",
    "touchend",
    "touchmove"
  ], r = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, n = pt(t, function(i) {
    var a = i.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : i;
  });
  return {
    mouse: t,
    touch: e,
    pointer: n
  };
})(), jg = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Jg = !1;
function rv(t) {
  var e = t.pointerType;
  return e === "pen" || e === "touch";
}
function jM(t) {
  t.touching = !0, t.touchTimer != null && (clearTimeout(t.touchTimer), t.touchTimer = null), t.touchTimer = setTimeout(function() {
    t.touching = !1, t.touchTimer = null;
  }, 700);
}
function Tc(t) {
  t && (t.zrByTouch = !0);
}
function JM(t, e) {
  return rr(t.dom, new QM(t, e), !0);
}
function tS(t, e) {
  for (var r = e, n = !1; r && r.nodeType !== 9 && !(n = r.domBelongToZr || r !== e && r === t.painterRoot); )
    r = r.parentNode;
  return n;
}
var QM = /* @__PURE__ */ (function() {
  function t(e, r) {
    this.stopPropagation = we, this.stopImmediatePropagation = we, this.preventDefault = we, this.type = r.type, this.target = this.currentTarget = e.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return t;
})(), Sr = {
  mousedown: function(t) {
    t = rr(this.dom, t), this.__mayPointerCapture = [t.zrX, t.zrY], this.trigger("mousedown", t);
  },
  mousemove: function(t) {
    t = rr(this.dom, t);
    var e = this.__mayPointerCapture;
    e && (t.zrX !== e[0] || t.zrY !== e[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", t);
  },
  mouseup: function(t) {
    t = rr(this.dom, t), this.__togglePointerCapture(!1), this.trigger("mouseup", t);
  },
  mouseout: function(t) {
    t = rr(this.dom, t);
    var e = t.toElement || t.relatedTarget;
    tS(this, e) || (this.__pointerCapturing && (t.zrEventControl = "no_globalout"), this.trigger("mouseout", t));
  },
  wheel: function(t) {
    Jg = !0, t = rr(this.dom, t), this.trigger("mousewheel", t);
  },
  mousewheel: function(t) {
    Jg || (t = rr(this.dom, t), this.trigger("mousewheel", t));
  },
  touchstart: function(t) {
    t = rr(this.dom, t), Tc(t), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(t, "start"), Sr.mousemove.call(this, t), Sr.mousedown.call(this, t);
  },
  touchmove: function(t) {
    t = rr(this.dom, t), Tc(t), this.handler.processGesture(t, "change"), Sr.mousemove.call(this, t);
  },
  touchend: function(t) {
    t = rr(this.dom, t), Tc(t), this.handler.processGesture(t, "end"), Sr.mouseup.call(this, t), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < ZM && Sr.click.call(this, t);
  },
  pointerdown: function(t) {
    Sr.mousedown.call(this, t);
  },
  pointermove: function(t) {
    rv(t) || Sr.mousemove.call(this, t);
  },
  pointerup: function(t) {
    Sr.mouseup.call(this, t);
  },
  pointerout: function(t) {
    rv(t) || Sr.mouseout.call(this, t);
  }
};
P(["click", "dblclick", "contextmenu"], function(t) {
  Sr[t] = function(e) {
    e = rr(this.dom, e), this.trigger(t, e);
  };
});
var nv = {
  pointermove: function(t) {
    rv(t) || nv.mousemove.call(this, t);
  },
  pointerup: function(t) {
    nv.mouseup.call(this, t);
  },
  mousemove: function(t) {
    this.trigger("mousemove", t);
  },
  mouseup: function(t) {
    var e = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", this.trigger("mouseout", t));
  }
};
function tA(t, e) {
  var r = e.domHandlers;
  Tt.pointerEventsSupported ? P(bc.pointer, function(n) {
    tu(e, n, function(i) {
      r[n].call(t, i);
    });
  }) : (Tt.touchEventsSupported && P(bc.touch, function(n) {
    tu(e, n, function(i) {
      r[n].call(t, i), jM(e);
    });
  }), P(bc.mouse, function(n) {
    tu(e, n, function(i) {
      i = Ad(i), e.touching || r[n].call(t, i);
    });
  }));
}
function eA(t, e) {
  Tt.pointerEventsSupported ? P(jg.pointer, r) : Tt.touchEventsSupported || P(jg.mouse, r);
  function r(n) {
    function i(a) {
      a = Ad(a), tS(t, a.target) || (a = JM(t, a), e.domHandlers[n].call(t, a));
    }
    tu(e, n, i, { capture: !0 });
  }
}
function tu(t, e, r, n) {
  t.mounted[e] = r, t.listenerOpts[e] = n, dM(t.domTarget, e, r, n);
}
function wc(t) {
  var e = t.mounted;
  for (var r in e)
    e.hasOwnProperty(r) && pM(t.domTarget, r, e[r], t.listenerOpts[r]);
  t.mounted = {};
}
var Qg = /* @__PURE__ */ (function() {
  function t(e, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = e, this.domHandlers = r;
  }
  return t;
})(), rA = (function(t) {
  Q(e, t);
  function e(r, n) {
    var i = t.call(this) || this;
    return i.__pointerCapturing = !1, i.dom = r, i.painterRoot = n, i._localHandlerScope = new Qg(r, Sr), Sc && (i._globalHandlerScope = new Qg(document, nv)), tA(i, i._localHandlerScope), i;
  }
  return e.prototype.dispose = function() {
    wc(this._localHandlerScope), Sc && wc(this._globalHandlerScope);
  }, e.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, e.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, Sc && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var n = this._globalHandlerScope;
      r ? eA(this, n) : wc(n);
    }
  }, e;
})(dn), eS = 1;
Tt.hasGlobalWindow && (eS = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Lu = eS, iv = 0.4, av = "#333", ov = "#ccc", nA = "#eee", tm = Fs, em = 5e-5;
function _i(t) {
  return t > em || t < -em;
}
var Si = [], fa = [], xc = jr(), Cc = Math.abs, Vs = (function() {
  function t() {
  }
  return t.prototype.getLocalTransform = function(e) {
    return iA(this, e);
  }, t.prototype.setPosition = function(e) {
    this.x = e[0], this.y = e[1];
  }, t.prototype.setScale = function(e) {
    this.scaleX = e[0], this.scaleY = e[1];
  }, t.prototype.setSkew = function(e) {
    this.skewX = e[0], this.skewY = e[1];
  }, t.prototype.setOrigin = function(e) {
    this.originX = e[0], this.originY = e[1];
  }, t.prototype.needLocalTransform = function() {
    return _i(this.rotation) || _i(this.x) || _i(this.y) || _i(this.scaleX - 1) || _i(this.scaleY - 1) || _i(this.skewX) || _i(this.skewY);
  }, t.prototype.updateTransform = function() {
    var e = this.parent && this.parent.transform, r = this.needLocalTransform(), n = this.transform;
    if (!(r || e)) {
      n && (tm(n), this.invTransform = null);
      return;
    }
    n = n || jr(), r ? this.getLocalTransform(n) : tm(n), e && (r ? Ko(n, e, n) : Id(n, e)), this.transform = n, this._resolveGlobalScaleRatio(n), this.invTransform = this.invTransform || jr(), Hs(this.invTransform, n);
  }, t.prototype._resolveGlobalScaleRatio = function(e) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(Si);
      var n = Si[0] < 0 ? -1 : 1, i = Si[1] < 0 ? -1 : 1, a = ((Si[0] - n) * r + n) / Si[0] || 0, o = ((Si[1] - i) * r + i) / Si[1] || 0;
      e[0] *= a, e[1] *= a, e[2] *= o, e[3] *= o;
    }
  }, t.prototype.getComputedTransform = function() {
    for (var e = this, r = []; e; )
      r.push(e), e = e.parent;
    for (; e = r.pop(); )
      e.updateTransform();
    return this.transform;
  }, t.prototype.setLocalTransform = function(e) {
    if (e) {
      var r = e[0] * e[0] + e[1] * e[1], n = e[2] * e[2] + e[3] * e[3], i = Math.atan2(e[1], e[0]), a = Math.PI / 2 + i - Math.atan2(e[3], e[2]);
      n = Math.sqrt(n) * Math.cos(a), r = Math.sqrt(r), this.skewX = a, this.skewY = 0, this.rotation = -i, this.x = +e[4], this.y = +e[5], this.scaleX = r, this.scaleY = n, this.originX = 0, this.originY = 0;
    }
  }, t.prototype.decomposeTransform = function() {
    if (this.transform) {
      var e = this.parent, r = this.transform;
      e && e.transform && (e.invTransform = e.invTransform || jr(), Ko(fa, e.invTransform, r), r = fa);
      var n = this.originX, i = this.originY;
      (n || i) && (xc[4] = n, xc[5] = i, Ko(fa, r, xc), fa[4] -= n, fa[5] -= i, r = fa), this.setLocalTransform(r);
    }
  }, t.prototype.getGlobalScale = function(e) {
    var r = this.transform;
    return e = e || [], r ? (e[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), e[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (e[0] = -e[0]), r[3] < 0 && (e[1] = -e[1]), e) : (e[0] = 1, e[1] = 1, e);
  }, t.prototype.transformCoordToLocal = function(e, r) {
    var n = [e, r], i = this.invTransform;
    return i && dr(n, n, i), n;
  }, t.prototype.transformCoordToGlobal = function(e, r) {
    var n = [e, r], i = this.transform;
    return i && dr(n, n, i), n;
  }, t.prototype.getLineScale = function() {
    var e = this.transform;
    return e && Cc(e[0] - 1) > 1e-10 && Cc(e[3] - 1) > 1e-10 ? Math.sqrt(Cc(e[0] * e[3] - e[2] * e[1])) : 1;
  }, t.prototype.copyTransform = function(e) {
    Eu(this, e);
  }, t.getLocalTransform = function(e, r) {
    r = r || [];
    var n = e.originX || 0, i = e.originY || 0, a = e.scaleX, o = e.scaleY, s = e.anchorX, l = e.anchorY, u = e.rotation || 0, f = e.x, c = e.y, h = e.skewX ? Math.tan(e.skewX) : 0, v = e.skewY ? Math.tan(-e.skewY) : 0;
    if (n || i || s || l) {
      var d = n + s, p = i + l;
      r[4] = -d * a - h * p * o, r[5] = -p * o - v * d * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = v * a, r[2] = h * o, u && Ld(r, r, u), r[4] += n + f, r[5] += i + c, r;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.scaleX = e.scaleY = e.globalScaleRatio = 1, e.x = e.y = e.originX = e.originY = e.skewX = e.skewY = e.rotation = e.anchorX = e.anchorY = 0;
  })(), t;
})(), iA = Vs.getLocalTransform, Tf = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function Eu(t, e) {
  return zD(t, e, Tf);
}
function Qr(t) {
  cl || (cl = new Ya(100)), t = t || ai;
  var e = cl.get(t);
  return e || (e = {
    font: t,
    strWidthCache: new Ya(500),
    asciiWidthMap: null,
    asciiWidthMapTried: !1,
    stWideCharWidth: Ke.measureText("国", t).width,
    asciiCharWidth: Ke.measureText("a", t).width
  }, cl.put(t, e)), e;
}
var cl;
function aA(t) {
  if (!(Dc >= rm)) {
    t = t || ai;
    for (var e = [], r = +/* @__PURE__ */ new Date(), n = 0; n <= 127; n++)
      e[n] = Ke.measureText(String.fromCharCode(n), t).width;
    var i = +/* @__PURE__ */ new Date() - r;
    return i > 16 ? Dc = rm : i > 2 && Dc++, e;
  }
}
var Dc = 0, rm = 5;
function rS(t, e) {
  return t.asciiWidthMapTried || (t.asciiWidthMap = aA(t.font), t.asciiWidthMapTried = !0), 0 <= e && e <= 127 ? t.asciiWidthMap != null ? t.asciiWidthMap[e] : t.asciiCharWidth : t.stWideCharWidth;
}
function tn(t, e) {
  var r = t.strWidthCache, n = r.get(e);
  return n == null && (n = Ke.measureText(e, t.font).width, r.put(e, n)), n;
}
function nm(t, e, r, n) {
  var i = tn(Qr(e), t), a = wf(e), o = $a(0, i, r), s = ji(0, a, n), l = new mt(o, s, i, a);
  return l;
}
function nS(t, e, r, n) {
  var i = ((t || "") + "").split(`
`), a = i.length;
  if (a === 1)
    return nm(i[0], e, r, n);
  for (var o = new mt(0, 0, 0, 0), s = 0; s < i.length; s++) {
    var l = nm(i[s], e, r, n);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function $a(t, e, r, n) {
  return r === "right" ? n ? t += e : t -= e : r === "center" && (n ? t += e / 2 : t -= e / 2), t;
}
function ji(t, e, r, n) {
  return r === "middle" ? n ? t += e / 2 : t -= e / 2 : r === "bottom" && (n ? t += e : t -= e), t;
}
function wf(t) {
  return Qr(t).stWideCharWidth;
}
function Xa(t, e) {
  return typeof t == "string" ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
}
function iS(t, e, r) {
  var n = e.position || "inside", i = e.distance != null ? e.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, f = "left", c = "top";
  if (n instanceof Array)
    l += Xa(n[0], r.width), u += Xa(n[1], r.height), f = null, c = null;
  else
    switch (n) {
      case "left":
        l -= i, u += s, f = "right", c = "middle";
        break;
      case "right":
        l += i + o, u += s, c = "middle";
        break;
      case "top":
        l += o / 2, u -= i, f = "center", c = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + i, f = "center";
        break;
      case "inside":
        l += o / 2, u += s, f = "center", c = "middle";
        break;
      case "insideLeft":
        l += i, u += s, c = "middle";
        break;
      case "insideRight":
        l += o - i, u += s, f = "right", c = "middle";
        break;
      case "insideTop":
        l += o / 2, u += i, f = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - i, f = "center", c = "bottom";
        break;
      case "insideTopLeft":
        l += i, u += i;
        break;
      case "insideTopRight":
        l += o - i, u += i, f = "right";
        break;
      case "insideBottomLeft":
        l += i, u += a - i, c = "bottom";
        break;
      case "insideBottomRight":
        l += o - i, u += a - i, f = "right", c = "bottom";
        break;
    }
  return t = t || {}, t.x = l, t.y = u, t.align = f, t.verticalAlign = c, t;
}
var Mc = "__zr_normal__", Ac = Tf.concat(["ignore"]), oA = eo(Tf, function(t, e) {
  return t[e] = !0, t;
}, { ignore: !1 }), ca = {}, sA = new mt(0, 0, 0, 0), hl = [], eu = 0, xf = 1, Cf = (function() {
  function t(e) {
    this.id = k1(), this.animators = [], this.currentStates = [], this.states = {}, this._init(e);
  }
  return t.prototype._init = function(e) {
    this.attr(e);
  }, t.prototype.drift = function(e, r, n) {
    switch (this.draggable) {
      case "horizontal":
        r = 0;
        break;
      case "vertical":
        e = 0;
        break;
    }
    var i = this.transform;
    i || (i = this.transform = [1, 0, 0, 1, 0, 0]), i[4] += e, i[5] += r, this.decomposeTransform(), this.markRedraw();
  }, t.prototype.beforeUpdate = function() {
  }, t.prototype.afterUpdate = function() {
  }, t.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, t.prototype.updateInnerText = function(e) {
    var r = this._textContent;
    if (r && (!r.ignore || e)) {
      this.textConfig || (this.textConfig = {});
      var n = this.textConfig, i = n.local, a = r.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = i ? this : null;
      var u = !1;
      a.copyTransform(r);
      var f = n.position != null, c = n.autoOverflowArea, h = void 0;
      if ((c || f) && (h = sA, n.layoutRect ? h.copy(n.layoutRect) : h.copy(this.getBoundingRect()), i || h.applyTransform(this.transform)), f) {
        this.calculateTextPosition ? this.calculateTextPosition(ca, n, h) : iS(ca, n, h), a.x = ca.x, a.y = ca.y, o = ca.align, s = ca.verticalAlign;
        var v = n.origin;
        if (v && n.rotation != null) {
          var d = void 0, p = void 0;
          v === "center" ? (d = h.width * 0.5, p = h.height * 0.5) : (d = Xa(v[0], h.width), p = Xa(v[1], h.height)), u = !0, a.originX = -a.x + d + (i ? 0 : h.x), a.originY = -a.y + p + (i ? 0 : h.y);
        }
      }
      n.rotation != null && (a.rotation = n.rotation);
      var m = n.offset;
      m && (a.x += m[0], a.y += m[1], u || (a.originX = -m[0], a.originY = -m[1]));
      var g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      if (c) {
        var y = g.overflowRect = g.overflowRect || new mt(0, 0, 0, 0);
        a.getLocalTransform(hl), Hs(hl, hl), mt.copy(y, h), y.applyTransform(hl);
      } else
        g.overflowRect = null;
      var _ = n.inside == null ? typeof n.position == "string" && n.position.indexOf("inside") >= 0 : n.inside, S = void 0, b = void 0, T = void 0;
      _ && this.canBeInsideText() ? (S = n.insideFill, b = n.insideStroke, (S == null || S === "auto") && (S = this.getInsideTextFill()), (b == null || b === "auto") && (b = this.getInsideTextStroke(S), T = !0)) : (S = n.outsideFill, b = n.outsideStroke, (S == null || S === "auto") && (S = this.getOutsideFill()), (b == null || b === "auto") && (b = this.getOutsideStroke(S), T = !0)), S = S || "#000", (S !== g.fill || b !== g.stroke || T !== g.autoStroke || o !== g.align || s !== g.verticalAlign) && (l = !0, g.fill = S, g.stroke = b, g.autoStroke = T, g.align = o, g.verticalAlign = s, r.setDefaultTextStyle(g)), r.__dirty |= Fe, l && r.dirtyStyle(!0);
    }
  }, t.prototype.canBeInsideText = function() {
    return !0;
  }, t.prototype.getInsideTextFill = function() {
    return "#fff";
  }, t.prototype.getInsideTextStroke = function(e) {
    return "#000";
  }, t.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? ov : av;
  }, t.prototype.getOutsideStroke = function(e) {
    var r = this.__zr && this.__zr.getBackgroundColor(), n = typeof r == "string" && Jr(r);
    n || (n = [255, 255, 255, 1]);
    for (var i = n[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      n[o] = n[o] * i + (a ? 0 : 255) * (1 - i);
    return n[3] = 1, zs(n, "rgba");
  }, t.prototype.traverse = function(e, r) {
  }, t.prototype.attrKV = function(e, r) {
    e === "textConfig" ? this.setTextConfig(r) : e === "textContent" ? this.setTextContent(r) : e === "clipPath" ? this.setClipPath(r) : e === "extra" ? (this.extra = this.extra || {}, q(this.extra, r)) : this[e] = r;
  }, t.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, t.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, t.prototype.attr = function(e, r) {
    if (typeof e == "string")
      this.attrKV(e, r);
    else if (ft(e))
      for (var n = e, i = Kt(n), a = 0; a < i.length; a++) {
        var o = i[a];
        this.attrKV(o, e[o]);
      }
    return this.markRedraw(), this;
  }, t.prototype.saveCurrentToNormalState = function(e) {
    this._innerSaveToNormal(e);
    for (var r = this._normalState, n = 0; n < this.animators.length; n++) {
      var i = this.animators[n], a = i.__fromStateTransition;
      if (!(i.getLoop() || a && a !== Mc)) {
        var o = i.targetName, s = o ? r[o] : r;
        i.saveTo(s);
      }
    }
  }, t.prototype._innerSaveToNormal = function(e) {
    var r = this._normalState;
    r || (r = this._normalState = {}), e.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(e, r, Ac);
  }, t.prototype._savePrimaryToNormal = function(e, r, n) {
    for (var i = 0; i < n.length; i++) {
      var a = n[i];
      e[a] != null && !(a in r) && (r[a] = this[a]);
    }
  }, t.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, t.prototype.getState = function(e) {
    return this.states[e];
  }, t.prototype.ensureState = function(e) {
    var r = this.states;
    return r[e] || (r[e] = {}), r[e];
  }, t.prototype.clearStates = function(e) {
    this.useState(Mc, !1, e);
  }, t.prototype.useState = function(e, r, n, i) {
    var a = e === Mc, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(At(s, e) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(e)), u || (u = this.states && this.states[e]), !u && !a) {
          Cd("State " + e + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var f = this._textContent, c = im(this, f, u, i);
        c && !this.__inHover && (this.__inHover = c), this._applyStateObj(e, u, this._normalState, r, om(this, n, l), l);
        var h = this._textGuide;
        return f && f.useState(e, r, n, !!c), h && h.useState(e, r, n, !!c), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(e) : this.currentStates = [e], this._updateAnimationTargets(), this.markRedraw(), !c && this.__inHover && (this.__inHover = eu, this.__dirty &= ~Fe), u;
      }
    }
  }, t.prototype.useStates = function(e, r, n) {
    if (!e.length)
      this.clearStates();
    else {
      var i = [], a = this.currentStates, o = e.length, s = o === a.length;
      if (s) {
        for (var l = 0; l < o; l++)
          if (e[l] !== a[l]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var l = 0; l < o; l++) {
        var u = e[l], f = void 0;
        this.stateProxy && (f = this.stateProxy(u, e)), f || (f = this.states[u]), f && i.push(f);
      }
      var c = i[o - 1], h = this._textContent, v = im(this, h, c, n);
      v && !this.__inHover && (this.__inHover = v);
      var d = this._mergeStates(i), p = this.stateTransition;
      this.saveCurrentToNormalState(d), this._applyStateObj(e.join(","), d, this._normalState, !1, om(this, r, p), p);
      var m = this._textGuide;
      h && h.useStates(e, r, !!v), m && m.useStates(e, r, !!v), this._updateAnimationTargets(), this.currentStates = e.slice(), this.markRedraw(), !v && this.__inHover && (this.__inHover = eu, this.__dirty &= ~Fe);
    }
  }, t.prototype.isSilent = function() {
    for (var e = this; e; ) {
      if (e.silent)
        return !0;
      var r = e.__hostTarget;
      e = r ? e.ignoreHostSilent ? null : r : e.parent;
    }
    return !1;
  }, t.prototype._updateAnimationTargets = function() {
    for (var e = 0; e < this.animators.length; e++) {
      var r = this.animators[e];
      r.targetName && r.changeTarget(this[r.targetName]);
    }
  }, t.prototype.removeState = function(e) {
    var r = At(this.currentStates, e);
    if (r >= 0) {
      var n = this.currentStates.slice();
      n.splice(r, 1), this.useStates(n);
    }
  }, t.prototype.replaceState = function(e, r, n) {
    var i = this.currentStates.slice(), a = At(i, e), o = At(i, r) >= 0;
    a >= 0 ? o ? i.splice(a, 1) : i[a] = r : n && !o && i.push(r), this.useStates(i);
  }, t.prototype.toggleState = function(e, r) {
    r ? this.useState(e, !0) : this.removeState(e);
  }, t.prototype._mergeStates = function(e) {
    for (var r = {}, n, i = 0; i < e.length; i++) {
      var a = e[i];
      q(r, a), a.textConfig && (n = n || {}, q(n, a.textConfig));
    }
    return n && (r.textConfig = n), r;
  }, t.prototype._applyStateObj = function(e, r, n, i, a, o) {
    if (this.__inHover !== xf) {
      var s = !(r && i);
      r && r.textConfig ? (this.textConfig = q({}, i ? this.textConfig : n.textConfig), q(this.textConfig, r.textConfig)) : s && n.textConfig && (this.textConfig = n.textConfig);
      for (var l = {}, u = !1, f = 0; f < Ac.length; f++) {
        var c = Ac[f], h = a && oA[c];
        r && r[c] != null ? h ? (u = !0, l[c] = r[c]) : this[c] = r[c] : s && n[c] != null && (h ? (u = !0, l[c] = n[c]) : this[c] = n[c]);
      }
      if (!a)
        for (var f = 0; f < this.animators.length; f++) {
          var v = this.animators[f], d = v.targetName;
          v.getLoop() || v.__changeFinalValue(d ? (r || n)[d] : r || n);
        }
      u && this._transitionState(e, l, o);
    }
  }, t.prototype._attachComponent = function(e) {
    if (!(e.__zr && !e.__hostTarget) && e !== this) {
      var r = this.__zr;
      r && e.addSelfToZr(r), e.__zr = r, e.__hostTarget = this;
    }
  }, t.prototype._detachComponent = function(e) {
    e.__zr && e.removeSelfFromZr(e.__zr), e.__zr = null, e.__hostTarget = null;
  }, t.prototype.getClipPath = function() {
    return this._clipPath;
  }, t.prototype.setClipPath = function(e) {
    this._clipPath && this._clipPath !== e && this.removeClipPath(), this._attachComponent(e), this._clipPath = e, this.markRedraw();
  }, t.prototype.removeClipPath = function() {
    var e = this._clipPath;
    e && (this._detachComponent(e), this._clipPath = null, this.markRedraw());
  }, t.prototype.getTextContent = function() {
    return this._textContent;
  }, t.prototype.setTextContent = function(e) {
    var r = this._textContent;
    r !== e && (r && r !== e && this.removeTextContent(), e.innerTransformable = new Vs(), this._attachComponent(e), this._textContent = e, this.markRedraw());
  }, t.prototype.setTextConfig = function(e) {
    this.textConfig || (this.textConfig = {}), q(this.textConfig, e), this.markRedraw();
  }, t.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, t.prototype.removeTextContent = function() {
    var e = this._textContent;
    e && (e.innerTransformable = null, this._detachComponent(e), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, t.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, t.prototype.setTextGuideLine = function(e) {
    this._textGuide && this._textGuide !== e && this.removeTextGuideLine(), this._attachComponent(e), this._textGuide = e, this.markRedraw();
  }, t.prototype.removeTextGuideLine = function() {
    var e = this._textGuide;
    e && (this._detachComponent(e), this._textGuide = null, this.markRedraw());
  }, t.prototype.markRedraw = function() {
    this.__dirty |= Fe;
    var e = this.__zr;
    e && (this.__inHover ? e.refreshHover() : e.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, t.prototype.dirty = function() {
    this.markRedraw();
  }, t.prototype.addSelfToZr = function(e) {
    if (this.__zr !== e) {
      this.__zr = e;
      var r = this.animators;
      if (r)
        for (var n = 0; n < r.length; n++)
          e.animation.addAnimator(r[n]);
      this._clipPath && this._clipPath.addSelfToZr(e), this._textContent && this._textContent.addSelfToZr(e), this._textGuide && this._textGuide.addSelfToZr(e);
    }
  }, t.prototype.removeSelfFromZr = function(e) {
    if (this.__zr) {
      this.__zr = null;
      var r = this.animators;
      if (r)
        for (var n = 0; n < r.length; n++)
          e.animation.removeAnimator(r[n]);
      this._clipPath && this._clipPath.removeSelfFromZr(e), this._textContent && this._textContent.removeSelfFromZr(e), this._textGuide && this._textGuide.removeSelfFromZr(e);
    }
  }, t.prototype.animate = function(e, r, n) {
    var i = e ? this[e] : this, a = new Ed(i, r, n);
    return e && (a.targetName = e), this.addAnimator(a, e), a;
  }, t.prototype.addAnimator = function(e, r) {
    var n = this.__zr, i = this;
    e.during(function() {
      i.updateDuringAnimation(r);
    }).done(function() {
      var a = i.animators, o = At(a, e);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(e), n && n.animation.addAnimator(e), n && n.wakeUp();
  }, t.prototype.updateDuringAnimation = function(e) {
    this.markRedraw();
  }, t.prototype.stopAnimation = function(e, r) {
    for (var n = this.animators, i = n.length, a = [], o = 0; o < i; o++) {
      var s = n[o];
      !e || e === s.scope ? s.stop(r) : a.push(s);
    }
    return this.animators = a, this;
  }, t.prototype.animateTo = function(e, r, n) {
    Ic(this, e, r, n);
  }, t.prototype.animateFrom = function(e, r, n) {
    Ic(this, e, r, n, !0);
  }, t.prototype._transitionState = function(e, r, n, i) {
    for (var a = Ic(this, r, n, i), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = e;
  }, t.prototype.getBoundingRect = function() {
    return null;
  }, t.prototype.getPaintRect = function() {
    return null;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "element", e.name = "", e.ignore = e.silent = e.ignoreHostSilent = e.isGroup = e.draggable = e.dragging = e.ignoreClip = !1, e.__inHover = eu, e.__dirty = Fe;
    function r(n, i, a, o) {
      Object.defineProperty(e, n, {
        get: function() {
          if (!this[i]) {
            var l = this[i] = [];
            s(this, l);
          }
          return this[i];
        },
        set: function(l) {
          this[a] = l[0], this[o] = l[1], this[i] = l, s(this, l);
        }
      });
      function s(l, u) {
        Object.defineProperty(u, 0, {
          get: function() {
            return l[a];
          },
          set: function(f) {
            l[a] = f;
          }
        }), Object.defineProperty(u, 1, {
          get: function() {
            return l[o];
          },
          set: function(f) {
            l[o] = f;
          }
        });
      }
    }
    Object.defineProperty && (r("position", "_legacyPos", "x", "y"), r("scale", "_legacyScale", "scaleX", "scaleY"), r("origin", "_legacyOrigin", "originX", "originY"));
  })(), t;
})();
vn(Cf, dn);
vn(Cf, Vs);
function Ic(t, e, r, n, i) {
  r = r || {};
  var a = [];
  aS(t, "", t, e, r, n, a, i);
  var o = a.length, s = !1, l = r.done, u = r.aborted, f = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, c = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(d, p) {
    r.during(p);
  });
  for (var h = 0; h < a.length; h++) {
    var v = a[h];
    f && v.done(f), c && v.aborted(c), r.force && v.duration(r.duration), v.start(r.easing);
  }
  return a;
}
function Lc(t, e, r) {
  for (var n = 0; n < r; n++)
    t[n] = e[n];
}
function lA(t) {
  return He(t[0]);
}
function uA(t, e, r) {
  if (He(e[r]))
    if (He(t[r]) || (t[r] = []), ze(e[r])) {
      var n = e[r].length;
      t[r].length !== n && (t[r] = new e[r].constructor(n), Lc(t[r], e[r], n));
    } else {
      var i = e[r], a = t[r], o = i.length;
      if (lA(i))
        for (var s = i[0].length, l = 0; l < o; l++)
          a[l] ? Lc(a[l], i[l], s) : a[l] = Array.prototype.slice.call(i[l]);
      else
        Lc(a, i, o);
      a.length = i.length;
    }
  else
    t[r] = e[r];
}
function fA(t, e) {
  return t === e || He(t) && He(e) && cA(t, e);
}
function cA(t, e) {
  var r = t.length;
  if (r !== e.length)
    return !1;
  for (var n = 0; n < r; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
function aS(t, e, r, n, i, a, o, s) {
  for (var l = Kt(n), u = i.duration, f = i.delay, c = i.additive, h = i.setToFinal, v = !ft(a), d = t.animators, p = [], m = 0; m < l.length; m++) {
    var g = l[m], y = n[g];
    if (y != null && r[g] != null && (v || a[g]))
      if (ft(y) && !He(y) && !Sf(y)) {
        if (e) {
          s || (r[g] = y, t.updateDuringAnimation(e));
          continue;
        }
        aS(t, g, r[g], y, i, a && a[g], o, s);
      } else
        p.push(g);
    else s || (r[g] = y, t.updateDuringAnimation(e), p.push(g));
  }
  var _ = p.length;
  if (!c && _)
    for (var S = 0; S < d.length; S++) {
      var b = d[S];
      if (b.targetName === e) {
        var T = b.stopTracks(p);
        if (T) {
          var C = At(d, b);
          d.splice(C, 1);
        }
      }
    }
  if (i.force || (p = be(p, function(R) {
    return !fA(n[R], r[R]);
  }), _ = p.length), _ > 0 || i.force && !o.length) {
    var E = void 0, A = void 0, M = void 0;
    if (s) {
      A = {}, h && (E = {});
      for (var S = 0; S < _; S++) {
        var g = p[S];
        A[g] = r[g], h ? E[g] = n[g] : r[g] = n[g];
      }
    } else if (h) {
      M = {};
      for (var S = 0; S < _; S++) {
        var g = p[S];
        M[g] = jl(r[g]), uA(r, n, g);
      }
    }
    var b = new Ed(r, !1, !1, c ? be(d, function(B) {
      return B.targetName === e;
    }) : null);
    b.targetName = e, i.scope && (b.scope = i.scope), h && E && b.whenWithKeys(0, E, p), M && b.whenWithKeys(0, M, p), b.whenWithKeys(u ?? 500, s ? A : n, p).delay(f || 0), t.addAnimator(b, e), o.push(b);
  }
}
function im(t, e, r, n) {
  return !(r && r.hoverLayer || n) || am(t) || e && am(e) ? eu : xf;
}
function am(t) {
  return t.type === "text" || t.type === "tspan";
}
function om(t, e, r) {
  return !e && !t.__inHover && r && r.duration > 0;
}
var pe = (function(t) {
  Q(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isGroup = !0, n._children = [], n.attr(r), n;
  }
  return e.prototype.childrenRef = function() {
    return this._children;
  }, e.prototype.children = function() {
    return this._children.slice();
  }, e.prototype.childAt = function(r) {
    return this._children[r];
  }, e.prototype.childOfName = function(r) {
    for (var n = this._children, i = 0; i < n.length; i++)
      if (n[i].name === r)
        return n[i];
  }, e.prototype.childCount = function() {
    return this._children.length;
  }, e.prototype.add = function(r) {
    return r && r !== this && r.parent !== this && (this._children.push(r), this._doAdd(r)), this;
  }, e.prototype.addBefore = function(r, n) {
    if (r && r !== this && r.parent !== this && n && n.parent === this) {
      var i = this._children, a = i.indexOf(n);
      a >= 0 && (i.splice(a, 0, r), this._doAdd(r));
    }
    return this;
  }, e.prototype.replace = function(r, n) {
    var i = At(this._children, r);
    return i >= 0 && this.replaceAt(n, i), this;
  }, e.prototype.replaceAt = function(r, n) {
    var i = this._children, a = i[n];
    if (r && r !== this && r.parent !== this && r !== a) {
      i[n] = r, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(r);
    }
    return this;
  }, e.prototype._doAdd = function(r) {
    r.parent && r.parent.remove(r), r.parent = this;
    var n = this.__zr;
    n && n !== r.__zr && r.addSelfToZr(n), n && n.refresh();
  }, e.prototype.remove = function(r) {
    var n = this.__zr, i = this._children, a = At(i, r);
    return a < 0 ? this : (i.splice(a, 1), r.parent = null, n && r.removeSelfFromZr(n), n && n.refresh(), this);
  }, e.prototype.removeAll = function() {
    for (var r = this._children, n = this.__zr, i = 0; i < r.length; i++) {
      var a = r[i];
      n && a.removeSelfFromZr(n), a.parent = null;
    }
    return r.length = 0, this;
  }, e.prototype.eachChild = function(r, n) {
    for (var i = this._children, a = 0; a < i.length; a++) {
      var o = i[a];
      r.call(n, o, a);
    }
    return this;
  }, e.prototype.traverse = function(r, n) {
    for (var i = 0; i < this._children.length; i++) {
      var a = this._children[i], o = r.call(n, a);
      a.isGroup && !o && a.traverse(r, n);
    }
    return this;
  }, e.prototype.addSelfToZr = function(r) {
    t.prototype.addSelfToZr.call(this, r);
    for (var n = 0; n < this._children.length; n++) {
      var i = this._children[n];
      i.addSelfToZr(r);
    }
  }, e.prototype.removeSelfFromZr = function(r) {
    t.prototype.removeSelfFromZr.call(this, r);
    for (var n = 0; n < this._children.length; n++) {
      var i = this._children[n];
      i.removeSelfFromZr(r);
    }
  }, e.prototype.getBoundingRect = function(r) {
    for (var n = new mt(0, 0, 0, 0), i = r || this._children, a = [], o = null, s = 0; s < i.length; s++) {
      var l = i[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), f = l.getLocalTransform(a);
        f ? (mt.applyTransform(n, u, f), o = o || n.clone(), o.union(n)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || n;
  }, e;
})(Cf);
pe.prototype.type = "group";
var ru = {}, oS = {};
function hA(t) {
  delete oS[t];
}
function vA(t) {
  if (!t)
    return !1;
  if (typeof t == "string")
    return Iu(t, 1) < iv;
  if (t.colorStops) {
    for (var e = t.colorStops, r = 0, n = e.length, i = 0; i < n; i++)
      r += Iu(e[i].color, 1);
    return r /= n, r < iv;
  }
  return !1;
}
var dA = (function() {
  function t(e, r, n) {
    var i = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !1, this._darkMode = !1, n = n || {}, this.dom = r, this.id = e;
    var a = new EM(), o = n.renderer || "canvas";
    ru[o] || (o = Kt(ru)[0]), n.useDirtyRect = n.useDirtyRect == null ? !1 : n.useDirtyRect;
    var s = new ru[o](r, a, n, e), l = n.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !Tt.node && !Tt.worker && !l ? new rA(s.getViewportRoot(), s.root) : null, f = n.useCoarsePointer, c = f == null || f === "auto" ? Tt.touchEventsSupported : !!f, h = 44, v;
    c && (v = vt(n.pointerSize, h)), this.handler = new G1(a, s, u, s.root, v), this.animation = new qM({
      stage: {
        update: l ? null : function() {
          return i._flush(!1);
        }
      }
    }), l || this.animation.start();
  }
  return t.prototype.add = function(e) {
    this._disposed || !e || (this.storage.addRoot(e), e.addSelfToZr(this), this.refresh());
  }, t.prototype.remove = function(e) {
    this._disposed || !e || (this.storage.delRoot(e), e.removeSelfFromZr(this), this.refresh());
  }, t.prototype.configLayer = function(e, r) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(e, r), this.refresh());
  }, t.prototype.setBackgroundColor = function(e) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(e), this.refresh(), this._backgroundColor = e, this._darkMode = vA(e));
  }, t.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, t.prototype.setDarkMode = function(e) {
    this._darkMode = e;
  }, t.prototype.isDarkMode = function() {
    return this._darkMode;
  }, t.prototype.refreshImmediately = function(e) {
    this._disposed || this._refresh({
      animUpdate: !e,
      refresh: !0,
      refreshHover: !1
    });
  }, t.prototype._refresh = function(e) {
    e.animUpdate && this.animation.update(!0), this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh({
      refresh: e.refresh,
      refreshHover: e.refreshHover
    }), this._needsRefresh = this._needsRefreshHover = !1;
  }, t.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, t.prototype.flush = function() {
    this._disposed || this._flush(!0);
  }, t.prototype._flush = function(e) {
    var r, n = La(), i = this._needsRefresh, a = this._needsRefreshHover;
    (i || a) && (r = !0, this._refresh({
      animUpdate: e,
      refresh: i,
      refreshHover: a
    }));
    var o = La();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: o - n
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, t.prototype.setSleepAfterStill = function(e) {
    this._sleepAfterStill = e;
  }, t.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, t.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, t.prototype.refreshHoverImmediately = function() {
    this._disposed || this._refresh({
      animUpdate: !1,
      refresh: !1,
      refreshHover: !0
    });
  }, t.prototype.resize = function(e) {
    this._disposed || (e = e || {}, this.painter.resize(e.width, e.height), this.handler.resize());
  }, t.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, t.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, t.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, t.prototype.setCursorStyle = function(e) {
    this._disposed || this.handler.setCursorStyle(e);
  }, t.prototype.findHover = function(e, r) {
    if (!this._disposed)
      return this.handler.findHover(e, r);
  }, t.prototype.on = function(e, r, n) {
    return this._disposed || this.handler.on(e, r, n), this;
  }, t.prototype.off = function(e, r) {
    this._disposed || this.handler.off(e, r);
  }, t.prototype.trigger = function(e, r) {
    this._disposed || this.handler.trigger(e, r);
  }, t.prototype.clear = function() {
    if (!this._disposed) {
      for (var e = this.storage.getRoots(), r = 0; r < e.length; r++)
        e[r] instanceof pe && e[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, t.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, hA(this.id));
  }, t;
})();
function sm(t, e) {
  var r = new dA(k1(), t, e);
  return oS[r.id] = r, r;
}
function pA(t, e) {
  ru[t] = e;
}
var lm = 1e-4, sS = 20;
function gA(t) {
  return t.replace(/^\s+|\s+$/g, "");
}
var Ze = Math.min, Nt = Math.max, ce = Math.abs, Pn = Math.round, Ka = Math.floor, Us = Math.ceil, no = Math.pow, ms = Math.log, sv = Math.LN10, mA = Math.PI, yA = Math.random;
function um(t, e, r, n) {
  var i = e[0], a = e[1], o = r[0], s = r[1], l = a - i, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (n)
    if (l > 0) {
      if (t <= i)
        return o;
      if (t >= a)
        return s;
    } else {
      if (t >= i)
        return o;
      if (t <= a)
        return s;
    }
  else {
    if (t === i)
      return o;
    if (t === a)
      return s;
  }
  return (t - i) / l * u + o;
}
var Wr = _A;
function _A(t, e, r) {
  switch (t) {
    case "center":
    case "middle":
      t = "50%";
      break;
    case "left":
    case "top":
      t = "0%";
      break;
    case "right":
    case "bottom":
      t = "100%";
      break;
  }
  return lv(t, e, r);
}
function lv(t, e, r) {
  return at(t) ? SA(t) ? parseFloat(t) / 100 * e + (r || 0) : parseFloat(t) : t == null ? NaN : +t;
}
function SA(t) {
  return !!gA(t).match(/%$/);
}
function Mt(t, e, r) {
  return isNaN(e) ? r ? "" + t : +t : (e = Ze(Nt(0, e), sS), t = (+t).toFixed(e), r ? t : +t);
}
function lS(t) {
  return t.sort(function(e, r) {
    return e - r;
  }), t;
}
function Zn(t) {
  if (t = +t, isNaN(t))
    return 0;
  if (t > 1e-14) {
    for (var e = 1, r = 0; r < 15; r++, e *= 10)
      if (Pn(t * e) / e === t)
        return r;
  }
  return bA(t);
}
function bA(t) {
  var e = t.toString().toLowerCase(), r = e.indexOf("e"), n = r > 0 ? +e.slice(r + 1) : 0, i = r > 0 ? r : e.length, a = e.indexOf("."), o = a < 0 ? 0 : i - 1 - a;
  return Nt(0, o - n);
}
function TA(t, e, r) {
  var n = ce(t[1] - t[0]);
  if (!isFinite(n) || n === 0)
    return NaN;
  var i = ms(2 * ce(r || 1) * ce(n)) / sv, a = ms(ce(e)) / sv, o = Nt(0, Us(-i + a));
  return isFinite(o) || (o = NaN), o;
}
function wA(t, e) {
  var r = Nt(Zn(t), Zn(e)), n = t + e;
  return r > sS ? n : Mt(n, r);
}
var fm = no(2, 53) - 1;
function uS(t) {
  var e = mA * 2;
  return (t % e + e) % e;
}
function Pu(t) {
  return t > -lm && t < lm;
}
var xA = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function io(t) {
  if (t instanceof Date)
    return t;
  if (at(t)) {
    var e = xA.exec(t);
    if (!e)
      return /* @__PURE__ */ new Date(NaN);
    if (e[8]) {
      var r = +e[4] || 0;
      return e[8].toUpperCase() !== "Z" && (r -= +e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, r, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0));
    } else
      return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0);
  } else if (t == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Pn(t));
}
function fS(t) {
  return no(10, Pd(t));
}
function Pd(t) {
  if (t === 0)
    return 0;
  var e = Ka(ms(t) / sv);
  return t / no(10, e) >= 10 && e++, e;
}
var cS = 2;
function Rd(t, e) {
  var r = Pd(t), n = no(10, r), i = t / n, a;
  return e === cS ? a = 1 : e ? i < 1.5 ? a = 1 : i < 2.5 ? a = 2 : i < 4 ? a = 3 : i < 7 ? a = 5 : a = 10 : i < 1 ? a = 1 : i < 2 ? a = 2 : i < 3 ? a = 3 : i < 5 ? a = 5 : a = 10, t = a * n, Mt(t, -r);
}
function Ru(t) {
  var e = parseFloat(t);
  return e == t && (e !== 0 || !at(t) || t.indexOf("x") <= 0) ? e : NaN;
}
function CA(t) {
  return !isNaN(Ru(t));
}
function hS() {
  return Pn(yA() * 9);
}
function vS(t, e) {
  return e === 0 ? t : vS(e, t % e);
}
function cm(t, e) {
  return t == null ? e : e == null ? t : t * e / vS(t, e);
}
function un(t) {
  return t != null && isFinite(t);
}
var DA = "[ECharts] ", MA = typeof console < "u" && console.warn && console.log;
function AA(t, e, r) {
  MA && console[t](DA + e);
}
function dS(t, e) {
  AA("error", t);
}
function Ne(t) {
  throw new Error(t);
}
function hm(t, e, r) {
  return (e - t) * r + t;
}
var pS = "series\0", IA = "\0_ec_\0";
function Re(t) {
  return t instanceof Array ? t : t == null ? [] : [t];
}
function vm(t, e, r) {
  if (t) {
    t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
    for (var n = 0, i = r.length; n < i; n++) {
      var a = r[n];
      !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a]);
    }
  }
}
var dm = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function Gs(t) {
  return ft(t) && !J(t) && !(t instanceof Date) ? t.value : t;
}
function LA(t) {
  return ft(t) && !(t instanceof Array);
}
function EA(t, e, r) {
  var n = r === "normalMerge", i = r === "replaceMerge", a = r === "replaceAll";
  t = t || [], e = (e || []).slice();
  var o = gt();
  P(e, function(l, u) {
    if (!ft(l)) {
      e[u] = null;
      return;
    }
  });
  var s = PA(t, o, r);
  return (n || i) && RA(s, t, o, e), n && OA(s, e), n || i ? kA(s, e, i) : a && BA(s, e), NA(s), s;
}
function PA(t, e, r) {
  var n = [];
  if (r === "replaceAll")
    return n;
  for (var i = 0; i < t.length; i++) {
    var a = t[i];
    a && a.id != null && e.set(a.id, i), n.push({
      existing: r === "replaceMerge" || ys(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return n;
}
function RA(t, e, r, n) {
  P(n, function(i, a) {
    if (!(!i || i.id == null)) {
      var o = jo(i.id), s = r.get(o);
      if (s != null) {
        var l = t[s];
        En(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = i, l.existing = e[s], n[a] = null;
      }
    }
  });
}
function OA(t, e) {
  P(e, function(r, n) {
    if (!(!r || r.name == null))
      for (var i = 0; i < t.length; i++) {
        var a = t[i].existing;
        if (!t[i].newOption && a && (a.id == null || r.id == null) && !ys(r) && !ys(a) && gS("name", a, r)) {
          t[i].newOption = r, e[n] = null;
          return;
        }
      }
  });
}
function kA(t, e, r) {
  P(e, function(n) {
    if (n) {
      for (
        var i, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (i = t[a]) && (i.newOption || ys(i.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        i.existing && n.id != null && !gS("id", n, i.existing));
      )
        a++;
      i ? (i.newOption = n, i.brandNew = r) : t.push({
        newOption: n,
        brandNew: r,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function BA(t, e) {
  P(e, function(r) {
    t.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function NA(t) {
  var e = gt();
  P(t, function(r) {
    var n = r.existing;
    n && e.set(n.id, r);
  }), P(t, function(r) {
    var n = r.newOption;
    En(!n || n.id == null || !e.get(n.id) || e.get(n.id) === r, "id duplicates: " + (n && n.id)), n && n.id != null && e.set(n.id, r), !r.keyInfo && (r.keyInfo = {});
  }), P(t, function(r, n) {
    var i = r.existing, a = r.newOption, o = r.keyInfo;
    if (ft(a)) {
      if (o.name = a.name != null ? jo(a.name) : i ? i.name : pS + n, i)
        o.id = jo(i.id);
      else if (a.id != null)
        o.id = jo(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (e.get(o.id));
      }
      e.set(o.id, r);
    }
  });
}
function gS(t, e, r) {
  var n = en(e[t], null), i = en(r[t], null);
  return n != null && i != null && n === i;
}
function jo(t) {
  return en(t, "");
}
function en(t, e) {
  return t == null ? e : at(t) ? t : qt(t) || zh(t) ? t + "" : e;
}
function Od(t) {
  var e = t.name;
  return !!(e && e.indexOf(pS));
}
function ys(t) {
  return t && t.id != null && jo(t.id).indexOf(IA) === 0;
}
function FA(t, e, r) {
  P(t, function(n) {
    var i = n.newOption;
    ft(i) && (n.keyInfo.mainType = e, n.keyInfo.subType = HA(e, i, n.existing, r));
  });
}
function HA(t, e, r, n) {
  var i = e.type ? e.type : r ? r.subType : n.determineSubType(t, e);
  return i;
}
function ta(t, e) {
  if (e.dataIndexInside != null)
    return e.dataIndexInside;
  if (e.dataIndex != null)
    return J(e.dataIndex) ? pt(e.dataIndex, function(r) {
      return t.indexOfRawIndex(r);
    }) : t.indexOfRawIndex(e.dataIndex);
  if (e.name != null)
    return J(e.name) ? pt(e.name, function(r) {
      return t.indexOfName(r);
    }) : t.indexOfName(e.name);
}
function Wt() {
  var t = "__ec_inner_" + zA++;
  return function(e) {
    return e[t] || (e[t] = {});
  };
}
var zA = hS();
function Ec(t, e, r) {
  var n = kd(e, r), i = n.mainTypeSpecified, a = n.queryOptionMap, o = n.others, s = o, l = r ? r.defaultMainType : null;
  return !i && l && a.set(l, {}), a.each(function(u, f) {
    var c = Ws(t, f, u, {
      useDefault: l === f,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[f + "Models"] = c.models, s[f + "Model"] = c.models[0];
  }), s;
}
function kd(t, e) {
  var r;
  if (at(t)) {
    var n = {};
    n[t + "Index"] = 0, r = n;
  } else
    r = t;
  var i = gt(), a = {}, o = !1;
  return P(r, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], f = u[1], c = (u[2] || "").toLowerCase();
    if (!(!f || !c || e && e.includeMainTypes && At(e.includeMainTypes, f) < 0)) {
      o = o || !!f;
      var h = i.get(f) || i.set(f, {});
      h[c] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: i,
    others: a
  };
}
var ur = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function Ws(t, e, r, n) {
  n = n || ur;
  var i = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: i != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = n.useDefault && (l = t.getComponent(e)) ? [l] : [], s;
  }
  if (i === "none" || i === !1) {
    if (n.enableNone)
      return s.models = [], s;
    i = -1;
  }
  return i === "all" && (n.enableAll ? i = a = o = null : i = -1), s.models = t.queryComponents({
    mainType: e,
    index: i,
    id: a,
    name: o
  }), s;
}
function VA(t, e, r) {
  var n = {};
  n[e + "Id"] = t[e + "Id"], n[e + "Index"] = t[e + "Index"], n[e + "Name"] = t[e + "Name"];
  var i = {
    mainType: e,
    query: n
  };
  return r && (i.subType = r), i;
}
function mS(t, e, r) {
  t.setAttribute ? t.setAttribute(e, r) : t[e] = r;
}
function UA(t, e) {
  return t.getAttribute ? t.getAttribute(e) : t[e];
}
function GA(t) {
  return t === "auto" ? Tt.domSupported ? "html" : "richText" : t || "html";
}
function WA(t, e, r, n, i) {
  var a = e == null || e === "auto";
  if (n == null)
    return n;
  if (qt(n)) {
    var o = hm(r || 0, n, i);
    return Mt(o, a ? Math.max(Zn(r || 0), Zn(n)) : e);
  } else {
    if (at(n))
      return i < 1 ? r : n;
    for (var s = [], l = r, u = n, f = Math.max(l ? l.length : 0, u.length), c = 0; c < f; ++c) {
      var h = t.getDimensionInfo(c);
      if (h && h.type === "ordinal")
        s[c] = (i < 1 && l ? l : u)[c];
      else {
        var v = l && l[c] ? l[c] : 0, d = u[c], o = hm(v, d, i);
        s[c] = Mt(o, a ? Math.max(Zn(v), Zn(d)) : e);
      }
    }
    return s;
  }
}
function or() {
  return [1 / 0, -1 / 0];
}
function uv(t, e) {
  Rn(e) && (e < t[0] && (t[0] = e), e > t[1] && (t[1] = e));
}
function yS(t, e) {
  Rn(e) && e < t[0] && (t[0] = e);
}
function _S(t, e) {
  Rn(e) && e > t[1] && (t[1] = e);
}
function YA(t, e) {
  qa(e[0], e[1]) && (e[0] < t[0] && (t[0] = e[0]), e[1] > t[1] && (t[1] = e[1]));
}
function Rn(t) {
  return t != null && isFinite(t);
}
function qa(t, e) {
  return Rn(t) && Rn(e) && t <= e;
}
function $A(t) {
  var e = t[1] - t[0];
  return isFinite(e) && e >= 0;
}
function XA(t) {
  qa(t[0], t[1]) && t[0] > t[1] && (t[0] = t[1]);
}
function Bd(t, e, r) {
  var n = gt(), i = 0;
  P(t, function(a) {
    var o = e(a), s = n.get(o) || 0;
    r && r(a, s), !s && !r && (t[i++] = a), n.set(o, s + 1);
  }), r || (t.length = i);
}
function KA(t) {
  return t.value + "";
}
function qA(t) {
  return t + "";
}
function ZA(t, e, r) {
  var n = t.getData().count();
  return {
    progressiveRender: r.progressiveEnabled && e.incrementalPrepareRender && n >= r.threshold,
    large: t.get("large") && n >= t.get("largeThreshold"),
    // TODO: modDataCount should not updated if `appendData`, otherwise cause whole repaint.
    // see `test/candlestick-large3.html`
    modDataCount: t.get("progressiveChunkMode") === "mod" ? t.getData().count() : null
  };
}
function Nd(t) {
  return {
    overallReset: t
  };
}
var jA = ".", bi = "___EC__COMPONENT__CONTAINER___", SS = "___EC__EXTENDED_CLASS___";
function qr(t) {
  var e = {
    main: "",
    sub: ""
  };
  if (t) {
    var r = t.split(jA);
    e.main = r[0] || "", e.sub = r[1] || "";
  }
  return e;
}
function JA(t) {
  En(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
}
function QA(t) {
  return !!(t && t[SS]);
}
function Fd(t, e) {
  t.$constructor = t, t.extend = function(r) {
    var n = this, i;
    return tI(n) ? i = /** @class */
    (function(a) {
      Q(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(n) : (i = function() {
      (r.$constructor || n).apply(this, arguments);
    }, VD(i, this)), q(i.prototype, r), i[SS] = !0, i.extend = this.extend, i.superCall = nI, i.superApply = iI, i.superClass = n, i;
  };
}
function tI(t) {
  return _t(t) && /^class\s/.test(Function.prototype.toString.call(t));
}
function bS(t, e) {
  t.extend = e.extend;
}
var eI = Math.round(Math.random() * 10);
function rI(t) {
  var e = ["__\0is_clz", eI++].join("_");
  t.prototype[e] = !0, t.isInstance = function(r) {
    return !!(r && r[e]);
  };
}
function nI(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return this.superClass.prototype[e].apply(t, r);
}
function iI(t, e, r) {
  return this.superClass.prototype[e].apply(t, r);
}
function Df(t) {
  var e = {};
  t.registerClass = function(n) {
    var i = n.type || n.prototype.type;
    if (i) {
      JA(i), n.prototype.type = i;
      var a = qr(i);
      if (!a.sub)
        e[a.main] = n;
      else if (a.sub !== bi) {
        var o = r(a);
        o[a.sub] = n;
      }
    }
    return n;
  }, t.getClass = function(n, i, a) {
    var o = e[n];
    if (o && o[bi] && (o = i ? o[i] : null), a && !o)
      throw new Error(i ? "Component " + n + "." + (i || "") + " is used but not imported." : n + ".type should be specified.");
    return o;
  }, t.getClassesByMainType = function(n) {
    var i = qr(n), a = [], o = e[i.main];
    return o && o[bi] ? P(o, function(s, l) {
      l !== bi && a.push(s);
    }) : a.push(o), a;
  }, t.hasClass = function(n) {
    var i = qr(n);
    return !!e[i.main];
  }, t.getAllClassMainTypes = function() {
    var n = [];
    return P(e, function(i, a) {
      n.push(a);
    }), n;
  }, t.hasSubTypes = function(n) {
    var i = qr(n), a = e[i.main];
    return a && a[bi];
  };
  function r(n) {
    var i = e[n.main];
    return (!i || !i[bi]) && (i = e[n.main] = {}, i[bi] = !0), i;
  }
}
function _s(t, e) {
  for (var r = 0; r < t.length; r++)
    t[r][1] || (t[r][1] = t[r][0]);
  return e = e || !1, function(n, i, a) {
    for (var o = {}, s = 0; s < t.length; s++) {
      var l = t[s][1];
      if (!(i && At(i, l) >= 0 || a && At(a, l) < 0)) {
        var u = n.getShallow(l, e);
        u != null && (o[t[s][0]] = u);
      }
    }
    return o;
  };
}
var aI = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], oI = _s(aI), sI = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getAreaStyle = function(e, r) {
      return oI(this, e, r);
    }, t;
  })()
), fv = new Ya(50);
function lI(t) {
  if (typeof t == "string") {
    var e = fv.get(t);
    return e && e.image;
  } else
    return t;
}
function TS(t, e, r, n, i) {
  if (t)
    if (typeof t == "string") {
      if (e && e.__zrImageSrc === t || !r)
        return e;
      var a = fv.get(t), o = { hostEl: r, cb: n, cbPayload: i };
      return a ? (e = a.image, !Mf(e) && a.pending.push(o)) : (e = Ke.loadImage(t, pm, pm), e.__zrImageSrc = t, fv.put(t, e.__cachedImgObj = {
        image: e,
        pending: [o]
      })), e;
    } else
      return t;
  else return e;
}
function pm() {
  var t = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var e = 0; e < t.pending.length; e++) {
    var r = t.pending[e], n = r.cb;
    n && n(this, r.cbPayload), r.hostEl.dirty();
  }
  t.pending.length = 0;
}
function Mf(t) {
  return t && t.width && t.height;
}
var Pc = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function uI(t, e, r, n, i, a) {
  if (!r) {
    t.text = "", t.isTruncated = !1;
    return;
  }
  var o = (e + "").split(`
`);
  a = wS(r, n, i, a);
  for (var s = !1, l = {}, u = 0, f = o.length; u < f; u++)
    xS(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  t.text = o.join(`
`), t.isTruncated = s;
}
function wS(t, e, r, n) {
  n = n || {};
  var i = q({}, n);
  r = vt(r, "..."), i.maxIterations = vt(n.maxIterations, 2);
  var a = i.minChar = vt(n.minChar, 0), o = i.fontMeasureInfo = Qr(e), s = o.asciiCharWidth;
  i.placeholder = vt(n.placeholder, "");
  for (var l = t = Math.max(0, t - 1), u = 0; u < a && l >= s; u++)
    l -= s;
  var f = tn(o, r);
  return f > l && (r = "", f = 0), l = t - f, i.ellipsis = r, i.ellipsisWidth = f, i.contentWidth = l, i.containerWidth = t, i;
}
function xS(t, e, r) {
  var n = r.containerWidth, i = r.contentWidth, a = r.fontMeasureInfo;
  if (!n) {
    t.textLine = "", t.isTruncated = !1;
    return;
  }
  var o = tn(a, e);
  if (o <= n) {
    t.textLine = e, t.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= i || s >= r.maxIterations) {
      e += r.ellipsis;
      break;
    }
    var l = s === 0 ? fI(e, i, a) : o > 0 ? Math.floor(e.length * i / o) : 0;
    e = e.substr(0, l), o = tn(a, e);
  }
  e === "" && (e = r.placeholder), t.textLine = e, t.isTruncated = !0;
}
function fI(t, e, r) {
  for (var n = 0, i = 0, a = t.length; i < a && n < e; i++)
    n += rS(r, t.charCodeAt(i));
  return i;
}
function cI(t, e, r, n) {
  var i = Hd(t), a = e.overflow, o = e.padding, s = o ? o[1] + o[3] : 0, l = o ? o[0] + o[2] : 0, u = e.font, f = a === "truncate", c = wf(u), h = vt(e.lineHeight, c), v = e.lineOverflow === "truncate", d = !1, p = e.width;
  p == null && r != null && (p = r - s);
  var m = e.height;
  m == null && n != null && (m = n - l);
  var g;
  p != null && (a === "break" || a === "breakAll") ? g = i ? CS(i, e.font, p, a === "breakAll", 0).lines : [] : g = i ? i.split(`
`) : [];
  var y = g.length * h;
  if (m == null && (m = y), y > m && v) {
    var _ = Math.floor(m / h);
    d = d || g.length > _, g = g.slice(0, _), y = g.length * h;
  }
  if (i && f && p != null)
    for (var S = wS(p, u, e.ellipsis, {
      minChar: e.truncateMinChar,
      placeholder: e.placeholder
    }), b = {}, T = 0; T < g.length; T++)
      xS(b, g[T], S), g[T] = b.textLine, d = d || b.isTruncated;
  for (var C = m, E = 0, A = Qr(u), T = 0; T < g.length; T++)
    E = Math.max(tn(A, g[T]), E);
  p == null && (p = E);
  var M = p;
  return C += l, M += s, {
    lines: g,
    height: m,
    outerWidth: M,
    outerHeight: C,
    lineHeight: h,
    calculatedLineHeight: c,
    contentWidth: E,
    contentHeight: y,
    width: p,
    isTruncated: d
  };
}
var hI = /* @__PURE__ */ (function() {
  function t() {
  }
  return t;
})(), gm = /* @__PURE__ */ (function() {
  function t(e) {
    this.tokens = [], e && (this.tokens = e);
  }
  return t;
})(), vI = /* @__PURE__ */ (function() {
  function t() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return t;
})();
function dI(t, e, r, n, i) {
  var a = new vI(), o = Hd(t);
  if (!o)
    return a;
  var s = e.padding, l = s ? s[1] + s[3] : 0, u = s ? s[0] + s[2] : 0, f = e.width;
  f == null && r != null && (f = r - l);
  var c = e.height;
  c == null && n != null && (c = n - u);
  for (var h = e.overflow, v = (h === "break" || h === "breakAll") && f != null ? { width: f, accumWidth: 0, breakAll: h === "breakAll" } : null, d = Pc.lastIndex = 0, p; (p = Pc.exec(o)) != null; ) {
    var m = p.index;
    m > d && Rc(a, o.substring(d, m), e, v), Rc(a, p[2], e, v, p[1]), d = Pc.lastIndex;
  }
  d < o.length && Rc(a, o.substring(d, o.length), e, v);
  var g = [], y = 0, _ = 0, S = h === "truncate", b = e.lineOverflow === "truncate", T = {};
  function C(St, jt, ge) {
    St.width = jt, St.lineHeight = ge, y += ge, _ = Math.max(_, jt);
  }
  t: for (var E = 0; E < a.lines.length; E++) {
    for (var A = a.lines[E], M = 0, R = 0, B = 0; B < A.tokens.length; B++) {
      var O = A.tokens[B], F = O.styleName && e.rich[O.styleName] || {}, U = O.textPadding = F.padding, H = U ? U[1] + U[3] : 0, W = O.font = F.font || e.font;
      O.contentHeight = wf(W);
      var V = vt(F.height, O.contentHeight);
      if (O.innerHeight = V, U && (V += U[0] + U[2]), O.height = V, O.lineHeight = ka(F.lineHeight, e.lineHeight, V), O.align = F && F.align || i, O.verticalAlign = F && F.verticalAlign || "middle", b && c != null && y + O.lineHeight > c) {
        var j = a.lines.length;
        B > 0 ? (A.tokens = A.tokens.slice(0, B), C(A, R, M), a.lines = a.lines.slice(0, E + 1)) : a.lines = a.lines.slice(0, E), a.isTruncated = a.isTruncated || a.lines.length < j;
        break t;
      }
      var rt = F.width, tt = rt == null || rt === "auto";
      if (typeof rt == "string" && rt.charAt(rt.length - 1) === "%")
        O.percentWidth = rt, g.push(O), O.contentWidth = tn(Qr(W), O.text);
      else {
        if (tt) {
          var it = F.backgroundColor, ot = it && it.image;
          ot && (ot = lI(ot), Mf(ot) && (O.width = Math.max(O.width, ot.width * V / ot.height)));
        }
        var Z = S && f != null ? f - R : null;
        Z != null && Z < O.width ? !tt || Z < H ? (O.text = "", O.width = O.contentWidth = 0) : (uI(T, O.text, Z - H, W, e.ellipsis, { minChar: e.truncateMinChar }), O.text = T.text, a.isTruncated = a.isTruncated || T.isTruncated, O.width = O.contentWidth = tn(Qr(W), O.text)) : O.contentWidth = tn(Qr(W), O.text);
      }
      O.width += H, R += O.width, F && (M = Math.max(M, O.lineHeight));
    }
    C(A, R, M);
  }
  a.outerWidth = a.width = vt(f, _), a.outerHeight = a.height = vt(c, y), a.contentHeight = y, a.contentWidth = _, a.outerWidth += l, a.outerHeight += u;
  for (var E = 0; E < g.length; E++) {
    var O = g[E], bt = O.percentWidth;
    O.width = parseInt(bt, 10) / 100 * a.width;
  }
  return a;
}
function Rc(t, e, r, n, i) {
  var a = e === "", o = i && r.rich[i] || {}, s = t.lines, l = o.font || r.font, u = !1, f, c;
  if (n) {
    var h = o.padding, v = h ? h[1] + h[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = Xa(o.width, n.width) + v;
      s.length > 0 && d + n.accumWidth > n.width && (f = e.split(`
`), u = !0), n.accumWidth = d;
    } else {
      var p = CS(e, l, n.width, n.breakAll, n.accumWidth);
      n.accumWidth = p.accumWidth + v, c = p.linesWidths, f = p.lines;
    }
  }
  f || (f = e.split(`
`));
  for (var m = Qr(l), g = 0; g < f.length; g++) {
    var y = f[g], _ = new hI();
    if (_.styleName = i, _.text = y, _.isLineHolder = !y && !a, typeof o.width == "number" ? _.width = o.width : _.width = c ? c[g] : tn(m, y), !g && !u) {
      var S = (s[s.length - 1] || (s[0] = new gm())).tokens, b = S.length;
      b === 1 && S[0].isLineHolder ? S[0] = _ : (y || !b || a) && S.push(_);
    } else
      s.push(new gm([_]));
  }
}
function pI(t) {
  var e = t.charCodeAt(0);
  return e >= 32 && e <= 591 || e >= 880 && e <= 4351 || e >= 4608 && e <= 5119 || e >= 7680 && e <= 8303;
}
var gI = eo(",&?/;] ".split(""), function(t, e) {
  return t[e] = !0, t;
}, {});
function mI(t) {
  return pI(t) ? !!gI[t] : !0;
}
function CS(t, e, r, n, i) {
  for (var a = [], o = [], s = "", l = "", u = 0, f = 0, c = Qr(e), h = 0; h < t.length; h++) {
    var v = t.charAt(h);
    if (v === `
`) {
      l && (s += l, f += u), a.push(s), o.push(f), s = "", l = "", u = 0, f = 0;
      continue;
    }
    var d = rS(c, v.charCodeAt(0)), p = n ? !1 : !mI(v);
    if (a.length ? f + d > r : i + f + d > r) {
      f ? (s || l) && (p ? (s || (s = l, l = "", u = 0, f = u), a.push(s), o.push(f - u), l += v, u += d, s = "", f = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(f), s = v, f = d)) : p ? (a.push(l), o.push(u), l = v, u = d) : (a.push(v), o.push(d));
      continue;
    }
    f += d, p ? (l += v, u += d) : (l && (s += l, l = "", u = 0), s += v);
  }
  return l && (s += l), s && (a.push(s), o.push(f)), a.length === 1 && (f += i), {
    accumWidth: f,
    lines: a,
    linesWidths: o
  };
}
function mm(t, e, r, n, i, a) {
  if (t.baseX = r, t.baseY = n, t.outerWidth = t.outerHeight = null, !!e) {
    var o = e.width * 2, s = e.height * 2;
    mt.set(ym, $a(r, o, i), ji(n, s, a), o, s), mt.intersect(e, ym, null, _m);
    var l = _m.outIntersectRect;
    t.outerWidth = l.width, t.outerHeight = l.height, t.baseX = $a(l.x, l.width, i, !0), t.baseY = ji(l.y, l.height, a, !0);
  }
}
var ym = new mt(0, 0, 0, 0), _m = { outIntersectRect: {}, clamp: !0 };
function Hd(t) {
  return t != null ? t += "" : t = "";
}
function yI(t) {
  var e = Hd(t.text), r = t.font, n = tn(Qr(r), e), i = wf(r);
  return cv(t, n, i, null);
}
function cv(t, e, r, n) {
  var i = new mt($a(t.x || 0, e, t.textAlign), ji(t.y || 0, r, t.textBaseline), e, r), a = n ?? (DS(t) ? t.lineWidth : 0);
  return a > 0 && (i.x -= a / 2, i.y -= a / 2, i.width += a, i.height += a), i;
}
function DS(t) {
  var e = t.stroke;
  return e != null && e !== "none" && t.lineWidth > 0;
}
var hv = "__zr_style_" + Math.round(Math.random() * 10), Ji = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Af = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Ji[hv] = !0;
var Sm = ["z", "z2", "invisible"], _I = ["invisible"], Ys = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype._init = function(r) {
    for (var n = Kt(r), i = 0; i < n.length; i++) {
      var a = n[i];
      a === "style" ? this.useStyle(r[a]) : t.prototype.attrKV.call(this, a, r[a]);
    }
    this.style || this.useStyle({});
  }, e.prototype.beforeBrush = function(r) {
  }, e.prototype.afterBrush = function() {
  }, e.prototype.innerBeforeBrush = function() {
  }, e.prototype.innerAfterBrush = function() {
  }, e.prototype.shouldBePainted = function(r, n, i, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && SI(this, r, n) || o && !o[0] && !o[3])
      return !1;
    if (i && this.__clipPaths && this.__clipPaths.length) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, e.prototype.contain = function(r, n) {
    return this.rectContain(r, n);
  }, e.prototype.traverse = function(r, n) {
    r.call(n, this);
  }, e.prototype.rectContain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect();
    return a.contain(i[0], i[1]);
  }, e.prototype.getPaintRect = function() {
    var r = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var n = this.transform, i = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      r = this._paintRect || (this._paintRect = new mt(0, 0, 0, 0)), n ? mt.applyTransform(r, i, n) : r.copy(i), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
      var u = this.dirtyRectTolerance;
      r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2));
    }
    return r;
  }, e.prototype.setPrevPaintRect = function(r) {
    r ? (this._prevPaintRect = this._prevPaintRect || new mt(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null;
  }, e.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, e.prototype.animateStyle = function(r) {
    return this.animate("style", r);
  }, e.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : this.markRedraw();
  }, e.prototype.attrKV = function(r, n) {
    r !== "style" ? t.prototype.attrKV.call(this, r, n) : this.style ? this.setStyle(n) : this.useStyle(n);
  }, e.prototype.setStyle = function(r, n) {
    return typeof r == "string" ? this.style[r] = n : q(this.style, r), this.dirtyStyle(), this;
  }, e.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= Po, this._rect && (this._rect = null);
  }, e.prototype.dirty = function() {
    this.dirtyStyle();
  }, e.prototype.styleChanged = function() {
    return !!(this.__dirty & Po);
  }, e.prototype.styleUpdated = function() {
    this.__dirty &= ~Po;
  }, e.prototype.createStyle = function(r) {
    return bf(Ji, r);
  }, e.prototype.useStyle = function(r) {
    r[hv] || (r = this.createStyle(r)), this.style = r, this.dirtyStyle();
  }, e.prototype._useHoverStyle = function(r) {
    this.__hoverStyle = r;
  }, e.prototype.isStyleObject = function(r) {
    return r[hv];
  }, e.prototype._innerSaveToNormal = function(r) {
    t.prototype._innerSaveToNormal.call(this, r);
    var n = this._normalState;
    r.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, n, Sm);
  }, e.prototype._applyStateObj = function(r, n, i, a, o, s) {
    t.prototype._applyStateObj.call(this, r, n, i, a, o, s);
    var l = !(n && a), u = this.__inHover === xf, f;
    if (n && n.style ? o ? a ? f = n.style : (f = this._mergeStyle(this.createStyle(), i.style), this._mergeStyle(f, n.style)) : (f = this._mergeStyle(this.createStyle(), a ? this.style : i.style), this._mergeStyle(f, n.style)) : l && (f = i.style), f)
      if (o) {
        var c = this.style;
        if (this.style = this.createStyle(l ? {} : c), l)
          for (var h = Kt(c), v = 0; v < h.length; v++) {
            var d = h[v];
            d in f && (f[d] = f[d], this.style[d] = c[d]);
          }
        for (var p = Kt(f), v = 0; v < p.length; v++) {
          var d = p[v];
          this.style[d] = this.style[d];
        }
        this._transitionState(r, {
          style: f
        }, s, this.getAnimationStyleProps());
      } else
        u ? this._useHoverStyle(f) : this.useStyle(f);
    if (!u)
      for (var m = this.__inHover ? _I : Sm, v = 0; v < m.length; v++) {
        var d = m[v];
        n && n[d] != null ? this[d] = n[d] : l && i[d] != null && (this[d] = i[d]);
      }
  }, e.prototype._mergeStates = function(r) {
    for (var n = t.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (i = i || {}, this._mergeStyle(i, o.style));
    }
    return i && (n.style = i), n;
  }, e.prototype._mergeStyle = function(r, n) {
    return q(r, n), r;
  }, e.prototype.getAnimationStyleProps = function() {
    return Af;
  }, e.initDefaultProps = (function() {
    var r = e.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = 0, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = Fe | Po;
  })(), e;
})(Cf), Oc = new mt(0, 0, 0, 0), kc = new mt(0, 0, 0, 0);
function SI(t, e, r) {
  return Oc.copy(t.getBoundingRect()), t.transform && Oc.applyTransform(t.transform), kc.width = e, kc.height = r, !Oc.intersect(kc);
}
var sr = Math.min, lr = Math.max, Bc = Math.sin, Nc = Math.cos, Ti = Math.PI * 2, vl = ro(), dl = ro(), pl = ro();
function bm(t, e, r, n, i, a) {
  i[0] = sr(t, r), i[1] = sr(e, n), a[0] = lr(t, r), a[1] = lr(e, n);
}
var Tm = [], wm = [];
function bI(t, e, r, n, i, a, o, s, l, u) {
  var f = K1, c = de, h = f(t, r, i, o, Tm);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var v = 0; v < h; v++) {
    var d = c(t, r, i, o, Tm[v]);
    l[0] = sr(d, l[0]), u[0] = lr(d, u[0]);
  }
  h = f(e, n, a, s, wm);
  for (var v = 0; v < h; v++) {
    var p = c(e, n, a, s, wm[v]);
    l[1] = sr(p, l[1]), u[1] = lr(p, u[1]);
  }
  l[0] = sr(t, l[0]), u[0] = lr(t, u[0]), l[0] = sr(o, l[0]), u[0] = lr(o, u[0]), l[1] = sr(e, l[1]), u[1] = lr(e, u[1]), l[1] = sr(s, l[1]), u[1] = lr(s, u[1]);
}
function TI(t, e, r, n, i, a, o, s) {
  var l = q1, u = Be, f = lr(sr(l(t, r, i), 1), 0), c = lr(sr(l(e, n, a), 1), 0), h = u(t, r, i, f), v = u(e, n, a, c);
  o[0] = sr(t, i, h), o[1] = sr(e, a, v), s[0] = lr(t, i, h), s[1] = lr(e, a, v);
}
function wI(t, e, r, n, i, a, o, s, l) {
  var u = Ma, f = Aa, c = Math.abs(i - a);
  if (c % Ti < 1e-4 && c > 1e-4) {
    s[0] = t - r, s[1] = e - n, l[0] = t + r, l[1] = e + n;
    return;
  }
  if (vl[0] = Nc(i) * r + t, vl[1] = Bc(i) * n + e, dl[0] = Nc(a) * r + t, dl[1] = Bc(a) * n + e, u(s, vl, dl), f(l, vl, dl), i = i % Ti, i < 0 && (i = i + Ti), a = a % Ti, a < 0 && (a = a + Ti), i > a && !o ? a += Ti : i < a && o && (i += Ti), o) {
    var h = a;
    a = i, i = h;
  }
  for (var v = 0; v < a; v += Math.PI / 2)
    v > i && (pl[0] = Nc(v) * r + t, pl[1] = Bc(v) * n + e, u(s, pl, s), f(l, pl, l));
}
var Lt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, wi = [], xi = [], kr = [], Nn = [], Br = [], Nr = [], Fc = Math.min, Hc = Math.max, Ci = Math.cos, Di = Math.sin, _n = Math.abs, vv = Math.PI, Yn = vv * 2, zc = typeof Float32Array < "u", ho = [];
function Vc(t) {
  var e = Math.round(t / vv * 1e8) / 1e8;
  return e % 2 * vv;
}
function xI(t, e) {
  var r = Vc(t[0]);
  r < 0 && (r += Yn);
  var n = r - t[0], i = t[1];
  i += n, !e && i - r >= Yn ? i = r + Yn : e && r - i >= Yn ? i = r - Yn : !e && r > i ? i = r + (Yn - Vc(r - i)) : e && r < i && (i = r - (Yn - Vc(i - r))), t[0] = r, t[1] = i;
}
var ea = (function() {
  function t(e) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, e && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return t.prototype.increaseVersion = function() {
    this._version++;
  }, t.prototype.getVersion = function() {
    return this._version;
  }, t.prototype.setScale = function(e, r, n) {
    n = n || 0, n > 0 && (this._ux = _n(n / Lu / e) || 0, this._uy = _n(n / Lu / r) || 0);
  }, t.prototype.setDPR = function(e) {
    this.dpr = e;
  }, t.prototype.setContext = function(e) {
    this._ctx = e;
  }, t.prototype.getContext = function() {
    return this._ctx;
  }, t.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, t.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, t.prototype.moveTo = function(e, r) {
    return this._drawPendingPt(), this.addData(Lt.M, e, r), this._ctx && this._ctx.moveTo(e, r), this._x0 = e, this._y0 = r, this._xi = e, this._yi = r, this;
  }, t.prototype.lineTo = function(e, r) {
    var n = _n(e - this._xi), i = _n(r - this._yi), a = n > this._ux || i > this._uy;
    if (this.addData(Lt.L, e, r), this._ctx && a && this._ctx.lineTo(e, r), a)
      this._xi = e, this._yi = r, this._pendingPtDist = 0;
    else {
      var o = n * n + i * i;
      o > this._pendingPtDist && (this._pendingPtX = e, this._pendingPtY = r, this._pendingPtDist = o);
    }
    return this;
  }, t.prototype.bezierCurveTo = function(e, r, n, i, a, o) {
    return this._drawPendingPt(), this.addData(Lt.C, e, r, n, i, a, o), this._ctx && this._ctx.bezierCurveTo(e, r, n, i, a, o), this._xi = a, this._yi = o, this;
  }, t.prototype.quadraticCurveTo = function(e, r, n, i) {
    return this._drawPendingPt(), this.addData(Lt.Q, e, r, n, i), this._ctx && this._ctx.quadraticCurveTo(e, r, n, i), this._xi = n, this._yi = i, this;
  }, t.prototype.arc = function(e, r, n, i, a, o) {
    this._drawPendingPt(), ho[0] = i, ho[1] = a, xI(ho, o), i = ho[0], a = ho[1];
    var s = a - i;
    return this.addData(Lt.A, e, r, n, n, i, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(e, r, n, i, a, o), this._xi = Ci(a) * n + e, this._yi = Di(a) * n + r, this;
  }, t.prototype.arcTo = function(e, r, n, i, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(e, r, n, i, a), this;
  }, t.prototype.rect = function(e, r, n, i) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(e, r, n, i), this.addData(Lt.R, e, r, n, i), this;
  }, t.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(Lt.Z);
    var e = this._ctx, r = this._x0, n = this._y0;
    return e && e.closePath(), this._xi = r, this._yi = n, this;
  }, t.prototype.fill = function(e) {
    e && e.fill(), this.toStatic();
  }, t.prototype.stroke = function(e) {
    e && e.stroke(), this.toStatic();
  }, t.prototype.len = function() {
    return this._len;
  }, t.prototype.setData = function(e) {
    if (this._saveData) {
      var r = e.length;
      !(this.data && this.data.length === r) && zc && (this.data = new Float32Array(r));
      for (var n = 0; n < r; n++)
        this.data[n] = e[n];
      this._len = r;
    }
  }, t.prototype.appendPath = function(e) {
    if (this._saveData) {
      e instanceof Array || (e = [e]);
      for (var r = e.length, n = 0, i = this._len, a = 0; a < r; a++)
        n += e[a].len();
      var o = this.data;
      if (zc && (o instanceof Float32Array || !o) && (this.data = new Float32Array(i + n), i > 0 && o))
        for (var s = 0; s < i; s++)
          this.data[s] = o[s];
      for (var a = 0; a < r; a++)
        for (var l = e[a].data, s = 0; s < l.length; s++)
          this.data[i++] = l[s];
      this._len = i;
    }
  }, t.prototype.addData = function(e, r, n, i, a, o, s, l, u) {
    if (this._saveData) {
      var f = this.data;
      this._len + arguments.length > f.length && (this._expandData(), f = this.data);
      for (var c = 0; c < arguments.length; c++)
        f[this._len++] = arguments[c];
    }
  }, t.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, t.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var e = [], r = 0; r < this._len; r++)
        e[r] = this.data[r];
      this.data = e;
    }
  }, t.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var e = this.data;
      e instanceof Array && (e.length = this._len, zc && this._len > 11 && (this.data = new Float32Array(e)));
    }
  }, t.prototype.getBoundingRect = function() {
    kr[0] = kr[1] = Br[0] = Br[1] = Number.MAX_VALUE, Nn[0] = Nn[1] = Nr[0] = Nr[1] = -Number.MAX_VALUE;
    var e = this.data, r = 0, n = 0, i = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = e[o++], l = o === 1;
      switch (l && (r = e[o], n = e[o + 1], i = r, a = n), s) {
        case Lt.M:
          r = i = e[o++], n = a = e[o++], Br[0] = i, Br[1] = a, Nr[0] = i, Nr[1] = a;
          break;
        case Lt.L:
          bm(r, n, e[o], e[o + 1], Br, Nr), r = e[o++], n = e[o++];
          break;
        case Lt.C:
          bI(r, n, e[o++], e[o++], e[o++], e[o++], e[o], e[o + 1], Br, Nr), r = e[o++], n = e[o++];
          break;
        case Lt.Q:
          TI(r, n, e[o++], e[o++], e[o], e[o + 1], Br, Nr), r = e[o++], n = e[o++];
          break;
        case Lt.A:
          var u = e[o++], f = e[o++], c = e[o++], h = e[o++], v = e[o++], d = e[o++] + v;
          o += 1;
          var p = !e[o++];
          l && (i = Ci(v) * c + u, a = Di(v) * h + f), wI(u, f, c, h, v, d, p, Br, Nr), r = Ci(d) * c + u, n = Di(d) * h + f;
          break;
        case Lt.R:
          i = r = e[o++], a = n = e[o++];
          var m = e[o++], g = e[o++];
          bm(i, a, i + m, a + g, Br, Nr);
          break;
        case Lt.Z:
          r = i, n = a;
          break;
      }
      Ma(kr, kr, Br), Aa(Nn, Nn, Nr);
    }
    return o === 0 && (kr[0] = kr[1] = Nn[0] = Nn[1] = 0), new mt(kr[0], kr[1], Nn[0] - kr[0], Nn[1] - kr[1]);
  }, t.prototype._calculateLength = function() {
    var e = this.data, r = this._len, n = this._ux, i = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, f = 0, c = 0, h = 0; h < r; ) {
      var v = e[h++], d = h === 1;
      d && (a = e[h], o = e[h + 1], s = a, l = o);
      var p = -1;
      switch (v) {
        case Lt.M:
          a = s = e[h++], o = l = e[h++];
          break;
        case Lt.L: {
          var m = e[h++], g = e[h++], y = m - a, _ = g - o;
          (_n(y) > n || _n(_) > i || h === r - 1) && (p = Math.sqrt(y * y + _ * _), a = m, o = g);
          break;
        }
        case Lt.C: {
          var S = e[h++], b = e[h++], m = e[h++], g = e[h++], T = e[h++], C = e[h++];
          p = RM(a, o, S, b, m, g, T, C, 10), a = T, o = C;
          break;
        }
        case Lt.Q: {
          var S = e[h++], b = e[h++], m = e[h++], g = e[h++];
          p = BM(a, o, S, b, m, g, 10), a = m, o = g;
          break;
        }
        case Lt.A:
          var E = e[h++], A = e[h++], M = e[h++], R = e[h++], B = e[h++], O = e[h++], F = O + B;
          h += 1, d && (s = Ci(B) * M + E, l = Di(B) * R + A), p = Hc(M, R) * Fc(Yn, Math.abs(O)), a = Ci(F) * M + E, o = Di(F) * R + A;
          break;
        case Lt.R: {
          s = a = e[h++], l = o = e[h++];
          var U = e[h++], H = e[h++];
          p = U * 2 + H * 2;
          break;
        }
        case Lt.Z: {
          var y = s - a, _ = l - o;
          p = Math.sqrt(y * y + _ * _), a = s, o = l;
          break;
        }
      }
      p >= 0 && (u[c++] = p, f += p);
    }
    return this._pathLen = f, f;
  }, t.prototype.rebuildPath = function(e, r) {
    var n = this.data, i = this._ux, a = this._uy, o = this._len, s, l, u, f, c, h, v = r < 1, d, p, m = 0, g = 0, y, _ = 0, S, b;
    if (!(v && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, p = this._pathLen, y = r * p, !y)))
      t: for (var T = 0; T < o; ) {
        var C = n[T++], E = T === 1;
        switch (E && (u = n[T], f = n[T + 1], s = u, l = f), C !== Lt.L && _ > 0 && (e.lineTo(S, b), _ = 0), C) {
          case Lt.M:
            s = u = n[T++], l = f = n[T++], e.moveTo(u, f);
            break;
          case Lt.L: {
            c = n[T++], h = n[T++];
            var A = _n(c - u), M = _n(h - f);
            if (A > i || M > a) {
              if (v) {
                var R = d[g++];
                if (m + R > y) {
                  var B = (y - m) / R;
                  e.lineTo(u * (1 - B) + c * B, f * (1 - B) + h * B);
                  break t;
                }
                m += R;
              }
              e.lineTo(c, h), u = c, f = h, _ = 0;
            } else {
              var O = A * A + M * M;
              O > _ && (S = c, b = h, _ = O);
            }
            break;
          }
          case Lt.C: {
            var F = n[T++], U = n[T++], H = n[T++], W = n[T++], V = n[T++], j = n[T++];
            if (v) {
              var R = d[g++];
              if (m + R > y) {
                var B = (y - m) / R;
                Mu(u, F, H, V, B, wi), Mu(f, U, W, j, B, xi), e.bezierCurveTo(wi[1], xi[1], wi[2], xi[2], wi[3], xi[3]);
                break t;
              }
              m += R;
            }
            e.bezierCurveTo(F, U, H, W, V, j), u = V, f = j;
            break;
          }
          case Lt.Q: {
            var F = n[T++], U = n[T++], H = n[T++], W = n[T++];
            if (v) {
              var R = d[g++];
              if (m + R > y) {
                var B = (y - m) / R;
                Au(u, F, H, B, wi), Au(f, U, W, B, xi), e.quadraticCurveTo(wi[1], xi[1], wi[2], xi[2]);
                break t;
              }
              m += R;
            }
            e.quadraticCurveTo(F, U, H, W), u = H, f = W;
            break;
          }
          case Lt.A:
            var rt = n[T++], tt = n[T++], it = n[T++], ot = n[T++], Z = n[T++], bt = n[T++], St = n[T++], jt = !n[T++], ge = it > ot ? it : ot, Ct = _n(it - ot) > 1e-3, Jt = Z + bt, x = !1;
            if (v) {
              var R = d[g++];
              m + R > y && (Jt = Z + bt * (y - m) / R, x = !0), m += R;
            }
            if (Ct && e.ellipse ? e.ellipse(rt, tt, it, ot, St, Z, Jt, jt) : e.arc(rt, tt, ge, Z, Jt, jt), x)
              break t;
            E && (s = Ci(Z) * it + rt, l = Di(Z) * ot + tt), u = Ci(Jt) * it + rt, f = Di(Jt) * ot + tt;
            break;
          case Lt.R:
            s = u = n[T], l = f = n[T + 1], c = n[T++], h = n[T++];
            var D = n[T++], N = n[T++];
            if (v) {
              var R = d[g++];
              if (m + R > y) {
                var k = y - m;
                e.moveTo(c, h), e.lineTo(c + Fc(k, D), h), k -= D, k > 0 && e.lineTo(c + D, h + Fc(k, N)), k -= N, k > 0 && e.lineTo(c + Hc(D - k, 0), h + N), k -= D, k > 0 && e.lineTo(c, h + Hc(N - k, 0));
                break t;
              }
              m += R;
            }
            e.rect(c, h, D, N);
            break;
          case Lt.Z:
            if (v) {
              var R = d[g++];
              if (m + R > y) {
                var B = (y - m) / R;
                e.lineTo(u * (1 - B) + s * B, f * (1 - B) + l * B);
                break t;
              }
              m += R;
            }
            e.closePath(), u = s, f = l;
        }
      }
  }, t.prototype.clone = function() {
    var e = new t(), r = this.data;
    return e.data = r.slice ? r.slice() : Array.prototype.slice.call(r), e._len = this._len, e;
  }, t.prototype.canSave = function() {
    return !!this._saveData;
  }, t.CMD = Lt, t.initDefaultProps = (function() {
    var e = t.prototype;
    e._saveData = !0, e._ux = 0, e._uy = 0, e._pendingPtDist = 0, e._version = 0;
  })(), t;
})();
function ha(t, e, r, n, i, a, o) {
  if (i === 0)
    return !1;
  var s = i, l = 0, u = t;
  if (o > e + s && o > n + s || o < e - s && o < n - s || a > t + s && a > r + s || a < t - s && a < r - s)
    return !1;
  if (t !== r)
    l = (e - n) / (t - r), u = (t * n - r * e) / (t - r);
  else
    return Math.abs(a - t) <= s / 2;
  var f = l * a - o + u, c = f * f / (l * l + 1);
  return c <= s / 2 * s / 2;
}
function CI(t, e, r, n, i, a, o, s, l, u, f) {
  if (l === 0)
    return !1;
  var c = l;
  if (f > e + c && f > n + c && f > a + c && f > s + c || f < e - c && f < n - c && f < a - c && f < s - c || u > t + c && u > r + c && u > i + c && u > o + c || u < t - c && u < r - c && u < i - c && u < o - c)
    return !1;
  var h = PM(t, e, r, n, i, a, o, s, u, f);
  return h <= c / 2;
}
function DI(t, e, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > e + u && l > n + u && l > a + u || l < e - u && l < n - u && l < a - u || s > t + u && s > r + u && s > i + u || s < t - u && s < r - u && s < i - u)
    return !1;
  var f = kM(t, e, r, n, i, a, s, l);
  return f <= u / 2;
}
var xm = Math.PI * 2;
function gl(t) {
  return t %= xm, t < 0 && (t += xm), t;
}
var vo = Math.PI * 2;
function MI(t, e, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= t, l -= e;
  var f = Math.sqrt(s * s + l * l);
  if (f - u > r || f + u < r)
    return !1;
  if (Math.abs(n - i) % vo < 1e-4)
    return !0;
  if (a) {
    var c = n;
    n = gl(i), i = gl(c);
  } else
    n = gl(n), i = gl(i);
  n > i && (i += vo);
  var h = Math.atan2(l, s);
  return h < 0 && (h += vo), h >= n && h <= i || h + vo >= n && h + vo <= i;
}
function Mi(t, e, r, n, i, a) {
  if (a > e && a > n || a < e && a < n || n === e)
    return 0;
  var o = (a - e) / (n - e), s = n < e ? 1 : -1;
  (o === 1 || o === 0) && (s = n < e ? 0.5 : -0.5);
  var l = o * (r - t) + t;
  return l === i ? 1 / 0 : l > i ? s : 0;
}
var Fn = ea.CMD, Ai = Math.PI * 2, AI = 1e-4;
function II(t, e) {
  return Math.abs(t - e) < AI;
}
var Ae = [-1, -1, -1], ir = [-1, -1];
function LI() {
  var t = ir[0];
  ir[0] = ir[1], ir[1] = t;
}
function EI(t, e, r, n, i, a, o, s, l, u) {
  if (u > e && u > n && u > a && u > s || u < e && u < n && u < a && u < s)
    return 0;
  var f = Du(e, n, a, s, u, Ae);
  if (f === 0)
    return 0;
  for (var c = 0, h = -1, v = void 0, d = void 0, p = 0; p < f; p++) {
    var m = Ae[p], g = m === 0 || m === 1 ? 0.5 : 1, y = de(t, r, i, o, m);
    y < l || (h < 0 && (h = K1(e, n, a, s, ir), ir[1] < ir[0] && h > 1 && LI(), v = de(e, n, a, s, ir[0]), h > 1 && (d = de(e, n, a, s, ir[1]))), h === 2 ? m < ir[0] ? c += v < e ? g : -g : m < ir[1] ? c += d < v ? g : -g : c += s < d ? g : -g : m < ir[0] ? c += v < e ? g : -g : c += s < v ? g : -g);
  }
  return c;
}
function PI(t, e, r, n, i, a, o, s) {
  if (s > e && s > n && s > a || s < e && s < n && s < a)
    return 0;
  var l = OM(e, n, a, s, Ae);
  if (l === 0)
    return 0;
  var u = q1(e, n, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, c = Be(e, n, a, u), h = 0; h < l; h++) {
      var v = Ae[h] === 0 || Ae[h] === 1 ? 0.5 : 1, d = Be(t, r, i, Ae[h]);
      d < o || (Ae[h] < u ? f += c < e ? v : -v : f += a < c ? v : -v);
    }
    return f;
  } else {
    var v = Ae[0] === 0 || Ae[0] === 1 ? 0.5 : 1, d = Be(t, r, i, Ae[0]);
    return d < o ? 0 : a < e ? v : -v;
  }
}
function RI(t, e, r, n, i, a, o, s) {
  if (s -= e, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Ae[0] = -l, Ae[1] = l;
  var u = Math.abs(n - i);
  if (u < 1e-4)
    return 0;
  if (u >= Ai - 1e-4) {
    n = 0, i = Ai;
    var f = a ? 1 : -1;
    return o >= Ae[0] + t && o <= Ae[1] + t ? f : 0;
  }
  if (n > i) {
    var c = n;
    n = i, i = c;
  }
  n < 0 && (n += Ai, i += Ai);
  for (var h = 0, v = 0; v < 2; v++) {
    var d = Ae[v];
    if (d + t > o) {
      var p = Math.atan2(s, d), f = a ? 1 : -1;
      p < 0 && (p = Ai + p), (p >= n && p <= i || p + Ai >= n && p + Ai <= i) && (p > Math.PI / 2 && p < Math.PI * 1.5 && (f = -f), h += f);
    }
  }
  return h;
}
function MS(t, e, r, n, i) {
  for (var a = t.data, o = t.len(), s = 0, l = 0, u = 0, f = 0, c = 0, h, v, d = 0; d < o; ) {
    var p = a[d++], m = d === 1;
    switch (p === Fn.M && d > 1 && (r || (s += Mi(l, u, f, c, n, i))), m && (l = a[d], u = a[d + 1], f = l, c = u), p) {
      case Fn.M:
        f = a[d++], c = a[d++], l = f, u = c;
        break;
      case Fn.L:
        if (r) {
          if (ha(l, u, a[d], a[d + 1], e, n, i))
            return !0;
        } else
          s += Mi(l, u, a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Fn.C:
        if (r) {
          if (CI(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], e, n, i))
            return !0;
        } else
          s += EI(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Fn.Q:
        if (r) {
          if (DI(l, u, a[d++], a[d++], a[d], a[d + 1], e, n, i))
            return !0;
        } else
          s += PI(l, u, a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Fn.A:
        var g = a[d++], y = a[d++], _ = a[d++], S = a[d++], b = a[d++], T = a[d++];
        d += 1;
        var C = !!(1 - a[d++]);
        h = Math.cos(b) * _ + g, v = Math.sin(b) * S + y, m ? (f = h, c = v) : s += Mi(l, u, h, v, n, i);
        var E = (n - g) * S / _ + g;
        if (r) {
          if (MI(g, y, S, b, b + T, C, e, E, i))
            return !0;
        } else
          s += RI(g, y, S, b, b + T, C, E, i);
        l = Math.cos(b + T) * _ + g, u = Math.sin(b + T) * S + y;
        break;
      case Fn.R:
        f = l = a[d++], c = u = a[d++];
        var A = a[d++], M = a[d++];
        if (h = f + A, v = c + M, r) {
          if (ha(f, c, h, c, e, n, i) || ha(h, c, h, v, e, n, i) || ha(h, v, f, v, e, n, i) || ha(f, v, f, c, e, n, i))
            return !0;
        } else
          s += Mi(h, c, h, v, n, i), s += Mi(f, v, f, c, n, i);
        break;
      case Fn.Z:
        if (r) {
          if (ha(l, u, f, c, e, n, i))
            return !0;
        } else
          s += Mi(l, u, f, c, n, i);
        l = f, u = c;
        break;
    }
  }
  return !r && !II(u, c) && (s += Mi(l, u, f, c, n, i) || 0), s !== 0;
}
function OI(t, e, r) {
  return MS(t, 0, !1, e, r);
}
function kI(t, e, r, n) {
  return MS(t, e, !0, r, n);
}
var AS = Ht({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, Ji), BI = {
  style: Ht({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Af.style)
}, Uc = Tf.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), Gt = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.update = function() {
    var r = this;
    t.prototype.update.call(this);
    var n = this.style;
    if (n.decal) {
      var i = this._decalEl = this._decalEl || new e();
      i.buildPath === e.prototype.buildPath && (i.buildPath = function(l) {
        r.buildPath(l, r.shape);
      }), i.silent = !0;
      var a = i.style;
      for (var o in n)
        a[o] !== n[o] && (a[o] = n[o]);
      a.fill = n.fill ? n.decal : null, a.decal = null, a.shadowColor = null, n.strokeFirst && (a.stroke = null);
      for (var s = 0; s < Uc.length; ++s)
        i[Uc[s]] = this[Uc[s]];
      i.__dirty |= Fe;
    } else this._decalEl && (this._decalEl = null);
  }, e.prototype.getDecalElement = function() {
    return this._decalEl;
  }, e.prototype._init = function(r) {
    var n = Kt(r);
    this.shape = this.getDefaultShape();
    var i = this.getDefaultStyle();
    i && this.useStyle(i);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = r[o];
      o === "style" ? this.style ? q(this.style, s) : this.useStyle(s) : o === "shape" ? q(this.shape, s) : t.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, e.prototype.getDefaultStyle = function() {
    return null;
  }, e.prototype.getDefaultShape = function() {
    return {};
  }, e.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, e.prototype.getInsideTextFill = function() {
    var r = this.style.fill;
    if (r !== "none") {
      if (at(r)) {
        var n = Iu(r, 0);
        return n > 0.5 ? av : n > 0.2 ? nA : ov;
      } else if (r)
        return ov;
    }
    return av;
  }, e.prototype.getInsideTextStroke = function(r) {
    var n = this.style.fill;
    if (at(n)) {
      var i = this.__zr, a = !!(i && i.isDarkMode()), o = Iu(r, 0) < iv;
      if (a === o)
        return n;
    }
  }, e.prototype.buildPath = function(r, n, i) {
  }, e.prototype.pathUpdated = function() {
    this.__dirty &= ~Ca;
  }, e.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, e.prototype.createPathProxy = function() {
    this.path = new ea(!1);
  }, e.prototype.hasStroke = function() {
    var r = this.style, n = r.stroke;
    return !(n == null || n === "none" || !(r.lineWidth > 0));
  }, e.prototype.hasFill = function() {
    var r = this.style, n = r.fill;
    return n != null && n !== "none";
  }, e.prototype.getBoundingRect = function() {
    var r = this._rect, n = this.style, i = !r;
    if (i) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & Ca) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
    }
    if (this._rect = r, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = r.clone());
      if (this.__dirty || i) {
        s.copy(r);
        var l = n.strokeNoScale ? this.getLineScale() : 1, u = n.lineWidth;
        if (!this.hasFill()) {
          var f = this.strokeContainThreshold;
          u = Math.max(u, f ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return r;
  }, e.prototype.contain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect(), o = this.style;
    if (r = i[0], n = i[1], a.contain(r, n)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), kI(s, l / u, r, n)))
          return !0;
      }
      if (this.hasFill())
        return OI(s, r, n);
    }
    return !1;
  }, e.prototype.dirtyShape = function() {
    this.__dirty |= Ca, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, e.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, e.prototype.animateShape = function(r) {
    return this.animate("shape", r);
  }, e.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : r === "shape" ? this.dirtyShape() : this.markRedraw();
  }, e.prototype.attrKV = function(r, n) {
    r === "shape" ? this.setShape(n) : t.prototype.attrKV.call(this, r, n);
  }, e.prototype.setShape = function(r, n) {
    var i = this.shape;
    return i || (i = this.shape = {}), typeof r == "string" ? i[r] = n : q(i, r), this.dirtyShape(), this;
  }, e.prototype.shapeChanged = function() {
    return !!(this.__dirty & Ca);
  }, e.prototype.createStyle = function(r) {
    return bf(AS, r);
  }, e.prototype._innerSaveToNormal = function(r) {
    t.prototype._innerSaveToNormal.call(this, r);
    var n = this._normalState;
    r.shape && !n.shape && (n.shape = q({}, this.shape));
  }, e.prototype._applyStateObj = function(r, n, i, a, o, s) {
    if (t.prototype._applyStateObj.call(this, r, n, i, a, o, s), this.__inHover !== xf) {
      var l = !(n && a), u;
      if (n && n.shape ? o ? a ? u = n.shape : (u = q({}, i.shape), q(u, n.shape)) : (u = q({}, a ? this.shape : i.shape), q(u, n.shape)) : l && (u = i.shape), u)
        if (o) {
          this.shape = q({}, this.shape);
          for (var f = {}, c = Kt(u), h = 0; h < c.length; h++) {
            var v = c[h];
            typeof u[v] == "object" ? this.shape[v] = u[v] : f[v] = u[v];
          }
          this._transitionState(r, {
            shape: f
          }, s);
        } else
          this.shape = u, this.dirtyShape();
    }
  }, e.prototype._mergeStates = function(r) {
    for (var n = t.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
      var o = r[a];
      o.shape && (i = i || {}, this._mergeStyle(i, o.shape));
    }
    return i && (n.shape = i), n;
  }, e.prototype.getAnimationStyleProps = function() {
    return BI;
  }, e.prototype.isZeroArea = function() {
    return !1;
  }, e.extend = function(r) {
    var n = (function(a) {
      Q(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return r.init && r.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return xt(r.style);
      }, o.prototype.getDefaultShape = function() {
        return xt(r.shape);
      }, o;
    })(e);
    for (var i in r)
      typeof r[i] == "function" && (n.prototype[i] = r[i]);
    return n;
  }, e.initDefaultProps = (function() {
    var r = e.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = Fe | Po | Ca;
  })(), e;
})(Ys), NI = Ht({
  strokeFirst: !0,
  font: ai,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, AS), Ou = (function(t) {
  Q(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.hasStroke = function() {
    return DS(this.style);
  }, e.prototype.hasFill = function() {
    var r = this.style, n = r.fill;
    return n != null && n !== "none";
  }, e.prototype.createStyle = function(r) {
    return bf(NI, r);
  }, e.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, e.prototype.getBoundingRect = function() {
    return this._rect || (this._rect = yI(this.style)), this._rect;
  }, e.initDefaultProps = (function() {
    var r = e.prototype;
    r.dirtyRectTolerance = 10;
  })(), e;
})(Ys);
Ou.prototype.type = "tspan";
var FI = Ht({
  x: 0,
  y: 0
}, Ji), HI = {
  style: Ht({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Af.style)
};
function zI(t) {
  return !!(t && typeof t != "string" && t.width && t.height);
}
var hi = (function(t) {
  Q(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.createStyle = function(r) {
    return bf(FI, r);
  }, e.prototype._getSize = function(r) {
    var n = this.style, i = n[r];
    if (i != null)
      return i;
    var a = zI(n.image) ? n.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = n[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, e.prototype.getWidth = function() {
    return this._getSize("width");
  }, e.prototype.getHeight = function() {
    return this._getSize("height");
  }, e.prototype.getAnimationStyleProps = function() {
    return HI;
  }, e.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new mt(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, e;
})(Ys);
hi.prototype.type = "image";
function VI(t, e) {
  var r = e.x, n = e.y, i = e.width, a = e.height, o = e.r, s, l, u, f;
  i < 0 && (r = r + i, i = -i), a < 0 && (n = n + a, a = -a), typeof o == "number" ? s = l = u = f = o : o instanceof Array ? o.length === 1 ? s = l = u = f = o[0] : o.length === 2 ? (s = u = o[0], l = f = o[1]) : o.length === 3 ? (s = o[0], l = f = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], f = o[3]) : s = l = u = f = 0;
  var c;
  s + l > i && (c = s + l, s *= i / c, l *= i / c), u + f > i && (c = u + f, u *= i / c, f *= i / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + f > a && (c = s + f, s *= a / c, f *= a / c), t.moveTo(r + s, n), t.lineTo(r + i - l, n), l !== 0 && t.arc(r + i - l, n + l, l, -Math.PI / 2, 0), t.lineTo(r + i, n + a - u), u !== 0 && t.arc(r + i - u, n + a - u, u, 0, Math.PI / 2), t.lineTo(r + f, n + a), f !== 0 && t.arc(r + f, n + a - f, f, Math.PI / 2, Math.PI), t.lineTo(r, n + s), s !== 0 && t.arc(r + s, n + s, s, Math.PI, Math.PI * 1.5), t.closePath();
}
var Ea = Math.round;
function IS(t, e, r) {
  if (e) {
    var n = e.x1, i = e.x2, a = e.y1, o = e.y2;
    t.x1 = n, t.x2 = i, t.y1 = a, t.y2 = o;
    var s = r && r.lineWidth;
    return s && (Ea(n * 2) === Ea(i * 2) && (t.x1 = t.x2 = Wi(n, s, !0)), Ea(a * 2) === Ea(o * 2) && (t.y1 = t.y2 = Wi(a, s, !0))), t;
  }
}
function LS(t, e, r) {
  if (e) {
    var n = e.x, i = e.y, a = e.width, o = e.height;
    t.x = n, t.y = i, t.width = a, t.height = o;
    var s = r && r.lineWidth;
    return s && (t.x = Wi(n, s, !0), t.y = Wi(i, s, !0), t.width = Math.max(Wi(n + a, s, !1) - t.x, a === 0 ? 0 : 1), t.height = Math.max(Wi(i + o, s, !1) - t.y, o === 0 ? 0 : 1)), t;
  }
}
function Wi(t, e, r) {
  if (!e)
    return t;
  var n = Ea(t * 2);
  return (n + Ea(e)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
}
var UI = /* @__PURE__ */ (function() {
  function t() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return t;
})(), GI = {}, se = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new UI();
  }, e.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = LS(GI, n, this.style);
      i = l.x, a = l.y, o = l.width, s = l.height, l.r = n.r, n = l;
    } else
      i = n.x, a = n.y, o = n.width, s = n.height;
    n.r ? VI(r, n) : r.rect(i, a, o, s);
  }, e.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, e;
})(Gt);
se.prototype.type = "rect";
var Cm = {
  fill: "#000"
}, Dm = 2, Fr = {}, WI = {
  style: Ht({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, Af.style)
}, Ve = (function(t) {
  Q(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.type = "text", n._children = [], n._defaultStyle = Cm, n.attr(r), n;
  }
  return e.prototype.childrenRef = function() {
    return this._children;
  }, e.prototype.update = function() {
    t.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var r = 0; r < this._children.length; r++) {
      var n = this._children[r];
      n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible;
    }
  }, e.prototype.updateTransform = function() {
    var r = this.innerTransformable;
    r ? (r.updateTransform(), r.transform && (this.transform = r.transform)) : t.prototype.updateTransform.call(this);
  }, e.prototype.getLocalTransform = function(r) {
    var n = this.innerTransformable;
    return n ? n.getLocalTransform(r) : t.prototype.getLocalTransform.call(this, r);
  }, e.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), t.prototype.getComputedTransform.call(this);
  }, e.prototype._updateSubTexts = function() {
    this._childCursor = 0, qI(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, e.prototype.addSelfToZr = function(r) {
    t.prototype.addSelfToZr.call(this, r);
    for (var n = 0; n < this._children.length; n++)
      this._children[n].__zr = r;
  }, e.prototype.removeSelfFromZr = function(r) {
    t.prototype.removeSelfFromZr.call(this, r);
    for (var n = 0; n < this._children.length; n++)
      this._children[n].__zr = null;
  }, e.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var r = new mt(0, 0, 0, 0), n = this._children, i = [], a = null, o = 0; o < n.length; o++) {
        var s = n[o], l = s.getBoundingRect(), u = s.getLocalTransform(i);
        u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || r;
    }
    return this._rect;
  }, e.prototype.setDefaultTextStyle = function(r) {
    this._defaultStyle = r || Cm;
  }, e.prototype.setTextContent = function(r) {
  }, e.prototype._mergeStyle = function(r, n) {
    if (!n)
      return r;
    var i = n.rich, a = r.rich || i && {};
    return q(r, n), i && a ? (this._mergeRich(a, i), r.rich = a) : a && (r.rich = a), r;
  }, e.prototype._mergeRich = function(r, n) {
    for (var i = Kt(n), a = 0; a < i.length; a++) {
      var o = i[a];
      r[o] = r[o] || {}, q(r[o], n[o]);
    }
  }, e.prototype.getAnimationStyleProps = function() {
    return WI;
  }, e.prototype._getOrCreateChild = function(r) {
    var n = this._children[this._childCursor];
    return (!n || !(n instanceof r)) && (n = new r()), this._children[this._childCursor++] = n, n.__zr = this.__zr, n.parent = this, n;
  }, e.prototype._updatePlainTexts = function() {
    var r = this.style, n = r.font || ai, i = r.padding, a = this._defaultStyle, o = r.x || 0, s = r.y || 0, l = r.align || a.align || "left", u = r.verticalAlign || a.verticalAlign || "top";
    mm(Fr, a.overflowRect, o, s, l, u), o = Fr.baseX, s = Fr.baseY;
    var f = Rm(r), c = cI(f, r, Fr.outerWidth, Fr.outerHeight), h = Gc(r), v = !!r.backgroundColor, d = c.outerHeight, p = c.outerWidth, m = c.lines, g = c.lineHeight;
    this.isTruncated = !!c.isTruncated;
    var y = o, _ = ji(s, c.contentHeight, u);
    if (h || i) {
      var S = $a(o, p, l), b = ji(s, d, u);
      h && this._renderBackground(r, r, S, b, p, d);
    }
    _ += g / 2, i && (y = Pm(o, l, i), u === "top" ? _ += i[0] : u === "bottom" && (_ -= i[2]));
    for (var T = 0, C = !1, E = !1, A = Em("fill" in r ? r.fill : (E = !0, a.fill)), M = Lm("stroke" in r ? r.stroke : !v && (!a.autoStroke || E) ? (T = Dm, C = !0, a.stroke) : null), R = r.textShadowBlur > 0, B = 0; B < m.length; B++) {
      var O = this._getOrCreateChild(Ou), F = O.createStyle();
      O.useStyle(F), F.text = m[B], F.x = y, F.y = _, F.textAlign = l, F.textBaseline = "middle", F.opacity = r.opacity, F.strokeFirst = !0, R && (F.shadowBlur = r.textShadowBlur || 0, F.shadowColor = r.textShadowColor || "transparent", F.shadowOffsetX = r.textShadowOffsetX || 0, F.shadowOffsetY = r.textShadowOffsetY || 0), F.stroke = M, F.fill = A, M && (F.lineWidth = r.lineWidth || T, F.lineDash = r.lineDash, F.lineDashOffset = r.lineDashOffset || 0), F.font = n, Am(F, r), _ += g, O.setBoundingRect(cv(F, c.contentWidth, c.calculatedLineHeight, C ? 0 : null));
    }
  }, e.prototype._updateRichTexts = function() {
    var r = this.style, n = this._defaultStyle, i = r.align || n.align, a = r.verticalAlign || n.verticalAlign, o = r.x || 0, s = r.y || 0;
    mm(Fr, n.overflowRect, o, s, i, a), o = Fr.baseX, s = Fr.baseY;
    var l = Rm(r), u = dI(l, r, Fr.outerWidth, Fr.outerHeight, i), f = u.width, c = u.outerWidth, h = u.outerHeight, v = r.padding;
    this.isTruncated = !!u.isTruncated;
    var d = $a(o, c, i), p = ji(s, h, a), m = d, g = p;
    v && (m += v[3], g += v[0]);
    var y = m + f;
    Gc(r) && this._renderBackground(r, r, d, p, c, h);
    for (var _ = !!r.backgroundColor, S = 0; S < u.lines.length; S++) {
      for (var b = u.lines[S], T = b.tokens, C = T.length, E = b.lineHeight, A = b.width, M = 0, R = m, B = y, O = C - 1, F = void 0; M < C && (F = T[M], !F.align || F.align === "left"); )
        this._placeToken(F, r, E, g, R, "left", _), A -= F.width, R += F.width, M++;
      for (; O >= 0 && (F = T[O], F.align === "right"); )
        this._placeToken(F, r, E, g, B, "right", _), A -= F.width, B -= F.width, O--;
      for (R += (f - (R - m) - (y - B) - A) / 2; M <= O; )
        F = T[M], this._placeToken(F, r, E, g, R + F.width / 2, "center", _), R += F.width, M++;
      g += E;
    }
  }, e.prototype._placeToken = function(r, n, i, a, o, s, l) {
    var u = n.rich[r.styleName] || {};
    u.text = r.text;
    var f = r.verticalAlign, c = a + i / 2;
    f === "top" ? c = a + r.height / 2 : f === "bottom" && (c = a + i - r.height / 2);
    var h = !r.isLineHolder && Gc(u);
    h && this._renderBackground(u, n, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, c - r.height / 2, r.width, r.height);
    var v = !!u.backgroundColor, d = r.textPadding;
    d && (o = Pm(o, s, d), c -= r.height / 2 - d[0] - r.innerHeight / 2);
    var p = this._getOrCreateChild(Ou), m = p.createStyle();
    p.useStyle(m);
    var g = this._defaultStyle, y = !1, _ = 0, S = !1, b = Em("fill" in u ? u.fill : "fill" in n ? n.fill : (y = !0, g.fill)), T = Lm("stroke" in u ? u.stroke : "stroke" in n ? n.stroke : !v && !l && (!g.autoStroke || y) ? (_ = Dm, S = !0, g.stroke) : null), C = u.textShadowBlur > 0 || n.textShadowBlur > 0;
    m.text = r.text, m.x = o, m.y = c, C && (m.shadowBlur = u.textShadowBlur || n.textShadowBlur || 0, m.shadowColor = u.textShadowColor || n.textShadowColor || "transparent", m.shadowOffsetX = u.textShadowOffsetX || n.textShadowOffsetX || 0, m.shadowOffsetY = u.textShadowOffsetY || n.textShadowOffsetY || 0), m.textAlign = s, m.textBaseline = "middle", m.font = r.font || ai, m.opacity = ka(u.opacity, n.opacity, 1), Am(m, u), T && (m.lineWidth = ka(u.lineWidth, n.lineWidth, _), m.lineDash = vt(u.lineDash, n.lineDash), m.lineDashOffset = n.lineDashOffset || 0, m.stroke = T), b && (m.fill = b), p.setBoundingRect(cv(m, r.contentWidth, r.contentHeight, S ? 0 : null));
  }, e.prototype._renderBackground = function(r, n, i, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, f = r.borderColor, c = l && l.image, h = l && !c, v = r.borderRadius, d = this, p, m;
    if (h || r.lineHeight || u && f) {
      p = this._getOrCreateChild(se), p.useStyle(p.createStyle()), p.style.fill = null;
      var g = p.shape;
      g.x = i, g.y = a, g.width = o, g.height = s, g.r = v, p.dirtyShape();
    }
    if (h) {
      var y = p.style;
      y.fill = l || null, y.fillOpacity = vt(r.fillOpacity, 1);
    } else if (c) {
      m = this._getOrCreateChild(hi), m.onload = function() {
        d.dirtyStyle();
      };
      var _ = m.style;
      _.image = l.image, _.x = i, _.y = a, _.width = o, _.height = s;
    }
    if (u && f) {
      var y = p.style;
      y.lineWidth = u, y.stroke = f, y.strokeOpacity = vt(r.strokeOpacity, 1), y.lineDash = r.borderDash, y.lineDashOffset = r.borderDashOffset || 0, p.strokeContainThreshold = 0, p.hasFill() && p.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var S = (p || m).style;
    S.shadowBlur = r.shadowBlur || 0, S.shadowColor = r.shadowColor || "transparent", S.shadowOffsetX = r.shadowOffsetX || 0, S.shadowOffsetY = r.shadowOffsetY || 0, S.opacity = ka(r.opacity, n.opacity, 1);
  }, e.makeFont = function(r) {
    var n = "";
    return KI(r) && (n = [
      r.fontStyle,
      r.fontWeight,
      XI(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), n && Kr(n) || r.textFont || r.font;
  }, e;
})(Ys), YI = { left: !0, right: 1, center: 1 }, $I = { top: 1, bottom: 1, middle: 1 }, Mm = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function XI(t) {
  return typeof t == "string" && (t.indexOf("px") !== -1 || t.indexOf("rem") !== -1 || t.indexOf("em") !== -1) ? t : isNaN(+t) ? Td + "px" : t + "px";
}
function Am(t, e) {
  for (var r = 0; r < Mm.length; r++) {
    var n = Mm[r], i = e[n];
    i != null && (t[n] = i);
  }
}
function KI(t) {
  return t.fontSize != null || t.fontFamily || t.fontWeight;
}
function qI(t) {
  return Im(t), P(t.rich, Im), t;
}
function Im(t) {
  if (t) {
    t.font = Ve.makeFont(t);
    var e = t.align;
    e === "middle" && (e = "center"), t.align = e == null || YI[e] ? e : "left";
    var r = t.verticalAlign;
    r === "center" && (r = "middle"), t.verticalAlign = r == null || $I[r] ? r : "top";
    var n = t.padding;
    n && (t.padding = Md(t.padding));
  }
}
function Lm(t, e) {
  return t == null || e <= 0 || t === "transparent" || t === "none" ? null : t.image || t.colorStops ? "#000" : t;
}
function Em(t) {
  return t == null || t === "none" ? null : t.image || t.colorStops ? "#000" : t;
}
function Pm(t, e, r) {
  return e === "right" ? t - r[1] : e === "center" ? t + r[3] / 2 - r[1] / 2 : t + r[3];
}
function Rm(t) {
  var e = t.text;
  return e != null && (e += ""), e;
}
function Gc(t) {
  return !!(t.backgroundColor || t.lineHeight || t.borderWidth && t.borderColor);
}
var Bt = Wt(), ZI = function(t, e, r, n) {
  if (n) {
    var i = Bt(n);
    i.dataIndex = r, i.dataType = e, i.seriesIndex = t, i.ssrType = "chart", n.type === "group" && n.traverse(function(a) {
      var o = Bt(a);
      o.seriesIndex = t, o.dataIndex = r, o.dataType = e, o.ssrType = "chart";
    });
  }
}, $s = "undefined", ES = "series", PS = gt(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), je = "original", xe = "arrayRows", Ir = "objectRows", pn = "keyedColumns", ri = "typedArray", RS = "unknown", rn = "column", aa = "row", jI = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
], OS = (
  /** @class */
  /* @__PURE__ */ (function() {
    function t(e) {
      P(jI, function(r) {
        this[r] = Xt(e[r], e);
      }, this);
    }
    return t;
  })()
);
function JI(t, e) {
  return e.mainType === ES ? t.getViewOfSeriesModel(e) : t.getViewOfComponentModel(e);
}
var Om = 1, km = {}, kS = Wt(), zd = Wt(), Vd = 0, If = 1, Lf = 2, fn = ["emphasis", "blur", "select"], Bm = ["normal", "emphasis", "blur", "select"], QI = 10, tL = 9, Qi = "highlight", nu = "downplay", ku = "select", dv = "unselect", Bu = "toggleSelect", Ud = "selectchanged";
function va(t) {
  return t != null && t !== "none";
}
function Ef(t, e, r) {
  t.onHoverStateChange && (t.hoverState || 0) !== r && t.onHoverStateChange(e), t.hoverState = r;
}
function BS(t) {
  Ef(t, "emphasis", Lf);
}
function NS(t) {
  t.hoverState === Lf && Ef(t, "normal", Vd);
}
function Gd(t) {
  Ef(t, "blur", If);
}
function FS(t) {
  t.hoverState === If && Ef(t, "normal", Vd);
}
function eL(t) {
  t.selected = !0;
}
function rL(t) {
  t.selected = !1;
}
function Nm(t, e, r) {
  e(t, r);
}
function kn(t, e, r) {
  Nm(t, e, r), t.isGroup && t.traverse(function(n) {
    Nm(n, e, r);
  });
}
function Fm(t, e) {
  switch (e) {
    case "emphasis":
      t.hoverState = Lf;
      break;
    case "normal":
      t.hoverState = Vd;
      break;
    case "blur":
      t.hoverState = If;
      break;
    case "select":
      t.selected = !0;
  }
}
function nL(t, e, r, n) {
  for (var i = t.style, a = {}, o = 0; o < e.length; o++) {
    var s = e[o], l = i[s];
    a[s] = l ?? (n && n[s]);
  }
  for (var o = 0; o < t.animators.length; o++) {
    var u = t.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(r) < 0 && u.targetName === "style" && u.saveTo(a, e);
  }
  return a;
}
function iL(t, e, r, n) {
  var i = r && At(r, "select") >= 0, a = !1;
  if (t instanceof Gt) {
    var o = kS(t), s = i && o.selectFill || o.normalFill, l = i && o.selectStroke || o.normalStroke;
    if (va(s) || va(l)) {
      n = n || {};
      var u = n.style || {};
      u.fill === "inherit" ? (a = !0, n = q({}, n), u = q({}, u), u.fill = s) : !va(u.fill) && va(s) ? (a = !0, n = q({}, n), u = q({}, u), u.fill = Xg(s)) : !va(u.stroke) && va(l) && (a || (n = q({}, n), u = q({}, u)), u.stroke = Xg(l)), n.style = u;
    }
  }
  if (n && n.z2 == null) {
    a || (n = q({}, n));
    var f = t.z2EmphasisLift;
    n.z2 = t.z2 + (f ?? QI);
  }
  return n;
}
function aL(t, e, r) {
  if (r && r.z2 == null) {
    r = q({}, r);
    var n = t.z2SelectLift;
    r.z2 = t.z2 + (n ?? tL);
  }
  return r;
}
function oL(t, e, r) {
  var n = At(t.currentStates, e) >= 0, i = t.style.opacity, a = n ? null : nL(t, ["opacity"], e, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = q({}, r), o = q({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: n ? i : a.opacity * 0.1
  }, o), r.style = o), r;
}
function Wc(t, e) {
  var r = this.states[t];
  if (this.style) {
    if (t === "emphasis")
      return iL(this, t, e, r);
    if (t === "blur")
      return oL(this, t, r);
    if (t === "select")
      return aL(this, t, r);
  }
  return r;
}
function sL(t) {
  t.stateProxy = Wc;
  var e = t.getTextContent(), r = t.getTextGuideLine();
  e && (e.stateProxy = Wc), r && (r.stateProxy = Wc);
}
function Hm(t, e) {
  !US(t, e) && !t.__highByOuter && kn(t, BS);
}
function zm(t, e) {
  !US(t, e) && !t.__highByOuter && kn(t, NS);
}
function Nu(t, e) {
  t.__highByOuter |= 1 << (e || 0), kn(t, BS);
}
function Fu(t, e) {
  !(t.__highByOuter &= ~(1 << (e || 0))) && kn(t, NS);
}
function lL(t) {
  kn(t, Gd);
}
function HS(t) {
  kn(t, FS);
}
function zS(t) {
  kn(t, eL);
}
function VS(t) {
  kn(t, rL);
}
function US(t, e) {
  return t.__highDownSilentOnTouch && e.zrByTouch;
}
function GS(t) {
  var e = t.getModel(), r = [], n = [];
  e.eachComponent(function(i, a) {
    var o = zd(a), s = JI(t, a), l = i === "series";
    !l && n.push(s), o.isBlured && (s.group.traverse(function(u) {
      FS(u);
    }), l && r.push(a)), o.isBlured = !1;
  }), P(n, function(i) {
    i && i.toggleBlurSeries && i.toggleBlurSeries(r, !1, e);
  });
}
function pv(t, e, r, n) {
  var i = n.getModel();
  r = r || "coordinateSystem";
  function a(u, f) {
    for (var c = 0; c < f.length; c++) {
      var h = u.getItemGraphicEl(f[c]);
      h && HS(h);
    }
  }
  if (t != null && !(!e || e === "none")) {
    var o = i.getSeriesByIndex(t), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    i.eachSeries(function(u) {
      var f = o === u, c = u.coordinateSystem;
      c && c.master && (c = c.master);
      var h = c && s ? c === s : f;
      if (!// Not blur other series if blurScope series
      (r === "series" && !f || r === "coordinateSystem" && !h || e === "series" && f)) {
        var v = n.getViewOfSeriesModel(u);
        if (v.group.traverse(function(m) {
          m.__highByOuter && f && e === "self" || Gd(m);
        }), He(e))
          a(u.getData(), e);
        else if (ft(e))
          for (var d = Kt(e), p = 0; p < d.length; p++)
            a(u.getData(d[p]), e[d[p]]);
        l.push(u), zd(u).isBlured = !0;
      }
    }), i.eachComponent(function(u, f) {
      if (u !== "series") {
        var c = n.getViewOfComponentModel(f);
        c && c.toggleBlurSeries && c.toggleBlurSeries(l, !0, i);
      }
    });
  }
}
function gv(t, e, r) {
  if (!(t == null || e == null)) {
    var n = r.getModel().getComponent(t, e);
    if (n) {
      zd(n).isBlured = !0;
      var i = r.getViewOfComponentModel(n);
      !i || !i.focusBlurEnabled || i.group.traverse(function(a) {
        Gd(a);
      });
    }
  }
}
function uL(t, e, r) {
  var n = t.seriesIndex, i = t.getData(e.dataType);
  if (i) {
    var a = ta(i, e);
    a = (J(a) ? a[0] : a) || 0;
    var o = i.getItemGraphicEl(a);
    if (!o)
      for (var s = i.count(), l = 0; !o && l < s; )
        o = i.getItemGraphicEl(l++);
    if (o) {
      var u = Bt(o);
      pv(n, u.focus, u.blurScope, r);
    } else {
      var f = t.get(["emphasis", "focus"]), c = t.get(["emphasis", "blurScope"]);
      f != null && pv(n, f, c, r);
    }
  }
}
function Wd(t, e, r, n) {
  var i = {
    focusSelf: !1,
    dispatchers: null
  };
  if (t == null || t === "series" || e == null || r == null)
    return i;
  var a = n.getModel().getComponent(t, e);
  if (!a)
    return i;
  var o = n.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return i;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (Bt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function fL(t, e, r) {
  var n = Bt(t), i = Wd(n.componentMainType, n.componentIndex, n.componentHighDownName, r), a = i.dispatchers, o = i.focusSelf;
  a ? (o && gv(n.componentMainType, n.componentIndex, r), P(a, function(s) {
    return Hm(s, e);
  })) : (pv(n.seriesIndex, n.focus, n.blurScope, r), n.focus === "self" && gv(n.componentMainType, n.componentIndex, r), Hm(t, e));
}
function cL(t, e, r) {
  GS(r);
  var n = Bt(t), i = Wd(n.componentMainType, n.componentIndex, n.componentHighDownName, r).dispatchers;
  i ? P(i, function(a) {
    return zm(a, e);
  }) : zm(t, e);
}
function hL(t, e, r) {
  if (Sv(e)) {
    var n = e.dataType, i = t.getData(n), a = ta(i, e);
    J(a) || (a = [a]), t[e.type === Bu ? "toggleSelect" : e.type === ku ? "select" : "unselect"](a, n);
  }
}
function Vm(t) {
  var e = t.getAllData();
  P(e, function(r) {
    var n = r.data, i = r.type;
    n.eachItemGraphicEl(function(a, o) {
      t.isSelected(o, i) ? zS(a) : VS(a);
    });
  });
}
function vL(t) {
  var e = [];
  return t.eachSeries(function(r) {
    var n = r.getAllData();
    P(n, function(i) {
      i.data;
      var a = i.type, o = r.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: r.seriesIndex
        };
        a != null && (s.dataType = a), e.push(s);
      }
    });
  }), e;
}
function mv(t, e, r) {
  WS(t, !0), kn(t, sL), pL(t, e, r);
}
function dL(t) {
  WS(t, !1);
}
function yv(t, e, r, n) {
  n ? dL(t) : mv(t, e, r);
}
function pL(t, e, r) {
  var n = Bt(t);
  e != null ? (n.focus = e, n.blurScope = r) : n.focus && (n.focus = null);
}
var Um = ["emphasis", "blur", "select"], gL = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Gm(t, e, r, n) {
  r = r || "itemStyle";
  for (var i = 0; i < Um.length; i++) {
    var a = Um[i], o = e.getModel([a, r]), s = t.ensureState(a);
    s.style = o[gL[r]]();
  }
}
function WS(t, e) {
  var r = e === !1, n = t;
  t.highDownSilentOnTouch && (n.__highDownSilentOnTouch = t.highDownSilentOnTouch), (!r || n.__highDownDispatcher) && (n.__highByOuter = n.__highByOuter || 0, n.__highDownDispatcher = !r);
}
function _v(t) {
  return !!(t && t.__highDownDispatcher);
}
function mL(t) {
  var e = km[t];
  return e == null && Om <= 32 && (e = km[t] = Om++), e;
}
function Sv(t) {
  var e = t.type;
  return e === ku || e === dv || e === Bu;
}
function Wm(t) {
  var e = t.type;
  return e === Qi || e === nu;
}
function yL(t) {
  var e = kS(t);
  e.normalFill = t.style.fill, e.normalStroke = t.style.stroke;
  var r = t.states.select || {};
  e.selectFill = r.style && r.style.fill || null, e.selectStroke = r.style && r.style.stroke || null;
}
var da = ea.CMD, _L = [[], [], []], Ym = Math.sqrt, SL = Math.atan2;
function bL(t, e) {
  if (e) {
    var r = t.data, n = t.len(), i, a, o, s, l, u, f = da.M, c = da.C, h = da.L, v = da.R, d = da.A, p = da.Q;
    for (o = 0, s = 0; o < n; ) {
      switch (i = r[o++], s = o, a = 0, i) {
        case f:
          a = 1;
          break;
        case h:
          a = 1;
          break;
        case c:
          a = 3;
          break;
        case p:
          a = 2;
          break;
        case d:
          var m = e[4], g = e[5], y = Ym(e[0] * e[0] + e[1] * e[1]), _ = Ym(e[2] * e[2] + e[3] * e[3]), S = SL(-e[1] / _, e[0] / y);
          r[o] *= y, r[o++] += m, r[o] *= _, r[o++] += g, r[o++] *= y, r[o++] *= _, r[o++] += S, r[o++] += S, o += 2, s = o;
          break;
        case v:
          u[0] = r[o++], u[1] = r[o++], dr(u, u, e), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], dr(u, u, e), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var b = _L[l];
        b[0] = r[o++], b[1] = r[o++], dr(b, b, e), r[s++] = b[0], r[s++] = b[1];
      }
    }
    t.increaseVersion();
  }
}
var Yc = Math.sqrt, ml = Math.sin, yl = Math.cos, po = Math.PI;
function $m(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
}
function bv(t, e) {
  return (t[0] * e[0] + t[1] * e[1]) / ($m(t) * $m(e));
}
function Xm(t, e) {
  return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(bv(t, e));
}
function Km(t, e, r, n, i, a, o, s, l, u, f) {
  var c = l * (po / 180), h = yl(c) * (t - r) / 2 + ml(c) * (e - n) / 2, v = -1 * ml(c) * (t - r) / 2 + yl(c) * (e - n) / 2, d = h * h / (o * o) + v * v / (s * s);
  d > 1 && (o *= Yc(d), s *= Yc(d));
  var p = (i === a ? -1 : 1) * Yc((o * o * (s * s) - o * o * (v * v) - s * s * (h * h)) / (o * o * (v * v) + s * s * (h * h))) || 0, m = p * o * v / s, g = p * -s * h / o, y = (t + r) / 2 + yl(c) * m - ml(c) * g, _ = (e + n) / 2 + ml(c) * m + yl(c) * g, S = Xm([1, 0], [(h - m) / o, (v - g) / s]), b = [(h - m) / o, (v - g) / s], T = [(-1 * h - m) / o, (-1 * v - g) / s], C = Xm(b, T);
  if (bv(b, T) <= -1 && (C = po), bv(b, T) >= 1 && (C = 0), C < 0) {
    var E = Math.round(C / po * 1e6) / 1e6;
    C = po * 2 + E % 2 * po;
  }
  f.addData(u, y, _, o, s, S, C, c, a);
}
var TL = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, wL = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function xL(t) {
  var e = new ea();
  if (!t)
    return e;
  var r = 0, n = 0, i = r, a = n, o, s = ea.CMD, l = t.match(TL);
  if (!l)
    return e;
  for (var u = 0; u < l.length; u++) {
    for (var f = l[u], c = f.charAt(0), h = void 0, v = f.match(wL) || [], d = v.length, p = 0; p < d; p++)
      v[p] = parseFloat(v[p]);
    for (var m = 0; m < d; ) {
      var g = void 0, y = void 0, _ = void 0, S = void 0, b = void 0, T = void 0, C = void 0, E = r, A = n, M = void 0, R = void 0;
      switch (c) {
        case "l":
          r += v[m++], n += v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "L":
          r = v[m++], n = v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "m":
          r += v[m++], n += v[m++], h = s.M, e.addData(h, r, n), i = r, a = n, c = "l";
          break;
        case "M":
          r = v[m++], n = v[m++], h = s.M, e.addData(h, r, n), i = r, a = n, c = "L";
          break;
        case "h":
          r += v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "H":
          r = v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "v":
          n += v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "V":
          n = v[m++], h = s.L, e.addData(h, r, n);
          break;
        case "C":
          h = s.C, e.addData(h, v[m++], v[m++], v[m++], v[m++], v[m++], v[m++]), r = v[m - 2], n = v[m - 1];
          break;
        case "c":
          h = s.C, e.addData(h, v[m++] + r, v[m++] + n, v[m++] + r, v[m++] + n, v[m++] + r, v[m++] + n), r += v[m - 2], n += v[m - 1];
          break;
        case "S":
          g = r, y = n, M = e.len(), R = e.data, o === s.C && (g += r - R[M - 4], y += n - R[M - 3]), h = s.C, E = v[m++], A = v[m++], r = v[m++], n = v[m++], e.addData(h, g, y, E, A, r, n);
          break;
        case "s":
          g = r, y = n, M = e.len(), R = e.data, o === s.C && (g += r - R[M - 4], y += n - R[M - 3]), h = s.C, E = r + v[m++], A = n + v[m++], r += v[m++], n += v[m++], e.addData(h, g, y, E, A, r, n);
          break;
        case "Q":
          E = v[m++], A = v[m++], r = v[m++], n = v[m++], h = s.Q, e.addData(h, E, A, r, n);
          break;
        case "q":
          E = v[m++] + r, A = v[m++] + n, r += v[m++], n += v[m++], h = s.Q, e.addData(h, E, A, r, n);
          break;
        case "T":
          g = r, y = n, M = e.len(), R = e.data, o === s.Q && (g += r - R[M - 4], y += n - R[M - 3]), r = v[m++], n = v[m++], h = s.Q, e.addData(h, g, y, r, n);
          break;
        case "t":
          g = r, y = n, M = e.len(), R = e.data, o === s.Q && (g += r - R[M - 4], y += n - R[M - 3]), r += v[m++], n += v[m++], h = s.Q, e.addData(h, g, y, r, n);
          break;
        case "A":
          _ = v[m++], S = v[m++], b = v[m++], T = v[m++], C = v[m++], E = r, A = n, r = v[m++], n = v[m++], h = s.A, Km(E, A, r, n, T, C, _, S, b, h, e);
          break;
        case "a":
          _ = v[m++], S = v[m++], b = v[m++], T = v[m++], C = v[m++], E = r, A = n, r += v[m++], n += v[m++], h = s.A, Km(E, A, r, n, T, C, _, S, b, h, e);
          break;
      }
    }
    (c === "z" || c === "Z") && (h = s.Z, e.addData(h), r = i, n = a), o = h;
  }
  return e.toStatic(), e;
}
var YS = (function(t) {
  Q(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.applyTransform = function(r) {
  }, e;
})(Gt);
function $S(t) {
  return t.setData != null;
}
function XS(t, e) {
  var r = xL(t), n = q({}, e);
  return n.buildPath = function(i) {
    var a = $S(i);
    if (a && i.canSave()) {
      i.appendPath(r);
      var o = i.getContext();
      o && i.rebuildPath(o, 1);
    } else {
      var o = a ? i.getContext() : i;
      o && r.rebuildPath(o, 1);
    }
  }, n.applyTransform = function(i) {
    bL(r, i), this.dirtyShape();
  }, n;
}
function CL(t, e) {
  return new YS(XS(t, e));
}
function DL(t, e) {
  var r = XS(t, e), n = (function(i) {
    Q(a, i);
    function a(o) {
      var s = i.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  })(YS);
  return n;
}
function ML(t, e) {
  for (var r = [], n = t.length, i = 0; i < n; i++) {
    var a = t[i];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new Gt(e);
  return o.createPathProxy(), o.buildPath = function(s) {
    if ($S(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var AL = /* @__PURE__ */ (function() {
  function t() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return t;
})(), Pf = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new AL();
  }, e.prototype.buildPath = function(r, n) {
    r.moveTo(n.cx + n.r, n.cy), r.arc(n.cx, n.cy, n.r, 0, Math.PI * 2);
  }, e;
})(Gt);
Pf.prototype.type = "circle";
var IL = /* @__PURE__ */ (function() {
  function t() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return t;
})(), Yd = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new IL();
  }, e.prototype.buildPath = function(r, n) {
    var i = 0.5522848, a = n.cx, o = n.cy, s = n.rx, l = n.ry, u = s * i, f = l * i;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o), r.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o), r.closePath();
  }, e;
})(Gt);
Yd.prototype.type = "ellipse";
var KS = Math.PI, $c = KS * 2, Ii = Math.sin, pa = Math.cos, LL = Math.acos, me = Math.atan2, qm = Math.abs, Jo = Math.sqrt, Oo = Math.max, Hr = Math.min, _r = 1e-4;
function EL(t, e, r, n, i, a, o, s) {
  var l = r - t, u = n - e, f = o - i, c = s - a, h = c * l - f * u;
  if (!(h * h < _r))
    return h = (f * (e - a) - c * (t - i)) / h, [t + h * l, e + h * u];
}
function _l(t, e, r, n, i, a, o) {
  var s = t - r, l = e - n, u = (o ? a : -a) / Jo(s * s + l * l), f = u * l, c = -u * s, h = t + f, v = e + c, d = r + f, p = n + c, m = (h + d) / 2, g = (v + p) / 2, y = d - h, _ = p - v, S = y * y + _ * _, b = i - a, T = h * p - d * v, C = (_ < 0 ? -1 : 1) * Jo(Oo(0, b * b * S - T * T)), E = (T * _ - y * C) / S, A = (-T * y - _ * C) / S, M = (T * _ + y * C) / S, R = (-T * y + _ * C) / S, B = E - m, O = A - g, F = M - m, U = R - g;
  return B * B + O * O > F * F + U * U && (E = M, A = R), {
    cx: E,
    cy: A,
    x0: -f,
    y0: -c,
    x1: E * (i / b - 1),
    y1: A * (i / b - 1)
  };
}
function PL(t) {
  var e;
  if (J(t)) {
    var r = t.length;
    if (!r)
      return t;
    r === 1 ? e = [t[0], t[0], 0, 0] : r === 2 ? e = [t[0], t[0], t[1], t[1]] : r === 3 ? e = t.concat(t[2]) : e = t;
  } else
    e = [t, t, t, t];
  return e;
}
function RL(t, e) {
  var r, n = Oo(e.r, 0), i = Oo(e.r0 || 0, 0), a = n > 0, o = i > 0;
  if (!(!a && !o)) {
    if (a || (n = i, i = 0), i > n) {
      var s = n;
      n = i, i = s;
    }
    var l = e.startAngle, u = e.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = e.cx, c = e.cy, h = !!e.clockwise, v = qm(u - l), d = v > $c && v % $c;
      if (d > _r && (v = d), !(n > _r))
        t.moveTo(f, c);
      else if (v > $c - _r)
        t.moveTo(f + n * pa(l), c + n * Ii(l)), t.arc(f, c, n, l, u, !h), i > _r && (t.moveTo(f + i * pa(u), c + i * Ii(u)), t.arc(f, c, i, u, l, h));
      else {
        var p = void 0, m = void 0, g = void 0, y = void 0, _ = void 0, S = void 0, b = void 0, T = void 0, C = void 0, E = void 0, A = void 0, M = void 0, R = void 0, B = void 0, O = void 0, F = void 0, U = n * pa(l), H = n * Ii(l), W = i * pa(u), V = i * Ii(u), j = v > _r;
        if (j) {
          var rt = e.cornerRadius;
          rt && (r = PL(rt), p = r[0], m = r[1], g = r[2], y = r[3]);
          var tt = qm(n - i) / 2;
          if (_ = Hr(tt, g), S = Hr(tt, y), b = Hr(tt, p), T = Hr(tt, m), A = C = Oo(_, S), M = E = Oo(b, T), (C > _r || E > _r) && (R = n * pa(u), B = n * Ii(u), O = i * pa(l), F = i * Ii(l), v < KS)) {
            var it = EL(U, H, O, F, R, B, W, V);
            if (it) {
              var ot = U - it[0], Z = H - it[1], bt = R - it[0], St = B - it[1], jt = 1 / Ii(LL((ot * bt + Z * St) / (Jo(ot * ot + Z * Z) * Jo(bt * bt + St * St))) / 2), ge = Jo(it[0] * it[0] + it[1] * it[1]);
              A = Hr(C, (n - ge) / (jt + 1)), M = Hr(E, (i - ge) / (jt - 1));
            }
          }
        }
        if (!j)
          t.moveTo(f + U, c + H);
        else if (A > _r) {
          var Ct = Hr(g, A), Jt = Hr(y, A), x = _l(O, F, U, H, n, Ct, h), D = _l(R, B, W, V, n, Jt, h);
          t.moveTo(f + x.cx + x.x0, c + x.cy + x.y0), A < C && Ct === Jt ? t.arc(f + x.cx, c + x.cy, A, me(x.y0, x.x0), me(D.y0, D.x0), !h) : (Ct > 0 && t.arc(f + x.cx, c + x.cy, Ct, me(x.y0, x.x0), me(x.y1, x.x1), !h), t.arc(f, c, n, me(x.cy + x.y1, x.cx + x.x1), me(D.cy + D.y1, D.cx + D.x1), !h), Jt > 0 && t.arc(f + D.cx, c + D.cy, Jt, me(D.y1, D.x1), me(D.y0, D.x0), !h));
        } else
          t.moveTo(f + U, c + H), t.arc(f, c, n, l, u, !h);
        if (!(i > _r) || !j)
          t.lineTo(f + W, c + V);
        else if (M > _r) {
          var Ct = Hr(p, M), Jt = Hr(m, M), x = _l(W, V, R, B, i, -Jt, h), D = _l(U, H, O, F, i, -Ct, h);
          t.lineTo(f + x.cx + x.x0, c + x.cy + x.y0), M < E && Ct === Jt ? t.arc(f + x.cx, c + x.cy, M, me(x.y0, x.x0), me(D.y0, D.x0), !h) : (Jt > 0 && t.arc(f + x.cx, c + x.cy, Jt, me(x.y0, x.x0), me(x.y1, x.x1), !h), t.arc(f, c, i, me(x.cy + x.y1, x.cx + x.x1), me(D.cy + D.y1, D.cx + D.x1), h), Ct > 0 && t.arc(f + D.cx, c + D.cy, Ct, me(D.y1, D.x1), me(D.y0, D.x0), !h));
        } else
          t.lineTo(f + W, c + V), t.arc(f, c, i, u, l, h);
      }
      t.closePath();
    }
  }
}
var OL = /* @__PURE__ */ (function() {
  function t() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return t;
})(), Rf = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new OL();
  }, e.prototype.buildPath = function(r, n) {
    RL(r, n);
  }, e.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, e;
})(Gt);
Rf.prototype.type = "sector";
var kL = /* @__PURE__ */ (function() {
  function t() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return t;
})(), $d = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new kL();
  }, e.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.PI * 2;
    r.moveTo(i + n.r, a), r.arc(i, a, n.r, 0, o, !1), r.moveTo(i + n.r0, a), r.arc(i, a, n.r0, 0, o, !0);
  }, e;
})(Gt);
$d.prototype.type = "ring";
function BL(t, e, r, n) {
  var i = [], a = [], o = [], s = [], l, u, f, c;
  if (n) {
    f = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var h = 0, v = t.length; h < v; h++)
      Ma(f, f, t[h]), Aa(c, c, t[h]);
    Ma(f, f, n[0]), Aa(c, c, n[1]);
  }
  for (var h = 0, v = t.length; h < v; h++) {
    var d = t[h];
    if (r)
      l = t[h ? h - 1 : v - 1], u = t[(h + 1) % v];
    else if (h === 0 || h === v - 1) {
      i.push(ZD(t[h]));
      continue;
    } else
      l = t[h - 1], u = t[h + 1];
    jD(a, u, l), sc(a, a, e);
    var p = Uh(d, l), m = Uh(d, u), g = p + m;
    g !== 0 && (p /= g, m /= g), sc(o, a, -p), sc(s, a, m);
    var y = Ig([], d, o), _ = Ig([], d, s);
    n && (Aa(y, y, f), Ma(y, y, c), Aa(_, _, f), Ma(_, _, c)), i.push(y), i.push(_);
  }
  return r && i.push(i.shift()), i;
}
function qS(t, e, r) {
  var n = e.smooth, i = e.points;
  if (i && i.length >= 2) {
    if (n) {
      var a = BL(i, n, r, e.smoothConstraint);
      t.moveTo(i[0][0], i[0][1]);
      for (var o = i.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], f = i[(s + 1) % o];
        t.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1]);
      }
    } else {
      t.moveTo(i[0][0], i[0][1]);
      for (var s = 1, c = i.length; s < c; s++)
        t.lineTo(i[s][0], i[s][1]);
    }
    r && t.closePath();
  }
}
var NL = /* @__PURE__ */ (function() {
  function t() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return t;
})(), Xd = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultShape = function() {
    return new NL();
  }, e.prototype.buildPath = function(r, n) {
    qS(r, n, !0);
  }, e;
})(Gt);
Xd.prototype.type = "polygon";
var FL = /* @__PURE__ */ (function() {
  function t() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return t;
})(), Kd = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, e.prototype.getDefaultShape = function() {
    return new FL();
  }, e.prototype.buildPath = function(r, n) {
    qS(r, n, !1);
  }, e;
})(Gt);
Kd.prototype.type = "polyline";
var HL = {}, zL = /* @__PURE__ */ (function() {
  function t() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return t;
})(), oi = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, e.prototype.getDefaultShape = function() {
    return new zL();
  }, e.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = IS(HL, n, this.style);
      i = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      i = n.x1, a = n.y1, o = n.x2, s = n.y2;
    var u = n.percent;
    u !== 0 && (r.moveTo(i, a), u < 1 && (o = i * (1 - u) + o * u, s = a * (1 - u) + s * u), r.lineTo(o, s));
  }, e.prototype.pointAt = function(r) {
    var n = this.shape;
    return [
      n.x1 * (1 - r) + n.x2 * r,
      n.y1 * (1 - r) + n.y2 * r
    ];
  }, e;
})(Gt);
oi.prototype.type = "line";
var Oe = [], VL = /* @__PURE__ */ (function() {
  function t() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return t;
})();
function Zm(t, e, r) {
  var n = t.cpx2, i = t.cpy2;
  return n != null || i != null ? [
    (r ? Ug : de)(t.x1, t.cpx1, t.cpx2, t.x2, e),
    (r ? Ug : de)(t.y1, t.cpy1, t.cpy2, t.y2, e)
  ] : [
    (r ? Gg : Be)(t.x1, t.cpx1, t.x2, e),
    (r ? Gg : Be)(t.y1, t.cpy1, t.y2, e)
  ];
}
var qd = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, e.prototype.getDefaultShape = function() {
    return new VL();
  }, e.prototype.buildPath = function(r, n) {
    var i = n.x1, a = n.y1, o = n.x2, s = n.y2, l = n.cpx1, u = n.cpy1, f = n.cpx2, c = n.cpy2, h = n.percent;
    h !== 0 && (r.moveTo(i, a), f == null || c == null ? (h < 1 && (Au(i, l, o, h, Oe), l = Oe[1], o = Oe[2], Au(a, u, s, h, Oe), u = Oe[1], s = Oe[2]), r.quadraticCurveTo(l, u, o, s)) : (h < 1 && (Mu(i, l, f, o, h, Oe), l = Oe[1], f = Oe[2], o = Oe[3], Mu(a, u, c, s, h, Oe), u = Oe[1], c = Oe[2], s = Oe[3]), r.bezierCurveTo(l, u, f, c, o, s)));
  }, e.prototype.pointAt = function(r) {
    return Zm(this.shape, r, !1);
  }, e.prototype.tangentAt = function(r) {
    var n = Zm(this.shape, r, !0);
    return tM(n, n);
  }, e;
})(Gt);
qd.prototype.type = "bezier-curve";
var UL = /* @__PURE__ */ (function() {
  function t() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return t;
})(), Of = (function(t) {
  Q(e, t);
  function e(r) {
    return t.call(this, r) || this;
  }
  return e.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, e.prototype.getDefaultShape = function() {
    return new UL();
  }, e.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.max(n.r, 0), s = n.startAngle, l = n.endAngle, u = n.clockwise, f = Math.cos(s), c = Math.sin(s);
    r.moveTo(f * o + i, c * o + a), r.arc(i, a, o, s, l, !u);
  }, e;
})(Gt);
Of.prototype.type = "arc";
var GL = (function(t) {
  Q(e, t);
  function e() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.type = "compound", r;
  }
  return e.prototype._updatePathDirty = function() {
    for (var r = this.shape.paths, n = this.shapeChanged(), i = 0; i < r.length; i++)
      n = n || r[i].shapeChanged();
    n && this.dirtyShape();
  }, e.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var r = this.shape.paths || [], n = this.getGlobalScale(), i = 0; i < r.length; i++)
      r[i].path || r[i].createPathProxy(), r[i].path.setScale(n[0], n[1], r[i].segmentIgnoreThreshold);
  }, e.prototype.buildPath = function(r, n) {
    for (var i = n.paths || [], a = 0; a < i.length; a++)
      i[a].buildPath(r, i[a].shape, !0);
  }, e.prototype.afterBrush = function() {
    for (var r = this.shape.paths || [], n = 0; n < r.length; n++)
      r[n].pathUpdated();
  }, e.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), Gt.prototype.getBoundingRect.call(this);
  }, e;
})(Gt), ZS = (function() {
  function t(e) {
    this.colorStops = e || [];
  }
  return t.prototype.addColorStop = function(e, r) {
    this.colorStops.push({
      offset: e,
      color: r
    });
  }, t;
})(), jS = (function(t) {
  Q(e, t);
  function e(r, n, i, a, o, s) {
    var l = t.call(this, o) || this;
    return l.x = r ?? 0, l.y = n ?? 0, l.x2 = i ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return e;
})(ZS), WL = (function(t) {
  Q(e, t);
  function e(r, n, i, a, o) {
    var s = t.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = n ?? 0.5, s.r = i ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return e;
})(ZS), Xc = Math.min, YL = Math.max, Sl = Math.abs, Li = [0, 0], Ei = [0, 0], fe = V1(), bl = fe.minTv, Tl = fe.maxTv, JS = (function() {
  function t(e, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var n = 0; n < 4; n++)
      this._corners[n] = new Vt();
    for (var n = 0; n < 2; n++)
      this._axes[n] = new Vt();
    e && this.fromBoundingRect(e, r);
  }
  return t.prototype.fromBoundingRect = function(e, r) {
    var n = this._corners, i = this._axes, a = e.x, o = e.y, s = a + e.width, l = o + e.height;
    if (n[0].set(a, o), n[1].set(s, o), n[2].set(s, l), n[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        n[u].transform(r);
    Vt.sub(i[0], n[1], n[0]), Vt.sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = i[u].dot(n[0]);
  }, t.prototype.intersect = function(e, r, n) {
    var i = !0, a = !r;
    return r && Vt.set(r, 0, 0), fe.reset(n, !a), !this._intersectCheckOneSide(this, e, a, 1) && (i = !1, a) || !this._intersectCheckOneSide(e, this, a, -1) && (i = !1, a) || !a && !fe.negativeSize && Vt.copy(r, i ? fe.useDir ? fe.dirMinTv : bl : Tl), i;
  }, t.prototype._intersectCheckOneSide = function(e, r, n, i) {
    for (var a = !0, o = 0; o < 2; o++) {
      var s = e._axes[o];
      if (e._getProjMinMaxOnAxis(o, e._corners, Li), e._getProjMinMaxOnAxis(o, r._corners, Ei), fe.negativeSize || Li[1] < Ei[0] || Li[0] > Ei[1]) {
        if (a = !1, fe.negativeSize || n)
          return a;
        var l = Sl(Ei[0] - Li[1]), u = Sl(Li[0] - Ei[1]);
        Xc(l, u) > Tl.len() && (l < u ? Vt.scale(Tl, s, -l * i) : Vt.scale(Tl, s, u * i));
      } else if (!n) {
        var l = Sl(Ei[0] - Li[1]), u = Sl(Li[0] - Ei[1]);
        (fe.useDir || Xc(l, u) < bl.len()) && ((l < u || !fe.bidirectional) && (Vt.scale(bl, s, l * i), fe.useDir && fe.calcDirMTV()), (l >= u || !fe.bidirectional) && (Vt.scale(bl, s, -u * i), fe.useDir && fe.calcDirMTV()));
      }
    }
    return a;
  }, t.prototype._getProjMinMaxOnAxis = function(e, r, n) {
    for (var i = this._axes[e], a = this._origin, o = r[0].dot(i) + a[e], s = o, l = o, u = 1; u < r.length; u++) {
      var f = r[u].dot(i) + a[e];
      s = Xc(f, s), l = YL(f, l);
    }
    n[0] = s + fe.touchThreshold, n[1] = l - fe.touchThreshold, fe.negativeSize = n[1] < n[0];
  }, t;
})(), QS = 0, $L = 1, XL = 2, KL = 1, iu = 0, qL = [], ZL = (function(t) {
  Q(e, t);
  function e() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.notClear = !0, r.incremental = $L, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r;
  }
  return e.prototype.traverse = function(r, n) {
    r.call(n, this);
  }, e.prototype.useStyle = function() {
    this.style = {};
  }, e.prototype._useHoverStyle = function() {
    this.__hoverStyle = null;
  }, e.prototype.getCursor = function() {
    return this._cursor;
  }, e.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, e.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, e.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, e.prototype.addDisplayable = function(r, n) {
    n ? this._temporaryDisplayables.push(r) : this._displayables.push(r), this.markRedraw();
  }, e.prototype.addDisplayables = function(r, n) {
    n = n || !1;
    for (var i = 0; i < r.length; i++)
      this.addDisplayable(r[i], n);
  }, e.prototype.getDisplayables = function() {
    return this._displayables;
  }, e.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, e.prototype.eachPendingDisplayable = function(r) {
    for (var n = this._cursor; n < this._displayables.length; n++)
      r && r(this._displayables[n]);
    for (var n = 0; n < this._temporaryDisplayables.length; n++)
      r && r(this._temporaryDisplayables[n]);
  }, e.prototype.update = function() {
    this.updateTransform();
    for (var r = this._cursor; r < this._displayables.length; r++) {
      var n = this._displayables[r];
      n.parent = this, n.update(), n.parent = null;
    }
    for (var r = 0; r < this._temporaryDisplayables.length; r++) {
      var n = this._temporaryDisplayables[r];
      n.parent = this, n.update(), n.parent = null;
    }
  }, e.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var r = new mt(1 / 0, 1 / 0, -1 / 0, -1 / 0), n = 0; n < this._displayables.length; n++) {
        var i = this._displayables[n], a = i.getBoundingRect().clone();
        i.needLocalTransform() && a.applyTransform(i.getLocalTransform(qL)), r.union(a);
      }
      this._rect = r;
    }
    return this._rect;
  }, e.prototype.contain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect();
    if (a.contain(i[0], i[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(r, n))
          return !0;
      }
    return !1;
  }, e;
})(Ys), jL = Wt();
function JL(t, e, r, n, i) {
  var a;
  if (e && e.ecModel) {
    var o = e.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = e && e.isAnimationEnabled(), l = t === "update";
  if (s) {
    var u = void 0, f = void 0, c = void 0;
    n ? (u = vt(n.duration, 200), f = vt(n.easing, "cubicOut"), c = 0) : (u = e.getShallow(l ? "animationDurationUpdate" : "animationDuration"), f = e.getShallow(l ? "animationEasingUpdate" : "animationEasing"), c = e.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (f = a.easing), a.delay != null && (c = a.delay)), _t(c) && (c = c(r, i)), _t(u) && (u = u(r));
    var h = {
      duration: u || 0,
      delay: c,
      easing: f
    };
    return h;
  } else
    return null;
}
function Zd(t, e, r, n, i, a, o) {
  var s = !1, l;
  _t(i) ? (o = a, a = i, i = null) : ft(i) && (a = i.cb, o = i.during, s = i.isFrom, l = i.removeOpt, i = i.dataIndex);
  var u = t === "leave";
  u || e.stopAnimation("leave");
  var f = JL(t, n, i, u ? l || {} : null, n && n.getAnimationDelayParams ? n.getAnimationDelayParams(e, i) : null);
  if (f && f.duration > 0) {
    var c = f.duration, h = f.delay, v = f.easing, d = {
      duration: c,
      delay: h || 0,
      easing: v,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: t,
      during: o
    };
    s ? e.animateFrom(r, d) : e.animateTo(r, d);
  } else
    e.stopAnimation(), !s && e.attr(r), o && o(1), a && a();
}
function si(t, e, r, n, i, a) {
  Zd("update", t, e, r, n, i, a);
}
function Xs(t, e, r, n, i, a) {
  Zd("enter", t, e, r, n, i, a);
}
function Qo(t) {
  if (!t.__zr)
    return !0;
  for (var e = 0; e < t.animators.length; e++) {
    var r = t.animators[e];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function Hu(t, e, r, n, i, a) {
  Qo(t) || Zd("leave", t, e, r, n, i, a);
}
function jm(t, e, r, n) {
  t.removeTextContent(), t.removeTextGuideLine(), Hu(t, {
    style: {
      opacity: 0
    }
  }, e, r, n);
}
function QL(t, e, r) {
  function n() {
    t.parent && t.parent.remove(t);
  }
  t.isGroup ? t.traverse(function(i) {
    i.isGroup || jm(i, e, r, n);
  }) : jm(t, e, r, n);
}
function tE(t) {
  jL(t).oldStyle = t.style;
}
var Tv = {}, zi = ["x", "y"], Ss = ["width", "height"], tb = 0, eb = 1, jd = 2;
function eE(t) {
  return Gt.extend(t);
}
var rE = DL;
function nE(t, e) {
  return rE(t, e);
}
function Lr(t, e) {
  Tv[t] = e;
}
function iE(t) {
  if (Tv.hasOwnProperty(t))
    return Tv[t];
}
function Jd(t, e, r, n) {
  var i = CL(t, e);
  return r && (n === "center" && (r = nb(r, i.getBoundingRect())), ib(i, r)), i;
}
function rb(t, e, r) {
  var n = new hi({
    style: {
      image: t,
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    },
    onload: function(i) {
      if (r === "center") {
        var a = {
          width: i.width,
          height: i.height
        };
        n.setStyle(nb(e, a));
      }
    }
  });
  return n;
}
function nb(t, e) {
  var r = e.width / e.height, n = t.height * r, i;
  n <= t.width ? i = t.height : (n = t.width, i = n / r);
  var a = t.x + t.width / 2, o = t.y + t.height / 2;
  return {
    x: a - n / 2,
    y: o - i / 2,
    width: n,
    height: i
  };
}
var aE = ML;
function ib(t, e) {
  if (t.applyTransform) {
    var r = t.getBoundingRect(), n = r.calculateTransform(e);
    t.applyTransform(n);
  }
}
function bs(t, e) {
  return IS(t, t, {
    lineWidth: e
  }), t;
}
function oE(t, e) {
  return LS(t, t, e), t;
}
var sE = Wi;
function lE(t, e) {
  for (var r = Fs([]); t && t !== e; )
    Ko(r, t.getLocalTransform(), r), t = t.parent;
  return r;
}
function Qd(t, e, r) {
  return e && !He(e) && (e = Vs.getLocalTransform(e)), r && (e = Hs([], e)), dr([], t, e);
}
function uE(t, e, r) {
  var n = e[4] === 0 || e[5] === 0 || e[0] === 0 ? 1 : ce(2 * e[4] / e[0]), i = e[4] === 0 || e[5] === 0 || e[2] === 0 ? 1 : ce(2 * e[4] / e[2]), a = [t === "left" ? -n : t === "right" ? n : 0, t === "top" ? -i : t === "bottom" ? i : 0];
  return a = Qd(a, e, r), ce(a[0]) > ce(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Jm(t) {
  return !t.isGroup;
}
function fE(t) {
  return t.shape != null;
}
function ab(t, e, r) {
  if (!t || !e)
    return;
  function n(o) {
    var s = {};
    return o.traverse(function(l) {
      Jm(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function i(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return fE(o) && (s.shape = xt(o.shape)), s;
  }
  var a = n(t);
  e.traverse(function(o) {
    if (Jm(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = i(o);
        o.attr(i(s)), si(o, l, r, Bt(o).dataIndex);
      }
    }
  });
}
function cE(t, e) {
  return pt(t, function(r) {
    var n = r[0];
    n = Nt(n, e.x), n = Ze(n, e.x + e.width);
    var i = r[1];
    return i = Nt(i, e.y), i = Ze(i, e.y + e.height), [n, i];
  });
}
function hE(t, e) {
  var r = Nt(t.x, e.x), n = Ze(t.x + t.width, e.x + e.width), i = Nt(t.y, e.y), a = Ze(t.y + t.height, e.y + e.height);
  if (n >= r && a >= i)
    return {
      x: r,
      y: i,
      width: n - r,
      height: a - i
    };
}
function tp(t, e, r) {
  var n = q({
    rectHover: !0
  }, e), i = n.style = {
    strokeNoScale: !0
  };
  if (r = r || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, t)
    return t.indexOf("image://") === 0 ? (i.image = t.slice(8), Ht(i, r), new hi(n)) : Jd(t.replace("path://", ""), n, r, "center");
}
function vE(t, e, r, n, i) {
  for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
    var s = i[a];
    if (ob(t, e, r, n, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function ob(t, e, r, n, i, a, o, s) {
  var l = r - t, u = n - e, f = o - i, c = s - a, h = Kc(f, c, l, u);
  if (dE(h))
    return !1;
  var v = t - i, d = e - a, p = Kc(v, d, l, u) / h;
  if (p < 0 || p > 1)
    return !1;
  var m = Kc(v, d, f, c) / h;
  return !(m < 0 || m > 1);
}
function Kc(t, e, r, n) {
  return t * n - r * e;
}
function dE(t) {
  return t <= 1e-6 && t >= -1e-6;
}
function zu(t, e, r, n, i) {
  return e == null || (qt(e) ? Yt[0] = Yt[1] = Yt[2] = Yt[3] = e : (Yt[0] = e[0], Yt[1] = e[1], Yt[2] = e[2], Yt[3] = e[3]), n && (Yt[0] = Nt(0, Yt[0]), Yt[1] = Nt(0, Yt[1]), Yt[2] = Nt(0, Yt[2]), Yt[3] = Nt(0, Yt[3])), r && (Yt[0] = -Yt[0], Yt[1] = -Yt[1], Yt[2] = -Yt[2], Yt[3] = -Yt[3]), Qm(t, Yt, "x", "width", 3, 1, i && i[0] || 0), Qm(t, Yt, "y", "height", 0, 2, i && i[1] || 0)), t;
}
var Yt = [0, 0, 0, 0];
function Qm(t, e, r, n, i, a, o) {
  var s = e[a] + e[i], l = t[n];
  t[n] += s, o = Nt(0, Ze(o, l)), t[n] < o ? (t[n] = o, t[r] += e[i] >= 0 ? -e[i] : e[a] >= 0 ? l + e[a] : ce(s) > 1e-8 ? (l - o) * e[i] / s : 0) : t[r] -= e[i];
}
function kf(t) {
  var e = t.itemTooltipOption, r = t.componentModel, n = t.itemName, i = at(e) ? {
    formatter: e
  } : e, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: n,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = t.formatterParamsExtra;
  l && P(Kt(l), function(f) {
    qe(s, f) || (s[f] = l[f], s.$vars.push(f));
  });
  var u = Bt(t.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: n,
    option: Ht({
      content: n,
      encodeHTMLContent: !0,
      formatterParams: s
    }, i)
  };
}
function wv(t, e) {
  var r;
  t.isGroup && (r = e(t)), r || t.traverse(e);
}
function ep(t, e) {
  if (t)
    if (J(t))
      for (var r = 0; r < t.length; r++)
        wv(t[r], e);
    else
      wv(t, e);
}
function rp(t) {
  return !t || ce(t[1]) < wl && ce(t[2]) < wl || ce(t[0]) < wl && ce(t[3]) < wl;
}
var wl = 1e-5;
function Ts(t, e) {
  return t ? mt.copy(t, e) : e.clone();
}
function np(t, e) {
  return e ? Id(t || jr(), e) : void 0;
}
function sb(t) {
  return {
    z: t.get("z") || 0,
    zlevel: t.get("zlevel") || 0
  };
}
function pE(t) {
  var e = -1 / 0, r = 1 / 0;
  wv(t, function(a) {
    n(a), n(a.getTextContent()), n(a.getTextGuideLine());
  });
  function n(a) {
    if (!(!a || a.isGroup)) {
      var o = a.currentStates;
      if (o.length)
        for (var s = 0; s < o.length; s++)
          i(a.states[o[s]]);
      i(a);
    }
  }
  function i(a) {
    if (a) {
      var o = a.z2;
      o > e && (e = o), o < r && (r = o);
    }
  }
  return r > e && (r = e = 0), {
    min: r,
    max: e
  };
}
function lb(t, e, r) {
  ub(t, e, r, -1 / 0);
}
function ub(t, e, r, n) {
  if (t.ignoreModelZ)
    return n;
  var i = t.getTextContent(), a = t.getTextGuideLine(), o = t.isGroup;
  if (o)
    for (var s = t.childrenRef(), l = 0; l < s.length; l++)
      n = Nt(ub(s[l], e, r, n), n);
  else
    t.z = e, t.zlevel = r, n = Nt(t.z2 || 0, n);
  if (i && (i.z = e, i.zlevel = r, isFinite(n) && (i.z2 = n + 2)), a) {
    var u = t.textGuideLineConfig;
    a.z = e, a.zlevel = r, isFinite(n) && (a.z2 = n + (u && u.showAbove ? 1 : -1));
  }
  return n;
}
function gE(t) {
  return t.animation = {
    duration: 0
  }, t;
}
function mE(t, e) {
  return e ? Id(ko.transform, e) : Fs(ko.transform), ko.decomposeTransform(), Eu(t, ko), t;
}
var ko = new Vs();
ko.transform = jr();
function yE(t) {
  var e = t.getZr().painter;
  return e.getType() === "canvas" ? e : null;
}
Lr("circle", Pf);
Lr("ellipse", Yd);
Lr("sector", Rf);
Lr("ring", $d);
Lr("polygon", Xd);
Lr("polyline", Kd);
Lr("rect", se);
Lr("line", oi);
Lr("bezierCurve", qd);
Lr("arc", Of);
const _E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: Of,
  BezierCurve: qd,
  BoundingRect: mt,
  Circle: Pf,
  CompoundPath: GL,
  Ellipse: Yd,
  Group: pe,
  HOVER_LAYER_FOR_INCREMENTAL: jd,
  HOVER_LAYER_FROM_THRESHOLD: eb,
  HOVER_LAYER_NO: tb,
  Image: hi,
  IncrementalDisplayable: ZL,
  Line: oi,
  LinearGradient: jS,
  OrientedBoundingRect: JS,
  Path: Gt,
  Point: Vt,
  Polygon: Xd,
  Polyline: Kd,
  RadialGradient: WL,
  Rect: se,
  Ring: $d,
  Sector: Rf,
  Text: Ve,
  WH: Ss,
  XY: zi,
  applyTransform: Qd,
  calcZ2Range: pE,
  clipPointsByRect: cE,
  clipRectByRect: hE,
  createIcon: tp,
  decomposeTransform: mE,
  ensureCopyRect: Ts,
  ensureCopyTransform: np,
  expandOrShrinkRect: zu,
  extendPath: nE,
  extendShape: eE,
  getCurrentCanvasPainter: yE,
  getShapeClass: iE,
  getTransform: lE,
  groupTransition: ab,
  initProps: Xs,
  isBoundingRectAxisAligned: rp,
  isElementRemoved: Qo,
  lineLineIntersect: ob,
  linePolygonIntersect: vE,
  makeImage: rb,
  makePath: Jd,
  mergePath: aE,
  payloadDisableAnimation: gE,
  registerShape: Lr,
  removeElement: Hu,
  removeElementWithFadeOut: QL,
  resizePath: ib,
  retrieveZInfo: sb,
  setTooltipConfig: kf,
  subPixelOptimize: sE,
  subPixelOptimizeLine: bs,
  subPixelOptimizeRect: oE,
  transformDirection: uE,
  traverseElements: ep,
  traverseUpdateZ: lb,
  updateProps: si
}, Symbol.toStringTag, { value: "Module" }));
var Bf = {};
function SE(t, e) {
  for (var r = 0; r < fn.length; r++) {
    var n = fn[r], i = e[n], a = t.ensureState(n);
    a.style = a.style || {}, a.style.text = i;
  }
  var o = t.currentStates.slice();
  t.clearStates(!0), t.setStyle({
    text: e.normal
  }), t.useStates(o, !0);
}
function ty(t, e, r) {
  var n = t.labelFetcher, i = t.labelDataIndex, a = t.labelDimIndex, o = e.normal, s;
  n && (s = n.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = _t(t.defaultText) ? t.defaultText(i, t, r) : t.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < fn.length; u++) {
    var f = fn[u], c = e[f];
    l[f] = vt(n ? n.getFormattedLabel(i, f, null, a, c && c.get("formatter")) : null, s);
  }
  return l;
}
function ip(t, e, r, n) {
  r = r || Bf;
  for (var i = t instanceof Ve, a = !1, o = 0; o < Bm.length; o++) {
    var s = e[Bm[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = i ? t : t.getTextContent();
  if (a) {
    i || (l || (l = new Ve(), t.setTextContent(l)), t.stateProxy && (l.stateProxy = t.stateProxy));
    var u = ty(r, e), f = e.normal, c = !!f.getShallow("show"), h = Za(f, n && n.normal, r, !1, !i);
    h.text = u.normal, i || t.setTextConfig(ey(f, r, !1));
    for (var o = 0; o < fn.length; o++) {
      var v = fn[o], s = e[v];
      if (s) {
        var d = l.ensureState(v), p = !!vt(s.getShallow("show"), c);
        if (p !== c && (d.ignore = !p), d.style = Za(s, n && n[v], r, !0, !i), d.style.text = u[v], !i) {
          var m = t.ensureState(v);
          m.textConfig = ey(s, r, !0);
        }
      }
    }
    l.silent = !!f.getShallow("silent"), l.style.x != null && (h.x = l.style.x), l.style.y != null && (h.y = l.style.y), l.ignore = !c, l.useStyle(h), l.dirty(), r.enableTextSetter && (fb(l).setLabelText = function(g) {
      var y = ty(r, e, g);
      SE(l, y);
    });
  } else l && (l.ignore = !0);
  t.dirty();
}
function ap(t, e) {
  e = e || "label";
  for (var r = {
    normal: t.getModel(e)
  }, n = 0; n < fn.length; n++) {
    var i = fn[n];
    r[i] = t.getModel([i, e]);
  }
  return r;
}
function Za(t, e, r, n, i) {
  var a = {};
  return bE(a, t, r, n, i), e && q(a, e), a;
}
function ey(t, e, r) {
  e = e || {};
  var n = {}, i, a = t.getShallow("rotate"), o = vt(t.getShallow("distance"), r ? null : 5), s = t.getShallow("offset");
  return i = t.getShallow("position") || (r ? null : "inside"), i === "outside" && (i = e.defaultOutsidePosition || "top"), i != null && (n.position = i), s != null && (n.offset = s), a != null && (a *= Math.PI / 180, n.rotation = a), o != null && (n.distance = o), n.outsideFill = t.get("color") === "inherit" ? e.inheritColor || null : "auto", e.autoOverflowArea != null && (n.autoOverflowArea = e.autoOverflowArea), e.layoutRect != null && (n.layoutRect = e.layoutRect), n;
}
function bE(t, e, r, n, i) {
  r = r || Bf;
  var a = e.ecModel, o = a && a.option.textStyle, s = TE(e), l;
  if (s) {
    l = {};
    var u = "richInheritPlainLabel", f = vt(e.get(u), a ? a.get(u) : void 0);
    for (var c in s)
      if (s.hasOwnProperty(c)) {
        var h = e.getModel(["rich", c]);
        ay(l[c] = {}, h, o, e, f, r, n, i, !1, !0);
      }
  }
  l && (t.rich = l);
  var v = e.get("overflow");
  v && (t.overflow = v);
  var d = e.get("lineOverflow");
  d && (t.lineOverflow = d);
  var p = t, m = e.get("minMargin");
  if (m != null)
    m = qt(m) ? m / 2 : 0, p.margin = [m, m, m, m], p.__marginType = Pa.minMargin;
  else {
    var g = e.get("textMargin");
    g != null && (p.margin = Md(g), p.__marginType = Pa.textMargin);
  }
  ay(t, e, o, null, null, r, n, i, !0, !1);
}
function TE(t) {
  for (var e; t && t !== t.ecModel; ) {
    var r = (t.option || Bf).rich;
    if (r) {
      e = e || {};
      for (var n = Kt(r), i = 0; i < n.length; i++) {
        var a = n[i];
        e[a] = 1;
      }
    }
    t = t.parentModel;
  }
  return e;
}
var ry = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], ny = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], iy = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function ay(t, e, r, n, i, a, o, s, l, u) {
  r = !o && r || Bf;
  var f = a && a.inheritColor, c = e.getShallow("color"), h = e.getShallow("textBorderColor"), v = vt(e.getShallow("opacity"), r.opacity);
  (c === "inherit" || c === "auto") && (f ? c = f : c = null), (h === "inherit" || h === "auto") && (f ? h = f : h = null), s || (c = c || r.color, h = h || r.textBorderColor), c != null && (t.fill = c), h != null && (t.stroke = h);
  var d = vt(e.getShallow("textBorderWidth"), r.textBorderWidth);
  d != null && (t.lineWidth = d);
  var p = vt(e.getShallow("textBorderType"), r.textBorderType);
  p != null && (t.lineDash = p);
  var m = vt(e.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  m != null && (t.lineDashOffset = m), !o && v == null && !u && (v = a && a.defaultOpacity), v != null && (t.opacity = v), !o && !s && t.fill == null && a.inheritColor && (t.fill = a.inheritColor);
  for (var g = 0; g < ry.length; g++) {
    var y = ry[g], _ = i !== !1 && n ? ka(e.getShallow(y), n.getShallow(y), r[y]) : vt(e.getShallow(y), r[y]);
    _ != null && (t[y] = _);
  }
  for (var g = 0; g < ny.length; g++) {
    var y = ny[g], _ = e.getShallow(y);
    _ != null && (t[y] = _);
  }
  if (t.verticalAlign == null) {
    var S = e.getShallow("baseline");
    S != null && (t.verticalAlign = S);
  }
  if (!l || !a.disableBox) {
    for (var g = 0; g < iy.length; g++) {
      var y = iy[g], _ = e.getShallow(y);
      _ != null && (t[y] = _);
    }
    var b = e.getShallow("borderType");
    b != null && (t.borderDash = b), (t.backgroundColor === "auto" || t.backgroundColor === "inherit") && f && (t.backgroundColor = f), (t.borderColor === "auto" || t.borderColor === "inherit") && f && (t.borderColor = f);
  }
}
function wE(t, e) {
  var r = e && e.getModel("textStyle");
  return Kr([
    // FIXME in node-canvas fontWeight is before fontStyle
    t.fontStyle || r && r.getShallow("fontStyle") || "",
    t.fontWeight || r && r.getShallow("fontWeight") || "",
    (t.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    t.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var fb = Wt(), Pa = {
  minMargin: 1,
  textMargin: 2
}, xE = ["textStyle", "color"], qc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Zc = new Ve(), CE = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getTextColor = function(e) {
      var r = this.ecModel;
      return this.getShallow("color") || (!e && r ? r.get(xE) : null);
    }, t.prototype.getFont = function() {
      return wE({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, t.prototype.getTextRect = function(e) {
      for (var r = {
        text: e,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, n = 0; n < qc.length; n++)
        r[qc[n]] = this.getShallow(qc[n]);
      return Zc.useStyle(r), Zc.update(), Zc.getBoundingRect();
    }, t;
  })()
), cb = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], DE = _s(cb), ME = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getLineStyle = function(e) {
      return DE(this, e);
    }, t;
  })()
), hb = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], AE = _s(hb), IE = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getItemStyle = function(e, r) {
      return AE(this, e, r);
    }, t;
  })()
), Zt = (
  /** @class */
  (function() {
    function t(e, r, n) {
      this.parentModel = r, this.ecModel = n, this.option = e;
    }
    return t.prototype.init = function(e, r, n) {
    }, t.prototype.mergeOption = function(e, r) {
      Pt(this.option, e, !0);
    }, t.prototype.get = function(e, r) {
      return e == null ? this.option : this._doGet(this.parsePath(e), !r && this.parentModel);
    }, t.prototype.getShallow = function(e, r) {
      var n = this.option, i = n == null ? n : n[e];
      if (i == null && !r) {
        var a = this.parentModel;
        a && (i = a.getShallow(e));
      }
      return i;
    }, t.prototype.getModel = function(e, r) {
      var n = e != null, i = n ? this.parsePath(e) : null, a = n ? this._doGet(i) : this.option;
      return r = r || this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new t(a, r, this.ecModel);
    }, t.prototype.isEmpty = function() {
      return this.option == null;
    }, t.prototype.restoreData = function() {
    }, t.prototype.clone = function() {
      var e = this.constructor;
      return new e(xt(this.option));
    }, t.prototype.parsePath = function(e) {
      return typeof e == "string" ? e.split(".") : e;
    }, t.prototype.resolveParentPath = function(e) {
      return e;
    }, t.prototype.isAnimationEnabled = function() {
      if (!Tt.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, t.prototype._doGet = function(e, r) {
      var n = this.option;
      if (!e)
        return n;
      for (var i = 0; i < e.length && !(e[i] && (n = n && typeof n == "object" ? n[e[i]] : null, n == null)); i++)
        ;
      return n == null && r && (n = r._doGet(this.resolveParentPath(e), r.parentModel)), n;
    }, t;
  })()
);
Fd(Zt);
rI(Zt);
vn(Zt, ME);
vn(Zt, IE);
vn(Zt, sI);
vn(Zt, CE);
var LE = Math.round(Math.random() * 10);
function Nf(t) {
  return [t || "", LE++].join("_");
}
function EE(t) {
  var e = {};
  t.registerSubTypeDefaulter = function(r, n) {
    var i = qr(r);
    e[i.main] = n;
  }, t.determineSubType = function(r, n) {
    var i = n.type;
    if (!i) {
      var a = qr(r).main;
      t.hasSubTypes(r) && e[a] && (i = e[a](n));
    }
    return i;
  };
}
function PE(t, e) {
  t.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), f = u.graph, c = u.noEntryList, h = {};
    for (P(a, function(y) {
      h[y] = !0;
    }); c.length; ) {
      var v = c.pop(), d = f[v], p = !!h[v];
      p && (s.call(l, v, d.originalDeps.slice()), delete h[v]), P(d.successor, p ? g : m);
    }
    P(h, function() {
      var y = "";
      throw new Error(y);
    });
    function m(y) {
      f[y].entryCount--, f[y].entryCount === 0 && c.push(y);
    }
    function g(y) {
      h[y] = !0, m(y);
    }
  };
  function r(a) {
    var o = {}, s = [];
    return P(a, function(l) {
      var u = n(o, l), f = u.originalDeps = e(l), c = i(f, a);
      u.entryCount = c.length, u.entryCount === 0 && s.push(l), P(c, function(h) {
        At(u.predecessor, h) < 0 && u.predecessor.push(h);
        var v = n(o, h);
        At(v.successor, h) < 0 && v.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function n(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function i(a, o) {
    var s = [];
    return P(a, function(l) {
      At(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function RE(t, e) {
  return Pt(Pt({}, t, !0), e, !0);
}
const OE = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, kE = {
  time: {
    month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图",
      custom: "自定义图表",
      chart: "图表"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
};
var Vu = "ZH", op = "EN", Fa = op, au = {}, sp = {}, vb = Tt.domSupported ? (function() {
  var t = (document.documentElement.lang || navigator.language || navigator.browserLanguage || Fa).toUpperCase();
  return t.indexOf(Vu) > -1 ? Vu : Fa;
})() : Fa;
function db(t, e) {
  t = t.toUpperCase(), sp[t] = new Zt(e), au[t] = e;
}
function BE(t) {
  if (at(t)) {
    var e = au[t.toUpperCase()] || {};
    return t === Vu || t === op ? xt(e) : Pt(xt(e), xt(au[Fa]), !1);
  } else
    return Pt(xt(t), xt(au[Fa]), !1);
}
function NE(t) {
  return sp[t];
}
function FE() {
  return sp[Fa];
}
db(op, OE);
db(Vu, kE);
var HE = null;
function Pe() {
  return HE;
}
function pb(t, e) {
  var r = Pe(), n = e.breakOption, i = e.breakParsed;
  return !i && r && (i = r.parseAxisBreakOption(n, t)), i;
}
function Uu(t) {
  var e = t.brk;
  return e ? e.breaks : [];
}
function Gu(t) {
  var e = t.brk;
  return e ? e.hasBreaks() : !1;
}
var lp = 1e3, up = lp * 60, ts = up * 60, fr = ts * 24, oy = fr * 365, zE = {
  year: /({yyyy}|{yy})/,
  month: /({MMMM}|{MMM}|{MM}|{M})/,
  day: /({dd}|{d})/,
  hour: /({HH}|{H}|{hh}|{h})/,
  minute: /({mm}|{m})/,
  second: /({ss}|{s})/,
  millisecond: /({SSS}|{S})/
}, ou = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}"
}, VE = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}", xl = "{yyyy}-{MM}-{dd}", sy = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: xl,
  hour: xl + " " + ou.hour,
  minute: xl + " " + ou.minute,
  second: xl + " " + ou.second,
  millisecond: VE
}, Ye = ["year", "month", "day", "hour", "minute", "second", "millisecond"], UE = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function GE(t) {
  return !at(t) && !_t(t) ? WE(t) : t;
}
function WE(t) {
  t = t || {};
  var e = {}, r = !0;
  return P(Ye, function(n) {
    r && (r = t[n] == null);
  }), P(Ye, function(n, i) {
    var a = t[n];
    e[n] = {};
    for (var o = null, s = i; s >= 0; s--) {
      var l = Ye[s], u = ft(a) && !J(a) ? a[l] : a, f = void 0;
      J(u) ? (f = u.slice(), o = f[0] || "") : at(u) ? (o = u, f = [o]) : (o == null ? o = ou[n] : zE[l].test(o) || (o = e[l][l][0] + " " + o), f = [o], r && (f[1] = "{primary|" + o + "}")), e[n][l] = f;
    }
  }), e;
}
function Hn(t, e) {
  return t += "", "0000".substr(0, e - t.length) + t;
}
function es(t) {
  switch (t) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return t;
  }
}
function YE(t) {
  return t === es(t);
}
function $E(t) {
  switch (t) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function Ff(t, e, r, n) {
  var i = io(t), a = i[gb(r)](), o = i[fp(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = i[cp(r)](), u = i["get" + (r ? "UTC" : "") + "Day"](), f = i[hp(r)](), c = (f - 1) % 12 + 1, h = i[vp(r)](), v = i[dp(r)](), d = i[pp(r)](), p = f >= 12 ? "pm" : "am", m = p.toUpperCase(), g = n instanceof Zt ? n : NE(n || vb) || FE(), y = g.getModel("time"), _ = y.get("month"), S = y.get("monthAbbr"), b = y.get("dayOfWeek"), T = y.get("dayOfWeekAbbr");
  return (e || "").replace(/{a}/g, p + "").replace(/{A}/g, m + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Hn(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, S[o - 1]).replace(/{MM}/g, Hn(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Hn(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, b[u]).replace(/{ee}/g, T[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Hn(f, 2)).replace(/{H}/g, f + "").replace(/{hh}/g, Hn(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Hn(h, 2)).replace(/{m}/g, h + "").replace(/{ss}/g, Hn(v, 2)).replace(/{s}/g, v + "").replace(/{SSS}/g, Hn(d, 3)).replace(/{S}/g, d + "");
}
function XE(t, e, r, n, i) {
  var a = null;
  if (at(r))
    a = r;
  else if (_t(r)) {
    var o = {
      time: t.time,
      level: t.time ? t.time.level : 0
    }, s = Pe();
    s && s.makeAxisLabelFormatterParamBreak(o, t.break), a = r(t.value, e, o);
  } else {
    var l = t.time;
    if (l) {
      var u = r[l.lowerTimeUnit][l.upperTimeUnit];
      a = u[Math.min(l.level, u.length - 1)] || "";
    } else {
      var f = Ha(t.value, i);
      a = r[f][f][0];
    }
  }
  return Ff(new Date(t.value), a, i, n);
}
function Ha(t, e) {
  var r = io(t), n = r[fp(e)]() + 1, i = r[cp(e)](), a = r[hp(e)](), o = r[vp(e)](), s = r[dp(e)](), l = r[pp(e)](), u = l === 0, f = u && s === 0, c = f && o === 0, h = c && a === 0, v = h && i === 1, d = v && n === 1;
  return d ? "year" : v ? "month" : h ? "day" : c ? "hour" : f ? "minute" : u ? "second" : "millisecond";
}
function xv(t, e, r) {
  switch (e) {
    case "year":
      t[mb(r)](0);
    case "month":
      t[yb(r)](1);
    case "day":
      t[_b(r)](0);
    case "hour":
      t[Sb(r)](0);
    case "minute":
      t[bb(r)](0);
    case "second":
      t[Tb(r)](0);
  }
  return t;
}
function gb(t) {
  return t ? "getUTCFullYear" : "getFullYear";
}
function fp(t) {
  return t ? "getUTCMonth" : "getMonth";
}
function cp(t) {
  return t ? "getUTCDate" : "getDate";
}
function hp(t) {
  return t ? "getUTCHours" : "getHours";
}
function vp(t) {
  return t ? "getUTCMinutes" : "getMinutes";
}
function dp(t) {
  return t ? "getUTCSeconds" : "getSeconds";
}
function pp(t) {
  return t ? "getUTCMilliseconds" : "getMilliseconds";
}
function KE(t) {
  return t ? "setUTCFullYear" : "setFullYear";
}
function mb(t) {
  return t ? "setUTCMonth" : "setMonth";
}
function yb(t) {
  return t ? "setUTCDate" : "setDate";
}
function _b(t) {
  return t ? "setUTCHours" : "setHours";
}
function Sb(t) {
  return t ? "setUTCMinutes" : "setMinutes";
}
function bb(t) {
  return t ? "setUTCSeconds" : "setSeconds";
}
function Tb(t) {
  return t ? "setUTCMilliseconds" : "setMilliseconds";
}
function wb(t) {
  if (!CA(t))
    return at(t) ? t : "-";
  var e = (t + "").split(".");
  return e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (e.length > 1 ? "." + e[1] : "");
}
function xb(t, e) {
  return t = (t || "").toLowerCase().replace(/-(.)/g, function(r, n) {
    return n.toUpperCase();
  }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
}
var Hf = Md;
function Cv(t, e, r) {
  var n = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function i(f) {
    return f && Kr(f) ? f : "-";
  }
  function a(f) {
    return un(f);
  }
  var o = e === "time", s = t instanceof Date;
  if (o || s) {
    var l = o ? io(t) : t;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Ff(l, n, r);
  }
  if (e === "ordinal")
    return zh(t) ? i(t) : qt(t) && a(t) ? t + "" : "-";
  var u = Ru(t);
  return a(u) ? wb(u) : zh(t) ? i(t) : typeof t == "boolean" ? t + "" : "-";
}
var ly = ["a", "b", "c", "d", "e", "f", "g"], jc = function(t, e) {
  return "{" + t + (e ?? "") + "}";
};
function Cb(t, e, r) {
  J(e) || (e = [e]);
  var n = e.length;
  if (!n)
    return "";
  for (var i = e[0].$vars || [], a = 0; a < i.length; a++) {
    var o = ly[a];
    t = t.replace(jc(o), jc(o, 0));
  }
  for (var s = 0; s < n; s++)
    for (var l = 0; l < i.length; l++) {
      var u = e[s][i[l]];
      t = t.replace(jc(ly[l], s), r ? ke(u) : u);
    }
  return t;
}
function qE(t, e) {
  var r = at(t) ? {
    color: t,
    extraCssText: e
  } : t || {}, n = r.color, i = r.type;
  e = r.extraCssText;
  var a = r.renderMode || "html";
  if (!n)
    return "";
  if (a === "html")
    return i === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + ke(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + ke(n) + ";" + (e || "") + '"></span>';
  var o = r.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: i === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: n
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: n
    }
  };
}
function ra(t, e) {
  return e = e || "transparent", at(t) ? t : ft(t) && t.colorStops && (t.colorStops[0] || {}).color || e;
}
var su = {}, Jc = {}, gp = (
  /** @class */
  (function() {
    function t() {
      this._normalMasterList = [], this._nonSeriesBoxMasterList = [];
    }
    return t.prototype.create = function(e, r) {
      this._nonSeriesBoxMasterList = n(su), this._normalMasterList = n(Jc);
      function n(i, a) {
        var o = [];
        return P(i, function(s, l) {
          var u = s.create(e, r);
          o = o.concat(u || []);
        }), o;
      }
    }, t.prototype.update = function(e, r) {
      P(this._normalMasterList, function(n) {
        n.update && n.update(e, r);
      });
    }, t.prototype.getCoordinateSystems = function() {
      return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
    }, t.register = function(e, r) {
      if (e === "matrix" || e === "calendar") {
        su[e] = r;
        return;
      }
      Jc[e] = r;
    }, t.get = function(e) {
      return Jc[e] || su[e];
    }, t;
  })()
);
function ZE(t) {
  return !!su[t];
}
var jE = 1, JE = 2, QE = gt();
function Db(t) {
  var e = t.getShallow("coord", !0), r = jE;
  if (e == null) {
    var n = QE.get(t.type);
    n && n.getCoord2 && (r = JE, e = n.getCoord2(t));
  }
  return {
    coord: e,
    from: r
  };
}
var za = 0, lu = 1, tP = 2;
function eP(t, e) {
  var r = t.getShallow("coordinateSystem"), n = t.getShallow("coordinateSystemUsage", !0), i = za;
  if (r) {
    var a = t.mainType === "series";
    n == null && (n = a ? "data" : "box"), n === "data" ? (i = lu, a || (i = za)) : n === "box" && (i = tP, !a && !ZE(r) && (i = za));
  }
  return {
    coordSysType: r,
    kind: i
  };
}
function rP(t) {
  var e = t.targetModel, r = t.coordSysType, n = t.coordSysProvider, i = t.isDefaultDataCoordSys, a = eP(e), o = a.kind, s = a.coordSysType;
  if (i && o !== lu && (o = lu, s = r), o === za || s !== r)
    return za;
  var l = n(r, e);
  return l ? (o === lu ? e.coordinateSystem = l : e.boxCoordinateSystem = l, o) : za;
}
var uu = P, nP = ["left", "right", "top", "bottom", "width", "height"], Cl = [["width", "left", "right"], ["height", "top", "bottom"]];
function mp(t, e, r, n, i) {
  var a = 0, o = 0;
  n == null && (n = 1 / 0), i == null && (i = 1 / 0);
  var s = 0;
  e.eachChild(function(l, u) {
    var f = l.getBoundingRect(), c = e.childAt(u + 1), h = c && c.getBoundingRect(), v, d;
    if (t === "horizontal") {
      var p = f.width + (h ? -h.x + f.x : 0);
      v = a + p, v > n || l.newline ? (a = 0, v = p, o += s + r, s = f.height) : s = Math.max(s, f.height);
    } else {
      var m = f.height + (h ? -h.y + f.y : 0);
      d = o + m, d > i || l.newline ? (a += s + r, o = 0, d = m, s = f.width) : s = Math.max(s, f.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), t === "horizontal" ? a = v + r : o = d + r);
  });
}
var rs = mp;
oe(mp, "vertical");
oe(mp, "horizontal");
function iP(t, e) {
  return {
    left: t.getShallow("left", e),
    top: t.getShallow("top", e),
    right: t.getShallow("right", e),
    bottom: t.getShallow("bottom", e),
    width: t.getShallow("width", e),
    height: t.getShallow("height", e)
  };
}
function ws(t, e, r) {
  r = Hf(r || 0);
  var n = e.width, i = e.height, a = Wr(t.left, n), o = Wr(t.top, i), s = Wr(t.right, n), l = Wr(t.bottom, i), u = Wr(t.width, n), f = Wr(t.height, i), c = r[2] + r[0], h = r[1] + r[3], v = t.aspect;
  switch (isNaN(u) && (u = n - s - h - a), isNaN(f) && (f = i - l - c - o), v != null && (isNaN(u) && isNaN(f) && (v > n / i ? u = n * 0.8 : f = i * 0.8), isNaN(u) && (u = v * f), isNaN(f) && (f = u / v)), isNaN(a) && (a = n - s - u - h), isNaN(o) && (o = i - l - f - c), t.left || t.right) {
    case "center":
      a = n / 2 - u / 2 - r[3];
      break;
    case "right":
      a = n - u - h;
      break;
  }
  switch (t.top || t.bottom) {
    case "middle":
    case "center":
      o = i / 2 - f / 2 - r[0];
      break;
    case "bottom":
      o = i - f - c;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = n - h - a - (s || 0)), isNaN(f) && (f = i - c - o - (l || 0));
  var d = new mt((e.x || 0) + a + r[3], (e.y || 0) + o + r[0], u, f);
  return d.margin = r, d;
}
var Qc = {
  rect: 1
};
function Mb(t, e, r) {
  var n, i, a, o = t.boxCoordinateSystem, s;
  if (o) {
    var l = Db(t), u = l.coord, f = l.from;
    if (o.dataToLayout) {
      a = Qc.rect, s = f;
      var c = o.dataToLayout(u);
      n = c.contentRect || c.rect;
    }
  }
  return a == null && (a = Qc.rect), a === Qc.rect && (n || (n = {
    x: 0,
    y: 0,
    width: e.getWidth(),
    height: e.getHeight()
  }), i = [n.x + n.width / 2, n.y + n.height / 2]), {
    type: a,
    refContainer: n,
    refPoint: i,
    boxCoordFrom: s
  };
}
function xs(t) {
  var e = t.layoutMode || t.constructor.layoutMode;
  return ft(e) ? e : e ? {
    type: e
  } : null;
}
function li(t, e, r) {
  var n = r && r.ignoreSize;
  !J(n) && (n = [n, n]);
  var i = o(Cl[0], 0), a = o(Cl[1], 1);
  l(Cl[0], t, i), l(Cl[1], t, a);
  function o(u, f) {
    var c = {}, h = 0, v = {}, d = 0, p = 2;
    if (uu(u, function(y) {
      v[y] = t[y];
    }), uu(u, function(y) {
      qe(e, y) && (c[y] = v[y] = e[y]), s(c, y) && h++, s(v, y) && d++;
    }), n[f])
      return s(e, u[1]) ? v[u[2]] = null : s(e, u[2]) && (v[u[1]] = null), v;
    if (d === p || !h)
      return v;
    if (h >= p)
      return c;
    for (var m = 0; m < u.length; m++) {
      var g = u[m];
      if (!qe(c, g) && qe(t, g)) {
        c[g] = t[g];
        break;
      }
    }
    return c;
  }
  function s(u, f) {
    return u[f] != null && u[f] !== "auto";
  }
  function l(u, f, c) {
    uu(u, function(h) {
      f[h] = c[h];
    });
  }
}
function Ks(t) {
  return aP({}, t);
}
function aP(t, e) {
  return e && t && uu(nP, function(r) {
    qe(e, r) && (t[r] = e[r]);
  }), t;
}
var oP = Wt(), kt = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r, n, i) {
      var a = t.call(this, r, n, i) || this;
      return a.uid = Nf("ec_cpt_model"), a;
    }
    return e.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i);
    }, e.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = xs(this), a = i ? Ks(r) : {}, o = n.getTheme();
      Pt(r, o.get(this.mainType)), Pt(r, this.getDefaultOption()), i && li(r, a, i);
    }, e.prototype.mergeOption = function(r, n) {
      Pt(this.option, r, !0);
      var i = xs(this);
      i && li(this.option, r, i);
    }, e.prototype.optionUpdated = function(r, n) {
    }, e.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!QA(r))
        return r.defaultOption;
      var n = oP(this);
      if (!n.defaultOption) {
        for (var i = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && i.push(o), a = a.superClass;
        }
        for (var s = {}, l = i.length - 1; l >= 0; l--)
          s = Pt(s, i[l], !0);
        n.defaultOption = s;
      }
      return n.defaultOption;
    }, e.prototype.getReferringComponents = function(r, n) {
      var i = r + "Index", a = r + "Id";
      return Ws(this.ecModel, r, {
        index: this.get(i, !0),
        id: this.get(a, !0)
      }, n);
    }, e.prototype.getBoxLayoutParams = function() {
      return iP(this, !1);
    }, e.prototype.getZLevelKey = function() {
      return "";
    }, e.prototype.setZLevel = function(r) {
      this.option.zlevel = r;
    }, e.protoInitialize = (function() {
      var r = e.prototype;
      r.type = "component", r.id = "", r.name = "", r.mainType = "", r.subType = "", r.componentIndex = 0;
    })(), e;
  })(Zt)
);
bS(kt, Zt);
Df(kt);
EE(kt);
PE(kt, sP);
function sP(t) {
  var e = [];
  return P(kt.getClassesByMainType(t), function(r) {
    e = e.concat(r.dependencies || r.prototype.dependencies || []);
  }), e = pt(e, function(r) {
    return qr(r).main;
  }), t !== "dataset" && At(e, "dataset") <= 0 && e.unshift("dataset"), e;
}
var ht = {
  color: {},
  darkColor: {},
  size: {}
}, Qt = ht.color = {
  theme: ["#5070dd", "#b6d634", "#505372", "#ff994d", "#0ca8df", "#ffd10a", "#fb628b", "#785db0", "#3fbe95"],
  neutral00: "#fff",
  neutral05: "#f4f7fd",
  neutral10: "#e8ebf0",
  neutral15: "#dbdee4",
  neutral20: "#cfd2d7",
  neutral25: "#c3c5cb",
  neutral30: "#b7b9be",
  neutral35: "#aaacb2",
  neutral40: "#9ea0a5",
  neutral45: "#929399",
  neutral50: "#86878c",
  neutral55: "#797b7f",
  neutral60: "#6d6e73",
  neutral65: "#616266",
  neutral70: "#54555a",
  neutral75: "#48494d",
  neutral80: "#3c3c41",
  neutral85: "#303034",
  neutral90: "#232328",
  neutral95: "#17171b",
  neutral99: "#000",
  accent05: "#eff1f9",
  accent10: "#e0e4f2",
  accent15: "#d0d6ec",
  accent20: "#c0c9e6",
  accent25: "#b1bbdf",
  accent30: "#a1aed9",
  accent35: "#91a0d3",
  accent40: "#8292cc",
  accent45: "#7285c6",
  accent50: "#6578ba",
  accent55: "#5c6da9",
  accent60: "#536298",
  accent65: "#4a5787",
  accent70: "#404c76",
  accent75: "#374165",
  accent80: "#2e3654",
  accent85: "#252b43",
  accent90: "#1b2032",
  accent95: "#121521",
  transparent: "rgba(0,0,0,0)",
  highlight: "rgba(255,231,130,0.8)"
};
q(Qt, {
  primary: Qt.neutral80,
  secondary: Qt.neutral70,
  tertiary: Qt.neutral60,
  quaternary: Qt.neutral50,
  disabled: Qt.neutral20,
  border: Qt.neutral30,
  borderTint: Qt.neutral20,
  borderShade: Qt.neutral40,
  background: Qt.neutral05,
  backgroundTint: "rgba(234,237,245,0.5)",
  backgroundTransparent: "rgba(255,255,255,0)",
  backgroundShade: Qt.neutral10,
  shadow: "rgba(0,0,0,0.2)",
  shadowTint: "rgba(129,130,136,0.2)",
  axisLine: Qt.neutral70,
  axisLineTint: Qt.neutral40,
  axisTick: Qt.neutral70,
  axisTickMinor: Qt.neutral60,
  axisLabel: Qt.neutral70,
  axisSplitLine: Qt.neutral15,
  axisMinorSplitLine: Qt.neutral05
});
for (var Pi in Qt)
  if (Qt.hasOwnProperty(Pi)) {
    var uy = Qt[Pi];
    Pi === "theme" ? ht.darkColor.theme = Qt.theme.slice() : Pi === "highlight" ? ht.darkColor.highlight = "rgba(255,231,130,0.4)" : Pi.indexOf("accent") === 0 ? ht.darkColor[Pi] = Jh(uy, null, function(t) {
      return t * 0.5;
    }, function(t) {
      return Math.min(1, 1.3 - t);
    }) : ht.darkColor[Pi] = Jh(uy, null, function(t) {
      return t * 0.9;
    }, function(t) {
      return 1 - Math.pow(t, 1.5);
    });
  }
ht.size = {
  xxs: 2,
  xs: 5,
  s: 10,
  m: 15,
  l: 20,
  xl: 30,
  xxl: 40,
  xxxl: 50
};
var Ab = "";
typeof navigator < "u" && (Ab = navigator.platform || "");
var ga = "rgba(0, 0, 0, 0.2)", Ib = ht.color.theme[0], lP = Jh(Ib, null, null, 0.9);
const Lb = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ht.color.theme,
  gradientColor: [lP, Ib],
  aria: {
    decal: {
      decals: [{
        color: ga,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: ga,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: ga,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: ga,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: ga,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: ga,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: Ab.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: !1
};
var We = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, Eb = Wt();
function uP(t) {
  Eb(t).datasetMap = gt();
}
function fP(t, e, r) {
  var n = {}, i = Pb(e);
  if (!i || !t)
    return n;
  var a = [], o = [], s = e.ecModel, l = Eb(s).datasetMap, u = i.uid + "_" + r.seriesLayoutBy, f, c;
  t = t.slice(), P(t, function(p, m) {
    var g = ft(p) ? p : t[m] = {
      name: p
    };
    g.type === "ordinal" && f == null && (f = m, c = d(g)), n[g.name] = [];
  });
  var h = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  P(t, function(p, m) {
    var g = p.name, y = d(p);
    if (f == null) {
      var _ = h.valueWayDim;
      v(n[g], _, y), v(o, _, y), h.valueWayDim += y;
    } else if (f === m)
      v(n[g], 0, y), v(a, 0, y);
    else {
      var _ = h.categoryWayDim;
      v(n[g], _, y), v(o, _, y), h.categoryWayDim += y;
    }
  });
  function v(p, m, g) {
    for (var y = 0; y < g; y++)
      p.push(m + y);
  }
  function d(p) {
    var m = p.dimsDef;
    return m ? m.length : 1;
  }
  return a.length && (n.itemName = a), o.length && (n.seriesName = o), n;
}
function Pb(t) {
  var e = t.get("data", !0);
  if (!e)
    return Ws(t.ecModel, "dataset", {
      index: t.get("datasetIndex", !0),
      id: t.get("datasetId", !0)
    }, ur).models[0];
}
function cP(t) {
  return !t.get("transform", !0) && !t.get("fromTransformResult", !0) ? [] : Ws(t.ecModel, "dataset", {
    index: t.get("fromDatasetIndex", !0),
    id: t.get("fromDatasetId", !0)
  }, ur).models;
}
function Rb(t, e) {
  return hP(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
}
function hP(t, e, r, n, i, a) {
  var o, s = 5;
  if (ze(t))
    return We.Not;
  var l, u;
  if (n) {
    var f = n[a];
    ft(f) ? (l = f.name, u = f.type) : at(f) && (l = f);
  }
  if (u != null)
    return u === "ordinal" ? We.Must : We.Not;
  if (e === xe) {
    var c = t;
    if (r === aa) {
      for (var h = c[a], v = 0; v < (h || []).length && v < s; v++)
        if ((o = S(h[i + v])) != null)
          return o;
    } else
      for (var v = 0; v < c.length && v < s; v++) {
        var d = c[i + v];
        if (d && (o = S(d[a])) != null)
          return o;
      }
  } else if (e === Ir) {
    var p = t;
    if (!l)
      return We.Not;
    for (var v = 0; v < p.length && v < s; v++) {
      var m = p[v];
      if (m && (o = S(m[l])) != null)
        return o;
    }
  } else if (e === pn) {
    var g = t;
    if (!l)
      return We.Not;
    var h = g[l];
    if (!h || ze(h))
      return We.Not;
    for (var v = 0; v < h.length && v < s; v++)
      if ((o = S(h[v])) != null)
        return o;
  } else if (e === je)
    for (var y = t, v = 0; v < y.length && v < s; v++) {
      var m = y[v], _ = Gs(m);
      if (!J(_))
        return We.Not;
      if ((o = S(_[a])) != null)
        return o;
    }
  function S(b) {
    var T = at(b);
    if (b != null && isFinite(Number(b)) && b !== "")
      return T ? We.Might : We.Not;
    if (T && b !== "-")
      return We.Must;
  }
  return We.Not;
}
var vP = gt();
function dP(t, e, r) {
  var n = vP.get(e);
  if (!n)
    return r;
  var i = n(t);
  return i ? r.concat(i) : r;
}
var fy = Wt();
Wt();
var yp = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getColorFromPalette = function(e, r, n) {
      var i = Re(this.get("color", !0)), a = this.get("colorLayer", !0);
      return gP(this, fy, i, a, e, r, n);
    }, t.prototype.clearColorPalette = function() {
      mP(this, fy);
    }, t;
  })()
);
function pP(t, e) {
  for (var r = t.length, n = 0; n < r; n++)
    if (t[n].length > e)
      return t[n];
  return t[r - 1];
}
function gP(t, e, r, n, i, a, o) {
  a = a || t;
  var s = e(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(i))
    return u[i];
  var f = o == null || !n ? r : pP(n, o);
  if (f = f || r, !(!f || !f.length)) {
    var c = f[l];
    return i && (u[i] = c), s.paletteIdx = (l + 1) % f.length, c;
  }
}
function mP(t, e) {
  e(t).paletteIdx = 0, e(t).paletteNameMap = {};
}
var Dl, go, cy, hy = "\0_ec_inner", yP = 1, _p = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.init = function(r, n, i, a, o, s) {
      a = a || {}, this.option = null, this._theme = new Zt(a), this._locale = new Zt(o), this._optionManager = s;
    }, e.prototype.setOption = function(r, n, i) {
      var a = py(n);
      this._optionManager.setOption(r, i, a), this._resetOption(null, a);
    }, e.prototype.resetOption = function(r, n) {
      return this._resetOption(r, py(n));
    }, e.prototype._resetOption = function(r, n) {
      var i = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? cy(this, o) : (this.restoreData(), this._mergeOption(o, n)), i = !0;
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (i = !0, this._mergeOption(s, n));
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && P(l, function(u) {
          i = !0, this._mergeOption(u, n);
        }, this);
      }
      return i;
    }, e.prototype.mergeOption = function(r) {
      this._mergeOption(r, null);
    }, e.prototype._mergeOption = function(r, n) {
      var i = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = gt(), u = n && n.replaceMergeMainTypeMap;
      uP(this), P(r, function(c, h) {
        c != null && (kt.hasClass(h) ? h && (s.push(h), l.set(h, !0)) : i[h] = i[h] == null ? xt(c) : Pt(i[h], c, !0));
      }), u && u.each(function(c, h) {
        kt.hasClass(h) && !l.get(h) && (s.push(h), l.set(h, !0));
      }), kt.topologicalTravel(s, kt.getAllClassMainTypes(), f, this);
      function f(c) {
        var h = dP(this, c, Re(r[c])), v = a.get(c), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          v ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), p = EA(v, h, d);
        FA(p, c, kt), i[c] = null, a.set(c, null), o.set(c, 0);
        var m = [], g = [], y = 0, _;
        P(p, function(S, b) {
          var T = S.existing, C = S.newOption;
          if (!C)
            T && (T.mergeOption({}, this), T.optionUpdated({}, !1));
          else {
            var E = c === "series", A = kt.getClass(
              c,
              S.keyInfo.subType,
              !E
              // Give a more detailed warn later if series don't exists
            );
            if (!A)
              return;
            if (c === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (T && T.constructor === A)
              T.name = S.keyInfo.name, T.mergeOption(C, this), T.optionUpdated(C, !1);
            else {
              var M = q({
                componentIndex: b
              }, S.keyInfo);
              T = new A(C, this, this, M), q(T, M), S.brandNew && (T.__requireNewView = !0), T.init(C, this, this), T.optionUpdated(null, !0);
            }
          }
          T ? (m.push(T.option), g.push(T), y++) : (m.push(void 0), g.push(void 0));
        }, this), i[c] = m, a.set(c, g), o.set(c, y), c === "series" && Dl(this);
      }
      this._seriesIndices || Dl(this);
    }, e.prototype.getOption = function() {
      var r = xt(this.option);
      return P(r, function(n, i) {
        if (kt.hasClass(i)) {
          for (var a = Re(n), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !ys(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[i] = a;
        }
      }), delete r[hy], r;
    }, e.prototype.setTheme = function(r) {
      this._theme = new Zt(r), this._resetOption("recreate", null);
    }, e.prototype.getTheme = function() {
      return this._theme;
    }, e.prototype.getLocaleModel = function() {
      return this._locale;
    }, e.prototype.setUpdatePayload = function(r) {
      this._payload = r;
    }, e.prototype.getUpdatePayload = function() {
      return this._payload;
    }, e.prototype.getComponent = function(r, n) {
      var i = this._componentsMap.get(r);
      if (i) {
        var a = i[n || 0];
        if (a)
          return a;
        if (n == null) {
          for (var o = 0; o < i.length; o++)
            if (i[o])
              return i[o];
        }
      }
    }, e.prototype.queryComponents = function(r) {
      var n = r.mainType;
      if (!n)
        return [];
      var i = r.index, a = r.id, o = r.name, s = this._componentsMap.get(n);
      if (!s || !s.length)
        return [];
      var l;
      return i != null ? (l = [], P(Re(i), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = vy("id", a, s) : o != null ? l = vy("name", o, s) : l = be(s, function(u) {
        return !!u;
      }), dy(l, r);
    }, e.prototype.findComponents = function(r) {
      var n = r.query, i = r.mainType, a = s(n), o = a ? this.queryComponents(a) : be(this._componentsMap.get(i), function(u) {
        return !!u;
      });
      return l(dy(o, r));
      function s(u) {
        var f = i + "Index", c = i + "Id", h = i + "Name";
        return u && (u[f] != null || u[c] != null || u[h] != null) ? {
          mainType: i,
          // subType will be filtered finally.
          index: u[f],
          id: u[c],
          name: u[h]
        } : null;
      }
      function l(u) {
        return r.filter ? be(u, r.filter) : u;
      }
    }, e.prototype.eachComponent = function(r, n, i) {
      var a = this._componentsMap;
      if (_t(r)) {
        var o = n, s = r;
        a.each(function(c, h) {
          for (var v = 0; c && v < c.length; v++) {
            var d = c[v];
            d && s.call(o, h, d, d.componentIndex);
          }
        });
      } else
        for (var l = at(r) ? a.get(r) : ft(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var f = l[u];
          f && n.call(i, f, f.componentIndex);
        }
    }, e.prototype.getSeriesByName = function(r) {
      var n = en(r, null);
      return be(this._componentsMap.get("series"), function(i) {
        return !!i && n != null && i.name === n;
      });
    }, e.prototype.getSeriesByIndex = function(r) {
      return this._componentsMap.get("series")[r];
    }, e.prototype.getSeriesByType = function(r) {
      return be(this._componentsMap.get("series"), function(n) {
        return !!n && n.subType === r;
      });
    }, e.prototype.getSeries = function() {
      return be(this._componentsMap.get("series"), function(r) {
        return !!r;
      });
    }, e.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, e.prototype.eachSeries = function(r, n) {
      go(this), P(this._seriesIndices, function(i) {
        var a = this._componentsMap.get("series")[i];
        r.call(n, a, i);
      }, this);
    }, e.prototype.eachRawSeries = function(r, n) {
      P(this._componentsMap.get("series"), function(i) {
        i && r.call(n, i, i.componentIndex);
      });
    }, e.prototype.eachSeriesByType = function(r, n, i) {
      go(this), P(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && n.call(i, o, a);
      }, this);
    }, e.prototype.eachRawSeriesByType = function(r, n, i) {
      return P(this.getSeriesByType(r), n, i);
    }, e.prototype.isSeriesFiltered = function(r) {
      return go(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, e.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, e.prototype.filterSeries = function(r, n) {
      go(this);
      var i = [];
      P(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(n, o, a) && i.push(a);
      }, this), this._seriesIndices = i, this._seriesIndicesMap = gt(i);
    }, e.prototype.restoreData = function(r) {
      Dl(this);
      var n = this._componentsMap, i = [];
      n.each(function(a, o) {
        kt.hasClass(o) && i.push(o);
      }), kt.topologicalTravel(i, kt.getAllClassMainTypes(), function(a) {
        P(n.get(a), function(o) {
          o && (a !== "series" || !_P(o, r)) && o.restoreData();
        });
      });
    }, e.internalField = (function() {
      Dl = function(r) {
        var n = r._seriesIndices = [];
        P(r._componentsMap.get("series"), function(i) {
          i && n.push(i.componentIndex);
        }), r._seriesIndicesMap = gt(n);
      }, go = function(r) {
      }, cy = function(r, n) {
        r.option = {}, r.option[hy] = yP, r._componentsMap = gt({
          series: []
        }), r._componentsCount = gt();
        var i = n.aria;
        ft(i) && i.enabled == null && (i.enabled = !0), SP(n, r._theme.option), Pt(n, Lb, !1), r._mergeOption(n, null);
      };
    })(), e;
  })(Zt)
);
function _P(t, e) {
  if (e) {
    var r = e.seriesIndex, n = e.seriesId, i = e.seriesName;
    return r != null && t.componentIndex !== r || n != null && t.id !== n || i != null && t.name !== i;
  }
}
function SP(t, e) {
  var r = t.color && !t.colorLayer;
  P(e, function(n, i) {
    i === "colorLayer" && r || i === "color" && t.color || kt.hasClass(i) || (typeof n == "object" ? t[i] = t[i] ? Pt(t[i], n, !1) : xt(n) : t[i] == null && (t[i] = n));
  });
}
function vy(t, e, r) {
  if (J(e)) {
    var n = gt();
    return P(e, function(a) {
      if (a != null) {
        var o = en(a, null);
        o != null && n.set(a, !0);
      }
    }), be(r, function(a) {
      return a && n.get(a[t]);
    });
  } else {
    var i = en(e, null);
    return be(r, function(a) {
      return a && i != null && a[t] === i;
    });
  }
}
function dy(t, e) {
  return e.hasOwnProperty("subType") ? be(t, function(r) {
    return r && r.subType === e.subType;
  }) : t;
}
function py(t) {
  var e = gt();
  return t && P(Re(t.replaceMerge), function(r) {
    e.set(r, !0);
  }), {
    replaceMergeMainTypeMap: e
  };
}
vn(_p, yp);
var bP = /^(min|max)?(.+)$/, TP = (
  /** @class */
  (function() {
    function t(e) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = e;
    }
    return t.prototype.setOption = function(e, r, n) {
      e && (P(Re(e.series), function(o) {
        o && o.data && ze(o.data) && Vh(o.data);
      }), P(Re(e.dataset), function(o) {
        o && o.source && ze(o.source) && Vh(o.source);
      })), e = xt(e);
      var i = this._optionBackup, a = wP(e, r, !i);
      this._newBaseOption = a.baseOption, i ? (a.timelineOptions.length && (i.timelineOptions = a.timelineOptions), a.mediaList.length && (i.mediaList = a.mediaList), a.mediaDefault && (i.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, t.prototype.mountOption = function(e) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], xt(e ? r.baseOption : this._newBaseOption);
    }, t.prototype.getTimelineOption = function(e) {
      var r, n = this._timelineOptions;
      if (n.length) {
        var i = e.getComponent("timeline");
        i && (r = xt(
          // FIXME:TS as TimelineModel or quivlant interface
          n[i.getCurrentIndex()]
        ));
      }
      return r;
    }, t.prototype.getMediaOption = function(e) {
      var r = this._api.getWidth(), n = this._api.getHeight(), i = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!i.length && !a)
        return s;
      for (var l = 0, u = i.length; l < u; l++)
        xP(i[l].query, r, n) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !DP(o, this._currentMediaIndices) && (s = pt(o, function(f) {
        return xt(f === -1 ? a.option : i[f].option);
      })), this._currentMediaIndices = o, s;
    }, t;
  })()
);
function wP(t, e, r) {
  var n = [], i, a, o = t.baseOption, s = t.timeline, l = t.options, u = t.media, f = !!t.media, c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || f) && (t.options = t.media = null), a = t), f && J(u) && P(u, function(v) {
    v && v.option && (v.query ? n.push(v) : i || (i = v));
  }), h(a), P(l, function(v) {
    return h(v);
  }), P(n, function(v) {
    return h(v.option);
  });
  function h(v) {
    P(e, function(d) {
      d(v, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: i,
    mediaList: n
  };
}
function xP(t, e, r) {
  var n = {
    width: e,
    height: r,
    aspectratio: e / r
    // lower case for convenience.
  }, i = !0;
  return P(t, function(a, o) {
    var s = o.match(bP);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      CP(n[u], a, l) || (i = !1);
    }
  }), i;
}
function CP(t, e, r) {
  return r === "min" ? t >= e : r === "max" ? t <= e : t === e;
}
function DP(t, e) {
  return t.join(",") === e.join(",");
}
var yr = P, Cs = ft, gy = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function th(t) {
  var e = t && t.itemStyle;
  if (e)
    for (var r = 0, n = gy.length; r < n; r++) {
      var i = gy[r], a = e.normal, o = e.emphasis;
      a && a[i] && (t[i] = t[i] || {}, t[i].normal ? Pt(t[i].normal, a[i]) : t[i].normal = a[i], a[i] = null), o && o[i] && (t[i] = t[i] || {}, t[i].emphasis ? Pt(t[i].emphasis, o[i]) : t[i].emphasis = o[i], o[i] = null);
    }
}
function _e(t, e, r) {
  if (t && t[e] && (t[e].normal || t[e].emphasis)) {
    var n = t[e].normal, i = t[e].emphasis;
    n && (r ? (t[e].normal = t[e].emphasis = null, Ht(t[e], n)) : t[e] = n), i && (t.emphasis = t.emphasis || {}, t.emphasis[e] = i, i.focus && (t.emphasis.focus = i.focus), i.blurScope && (t.emphasis.blurScope = i.blurScope));
  }
}
function Bo(t) {
  _e(t, "itemStyle"), _e(t, "lineStyle"), _e(t, "areaStyle"), _e(t, "label"), _e(t, "labelLine"), _e(t, "upperLabel"), _e(t, "edgeLabel");
}
function re(t, e) {
  var r = Cs(t) && t[e], n = Cs(r) && r.textStyle;
  if (n)
    for (var i = 0, a = dm.length; i < a; i++) {
      var o = dm[i];
      n.hasOwnProperty(o) && (r[o] = n[o]);
    }
}
function nr(t) {
  t && (Bo(t), re(t, "label"), t.emphasis && re(t.emphasis, "label"));
}
function MP(t) {
  if (Cs(t)) {
    th(t), Bo(t), re(t, "label"), re(t, "upperLabel"), re(t, "edgeLabel"), t.emphasis && (re(t.emphasis, "label"), re(t.emphasis, "upperLabel"), re(t.emphasis, "edgeLabel"));
    var e = t.markPoint;
    e && (th(e), nr(e));
    var r = t.markLine;
    r && (th(r), nr(r));
    var n = t.markArea;
    n && nr(n);
    var i = t.data;
    if (t.type === "graph") {
      i = i || t.nodes;
      var a = t.links || t.edges;
      if (a && !ze(a))
        for (var o = 0; o < a.length; o++)
          nr(a[o]);
      P(t.categories, function(u) {
        Bo(u);
      });
    }
    if (i && !ze(i))
      for (var o = 0; o < i.length; o++)
        nr(i[o]);
    if (e = t.markPoint, e && e.data)
      for (var s = e.data, o = 0; o < s.length; o++)
        nr(s[o]);
    if (r = t.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        J(l[o]) ? (nr(l[o][0]), nr(l[o][1])) : nr(l[o]);
    t.type === "gauge" ? (re(t, "axisLabel"), re(t, "title"), re(t, "detail")) : t.type === "treemap" ? (_e(t.breadcrumb, "itemStyle"), P(t.levels, function(u) {
      Bo(u);
    })) : t.type === "tree" && Bo(t.leaves);
  }
}
function Sn(t) {
  return J(t) ? t : t ? [t] : [];
}
function my(t) {
  return (J(t) ? t[0] : t) || {};
}
function AP(t, e) {
  yr(Sn(t.series), function(n) {
    Cs(n) && MP(n);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  e && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), yr(r, function(n) {
    yr(Sn(t[n]), function(i) {
      i && (re(i, "axisLabel"), re(i.axisPointer, "label"));
    });
  }), yr(Sn(t.parallel), function(n) {
    var i = n && n.parallelAxisDefault;
    re(i, "axisLabel"), re(i && i.axisPointer, "label");
  }), yr(Sn(t.calendar), function(n) {
    _e(n, "itemStyle"), re(n, "dayLabel"), re(n, "monthLabel"), re(n, "yearLabel");
  }), yr(Sn(t.radar), function(n) {
    re(n, "name"), n.name && n.axisName == null && (n.axisName = n.name, delete n.name), n.nameGap != null && n.axisNameGap == null && (n.axisNameGap = n.nameGap, delete n.nameGap);
  }), yr(Sn(t.geo), function(n) {
    Cs(n) && (nr(n), yr(Sn(n.regions), function(i) {
      nr(i);
    }));
  }), yr(Sn(t.timeline), function(n) {
    nr(n), _e(n, "label"), _e(n, "itemStyle"), _e(n, "controlStyle", !0);
    var i = n.data;
    J(i) && P(i, function(a) {
      ft(a) && (_e(a, "label"), _e(a, "itemStyle"));
    });
  }), yr(Sn(t.toolbox), function(n) {
    _e(n, "iconStyle"), yr(n.feature, function(i) {
      _e(i, "iconStyle");
    });
  }), re(my(t.axisPointer), "label"), re(my(t.tooltip).axisPointer, "label");
}
function IP(t, e) {
  for (var r = e.split(","), n = t, i = 0; i < r.length && (n = n && n[r[i]], n != null); i++)
    ;
  return n;
}
function LP(t, e, r, n) {
  for (var i = e.split(","), a = t, o, s = 0; s < i.length - 1; s++)
    o = i[s], a[o] == null && (a[o] = {}), a = a[o];
  a[i[s]] == null && (a[i[s]] = r);
}
function yy(t) {
  t && P(EP, function(e) {
    e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
  });
}
var EP = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], PP = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], eh = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function mo(t) {
  var e = t && t.itemStyle;
  if (e)
    for (var r = 0; r < eh.length; r++) {
      var n = eh[r][1], i = eh[r][0];
      e[n] != null && (e[i] = e[n]);
    }
}
function _y(t) {
  t && t.alignTo === "edge" && t.margin != null && t.edgeDistance == null && (t.edgeDistance = t.margin);
}
function Sy(t) {
  t && t.downplay && !t.blur && (t.blur = t.downplay);
}
function RP(t) {
  t && t.focusNodeAdjacency != null && (t.emphasis = t.emphasis || {}, t.emphasis.focus == null && (t.emphasis.focus = "adjacency"));
}
function Ob(t, e) {
  if (t)
    for (var r = 0; r < t.length; r++)
      e(t[r]), t[r] && Ob(t[r].children, e);
}
function kb(t, e) {
  AP(t, e), t.series = Re(t.series), P(t.series, function(r) {
    if (ft(r)) {
      var n = r.type;
      if (n === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (n === "pie" || n === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), _y(r.label);
        var i = r.data;
        if (i && !ze(i))
          for (var a = 0; a < i.length; a++)
            _y(i[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (n === "gauge") {
        var o = IP(r, "pointer.color");
        o != null && LP(r, "itemStyle.color", o);
      } else if (n === "bar") {
        mo(r), mo(r.backgroundStyle), mo(r.emphasis);
        var i = r.data;
        if (i && !ze(i))
          for (var a = 0; a < i.length; a++)
            typeof i[a] == "object" && (mo(i[a]), mo(i[a] && i[a].emphasis));
      } else if (n === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Sy(r), Ob(r.data, Sy);
      } else n === "graph" || n === "sankey" ? RP(r) : n === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && Ht(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), yy(r);
    }
  }), t.dataRange && (t.visualMap = t.dataRange), P(PP, function(r) {
    var n = t[r];
    n && (J(n) || (n = [n]), P(n, function(i) {
      yy(i);
    }));
  });
}
var OP = Nd(kP);
function kP(t) {
  var e = gt();
  t.eachSeries(function(r) {
    var n = r.get("stack");
    if (n) {
      var i = e.get(n) || e.set(n, []), a = r.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: r
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      i.push(o);
    }
  }), e.each(function(r) {
    if (r.length !== 0) {
      var n = r[0].seriesModel, i = n.get("stackOrder") || "seriesAsc";
      i === "seriesDesc" && r.reverse(), P(r, function(a, o) {
        a.data.setCalculationInfo("stackedOnSeries", o > 0 ? r[o - 1].seriesModel : null);
      }), BP(r);
    }
  });
}
function BP(t) {
  P(t, function(e, r) {
    var n = [], i = [NaN, NaN], a = [e.stackResultDimension, e.stackedOverDimension], o = e.data, s = e.isStackedByIndex, l = e.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, f, c) {
      var h = o.get(e.stackedDimension, c);
      if (isNaN(h))
        return i;
      var v, d;
      s ? d = o.getRawIndex(c) : v = o.get(e.stackedByDimension, c);
      for (var p = NaN, m = r - 1; m >= 0; m--) {
        var g = t[m];
        if (s || (d = g.data.rawIndexOf(g.stackedByDimension, v)), d >= 0) {
          var y = g.data.getByRawIndex(g.stackResultDimension, d);
          if (l === "all" || l === "positive" && y > 0 || l === "negative" && y < 0 || l === "samesign" && h >= 0 && y > 0 || l === "samesign" && h <= 0 && y < 0) {
            h = wA(h, y), p = y;
            break;
          }
        }
      }
      return n[0] = h, n[1] = p, n;
    });
  });
}
var zf = (
  /** @class */
  /* @__PURE__ */ (function() {
    function t(e) {
      this.data = e.data || (e.sourceFormat === pn ? {} : []), this.sourceFormat = e.sourceFormat || RS, this.seriesLayoutBy = e.seriesLayoutBy || rn, this.startIndex = e.startIndex || 0, this.dimensionsDetectedCount = e.dimensionsDetectedCount, this.metaRawOption = e.metaRawOption;
      var r = this.dimensionsDefine = e.dimensionsDefine;
      if (r)
        for (var n = 0; n < r.length; n++) {
          var i = r[n];
          i.type == null && Rb(this, n) === We.Must && (i.type = "ordinal");
        }
    }
    return t;
  })()
);
function Sp(t) {
  return t instanceof zf;
}
function Dv(t, e, r) {
  r = r || Nb(t);
  var n = e.seriesLayoutBy, i = FP(t, r, n, e.sourceHeader, e.dimensions), a = new zf({
    data: t,
    sourceFormat: r,
    seriesLayoutBy: n,
    dimensionsDefine: i.dimensionsDefine,
    startIndex: i.startIndex,
    dimensionsDetectedCount: i.dimensionsDetectedCount,
    metaRawOption: xt(e)
  });
  return a;
}
function Bb(t) {
  return new zf({
    data: t,
    sourceFormat: ze(t) ? ri : je
  });
}
function NP(t) {
  return new zf({
    data: t.data,
    sourceFormat: t.sourceFormat,
    seriesLayoutBy: t.seriesLayoutBy,
    dimensionsDefine: xt(t.dimensionsDefine),
    startIndex: t.startIndex,
    dimensionsDetectedCount: t.dimensionsDetectedCount
  });
}
function Nb(t) {
  var e = RS;
  if (ze(t))
    e = ri;
  else if (J(t)) {
    t.length === 0 && (e = xe);
    for (var r = 0, n = t.length; r < n; r++) {
      var i = t[r];
      if (i != null) {
        if (J(i) || ze(i)) {
          e = xe;
          break;
        } else if (ft(i)) {
          e = Ir;
          break;
        }
      }
    }
  } else if (ft(t)) {
    for (var a in t)
      if (qe(t, a) && He(t[a])) {
        e = pn;
        break;
      }
  }
  return e;
}
function FP(t, e, r, n, i) {
  var a, o;
  if (!t)
    return {
      dimensionsDefine: by(i),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (e === xe) {
    var s = t;
    n === "auto" || n == null ? Ty(function(u) {
      u != null && u !== "-" && (at(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = qt(n) ? n : n ? 1 : 0, !i && o === 1 && (i = [], Ty(function(u, f) {
      i[f] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = i ? i.length : r === aa ? s.length : s[0] ? s[0].length : null;
  } else if (e === Ir)
    i || (i = HP(t));
  else if (e === pn)
    i || (i = [], P(t, function(u, f) {
      i.push(f);
    }));
  else if (e === je) {
    var l = Gs(t[0]);
    a = J(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: by(i),
    dimensionsDetectedCount: a
  };
}
function HP(t) {
  for (var e = 0, r; e < t.length && !(r = t[e++]); )
    ;
  if (r)
    return Kt(r);
}
function by(t) {
  if (t) {
    var e = gt();
    return pt(t, function(r, n) {
      r = ft(r) ? r : {
        name: r
      };
      var i = {
        name: r.name,
        displayName: r.displayName,
        type: r.type
      };
      if (i.name == null)
        return i;
      i.name += "", i.displayName == null && (i.displayName = i.name);
      var a = e.get(i.name);
      return a ? i.name += "-" + a.count++ : e.set(i.name, {
        count: 1
      }), i;
    });
  }
}
function Ty(t, e, r, n) {
  if (e === aa)
    for (var i = 0; i < r.length && i < n; i++)
      t(r[i] ? r[i][0] : null, i);
  else
    for (var a = r[0] || [], i = 0; i < a.length && i < n; i++)
      t(a[i], i);
}
function Fb(t) {
  var e = t.sourceFormat;
  return e === Ir || e === pn;
}
var Ri, Oi, ki, Bi, wy, xy, Hb = (
  /** @class */
  (function() {
    function t(e, r) {
      var n = Sp(e) ? e : Bb(e);
      this._source = n;
      var i = this._data = n.data, a = n.sourceFormat;
      n.seriesLayoutBy, a === ri && (this._offset = 0, this._dimSize = r, this._data = i), xy(this, i, n);
    }
    return t.prototype.getSource = function() {
      return this._source;
    }, t.prototype.count = function() {
      return 0;
    }, t.prototype.getItem = function(e, r) {
    }, t.prototype.appendData = function(e) {
    }, t.prototype.clean = function() {
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.pure = !1, e.persistent = !0;
    })(), t.internalField = (function() {
      var e;
      xy = function(o, s, l) {
        var u = l.sourceFormat, f = l.seriesLayoutBy, c = l.startIndex, h = l.dimensionsDefine, v = wy[bp(u, f)];
        if (q(o, v), u === ri)
          o.getItem = r, o.count = i, o.fillStorage = n;
        else {
          var d = zb(u, f);
          o.getItem = Xt(d, null, s, c, h);
          var p = Vb(u, f);
          o.count = Xt(p, null, s, c, h);
        }
      };
      var r = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, f = u * o, c = 0; c < u; c++)
          s[c] = l[f + c];
        return s;
      }, n = function(o, s, l, u) {
        for (var f = this._data, c = this._dimSize, h = 0; h < c; h++) {
          for (var v = u[h], d = v[0] == null ? 1 / 0 : v[0], p = v[1] == null ? -1 / 0 : v[1], m = s - o, g = l[h], y = 0; y < m; y++) {
            var _ = f[y * c + h];
            g[o + y] = _, _ < d && (d = _), _ > p && (p = _);
          }
          v[0] = d, v[1] = p;
        }
      }, i = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      wy = (e = {}, e[xe + "_" + rn] = {
        pure: !0,
        appendData: a
      }, e[xe + "_" + aa] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, e[Ir] = {
        pure: !0,
        appendData: a
      }, e[pn] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          P(o, function(l, u) {
            for (var f = s[u] || (s[u] = []), c = 0; c < (l || []).length; c++)
              f.push(l[c]);
          });
        }
      }, e[je] = {
        appendData: a
      }, e[ri] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          this._data = o;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count(), this._data = null;
        }
      }, e);
      function a(o) {
        for (var s = 0; s < o.length; s++)
          this._data.push(o[s]);
      }
    })(), t;
  })()
), Ml = function(t) {
  J(t) || dS("series.data or dataset.source must be an array.");
};
Ri = {}, Ri[xe + "_" + rn] = Ml, Ri[xe + "_" + aa] = Ml, Ri[Ir] = Ml, Ri[pn] = function(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r].name;
    n == null && dS("dimension name must not be null/undefined.");
  }
}, Ri[je] = Ml;
var Cy = function(t, e, r, n) {
  return t[n];
}, zP = (Oi = {}, Oi[xe + "_" + rn] = function(t, e, r, n) {
  return t[n + e];
}, Oi[xe + "_" + aa] = function(t, e, r, n, i) {
  n += e;
  for (var a = i || [], o = t, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[n] : null;
  }
  return a;
}, Oi[Ir] = Cy, Oi[pn] = function(t, e, r, n, i) {
  for (var a = i || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = s != null ? t[s] : null;
    a[o] = l ? l[n] : null;
  }
  return a;
}, Oi[je] = Cy, Oi);
function zb(t, e) {
  var r = zP[bp(t, e)];
  return r;
}
var Dy = function(t, e, r) {
  return t.length;
}, VP = (ki = {}, ki[xe + "_" + rn] = function(t, e, r) {
  return Math.max(0, t.length - e);
}, ki[xe + "_" + aa] = function(t, e, r) {
  var n = t[0];
  return n ? Math.max(0, n.length - e) : 0;
}, ki[Ir] = Dy, ki[pn] = function(t, e, r) {
  var n = r[0].name, i = n != null ? t[n] : null;
  return i ? i.length : 0;
}, ki[je] = Dy, ki);
function Vb(t, e) {
  var r = VP[bp(t, e)];
  return r;
}
var rh = function(t, e, r) {
  return t[e];
}, UP = (Bi = {}, Bi[xe] = rh, Bi[Ir] = function(t, e, r) {
  return t[r];
}, Bi[pn] = rh, Bi[je] = function(t, e, r) {
  var n = Gs(t);
  return n instanceof Array ? n[e] : n;
}, Bi[ri] = rh, Bi);
function Ub(t) {
  var e = UP[t];
  return e;
}
function bp(t, e) {
  return t === xe ? t + "_" + e : t;
}
function ja(t, e, r) {
  if (t) {
    var n = t.getRawDataItem(e);
    if (n != null) {
      var i = t.getStore(), a = i.getSource().sourceFormat;
      if (r != null) {
        var o = t.getDimensionIndex(r), s = i.getDimensionProperty(o);
        return Ub(a)(n, o, s);
      } else {
        var l = n;
        return a === je && (l = Gs(n)), l;
      }
    }
  }
}
var GP = /\{@(.+?)\}/g, WP = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getDataParams = function(e, r) {
      var n = this.getData(r), i = this.getRawValue(e, r), a = n.getRawIndex(e), o = n.getName(e), s = n.getRawDataItem(e), l = n.getItemVisual(e, "style"), u = l && l[n.getItemVisual(e, "drawType") || "fill"], f = l && l.stroke, c = this.mainType, h = c === "series", v = n.userOutput && n.userOutput.get();
      return {
        componentType: c,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: h ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: h ? this.id : null,
        seriesName: h ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: r,
        value: i,
        color: u,
        borderColor: f,
        dimensionNames: v ? v.fullDimensions : null,
        encode: v ? v.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, t.prototype.getFormattedLabel = function(e, r, n, i, a, o) {
      r = r || "normal";
      var s = this.getData(n), l = this.getDataParams(e, n);
      if (o && (l.value = o.interpolatedValue), i != null && J(l.value) && (l.value = l.value[i]), !a) {
        var u = s.getItemModel(e);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (_t(a))
        return l.status = r, l.dimensionIndex = i, a(l);
      if (at(a)) {
        var f = Cb(a, l);
        return f.replace(GP, function(c, h) {
          var v = h.length, d = h;
          d.charAt(0) === "[" && d.charAt(v - 1) === "]" && (d = +d.slice(1, v - 1));
          var p = ja(s, e, d);
          if (o && J(o.interpolatedValue)) {
            var m = s.getDimensionIndex(d);
            m >= 0 && (p = o.interpolatedValue[m]);
          }
          return p != null ? p + "" : "";
        });
      }
    }, t.prototype.getRawValue = function(e, r) {
      return ja(this.getData(r), e);
    }, t.prototype.formatTooltip = function(e, r, n) {
    }, t;
  })()
);
function My(t) {
  var e, r;
  return ft(t) ? t.type && (r = t) : e = t, {
    text: e,
    // markers: markers || markersExisting,
    frag: r
  };
}
function ns(t) {
  return new YP(t);
}
var YP = (
  /** @class */
  (function() {
    function t(e) {
      e = e || {}, this._reset = e.reset, this._plan = e.plan, this._count = e.count, this._onDirty = e.onDirty, this._dirty = !0;
    }
    return t.prototype.perform = function(e) {
      var r = this._upstream, n = e && e.skip;
      if (this._dirty && r) {
        var i = this.context;
        i.data = i.outputData = r.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !n && (a = this._plan(this.context));
      var o = f(this._modBy), s = this._modDataCount || 0, l = f(e && e.modBy), u = e && e.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function f(y) {
        return !(y >= 1) && (y = 1), y;
      }
      var c;
      (this._dirty || a === "reset") && (this._dirty = !1, c = this._doReset(n)), this._modBy = l, this._modDataCount = u;
      var h = e && e.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var v = this._dueIndex, d = Math.min(h != null ? this._dueIndex + h : 1 / 0, this._dueEnd);
        if (!n && (c || v < d)) {
          var p = this._progress;
          if (J(p))
            for (var m = 0; m < p.length; m++)
              this._doProgress(p[m], v, d, l, u);
          else
            this._doProgress(p, v, d, l, u);
        }
        this._dueIndex = d;
        var g = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = g;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, t.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, t.prototype._doProgress = function(e, r, n, i, a) {
      Ay.reset(r, n, i, a), this._callingProgress = e, this._callingProgress({
        start: r,
        end: n,
        count: n - r,
        next: Ay.next
      }, this.context);
    }, t.prototype._doReset = function(e) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, n;
      !e && this._reset && (r = this._reset(this.context), r && r.progress && (n = r.forceFirstProgress, r = r.progress), J(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
      var i = this._downstream;
      return i && i.dirty(), n;
    }, t.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, t.prototype.pipe = function(e) {
      (this._downstream !== e || this._dirty) && (this._downstream = e, e._upstream = this, e.dirty());
    }, t.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, t.prototype.getUpstream = function() {
      return this._upstream;
    }, t.prototype.getDownstream = function() {
      return this._downstream;
    }, t.prototype.setOutputEnd = function(e) {
      this._outputDueEnd = this._settedOutputEnd = e;
    }, t;
  })()
), Ay = /* @__PURE__ */ (function() {
  var t, e, r, n, i, a = {
    reset: function(l, u, f, c) {
      e = l, t = u, r = f, n = c, i = Math.ceil(n / r), a.next = r > 1 && n > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return e < t ? e++ : null;
  }
  function s() {
    var l = e % i * r + Math.ceil(e / i), u = e >= t ? null : l < n ? l : e;
    return e++, u;
  }
})();
function fu(t, e) {
  var r = e && e.type;
  return r === "ordinal" ? t : (r === "time" && !qt(t) && t != null && t !== "-" && (t = +io(t)), t == null || t === "" ? NaN : Number(t));
}
gt({
  number: function(t) {
    return parseFloat(t);
  },
  time: function(t) {
    return +io(t);
  },
  trim: function(t) {
    return at(t) ? Kr(t) : t;
  }
});
var $P = (
  /** @class */
  (function() {
    function t(e, r) {
      var n = e === "desc";
      this._resultLT = n ? 1 : -1, r == null && (r = n ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return t.prototype.evaluate = function(e, r) {
      var n = qt(e) ? e : Ru(e), i = qt(r) ? r : Ru(r), a = isNaN(n), o = isNaN(i);
      if (a && (n = this._incomparable), o && (i = this._incomparable), a && o) {
        var s = at(e), l = at(r);
        s && (n = l ? e : 0), l && (i = s ? r : 0);
      }
      return n < i ? this._resultLT : n > i ? -this._resultLT : 0;
    }, t;
  })()
);
function XP(t) {
  var e = "", r = -1 / 0, n = -1 / 0, i = 1 / 0, a = 1 / 0;
  return t && (t.g != null && (e += "G" + t.g, r = t.g), t.ge != null && (e += "GE" + t.ge, n = t.ge), t.l != null && (e += "L" + t.l, i = t.l), t.le != null && (e += "LE" + t.le, a = t.le)), {
    key: e,
    g: r,
    ge: n,
    l: i,
    le: a
  };
}
function KP(t, e) {
  return e > t.g && e >= t.ge && e < t.l && e <= t.le;
}
var qP = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.getRawData = function() {
      throw new Error("not supported");
    }, t.prototype.getRawDataItem = function(e) {
      throw new Error("not supported");
    }, t.prototype.cloneRawData = function() {
    }, t.prototype.getDimensionInfo = function(e) {
    }, t.prototype.cloneAllDimensionInfo = function() {
    }, t.prototype.count = function() {
    }, t.prototype.retrieveValue = function(e, r) {
    }, t.prototype.retrieveValueFromItem = function(e, r) {
    }, t.prototype.convertValue = function(e, r) {
      return fu(e, r);
    }, t;
  })()
);
function ZP(t, e) {
  var r = new qP(), n = t.data, i = r.sourceFormat = t.sourceFormat, a = t.startIndex, o = "";
  t.seriesLayoutBy !== rn && Ne(o);
  var s = [], l = {}, u = t.dimensionsDefine;
  if (u)
    P(u, function(p, m) {
      var g = p.name, y = {
        index: m,
        name: g,
        displayName: p.displayName
      };
      if (s.push(y), g != null) {
        var _ = "";
        qe(l, g) && Ne(_), l[g] = y;
      }
    });
  else
    for (var f = 0; f < t.dimensionsDetectedCount; f++)
      s.push({
        index: f
      });
  var c = zb(i, rn);
  e.__isBuiltIn && (r.getRawDataItem = function(p) {
    return c(n, a, s, p);
  }, r.getRawData = Xt(jP, null, t)), r.cloneRawData = Xt(JP, null, t);
  var h = Vb(i, rn);
  r.count = Xt(h, null, n, a, s);
  var v = Ub(i);
  r.retrieveValue = function(p, m) {
    var g = c(n, a, s, p);
    return d(g, m);
  };
  var d = r.retrieveValueFromItem = function(p, m) {
    if (p != null) {
      var g = s[m];
      if (g)
        return v(p, m, g.name);
    }
  };
  return r.getDimensionInfo = Xt(QP, null, s, l), r.cloneAllDimensionInfo = Xt(t2, null, s), r;
}
function jP(t) {
  var e = t.sourceFormat;
  if (!Tp(e)) {
    var r = "";
    Ne(r);
  }
  return t.data;
}
function JP(t) {
  var e = t.sourceFormat, r = t.data;
  if (!Tp(e)) {
    var n = "";
    Ne(n);
  }
  if (e === xe) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(r[a].slice());
    return i;
  } else if (e === Ir) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(q({}, r[a]));
    return i;
  }
}
function QP(t, e, r) {
  if (r != null) {
    if (qt(r) || !isNaN(r) && !qe(e, r))
      return t[r];
    if (qe(e, r))
      return e[r];
  }
}
function t2(t) {
  return xt(t);
}
var Gb = gt();
function e2(t) {
  t = xt(t);
  var e = t.type, r = "";
  e || Ne(r);
  var n = e.split(":");
  n.length !== 2 && Ne(r);
  var i = !1;
  n[0] === "echarts" && (e = n[1], i = !0), t.__isBuiltIn = i, Gb.set(e, t);
}
function r2(t, e, r) {
  var n = Re(t), i = n.length, a = "";
  i || Ne(a);
  for (var o = 0, s = i; o < s; o++) {
    var l = n[o];
    e = n2(l, e), o !== s - 1 && (e.length = Math.max(e.length, 1));
  }
  return e;
}
function n2(t, e, r, n) {
  var i = "";
  e.length || Ne(i), ft(t) || Ne(i);
  var a = t.type, o = Gb.get(a);
  o || Ne(i);
  var s = pt(e, function(u) {
    return ZP(u, o);
  }), l = Re(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: xt(t.config)
  }));
  return pt(l, function(u, f) {
    var c = "";
    ft(u) || Ne(c), u.data || Ne(c);
    var h = Nb(u.data);
    Tp(h) || Ne(c);
    var v, d = e[0];
    if (d && f === 0 && !u.dimensions) {
      var p = d.startIndex;
      p && (u.data = d.data.slice(0, p).concat(u.data)), v = {
        seriesLayoutBy: rn,
        sourceHeader: p,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      v = {
        seriesLayoutBy: rn,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Dv(u.data, v, null);
  });
}
function Tp(t) {
  return t === xe || t === Ir;
}
var i2 = typeof Uint32Array === $s ? Array : Uint32Array, a2 = typeof Uint16Array === $s ? Array : Uint16Array, Wb = typeof Int32Array === $s ? Array : Int32Array, Iy = typeof Float64Array === $s ? Array : Float64Array, Yb = {
  float: Iy,
  int: Wb,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Iy
}, nh;
function ma(t) {
  return t > 65535 ? i2 : a2;
}
function o2(t) {
  var e = t.constructor;
  return e === Array ? t.slice() : new e(t);
}
function Ly(t, e, r, n, i) {
  var a = Yb[r || "float"];
  if (i) {
    var o = t[e], s = o && o.length;
    if (s !== n) {
      for (var l = new a(n), u = 0; u < s; u++)
        l[u] = o[u];
      t[e] = l;
    }
  } else
    t[e] = new a(n);
}
var Mv = (
  /** @class */
  (function() {
    function t() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = gt();
    }
    return t.prototype.initData = function(e, r, n) {
      this._provider = e, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var i = e.getSource(), a = this.defaultDimValueGetter = nh[i.sourceFormat];
      this._dimValueGetter = n || a, this._rawExtent = [], Fb(i), this._dimensions = pt(r, function(o) {
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: o.type,
          property: o.property
        };
      }), this._initDataFromProvider(0, e.count());
    }, t.prototype.getProvider = function() {
      return this._provider;
    }, t.prototype.getSource = function() {
      return this._provider.getSource();
    }, t.prototype.ensureCalculationDimension = function(e, r) {
      var n = this._calcDimNameToIdx, i = this._dimensions, a = n.get(e);
      if (a != null) {
        if (i[a].type === r)
          return a;
      } else
        a = i.length;
      return i[a] = {
        type: r
      }, n.set(e, a), this._chunks[a] = new Yb[r || "float"](this._rawCount), this._rawExtent[a] = or(), a;
    }, t.prototype.collectOrdinalMeta = function(e, r) {
      var n = this._chunks[e], i = this._dimensions[e], a = this._rawExtent, o = i.ordinalOffset || 0, s = n.length;
      o === 0 && (a[e] = or());
      for (var l = a[e], u = o; u < s; u++) {
        var f = n[u] = r.parseAndCollect(n[u]);
        isNaN(f) || (l[0] = Math.min(f, l[0]), l[1] = Math.max(f, l[1]));
      }
      i.ordinalMeta = r, i.ordinalOffset = s, i.type = "ordinal";
    }, t.prototype.getOrdinalMeta = function(e) {
      var r = this._dimensions[e], n = r.ordinalMeta;
      return n;
    }, t.prototype.getDimensionProperty = function(e) {
      var r = this._dimensions[e];
      return r && r.property;
    }, t.prototype.appendData = function(e) {
      var r = this._provider, n = this.count();
      r.appendData(e);
      var i = r.count();
      return r.persistent || (i += n), n < i && this._initDataFromProvider(n, i, !0), [n, i];
    }, t.prototype.appendValues = function(e, r) {
      for (var n = this._chunks, i = this._dimensions, a = i.length, o = this._rawExtent, s = this.count(), l = s + Math.max(e.length, r || 0), u = 0; u < a; u++) {
        var f = i[u];
        Ly(n, u, f.type, l, !0);
      }
      for (var c = [], h = s; h < l; h++)
        for (var v = h - s, d = 0; d < a; d++) {
          var f = i[d], p = nh.arrayRows.call(this, e[v] || c, f.property, v, d);
          n[d][h] = p;
          var m = o[d];
          p < m[0] && (m[0] = p), p > m[1] && (m[1] = p);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, t.prototype._initDataFromProvider = function(e, r, n) {
      for (var i = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = pt(o, function(y) {
        return y.property;
      }), f = 0; f < s; f++) {
        var c = o[f];
        l[f] || (l[f] = or()), Ly(a, f, c.type, r, n);
      }
      if (i.fillStorage)
        i.fillStorage(e, r, a, l);
      else
        for (var h = [], v = e; v < r; v++) {
          h = i.getItem(v, h);
          for (var d = 0; d < s; d++) {
            var p = a[d], m = this._dimValueGetter(h, u[d], v, d);
            p[v] = m;
            var g = l[d];
            m < g[0] && (g[0] = m), m > g[1] && (g[1] = m);
          }
        }
      !i.persistent && i.clean && i.clean(), this._rawCount = this._count = r, this._extent = [];
    }, t.prototype.count = function() {
      return this._count;
    }, t.prototype.get = function(e, r) {
      if (!(r >= 0 && r < this._count))
        return NaN;
      var n = this._chunks[e];
      return n ? n[this.getRawIndex(r)] : NaN;
    }, t.prototype.getValues = function(e, r) {
      var n = [], i = [];
      if (r == null) {
        r = e, e = [];
        for (var a = 0; a < this._dimensions.length; a++)
          i.push(a);
      } else
        i = e;
      for (var a = 0, o = i.length; a < o; a++)
        n.push(this.get(i[a], r));
      return n;
    }, t.prototype.getByRawIndex = function(e, r) {
      if (!(r >= 0 && r < this._rawCount))
        return NaN;
      var n = this._chunks[e];
      return n ? n[r] : NaN;
    }, t.prototype.getSum = function(e) {
      var r = this._chunks[e], n = 0;
      if (r)
        for (var i = 0, a = this.count(); i < a; i++) {
          var o = this.get(e, i);
          isNaN(o) || (n += o);
        }
      return n;
    }, t.prototype.getMedian = function(e) {
      var r = [];
      this.each([e], function(i) {
        isNaN(i) || r.push(i);
      }), lS(r);
      var n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? r[(n - 1) / 2] : (r[n / 2] + r[n / 2 - 1]) / 2;
    }, t.prototype.indexOfRawIndex = function(e) {
      if (e >= this._rawCount || e < 0)
        return -1;
      if (!this._indices)
        return e;
      var r = this._indices, n = r[e];
      if (n != null && n < this._count && n === e)
        return e;
      for (var i = 0, a = this._count - 1; i <= a; ) {
        var o = (i + a) / 2 | 0;
        if (r[o] < e)
          i = o + 1;
        else if (r[o] > e)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, t.prototype.getIndices = function() {
      var e, r = this._indices;
      if (r) {
        var n = r.constructor, i = this._count;
        if (n === Array) {
          e = new n(i);
          for (var a = 0; a < i; a++)
            e[a] = r[a];
        } else
          e = new n(r.buffer, 0, i);
      } else {
        var n = ma(this._rawCount);
        e = new n(this.count());
        for (var a = 0; a < e.length; a++)
          e[a] = a;
      }
      return e;
    }, t.prototype.filter = function(e, r) {
      if (!this._count)
        return this;
      for (var n = this.clone(), i = n.count(), a = ma(n._rawCount), o = new a(i), s = [], l = e.length, u = 0, f = e[0], c = n._chunks, h = 0; h < i; h++) {
        var v = void 0, d = n.getRawIndex(h);
        if (l === 0)
          v = r(h);
        else if (l === 1) {
          var p = c[f][d];
          v = r(p, h);
        } else {
          for (var m = 0; m < l; m++)
            s[m] = c[e[m]][d];
          s[m] = h, v = r.apply(null, s);
        }
        v && (o[u++] = d);
      }
      return u < i && (n._indices = o), n._count = u, n._extent = [], n._updateGetRawIdx(), n;
    }, t.prototype.selectRange = function(e) {
      var r = this.clone(), n = r._count;
      if (!n)
        return this;
      var i = Kt(e), a = i.length;
      if (!a)
        return this;
      var o = r.count(), s = ma(r._rawCount), l = new s(o), u = 0, f = i[0], c = e[f][0], h = e[f][1], v = r._chunks, d = !1;
      if (!r._indices) {
        var p = 0;
        if (a === 1) {
          for (var m = v[i[0]], g = 0; g < n; g++) {
            var y = m[g];
            (y >= c && y <= h || isNaN(y)) && (l[u++] = p), p++;
          }
          d = !0;
        } else if (a === 2) {
          for (var m = v[i[0]], _ = v[i[1]], S = e[i[1]][0], b = e[i[1]][1], g = 0; g < n; g++) {
            var y = m[g], T = _[g];
            (y >= c && y <= h || isNaN(y)) && (T >= S && T <= b || isNaN(T)) && (l[u++] = p), p++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var g = 0; g < o; g++) {
            var C = r.getRawIndex(g), y = v[i[0]][C];
            (y >= c && y <= h || isNaN(y)) && (l[u++] = C);
          }
        else
          for (var g = 0; g < o; g++) {
            for (var E = !0, C = r.getRawIndex(g), A = 0; A < a; A++) {
              var M = i[A], y = v[M][C];
              (y < e[M][0] || y > e[M][1]) && (E = !1);
            }
            E && (l[u++] = r.getRawIndex(g));
          }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r;
    }, t.prototype.map = function(e, r) {
      var n = this.clone(e);
      return this._updateDims(n, e, r), n;
    }, t.prototype.modify = function(e, r) {
      this._updateDims(this, e, r);
    }, t.prototype._updateDims = function(e, r, n) {
      for (var i = e._chunks, a = [], o = r.length, s = e.count(), l = [], u = e._rawExtent, f = 0; f < r.length; f++)
        u[r[f]] = or();
      for (var c = 0; c < s; c++) {
        for (var h = e.getRawIndex(c), v = 0; v < o; v++)
          l[v] = i[r[v]][h];
        l[o] = c;
        var d = n && n.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var f = 0; f < d.length; f++) {
            var p = r[f], m = d[f], g = u[p], y = i[p];
            y && (y[h] = m), m < g[0] && (g[0] = m), m > g[1] && (g[1] = m);
          }
        }
      }
    }, t.prototype.lttbDownSample = function(e, r) {
      var n = this.clone([e], !0), i = n._chunks, a = i[e], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), f, c, h, v = new (ma(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      v[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var p = Math.min(d + l, o - 1), m = Math.min(d + l * 2, o), g = (m + p) / 2, y = 0, _ = p; _ < m; _++) {
          var S = this.getRawIndex(_), b = a[S];
          isNaN(b) || (y += b);
        }
        y /= m - p;
        var T = d, C = Math.min(d + l, o), E = d - 1, A = a[u];
        f = -1, h = T;
        for (var M = -1, R = 0, _ = T; _ < C; _++) {
          var S = this.getRawIndex(_), b = a[S];
          if (isNaN(b)) {
            R++, M < 0 && (M = S);
            continue;
          }
          c = Math.abs((E - g) * (b - A) - (E - _) * (y - A)), c > f && (f = c, h = S);
        }
        R > 0 && R < C - T && (v[s++] = Math.min(M, h), h = Math.max(M, h)), v[s++] = h, u = h;
      }
      return v[s++] = this.getRawIndex(o - 1), n._count = s, n._indices = v, n.getRawIndex = this._getRawIdx, n;
    }, t.prototype.minmaxDownSample = function(e, r) {
      for (var n = this.clone([e], !0), i = n._chunks, a = Math.floor(1 / r), o = i[e], s = this.count(), l = new (ma(this._rawCount))(Math.ceil(s / a) * 2), u = 0, f = 0; f < s; f += a) {
        var c = f, h = o[this.getRawIndex(c)], v = f, d = o[this.getRawIndex(v)], p = a;
        f + a > s && (p = s - f);
        for (var m = 0; m < p; m++) {
          var g = this.getRawIndex(f + m), y = o[g];
          y < h && (h = y, c = f + m), y > d && (d = y, v = f + m);
        }
        var _ = this.getRawIndex(c), S = this.getRawIndex(v);
        c < v ? (l[u++] = _, l[u++] = S) : (l[u++] = S, l[u++] = _);
      }
      return n._count = u, n._indices = l, n._updateGetRawIdx(), n;
    }, t.prototype.downSample = function(e, r, n, i) {
      for (var a = this.clone([e], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[e], f = this.count(), c = a._rawExtent[e] = or(), h = new (ma(this._rawCount))(Math.ceil(f / l)), v = 0, d = 0; d < f; d += l) {
        l > f - d && (l = f - d, s.length = l);
        for (var p = 0; p < l; p++) {
          var m = this.getRawIndex(d + p);
          s[p] = u[m];
        }
        var g = n(s), y = this.getRawIndex(Math.min(d + i(s, g) || 0, f - 1));
        u[y] = g, g < c[0] && (c[0] = g), g > c[1] && (c[1] = g), h[v++] = y;
      }
      return a._count = v, a._indices = h, a._updateGetRawIdx(), a;
    }, t.prototype.each = function(e, r) {
      if (this._count)
        for (var n = e.length, i = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (n) {
            case 0:
              r(a);
              break;
            case 1:
              r(i[e[0]][s], a);
              break;
            case 2:
              r(i[e[0]][s], i[e[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < n; l++)
                u[l] = i[e[l]][s];
              u[l] = a, r.apply(null, u);
          }
        }
    }, t.prototype.getDataExtent = function(e, r) {
      var n = this._chunks[e], i = or();
      if (!n)
        return i;
      var a = this.count(), o = !this._indices && !r;
      if (o)
        return this._rawExtent[e].slice();
      var s = this._extent, l = s[e] || (s[e] = {}), u = XP(r), f = u.key, c = l[f];
      if (c)
        return c.slice();
      for (var h = i[0], v = i[1], d = 0; d < a; d++) {
        var p = this.getRawIndex(d), m = n[p];
        (!r || KP(u, m)) && (m < h && (h = m), m > v && (v = m));
      }
      return l[f] = [h, v];
    }, t.prototype.getRawDataItem = function(e) {
      var r = this.getRawIndex(e);
      if (this._provider.persistent)
        return this._provider.getItem(r);
      for (var n = [], i = this._chunks, a = 0; a < i.length; a++)
        n.push(i[a][r]);
      return n;
    }, t.prototype.clone = function(e, r) {
      var n = new t(), i = this._chunks, a = e && eo(e, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < i.length; o++)
          n._chunks[o] = a[o] ? o2(i[o]) : i[o];
      else
        n._chunks = i;
      return this._copyCommonProps(n), r || (n._indices = this._cloneIndices()), n._updateGetRawIdx(), n;
    }, t.prototype._copyCommonProps = function(e) {
      e._count = this._count, e._rawCount = this._rawCount, e._provider = this._provider, e._dimensions = this._dimensions, e._extent = xt(this._extent), e._rawExtent = xt(this._rawExtent);
    }, t.prototype._cloneIndices = function() {
      if (this._indices) {
        var e = this._indices.constructor, r = void 0;
        if (e === Array) {
          var n = this._indices.length;
          r = new e(n);
          for (var i = 0; i < n; i++)
            r[i] = this._indices[i];
        } else
          r = new e(this._indices);
        return r;
      }
      return null;
    }, t.prototype._getRawIdxIdentity = function(e) {
      return e;
    }, t.prototype._getRawIdx = function(e) {
      return e < this._count && e >= 0 ? this._indices[e] : -1;
    }, t.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, t.internalField = (function() {
      function e(r, n, i, a) {
        return fu(r[a], this._dimensions[a]);
      }
      nh = {
        arrayRows: e,
        objectRows: function(r, n, i, a) {
          return fu(r[n], this._dimensions[a]);
        },
        keyedColumns: e,
        original: function(r, n, i, a) {
          var o = r && (r.value == null ? r : r.value);
          return fu(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, n, i, a) {
          return r[a];
        }
      };
    })(), t;
  })()
), s2 = (
  /** @class */
  (function() {
    function t(e) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = e;
    }
    return t.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, t.prototype._setLocalSource = function(e, r) {
      this._sourceList = e, this._upstreamSignList = r, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, t.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, t.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, t.prototype._createSource = function() {
      this._setLocalSource([], []);
      var e = this._sourceHost, r = this._getUpstreamSourceManagers(), n = !!r.length, i, a;
      if (Al(e)) {
        var o = e, s = void 0, l = void 0, u = void 0;
        if (n) {
          var f = r[0];
          f.prepareSource(), u = f.getSource(), s = u.data, l = u.sourceFormat, a = [f._getVersionSign()];
        } else
          s = o.get("data", !0), l = ze(s) ? ri : je, a = [];
        var c = this._getSourceMetaRawOption() || {}, h = u && u.metaRawOption || {}, v = vt(c.seriesLayoutBy, h.seriesLayoutBy) || null, d = vt(c.sourceHeader, h.sourceHeader), p = vt(c.dimensions, h.dimensions), m = v !== h.seriesLayoutBy || !!d != !!h.sourceHeader || p;
        i = m ? [Dv(s, {
          seriesLayoutBy: v,
          sourceHeader: d,
          dimensions: p
        }, l)] : [];
      } else {
        var g = e;
        if (n) {
          var y = this._applyTransform(r);
          i = y.sourceList, a = y.upstreamSignList;
        } else {
          var _ = g.get("source", !0);
          i = [Dv(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(i, a);
    }, t.prototype._applyTransform = function(e) {
      var r = this._sourceHost, n = r.get("transform", !0), i = r.get("fromTransformResult", !0);
      if (i != null) {
        var a = "";
        e.length !== 1 && Ey(a);
      }
      var o, s = [], l = [];
      return P(e, function(u) {
        u.prepareSource();
        var f = u.getSource(i || 0), c = "";
        i != null && !f && Ey(c), s.push(f), l.push(u._getVersionSign());
      }), n ? o = r2(n, s, {
        datasetIndex: r.componentIndex
      }) : i != null && (o = [NP(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, t.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var e = this._getUpstreamSourceManagers(), r = 0; r < e.length; r++) {
        var n = e[r];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          n._isDirty() || this._upstreamSignList[r] !== n._getVersionSign()
        )
          return !0;
      }
    }, t.prototype.getSource = function(e) {
      e = e || 0;
      var r = this._sourceList[e];
      if (!r) {
        var n = this._getUpstreamSourceManagers();
        return n[0] && n[0].getSource(e);
      }
      return r;
    }, t.prototype.getSharedDataStore = function(e) {
      var r = e.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, e.source, r.hash);
    }, t.prototype._innerGetDataStore = function(e, r, n) {
      var i = 0, a = this._storeList, o = a[i];
      o || (o = a[i] = {});
      var s = o[n];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Al(this._sourceHost) && l ? s = l._innerGetDataStore(e, r, n) : (s = new Mv(), s.initData(new Hb(r, e.length), e)), o[n] = s;
      }
      return s;
    }, t.prototype._getUpstreamSourceManagers = function() {
      var e = this._sourceHost;
      if (Al(e)) {
        var r = Pb(e);
        return r ? [r.getSourceManager()] : [];
      } else
        return pt(cP(e), function(n) {
          return n.getSourceManager();
        });
    }, t.prototype._getSourceMetaRawOption = function() {
      var e = this._sourceHost, r, n, i;
      if (Al(e))
        r = e.get("seriesLayoutBy", !0), n = e.get("sourceHeader", !0), i = e.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = e;
        r = a.get("seriesLayoutBy", !0), n = a.get("sourceHeader", !0), i = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: r,
        sourceHeader: n,
        dimensions: i
      };
    }, t;
  })()
);
function Al(t) {
  return t.mainType === "series";
}
function Ey(t) {
  throw new Error(t);
}
var l2 = "line-height:1";
function $b(t) {
  var e = t.lineHeight;
  return e == null ? l2 : "line-height:" + ke(e + "") + "px";
}
function Xb(t, e) {
  var r = t.color || ht.color.tertiary, n = t.fontSize || 12, i = t.fontWeight || "400", a = t.color || ht.color.secondary, o = t.fontSize || 14, s = t.fontWeight || "900";
  return e === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + ke(n + "") + "px;color:" + ke(r) + ";font-weight:" + ke(i + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + ke(o + "") + "px;color:" + ke(a) + ";font-weight:" + ke(s + "")
  } : {
    nameStyle: {
      fontSize: n,
      fill: r,
      fontWeight: i
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var u2 = [0, 10, 20, 30], f2 = ["", `
`, `

`, `


`];
function Ds(t, e) {
  return e.type = t, e;
}
function Av(t) {
  return t.type === "section";
}
function Kb(t) {
  return Av(t) ? c2 : h2;
}
function qb(t) {
  if (Av(t)) {
    var e = 0, r = t.blocks.length, n = r > 1 || r > 0 && !t.noHeader;
    return P(t.blocks, function(i) {
      var a = qb(i);
      a >= e && (e = a + +(n && // 0 always can not be readable gap level.
      (!a || Av(i) && !i.noHeader)));
    }), e;
  }
  return 0;
}
function c2(t, e, r, n) {
  var i = e.noHeader, a = v2(qb(e)), o = [], s = e.blocks || [];
  En(!s || J(s)), s = s || [];
  var l = t.orderMode;
  if (e.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (qe(u, l)) {
      var f = new $P(u[l], null);
      s.sort(function(p, m) {
        return f.evaluate(p.sortParam, m.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  P(s, function(p, m) {
    var g = e.valueFormatter, y = Kb(p)(
      // Inherit valueFormatter
      g ? q(q({}, t), {
        valueFormatter: g
      }) : t,
      p,
      m > 0 ? a.html : 0,
      n
    );
    y != null && o.push(y);
  });
  var c = t.renderMode === "richText" ? o.join(a.richText) : Iv(n, o.join(""), i ? r : a.html);
  if (i)
    return c;
  var h = Cv(e.header, "ordinal", t.useUTC), v = Xb(n, t.renderMode).nameStyle, d = $b(n);
  return t.renderMode === "richText" ? Zb(t, h, v) + a.richText + c : Iv(n, '<div style="' + v + ";" + d + ';">' + ke(h) + "</div>" + c, r);
}
function h2(t, e, r, n) {
  var i = t.renderMode, a = e.noName, o = e.noValue, s = !e.markerType, l = e.name, u = t.useUTC, f = e.valueFormatter || t.valueFormatter || function(S) {
    return S = J(S) ? S : [S], pt(S, function(b, T) {
      return Cv(b, J(v) ? v[T] : v, u);
    });
  };
  if (!(a && o)) {
    var c = s ? "" : t.markupStyleCreator.makeTooltipMarker(e.markerType, e.markerColor || ht.color.secondary, i), h = a ? "" : Cv(l, "ordinal", u), v = e.valueType, d = o ? [] : f(e.value, e.rawDataIndex), p = !s || !a, m = !s && a, g = Xb(n, i), y = g.nameStyle, _ = g.valueStyle;
    return i === "richText" ? (s ? "" : c) + (a ? "" : Zb(t, h, y)) + (o ? "" : g2(t, d, p, m, _)) : Iv(n, (s ? "" : c) + (a ? "" : d2(h, !s, y)) + (o ? "" : p2(d, p, m, _)), r);
  }
}
function Py(t, e, r, n, i, a) {
  if (t) {
    var o = Kb(t), s = {
      useUTC: i,
      renderMode: r,
      orderMode: n,
      markupStyleCreator: e,
      valueFormatter: t.valueFormatter
    };
    return o(s, t, 0, a);
  }
}
function v2(t) {
  return {
    html: u2[t],
    richText: f2[t]
  };
}
function Iv(t, e, r) {
  var n = '<div style="clear:both"></div>', i = "margin: " + r + "px 0 0", a = $b(t);
  return '<div style="' + i + ";" + a + ';">' + e + n + "</div>";
}
function d2(t, e, r) {
  var n = e ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + n + '">' + ke(t) + "</span>";
}
function p2(t, e, r, n) {
  var i = r ? "10px" : "20px", a = e ? "float:right;margin-left:" + i : "";
  return t = J(t) ? t : [t], '<span style="' + a + ";" + n + '">' + pt(t, function(o) {
    return ke(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function Zb(t, e, r) {
  return t.markupStyleCreator.wrapRichTextStyle(e, r);
}
function g2(t, e, r, n, i) {
  var a = [i], o = n ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), t.markupStyleCreator.wrapRichTextStyle(J(e) ? e.join("  ") : e, a);
}
function m2(t, e) {
  var r = t.getData().getItemVisual(e, "style"), n = r[t.visualDrawType];
  return ra(n);
}
function jb(t, e) {
  var r = t.get("padding");
  return r ?? (e === "richText" ? [8, 10] : 10);
}
var ih = (
  /** @class */
  (function() {
    function t() {
      this.richTextStyles = {}, this._nextStyleNameId = hS();
    }
    return t.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, t.prototype.makeTooltipMarker = function(e, r, n) {
      var i = n === "richText" ? this._generateStyleName() : null, a = qE({
        color: r,
        type: e,
        renderMode: n,
        markerId: i
      });
      return at(a) ? a : (this.richTextStyles[i] = a.style, a.content);
    }, t.prototype.wrapRichTextStyle = function(e, r) {
      var n = {};
      J(r) ? P(r, function(a) {
        return q(n, a);
      }) : q(n, r);
      var i = this._generateStyleName();
      return this.richTextStyles[i] = n, "{" + i + "|" + e + "}";
    }, t;
  })()
);
function y2(t) {
  var e = t.series, r = t.dataIndex, n = t.multipleSeries, i = e.getData(), a = i.mapDimensionsAll("defaultedTooltip"), o = a.length, s = e.getRawValue(r), l = J(s), u = m2(e, r), f, c, h, v;
  if (o > 1 || l && !o) {
    var d = _2(s, e, r, a, u);
    f = d.inlineValues, c = d.inlineValueTypes, h = d.blocks, v = d.inlineValues[0];
  } else if (o) {
    var p = i.getDimensionInfo(a[0]);
    v = f = ja(i, r, a[0]), c = p.type;
  } else
    v = f = l ? s[0] : s;
  var m = Od(e), g = m && e.name || "", y = i.getName(r), _ = n ? g : y;
  return Ds("section", {
    header: g,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: n || !m,
    sortParam: v,
    blocks: [Ds("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Kr(_),
      value: f,
      valueType: c,
      rawDataIndex: i.getRawIndex(r)
    })].concat(h || [])
  });
}
function _2(t, e, r, n, i) {
  var a = e.getData(), o = eo(t, function(c, h, v) {
    var d = a.getDimensionInfo(v);
    return c = c || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  n.length ? P(n, function(c) {
    f(ja(a, r, c), c);
  }) : P(t, f);
  function f(c, h) {
    var v = a.getDimensionInfo(h);
    !v || v.otherDims.tooltip === !1 || (o ? u.push(Ds("nameValue", {
      markerType: "subItem",
      markerColor: i,
      name: v.displayName,
      value: c,
      valueType: v.type
    })) : (s.push(c), l.push(v.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var zn = Wt();
function Il(t, e) {
  return t.getName(e) || t.getId(e);
}
var S2 = "__universalTransitionEnabled", ui = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return e.prototype.init = function(r, n, i) {
      this.seriesIndex = this.componentIndex, this.dataTask = ns({
        count: T2,
        reset: w2
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, i);
      var a = zn(this).sourceManager = new s2(this);
      a.prepareSource();
      var o = this.getInitialData(r, i);
      Oy(o, this), this.dataTask.context.data = o, zn(this).dataBeforeProcessed = o, Ry(this), this._initSelectedMapFromData(o);
    }, e.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = xs(this), a = i ? Ks(r) : {}, o = this.subType;
      kt.hasClass(o) && (o += "Series"), Pt(r, n.getTheme().get(this.subType)), Pt(r, this.getDefaultOption()), vm(r, "label", ["show"]), this.fillDataTextStyle(r.data), i && li(r, a, i);
    }, e.prototype.mergeOption = function(r, n) {
      r = Pt(this.option, r, !0), this.fillDataTextStyle(r.data);
      var i = xs(this);
      i && li(this.option, r, i);
      var a = zn(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, n);
      Oy(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, zn(this).dataBeforeProcessed = o, Ry(this), this._initSelectedMapFromData(o);
    }, e.prototype.fillDataTextStyle = function(r) {
      if (r && !ze(r))
        for (var n = ["show"], i = 0; i < r.length; i++)
          r[i] && r[i].label && vm(r[i], "label", n);
    }, e.prototype.getInitialData = function(r, n) {
    }, e.prototype.appendData = function(r) {
      var n = this.getRawData();
      n.appendData(r.data);
    }, e.prototype.getData = function(r) {
      var n = Lv(this);
      if (n) {
        var i = n.context.data;
        return r == null || !i.getLinkedData ? i : i.getLinkedData(r);
      } else
        return zn(this).data;
    }, e.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, e.prototype.setData = function(r) {
      var n = Lv(this);
      if (n) {
        var i = n.context;
        i.outputData = r, n !== this.dataTask && (i.data = r);
      }
      zn(this).data = r;
    }, e.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return gt(r);
    }, e.prototype.getSourceManager = function() {
      return zn(this).sourceManager;
    }, e.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, e.prototype.getRawData = function() {
      return zn(this).dataBeforeProcessed;
    }, e.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, e.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, e.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, e.prototype.indicesOfNearest = function(r, n, i, a) {
      var o = this.getData(), s = this.coordinateSystem, l = s && s.getAxis(r);
      if (!s || !l)
        return [];
      var u = l.dataToCoord(i);
      a == null && (a = 1 / 0);
      for (var f = [], c = 1 / 0, h = -1, v = 0, d = o.getDimensionIndex(n), p = o.getStore(), m = 0, g = p.count(); m < g; m++) {
        var y = p.get(d, m), _ = l.dataToCoord(y), S = u - _, b = Math.abs(S);
        b <= a && ((b < c || b === c && S >= 0 && h < 0) && (c = b, h = S, v = 0), S === h && (f[v++] = m));
      }
      return f.length = v, f;
    }, e.prototype.formatTooltip = function(r, n, i) {
      return y2({
        series: this,
        dataIndex: r,
        multipleSeries: n
      });
    }, e.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (Tt.node && !(r && r.ssr))
        return !1;
      var n = this.getShallow("animation");
      return n && this.getData().count() > this.getShallow("animationThreshold") && (n = !1), !!n;
    }, e.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, e.prototype.getColorFromPalette = function(r, n, i) {
      var a = this.ecModel, o = yp.prototype.getColorFromPalette.call(this, r, n, i);
      return o || (o = a.getColorFromPalette(r, n, i)), o;
    }, e.prototype.coordDimToDataDim = function(r) {
      return this.getRawData().mapDimensionsAll(r);
    }, e.prototype.getProgressive = function() {
      return this.get("progressive");
    }, e.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, e.prototype.select = function(r, n) {
      this._innerSelect(this.getData(n), r);
    }, e.prototype.unselect = function(r, n) {
      var i = this.option.selectedMap;
      if (i) {
        var a = this.option.selectedMode, o = this.getData(n);
        if (a === "series" || i === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < r.length; s++) {
          var l = r[s], u = Il(o, l);
          i[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, e.prototype.toggleSelect = function(r, n) {
      for (var i = [], a = 0; a < r.length; a++)
        i[0] = r[a], this.isSelected(r[a], n) ? this.unselect(i, n) : this.select(i, n);
    }, e.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, n = Kt(r), i = [], a = 0; a < n.length; a++) {
        var o = r[n[a]];
        o >= 0 && i.push(o);
      }
      return i;
    }, e.prototype.isSelected = function(r, n) {
      var i = this.option.selectedMap;
      if (!i)
        return !1;
      var a = this.getData(n);
      return (i === "all" || i[Il(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, e.prototype.isUniversalTransitionEnabled = function() {
      if (this[S2])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, e.prototype._innerSelect = function(r, n) {
      var i, a, o = this.option, s = o.selectedMode, l = n.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          ft(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, f = 0; f < l; f++) {
            var c = n[f], h = Il(r, c);
            u[h] = !0, this._selectedDataIndicesMap[h] = r.getRawIndex(c);
          }
        } else if (s === "single" || s === !0) {
          var v = n[l - 1], h = Il(r, v);
          o.selectedMap = (i = {}, i[h] = !0, i), this._selectedDataIndicesMap = (a = {}, a[h] = r.getRawIndex(v), a);
        }
      }
    }, e.prototype._initSelectedMapFromData = function(r) {
      if (!this.option.selectedMap) {
        var n = [];
        r.hasItemOption && r.each(function(i) {
          var a = r.getRawDataItem(i);
          a && a.selected && n.push(i);
        }), n.length > 0 && this._innerSelect(r, n);
      }
    }, e.registerClass = function(r) {
      return kt.registerClass(r);
    }, e.protoInitialize = (function() {
      var r = e.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill";
    })(), e;
  })(kt)
);
vn(ui, WP);
vn(ui, yp);
bS(ui, kt);
function Ry(t) {
  var e = t.name;
  Od(t) || (t.name = b2(t) || e);
}
function b2(t) {
  var e = t.getRawData(), r = e.mapDimensionsAll("seriesName"), n = [];
  return P(r, function(i) {
    var a = e.getDimensionInfo(i);
    a.displayName && n.push(a.displayName);
  }), n.join(" ");
}
function T2(t) {
  return t.model.getRawData().count();
}
function w2(t) {
  var e = t.model;
  return e.setData(e.getRawData().cloneShallow()), x2;
}
function x2(t, e) {
  e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
}
function Oy(t, e) {
  P(KD(t.CHANGABLE_METHODS, t.DOWNSAMPLE_METHODS), function(r) {
    t.wrapMethod(r, oe(C2, e));
  });
}
function C2(t, e) {
  var r = Lv(t);
  return r && r.setOutputEnd((e || this).count()), e;
}
function Lv(t) {
  var e = (t.ecModel || {}).scheduler, r = e && e.getPipeline(t.uid);
  if (r) {
    var n = r.currentTask;
    if (n) {
      var i = n.agentStubMap;
      i && (n = i.get(t.uid));
    }
    return n;
  }
}
var cn = (
  /** @class */
  (function() {
    function t() {
      this.group = new pe(), this.uid = Nf("viewComponent");
    }
    return t.prototype.init = function(e, r) {
    }, t.prototype.render = function(e, r, n, i) {
    }, t.prototype.dispose = function(e, r) {
    }, t.prototype.updateView = function(e, r, n, i) {
    }, t.prototype.updateLayout = function(e, r, n, i) {
    }, t.prototype.updateVisual = function(e, r, n, i) {
    }, t.prototype.toggleBlurSeries = function(e, r, n) {
    }, t.prototype.eachRendered = function(e) {
      var r = this.group;
      r && r.traverse(e);
    }, t;
  })()
);
Fd(cn);
Df(cn);
function Jb() {
  var t = Wt();
  return function(e) {
    var r = t(e), n = e.pipelineContext, i = !!r.large, a = !!r.progressiveRender, o = r.large = !!(n && n.large), s = r.progressiveRender = !!(n && n.progressiveRender);
    return (i !== o || a !== s) && "reset";
  };
}
var Qb = Wt(), D2 = Jb(), nn = (
  /** @class */
  (function() {
    function t() {
      this.group = new pe(), this.uid = Nf("viewChart"), this.renderTask = ns({
        plan: M2,
        reset: A2
      }), this.renderTask.context = {
        view: this
      };
    }
    return t.prototype.init = function(e, r) {
    }, t.prototype.render = function(e, r, n, i) {
    }, t.prototype.highlight = function(e, r, n, i) {
      var a = e.getData(i && i.dataType);
      a && By(a, i, "emphasis");
    }, t.prototype.downplay = function(e, r, n, i) {
      var a = e.getData(i && i.dataType);
      a && By(a, i, "normal");
    }, t.prototype.remove = function(e, r) {
      this.group.removeAll();
    }, t.prototype.dispose = function(e, r) {
    }, t.prototype.updateView = function(e, r, n, i) {
      this.render(e, r, n, i);
    }, t.prototype.updateVisual = function(e, r, n, i) {
      this.render(e, r, n, i);
    }, t.prototype.eachRendered = function(e) {
      ep(this.group, e);
    }, t.markUpdateMethod = function(e, r) {
      Qb(e).updateMethod = r;
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.type = "chart";
    })(), t;
  })()
);
function ky(t, e, r) {
  t && _v(t) && (e === "emphasis" ? Nu : Fu)(t, r);
}
function By(t, e, r) {
  var n = ta(t, e), i = e && e.highlightKey != null ? mL(e.highlightKey) : null;
  n != null ? P(Re(n), function(a) {
    ky(t.getItemGraphicEl(a), r, i);
  }) : t.eachItemGraphicEl(function(a) {
    ky(a, r, i);
  });
}
Fd(nn);
Df(nn);
function M2(t) {
  return D2(t.model);
}
function A2(t) {
  var e = t.model, r = t.ecModel, n = t.api, i = t.payload, a = e.pipelineContext.progressiveRender, o = t.view, s = i && Qb(i).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](e, r, n, i), I2[l];
}
var I2 = {
  incrementalPrepareRender: {
    progress: function(t, e) {
      e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(t, e) {
      e.view.render(e.model, e.ecModel, e.api, e.payload);
    }
  }
}, Wu = "\0__throttleOriginMethod", Ny = "\0__throttleRate", Fy = "\0__throttleType";
function tT(t, e, r) {
  var n, i = 0, a = 0, o = null, s, l, u, f;
  e = e || 0;
  function c() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, t.apply(l, u || []);
  }
  var h = function() {
    for (var v = [], d = 0; d < arguments.length; d++)
      v[d] = arguments[d];
    n = (/* @__PURE__ */ new Date()).getTime(), l = this, u = v;
    var p = f || e, m = f || r;
    f = null, s = n - (m ? i : a) - p, clearTimeout(o), m ? o = setTimeout(c, p) : s >= 0 ? c() : o = setTimeout(c, -s), i = n;
  };
  return h.clear = function() {
    o && (clearTimeout(o), o = null);
  }, h.debounceNextCall = function(v) {
    f = v;
  }, h;
}
function eT(t, e, r, n) {
  var i = t[e];
  if (i) {
    var a = i[Wu] || i, o = i[Fy], s = i[Ny];
    if (s !== r || o !== n) {
      if (r == null || !n)
        return t[e] = a;
      i = t[e] = tT(a, r, n === "debounce"), i[Wu] = a, i[Fy] = n, i[Ny] = r;
    }
    return i;
  }
}
function Ev(t, e) {
  var r = t[e];
  r && r[Wu] && (r.clear && r.clear(), t[e] = r[Wu]);
}
var Hy = Wt(), zy = {
  itemStyle: _s(hb, !0),
  lineStyle: _s(cb, !0)
}, L2 = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function rT(t, e) {
  var r = t.visualStyleMapper || zy[e];
  return r || (console.warn("Unknown style type '" + e + "'."), zy.itemStyle);
}
function nT(t, e) {
  var r = t.visualDrawType || L2[e];
  return r || (console.warn("Unknown style type '" + e + "'."), "fill");
}
var E2 = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(t, e) {
    var r = t.getData(), n = t.visualStyleAccessPath || "itemStyle", i = t.getModel(n), a = rT(t, n), o = a(i), s = i.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = nT(t, n), u = o[l], f = _t(u) ? u : null, c = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || f || c) {
      var h = t.getColorFromPalette(
        // TODO series count changed.
        t.name,
        null,
        e.getSeriesCount()
      );
      o[l] || (o[l] = h, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || _t(o.fill) ? h : o.fill, o.stroke = o.stroke === "auto" || _t(o.stroke) ? h : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !e.isSeriesFiltered(t) && f)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(v, d) {
          var p = t.getDataParams(d), m = q({}, o);
          m[l] = f(p), v.setItemVisual(d, "style", m);
        }
      };
  }
}, yo = new Zt(), P2 = {
  createOnAllSeries: !0,
  reset: function(t, e) {
    if (!t.ignoreStyleOnData) {
      var r = t.getData(), n = t.visualStyleAccessPath || "itemStyle", i = rT(t, n), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[n]) {
            yo.option = l[n];
            var u = i(yo), f = o.ensureUniqueItemVisual(s, "style");
            q(f, u), yo.option.decal && (o.setItemVisual(s, "decal", yo.option.decal), yo.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, R2 = {
  performRawSeries: !0,
  overallReset: function(t) {
    var e = gt();
    t.eachSeries(function(r) {
      if (!r.isColorBySeries()) {
        var n = r.type + "-" + r.getColorBy();
        Hy(r).scope = e.get(n) || e.set(n, {});
      }
    }), t.eachSeries(function(r) {
      if (!r.isColorBySeries()) {
        var n = r.getRawData(), i = {}, a = r.getData(), o = Hy(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = nT(r, s);
        a.each(function(u) {
          var f = a.getRawIndex(u);
          i[f] = u;
        }), n.each(function(u) {
          var f = i[u], c = a.getItemVisual(f, "colorFromPalette");
          if (c) {
            var h = a.ensureUniqueItemVisual(f, "style"), v = n.getName(u) || u + "", d = n.count();
            h[l] = r.getColorFromPalette(v, o, d);
          }
        });
      }
    });
  }
}, Ll = Math.PI;
function O2(t, e) {
  e = e || {}, Ht(e, {
    text: "loading",
    textColor: ht.color.primary,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255,255,255,0.8)",
    showSpinner: !0,
    color: ht.color.theme[0],
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var r = new pe(), n = new se({
    style: {
      fill: e.maskColor
    },
    zlevel: e.zlevel,
    z: 1e4
  });
  r.add(n);
  var i = new Ve({
    style: {
      text: e.text,
      fill: e.textColor,
      fontSize: e.fontSize,
      fontWeight: e.fontWeight,
      fontStyle: e.fontStyle,
      fontFamily: e.fontFamily
    },
    zlevel: e.zlevel,
    z: 10001
  }), a = new se({
    style: {
      fill: "none"
    },
    textContent: i,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: e.zlevel,
    z: 10001
  });
  r.add(a);
  var o;
  return e.showSpinner && (o = new Of({
    shape: {
      startAngle: -Ll / 2,
      endAngle: -Ll / 2 + 0.1,
      r: e.spinnerRadius
    },
    style: {
      stroke: e.color,
      lineCap: "round",
      lineWidth: e.lineWidth
    },
    zlevel: e.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: Ll * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Ll * 3 / 2
  }).delay(300).start("circularInOut"), r.add(o)), r.resize = function() {
    var s = i.getBoundingRect().width, l = e.showSpinner ? e.spinnerRadius : 0, u = (t.getWidth() - l * 2 - (e.showSpinner && s ? 10 : 0) - s) / 2 - (e.showSpinner && s ? 0 : 5 + s / 2) + (e.showSpinner ? 0 : s / 2) + (s ? 0 : l), f = t.getHeight() / 2;
    e.showSpinner && o.setShape({
      cx: u,
      cy: f
    }), a.setShape({
      x: u - l,
      y: f - l,
      width: l * 2,
      height: l * 2
    }), n.setShape({
      x: 0,
      y: 0,
      width: t.getWidth(),
      height: t.getHeight()
    });
  }, r.resize(), r;
}
var iT = (
  /** @class */
  (function() {
    function t(e, r, n, i) {
      this._stageTaskMap = gt(), this.ecInstance = e, this.api = r, n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice(), this._allHandlers = n.concat(i);
    }
    return t.prototype.restoreData = function(e, r) {
      e.restoreData(r), this._stageTaskMap.each(function(n) {
        var i = n.overallTask;
        i && i.dirty();
      });
    }, t.prototype.getPerformArgs = function(e, r) {
      if (e.__pipeline) {
        var n = this._pipelineMap.get(e.__pipeline.id), i = n.context, a = !r && n.progressiveEnabled && (!i || i.progressiveRender) && e.__idxInPipeline > n.blockIndex, o = a ? n.step : null, s = i && i.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, t.prototype.getPipeline = function(e) {
      return this._pipelineMap.get(e);
    }, t.prototype.updateStreamModes = function(e, r) {
      var n = this._pipelineMap.get(e.uid), i = e.__preparePipelineContext ? e.__preparePipelineContext(r, n) : ZA(e, r, n);
      e.pipelineContext = n.context = i;
    }, t.prototype.restorePipelines = function(e, r) {
      var n = this, i = n._pipelineMap = gt();
      r.eachSeries(function(a) {
        var o = e.painter.type === "canvas" && a.getProgressive(), s = a.uid;
        i.set(s, {
          id: s,
          head: null,
          tail: null,
          threshold: a.getProgressiveThreshold(),
          progressiveEnabled: o && !(a.preventIncremental && a.preventIncremental()),
          blockIndex: -1,
          step: Math.round(o || 700),
          count: 0
        }), n._pipe(a, a.dataTask);
      });
    }, t.prototype.prepareStageTasks = function() {
      var e = this._stageTaskMap, r = this.api.getModel(), n = this.api;
      P(this._allHandlers, function(i) {
        var a = e.get(i.uid) || e.set(i.uid, {}), o = "";
        En(!(i.reset && i.overallReset), o), i.reset && this._createSeriesStageTask(i, a, r, n), i.overallReset && this._createOverallStageTask(i, a, r, n);
      }, this);
    }, t.prototype.prepareView = function(e, r, n, i) {
      var a = e.renderTask, o = a.context;
      o.model = r, o.ecModel = n, o.api = i, a.__block = !e.incrementalPrepareRender, this._pipe(r, a);
    }, t.prototype.performDataProcessorTasks = function(e, r) {
      this._performStageTasks(this._dataProcessorHandlers, e, r, {
        block: !0
      });
    }, t.prototype.performVisualTasks = function(e, r, n) {
      this._performStageTasks(this._visualHandlers, e, r, n);
    }, t.prototype._performStageTasks = function(e, r, n, i) {
      i = i || {};
      var a = !1, o = this;
      P(e, function(l, u) {
        if (!(i.visualType && i.visualType !== l.visualType)) {
          var f = o._stageTaskMap.get(l.uid), c = f.seriesTaskMap, h = f.overallTask;
          if (h) {
            var v, d = h.agentStubMap;
            d.each(function(m) {
              s(i, m) && (m.dirty(), v = !0);
            }), v && h.dirty(), o.updatePayload(h, n);
            var p = o.getPerformArgs(h, i.block);
            d.each(function(m) {
              m.perform(p);
            }), h.perform(p) && (a = !0);
          } else c && c.each(function(m, g) {
            s(i, m) && m.dirty();
            var y = o.getPerformArgs(m, i.block);
            y.skip = !l.performRawSeries && r.isSeriesFiltered(m.context.model), o.updatePayload(m, n), m.perform(y) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, t.prototype.performSeriesTasks = function(e) {
      var r;
      e.eachSeries(function(n) {
        r = n.dataTask.perform() || r;
      }), this.unfinished = r || this.unfinished;
    }, t.prototype.plan = function() {
      this._pipelineMap.each(function(e) {
        var r = e.tail;
        do {
          if (r.__block) {
            e.blockIndex = r.__idxInPipeline;
            break;
          }
          r = r.getUpstream();
        } while (r);
      });
    }, t.prototype.updatePayload = function(e, r) {
      r !== "remain" && (e.context.payload = r);
    }, t.prototype._createSeriesStageTask = function(e, r, n, i) {
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = gt(), l = e.seriesType, u = e.getTargetSeries;
      e.createOnAllSeries ? n.eachRawSeries(f) : l ? n.eachRawSeriesByType(l, f) : u && u(n, i).each(f);
      function f(c) {
        var h = c.uid, v = s.set(h, o && o.get(h) || ns({
          plan: H2,
          reset: z2,
          count: U2
        }));
        v.context = {
          model: c,
          ecModel: n,
          api: i,
          // PENDING: `useClearVisual` not used?
          useClearVisual: e.isVisual && !e.isLayout,
          plan: e.plan,
          reset: e.reset,
          scheduler: a
        }, a._pipe(c, v);
      }
    }, t.prototype._createOverallStageTask = function(e, r, n, i) {
      var a = this, o = r.overallTask = r.overallTask || ns({
        reset: k2
      });
      o.context = {
        ecModel: n,
        api: i,
        overallReset: e.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = gt(), u = e.seriesType, f = e.getTargetSeries, c = e.dirtyOnOverallProgress, h = !1, v = "";
      En(!e.createOnAllSeries, v), u ? n.eachRawSeriesByType(u, d) : f ? f(n, i).each(d) : P(n.getSeries(), d);
      function d(p) {
        var m = p.uid, g = l.set(m, s && s.get(m) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (h = !0, ns({
          reset: B2,
          onDirty: F2
        })));
        g.context = {
          model: p,
          dirtyOnOverallProgress: c
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, g.agent = o, g.__block = c, a._pipe(p, g);
      }
      h && o.dirty();
    }, t.prototype._pipe = function(e, r) {
      var n = e.uid, i = this._pipelineMap.get(n);
      !i.head && (i.head = r), i.tail && i.tail.pipe(r), i.tail = r, r.__idxInPipeline = i.count++, r.__pipeline = i;
    }, t.wrapStageHandler = function(e, r) {
      return _t(e) && (e = {
        overallReset: e,
        seriesType: G2(e)
      }), e.uid = Nf("stageHandler"), r && (e.visualType = r), e;
    }, t;
  })()
);
function k2(t) {
  t.overallReset(t.ecModel, t.api, t.payload);
}
function B2(t) {
  return t.dirtyOnOverallProgress && N2;
}
function N2() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function F2() {
  this.agent && this.agent.dirty();
}
function H2(t) {
  return t.plan ? t.plan(t.model, t.ecModel, t.api, t.payload) : null;
}
function z2(t) {
  t.useClearVisual && t.data.clearAllVisual();
  var e = t.resetDefines = Re(t.reset(t.model, t.ecModel, t.api, t.payload));
  return e.length > 1 ? pt(e, function(r, n) {
    return aT(n);
  }) : V2;
}
var V2 = aT(0);
function aT(t) {
  return function(e, r) {
    var n = r.data, i = r.resetDefines[t];
    if (i && i.dataEach)
      for (var a = e.start; a < e.end; a++)
        i.dataEach(n, a);
    else i && i.progress && i.progress(e, n);
  };
}
function U2(t) {
  return t.data.count();
}
function G2(t) {
  Yu = null;
  try {
    t(Ms, oT);
  } catch {
  }
  return Yu;
}
var Ms = {}, oT = {}, Yu;
sT(Ms, _p);
sT(oT, OS);
Ms.eachSeriesByType = Ms.eachRawSeriesByType = function(t) {
  Yu = t;
};
Ms.eachComponent = function(t) {
  t.mainType === "series" && t.subType && (Yu = t.subType);
};
function sT(t, e) {
  for (var r in e.prototype)
    t[r] = we;
}
var K = ht.darkColor, Vy = K.background, _o = function() {
  return {
    axisLine: {
      lineStyle: {
        color: K.axisLine
      }
    },
    splitLine: {
      lineStyle: {
        color: K.axisSplitLine
      }
    },
    splitArea: {
      areaStyle: {
        color: [K.backgroundTint, K.backgroundTransparent]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: K.axisMinorSplitLine
      }
    },
    axisLabel: {
      color: K.axisLabel
    },
    axisName: {}
  };
}, Uy = {
  label: {
    color: K.secondary
  },
  itemStyle: {
    borderColor: K.borderTint
  },
  dividerLineStyle: {
    color: K.border
  }
}, lT = {
  darkMode: !0,
  color: K.theme,
  backgroundColor: Vy,
  axisPointer: {
    lineStyle: {
      color: K.border
    },
    crossStyle: {
      color: K.borderShade
    },
    label: {
      color: K.tertiary
    }
  },
  legend: {
    textStyle: {
      color: K.secondary
    },
    pageTextStyle: {
      color: K.tertiary
    }
  },
  textStyle: {
    color: K.secondary
  },
  title: {
    textStyle: {
      color: K.primary
    },
    subtextStyle: {
      color: K.quaternary
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: K.accent50
    },
    feature: {
      dataView: {
        backgroundColor: Vy,
        textColor: K.primary,
        textareaColor: K.background,
        textareaBorderColor: K.border,
        buttonColor: K.accent50,
        buttonTextColor: K.neutral00
      }
    }
  },
  tooltip: {
    backgroundColor: K.neutral20,
    defaultBorderColor: K.border,
    textStyle: {
      color: K.tertiary
    }
  },
  dataZoom: {
    borderColor: K.accent10,
    textStyle: {
      color: K.tertiary
    },
    brushStyle: {
      color: K.backgroundTint
    },
    handleStyle: {
      color: K.neutral00,
      borderColor: K.accent20
    },
    moveHandleStyle: {
      color: K.accent40
    },
    emphasis: {
      handleStyle: {
        borderColor: K.accent50
      }
    },
    dataBackground: {
      lineStyle: {
        color: K.accent30
      },
      areaStyle: {
        color: K.accent20
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: K.accent50
      },
      areaStyle: {
        color: K.accent30
      }
    }
  },
  visualMap: {
    textStyle: {
      color: K.secondary
    },
    handleStyle: {
      borderColor: K.neutral30
    }
  },
  timeline: {
    lineStyle: {
      color: K.accent10
    },
    label: {
      color: K.tertiary
    },
    controlStyle: {
      color: K.accent30,
      borderColor: K.accent30
    }
  },
  calendar: {
    itemStyle: {
      color: K.neutral00,
      borderColor: K.neutral20
    },
    dayLabel: {
      color: K.tertiary
    },
    monthLabel: {
      color: K.secondary
    },
    yearLabel: {
      color: K.secondary
    }
  },
  matrix: {
    x: Uy,
    y: Uy,
    backgroundColor: {
      borderColor: K.axisLine
    },
    body: {
      itemStyle: {
        borderColor: K.borderTint
      }
    }
  },
  timeAxis: _o(),
  logAxis: _o(),
  valueAxis: _o(),
  categoryAxis: _o(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: K.theme
  },
  gauge: {
    title: {
      color: K.secondary
    },
    axisLine: {
      lineStyle: {
        color: [[1, K.neutral05]]
      }
    },
    axisLabel: {
      color: K.axisLabel
    },
    detail: {
      color: K.primary
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  },
  funnel: {
    itemStyle: {
      borderColor: K.background
    }
  },
  radar: (function() {
    var t = _o();
    return t.axisName = {
      color: K.axisLabel
    }, t.axisLine.lineStyle.color = K.neutral20, t;
  })(),
  treemap: {
    breadcrumb: {
      itemStyle: {
        color: K.neutral20,
        textStyle: {
          color: K.secondary
        }
      },
      emphasis: {
        itemStyle: {
          color: K.neutral30
        }
      }
    }
  },
  sunburst: {
    itemStyle: {
      borderColor: K.background
    }
  },
  map: {
    itemStyle: {
      borderColor: K.border,
      areaColor: K.neutral10
    },
    label: {
      color: K.tertiary
    },
    emphasis: {
      label: {
        color: K.primary
      },
      itemStyle: {
        areaColor: K.highlight
      }
    },
    select: {
      label: {
        color: K.primary
      },
      itemStyle: {
        areaColor: K.highlight
      }
    }
  },
  geo: {
    itemStyle: {
      borderColor: K.border,
      areaColor: K.neutral10
    },
    emphasis: {
      label: {
        color: K.primary
      },
      itemStyle: {
        areaColor: K.highlight
      }
    },
    select: {
      label: {
        color: K.primary
      },
      itemStyle: {
        color: K.highlight
      }
    }
  }
};
lT.categoryAxis.splitLine.show = !1;
var W2 = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.normalizeQuery = function(e) {
      var r = {}, n = {}, i = {};
      if (at(e)) {
        var a = qr(e);
        r.mainType = a.main || null, r.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        P(e, function(l, u) {
          for (var f = !1, c = 0; c < o.length; c++) {
            var h = o[c], v = u.lastIndexOf(h);
            if (v > 0 && v === u.length - h.length) {
              var d = u.slice(0, v);
              d !== "data" && (r.mainType = d, r[h.toLowerCase()] = l, f = !0);
            }
          }
          s.hasOwnProperty(u) && (n[u] = l, f = !0), f || (i[u] = l);
        });
      }
      return {
        cptQuery: r,
        dataQuery: n,
        otherQuery: i
      };
    }, t.prototype.filter = function(e, r) {
      var n = this.eventInfo;
      if (!n)
        return !0;
      var i = n.targetEl, a = n.packedEvent, o = n.model, s = n.view;
      if (!o || !s)
        return !0;
      var l = r.cptQuery, u = r.dataQuery;
      return f(l, o, "mainType") && f(l, o, "subType") && f(l, o, "index", "componentIndex") && f(l, o, "name") && f(l, o, "id") && f(u, a, "name") && f(u, a, "dataIndex") && f(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(e, r.otherQuery, i, a));
      function f(c, h, v, d) {
        return c[v] == null || h[d || v] === c[v];
      }
    }, t.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, t;
  })()
), Pv = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Gy = Pv.concat(["symbolKeepAspect"]), Y2 = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(t, e) {
    var r = t.getData();
    if (t.legendIcon && r.setVisual("legendIcon", t.legendIcon), !t.hasSymbolVisual)
      return;
    for (var n = {}, i = {}, a = !1, o = 0; o < Pv.length; o++) {
      var s = Pv[o], l = t.get(s);
      _t(l) ? (a = !0, i[s] = l) : n[s] = l;
    }
    if (n.symbol = n.symbol || t.defaultSymbol, r.setVisual(q({
      legendIcon: t.legendIcon || n.symbol,
      symbolKeepAspect: t.get("symbolKeepAspect")
    }, n)), e.isSeriesFiltered(t))
      return;
    var u = Kt(i);
    function f(c, h) {
      for (var v = t.getRawValue(h), d = t.getDataParams(h), p = 0; p < u.length; p++) {
        var m = u[p];
        c.setItemVisual(h, m, i[m](v, d));
      }
    }
    return {
      dataEach: a ? f : null
    };
  }
}, $2 = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(t, e) {
    if (!t.hasSymbolVisual || e.isSeriesFiltered(t))
      return;
    var r = t.getData();
    function n(i, a) {
      for (var o = i.getItemModel(a), s = 0; s < Gy.length; s++) {
        var l = Gy[s], u = o.getShallow(l, !0);
        u != null && i.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? n : null
    };
  }
};
function X2(t, e, r) {
  switch (r) {
    case "color":
      var n = t.getItemVisual(e, "style");
      return n[t.getVisual("drawType")];
    case "opacity":
      return t.getItemVisual(e, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return t.getItemVisual(e, r);
  }
}
function K2(t, e) {
  switch (e) {
    case "color":
      var r = t.getVisual("style");
      return r[t.getVisual("drawType")];
    case "opacity":
      return t.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return t.getVisual(e);
  }
}
function ya(t, e, r, n, i) {
  var a = t + e;
  r.isSilent(a) || n.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = i.selected, f = 0; f < u.length; f++)
      if (u[f].seriesIndex === s) {
        var c = o.getData(), h = ta(c, i.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: J(h) ? c.getName(h[0]) : c.getName(h),
          selected: at(l) ? l : q({}, l)
        });
      }
  });
}
function q2(t, e, r) {
  t.on("selectchanged", function(n) {
    var i = r.getModel();
    n.isFromClick ? (ya("map", "selectchanged", e, i, n), ya("pie", "selectchanged", e, i, n)) : n.fromAction === "select" ? (ya("map", "selected", e, i, n), ya("pie", "selected", e, i, n)) : n.fromAction === "unselect" && (ya("map", "unselected", e, i, n), ya("pie", "unselected", e, i, n));
  });
}
function No(t, e, r) {
  for (var n; t && !(e(t) && (n = t, r)); )
    t = t.__hostTarget || t.parent;
  return n;
}
var er = new dn(), uT = {};
function Z2(t, e) {
  uT[t] = e;
}
function j2(t) {
  return uT[t];
}
var wp = Wt();
function J2(t) {
  wp(t).prepare = {};
}
function Q2(t) {
  wp(t).fullUpdate = {};
}
function qs(t) {
  return wp(t).fullUpdate;
}
var tR = Math.round(Math.random() * 9), eR = typeof Object.defineProperty == "function", rR = (function() {
  function t() {
    this._id = "__ec_inner_" + tR++;
  }
  return t.prototype.get = function(e) {
    return this._guard(e)[this._id];
  }, t.prototype.set = function(e, r) {
    var n = this._guard(e);
    return eR ? Object.defineProperty(n, this._id, {
      value: r,
      enumerable: !1,
      configurable: !0
    }) : n[this._id] = r, this;
  }, t.prototype.delete = function(e) {
    return this.has(e) ? (delete this._guard(e)[this._id], !0) : !1;
  }, t.prototype.has = function(e) {
    return !!this._guard(e)[this._id];
  }, t.prototype._guard = function(e) {
    if (e !== Object(e))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return e;
  }, t;
})(), nR = Gt.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(t, e) {
    var r = e.cx, n = e.cy, i = e.width / 2, a = e.height / 2;
    t.moveTo(r, n - a), t.lineTo(r + i, n + a), t.lineTo(r - i, n + a), t.closePath();
  }
}), iR = Gt.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(t, e) {
    var r = e.cx, n = e.cy, i = e.width / 2, a = e.height / 2;
    t.moveTo(r, n - a), t.lineTo(r + i, n), t.lineTo(r, n + a), t.lineTo(r - i, n), t.closePath();
  }
}), aR = Gt.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(t, e) {
    var r = e.x, n = e.y, i = e.width / 5 * 3, a = Math.max(i, e.height), o = i / 2, s = o * o / (a - o), l = n - a + o + s, u = Math.asin(s / o), f = Math.cos(u) * o, c = Math.sin(u), h = Math.cos(u), v = o * 0.6, d = o * 0.7;
    t.moveTo(r - f, l + s), t.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), t.bezierCurveTo(r + f - c * v, l + s + h * v, r, n - d, r, n), t.bezierCurveTo(r, n - d, r - f + c * v, l + s + h * v, r - f, l + s), t.closePath();
  }
}), oR = Gt.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(t, e) {
    var r = e.height, n = e.width, i = e.x, a = e.y, o = n / 3 * 2;
    t.moveTo(i, a), t.lineTo(i + o, a + r), t.lineTo(i, a + r / 4 * 3), t.lineTo(i - o, a + r), t.lineTo(i, a), t.closePath();
  }
}), sR = {
  line: oi,
  rect: se,
  roundRect: se,
  square: se,
  circle: Pf,
  diamond: iR,
  pin: aR,
  arrow: oR,
  triangle: nR
}, lR = {
  line: function(t, e, r, n, i) {
    i.x1 = t, i.y1 = e + n / 2, i.x2 = t + r, i.y2 = e + n / 2;
  },
  rect: function(t, e, r, n, i) {
    i.x = t, i.y = e, i.width = r, i.height = n;
  },
  roundRect: function(t, e, r, n, i) {
    i.x = t, i.y = e, i.width = r, i.height = n, i.r = Math.min(r, n) / 4;
  },
  square: function(t, e, r, n, i) {
    var a = Math.min(r, n);
    i.x = t, i.y = e, i.width = a, i.height = a;
  },
  circle: function(t, e, r, n, i) {
    i.cx = t + r / 2, i.cy = e + n / 2, i.r = Math.min(r, n) / 2;
  },
  diamond: function(t, e, r, n, i) {
    i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n;
  },
  pin: function(t, e, r, n, i) {
    i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n;
  },
  arrow: function(t, e, r, n, i) {
    i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n;
  },
  triangle: function(t, e, r, n, i) {
    i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n;
  }
}, Rv = {};
P(sR, function(t, e) {
  Rv[e] = new t();
});
var uR = Gt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(t, e, r) {
    var n = iS(t, e, r), i = this.shape;
    return i && i.symbolType === "pin" && e.position === "inside" && (n.y = r.y + r.height * 0.4), n;
  },
  buildPath: function(t, e, r) {
    var n = e.symbolType;
    if (n !== "none") {
      var i = Rv[n];
      i || (n = "rect", i = Rv[n]), lR[n](e.x, e.y, e.width, e.height, i.shape), i.buildPath(t, i.shape, r);
    }
  }
});
function fR(t, e) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = t, r.fill = e || ht.color.neutral00, r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = t : r.fill = t, this.markRedraw();
  }
}
function Ja(t, e, r, n, i, a, o) {
  var s = t.indexOf("empty") === 0;
  s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
  var l;
  return t.indexOf("image://") === 0 ? l = rb(t.slice(8), new mt(e, r, n, i), o ? "center" : "cover") : t.indexOf("path://") === 0 ? l = Jd(t.slice(7), {}, new mt(e, r, n, i), o ? "center" : "cover") : l = new uR({
    shape: {
      symbolType: t,
      x: e,
      y: r,
      width: n,
      height: i
    }
  }), l.__isEmptyBrush = s, l.setColor = fR, a && l.setColor(a), l;
}
function cR(t) {
  return J(t) || (t = [+t, +t]), [t[0] || 0, t[1] || 0];
}
function fT(t, e) {
  if (t != null)
    return J(t) || (t = [t, t]), [Wr(t[0], e[0]) || 0, Wr(vt(t[1], t[0]), e[1]) || 0];
}
function Yi(t) {
  return isFinite(t);
}
function hR(t, e, r) {
  var n = e.x == null ? 0 : e.x, i = e.x2 == null ? 1 : e.x2, a = e.y == null ? 0 : e.y, o = e.y2 == null ? 0 : e.y2;
  e.global || (n = n * r.width + r.x, i = i * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), n = Yi(n) ? n : 0, i = Yi(i) ? i : 1, a = Yi(a) ? a : 0, o = Yi(o) ? o : 0;
  var s = t.createLinearGradient(n, a, i, o);
  return s;
}
function vR(t, e, r) {
  var n = r.width, i = r.height, a = Math.min(n, i), o = e.x == null ? 0.5 : e.x, s = e.y == null ? 0.5 : e.y, l = e.r == null ? 0.5 : e.r;
  e.global || (o = o * n + r.x, s = s * i + r.y, l = l * a), o = Yi(o) ? o : 0.5, s = Yi(s) ? s : 0.5, l = l >= 0 && Yi(l) ? l : 0.5;
  var u = t.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Ov(t, e, r) {
  for (var n = e.type === "radial" ? vR(t, e, r) : hR(t, e, r), i = e.colorStops, a = 0; a < i.length; a++)
    n.addColorStop(i[a].offset, i[a].color);
  return n;
}
function dR(t, e) {
  if (t === e || !t && !e)
    return !1;
  if (!t || !e || t.length !== e.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r] !== e[r])
      return !0;
  return !1;
}
function El(t) {
  return parseInt(t, 10);
}
function Pl(t, e, r) {
  var n = ["width", "height"][e], i = ["clientWidth", "clientHeight"][e], a = ["paddingLeft", "paddingTop"][e], o = ["paddingRight", "paddingBottom"][e];
  if (r[n] != null && r[n] !== "auto")
    return parseFloat(r[n]);
  var s = document.defaultView.getComputedStyle(t);
  return (t[i] || El(s[n]) || El(t.style[n])) - (El(s[a]) || 0) - (El(s[o]) || 0) || 0;
}
function pR(t, e) {
  return !t || t === "solid" || !(e > 0) ? null : t === "dashed" ? [4 * e, 2 * e] : t === "dotted" ? [e] : qt(t) ? [t] : J(t) ? t : null;
}
function cT(t) {
  var e = t.style, r = e.lineDash && e.lineWidth > 0 && pR(e.lineDash, e.lineWidth), n = e.lineDashOffset;
  if (r) {
    var i = e.strokeNoScale && t.getLineScale ? t.getLineScale() : 1;
    i && i !== 1 && (r = pt(r, function(a) {
      return a / i;
    }), n /= i);
  }
  return [r, n];
}
var gR = new ea(!0);
function $u(t) {
  var e = t.stroke;
  return !(e == null || e === "none" || !(t.lineWidth > 0));
}
function Wy(t) {
  return typeof t == "string" && t !== "none";
}
function Xu(t) {
  var e = t.fill;
  return e != null && e !== "none";
}
function Yy(t, e) {
  if (e.fillOpacity != null && e.fillOpacity !== 1) {
    var r = t.globalAlpha;
    t.globalAlpha = e.fillOpacity * e.opacity, t.fill(), t.globalAlpha = r;
  } else
    t.fill();
}
function $y(t, e) {
  if (e.strokeOpacity != null && e.strokeOpacity !== 1) {
    var r = t.globalAlpha;
    t.globalAlpha = e.strokeOpacity * e.opacity, t.stroke(), t.globalAlpha = r;
  } else
    t.stroke();
}
function kv(t, e, r) {
  var n = TS(e.image, e.__image, r);
  if (Mf(n)) {
    var i = t.createPattern(n, e.repeat || "repeat");
    if (typeof DOMMatrix == "function" && i && i.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(e.x || 0, e.y || 0), a.rotateSelf(0, 0, (e.rotation || 0) * qD), a.scaleSelf(e.scaleX || 1, e.scaleY || 1), i.setTransform(a);
    }
    return i;
  }
}
function mR(t, e, r, n, i) {
  var a, o = $u(r), s = Xu(r), l = r.strokePercent, u = l < 1, f = !e.path;
  (!e.silent || u) && f && e.createPathProxy();
  var c = e.path || gR, h = e.__dirty;
  if (!n) {
    var v = r.fill, d = r.stroke, p = s && !!v.colorStops, m = o && !!d.colorStops, g = s && !!v.image, y = o && !!d.image, _ = void 0, S = void 0, b = void 0, T = void 0, C = void 0;
    (p || m) && (C = e.getBoundingRect()), p && (_ = h ? Ov(t, v, C) : e.__canvasFillGradient, e.__canvasFillGradient = _), m && (S = h ? Ov(t, d, C) : e.__canvasStrokeGradient, e.__canvasStrokeGradient = S), g && (b = h || !e.__canvasFillPattern ? kv(t, v, e) : e.__canvasFillPattern, e.__canvasFillPattern = b), y && (T = h || !e.__canvasStrokePattern ? kv(t, d, e) : e.__canvasStrokePattern, e.__canvasStrokePattern = T), p ? t.fillStyle = _ : g && (b ? t.fillStyle = b : s = !1), m ? t.strokeStyle = S : y && (T ? t.strokeStyle = T : o = !1);
  }
  var E = e.getGlobalScale();
  c.setScale(E[0], E[1], e.segmentIgnoreThreshold);
  var A, M;
  t.setLineDash && r.lineDash && (a = cT(e), A = a[0], M = a[1]);
  var R = !0;
  (f || h & Ca) && (c.setDPR(t.dpr), u ? c.setContext(null) : (c.setContext(t), R = !1), c.reset(), e.buildPath(c, e.shape, n), c.toStatic(), e.pathUpdated()), R && c.rebuildPath(t, u ? l : 1), A && (t.setLineDash(A), t.lineDashOffset = M), n ? (i.batchFill = s, i.batchStroke = o) : r.strokeFirst ? (o && $y(t, r), s && Yy(t, r)) : (s && Yy(t, r), o && $y(t, r)), A && t.setLineDash([]);
}
function yR(t, e, r) {
  var n = e.__image = TS(r.image, e.__image, e, e.onload);
  if (!(!n || !Mf(n))) {
    var i = r.x || 0, a = r.y || 0, o = e.getWidth(), s = e.getHeight(), l = n.width / n.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = n.width, s = n.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0, f = r.sy || 0;
      t.drawImage(n, u, f, r.sWidth, r.sHeight, i, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx, f = r.sy, c = o - u, h = s - f;
      t.drawImage(n, u, f, c, h, i, a, o, s);
    } else
      t.drawImage(n, i, a, o, s);
  }
}
function _R(t, e, r) {
  var n, i = r.text;
  if (i != null && (i += ""), i) {
    t.font = r.font || ai, t.textAlign = r.textAlign, t.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    t.setLineDash && r.lineDash && (n = cT(e), a = n[0], o = n[1]), a && (t.setLineDash(a), t.lineDashOffset = o), r.strokeFirst ? ($u(r) && t.strokeText(i, r.x, r.y), Xu(r) && t.fillText(i, r.x, r.y)) : (Xu(r) && t.fillText(i, r.x, r.y), $u(r) && t.strokeText(i, r.x, r.y)), a && t.setLineDash([]);
  }
}
var Xy = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Ky = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function hT(t, e, r, n, i) {
  var a = !1;
  if (!n && (r = r || {}, e === r))
    return !1;
  if (n || e.opacity !== r.opacity) {
    Ee(t, i), a = !0;
    var o = Math.max(Math.min(e.opacity, 1), 0);
    t.globalAlpha = isNaN(o) ? Ji.opacity : o;
  }
  (n || e.blend !== r.blend) && (a || (Ee(t, i), a = !0), t.globalCompositeOperation = e.blend || Ji.blend);
  for (var s = 0; s < Xy.length; s++) {
    var l = Xy[s];
    (n || e[l] !== r[l]) && (a || (Ee(t, i), a = !0), t[l] = t.dpr * (e[l] || 0));
  }
  return (n || e.shadowColor !== r.shadowColor) && (a || (Ee(t, i), a = !0), t.shadowColor = e.shadowColor || Ji.shadowColor), a;
}
function qy(t, e, r, n, i) {
  var a = e.style, o = n ? null : r && r.style || {};
  if (a === o)
    return !1;
  var s = hT(t, a, o, n, i);
  if ((n || a.fill !== o.fill) && (s || (Ee(t, i), s = !0), Wy(a.fill) && (t.fillStyle = a.fill)), (n || a.stroke !== o.stroke) && (s || (Ee(t, i), s = !0), Wy(a.stroke) && (t.strokeStyle = a.stroke)), (n || a.opacity !== o.opacity) && (s || (Ee(t, i), s = !0), t.globalAlpha = a.opacity == null ? 1 : a.opacity), e.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && e.getLineScale ? e.getLineScale() : 1);
    t.lineWidth !== u && (s || (Ee(t, i), s = !0), t.lineWidth = u);
  }
  for (var f = 0; f < Ky.length; f++) {
    var c = Ky[f], h = c[0];
    (n || a[h] !== o[h]) && (s || (Ee(t, i), s = !0), t[h] = a[h] || c[1]);
  }
  return s;
}
function SR(t, e, r, n, i) {
  return hT(t, e.style, r && r.style, n, i);
}
function vT(t, e) {
  var r = e.transform, n = t.dpr || 1;
  r ? t.setTransform(n * r[0], n * r[1], n * r[2], n * r[3], n * r[4], n * r[5]) : t.setTransform(n, 0, 0, n, 0, 0);
}
function bR(t, e, r) {
  for (var n = !1, i = 0; i < t.length; i++) {
    var a = t[i];
    n = n || a.isZeroArea(), vT(e, a), e.beginPath(), a.buildPath(e, a.shape), e.clip();
  }
  r.allClipped = n;
}
function TR(t, e) {
  return t && e ? t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || t[3] !== e[3] || t[4] !== e[4] || t[5] !== e[5] : !(!t && !e);
}
var Zy = 1, jy = 2, Jy = 3, Qy = 4;
function wR(t) {
  var e = Xu(t), r = $u(t);
  return !(t.lineDash || !(+e ^ +r) || e && typeof t.fill != "string" || r && typeof t.stroke != "string" || t.strokePercent < 1 || t.strokeOpacity < 1 || t.fillOpacity < 1);
}
function Ee(t, e) {
  e.batchFill && (e.batchFill = !1, t.fill()), e.batchStroke && (e.batchStroke = !1, t.stroke());
}
function dT(t, e) {
  var r = { inHover: !1, viewWidth: 0, viewHeight: 0, beforeBrushParam: {} };
  $i(t, e, r), Va(t, r);
}
function $i(t, e, r) {
  var n = e.transform;
  if (!e.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    e.__dirty &= ~Fe, e.__isRendered = !1;
    return;
  }
  var i = e.__clipPaths, a = r.prevElClipPaths, o = e.style, s = !1, l = !1;
  if ((!a || dR(i, a)) && (a && (Ee(t, r), t.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), i && i.length && (Ee(t, r), t.save(), bR(i, t, r), s = !0, r.prevElClipPaths = i)), r.allClipped) {
    e.__dirty &= ~Fe, e.__isRendered = !1;
    return;
  }
  e.beforeBrush && e.beforeBrush(r.beforeBrushParam), e.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var f = e instanceof Gt && e.autoBatch && wR(o);
  s || TR(n, u.transform) ? (Ee(t, r), vT(t, e)) : f || Ee(t, r), e instanceof Gt ? (r.lastDrawType !== Zy && (l = !0, r.lastDrawType = Zy), qy(t, e, u, l, r), (!f || !r.batchFill && !r.batchStroke) && t.beginPath(), mR(t, e, o, f, r)) : e instanceof Ou ? (r.lastDrawType !== Jy && (l = !0, r.lastDrawType = Jy), qy(t, e, u, l, r), _R(t, e, o)) : e instanceof hi ? (r.lastDrawType !== jy && (l = !0, r.lastDrawType = jy), SR(t, e, u, l, r), yR(t, e, o)) : e.getTemporalDisplayables && (r.lastDrawType !== Qy && (l = !0, r.lastDrawType = Qy), xR(t, e, r)), e.innerAfterBrush(), e.afterBrush && (f && Ee(t, r), e.afterBrush()), r.prevEl = e, e.__dirty = 0, e.__isRendered = !0;
}
function Va(t, e) {
  Ee(t, e), e.prevElClipPaths && t.restore();
}
function xR(t, e, r) {
  var n = e.getDisplayables(), i = e.getTemporalDisplayables();
  t.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: r.viewWidth,
    viewHeight: r.viewHeight,
    inHover: r.inHover,
    beforeBrushParam: {}
  }, o, s;
  for (o = e.getCursor(), s = n.length; o < s; o++) {
    var l = n[o];
    l.beforeBrush && l.beforeBrush(r.beforeBrushParam), l.innerBeforeBrush(), $i(t, l, a), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  Va(t, a);
  for (var u = 0, f = i.length; u < f; u++) {
    var l = i[u];
    l.beforeBrush && l.beforeBrush(r.beforeBrushParam), l.innerBeforeBrush(), $i(t, l, a), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  Va(t, a), e.clearTemporalDisplayables(), e.notClear = !0, t.restore();
}
var ah = new rR(), t0 = new Ya(100), e0 = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Bv(t, e) {
  if (t === "none")
    return null;
  var r = e.getDevicePixelRatio(), n = e.getZr(), i = n.painter.type === "svg";
  t.dirty && ah.delete(t);
  var a = ah.get(t);
  if (a)
    return a;
  var o = Ht(t, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / r, ah.set(t, s), t.dirty = !1, s;
  function l(u) {
    for (var f = [r], c = !0, h = 0; h < e0.length; ++h) {
      var v = o[e0[h]];
      if (v != null && !J(v) && !at(v) && !qt(v) && typeof v != "boolean") {
        c = !1;
        break;
      }
      f.push(v);
    }
    var d;
    if (c) {
      d = f.join(",") + (i ? "-svg" : "");
      var p = t0.get(d);
      p && (i ? u.svgElement = p : u.image = p);
    }
    var m = gT(o.dashArrayX), g = CR(o.dashArrayY), y = pT(o.symbol), _ = DR(m), S = mT(g), b = !i && Ke.createCanvas(), T = i && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, C = A(), E;
    b && (b.width = C.width * r, b.height = C.height * r, E = b.getContext("2d")), M(), c && t0.put(d, b || T), u.image = b, u.svgElement = T, u.svgWidth = C.width, u.svgHeight = C.height;
    function A() {
      for (var R = 1, B = 0, O = _.length; B < O; ++B)
        R = cm(R, _[B]);
      for (var F = 1, B = 0, O = y.length; B < O; ++B)
        F = cm(F, y[B].length);
      R *= F;
      var U = S * _.length * y.length;
      return {
        width: Math.max(1, Math.min(R, o.maxTileWidth)),
        height: Math.max(1, Math.min(U, o.maxTileHeight))
      };
    }
    function M() {
      E && (E.clearRect(0, 0, b.width, b.height), o.backgroundColor && (E.fillStyle = o.backgroundColor, E.fillRect(0, 0, b.width, b.height)));
      for (var R = 0, B = 0; B < g.length; ++B)
        R += g[B];
      if (R <= 0)
        return;
      for (var O = -S, F = 0, U = 0, H = 0; O < C.height; ) {
        if (F % 2 === 0) {
          for (var W = U / 2 % y.length, V = 0, j = 0, rt = 0; V < C.width * 2; ) {
            for (var tt = 0, B = 0; B < m[H].length; ++B)
              tt += m[H][B];
            if (tt <= 0)
              break;
            if (j % 2 === 0) {
              var it = (1 - o.symbolSize) * 0.5, ot = V + m[H][j] * it, Z = O + g[F] * it, bt = m[H][j] * o.symbolSize, St = g[F] * o.symbolSize, jt = rt / 2 % y[W].length;
              ge(ot, Z, bt, St, y[W][jt]);
            }
            V += m[H][j], ++rt, ++j, j === m[H].length && (j = 0);
          }
          ++H, H === m.length && (H = 0);
        }
        O += g[F], ++U, ++F, F === g.length && (F = 0);
      }
      function ge(Ct, Jt, x, D, N) {
        var k = i ? 1 : r, w = Ja(N, Ct * k, Jt * k, x * k, D * k, o.color, o.symbolKeepAspect);
        if (i) {
          var I = n.painter.renderOneToVNode(w);
          I && T.children.push(I);
        } else
          dT(E, w);
      }
    }
  }
}
function pT(t) {
  if (!t || t.length === 0)
    return [["rect"]];
  if (at(t))
    return [[t]];
  for (var e = !0, r = 0; r < t.length; ++r)
    if (!at(t[r])) {
      e = !1;
      break;
    }
  if (e)
    return pT([t]);
  for (var n = [], r = 0; r < t.length; ++r)
    at(t[r]) ? n.push([t[r]]) : n.push(t[r]);
  return n;
}
function gT(t) {
  if (!t || t.length === 0)
    return [[0, 0]];
  if (qt(t)) {
    var e = Math.ceil(t);
    return [[e, e]];
  }
  for (var r = !0, n = 0; n < t.length; ++n)
    if (!qt(t[n])) {
      r = !1;
      break;
    }
  if (r)
    return gT([t]);
  for (var i = [], n = 0; n < t.length; ++n)
    if (qt(t[n])) {
      var e = Math.ceil(t[n]);
      i.push([e, e]);
    } else {
      var e = pt(t[n], function(s) {
        return Math.ceil(s);
      });
      e.length % 2 === 1 ? i.push(e.concat(e)) : i.push(e);
    }
  return i;
}
function CR(t) {
  if (!t || typeof t == "object" && t.length === 0)
    return [0, 0];
  if (qt(t)) {
    var e = Math.ceil(t);
    return [e, e];
  }
  var r = pt(t, function(n) {
    return Math.ceil(n);
  });
  return t.length % 2 ? r.concat(r) : r;
}
function DR(t) {
  return pt(t, function(e) {
    return mT(e);
  });
}
function mT(t) {
  for (var e = 0, r = 0; r < t.length; ++r)
    e += t[r];
  return t.length % 2 === 1 ? e * 2 : e;
}
var MR = Nd(AR);
function AR(t, e) {
  t.eachRawSeries(function(r) {
    if (!t.isSeriesFiltered(r)) {
      var n = r.getData();
      n.hasItemVisual() && n.each(function(o) {
        var s = n.getItemVisual(o, "decal");
        if (s) {
          var l = n.ensureUniqueItemVisual(o, "style");
          l.decal = Bv(s, e);
        }
      });
      var i = n.getVisual("decal");
      if (i) {
        var a = n.getVisual("style");
        a.decal = Bv(i, e);
      }
    }
  });
}
var IR = 1, LR = 800, ER = 900, PR = 920, RR = 1e3, OR = 2e3, r0 = 5e3, yT = 1e3, kR = 1100, xp = 2e3, _T = 3e3, BR = 4e3, Vf = 4500, NR = 4600, FR = 5e3, HR = 6e3, ST = 7e3, zR = {
  PROCESSOR: {
    SERIES_FILTER: LR,
    AXIS_STATISTICS: PR,
    FILTER: RR,
    STATISTIC: r0,
    STATISTICS: r0
  },
  VISUAL: {
    LAYOUT: yT,
    PROGRESSIVE_LAYOUT: kR,
    GLOBAL: xp,
    CHART: _T,
    POST_CHART_LAYOUT: NR,
    COMPONENT: BR,
    BRUSH: FR,
    CHART_ITEM: Vf,
    ARIA: HR,
    DECAL: ST
  }
}, ie = "__flagInMainProcess", Rl = "__mainProcessVersion", ue = "__pendingUpdate", oh = "__needsUpdateStatus", n0 = /^[a-zA-Z0-9_]+$/, sh = "__connectUpdateStatus", i0 = 0, VR = 1, UR = 2;
function bT(t) {
  return function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return wT(this, t, e);
  };
}
function TT(t) {
  return function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return wT(this, t, e);
  };
}
function wT(t, e, r) {
  return r[0] = r[0] && r[0].toLowerCase(), dn.prototype[e].apply(t, r);
}
var xT = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e;
  })(dn)
), CT = xT.prototype;
CT.on = TT("on");
CT.off = TT("off");
var Ni, lh, Ol, bn, kl, uh, fh, _a, Sa, a0, o0, ch, s0, Bl, l0, DT, Qe, u0, ba, MT = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r, n, i) {
      var a = t.call(this, new W2()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], i = i || {}, a.__v_skip = !0, a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      a[Rl] = 1, i.ssr;
      var u = a._zr = sm(r, {
        renderer: i.renderer || o,
        devicePixelRatio: i.devicePixelRatio,
        width: i.width,
        height: i.height,
        ssr: i.ssr,
        useDirtyRect: vt(i.useDirtyRect, l),
        useCoarsePointer: vt(i.useCoarsePointer, s),
        pointerSize: i.pointerSize
      });
      a._ssr = i.ssr, a._throttledZrFlush = tT(Xt(u.flush, u), 17), a._updateTheme(n), a._locale = BE(i.locale || vb), a._coordSysMgr = new gp();
      var f = a._api = l0(a);
      function c(h, v) {
        return h.__prio - v.__prio;
      }
      return Zl(qu, c), Zl(Hv, c), a._scheduler = new iT(a, f, Hv, qu), a._messageCenter = new xT(), a._initEvents(), a.resize = Xt(a.resize, a), u.animation.on("frame", a._onframe, a), a0(u, a), o0(u, a), Vh(a), a;
    }
    return e.prototype._onframe = function() {
      if (!this._disposed) {
        var r = this._scheduler, n = this._model, i = this._api;
        if (u0(this), this[ue]) {
          var a = this[ue].silent;
          this[ie] = !0, ba(this);
          try {
            Ni(this), bn.update.call(this, null, this[ue].updateParams);
          } catch (l) {
            throw this[ie] = !1, this[ue] = null, l;
          }
          this._zr.flush(), this[ie] = !1, this[ue] = null, _a.call(this, a), Sa.call(this, a);
        } else if (r.unfinished) {
          var o = IR;
          do {
            r.unfinished = !1;
            var s = Ke.getTime();
            r.performSeriesTasks(n), r.performDataProcessorTasks(n), uh(this, n), r.performVisualTasks(n), Bl(this, this._model, i, "remain", {}), o -= Ke.getTime() - s;
          } while (o > 0 && r.unfinished);
          r.unfinished || this._zr.flush();
        }
      }
    }, e.prototype.getDom = function() {
      return this._dom;
    }, e.prototype.getId = function() {
      return this.id;
    }, e.prototype.getZr = function() {
      return this._zr;
    }, e.prototype.isSSR = function() {
      return this._ssr;
    }, e.prototype.setOption = function(r, n, i) {
      if (!this[ie]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (ft(n) && (i = n.lazyUpdate, a = n.silent, o = n.replaceMerge, s = n.transition, n = n.notMerge), this[ie] = !0, ba(this), !this._model || n) {
          var l = new TP(this._api), u = this._theme, f = this._model = new _p();
          f.scheduler = this._scheduler, f.ssr = this._ssr, f.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, zv);
        var c = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (i)
          this[ue] = {
            silent: a,
            updateParams: c
          }, this[ie] = !1, this.getZr().wakeUp();
        else {
          try {
            Ni(this), bn.update.call(this, null, c);
          } catch (h) {
            throw this[ue] = null, this[ie] = !1, h;
          }
          this._ssr || this._zr.flush(), this[ue] = null, this[ie] = !1, _a.call(this, a), Sa.call(this, a);
        }
      }
    }, e.prototype.setTheme = function(r, n) {
      if (!this[ie]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var i = this._model;
        if (i) {
          var a = n && n.silent, o = null;
          this[ue] && (a == null && (a = this[ue].silent), o = this[ue].updateParams, this[ue] = null), this[ie] = !0, ba(this);
          try {
            this._updateTheme(r), i.setTheme(this._theme), Ni(this), bn.update.call(this, {
              type: "setTheme"
            }, o);
          } catch (s) {
            throw this[ie] = !1, s;
          }
          this[ie] = !1, _a.call(this, a), Sa.call(this, a);
        }
      }
    }, e.prototype._updateTheme = function(r) {
      at(r) && (r = AT[r]), r && (r = xt(r), r && kb(r, !0), this._theme = r);
    }, e.prototype.getModel = function() {
      return this._model;
    }, e.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, e.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, e.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, e.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || Tt.hasGlobalWindow && window.devicePixelRatio || 1;
    }, e.prototype.getRenderedCanvas = function(r) {
      return this.renderToCanvas(r);
    }, e.prototype.renderToCanvas = function(r) {
      r = r || {};
      var n = this._zr.painter;
      return n.getRenderedCanvas({
        backgroundColor: r.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: r.pixelRatio || this.getDevicePixelRatio()
      });
    }, e.prototype.renderToSVGString = function(r) {
      r = r || {};
      var n = this._zr.painter;
      return n.renderToString({
        useViewBox: r.useViewBox
      });
    }, e.prototype.getSvgDataURL = function() {
      var r = this._zr, n = r.storage.getDisplayList();
      return P(n, function(i) {
        i.stopAnimation(null, !0);
      }), r.painter.toDataURL();
    }, e.prototype.getDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      r = r || {};
      var n = r.excludeComponents, i = this._model, a = [], o = this;
      P(n, function(l) {
        i.eachComponent({
          mainType: l
        }, function(u) {
          var f = o._componentsMap[u.__viewId];
          f.group.ignore || (a.push(f), f.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(r).toDataURL("image/" + (r && r.type || "png"));
      return P(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, e.prototype.getConnectedDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = r.type === "svg", i = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (f0[i]) {
        var l = s, u = s, f = -s, c = -s, h = [], v = r && r.pixelRatio || this.getDevicePixelRatio();
        P(is, function(_, S) {
          if (_.group === i) {
            var b = n ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(xt(r)), T = _.getDom().getBoundingClientRect();
            l = a(T.left, l), u = a(T.top, u), f = o(T.right, f), c = o(T.bottom, c), h.push({
              dom: b,
              left: T.left,
              top: T.top
            });
          }
        }), l *= v, u *= v, f *= v, c *= v;
        var d = f - l, p = c - u, m = Ke.createCanvas(), g = sm(m, {
          renderer: n ? "svg" : "canvas"
        });
        if (g.resize({
          width: d,
          height: p
        }), n) {
          var y = "";
          return P(h, function(_) {
            var S = _.left - l, b = _.top - u;
            y += '<g transform="translate(' + S + "," + b + ')">' + _.dom + "</g>";
          }), g.painter.getSvgRoot().innerHTML = y, r.connectedBackgroundColor && g.painter.setBackgroundColor(r.connectedBackgroundColor), g.refreshImmediately(), g.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && g.add(new se({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: p
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), P(h, function(_) {
            var S = new hi({
              style: {
                x: _.left * v - l,
                y: _.top * v - u,
                image: _.dom
              }
            });
            g.add(S);
          }), g.refreshImmediately(), m.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, e.prototype.convertToPixel = function(r, n, i) {
      return kl(this, "convertToPixel", r, n, i);
    }, e.prototype.convertToLayout = function(r, n, i) {
      return kl(this, "convertToLayout", r, n, i);
    }, e.prototype.convertFromPixel = function(r, n, i) {
      return kl(this, "convertFromPixel", r, n, i);
    }, e.prototype.containPixel = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = this._model, a, o = Ec(i, r);
      return P(o, function(s, l) {
        l.indexOf("Models") >= 0 && P(s, function(u) {
          var f = u.coordinateSystem;
          if (f && f.containPoint)
            a = a || !!f.containPoint(n);
          else if (l === "seriesModels") {
            var c = this._chartsMap[u.__viewId];
            c && c.containPoint && (a = a || c.containPoint(n, u));
          }
        }, this);
      }, this), !!a;
    }, e.prototype.getVisual = function(r, n) {
      var i = this._model, a = Ec(i, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? X2(s, l, n) : K2(s, n);
    }, e.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, e.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, e.prototype._initEvents = function() {
      var r = this;
      P(GR, function(i) {
        var a = function(o) {
          var s = r.getModel(), l = o.target, u, f = i === "globalout";
          if (f ? u = {} : l && No(l, function(p) {
            var m = Bt(p);
            if (m && m.dataIndex != null) {
              var g = m.dataModel || s.getSeriesByIndex(m.seriesIndex);
              return u = g && g.getDataParams(m.dataIndex, m.dataType, l) || {}, !0;
            } else if (m.eventData)
              return u = q({}, m.eventData), !0;
          }, !0), u) {
            var c = u.componentType, h = u.componentIndex;
            (c === "markLine" || c === "markPoint" || c === "markArea") && (c = "series", h = u.seriesIndex);
            var v = c && h != null && s.getComponent(c, h), d = v && r[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            u.event = o, u.type = i, r._$eventProcessor.eventInfo = {
              targetEl: l,
              packedEvent: u,
              model: v,
              view: d
            }, r.trigger(i, u);
          }
        };
        a.zrEventfulCallAtLast = !0, r._zr.on(i, a, r);
      });
      var n = this._messageCenter;
      P(Fv, function(i, a) {
        n.on(a, function(o) {
          r.trigger(a, o);
        });
      }), q2(n, this, this._api);
    }, e.prototype.isDisposed = function() {
      return this._disposed;
    }, e.prototype.clear = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, e.prototype.dispose = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._disposed = !0;
      var r = this.getDom();
      r && mS(this.getDom(), Dp, "");
      var n = this, i = n._api, a = n._model;
      P(n._componentsViews, function(o) {
        o.dispose(a, i);
      }), P(n._chartsViews, function(o) {
        o.dispose(a, i);
      }), n._zr.dispose(), n._dom = n._model = n._chartsMap = n._componentsMap = n._chartsViews = n._componentsViews = n._scheduler = n._api = n._zr = n._throttledZrFlush = n._theme = n._coordSysMgr = n._messageCenter = null, delete is[n.id];
    }, e.prototype.resize = function(r) {
      if (!this[ie]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var n = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!n) {
          var i = n.resetOption("media"), a = r && r.silent;
          this[ue] && (a == null && (a = this[ue].silent), i = !0, this[ue] = null), this[ie] = !0, ba(this);
          try {
            i && Ni(this), bn.update.call(this, {
              type: "resize",
              animation: q({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[ie] = !1, o;
          }
          this[ie] = !1, _a.call(this, a), Sa.call(this, a);
        }
      }
    }, e.prototype.showLoading = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (ft(r) && (n = r, r = ""), r = r || "default", this.hideLoading(), !!Vv[r]) {
        var i = Vv[r](this._api, n), a = this._zr;
        this._loadingFX = i, a.add(i);
      }
    }, e.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, e.prototype.makeActionFromEvent = function(r) {
      var n = q({}, r);
      return n.type = Nv[r.type], n;
    }, e.prototype.dispatchAction = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (ft(n) || (n = {
        silent: !!n
      }), !!Ku[r.type] && this._model) {
        if (this[ie]) {
          this._pendingActions.push(r);
          return;
        }
        var i = n.silent;
        fh.call(this, r, i);
        var a = n.flush;
        a ? this._zr.flush() : a !== !1 && Tt.browser.weChat && this._throttledZrFlush(), _a.call(this, i), Sa.call(this, i);
      }
    }, e.prototype.updateLabelLayout = function() {
      er.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, e.prototype.appendData = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = r.seriesIndex, i = this.getModel(), a = i.getSeriesByIndex(n);
      a.appendData(r), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, e.internalField = (function() {
      Ni = function(c) {
        J2(c._model);
        var h = c._scheduler;
        h.restorePipelines(c._zr, c._model), h.prepareStageTasks(), lh(c, !0), lh(c, !1), h.plan();
      }, lh = function(c, h) {
        for (var v = c._model, d = c._scheduler, p = h ? c._componentsViews : c._chartsViews, m = h ? c._componentsMap : c._chartsMap, g = c._zr, y = c._api, _ = 0; _ < p.length; _++)
          p[_].__alive = !1;
        h ? v.eachComponent(function(T, C) {
          T !== "series" && S(C);
        }) : v.eachSeries(S);
        function S(T) {
          var C = T.__requireNewView;
          T.__requireNewView = !1;
          var E = "_ec_" + T.id + "_" + T.type, A = !C && m[E];
          if (!A) {
            var M = qr(T.type), R = h ? cn.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              nn.getClass(M.sub)
            );
            A = new R(), A.init(v, y), m[E] = A, p.push(A), g.add(A.group);
          }
          T.__viewId = A.__id = E, A.__alive = !0, A.__model = T, A.group.__ecComponentInfo = {
            mainType: T.mainType,
            index: T.componentIndex
          }, !h && d.prepareView(A, T, v, y);
        }
        for (var _ = 0; _ < p.length; ) {
          var b = p[_];
          b.__alive ? _++ : (!h && b.renderTask.dispose(), g.remove(b.group), b.dispose(v, y), p.splice(_, 1), m[b.__id] === b && delete m[b.__id], b.__id = b.group.__ecComponentInfo = null);
        }
      }, Ol = function(c, h, v, d, p) {
        var m = c._model;
        if (m.setUpdatePayload(v), !d) {
          P([].concat(c._componentsViews).concat(c._chartsViews), S);
          return;
        }
        var g = VA(v, d, p), y = v.excludeSeriesId, _;
        y != null && (_ = gt(), P(Re(y), function(b) {
          var T = en(b, null);
          T != null && _.set(T, !0);
        })), m && m.eachComponent(g, function(b) {
          var T = _ && _.get(b.id) != null;
          if (!T)
            if (Wm(v))
              if (b instanceof ui)
                v.type === Qi && !v.notBlur && !b.get(["emphasis", "disabled"]) && uL(b, v, c._api);
              else {
                var C = Wd(b.mainType, b.componentIndex, v.name, c._api), E = C.focusSelf, A = C.dispatchers;
                v.type === Qi && E && !v.notBlur && gv(b.mainType, b.componentIndex, c._api), A && P(A, function(M) {
                  v.type === Qi ? Nu(M) : Fu(M);
                });
              }
            else Sv(v) && b instanceof ui && (hL(b, v, c._api), Vm(b), Qe(c));
        }, c), m && m.eachComponent(g, function(b) {
          var T = _ && _.get(b.id) != null;
          T || S(c[d === "series" ? "_chartsMap" : "_componentsMap"][b.__viewId]);
        }, c);
        function S(b) {
          b && b.__alive && b[h] && b[h](b.__model, m, c._api, v);
        }
      }, bn = {
        prepareAndUpdate: function(c) {
          Ni(this), bn.update.call(this, c, c && {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: c.newOption != null
          });
        },
        update: function(c, h) {
          var v = this._model, d = this._api, p = this._zr, m = this._coordSysMgr, g = this._scheduler;
          if (v) {
            Q2(v), v.setUpdatePayload(c), g.restoreData(v, c), g.performSeriesTasks(v), m.create(v, d), er.trigger("coordsys:aftercreate", v, d), g.performDataProcessorTasks(v, c), uh(this, v), m.update(v, d), n(v), g.performVisualTasks(v, c);
            var y = v.get("backgroundColor") || "transparent";
            p.setBackgroundColor(y);
            var _ = v.get("darkMode");
            _ != null && _ !== "auto" && p.setDarkMode(_), ch(this, v, d, c, h), er.trigger("afterupdate", v, d);
          }
        },
        /**
         * PENDING: See INCONSISTENCY_OF_BRUSH_SELECTED_EVENT_IN_UPDATE_TRANSFORM
         */
        updateTransform: function(c) {
          var h = this, v = h._model, d = h._api;
          if (v) {
            v.setUpdatePayload(c);
            var p = [];
            v.eachComponent(function(g, y) {
              if (g !== ES) {
                var _ = h.getViewOfComponentModel(y);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var S = _.updateTransform(y, v, d, c);
                    S && S.update && p.push(_);
                  } else
                    p.push(_);
              }
            });
            var m = gt();
            v.eachSeries(function(g) {
              var y = h._chartsMap[g.__viewId], _ = g.pipelineContext;
              if (y.updateTransform && !_.progressiveRender) {
                var S = y.updateTransform(g, v, d, c);
                S && S.update && m.set(g.uid, 1);
              } else
                m.set(g.uid, 1);
            }), h._scheduler.performVisualTasks(v, c, {
              setDirty: !0,
              dirtyMap: m
            }), Bl(h, v, d, c, {}, m), er.trigger("afterupdate", v, d);
          }
        },
        updateView: function(c) {
          var h = this._model;
          h && (h.setUpdatePayload(c), nn.markUpdateMethod(c, "updateView"), n(h), this._scheduler.performVisualTasks(h, c, {
            setDirty: !0
          }), ch(this, h, this._api, c, {}), er.trigger("afterupdate", h, this._api));
        },
        updateVisual: function(c) {
          var h = this, v = this._model;
          v && (v.setUpdatePayload(c), v.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), nn.markUpdateMethod(c, "updateVisual"), n(v), this._scheduler.performVisualTasks(v, c, {
            visualType: "visual",
            setDirty: !0
          }), v.eachComponent(function(d, p) {
            if (d !== "series") {
              var m = h.getViewOfComponentModel(p);
              m && m.__alive && m.updateVisual(p, v, h._api, c);
            }
          }), v.eachSeries(function(d) {
            var p = h._chartsMap[d.__viewId];
            p.updateVisual(d, v, h._api, c);
          }), er.trigger("afterupdate", v, this._api));
        },
        /**
         * @deprecated
         */
        updateLayout: function(c) {
          bn.update.call(this, c);
        }
      };
      function r(c, h, v, d, p) {
        if (c._disposed) {
          c.id;
          return;
        }
        for (var m = c._model, g = c._coordSysMgr.getCoordinateSystems(), y, _ = Ec(m, v), S = 0; S < g.length; S++) {
          var b = g[S];
          if (b[h] && (y = b[h](m, _, d, p)) != null)
            return y;
        }
      }
      kl = r, uh = function(c, h) {
        var v = c._chartsMap, d = c._scheduler;
        h.eachSeries(function(p) {
          d.updateStreamModes(p, v[p.__viewId]);
        });
      }, fh = function(c, h) {
        var v = this, d = this.getModel(), p = c.type, m = c.escapeConnect, g = Ku[p], y = (g.update || "update").split(":"), _ = y.pop(), S = y[0] != null && qr(y[0]);
        this[ie] = !0, ba(this);
        var b = [c], T = !1;
        c.batch && (T = !0, b = pt(c.batch, function(H) {
          return H = Ht(q({}, H), c), H.batch = null, H;
        }));
        var C = [], E, A = [], M = g.nonRefinedEventType, R = Sv(c), B = Wm(c);
        if (B && GS(this._api), P(b, function(H) {
          var W = g.action(H, d, v._api);
          if (g.refineEvent ? A.push(W) : E = W, E = E || q({}, H), E.type = M, C.push(E), B) {
            var V = kd(c), j = V.queryOptionMap, rt = V.mainTypeSpecified, tt = rt ? j.keys()[0] : "series";
            Ol(v, _, H, tt), Qe(v);
          } else R ? (Ol(v, _, H, "series"), Qe(v)) : S && Ol(v, _, H, S.main, S.sub);
        }), _ !== "none" && !B && !R && !S)
          try {
            this[ue] ? (Ni(this), bn.update.call(this, c), this[ue] = null) : bn[_].call(this, c);
          } catch (H) {
            throw this[ie] = !1, H;
          }
        if (T ? E = {
          type: M,
          escapeConnect: m,
          batch: C
        } : E = C[0], this[ie] = !1, !h) {
          var O = void 0;
          if (g.refineEvent) {
            var F = g.refineEvent(A, c, d, this._api).eventContent;
            En(ft(F)), O = Ht({
              type: g.refinedEventType
            }, F), O.fromAction = c.type, O.fromActionPayload = c, O.escapeConnect = !0;
          }
          var U = this._messageCenter;
          U.trigger(E.type, E), O && U.trigger(O.type, O);
        }
      }, _a = function(c) {
        for (var h = this._pendingActions; h.length; ) {
          var v = h.shift();
          fh.call(this, v, c);
        }
      }, Sa = function(c) {
        !c && this.trigger("updated");
      }, a0 = function(c, h) {
        c.on("rendered", function(v) {
          h.trigger("rendered", v), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          c.animation.isFinished() && !h[ue] && !h._scheduler.unfinished && !h._pendingActions.length ? h.trigger("finished") : c.refresh();
        });
      }, o0 = function(c, h) {
        c.on("mouseover", function(v) {
          var d = v.target, p = No(d, _v);
          p && (fL(p, v, h._api), Qe(h));
        }).on("mouseout", function(v) {
          var d = v.target, p = No(d, _v);
          p && (cL(p, v, h._api), Qe(h));
        }).on("click", function(v) {
          var d = v.target, p = No(d, function(y) {
            return Bt(y).dataIndex != null;
          }, !0);
          if (p) {
            var m = p.selected ? "unselect" : "select", g = Bt(p);
            h._api.dispatchAction({
              type: m,
              dataType: g.dataType,
              dataIndexInside: g.dataIndex,
              seriesIndex: g.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function n(c) {
        c.clearColorPalette(), c.eachSeries(function(h) {
          h.clearColorPalette();
        });
      }
      function i(c) {
        var h = [], v = [], d = !1;
        if (c.eachComponent(function(y, _) {
          var S = _.get("zlevel") || 0, b = _.get("z") || 0, T = _.getZLevelKey();
          d = d || !!T, (y === "series" ? v : h).push({
            zlevel: S,
            z: b,
            idx: _.componentIndex,
            type: y,
            key: T
          });
        }), d) {
          var p = h.concat(v), m, g;
          Zl(p, function(y, _) {
            return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
          }), P(p, function(y) {
            var _ = c.getComponent(y.type, y.idx), S = y.zlevel, b = y.key;
            m != null && (S = Math.max(m, S)), b ? (S === m && b !== g && S++, g = b) : g && (S === m && S++, g = ""), m = S, _.setZLevel(S);
          });
        }
      }
      ch = function(c, h, v, d, p) {
        i(h), s0(c, h, v, d, p), P(c._chartsViews, function(m) {
          m.__alive = !1;
        }), Bl(c, h, v, d, p), P(c._chartsViews, function(m) {
          m.__alive || m.remove(h, v);
        });
      }, s0 = function(c, h, v, d, p, m) {
        P(m || c._componentsViews, function(g) {
          var y = g.__model;
          u(y, g), g.render(y, h, v, d), l(y, g), f(y, g);
        });
      }, Bl = function(c, h, v, d, p, m) {
        var g = c._scheduler;
        p = q(p || {}, {
          updatedSeries: h.getSeries()
        }), er.trigger("series:beforeupdate", h, v, p);
        var y = !1;
        h.eachSeries(function(_) {
          var S = c._chartsMap[_.__viewId];
          S.__alive = !0;
          var b = S.renderTask;
          g.updatePayload(b, d), u(_, S), m && m.get(_.uid) && b.dirty(), b.perform(g.getPerformArgs(b)) && (y = !0), S.group.silent = !!_.get("silent"), s(_, S), Vm(_);
        }), g.unfinished = y || g.unfinished, er.trigger("series:layoutlabels", h, v, p), er.trigger("series:transition", h, v, p), h.eachSeries(function(_) {
          var S = c._chartsMap[_.__viewId];
          l(_, S), f(_, S);
        }), o(c, h), er.trigger("series:afterupdate", h, v, p);
      }, Qe = function(c) {
        c[oh] = !0, c.getZr().wakeUp();
      }, ba = function(c) {
        c[Rl] = (c[Rl] + 1) % 1e6;
      }, u0 = function(c) {
        c[oh] && (c.getZr().storage.traverse(function(h) {
          Qo(h) || a(h);
        }), c[oh] = !1);
      };
      function a(c) {
        for (var h = [], v = c.currentStates, d = 0; d < v.length; d++) {
          var p = v[d];
          p === "emphasis" || p === "blur" || p === "select" || h.push(p);
        }
        c.selected && c.states.select && h.push("select"), c.hoverState === Lf && c.states.emphasis ? h.push("emphasis") : c.hoverState === If && c.states.blur && h.push("blur"), c.useStates(h);
      }
      function o(c, h) {
        var v = c._zr;
        if (v.painter.type === "canvas") {
          var d = v.storage, p = 0;
          d.traverse(function(g) {
            g.isGroup || p++;
          });
          var m = p > vt(h.get("hoverLayerThreshold"), Lb.hoverLayerThreshold) && !Tt.node && !Tt.worker;
          (c._usingTHL || m) && (h.eachSeries(function(g) {
            if (!g.preventUsingHoverLayer) {
              var y = c._chartsMap[g.__viewId];
              y.__alive && y.eachRendered(function(_) {
                var S = _.states.emphasis;
                S && S.hoverLayer !== jd && (S.hoverLayer = m ? eb : tb);
              });
            }
          }), c._usingTHL = m);
        }
      }
      function s(c, h) {
        var v = c.get("blendMode") || null;
        h.eachRendered(function(d) {
          d.isGroup || (d.style.blend = v);
        });
      }
      function l(c, h) {
        if (!c.preventAutoZ) {
          var v = sb(c);
          h.eachRendered(function(d) {
            return lb(d, v.z, v.zlevel), !0;
          });
        }
      }
      function u(c, h) {
        h.eachRendered(function(v) {
          if (!Qo(v)) {
            var d = v.getTextContent(), p = v.getTextGuideLine();
            v.stateTransition && (v.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), p && p.stateTransition && (p.stateTransition = null), v.hasState() ? (v.prevStates = v.currentStates, v.clearStates()) : v.prevStates && (v.prevStates = null);
          }
        });
      }
      function f(c, h) {
        var v = c.getModel("stateAnimation"), d = c.isAnimationEnabled(), p = v.get("duration"), m = p > 0 ? {
          duration: p,
          delay: v.get("delay"),
          easing: v.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        h.eachRendered(function(g) {
          if (g.states && g.states.emphasis) {
            if (Qo(g))
              return;
            if (g instanceof Gt && yL(g), g.__dirty) {
              var y = g.prevStates;
              y && g.useStates(y);
            }
            if (d) {
              g.stateTransition = m;
              var _ = g.getTextContent(), S = g.getTextGuideLine();
              _ && (_.stateTransition = m), S && (S.stateTransition = m);
            }
            g.__dirty && a(g);
          }
        });
      }
      l0 = function(c) {
        return new /** @class */
        ((function(h) {
          Q(v, h);
          function v() {
            return h !== null && h.apply(this, arguments) || this;
          }
          return v.prototype.getCoordinateSystems = function() {
            return c._coordSysMgr.getCoordinateSystems();
          }, v.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var p = d.__ecComponentInfo;
              if (p != null)
                return c._model.getComponent(p.mainType, p.index);
              d = d.parent;
            }
          }, v.prototype.enterEmphasis = function(d, p) {
            Nu(d, p), Qe(c);
          }, v.prototype.leaveEmphasis = function(d, p) {
            Fu(d, p), Qe(c);
          }, v.prototype.enterBlur = function(d) {
            lL(d), Qe(c);
          }, v.prototype.leaveBlur = function(d) {
            HS(d), Qe(c);
          }, v.prototype.enterSelect = function(d) {
            zS(d), Qe(c);
          }, v.prototype.leaveSelect = function(d) {
            VS(d), Qe(c);
          }, v.prototype.getModel = function() {
            return c.getModel();
          }, v.prototype.getViewOfComponentModel = function(d) {
            return c.getViewOfComponentModel(d);
          }, v.prototype.getViewOfSeriesModel = function(d) {
            return c.getViewOfSeriesModel(d);
          }, v.prototype.getECUpdateCycleVersion = function() {
            return c[Rl];
          }, v.prototype.usingTHL = function() {
            return c._usingTHL;
          }, v;
        })(OS))(c);
      }, DT = function(c) {
        function h(v, d) {
          for (var p = 0; p < v.length; p++) {
            var m = v[p];
            m[sh] = d;
          }
        }
        P(Nv, function(v, d) {
          c._messageCenter.on(d, function(p) {
            if (f0[c.group] && c[sh] !== i0) {
              if (p && p.escapeConnect)
                return;
              var m = c.makeActionFromEvent(p), g = [];
              P(is, function(y) {
                y !== c && y.group === c.group && g.push(y);
              }), h(g, i0), P(g, function(y) {
                y[sh] !== VR && y.dispatchAction(m);
              }), h(g, UR);
            }
          });
        });
      };
    })(), e;
  })(dn)
), Cp = MT.prototype;
Cp.on = bT("on");
Cp.off = bT("off");
Cp.one = function(t, e, r) {
  var n = this;
  function i() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    e && e.apply && e.apply(this, a), n.off(t, i);
  }
  this.on.call(this, t, i, r);
};
var GR = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Ku = {}, Nv = {}, Fv = {}, Hv = [], zv = [], qu = [], AT = {}, Vv = {}, is = {}, f0 = {}, WR = +/* @__PURE__ */ new Date() - 0, Dp = "_echarts_instance_";
function YR(t, e, r) {
  {
    var n = $R(t);
    if (n)
      return n;
  }
  var i = new MT(t, e, r);
  return i.id = "ec_" + WR++, is[i.id] = i, mS(t, Dp, i.id), DT(i), er.trigger("afterinit", i), i;
}
function $R(t) {
  return is[UA(t, Dp)];
}
function IT(t, e) {
  AT[t] = e;
}
function LT(t) {
  At(zv, t) < 0 && zv.push(t);
}
function ET(t, e) {
  Ap(Hv, t, e, OR);
}
function XR(t) {
  Mp("afterinit", t);
}
function KR(t) {
  Mp("afterupdate", t);
}
function Mp(t, e) {
  er.on(t, e);
}
function ao(t, e, r) {
  var n, i, a, o, s;
  _t(e) && (r = e, e = ""), ft(t) ? (n = t.type, i = t.event, o = t.update, s = t.publishNonRefinedEvent, r || (r = t.action), a = t.refineEvent) : (n = t, i = e);
  function l(f) {
    return f.toLowerCase();
  }
  i = l(i || n);
  var u = a ? l(n) : i;
  Ku[n] || (En(n0.test(n) && n0.test(i)), a && En(i !== n), Ku[n] = {
    actionType: n,
    refinedEventType: i,
    nonRefinedEventType: u,
    update: o,
    action: r,
    refineEvent: a
  }, Fv[i] = 1, a && s && (Fv[u] = 1), Nv[u] = n);
}
function qR(t, e) {
  gp.register(t, e);
}
function ZR(t, e) {
  Ap(qu, t, e, yT, "layout");
}
function oa(t, e) {
  Ap(qu, t, e, _T, "visual");
}
var c0 = [];
function Ap(t, e, r, n, i, a) {
  if ((_t(e) || ft(e)) && (r = e, e = n), !(At(c0, r) >= 0)) {
    c0.push(r);
    var o = iT.wrapStageHandler(r, i);
    o.__prio = e, o.__raw = r, t.push(o);
  }
}
function PT(t, e) {
  Vv[t] = e;
}
function jR(t, e, r) {
  var n = j2("registerMap");
  n && n(t, e, r);
}
var JR = e2;
oa(xp, E2);
oa(Vf, P2);
oa(Vf, R2);
oa(xp, Y2);
oa(Vf, $2);
oa(ST, MR);
LT(kb);
ET(ER, OP);
PT("default", O2);
ao({
  type: Qi,
  event: Qi,
  update: Qi
}, we);
ao({
  type: nu,
  event: nu,
  update: nu
}, we);
ao({
  type: ku,
  event: Ud,
  update: ku,
  action: we,
  refineEvent: Ip,
  publishNonRefinedEvent: !0
});
ao({
  type: dv,
  event: Ud,
  update: dv,
  action: we,
  refineEvent: Ip,
  publishNonRefinedEvent: !0
});
ao({
  type: Bu,
  event: Ud,
  update: Bu,
  action: we,
  refineEvent: Ip,
  publishNonRefinedEvent: !0
});
function Ip(t, e, r, n) {
  return {
    eventContent: {
      selected: vL(r),
      isFromClick: e.isFromClick || !1
    }
  };
}
IT("default", {});
IT("dark", lT);
function So(t) {
  return t == null ? 0 : t.length || 1;
}
function h0(t) {
  return t;
}
var QR = (
  /** @class */
  (function() {
    function t(e, r, n, i, a, o) {
      this._old = e, this._new = r, this._oldKeyGetter = n || h0, this._newKeyGetter = i || h0, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return t.prototype.add = function(e) {
      return this._add = e, this;
    }, t.prototype.update = function(e) {
      return this._update = e, this;
    }, t.prototype.updateManyToOne = function(e) {
      return this._updateManyToOne = e, this;
    }, t.prototype.updateOneToMany = function(e) {
      return this._updateOneToMany = e, this;
    }, t.prototype.updateManyToMany = function(e) {
      return this._updateManyToMany = e, this;
    }, t.prototype.remove = function(e) {
      return this._remove = e, this;
    }, t.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, t.prototype._executeOneToOne = function() {
      var e = this._old, r = this._new, n = {}, i = new Array(e.length), a = new Array(r.length);
      this._initIndexMap(e, null, i, "_oldKeyGetter"), this._initIndexMap(r, n, a, "_newKeyGetter");
      for (var o = 0; o < e.length; o++) {
        var s = i[o], l = n[s], u = So(l);
        if (u > 1) {
          var f = l.shift();
          l.length === 1 && (n[s] = l[0]), this._update && this._update(f, o);
        } else u === 1 ? (n[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, n);
    }, t.prototype._executeMultiple = function() {
      var e = this._old, r = this._new, n = {}, i = {}, a = [], o = [];
      this._initIndexMap(e, n, a, "_oldKeyGetter"), this._initIndexMap(r, i, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = n[l], f = i[l], c = So(u), h = So(f);
        if (c > 1 && h === 1)
          this._updateManyToOne && this._updateManyToOne(f, u), i[l] = null;
        else if (c === 1 && h > 1)
          this._updateOneToMany && this._updateOneToMany(f, u), i[l] = null;
        else if (c === 1 && h === 1)
          this._update && this._update(f, u), i[l] = null;
        else if (c > 1 && h > 1)
          this._updateManyToMany && this._updateManyToMany(f, u), i[l] = null;
        else if (c > 1)
          for (var v = 0; v < c; v++)
            this._remove && this._remove(u[v]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, i);
    }, t.prototype._performRestAdd = function(e, r) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n], a = r[i], o = So(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        r[i] = null;
      }
    }, t.prototype._initIndexMap = function(e, r, n, i) {
      for (var a = this._diffModeMultiple, o = 0; o < e.length; o++) {
        var s = "_ec_" + this[i](e[o], o);
        if (a || (n[o] = s), !!r) {
          var l = r[s], u = So(l);
          u === 0 ? (r[s] = o, a && n.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, t;
  })()
), tO = (
  /** @class */
  (function() {
    function t(e, r) {
      this._encode = e, this._schema = r;
    }
    return t.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, t.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, t;
  })()
);
function eO(t, e) {
  var r = {}, n = r.encode = {}, i = gt(), a = [], o = [], s = {};
  P(t.dimensions, function(h) {
    var v = t.getDimensionInfo(h), d = v.coordDim;
    if (d) {
      var p = v.coordDimIndex;
      hh(n, d)[p] = h, v.isExtraCoord || (i.set(d, 1), nO(v.type) && (a[0] = h), hh(s, d)[p] = t.getDimensionIndex(v.name)), v.defaultTooltip && o.push(h);
    }
    PS.each(function(m, g) {
      var y = hh(n, g), _ = v.otherDims[g];
      _ != null && _ !== !1 && (y[_] = v.name);
    });
  });
  var l = [], u = {};
  i.each(function(h, v) {
    var d = n[v];
    u[v] = d[0], l = l.concat(d);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = pt(l, function(h) {
    return t.getDimensionInfo(h).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var f = n.label;
  f && f.length && (a = f.slice());
  var c = n.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), n.defaultedLabel = a, n.defaultedTooltip = o, r.userOutput = new tO(s, e), r;
}
function hh(t, e) {
  return t.hasOwnProperty(e) || (t[e] = []), t[e];
}
function rO(t) {
  return t === "category" ? "ordinal" : t === "time" ? "time" : "float";
}
function nO(t) {
  return !(t === "ordinal" || t === "time");
}
var cu = (
  /** @class */
  /* @__PURE__ */ (function() {
    function t(e) {
      this.otherDims = {}, e != null && q(this, e);
    }
    return t;
  })()
), iO = Wt(), aO = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, RT = (
  /** @class */
  (function() {
    function t(e) {
      this.dimensions = e.dimensions, this._dimOmitted = e.dimensionOmitted, this.source = e.source, this._fullDimCount = e.fullDimensionCount, this._updateDimOmitted(e.dimensionOmitted);
    }
    return t.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, t.prototype._updateDimOmitted = function(e) {
      this._dimOmitted = e, e && (this._dimNameMap || (this._dimNameMap = kT(this.source)));
    }, t.prototype.getSourceDimensionIndex = function(e) {
      return vt(this._dimNameMap.get(e), -1);
    }, t.prototype.getSourceDimension = function(e) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[e];
    }, t.prototype.makeStoreSchema = function() {
      for (var e = this._fullDimCount, r = Fb(this.source), n = !BT(e), i = "", a = [], o = 0, s = 0; o < e; o++) {
        var l = void 0, u = void 0, f = void 0, c = this.dimensions[s];
        if (c && c.storeDimIndex === o)
          l = r ? c.name : null, u = c.type, f = c.ordinalMeta, s++;
        else {
          var h = this.getSourceDimension(o);
          h && (l = r ? h.name : null, u = h.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: f
        }), r && l != null && (!c || !c.isCalculationCoord) && (i += n ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), i += "$", i += aO[u] || "f", f && (i += f.uid), i += "$";
      }
      var v = this.source, d = [v.seriesLayoutBy, v.startIndex, i].join("$$");
      return {
        dimensions: a,
        hash: d
      };
    }, t.prototype.makeOutputDimensionNames = function() {
      for (var e = [], r = 0, n = 0; r < this._fullDimCount; r++) {
        var i = void 0, a = this.dimensions[n];
        if (a && a.storeDimIndex === r)
          a.isCalculationCoord || (i = a.name), n++;
        else {
          var o = this.getSourceDimension(r);
          o && (i = o.name);
        }
        e.push(i);
      }
      return e;
    }, t.prototype.appendCalculationDimension = function(e) {
      this.dimensions.push(e), e.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, t;
  })()
);
function OT(t) {
  return t instanceof RT;
}
function Lp(t) {
  for (var e = gt(), r = 0; r < (t || []).length; r++) {
    var n = t[r], i = ft(n) ? n.name : n;
    i != null && e.get(i) == null && e.set(i, r);
  }
  return e;
}
function kT(t) {
  var e = iO(t);
  return e.dimNameMap || (e.dimNameMap = Lp(t.dimensionsDefine));
}
function BT(t) {
  return t > 30;
}
var bo = ft, Vn = pt, oO = typeof Int32Array > "u" ? Array : Int32Array, sO = "e\0\0", v0 = -1, lO = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], uO = ["_approximateExtent"], d0, Nl, To, wo, vh, xo, dh, fO = (
  /** @class */
  (function() {
    function t(e, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var n, i = !1;
      OT(e) ? (n = e.dimensions, this._dimOmitted = e.isDimensionOmitted(), this._schema = e) : (i = !0, n = e), n = n || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, f = 0; f < n.length; f++) {
        var c = n[f], h = at(c) ? new cu({
          name: c
        }) : c instanceof cu ? c : new cu(c), v = h.name;
        h.type = h.type || "float", h.coordDim || (h.coordDim = v, h.coordDimIndex = 0);
        var d = h.otherDims = h.otherDims || {};
        o.push(v), a[v] = h, u[v] != null && (l = !0), h.createInvertedIndices && (s[v] = []), i && (h.storeDimIndex = f), d.itemName === 0 && (this._nameDimIdx = h.storeDimIndex), d.itemId === 0 && (this._idDimIdx = h.storeDimIndex);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var p = this._dimIdxToName = gt();
        P(o, function(m) {
          p.set(a[m].storeDimIndex, m);
        });
      }
    }
    return t.prototype.getDimension = function(e) {
      var r = this._recognizeDimIndex(e);
      if (r == null)
        return e;
      if (r = e, !this._dimOmitted)
        return this.dimensions[r];
      var n = this._dimIdxToName.get(r);
      if (n != null)
        return n;
      var i = this._schema.getSourceDimension(r);
      if (i)
        return i.name;
    }, t.prototype.getDimensionIndex = function(e) {
      var r = this._recognizeDimIndex(e);
      if (r != null)
        return r;
      if (e == null)
        return -1;
      var n = this._getDimInfo(e);
      return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(e) : -1;
    }, t.prototype._recognizeDimIndex = function(e) {
      if (qt(e) || e != null && !isNaN(e) && !this._getDimInfo(e) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(e) < 0))
        return +e;
    }, t.prototype._getStoreDimIndex = function(e) {
      var r = this.getDimensionIndex(e);
      return r;
    }, t.prototype.getDimensionInfo = function(e) {
      return this._getDimInfo(this.getDimension(e));
    }, t.prototype._initGetDimensionInfo = function(e) {
      var r = this._dimInfos;
      this._getDimInfo = e ? function(n) {
        return r.hasOwnProperty(n) ? r[n] : void 0;
      } : function(n) {
        return r[n];
      };
    }, t.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, t.prototype.mapDimension = function(e, r) {
      var n = this._dimSummary;
      if (r == null)
        return n.encodeFirstDimNotExtra[e];
      var i = n.encode[e];
      return i ? i[r] : null;
    }, t.prototype.mapDimensionsAll = function(e) {
      var r = this._dimSummary, n = r.encode[e];
      return (n || []).slice();
    }, t.prototype.getStore = function() {
      return this._store;
    }, t.prototype.initData = function(e, r, n) {
      var i = this, a;
      if (e instanceof Mv && (a = e), !a) {
        var o = this.dimensions, s = Sp(e) || He(e) ? new Hb(e, o.length) : e;
        a = new Mv();
        var l = Vn(o, function(u) {
          return {
            type: i._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, n);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = eO(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, t.prototype.appendData = function(e) {
      var r = this._store.appendData(e);
      this._doInit(r[0], r[1]);
    }, t.prototype.appendValues = function(e, r) {
      var n = this._store.appendValues(e, r && r.length), i = n.start, a = n.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = i; s < a; s++) {
          var l = s - i;
          this._nameList[s] = r[l], o && dh(this, s);
        }
    }, t.prototype._updateOrdinalMeta = function() {
      for (var e = this._store, r = this.dimensions, n = 0; n < r.length; n++) {
        var i = this._dimInfos[r[n]];
        i.ordinalMeta && e.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta);
      }
    }, t.prototype._shouldMakeIdFromName = function() {
      var e = this._store.getProvider();
      return this._idDimIdx == null && e.getSource().sourceFormat !== ri && !e.fillStorage;
    }, t.prototype._doInit = function(e, r) {
      if (!(e >= r)) {
        var n = this._store, i = n.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = i.getSource().sourceFormat, l = s === je;
        if (l && !i.pure)
          for (var u = [], f = e; f < r; f++) {
            var c = i.getItem(f, u);
            if (!this.hasItemOption && LA(c) && (this.hasItemOption = !0), c) {
              var h = c.name;
              a[f] == null && h != null && (a[f] = en(h, null));
              var v = c.id;
              o[f] == null && v != null && (o[f] = en(v, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var f = e; f < r; f++)
            dh(this, f);
        d0(this);
      }
    }, t.prototype.getApproximateExtent = function(e, r) {
      return this._approximateExtent[e] || this._store.getDataExtent(this._getStoreDimIndex(e), r);
    }, t.prototype.setApproximateExtent = function(e, r) {
      r = this.getDimension(r), this._approximateExtent[r] = e.slice();
    }, t.prototype.getCalculationInfo = function(e) {
      return this._calculationInfo[e];
    }, t.prototype.setCalculationInfo = function(e, r) {
      bo(e) ? q(this._calculationInfo, e) : this._calculationInfo[e] = r;
    }, t.prototype.getName = function(e) {
      var r = this.getRawIndex(e), n = this._nameList[r];
      return n == null && this._nameDimIdx != null && (n = To(this, this._nameDimIdx, r)), n == null && (n = ""), n;
    }, t.prototype._getCategory = function(e, r) {
      var n = this._store.get(e, r), i = this._store.getOrdinalMeta(e);
      return i ? i.categories[n] : n;
    }, t.prototype.getId = function(e) {
      return Nl(this, this.getRawIndex(e));
    }, t.prototype.count = function() {
      return this._store.count();
    }, t.prototype.get = function(e, r) {
      var n = this._store, i = this._dimInfos[e];
      if (i)
        return n.get(i.storeDimIndex, r);
    }, t.prototype.getByRawIndex = function(e, r) {
      var n = this._store, i = this._dimInfos[e];
      if (i)
        return n.getByRawIndex(i.storeDimIndex, r);
    }, t.prototype.getIndices = function() {
      return this._store.getIndices();
    }, t.prototype.getDataExtent = function(e) {
      return this._store.getDataExtent(this._getStoreDimIndex(e), null);
    }, t.prototype.getSum = function(e) {
      return this._store.getSum(this._getStoreDimIndex(e));
    }, t.prototype.getMedian = function(e) {
      return this._store.getMedian(this._getStoreDimIndex(e));
    }, t.prototype.getValues = function(e, r) {
      var n = this, i = this._store;
      return J(e) ? i.getValues(Vn(e, function(a) {
        return n._getStoreDimIndex(a);
      }), r) : i.getValues(e);
    }, t.prototype.hasValue = function(e) {
      for (var r = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = r.length; n < i; n++)
        if (isNaN(this._store.get(r[n], e)))
          return !1;
      return !0;
    }, t.prototype.indexOfName = function(e) {
      for (var r = 0, n = this._store.count(); r < n; r++)
        if (this.getName(r) === e)
          return r;
      return -1;
    }, t.prototype.getRawIndex = function(e) {
      return this._store.getRawIndex(e);
    }, t.prototype.indexOfRawIndex = function(e) {
      return this._store.indexOfRawIndex(e);
    }, t.prototype.rawIndexOf = function(e, r) {
      var n = e && this._invertedIndicesMap[e], i = n && n[r];
      return i == null || isNaN(i) ? v0 : i;
    }, t.prototype.each = function(e, r, n) {
      _t(e) && (n = r, r = e, e = []);
      var i = n || this, a = Vn(wo(e), this._getStoreDimIndex, this);
      this._store.each(a, i ? Xt(r, i) : r);
    }, t.prototype.filterSelf = function(e, r, n) {
      _t(e) && (n = r, r = e, e = []);
      var i = n || this, a = Vn(wo(e), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, i ? Xt(r, i) : r), this;
    }, t.prototype.selectRange = function(e) {
      var r = this, n = {}, i = Kt(e);
      return P(i, function(a) {
        var o = r._getStoreDimIndex(a);
        n[o] = e[a];
      }), this._store = this._store.selectRange(n), this;
    }, t.prototype.mapArray = function(e, r, n) {
      _t(e) && (n = r, r = e, e = []), n = n || this;
      var i = [];
      return this.each(e, function() {
        i.push(r && r.apply(this, arguments));
      }, n), i;
    }, t.prototype.map = function(e, r, n, i) {
      var a = n || i || this, o = Vn(wo(e), this._getStoreDimIndex, this), s = xo(this);
      return s._store = this._store.map(o, a ? Xt(r, a) : r), s;
    }, t.prototype.modify = function(e, r, n, i) {
      var a = n || i || this, o = Vn(wo(e), this._getStoreDimIndex, this);
      this._store.modify(o, a ? Xt(r, a) : r);
    }, t.prototype.downSample = function(e, r, n, i) {
      var a = xo(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(e), r, n, i), a;
    }, t.prototype.minmaxDownSample = function(e, r) {
      var n = xo(this);
      return n._store = this._store.minmaxDownSample(this._getStoreDimIndex(e), r), n;
    }, t.prototype.lttbDownSample = function(e, r) {
      var n = xo(this);
      return n._store = this._store.lttbDownSample(this._getStoreDimIndex(e), r), n;
    }, t.prototype.getRawDataItem = function(e) {
      return this._store.getRawDataItem(e);
    }, t.prototype.getItemModel = function(e) {
      var r = this.hostModel, n = this.getRawDataItem(e);
      return new Zt(n, r, r && r.ecModel);
    }, t.prototype.diff = function(e) {
      var r = this;
      return new QR(e ? e.getStore().getIndices() : [], this.getStore().getIndices(), function(n) {
        return Nl(e, n);
      }, function(n) {
        return Nl(r, n);
      });
    }, t.prototype.getVisual = function(e) {
      var r = this._visual;
      return r && r[e];
    }, t.prototype.setVisual = function(e, r) {
      this._visual = this._visual || {}, bo(e) ? q(this._visual, e) : this._visual[e] = r;
    }, t.prototype.getItemVisual = function(e, r) {
      var n = this._itemVisuals[e], i = n && n[r];
      return i ?? this.getVisual(r);
    }, t.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, t.prototype.ensureUniqueItemVisual = function(e, r) {
      var n = this._itemVisuals, i = n[e];
      i || (i = n[e] = {});
      var a = i[r];
      return a == null && (a = this.getVisual(r), J(a) ? a = a.slice() : bo(a) && (a = q({}, a)), i[r] = a), a;
    }, t.prototype.setItemVisual = function(e, r, n) {
      var i = this._itemVisuals[e] || {};
      this._itemVisuals[e] = i, bo(r) ? q(i, r) : i[r] = n;
    }, t.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, t.prototype.setLayout = function(e, r) {
      bo(e) ? q(this._layout, e) : this._layout[e] = r;
    }, t.prototype.getLayout = function(e) {
      return this._layout[e];
    }, t.prototype.getItemLayout = function(e) {
      return this._itemLayouts[e];
    }, t.prototype.setItemLayout = function(e, r, n) {
      this._itemLayouts[e] = n ? q(this._itemLayouts[e] || {}, r) : r;
    }, t.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, t.prototype.setItemGraphicEl = function(e, r) {
      var n = this.hostModel && this.hostModel.seriesIndex;
      ZI(n, this.dataType, e, r), this._graphicEls[e] = r;
    }, t.prototype.getItemGraphicEl = function(e) {
      return this._graphicEls[e];
    }, t.prototype.eachItemGraphicEl = function(e, r) {
      P(this._graphicEls, function(n, i) {
        n && e && e.call(r, n, i);
      });
    }, t.prototype.cloneShallow = function(e) {
      return e || (e = new t(this._schema ? this._schema : Vn(this.dimensions, this._getDimInfo, this), this.hostModel)), vh(e, this), e._store = this._store, e;
    }, t.prototype.wrapMethod = function(e, r) {
      var n = this[e];
      _t(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(e), this[e] = function() {
        var i = n.apply(this, arguments);
        return r.apply(this, [i].concat(Dd(arguments)));
      });
    }, t.internalField = (function() {
      d0 = function(e) {
        var r = e._invertedIndicesMap;
        P(r, function(n, i) {
          var a = e._dimInfos[i], o = a.ordinalMeta, s = e._store;
          if (o) {
            n = r[i] = new oO(o.categories.length);
            for (var l = 0; l < n.length; l++)
              n[l] = v0;
            for (var l = 0; l < s.count(); l++)
              n[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, To = function(e, r, n) {
        return en(e._getCategory(r, n), null);
      }, Nl = function(e, r) {
        var n = e._idList[r];
        return n == null && e._idDimIdx != null && (n = To(e, e._idDimIdx, r)), n == null && (n = sO + r), n;
      }, wo = function(e) {
        return J(e) || (e = e != null ? [e] : []), e;
      }, xo = function(e) {
        var r = new t(e._schema ? e._schema : Vn(e.dimensions, e._getDimInfo, e), e.hostModel);
        return vh(r, e), r;
      }, vh = function(e, r) {
        P(lO.concat(r.__wrappedMethods || []), function(n) {
          r.hasOwnProperty(n) && (e[n] = r[n]);
        }), e.__wrappedMethods = r.__wrappedMethods, P(uO, function(n) {
          e[n] = xt(r[n]);
        }), e._calculationInfo = q({}, r._calculationInfo);
      }, dh = function(e, r) {
        var n = e._nameList, i = e._idList, a = e._nameDimIdx, o = e._idDimIdx, s = n[r], l = i[r];
        if (s == null && a != null && (n[r] = s = To(e, a, r)), l == null && o != null && (i[r] = l = To(e, o, r)), l == null && s != null) {
          var u = e._nameRepeatCount, f = u[s] = (u[s] || 0) + 1;
          l = s, f > 1 && (l += "__ec__" + f), i[r] = l;
        }
      };
    })(), t;
  })()
);
function cO(t, e) {
  Sp(t) || (t = Bb(t)), e = e || {};
  var r = e.coordDimensions || [], n = e.dimensionsDefine || t.dimensionsDefine || [], i = gt(), a = [], o = hO(t, r, n, e.dimensionsCount), s = e.canOmitUnusedDimensions && BT(o), l = n === t.dimensionsDefine, u = l ? kT(t) : Lp(n), f = e.encodeDefine;
  !f && e.encodeDefaulter && (f = e.encodeDefaulter(t, o));
  for (var c = gt(f), h = new Wb(o), v = 0; v < h.length; v++)
    h[v] = -1;
  function d(A) {
    var M = h[A];
    if (M < 0) {
      var R = n[A], B = ft(R) ? R : {
        name: R
      }, O = new cu(), F = B.name;
      F != null && u.get(F) != null && (O.name = O.displayName = F), B.type != null && (O.type = B.type), B.displayName != null && (O.displayName = B.displayName);
      var U = a.length;
      return h[A] = U, O.storeDimIndex = A, a.push(O), O;
    }
    return a[M];
  }
  if (!s)
    for (var v = 0; v < o; v++)
      d(v);
  c.each(function(A, M) {
    var R = Re(A).slice();
    if (R.length === 1 && !at(R[0]) && R[0] < 0) {
      c.set(M, !1);
      return;
    }
    var B = c.set(M, []);
    P(R, function(O, F) {
      var U = at(O) ? u.get(O) : O;
      U != null && U < o && (B[F] = U, m(d(U), M, F));
    });
  });
  var p = 0;
  P(r, function(A) {
    var M, R, B, O;
    if (at(A))
      M = A, O = {};
    else {
      O = A, M = O.name;
      var F = O.ordinalMeta;
      O.ordinalMeta = null, O = q({}, O), O.ordinalMeta = F, R = O.dimsDef, B = O.otherDims, O.name = O.coordDim = O.coordDimIndex = O.dimsDef = O.otherDims = null;
    }
    var U = c.get(M);
    if (U !== !1) {
      if (U = Re(U), !U.length)
        for (var H = 0; H < (R && R.length || 1); H++) {
          for (; p < o && d(p).coordDim != null; )
            p++;
          p < o && U.push(p++);
        }
      P(U, function(W, V) {
        var j = d(W);
        if (l && O.type != null && (j.type = O.type), m(Ht(j, O), M, V), j.name == null && R) {
          var rt = R[V];
          !ft(rt) && (rt = {
            name: rt
          }), j.name = j.displayName = rt.name, j.defaultTooltip = rt.defaultTooltip;
        }
        B && Ht(j.otherDims, B);
      });
    }
  });
  function m(A, M, R) {
    PS.get(M) != null ? A.otherDims[M] = R : (A.coordDim = M, A.coordDimIndex = R, i.set(M, !0));
  }
  var g = e.generateCoord, y = e.generateCoordCount, _ = y != null;
  y = g ? y || 1 : 0;
  var S = g || "value";
  function b(A) {
    A.name == null && (A.name = A.coordDim);
  }
  if (s)
    P(a, function(A) {
      b(A);
    }), a.sort(function(A, M) {
      return A.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var T = 0; T < o; T++) {
      var C = d(T), E = C.coordDim;
      E == null && (C.coordDim = vO(S, i, _), C.coordDimIndex = 0, (!g || y <= 0) && (C.isExtraCoord = !0), y--), b(C), C.type == null && (Rb(t, T) === We.Must || C.isExtraCoord && (C.otherDims.itemName != null || C.otherDims.seriesName != null)) && (C.type = "ordinal");
    }
  return Bd(a, function(A) {
    return A.name;
  }, function(A, M) {
    M > 0 && (A.name = A.name + (M - 1));
  }), new RT({
    source: t,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function hO(t, e, r, n) {
  var i = Math.max(t.dimensionsDetectedCount || 1, e.length, r.length, n || 0);
  return P(e, function(a) {
    var o;
    ft(a) && (o = a.dimsDef) && (i = Math.max(i, o.length));
  }), i;
}
function vO(t, e, r) {
  if (r || e.hasKey(t)) {
    for (var n = 0; e.hasKey(t + n); )
      n++;
    t += n;
  }
  return e.set(t, !0), t;
}
var dO = (
  /** @class */
  /* @__PURE__ */ (function() {
    function t(e) {
      this.coordSysDims = [], this.axisMap = gt(), this.categoryAxisMap = gt(), this.coordSysName = e;
    }
    return t;
  })()
);
function pO(t) {
  var e = t.get("coordinateSystem"), r = new dO(e), n = gO[e];
  if (n)
    return n(t, r, r.axisMap, r.categoryAxisMap), r;
}
var gO = {
  cartesian2d: function(t, e, r, n) {
    var i = t.getReferringComponents("xAxis", ur).models[0], a = t.getReferringComponents("yAxis", ur).models[0];
    e.coordSysDims = ["x", "y"], r.set("x", i), r.set("y", a), Ta(i) && (n.set("x", i), e.firstCategoryDimIndex = 0), Ta(a) && (n.set("y", a), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = 1));
  },
  singleAxis: function(t, e, r, n) {
    var i = t.getReferringComponents("singleAxis", ur).models[0];
    e.coordSysDims = ["single"], r.set("single", i), Ta(i) && (n.set("single", i), e.firstCategoryDimIndex = 0);
  },
  polar: function(t, e, r, n) {
    var i = t.getReferringComponents("polar", ur).models[0], a = i.findAxisModel("radiusAxis"), o = i.findAxisModel("angleAxis");
    e.coordSysDims = ["radius", "angle"], r.set("radius", a), r.set("angle", o), Ta(a) && (n.set("radius", a), e.firstCategoryDimIndex = 0), Ta(o) && (n.set("angle", o), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = 1));
  },
  geo: function(t, e, r, n) {
    e.coordSysDims = ["lng", "lat"];
  },
  parallel: function(t, e, r, n) {
    var i = t.ecModel, a = i.getComponent("parallel", t.get("parallelIndex")), o = e.coordSysDims = a.dimensions.slice();
    P(a.parallelAxisIndex, function(s, l) {
      var u = i.getComponent("parallelAxis", s), f = o[l];
      r.set(f, u), Ta(u) && (n.set(f, u), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = l));
    });
  },
  matrix: function(t, e, r, n) {
    var i = t.getReferringComponents("matrix", ur).models[0];
    e.coordSysDims = ["x", "y"];
    var a = i.getDimensionModel("x"), o = i.getDimensionModel("y");
    r.set("x", a), r.set("y", o), n.set("x", a), n.set("y", o);
  }
};
function Ta(t) {
  return t.get("type") === "category";
}
function mO(t, e, r) {
  r = r || {};
  var n = r.byIndex, i = r.stackedCoordDimension, a, o, s;
  yO(e) ? a = e : (o = e.schema, a = o.dimensions, s = e.store);
  var l = !!(t && t.get("stack")), u, f, c, h, v = !0;
  function d(S) {
    return S.type !== "ordinal" && S.type !== "time";
  }
  if (P(a, function(S, b) {
    at(S) && (a[b] = S = {
      name: S
    }), d(S) || (v = !1);
  }), P(a, function(S, b) {
    l && !S.isExtraCoord && (!n && !u && S.ordinalMeta && (u = S), !f && d(S) && (!v || S.coordDim !== "x" && S.coordDim !== "angle") && (!i || i === S.coordDim) && (f = S));
  }), f && !n && !u && (n = !0), f) {
    c = "__\0ecstackresult_" + t.id, h = "__\0ecstackedover_" + t.id, u && (u.createInvertedIndices = !0);
    var p = f.coordDim, m = f.type, g = 0;
    P(a, function(S) {
      S.coordDim === p && g++;
    });
    var y = {
      name: c,
      coordDim: p,
      coordDimIndex: g,
      type: m,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, _ = {
      name: h,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: h,
      coordDimIndex: g + 1,
      type: m,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (y.storeDimIndex = s.ensureCalculationDimension(h, m), _.storeDimIndex = s.ensureCalculationDimension(c, m)), o.appendCalculationDimension(y), o.appendCalculationDimension(_)) : (a.push(y), a.push(_));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: n,
    stackedOverDimension: h,
    stackResultDimension: c
  };
}
function yO(t) {
  return !OT(t.schema);
}
function As(t, e) {
  return !!e && e === t.getCalculationInfo("stackedDimension");
}
function _O(t, e) {
  return As(t, e) ? t.getCalculationInfo("stackResultDimension") : e;
}
function SO(t, e) {
  var r = t.get("coordinateSystem"), n = gp.get(r), i;
  return e && e.coordSysDims && (i = pt(e.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = e.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = rO(l);
    }
    return o;
  })), i || (i = n && (n.getDimensionsInfo ? n.getDimensionsInfo() : n.dimensions.slice()) || ["x", "y"]), i;
}
function bO(t, e, r) {
  var n, i;
  return r && P(t, function(a, o) {
    var s = a.coordDim, l = r.categoryAxisMap.get(s);
    l && (n == null && (n = o), a.ordinalMeta = l.getOrdinalMeta(), e && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (i = !0);
  }), !i && n != null && (t[n].otherDims.itemName = 0), n;
}
function TO(t, e, r) {
  r = r || {};
  var n = e.getSourceManager(), i, a = !1;
  i = n.getSource(), a = i.sourceFormat === je;
  var o = pO(e), s = SO(e, o), l = r.useEncodeDefaulter, u = _t(l) ? l : l ? oe(fP, s, e) : null, f = {
    coordDimensions: s,
    generateCoord: r.generateCoord,
    encodeDefine: e.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, c = cO(i, f), h = bO(c.dimensions, r.createInvertedIndices, o), v = a ? null : n.getSharedDataStore(c), d = mO(e, {
    schema: c,
    store: v
  }), p = new fO(c, e);
  p.setCalculationInfo(d);
  var m = h != null && wO(i) ? function(g, y, _, S) {
    return S === h ? _ : this.defaultDimValueGetter(g, y, _, S);
  } : null;
  return p.hasItemOption = !1, p.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? i : v,
    null,
    m
  ), p;
}
function wO(t) {
  if (t.sourceFormat === je) {
    var e = xO(t.data || []);
    return !J(Gs(e));
  }
}
function xO(t) {
  for (var e = 0; e < t.length && t[e] == null; )
    e++;
  return t[e];
}
var Er = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.isBlank = function() {
      return this._isBlank;
    }, t.prototype.setBlank = function(e) {
      this._isBlank = e;
    }, t;
  })()
);
Df(Er);
var CO = 0, Uv = (
  /** @class */
  (function() {
    function t(e) {
      this.categories = e.categories || [], this._needCollect = e.needCollect, this._deduplication = e.deduplication, this.uid = ++CO, this._onCollect = e.onCollect;
    }
    return t.createByAxisModel = function(e) {
      var r = e.option, n = r.data, i = n && pt(n, DO);
      return new t({
        categories: i,
        needCollect: !i,
        // deduplication is default in axis.
        deduplication: r.dedplication !== !1
      });
    }, t.prototype.getOrdinal = function(e) {
      return this._getOrCreateMap().get(e);
    }, t.prototype.parseAndCollect = function(e) {
      var r, n = this._needCollect;
      if (!at(e) && !n)
        return e;
      if (n && !this._deduplication)
        return r = this.categories.length, this.categories[r] = e, this._onCollect && this._onCollect(e, r), r;
      var i = this._getOrCreateMap();
      return r = i.get(e), r == null && (n ? (r = this.categories.length, this.categories[r] = e, i.set(e, r), this._onCollect && this._onCollect(e, r)) : r = NaN), r;
    }, t.prototype._getOrCreateMap = function() {
      return this._map || (this._map = gt(this.categories));
    }, t;
  })()
);
function DO(t) {
  return ft(t) && t.value != null ? t.value : t + "";
}
var cr = 0, Is = 1, MO = {
  needTransform: 1,
  normalize: 1,
  scale: 1,
  transformIn: 1,
  transformOut: 1,
  contain: 1,
  getExtent: 1,
  getExtentUnsafe: 1,
  setExtent: 1,
  setExtent2: 1,
  getFilter: 1,
  sanitize: 1,
  getDefaultStartValue: 1,
  freeze: 1
}, NT = Kt(MO), Zu = 2, FT = 3;
function Ep(t, e, r) {
  var n;
  t = t || {};
  var i = Pe();
  if (i) {
    var a = i.createBreakScaleMapper(e, r);
    a.hasBreaks() && (P(NT, function(o) {
      a[o] && (t[o] = Xt(a[o], a));
    }), n = a);
  }
  return n == null && IO(t, r), {
    brk: n,
    mapper: t
  };
}
function HT(t, e) {
  P(NT, function(r) {
    t[r] = e[r];
  });
}
function zT(t, e) {
  t.freeze = we;
}
function Ls(t) {
  return t.getExtentUnsafe(cr, Zu);
}
function ju(t, e) {
  return t.getExtentUnsafe(Is, e) || t.getExtentUnsafe(cr, e);
}
function AO(t) {
  var e = ju(t, FT);
  return e[1] - e[0];
}
function Uf(t) {
  var e = t.getExtentUnsafe(cr, FT);
  return e[1] - e[0];
}
function IO(t, e) {
  var r = t || {}, n = [];
  return r._extents = n, n[cr] = e ? e.slice() : or(), q(r, LO), r;
}
var LO = {
  needTransform: function() {
    return !1;
  },
  normalize: function(t) {
    var e = this._extents[Is] || this._extents[cr];
    return e[1] === e[0] ? 0.5 : (t - e[0]) / (e[1] - e[0]);
  },
  scale: function(t) {
    var e = this._extents[Is] || this._extents[cr];
    return t * (e[1] - e[0]) + e[0];
  },
  transformIn: function(t) {
    return t;
  },
  transformOut: function(t) {
    return t;
  },
  contain: function(t) {
    var e = ju(this, null);
    return t >= e[0] && t <= e[1];
  },
  getExtent: function() {
    return this._extents[cr].slice();
  },
  getExtentUnsafe: function(t) {
    return this._extents[t];
  },
  setExtent: function(t, e) {
    p0(this._extents, cr, t, e);
  },
  setExtent2: function(t, e, r) {
    var n = this._extents;
    n[t] || (n[t] = n[cr].slice()), p0(n, t, e, r);
  },
  freeze: function() {
  }
};
function p0(t, e, r, n) {
  qa(r, n) && (t[e][0] = r, t[e][1] = n);
}
function VT(t) {
  return Ju(t) || Qa(t);
}
function Ju(t) {
  return t.type === "interval";
}
function Pp(t) {
  return t.type === "time";
}
function Qa(t) {
  return t.type === "log";
}
function gn(t) {
  return t.type === "ordinal";
}
function EO(t) {
  var e = Pd(t), r = no(10, e), n = Pn(t / r);
  return n ? n === 2 ? n = 3 : n === 3 ? n = 5 : n *= 2 : n = 1, Mt(n * r, -e);
}
function na(t) {
  return Zn(t) + 2;
}
function Fl(t, e) {
  return ms(t) / ms(e);
}
function ph(t, e, r) {
  var n = r && r.lookup;
  if (n) {
    for (var i = 0; i < n.from.length; i++)
      if (t === n.from[i])
        return n.to[i];
  }
  return no(e, t);
}
function UT(t, e, r) {
  var n = t.slice();
  if (n[0] === n[1]) {
    var i = r && r.ctnShp;
    if (n[0] !== 0) {
      var a = ce(n[0]);
      e[1] || (n[1] += a / 2), n[0] -= a / 2;
    } else
      i && (n[0] = -1), n[1] = 1;
  }
  return (!Rn(n[0]) || !Rn(n[1])) && (n[0] = 0, n[1] = 1), n[1] < n[0] && n.reverse(), n;
}
function PO(t, e) {
  return [t[0] !== e[0], t[1] !== e[1]];
}
function Rp(t, e) {
  return t = t || e, Pn(Nt(t, 1));
}
function GT(t, e, r) {
  var n = Ls(t), i = n[0], a = t.count(), o = Math.max((e || 0) + 1, 1);
  i !== 0 && o > 1 && a / o > 2 && (i = Math.round(Math.ceil(i / o) * o)), i !== n[0] && l(n[0], !0, !0);
  for (var s = i; s <= n[1]; s += o)
    l(s, !1, s === n[0] || s === n[1]);
  s - o !== n[1] && l(n[1], !0, !0);
  function l(u, f, c) {
    r({
      value: u,
      offInterval: f
    }, c);
  }
}
var WT = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this) || this;
      n.type = "ordinal", n.parse = e.parse, HT(n, e.decoratedMethods);
      var i = r.ordinalMeta;
      i || (i = new Uv({})), J(i) && (i = new Uv({
        categories: pt(i, function(o) {
          return ft(o) ? o.value : o;
        })
      })), n._ordinalMeta = i;
      var a = Ep(
        null,
        null,
        // Do not support break in OrdinalScale yet.
        r.extent || [0, i.categories.length - 1]
      );
      return n._mapper = a.mapper, zT(n), n;
    }
    return e.parse = function(r) {
      return r == null ? r = NaN : at(r) ? (r = this._ordinalMeta.getOrdinal(r), r == null && (r = NaN)) : r = Pn(r), r;
    }, e.prototype.getTicks = function() {
      var r = [];
      return GT(this, 0, function(n) {
        r.push(n);
      }), r;
    }, e.prototype.getMinorTicks = function(r) {
    }, e.prototype.setSortInfo = function(r) {
      if (r == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var n = r.ordinalNumbers, i = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Ze(s, n.length); o < l; ++o) {
        var u = i[o] = n[o];
        a[u] = o;
      }
      for (var f = 0; o < s; ++o) {
        for (; a[f] != null; )
          f++;
        i[o] = f, a[f] = o;
      }
    }, e.prototype._getTickNumber = function(r) {
      var n = this._ticksByOrdinalNumber;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }, e.prototype.getRawOrdinalNumber = function(r) {
      var n = this._ordinalNumbersByTick;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }, e.prototype.getLabel = function(r) {
      if (!this.isBlank()) {
        var n = this.getRawOrdinalNumber(r.value), i = this._ordinalMeta.categories[n];
        return i == null ? "" : i + "";
      }
    }, e.prototype.count = function() {
      var r = Ls(this._mapper);
      return r[1] - r[0] + 1;
    }, e.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, e.type = "ordinal", e.decoratedMethods = {
      needTransform: function() {
        return this._mapper.needTransform();
      },
      contain: function(r) {
        return this._mapper.contain(this._getTickNumber(r)) && r >= 0 && r < this._ordinalMeta.categories.length;
      },
      normalize: function(r) {
        return this._mapper.normalize(this._getTickNumber(r));
      },
      scale: function(r) {
        return this.getRawOrdinalNumber(Pn(this._mapper.scale(r)));
      },
      transformIn: function(r, n) {
        return this._mapper.transformIn(this._getTickNumber(r), n);
      },
      transformOut: function(r, n) {
        return this.getRawOrdinalNumber(this._mapper.transformOut(r, n));
      },
      getExtent: function() {
        return this._mapper.getExtent();
      },
      getExtentUnsafe: function(r, n) {
        return this._mapper.getExtentUnsafe(r, n);
      },
      /**
       * NOTICE: OrdinalScale extent should always originates from
       * `[0, ordinalMeta.categories.length - 1]`, regardless of min/max of `series.data`.
       * But settings like `xxxAxis.min/max` can still modify the extent.
       * It is handled by constructor of `ScaleRawExtentInfo`.
       */
      setExtent: function(r, n) {
        return this._mapper.setExtent(r, n);
      },
      setExtent2: function(r, n, i) {
        return this._mapper.setExtent2(r, n, i);
      }
    }, e;
  })(Er)
);
Er.registerClass(WT);
function Op(t, e, r, n) {
  for (var i = t.getTicks({
    expandToNicedExtent: !0
  }), a = [], o = t.getExtent(), s = 1; s < i.length; s++) {
    var l = i[s], u = i[s - 1];
    if (!(u.break || l.break)) {
      for (var f = 0, c = [], h = l.value - u.value, v = h / e, d = na(v); f < e - 1; ) {
        var p = Mt(u.value + (f + 1) * v, d);
        p > o[0] && p < o[1] && c.push(p), f++;
      }
      var m = Pe();
      m && m.pruneTicksByBreak("auto", c, r, function(g) {
        return g;
      }, n, o), a.push(c);
    }
  }
  return a;
}
var Ua = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this) || this;
      n.type = "interval", n.parse = e.parse, r = r || {};
      var i = pb(n, r), a = Ep(n, i, null);
      return n.brk = a.brk, n._cfg = {
        interval: 0,
        intervalPrecision: 2,
        intervalCount: void 0,
        niceExtent: void 0
      }, n;
    }
    return e.parse = function(r) {
      return r == null || r === "" ? NaN : Number(r);
    }, e.prototype.getConfig = function() {
      return xt(this._cfg);
    }, e.prototype.setConfig = function(r) {
      var n = Ls(this);
      this._cfg = r = xt(r), r.niceExtent == null && (r.niceExtent = n.slice()), r.intervalPrecision == null && (r.intervalPrecision = na(r.interval));
    }, e.prototype.getTicks = function(r) {
      r = r || {};
      var n = this._cfg, i = n.interval, a = Ls(this), o = n.niceExtent, s = n.intervalPrecision, l = Pe(), u = this.brk, f = l && u, c = [];
      if (!i)
        return c;
      if (r.breakTicks === "only_break" && f)
        return l.addBreaksToTicks(c, u.breaks, a), c;
      var h = 3e3;
      a[0] < o[0] && c.push({
        value: r.expandToNicedExtent ? Mt(o[0] - i, s) : a[0]
      });
      for (var v = function(_, S) {
        return Pn((S - _) / i);
      }, d = n.intervalCount, p = o[0], m = 0; ; m++) {
        if (d == null) {
          if (p > o[1] || !isFinite(p) || !isFinite(o[1]))
            break;
        } else {
          if (m > d)
            break;
          p = Ze(p, o[1]), m === d && (p = o[1]);
        }
        if (c.push({
          value: p
        }), p = Mt(p + i, s), u) {
          var g = u.calcNiceTickMultiple(p, v);
          g >= 0 && (p = Mt(p + g * i, s));
        }
        if (c.length > 0 && p === c[c.length - 1].value)
          break;
        if (c.length > h)
          return [];
      }
      var y = c.length ? c[c.length - 1].value : o[1];
      return a[1] > y && c.push({
        value: r.expandToNicedExtent ? Mt(y + i, s) : a[1]
      }), f && l.pruneTicksByBreak(r.pruneByBreak, c, u.breaks, function(_) {
        return _.value;
      }, n.interval, a), f && r.breakTicks !== "none" && l.addBreaksToTicks(c, u.breaks, a), c;
    }, e.prototype.getMinorTicks = function(r) {
      return Op(this, r, Uu(this), this._cfg.interval);
    }, e.prototype.getLabel = function(r, n) {
      if (r == null)
        return "";
      var i = n && n.precision;
      i == null ? i = Zn(r.value) || 0 : i === "auto" && (i = this._cfg.intervalPrecision);
      var a = Mt(r.value, i, !0);
      return wb(a);
    }, e.type = "interval", e;
  })(Er)
);
Er.registerClass(Ua);
var RO = function(t, e, r, n) {
  for (; r < n; ) {
    var i = r + n >>> 1;
    t[i][1] < e ? r = i + 1 : n = i;
  }
  return r;
}, YT = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this) || this;
      n.type = "time", n.parse = e.parse, n._locale = r.locale, n._useUTC = r.useUTC, n._interval = 0;
      var i = pb(n, r), a = Ep(n, i, null);
      return n.brk = a.brk, n;
    }
    return e.prototype.getLabel = function(r) {
      return Ff(r.value, sy[$E(es(this._minLevelUnit))] || sy.second, this._useUTC, this._locale);
    }, e.prototype.getFormattedLabel = function(r, n, i) {
      return XE(r, n, i, this._locale, this._useUTC);
    }, e.prototype.getTicks = function(r) {
      r = r || {};
      var n = this._interval, i = Ls(this), a = Pe(), o = this.brk, s = a && o, l = [];
      if (!n)
        return l;
      var u = this._useUTC;
      if (s && r.breakTicks === "only_break")
        return Pe().addBreaksToTicks(l, o.breaks, i), l;
      l = zO(this._minLevelUnit, this._approxInterval, u, i, Uf(this), o);
      var f = Ye.length - 1, c = 0;
      return P(l, function(h) {
        h.time && (f = Math.min(f, At(Ye, h.time.upperTimeUnit)), c = Math.max(c, h.time.level));
      }), s && Pe().pruneTicksByBreak(r.pruneByBreak, l, o.breaks, function(h) {
        return h.value;
      }, this._approxInterval, i), s && r.breakTicks !== "none" && Pe().addBreaksToTicks(l, o.breaks, i, function(h) {
        for (var v = Math.max(At(Ye, Ha(h.vmin, u)), At(Ye, Ha(h.vmax, u))), d = 0, p = 0; p < Ye.length; p++)
          if (!$T(Ye[p], h.vmin, h.vmax, u)) {
            d = p;
            break;
          }
        var m = Math.min(d, f), g = Math.max(m, v);
        return {
          level: c,
          lowerTimeUnit: Ye[g],
          upperTimeUnit: Ye[m]
        };
      }), l;
    }, e.prototype.getMinorTicks = function(r) {
      return Op(this, r, Uu(this), this._interval);
    }, e.prototype.setTimeInterval = function(r) {
      this._interval = r.interval, this._approxInterval = r.approxInterval, this._minLevelUnit = r.minLevelUnit;
    }, e.parse = function(r) {
      return qt(r) ? Math.round(r) : +io(r);
    }, e.type = "time", e;
  })(Er)
), Hl = [
  // Format                           interval
  ["second", lp],
  ["minute", up],
  ["hour", ts],
  ["quarter-day", ts * 6],
  ["half-day", ts * 12],
  ["day", fr * 1.2],
  ["half-week", fr * 3.5],
  ["week", fr * 7],
  ["month", fr * 31],
  ["quarter", fr * 95],
  ["half-year", oy / 2],
  ["year", oy]
  // 1Y
];
function $T(t, e, r, n) {
  return xv(new Date(e), t, n).getTime() === xv(new Date(r), t, n).getTime();
}
function OO(t, e) {
  return t /= fr, t > 16 ? 16 : t > 7.5 ? 7 : t > 3.5 ? 4 : t > 1.5 ? 2 : 1;
}
function kO(t) {
  var e = 30 * fr;
  return t /= e, t > 6 ? 6 : t > 3 ? 3 : t > 2 ? 2 : 1;
}
function BO(t) {
  return t /= ts, t > 12 ? 12 : t > 6 ? 6 : t > 3.5 ? 4 : t > 2 ? 2 : 1;
}
function g0(t, e) {
  return t /= e ? up : lp, t > 30 ? 30 : t > 20 ? 20 : t > 15 ? 15 : t > 10 ? 10 : t > 5 ? 5 : t > 2 ? 2 : 1;
}
function NO(t) {
  return Nt(Rd(t, !0), 1);
}
function FO(t, e, r) {
  var n = Math.max(0, At(Ye, e) - 1);
  return xv(new Date(t), Ye[n], r).getTime();
}
function HO(t, e) {
  var r = /* @__PURE__ */ new Date(0);
  r[t](1);
  var n = r.getTime();
  r[t](1 + e);
  var i = r.getTime() - n;
  return function(a, o) {
    return Math.max(0, Math.round((o - a) / i));
  };
}
function zO(t, e, r, n, i, a) {
  var o = 3e3, s = UE, l = 0;
  function u(H, W, V, j, rt, tt, it) {
    for (var ot = HO(rt, H), Z = W, bt = new Date(Z); Z < V && Z <= n[1] && (it.push({
      value: Z
    }), !(l++ > o)); )
      if (bt[rt](bt[j]() + H), Z = bt.getTime(), a) {
        var St = a.calcNiceTickMultiple(Z, ot);
        St > 0 && (bt[rt](bt[j]() + St * H), Z = bt.getTime());
      }
    it.push({
      value: Z,
      // extent[1] should be added; deduplication will be performed later.
      notAdd: Z > n[1]
    });
  }
  function f(H, W, V) {
    var j = [], rt = !W.length;
    if (!$T(es(H), n[0], n[1], r)) {
      rt && (W = [{
        value: FO(n[0], H, r)
      }, {
        value: n[1]
      }]);
      for (var tt = 0; tt < W.length - 1; tt++) {
        var it = W[tt].value, ot = W[tt + 1].value;
        if (it !== ot) {
          var Z = void 0, bt = void 0, St = void 0, jt = !1;
          switch (H) {
            case "year":
              Z = Math.max(1, Math.round(e / fr / 365)), bt = gb(r), St = KE(r);
              break;
            case "half-year":
            case "quarter":
            case "month":
              Z = kO(e), bt = fp(r), St = mb(r);
              break;
            case "week":
            // PENDING If week is added. Ignore day.
            case "half-week":
            case "day":
              Z = OO(e), bt = cp(r), St = yb(r), jt = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              Z = BO(e), bt = hp(r), St = _b(r);
              break;
            case "minute":
              Z = g0(e, !0), bt = vp(r), St = Sb(r);
              break;
            case "second":
              Z = g0(e, !1), bt = dp(r), St = bb(r);
              break;
            case "millisecond":
              Z = NO(e), bt = pp(r), St = Tb(r);
              break;
          }
          ot >= n[0] && it <= n[1] && u(Z, it, ot, bt, St, jt, j), H === "year" && V.length > 1 && tt === 0 && V.unshift({
            value: V[0].value - Z
          });
        }
      }
      for (var tt = 0; tt < j.length; tt++)
        V.push(j[tt]);
    }
  }
  for (var c = [], h = [], v = 0, d = 0, p = 0; p < s.length; ++p) {
    var m = es(s[p]);
    if (YE(s[p])) {
      f(s[p], c[c.length - 1] || [], h);
      var g = s[p + 1] ? es(s[p + 1]) : null;
      if (m !== g) {
        if (h.length) {
          d = v, h.sort(function(H, W) {
            return H.value - W.value;
          });
          for (var y = [], _ = 0; _ < h.length; ++_) {
            var S = h[_].value;
            (_ === 0 || h[_ - 1].value !== S) && (y.push(h[_]), S >= n[0] && S <= n[1] && v++);
          }
          var b = i / e;
          if (v > b * 1.5 && d > b / 1.5 || (c.push(y), v > b || t === s[p]))
            break;
        }
        h = [];
      }
    }
  }
  for (var T = be(pt(c, function(H) {
    return be(H, function(W) {
      return W.value >= n[0] && W.value <= n[1] && !W.notAdd;
    });
  }), function(H) {
    return H.length > 0;
  }), C = T.length - 1, E = [], p = 0; p < T.length; ++p)
    for (var A = T[p], M = 0; M < A.length; ++M) {
      var R = Ha(A[M].value, r);
      E.push({
        value: A[M].value,
        time: {
          level: C - p,
          upperTimeUnit: R,
          lowerTimeUnit: R
        }
      });
    }
  Bd(E, KA, null), E.sort(function(H, W) {
    return H.value - W.value;
  });
  var B = E[0], O = E[E.length - 1], F = Ha(n[0], r), U = Ha(n[1], r);
  return (!B || B.value > n[0]) && E.unshift({
    value: n[0],
    time: {
      level: 0,
      upperTimeUnit: F,
      lowerTimeUnit: F
    },
    notNice: !0
  }), (!O || O.value < n[1]) && E.push({
    value: n[1],
    time: {
      level: 0,
      upperTimeUnit: U,
      lowerTimeUnit: U
    },
    notNice: !0
  }), E;
}
var VO = function(t, e) {
  var r = t.getExtent();
  if (r[0] === r[1] && (r[0] -= fr, r[1] += fr), r[1] === -1 / 0 && r[0] === 1 / 0) {
    var n = /* @__PURE__ */ new Date();
    r[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), r[0] = r[1] - fr;
  }
  t.setExtent(r[0], r[1]);
  var i = Rp(e.splitNumber, 10), a = Uf(t) / i, o = e.minInterval, s = e.maxInterval;
  o != null && a < o && (a = o), s != null && a > s && (a = s);
  var l = Hl.length, u = Math.min(RO(Hl, a, 0, l), l - 1), f = Hl[u][1], c = Hl[Math.max(u - 1, 0)][0];
  t.setTimeInterval({
    approxInterval: a,
    interval: f,
    minLevelUnit: c
  });
};
Er.registerClass(YT);
var zl = 0, Vl = 1, UO = 2, XT = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this) || this;
      n.type = "log", n.parse = Ua.parse, n.base = r.logBase || 10;
      var i = [], a = [], o = n._lookup = {
        from: i,
        to: a
      };
      i[zl] = i[Vl] = a[zl] = a[Vl] = NaN, HT(n, e.mapperMethods);
      var s = Pe(), l = r.breakOption, u = {
        lookup: o
      };
      return s && s.parseAxisBreakOptionInwardTransform(l, n, {
        noNegative: !0
      }, UO, u), n.powStub = new Ua({
        breakParsed: u.original
      }), n.intervalStub = new Ua({
        breakParsed: u.transformed
      }), zT(n, n.intervalStub), n;
    }
    return e.prototype.getTicks = function(r) {
      var n = this.base, i = this.powStub, a = Pe(), o = this.intervalStub, s = o.getExtent(), l = i.getExtent(), u = {
        lookup: {
          from: s,
          to: l
        }
      };
      return pt(o.getTicks(r || {}), function(f) {
        var c = f.value, h = ph(c, n, u), v;
        if (a) {
          var d = a.getTicksBreakOutwardTransform(this, f, Uu(i), this._lookup);
          d && (v = d.vBreak, h = d.tickVal);
        }
        return {
          value: h,
          break: v
        };
      }, this);
    }, e.prototype.getMinorTicks = function(r) {
      return Op(
        this,
        r,
        Uu(this.powStub),
        // NOTE: minor ticks are in the log scale value to visually hint users "logarithm".
        this.intervalStub.getConfig().interval
      );
    }, e.prototype.getLabel = function(r, n) {
      return this.intervalStub.getLabel(r, n);
    }, e.type = "log", e.mapperMethods = {
      needTransform: function() {
        return !0;
      },
      normalize: function(r) {
        return this.intervalStub.normalize(Fl(r, this.base));
      },
      scale: function(r) {
        return ph(this.intervalStub.scale(r), this.base, null);
      },
      transformIn: function(r, n) {
        return r = Fl(r, this.base), n && n.depth === Zu ? r : this.intervalStub.transformIn(r, n);
      },
      transformOut: function(r, n) {
        var i = n ? n.depth : null;
        return m0.depth = i, y0.lookup = this._lookup, ph(i === Zu ? r : this.intervalStub.transformOut(r, m0), this.base, y0);
      },
      contain: function(r) {
        return this.powStub.contain(r);
      },
      /**
       * NOTICE: The caller should ensure `start` and `end` are both non-negative.
       */
      setExtent: function(r, n) {
        this.setExtent2(cr, r, n);
      },
      setExtent2: function(r, n, i) {
        if (!(!qa(n, i) || n <= 0 || i <= 0)) {
          var a = _0, o = _0;
          if (r === cr) {
            var s = this._lookup;
            a = s.to, o = s.from;
          }
          this.powStub.setExtent2(r, a[zl] = n, a[Vl] = i);
          var l = this.base;
          this.intervalStub.setExtent2(r, o[zl] = Fl(n, l), o[Vl] = Fl(i, l));
        }
      },
      getFilter: function() {
        return {
          g: 0
        };
      },
      sanitize: function(r, n) {
        return qa(n[0], n[1]) && un(r) && r <= 0 && (r = n[0]), r;
      },
      getDefaultStartValue: function() {
        return 1;
      },
      getExtent: function() {
        return this.powStub.getExtent();
      },
      getExtentUnsafe: function(r, n) {
        return n === null ? this.powStub.getExtentUnsafe(r, null) : this.intervalStub.getExtentUnsafe(r, n);
      }
    }, e;
  })(Er)
);
Er.registerClass(XT);
var m0 = {}, y0 = {}, _0 = [], KT = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
}, qT = Wt();
function GO(t) {
  var e = t.get("type");
  return (
    // In ec option, `xxxAxis.type` may be undefined.
    (e == null || !qe(KT, e) && !Er.getClass(e)) && (e = "value"), e
  );
}
function WO(t, e, r) {
  var n = Pe(), i;
  switch (n && (i = ZT(t, e)), e) {
    case "category":
      return new WT({
        ordinalMeta: t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(),
        extent: or()
      });
    case "time":
      return new YT({
        locale: t.ecModel.getLocaleModel(),
        useUTC: t.ecModel.get("useUTC"),
        breakOption: i
      });
    case "log":
      return new XT({
        logBase: t.get("logBase"),
        breakOption: i
      });
    case "value":
      return new Ua({
        breakOption: i
      });
    default:
      return new (Er.getClass(e) || Ua)({});
  }
}
function YO(t, e, r) {
  var n = t.getExtentUnsafe(cr, null), i = n[0], a = n[1];
  return qa(i, a) ? i === e || a === e ? XO : i < e && a > e ? $O : Gv : Gv;
}
var $O = 1, XO = 2, Gv = 3;
function KO(t) {
  qT(t).noOnMyZero = !0;
}
function qO(t) {
  return qT(t).noOnMyZero;
}
function Gf(t) {
  var e = t.getLabelModel().get("formatter");
  if (t.type === "time") {
    var r = GE(e);
    return function(i, a) {
      return t.scale.getFormattedLabel(i, a, r);
    };
  } else {
    if (at(e))
      return function(i) {
        var a = t.scale.getLabel(i), o = e.replace("{value}", a ?? "");
        return o;
      };
    if (_t(e)) {
      if (t.type === "category")
        return function(i, a) {
          return e(
            Qu(t, i),
            i.value - t.scale.getExtent()[0],
            null
            // Using `null` just for backward compat.
          );
        };
      var n = Pe();
      return function(i, a) {
        var o = null;
        return n && (o = n.makeAxisLabelFormatterParamBreak(o, i.break)), e(Qu(t, i), a, o);
      };
    } else
      return function(i) {
        return t.scale.getLabel(i);
      };
  }
}
function Qu(t, e) {
  var r = t.scale;
  return gn(r) ? r.getLabel(e) : e.value;
}
function kp(t) {
  var e = t.get("interval");
  return e ?? "auto";
}
function ZO(t) {
  return t.type === "category" && kp(t.getLabelModel()) === 0;
}
function jO(t, e) {
  var r = {};
  return P(t.mapDimensionsAll(e), function(n) {
    r[_O(t, n)] = !0;
  }), Kt(r);
}
function to(t) {
  return t === "middle" || t === "center";
}
function Es(t) {
  return t.getShallow("show");
}
function ZT(t, e, r) {
  var n = t.get("breaks", !0);
  if (n != null)
    return !Pe() || !JO(e) ? void 0 : n;
}
function JO(t) {
  return t !== "category";
}
function jT(t, e, r, n, i, a) {
  var o = Qa(t), s = o ? t.intervalStub : t;
  if (s.setExtent(n[0], n[1]), o) {
    var l = t.powStub, u = {
      depth: Zu
    }, f = t.transformOut(n[0], u), c = t.transformOut(n[1], u), h = PO(r, n);
    e[0] && !h[0] && (f = i[0]), e[1] && !h[1] && (c = i[1]), l.setExtent(f, c);
  }
  s.setConfig(a);
}
function Zs(t, e) {
  return gn(t) ? t.getRawOrdinalNumber(e.value) : e.value;
}
function JT(t, e) {
  return gn(t) && !!e.get("boundaryGap");
}
var QO = (
  /** @class */
  (function() {
    function t() {
    }
    return t.prototype.needIncludeZero = function() {
      return !this.option.scale;
    }, t.prototype.getCoordSysModel = function() {
    }, t;
  })()
), S0 = "|&", js = Wt(), tk = -2;
Wt();
function ek(t, e) {
  var r = t.model, n = js(qs(r.ecModel)).keyed, i = n && n.get(e);
  return i && i.get(r.uid);
}
function rk(t, e) {
  return QT(ek(t, e));
}
function nk(t, e) {
  var r = [];
  return ik(t.model.ecModel, function(n) {
    for (var i = 0; i < e.length; i++)
      e[i] && n.serByIdx[e[i].seriesIndex] && r.push(QT(n));
  }), r;
}
function ik(t, e) {
  var r = js(qs(t)).keyed;
  r && r.each(function(n, i) {
    n.each(function(a, o) {
      e(a, i, o);
    });
  });
}
function QT(t) {
  return {
    liPosMinGap: t ? t.liPosMinGap : void 0
  };
}
function ak(t, e) {
  var r = t.model.ecModel, n = js(qs(r)).axSer;
  n && ok(r, n.get(t.model.uid), e);
}
function ok(t, e, r) {
  if (e)
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      t.isSeriesFiltered(i) || r(i);
    }
}
function tw(t, e) {
  var r = t.model, n = js(qs(r.ecModel)).keys;
  n && P(n.get(r.uid), function(i) {
    e(i);
  });
}
function b0(t, e, r) {
  if (t) {
    var n = e.ecModel, i = js(qs(n)), a = t.model.uid, o = i.axSer || (i.axSer = gt()), s = o.get(a) || o.set(a, []);
    s.push(e);
    var l = e.subType, u = e.getBaseAxis() === t, f = w0.get(T0(l, u, r)) || w0.get(T0(l, u, null));
    if (f) {
      var c = i.keyed || (i.keyed = gt()), h = i.keys || (i.keys = gt()), v = f.key, d = c.get(v) || c.set(v, gt()), p = d.get(a);
      p || (p = d.set(a, {
        axis: t,
        sers: [],
        serByIdx: []
      }), p.metrics = f.getMetrics(t), (h.get(a) || h.set(a, [])).push(v)), p.sers.push(e), p.serByIdx[e.seriesIndex] = e;
    }
  }
}
function T0(t, e, r) {
  return t + S0 + vt(e, !0) + S0 + (r || "");
}
var w0 = gt(), sk = Wt(), lk = 1, uk = 3, ew = (
  /** @class */
  (function() {
    function t(e, r, n, i, a) {
      var o = gn(e), s = o ? r.getCategories().length : null, l;
      if (o) {
        var u = r.getCategories(!0);
        l = u && !u.length;
      }
      var f = n.slice();
      (Ju(e) || Qa(e) || Pp(e)) && (yS(f, Co(e, r.get("dataMin", !0))), _S(f, Co(e, r.get("dataMax", !0)))), $A(f) || (f[0] = f[1] = NaN);
      var c = [], h = [!1, !1], v = r.get("min", !0);
      v === "dataMin" ? (c[0] = f[0], h[0] = !0) : (c[0] = Co(e, _t(v) ? v({
        min: f[0],
        max: f[1]
      }) : v), h[0] = c[0] != null);
      var d = r.get("max", !0);
      d === "dataMax" ? (c[1] = f[1], h[1] = !0) : (c[1] = Co(e, _t(d) ? d({
        min: f[0],
        max: f[1]
      }) : d), h[1] = c[1] != null);
      var p = fk(e, r), m = o ? null : f[1] - f[0] || Math.abs(f[0]);
      c[0] == null && (c[0] = o ? l ? f[0] : s ? 0 : NaN : f[0] - p[0] * m), c[1] == null && (c[1] = o ? l ? f[1] : s ? s - 1 : NaN : f[1] + p[1] * m), !Rn(c[0]) && (c[0] = NaN), !Rn(c[1]) && (c[1] = NaN);
      var g = l || gs(c[0]) || gs(c[1]) || o && !s, y = Ju(e), _ = y && r.needIncludeZero && r.needIncludeZero();
      _ && (c[0] > 0 && c[1] > 0 && !h[0] && (c[0] = 0), c[0] < 0 && c[1] < 0 && !h[1] && (c[1] = 0));
      var S = !1;
      c[0] > c[1] && (c.reverse(), S = !0);
      var b = Co(e, r.get("startValue", !0)), T = b != null;
      !un(b) && i && (b = e.getDefaultStartValue ? e.getDefaultStartValue() : 0), un(b) && (T || !y || _) && (b < c[0] && !h[0] ? (c[0] = b, h[0] = !0) : b > c[1] && !h[1] && (c[1] = b, h[1] = !0));
      var C = this._i = {
        scale: e,
        dataMM: f,
        noZoomEffMM: c,
        zoomMM: [],
        fixMM: h,
        zoomFixMM: [!1, !1],
        startValue: b,
        isBlank: g,
        incl0: _,
        tggAxInv: S,
        ctnShp: a
      };
      x0(C, c);
    }
    return t.prototype.makeNoZoom = function() {
      return this._i.noZoomEffMM.slice();
    }, t.prototype.makeFinal = function() {
      var e = this._i, r = e.zoomMM, n = e.noZoomEffMM, i = e.zoomFixMM, a = e.fixMM, o = {
        fixMM: a,
        zoomFixMM: i,
        isBlank: e.isBlank,
        incl0: e.incl0,
        tggAxInv: e.tggAxInv,
        ctnShp: e.ctnShp,
        effMM: n.slice()
      }, s = o.effMM;
      return r[0] != null && (s[0] = r[0], a[0] = i[0] = !0), r[1] != null && (s[1] = r[1], a[1] = i[1] = !0), x0(e, s), o;
    }, t.prototype.makeRenderInfo = function() {
      return {
        startValue: this._i.startValue
      };
    }, t.prototype.setZoomMM = function(e, r) {
      this._i.zoomMM[e] = r;
    }, t;
  })()
);
function x0(t, e) {
  var r = t.scale, n = t.dataMM;
  r.sanitize && (e[0] = r.sanitize(e[0], n), e[1] = r.sanitize(e[1], n), XA(e));
}
function Co(t, e) {
  return e == null ? null : gs(e) ? NaN : t.parse(e);
}
function fk(t, e) {
  var r;
  if (gn(t))
    r = [0, 0];
  else {
    var n = e.get("boundaryGap");
    typeof n == "boolean" && (n = null), r = J(n) ? n : [n, n];
  }
  return [C0(r[0]), C0(r[1])];
}
function C0(t) {
  return Xa(typeof t == "boolean" ? 0 : t, 1) || 0;
}
function rw(t) {
  var e = sk(t.scale);
  return e.extent || (e.extent = or()), e;
}
function ck(t, e) {
  rw(t).dimIdxInCoord = e.get(t.dim);
}
function hk(t, e) {
  var r = t.scale, n = t.model, i = t.dim;
  r.rawExtentInfo || vk(r, t, i, n, e);
}
function vk(t, e, r, n, i) {
  var a = rw(e), o = a.extent, s = !1;
  ak(e, function(f) {
    if (f.boxCoordinateSystem) {
      var c = Db(f).coord, h = a.dimIdxInCoord;
      if (h >= 0) {
        if (J(c)) {
          var v = c[h];
          v != null && !J(v) && uv(o, t.parse(v));
        }
      }
    } else if (f.coordinateSystem) {
      var d = f.getData();
      if (d) {
        var p = t.getFilter ? t.getFilter() : null;
        P(jO(d, r), function(m) {
          YA(o, d.getApproximateExtent(m, p));
        });
      }
      f.__requireStartValue && f.__requireStartValue(e) && (s = !0);
    }
  });
  var l = pk(t, e, n), u = new ew(t, n, o, s, l);
  nw(t, u, i), a.extent = null;
}
function dk(t, e) {
  var r = t.scale;
  nw(r, new ew(r, t.model, e, !1, !1), uk);
}
function nw(t, e, r) {
  t.rawExtentInfo = e, e.from = r;
}
var iw = gt();
function aw(t, e, r, n, i) {
  t.rawExtentInfo || dk({
    scale: t,
    model: e
  }, or());
  var a = t.rawExtentInfo.makeFinal(), o = a.effMM;
  return t.setExtent(o[0], o[1]), t.setBlank(a.isBlank), n && a.tggAxInv && r && !r.get("legacyMinMaxDontInverseAxis") && (n.inverse = !n.inverse), a;
}
function pk(t, e, r) {
  var n = JT(t, r), i = r.get("containShape", !0);
  if (i == null && !n && (i = !0), !i)
    return !1;
  var a = !1;
  return tw(e, function(o) {
    a = !!iw.get(o) || a;
  }), a;
}
function gk(t, e, r, n) {
  if (r.ctnShp) {
    var i;
    if (tw(t, function(s) {
      var l = iw.get(s);
      if (l) {
        var u = l(t, n);
        u && (i = i || [0, 0], yS(i, u[0]), _S(i, u[1]), KO(t));
      }
    }), !!i) {
      var a = e.getExtent();
      if (gn(e))
        t.onBand || e.setExtent2(Is, Ze(a[0], a[0] + i[0]), Nt(a[1], a[1] + i[1]));
      else {
        var o = a.slice();
        r.zoomFixMM[0] || (o[0] = Ze(o[0], e.transformOut(e.transformIn(o[0], null) + i[0], null))), r.zoomFixMM[1] || (o[1] = Nt(o[1], e.transformOut(e.transformIn(o[1], null) + i[1], null))), (o[0] < a[0] || o[1] > a[1]) && e.setExtent2(Is, o[0], o[1]);
      }
    }
  }
}
function D0(t, e) {
  var r = Qa(t), n = r ? t.intervalStub : t, i = e.fixMinMax || [], a = r ? t.getExtent() : null, o = n.getExtent(), s = UT(o, i, e.rawExtentResult);
  n.setExtent(s[0], s[1]), s = n.getExtent();
  var l = r ? yk(n, e) : mk(n, e), u = l.intervalPrecision, f = l.interval, c = e.userInterval;
  c != null && (l.interval = c, l.intervalPrecision = na(c)), i[0] || (s[0] = Mt(Ka(s[0] / f) * f, u)), i[1] || (s[1] = Mt(Us(s[1] / f) * f, u)), c != null && (l.niceExtent = s.slice()), jT(t, i, o, s, a, l);
}
function mk(t, e) {
  var r = Rp(e.splitNumber, 5), n = Uf(t), i = e.minInterval, a = e.maxInterval, o = Rd(n / r, !0);
  i != null && o < i && (o = i), a != null && o > a && (o = a);
  var s = na(o), l = t.getExtent(), u = [Mt(Us(l[0] / o) * o, s), Mt(Ka(l[1] / o) * o, s)];
  return {
    interval: o,
    intervalPrecision: s,
    niceExtent: u
  };
}
function yk(t, e) {
  var r = Rp(e.splitNumber, 10), n = t.getExtent(), i = Uf(t), a = Nt(fS(i), 1), o = r / i * a;
  o <= 0.5 && (a *= 10);
  var s = na(a), l = [Mt(Us(n[0] / a) * a, s), Mt(Ka(n[1] / a) * a, s)];
  return {
    intervalPrecision: s,
    interval: a,
    niceExtent: l
  };
}
function M0(t) {
  var e = t.scale, r = t.model, n = r.axis, i = r.ecModel;
  _k(e, r, n, i);
}
function _k(t, e, r, n, i) {
  var a = aw(t, e, n, r), o = Ju(t) || Pp(t);
  Sk(t, {
    splitNumber: e.get("splitNumber"),
    fixMinMax: a.fixMM,
    userInterval: e.get("interval"),
    minInterval: o ? e.get("minInterval") : null,
    maxInterval: o ? e.get("maxInterval") : null,
    rawExtentResult: a
  }), r && n && gk(r, t, a, n);
}
function Sk(t, e) {
  bk[t.type](t, e);
}
var bk = {
  interval: D0,
  log: D0,
  time: VO,
  ordinal: we
}, A0 = [], Tk = {
  registerPreprocessor: LT,
  registerProcessor: ET,
  registerPostInit: XR,
  registerPostUpdate: KR,
  registerUpdateLifecycle: Mp,
  registerAction: ao,
  registerCoordinateSystem: qR,
  registerLayout: ZR,
  registerVisual: oa,
  registerTransform: JR,
  registerLoading: PT,
  registerMap: jR,
  registerImpl: Z2,
  PRIORITY: zR,
  ComponentModel: kt,
  ComponentView: cn,
  SeriesModel: ui,
  ChartView: nn,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(t) {
    kt.registerClass(t);
  },
  registerComponentView: function(t) {
    cn.registerClass(t);
  },
  registerSeriesModel: function(t) {
    ui.registerClass(t);
  },
  registerChartView: function(t) {
    nn.registerClass(t);
  },
  registerCustomSeries: function(t, e) {
  },
  registerSubTypeDefaulter: function(t, e) {
    kt.registerSubTypeDefaulter(t, e);
  },
  registerPainter: function(t, e) {
    pA(t, e);
  }
};
function fi(t) {
  if (J(t)) {
    P(t, function(e) {
      fi(e);
    });
    return;
  }
  At(A0, t) >= 0 || (A0.push(t), _t(t) && (t = {
    install: t
  }), t.install(Tk));
}
var wk = Wt(), as = Wt(), Ar = {
  estimate: 1,
  determine: 2
};
function tf(t) {
  return {
    out: {
      noPxChangeTryDetermine: []
    },
    kind: t
  };
}
function xk(t, e) {
  var r = t.getLabelModel().get("customValues");
  if (r) {
    var n = t.scale;
    return {
      labels: pt(ow(r, n), function(i, a) {
        return {
          formattedLabel: Gf(t)(i, a),
          rawLabel: n.getLabel(i),
          tick: i
        };
      })
    };
  }
  return t.type === "category" ? Dk(t, e) : Ak(t);
}
function Ck(t, e, r) {
  var n = t.scale, i = t.getTickModel().get("customValues");
  return i ? {
    ticks: ow(i, n)
  } : t.type === "category" ? Mk(t, e) : {
    ticks: n.getTicks(r)
  };
}
function ow(t, e) {
  var r = e.getExtent(), n = [];
  return P(t, function(i) {
    i = e.parse(i), i >= r[0] && i <= r[1] && n.push(i);
  }), Bd(n, qA, null), lS(n), pt(n, function(i) {
    return {
      value: i
    };
  });
}
function Dk(t, e) {
  var r = t.getLabelModel(), n = sw(t, r, e);
  return !r.get("show") || t.scale.isBlank() ? {
    labels: []
  } : n;
}
function sw(t, e, r) {
  var n = Lk(t), i = kp(e), a = r.kind === Ar.estimate;
  if (!a) {
    var o = uw(n, i);
    if (o)
      return o;
  }
  var s, l;
  _t(i) ? s = ef(t, i, !1) : (l = i === "auto" ? Ek(t, r) : i, s = ef(t, l, !1));
  var u = {
    labels: s,
    labelCategoryInterval: l
  };
  return a ? r.out.noPxChangeTryDetermine.push(function() {
    return Wv(n, i, u), !0;
  }) : Wv(n, i, u), u;
}
function Mk(t, e) {
  var r = Ik(t), n = kp(e), i = uw(r, n);
  if (i)
    return i;
  var a, o;
  if ((!e.get("show") || t.scale.isBlank()) && (a = []), _t(n))
    a = ef(t, n, !0);
  else if (n === "auto") {
    var s = sw(t, t.getLabelModel(), tf(Ar.determine));
    o = s.labelCategoryInterval, a = pt(s.labels, function(l) {
      return l.tick;
    });
  } else
    o = n, a = ef(t, o, !0);
  return Wv(r, n, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function Ak(t) {
  var e = t.scale.getTicks(), r = Gf(t);
  return {
    labels: pt(e, function(n, i) {
      return {
        formattedLabel: r(n, i),
        rawLabel: t.scale.getLabel(n),
        tick: n
      };
    })
  };
}
var Ik = lw("axisTick"), Lk = lw("axisLabel");
function lw(t) {
  return function(r) {
    return as(r)[t] || (as(r)[t] = {
      list: []
    });
  };
}
function uw(t, e) {
  for (var r = 0; r < t.list.length; r++)
    if (t.list[r].key === e)
      return t.list[r].value;
}
function Wv(t, e, r) {
  return t.list.push({
    key: e,
    value: r
  }), r;
}
function Ek(t, e) {
  if (e.kind === Ar.estimate) {
    var r = t.calculateCategoryInterval(e);
    return e.out.noPxChangeTryDetermine.push(function() {
      return as(t).autoInterval = r, !0;
    }), r;
  }
  var n = as(t).autoInterval;
  return n ?? (as(t).autoInterval = t.calculateCategoryInterval(e));
}
function Pk(t, e) {
  var r = e.kind, n = Ok(t), i = Gf(t), a = (n.axisRotate - n.labelRotate) / 180 * Math.PI, o = t.scale, s = o.getExtent(), l = o.count();
  if (s[1] - s[0] < 1)
    return 0;
  var u = 1, f = 40;
  l > f && (u = Math.max(1, Math.floor(l / f)));
  for (var c = s[0], h = t.dataToCoord(c + 1) - t.dataToCoord(c), v = Math.abs(h * Math.cos(a)), d = Math.abs(h * Math.sin(a)), p = 0, m = 0; c <= s[1]; c += u) {
    var g = 0, y = 0, _ = nS(i({
      value: c
    }), n.font, "center", "top");
    g = _.width * 1.3, y = _.height * 1.3, p = Math.max(p, g, 7), m = Math.max(m, y, 7);
  }
  var S = p / v, b = m / d;
  isNaN(S) && (S = 1 / 0), isNaN(b) && (b = 1 / 0);
  var T = Math.max(0, Math.floor(Math.min(S, b)));
  if (r === Ar.estimate)
    return e.out.noPxChangeTryDetermine.push(Xt(Rk, null, t, T, l)), T;
  var C = fw(t, T, l);
  return C ?? T;
}
function Rk(t, e, r) {
  return fw(t, e, r) == null;
}
function fw(t, e, r) {
  var n = wk(t.model), i = t.getExtent(), a = n.lastAutoInterval, o = n.lastTickCount;
  if (a != null && o != null && Math.abs(a - e) <= 1 && Math.abs(o - r) <= 1 && a > e && n.axisExtent0 === i[0] && n.axisExtent1 === i[1])
    return a;
  n.lastTickCount = r, n.lastAutoInterval = e, n.axisExtent0 = i[0], n.axisExtent1 = i[1];
}
function Ok(t) {
  var e = t.getLabelModel();
  return {
    axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
    labelRotate: e.get("rotate") || 0,
    font: e.getFont()
  };
}
function ef(t, e, r) {
  var n = Gf(t), i = t.scale, a = [], o = _t(e);
  return GT(i, o ? 0 : e, function(s, l) {
    var u = i.getLabel(s);
    if (o) {
      var f = !!e(s.value, u);
      if (s.offInterval = !f, !f && !l)
        return;
    }
    a.push(r ? s : {
      formattedLabel: n(s),
      rawLabel: u,
      tick: s
    });
  }), a;
}
var kk = 0.8;
function Wf(t, e) {
  e = e || {};
  var r = {
    w: NaN,
    w2: NaN
  }, n = t.scale, i = e.fromStat, a = e.min, o = AO(n);
  un(o) || (o = NaN);
  var s = t.getExtent(), l = ce(s[1] - s[0]);
  return gn(n) ? Bk(r, t, o, l) : i && Nk(r, t, o, l, i), a != null && (r.w = un(r.w) ? Nt(a, r.w) : a), r;
}
function Bk(t, e, r, n) {
  var i = e.onBand, a = r + (i ? 1 : 0);
  a === 0 && (a = 1), t.w = n / a, !i && r && n && (t.w2 = t.w * r / n);
}
function Nk(t, e, r, n, i) {
  var a = !1, o = -1 / 0;
  P(i.key ? [rk(e, i.key)] : nk(e, i.sers || []), function(s) {
    var l = s.liPosMinGap;
    l != null && (l > 0 ? (l > o && (o = l), a = !1) : l === tk && (a = !0));
  }), un(r) && r > 0 && un(o) ? (t.w = n / r * o, t.w2 = o) : a && (t.w = n * kk, t.w2 = t.w * r / n);
}
var I0 = [0, 1], Fk = (
  /** @class */
  (function() {
    function t(e, r, n) {
      this.onBand = !1, this.inverse = !1, this.dim = e, this.scale = r, this._extent = n || [0, 0];
    }
    return t.prototype.contain = function(e) {
      var r = this._extent, n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]);
      return e >= n && e <= i;
    }, t.prototype.containData = function(e) {
      return this.scale.contain(this.scale.parse(e));
    }, t.prototype.getExtent = function() {
      return this._extent.slice();
    }, t.prototype.setExtent = function(e, r) {
      var n = this._extent;
      n[0] = e, n[1] = r;
    }, t.prototype.dataToCoord = function(e, r) {
      var n = this.scale;
      return e = n.normalize(n.parse(e)), um(e, I0, L0(this), r);
    }, t.prototype.coordToData = function(e, r) {
      var n = um(e, L0(this), I0, r);
      return this.scale.scale(n);
    }, t.prototype.pointToData = function(e, r) {
    }, t.prototype.getTicksCoords = function(e) {
      e = e || {};
      var r = e.tickModel || this.getTickModel(), n = Ck(this, r, {
        breakTicks: e.breakTicks,
        pruneByBreak: e.pruneByBreak
      }), i = pt(n.ticks, function(s) {
        return {
          coord: this.dataToCoord(Zs(this.scale, s)),
          tick: s
        };
      }, this), a = r.get("alignWithLabel"), o = Hk(this, i, a);
      return pt(i, function(s) {
        return {
          coord: s.coord,
          tickValue: s.tick.value,
          onBand: o
        };
      });
    }, t.prototype.getMinorTicksCoords = function() {
      if (gn(this.scale))
        return [];
      var e = this.model.getModel("minorTick"), r = e.get("splitNumber");
      r > 0 && r < 100 || (r = 5);
      var n = this.scale.getMinorTicks(r), i = pt(n, function(a) {
        return pt(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return i;
    }, t.prototype.getViewLabels = function(e) {
      return e = e || tf(Ar.determine), xk(this, e).labels;
    }, t.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, t.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, t.prototype.getBandWidth = function() {
      return Wf(this, {
        min: 1
      }).w;
    }, t.prototype.calculateCategoryInterval = function(e) {
      return e = e || tf(Ar.determine), Pk(this, e);
    }, t;
  })()
);
function L0(t) {
  var e = t.getExtent();
  if (t.onBand) {
    var r = e[1] - e[0], n = r / t.scale.count() / 2;
    e[0] += n, e[1] -= n;
  }
  return e;
}
function Hk(t, e, r) {
  var n = e.length;
  if (!t.onBand || r || !n)
    return !1;
  var i = Wf(t).w;
  if (!i)
    return !1;
  P(e, function(s) {
    s.coord -= i / 2;
  });
  var a = t.scale.getExtent(), o = e[n - 1];
  return o.tick.offInterval && e.pop(), e.push({
    coord: o.coord + i,
    tick: {
      value: a[1] + 1
    }
  }), !0;
}
var E0 = ["label", "labelLine", "layoutOption", "priority", "defaultAttr", "marginForce", "minMarginForce", "marginDefault", "suggestIgnore"], zk = 1, rf = 2, cw = zk | rf;
function nf(t, e, r) {
  r = r || cw, e ? t.dirty |= r : t.dirty &= ~r;
}
function hw(t, e) {
  return e = e || cw, t.dirty == null || !!(t.dirty & e);
}
function hn(t) {
  if (t)
    return hw(t) && Vk(t, t.label, t), t;
}
function Vk(t, e, r) {
  var n = e.getComputedTransform();
  t.transform = np(t.transform, n);
  var i = t.localRect = Ts(t.localRect, e.getBoundingRect()), a = e.style, o = a.margin, s = r && r.marginForce, l = r && r.minMarginForce, u = r && r.marginDefault, f = a.__marginType;
  f == null && u && (o = u, f = Pa.textMargin);
  for (var c = 0; c < 4; c++)
    gh[c] = f === Pa.minMargin && l && l[c] != null ? l[c] : s && s[c] != null ? s[c] : o ? o[c] : 0;
  f === Pa.textMargin && zu(i, gh, !1, !1);
  var h = t.rect = Ts(t.rect, i);
  return n && h.applyTransform(n), f === Pa.minMargin && zu(h, gh, !1, !1), t.axisAligned = rp(n), (t.label = t.label || {}).ignore = e.ignore, nf(t, !1), nf(t, !0, rf), t;
}
var gh = [0, 0, 0, 0];
function Uk(t, e, r) {
  return t.transform = np(t.transform, r), t.localRect = Ts(t.localRect, e), t.rect = Ts(t.rect, e), r && t.rect.applyTransform(r), t.axisAligned = rp(r), t.obb = void 0, (t.label = t.label || {}).ignore = !1, t;
}
function Gk(t, e) {
  if (t) {
    t.label.x += e.x, t.label.y += e.y, t.label.markRedraw();
    var r = t.transform;
    r && (r[4] += e.x, r[5] += e.y);
    var n = t.rect;
    n && (n.x += e.x, n.y += e.y);
    var i = t.obb;
    i && i.fromBoundingRect(t.localRect, r);
  }
}
function P0(t, e) {
  for (var r = 0; r < E0.length; r++) {
    var n = E0[r];
    t[n] == null && (t[n] = e[n]);
  }
  return hn(t);
}
function R0(t) {
  var e = t.obb;
  return (!e || hw(t, rf)) && (t.obb = e = e || new JS(), e.fromBoundingRect(t.localRect, t.transform), nf(t, !1, rf)), e;
}
function Wk(t) {
  var e = [];
  t.sort(function(u, f) {
    return (f.suggestIgnore ? 1 : 0) - (u.suggestIgnore ? 1 : 0) || f.priority - u.priority;
  });
  function r(u) {
    if (!u.ignore) {
      var f = u.ensureState("emphasis");
      f.ignore == null && (f.ignore = !1);
    }
    u.ignore = !0;
  }
  for (var n = 0; n < t.length; n++) {
    var i = hn(t[n]);
    if (!i.label.ignore) {
      for (var a = i.label, o = i.labelLine, s = !1, l = 0; l < e.length; l++)
        if (Bp(i, e[l], null, {
          touchThreshold: 0.05
        })) {
          s = !0;
          break;
        }
      s ? (r(a), o && r(o)) : e.push(i);
    }
  }
}
function Bp(t, e, r, n) {
  return !t || !e || t.label && t.label.ignore || e.label && e.label.ignore || !t.rect.intersect(e.rect, r, n) ? !1 : t.axisAligned && e.axisAligned ? !0 : R0(t).intersect(R0(e), r, n);
}
var Yk = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.hasSymbolVisual = !0, r;
    }
    return e.prototype.getInitialData = function(r) {
      return TO(null, this, {
        useEncodeDefaulter: !0
      });
    }, e.prototype.getLegendIcon = function(r) {
      var n = new pe(), i = Ja("line", 0, r.itemHeight / 2, r.itemWidth, 0, r.lineStyle.stroke, !1);
      n.add(i), i.setStyle(r.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = r.itemHeight * 0.8, u = Ja(s, (r.itemWidth - l) / 2, (r.itemHeight - l) / 2, l, l, r.itemStyle.fill);
      n.add(u), u.setStyle(r.itemStyle);
      var f = r.iconRotate === "inherit" ? o : r.iconRotate || 0;
      return u.rotation = f * Math.PI / 180, u.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = ht.color.neutral00, u.style.lineWidth = 2), n;
    }, e.type = "series.line", e.dependencies = ["grid", "polar"], e.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: !1,
      // Disabled if step is true
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 6,
      symbolRotate: null,
      showSymbol: !0,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point. (non-finite values)
      connectNulls: !1,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      /**
       * @deprecated
       */
      triggerLineEvent: !1,
      triggerEvent: !1
    }, e;
  })(ui)
);
function vw(t, e) {
  var r = t.mapDimensionsAll("defaultedLabel"), n = r.length;
  if (n === 1) {
    var i = ja(t, e, r[0]);
    return i != null ? i + "" : null;
  } else if (n) {
    for (var a = [], o = 0; o < r.length; o++)
      a.push(ja(t, e, r[o]));
    return a.join(" ");
  }
}
function $k(t, e) {
  var r = t.mapDimensionsAll("defaultedLabel");
  if (!J(e))
    return e + "";
  for (var n = [], i = 0; i < r.length; i++) {
    var a = t.getDimensionIndex(r[i]);
    a >= 0 && n.push(e[a]);
  }
  return n.join(" ");
}
var Np = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r, n, i, a) {
      var o = t.call(this) || this;
      return o.updateData(r, n, i, a), o;
    }
    return e.prototype._createSymbol = function(r, n, i, a, o, s) {
      this.removeAll();
      var l = Ja(r, -1, -1, 2, 2, null, s);
      l.attr({
        z2: vt(o, 100),
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), l.drift = Xk, this._symbolType = r, this.add(l);
    }, e.prototype.stopSymbolAnimation = function(r) {
      this.childAt(0).stopAnimation(null, r);
    }, e.prototype.getSymbolType = function() {
      return this._symbolType;
    }, e.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, e.prototype.highlight = function() {
      Nu(this.childAt(0));
    }, e.prototype.downplay = function() {
      Fu(this.childAt(0));
    }, e.prototype.setZ = function(r, n) {
      var i = this.childAt(0);
      i.zlevel = r, i.z = n;
    }, e.prototype.setDraggable = function(r, n) {
      var i = this.childAt(0);
      i.draggable = r, i.cursor = !n && r ? "move" : i.cursor;
    }, e.prototype.updateData = function(r, n, i, a) {
      this.silent = !1;
      var o = r.getItemVisual(n, "symbol") || "circle", s = r.hostModel, l = e.getSymbolSize(r, n), u = e.getSymbolZ2(r, n), f = o !== this._symbolType, c = a && a.disableAnimation;
      if (f) {
        var h = r.getItemVisual(n, "symbolKeepAspect");
        this._createSymbol(o, r, n, l, u, h);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var d = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        c ? v.attr(d) : si(v, d, s, n), tE(v);
      }
      if (this._updateCommon(r, n, l, i, a), f) {
        var v = this.childAt(0);
        if (!c) {
          var d = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: v.style.opacity
            }
          };
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, Xs(v, d, s, n);
        }
      }
      c && this.childAt(0).stopAnimation("leave");
    }, e.prototype._updateCommon = function(r, n, i, a, o) {
      var s = this.childAt(0), l = r.hostModel, u, f, c, h, v, d, p, m, g;
      if (a && (u = a.emphasisItemStyle, f = a.blurItemStyle, c = a.selectItemStyle, h = a.focus, v = a.blurScope, p = a.labelStatesModels, m = a.hoverScale, g = a.cursorStyle, d = a.emphasisDisabled), !a || r.hasItemOption) {
        var y = a && a.itemModel ? a.itemModel : r.getItemModel(n), _ = y.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), c = y.getModel(["select", "itemStyle"]).getItemStyle(), f = y.getModel(["blur", "itemStyle"]).getItemStyle(), h = _.get("focus"), v = _.get("blurScope"), d = _.get("disabled"), p = ap(y), m = _.getShallow("scale"), g = y.getShallow("cursor");
      }
      var S = r.getItemVisual(n, "symbolRotate");
      s.attr("rotation", (S || 0) * Math.PI / 180 || 0);
      var b = fT(r.getItemVisual(n, "symbolOffset"), i);
      b && (s.x = b[0], s.y = b[1]), g && s.attr("cursor", g);
      var T = r.getItemVisual(n, "style"), C = T.fill;
      if (s instanceof hi) {
        var E = s.style;
        s.useStyle(q({
          // TODO other properties like x, y ?
          image: E.image,
          x: E.x,
          y: E.y,
          width: E.width,
          height: E.height
        }, T));
      } else
        s.__isEmptyBrush ? s.useStyle(q({}, T)) : s.useStyle(T), s.style.decal = null, s.setColor(C, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var A = r.getItemVisual(n, "liftZ"), M = this._z2;
      A != null ? M == null && (this._z2 = s.z2, s.z2 += A) : M != null && (s.z2 = M, this._z2 = null);
      var R = o && o.useNameLabel;
      ip(s, p, {
        labelFetcher: l,
        labelDataIndex: n,
        defaultText: B,
        inheritColor: C,
        defaultOpacity: T.opacity
      });
      function B(U) {
        return R ? r.getName(U) : vw(r, U);
      }
      this._sizeX = i[0] / 2, this._sizeY = i[1] / 2;
      var O = s.ensureState("emphasis");
      O.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = f;
      var F = m == null || m === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(m) && m > 0 ? +m : 1;
      O.scaleX = this._sizeX * F, O.scaleY = this._sizeY * F, this.setSymbolScale(1), yv(this, h, v, d);
    }, e.prototype.setSymbolScale = function(r) {
      this.scaleX = this.scaleY = r;
    }, e.prototype.fadeOut = function(r, n, i) {
      var a = this.childAt(0), o = Bt(this).dataIndex, s = i && i.animation;
      if (this.silent = a.silent = !0, i && i.fadeLabel) {
        var l = a.getTextContent();
        l && Hu(l, {
          style: {
            opacity: 0
          }
        }, n, {
          dataIndex: o,
          removeOpt: s,
          cb: function() {
            a.removeTextContent();
          }
        });
      } else
        a.removeTextContent();
      Hu(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, n, {
        dataIndex: o,
        cb: r,
        removeOpt: s
      });
    }, e.getSymbolSize = function(r, n) {
      return cR(r.getItemVisual(n, "symbolSize"));
    }, e.getSymbolZ2 = function(r, n) {
      return r.getItemVisual(n, "z2");
    }, e;
  })(pe)
);
function Xk(t, e) {
  this.parent.drift(t, e);
}
function Ul(t, e, r, n) {
  return e && !isNaN(e[0]) && !isNaN(e[1]) && !(n && n.isIgnore && n.isIgnore(r)) && !(n && n.clipShape && !n.clipShape.contain(e[0], e[1])) && t.getItemVisual(r, "symbol") !== "none";
}
function O0(t) {
  return t != null && !ft(t) && (t = {
    isIgnore: t
  }), t || {};
}
function k0(t) {
  var e = t.hostModel, r = e.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: e.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: e.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: ap(e),
    cursorStyle: e.get("cursor")
  };
}
function B0(t, e, r, n, i, a, o) {
  var s = new t(e, r, n, i);
  return s.setPosition(a), e.setItemGraphicEl(r, s), o.add(s), s;
}
var Kk = (
  /** @class */
  (function() {
    function t(e) {
      this.group = new pe(), this._SymbolCtor = e || Np;
    }
    return t.prototype.updateData = function(e, r) {
      this._progressiveEls = null, r = O0(r);
      var n = this.group, i = e.hostModel, a = this._data, o = this._SymbolCtor, s = r.disableAnimation, l = this._seriesScope = k0(e), u = {
        disableAnimation: s
      }, f = r.getSymbolPoint || function(c) {
        return e.getItemLayout(c);
      };
      a || n.removeAll(), e.diff(a).add(function(c) {
        var h = f(c);
        Ul(e, h, c, r) && B0(o, e, c, l, u, h, n);
      }).update(function(c, h) {
        var v = a.getItemGraphicEl(h), d = f(c);
        if (!Ul(e, d, c, r)) {
          n.remove(v);
          return;
        }
        var p = e.getItemVisual(c, "symbol") || "circle", m = v && v.getSymbolType && v.getSymbolType();
        if (!v || m && m !== p)
          n.remove(v), v = new o(e, c, l, u), v.setPosition(d);
        else {
          v.updateData(e, c, l, u);
          var g = {
            x: d[0],
            y: d[1]
          };
          s ? v.attr(g) : si(v, g, i);
        }
        n.add(v), e.setItemGraphicEl(c, v);
      }).remove(function(c) {
        var h = a.getItemGraphicEl(c);
        h && h.fadeOut(function() {
          n.remove(h);
        }, i);
      }).execute(), this._getSymbolPoint = f, this._data = e;
    }, t.prototype.updateLayout = function(e) {
      var r = this._data;
      if (r)
        for (var n = this, i = r.getStore(), a = 0, o = i.count(); a < o; a++) {
          var s = r.getItemGraphicEl(a), l = n._getSymbolPoint(a);
          Ul(r, l, a, e) ? (s = s || B0(n._SymbolCtor, r, a, n._seriesScope, {
            disableAnimation: !0
          }, l, n.group), s.stopAnimation(), s.setPosition(l), s.markRedraw()) : s && (n.group.remove(s), r.setItemGraphicEl(a, null));
        }
    }, t.prototype.incrementalPrepareUpdate = function(e) {
      this._seriesScope = k0(e), this._data = null, this.group.removeAll();
    }, t.prototype.incrementalUpdate = function(e, r, n, i) {
      this._progressiveEls = [], i = O0(i);
      function a(u) {
        u.isGroup || (u.incremental = n, u.ensureState("emphasis").hoverLayer = jd);
      }
      for (var o = e.start; o < e.end; o++) {
        var s = r.getItemLayout(o);
        if (Ul(r, s, o, i)) {
          var l = new this._SymbolCtor(r, o, this._seriesScope);
          l.traverse(a), l.setPosition(s), this.group.add(l), r.setItemGraphicEl(o, l), this._progressiveEls.push(l);
        }
      }
    }, t.prototype.eachRendered = function(e) {
      ep(this._progressiveEls || this.group, e);
    }, t.prototype.remove = function(e) {
      var r = this.group, n = this._data;
      n && e ? n.eachItemGraphicEl(function(i) {
        i.fadeOut(function() {
          r.remove(i);
        }, n.hostModel);
      }) : r.removeAll();
    }, t;
  })()
);
function dw(t, e, r) {
  var n = t.getBaseAxis(), i = t.getOtherAxis(n), a = qk(i, r), o = n.dim, s = i.dim, l = e.mapDimension(s), u = e.mapDimension(o), f = s === "x" || s === "radius" ? 1 : 0, c = pt(t.dimensions, function(d) {
    return e.mapDimension(d);
  }), h = !1, v = e.getCalculationInfo("stackResultDimension");
  return As(
    e,
    c[0]
    /* , dims[1] */
  ) && (h = !0, c[0] = v), As(
    e,
    c[1]
    /* , dims[0] */
  ) && (h = !0, c[1] = v), {
    dataDimsForPoint: c,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!h,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
  };
}
function qk(t, e) {
  var r = 0, n = t.scale.getExtent();
  return e === "start" ? r = n[0] : e === "end" ? r = n[1] : qt(e) && !isNaN(e) ? r = e : n[0] > 0 ? r = n[0] : n[1] < 0 && (r = n[1]), r;
}
function pw(t, e, r, n) {
  var i = NaN;
  t.stacked && (i = r.get(r.getCalculationInfo("stackedOverDimension"), n)), isNaN(i) && (i = t.valueStart);
  var a = t.baseDataOffset, o = [];
  return o[a] = r.get(t.baseDim, n), o[1 - a] = i, e.dataToPoint(o);
}
function pr(t, e) {
  return !isFinite(t) || !isFinite(e);
}
var Zk = typeof Float32Array !== $s ? Float32Array : void 0;
function Ra(t) {
  return jk({
    ctor: Zk
  }, t).arr;
}
function jk(t, e) {
  var r = t.arr, n = t.ctor;
  if (e > fm && (e = fm), !r || t.typed && r.length < e) {
    var i = void 0;
    if (n)
      try {
        i = new n(e), t.typed = !0, r && i.set(r);
      } catch {
      }
    if (!i && (i = [], t.typed = !1, r))
      for (var a = 0, o = r.length; a < o; a++)
        i[a] = r[a];
    t.arr = i;
  }
  return t;
}
function Jk(t, e) {
  var r = [];
  return e.diff(t).add(function(n) {
    r.push({
      cmd: "+",
      idx: n
    });
  }).update(function(n, i) {
    r.push({
      cmd: "=",
      idx: i,
      idx1: n
    });
  }).remove(function(n) {
    r.push({
      cmd: "-",
      idx: n
    });
  }).execute(), r;
}
function Qk(t, e, r, n, i, a, o, s) {
  for (var l = Jk(t, e), u = [], f = [], c = [], h = [], v = [], d = [], p = [], m = dw(i, e, o), g = t.getLayout("points") || [], y = e.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var S = l[_], b = !0, T = void 0, C = void 0;
    switch (S.cmd) {
      case "=":
        T = S.idx * 2, C = S.idx1 * 2;
        var E = g[T], A = g[T + 1], M = y[C], R = y[C + 1];
        (isNaN(E) || isNaN(A)) && (E = M, A = R), u.push(E, A), f.push(M, R), c.push(r[T], r[T + 1]), h.push(n[C], n[C + 1]), p.push(e.getRawIndex(S.idx1));
        break;
      case "+":
        var B = S.idx, O = m.dataDimsForPoint, F = i.dataToPoint([e.get(O[0], B), e.get(O[1], B)]);
        C = B * 2, u.push(F[0], F[1]), f.push(y[C], y[C + 1]);
        var U = pw(m, i, e, B);
        c.push(U[0], U[1]), h.push(n[C], n[C + 1]), p.push(e.getRawIndex(B));
        break;
      case "-":
        b = !1;
    }
    b && (v.push(S), d.push(d.length));
  }
  d.sort(function(bt, St) {
    return p[bt] - p[St];
  });
  for (var H = u.length, W = Ra(H), V = Ra(H), j = Ra(H), rt = Ra(H), tt = [], _ = 0; _ < d.length; _++) {
    var it = d[_], ot = _ * 2, Z = it * 2;
    W[ot] = u[Z], W[ot + 1] = u[Z + 1], V[ot] = f[Z], V[ot + 1] = f[Z + 1], j[ot] = c[Z], j[ot + 1] = c[Z + 1], rt[ot] = h[Z], rt[ot + 1] = h[Z + 1], tt[_] = v[it];
  }
  return {
    current: W,
    next: V,
    stackedOnCurrent: j,
    stackedOnNext: rt,
    status: tt
  };
}
var Un = Math.min, Gn = Math.max;
function Yv(t, e, r, n, i, a, o, s, l) {
  for (var u, f, c, h, v, d, p = r, m = 0; m < n; m++) {
    var g = e[p * 2], y = e[p * 2 + 1];
    if (p >= i || p < 0)
      break;
    if (pr(g, y)) {
      if (l) {
        p += a;
        continue;
      }
      break;
    }
    if (p === r)
      t[a > 0 ? "moveTo" : "lineTo"](g, y), c = g, h = y;
    else {
      var _ = g - u, S = y - f;
      if (_ * _ + S * S < 0.5) {
        p += a;
        continue;
      }
      if (o > 0) {
        for (var b = p + a, T = e[b * 2], C = e[b * 2 + 1]; T === g && C === y && m < n; )
          m++, b += a, p += a, T = e[b * 2], C = e[b * 2 + 1], g = e[p * 2], y = e[p * 2 + 1], _ = g - u, S = y - f;
        var E = m + 1;
        if (l)
          for (; pr(T, C) && E < n; )
            E++, b += a, T = e[b * 2], C = e[b * 2 + 1];
        var A = 0.5, M = 0, R = 0, B = void 0, O = void 0;
        if (E >= n || pr(T, C))
          v = g, d = y;
        else {
          M = T - u, R = C - f;
          var F = g - u, U = T - g, H = y - f, W = C - y, V = void 0, j = void 0;
          if (s === "x") {
            V = Math.abs(F), j = Math.abs(U);
            var rt = M > 0 ? 1 : -1;
            v = g - rt * V * o, d = y, B = g + rt * j * o, O = y;
          } else if (s === "y") {
            V = Math.abs(H), j = Math.abs(W);
            var tt = R > 0 ? 1 : -1;
            v = g, d = y - tt * V * o, B = g, O = y + tt * j * o;
          } else
            V = Math.sqrt(F * F + H * H), j = Math.sqrt(U * U + W * W), A = j / (j + V), v = g - M * o * (1 - A), d = y - R * o * (1 - A), B = g + M * o * A, O = y + R * o * A, B = Un(B, Gn(T, g)), O = Un(O, Gn(C, y)), B = Gn(B, Un(T, g)), O = Gn(O, Un(C, y)), M = B - g, R = O - y, v = g - M * V / j, d = y - R * V / j, v = Un(v, Gn(u, g)), d = Un(d, Gn(f, y)), v = Gn(v, Un(u, g)), d = Gn(d, Un(f, y)), M = g - v, R = y - d, B = g + M * j / V, O = y + R * j / V;
        }
        t.bezierCurveTo(c, h, v, d, g, y), c = B, h = O;
      } else
        t.lineTo(g, y);
    }
    u = g, f = y, p += a;
  }
  return m;
}
var gw = (
  /** @class */
  /* @__PURE__ */ (function() {
    function t() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return t;
  })()
), tB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return n.type = "ec-polyline", n;
    }
    return e.prototype.getDefaultStyle = function() {
      return {
        stroke: ht.color.neutral99,
        fill: null
      };
    }, e.prototype.getDefaultShape = function() {
      return new gw();
    }, e.prototype.buildPath = function(r, n) {
      var i = n.points, a = 0, o = i.length / 2;
      if (n.connectNulls) {
        for (; o > 0 && pr(i[o * 2 - 2], i[o * 2 - 1]); o--)
          ;
        for (; a < o && pr(i[a * 2], i[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += Yv(r, i, a, o, o, 1, n.smooth, n.smoothMonotone, n.connectNulls) + 1;
    }, e.prototype.getPointOn = function(r, n) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var i = this.path, a = i.data, o = ea.CMD, s, l, u = n === "x", f = [], c = 0; c < a.length; ) {
        var h = a[c++], v = void 0, d = void 0, p = void 0, m = void 0, g = void 0, y = void 0, _ = void 0;
        switch (h) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (v = a[c++], d = a[c++], _ = u ? (r - s) / (v - s) : (r - l) / (d - l), _ <= 1 && _ >= 0) {
              var S = u ? (d - l) * _ + l : (v - s) * _ + s;
              return u ? [r, S] : [S, r];
            }
            s = v, l = d;
            break;
          case o.C:
            v = a[c++], d = a[c++], p = a[c++], m = a[c++], g = a[c++], y = a[c++];
            var b = u ? Du(s, v, p, g, r, f) : Du(l, d, m, y, r, f);
            if (b > 0)
              for (var T = 0; T < b; T++) {
                var C = f[T];
                if (C <= 1 && C >= 0) {
                  var S = u ? de(l, d, m, y, C) : de(s, v, p, g, C);
                  return u ? [r, S] : [S, r];
                }
              }
            s = g, l = y;
            break;
        }
      }
    }, e;
  })(Gt)
), eB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e;
  })(gw)
), rB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return n.type = "ec-polygon", n;
    }
    return e.prototype.getDefaultShape = function() {
      return new eB();
    }, e.prototype.buildPath = function(r, n) {
      var i = n.points, a = n.stackedOnPoints, o = 0, s = i.length / 2, l = n.smoothMonotone;
      if (n.connectNulls) {
        for (; s > 0 && pr(i[s * 2 - 2], i[s * 2 - 1]); s--)
          ;
        for (; o < s && pr(i[o * 2], i[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = Yv(r, i, o, s, s, 1, n.smooth, l, n.connectNulls);
        Yv(r, a, o + u - 1, u, s, -1, n.stackedOnSmooth, l, n.connectNulls), o += u + 1, r.closePath();
      }
    }, e;
  })(Gt)
);
function nB(t, e, r, n, i) {
  var a = t.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, f = r.get(["lineStyle", "width"]) || 0;
  o -= f / 2, s -= f / 2, l += f, u += f, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var c = new se({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (e) {
    var h = t.getBaseAxis(), v = h.isHorizontal(), d = h.inverse;
    v ? (d && (c.shape.x += l), c.shape.width = 0) : (d || (c.shape.y += u), c.shape.height = 0);
    var p = _t(i) ? function(m) {
      i(m, c);
    } : null;
    Xs(c, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, r, null, n, p);
  }
  return c;
}
function iB(t, e, r) {
  var n = t.getArea(), i = Mt(n.r0, 1), a = Mt(n.r, 1), o = new Rf({
    shape: {
      cx: Mt(t.cx, 1),
      cy: Mt(t.cy, 1),
      r0: i,
      r: a,
      startAngle: n.startAngle,
      endAngle: n.endAngle,
      clockwise: n.clockwise
    }
  });
  if (e) {
    var s = t.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = n.startAngle : o.shape.r = i, Xs(o, {
      shape: {
        endAngle: n.endAngle,
        r: a
      }
    }, r);
  }
  return o;
}
function aB(t, e) {
  return t.type === e;
}
function N0(t, e) {
  if (t.length === e.length) {
    for (var r = 0; r < t.length; r++)
      if (t[r] !== e[r])
        return;
    return !0;
  }
}
function F0(t) {
  for (var e = or(), r = or(), n = 0; n < t.length; ) {
    var i = t[n++], a = t[n++];
    pr(i, a) || (uv(e, i), uv(r, a));
  }
  return [e, r];
}
function H0(t, e) {
  var r = F0(t), n = r[0], i = r[1], a = F0(e), o = a[0], s = a[1];
  return Math.max(Math.abs(n[0] - o[0]), Math.abs(i[0] - s[0]), Math.abs(n[1] - o[1]), Math.abs(i[1] - s[1]));
}
function z0(t) {
  return qt(t) ? t : t ? 0.5 : 0;
}
function oB(t, e, r) {
  if (r.valueDim == null)
    return [];
  for (var n = e.count(), i = Ra(n * 2), a = 0; a < n; a++) {
    var o = pw(r, t, e, a);
    i[a * 2] = o[0], i[a * 2 + 1] = o[1];
  }
  return i;
}
function Wn(t, e, r, n, i) {
  var a = r.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], f = [], c = [], h = [];
  if (i) {
    for (l = 0; l < t.length; l += 2) {
      var v = e || t;
      pr(v[l], v[l + 1]) || h.push(t[l], t[l + 1]);
    }
    t = h;
  }
  for (l = 0; l < t.length - 2; l += 2)
    switch (c[0] = t[l + 2], c[1] = t[l + 3], f[0] = t[l], f[1] = t[l + 1], s.push(f[0], f[1]), n) {
      case "end":
        u[o] = c[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var d = (f[o] + c[o]) / 2, p = [];
        u[o] = p[o] = d, u[1 - o] = f[1 - o], p[1 - o] = c[1 - o], s.push(u[0], u[1]), s.push(p[0], p[1]);
        break;
      default:
        u[o] = f[o], u[1 - o] = c[1 - o], s.push(u[0], u[1]);
    }
  return s.push(t[l++], t[l++]), s;
}
function sB(t, e) {
  var r = [], n = t.length, i, a;
  function o(f, c, h) {
    var v = f.coord, d = (h - v) / (c.coord - v), p = VM(d, [f.color, c.color]);
    return {
      coord: h,
      color: p
    };
  }
  for (var s = 0; s < n; s++) {
    var l = t[s], u = l.coord;
    if (u < 0)
      i = l;
    else if (u > e) {
      a ? r.push(o(a, l, e)) : i && r.push(o(i, l, 0), o(i, l, e));
      break;
    } else
      i && (r.push(o(i, l, 0)), i = null), r.push(l), a = l;
  }
  return r;
}
function lB(t, e, r) {
  var n = t.getVisual("visualMeta");
  if (!(!n || !n.length || !t.count()) && e.type === "cartesian2d") {
    for (var i, a, o = n.length - 1; o >= 0; o--) {
      var s = t.getDimensionInfo(n[o].dimension);
      if (i = s && s.coordDim, i === "x" || i === "y") {
        a = n[o];
        break;
      }
    }
    if (a) {
      var l = e.getAxis(i), u = pt(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), f = u.length, c = a.outerColors.slice();
      f && u[0].coord > u[f - 1].coord && (u.reverse(), c.reverse());
      var h = sB(u, i === "x" ? r.getWidth() : r.getHeight()), v = h.length;
      if (!v && f)
        return u[0].coord < 0 ? c[1] ? c[1] : u[f - 1].color : c[0] ? c[0] : u[0].color;
      var d = 10, p = h[0].coord - d, m = h[v - 1].coord + d, g = m - p;
      if (g < 1e-3)
        return "transparent";
      P(h, function(_) {
        _.offset = (_.coord - p) / g;
      }), h.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: v ? h[v - 1].offset : 0.5,
        color: c[1] || "transparent"
      }), h.unshift({
        offset: v ? h[0].offset : 0.5,
        color: c[0] || "transparent"
      });
      var y = new jS(0, 0, 0, 0, h, !0);
      return y[i] = p, y[i + "2"] = m, y;
    }
  }
}
function uB(t, e, r) {
  var n = t.get("showAllSymbol"), i = n === "auto";
  if (!(n && !i)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (a && !(i && fB(a, e))) {
      var o = e.mapDimension(a.dim), s = {};
      return P(a.getViewLabels(), function(l) {
        l.tick.offInterval || (s[Zs(a.scale, l.tick)] = 1);
      }), function(l) {
        return !s.hasOwnProperty(e.get(o, l));
      };
    }
  }
}
function fB(t, e) {
  var r = t.getExtent(), n = Math.abs(r[1] - r[0]) / t.scale.count();
  isNaN(n) && (n = 0);
  for (var i = e.count(), a = Math.max(1, Math.round(i / 5)), o = 0; o < i; o += a)
    if (Np.getSymbolSize(
      e,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[t.isHorizontal() ? 1 : 0] * 1.5 > n)
      return !1;
  return !0;
}
function cB(t) {
  for (var e = t.length / 2; e > 0 && pr(t[e * 2 - 2], t[e * 2 - 1]); e--)
    ;
  return e - 1;
}
function V0(t, e) {
  return [t[e * 2], t[e * 2 + 1]];
}
function hB(t, e, r) {
  for (var n = t.length / 2, i = r === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < n; u++)
    if (o = t[u * 2 + i], !pr(o, t[u * 2 + 1 - i])) {
      if (u === 0) {
        a = o;
        continue;
      }
      if (a <= e && o >= e || a >= e && o <= e) {
        l = u;
        break;
      }
      s = u, a = o;
    }
  return {
    range: [s, l],
    t: (e - a) / (o - a)
  };
}
function mw(t) {
  if (t.get(["endLabel", "show"]))
    return !0;
  for (var e = 0; e < fn.length; e++)
    if (t.get([fn[e], "endLabel", "show"]))
      return !0;
  return !1;
}
function mh(t, e, r, n) {
  if (aB(e, "cartesian2d")) {
    var i = n.getModel("endLabel"), a = i.get("valueAnimation"), o = n.getData(), s = {
      lastFrameIndex: 0
    }, l = mw(n) ? function(v, d) {
      t._endLabelOnDuring(v, d, o, s, a, i, e);
    } : null, u = e.getBaseAxis().isHorizontal(), f = nB(e, r, n, function() {
      var v = t._endLabel;
      v && r && s.originalX != null && v.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!n.get("clip", !0)) {
      var c = f.shape, h = Math.max(c.width, c.height);
      u ? (c.y -= h, c.height += h * 2) : (c.x -= h, c.width += h * 2);
    }
    return l && l(1, f), f;
  } else
    return iB(e, r, n);
}
function vB(t, e) {
  var r = e.getBaseAxis(), n = r.isHorizontal(), i = r.inverse, a = n ? i ? "right" : "left" : "center", o = n ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: t.get("align") || a,
      verticalAlign: t.get("verticalAlign") || o
    }
  };
}
var dB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.init = function() {
      var r = new pe(), n = new Kk();
      this.group.add(n.group), this._symbolDraw = n, this._lineGroup = r, this._changePolyState = Xt(this._changePolyState, this);
    }, e.prototype.render = function(r, n, i) {
      var a = r.coordinateSystem, o = this.group, s = r.getData(), l = r.getModel("lineStyle"), u = r.getModel("areaStyle"), f = s.getLayout("points") || [], c = a.type === "polar", h = this._coordSys, v = this._symbolDraw, d = this._polyline, p = this._polygon, m = this._lineGroup, g = !n.ssr && r.get("animation"), y = !u.isEmpty(), _ = u.get("origin"), S = dw(a, s, _), b = y && oB(a, s, S), T = r.get("showSymbol"), C = r.get("connectNulls"), E = T && !c && uB(r, s, a), A = this._data;
      A && A.eachItemGraphicEl(function(Ct, Jt) {
        Ct.__temp && (o.remove(Ct), A.setItemGraphicEl(Jt, null));
      }), T || v.remove(), o.add(m);
      var M = c ? !1 : r.get("step"), R;
      a && a.getArea && r.get("clip", !0) && (R = a.getArea(), R.width != null ? (R.x -= 0.1, R.y -= 0.1, R.width += 0.2, R.height += 0.2) : R.r0 && (R.r0 -= 0.5, R.r += 0.5)), this._clipShapeForSymbol = R;
      var B = lB(s, a, i) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && h.type === a.type && M === this._step))
        T && v.updateData(s, {
          isIgnore: E,
          clipShape: R,
          disableAnimation: !0,
          getSymbolPoint: function(Ct) {
            return [f[Ct * 2], f[Ct * 2 + 1]];
          }
        }), g && this._initSymbolLabelAnimation(s, a, R), M && (b && (b = Wn(b, f, a, M, C)), f = Wn(f, null, a, M, C)), d = this._newPolyline(f), y ? p = this._newPolygon(f, b) : p && (m.remove(p), p = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, ra(B)), m.setClipPath(mh(this, a, !0, r));
      else {
        y && !p ? p = this._newPolygon(f, b) : p && !y && (m.remove(p), p = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, ra(B));
        var O = m.getClipPath();
        if (O) {
          var F = mh(this, a, !1, r);
          Xs(O, {
            shape: F.shape
          }, r);
        } else
          m.setClipPath(mh(this, a, !0, r));
        T && v.updateData(s, {
          isIgnore: E,
          clipShape: R,
          disableAnimation: !0,
          getSymbolPoint: function(Ct) {
            return [f[Ct * 2], f[Ct * 2 + 1]];
          }
        }), (!N0(this._stackedOnPoints, b) || !N0(this._points, f)) && (g ? this._doUpdateAnimation(s, b, a, i, M, _, C) : (M && (b && (b = Wn(b, f, a, M, C)), f = Wn(f, null, a, M, C)), d.setShape({
          points: f
        }), p && p.setShape({
          points: f,
          stackedOnPoints: b
        })));
      }
      var U = r.getModel("emphasis"), H = U.get("focus"), W = U.get("blurScope"), V = U.get("disabled");
      if (d.useStyle(Ht(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: B,
          lineJoin: "bevel"
        }
      )), Gm(d, r, "lineStyle"), d.style.lineWidth > 0 && r.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var j = d.getState("emphasis").style;
        j.lineWidth = +d.style.lineWidth + 1;
      }
      Bt(d).seriesIndex = r.seriesIndex, yv(d, H, W, V);
      var rt = z0(r.get("smooth")), tt = r.get("smoothMonotone");
      if (d.setShape({
        smooth: rt,
        smoothMonotone: tt,
        connectNulls: C
      }), p) {
        var it = s.getCalculationInfo("stackedOnSeries"), ot = 0;
        p.useStyle(Ht(u.getAreaStyle(), {
          fill: B,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), it && (ot = z0(it.get("smooth"))), p.setShape({
          smooth: rt,
          stackedOnSmooth: ot,
          smoothMonotone: tt,
          connectNulls: C
        }), Gm(p, r, "areaStyle"), Bt(p).seriesIndex = r.seriesIndex, yv(p, H, W, V);
      }
      var Z = this._changePolyState;
      s.eachItemGraphicEl(function(Ct) {
        Ct && (Ct.onHoverStateChange = Z);
      }), this._polyline.onHoverStateChange = Z, this._data = s, this._coordSys = a, this._stackedOnPoints = b, this._points = f, this._step = M, this._valueOrigin = _;
      var bt = r.get("triggerEvent"), St = r.get("triggerLineEvent"), jt = St === !0 || bt === !0 || bt === "line", ge = St === !0 || bt === !0 || bt === "area";
      this.packEventData(r, d, jt), p && this.packEventData(r, p, ge);
    }, e.prototype.packEventData = function(r, n, i) {
      Bt(n).eventData = i ? {
        componentType: "series",
        componentSubType: "line",
        componentIndex: r.componentIndex,
        seriesIndex: r.seriesIndex,
        seriesName: r.name,
        seriesType: "line",
        // for determining this event is triggered by area or line
        selfType: n === this._polygon ? "area" : "line"
      } : null;
    }, e.prototype.highlight = function(r, n, i, a) {
      var o = r.getData(), s = ta(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2], c = l[s * 2 + 1];
          if (pr(f, c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(f, c))
            return;
          var h = r.get("zlevel") || 0, v = r.get("z") || 0;
          u = new Np(o, s), u.x = f, u.y = c, u.setZ(h, v);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = h, d.z = v, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        nn.prototype.highlight.call(this, r, n, i, a);
    }, e.prototype.downplay = function(r, n, i, a) {
      var o = r.getData(), s = ta(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        nn.prototype.downplay.call(this, r, n, i, a);
    }, e.prototype._changePolyState = function(r) {
      var n = this._polygon;
      Fm(this._polyline, r), n && Fm(n, r);
    }, e.prototype._newPolyline = function(r) {
      var n = this._polyline;
      return n && this._lineGroup.remove(n), n = new tB({
        shape: {
          points: r
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(n), this._polyline = n, n;
    }, e.prototype._newPolygon = function(r, n) {
      var i = this._polygon;
      return i && this._lineGroup.remove(i), i = new rB({
        shape: {
          points: r,
          stackedOnPoints: n
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(i), this._polygon = i, i;
    }, e.prototype._initSymbolLabelAnimation = function(r, n, i) {
      var a, o, s = n.getBaseAxis(), l = s.inverse;
      n.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : n.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = r.hostModel, f = u.get("animationDuration");
      _t(f) && (f = f(null));
      var c = u.get("animationDelay") || 0, h = _t(c) ? c(null) : c;
      r.eachItemGraphicEl(function(v, d) {
        var p = v;
        if (p) {
          var m = [v.x, v.y], g = void 0, y = void 0, _ = void 0;
          if (i)
            if (o) {
              var S = i, b = n.pointToCoord(m);
              a ? (g = S.startAngle, y = S.endAngle, _ = -b[1] / 180 * Math.PI) : (g = S.r0, y = S.r, _ = b[0]);
            } else {
              var T = i;
              a ? (g = T.x, y = T.x + T.width, _ = v.x) : (g = T.y + T.height, y = T.y, _ = v.y);
            }
          var C = y === g ? 0 : (_ - g) / (y - g);
          l && (C = 1 - C);
          var E = _t(c) ? c(d) : f * C + h, A = p.getSymbolPath(), M = A.getTextContent();
          p.attr({
            scaleX: 0,
            scaleY: 0
          }), p.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: E
          }), M && M.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: E
          }), A.disableLabelAnimation = !0;
        }
      });
    }, e.prototype._initOrUpdateEndLabel = function(r, n, i) {
      var a = r.getModel("endLabel");
      if (mw(r)) {
        var o = r.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new Ve({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var f = cB(l);
        f >= 0 && (ip(s, ap(r, "endLabel"), {
          inheritColor: i,
          labelFetcher: r,
          labelDataIndex: f,
          defaultText: function(c, h, v) {
            return v != null ? $k(o, v) : vw(o, c);
          },
          enableTextSetter: !0
        }, vB(a, n)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, e.prototype._endLabelOnDuring = function(r, n, i, a, o, s, l) {
      var u = this._endLabel, f = this._polyline;
      if (u) {
        r < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = i.getLayout("points"), h = i.hostModel, v = h.get("connectNulls"), d = s.get("precision"), p = s.get("distance") || 0, m = l.getBaseAxis(), g = m.isHorizontal(), y = m.inverse, _ = n.shape, S = y ? g ? _.x : _.y + _.height : g ? _.x + _.width : _.y, b = (g ? p : 0) * (y ? -1 : 1), T = (g ? 0 : -p) * (y ? -1 : 1), C = g ? "x" : "y", E = hB(c, S, C), A = E.range, M = A[1] - A[0], R = void 0;
        if (M >= 1) {
          if (M > 1 && !v) {
            var B = V0(c, A[0]);
            u.attr({
              x: B[0] + b,
              y: B[1] + T
            }), o && (R = h.getRawValue(A[0]));
          } else {
            var B = f.getPointOn(S, C);
            B && u.attr({
              x: B[0] + b,
              y: B[1] + T
            });
            var O = h.getRawValue(A[0]), F = h.getRawValue(A[1]);
            o && (R = WA(i, d, O, F, E.t));
          }
          a.lastFrameIndex = A[0];
        } else {
          var U = r === 1 || a.lastFrameIndex > 0 ? A[0] : 0, B = V0(c, U);
          o && (R = h.getRawValue(U)), u.attr({
            x: B[0] + b,
            y: B[1] + T
          });
        }
        if (o) {
          var H = fb(u);
          typeof H.setLabelText == "function" && H.setLabelText(R);
        }
      }
    }, e.prototype._doUpdateAnimation = function(r, n, i, a, o, s, l) {
      var u = this._polyline, f = this._polygon, c = r.hostModel, h = Qk(this._data, r, this._stackedOnPoints, n, this._coordSys, i, this._valueOrigin), v = h.current, d = h.stackedOnCurrent, p = h.next, m = h.stackedOnNext;
      if (o && (d = Wn(h.stackedOnCurrent, h.current, i, o, l), v = Wn(h.current, null, i, o, l), m = Wn(h.stackedOnNext, h.next, i, o, l), p = Wn(h.next, null, i, o, l)), H0(v, p) > 3e3 || f && H0(d, m) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: p
        }), f && (f.stopAnimation(), f.setShape({
          points: p,
          stackedOnPoints: m
        }));
        return;
      }
      u.shape.__points = h.current, u.shape.points = v;
      var g = {
        shape: {
          points: p
        }
      };
      h.current !== v && (g.shape.__points = h.next), u.stopAnimation(), si(u, g, c), f && (f.setShape({
        // Reuse the points with polyline.
        points: v,
        stackedOnPoints: d
      }), f.stopAnimation(), si(f, {
        shape: {
          stackedOnPoints: m
        }
      }, c), u.shape.points !== f.shape.points && (f.shape.points = u.shape.points));
      for (var y = [], _ = h.status, S = 0; S < _.length; S++) {
        var b = _[S].cmd;
        if (b === "=") {
          var T = r.getItemGraphicEl(_[S].idx1);
          T && y.push({
            el: T,
            ptIdx: S
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        f && f.dirtyShape();
        for (var C = u.shape.__points, E = 0; E < y.length; E++) {
          var A = y[E].el, M = y[E].ptIdx * 2;
          A.x = C[M], A.y = C[M + 1], A.markRedraw();
        }
      });
    }, e.prototype.remove = function(r) {
      var n = this.group, i = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), i && i.eachItemGraphicEl(function(a, o) {
        a.__temp && (n.remove(a), i.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, e.type = "line", e;
  })(nn)
);
function pB(t, e) {
  return {
    seriesType: t,
    plan: Jb(),
    reset: function(r) {
      var n = r.getData(), i = r.coordinateSystem;
      if (r.pipelineContext, !!i) {
        var a = pt(i.dimensions, function(c) {
          return n.mapDimension(c);
        }).slice(0, 2), o = a.length, s = n.getCalculationInfo("stackResultDimension");
        As(n, a[0]) && (a[0] = s), As(n, a[1]) && (a[1] = s);
        var l = n.getStore(), u = n.getDimensionIndex(a[0]), f = n.getDimensionIndex(a[1]);
        return o && {
          progress: function(c, h) {
            for (var v = c.end - c.start, d = Ra(v * o), p = [], m = [], g = c.start, y = 0; g < c.end; g++) {
              var _ = void 0;
              if (o === 1) {
                var S = l.get(u, g);
                _ = i.dataToPoint(S, null, m);
              } else
                p[0] = l.get(u, g), p[1] = l.get(f, g), _ = i.dataToPoint(p, null, m);
              d[y++] = _[0], d[y++] = _[1];
            }
            h.setLayout("points", d), h.setLayout("pointsRange", {
              start: c.start,
              end: c.end
            });
          }
        };
      }
    }
  };
}
var gB = {
  average: function(t) {
    for (var e = 0, r = 0, n = 0; n < t.length; n++)
      isNaN(t[n]) || (e += t[n], r++);
    return r === 0 ? NaN : e / r;
  },
  sum: function(t) {
    for (var e = 0, r = 0; r < t.length; r++)
      e += t[r] || 0;
    return e;
  },
  max: function(t) {
    for (var e = -1 / 0, r = 0; r < t.length; r++)
      t[r] > e && (e = t[r]);
    return isFinite(e) ? e : NaN;
  },
  min: function(t) {
    for (var e = 1 / 0, r = 0; r < t.length; r++)
      t[r] < e && (e = t[r]);
    return isFinite(e) ? e : NaN;
  },
  // TODO
  // Median
  nearest: function(t) {
    return t[0];
  }
}, mB = function(t) {
  return Math.round(t.length / 2);
};
function yB(t) {
  return {
    seriesType: t,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(e, r, n) {
      var i = e.getData(), a = e.get("sampling"), o = e.coordinateSystem, s = i.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), f = l.getExtent(), c = n.getDevicePixelRatio(), h = Math.abs(f[1] - f[0]) * (c || 1), v = Math.round(s / h);
        if (isFinite(v) && v > 1) {
          a === "lttb" ? e.setData(i.lttbDownSample(i.mapDimension(u.dim), 1 / v)) : a === "minmax" && e.setData(i.minmaxDownSample(i.mapDimension(u.dim), 1 / v));
          var d = void 0;
          at(a) ? d = gB[a] : _t(a) && (d = a), d && e.setData(i.downSample(i.mapDimension(u.dim), 1 / v, d, mB));
        }
      }
    }
  };
}
function _B(t) {
  t.registerChartView(dB), t.registerSeriesModel(Yk), t.registerLayout(pB("line")), t.registerVisual({
    seriesType: "line",
    reset: function(e) {
      var r = e.getData(), n = e.getModel("lineStyle").getLineStyle();
      n && !n.stroke && (n.stroke = r.getVisual("style").fill), r.setVisual("legendLineStyle", n);
    }
  }), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, yB("line"));
}
var SB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e(r, n, i, a, o) {
      var s = t.call(this, r, n, i) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return e.prototype.isHorizontal = function() {
      var r = this.position;
      return r === "top" || r === "bottom";
    }, e.prototype.getGlobalExtent = function(r) {
      var n = this.getExtent();
      return n[0] = this.toGlobalCoord(n[0]), n[1] = this.toGlobalCoord(n[1]), r && n[0] > n[1] && n.reverse(), n;
    }, e.prototype.pointToData = function(r, n) {
      return this.coordToData(this.toLocalCoord(r[this.dim === "x" ? 0 : 1]), n);
    }, e.prototype.setCategorySortInfo = function(r) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = r, this.scale.setSortInfo(r);
    }, e;
  })(Fk)
), bB = null;
function Yf() {
  return bB;
}
var TB = "expandAxisBreak", jn = Math.PI, wB = [[1, 2, 1, 2], [5, 3, 5, 3], [8, 3, 8, 3]], xB = [[0, 1, 0, 1], [0, 3, 0, 3], [0, 3, 0, 3]], ia = Wt(), yw = Wt(), _w = (
  /** @class */
  (function() {
    function t(e) {
      this.recordMap = {}, this.resolveAxisNameOverlap = e;
    }
    return t.prototype.ensureRecord = function(e) {
      var r = e.axis.dim, n = e.componentIndex, i = this.recordMap, a = i[r] || (i[r] = []);
      return a[n] || (a[n] = {
        ready: {}
      });
    }, t;
  })()
);
function CB(t, e, r, n) {
  var i = r.axis, a = e.ensureRecord(r), o = [], s, l = Fp(t.axisName) && to(t.nameLocation);
  P(n, function(d) {
    var p = hn(d);
    if (!(!p || p.label.ignore)) {
      o.push(p);
      var m = a.transGroup;
      l && (m.transform ? Hs(Do, m.transform) : Fs(Do), p.transform && Ko(Do, Do, p.transform), mt.copy(Gl, p.localRect), Gl.applyTransform(Do), s ? s.union(Gl) : mt.copy(s = new mt(0, 0, 0, 0), Gl));
    }
  });
  var u = Math.abs(a.dirVec.x) > 0.1 ? "x" : "y", f = a.transGroup[u];
  if (o.sort(function(d, p) {
    return Math.abs(d.label[u] - f) - Math.abs(p.label[u] - f);
  }), l && s) {
    var c = i.getExtent(), h = Math.min(c[0], c[1]), v = Math.max(c[0], c[1]) - h;
    s.union(new mt(h, 0, v, 1));
  }
  a.stOccupiedRect = s, a.labelInfoList = o;
}
var Do = jr(), Gl = new mt(0, 0, 0, 0), Sw = function(t, e, r, n, i, a) {
  if (to(t.nameLocation)) {
    var o = a.stOccupiedRect;
    o && bw(Uk({}, o, a.transGroup.transform), n, i);
  } else
    Tw(a.labelInfoList, a.dirVec, n, i);
};
function bw(t, e, r) {
  var n = new Vt();
  Bp(t, e, n, {
    direction: Math.atan2(r.y, r.x),
    bidirectional: !1,
    touchThreshold: 0.05
  }) && Gk(e, n);
}
function Tw(t, e, r, n) {
  for (var i = Vt.dot(n, e) >= 0, a = 0, o = t.length; a < o; a++) {
    var s = t[i ? a : o - 1 - a];
    s.label.ignore || bw(s, r, n);
  }
}
var ni = (
  /** @class */
  (function() {
    function t(e, r, n, i) {
      this.group = new pe(), this._axisModel = e, this._api = r, this._local = {}, this._shared = i || new _w(Sw), this._resetCfgDetermined(n);
    }
    return t.prototype.updateCfg = function(e) {
      var r = this._cfg.raw;
      r.position = e.position, r.labelOffset = e.labelOffset, this._resetCfgDetermined(r);
    }, t.prototype.__getRawCfg = function() {
      return this._cfg.raw;
    }, t.prototype._resetCfgDetermined = function(e) {
      var r = this._axisModel, n = r.getDefaultOption ? r.getDefaultOption() : {}, i = vt(e.axisName, r.get("name")), a = r.get("nameMoveOverlap");
      (a == null || a === "auto") && (a = vt(e.defaultNameMoveOverlap, !0));
      var o = {
        raw: e,
        position: e.position,
        rotation: e.rotation,
        nameDirection: vt(e.nameDirection, 1),
        tickDirection: vt(e.tickDirection, 1),
        labelDirection: vt(e.labelDirection, 1),
        labelOffset: vt(e.labelOffset, 0),
        silent: vt(e.silent, !0),
        axisName: i,
        nameLocation: ka(r.get("nameLocation"), n.nameLocation, "end"),
        shouldNameMoveOverlap: Fp(i) && a,
        optionHideOverlap: r.get(["axisLabel", "hideOverlap"]),
        showMinorTicks: r.get(["minorTick", "show"])
      };
      this._cfg = o;
      var s = new pe({
        x: o.position[0],
        y: o.position[1],
        rotation: o.rotation
      });
      s.updateTransform(), this._transformGroup = s;
      var l = this._shared.ensureRecord(r);
      l.transGroup = this._transformGroup, l.dirVec = new Vt(Math.cos(-o.rotation), Math.sin(-o.rotation));
    }, t.prototype.build = function(e, r) {
      var n = this;
      return e || (e = {
        axisLine: !0,
        axisTickLabelEstimate: !1,
        axisTickLabelDetermine: !0,
        axisName: !0
      }), P(DB, function(i) {
        e[i] && MB[i](n._cfg, n._local, n._shared, n._axisModel, n.group, n._transformGroup, n._api, r || {});
      }), this;
    }, t.innerTextLayout = function(e, r, n) {
      var i = uS(r - e), a, o;
      return Pu(i) ? (o = n > 0 ? "top" : "bottom", a = "center") : Pu(i - jn) ? (o = n > 0 ? "bottom" : "top", a = "center") : (o = "middle", i > 0 && i < jn ? a = n > 0 ? "right" : "left" : a = n > 0 ? "left" : "right"), {
        rotation: i,
        textAlign: a,
        textVerticalAlign: o
      };
    }, t.makeAxisEventDataBase = function(e) {
      var r = {
        componentType: e.mainType,
        componentIndex: e.componentIndex
      };
      return r[e.mainType + "Index"] = e.componentIndex, r;
    }, t.isLabelSilent = function(e) {
      var r = e.get("tooltip");
      return e.get("silent") || !(e.get("triggerEvent") || r && r.show);
    }, t;
  })()
), DB = ["axisLine", "axisTickLabelEstimate", "axisTickLabelDetermine", "axisName"], MB = {
  axisLine: function(t, e, r, n, i, a, o) {
    var s = n.get(["axisLine", "show"]);
    if (s === "auto" && (s = !0, t.raw.axisLineAutoShow != null && (s = !!t.raw.axisLineAutoShow)), !!s) {
      var l = n.axis.getExtent(), u = a.transform, f = [l[0], 0], c = [l[1], 0], h = f[0] > c[0];
      u && (dr(f, f, u), dr(c, c, u));
      var v = q({
        lineCap: "round"
      }, n.getModel(["axisLine", "lineStyle"]).getLineStyle()), d = {
        strokeContainThreshold: t.raw.strokeContainThreshold || 5,
        silent: !0,
        z2: 1,
        style: v
      };
      if (n.get(["axisLine", "breakLine"]) && Gu(n.axis.scale))
        Yf().buildAxisBreakLine(n, i, a, d);
      else {
        var p = new oi(q({
          shape: {
            x1: f[0],
            y1: f[1],
            x2: c[0],
            y2: c[1]
          }
        }, d));
        bs(p.shape, p.style.lineWidth), p.anid = "line", i.add(p);
      }
      var m = n.get(["axisLine", "symbol"]);
      if (m != null) {
        var g = n.get(["axisLine", "symbolSize"]);
        at(m) && (m = [m, m]), (at(g) || qt(g)) && (g = [g, g]);
        var y = fT(n.get(["axisLine", "symbolOffset"]) || 0, g), _ = g[0], S = g[1];
        P([{
          rotate: t.rotation + Math.PI / 2,
          offset: y[0],
          r: 0
        }, {
          rotate: t.rotation - Math.PI / 2,
          offset: y[1],
          r: Math.sqrt((f[0] - c[0]) * (f[0] - c[0]) + (f[1] - c[1]) * (f[1] - c[1]))
        }], function(b, T) {
          if (m[T] !== "none" && m[T] != null) {
            var C = Ja(m[T], -_ / 2, -S / 2, _, S, v.stroke, !0), E = b.r + b.offset, A = h ? c : f;
            C.attr({
              rotation: b.rotate,
              x: A[0] + E * Math.cos(t.rotation),
              y: A[1] - E * Math.sin(t.rotation),
              silent: !0,
              z2: 11
            }), i.add(C);
          }
        });
      }
    }
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisTickLabelEstimate: function(t, e, r, n, i, a, o, s) {
    var l = G0(e, i, s);
    l && U0(t, e, r, n, i, a, o, Ar.estimate);
  },
  /**
   * Finish axis tick label build.
   * Can be only called once.
   */
  axisTickLabelDetermine: function(t, e, r, n, i, a, o, s) {
    var l = G0(e, i, s);
    l && U0(t, e, r, n, i, a, o, Ar.determine);
    var u = EB(t, i, a, n);
    LB(t, e.labelLayoutList, u), PB(t, i, a, n, t.tickDirection);
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisName: function(t, e, r, n, i, a, o, s) {
    var l = r.ensureRecord(n);
    e.nameEl && (i.remove(e.nameEl), e.nameEl = l.nameLayout = l.nameLocation = null);
    var u = t.axisName;
    if (Fp(u)) {
      var f = t.nameLocation, c = t.nameDirection, h = n.getModel("nameTextStyle"), v = n.get("nameGap") || 0, d = n.axis.getExtent(), p = n.axis.inverse ? -1 : 1, m = new Vt(0, 0), g = new Vt(0, 0);
      f === "start" ? (m.x = d[0] - p * v, g.x = -p) : f === "end" ? (m.x = d[1] + p * v, g.x = p) : (m.x = (d[0] + d[1]) / 2, m.y = t.labelOffset + c * v, g.y = c);
      var y = jr();
      g.transform(Ld(y, y, t.rotation));
      var _ = n.get("nameRotate");
      _ != null && (_ = _ * jn / 180);
      var S, b;
      to(f) ? S = ni.innerTextLayout(
        t.rotation,
        _ ?? t.rotation,
        // Adapt to axis.
        c
      ) : (S = AB(t.rotation, f, _ || 0, d), b = t.raw.axisNameAvailableWidth, b != null && (b = Math.abs(b / Math.sin(S.rotation)), !isFinite(b) && (b = null)));
      var T = h.getFont(), C = n.get("nameTruncate", !0) || {}, E = C.ellipsis, A = Tu(t.raw.nameTruncateMaxWidth, C.maxWidth, b), M = s.nameMarginLevel || 0, R = new Ve({
        x: m.x,
        y: m.y,
        rotation: S.rotation,
        silent: ni.isLabelSilent(n),
        style: Za(h, {
          text: u,
          font: T,
          overflow: "truncate",
          width: A,
          ellipsis: E,
          fill: h.getTextColor() || n.get(["axisLine", "lineStyle", "color"]),
          align: h.get("align") || S.textAlign,
          verticalAlign: h.get("verticalAlign") || S.textVerticalAlign
        }),
        z2: 1
      });
      if (kf({
        el: R,
        componentModel: n,
        itemName: u
      }), R.__fullText = u, R.anid = "name", n.get("triggerEvent")) {
        var B = ni.makeAxisEventDataBase(n);
        B.targetType = "axisName", B.name = u, Bt(R).eventData = B;
      }
      a.add(R), R.updateTransform(), e.nameEl = R;
      var O = l.nameLayout = hn({
        label: R,
        priority: R.z2,
        defaultAttr: {
          ignore: R.ignore
        },
        marginDefault: to(f) ? wB[M] : xB[M]
      });
      if (l.nameLocation = f, i.add(R), R.decomposeTransform(), t.shouldNameMoveOverlap && O) {
        var F = r.ensureRecord(n);
        r.resolveAxisNameOverlap(t, r, n, O, g, F);
      }
    }
  }
};
function U0(t, e, r, n, i, a, o, s) {
  xw(e) || RB(t, e, i, s, n, o);
  var l = e.labelLayoutList;
  OB(t, n, l, a), NB(n, t.rotation, l);
  var u = t.optionHideOverlap;
  IB(n, l, u), u && Wk(
    // Filter the already ignored labels by the previous overlap resolving methods.
    be(l, function(f) {
      return f && !f.label.ignore;
    })
  ), CB(t, r, n, l);
}
function AB(t, e, r, n) {
  var i = uS(r - t), a, o, s = n[0] > n[1], l = e === "start" && !s || e !== "start" && s;
  return Pu(i - jn / 2) ? (o = l ? "bottom" : "top", a = "center") : Pu(i - jn * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", i < jn * 1.5 && i > jn / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: i,
    textAlign: a,
    textVerticalAlign: o
  };
}
function IB(t, e, r) {
  var n = t.axis, i = t.get(["axisLabel", "customValues"]);
  if (ZO(n))
    return;
  function a(u, f, c) {
    var h = hn(e[f]), v = hn(e[c]), d = n.scale;
    if (!(!h || !v)) {
      if (u == null) {
        if (!r && i)
          return;
        var p = ia(h.label).labelInfo.tick;
        if (
          // TimeScale does not expand extent to "nice", so eliminate labels that are not nice.
          Pp(d) && p.notNice || gn(d) && p.offInterval
        ) {
          Da(h.label);
          return;
        }
      }
      if (u === !1 || h.suggestIgnore) {
        Da(h.label);
        return;
      }
      if (v.suggestIgnore) {
        Da(v.label);
        return;
      }
      var m = 0.1;
      if (!r) {
        var g = [0, 0, 0, 0];
        h = P0({
          marginForce: g
        }, h), v = P0({
          marginForce: g
        }, v);
      }
      Bp(h, v, null, {
        touchThreshold: m
      }) && Da(u ? v.label : h.label);
    }
  }
  var o = t.get(["axisLabel", "showMinLabel"]), s = t.get(["axisLabel", "showMaxLabel"]), l = e.length;
  a(o, 0, 1), a(s, l - 1, l - 2);
}
function LB(t, e, r) {
  t.showMinorTicks || P(e, function(n) {
    if (n && n.label.ignore)
      for (var i = 0; i < r.length; i++) {
        var a = r[i], o = yw(a), s = ia(n.label);
        if (o.tickValue != null && !o.onBand && o.tickValue === s.labelInfo.tick.value) {
          Da(a);
          return;
        }
      }
  });
}
function Da(t) {
  t && (t.ignore = !0);
}
function ww(t, e, r, n, i) {
  for (var a = [], o = [], s = [], l = 0; l < t.length; l++) {
    var u = t[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, e && (dr(o, o, e), dr(s, s, e));
    var f = new oi({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: n,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    bs(f.shape, f.style.lineWidth), f.anid = i + "_" + t[l].tickValue, a.push(f);
    var c = yw(f);
    c.onBand = !!t[l].onBand, c.tickValue = t[l].tickValue;
  }
  return a;
}
function EB(t, e, r, n) {
  var i = n.axis, a = n.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && (o = !0, t.raw.axisTickAutoShow != null && (o = !!t.raw.axisTickAutoShow)), !o || i.scale.isBlank())
    return [];
  for (var s = a.getModel("lineStyle"), l = t.tickDirection * a.get("length"), u = i.getTicksCoords(), f = ww(u, r.transform, l, Ht(s.getLineStyle(), {
    stroke: n.get(["axisLine", "lineStyle", "color"])
  }), "ticks"), c = 0; c < f.length; c++)
    e.add(f[c]);
  return f;
}
function PB(t, e, r, n, i) {
  var a = n.axis, o = n.getModel("minorTick");
  if (!(!t.showMinorTicks || a.scale.isBlank())) {
    var s = a.getMinorTicksCoords();
    if (s.length)
      for (var l = o.getModel("lineStyle"), u = i * o.get("length"), f = Ht(l.getLineStyle(), Ht(n.getModel("axisTick").getLineStyle(), {
        stroke: n.get(["axisLine", "lineStyle", "color"])
      })), c = 0; c < s.length; c++)
        for (var h = ww(s[c], r.transform, u, f, "minorticks_" + c), v = 0; v < h.length; v++)
          e.add(h[v]);
  }
}
function G0(t, e, r) {
  if (xw(t)) {
    var n = t.axisLabelsCreationContext, i = n.out.noPxChangeTryDetermine;
    if (r.noPxChange) {
      for (var a = !0, o = 0; o < i.length; o++)
        a = a && i[o]();
      if (a)
        return !1;
    }
    i.length && (e.remove(t.labelGroup), $v(t, null, null, null));
  }
  return !0;
}
function RB(t, e, r, n, i, a) {
  var o = i.axis, s = Tu(t.raw.axisLabelShow, i.get(["axisLabel", "show"])), l = new pe();
  r.add(l);
  var u = tf(n);
  if (!s || o.scale.isBlank()) {
    $v(e, [], l, u);
    return;
  }
  var f = i.getModel("axisLabel"), c = o.getViewLabels(u), h = (Tu(t.raw.labelRotate, f.get("rotate")) || 0) * jn / 180, v = ni.innerTextLayout(t.rotation, h, t.labelDirection), d = i.getCategories && i.getCategories(!0), p = [], m = i.get("triggerEvent"), g = 1 / 0, y = -1 / 0;
  P(c, function(S, b) {
    var T, C = S.tick, E = S.formattedLabel, A = S.rawLabel, M = f, R = Zs(o.scale, C);
    if (d && d[R]) {
      var B = d[R];
      ft(B) && B.textStyle && (M = new Zt(B.textStyle, f, i.ecModel));
    }
    var O = M.getTextColor() || i.get(["axisLine", "lineStyle", "color"]), F = M.getShallow("align", !0) || v.textAlign, U = vt(M.getShallow("alignMinLabel", !0), F), H = vt(M.getShallow("alignMaxLabel", !0), F), W = M.getShallow("verticalAlign", !0) || M.getShallow("baseline", !0) || v.textVerticalAlign, V = vt(M.getShallow("verticalAlignMinLabel", !0), W), j = vt(M.getShallow("verticalAlignMaxLabel", !0), W), rt = 10 + (((T = C.time) === null || T === void 0 ? void 0 : T.level) || 0);
    g = Math.min(g, rt), y = Math.max(y, rt);
    var tt = new Ve({
      // --- transform props start ---
      // All of the transform props MUST not be set here, but should be set in
      // `updateAxisLabelChangableProps`, because they may change in estimation,
      // and need to calculate based on global coord sys by `decomposeTransform`.
      x: 0,
      y: 0,
      rotation: 0,
      // --- transform props end ---
      silent: ni.isLabelSilent(i),
      z2: rt,
      style: Za(M, {
        text: E,
        align: b === 0 ? U : b === c.length - 1 ? H : F,
        verticalAlign: b === 0 ? V : b === c.length - 1 ? j : W,
        fill: _t(O) ? O(
          // (1) In category axis with data zoom, tick is not the original
          // index of axis.data. So tick should not be exposed to user
          // in category axis.
          // (2) Compatible with previous version, which always use formatted label as
          // input. But in interval scale the formatted label is like '223,445', which
          // maked user replace ','. So we modify it to return original val but remain
          // it as 'string' to avoid error in replacing.
          o.type === "category" ? A : o.type === "value" ? R + "" : R,
          b
        ) : O
      })
    });
    tt.anid = "label_" + R;
    var it = ia(tt);
    if (it.labelInfo = S, it.layoutRotation = v.rotation, kf({
      el: tt,
      componentModel: i,
      itemName: E,
      formatterParamsExtra: {
        isTruncated: function() {
          return tt.isTruncated;
        },
        value: A,
        tickIndex: b
      }
    }), m) {
      var ot = ni.makeAxisEventDataBase(i);
      ot.targetType = "axisLabel", ot.value = A, ot.tickIndex = b;
      var Z = S.tick.break;
      if (Z) {
        var bt = Z.parsedBreak;
        ot.break = {
          // type: labelItem.break.type,
          start: bt.vmin,
          end: bt.vmax
        };
      }
      o.type === "category" && (ot.dataIndex = R), Bt(tt).eventData = ot, Z && BB(i, a, tt, Z);
    }
    p.push(tt), l.add(tt);
  });
  var _ = pt(p, function(S) {
    return {
      label: S,
      priority: ia(S).labelInfo.tick.break ? S.z2 + (y - g + 1) : S.z2,
      defaultAttr: {
        ignore: S.ignore
      }
    };
  });
  $v(e, _, l, u);
}
function xw(t) {
  return !!t.labelLayoutList;
}
function $v(t, e, r, n) {
  t.labelLayoutList = e, t.labelGroup = r, t.axisLabelsCreationContext = n;
}
function OB(t, e, r, n) {
  var i = e.get(["axisLabel", "margin"]);
  P(r, function(a, o) {
    var s = hn(a);
    if (s) {
      var l = s.label, u = ia(l);
      s.suggestIgnore = l.ignore, l.ignore = !1, Eu(Tn, kB);
      var f = e.axis;
      Tn.x = f.dataToCoord(Zs(f.scale, u.labelInfo.tick)), Tn.y = t.labelOffset + t.labelDirection * i, Tn.rotation = u.layoutRotation, n.add(Tn), Tn.updateTransform(), n.remove(Tn), Tn.decomposeTransform(), Eu(l, Tn), l.markRedraw(), nf(s, !0), hn(s);
    }
  });
}
var Tn = new se(), kB = new se();
function Fp(t) {
  return !!t;
}
function BB(t, e, r, n) {
  r.on("click", function(i) {
    var a = {
      type: TB,
      breaks: [{
        start: n.parsedBreak.breakOption.start,
        end: n.parsedBreak.breakOption.end
      }]
    };
    a[t.axis.dim + "AxisIndex"] = t.componentIndex, e.dispatchAction(a);
  });
}
function NB(t, e, r) {
  var n = Pe();
  if (n) {
    var i = n.retrieveAxisBreakPairs(r, function(o) {
      return o && ia(o.label).labelInfo.tick.break;
    }, !0), a = t.get(["breakLabelLayout", "moveOverlap"], !0);
    (a === !0 || a === "auto") && P(i, function(o) {
      Yf().adjustBreakLabelPair(t.axis.inverse, e, [hn(r[o[0]]), hn(r[o[1]])]);
    });
  }
}
function af(t, e, r) {
  r = r || {};
  var n = e.axis, i = {}, a = n.getAxesOnZeroOf()[0], o = n.position, s = a ? "onZero" : o, l = n.dim, u = [t.x, t.x + t.width, t.y, t.y + t.height], f = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = e.get("offset") || 0, h = l === "x" ? [u[2] - c, u[3] + c] : [u[0] - c, u[1] + c];
  if (a) {
    var v = a.toGlobalCoord(a.dataToCoord(0));
    h[f.onZero] = Math.max(Math.min(v, h[1]), h[0]);
  }
  i.position = [l === "y" ? h[f[s]] : u[0], l === "x" ? h[f[s]] : u[3]], i.rotation = Math.PI / 2 * (l === "x" ? 0 : 1);
  var d = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  i.labelDirection = i.tickDirection = i.nameDirection = d[o], i.labelOffset = a ? h[f[o]] - h[f.onZero] : 0, e.get(["axisTick", "inside"]) && (i.tickDirection = -i.tickDirection), Tu(r.labelInside, e.get(["axisLabel", "inside"])) && (i.labelDirection = -i.labelDirection);
  var p = e.get(["axisLabel", "rotate"]);
  return i.labelRotate = s === "top" ? -p : p, i.z2 = 1, i;
}
function FB(t) {
  var e = {
    xAxisModel: null,
    yAxisModel: null
  };
  return P(e, function(r, n) {
    var i = n.replace(/Model$/, ""), a = t.getReferringComponents(i, ur).models[0];
    e[n] = a;
  }), e;
}
function HB(t, e, r, n, i, a) {
  for (var o = af(t, r), s = !1, l = !1, u = 0; u < e.length; u++)
    VT(e[u].getOtherAxis(r.axis).scale) && (s = l = !0, r.axis.type === "category" && r.axis.onBand && (l = !1));
  return o.axisLineAutoShow = s, o.axisTickAutoShow = l, o.defaultNameMoveOverlap = a, new ni(r, n, o, i);
}
function zB(t, e, r) {
  var n = af(e, r);
  t.updateCfg(n);
}
var Cw = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}, of = ["25%", "25%"], hu = "cartesian2d", VB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = Ks(r.outerBounds);
      t.prototype.mergeDefaultAndTheme.apply(this, arguments), i && r.outerBounds && li(r.outerBounds, i);
    }, e.prototype.mergeOption = function(r, n) {
      t.prototype.mergeOption.apply(this, arguments), this.option.outerBounds && r.outerBounds && li(this.option.outerBounds, r.outerBounds);
    }, e.type = "grid", e.dependencies = ["xAxis", "yAxis"], e.layoutMode = "box", e.defaultOption = {
      show: !1,
      // zlevel: 0,
      z: 0,
      left: "15%",
      top: 65,
      right: "10%",
      bottom: 80,
      // If grid size contain label
      containLabel: !1,
      outerBoundsMode: "auto",
      outerBounds: Cw,
      outerBoundsContain: "all",
      outerBoundsClampWidth: of[0],
      outerBoundsClampHeight: of[1],
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      backgroundColor: ht.color.transparent,
      borderWidth: 1,
      borderColor: ht.color.neutral30
    }, e;
  })(kt)
), Xv = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", ur).models[0];
    }, e.type = "cartesian2dAxis", e;
  })(kt)
);
vn(Xv, QO);
var Dw = {
  show: !0,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: !1,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  nameTextStyle: {
    // textMargin: never, // The default value will be specified based on `nameLocation`.
  },
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: !1,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: !1,
  tooltip: {
    show: !1
  },
  axisPointer: {},
  axisLine: {
    show: !0,
    onZero: "auto",
    onZeroAxisIndex: null,
    lineStyle: {
      color: ht.color.axisLine,
      width: 1,
      type: "solid"
    },
    // The arrow at both ends the the axis.
    symbol: ["none", "none"],
    symbolSize: [10, 15],
    breakLine: !0
  },
  axisTick: {
    show: !0,
    // Whether axisTick is inside the grid or outside the grid.
    inside: !1,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: !0,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: !1,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12,
    color: ht.color.axisLabel,
    // In scenarios like axis labels, when labels text's progression direction matches the label
    // layout direction (e.g., when all letters are in a single line), extra start/end margin is
    // needed to prevent the text from appearing visually joined. In the other case, when lables
    // are stacked (e.g., having rotation or horizontal labels on yAxis), the layout needs to be
    // compact, so NO extra top/bottom margin should be applied.
    textMargin: [0, 3]
  },
  splitLine: {
    show: !0,
    showMinLine: !0,
    showMaxLine: !0,
    lineStyle: {
      color: ht.color.axisSplitLine,
      width: 1,
      type: "solid"
    }
  },
  splitArea: {
    show: !1,
    areaStyle: {
      color: [ht.color.backgroundTint, ht.color.backgroundTransparent]
    }
  },
  breakArea: {
    show: !0,
    itemStyle: {
      color: ht.color.neutral00,
      // Break border color should be darker than the splitLine
      // because it has opacity and should be more prominent
      borderColor: ht.color.border,
      borderWidth: 1,
      borderType: [3, 3],
      opacity: 0.6
    },
    zigzagAmplitude: 4,
    zigzagMinSpan: 4,
    zigzagMaxSpan: 20,
    zigzagZ: 100,
    expandOnClick: !0
  },
  breakLabelLayout: {
    moveOverlap: "auto"
  }
}, UB = Pt({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: !0,
  // Set false to faster category collection.
  deduplication: null,
  jitter: 0,
  jitterOverlap: !0,
  jitterMargin: 2,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: !1
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: !1,
    interval: "auto",
    show: "auto"
  },
  axisLabel: {
    interval: "auto"
  }
}, Dw), Hp = Pt({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: !1,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: !1,
    lineStyle: {
      color: ht.color.axisMinorSplitLine,
      width: 1
    }
  }
}, Dw), GB = Pt({
  splitNumber: 6,
  axisLabel: {
    // The default value of TimeScale is determined in `AxisBuilder`
    // showMinLabel: false,
    // showMaxLabel: false,
    rich: {
      primary: {
        fontWeight: "bold"
      }
    }
  },
  splitLine: {
    show: !1
  }
}, Hp), WB = Ht({
  logBase: 10
}, Hp);
const YB = {
  category: UB,
  value: Hp,
  time: GB,
  log: WB
};
function W0(t, e, r, n) {
  P(KT, function(i, a) {
    var o = Pt(Pt({}, YB[a], !0), n, !0), s = (
      /** @class */
      (function(l) {
        Q(u, l);
        function u() {
          var f = l !== null && l.apply(this, arguments) || this;
          return f.type = e + "Axis." + a, f;
        }
        return u.prototype.mergeDefaultAndTheme = function(f, c) {
          var h = xs(this), v = h ? Ks(f) : {}, d = c.getTheme();
          Pt(f, d.get(a + "Axis")), Pt(f, this.getDefaultOption()), f.type = Y0(f), h && li(f, v, h);
        }, u.prototype.optionUpdated = function() {
          var f = this.option;
          f.type === "category" && (this.__ordinalMeta = Uv.createByAxisModel(this));
        }, u.prototype.getCategories = function(f) {
          var c = this.option;
          if (c.type === "category")
            return f ? c.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.prototype.updateAxisBreaks = function(f) {
          var c = Yf();
          return c ? c.updateModelAxisBreak(this, f) : {
            breaks: []
          };
        }, u.type = e + "Axis." + a, u.defaultOption = o, u;
      })(r)
    );
    t.registerComponentModel(s);
  }), t.registerSubTypeDefaulter(e + "Axis", Y0);
}
function Y0(t) {
  return t.type || (t.data ? "category" : "value");
}
var $B = (
  /** @class */
  (function() {
    function t(e) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = e || "";
    }
    return t.prototype.getAxis = function(e) {
      return this._axes[e];
    }, t.prototype.getAxes = function() {
      return pt(this._dimList, function(e) {
        return this._axes[e];
      }, this);
    }, t.prototype.getAxesByScale = function(e) {
      return e = e.toLowerCase(), be(this.getAxes(), function(r) {
        return r.scale.type === e;
      });
    }, t.prototype.addAxis = function(e) {
      var r = e.dim;
      this._axes[r] = e, this._dimList.push(r);
    }, t;
  })()
), vu = ["x", "y"];
function $0(t) {
  return (t.type === "interval" || t.type === "time") && !Gu(t);
}
var XB = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = hu, r.dimensions = vu, r;
    }
    return e.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var r = this.getAxis("x").scale, n = this.getAxis("y").scale;
      if (!(!$0(r) || !$0(n))) {
        var i = ju(r, null), a = ju(n, null), o = this.dataToPoint([i[0], a[0]]), s = this.dataToPoint([i[1], a[1]]), l = i[1] - i[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var f = (s[0] - o[0]) / l, c = (s[1] - o[1]) / u, h = o[0] - i[0] * f, v = o[1] - a[0] * c, d = this._transform = [f, 0, 0, c, h, v];
          this._invTransform = Hs([], d);
        }
      }
    }, e.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, e.prototype.containPoint = function(r) {
      var n = this.getAxis("x"), i = this.getAxis("y");
      return n.contain(n.toLocalCoord(r[0])) && i.contain(i.toLocalCoord(r[1]));
    }, e.prototype.containData = function(r) {
      return this.getAxis("x").containData(r[0]) && this.getAxis("y").containData(r[1]);
    }, e.prototype.containZone = function(r, n) {
      var i = this.dataToPoint(r), a = this.dataToPoint(n), o = this.getArea(), s = new mt(i[0], i[1], a[0] - i[0], a[1] - i[1]);
      return o.intersect(s);
    }, e.prototype.dataToPoint = function(r, n, i) {
      i = i || [];
      var a = r[0], o = r[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return dr(i, r, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return i[0] = s.toGlobalCoord(s.dataToCoord(a, n)), i[1] = l.toGlobalCoord(l.dataToCoord(o, n)), i;
    }, e.prototype.clampData = function(r, n) {
      var i = this.getAxis("x").scale, a = this.getAxis("y").scale, o = i.getExtent(), s = a.getExtent(), l = i.parse(r[0]), u = a.parse(r[1]);
      return n = n || [], n[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), n[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), n;
    }, e.prototype.pointToData = function(r, n, i) {
      if (i = i || [], this._invTransform)
        return dr(i, r, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return i[0] = a.coordToData(a.toLocalCoord(r[0]), n), i[1] = o.coordToData(o.toLocalCoord(r[1]), n), i;
    }, e.prototype.getOtherAxis = function(r) {
      return this.getAxis(r.dim === "x" ? "y" : "x");
    }, e.prototype.getArea = function(r) {
      r = r || 0;
      var n = this.getAxis("x").getGlobalExtent(), i = this.getAxis("y").getGlobalExtent(), a = Math.min(n[0], n[1]) - r, o = Math.min(i[0], i[1]) - r, s = Math.max(n[0], n[1]) - a + r, l = Math.max(i[0], i[1]) - o + r;
      return new mt(a, o, s, l);
    }, e;
  })($B)
);
function KB(t, e) {
  var r = t.scale, n = t.model, i = aw(r, n, n.ecModel, t), a = Qa(r), o = Qa(e) ? e.intervalStub : e, s = a ? r.intervalStub : r, l = r.base, u = o.getTicks(), f = o.getTicks({
    expandToNicedExtent: !0
  }), c = u.length - 1, h, v, d;
  if (c === 1)
    h = v = 0, d = 1;
  else if (c === 2) {
    var p = ce(u[0].value - u[1].value), m = ce(u[1].value - u[2].value);
    h = v = 0, p === m ? d = 2 : (d = 1, p < m ? h = p / m : v = m / p);
  } else {
    var g = o.getConfig().interval;
    h = (1 - (u[0].value - f[0].value) / g) % 1, v = (1 - (f[c].value - u[c].value) / g) % 1, d = c - (h ? 1 : 0) - (v ? 1 : 0);
  }
  var y = i.zoomFixMM, _ = y[0] || y[1], S = [i.fixMM[0] || _, i.fixMM[1] || _], b = r.getExtent(), T = s.getExtent(), C = UT(T, S), E, A, M, R, B, O;
  function F(it) {
    for (var ot = 50, Z = 0; Z < ot && !it(); Z++)
      M = a ? M * Nt(l, 2) : EO(M), R = na(M);
  }
  function U() {
    E = Mt(O - M * h, R);
  }
  function H() {
    A = Mt(B + M * v, R);
  }
  function W() {
    O = h ? Mt(E + M * h, R) : E;
  }
  function V() {
    B = v ? Mt(A - M * v, R) : A;
  }
  if (S[0] && S[1]) {
    E = C[0], A = C[1], M = (A - E) / (d + h + v);
    var j = t.getExtent(), rt = ce(j[1] - j[0]);
    R = TA([A, E], rt, 0.5 / d), W(), V(), un(R) && (M = Mt(M, R));
  } else {
    var tt = C[1] - C[0];
    M = a ? Nt(fS(tt), 1) : Rd(tt / d, cS), R = na(M), S[0] ? (E = C[0], F(function() {
      if (W(), B = Mt(O + M * d, R), H(), A >= C[1])
        return !0;
    })) : S[1] ? (A = C[1], F(function() {
      if (V(), O = Mt(B - M * d, R), U(), E <= C[0])
        return !0;
    })) : F(function() {
      O = Mt(Us(C[0] / M) * M, R), B = Mt(Ka(C[1] / M) * M, R);
      var it = Pn((B - O) / M);
      if (it <= d) {
        var ot = d - it, Z = void 0, bt = i.incl0 || a;
        if (bt && C[0] === 0)
          Z = [0, ot];
        else if (bt && C[1] === 0)
          Z = [ot, 0];
        else {
          var St = Ka(ot / 2);
          Z = ot % 2 === 0 ? [St, St] : E + A < C[0] + C[1] ? [St, St + 1] : [St + 1, St];
        }
        if (O = Mt(O - M * Z[0], R), B = Mt(B + M * Z[1], R), U(), H(), E <= C[0] && A >= C[1])
          return !0;
      }
    });
  }
  jT(r, S, T, [E, A], b, {
    // NOTE: Even in LogScale, `interval` should not be in log space.
    interval: M,
    // Force ticks count, otherwise cumulative error may cause more unexpected ticks to be generated.
    // Though the overlapping tick labels may be auto-ignored, but probably unexpected, e.g., the min
    // tick label is ignored but the secondary min tick label is shown, which is unexpected when
    // `axis.min` is user-specified or dataZoom-specified.
    intervalCount: d,
    intervalPrecision: R,
    niceExtent: [O, B]
  });
}
var X0 = [
  [3, 1],
  [0, 2]
  // xyIdx 1 => 'y'
], qB = (
  /** @class */
  (function() {
    function t(e, r, n) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = vu, this._initCartesian(e, r, n), this.model = e;
    }
    return t.prototype.getRect = function() {
      return this._rect;
    }, t.prototype.update = function(e, r) {
      var n = this._axesMap;
      P(this._axesList, function(o) {
        hk(o, lk);
        var s = o.scale;
        gn(s) && s.setSortInfo(o.model.get("categorySortInfo"));
      });
      function i(o) {
        for (var s = Kt(o), l = [], u = s.length - 1; u >= 0; u--) {
          var f = o[+s[u]];
          f.__alignTo ? l.push(f) : M0(f);
        }
        P(l, function(c) {
          jB(c, c.__alignTo) ? M0(c) : KB(c, c.__alignTo.scale);
        });
      }
      i(n.x), i(n.y);
      var a = {};
      P(n.x, function(o) {
        K0(n, "y", o, a);
      }), P(n.y, function(o) {
        K0(n, "x", o, a);
      }), this.resize(this.model, r);
    }, t.prototype.resize = function(e, r, n) {
      var i = Mb(e, r), a = this._rect = ws(e.getBoxLayoutParams(), i.refContainer), o = this._axesMap, s = this._coordsList, l = e.get("containLabel");
      if (Mw(o, a), !n) {
        var u = QB(a, s, o, l, r), f = void 0;
        if (l)
          f = J0(a.clone(), "axisLabel", null, a, o, u, i);
        else {
          var c = tN(e, a, i), h = c.outerBoundsRect, v = c.parsedOuterBoundsContain, d = c.outerBoundsClamp;
          h && (f = J0(h, v, d, a, o, u, i));
        }
        Aw(a, o, Ar.determine, null, f, i), P(this._coordsList, function(p) {
          p.calcAffineTransform();
        });
      }
    }, t.prototype.getAxis = function(e, r) {
      var n = this._axesMap[e];
      if (n != null)
        return n[r || 0];
    }, t.prototype.getAxes = function() {
      return this._axesList.slice();
    }, t.prototype.getCartesian = function(e, r) {
      if (e != null && r != null) {
        var n = "x" + e + "y" + r;
        return this._coordsMap[n];
      }
      ft(e) && (r = e.yAxisIndex, e = e.xAxisIndex);
      for (var i = 0, a = this._coordsList; i < a.length; i++)
        if (a[i].getAxis("x").index === e || a[i].getAxis("y").index === r)
          return a[i];
    }, t.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, t.prototype.convertToPixel = function(e, r, n) {
      var i = this._findConvertTarget(r);
      return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
    }, t.prototype.convertFromPixel = function(e, r, n) {
      var i = this._findConvertTarget(r);
      return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, t.prototype._findConvertTarget = function(e) {
      var r = e.seriesModel, n = e.xAxisModel || r && r.getReferringComponents("xAxis", ur).models[0], i = e.yAxisModel || r && r.getReferringComponents("yAxis", ur).models[0], a = e.gridModel, o = this._coordsList, s, l;
      if (r)
        s = r.coordinateSystem, At(o, s) < 0 && (s = null);
      else if (n && i)
        s = this.getCartesian(n.componentIndex, i.componentIndex);
      else if (n)
        l = this.getAxis("x", n.componentIndex);
      else if (i)
        l = this.getAxis("y", i.componentIndex);
      else if (a) {
        var u = a.coordinateSystem;
        u === this && (s = this._coordsList[0]);
      }
      return {
        cartesian: s,
        axis: l
      };
    }, t.prototype.containPoint = function(e) {
      var r = this._coordsList[0];
      if (r)
        return r.containPoint(e);
    }, t.prototype._initCartesian = function(e, r, n) {
      var i = this, a = this, o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      }, s = {
        x: {},
        y: {}
      }, l = {
        x: 0,
        y: 0
      };
      if (r.eachComponent("xAxis", u("x"), this), r.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
        this._axesMap = {}, this._axesList = [];
        return;
      }
      this._axesMap = s, P(s.x, function(f, c) {
        P(s.y, function(h, v) {
          var d = "x" + c + "y" + v, p = new XB(d);
          p.master = i, p.model = e, i._coordsMap[d] = p, i._coordsList.push(p), p.addAxis(f), p.addAxis(h);
        });
      }), Z0(s.x), Z0(s.y);
      function u(f) {
        return function(c, h) {
          if (ZB(c, e)) {
            var v = c.get("position");
            f === "x" ? v !== "top" && v !== "bottom" && (v = o.bottom ? "top" : "bottom") : v !== "left" && v !== "right" && (v = o.left ? "right" : "left"), o[v] = !0;
            var d = GO(c), p = new SB(f, WO(c, d), [0, 0], d, v);
            p.onBand = JT(p.scale, c), p.inverse = c.get("inverse"), c.axis = p, p.model = c, p.grid = a, p.index = h, a._axesList.push(p), s[f][h] = p, l[f]++;
          }
        };
      }
    }, t.prototype.getTooltipAxes = function(e) {
      var r = [], n = [];
      return P(this.getCartesians(), function(i) {
        var a = e != null && e !== "auto" ? i.getAxis(e) : i.getBaseAxis(), o = i.getOtherAxis(a);
        At(r, a) < 0 && r.push(a), At(n, o) < 0 && n.push(o);
      }), {
        baseAxes: r,
        otherAxes: n
      };
    }, t.create = function(e, r) {
      var n = [];
      return e.eachComponent("grid", function(i, a) {
        var o = new t(i, e, r);
        o.name = "grid_" + a, o.resize(i, r, !0), i.coordinateSystem = o, n.push(o), P(o._axesList, function(s) {
          ck(s, t.dimIdxMap);
        });
      }), e.eachSeries(function(i) {
        var a, o;
        rP({
          targetModel: i,
          coordSysType: hu,
          coordSysProvider: s
        });
        function s() {
          var l = FB(i), u = l.xAxisModel, f = l.yAxisModel;
          a = u.axis, o = f.axis;
          var c = u.getCoordSysModel(), h = c.coordinateSystem;
          return h.getCartesian(u.componentIndex, f.componentIndex);
        }
        a && o && (b0(a, i, hu), b0(o, i, hu));
      }, this), n;
    }, t.dimensions = vu, t.dimIdxMap = Lp(vu), t;
  })()
);
function ZB(t, e) {
  return t.getCoordSysModel() === e;
}
function K0(t, e, r, n) {
  r.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var i = t[e], a, o = r.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    q0(s, i[l]) && (a = i[l]);
  else
    for (var u in i)
      if (qe(i, u) && q0(s, i[u]) && !n[f(i[u])]) {
        a = i[u];
        break;
      }
  a && (n[f(a)] = !0);
  function f(c) {
    return c.dim + "_" + c.index;
  }
}
function q0(t, e) {
  if (!e)
    return !1;
  var r = e.scale, n = YO(r, 0), i = e && e.type !== "category" && e.type !== "time" && n !== Gv;
  return i && t === "auto" && qO(e) && (i = !1), i;
}
function Z0(t) {
  for (var e = Kt(t), r, n = [], i = e.length - 1; i >= 0; i--) {
    var a = t[+e[i]];
    VT(a.scale) && ZT(a.model, a.type) == null && (a.model.get("alignTicks") && a.model.get("interval") == null ? n.push(a) : r = a);
  }
  r || (r = n.pop()), r && P(n, function(o) {
    o.__alignTo = r;
  });
}
function jB(t, e) {
  return Gu(t.scale) || Gu(e.scale) || e.scale.getTicks().length < 2;
}
function JB(t, e) {
  var r = t.getExtent(), n = r[0] + r[1];
  t.toGlobalCoord = t.dim === "x" ? function(i) {
    return i + e;
  } : function(i) {
    return n - i + e;
  }, t.toLocalCoord = t.dim === "x" ? function(i) {
    return i - e;
  } : function(i) {
    return n - i + e;
  };
}
function Mw(t, e) {
  P(t.x, function(r) {
    return j0(r, e.x, e.width);
  }), P(t.y, function(r) {
    return j0(r, e.y, e.height);
  });
}
function j0(t, e, r) {
  var n = [0, r], i = t.inverse ? 1 : 0;
  t.setExtent(n[i], n[1 - i]), JB(t, e);
}
function J0(t, e, r, n, i, a, o) {
  Aw(n, i, Ar.estimate, e, !1, o);
  var s = [0, 0, 0, 0];
  u(0), u(1), f(n, 0, NaN), f(n, 1, NaN);
  var l = UD(s, function(h) {
    return h > 0;
  }) == null;
  return zu(n, s, !0, !0, r), Mw(i, n), l;
  function u(h) {
    P(i[zi[h]], function(v) {
      if (Es(v.model)) {
        var d = a.ensureRecord(v.model), p = d.labelInfoList;
        if (p)
          for (var m = 0; m < p.length; m++) {
            var g = p[m], y = v.scale.normalize(Zs(v.scale, ia(g.label).labelInfo.tick));
            y = h === 1 ? 1 - y : y, f(g.rect, h, y), f(g.rect, 1 - h, NaN);
          }
        var _ = d.nameLayout;
        if (_) {
          var y = to(d.nameLocation) ? 0.5 : NaN;
          f(_.rect, h, y), f(_.rect, 1 - h, NaN);
        }
      }
    });
  }
  function f(h, v, d) {
    var p = t[zi[v]] - h[zi[v]], m = h[Ss[v]] + h[zi[v]] - (t[Ss[v]] + t[zi[v]]);
    p = c(p, 1 - d), m = c(m, d);
    var g = X0[v][0], y = X0[v][1];
    s[g] = Nt(s[g], p), s[y] = Nt(s[y], m);
  }
  function c(h, v) {
    return h > 0 && !gs(v) && v > 1e-4 && (h /= v), h;
  }
}
function QB(t, e, r, n, i) {
  var a = new _w(eN);
  return P(r, function(o) {
    return P(o, function(s) {
      if (Es(s.model)) {
        var l = !n;
        s.axisBuilder = HB(t, e, s.model, i, a, l);
      }
    });
  }), a;
}
function Aw(t, e, r, n, i, a) {
  var o = r === Ar.determine;
  P(e, function(u) {
    return P(u, function(f) {
      Es(f.model) && (zB(f.axisBuilder, t, f.model), f.axisBuilder.build(o ? {
        axisTickLabelDetermine: !0
      } : {
        axisTickLabelEstimate: !0
      }, {
        noPxChange: i
      }));
    });
  });
  var s = {
    x: 0,
    y: 0
  };
  l(0), l(1);
  function l(u) {
    s[zi[1 - u]] = t[Ss[u]] <= a.refContainer[Ss[u]] * 0.5 ? 0 : 1 - u === 1 ? 2 : 1;
  }
  P(e, function(u, f) {
    return P(u, function(c) {
      Es(c.model) && ((n === "all" || o) && c.axisBuilder.build({
        axisName: !0
      }, {
        nameMarginLevel: s[f]
      }), o && c.axisBuilder.build({
        axisLine: !0
      }));
    });
  });
}
function tN(t, e, r) {
  var n, i = t.get("outerBoundsMode", !0);
  i === "same" ? n = e.clone() : (i == null || i === "auto") && (n = ws(t.get("outerBounds", !0) || Cw, r.refContainer));
  var a = t.get("outerBoundsContain", !0), o;
  a == null || a === "auto" || At(["all", "axisLabel"], a) < 0 ? o = "all" : o = a;
  var s = [lv(vt(t.get("outerBoundsClampWidth", !0), of[0]), e.width), lv(vt(t.get("outerBoundsClampHeight", !0), of[1]), e.height)];
  return {
    outerBoundsRect: n,
    parsedOuterBoundsContain: o,
    outerBoundsClamp: s
  };
}
var eN = function(t, e, r, n, i, a) {
  var o = r.axis.dim === "x" ? "y" : "x";
  Sw(t, e, r, n, i, a), to(t.nameLocation) || P(e.recordMap[o], function(s) {
    s && s.labelInfoList && s.dirVec && Tw(s.labelInfoList, s.dirVec, n, i);
  });
};
function rN(t, e) {
  var r = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: !1,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return nN(r, t, e), r.seriesInvolved && aN(r, t), r;
}
function nN(t, e, r) {
  var n = e.getComponent("tooltip"), i = e.getComponent("axisPointer"), a = i.get("link", !0) || [], o = [];
  P(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = Ps(s.model), u = t.coordSysAxesInfo[l] = {};
    t.coordSysMap[l] = s;
    var f = s.model, c = f.getModel("tooltip", n);
    if (P(s.getAxes(), oe(p, !1, null)), s.getTooltipAxes && n && c.get("show")) {
      var h = c.get("trigger") === "axis", v = c.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (h || v) && P(d.baseAxes, oe(p, v ? "cross" : !0, h)), v && P(d.otherAxes, oe(p, "cross", !1));
    }
    function p(m, g, y) {
      var _ = y.model.getModel("axisPointer", i), S = _.get("show");
      if (!(!S || S === "auto" && !m && !Kv(_))) {
        g == null && (g = _.get("triggerTooltip")), _ = m ? iN(y, c, i, e, m, g) : _;
        var b = _.get("snap"), T = _.get("triggerEmphasis"), C = Ps(y.model), E = g || b || y.type === "category", A = t.axesInfo[C] = {
          key: C,
          axis: y,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: g,
          triggerEmphasis: T,
          involveSeries: E,
          snap: b,
          useHandle: Kv(_),
          seriesModels: [],
          linkGroup: null
        };
        u[C] = A, t.seriesInvolved = t.seriesInvolved || E;
        var M = oN(a, y);
        if (M != null) {
          var R = o[M] || (o[M] = {
            axesInfo: {}
          });
          R.axesInfo[C] = A, R.mapper = a[M].mapper, A.linkGroup = R;
        }
      }
    }
  });
}
function iN(t, e, r, n, i, a) {
  var o = e.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  P(s, function(h) {
    l[h] = xt(o.get(h));
  }), l.snap = t.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), i === "cross") {
    var f = o.get(["label", "show"]);
    if (u.show = f ?? !0, !a) {
      var c = l.lineStyle = o.get("crossStyle");
      c && Ht(u, c.textStyle);
    }
  }
  return t.model.getModel("axisPointer", new Zt(l, r, n));
}
function aN(t, e) {
  e.eachSeries(function(r) {
    var n = r.coordinateSystem, i = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !n || !n.model || i === "none" || i === !1 || i === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || P(t.coordSysAxesInfo[Ps(n.model)], function(o) {
      var s = o.axis;
      n.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function oN(t, e) {
  for (var r = e.model, n = e.dim, i = 0; i < t.length; i++) {
    var a = t[i] || {};
    if (yh(a[n + "AxisId"], r.id) || yh(a[n + "AxisIndex"], r.componentIndex) || yh(a[n + "AxisName"], r.name))
      return i;
  }
}
function yh(t, e) {
  return t === "all" || J(t) && At(t, e) >= 0 || t === e;
}
function sN(t) {
  var e = zp(t);
  if (e) {
    var r = e.axisPointerModel, n = e.axis.scale, i = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = n.parse(o));
    var s = Kv(r);
    a == null && (i.status = s ? "show" : "hide");
    var l = n.getExtent();
    // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), i.value = o, s && (i.status = e.axis.scale.isBlank() ? "hide" : "show");
  }
}
function zp(t) {
  var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return e && e.axesInfo[Ps(t)];
}
function lN(t) {
  var e = zp(t);
  return e && e.axisPointerModel;
}
function Kv(t) {
  return !!t.get(["handle", "show"]);
}
function Ps(t) {
  return t.type + "||" + t.id;
}
var Q0 = {}, Iw = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.prototype.render = function(r, n, i, a) {
      this.axisPointerClass && sN(r), t.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, i, !0);
    }, e.prototype.updateAxisPointer = function(r, n, i, a) {
      this._doUpdateAxisPointerClass(r, i, !1);
    }, e.prototype.remove = function(r, n) {
      var i = this._axisPointer;
      i && i.remove(n);
    }, e.prototype.dispose = function(r, n) {
      this._disposeAxisPointer(n), t.prototype.dispose.apply(this, arguments);
    }, e.prototype._doUpdateAxisPointerClass = function(r, n, i) {
      var a = e.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = lN(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, n, i) : this._disposeAxisPointer(n);
      }
    }, e.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, e.registerAxisPointerClass = function(r, n) {
      Q0[r] = n;
    }, e.getAxisPointerClass = function(r) {
      return r && Q0[r];
    }, e.type = "axis", e;
  })(cn)
), qv = Wt();
function uN(t, e, r, n) {
  var i = r.axis;
  if (!i.scale.isBlank()) {
    var a = r.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = n.coordinateSystem.getRect(), u = i.getTicksCoords({
      tickModel: a,
      breakTicks: "none",
      pruneByBreak: "preserve_extent_bound"
    });
    if (u.length) {
      var f = s.length, c = qv(t).splitAreaColors, h = gt(), v = 0;
      if (c)
        for (var d = 0; d < u.length; d++) {
          var p = c.get(u[d].tickValue);
          if (p != null) {
            v = (p + (f - 1) * d) % f;
            break;
          }
        }
      var m = i.toGlobalCoord(u[0].coord), g = o.getAreaStyle();
      s = J(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var y = i.toGlobalCoord(u[d].coord), _ = void 0, S = void 0, b = void 0, T = void 0;
        i.isHorizontal() ? (_ = m, S = l.y, b = y - _, T = l.height, m = _ + b) : (_ = l.x, S = m, b = l.width, T = y - S, m = S + T);
        var C = u[d - 1].tickValue;
        C != null && h.set(C, v), e.add(new se({
          anid: C != null ? "area_" + C : null,
          shape: {
            x: _,
            y: S,
            width: b,
            height: T
          },
          style: Ht({
            fill: s[v]
          }, g),
          autoBatch: !0,
          silent: !0
        })), v = (v + 1) % f;
      }
      qv(t).splitAreaColors = h;
    }
  }
}
function fN(t) {
  qv(t).splitAreaColors = null;
}
var cN = ["splitArea", "splitLine", "minorSplitLine", "breakArea"], Lw = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.axisPointerClass = "CartesianAxisPointer", r;
    }
    return e.prototype.render = function(r, n, i, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new pe(), this.group.add(this._axisGroup), !!Es(r)) {
        this._axisGroup.add(r.axis.axisBuilder.group), P(cN, function(l) {
          r.get([l, "show"]) && hN[l](this, this._axisGroup, r, r.getCoordSysModel(), i);
        }, this);
        var s = a && a.type === "changeAxisOrder" && a.isInitSort;
        s || ab(o, this._axisGroup, r), t.prototype.render.call(this, r, n, i, a);
      }
    }, e.prototype.remove = function() {
      fN(this);
    }, e.type = "cartesianAxis", e;
  })(Iw)
), hN = {
  splitLine: function(t, e, r, n, i) {
    var a = r.axis;
    if (!a.scale.isBlank()) {
      var o = r.getModel("splitLine"), s = o.getModel("lineStyle"), l = s.get("color"), u = o.get("showMinLine") !== !1, f = o.get("showMaxLine") !== !1;
      l = J(l) ? l : [l];
      for (var c = n.coordinateSystem.getRect(), h = a.isHorizontal(), v = 0, d = a.getTicksCoords({
        tickModel: o,
        breakTicks: "none",
        pruneByBreak: "preserve_extent_bound"
      }), p = [], m = [], g = s.getLineStyle(), y = 0; y < d.length; y++) {
        var _ = a.toGlobalCoord(d[y].coord);
        if (!(y === 0 && !u || y === d.length - 1 && !f)) {
          var S = d[y].tickValue;
          h ? (p[0] = _, p[1] = c.y, m[0] = _, m[1] = c.y + c.height) : (p[0] = c.x, p[1] = _, m[0] = c.x + c.width, m[1] = _);
          var b = v++ % l.length, T = new oi({
            anid: S != null ? "line_" + S : null,
            autoBatch: !0,
            shape: {
              x1: p[0],
              y1: p[1],
              x2: m[0],
              y2: m[1]
            },
            style: Ht({
              stroke: l[b]
            }, g),
            silent: !0
          });
          bs(T.shape, g.lineWidth), e.add(T);
        }
      }
    }
  },
  minorSplitLine: function(t, e, r, n, i) {
    var a = r.axis, o = r.getModel("minorSplitLine"), s = o.getModel("lineStyle"), l = n.coordinateSystem.getRect(), u = a.isHorizontal(), f = a.getMinorTicksCoords();
    if (f.length)
      for (var c = [], h = [], v = s.getLineStyle(), d = 0; d < f.length; d++)
        for (var p = 0; p < f[d].length; p++) {
          var m = a.toGlobalCoord(f[d][p].coord);
          u ? (c[0] = m, c[1] = l.y, h[0] = m, h[1] = l.y + l.height) : (c[0] = l.x, c[1] = m, h[0] = l.x + l.width, h[1] = m);
          var g = new oi({
            anid: "minor_line_" + f[d][p].tickValue,
            autoBatch: !0,
            shape: {
              x1: c[0],
              y1: c[1],
              x2: h[0],
              y2: h[1]
            },
            style: v,
            silent: !0
          });
          bs(g.shape, v.lineWidth), e.add(g);
        }
  },
  splitArea: function(t, e, r, n, i) {
    uN(t, e, r, n);
  },
  breakArea: function(t, e, r, n, i) {
    var a = Yf(), o = r.axis.scale;
    a && o.type !== "ordinal" && a.rectCoordBuildBreakAxis(e, t, r, n.coordinateSystem.getRect(), i);
  }
}, Ew = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.type = "xAxis", e;
  })(Lw)
), vN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = Ew.type, r;
    }
    return e.type = "yAxis", e;
  })(Lw)
), dN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "grid", r;
    }
    return e.prototype.render = function(r, n) {
      this.group.removeAll(), r.get("show") && this.group.add(new se({
        shape: r.coordinateSystem.getRect(),
        style: Ht({
          fill: r.get("backgroundColor")
        }, r.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, e.type = "grid", e;
  })(cn)
), t_ = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function pN(t) {
  t.registerComponentView(dN), t.registerComponentModel(VB), t.registerCoordinateSystem("cartesian2d", qB), W0(t, "x", Xv, t_), W0(t, "y", Xv, t_), t.registerComponentView(Ew), t.registerComponentView(vN), t.registerPreprocessor(function(e) {
    e.xAxis && e.yAxis && !e.grid && (e.grid = {});
  });
}
var Vi = Wt(), e_ = xt, _h = Xt, gN = (
  /** @class */
  (function() {
    function t() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return t.prototype.render = function(e, r, n, i) {
      var a = r.get("value"), o = r.get("status");
      if (this._axisModel = e, this._axisPointerModel = r, this._api = n, !(!i && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, e, r, n);
        var f = u.graphicKey;
        f !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = f;
        var c = this._moveAnimation = this.determineAnimation(e, r);
        if (!s)
          s = this._group = new pe(), this.createPointerEl(s, u, e, r), this.createLabelEl(s, u, e, r), n.getZr().add(s);
        else {
          var h = oe(r_, r, c);
          this.updatePointerEl(s, u, h), this.updateLabelEl(s, u, h, r);
        }
        i_(s, r, !0), this._renderHandle(a);
      }
    }, t.prototype.remove = function(e) {
      this.clear(e);
    }, t.prototype.dispose = function(e) {
      this.clear(e);
    }, t.prototype.determineAnimation = function(e, r) {
      var n = r.get("animation"), i = e.axis, a = i.type === "category", o = r.get("snap");
      if (!o && !a)
        return !1;
      if (n === "auto" || n == null) {
        var s = this.animationThreshold;
        if (a && Wf(i).w > s)
          return !0;
        if (o) {
          var l = zp(e).seriesDataCount, u = i.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return n === !0;
    }, t.prototype.makeElOption = function(e, r, n, i, a) {
    }, t.prototype.createPointerEl = function(e, r, n, i) {
      var a = r.pointer;
      if (a) {
        var o = Vi(e).pointerEl = new _E[a.type](e_(r.pointer));
        e.add(o);
      }
    }, t.prototype.createLabelEl = function(e, r, n, i) {
      if (r.label) {
        var a = Vi(e).labelEl = new Ve(e_(r.label));
        e.add(a), n_(a, i);
      }
    }, t.prototype.updatePointerEl = function(e, r, n) {
      var i = Vi(e).pointerEl;
      i && r.pointer && (i.setStyle(r.pointer.style), n(i, {
        shape: r.pointer.shape
      }));
    }, t.prototype.updateLabelEl = function(e, r, n, i) {
      var a = Vi(e).labelEl;
      a && (a.setStyle(r.label.style), n(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), n_(a, i));
    }, t.prototype._renderHandle = function(e) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, n = this._api.getZr(), i = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          i && n.remove(i), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, i = this._handle = tp(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            z1(u.event);
          },
          onmousedown: _h(this._onHandleDragMove, this, 0, 0),
          drift: _h(this._onHandleDragMove, this),
          ondragend: _h(this._onHandleDragEnd, this)
        }), n.add(i)), i_(i, r, !1), i.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        J(l) || (l = [l, l]), i.scaleX = l[0] / 2, i.scaleY = l[1] / 2, eT(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(e, s);
      }
    }, t.prototype._moveHandleToValue = function(e, r) {
      r_(this._axisPointerModel, !r && this._moveAnimation, this._handle, Sh(this.getHandleTransform(e, this._axisModel, this._axisPointerModel)));
    }, t.prototype._onHandleDragMove = function(e, r) {
      var n = this._handle;
      if (n) {
        this._dragging = !0;
        var i = this.updateHandleTransform(Sh(n), [e, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = i, n.stopAnimation(), n.attr(Sh(i)), Vi(n).lastProp = null, this._doDispatchAxisPointer();
      }
    }, t.prototype._doDispatchAxisPointer = function() {
      var e = this._handle;
      if (e) {
        var r = this._payloadInfo, n = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: r.cursorPoint[0],
          y: r.cursorPoint[1],
          tooltipOption: r.tooltipOption,
          axesInfo: [{
            axisDim: n.axis.dim,
            axisIndex: n.componentIndex
          }]
        });
      }
    }, t.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var e = this._handle;
      if (e) {
        var r = this._axisPointerModel.get("value");
        this._moveHandleToValue(r), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, t.prototype.clear = function(e) {
      this._lastValue = null, this._lastStatus = null;
      var r = e.getZr(), n = this._group, i = this._handle;
      r && n && (this._lastGraphicKey = null, n && r.remove(n), i && r.remove(i), this._group = null, this._handle = null, this._payloadInfo = null), Ev(this, "_doDispatchAxisPointer");
    }, t.prototype.doClear = function() {
    }, t.prototype.buildLabel = function(e, r, n) {
      return n = n || 0, {
        x: e[n],
        y: e[1 - n],
        width: r[n],
        height: r[1 - n]
      };
    }, t;
  })()
);
function r_(t, e, r, n) {
  Pw(Vi(r).lastProp, n) || (Vi(r).lastProp = n, e ? si(r, n, t) : (r.stopAnimation(), r.attr(n)));
}
function Pw(t, e) {
  if (ft(t) && ft(e)) {
    var r = !0;
    return P(e, function(n, i) {
      r = r && Pw(t[i], n);
    }), !!r;
  } else
    return t === e;
}
function n_(t, e) {
  t[e.get(["label", "show"]) ? "show" : "hide"]();
}
function Sh(t) {
  return {
    x: t.x || 0,
    y: t.y || 0,
    rotation: t.rotation || 0
  };
}
function i_(t, e, r) {
  var n = e.get("z"), i = e.get("zlevel");
  t && t.traverse(function(a) {
    a.type !== "group" && (n != null && (a.z = n), i != null && (a.zlevel = i), a.silent = r);
  });
}
function mN(t) {
  var e = t.get("type"), r = t.getModel(e + "Style"), n;
  return e === "line" ? (n = r.getLineStyle(), n.fill = null) : e === "shadow" && (n = r.getAreaStyle(), n.stroke = null), n;
}
function yN(t, e, r, n, i) {
  var a = r.get("value"), o = Rw(a, e.axis, e.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = Hf(s.get("padding") || 0), u = s.getFont(), f = nS(o, u), c = i.position, h = f.width + l[1] + l[3], v = f.height + l[0] + l[2], d = i.align;
  d === "right" && (c[0] -= h), d === "center" && (c[0] -= h / 2);
  var p = i.verticalAlign;
  p === "bottom" && (c[1] -= v), p === "middle" && (c[1] -= v / 2), _N(c, h, v, n);
  var m = s.get("backgroundColor");
  (!m || m === "auto") && (m = e.get(["axisLine", "lineStyle", "color"])), t.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: c[0],
    y: c[1],
    style: Za(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: m
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function _N(t, e, r, n) {
  var i = n.getWidth(), a = n.getHeight();
  t[0] = Math.min(t[0] + e, i) - e, t[1] = Math.min(t[1] + r, a) - r, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0);
}
function Rw(t, e, r, n, i) {
  t = e.scale.parse(t);
  var a = e.scale.getLabel({
    value: t
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: i.precision
  }), o = i.formatter;
  if (o) {
    var s = {
      value: Qu(e, {
        value: t
      }),
      axisDimension: e.dim,
      axisIndex: e.index,
      seriesData: []
    };
    P(n, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), f = l.dataIndexInside, c = u && u.getDataParams(f);
      c && s.seriesData.push(c);
    }), at(o) ? a = o.replace("{value}", a) : _t(o) && (a = o(s));
  }
  return a;
}
function Ow(t, e, r) {
  var n = jr();
  return Ld(n, n, r.rotation), $h(n, n, r.position), Qd([t.dataToCoord(e), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], n);
}
function SN(t, e, r, n, i, a) {
  var o = ni.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = i.get(["label", "margin"]), yN(e, n, i, a, {
    position: Ow(n.axis, t, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function bN(t, e, r) {
  return r = r || 0, {
    x1: t[r],
    y1: t[1 - r],
    x2: e[r],
    y2: e[1 - r]
  };
}
function TN(t, e, r) {
  return r = r || 0, {
    x: t[r],
    y: t[1 - r],
    width: e[r],
    height: e[1 - r]
  };
}
function wN(t, e, r) {
  return Wf(t, {
    fromStat: {
      sers: pt(e, function(n) {
        return r.getSeriesByIndex(n.seriesIndex);
      })
    },
    min: 1
  }).w;
}
function xN(t, e, r) {
  return [Nt(Ze(e[0], e[1]), t - r / 2), Ze(t + r / 2, Nt(e[0], e[1]))];
}
var CN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.makeElOption = function(r, n, i, a, o) {
      var s = i.axis, l = s.grid, u = a.get("type"), f = s.getGlobalExtent(), c = a_(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(n, !0));
      if (u && u !== "none") {
        var v = mN(a), d = DN[u](s, h, f, c, a.get("seriesDataIndices"), a.ecModel);
        d.style = v, r.graphicKey = d.type, r.pointer = d;
      }
      var p = af(l.getRect(), i);
      SN(n, r, p, i, a, o);
    }, e.prototype.getHandleTransform = function(r, n, i) {
      var a = af(n.axis.grid.getRect(), n, {
        labelInside: !1
      });
      a.labelMargin = i.get(["handle", "margin"]);
      var o = Ow(n.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, e.prototype.updateHandleTransform = function(r, n, i, a) {
      var o = i.axis, s = o.grid, l = o.getGlobalExtent(!0), u = a_(s, o).getOtherAxis(o).getGlobalExtent(), f = o.dim === "x" ? 0 : 1, c = [r.x, r.y];
      c[f] += n[f], c[f] = Ze(l[1], c[f]), c[f] = Nt(l[0], c[f]);
      var h = (u[1] + u[0]) / 2, v = [h, h];
      v[f] = c[f];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: c[0],
        y: c[1],
        rotation: r.rotation,
        cursorPoint: v,
        tooltipOption: d[f]
      };
    }, e;
  })(gN)
);
function a_(t, e) {
  var r = {};
  return r[e.dim + "AxisIndex"] = e.index, t.getCartesian(r);
}
var DN = {
  line: function(t, e, r, n) {
    var i = bN([e, n[0]], [e, n[1]], o_(t));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(t, e, r, n, i, a) {
    var o = wN(t, i, a), s = n[1] - n[0], l = xN(e, r, o), u = l[0], f = l[1];
    return {
      type: "Rect",
      shape: TN([u, n[0]], [f - u, s], o_(t))
    };
  }
};
function o_(t) {
  return t.dim === "x" ? 0 : 1;
}
var MN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.type = "axisPointer", e.defaultOption = {
      // 'auto' means that show when triggered by tooltip or handle.
      show: "auto",
      // zlevel: 0,
      z: 50,
      type: "line",
      // axispointer triggered by tootip determine snap automatically,
      // see `modelHelper`.
      snap: !1,
      triggerTooltip: !0,
      triggerEmphasis: !0,
      value: null,
      status: null,
      link: [],
      // Do not set 'auto' here, otherwise global animation: false
      // will not effect at this axispointer.
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: ht.color.border,
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: ht.color.shadowTint
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: ht.color.neutral00,
        padding: [5, 7, 5, 7],
        backgroundColor: ht.color.accent60,
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        // eslint-disable-next-line
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        // handle margin is from symbol center to axis, which is stable when circular move.
        margin: 50,
        // color: '#1b8bbd'
        // color: '#2f4554'
        color: ht.color.accent40,
        // For mobile performance
        throttle: 40
      }
    }, e;
  })(kt)
), An = Wt(), AN = P;
function kw(t, e, r) {
  if (!Tt.node) {
    var n = e.getZr();
    An(n).records || (An(n).records = {}), IN(n, e);
    var i = An(n).records[t] || (An(n).records[t] = {});
    i.handler = r;
  }
}
function IN(t, e) {
  if (An(t).initialized)
    return;
  An(t).initialized = !0, r("click", oe(bh, "click")), r("mousemove", oe(bh, "mousemove")), r("mousewheel", oe(bh, "mousewheel")), r("globalout", EN);
  function r(n, i) {
    t.on(n, function(a) {
      var o = PN(e);
      AN(An(t).records, function(s) {
        s && i(s, a, o.dispatchAction);
      }), LN(o.pendings, e);
    });
  }
}
function LN(t, e) {
  var r = t.showTip.length, n = t.hideTip.length, i;
  r ? i = t.showTip[r - 1] : n && (i = t.hideTip[n - 1]), i && (i.dispatchAction = null, e.dispatchAction(i));
}
function EN(t, e, r) {
  t.handler("leave", null, r);
}
function bh(t, e, r, n) {
  e.handler(t, r, n);
}
function PN(t) {
  var e = {
    showTip: [],
    hideTip: []
  }, r = function(n) {
    var i = e[n.type];
    i ? i.push(n) : (n.dispatchAction = r, t.dispatchAction(n));
  };
  return {
    dispatchAction: r,
    pendings: e
  };
}
function Zv(t, e) {
  if (!Tt.node) {
    var r = e.getZr(), n = (An(r).records || {})[t];
    n && (An(r).records[t] = null);
  }
}
var RN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.prototype.render = function(r, n, i) {
      var a = n.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click|mousewheel";
      kw("axisPointer", i, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, e.prototype.remove = function(r, n) {
      Zv("axisPointer", n);
    }, e.prototype.dispose = function(r, n) {
      Zv("axisPointer", n);
    }, e.type = "axisPointer", e;
  })(cn)
);
function Bw(t, e) {
  var r = [], n = t.seriesIndex, i;
  if (n == null || !(i = e.getSeriesByIndex(n)))
    return {
      point: []
    };
  var a = i.getData(), o = ta(a, t);
  if (o == null || o < 0 || J(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = i.coordinateSystem;
  if (i.getTooltipPosition)
    r = i.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (t.isStacked) {
      var u = l.getBaseAxis(), f = l.getOtherAxis(u), c = f.dim, h = u.dim, v = c === "x" || c === "radius" ? 1 : 0, d = a.mapDimension(h), p = [];
      p[v] = a.get(d, o), p[1 - v] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(p) || [];
    } else
      r = l.dataToPoint(a.getValues(pt(l.dimensions, function(g) {
        return a.mapDimension(g);
      }), o)) || [];
  else if (s) {
    var m = s.getBoundingRect().clone();
    m.applyTransform(s.transform), r = [m.x + m.width / 2, m.y + m.height / 2];
  }
  return {
    point: r,
    el: s
  };
}
var s_ = Wt();
function ON(t, e, r) {
  var n = t.currTrigger, i = [t.x, t.y], a = t, o = t.dispatchAction || Xt(r.dispatchAction, r), s = e.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    du(i) && (i = Bw({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, e).point);
    var l = du(i), u = a.axesInfo, f = s.axesInfo, c = n === "leave" || du(i), h = {}, v = {}, d = {
      list: [],
      map: {}
    }, p = {
      showPointer: oe(BN, v),
      showTooltip: oe(NN, d)
    };
    P(s.coordSysMap, function(g, y) {
      var _ = l || g.containPoint(i);
      P(s.coordSysAxesInfo[y], function(S, b) {
        var T = S.axis, C = VN(u, S);
        if (!c && _ && (!u || C)) {
          var E = C && C.value;
          E == null && !l && (E = T.pointToData(i)), E != null && l_(S, E, p, !1, h);
        }
      });
    });
    var m = {};
    return P(f, function(g, y) {
      var _ = g.linkGroup;
      _ && !v[y] && P(_.axesInfo, function(S, b) {
        var T = v[b];
        if (S !== g && T) {
          var C = T.value;
          _.mapper && (C = g.axis.scale.parse(_.mapper(C, u_(S), u_(g)))), m[g.key] = C;
        }
      });
    }), P(m, function(g, y) {
      l_(f[y], g, p, !0, h);
    }), FN(v, f, h), HN(d, i, t, o), zN(f, o, r), h;
  }
}
function l_(t, e, r, n, i) {
  var a = t.axis;
  if (!(a.scale.isBlank() || !a.containData(e))) {
    if (!t.involveSeries) {
      r.showPointer(t, e);
      return;
    }
    var o = kN(e, t), s = o.payloadBatch, l = o.snapToValue;
    s[0] && i.seriesIndex == null && q(i, s[0]), !n && t.snap && a.containData(l) && l != null && (e = l), r.showPointer(t, e, s), r.showTooltip(t, o, l);
  }
}
function kN(t, e) {
  var r = e.axis, n = r.dim, i = t, a = [], o = Number.MAX_VALUE, s = -1;
  return P(e.seriesModels, function(l, u) {
    var f = l.getData().mapDimensionsAll(n), c, h;
    if (l.getAxisTooltipData) {
      var v = l.getAxisTooltipData(f, t, r);
      h = v.dataIndices, c = v.nestestValue;
    } else {
      if (h = l.indicesOfNearest(
        n,
        f[0],
        t,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        r.type === "category" ? 0.5 : null
      ), !h.length)
        return;
      c = l.getData().get(f[0], h[0]);
    }
    if (un(c)) {
      var d = t - c, p = Math.abs(d);
      p <= o && ((p < o || d >= 0 && s < 0) && (o = p, s = d, i = c, a.length = 0), P(h, function(m) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: m,
          dataIndex: l.getData().getRawIndex(m)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: i
  };
}
function BN(t, e, r, n) {
  t[e.key] = {
    value: r,
    payloadBatch: n
  };
}
function NN(t, e, r, n) {
  var i = r.payloadBatch, a = e.axis, o = a.model, s = e.axisPointerModel;
  if (!(!e.triggerTooltip || !i.length)) {
    var l = e.coordSys.model, u = Ps(l), f = t.map[u];
    f || (f = t.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, t.list.push(f)), f.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: n,
      // Caution: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: i.slice()
    });
  }
}
function FN(t, e, r) {
  var n = r.axesInfo = [];
  P(e, function(i, a) {
    var o = i.axisPointerModel.option, s = t[a];
    s ? (!i.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !i.useHandle && (o.status = "hide"), o.status === "show" && n.push({
      axisDim: i.axis.dim,
      axisIndex: i.axis.model.componentIndex,
      value: o.value
    });
  });
}
function HN(t, e, r, n) {
  if (du(e) || !t.list.length) {
    n({
      type: "hideTip"
    });
    return;
  }
  var i = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  n({
    type: "showTip",
    escapeConnect: !0,
    x: e[0],
    y: e[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: i.dataIndexInside,
    dataIndex: i.dataIndex,
    seriesIndex: i.seriesIndex,
    dataByCoordSys: t.list
  });
}
function zN(t, e, r) {
  var n = r.getZr(), i = "axisPointerLastHighlights", a = s_(n)[i] || {}, o = s_(n)[i] = {};
  P(t, function(f, c) {
    var h = f.axisPointerModel.option;
    h.status === "show" && f.triggerEmphasis && P(h.seriesDataIndices, function(v) {
      o[v.seriesIndex + "|" + v.dataIndex] = v;
    });
  });
  var s = [], l = [];
  function u(f) {
    return {
      seriesIndex: f.seriesIndex,
      dataIndex: f.dataIndex
    };
  }
  P(a, function(f, c) {
    !o[c] && l.push(u(f));
  }), P(o, function(f, c) {
    !a[c] && s.push(u(f));
  }), l.length && r.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && r.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function VN(t, e) {
  for (var r = 0; r < (t || []).length; r++) {
    var n = t[r];
    if (e.axis.dim === n.axisDim && e.axis.model.componentIndex === n.axisIndex)
      return n;
  }
}
function u_(t) {
  var e = t.axis.model, r = {}, n = r.axisDim = t.axis.dim;
  return r.axisIndex = r[n + "AxisIndex"] = e.componentIndex, r.axisName = r[n + "AxisName"] = e.name, r.axisId = r[n + "AxisId"] = e.id, r;
}
function du(t) {
  return !t || t[0] == null || isNaN(t[0]) || t[1] == null || isNaN(t[1]);
}
function Nw(t) {
  Iw.registerAxisPointerClass("CartesianAxisPointer", CN), t.registerComponentModel(MN), t.registerComponentView(RN), t.registerPreprocessor(function(e) {
    if (e) {
      (!e.axisPointer || e.axisPointer.length === 0) && (e.axisPointer = {});
      var r = e.axisPointer.link;
      r && !J(r) && (e.axisPointer.link = [r]);
    }
  }), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, {
    overallReset: function(e, r) {
      e.getComponent("axisPointer").coordSysAxesInfo = rN(e, r);
    }
  }), t.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, ON);
}
function UN(t) {
  fi(pN), fi(Nw);
}
function GN(t, e) {
  var r = Hf(e.get("padding")), n = e.getItemStyle(["color", "opacity"]);
  n.fill = e.get("backgroundColor");
  var i = new se({
    shape: {
      x: t.x - r[3],
      y: t.y - r[0],
      width: t.width + r[1] + r[3],
      height: t.height + r[0] + r[2],
      r: e.get("borderRadius")
    },
    style: n,
    silent: !0,
    z2: -1
  });
  return i;
}
var WN = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.type = "tooltip", e.dependencies = ["axisPointer"], e.defaultOption = {
      // zlevel: 0,
      z: 60,
      show: !0,
      // tooltip main content
      showContent: !0,
      // 'trigger' only works on coordinate system.
      // 'item' | 'axis' | 'none'
      trigger: "item",
      // 'click' | 'mousemove' | 'none'
      triggerOn: "mousemove|click|mousewheel",
      alwaysShowContent: !1,
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaults to `false` (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      displayTransition: !0,
      enterable: !1,
      backgroundColor: ht.color.neutral00,
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
      defaultBorderColor: ht.color.border,
      // Tooltip inside padding, default is 5 for all direction
      // Array is allowed to set up, right, bottom, left, same with css
      // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
      padding: null,
      // Extra css text
      extraCssText: "",
      // axis indicator, trigger by axis
      axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: "line",
        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: ht.color.borderShade,
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: ht.color.tertiary,
        fontSize: 14
      }
    }, e;
  })(kt)
);
function Fw(t) {
  var e = t.get("confine");
  return e != null ? !!e : t.get("renderMode") === "richText";
}
function Hw(t) {
  if (Tt.domSupported) {
    for (var e = document.documentElement.style, r = 0, n = t.length; r < n; r++)
      if (t[r] in e)
        return t[r];
  }
}
var zw = Hw(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), YN = Hw(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function Vw(t, e) {
  if (!t)
    return e;
  e = xb(e, !0);
  var r = t.indexOf(e);
  return t = r === -1 ? e : "-" + t.slice(0, r) + "-" + e, t.toLowerCase();
}
function $N(t, e) {
  var r = t.currentStyle || document.defaultView && document.defaultView.getComputedStyle(t);
  return r ? r[e] : null;
}
var XN = Vw(YN, "transition"), Vp = Vw(zw, "transform"), KN = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (Tt.transform3dSupported ? "will-change:transform;" : "");
function qN(t) {
  return t = t === "left" ? "right" : t === "right" ? "left" : t === "top" ? "bottom" : "top", t;
}
function ZN(t, e, r) {
  if (!at(r) || r === "inside")
    return "";
  var n = t.get("backgroundColor"), i = t.get("borderWidth");
  e = ra(e);
  var a = qN(r), o = Math.max(Math.round(i) * 1.5, 6), s = "", l = Vp + ":", u;
  At(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var f = u * Math.PI / 180, c = o + i, h = c * Math.abs(Math.cos(f)) + c * Math.abs(Math.sin(f)), v = Math.round(((h - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (h - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + v + "px";
  var d = e + " solid " + i + "px;", p = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + n + ";"];
  return '<div style="' + p.join("") + '"></div>';
}
function jN(t, e, r) {
  var n = "cubic-bezier(0.23,1,0.32,1)", i = "", a = "";
  return r && (i = " " + t / 2 + "s " + n, a = "opacity" + i + ",visibility" + i), e || (i = " " + t + "s " + n, a += (a.length ? "," : "") + (Tt.transformSupported ? "" + Vp + i : ",left" + i + ",top" + i)), XN + ":" + a;
}
function f_(t, e, r) {
  var n = t.toFixed(0) + "px", i = e.toFixed(0) + "px";
  if (!Tt.transformSupported)
    return r ? "top:" + i + ";left:" + n + ";" : [["top", i], ["left", n]];
  var a = Tt.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + n + "," + i + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + Vp + ":" + o + ";" : [["top", 0], ["left", 0], [zw, o]];
}
function JN(t) {
  var e = [], r = t.get("fontSize"), n = t.getTextColor();
  n && e.push("color:" + n), e.push("font:" + t.getFont());
  var i = vt(t.get("lineHeight"), Math.round(r * 3 / 2));
  r && e.push("line-height:" + i + "px");
  var a = t.get("textShadowColor"), o = t.get("textShadowBlur") || 0, s = t.get("textShadowOffsetX") || 0, l = t.get("textShadowOffsetY") || 0;
  return a && o && e.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), P(["decoration", "align"], function(u) {
    var f = t.get(u);
    f && e.push("text-" + u + ":" + f);
  }), e.join(";");
}
function QN(t, e, r, n) {
  var i = [], a = t.get("transitionDuration"), o = t.get("backgroundColor"), s = t.get("shadowBlur"), l = t.get("shadowColor"), u = t.get("shadowOffsetX"), f = t.get("shadowOffsetY"), c = t.getModel("textStyle"), h = jb(t, "html"), v = u + "px " + f + "px " + s + "px " + l;
  return i.push("box-shadow:" + v), e && a > 0 && i.push(jN(a, r, n)), o && i.push("background-color:" + o), P(["width", "color", "radius"], function(d) {
    var p = "border-" + d, m = xb(p), g = t.get(m);
    g != null && i.push(p + ":" + g + (d === "color" ? "" : "px"));
  }), i.push(JN(c)), h != null && i.push("padding:" + Hf(h).join("px ") + "px"), i.join(";") + ";";
}
function c_(t, e, r, n, i) {
  var a = e && e.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && aM(t, o, r, n, i);
  } else {
    t[0] = n, t[1] = i;
    var s = a && a.getViewportRootOffset();
    s && (t[0] += s.offsetLeft, t[1] += s.offsetTop);
  }
  t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();
}
var tF = (
  /** @class */
  (function() {
    function t(e, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, Tt.wxa)
        return null;
      var n = document.createElement("div");
      n.domBelongToZr = !0, this.el = n;
      var i = this._zr = e.getZr(), a = r.appendTo, o = a && (at(a) ? document.querySelector(a) : ps(a) ? a : _t(a) && a(e.getDom()));
      c_(this._styleCoord, i, o, e.getWidth() / 2, e.getHeight() / 2), (o || e.getDom()).appendChild(n), this._api = e, this._container = o;
      var s = this;
      n.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, n.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = i.handler, f = i.painter.getViewportRoot();
          rr(f, l, !0), u.dispatch("mousemove", l);
        }
      }, n.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return t.prototype.update = function(e) {
      if (!this._container) {
        var r = this._api.getDom(), n = $N(r, "position"), i = r.style;
        i.position !== "absolute" && n !== "absolute" && (i.position = "relative");
      }
      var a = e.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this._enableDisplayTransition = e.get("displayTransition") && e.get("transitionDuration") > 0, this.el.className = e.get("className") || "";
    }, t.prototype.show = function(e, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var n = this.el, i = n.style, a = this._styleCoord;
      n.innerHTML ? i.cssText = KN + QN(e, !this._firstShow, this._longHide, this._enableDisplayTransition) + f_(a[0], a[1], !0) + ("border-color:" + ra(r) + ";") + (e.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : i.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, t.prototype.setContent = function(e, r, n, i, a) {
      var o = this.el;
      if (e == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (at(a) && n.get("trigger") === "item" && !Fw(n) && (s = ZN(n, i, a)), at(e))
        o.innerHTML = e + s;
      else if (e) {
        o.innerHTML = "", J(e) || (e = [e]);
        for (var l = 0; l < e.length; l++)
          ps(e[l]) && e[l].parentNode !== o && o.appendChild(e[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, t.prototype.setEnterable = function(e) {
      this._enterable = e;
    }, t.prototype.getSize = function() {
      var e = this.el;
      return e ? [e.offsetWidth, e.offsetHeight] : [0, 0];
    }, t.prototype.moveTo = function(e, r) {
      if (this.el) {
        var n = this._styleCoord;
        if (c_(n, this._zr, this._container, e, r), n[0] != null && n[1] != null) {
          var i = this.el.style, a = f_(n[0], n[1]);
          P(a, function(o) {
            i[o[0]] = o[1];
          });
        }
      }
    }, t.prototype._moveIfResized = function() {
      var e = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), r * this._zr.getHeight());
    }, t.prototype.hide = function() {
      var e = this, r = this.el.style;
      this._enableDisplayTransition ? (r.visibility = "hidden", r.opacity = "0") : r.display = "none", Tt.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return e._longHide = !0;
      }, 500);
    }, t.prototype.hideLater = function(e) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Xt(this.hide, this), e)) : this.hide());
    }, t.prototype.isShow = function() {
      return this._show;
    }, t.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var e = this._zr;
      oM(e && e.painter && e.painter.getViewportRoot(), this._container);
      var r = this.el;
      if (r) {
        r.onmouseenter = r.onmousemove = r.onmouseleave = null;
        var n = r.parentNode;
        n && n.removeChild(r);
      }
      this.el = this._container = null;
    }, t;
  })()
), eF = (
  /** @class */
  (function() {
    function t(e) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = e.getZr(), v_(this._styleCoord, this._zr, e.getWidth() / 2, e.getHeight() / 2);
    }
    return t.prototype.update = function(e) {
      var r = e.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, t.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, t.prototype.setContent = function(e, r, n, i, a) {
      var o = this;
      ft(e) && Ne(""), this.el && this._zr.remove(this.el);
      var s = n.getModel("textStyle");
      this.el = new Ve({
        style: {
          rich: r.richTextStyles,
          text: e,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: i,
          textShadowColor: s.get("textShadowColor"),
          fill: n.get(["textStyle", "color"]),
          padding: jb(n, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: n.get("z")
      }), P(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = n.get(u);
      }), P(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
        o.el.style[u] = s.get(u) || 0;
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function() {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0;
      }), this.el.on("mouseout", function() {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1;
      });
    }, t.prototype.setEnterable = function(e) {
      this._enterable = e;
    }, t.prototype.getSize = function() {
      var e = this.el, r = this.el.getBoundingRect(), n = h_(e.style);
      return [r.width + n.left + n.right, r.height + n.top + n.bottom];
    }, t.prototype.moveTo = function(e, r) {
      var n = this.el;
      if (n) {
        var i = this._styleCoord;
        v_(i, this._zr, e, r), e = i[0], r = i[1];
        var a = n.style, o = $n(a.borderWidth || 0), s = h_(a);
        n.x = e + o + s.left, n.y = r + o + s.top, n.markRedraw();
      }
    }, t.prototype._moveIfResized = function() {
      var e = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), r * this._zr.getHeight());
    }, t.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, t.prototype.hideLater = function(e) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Xt(this.hide, this), e)) : this.hide());
    }, t.prototype.isShow = function() {
      return this._show;
    }, t.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, t;
  })()
);
function $n(t) {
  return Math.max(0, t);
}
function h_(t) {
  var e = $n(t.shadowBlur || 0), r = $n(t.shadowOffsetX || 0), n = $n(t.shadowOffsetY || 0);
  return {
    left: $n(e - r),
    right: $n(e + r),
    top: $n(e - n),
    bottom: $n(e + n)
  };
}
function v_(t, e, r, n) {
  t[0] = r, t[1] = n, t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();
}
var rF = new se({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), nF = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.prototype.init = function(r, n) {
      if (!(Tt.node || !n.getDom())) {
        var i = r.getComponent("tooltip"), a = this._renderMode = GA(i.get("renderMode"));
        this._tooltipContent = a === "richText" ? new eF(n) : new tF(n, {
          appendTo: i.get("appendToBody", !0) ? "body" : i.get("appendTo", !0)
        });
      }
    }, e.prototype.render = function(r, n, i) {
      if (!(Tt.node || !i.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = n, this._api = i;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? eT(this, "_updatePosition", 50, "fixRate") : Ev(this, "_updatePosition");
      }
    }, e.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, n = r.get("triggerOn");
      kw("itemTooltip", this._api, Xt(function(i, a, o) {
        n !== "none" && (n.indexOf(i) >= 0 ? this._tryShow(a, o) : i === "leave" && this._hide(o));
      }, this));
    }, e.prototype._keepShow = function() {
      var r = this._tooltipModel, n = this._ecModel, i = this._api, a = r.get("triggerOn");
      if (r.get("trigger") !== "axis" && (this._lastDataByCoordSys = null, this._cbParamsList = null), this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !i.isDisposed() && o.manuallyShowTip(r, n, i, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, e.prototype.manuallyShowTip = function(r, n, i, a) {
      if (!(a.from === this.uid || Tt.node || !i.getDom())) {
        var o = d_(a, i);
        this._ticket = "";
        var s = a.dataByCoordSys, l = sF(a, n, i);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else if (a.tooltip && a.x != null && a.y != null) {
          var f = rF;
          f.x = a.x, f.y = a.y, f.update(), Bt(f).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: f
          }, o);
        } else if (s)
          this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            position: a.position,
            dataByCoordSys: s,
            tooltipOption: a.tooltipOption
          }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(r, n, i, a))
            return;
          var c = Bw(a, n), h = c.point[0], v = c.point[1];
          h != null && v != null && this._tryShow({
            offsetX: h,
            offsetY: v,
            target: c.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (i.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: i.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, e.prototype.manuallyHideTip = function(r, n, i, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, this._cbParamsList = null, a.from !== this.uid && this._hide(d_(a, i));
    }, e.prototype._manuallyAxisShowTip = function(r, n, i, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = n.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = n.getSeriesByIndex(o);
        if (u) {
          var f = u.getData(), c = Mo([f.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (c.get("trigger") === "axis")
            return i.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, e.prototype._tryShow = function(r, n) {
      var i = r.target, a = this._tooltipModel;
      if (a) {
        this._lastX = r.offsetX, this._lastY = r.offsetY;
        var o = r.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, r);
        else if (i) {
          var s = Bt(i);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null, this._cbParamsList = null;
          var l, u;
          No(i, function(f) {
            if (f.tooltipDisabled)
              return l = u = null, !0;
            l || u || (Bt(f).dataIndex != null ? l = f : Bt(f).tooltipConfig != null && (u = f));
          }, !0), l ? this._showSeriesItemTooltip(r, l, n) : u ? this._showComponentItemTooltip(r, u, n) : this._hide(n);
        } else
          this._lastDataByCoordSys = null, this._cbParamsList = null, this._hide(n);
      }
    }, e.prototype._showOrMove = function(r, n) {
      var i = r.get("showDelay");
      n = Xt(n, this), clearTimeout(this._showTimout), i > 0 ? this._showTimout = setTimeout(n, i) : n();
    }, e.prototype._showAxisTooltip = function(r, n) {
      var i = this._ecModel, a = this._tooltipModel, o = [n.offsetX, n.offsetY], s = Mo([n.tooltipOption], a), l = this._renderMode, u = [], f = Ds("section", {
        blocks: [],
        noHeader: !0
      }), c = [], h = new ih();
      P(r, function(y) {
        P(y.dataByAxis, function(_) {
          var S = i.getComponent(_.axisDim + "Axis", _.axisIndex), b = _.value, T = S.axis, C = T.scale.parse(b);
          if (!(!S || b == null)) {
            var E = Rw(b, T, i, _.seriesDataIndices, _.valueLabelOpt), A = Ds("section", {
              header: E,
              noHeader: !Kr(E),
              sortBlocks: !0,
              blocks: []
            });
            f.blocks.push(A), P(_.seriesDataIndices, function(M) {
              var R = i.getSeriesByIndex(M.seriesIndex), B = M.dataIndexInside, O = R.getDataParams(B);
              if (!(O.dataIndex < 0)) {
                O.axisDim = _.axisDim, O.axisIndex = _.axisIndex, O.axisType = _.axisType, O.axisId = _.axisId, O.axisValue = Qu(S.axis, {
                  value: C
                }), O.axisValueLabel = E, O.marker = h.makeTooltipMarker("item", ra(O.color), l);
                var F = My(R.formatTooltip(B, !0, null)), U = F.frag;
                if (U) {
                  var H = Mo([R], a).get("valueFormatter");
                  A.blocks.push(H ? q({
                    valueFormatter: H
                  }, U) : U);
                }
                F.text && c.push(F.text), u.push(O);
              }
            });
          }
        });
      }), f.blocks.reverse(), c.reverse();
      var v = n.position, d = s.get("order"), p = Py(f, h, l, d, i.get("useUTC"), s.get("textStyle"));
      p && c.unshift(p);
      var m = l === "richText" ? `

` : "<br/>", g = c.join(m);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, v, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, g, u, Math.random() + "", o[0], o[1], v, null, h);
      });
    }, e.prototype._showSeriesItemTooltip = function(r, n, i) {
      var a = this._ecModel, o = Bt(n), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, f = o.dataIndex, c = o.dataType, h = u.getData(c), v = this._renderMode, d = r.positionDefault, p = Mo([h.getItemModel(f), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), m = p.get("trigger");
      if (!(m != null && m !== "item")) {
        var g = u.getDataParams(f, c), y = new ih();
        g.marker = y.makeTooltipMarker("item", ra(g.color), v);
        var _ = My(u.formatTooltip(f, !1, c)), S = p.get("order"), b = p.get("valueFormatter"), T = _.frag, C = T ? Py(b ? q({
          valueFormatter: b
        }, T) : T, y, v, S, a.get("useUTC"), p.get("textStyle")) : _.text, E = "item_" + u.name + "_" + f;
        this._showOrMove(p, function() {
          this._showTooltipContent(p, C, g, E, r.offsetX, r.offsetY, r.position, r.target, y);
        }), i({
          type: "showTip",
          dataIndexInside: f,
          dataIndex: h.getRawIndex(f),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, e.prototype._showComponentItemTooltip = function(r, n, i) {
      var a = this._renderMode === "html", o = Bt(n), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (at(l)) {
        var f = l;
        l = {
          content: f,
          // Fixed formatter
          formatter: f
        }, u = !0;
      }
      u && a && l.content && (l = xt(l), l.content = ke(l.content));
      var c = [l], h = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      h && c.push(h), c.push({
        formatter: l.content
      });
      var v = r.positionDefault, d = Mo(c, this._tooltipModel, v ? {
        position: v
      } : null), p = d.get("content"), m = Math.random() + "", g = new ih();
      this._showOrMove(d, function() {
        var y = xt(d.get("formatterParams") || {});
        this._showTooltipContent(d, p, y, m, r.offsetX, r.offsetY, r.position, n, g);
      }), i({
        type: "showTip",
        from: this.uid
      });
    }, e.prototype._showTooltipContent = function(r, n, i, a, o, s, l, u, f) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var c = this._tooltipContent;
        c.setEnterable(r.get("enterable"));
        var h = r.get("formatter");
        l = l || r.get("position");
        var v = n, d = this._getNearestPoint([o, s], i, r.get("trigger"), r.get("borderColor"), r.get("defaultBorderColor", !0)), p = d.color;
        if (h)
          if (at(h)) {
            var m = r.ecModel.get("useUTC"), g = J(i) ? i[0] : i, y = g && g.axisType && g.axisType.indexOf("time") >= 0;
            v = h, y && (v = Ff(g.axisValue, v, m)), v = Cb(v, i, !0);
          } else if (_t(h)) {
            var _ = Xt(function(S, b) {
              S === this._ticket && (c.setContent(b, f, r, p, l), this._updatePosition(r, l, o, s, c, i, u));
            }, this);
            this._ticket = a, v = h(i, a, _);
          } else
            v = h;
        c.setContent(v, f, r, p, l), c.show(r, p), this._updatePosition(r, l, o, s, c, i, u);
      }
    }, e.prototype._getNearestPoint = function(r, n, i, a, o) {
      if (i === "axis" || J(n))
        return {
          color: a || o
        };
      if (!J(n))
        return {
          color: a || n.color || n.borderColor
        };
    }, e.prototype._updatePosition = function(r, n, i, a, o, s, l) {
      var u = this._api.getWidth(), f = this._api.getHeight();
      n = n || r.get("position");
      var c = o.getSize(), h = r.get("align"), v = r.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), _t(n) && (n = n([i, a], s, o.el, d, {
        viewSize: [u, f],
        contentSize: c.slice()
      })), J(n))
        i = Wr(n[0], u), a = Wr(n[1], f);
      else if (ft(n)) {
        var p = n;
        p.width = c[0], p.height = c[1];
        var m = ws(p, {
          width: u,
          height: f
        });
        i = m.x, a = m.y, h = null, v = null;
      } else if (at(n) && l) {
        var g = oF(n, d, c, r.get("borderWidth"));
        i = g[0], a = g[1];
      } else {
        var g = iF(i, a, o, u, f, h ? null : 20, v ? null : 20);
        i = g[0], a = g[1];
      }
      if (h && (i -= p_(h) ? c[0] / 2 : h === "right" ? c[0] : 0), v && (a -= p_(v) ? c[1] / 2 : v === "bottom" ? c[1] : 0), Fw(r)) {
        var g = aF(i, a, o, u, f);
        i = g[0], a = g[1];
      }
      o.moveTo(i, a);
    }, e.prototype._updateContentNotChangedOnAxis = function(r, n) {
      var i = this._lastDataByCoordSys, a = this._cbParamsList, o = !!i && i.length === r.length;
      return o && P(i, function(s, l) {
        var u = s.dataByAxis || [], f = r[l] || {}, c = f.dataByAxis || [];
        o = o && u.length === c.length, o && P(u, function(h, v) {
          var d = c[v] || {}, p = h.seriesDataIndices || [], m = d.seriesDataIndices || [];
          o = o && h.value === d.value && h.axisType === d.axisType && h.axisId === d.axisId && p.length === m.length, o && P(p, function(g, y) {
            var _ = m[y];
            o = o && g.seriesIndex === _.seriesIndex && g.dataIndex === _.dataIndex;
          }), a && P(h.seriesDataIndices, function(g) {
            var y = g.seriesIndex, _ = n[y], S = a[y];
            _ && S && S.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = r, this._cbParamsList = n, !!o;
    }, e.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, this._cbParamsList = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, e.prototype.dispose = function(r, n) {
      Tt.node || !n.getDom() || (Ev(this, "_updatePosition"), this._tooltipContent.dispose(), Zv("itemTooltip", n), this._tooltipContent = null, this._tooltipModel = null, this._lastDataByCoordSys = null, this._cbParamsList = null);
    }, e.type = "tooltip", e;
  })(cn)
);
function Mo(t, e, r) {
  var n = e.ecModel, i;
  r ? (i = new Zt(r, n, n), i = new Zt(e.option, i, n)) : i = e;
  for (var a = t.length - 1; a >= 0; a--) {
    var o = t[a];
    o && (o instanceof Zt && (o = o.get("tooltip", !0)), at(o) && (o = {
      formatter: o
    }), o && (i = new Zt(o, i, n)));
  }
  return i;
}
function d_(t, e) {
  return t.dispatchAction || Xt(e.dispatchAction, e);
}
function iF(t, e, r, n, i, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (t + l + a + 2 > n ? t -= l + a : t += a), o != null && (e + u + o > i ? e -= u + o : e += o), [t, e];
}
function aF(t, e, r, n, i) {
  var a = r.getSize(), o = a[0], s = a[1];
  return t = Math.min(t + o, n) - o, e = Math.min(e + s, i) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e];
}
function oF(t, e, r, n) {
  var i = r[0], a = r[1], o = Math.ceil(Math.SQRT2 * n) + 8, s = 0, l = 0, u = e.width, f = e.height;
  switch (t) {
    case "inside":
      s = e.x + u / 2 - i / 2, l = e.y + f / 2 - a / 2;
      break;
    case "top":
      s = e.x + u / 2 - i / 2, l = e.y - a - o;
      break;
    case "bottom":
      s = e.x + u / 2 - i / 2, l = e.y + f + o;
      break;
    case "left":
      s = e.x - i - o, l = e.y + f / 2 - a / 2;
      break;
    case "right":
      s = e.x + u + o, l = e.y + f / 2 - a / 2;
  }
  return [s, l];
}
function p_(t) {
  return t === "center" || t === "middle";
}
function sF(t, e, r) {
  var n = kd(t).queryOptionMap, i = n.keys()[0];
  if (!(!i || i === "series")) {
    var a = Ws(e, i, n.get(i), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var f = Bt(u).tooltipConfig;
        if (f && f.name === t.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: i,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function lF(t) {
  fi(Nw), t.registerComponentModel(WN), t.registerComponentView(nF), t.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, we), t.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, we);
}
var uF = function(t, e) {
  if (e === "all")
    return {
      type: "all",
      title: t.getLocaleModel().get(["legend", "selector", "all"])
    };
  if (e === "inverse")
    return {
      type: "inverse",
      title: t.getLocaleModel().get(["legend", "selector", "inverse"])
    };
}, jv = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.layoutMode = {
        type: "box",
        // legend.width/height are maxWidth/maxHeight actually,
        // whereas real width/height is calculated by its content.
        // (Setting {left: 10, right: 10} does not make sense).
        // So consider the case:
        // `setOption({legend: {left: 10});`
        // then `setOption({legend: {right: 10});`
        // The previous `left` should be cleared by setting `ignoreSize`.
        ignoreSize: !0
      }, r;
    }
    return e.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i), r.selected = r.selected || {}, this._updateSelector(r);
    }, e.prototype.mergeOption = function(r, n) {
      t.prototype.mergeOption.call(this, r, n), this._updateSelector(r);
    }, e.prototype._updateSelector = function(r) {
      var n = r.selector, i = this.ecModel;
      n === !0 && (n = r.selector = ["all", "inverse"]), J(n) && P(n, function(a, o) {
        at(a) && (a = {
          type: a
        }), n[o] = Pt(a, uF(i, a.type));
      });
    }, e.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var r = this._data;
      if (r[0] && this.get("selectedMode") === "single") {
        for (var n = !1, i = 0; i < r.length; i++) {
          var a = r[i].get("name");
          if (this.isSelected(a)) {
            this.select(a), n = !0;
            break;
          }
        }
        !n && this.select(r[0].get("name"));
      }
    }, e.prototype._updateData = function(r) {
      var n = [], i = [];
      r.eachRawSeries(function(l) {
        var u = l.name;
        i.push(u);
        var f;
        if (l.legendVisualProvider) {
          var c = l.legendVisualProvider, h = c.getAllNames();
          r.isSeriesFiltered(l) || (i = i.concat(h)), h.length ? n = n.concat(h) : f = !0;
        } else
          f = !0;
        f && Od(l) && n.push(l.name);
      }), this._availableNames = i;
      var a = this.get("data") || n, o = gt(), s = pt(a, function(l) {
        return (at(l) || qt(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new Zt(l, this, this.ecModel));
      }, this);
      this._data = be(s, function(l) {
        return !!l;
      });
    }, e.prototype.getData = function() {
      return this._data;
    }, e.prototype.select = function(r) {
      var n = this.option.selected, i = this.get("selectedMode");
      if (i === "single") {
        var a = this._data;
        P(a, function(o) {
          n[o.get("name")] = !1;
        });
      }
      n[r] = !0;
    }, e.prototype.unSelect = function(r) {
      this.get("selectedMode") !== "single" && (this.option.selected[r] = !1);
    }, e.prototype.toggleSelected = function(r) {
      var n = this.option.selected;
      n.hasOwnProperty(r) || (n[r] = !0), this[n[r] ? "unSelect" : "select"](r);
    }, e.prototype.allSelect = function() {
      var r = this._data, n = this.option.selected;
      P(r, function(i) {
        n[i.get("name", !0)] = !0;
      });
    }, e.prototype.inverseSelect = function() {
      var r = this._data, n = this.option.selected;
      P(r, function(i) {
        var a = i.get("name", !0);
        n.hasOwnProperty(a) || (n[a] = !0), n[a] = !n[a];
      });
    }, e.prototype.isSelected = function(r) {
      var n = this.option.selected;
      return !(n.hasOwnProperty(r) && !n[r]) && At(this._availableNames, r) >= 0;
    }, e.prototype.getOrient = function() {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    }, e.type = "legend.plain", e.dependencies = ["series"], e.defaultOption = {
      // zlevel: 0,
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      // right: 'center',
      // top: 0,
      bottom: ht.size.m,
      align: "auto",
      backgroundColor: ht.color.transparent,
      borderColor: ht.color.border,
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 8,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: ht.color.disabled,
      inactiveBorderColor: ht.color.disabled,
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: ht.color.disabled,
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: ht.color.secondary
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: ht.color.tertiary,
        borderWidth: 1,
        borderColor: ht.color.border
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: ht.color.quaternary
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      },
      triggerEvent: !1
    }, e;
  })(kt)
), wa = oe, Jv = P, Wl = pe, Uw = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.newlineDisabled = !1, r;
    }
    return e.prototype.init = function() {
      this.group.add(this._contentGroup = new Wl()), this.group.add(this._selectorGroup = new Wl()), this._isFirstRender = !0;
    }, e.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, e.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, e.prototype.render = function(r, n, i) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!r.get("show", !0)) {
        var o = r.get("align"), s = r.get("orient");
        (!o || o === "auto") && (o = r.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = r.get("selector", !0), u = r.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, r, n, i, l, s, u);
        var f = Mb(r, i).refContainer, c = r.getBoxLayoutParams(), h = r.get("padding"), v = ws(c, f, h), d = this.layoutInner(r, o, v, a, l, u), p = ws(Ht({
          width: d.width,
          height: d.height
        }, c), f, h);
        this.group.x = p.x - d.x, this.group.y = p.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = GN(
          d,
          // FXIME: most itemStyle options does not work in background because inherit is not handled yet.
          r
        ));
      }
    }, e.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, e.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this.getContentGroup(), f = gt(), c = n.get("selectedMode"), h = n.get("triggerEvent"), v = [];
      i.eachRawSeries(function(d) {
        !d.get("legendHoverLink") && v.push(d.id);
      }), Jv(n.getData(), function(d, p) {
        var m = this, g = d.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var y = new Wl();
          y.newline = !0, u.add(y);
          return;
        }
        var _ = i.getSeriesByName(g)[0];
        if (!f.get(g))
          if (_) {
            var S = _.getData(), b = S.getVisual("legendLineStyle") || {}, T = S.getVisual("legendIcon"), C = S.getVisual("style"), E = this._createItem(_, g, p, d, n, r, b, C, T, c, a);
            E.on("click", wa(g_, g, null, a, v)).on("mouseover", wa(Qv, _.name, null, a, v)).on("mouseout", wa(td, _.name, null, a, v)), i.ssr && E.eachChild(function(A) {
              var M = Bt(A);
              M.seriesIndex = _.seriesIndex, M.dataIndex = p, M.ssrType = "legend";
            }), h && E.eachChild(function(A) {
              m.packEventData(A, n, _, p, g);
            }), f.set(g, !0);
          } else
            i.eachRawSeries(function(A) {
              var M = this;
              if (!f.get(g) && A.legendVisualProvider) {
                var R = A.legendVisualProvider;
                if (!R.containName(g))
                  return;
                var B = R.indexOfName(g), O = R.getItemVisual(B, "style"), F = R.getItemVisual(B, "legendIcon"), U = Jr(O.fill);
                U && U[3] === 0 && (U[3] = 0.2, O = q(q({}, O), {
                  fill: zs(U, "rgba")
                }));
                var H = this._createItem(A, g, p, d, n, r, {}, O, F, c, a);
                H.on("click", wa(g_, null, g, a, v)).on("mouseover", wa(Qv, null, g, a, v)).on("mouseout", wa(td, null, g, a, v)), i.ssr && H.eachChild(function(W) {
                  var V = Bt(W);
                  V.seriesIndex = A.seriesIndex, V.dataIndex = p, V.ssrType = "legend";
                }), h && H.eachChild(function(W) {
                  M.packEventData(W, n, A, p, g);
                }), f.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, n, a, s, l);
    }, e.prototype.packEventData = function(r, n, i, a, o) {
      var s = {
        componentType: "legend",
        componentIndex: n.componentIndex,
        dataIndex: a,
        value: o,
        seriesIndex: i.seriesIndex
      };
      Bt(r).eventData = s;
    }, e.prototype._createSelector = function(r, n, i, a, o) {
      var s = this.getSelectorGroup();
      Jv(r, function(u) {
        var f = u.type, c = new Ve({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            i.dispatchAction({
              type: f === "all" ? "legendAllSelect" : "legendInverseSelect",
              legendId: n.id
            });
          }
        });
        s.add(c);
        var h = n.getModel("selectorLabel"), v = n.getModel(["emphasis", "selectorLabel"]);
        ip(c, {
          normal: h,
          emphasis: v
        }, {
          defaultText: u.title
        }), mv(c);
      });
    }, e.prototype._createItem = function(r, n, i, a, o, s, l, u, f, c, h) {
      var v = r.visualDrawType, d = o.get("itemWidth"), p = o.get("itemHeight"), m = o.isSelected(n), g = a.get("symbolRotate"), y = a.get("symbolKeepAspect"), _ = a.get("icon");
      f = _ || f || "roundRect";
      var S = fF(f, a, l, u, v, m, h), b = new Wl(), T = a.getModel("textStyle");
      if (_t(r.getLegendIcon) && (!_ || _ === "inherit"))
        b.add(r.getLegendIcon({
          itemWidth: d,
          itemHeight: p,
          icon: f,
          iconRotate: g,
          itemStyle: S.itemStyle,
          lineStyle: S.lineStyle,
          symbolKeepAspect: y
        }));
      else {
        var C = _ === "inherit" && r.getData().getVisual("symbol") ? g === "inherit" ? r.getData().getVisual("symbolRotate") : g : 0;
        b.add(cF({
          itemWidth: d,
          itemHeight: p,
          icon: f,
          iconRotate: C,
          itemStyle: S.itemStyle,
          symbolKeepAspect: y
        }));
      }
      var E = s === "left" ? d + 5 : -5, A = s, M = o.get("formatter"), R = n;
      at(M) && M ? R = M.replace("{name}", n ?? "") : _t(M) && (R = M(n));
      var B = m ? T.getTextColor() : a.get("inactiveColor");
      b.add(new Ve({
        style: Za(T, {
          text: R,
          x: E,
          y: p / 2,
          fill: B,
          align: A,
          verticalAlign: "middle"
        }, {
          inheritColor: B
        })
      }));
      var O = new se({
        shape: b.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), F = a.getModel("tooltip");
      return F.get("show") && kf({
        el: O,
        componentModel: o,
        itemName: n,
        itemTooltipOption: F.option
      }), b.add(O), b.eachChild(function(U) {
        U.silent = !0;
      }), O.silent = !c, this.getContentGroup().add(b), mv(b), b.__legendDataIndex = i, b;
    }, e.prototype.layoutInner = function(r, n, i, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      rs(r.get("orient"), l, r.get("itemGap"), i.width, i.height);
      var f = l.getBoundingRect(), c = [-f.x, -f.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        rs(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          r.get("selectorItemGap", !0)
        );
        var h = u.getBoundingRect(), v = [-h.x, -h.y], d = r.get("selectorButtonGap", !0), p = r.getOrient().index, m = p === 0 ? "width" : "height", g = p === 0 ? "height" : "width", y = p === 0 ? "y" : "x";
        s === "end" ? v[p] += f[m] + d : c[p] += h[m] + d, v[1 - p] += f[g] / 2 - h[g] / 2, u.x = v[0], u.y = v[1], l.x = c[0], l.y = c[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[m] = f[m] + d + h[m], _[g] = Math.max(f[g], h[g]), _[y] = Math.min(0, h[y] + v[1 - p]), _;
      } else
        return l.x = c[0], l.y = c[1], this.group.getBoundingRect();
    }, e.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, e.type = "legend.plain", e;
  })(cn)
);
function fF(t, e, r, n, i, a, o) {
  function s(m, g) {
    m.lineWidth === "auto" && (m.lineWidth = g.lineWidth > 0 ? 2 : 0), Jv(m, function(y, _) {
      m[_] === "inherit" && (m[_] = g[_]);
    });
  }
  var l = e.getModel("itemStyle"), u = l.getItemStyle(), f = t.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", c = l.getShallow("decal");
  u.decal = !c || c === "inherit" ? n.decal : Bv(c, o), u.fill === "inherit" && (u.fill = n[i]), u.stroke === "inherit" && (u.stroke = n[f]), u.opacity === "inherit" && (u.opacity = (i === "fill" ? n : r).opacity), s(u, n);
  var h = e.getModel("lineStyle"), v = h.getLineStyle();
  if (s(v, r), u.fill === "auto" && (u.fill = n.fill), u.stroke === "auto" && (u.stroke = n.fill), v.stroke === "auto" && (v.stroke = n.fill), !a) {
    var d = e.get("inactiveBorderWidth"), p = u[f];
    u.lineWidth = d === "auto" ? n.lineWidth > 0 && p ? 2 : 0 : u.lineWidth, u.fill = e.get("inactiveColor"), u.stroke = e.get("inactiveBorderColor"), v.stroke = h.get("inactiveColor"), v.lineWidth = h.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: v
  };
}
function cF(t) {
  var e = t.icon || "roundRect", r = Ja(e, 0, 0, t.itemWidth, t.itemHeight, t.itemStyle.fill, t.symbolKeepAspect);
  return r.setStyle(t.itemStyle), r.rotation = (t.iconRotate || 0) * Math.PI / 180, r.setOrigin([t.itemWidth / 2, t.itemHeight / 2]), e.indexOf("empty") > -1 && (r.style.stroke = r.style.fill, r.style.fill = ht.color.neutral00, r.style.lineWidth = 2), r;
}
function g_(t, e, r, n) {
  td(t, e, r, n), r.dispatchAction({
    type: "legendToggleSelect",
    name: t ?? e
  }), Qv(t, e, r, n);
}
function Qv(t, e, r, n) {
  r.usingTHL() || r.dispatchAction({
    type: "highlight",
    seriesName: t,
    name: e,
    excludeSeriesId: n
  });
}
function td(t, e, r, n) {
  r.usingTHL() || r.dispatchAction({
    type: "downplay",
    seriesName: t,
    name: e,
    excludeSeriesId: n
  });
}
function Ao(t, e, r) {
  var n = t === "allSelect" || t === "inverseSelect", i = {}, a = [];
  r.eachComponent({
    mainType: "legend",
    query: e
  }, function(s) {
    n ? s[t]() : s[t](e.name), m_(s, i), a.push(s.componentIndex);
  });
  var o = {};
  return r.eachComponent("legend", function(s) {
    P(i, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), m_(s, o);
  }), n ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: e.name,
    selected: o
  };
}
function m_(t, e) {
  var r = e || {};
  return P(t.getData(), function(n) {
    var i = n.get("name");
    if (!(i === `
` || i === "")) {
      var a = t.isSelected(i);
      qe(r, i) ? r[i] = r[i] && a : r[i] = a;
    }
  }), r;
}
function hF(t) {
  t.registerAction("legendToggleSelect", "legendselectchanged", oe(Ao, "toggleSelected")), t.registerAction("legendAllSelect", "legendselectall", oe(Ao, "allSelect")), t.registerAction("legendInverseSelect", "legendinverseselect", oe(Ao, "inverseSelect")), t.registerAction("legendSelect", "legendselected", oe(Ao, "select")), t.registerAction("legendUnSelect", "legendunselected", oe(Ao, "unSelect"));
}
var vF = Nd(dF);
function dF(t) {
  var e = t.findComponents({
    mainType: "legend"
  });
  e && e.length && t.filterSeries(function(r) {
    for (var n = 0; n < e.length; n++)
      if (!e[n].isSelected(r.name))
        return !1;
    return !0;
  });
}
function Gw(t) {
  t.registerComponentModel(jv), t.registerComponentView(Uw), t.registerProcessor(t.PRIORITY.PROCESSOR.SERIES_FILTER, vF), t.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), hF(t);
}
var pF = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r;
    }
    return e.prototype.setScrollDataIndex = function(r) {
      this.option.scrollDataIndex = r;
    }, e.prototype.init = function(r, n, i) {
      var a = Ks(r);
      t.prototype.init.call(this, r, n, i), y_(this, r, a);
    }, e.prototype.mergeOption = function(r, n) {
      t.prototype.mergeOption.call(this, r, n), y_(this, this.option, r);
    }, e.type = "legend.scroll", e.defaultOption = RE(jv.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: ht.color.accent50,
      pageIconInactiveColor: ht.color.accent10,
      pageIconSize: 15,
      pageTextStyle: {
        color: ht.color.tertiary
      },
      animationDurationUpdate: 800
    }), e;
  })(jv)
);
function y_(t, e, r) {
  var n = t.getOrient(), i = [1, 1];
  i[n.index] = 0, li(e, r, {
    type: "box",
    ignoreSize: !!i
  });
}
var __ = pe, Th = ["width", "height"], wh = ["x", "y"], gF = (
  /** @class */
  (function(t) {
    Q(e, t);
    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.newlineDisabled = !0, r._currentIndex = 0, r;
    }
    return e.prototype.init = function() {
      t.prototype.init.call(this), this.group.add(this._containerGroup = new __()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new __());
    }, e.prototype.resetInner = function() {
      t.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, e.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this;
      t.prototype.renderInner.call(this, r, n, i, a, o, s, l);
      var f = this._controllerGroup, c = n.get("pageIconSize", !0), h = J(c) ? c : [c, c];
      d("pagePrev", 0);
      var v = n.getModel("pageTextStyle");
      f.add(new Ve({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: v.getTextColor(),
          font: v.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), d("pageNext", 1);
      function d(p, m) {
        var g = p + "DataIndex", y = tp(n.get("pageIcons", !0)[n.getOrient().name][m], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: Xt(u._pageGo, u, g, n, a)
        }, {
          x: -h[0] / 2,
          y: -h[1] / 2,
          width: h[0],
          height: h[1]
        });
        y.name = p, f.add(y);
      }
    }, e.prototype.layoutInner = function(r, n, i, a, o, s) {
      var l = this.getSelectorGroup(), u = r.getOrient().index, f = Th[u], c = wh[u], h = Th[1 - u], v = wh[1 - u];
      o && rs(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        r.get("selectorItemGap", !0)
      );
      var d = r.get("selectorButtonGap", !0), p = l.getBoundingRect(), m = [-p.x, -p.y], g = xt(i);
      o && (g[f] = i[f] - p[f] - d);
      var y = this._layoutContentAndController(r, a, g, u, f, h, v, c);
      if (o) {
        if (s === "end")
          m[u] += y[f] + d;
        else {
          var _ = p[f] + d;
          m[u] -= _, y[c] -= _;
        }
        y[f] += p[f] + d, m[1 - u] += y[v] + y[h] / 2 - p[h] / 2, y[h] = Math.max(y[h], p[h]), y[v] = Math.min(y[v], p[v] + m[1 - u]), l.x = m[0], l.y = m[1], l.markRedraw();
      }
      return y;
    }, e.prototype._layoutContentAndController = function(r, n, i, a, o, s, l, u) {
      var f = this.getContentGroup(), c = this._containerGroup, h = this._controllerGroup;
      rs(r.get("orient"), f, r.get("itemGap"), a ? i.width : null, a ? null : i.height), rs(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        h,
        r.get("pageButtonItemGap", !0)
      );
      var v = f.getBoundingRect(), d = h.getBoundingRect(), p = this._showController = v[o] > i[o], m = [-v.x, -v.y];
      n || (m[a] = f[u]);
      var g = [0, 0], y = [-d.x, -d.y], _ = vt(r.get("pageButtonGap", !0), r.get("itemGap", !0));
      if (p) {
        var S = r.get("pageButtonPosition", !0);
        S === "end" ? y[a] += i[o] - d[o] : g[a] += d[o] + _;
      }
      y[1 - a] += v[s] / 2 - d[s] / 2, f.setPosition(m), c.setPosition(g), h.setPosition(y);
      var b = {
        x: 0,
        y: 0
      };
      if (b[o] = p ? i[o] : v[o], b[s] = Math.max(v[s], d[s]), b[l] = Math.min(0, d[l] + y[1 - a]), c.__rectSize = i[o], p) {
        var T = {
          x: 0,
          y: 0
        };
        T[o] = Math.max(i[o] - d[o] - _, 0), T[s] = b[s], c.setClipPath(new se({
          shape: T
        })), c.__rectSize = T[o];
      } else
        h.eachChild(function(E) {
          E.attr({
            invisible: !0,
            silent: !0
          });
        });
      var C = this._getPageInfo(r);
      return C.pageIndex != null && si(
        f,
        {
          x: C.contentPosition[0],
          y: C.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        p ? r : null
      ), this._updatePageInfoView(r, C), b;
    }, e.prototype._pageGo = function(r, n, i) {
      var a = this._getPageInfo(n)[r];
      a != null && i.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: n.id
      });
    }, e.prototype._updatePageInfoView = function(r, n) {
      var i = this._controllerGroup;
      P(["pagePrev", "pageNext"], function(f) {
        var c = f + "DataIndex", h = n[c] != null, v = i.childOfName(f);
        v && (v.setStyle("fill", h ? r.get("pageIconColor", !0) : r.get("pageIconInactiveColor", !0)), v.cursor = h ? "pointer" : "default");
      });
      var a = i.childOfName("pageText"), o = r.get("pageFormatter"), s = n.pageIndex, l = s != null ? s + 1 : 0, u = n.pageCount;
      a && o && a.setStyle("text", at(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, e.prototype._getPageInfo = function(r) {
      var n = r.get("scrollDataIndex", !0), i = this.getContentGroup(), a = this._containerGroup.__rectSize, o = r.getOrient().index, s = Th[o], l = wh[o], u = this._findTargetItemIndex(n), f = i.children(), c = f[u], h = f.length, v = h ? 1 : 0, d = {
        contentPosition: [i.x, i.y],
        pageCount: v,
        pageIndex: v - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!c)
        return d;
      var p = S(c);
      d.contentPosition[o] = -p.s;
      for (var m = u + 1, g = p, y = p, _ = null; m <= h; ++m)
        _ = S(f[m]), // Half of the last item is out of the window.
        (!_ && y.e > g.s + a || _ && !b(_, g.s)) && (y.i > g.i ? g = y : g = _, g && (d.pageNextDataIndex == null && (d.pageNextDataIndex = g.i), ++d.pageCount)), y = _;
      for (var m = u - 1, g = p, y = p, _ = null; m >= -1; --m)
        _ = S(f[m]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !b(y, _.s)) && g.i < y.i && (y = g, d.pagePrevDataIndex == null && (d.pagePrevDataIndex = g.i), ++d.pageCount, ++d.pageIndex), g = _;
      return d;
      function S(T) {
        if (T) {
          var C = T.getBoundingRect(), E = C[l] + T[l];
          return {
            s: E,
            e: E + C[s],
            i: T.__legendDataIndex
          };
        }
      }
      function b(T, C) {
        return T.e >= C && T.s <= C + a;
      }
    }, e.prototype._findTargetItemIndex = function(r) {
      if (!this._showController)
        return 0;
      var n, i = this.getContentGroup(), a;
      return i.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === r && (n = s);
      }), n ?? a;
    }, e.type = "legend.scroll", e;
  })(Uw)
);
function mF(t) {
  t.registerAction("legendScroll", "legendscroll", function(e, r) {
    var n = e.scrollDataIndex;
    n != null && r.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: e
    }, function(i) {
      i.setScrollDataIndex(n);
    });
  });
}
function yF(t) {
  fi(Gw), t.registerComponentModel(pF), t.registerComponentView(gF), mF(t);
}
function _F(t) {
  fi(Gw), fi(yF);
}
function S_(t, e, r) {
  var n = Ke.createCanvas(), i = e.getWidth(), a = e.getHeight(), o = n.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", t)), n.width = i * r, n.height = a * r, n;
}
function xh(t) {
  return !t.__cursors.get(QS);
}
function b_(t) {
  var e = t.__cursors.get(QS);
  return {
    startIdx: e ? e.startIdx : 0,
    endIdx: e ? e.endIdx : 0
  };
}
var Ww = (function(t) {
  Q(e, t);
  function e(r, n, i) {
    var a = t.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.zlevel = 0, a.zlevel2 = iu, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__prevIdx = { startIdx: 0, endIdx: 0 };
    var o;
    i = i || Lu, typeof r == "string" ? o = S_(r, n, i) : ft(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (F1(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = n, a.dpr = i, a;
  }
  return e.prototype.afterBrush = function() {
    this.__prevIdx = b_(this);
  }, e.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, e.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, e.prototype.createBackBuffer = function() {
    var r = this.dpr;
    this.domBack = S_("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, e.prototype.createRepaintRects = function(r, n, i, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new mt(0, 0, 0, 0);
    function f(S) {
      if (!(!S.isFinite() || S.isZero()))
        if (o.length === 0) {
          var b = new mt(0, 0, 0, 0);
          b.copy(S), o.push(b);
        } else {
          for (var T = !1, C = 1 / 0, E = 0, A = 0; A < o.length; ++A) {
            var M = o[A];
            if (M.intersect(S)) {
              var R = new mt(0, 0, 0, 0);
              R.copy(M), R.union(S), o[A] = R, T = !0;
              break;
            } else if (l) {
              u.copy(S), u.union(M);
              var B = S.width * S.height, O = M.width * M.height, F = u.width * u.height, U = F - B - O;
              U < C && (C = U, E = A);
            }
          }
          if (l && (o[E].union(S), T = !0), !T) {
            var b = new mt(0, 0, 0, 0);
            b.copy(S), o.push(b);
          }
          l || (l = o.length >= s);
        }
    }
    for (var c = b_(this), h = c.startIdx; h < c.endIdx; ++h) {
      var v = r[h];
      if (v) {
        var d = v.shouldBePainted(i, a, !0, !0), p = v.__isRendered && (v.__dirty & Fe || !d) ? v.getPrevPaintRect() : null;
        p && f(p);
        var m = d && (v.__dirty & Fe || !v.__isRendered) ? v.getPaintRect() : null;
        m && f(m);
      }
    }
    for (var g = this.__prevIdx, h = g.startIdx; h < g.endIdx; ++h) {
      var v = n[h], d = v && v.shouldBePainted(i, a, !0, !0);
      if (v && (!d || !v.__zr) && v.__isRendered) {
        var p = v.getPrevPaintRect();
        p && f(p);
      }
    }
    var y;
    do {
      y = !1;
      for (var h = 0; h < o.length; ) {
        if (o[h].isZero()) {
          o.splice(h, 1);
          continue;
        }
        for (var _ = h + 1; _ < o.length; )
          o[h].intersect(o[_]) ? (y = !0, o[h].union(o[_]), o.splice(_, 1)) : _++;
        h++;
      }
    } while (y);
    return this._paintRects = o, o;
  }, e.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, e.prototype.resize = function(r, n) {
    var i = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = r + "px", o.height = n + "px"), a.width = r * i, a.height = n * i, s && (s.width = r * i, s.height = n * i, i !== 1 && this.ctxBack.scale(i, i));
  }, e.prototype.clear = function(r, n, i) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    n = n || this.clearColor;
    var u = this.motionBlur && !r, f = this.lastFrameAlpha, c = this.dpr, h = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / c, l / c));
    var v = this.domBack;
    function d(p, m, g, y) {
      if (o.clearRect(p, m, g, y), n && n !== "transparent") {
        var _ = void 0;
        if (Sf(n)) {
          var S = n.global || n.__width === g && n.__height === y;
          _ = S && n.__canvasGradient || Ov(o, n, {
            x: 0,
            y: 0,
            width: g,
            height: y
          }), n.__canvasGradient = _, n.__width = g, n.__height = y;
        } else WD(n) && (n.scaleX = n.scaleX || c, n.scaleY = n.scaleY || c, _ = kv(o, n, {
          dirty: function() {
            h.setUnpainted(), h.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || n, o.fillRect(p, m, g, y), o.restore();
      }
      u && (o.save(), o.globalAlpha = f, o.drawImage(v, p, m, g, y), o.restore());
    }
    !i || u ? d(0, 0, s, l) : i.length && P(i, function(p) {
      d(p.x * c, p.y * c, p.width * c, p.height * c);
    });
  }, e;
})(dn), T_ = 1e5, Fi = 314159, Ch = void 0, SF = 1, Dh = 2;
function bF(t) {
  return t ? t.__builtin__ ? !0 : !(typeof t.resize != "function" || typeof t.refresh != "function") : !1;
}
function TF(t, e) {
  var r = document.createElement("div");
  return r.style.cssText = [
    "position:relative",
    "width:" + t + "px",
    "height:" + e + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", r;
}
function w_(t, e, r, n) {
  var i = new Ww(t, e, e.dpr);
  return i.zlevel = r, i.zlevel2 = n, i.__builtin__ = !0, Yw(i), i;
}
function Yw(t) {
  t.__cursorStack = [], t.__cursors = gt();
}
function wF(t) {
  return t.startIdx = t.drawIdx = t.endIdx = t.endIdxNew = 0, t.used = !1, t.first = t.last = NaN, t.notClearIdx = -1, t;
}
function xF(t, e) {
  var r = t.__cursors, n = +e;
  return r.get(n) || (t.__cursorStack.push(n), r.set(n, wF({ key: n })));
}
function Yl(t, e) {
  for (var r = t.__cursorStack, n = 0; n < r.length; n++)
    e(t.__cursors.get(r[n]));
}
function Mh(t, e) {
  var r = t.layers;
  return r[e] || (r[e] = new Array(3));
}
function ye(t, e, r) {
  for (var n = t.layerStack, i = 0; i < n.length; i++) {
    var a = n[i].zl, o = n[i].zl2, s = t.layers[a][o];
    (!r || (!(r & os) || s.__builtin__) && (!(r & ed) || !s.__builtin__) && (!(r & $w) || s !== t.hoverlayer)) && e(s, a, o, i);
  }
}
var os = 1, ed = 2, $w = 4, $l = os | $w, CF = (function() {
  function t(e, r, n, i) {
    this.type = "canvas", this._prevDisplayList = [], this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas", this._i = {
      layerStack: [],
      layers: []
    };
    var a = !e.nodeName || e.nodeName.toUpperCase() === "CANVAS";
    this._opts = n = q({}, n || {}), this.dpr = n.devicePixelRatio || Lu, this._singleCanvas = a, this.root = e;
    var o = e.style;
    if (o && (F1(e), e.innerHTML = ""), this.storage = r, this._prevDisplayList = [], a) {
      var l = e, u = l.width, f = l.height;
      n.width != null && (u = n.width), n.height != null && (f = n.height), this.dpr = n.devicePixelRatio || 1, l.width = u * this.dpr, l.height = f * this.dpr, this._width = u, this._height = f;
      var c = w_(l, this, Fi, iu);
      c.initContext(), this._insertLayer(c, Fi, iu, !0), this._domRoot = e;
    } else {
      this._width = Pl(e, 0, n), this._height = Pl(e, 1, n);
      var s = this._domRoot = TF(this._width, this._height);
      e.appendChild(s);
    }
  }
  return t.prototype.getType = function() {
    return "canvas";
  }, t.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, t.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, t.prototype.getViewportRootOffset = function() {
    var e = this.getViewportRoot();
    if (e)
      return {
        offsetLeft: e.offsetLeft || 0,
        offsetTop: e.offsetTop || 0
      };
  }, t.prototype.refresh = function(e) {
    var r;
    e && !ft(e) ? r = { paintAll: !!e } : r = e || {};
    var n = vt(r.refresh, !0), i = vt(r.refreshHover, !1);
    if (i && (this._hoverLayerDirty = Dh), !n)
      return i && this._paintHoverList(this.storage.getDisplayList(!1)), this;
    var a = this.storage.getDisplayList(!0);
    this._updateLayerStatus(a, r.paintAll), this._redrawId = Math.random();
    var o = this._prevDisplayList;
    this._paintList(a, o, this._redrawId);
    var s = this._backgroundColor;
    return ye(this._i, function(l, u, f, c) {
      l.refresh && l.refresh(c === 0 ? s : null);
    }, ed), this._opts.useDirtyRect && (this._prevDisplayList = a.slice()), this;
  }, t.prototype._paintHoverList = function(e) {
    var r = this._i.hoverlayer, n = this._hoverLayerDirty;
    if (this._hoverLayerDirty = Ch, n !== Ch && (!r && n === Dh && (r = this._i.hoverlayer = this._ensureLayer(T_)), !!r)) {
      r.clear();
      for (var i = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height,
        beforeBrushParam: {}
      }, a, o = 0, s = e.length; o < s; o++) {
        var l = e[o];
        if (l.__inHover) {
          a || (a = r.ctx, a.save());
          var u = l.__hoverStyle, f = void 0;
          u && (f = l.style, l.style = u), $i(a, l, i), u && (l.style = f);
        }
      }
      a && (Va(a, i), a.restore());
    }
  }, t.prototype.getHoverLayer = function() {
    return this._ensureLayer(T_);
  }, t.prototype.paintOne = function(e, r) {
    dT(e, r);
  }, t.prototype._paintList = function(e, r, n) {
    if (this._redrawId === n) {
      var i = this._doPaintList(e, r);
      if (this._needsManuallyCompositing && this._compositeManually(), i)
        ye(this._i, function(o) {
          o.afterBrush && o.afterBrush();
        }, $l), this._paintHoverList(e);
      else {
        var a = this;
        xu(function() {
          a._paintList(e, r, n);
        });
      }
    }
  }, t.prototype._compositeManually = function() {
    var e = this._ensureLayer(Fi).ctx, r = this._domRoot.width, n = this._domRoot.height;
    e.clearRect(0, 0, r, n), ye(this._i, function(i) {
      i.virtual && e.drawImage(i.dom, 0, 0, r, n);
    }, os);
  }, t.prototype._doPaintList = function(e, r) {
    var n = this, i = !0;
    return ye(this._i, function(a) {
      var o = !1;
      if (Yl(a, function(c) {
        (c.drawIdx < c.endIdx || c.notClearIdx >= 0) && (o = !0);
      }), !(!o && !a.__dirty)) {
        var s = n._opts.useDirtyRect && !xh(a) ? a.createRepaintRects(e, r, n._width, n._height) : null, l = n._i.layerStack[0], u = !0;
        if (a.__dirty) {
          u = !1, a.__dirty = !1;
          var f = a.zlevel === l.zl && a.zlevel2 === l.zl2 ? n._backgroundColor : null;
          a.clear(!1, f, s);
        }
        Yl(a, function(c) {
          var h = n._paintPerCursor(a, c, e, s, u);
          i = i && h;
        });
      }
    }, $l), Tt.wxa && ye(this._i, function(a) {
      a && a.ctx && a.ctx.draw && a.ctx.draw();
    }), i;
  }, t.prototype._paintPerCursor = function(e, r, n, i, a) {
    var o = e.ctx;
    if (i)
      if (!i.length)
        r.drawIdx = r.endIdx;
      else
        for (var s = this.dpr, l = 0; l < i.length; ++l) {
          var u = i[l];
          o.save(), o.beginPath(), o.rect(u.x * s, u.y * s, u.width * s, u.height * s), o.clip(), this._paintPerCursorInRect(e, r, n, u, a), o.restore();
        }
    else
      o.save(), this._paintPerCursorInRect(e, r, n, null, a), o.restore();
    return r.drawIdx >= r.endIdx;
  }, t.prototype._paintPerCursorInRect = function(e, r, n, i, a) {
    for (var o = {
      inHover: !1,
      allClipped: !1,
      prevEl: null,
      viewWidth: this._width,
      viewHeight: this._height,
      beforeBrushParam: { contentRetained: a }
    }, s = e.ctx, l = xh(e), u = l && Ke.getTime(), f = r.drawIdx, c = r.notClearIdx, h = c >= 0 ? Math.min(c, f) : f; h < r.endIdx; h++) {
      var v = n[h];
      if (!(h < f && !v.notClear)) {
        if (v.__inHover && (this._hoverLayerDirty = Dh), i != null) {
          var d = v.getPaintRect();
          d && d.intersect(i) && ($i(s, v, o), v.setPrevPaintRect(d));
        } else
          $i(s, v, o);
        if (l) {
          var p = Ke.getTime() - u;
          if (p > 15) {
            h++;
            break;
          }
        }
      }
    }
    Va(s, o), r.drawIdx = Math.max(h, f);
  }, t.prototype.getLayer = function(e, r) {
    return this._ensureLayer(e, 0, r);
  }, t.prototype._ensureLayer = function(e, r, n) {
    r = r || 0;
    var i = this._singleCanvas;
    i && !this._needsManuallyCompositing && (e = Fi, r = 0);
    var a = Mh(this._i, e)[r];
    return a || (a = w_("zr_" + e + "." + r, this, e, r), this._layerConfig[e] && Pt(a, this._layerConfig[e], !0), (n || i && e !== Fi) && (a.virtual = !0), this._insertLayer(a, e, r, !1), a.initContext()), a;
  }, t.prototype.insertLayer = function(e, r) {
    this._insertLayer(r, e, 0, !1);
  }, t.prototype._insertLayer = function(e, r, n, i) {
    var a = this._i, o = a.layers, s = a.layerStack, l = this._domRoot, u = null;
    if (!(o[r] && o[r][n]) && bF(e)) {
      for (var f = s.length, c = 0; c < f && (s[c].zl < r || s[c].zl === r && s[c].zl2 < n); )
        c++;
      if (c > 0 && (u = Mh(a, s[c - 1].zl)[s[c - 1].zl2]), s.splice(c, 0, { zl: r, zl2: n }), Mh(a, r)[n] = e, !i && !e.virtual)
        if (u) {
          var h = u.dom;
          h.nextSibling ? l.insertBefore(e.dom, h.nextSibling) : l.appendChild(e.dom);
        } else
          l.firstChild ? l.insertBefore(e.dom, l.firstChild) : l.appendChild(e.dom);
      e.painter || (e.painter = this);
    }
  }, t.prototype.eachLayer = function(e, r) {
    return ye(this._i, function(n, i) {
      e.call(r, n, i);
    });
  }, t.prototype.eachBuiltinLayer = function(e, r) {
    return ye(this._i, function(n, i) {
      e.call(r, n, i);
    }, os);
  }, t.prototype.eachOtherLayer = function(e, r) {
    return ye(this._i, function(n, i) {
      e.call(r, n, i);
    }, ed);
  }, t.prototype.getLayers = function() {
    var e = {};
    return ye(this._i, function(r, n, i) {
      e[r.id] = r;
    }), e;
  }, t.prototype._updateLayerStatus = function(e, r) {
    var n = this;
    if (n._singleCanvas)
      for (var i = 1; i < e.length; i++) {
        var a = e[i];
        if (a.zlevel !== e[i - 1].zlevel || a.incremental) {
          n._needsManuallyCompositing = !0;
          break;
        }
      }
    ye(n._i, function(m) {
      m.__dirty = !1, Yl(m, function(g) {
        g.used = !1, g.endIdxNew = 0, g.notClearIdx = -1;
      });
    }, $l);
    for (var o, s = null, l = null, u = !1, f = 0, c = e.length; f < c; f++) {
      var a = e[f], h = a.zlevel, v = a.incremental, d = void 0;
      if (o !== h && (o = h, u = !1), v ? (u = !0, d = KL) : d = u ? XL : iu, (!s || h !== s.zlevel || d !== s.zlevel2) && (s = n._ensureLayer(h, d), l = null, !s.__builtin__)) {
        Cd("ZLevel " + h + " has been used by unknown layer " + s.id);
        continue;
      }
      if ((!l || v !== l.key) && (l = xF(s, v), !l.used))
        if (l.used = !0, !r && l.first === a.id) {
          var p = f - l.startIdx;
          l.startIdx = f, l.drawIdx += p, l.endIdx += p;
        } else
          s.__dirty = !0, l.first = a.id, l.startIdx = l.drawIdx = f, l.endIdx = f + 1;
      l.endIdxNew = f + 1, a.__dirty & Fe && !a.__inHover && ((!v || !a.notClear && f < l.drawIdx) && (s.__dirty = !0), v && a.notClear && l.notClearIdx < 0 && (l.notClearIdx = f));
    }
    ye(n._i, function(m) {
      for (var g = m.__cursorStack, y = m.__cursors, _ = g.length - 1; _ >= 0; _--) {
        var S = y.get(g[_]);
        if (!S.used)
          m.__dirty = !0, y.removeKey(g[_]), g.splice(_, 1);
        else {
          var b = S.endIdxNew;
          (xh(m) ? b < S.drawIdx : b !== S.endIdx || !b || e[b - 1].id !== S.last) && (m.__dirty = !0), S.endIdx = S.endIdxNew, S.last = b ? e[b - 1].id : NaN;
        }
      }
      m.__dirty && (Yl(m, function(T) {
        T.drawIdx = T.startIdx;
      }), n._hoverLayerDirty === Ch && (n._hoverLayerDirty = SF));
    }, $l);
  }, t.prototype.clear = function() {
    return ye(this._i, function(e) {
      e.clear(), Yw(e);
    }, os), this;
  }, t.prototype.setBackgroundColor = function(e) {
    this._backgroundColor = e, ye(this._i, function(r) {
      r.setUnpainted();
    });
  }, t.prototype.configLayer = function(e, r) {
    if (r) {
      var n = this._layerConfig;
      n[e] ? Pt(n[e], r, !0) : n[e] = r, ye(this._i, function(i, a) {
        Pt(i, n[a], !0);
      });
    }
  }, t.prototype.delLayer = function(e) {
    for (var r = this._i.layerStack, n = this._i.layers, i = r.length - 1; i >= 0; i--) {
      var a = r[i];
      if (a.zl === e) {
        var o = n[e][a.zl2];
        if (o.__builtin__)
          continue;
        if (r.splice(i, 1), n[e][a.zl2] = void 0, !o.virtual) {
          var s = o.dom.parentNode;
          s && s.removeChild(o.dom);
        }
      }
    }
  }, t.prototype.resize = function(e, r) {
    if (this._domRoot.style) {
      var n = this._domRoot;
      n.style.display = "none";
      var i = this._opts, a = this.root;
      e != null && (i.width = e), r != null && (i.height = r), e = Pl(a, 0, i), r = Pl(a, 1, i), n.style.display = "", (this._width !== e || r !== this._height) && (n.style.width = e + "px", n.style.height = r + "px", ye(this._i, function(o) {
        o.resize(e, r);
      }), this.refresh({ paintAll: !0 })), this._width = e, this._height = r;
    } else {
      if (e == null || r == null)
        return;
      this._width = e, this._height = r, this._ensureLayer(Fi).resize(e, r);
    }
    return this;
  }, t.prototype.clearLayer = function(e) {
    P(this._i.layers[e], function(r) {
      r && !r.__builtin__ && r.clear();
    });
  }, t.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._i = null;
  }, t.prototype.getRenderedCanvas = function(e) {
    if (e = e || {}, this._singleCanvas && !this._compositeManually)
      return this._i.layers[Fi][0].dom;
    var r = new Ww("image", this, e.pixelRatio || this.dpr);
    r.initContext(), r.clear(!1, e.backgroundColor || this._backgroundColor);
    var n = r.ctx;
    if (e.pixelRatio <= this.dpr) {
      this.refresh();
      var i = r.dom.width, a = r.dom.height;
      ye(this._i, function(c) {
        c.__builtin__ ? n.drawImage(c.dom, 0, 0, i, a) : c.renderToCanvas && (n.save(), c.renderToCanvas(n), n.restore());
      });
    } else {
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height,
        beforeBrushParam: {}
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var f = s[l];
        $i(n, f, o);
      }
      Va(n, o);
    }
    return r.dom;
  }, t.prototype.getWidth = function() {
    return this._width;
  }, t.prototype.getHeight = function() {
    return this._height;
  }, t;
})();
function DF(t) {
  t.registerPainter("canvas", CF);
}
const MF = /* @__PURE__ */ md({
  __name: "Chart",
  props: {
    buckets: {}
  },
  setup(t) {
    fi([_B, UN, lF, _F, DF]);
    const e = t, r = /* @__PURE__ */ ae();
    let n, i;
    function a() {
      n?.setOption({ backgroundColor: "transparent", animation: !1, textStyle: { color: "#8c9ba7", fontFamily: "system-ui" }, tooltip: { trigger: "axis" }, legend: { data: ["Completed RPS", "P95 ms"], textStyle: { color: "#a6b4c4" }, right: 10 }, grid: { left: 48, right: 48, bottom: 30, top: 40 }, xAxis: { type: "category", data: e.buckets.map((o) => o.elapsed_second + "s"), axisLine: { lineStyle: { color: "#27333d" } } }, yAxis: [{ type: "value", splitLine: { lineStyle: { color: "#1d2933" } } }, { type: "value", splitLine: { show: !1 } }], series: [{ name: "Completed RPS", type: "line", showSymbol: !1, data: e.buckets.map((o) => o.completed_rps), lineStyle: { color: "#6de6c6", width: 2 }, itemStyle: { color: "#6de6c6" }, areaStyle: { color: "#6de6c6", opacity: 0.05 } }, { name: "P95 ms", yAxisIndex: 1, type: "line", showSymbol: !1, data: e.buckets.map((o) => o.latency.p95_ms), lineStyle: { color: "#b899ef", width: 2 }, itemStyle: { color: "#b899ef" } }] });
    }
    return Ki(() => e.buckets, a), df(() => {
      r.value && (n = YR(r.value), i = new ResizeObserver(() => n?.resize()), i.observe(r.value), a());
    }), pf(() => {
      i?.disconnect(), n?.dispose();
    }), (o, s) => (lt(), ut("div", {
      ref_key: "element",
      ref: r,
      class: "chart",
      role: "img",
      "aria-label": "Completed requests per second and P95 latency over time"
    }, null, 512));
  }
}), AF = { class: "shell" }, IF = { class: "sidebar" }, LF = { "aria-label": "Main navigation" }, EF = { class: "sidebar-note" }, PF = { key: 0 }, RF = { class: "topbar" }, OF = { class: "breadcrumb" }, kF = { class: "content" }, BF = {
  key: 0,
  class: "alert error",
  role: "alert"
}, NF = {
  key: 1,
  class: "alert",
  role: "status"
}, FF = { class: "heading" }, HF = { class: "actions" }, zF = ["disabled"], VF = {
  key: 0,
  class: "run-strip"
}, UF = { key: 0 }, GF = ["href"], WF = { class: "stats" }, YF = { class: "panel" }, $F = { class: "panel chart-panel" }, XF = { class: "panel-heading" }, KF = { class: "muted" }, qF = {
  key: 1,
  class: "panel"
}, ZF = { class: "panel-heading" }, jF = { class: "muted" }, JF = { class: "table-scroll" }, QF = { class: "method" }, t5 = ["onClick"], e5 = { key: 0 }, r5 = { class: "panel" }, n5 = { class: "table-scroll" }, i5 = { class: "badge" }, a5 = ["onClick"], o5 = { key: 0 }, s5 = {
  key: 2,
  class: "report-notes"
}, l5 = { class: "panel editor-panel" }, u5 = { class: "panel-heading" }, f5 = {
  key: 0,
  class: "form-grid"
}, c5 = ["value", "disabled"], h5 = { key: 0 }, v5 = {
  key: 1,
  class: "full hint"
}, d5 = { class: "step-heading" }, p5 = ["onClick"], g5 = { class: "step-fields" }, m5 = ["onUpdate:modelValue"], y5 = ["onUpdate:modelValue"], _5 = {
  key: 1,
  class: "json-editor"
}, S5 = {
  key: 2,
  class: "capture-options"
}, b5 = { class: "editor-actions" }, T5 = { class: "file-button" }, w5 = ["disabled"], x5 = ["disabled"], C5 = {
  key: 0,
  class: "panel"
}, D5 = { class: "saved-list" }, M5 = ["onClick"], A5 = { class: "muted" }, I5 = { class: "panel editor-panel" }, L5 = { class: "form-grid" }, E5 = ["value"], P5 = ["value"], R5 = { class: "editor-actions" }, O5 = ["disabled"], k5 = {
  key: 0,
  class: "panel comparison"
}, B5 = { class: "heading" }, N5 = { class: "panel editor-panel" }, F5 = { class: "health-grid" }, H5 = { class: "badge" }, z5 = { class: "muted" }, V5 = {
  class: "inspector",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "Request sample inspector",
  tabindex: "-1"
}, U5 = { class: "panel-heading" }, G5 = /* @__PURE__ */ md({
  __name: "App",
  setup(t) {
    const e = /* @__PURE__ */ ae("overview"), r = /* @__PURE__ */ ae([]), n = /* @__PURE__ */ ae(null), i = /* @__PURE__ */ ae([]), a = /* @__PURE__ */ ae([]), o = /* @__PURE__ */ ae(null), s = /* @__PURE__ */ ae(null), l = /* @__PURE__ */ ae(""), u = /* @__PURE__ */ ae(""), f = /* @__PURE__ */ ae(!1), c = /* @__PURE__ */ ae([]), h = /* @__PURE__ */ ae(""), v = /* @__PURE__ */ ae(""), d = /* @__PURE__ */ ae(null), p = { schema_version: 1, name: "Products API", engine: "php", origin: "http://127.0.0.1:8000", steps: [{ name: "products", method: "GET", path: "/api/products", expected_status: [200] }], workload: { mode: "fixed-vus", vus: 10, max_vus: 10, duration: "30s" }, thresholds: [{ metric: "p95_ms", operator: "lt", value: 500 }], capture: !1, diagnostics: !1 }, m = /* @__PURE__ */ ae(structuredClone(p)), g = /* @__PURE__ */ ae(!1), y = /* @__PURE__ */ ae(""), _ = zr(() => !!n.value && ["pending", "starting", "running", "stopping"].includes(n.value.status)), S = zr(() => i.value.at(-1)), b = zr(() => n.value?.report?.summary ?? null), T = zr(() => b.value?.completed_requests ?? i.value.reduce((k, w) => k + w.completed_requests, 0)), C = zr(() => b.value?.transport_errors ?? i.value.reduce((k, w) => k + w.transport_errors, 0)), E = zr(() => b.value?.http_errors ?? i.value.reduce((k, w) => k + w.http_errors, 0)), A = zr(() => b.value?.samples_dropped ?? i.value.reduce((k, w) => k + w.samples_dropped, 0)), M = zr(() => b.value?.latency.p95_ms ?? S.value?.latency.p95_ms), R = zr(() => s.value?.engines.find((k) => k.name === m.value.engine)?.modes ?? ["fixed-vus", "ramping-vus", "spike"]);
    let B, O = !1, F = 0, U = 0, H = null;
    Ki(o, async (k) => {
      k ? (H = document.activeElement, await pd(), document.querySelector(".inspector")?.focus()) : H?.focus();
    });
    function W(k) {
      if (!o.value) return;
      if (k.key === "Escape") {
        o.value = null;
        return;
      }
      if (k.key !== "Tab") return;
      const w = Array.from(document.querySelectorAll(".inspector button, .inspector a[href], .inspector input"));
      if (!w.length) return;
      const I = w.indexOf(document.activeElement);
      k.shiftKey && I <= 0 ? (k.preventDefault(), w.at(-1)?.focus()) : !k.shiftKey && (I < 0 || I === w.length - 1) && (k.preventDefault(), w[0].focus());
    }
    function V(k, w = 0) {
      return typeof k == "number" ? k.toLocaleString(void 0, { maximumFractionDigits: w }) : "—";
    }
    function j(k) {
      return ["completed", "cancelled", "failed"].includes(k);
    }
    async function rt(k) {
      l.value = "", u.value = "", f.value = !0;
      try {
        await k();
      } catch (w) {
        l.value = w instanceof Error ? w.message : "The operation failed.";
      } finally {
        f.value = !1;
      }
    }
    async function tt() {
      if (document.hidden) return;
      const [k, w] = await Promise.all([Ge("runs"), Ge("doctor")]);
      if (r.value = k, s.value = w, n.value) {
        const I = n.value.id, G = U, Y = Math.max(-1, (i.value.at(-1)?.elapsed_second ?? 0) - 1), [$, z, nt] = await Promise.all([Ge(`runs/${I}`), Ge(`runs/${I}/metrics?after=${Y}`), Ge(`runs/${I}/samples?after=${F}`)]);
        if (G !== U) return;
        n.value = $;
        const X = new Map(i.value.map((et) => [et.elapsed_second, et]));
        z.forEach((et) => X.set(et.elapsed_second, et)), i.value = [...X.values()].sort((et, dt) => et.elapsed_second - dt.elapsed_second).slice(-1e3), nt.length && (F = nt.at(-1).cursor, a.value = [...a.value, ...nt].slice(-500));
      }
    }
    async function it() {
      if (!O) {
        try {
          await tt();
        } catch (k) {
          l.value = k instanceof Error ? k.message : "Connection unavailable; retrying.";
        }
        B = setTimeout(it, _.value ? 1e3 : 5e3);
      }
    }
    async function ot(k) {
      U++, n.value = k, i.value = [], a.value = [], F = 0, o.value = null, e.value = "overview", await rt(tt);
    }
    function Z() {
      m.value = structuredClone(p), g.value = !1, e.value = "create";
    }
    function bt() {
      if (!g.value) y.value = JSON.stringify(m.value, null, 2);
      else
        try {
          m.value = JSON.parse(y.value);
        } catch {
          l.value = "Fix the scenario JSON before switching back.";
          return;
        }
      g.value = !g.value;
    }
    function St() {
      return g.value ? JSON.parse(y.value) : m.value;
    }
    async function jt() {
      await rt(async () => {
        const k = await Ge("runs", St());
        U++, n.value = k, i.value = [], a.value = [], F = 0, e.value = "overview", await tt();
      });
    }
    async function ge() {
      await rt(async () => {
        await Ge("scenarios", St()), c.value = await Ge("scenarios"), u.value = "Scenario saved with credential references.";
      });
    }
    async function Ct() {
      n.value && await rt(async () => {
        n.value = await Ge(`runs/${n.value.id}/stop`, {});
      });
    }
    async function Jt(k) {
      const w = k.target.files?.[0];
      w && await rt(async () => {
        if (w.size > 1048576) throw new Error("Scenario exceeds 1 MiB.");
        const I = JSON.parse(await w.text());
        await Ge("scenarios", I), m.value = I, y.value = JSON.stringify(I, null, 2), g.value = !0, c.value = await Ge("scenarios"), u.value = "Scenario imported and validated.";
      });
    }
    async function x() {
      await rt(async () => {
        d.value = await Ge(`compare/${h.value}/${v.value}`);
      });
    }
    function D() {
      m.value = { ...structuredClone(p), name: "Authenticated checkout", steps: [
        { name: "csrf", method: "GET", path: "/login", expected_status: [200], extract: { csrf: { source: "css", path: 'input[name="_token"]', attribute: "value" } } },
        { name: "login", method: "POST", path: "/login", form: { email: "{{env.STORM_TEST_EMAIL}}", password: "{{env.STORM_TEST_PASSWORD}}", _token: "{{csrf}}" }, expected_status: [302] },
        { name: "checkout", method: "POST", path: "/api/orders", json: { product_id: 1 }, expected_status: [201], extract: { orderId: { source: "json", path: "id" } } }
      ] }, y.value = JSON.stringify(m.value, null, 2), g.value = !0;
    }
    function N(k) {
      m.value = JSON.parse(JSON.stringify(k)), y.value = JSON.stringify(m.value, null, 2), g.value = !0;
    }
    return df(async () => {
      document.addEventListener("keydown", W), await rt(async () => {
        c.value = await Ge("scenarios"), await tt();
      }), it();
    }), pf(() => {
      document.removeEventListener("keydown", W), O = !0, clearTimeout(B);
    }), (k, w) => (lt(), ut("div", AF, [
      L("aside", IF, [
        L("a", {
          class: "brand",
          href: "#",
          onClick: w[0] || (w[0] = xg((I) => e.value = "overview", ["prevent"]))
        }, [...w[26] || (w[26] = [
          L("span", { class: "brand-mark" }, "ϟ", -1),
          L("span", null, [
            yt("storm"),
            L("span", { class: "brand-dot" }, "."),
            L("small", null, "FOR LARAVEL")
          ], -1)
        ])]),
        w[32] || (w[32] = L("div", { class: "nav-label" }, "WORKSPACE", -1)),
        L("nav", LF, [
          L("button", {
            class: br({ chosen: e.value === "overview" }),
            onClick: w[1] || (w[1] = (I) => e.value = "overview")
          }, [...w[27] || (w[27] = [
            L("span", null, "◫", -1),
            yt(" Overview", -1)
          ])], 2),
          L("button", {
            class: br({ chosen: e.value === "create" }),
            onClick: Z
          }, [...w[28] || (w[28] = [
            L("span", null, "＋", -1),
            yt(" Create test", -1)
          ])], 2),
          L("button", {
            class: br({ chosen: e.value === "reports" }),
            onClick: w[2] || (w[2] = (I) => e.value = "reports")
          }, [...w[29] || (w[29] = [
            L("span", null, "▤", -1),
            yt(" Reports & compare", -1)
          ])], 2),
          L("button", {
            class: br({ chosen: e.value === "settings" }),
            onClick: w[3] || (w[3] = (I) => e.value = "settings")
          }, [...w[30] || (w[30] = [
            L("span", null, "⚙", -1),
            yt(" Environment", -1)
          ])], 2)
        ]),
        L("div", EF, [
          L("span", {
            class: br(["live-dot", { off: !s.value?.supervisor_online }])
          }, null, 2),
          yt(st(s.value?.supervisor_online ? "Supervisor online" : "Supervisor offline"), 1),
          s.value?.supervisor_online ? ee("", !0) : (lt(), ut("p", PF, [...w[31] || (w[31] = [
            yt("Start ", -1),
            L("code", null, "php artisan storm:serve", -1),
            yt(" to launch dashboard runs.", -1)
          ])]))
        ]),
        w[33] || (w[33] = L("div", { class: "sidebar-bottom" }, [
          L("span", { class: "badge" }, "v0.1.0"),
          L("p", null, [
            yt("Controlled load."),
            L("br"),
            yt("Clear signals.")
          ]),
          L("a", {
            href: "https://github.com/amrachraf6699/laravel-storm",
            target: "_blank",
            rel: "noopener noreferrer"
          }, "Documentation ↗")
        ], -1))
      ]),
      L("main", null, [
        L("header", RF, [
          L("div", OF, [
            w[34] || (w[34] = yt("Workspace ", -1)),
            w[35] || (w[35] = L("span", null, "/", -1)),
            yt(" " + st(e.value === "create" ? "New test" : e.value === "settings" ? "Environment" : e.value === "reports" ? "Reports" : "Overview"), 1)
          ]),
          w[36] || (w[36] = L("span", { class: "top-tag" }, [
            yt("DEVELOPER TOOLS "),
            L("span", null, "↗")
          ], -1))
        ]),
        L("div", kF, [
          l.value ? (lt(), ut("div", BF, [
            yt(st(l.value), 1),
            L("button", {
              "aria-label": "Dismiss error",
              onClick: w[4] || (w[4] = (I) => l.value = "")
            }, "×")
          ])) : ee("", !0),
          u.value ? (lt(), ut("div", NF, st(u.value), 1)) : ee("", !0),
          e.value === "overview" ? (lt(), ut(Ot, { key: 2 }, [
            L("div", FF, [
              L("div", null, [
                w[37] || (w[37] = L("div", { class: "eyebrow" }, "PERFORMANCE WORKSPACE", -1)),
                L("h1", null, st(n.value ? n.value.name : "See how your app holds up."), 1),
                L("p", null, st(n.value ? n.value.configuration.origin : "Run controlled scenarios. Watch the traffic. Find the bottlenecks."), 1)
              ]),
              L("div", HF, [
                _.value ? (lt(), ut("button", {
                  key: 0,
                  class: "danger",
                  disabled: f.value || n.value?.status === "stopping",
                  onClick: Ct
                }, "■ Stop run", 8, zF)) : ee("", !0),
                L("button", {
                  class: "primary",
                  onClick: Z
                }, "＋ New test")
              ])
            ]),
            n.value ? (lt(), ut("div", VF, [
              L("span", {
                class: br(["status", n.value.status])
              }, st(n.value.status), 3),
              L("code", null, st(n.value.id.slice(0, 12)), 1),
              L("span", null, st(n.value.engine.toUpperCase()) + " engine", 1),
              L("span", null, st(n.value.configuration.workload.vus) + " configured VUs", 1),
              n.value.performance_outcome ? (lt(), ut("span", UF, "Thresholds: " + st(n.value.performance_outcome.replaceAll("_", " ")), 1)) : ee("", !0),
              n.value.report ? (lt(), ut("a", {
                key: 1,
                href: `${Vo(P1)}/api/runs/${n.value.id}/report?format=html`
              }, "Export report ↗", 8, GF)) : ee("", !0)
            ])) : ee("", !0),
            L("div", WF, [
              L("article", null, [
                w[38] || (w[38] = L("span", null, "COMPLETED REQUESTS", -1)),
                L("strong", null, st(V(T.value)), 1),
                w[39] || (w[39] = L("small", null, "Actual completed attempts", -1))
              ]),
              L("article", null, [
                L("span", null, st(_.value ? "CURRENT RPS" : "COMPLETED RPS"), 1),
                L("strong", null, [
                  yt(st(V(b.value?.completed_rps ?? S.value?.completed_rps, 1)), 1),
                  w[40] || (w[40] = L("em", null, "req/s", -1))
                ]),
                L("small", null, st(_.value ? "Latest interval" : "Run average"), 1)
              ]),
              L("article", null, [
                w[42] || (w[42] = L("span", null, "P95 LATENCY", -1)),
                L("strong", null, [
                  yt(st(V(M.value, 1)), 1),
                  w[41] || (w[41] = L("em", null, "ms", -1))
                ]),
                L("small", null, st(_.value ? "Latest interval · approximate" : "Run distribution · approximate"), 1)
              ]),
              L("article", null, [
                w[44] || (w[44] = L("span", null, "HTTP / TRANSPORT ERRORS", -1)),
                L("strong", null, [
                  yt(st(V(E.value)), 1),
                  w[43] || (w[43] = L("em", null, "/", -1)),
                  yt(st(V(C.value)), 1)
                ]),
                w[45] || (w[45] = L("small", null, "HTTP 4xx/5xx / network failures", -1))
              ])
            ]),
            L("div", YF, [
              Cr(DD, {
                samples: a.value,
                active: _.value
              }, null, 8, ["samples", "active"])
            ]),
            L("div", $F, [
              L("div", XF, [
                w[46] || (w[46] = L("span", null, "THROUGHPUT & LATENCY", -1)),
                L("span", KF, st(i.value.length ? `${i.value.length} measured intervals` : "Waiting for measured traffic"), 1)
              ]),
              Cr(MF, { buckets: i.value }, null, 8, ["buckets"])
            ]),
            n.value ? (lt(), ut("div", qF, [
              L("div", ZF, [
                L("span", null, [
                  w[47] || (w[47] = yt("REQUEST SAMPLES ", -1)),
                  L("b", null, st(a.value.length), 1)
                ]),
                L("span", jF, st(V(A.value)) + " not retained · aggregates include all observations", 1)
              ]),
              L("div", JF, [
                L("table", null, [
                  w[49] || (w[49] = L("thead", null, [
                    L("tr", null, [
                      L("th", null, "METHOD / ENDPOINT"),
                      L("th", null, "STATUS"),
                      L("th", null, "DURATION"),
                      L("th", null, "DIAGNOSTICS"),
                      L("th")
                    ])
                  ], -1)),
                  L("tbody", null, [
                    (lt(!0), ut(Ot, null, Je([...a.value].reverse().slice(0, 50), (I) => (lt(), ut("tr", {
                      key: I.cursor
                    }, [
                      L("td", null, [
                        L("span", QF, st(I.method), 1),
                        L("code", null, st(I.endpoint), 1)
                      ]),
                      L("td", null, [
                        L("span", {
                          class: br(["status", { failed: I.status_code === null || I.status_code >= 400 }])
                        }, st(I.status_code ?? "Transport"), 3)
                      ]),
                      L("td", null, st(V(I.duration_ms, 1)) + " ms", 1),
                      L("td", null, st(I.diagnostics ? "Correlated" : "Not sampled"), 1),
                      L("td", null, [
                        L("button", {
                          class: "text-button",
                          onClick: (G) => o.value = I
                        }, "Inspect ↗", 8, t5)
                      ])
                    ]))), 128)),
                    a.value.length ? ee("", !0) : (lt(), ut("tr", e5, [...w[48] || (w[48] = [
                      L("td", {
                        colspan: "5",
                        class: "empty-cell"
                      }, "Request samples appear here when the engine observes traffic.", -1)
                    ])]))
                  ])
                ])
              ])
            ])) : ee("", !0),
            L("div", r5, [
              w[52] || (w[52] = L("div", { class: "panel-heading" }, [
                L("span", null, "RECENT RUNS"),
                L("span", { class: "muted" }, "Persistent run history")
              ], -1)),
              L("div", n5, [
                L("table", null, [
                  w[51] || (w[51] = L("thead", null, [
                    L("tr", null, [
                      L("th", null, "SCENARIO"),
                      L("th", null, "ENGINE"),
                      L("th", null, "STATUS"),
                      L("th", null, "STARTED"),
                      L("th")
                    ])
                  ], -1)),
                  L("tbody", null, [
                    (lt(!0), ut(Ot, null, Je(r.value, (I) => (lt(), ut("tr", {
                      key: I.id
                    }, [
                      L("td", null, st(I.name), 1),
                      L("td", null, [
                        L("span", i5, st(I.engine), 1)
                      ]),
                      L("td", null, [
                        L("span", {
                          class: br(["status", I.status])
                        }, st(I.status), 3)
                      ]),
                      L("td", null, st(new Date(I.created_at).toLocaleString()), 1),
                      L("td", null, [
                        L("button", {
                          class: "text-button",
                          onClick: (G) => ot(I)
                        }, st(j(I.status) ? "View report" : "Monitor") + " ↗", 9, a5)
                      ])
                    ]))), 128)),
                    r.value.length ? ee("", !0) : (lt(), ut("tr", o5, [
                      L("td", {
                        colspan: "5",
                        class: "empty-cell"
                      }, [
                        w[50] || (w[50] = yt("Your first measurement starts with a scenario. ", -1)),
                        L("button", {
                          class: "text-button",
                          onClick: Z
                        }, "Create a test →")
                      ])
                    ]))
                  ])
                ])
              ])
            ]),
            n.value?.report ? (lt(), ut("div", s5, [
              w[53] || (w[53] = L("h2", null, "Measurement notes", -1)),
              (lt(!0), ut(Ot, null, Je(n.value.report.warnings, (I) => (lt(), ut("p", {
                key: I,
                class: "amber"
              }, st(I), 1))), 128)),
              (lt(!0), ut(Ot, null, Je(n.value.report.limitations, (I) => (lt(), ut("p", { key: I }, st(I), 1))), 128)),
              w[54] || (w[54] = L("h2", null, "Threshold results", -1)),
              L("pre", null, st(JSON.stringify(n.value.report.thresholds, null, 2)), 1)
            ])) : ee("", !0),
            w[55] || (w[55] = L("footer", null, [
              yt("SHARED-HOST MEASUREMENTS "),
              L("span", null, "Use an isolated generator for capacity conclusions.")
            ], -1))
          ], 64)) : e.value === "create" ? (lt(), ut(Ot, { key: 3 }, [
            L("div", { class: "heading" }, [
              w[56] || (w[56] = L("div", null, [
                L("div", { class: "eyebrow" }, "DEFINE YOUR WORKLOAD"),
                L("h1", null, "Make every request count."),
                L("p", null, "Start small. Use an approved target and representative test data.")
              ], -1)),
              L("button", { onClick: D }, "Load login journey example")
            ]),
            L("div", l5, [
              L("div", u5, [
                w[57] || (w[57] = L("span", null, "SCENARIO CONFIGURATION", -1)),
                L("button", {
                  class: "text-button",
                  onClick: bt
                }, st(g.value ? "Simple editor" : "Advanced JSON editor"), 1)
              ]),
              g.value ? (lt(), ut("div", _5, [
                w[70] || (w[70] = L("label", { for: "scenario-json" }, "Versioned scenario JSON", -1)),
                Ce(L("textarea", {
                  id: "scenario-json",
                  "onUpdate:modelValue": w[14] || (w[14] = (I) => y.value = I),
                  spellcheck: "false",
                  rows: "24"
                }, null, 512), [
                  [Bn, y.value]
                ]),
                w[71] || (w[71] = L("p", null, [
                  yt("Credentials use "),
                  L("code", null, "{{env.STORM_TEST_PASSWORD}}"),
                  yt(". Variables extracted from earlier responses use "),
                  L("code", null, "{{csrf}}"),
                  yt(". Imported scenarios are validated before saving.")
                ], -1))
              ])) : (lt(), ut("div", f5, [
                L("label", null, [
                  w[58] || (w[58] = yt("Scenario name", -1)),
                  Ce(L("input", {
                    "onUpdate:modelValue": w[5] || (w[5] = (I) => m.value.name = I)
                  }, null, 512), [
                    [Bn, m.value.name]
                  ])
                ]),
                L("label", null, [
                  w[59] || (w[59] = yt("Target origin", -1)),
                  Ce(L("input", {
                    "onUpdate:modelValue": w[6] || (w[6] = (I) => m.value.origin = I),
                    placeholder: "http://127.0.0.1:8000"
                  }, null, 512), [
                    [Bn, m.value.origin]
                  ])
                ]),
                L("label", null, [
                  w[60] || (w[60] = yt("Engine", -1)),
                  Ce(L("select", {
                    "onUpdate:modelValue": w[7] || (w[7] = (I) => m.value.engine = I)
                  }, [
                    (lt(!0), ut(Ot, null, Je(s.value?.engines, (I) => (lt(), ut("option", {
                      key: I.name,
                      value: I.name,
                      disabled: !I.available
                    }, st(I.name) + st(I.available ? "" : " · unavailable"), 9, c5))), 128))
                  ], 512), [
                    [lo, m.value.engine]
                  ])
                ]),
                L("label", null, [
                  w[61] || (w[61] = yt("Workload", -1)),
                  Ce(L("select", {
                    "onUpdate:modelValue": w[8] || (w[8] = (I) => m.value.workload.mode = I)
                  }, [
                    (lt(!0), ut(Ot, null, Je(R.value, (I) => (lt(), ut("option", { key: I }, st(I), 1))), 128))
                  ], 512), [
                    [lo, m.value.workload.mode]
                  ])
                ]),
                L("label", null, [
                  w[62] || (w[62] = yt("Virtual users", -1)),
                  Ce(L("input", {
                    type: "number",
                    "onUpdate:modelValue": w[9] || (w[9] = (I) => m.value.workload.vus = I),
                    min: "1"
                  }, null, 512), [
                    [
                      Bn,
                      m.value.workload.vus,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                L("label", null, [
                  w[63] || (w[63] = yt("Maximum VUs", -1)),
                  Ce(L("input", {
                    type: "number",
                    "onUpdate:modelValue": w[10] || (w[10] = (I) => m.value.workload.max_vus = I),
                    min: "1"
                  }, null, 512), [
                    [
                      Bn,
                      m.value.workload.max_vus,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                L("label", null, [
                  w[64] || (w[64] = yt("Duration", -1)),
                  Ce(L("input", {
                    "onUpdate:modelValue": w[11] || (w[11] = (I) => m.value.workload.duration = I),
                    placeholder: "30s"
                  }, null, 512), [
                    [Bn, m.value.workload.duration]
                  ])
                ]),
                String(m.value.workload.mode).includes("arrival") ? (lt(), ut("label", h5, [
                  w[65] || (w[65] = yt("Iterations per second", -1)),
                  Ce(L("input", {
                    type: "number",
                    "onUpdate:modelValue": w[12] || (w[12] = (I) => m.value.workload.rate = I),
                    min: "1"
                  }, null, 512), [
                    [
                      Bn,
                      m.value.workload.rate,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])) : ee("", !0),
                String(m.value.workload.mode).includes("ramping") ? (lt(), ut("div", v5, "Set stage durations and targets in the advanced JSON editor.")) : ee("", !0),
                (lt(!0), ut(Ot, null, Je(m.value.steps, (I, G) => (lt(), ut("div", {
                  class: "full request-step",
                  key: G
                }, [
                  L("div", d5, [
                    yt("REQUEST " + st(G + 1), 1),
                    m.value.steps.length > 1 ? (lt(), ut("button", {
                      key: 0,
                      class: "text-button",
                      onClick: (Y) => m.value.steps.splice(G, 1)
                    }, "Remove", 8, p5)) : ee("", !0)
                  ]),
                  L("div", g5, [
                    L("label", null, [
                      w[67] || (w[67] = yt("Method", -1)),
                      Ce(L("select", {
                        "onUpdate:modelValue": (Y) => I.method = Y
                      }, [...w[66] || (w[66] = [
                        L("option", null, "GET", -1),
                        L("option", null, "POST", -1)
                      ])], 8, m5), [
                        [lo, I.method]
                      ])
                    ]),
                    L("label", null, [
                      w[68] || (w[68] = yt("Path", -1)),
                      Ce(L("input", {
                        "onUpdate:modelValue": (Y) => I.path = Y,
                        placeholder: "/api/products"
                      }, null, 8, y5), [
                        [Bn, I.path]
                      ])
                    ])
                  ])
                ]))), 128)),
                L("button", {
                  class: "full text-button",
                  onClick: w[13] || (w[13] = (I) => m.value.steps.push({ name: `step_${m.value.steps.length + 1}`, method: "GET", path: "/", expected_status: [200] }))
                }, "＋ Add request step"),
                w[69] || (w[69] = L("div", { class: "full hint" }, "Use advanced JSON for extraction, cookies, headers, JSON/form bodies, environment references, think time, stages, and thresholds.", -1))
              ])),
              g.value ? ee("", !0) : (lt(), ut("div", S5, [
                L("label", null, [
                  Ce(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": w[15] || (w[15] = (I) => m.value.capture = I)
                  }, null, 512), [
                    [bg, m.value.capture]
                  ]),
                  w[72] || (w[72] = yt(" Capture allowlisted body fields (requires configuration)", -1))
                ]),
                L("label", null, [
                  Ce(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": w[16] || (w[16] = (I) => m.value.diagnostics = I)
                  }, null, 512), [
                    [bg, m.value.diagnostics]
                  ]),
                  w[73] || (w[73] = yt(" Request sampled Laravel diagnostics (requires signing key)", -1))
                ])
              ])),
              L("div", b5, [
                L("label", T5, [
                  w[74] || (w[74] = yt("Import JSON", -1)),
                  L("input", {
                    type: "file",
                    accept: "application/json,.json",
                    onChange: Jt
                  }, null, 32)
                ]),
                L("button", {
                  onClick: w[17] || (w[17] = (I) => Vo(Dg)("storm-scenario.json", St()))
                }, "Export JSON"),
                L("button", {
                  disabled: f.value,
                  onClick: ge
                }, "Save scenario", 8, w5),
                L("button", {
                  class: "primary",
                  disabled: f.value || !s.value?.supervisor_online,
                  onClick: jt
                }, st(f.value ? "Validating…" : "Start test →"), 9, x5)
              ])
            ]),
            c.value.length ? (lt(), ut("div", C5, [
              w[75] || (w[75] = L("div", { class: "panel-heading" }, [
                L("span", null, "SAVED SCENARIOS")
              ], -1)),
              L("div", D5, [
                (lt(!0), ut(Ot, null, Je(c.value, (I) => (lt(), ut("button", {
                  key: I.id,
                  onClick: (G) => N(I.configuration)
                }, [
                  yt(st(I.configuration.name) + " ", 1),
                  L("span", A5, st(I.configuration.engine) + " ↗", 1)
                ], 8, M5))), 128))
              ])
            ])) : ee("", !0)
          ], 64)) : e.value === "reports" ? (lt(), ut(Ot, { key: 4 }, [
            w[80] || (w[80] = L("div", { class: "heading" }, [
              L("div", null, [
                L("div", { class: "eyebrow" }, "MEASURE, CHANGE, REPEAT"),
                L("h1", null, "Compare the evidence."),
                L("p", null, "Compare observed performance and review workload differences.")
              ])
            ], -1)),
            L("div", I5, [
              L("div", L5, [
                L("label", null, [
                  w[77] || (w[77] = yt("Before", -1)),
                  Ce(L("select", {
                    "onUpdate:modelValue": w[18] || (w[18] = (I) => h.value = I)
                  }, [
                    w[76] || (w[76] = L("option", { value: "" }, "Select completed run", -1)),
                    (lt(!0), ut(Ot, null, Je(r.value.filter((I) => I.report), (I) => (lt(), ut("option", {
                      key: I.id,
                      value: I.id
                    }, st(I.name) + " · " + st(I.id.slice(0, 8)), 9, E5))), 128))
                  ], 512), [
                    [lo, h.value]
                  ])
                ]),
                L("label", null, [
                  w[79] || (w[79] = yt("After", -1)),
                  Ce(L("select", {
                    "onUpdate:modelValue": w[19] || (w[19] = (I) => v.value = I)
                  }, [
                    w[78] || (w[78] = L("option", { value: "" }, "Select completed run", -1)),
                    (lt(!0), ut(Ot, null, Je(r.value.filter((I) => I.report), (I) => (lt(), ut("option", {
                      key: I.id,
                      value: I.id
                    }, st(I.name) + " · " + st(I.id.slice(0, 8)), 9, P5))), 128))
                  ], 512), [
                    [lo, v.value]
                  ])
                ])
              ]),
              L("div", R5, [
                L("button", {
                  class: "primary",
                  disabled: !h.value || !v.value || f.value,
                  onClick: x
                }, "Compare runs →", 8, O5),
                d.value ? (lt(), ut("button", {
                  key: 0,
                  onClick: w[20] || (w[20] = (I) => Vo(Dg)("storm-comparison.json", d.value))
                }, "Export comparison")) : ee("", !0)
              ])
            ]),
            d.value ? (lt(), ut("pre", k5, st(JSON.stringify(d.value, null, 2)), 1)) : ee("", !0)
          ], 64)) : (lt(), ut(Ot, { key: 5 }, [
            L("div", B5, [
              w[81] || (w[81] = L("div", null, [
                L("div", { class: "eyebrow" }, "KNOW YOUR GENERATOR"),
                L("h1", null, "Ready for the next run."),
                L("p", null, "Runtime capabilities and supervisor health.")
              ], -1)),
              L("button", {
                onClick: w[21] || (w[21] = (I) => rt(tt))
              }, "Refresh checks")
            ]),
            L("div", N5, [
              L("div", F5, [
                (lt(!0), ut(Ot, null, Je(s.value, (I, G) => (lt(), ut("article", { key: G }, [
                  G !== "engines" ? (lt(), ut(Ot, { key: 0 }, [
                    L("span", null, st(String(G).replaceAll("_", " ")), 1),
                    L("strong", null, st(I), 1)
                  ], 64)) : ee("", !0)
                ]))), 128))
              ]),
              (lt(!0), ut(Ot, null, Je(s.value?.engines, (I) => (lt(), ut("div", {
                class: "engine-card",
                key: I.name
              }, [
                L("h2", null, [
                  yt(st(I.name.toUpperCase()) + " ", 1),
                  L("span", H5, st(I.available ? "Available" : "Unavailable"), 1)
                ]),
                L("p", null, st(I.version ?? I.reason), 1),
                L("p", z5, st(I.modes.join(" · ")), 1)
              ]))), 128)),
              w[82] || (w[82] = L("p", { class: "hint" }, [
                yt("Targets, limits, retention, capture allowlists, and diagnostic keys are configured in "),
                L("code", null, "config/storm.php"),
                yt(". Secrets are never edited in the dashboard.")
              ], -1))
            ])
          ], 64))
        ])
      ]),
      o.value ? (lt(), ut("div", {
        key: 0,
        class: "modal-backdrop",
        onClick: w[24] || (w[24] = xg((I) => o.value = null, ["self"])),
        onKeydown: w[25] || (w[25] = gD((I) => o.value = null, ["esc"]))
      }, [
        L("section", V5, [
          L("div", U5, [
            w[83] || (w[83] = L("span", null, "REQUEST INSPECTOR · SAMPLED", -1)),
            L("button", {
              autofocus: "",
              "aria-label": "Close inspector",
              onClick: w[22] || (w[22] = (I) => o.value = null)
            }, "×")
          ]),
          w[84] || (w[84] = L("p", null, "Safe metadata from one observed request. Missing fields are not provided by this engine or were not captured.", -1)),
          L("pre", null, st(JSON.stringify(o.value, null, 2)), 1),
          L("button", {
            onClick: w[23] || (w[23] = (I) => o.value = null)
          }, "Close inspector")
        ])
      ], 32)) : ee("", !0)
    ]));
  }
});
_D(G5).mount("#storm");
