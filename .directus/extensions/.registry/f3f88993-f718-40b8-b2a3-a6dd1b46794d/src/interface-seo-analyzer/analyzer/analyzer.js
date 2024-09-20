var tr = Object.defineProperty;
var sr = (e, t, s) => t in e ? tr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var mt = (e, t, s) => (sr(e, typeof t != "symbol" ? t + "" : t, s), s);
class A {
  constructor() {
    this.setConfig();
  }
  /**
   * Executes the assessment and return its result
   *
   * @abstract
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    throw new Error("The method getResult is not implemented");
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return 0;
  }
  /**
   * Check whether thr assessment is applicable
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} Return wethere this analysis is applicable on paper or not.
   */
  isApplicable(t) {
    return !0;
  }
  setConfig(t = {}) {
    this.configs = t;
  }
}
var ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nr(e) {
  return e === void 0;
}
var R = nr, ir = typeof ue == "object" && ue && ue.Object === Object && ue, wn = ir, rr = wn, or = typeof self == "object" && self && self.Object === Object && self, ar = rr || or || Function("return this")(), Y = ar, cr = Y, ur = cr.Symbol, Re = ur, rs = Re, kn = Object.prototype, lr = kn.hasOwnProperty, dr = kn.toString, $e = rs ? rs.toStringTag : void 0;
function pr(e) {
  var t = lr.call(e, $e), s = e[$e];
  try {
    e[$e] = void 0;
    var n = !0;
  } catch {
  }
  var i = dr.call(e);
  return n && (t ? e[$e] = s : delete e[$e]), i;
}
var gr = pr, hr = Object.prototype, fr = hr.toString;
function mr(e) {
  return fr.call(e);
}
var yr = mr, os = Re, br = gr, vr = yr, Dr = "[object Null]", wr = "[object Undefined]", as = os ? os.toStringTag : void 0;
function kr(e) {
  return e == null ? e === void 0 ? wr : Dr : as && as in Object(e) ? br(e) : vr(e);
}
var de = kr;
function Fr(e) {
  return e != null && typeof e == "object";
}
var ee = Fr, Ar = de, Cr = ee, _r = "[object Number]";
function Er(e) {
  return typeof e == "number" || Cr(e) && Ar(e) == _r;
}
var cs = Er;
class C {
  /**
   * Class constructor.
   */
  constructor() {
    return this.has = !1, this.score = 0, this.maxScore = 0, this.text = "", this.empty = "", this.tooltip = "", this;
  }
  /**
   * Check if a score is available.
   *
   * @return {boolean} Has score or not.
   */
  hasScore() {
    return this.has;
  }
  /**
   * Get the available score.
   *
   * @return {number} Result score.
   */
  getScore() {
    return this.score;
  }
  /**
   * Set the score for the assessment.
   *
   * @param {number} score The score to set for analysis
   *
   * @return {AnalysisResult} Class instance for chaining.
   */
  setScore(t) {
    return cs(t) && (this.score = t, this.has = 0 < t), this;
  }
  /**
   * Set the maximum score for the assessment.
   *
   * @param {number} score The maximum score to set for analysis
   *
   * @return {AnalysisResult} Class instance for chaining.
   */
  setMaxScore(t) {
    return cs(t) && (this.maxScore = t), this;
  }
  /**
   * Get the maximum score.
   *
   * @return {number} Result maximum score.
   */
  getMaxScore() {
    return this.maxScore;
  }
  /**
   * Check if a text is available.
   *
   * @return {boolean} Whether or not a text is available.
   */
  hasText() {
    return this.text !== "";
  }
  /**
   * Get the available text.
   *
   * @return {string} Return text message.
   */
  getText() {
    return this.hasText() ? this.text : this.empty;
  }
  /**
   * Set the text for the analysis.
   *
   * @param {string} text The text to be used for the text property
   *
   * @return {AnalysisResult} Class instance for chaining.
   */
  setText(t) {
    return this.text = R(t) ? "" : t, this;
  }
  /**
   * Set the empty for the analysis.
   *
   * @param {string} empty The empty to be used for the empty property
   *
   * @return {AnalysisResult} Class instance for chaining.
   */
  setEmpty(t) {
    return this.empty = R(t) ? "" : t, this;
  }
  /**
   * Check if a tooltip is available.
   *
   * @return {boolean} Whether or not a tooltip is available.
   */
  hasTooltip() {
    return this.tooltip !== "";
  }
  /**
   * Get the available tooltip.
   *
   * @return {string} Result tooltip.
   */
  getTooltip() {
    return this.tooltip;
  }
  /**
   * Set the tooltip for the analysis.
   *
   * @param {string} tooltip The tooltip to be used for the tooltip property
   *
   * @return {AnalysisResult} Class instance for chaining.
   */
  setTooltip(t) {
    return this.tooltip = R(t) ? "" : t, this;
  }
}
var xr = Object.prototype, Sr = xr.hasOwnProperty;
function $r(e, t) {
  return e != null && Sr.call(e, t);
}
var Br = $r, zr = Array.isArray, I = zr, Tr = de, Rr = ee, Pr = "[object Symbol]";
function jr(e) {
  return typeof e == "symbol" || Rr(e) && Tr(e) == Pr;
}
var st = jr, Ir = I, Or = st, Lr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mr = /^\w*$/;
function qr(e, t) {
  if (Ir(e))
    return !1;
  var s = typeof e;
  return s == "number" || s == "symbol" || s == "boolean" || e == null || Or(e) ? !0 : Mr.test(e) || !Lr.test(e) || t != null && e in Object(t);
}
var Pt = qr;
function Nr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var te = Nr, Kr = de, Wr = te, Ur = "[object AsyncFunction]", Hr = "[object Function]", Gr = "[object GeneratorFunction]", Vr = "[object Proxy]";
function Yr(e) {
  if (!Wr(e))
    return !1;
  var t = Kr(e);
  return t == Hr || t == Gr || t == Ur || t == Vr;
}
var Fn = Yr, Zr = Y, Jr = Zr["__core-js_shared__"], Xr = Jr, yt = Xr, us = function() {
  var e = /[^.]+$/.exec(yt && yt.keys && yt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Qr(e) {
  return !!us && us in e;
}
var eo = Qr, to = Function.prototype, so = to.toString;
function no(e) {
  if (e != null) {
    try {
      return so.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var An = no, io = Fn, ro = eo, oo = te, ao = An, co = /[\\^$.*+?()[\]{}|]/g, uo = /^\[object .+?Constructor\]$/, lo = Function.prototype, po = Object.prototype, go = lo.toString, ho = po.hasOwnProperty, fo = RegExp(
  "^" + go.call(ho).replace(co, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function mo(e) {
  if (!oo(e) || ro(e))
    return !1;
  var t = io(e) ? fo : uo;
  return t.test(ao(e));
}
var yo = mo;
function bo(e, t) {
  return e == null ? void 0 : e[t];
}
var vo = bo, Do = yo, wo = vo;
function ko(e, t) {
  var s = wo(e, t);
  return Do(s) ? s : void 0;
}
var pe = ko, Fo = pe, Ao = Fo(Object, "create"), nt = Ao, ls = nt;
function Co() {
  this.__data__ = ls ? ls(null) : {}, this.size = 0;
}
var _o = Co;
function Eo(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var xo = Eo, So = nt, $o = "__lodash_hash_undefined__", Bo = Object.prototype, zo = Bo.hasOwnProperty;
function To(e) {
  var t = this.__data__;
  if (So) {
    var s = t[e];
    return s === $o ? void 0 : s;
  }
  return zo.call(t, e) ? t[e] : void 0;
}
var Ro = To, Po = nt, jo = Object.prototype, Io = jo.hasOwnProperty;
function Oo(e) {
  var t = this.__data__;
  return Po ? t[e] !== void 0 : Io.call(t, e);
}
var Lo = Oo, Mo = nt, qo = "__lodash_hash_undefined__";
function No(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = Mo && t === void 0 ? qo : t, this;
}
var Ko = No, Wo = _o, Uo = xo, Ho = Ro, Go = Lo, Vo = Ko;
function Ae(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ae.prototype.clear = Wo;
Ae.prototype.delete = Uo;
Ae.prototype.get = Ho;
Ae.prototype.has = Go;
Ae.prototype.set = Vo;
var Yo = Ae;
function Zo() {
  this.__data__ = [], this.size = 0;
}
var Jo = Zo;
function Xo(e, t) {
  return e === t || e !== e && t !== t;
}
var Pe = Xo, Qo = Pe;
function ea(e, t) {
  for (var s = e.length; s--; )
    if (Qo(e[s][0], t))
      return s;
  return -1;
}
var it = ea, ta = it, sa = Array.prototype, na = sa.splice;
function ia(e) {
  var t = this.__data__, s = ta(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : na.call(t, s, 1), --this.size, !0;
}
var ra = ia, oa = it;
function aa(e) {
  var t = this.__data__, s = oa(t, e);
  return s < 0 ? void 0 : t[s][1];
}
var ca = aa, ua = it;
function la(e) {
  return ua(this.__data__, e) > -1;
}
var da = la, pa = it;
function ga(e, t) {
  var s = this.__data__, n = pa(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
var ha = ga, fa = Jo, ma = ra, ya = ca, ba = da, va = ha;
function Ce(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ce.prototype.clear = fa;
Ce.prototype.delete = ma;
Ce.prototype.get = ya;
Ce.prototype.has = ba;
Ce.prototype.set = va;
var rt = Ce, Da = pe, wa = Y, ka = Da(wa, "Map"), jt = ka, ds = Yo, Fa = rt, Aa = jt;
function Ca() {
  this.size = 0, this.__data__ = {
    hash: new ds(),
    map: new (Aa || Fa)(),
    string: new ds()
  };
}
var _a = Ca;
function Ea(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var xa = Ea, Sa = xa;
function $a(e, t) {
  var s = e.__data__;
  return Sa(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
var ot = $a, Ba = ot;
function za(e) {
  var t = Ba(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Ta = za, Ra = ot;
function Pa(e) {
  return Ra(this, e).get(e);
}
var ja = Pa, Ia = ot;
function Oa(e) {
  return Ia(this, e).has(e);
}
var La = Oa, Ma = ot;
function qa(e, t) {
  var s = Ma(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
var Na = qa, Ka = _a, Wa = Ta, Ua = ja, Ha = La, Ga = Na;
function _e(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
_e.prototype.clear = Ka;
_e.prototype.delete = Wa;
_e.prototype.get = Ua;
_e.prototype.has = Ha;
_e.prototype.set = Ga;
var It = _e, Cn = It, Va = "Expected a function";
function Ot(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Va);
  var s = function() {
    var n = arguments, i = t ? t.apply(this, n) : n[0], r = s.cache;
    if (r.has(i))
      return r.get(i);
    var o = e.apply(this, n);
    return s.cache = r.set(i, o) || r, o;
  };
  return s.cache = new (Ot.Cache || Cn)(), s;
}
Ot.Cache = Cn;
var Ya = Ot, Za = Ya, Ja = 500;
function Xa(e) {
  var t = Za(e, function(n) {
    return s.size === Ja && s.clear(), n;
  }), s = t.cache;
  return t;
}
var Qa = Xa, ec = Qa, tc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, sc = /\\(\\)?/g, nc = ec(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(tc, function(s, n, i, r) {
    t.push(i ? r.replace(sc, "$1") : n || s);
  }), t;
}), ic = nc;
function rc(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = Array(n); ++s < n; )
    i[s] = t(e[s], s, e);
  return i;
}
var Lt = rc, ps = Re, oc = Lt, ac = I, cc = st, uc = 1 / 0, gs = ps ? ps.prototype : void 0, hs = gs ? gs.toString : void 0;
function _n(e) {
  if (typeof e == "string")
    return e;
  if (ac(e))
    return oc(e, _n) + "";
  if (cc(e))
    return hs ? hs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -uc ? "-0" : t;
}
var En = _n, lc = En;
function dc(e) {
  return e == null ? "" : lc(e);
}
var ge = dc, pc = I, gc = Pt, hc = ic, fc = ge;
function mc(e, t) {
  return pc(e) ? e : gc(e, t) ? [e] : hc(fc(e));
}
var at = mc, yc = de, bc = ee, vc = "[object Arguments]";
function Dc(e) {
  return bc(e) && yc(e) == vc;
}
var wc = Dc, fs = wc, kc = ee, xn = Object.prototype, Fc = xn.hasOwnProperty, Ac = xn.propertyIsEnumerable, Cc = fs(function() {
  return arguments;
}()) ? fs : function(e) {
  return kc(e) && Fc.call(e, "callee") && !Ac.call(e, "callee");
}, ct = Cc, _c = 9007199254740991, Ec = /^(?:0|[1-9]\d*)$/;
function xc(e, t) {
  var s = typeof e;
  return t = t ?? _c, !!t && (s == "number" || s != "symbol" && Ec.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ut = xc, Sc = 9007199254740991;
function $c(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Sc;
}
var Mt = $c, Bc = st, zc = 1 / 0;
function Tc(e) {
  if (typeof e == "string" || Bc(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -zc ? "-0" : t;
}
var je = Tc, Rc = at, Pc = ct, jc = I, Ic = ut, Oc = Mt, Lc = je;
function Mc(e, t, s) {
  t = Rc(t, e);
  for (var n = -1, i = t.length, r = !1; ++n < i; ) {
    var o = Lc(t[n]);
    if (!(r = e != null && s(e, o)))
      break;
    e = e[o];
  }
  return r || ++n != i ? r : (i = e == null ? 0 : e.length, !!i && Oc(i) && Ic(o, i) && (jc(e) || Pc(e)));
}
var Sn = Mc, qc = Br, Nc = Sn;
function Kc(e, t) {
  return e != null && Nc(e, t, qc);
}
var le = Kc;
function Wc(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var Uc = Wc;
function Hc(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), a = o.length; a--; ) {
      var c = o[e ? a : ++i];
      if (s(r[c], c, r) === !1)
        break;
    }
    return t;
  };
}
var Gc = Hc, Vc = Gc, Yc = Vc(), Zc = Yc;
function Jc(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var Xc = Jc, Fe = {}, Qc = {
  get exports() {
    return Fe;
  },
  set exports(e) {
    Fe = e;
  }
};
function eu() {
  return !1;
}
var tu = eu;
(function(e, t) {
  var s = Y, n = tu, i = t && !t.nodeType && t, r = i && !0 && e && !e.nodeType && e, o = r && r.exports === i, a = o ? s.Buffer : void 0, c = a ? a.isBuffer : void 0, u = c || n;
  e.exports = u;
})(Qc, Fe);
var su = de, nu = Mt, iu = ee, ru = "[object Arguments]", ou = "[object Array]", au = "[object Boolean]", cu = "[object Date]", uu = "[object Error]", lu = "[object Function]", du = "[object Map]", pu = "[object Number]", gu = "[object Object]", hu = "[object RegExp]", fu = "[object Set]", mu = "[object String]", yu = "[object WeakMap]", bu = "[object ArrayBuffer]", vu = "[object DataView]", Du = "[object Float32Array]", wu = "[object Float64Array]", ku = "[object Int8Array]", Fu = "[object Int16Array]", Au = "[object Int32Array]", Cu = "[object Uint8Array]", _u = "[object Uint8ClampedArray]", Eu = "[object Uint16Array]", xu = "[object Uint32Array]", F = {};
F[Du] = F[wu] = F[ku] = F[Fu] = F[Au] = F[Cu] = F[_u] = F[Eu] = F[xu] = !0;
F[ru] = F[ou] = F[bu] = F[au] = F[vu] = F[cu] = F[uu] = F[lu] = F[du] = F[pu] = F[gu] = F[hu] = F[fu] = F[mu] = F[yu] = !1;
function Su(e) {
  return iu(e) && nu(e.length) && !!F[su(e)];
}
var $u = Su;
function Bu(e) {
  return function(t) {
    return e(t);
  };
}
var zu = Bu, Ze = {}, Tu = {
  get exports() {
    return Ze;
  },
  set exports(e) {
    Ze = e;
  }
};
(function(e, t) {
  var s = wn, n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, r = i && i.exports === n, o = r && s.process, a = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = a;
})(Tu, Ze);
var Ru = $u, Pu = zu, ms = Ze, ys = ms && ms.isTypedArray, ju = ys ? Pu(ys) : Ru, qt = ju, Iu = Xc, Ou = ct, Lu = I, Mu = Fe, qu = ut, Nu = qt, Ku = Object.prototype, Wu = Ku.hasOwnProperty;
function Uu(e, t) {
  var s = Lu(e), n = !s && Ou(e), i = !s && !n && Mu(e), r = !s && !n && !i && Nu(e), o = s || n || i || r, a = o ? Iu(e.length, String) : [], c = a.length;
  for (var u in e)
    (t || Wu.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    qu(u, c))) && a.push(u);
  return a;
}
var $n = Uu, Hu = Object.prototype;
function Gu(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || Hu;
  return e === s;
}
var Nt = Gu;
function Vu(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var Yu = Vu, Zu = Yu, Ju = Zu(Object.keys, Object), Xu = Ju, Qu = Nt, el = Xu, tl = Object.prototype, sl = tl.hasOwnProperty;
function nl(e) {
  if (!Qu(e))
    return el(e);
  var t = [];
  for (var s in Object(e))
    sl.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
var Bn = nl, il = Fn, rl = Mt;
function ol(e) {
  return e != null && rl(e.length) && !il(e);
}
var he = ol, al = $n, cl = Bn, ul = he;
function ll(e) {
  return ul(e) ? al(e) : cl(e);
}
var lt = ll, dl = Zc, pl = lt;
function gl(e, t) {
  return e && dl(e, t, pl);
}
var hl = gl, fl = he;
function ml(e, t) {
  return function(s, n) {
    if (s == null)
      return s;
    if (!fl(s))
      return e(s, n);
    for (var i = s.length, r = t ? i : -1, o = Object(s); (t ? r-- : ++r < i) && n(o[r], r, o) !== !1; )
      ;
    return s;
  };
}
var yl = ml, bl = hl, vl = yl, Dl = vl(bl), Kt = Dl;
function wl(e) {
  return e;
}
var Ie = wl, kl = Ie;
function Fl(e) {
  return typeof e == "function" ? e : kl;
}
var Al = Fl, Cl = Uc, _l = Kt, El = Al, xl = I;
function Sl(e, t) {
  var s = xl(e) ? Cl : _l;
  return s(e, El(t));
}
var Oe = Sl, $l = at, Bl = je;
function zl(e, t) {
  t = $l(t, e);
  for (var s = 0, n = t.length; e != null && s < n; )
    e = e[Bl(t[s++])];
  return s && s == n ? e : void 0;
}
var Wt = zl, Tl = pe, Rl = function() {
  try {
    var e = Tl(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), zn = Rl, bs = zn;
function Pl(e, t, s) {
  t == "__proto__" && bs ? bs(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
var jl = Pl, Il = jl, Ol = Pe, Ll = Object.prototype, Ml = Ll.hasOwnProperty;
function ql(e, t, s) {
  var n = e[t];
  (!(Ml.call(e, t) && Ol(n, s)) || s === void 0 && !(t in e)) && Il(e, t, s);
}
var Nl = ql, Kl = Nl, Wl = at, Ul = ut, vs = te, Hl = je;
function Gl(e, t, s, n) {
  if (!vs(e))
    return e;
  t = Wl(t, e);
  for (var i = -1, r = t.length, o = r - 1, a = e; a != null && ++i < r; ) {
    var c = Hl(t[i]), u = s;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return e;
    if (i != o) {
      var l = a[c];
      u = n ? n(l, c, a) : void 0, u === void 0 && (u = vs(l) ? l : Ul(t[i + 1]) ? [] : {});
    }
    Kl(a, c, u), a = a[c];
  }
  return e;
}
var Vl = Gl, Yl = Wt, Zl = Vl, Jl = at;
function Xl(e, t, s) {
  for (var n = -1, i = t.length, r = {}; ++n < i; ) {
    var o = t[n], a = Yl(e, o);
    s(a, o) && Zl(r, Jl(o, e), a);
  }
  return r;
}
var Ql = Xl;
function ed(e, t) {
  return e != null && t in Object(e);
}
var td = ed, sd = td, nd = Sn;
function id(e, t) {
  return e != null && nd(e, t, sd);
}
var Tn = id, rd = Ql, od = Tn;
function ad(e, t) {
  return rd(e, t, function(s, n) {
    return od(e, n);
  });
}
var cd = ad;
function ud(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var Rn = ud, Ds = Re, ld = ct, dd = I, ws = Ds ? Ds.isConcatSpreadable : void 0;
function pd(e) {
  return dd(e) || ld(e) || !!(ws && e && e[ws]);
}
var gd = pd, hd = Rn, fd = gd;
function Pn(e, t, s, n, i) {
  var r = -1, o = e.length;
  for (s || (s = fd), i || (i = []); ++r < o; ) {
    var a = e[r];
    t > 0 && s(a) ? t > 1 ? Pn(a, t - 1, s, n, i) : hd(i, a) : n || (i[i.length] = a);
  }
  return i;
}
var md = Pn, yd = md;
function bd(e) {
  var t = e == null ? 0 : e.length;
  return t ? yd(e, 1) : [];
}
var vd = bd;
function Dd(e, t, s) {
  switch (s.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, s[0]);
    case 2:
      return e.call(t, s[0], s[1]);
    case 3:
      return e.call(t, s[0], s[1], s[2]);
  }
  return e.apply(t, s);
}
var wd = Dd, kd = wd, ks = Math.max;
function Fd(e, t, s) {
  return t = ks(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = ks(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var a = Array(t + 1); ++i < t; )
      a[i] = n[i];
    return a[t] = s(o), kd(e, this, a);
  };
}
var jn = Fd;
function Ad(e) {
  return function() {
    return e;
  };
}
var Cd = Ad, _d = Cd, Fs = zn, Ed = Ie, xd = Fs ? function(e, t) {
  return Fs(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: _d(t),
    writable: !0
  });
} : Ed, Sd = xd, $d = 800, Bd = 16, zd = Date.now;
function Td(e) {
  var t = 0, s = 0;
  return function() {
    var n = zd(), i = Bd - (n - s);
    if (s = n, i > 0) {
      if (++t >= $d)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Rd = Td, Pd = Sd, jd = Rd, Id = jd(Pd), In = Id, Od = vd, Ld = jn, Md = In;
function qd(e) {
  return Md(Ld(e, void 0, Od), e + "");
}
var On = qd, Nd = cd, Kd = On, Wd = Kd(function(e, t) {
  return e == null ? {} : Nd(e, t);
}), As = Wd, Ud = pe, Hd = Y, Gd = Ud(Hd, "DataView"), Vd = Gd, Yd = pe, Zd = Y, Jd = Yd(Zd, "Promise"), Xd = Jd, Qd = pe, e1 = Y, t1 = Qd(e1, "Set"), Ln = t1, s1 = pe, n1 = Y, i1 = s1(n1, "WeakMap"), Mn = i1, kt = Vd, Ft = jt, At = Xd, Ct = Ln, _t = Mn, qn = de, Ee = An, Cs = "[object Map]", r1 = "[object Object]", _s = "[object Promise]", Es = "[object Set]", xs = "[object WeakMap]", Ss = "[object DataView]", o1 = Ee(kt), a1 = Ee(Ft), c1 = Ee(At), u1 = Ee(Ct), l1 = Ee(_t), ae = qn;
(kt && ae(new kt(new ArrayBuffer(1))) != Ss || Ft && ae(new Ft()) != Cs || At && ae(At.resolve()) != _s || Ct && ae(new Ct()) != Es || _t && ae(new _t()) != xs) && (ae = function(e) {
  var t = qn(e), s = t == r1 ? e.constructor : void 0, n = s ? Ee(s) : "";
  if (n)
    switch (n) {
      case o1:
        return Ss;
      case a1:
        return Cs;
      case c1:
        return _s;
      case u1:
        return Es;
      case l1:
        return xs;
    }
  return t;
});
var Nn = ae, d1 = Bn, p1 = Nn, g1 = ct, h1 = I, f1 = he, m1 = Fe, y1 = Nt, b1 = qt, v1 = "[object Map]", D1 = "[object Set]", w1 = Object.prototype, k1 = w1.hasOwnProperty;
function F1(e) {
  if (e == null)
    return !0;
  if (f1(e) && (h1(e) || typeof e == "string" || typeof e.splice == "function" || m1(e) || b1(e) || g1(e)))
    return !e.length;
  var t = p1(e);
  if (t == v1 || t == D1)
    return !e.size;
  if (y1(e))
    return !d1(e).length;
  for (var s in e)
    if (k1.call(e, s))
      return !1;
  return !0;
}
var ze = F1;
function A1(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var C1 = A1, _1 = C1, E1 = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, x1 = _1(E1), S1 = x1, $1 = S1, B1 = ge, z1 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, T1 = "\\u0300-\\u036f", R1 = "\\ufe20-\\ufe2f", P1 = "\\u20d0-\\u20ff", j1 = T1 + R1 + P1, I1 = "[" + j1 + "]", O1 = RegExp(I1, "g");
function L1(e) {
  return e = B1(e), e && e.replace(z1, $1).replace(O1, "");
}
var Kn = L1, M1 = ge;
function q1(e) {
  return M1(e).toLowerCase();
}
var N1 = q1, K1 = /\s/;
function W1(e) {
  for (var t = e.length; t-- && K1.test(e.charAt(t)); )
    ;
  return t;
}
var U1 = W1, H1 = U1, G1 = /^\s+/;
function V1(e) {
  return e && e.slice(0, H1(e) + 1).replace(G1, "");
}
var Wn = V1;
function Y1(e, t, s) {
  var n = -1, i = e.length;
  t < 0 && (t = -t > i ? 0 : i + t), s = s > i ? i : s, s < 0 && (s += i), i = t > s ? 0 : s - t >>> 0, t >>>= 0;
  for (var r = Array(i); ++n < i; )
    r[n] = e[n + t];
  return r;
}
var Z1 = Y1, J1 = Z1;
function X1(e, t, s) {
  var n = e.length;
  return s = s === void 0 ? n : s, !t && s >= n ? e : J1(e, t, s);
}
var Un = X1;
function Q1(e, t, s, n) {
  for (var i = e.length, r = s + (n ? 1 : -1); n ? r-- : ++r < i; )
    if (t(e[r], r, e))
      return r;
  return -1;
}
var ep = Q1;
function tp(e) {
  return e !== e;
}
var sp = tp;
function np(e, t, s) {
  for (var n = s - 1, i = e.length; ++n < i; )
    if (e[n] === t)
      return n;
  return -1;
}
var ip = np, rp = ep, op = sp, ap = ip;
function cp(e, t, s) {
  return t === t ? ap(e, t, s) : rp(e, op, s);
}
var Le = cp, up = Le;
function lp(e, t) {
  for (var s = e.length; s-- && up(t, e[s], 0) > -1; )
    ;
  return s;
}
var dp = lp, pp = Le;
function gp(e, t) {
  for (var s = -1, n = e.length; ++s < n && pp(t, e[s], 0) > -1; )
    ;
  return s;
}
var hp = gp;
function fp(e) {
  return e.split("");
}
var mp = fp, yp = "\\ud800-\\udfff", bp = "\\u0300-\\u036f", vp = "\\ufe20-\\ufe2f", Dp = "\\u20d0-\\u20ff", wp = bp + vp + Dp, kp = "\\ufe0e\\ufe0f", Fp = "\\u200d", Ap = RegExp("[" + Fp + yp + wp + kp + "]");
function Cp(e) {
  return Ap.test(e);
}
var Hn = Cp, Gn = "\\ud800-\\udfff", _p = "\\u0300-\\u036f", Ep = "\\ufe20-\\ufe2f", xp = "\\u20d0-\\u20ff", Sp = _p + Ep + xp, $p = "\\ufe0e\\ufe0f", Bp = "[" + Gn + "]", Et = "[" + Sp + "]", xt = "\\ud83c[\\udffb-\\udfff]", zp = "(?:" + Et + "|" + xt + ")", Vn = "[^" + Gn + "]", Yn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Zn = "[\\ud800-\\udbff][\\udc00-\\udfff]", Tp = "\\u200d", Jn = zp + "?", Xn = "[" + $p + "]?", Rp = "(?:" + Tp + "(?:" + [Vn, Yn, Zn].join("|") + ")" + Xn + Jn + ")*", Pp = Xn + Jn + Rp, jp = "(?:" + [Vn + Et + "?", Et, Yn, Zn, Bp].join("|") + ")", Ip = RegExp(xt + "(?=" + xt + ")|" + jp + Pp, "g");
function Op(e) {
  return e.match(Ip) || [];
}
var Lp = Op, Mp = mp, qp = Hn, Np = Lp;
function Kp(e) {
  return qp(e) ? Np(e) : Mp(e);
}
var Qn = Kp, Wp = En, Up = Wn, Hp = Un, Gp = dp, Vp = hp, $s = Qn, Yp = ge;
function Zp(e, t, s) {
  if (e = Yp(e), e && (s || t === void 0))
    return Up(e);
  if (!e || !(t = Wp(t)))
    return e;
  var n = $s(e), i = $s(t), r = Vp(n, i), o = Gp(n, i) + 1;
  return Hp(n, r, o).join("");
}
var Jp = Zp;
const Xp = (e) => e ? N1(
  Kn(Jp(e.replace(/[\s\./_]+/g, "-"), "-"))
) : "";
function Qp(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
var ei = Qp, eg = Kt;
function tg(e, t) {
  var s = [];
  return eg(e, function(n, i, r) {
    t(n, i, r) && s.push(n);
  }), s;
}
var sg = tg, ng = rt;
function ig() {
  this.__data__ = new ng(), this.size = 0;
}
var rg = ig;
function og(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
var ag = og;
function cg(e) {
  return this.__data__.get(e);
}
var ug = cg;
function lg(e) {
  return this.__data__.has(e);
}
var dg = lg, pg = rt, gg = jt, hg = It, fg = 200;
function mg(e, t) {
  var s = this.__data__;
  if (s instanceof pg) {
    var n = s.__data__;
    if (!gg || n.length < fg - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new hg(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
var yg = mg, bg = rt, vg = rg, Dg = ag, wg = ug, kg = dg, Fg = yg;
function xe(e) {
  var t = this.__data__ = new bg(e);
  this.size = t.size;
}
xe.prototype.clear = vg;
xe.prototype.delete = Dg;
xe.prototype.get = wg;
xe.prototype.has = kg;
xe.prototype.set = Fg;
var ti = xe, Ag = "__lodash_hash_undefined__";
function Cg(e) {
  return this.__data__.set(e, Ag), this;
}
var _g = Cg;
function Eg(e) {
  return this.__data__.has(e);
}
var xg = Eg, Sg = It, $g = _g, Bg = xg;
function Je(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new Sg(); ++t < s; )
    this.add(e[t]);
}
Je.prototype.add = Je.prototype.push = $g;
Je.prototype.has = Bg;
var si = Je;
function zg(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
var Tg = zg;
function Rg(e, t) {
  return e.has(t);
}
var ni = Rg, Pg = si, jg = Tg, Ig = ni, Og = 1, Lg = 2;
function Mg(e, t, s, n, i, r) {
  var o = s & Og, a = e.length, c = t.length;
  if (a != c && !(o && c > a))
    return !1;
  var u = r.get(e), l = r.get(t);
  if (u && l)
    return u == t && l == e;
  var p = -1, d = !0, f = s & Lg ? new Pg() : void 0;
  for (r.set(e, t), r.set(t, e); ++p < a; ) {
    var y = e[p], E = t[p];
    if (n)
      var k = o ? n(E, y, p, t, e, r) : n(y, E, p, e, t, r);
    if (k !== void 0) {
      if (k)
        continue;
      d = !1;
      break;
    }
    if (f) {
      if (!jg(t, function(O, h) {
        if (!Ig(f, h) && (y === O || i(y, O, s, n, r)))
          return f.push(h);
      })) {
        d = !1;
        break;
      }
    } else if (!(y === E || i(y, E, s, n, r))) {
      d = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), d;
}
var ii = Mg, qg = Y, Ng = qg.Uint8Array, Kg = Ng;
function Wg(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
var Ug = Wg;
function Hg(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var Ut = Hg, Bs = Re, zs = Kg, Gg = Pe, Vg = ii, Yg = Ug, Zg = Ut, Jg = 1, Xg = 2, Qg = "[object Boolean]", eh = "[object Date]", th = "[object Error]", sh = "[object Map]", nh = "[object Number]", ih = "[object RegExp]", rh = "[object Set]", oh = "[object String]", ah = "[object Symbol]", ch = "[object ArrayBuffer]", uh = "[object DataView]", Ts = Bs ? Bs.prototype : void 0, bt = Ts ? Ts.valueOf : void 0;
function lh(e, t, s, n, i, r, o) {
  switch (s) {
    case uh:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case ch:
      return !(e.byteLength != t.byteLength || !r(new zs(e), new zs(t)));
    case Qg:
    case eh:
    case nh:
      return Gg(+e, +t);
    case th:
      return e.name == t.name && e.message == t.message;
    case ih:
    case oh:
      return e == t + "";
    case sh:
      var a = Yg;
    case rh:
      var c = n & Jg;
      if (a || (a = Zg), e.size != t.size && !c)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      n |= Xg, o.set(e, t);
      var l = Vg(a(e), a(t), n, i, r, o);
      return o.delete(e), l;
    case ah:
      if (bt)
        return bt.call(e) == bt.call(t);
  }
  return !1;
}
var dh = lh, ph = Rn, gh = I;
function hh(e, t, s) {
  var n = t(e);
  return gh(e) ? n : ph(n, s(e));
}
var fh = hh;
function mh() {
  return [];
}
var yh = mh, bh = ei, vh = yh, Dh = Object.prototype, wh = Dh.propertyIsEnumerable, Rs = Object.getOwnPropertySymbols, kh = Rs ? function(e) {
  return e == null ? [] : (e = Object(e), bh(Rs(e), function(t) {
    return wh.call(e, t);
  }));
} : vh, Fh = kh, Ah = fh, Ch = Fh, _h = lt;
function Eh(e) {
  return Ah(e, _h, Ch);
}
var xh = Eh, Ps = xh, Sh = 1, $h = Object.prototype, Bh = $h.hasOwnProperty;
function zh(e, t, s, n, i, r) {
  var o = s & Sh, a = Ps(e), c = a.length, u = Ps(t), l = u.length;
  if (c != l && !o)
    return !1;
  for (var p = c; p--; ) {
    var d = a[p];
    if (!(o ? d in t : Bh.call(t, d)))
      return !1;
  }
  var f = r.get(e), y = r.get(t);
  if (f && y)
    return f == t && y == e;
  var E = !0;
  r.set(e, t), r.set(t, e);
  for (var k = o; ++p < c; ) {
    d = a[p];
    var O = e[d], h = t[d];
    if (n)
      var _ = o ? n(h, O, d, t, e, r) : n(O, h, d, e, t, r);
    if (!(_ === void 0 ? O === h || i(O, h, s, n, r) : _)) {
      E = !1;
      break;
    }
    k || (k = d == "constructor");
  }
  if (E && !k) {
    var $ = e.constructor, v = t.constructor;
    $ != v && "constructor" in e && "constructor" in t && !(typeof $ == "function" && $ instanceof $ && typeof v == "function" && v instanceof v) && (E = !1);
  }
  return r.delete(e), r.delete(t), E;
}
var Th = zh, vt = ti, Rh = ii, Ph = dh, jh = Th, js = Nn, Is = I, Os = Fe, Ih = qt, Oh = 1, Ls = "[object Arguments]", Ms = "[object Array]", Ge = "[object Object]", Lh = Object.prototype, qs = Lh.hasOwnProperty;
function Mh(e, t, s, n, i, r) {
  var o = Is(e), a = Is(t), c = o ? Ms : js(e), u = a ? Ms : js(t);
  c = c == Ls ? Ge : c, u = u == Ls ? Ge : u;
  var l = c == Ge, p = u == Ge, d = c == u;
  if (d && Os(e)) {
    if (!Os(t))
      return !1;
    o = !0, l = !1;
  }
  if (d && !l)
    return r || (r = new vt()), o || Ih(e) ? Rh(e, t, s, n, i, r) : Ph(e, t, c, s, n, i, r);
  if (!(s & Oh)) {
    var f = l && qs.call(e, "__wrapped__"), y = p && qs.call(t, "__wrapped__");
    if (f || y) {
      var E = f ? e.value() : e, k = y ? t.value() : t;
      return r || (r = new vt()), i(E, k, s, n, r);
    }
  }
  return d ? (r || (r = new vt()), jh(e, t, s, n, i, r)) : !1;
}
var qh = Mh, Nh = qh, Ns = ee;
function ri(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !Ns(e) && !Ns(t) ? e !== e && t !== t : Nh(e, t, s, n, ri, i);
}
var oi = ri, Kh = ti, Wh = oi, Uh = 1, Hh = 2;
function Gh(e, t, s, n) {
  var i = s.length, r = i, o = !n;
  if (e == null)
    return !r;
  for (e = Object(e); i--; ) {
    var a = s[i];
    if (o && a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
      return !1;
  }
  for (; ++i < r; ) {
    a = s[i];
    var c = a[0], u = e[c], l = a[1];
    if (o && a[2]) {
      if (u === void 0 && !(c in e))
        return !1;
    } else {
      var p = new Kh();
      if (n)
        var d = n(u, l, c, e, t, p);
      if (!(d === void 0 ? Wh(l, u, Uh | Hh, n, p) : d))
        return !1;
    }
  }
  return !0;
}
var Vh = Gh, Yh = te;
function Zh(e) {
  return e === e && !Yh(e);
}
var ai = Zh, Jh = ai, Xh = lt;
function Qh(e) {
  for (var t = Xh(e), s = t.length; s--; ) {
    var n = t[s], i = e[n];
    t[s] = [n, i, Jh(i)];
  }
  return t;
}
var e2 = Qh;
function t2(e, t) {
  return function(s) {
    return s == null ? !1 : s[e] === t && (t !== void 0 || e in Object(s));
  };
}
var ci = t2, s2 = Vh, n2 = e2, i2 = ci;
function r2(e) {
  var t = n2(e);
  return t.length == 1 && t[0][2] ? i2(t[0][0], t[0][1]) : function(s) {
    return s === e || s2(s, e, t);
  };
}
var o2 = r2, a2 = Wt;
function c2(e, t, s) {
  var n = e == null ? void 0 : a2(e, t);
  return n === void 0 ? s : n;
}
var u2 = c2, l2 = oi, d2 = u2, p2 = Tn, g2 = Pt, h2 = ai, f2 = ci, m2 = je, y2 = 1, b2 = 2;
function v2(e, t) {
  return g2(e) && h2(t) ? f2(m2(e), t) : function(s) {
    var n = d2(s, e);
    return n === void 0 && n === t ? p2(s, e) : l2(t, n, y2 | b2);
  };
}
var D2 = v2;
function w2(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var k2 = w2, F2 = Wt;
function A2(e) {
  return function(t) {
    return F2(t, e);
  };
}
var C2 = A2, _2 = k2, E2 = C2, x2 = Pt, S2 = je;
function $2(e) {
  return x2(e) ? _2(S2(e)) : E2(e);
}
var B2 = $2, z2 = o2, T2 = D2, R2 = Ie, P2 = I, j2 = B2;
function I2(e) {
  return typeof e == "function" ? e : e == null ? R2 : typeof e == "object" ? P2(e) ? T2(e[0], e[1]) : z2(e) : j2(e);
}
var ui = I2, O2 = ei, L2 = sg, M2 = ui, q2 = I;
function N2(e, t) {
  var s = q2(e) ? O2 : L2;
  return s(e, M2(t));
}
var dt = N2, K2 = Kt, W2 = he;
function U2(e, t) {
  var s = -1, n = W2(e) ? Array(e.length) : [];
  return K2(e, function(i, r, o) {
    n[++s] = t(i, r, o);
  }), n;
}
var H2 = U2, G2 = Lt, V2 = ui, Y2 = H2, Z2 = I;
function J2(e, t) {
  var s = Z2(e) ? G2 : Y2;
  return s(e, V2(t));
}
var Me = J2, X2 = te, Ks = Object.create, Q2 = function() {
  function e() {
  }
  return function(t) {
    if (!X2(t))
      return {};
    if (Ks)
      return Ks(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
}(), li = Q2;
function ef() {
}
var Ht = ef, tf = li, sf = Ht;
function Xe(e, t) {
  this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = void 0;
}
Xe.prototype = tf(sf.prototype);
Xe.prototype.constructor = Xe;
var Gt = Xe, Ws = Mn, nf = Ws && new Ws(), rf = nf;
function of() {
}
var di = of, Us = rf, af = di, cf = Us ? function(e) {
  return Us.get(e);
} : af, pi = cf, uf = {}, lf = uf, Hs = lf, df = Object.prototype, pf = df.hasOwnProperty;
function gf(e) {
  for (var t = e.name + "", s = Hs[t], n = pf.call(Hs, t) ? s.length : 0; n--; ) {
    var i = s[n], r = i.func;
    if (r == null || r == e)
      return i.name;
  }
  return t;
}
var gi = gf, hf = li, ff = Ht, mf = 4294967295;
function Qe(e) {
  this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = mf, this.__views__ = [];
}
Qe.prototype = hf(ff.prototype);
Qe.prototype.constructor = Qe;
var Vt = Qe;
function yf(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var bf = yf, vf = Vt, Df = Gt, wf = bf;
function kf(e) {
  if (e instanceof vf)
    return e.clone();
  var t = new Df(e.__wrapped__, e.__chain__);
  return t.__actions__ = wf(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
}
var Ff = kf, Af = Vt, Gs = Gt, Cf = Ht, _f = I, Ef = ee, xf = Ff, Sf = Object.prototype, $f = Sf.hasOwnProperty;
function et(e) {
  if (Ef(e) && !_f(e) && !(e instanceof Af)) {
    if (e instanceof Gs)
      return e;
    if ($f.call(e, "__wrapped__"))
      return xf(e);
  }
  return new Gs(e);
}
et.prototype = Cf.prototype;
et.prototype.constructor = et;
var Bf = et, zf = Vt, Tf = pi, Rf = gi, Pf = Bf;
function jf(e) {
  var t = Rf(e), s = Pf[t];
  if (typeof s != "function" || !(t in zf.prototype))
    return !1;
  if (e === s)
    return !0;
  var n = Tf(s);
  return !!n && e === n[0];
}
var If = jf, Vs = Gt, Of = On, Lf = pi, Dt = gi, Mf = I, Ys = If, qf = "Expected a function", Nf = 8, Kf = 32, Wf = 128, Uf = 256;
function Hf(e) {
  return Of(function(t) {
    var s = t.length, n = s, i = Vs.prototype.thru;
    for (e && t.reverse(); n--; ) {
      var r = t[n];
      if (typeof r != "function")
        throw new TypeError(qf);
      if (i && !o && Dt(r) == "wrapper")
        var o = new Vs([], !0);
    }
    for (n = o ? n : s; ++n < s; ) {
      r = t[n];
      var a = Dt(r), c = a == "wrapper" ? Lf(r) : void 0;
      c && Ys(c[0]) && c[1] == (Wf | Nf | Kf | Uf) && !c[4].length && c[9] == 1 ? o = o[Dt(c[0])].apply(o, c[3]) : o = r.length == 1 && Ys(r) ? o[a]() : o.thru(r);
    }
    return function() {
      var u = arguments, l = u[0];
      if (o && u.length == 1 && Mf(l))
        return o.plant(l).value();
      for (var p = 0, d = s ? t[p].apply(this, u) : l; ++p < s; )
        d = t[p].call(this, d);
      return d;
    };
  });
}
var Gf = Hf, Vf = Gf, Yf = Vf(), se = Yf;
const fe = (e) => e.replace(/<\/?[a-z][^>]*?>/gi, `
`), qe = (e) => e.replace(/&nbsp;|&#160;/gi, " ").replace(/\s{2,}/g, " ").replace(/\s\./g, ".").replace(/^\s+|\s+$/g, ""), hi = "[^<>&/\\[\\]\0- =]+?", Zf = new RegExp("\\[" + hi + "( [^\\]]+?)?\\]", "g"), Jf = new RegExp("\\[/" + hi + "\\]", "g"), Yt = (e) => e.replace(Zf, "").replace(Jf, ""), fi = (e) => e.replace(/--|\u2014/g, " "), Xf = new RegExp([
  "[",
  // Latin-1 Supplement (extract)
  "-¿×÷",
  /*
   * The following range consists of:
   * General Punctuation
   * Superscripts and Subscripts
   * Currency Symbols
   * Combining Diacritical Marks for Symbols
   * Letterlike Symbols
   * Number Forms
   * Arrows
   * Mathematical Operators
   * Miscellaneous Technical
   * Control Pictures
   * Optical Character Recognition
   * Enclosed Alphanumerics
   * Box Drawing
   * Block Elements
   * Geometric Shapes
   * Miscellaneous Symbols
   * Dingbats
   * Miscellaneous Mathematical Symbols-A
   * Supplemental Arrows-A
   * Braille Patterns
   * Supplemental Arrows-B
   * Miscellaneous Mathematical Symbols-B
   * Supplemental Mathematical Operators
   * Miscellaneous Symbols and Arrows
   */
  " -⯿",
  // Supplemental Punctuation
  "⸀-⹿",
  "]"
].join(""), "g"), Qf = (e) => e.replace(Xf, ""), me = (e) => e.replace(/<!--[\s\S]*?-->/g, ""), pt = (e) => e.replace(/&\S+?;/g, ""), mi = `[\\–\\-\\(\\)_\\[\\]’“”"'.?!:;,¿¡«»‹›—×+&<>]+`, em = new RegExp("^" + mi), tm = new RegExp(mi + "$"), yi = (e) => e.replace(em, "").replace(tm, ""), sm = (e) => {
  if (e = se(
    [
      fe,
      me,
      Yt,
      qe,
      pt,
      fi,
      Qf
    ]
  )(e), e === "")
    return [];
  let t = e.split(/\s/g);
  return t = Me(t, (s) => yi(s)), dt(t, (s) => s.trim() !== "");
}, bi = (e, t) => {
  const s = sm(e);
  return t = t || !1, s.length === 0 ? !1 : t === !1 ? s : s.slice(0, t);
}, nm = {
  adulthood: !0,
  advice: !0,
  agenda: !0,
  aid: !0,
  alcohol: !0,
  ammo: !0,
  anime: !0,
  athletics: !0,
  audio: !0,
  bison: !0,
  blood: !0,
  bream: !0,
  buffalo: !0,
  butter: !0,
  carp: !0,
  cash: !0,
  chassis: !0,
  chess: !0,
  clothing: !0,
  cod: !0,
  commerce: !0,
  cooperation: !0,
  corps: !0,
  debris: !0,
  diabetes: !0,
  digestion: !0,
  elk: !0,
  energy: !0,
  equipment: !0,
  excretion: !0,
  expertise: !0,
  flounder: !0,
  fun: !0,
  gallows: !0,
  garbage: !0,
  graffiti: !0,
  headquarters: !0,
  health: !0,
  herpes: !0,
  highjinks: !0,
  homework: !0,
  housework: !0,
  information: !0,
  jeans: !0,
  justice: !0,
  kudos: !0,
  labour: !0,
  literature: !0,
  machinery: !0,
  mackerel: !0,
  mail: !0,
  media: !0,
  mews: !0,
  moose: !0,
  music: !0,
  mud: !0,
  manga: !0,
  news: !0,
  pike: !0,
  plankton: !0,
  pliers: !0,
  police: !0,
  pollution: !0,
  premises: !0,
  rain: !0,
  research: !0,
  rice: !0,
  salmon: !0,
  scissors: !0,
  seo: !0,
  series: !0,
  sewage: !0,
  shambles: !0,
  shrimp: !0,
  species: !0,
  staff: !0,
  swine: !0,
  tennis: !0,
  traffic: !0,
  transportation: !0,
  trout: !0,
  tuna: !0,
  wealth: !0,
  welfare: !0,
  whiting: !0,
  wildebeest: !0,
  wildlife: !0,
  wordpress: !0,
  you: !0
}, im = [
  // Pronouns.
  ["I", "we"],
  ["me", "us"],
  ["he", "they"],
  ["she", "they"],
  ["them", "them"],
  ["myself", "ourselves"],
  ["yourself", "yourselves"],
  ["itself", "themselves"],
  ["herself", "themselves"],
  ["himself", "themselves"],
  ["themself", "themselves"],
  ["is", "are"],
  ["was", "were"],
  ["has", "have"],
  ["this", "these"],
  ["that", "those"],
  // Words ending in with a consonant and `o`.
  ["echo", "echoes"],
  ["dingo", "dingoes"],
  ["volcano", "volcanoes"],
  ["tornado", "tornadoes"],
  ["torpedo", "torpedoes"],
  // Ends with `us`.
  ["genus", "genera"],
  ["viscus", "viscera"],
  // Ends with `ma`.
  ["stigma", "stigmata"],
  ["stoma", "stomata"],
  ["dogma", "dogmata"],
  ["lemma", "lemmata"],
  ["schema", "schemata"],
  ["anathema", "anathemata"],
  // Other irregular rules.
  ["ox", "oxen"],
  ["axe", "axes"],
  ["die", "dice"],
  ["yes", "yeses"],
  ["foot", "feet"],
  ["eave", "eaves"],
  ["goose", "geese"],
  ["tooth", "teeth"],
  ["quiz", "quizzes"],
  ["human", "humans"],
  ["proof", "proofs"],
  ["carve", "carves"],
  ["valve", "valves"],
  ["looey", "looies"],
  ["thief", "thieves"],
  ["groove", "grooves"],
  ["pickaxe", "pickaxes"],
  ["whiskey", "whiskies"],
  ["thou", "you"]
], rm = [
  // unCountableRules
  [/[^aeiou]ese$/i, "$0"],
  // "chinese", "japanese"
  [/deer$/i, "$0"],
  // "deer", "reindeer"
  [/fish$/i, "$0"],
  // "fish", "blowfish", "angelfish"
  [/measles$/i, "$0"],
  [/o[iu]s$/i, "$0"],
  // "carnivorous"
  [/pox$/i, "$0"],
  // "chickpox", "smallpox"
  [/sheep$/i, "$0"],
  [/s?$/i, "s"],
  [/[^\u0000-\u007F]$/i, "$0"],
  [/([^aeiou]ese)$/i, "$1"],
  [/(ax|test)is$/i, "$1es"],
  [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
  [/(e[mn]u)s?$/i, "$1s"],
  [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
  [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
  [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
  [/(seraph|cherub)(?:im)?$/i, "$1im"],
  [/(her|at|gr)o$/i, "$1oes"],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
  [/sis$/i, "ses"],
  [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
  [/([^aeiouy]|qu)y$/i, "$1ies"],
  [/([^ch][ieo][ln])ey$/i, "$1ies"],
  [/(x|ch|ss|sh|zz)$/i, "$1es"],
  [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
  [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
  [/(pe)(?:rson|ople)$/i, "$1ople"],
  [/(child)(?:ren)?$/i, "$1ren"],
  [/eaux$/i, "$0"],
  [/m[ae]n$/i, "men"]
];
class om {
  /**
   * Class constructor
   */
  constructor() {
    this.irregularSingles = {}, this.irregularPlurals = {}, this.uncountables = nm, this.pluralizationRules = rm, im.forEach(function(t) {
      const s = t[0], n = t[1];
      this.irregularSingles[s] = n, this.irregularPlurals[n] = s;
    }, this);
  }
  get(t) {
    if (!t.length)
      return t;
    const s = t.toLowerCase();
    if (this.irregularPlurals.hasOwnProperty(s) && this.restoreCase(t, s), this.irregularSingles.hasOwnProperty(s) && this.restoreCase(t, this.irregularSingles[s]), this.uncountables.hasOwnProperty(s))
      return t;
    let n = this.pluralizationRules.length;
    for (; n--; ) {
      const i = this.pluralizationRules[n];
      if (i[0].test(t))
        return this.replace(t, i);
    }
    return t;
  }
  /**
   * Pass in a word token to produce a function that can replicate the case on another word.
   *
   * @param {string} word  Word to restore.
   * @param {string} token Token for it.
   *
   * @return {string} Restored word.
   */
  restoreCase(t, s) {
    return t === s ? s : t === t.toUpperCase() ? s.toUpperCase() : t[0] === t[0].toUpperCase() ? s.charAt(0).toUpperCase() + s.substr(1).toLowerCase() : s.toLowerCase();
  }
  /**
   * Replace a word using a rule.
   *
   * @param {string} word Word to replace.
   * @param {Array}  rule Rule to be applied.
   *
   * @return {string} Repalced word.
   */
  replace(t, s) {
    return t.replace(s[0], (n, i) => {
      const r = this.interpolate(s[1], arguments);
      return n === "" ? this.restoreCase(t[i - 1], r) : this.restoreCase(n, r);
    });
  }
  /**
   * Interpolate a regexp string.
   *
   * @param {string} str  String to interpolate.
   * @param {Array}  args Rules to be applied.
   *
   * @return {string} Interpolatedd string.
   */
  interpolate(t, s) {
    return t.replace(/\$(\d{1,2})/g, (n, i) => s[i] || "");
  }
}
const am = {
  HTMLRegExp: /<\/?[a-z][^>]*?>/gi,
  HTMLcommentRegExp: /<!--[\s\S]*?-->/g,
  spaceRegExp: /&nbsp;|&#160;/gi,
  HTMLEntityRegExp: /&\S+?;/g,
  // \u2014 = em-dash.
  connectorRegExp: /--|\u2014/g,
  // Characters to be removed from input text.
  removeRegExp: new RegExp([
    "[",
    // Basic Latin (extract)
    "!-/:-@[-`{-~",
    // Latin-1 Supplement (extract)
    "-¿×÷",
    /*
     * The following range consists of:
     * General Punctuation
     * Superscripts and Subscripts
     * Currency Symbols
     * Combining Diacritical Marks for Symbols
     * Letterlike Symbols
     * Number Forms
     * Arrows
     * Mathematical Operators
     * Miscellaneous Technical
     * Control Pictures
     * Optical Character Recognition
     * Enclosed Alphanumerics
     * Box Drawing
     * Block Elements
     * Geometric Shapes
     * Miscellaneous Symbols
     * Dingbats
     * Miscellaneous Mathematical Symbols-A
     * Supplemental Arrows-A
     * Braille Patterns
     * Supplemental Arrows-B
     * Miscellaneous Mathematical Symbols-B
     * Supplemental Mathematical Operators
     * Miscellaneous Symbols and Arrows
     */
    " -⯿",
    // Supplemental Punctuation.
    "⸀-⹿",
    "]"
  ].join(""), "g"),
  // Remove UTF-16 surrogate points, see https://en.wikipedia.org/wiki/UTF-16#U.2BD800_to_U.2BDFFF
  astralRegExp: /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  wordsRegExp: /\S\s+/g,
  characters_excluding_spacesRegExp: /\S/g,
  /*
   * Match anything that is not a formatting character, excluding:
   * \f = form feed
   * \n = new line
   * \r = carriage return
   * \t = tab
   * \v = vertical tab
   * \u00AD = soft hyphen
   * \u2028 = line separator
   * \u2029 = paragraph separator
   */
  characters_including_spacesRegExp: /[^\f\n\r\t\v\u00AD\u2028\u2029]/g,
  l10n: {
    type: "words"
  }
};
function vi(e, t) {
  return t.replace(e.HTMLRegExp, `
`);
}
function cm(e, t) {
  return t.replace(e.astralRegExp, "a");
}
function um(e, t) {
  return t.replace(e.HTMLEntityRegExp, "");
}
function lm(e, t) {
  return t.replace(e.connectorRegExp, " ");
}
function dm(e, t) {
  return t.replace(e.removeRegExp, "");
}
function Di(e, t) {
  return t.replace(e.HTMLcommentRegExp, "");
}
function wi(e, t) {
  return e.shortcodesRegExp ? t.replace(e.shortcodesRegExp, `
`) : t;
}
function ki(e, t) {
  return t.replace(e.spaceRegExp, " ");
}
function pm(e, t) {
  return t.replace(e.HTMLEntityRegExp, "a");
}
function gm(e, t) {
  var s, n;
  const i = Object.assign({}, am, t);
  return i.shortcodes = (s = (n = i.l10n) === null || n === void 0 ? void 0 : n.shortcodes) !== null && s !== void 0 ? s : [], i.shortcodes && i.shortcodes.length && (i.shortcodesRegExp = new RegExp("\\[\\/?(?:" + i.shortcodes.join("|") + ")[^\\]]*?\\]", "g")), i.type = e, i.type !== "characters_excluding_spaces" && i.type !== "characters_including_spaces" && (i.type = "words"), i;
}
function hm(e, t, s) {
  var n, i;
  return e = [vi.bind(null, s), Di.bind(null, s), wi.bind(null, s), ki.bind(null, s), um.bind(null, s), lm.bind(null, s), dm.bind(null, s)].reduce((r, o) => o(r), e), e = e + `
`, (n = (i = e.match(t)) === null || i === void 0 ? void 0 : i.length) !== null && n !== void 0 ? n : 0;
}
function Zs(e, t, s) {
  var n, i;
  return e = [vi.bind(null, s), Di.bind(null, s), wi.bind(null, s), cm.bind(null, s), ki.bind(null, s), pm.bind(null, s)].reduce((r, o) => o(r), e), e = e + `
`, (n = (i = e.match(t)) === null || i === void 0 ? void 0 : i.length) !== null && n !== void 0 ? n : 0;
}
function fm(e, t, s) {
  const n = gm(t, s);
  let i;
  switch (n.type) {
    case "words":
      return i = n.wordsRegExp, hm(e, i, n);
    case "characters_including_spaces":
      return i = n.characters_including_spacesRegExp, Zs(e, i, n);
    case "characters_excluding_spaces":
      return i = n.characters_excluding_spacesRegExp, Zs(e, i, n);
    default:
      return 0;
  }
}
const Zt = (e) => fm(e, "words");
var mm = Le;
function ym(e, t) {
  var s = e == null ? 0 : e.length;
  return !!s && mm(e, t, 0) > -1;
}
var bm = ym;
function vm(e, t, s) {
  for (var n = -1, i = e == null ? 0 : e.length; ++n < i; )
    if (s(t, e[n]))
      return !0;
  return !1;
}
var Dm = vm, wt = Ln, wm = di, km = Ut, Fm = 1 / 0, Am = wt && 1 / km(new wt([, -0]))[1] == Fm ? function(e) {
  return new wt(e);
} : wm, Cm = Am, _m = si, Em = bm, xm = Dm, Sm = ni, $m = Cm, Bm = Ut, zm = 200;
function Tm(e, t, s) {
  var n = -1, i = Em, r = e.length, o = !0, a = [], c = a;
  if (s)
    o = !1, i = xm;
  else if (r >= zm) {
    var u = t ? null : $m(e);
    if (u)
      return Bm(u);
    o = !1, i = Sm, c = new _m();
  } else
    c = t ? [] : a;
  e:
    for (; ++n < r; ) {
      var l = e[n], p = t ? t(l) : l;
      if (l = s || l !== 0 ? l : 0, o && p === p) {
        for (var d = c.length; d--; )
          if (c[d] === p)
            continue e;
        t && c.push(p), a.push(l);
      } else
        i(c, p, s) || (c !== a && c.push(p), a.push(l));
    }
  return a;
}
var Rm = Tm, Pm = Rm;
function jm(e) {
  return e && e.length ? Pm(e) : [];
}
var Fi = jm, Im = de, Om = I, Lm = ee, Mm = "[object String]";
function qm(e) {
  return typeof e == "string" || !Om(e) && Lm(e) && Im(e) == Mm;
}
var Nm = qm, Km = Wn, Js = te, Wm = st, Xs = 0 / 0, Um = /^[-+]0x[0-9a-f]+$/i, Hm = /^0b[01]+$/i, Gm = /^0o[0-7]+$/i, Vm = parseInt;
function Ym(e) {
  if (typeof e == "number")
    return e;
  if (Wm(e))
    return Xs;
  if (Js(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Js(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Km(e);
  var s = Hm.test(e);
  return s || Gm.test(e) ? Vm(e.slice(2), s ? 2 : 8) : Um.test(e) ? Xs : +e;
}
var Jt = Ym, Zm = Jt, Qs = 1 / 0, Jm = 17976931348623157e292;
function Xm(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = Zm(e), e === Qs || e === -Qs) {
    var t = e < 0 ? -1 : 1;
    return t * Jm;
  }
  return e === e ? e : 0;
}
var Ai = Xm, Qm = Ai;
function ey(e) {
  var t = Qm(e), s = t % 1;
  return t === t ? s ? t - s : t : 0;
}
var Xt = ey, ty = Lt;
function sy(e, t) {
  return ty(t, function(s) {
    return e[s];
  });
}
var ny = sy, iy = ny, ry = lt;
function oy(e) {
  return e == null ? [] : iy(e, ry(e));
}
var ay = oy, cy = Le, uy = he, ly = Nm, dy = Xt, py = ay, gy = Math.max;
function hy(e, t, s, n) {
  e = uy(e) ? e : py(e), s = s && !n ? dy(s) : 0;
  var i = e.length;
  return s < 0 && (s = gy(i + s, 0)), ly(e) ? s <= i && e.indexOf(t, s) > -1 : !!i && cy(e, t, s) > -1;
}
var B = hy;
const fy = (e) => {
  const t = [], s = [];
  e.forEach((o) => {
    t.push(o.word), s.push(o.plural);
  });
  const n = t.length, i = [];
  i.push(t.join(" "));
  function r(o) {
    e.forEach((a) => {
      a.plural === a.word || B(o, a.plural) || i.push(o.join(" ").replace(a.word, a.plural));
    });
  }
  for (let o = 0; o < n * n; o++)
    R(i[o]) || r(i[o].split(" "));
  return i.push(s.join(" ")), Fi(i);
};
var ne = {}, tt = {}, my = {
  get exports() {
    return tt;
  },
  set exports(e) {
    tt = e;
  }
};
/*! https://mths.be/punycode v1.3.2 by @mathias */
(function(e, t) {
  (function(s) {
    var n = t && !t.nodeType && t, i = e && !e.nodeType && e, r = typeof ue == "object" && ue;
    (r.global === r || r.window === r || r.self === r) && (s = r);
    var o, a = 2147483647, c = 36, u = 1, l = 26, p = 38, d = 700, f = 72, y = 128, E = "-", k = /^xn--/, O = /[^\x20-\x7E]/, h = /[\x2E\u3002\uFF0E\uFF61]/g, _ = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, $ = c - u, v = Math.floor, z = String.fromCharCode, X;
    function P(g) {
      throw RangeError(_[g]);
    }
    function q(g, m) {
      for (var b = g.length, x = []; b--; )
        x[b] = m(g[b]);
      return x;
    }
    function Z(g, m) {
      var b = g.split("@"), x = "";
      b.length > 1 && (x = b[0] + "@", g = b[1]), g = g.replace(h, ".");
      var S = g.split("."), L = q(S, m).join(".");
      return x + L;
    }
    function ye(g) {
      for (var m = [], b = 0, x = g.length, S, L; b < x; )
        S = g.charCodeAt(b++), S >= 55296 && S <= 56319 && b < x ? (L = g.charCodeAt(b++), (L & 64512) == 56320 ? m.push(((S & 1023) << 10) + (L & 1023) + 65536) : (m.push(S), b--)) : m.push(S);
      return m;
    }
    function Ue(g) {
      return q(g, function(m) {
        var b = "";
        return m > 65535 && (m -= 65536, b += z(m >>> 10 & 1023 | 55296), m = 56320 | m & 1023), b += z(m), b;
      }).join("");
    }
    function ie(g) {
      return g - 48 < 10 ? g - 22 : g - 65 < 26 ? g - 65 : g - 97 < 26 ? g - 97 : c;
    }
    function be(g, m) {
      return g + 22 + 75 * (g < 26) - ((m != 0) << 5);
    }
    function ve(g, m, b) {
      var x = 0;
      for (g = b ? v(g / d) : g >> 1, g += v(g / m); g > $ * l >> 1; x += c)
        g = v(g / $);
      return v(x + ($ + 1) * g / (g + p));
    }
    function re(g) {
      var m = [], b = g.length, x, S = 0, L = y, T = f, N, U, G, J, j, K, H, Q, oe;
      for (N = g.lastIndexOf(E), N < 0 && (N = 0), U = 0; U < N; ++U)
        g.charCodeAt(U) >= 128 && P("not-basic"), m.push(g.charCodeAt(U));
      for (G = N > 0 ? N + 1 : 0; G < b; ) {
        for (J = S, j = 1, K = c; G >= b && P("invalid-input"), H = ie(g.charCodeAt(G++)), (H >= c || H > v((a - S) / j)) && P("overflow"), S += H * j, Q = K <= T ? u : K >= T + l ? l : K - T, !(H < Q); K += c)
          oe = c - Q, j > v(a / oe) && P("overflow"), j *= oe;
        x = m.length + 1, T = ve(S - J, x, J == 0), v(S / x) > a - L && P("overflow"), L += v(S / x), S %= x, m.splice(S++, 0, L);
      }
      return Ue(m);
    }
    function He(g) {
      var m, b, x, S, L, T, N, U, G, J, j, K = [], H, Q, oe, ft;
      for (g = ye(g), H = g.length, m = y, b = 0, L = f, T = 0; T < H; ++T)
        j = g[T], j < 128 && K.push(z(j));
      for (x = S = K.length, S && K.push(E); x < H; ) {
        for (N = a, T = 0; T < H; ++T)
          j = g[T], j >= m && j < N && (N = j);
        for (Q = x + 1, N - m > v((a - b) / Q) && P("overflow"), b += (N - m) * Q, m = N, T = 0; T < H; ++T)
          if (j = g[T], j < m && ++b > a && P("overflow"), j == m) {
            for (U = b, G = c; J = G <= L ? u : G >= L + l ? l : G - L, !(U < J); G += c)
              ft = U - J, oe = c - J, K.push(
                z(be(J + ft % oe, 0))
              ), U = v(ft / oe);
            K.push(z(be(U, 0))), L = ve(b, Q, x == S), b = 0, ++x;
          }
        ++b, ++m;
      }
      return K.join("");
    }
    function Qi(g) {
      return Z(g, function(m) {
        return k.test(m) ? re(m.slice(4).toLowerCase()) : m;
      });
    }
    function er(g) {
      return Z(g, function(m) {
        return O.test(m) ? "xn--" + He(m) : m;
      });
    }
    if (o = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.3.2",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: ye,
        encode: Ue
      },
      decode: re,
      encode: He,
      toASCII: er,
      toUnicode: Qi
    }, n && i)
      if (e.exports == n)
        i.exports = o;
      else
        for (X in o)
          o.hasOwnProperty(X) && (n[X] = o[X]);
    else
      s.punycode = o;
  })(ue);
})(my, tt);
var yy = {
  isString: function(e) {
    return typeof e == "string";
  },
  isObject: function(e) {
    return typeof e == "object" && e !== null;
  },
  isNull: function(e) {
    return e === null;
  },
  isNullOrUndefined: function(e) {
    return e == null;
  }
}, Te = {};
function by(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var vy = function(e, t, s, n) {
  t = t || "&", s = s || "=";
  var i = {};
  if (typeof e != "string" || e.length === 0)
    return i;
  var r = /\+/g;
  e = e.split(t);
  var o = 1e3;
  n && typeof n.maxKeys == "number" && (o = n.maxKeys);
  var a = e.length;
  o > 0 && a > o && (a = o);
  for (var c = 0; c < a; ++c) {
    var u = e[c].replace(r, "%20"), l = u.indexOf(s), p, d, f, y;
    l >= 0 ? (p = u.substr(0, l), d = u.substr(l + 1)) : (p = u, d = ""), f = decodeURIComponent(p), y = decodeURIComponent(d), by(i, f) ? Array.isArray(i[f]) ? i[f].push(y) : i[f] = [i[f], y] : i[f] = y;
  }
  return i;
}, Be = function(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "true" : "false";
    case "number":
      return isFinite(e) ? e : "";
    default:
      return "";
  }
}, Dy = function(e, t, s, n) {
  return t = t || "&", s = s || "=", e === null && (e = void 0), typeof e == "object" ? Object.keys(e).map(function(i) {
    var r = encodeURIComponent(Be(i)) + s;
    return Array.isArray(e[i]) ? e[i].map(function(o) {
      return r + encodeURIComponent(Be(o));
    }).join(t) : r + encodeURIComponent(Be(e[i]));
  }).join(t) : n ? encodeURIComponent(Be(n)) + s + encodeURIComponent(Be(e)) : "";
};
Te.decode = Te.parse = vy;
Te.encode = Te.stringify = Dy;
var wy = tt, V = yy;
ne.parse = Ne;
ne.resolve = By;
ne.resolveObject = zy;
ne.format = $y;
ne.Url = W;
function W() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var ky = /^([a-z0-9.+-]+:)/i, Fy = /:[0-9]*$/, Ay = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Cy = ["<", ">", '"', "`", " ", "\r", `
`, "	"], _y = ["{", "}", "|", "\\", "^", "`"].concat(Cy), St = ["'"].concat(_y), en = ["%", "/", "?", ";", "#"].concat(St), tn = ["/", "?", "#"], Ey = 255, sn = /^[+a-z0-9A-Z_-]{0,63}$/, xy = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Sy = {
  javascript: !0,
  "javascript:": !0
}, $t = {
  javascript: !0,
  "javascript:": !0
}, we = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, Bt = Te;
function Ne(e, t, s) {
  if (e && V.isObject(e) && e instanceof W)
    return e;
  var n = new W();
  return n.parse(e, t, s), n;
}
W.prototype.parse = function(e, t, s) {
  if (!V.isString(e))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
  var n = e.indexOf("?"), i = n !== -1 && n < e.indexOf("#") ? "?" : "#", r = e.split(i), o = /\\/g;
  r[0] = r[0].replace(o, "/"), e = r.join(i);
  var a = e;
  if (a = a.trim(), !s && e.split("#").length === 1) {
    var c = Ay.exec(a);
    if (c)
      return this.path = a, this.href = a, this.pathname = c[1], c[2] ? (this.search = c[2], t ? this.query = Bt.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
  }
  var u = ky.exec(a);
  if (u) {
    u = u[0];
    var l = u.toLowerCase();
    this.protocol = l, a = a.substr(u.length);
  }
  if (s || u || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var p = a.substr(0, 2) === "//";
    p && !(u && $t[u]) && (a = a.substr(2), this.slashes = !0);
  }
  if (!$t[u] && (p || u && !we[u])) {
    for (var d = -1, f = 0; f < tn.length; f++) {
      var y = a.indexOf(tn[f]);
      y !== -1 && (d === -1 || y < d) && (d = y);
    }
    var E, k;
    d === -1 ? k = a.lastIndexOf("@") : k = a.lastIndexOf("@", d), k !== -1 && (E = a.slice(0, k), a = a.slice(k + 1), this.auth = decodeURIComponent(E)), d = -1;
    for (var f = 0; f < en.length; f++) {
      var y = a.indexOf(en[f]);
      y !== -1 && (d === -1 || y < d) && (d = y);
    }
    d === -1 && (d = a.length), this.host = a.slice(0, d), a = a.slice(d), this.parseHost(), this.hostname = this.hostname || "";
    var O = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!O)
      for (var h = this.hostname.split(/\./), f = 0, _ = h.length; f < _; f++) {
        var $ = h[f];
        if ($ && !$.match(sn)) {
          for (var v = "", z = 0, X = $.length; z < X; z++)
            $.charCodeAt(z) > 127 ? v += "x" : v += $[z];
          if (!v.match(sn)) {
            var P = h.slice(0, f), q = h.slice(f + 1), Z = $.match(xy);
            Z && (P.push(Z[1]), q.unshift(Z[2])), q.length && (a = "/" + q.join(".") + a), this.hostname = P.join(".");
            break;
          }
        }
      }
    this.hostname.length > Ey ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), O || (this.hostname = wy.toASCII(this.hostname));
    var ye = this.port ? ":" + this.port : "", Ue = this.hostname || "";
    this.host = Ue + ye, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), a[0] !== "/" && (a = "/" + a));
  }
  if (!Sy[l])
    for (var f = 0, _ = St.length; f < _; f++) {
      var ie = St[f];
      if (a.indexOf(ie) !== -1) {
        var be = encodeURIComponent(ie);
        be === ie && (be = escape(ie)), a = a.split(ie).join(be);
      }
    }
  var ve = a.indexOf("#");
  ve !== -1 && (this.hash = a.substr(ve), a = a.slice(0, ve));
  var re = a.indexOf("?");
  if (re !== -1 ? (this.search = a.substr(re), this.query = a.substr(re + 1), t && (this.query = Bt.parse(this.query)), a = a.slice(0, re)) : t && (this.search = "", this.query = {}), a && (this.pathname = a), we[l] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var ye = this.pathname || "", He = this.search || "";
    this.path = ye + He;
  }
  return this.href = this.format(), this;
};
function $y(e) {
  return V.isString(e) && (e = Ne(e)), e instanceof W ? e.format() : W.prototype.format.call(e);
}
W.prototype.format = function() {
  var e = this.auth || "";
  e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
  var t = this.protocol || "", s = this.pathname || "", n = this.hash || "", i = !1, r = "";
  this.host ? i = e + this.host : this.hostname && (i = e + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && V.isObject(this.query) && Object.keys(this.query).length && (r = Bt.stringify(this.query));
  var o = this.search || r && "?" + r || "";
  return t && t.substr(-1) !== ":" && (t += ":"), this.slashes || (!t || we[t]) && i !== !1 ? (i = "//" + (i || ""), s && s.charAt(0) !== "/" && (s = "/" + s)) : i || (i = ""), n && n.charAt(0) !== "#" && (n = "#" + n), o && o.charAt(0) !== "?" && (o = "?" + o), s = s.replace(/[?#]/g, function(a) {
    return encodeURIComponent(a);
  }), o = o.replace("#", "%23"), t + i + s + o + n;
};
function By(e, t) {
  return Ne(e, !1, !0).resolve(t);
}
W.prototype.resolve = function(e) {
  return this.resolveObject(Ne(e, !1, !0)).format();
};
function zy(e, t) {
  return e ? Ne(e, !1, !0).resolveObject(t) : t;
}
W.prototype.resolveObject = function(e) {
  if (V.isString(e)) {
    var t = new W();
    t.parse(e, !1, !0), e = t;
  }
  for (var s = new W(), n = Object.keys(this), i = 0; i < n.length; i++) {
    var r = n[i];
    s[r] = this[r];
  }
  if (s.hash = e.hash, e.href === "")
    return s.href = s.format(), s;
  if (e.slashes && !e.protocol) {
    for (var o = Object.keys(e), a = 0; a < o.length; a++) {
      var c = o[a];
      c !== "protocol" && (s[c] = e[c]);
    }
    return we[s.protocol] && s.hostname && !s.pathname && (s.path = s.pathname = "/"), s.href = s.format(), s;
  }
  if (e.protocol && e.protocol !== s.protocol) {
    if (!we[e.protocol]) {
      for (var u = Object.keys(e), l = 0; l < u.length; l++) {
        var p = u[l];
        s[p] = e[p];
      }
      return s.href = s.format(), s;
    }
    if (s.protocol = e.protocol, !e.host && !$t[e.protocol]) {
      for (var _ = (e.pathname || "").split("/"); _.length && !(e.host = _.shift()); )
        ;
      e.host || (e.host = ""), e.hostname || (e.hostname = ""), _[0] !== "" && _.unshift(""), _.length < 2 && _.unshift(""), s.pathname = _.join("/");
    } else
      s.pathname = e.pathname;
    if (s.search = e.search, s.query = e.query, s.host = e.host || "", s.auth = e.auth, s.hostname = e.hostname || e.host, s.port = e.port, s.pathname || s.search) {
      var d = s.pathname || "", f = s.search || "";
      s.path = d + f;
    }
    return s.slashes = s.slashes || e.slashes, s.href = s.format(), s;
  }
  var y = s.pathname && s.pathname.charAt(0) === "/", E = e.host || e.pathname && e.pathname.charAt(0) === "/", k = E || y || s.host && e.pathname, O = k, h = s.pathname && s.pathname.split("/") || [], _ = e.pathname && e.pathname.split("/") || [], $ = s.protocol && !we[s.protocol];
  if ($ && (s.hostname = "", s.port = null, s.host && (h[0] === "" ? h[0] = s.host : h.unshift(s.host)), s.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && (_[0] === "" ? _[0] = e.host : _.unshift(e.host)), e.host = null), k = k && (_[0] === "" || h[0] === "")), E)
    s.host = e.host || e.host === "" ? e.host : s.host, s.hostname = e.hostname || e.hostname === "" ? e.hostname : s.hostname, s.search = e.search, s.query = e.query, h = _;
  else if (_.length)
    h || (h = []), h.pop(), h = h.concat(_), s.search = e.search, s.query = e.query;
  else if (!V.isNullOrUndefined(e.search)) {
    if ($) {
      s.hostname = s.host = h.shift();
      var v = s.host && s.host.indexOf("@") > 0 ? s.host.split("@") : !1;
      v && (s.auth = v.shift(), s.host = s.hostname = v.shift());
    }
    return s.search = e.search, s.query = e.query, (!V.isNull(s.pathname) || !V.isNull(s.search)) && (s.path = (s.pathname ? s.pathname : "") + (s.search ? s.search : "")), s.href = s.format(), s;
  }
  if (!h.length)
    return s.pathname = null, s.search ? s.path = "/" + s.search : s.path = null, s.href = s.format(), s;
  for (var z = h.slice(-1)[0], X = (s.host || e.host || h.length > 1) && (z === "." || z === "..") || z === "", P = 0, q = h.length; q >= 0; q--)
    z = h[q], z === "." ? h.splice(q, 1) : z === ".." ? (h.splice(q, 1), P++) : P && (h.splice(q, 1), P--);
  if (!k && !O)
    for (; P--; P)
      h.unshift("..");
  k && h[0] !== "" && (!h[0] || h[0].charAt(0) !== "/") && h.unshift(""), X && h.join("/").substr(-1) !== "/" && h.push("");
  var Z = h[0] === "" || h[0] && h[0].charAt(0) === "/";
  if ($) {
    s.hostname = s.host = Z ? "" : h.length ? h.shift() : "";
    var v = s.host && s.host.indexOf("@") > 0 ? s.host.split("@") : !1;
    v && (s.auth = v.shift(), s.host = s.hostname = v.shift());
  }
  return k = k || s.host && h.length, k && !Z && h.unshift(""), h.length ? s.pathname = h.join("/") : (s.pathname = null, s.path = null), (!V.isNull(s.pathname) || !V.isNull(s.search)) && (s.path = (s.pathname ? s.pathname : "") + (s.search ? s.search : "")), s.auth = e.auth || s.auth, s.slashes = s.slashes || e.slashes, s.href = s.format(), s;
};
W.prototype.parseHost = function() {
  var e = this.host, t = Fy.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
function Ci(e) {
  return typeof e != "string" || e === "" ? (console.error("The namespace must be a non-empty string."), !1) : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e) ? !0 : (console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."), !1);
}
function Qt(e) {
  return typeof e != "string" || e === "" ? (console.error("The hook name must be a non-empty string."), !1) : /^__/.test(e) ? (console.error("The hook name cannot begin with `__`."), !1) : /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e) ? !0 : (console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."), !1);
}
function nn(e, t) {
  return function(n, i, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 10;
    const a = e[t];
    if (!Qt(n) || !Ci(i))
      return;
    if (typeof r != "function") {
      console.error("The hook callback must be a function.");
      return;
    }
    if (typeof o != "number") {
      console.error("If specified, the hook priority must be a number.");
      return;
    }
    const c = {
      callback: r,
      priority: o,
      namespace: i
    };
    if (a[n]) {
      const u = a[n].handlers;
      let l;
      for (l = u.length; l > 0 && !(o >= u[l - 1].priority); l--)
        ;
      l === u.length ? u[l] = c : u.splice(l, 0, c), a.__current.forEach((p) => {
        p.name === n && p.currentIndex >= l && p.currentIndex++;
      });
    } else
      a[n] = {
        handlers: [c],
        runs: 0
      };
    n !== "hookAdded" && e.doAction("hookAdded", n, i, r, o);
  };
}
function Ve(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return function(i, r) {
    const o = e[t];
    if (!Qt(i) || !s && !Ci(r))
      return;
    if (!o[i])
      return 0;
    let a = 0;
    if (s)
      a = o[i].handlers.length, o[i] = {
        runs: o[i].runs,
        handlers: []
      };
    else {
      const c = o[i].handlers;
      for (let u = c.length - 1; u >= 0; u--)
        c[u].namespace === r && (c.splice(u, 1), a++, o.__current.forEach((l) => {
          l.name === i && l.currentIndex >= u && l.currentIndex--;
        }));
    }
    return i !== "hookRemoved" && e.doAction("hookRemoved", i, r), a;
  };
}
function rn(e, t) {
  return function(n, i) {
    const r = e[t];
    return typeof i < "u" ? n in r && r[n].handlers.some((o) => o.namespace === i) : n in r;
  };
}
function on(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return function(i) {
    const r = e[t];
    r[i] || (r[i] = {
      handlers: [],
      runs: 0
    }), r[i].runs++;
    const o = r[i].handlers;
    import.meta.env.DEV && i !== "hookAdded" && r.all && o.push(...r.all.handlers);
    for (var a = arguments.length, c = new Array(a > 1 ? a - 1 : 0), u = 1; u < a; u++)
      c[u - 1] = arguments[u];
    if (!o || !o.length)
      return s ? c[0] : void 0;
    const l = {
      name: i,
      currentIndex: 0
    };
    for (r.__current.push(l); l.currentIndex < o.length; ) {
      const d = o[l.currentIndex].callback.apply(null, c);
      s && (c[0] = d), l.currentIndex++;
    }
    if (r.__current.pop(), s)
      return c[0];
  };
}
function an(e, t) {
  return function() {
    var n, i;
    const r = e[t];
    return (n = (i = r.__current[r.__current.length - 1]) === null || i === void 0 ? void 0 : i.name) !== null && n !== void 0 ? n : null;
  };
}
function cn(e, t) {
  return function(n) {
    const i = e[t];
    return typeof n > "u" ? typeof i.__current[0] < "u" : i.__current[0] ? n === i.__current[0].name : !1;
  };
}
function un(e, t) {
  return function(n) {
    const i = e[t];
    if (Qt(n))
      return i[n] && i[n].runs ? i[n].runs : 0;
  };
}
class Ty {
  constructor() {
    this.actions = /* @__PURE__ */ Object.create(null), this.actions.__current = [], this.filters = /* @__PURE__ */ Object.create(null), this.filters.__current = [], this.addAction = nn(this, "actions"), this.addFilter = nn(this, "filters"), this.removeAction = Ve(this, "actions"), this.removeFilter = Ve(this, "filters"), this.hasAction = rn(this, "actions"), this.hasFilter = rn(this, "filters"), this.removeAllActions = Ve(this, "actions", !0), this.removeAllFilters = Ve(this, "filters", !0), this.doAction = on(this, "actions"), this.applyFilters = on(this, "filters", !0), this.currentAction = an(this, "actions"), this.currentFilter = an(this, "filters"), this.doingAction = cn(this, "actions"), this.doingFilter = cn(this, "filters"), this.didAction = un(this, "actions"), this.didFilter = un(this, "filters");
  }
}
function Ry() {
  return new Ty();
}
const Py = Ry(), {
  addAction: D3e,
  addFilter: w3e,
  removeAction: k3e,
  removeFilter: F3e,
  hasAction: A3e,
  hasFilter: C3e,
  removeAllActions: _3e,
  removeAllFilters: E3e,
  doAction: jy,
  applyFilters: w,
  currentAction: x3e,
  currentFilter: S3e,
  doingAction: $3e,
  doingFilter: B3e,
  didAction: z3e,
  didFilter: T3e,
  actions: R3e,
  filters: P3e
} = Py, Iy = /href=(["'])([^"']+)\1/i;
function _i(e) {
  return e[0] === "#";
}
function Oy(e) {
  return ne.parse(e).protocol;
}
function Ei(e) {
  const t = Iy.exec(e);
  return t === null ? "" : t[2];
}
function Ly(e) {
  return e ? e === "http:" || e === "https:" : !0;
}
function My(e, t) {
  let s = !0;
  const n = ne.parse(e, !1, !0);
  return t.noFollowDomains.length ? (t.noFollowDomains.forEach((i) => {
    B(n.host, i) && (s = !1);
  }), s) : t.noFollowExcludeDomains.length ? (s = !1, t.noFollowExcludeDomains.forEach((i) => {
    B(n.host, i) && (s = !0);
  }), s) : !1;
}
function qy(e, t) {
  let s = w("configs_analysis_isInternalLink", null, e, t);
  if (s !== null)
    return s;
  if (!B(e, "//") && e[0] === "/")
    return !0;
  if (_i(e))
    return !1;
  const n = ne.parse(e, !1, !0);
  return n.host ? B(n.host, t) : !0;
}
function Ny(e, t) {
  const s = Ei(e);
  return !Ly(Oy(s)) || _i(s) ? "other" : qy(s, t) ? "internal" : "external";
}
function Ky(e, t, s) {
  return e = e.toLowerCase(), B(e, "dofollow") ? "Dofollow" : t !== "internal" && s.noFollowExternalLinks && !B(e, "nofollow") ? My(Ei(e), s) ? "Dofollow" : "Nofollow" : !B(e, "<a") || !B(e, "rel=") ? "Dofollow" : B(e, "nofollow") ? "Nofollow" : "Dofollow";
}
function Wy(e) {
  return e.match(/<a [^>]*href=([\"'])[a-z/]([^\"']+)[^>]*>/gi) || [];
}
const Uy = (e, t) => {
  const s = Wy(e), n = {
    total: 0,
    internalTotal: 0,
    internalDofollow: 0,
    internalNofollow: 0,
    externalTotal: 0,
    externalDofollow: 0,
    externalNofollow: 0,
    otherTotal: 0,
    otherDofollow: 0,
    otherNofollow: 0,
    anchors: s
  };
  return s === null || (n.total = s.length, s.forEach((i) => {
    const r = Ny(i, t.parentDomain), o = Ky(i, r);
    n[r + "Total"]++, n[r + o]++;
  })), n;
};
function D(e, t) {
  let s = -1;
  if (!e || !Array.isArray(e) && !e.type)
    throw new Error("Expected node, not `" + e + "`");
  if (typeof e.value == "string")
    return e.value;
  const n = (Array.isArray(e) ? e : e.children) || [];
  if (n.length === 1 && "value" in n[0])
    return n[0].value;
  const i = [];
  for (; ++s < n.length; )
    i[s] = D(n[s], t);
  return i.join(t || "");
}
const Hy = {}.hasOwnProperty;
function Gy(e, t, s) {
  let n = -1;
  if (!e)
    throw new Error("Iterate requires that |this| not be " + e);
  if (!Hy.call(e, "length"))
    throw new Error("Iterate requires that |this| has a `length`");
  if (typeof t != "function")
    throw new TypeError("`callback` must be a function");
  for (; ++n < e.length; ) {
    if (!(n in e))
      continue;
    const i = t.call(s, e[n], n, e);
    typeof i == "number" && (i < 0 && (n = 0), n = i - 1);
  }
}
function M(e) {
  return t;
  function t(n) {
    if (!n || !n.children)
      throw new Error("Missing children in `parent` for `modifier`");
    Gy(n.children, s, n);
  }
  function s(n, i) {
    return e(n, i, this);
  }
}
const Vy = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Sentence>}
   */
  function(e, t, s) {
    if (e.type !== "SymbolNode" && e.type !== "PunctuationNode" || D(e) !== "&")
      return;
    const n = s.children, i = n[t + 1];
    if (!(t > 0 && n[t - 1].type === "WordNode" || !(i && i.type === "WordNode")))
      return n.splice(t, 1), i.children.unshift(e), i.position && e.position && (i.position.start = e.position.start), t - 1;
  }
), Yy = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Sentence>}
   */
  function(e, t, s) {
    if (t > 0 && (e.type === "SymbolNode" || e.type === "PunctuationNode") && D(e) === "-") {
      const n = s.children, i = n[t - 1], r = n[t + 1];
      if ((!r || r.type !== "WordNode") && i && i.type === "WordNode")
        return n.splice(t, 1), i.children.push(e), i.position && e.position && (i.position.end = e.position.end), t;
    }
  }
), Zy = /^([!"').?\u00BB\u0F3B\u0F3D\u169C\u2019\u201D\u2026\u203A\u203D\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63\]}])\1*$/, Jy = /^[ \t]*((\r?\n|\r)[\t ]*)+$/, xi = /^([!.?\u2026\u203D]+)$/, Xy = /^([&'\-.:=?@\u00AD\u00B7\u2010\u2011\u2019\u2027]|_+)$/, Qy = /^(?:[\d\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE48\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDD30-\uDD39\uDE60-\uDE7E\uDF1D-\uDF26\uDF51-\uDF54\uDFC5-\uDFCB]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2\uDD50-\uDD59]|\uD807[\uDC50-\uDC6C\uDD50-\uDD59\uDDA0-\uDDA9\uDFC0-\uDFD4]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD81B[\uDE80-\uDE96]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9])+$/, eb = /^\d/, tb = /^(?:[a-z\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C3\uA7C8\uA7CA\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43])/, sb = /[\uD800-\uDFFF]/, nb = /[!"'-),-/:;?[-\]_{}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u201F\u2022-\u2027\u2032-\u203A\u203C-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, ib = /[\dA-Za-z\u00AA\u00B2\u00B3\u00B5\u00B9\u00BA\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D63\u0D66-\u0D78\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1AC0\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA827\uA82C\uA830-\uA835\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD27\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF3B]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]|\uDB40[\uDD00-\uDDEF]/, rb = /[\t-\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, ob = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Sentence>}
   */
  function(e, t, s) {
    if (t > 0 && (e.type === "SymbolNode" || e.type === "PunctuationNode")) {
      const n = s.children, i = n[t - 1];
      if (i && i.type === "WordNode") {
        let r = t - 1;
        const o = [];
        let a = [];
        for (; n[++r]; ) {
          const c = n[r];
          if (c.type === "WordNode")
            o.push(...a, ...c.children), a = [];
          else if ((c.type === "SymbolNode" || c.type === "PunctuationNode") && Xy.test(D(c)))
            a.push(c);
          else
            break;
        }
        if (o.length > 0) {
          a.length > 0 && (r -= a.length), n.splice(t, r - t), i.children.push(...o);
          const c = o[o.length - 1];
          return i.position && c.position && (i.position.end = c.position.end), t;
        }
      }
    }
  }
), ab = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Sentence>}
   */
  function(e, t, s) {
    const n = s.children, i = n[t - 1];
    if (i && i.type === "WordNode" && (e.type === "SymbolNode" || e.type === "PunctuationNode") && D(e) === "/") {
      const r = D(i);
      let o = e;
      const a = [e];
      let c = 1, u = "";
      const l = n[t + 1];
      if (l && l.type === "WordNode" && (u = D(l), o = l, a.push(...l.children), c++), r.length < 3 && (!u || u.length < 3))
        return i.children.push(...a), n.splice(t, c), i.position && o.position && (i.position.end = o.position.end), t;
    }
  }
), cb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Sentence>}
   */
  function(e, t, s) {
    if (t > 0 && e.type === "PunctuationNode" && D(e) === ".") {
      const n = s.children[t - 1];
      if (n.type === "WordNode" && n.children && n.children.length !== 1 && n.children.length % 2 !== 0) {
        let i = n.children.length, r = !0;
        for (; n.children[--i]; ) {
          const o = n.children[i], a = D(o);
          if (i % 2 === 0) {
            if (a.length > 1)
              return;
            Qy.test(a) || (r = !1);
          } else if (a !== ".") {
            if (i < n.children.length - 2)
              break;
            return;
          }
        }
        if (!r)
          return s.children.splice(t, 1), n.children.push(e), n.position && e.position && (n.position.end = e.position.end), t;
      }
    }
  }
);
function gt(e) {
  return t;
  function t(s) {
    const n = s && s.children;
    let i = -1;
    if (!n)
      throw new Error("Missing children in `parent` for `visit`");
    for (; ++i in n; )
      e(n[i], i, s);
  }
}
const es = gt(
  /**
   * @type {import('unist-util-visit-children').Visitor<Paragraph | Sentence | Root>}
   */
  function(e, t, s) {
    const n = s.children;
    e.position && t < 1 && /* c8 ignore next */
    (!s.position || !s.position.start) && (ln(s), s.position.start = e.position.start), e.position && t === n.length - 1 && (!s.position || !s.position.end) && (ln(s), s.position.end = e.position.end);
  }
);
function ln(e) {
  e.position || (e.position = {});
}
const ub = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    if ("children" in e) {
      let n = -1;
      for (; e.children[++n]; )
        if (e.children[n].type === "WordNode")
          return;
      const i = s.children[t - 1];
      if (i && "children" in i)
        return i.children.push(...e.children), s.children.splice(t, 1), i.position && e.position && (i.position.end = e.position.end), t;
      const r = s.children[t + 1];
      r && "children" in r && (r.children.unshift(...e.children), r.position && e.position && (r.position.start = e.position.start), s.children.splice(t, 1));
    }
  }
), lb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    if ("children" in e && e.children.length > 0 && t > 0) {
      const n = s.children[t - 1], i = e.children[0], r = e.children[1];
      if (n && n.type === "SentenceNode" && (i.type === "SymbolNode" || i.type === "PunctuationNode") && Zy.test(D(i)))
        return e.children.shift(), n.children.push(i), i.position && n.position && (n.position.end = i.position.end), r && r.position && e.position && (e.position.start = r.position.start), t - 1;
    }
  }
), db = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    if (e.type === "SentenceNode" && t > 0) {
      const n = s.children[t - 1], i = e.children;
      if (i.length > 0 && n.type === "SentenceNode") {
        let r = -1;
        for (; i[++r]; ) {
          const o = i[r];
          if (o.type === "WordNode")
            return tb.test(D(o)) ? (n.children.push(...i), s.children.splice(t, 1), n.position && e.position && (n.position.end = e.position.end), t) : void 0;
          if (o.type === "SymbolNode" || o.type === "PunctuationNode")
            return;
        }
      }
    }
  }
), pb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    const n = s.children[t - 1];
    if (n && n.type === "SentenceNode" && e.type === "SentenceNode") {
      const i = e.children[0];
      if (i && i.type === "WordNode" && eb.test(D(i)))
        return n.children.push(...e.children), s.children.splice(t, 1), n.position && e.position && (n.position.end = e.position.end), t;
    }
  }
), gb = new RegExp(
  "^([0-9]{1,3}|[a-z]|al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz)$"
), hb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    if ("children" in e && e.children.length > 1) {
      const n = e.children[e.children.length - 1];
      if (n && (n.type === "PunctuationNode" || n.type === "SymbolNode") && D(n) === ".") {
        const i = e.children[e.children.length - 2];
        if (i && i.type === "WordNode" && gb.test(D(i).toLowerCase())) {
          i.children.push(n), e.children.pop(), n.position && i.position && (i.position.end = n.position.end);
          const r = s.children[t + 1];
          if (r && r.type === "SentenceNode")
            return e.children.push(...r.children), s.children.splice(t + 1, 1), r.position && e.position && (e.position.end = r.position.end), t - 1;
        }
      }
    }
  }
), fb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    const n = s.children[t - 1];
    if (n && "children" in n && "children" in e && e.children.length > 0) {
      let i = -1;
      for (; e.children[++i]; ) {
        const r = e.children[i];
        if (r.type === "WordNode")
          return;
        if (r.type === "SymbolNode" || r.type === "PunctuationNode") {
          const o = D(r);
          return o !== "," && o !== ";" ? void 0 : (n.children.push(...e.children), n.position && e.position && (n.position.end = e.position.end), s.children.splice(t, 1), t);
        }
      }
    }
  }
), mb = gt(
  /**
   * @type {import('unist-util-visit-children').Visitor<Paragraph>}
   */
  // eslint-disable-next-line complexity
  function(e, t, s) {
    if ("children" in e) {
      let n = e.children.length, i = !1;
      for (; e.children[--n]; ) {
        const r = e.children[n];
        if (r.type !== "SymbolNode" && r.type !== "PunctuationNode") {
          r.type === "WordNode" && (i = !0);
          continue;
        }
        if (!xi.test(D(r)))
          continue;
        if (!i) {
          i = !0;
          continue;
        }
        if (D(r) !== ".")
          continue;
        const o = e.children[n - 1], a = e.children[n + 1];
        if (o && o.type === "WordNode") {
          const c = e.children[n + 2];
          if (a && c && a.type === "WhiteSpaceNode" && D(c) === ".")
            continue;
          e.children.splice(n, 1), o.children.push(r), r.position && o.position && (o.position.end = r.position.end), n--;
        } else
          a && a.type === "WordNode" && (e.children.splice(n, 1), a.children.unshift(r), r.position && a.position && (a.position.start = r.position.start));
      }
    }
  }
), Si = gt(
  /**
   * @type {import('unist-util-visit-children').Visitor<Paragraph | Root>}
   */
  function(e, t, s) {
    if ("children" in e && e.children) {
      const n = e.children[0];
      if (n && n.type === "WhiteSpaceNode") {
        e.children.shift(), s.children.splice(t, 0, n);
        const i = e.children[0];
        i && i.position && e.position && (e.position.start = i.position.start);
      }
    }
  }
), $i = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Root | Paragraph>}
   */
  function(e, t, s) {
    if ("children" in e) {
      const n = e.children[e.children.length - 1];
      if (n && n.type === "WhiteSpaceNode") {
        e.children.pop(), s.children.splice(t + 1, 0, n);
        const i = e.children[e.children.length - 1];
        return i && i.position && e.position && (e.position.end = i.position.end), t;
      }
    }
  }
), yb = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Paragraph>}
   */
  function(e, t, s) {
    if (e.type !== "SentenceNode")
      return;
    const n = e.children;
    let i = 0;
    for (; ++i < n.length - 1; ) {
      const r = n[i];
      if (r.type !== "WhiteSpaceNode" || D(r).split(/\r\n|\r|\n/).length < 3)
        continue;
      e.children = n.slice(0, i);
      const o = {
        type: "SentenceNode",
        children: n.slice(i + 1)
      }, a = n[i - 1], c = n[i + 1];
      if (s.children.splice(t + 1, 0, r, o), e.position && a.position && c.position) {
        const u = e.position.end;
        e.position.end = a.position.end, o.position = { start: c.position.start, end: u };
      }
      return t + 1;
    }
  }
), Bi = M(
  /**
   * @type {import('unist-util-modify-children').Modifier<Root | Paragraph>}
   */
  function(e, t, s) {
    if ("children" in e && e.children.length === 0)
      return s.children.splice(t, 1), t;
  }
);
class Se {
  /**
   * Create a new parser.
   *
   * This additionally supports `retext`-like call: where an instance is
   * created for each file, and the file is given on construction.
   *
   * @param {string | null | undefined} [doc]
   *   Value to parse.
   * @param {VFile | null | undefined} [file]
   *   Corresponding file.
   */
  constructor(t, s) {
    const n = s || t;
    this.doc = n ? String(n) : null, this.tokenizeRootPlugins = [...this.tokenizeRootPlugins], this.tokenizeParagraphPlugins = [...this.tokenizeParagraphPlugins], this.tokenizeSentencePlugins = [...this.tokenizeSentencePlugins];
  }
  /**
   * Turn natural language into a syntax tree.
   *
   * @param {string | null | undefined} [value]
   *   Value to parse.
   * @returns {Root}
   *   Tree.
   */
  parse(t) {
    return this.tokenizeRoot(t || this.doc);
  }
  /**
   * Parse as a root.
   *
   * @param {string | null | undefined} [value]
   *   Value to parse.
   * @returns {Root}
   *   Built tree.
   */
  tokenizeRoot(t) {
    const s = this.tokenizeParagraph(t), n = {
      type: "RootNode",
      children: dn(s, "WhiteSpaceNode", Jy)
    };
    let i = -1;
    for (; this.tokenizeRootPlugins[++i]; )
      this.tokenizeRootPlugins[i](n);
    return n;
  }
  /**
   * Parse as a paragraph.
   *
   * @param {string | null | undefined} [value]
   *   Value to parse.
   * @returns {Paragraph}
   *   Built tree.
   */
  tokenizeParagraph(t) {
    const s = this.tokenizeSentence(t), n = {
      type: "ParagraphNode",
      children: dn(s, "PunctuationNode", xi)
    };
    let i = -1;
    for (; this.tokenizeParagraphPlugins[++i]; )
      this.tokenizeParagraphPlugins[i](n);
    return n;
  }
  /**
   * Parse as a sentence.
   *
   * @param {string | null | undefined} [value]
   *   Value to parse.
   * @returns {Sentence}
   *   Built tree.
   */
  tokenizeSentence(t) {
    const n = { type: "SentenceNode", children: this.tokenize(t) };
    let i = -1;
    for (; this.tokenizeSentencePlugins[++i]; )
      this.tokenizeSentencePlugins[i](n);
    return n;
  }
  /**
   *  Transform a `value` into a list of `NLCSTNode`s.
   *
   * @param {string | null | undefined} [value]
   *   Value to parse.
   * @returns {Array<SentenceContent>}
   *   Built sentence content.
   */
  tokenize(t) {
    const s = [];
    if (!t)
      return s;
    const n = { line: 1, column: 1, offset: 0 };
    let i = 0, r = 0, o = { ...n }, a, c;
    for (; r < t.length; ) {
      const l = t.charAt(r), p = rb.test(l) ? "WhiteSpaceNode" : nb.test(l) ? "PunctuationNode" : ib.test(l) ? "WordNode" : "SymbolNode";
      i < r && a && p && !(a === p && // Words or white space continue.
      (a === "WordNode" || a === "WhiteSpaceNode" || // Same character of punctuation or symbol also continues.
      l === c || // Surrogates of  punctuation or symbol also continue.
      sb.test(l))) && (s.push(u(a, t.slice(i, r))), i = r, o = { ...n }), l === "\r" || l === `
` && c !== "\r" ? (n.line++, n.column = 1) : l !== `
` && n.column++, n.offset++, a = p, c = l, r++;
    }
    return a && i < r && s.push(u(a, t.slice(i, r))), s;
    function u(l, p) {
      return l === "WordNode" ? {
        type: "WordNode",
        children: [
          {
            type: "TextNode",
            value: p,
            position: { start: o, end: { ...n } }
          }
        ],
        position: { start: o, end: { ...n } }
      } : { type: l, value: p, position: { start: o, end: { ...n } } };
    }
  }
}
Se.prototype.tokenizeSentencePlugins = [
  Vy,
  Yy,
  ob,
  ab,
  cb,
  es
];
Se.prototype.tokenizeParagraphPlugins = [
  ub,
  lb,
  db,
  pb,
  hb,
  fb,
  mb,
  Si,
  $i,
  yb,
  Bi,
  es
];
Se.prototype.tokenizeRootPlugins = [
  Si,
  $i,
  Bi,
  es
];
function dn(e, t, s) {
  const n = [];
  let i = -1, r = 0;
  for (; ++i < e.children.length; ) {
    const o = e.children[i];
    if (i === e.children.length - 1 || o.type === t && s.test(D(o))) {
      const a = {
        type: e.type,
        children: e.children.slice(r, i + 1)
      }, c = e.children[r], u = o;
      c.position && u.position && (a.position = {
        start: c.position.start,
        end: u.position.end
      }), n.push(a), r = i + 1;
    }
  }
  return n;
}
class ts extends Se {
}
ts.prototype.tokenizeSentencePlugins = [
  gt(Fb),
  ...Se.prototype.tokenizeSentencePlugins
];
ts.prototype.tokenizeParagraphPlugins = [
  M(kb),
  ...Se.prototype.tokenizeParagraphPlugins
];
const bb = new RegExp(
  "^(inc|ltd|bbls?|cu|doz|fl|ft|gal|gr|gro|in|kt|lbs?|mi|oz|pt|qt|sq|tbsp|tsp|yds?|sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)$"
  // Note: There's no `i` flag here because the value to test against should be
  // all lowercase!
), vb = new RegExp(
  "^(Mr|Mrs|Miss|Ms|Mss|Mses|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph|Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St|Ft|Pen|Terr|Hwy|Fwy|Pkwy|Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo|Alta|Man|Ont|Qué|Que|Sask|Yuk|Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks)$"
), Db = new RegExp(
  "^(o|ol)$"
), wb = new RegExp(
  "^(im|er|em|cause|twas|tis|twere|\\d\\ds?)$"
), pn = /^['\u2019]$/;
function kb(e, t, s) {
  if ("children" in e && e.children) {
    const n = e.children[e.children.length - 1], i = e.children[e.children.length - 2];
    if (n && n.type === "PunctuationNode" && D(n) === "." && i && i.type === "WordNode") {
      const r = D(i);
      if (bb.test(r.toLowerCase()) || vb.test(r)) {
        i.children.push(n), e.children.pop(), n.position && i.position && (i.position.end = n.position.end);
        const o = s.children[t + 1];
        if (o && o.type === "SentenceNode")
          return e.children.push(...o.children), s.children.splice(t + 1, 1), o.position && e.position && (e.position.end = o.position.end), t - 1;
      }
    }
  }
}
function Fb(e, t, s) {
  if (e.type === "PunctuationNode" || e.type === "SymbolNode") {
    const n = s.children, i = n.length, r = D(e);
    if (r === "/") {
      const o = n[t - 1];
      o && o.type === "WordNode" && D(o).toLowerCase() === "w" && (n.splice(t, 1), o.children.push(e), o.position && e.position && (o.position.end = e.position.end));
    } else if (pn.test(r)) {
      const o = n[t - 1];
      if (t > 2 && t < i - 1 && o.type === "WordNode" && n[t - 2].type === "WhiteSpaceNode" && n[t + 1].type === "WhiteSpaceNode" && Db.test(D(o).toLowerCase())) {
        n.splice(t, 1), o.children.push(e), o.position && e.position && (o.position.end = e.position.end);
        return;
      }
      if (t !== i - 1 && n[t + 1].type === "WordNode" && (t === 0 || n[t - 1].type !== "WordNode")) {
        const a = n[t + 1], c = D(a).toLowerCase(), u = n[t + 2];
        a.type === "WordNode" && wb.test(c) ? (n.splice(t, 1), a.children.unshift(e), a.position && e.position && (a.position.start = e.position.start)) : a.type === "WordNode" && c === "n" && u && u.type === "PunctuationNode" && pn.test(D(u)) && (n.splice(t, 1), n.splice(t + 1, 1), a.children.unshift(e), a.children.push(u), a.position && (e.position && (a.position.start = e.position.start), u.position && (a.position.end = u.position.end)));
      }
    }
  }
}
const Ab = (e) => {
  if (e = se(
    [
      fe,
      me,
      Yt,
      qe,
      pt,
      fi
    ]
  )(e), e === "")
    return 0;
  const t = new ts().tokenizeParagraph(e).children;
  return dt(t, { type: "SentenceNode" }).length;
};
function Cb(e, t) {
  for (var s, n = -1, i = e.length; ++n < i; ) {
    var r = t(e[n]);
    r !== void 0 && (s = s === void 0 ? r : s + r);
  }
  return s;
}
var _b = Cb, Eb = _b, xb = Ie;
function Sb(e) {
  return e && e.length ? Eb(e, xb) : 0;
}
var $b = Sb;
function Bb(e) {
  return e = e.toLowerCase(), 3 >= e.length ? 1 : (e = e.replace(/(?:[^laeiouy]es|ed|lle|[^laeiouy]e)$/, "").replace(/^y/, "").match(/[aeiouy]{1,2}/g), e === null ? 0 : e.length);
}
const zb = (e) => {
  const t = Me(e, (s) => Bb(s));
  return $b(t);
}, Tb = (e) => (e = e.replace(/\b[0-9]+\b/g, ""), e === "." ? "" : e);
function Rb(e, t, s) {
  return 206.835 - 1.015 * (t / e) - 84.6 * (s / t);
}
const Pb = (e) => {
  if (e === "")
    return !1;
  e = Tb(e);
  const t = bi(e), s = Ab(e), n = t.length;
  if (s === 0 || n === 0)
    return !1;
  const i = zb(t);
  return Rb(s, n, i).toFixed(2);
}, jb = (() => {
  const e = "!(?:-(?!->)[^\\-]*)*(?:-->)?", t = "!\\[CDATA\\[[^\\]]*(?:](?!]>)[^\\]]*)*?(?:]]>)?", n = "(<(" + ("(?=!--|!\\[CDATA\\[)((?=!-)" + // If yes, which type?
  e + "|" + t + ")") + // Find end of escaped element.
  "|[^>]*>?))";
  return new RegExp(n);
})();
function Ib(e) {
  const t = [];
  let s = e, n;
  for (; n = s.match(jb); ) {
    const i = (
      /** @type {number} */
      n.index
    );
    t.push(s.slice(0, i)), t.push(n[0]), s = s.slice(i + n[0].length);
  }
  return s.length && t.push(s), t;
}
function Ob(e, t) {
  const s = Ib(e);
  let n = !1;
  const i = Object.keys(t);
  for (let r = 1; r < s.length; r += 2)
    for (let o = 0; o < i.length; o++) {
      const a = i[o];
      if (s[r].indexOf(a) !== -1) {
        s[r] = s[r].replace(new RegExp(a, "g"), t[a]), n = !0;
        break;
      }
    }
  return n && (e = s.join("")), e;
}
function Lb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const s = [];
  if (e.trim() === "")
    return "";
  if (e = e + `
`, e.indexOf("<pre") !== -1) {
    const r = e.split("</pre>"), o = r.pop();
    e = "";
    for (let a = 0; a < r.length; a++) {
      const c = r[a], u = c.indexOf("<pre");
      if (u === -1) {
        e += c;
        continue;
      }
      const l = "<pre wp-pre-tag-" + a + "></pre>";
      s.push([l, c.substr(u) + "</pre>"]), e += c.substr(0, u) + l;
    }
    e += o;
  }
  e = e.replace(/<br\s*\/?>\s*<br\s*\/?>/g, `

`);
  const n = "(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)";
  e = e.replace(new RegExp("(<" + n + "[\\s/>])", "g"), `

$1`), e = e.replace(new RegExp("(</" + n + ">)", "g"), `$1

`), e = e.replace(/\r\n|\r/g, `
`), e = Ob(e, {
    "\n": " <!-- wpnl --> "
  }), e.indexOf("<option") !== -1 && (e = e.replace(/\s*<option/g, "<option"), e = e.replace(/<\/option>\s*/g, "</option>")), e.indexOf("</object>") !== -1 && (e = e.replace(/(<object[^>]*>)\s*/g, "$1"), e = e.replace(/\s*<\/object>/g, "</object>"), e = e.replace(/\s*(<\/?(?:param|embed)[^>]*>)\s*/g, "$1")), (e.indexOf("<source") !== -1 || e.indexOf("<track") !== -1) && (e = e.replace(/([<\[](?:audio|video)[^>\]]*[>\]])\s*/g, "$1"), e = e.replace(/\s*([<\[]\/(?:audio|video)[>\]])/g, "$1"), e = e.replace(/\s*(<(?:source|track)[^>]*>)\s*/g, "$1")), e.indexOf("<figcaption") !== -1 && (e = e.replace(/\s*(<figcaption[^>]*>)/, "$1"), e = e.replace(/<\/figcaption>\s*/, "</figcaption>")), e = e.replace(/\n\n+/g, `

`);
  const i = e.split(/\n\s*\n/).filter(Boolean);
  return e = "", i.forEach((r) => {
    e += "<p>" + r.replace(/^\n*|\n*$/g, "") + `</p>
`;
  }), e = e.replace(/<p>\s*<\/p>/g, ""), e = e.replace(/<p>([^<]+)<\/(div|address|form)>/g, "<p>$1</p></$2>"), e = e.replace(new RegExp("<p>\\s*(</?" + n + "[^>]*>)\\s*</p>", "g"), "$1"), e = e.replace(/<p>(<li.+?)<\/p>/g, "$1"), e = e.replace(/<p><blockquote([^>]*)>/gi, "<blockquote$1><p>"), e = e.replace(/<\/blockquote><\/p>/g, "</p></blockquote>"), e = e.replace(new RegExp("<p>\\s*(</?" + n + "[^>]*>)", "g"), "$1"), e = e.replace(new RegExp("(</?" + n + "[^>]*>)\\s*</p>", "g"), "$1"), t && (e = e.replace(/<(script|style).*?<\/\\1>/g, (r) => r[0].replace(/\n/g, "<WPPreserveNewline />")), e = e.replace(/<br>|<br\/>/g, "<br />"), e = e.replace(/(<br \/>)?\s*\n/g, (r, o) => o ? r : `<br />
`), e = e.replace(/<WPPreserveNewline \/>/g, `
`)), e = e.replace(new RegExp("(</?" + n + "[^>]*>)\\s*<br />", "g"), "$1"), e = e.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/g, "$1"), e = e.replace(/\n<\/p>$/g, "</p>"), s.forEach((r) => {
    const [o, a] = r;
    e = e.replace(o, a);
  }), e.indexOf("<!-- wpnl -->") !== -1 && (e = e.replace(/\s?<!-- wpnl -->\s?/g, `
`)), e;
}
const Ke = (e) => e.replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, ""), We = (e) => e.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, ""), ss = (e) => e.replace(/[‘’‛`]/g, "'").replace(/[“”〝〞〟‟„]/g, '"'), Mb = (e) => e.replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
function zi(e) {
  return R(e) ? "" : se(
    [
      Mb,
      Ke,
      We,
      me,
      pt,
      qe,
      ss
    ]
  )(e);
}
function ht(e) {
  return R(e) ? "" : se(
    [
      Ke,
      We,
      fe,
      me,
      pt,
      qe,
      ss
    ]
  )(e);
}
function ns(e) {
  return R(e) ? "" : se(
    [
      fe,
      qe
    ]
  )(e);
}
function qb(e) {
  return e.replace(/&nbsp;|&#160;/gi, " ").replace(/\s{2,}/g, " ").replace(/\s\./g, ".").replace(/(\r\n|\n|\r)/gm, "");
}
function Nb(e) {
  return R(e) ? "" : se(
    [
      Ke,
      We,
      fe,
      me,
      qb
    ]
  )(e);
}
function Kb(e) {
  return R(e) ? "" : se(
    [
      Ke,
      We,
      fe,
      me
    ]
  )(e);
}
const Wb = (e, t) => {
  const s = /<p(?:[^>]+)?>(.*?)<\/p>/ig, n = [];
  let i;
  for (; (i = s.exec(e)) !== null; )
    n.push(i);
  return Me(n, (r) => t ? ht(r[1]) : r[1]);
}, Ti = (e, t) => {
  e = se(
    [
      Yt,
      me,
      Lb
    ]
  )(e), t = t || !1;
  const s = Wb(e, t);
  return 0 < s.length ? s : [t ? ht(e) : e];
}, Ub = (e) => {
  const t = [];
  return Ti(e).map((s) => t.push(
    {
      wordCount: Zt(s),
      text: s
    }
  )), dt(t, (s) => 0 < s.wordCount);
};
class Ri {
  /**
   * Class constructor.
   *
   * @param {Paper} paper The paper to use for the assessment.
   */
  constructor(t) {
    this.setPaper(t), this.researches = {
      combinations: fy,
      fleschReading: Pb,
      getLinkStats: Uy,
      getParagraphs: Ub,
      getWords: bi,
      pluralize: new om(),
      removePunctuation: yi,
      slugify: Xp,
      stripTags: fe,
      wordCount: Zt
    };
  }
  /**
   * Set the Paper.
   *
   * @param {Paper} paper The paper
   */
  setPaper(t) {
    this.paper = t;
  }
  /**
   * Get all researches.
   *
   * @return {Object} An object containing all available researches.
   */
  getResearches() {
    return this.researches;
  }
  /**
   * Return the Research by name.
   *
   * @param {string} name The name to reference the research by.
   *
   * @return {*} Returns the result of the research or false if research does not exist.
   */
  getResearch(t) {
    return R(t) || ze(t) || !this.hasResearch(t) ? !1 : this.getResearches()[t];
  }
  /**
   * Check whether or not the research is known by the Researcher.
   *
   * @param {string} name The name to reference the research by.
   *
   * @return {boolean} Whether or not the research is known by the Researcher
   */
  hasResearch(t) {
    return le(this.getResearches(), t);
  }
}
function Hb(e) {
  return e === null;
}
var Gb = Hb;
class Vb extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add a few images and/or videos to make your content appealing.", "rank-math")).setTooltip(t.__("Content with images and/or video feels more inviting to users. It also helps supplement your textual content.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n);
    return t.hasText() ? (i.setScore(
      this.calculateScore(t)
    ).setText(this.translateScore(i, n)), i) : (t.hasThumbnail() && i.setScore(1).setText(this.translateScore(i, n)), i);
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText() || t.hasThumbnail();
  }
  /**
   * Calculates the score.
   *
   * @param {Paper} paper The paper to run this assessment on.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    let s = 0;
    return s += this.calculateImagesScore(this.getImages(t)), s += this.calculateVideosScore(this.getVideos(t.getText())), Math.min(this.getScore(), s);
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_contentHasAssets_score", 6);
  }
  /**
   * Calculates the images score.
   *
   * @param {number} images Total number of images.
   *
   * @return {number} The calculated score.
   */
  calculateImagesScore(t) {
    const s = {
      0: 0,
      1: 1,
      2: 2,
      3: 4
    };
    return le(s, t) ? s[t] : 6;
  }
  /**
   * Calculates the videos score.
   *
   * @param {number} videos Total number of videos.
   *
   * @return {number} The calculated score.
   */
  calculateVideosScore(t) {
    const s = {
      0: 0,
      1: 1
    };
    return le(s, t) ? s[t] : 2;
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Your content contains images and/or video(s).", "rank-math") : s.__("You are not using rich media like images or videos.", "rank-math");
  }
  /**
   * Get all the images.
   *
   * @param {Paper}  paper The paper to run this assessment on.
   * @param {string} text  The text.
   *
   * @return {number} Count of found images.
   */
  getImages(t, s = null) {
    s = Gb(s) ? t.getText() : s;
    const n = [].concat(
      this.match(s, "<img(?:[^>]+)?>"),
      this.match(s, "\\[gallery( [^\\]]+?)?\\]")
    );
    return t.hasThumbnail() && n.push(t.getThumbnail()), n.length;
  }
  /**
   * Has video URL
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {Array} The video URL matches from the text.
   */
  hasVideoUrl(t) {
    return this.match(t, /(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
  }
  /**
   * Get videos from the iFrames.
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {Object} The videos count and the updated string.
   */
  getVideosFromIframe(t) {
    return {
      count: this.match(t, "<iframe(?:[^>]+)?>").filter((n) => this.hasVideoUrl(n) ? (t = t.replace(n, ""), !0) : !1).length,
      text: t
    };
  }
  /**
   * Get videos from the video tag.
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {Object} The videos count and the updated string.
   */
  getVideosFromVideoTag(t) {
    return {
      count: this.match(t, "<video(?:[^>]+)?>").filter((n) => this.hasVideoUrl(n) ? (t = t.replace(n, ""), !0) : !1).length,
      text: t
    };
  }
  /**
   * Get videos from the Shortcode
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {Object} The videos count and the updated string.
   */
  getVideosFromShortcodes(t) {
    return {
      count: this.match(t, "\\[video( [^\\]]+?)?\\]").filter((n) => this.hasVideoUrl(n) ? (t = t.replace(n, ""), !0) : !1).length,
      text: t
    };
  }
  /**
   * Get videos by URL.
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {Object} The videos count and the updated string.
   */
  getVideosByURL(t) {
    return {
      count: this.hasVideoUrl(t).length,
      text: t
    };
  }
  /**
   * Get all the videos.
   *
   * @param {string} text The text to use for the assessment.
   *
   * @return {number} Count of found videos.
   */
  getVideos(t) {
    let s = 0;
    const n = this.getVideosFromIframe(t);
    s += parseInt(n.count), t = n.text;
    const i = this.getVideosFromVideoTag(t);
    s += parseInt(i.count), t = i.text;
    const r = this.getVideosFromShortcodes(t);
    s += parseInt(r.count), t = r.text;
    const o = this.getVideosByURL(t);
    return s += parseInt(o.count), t = o.text, s;
  }
  /**
   * Match the assets.
   *
   * @param {string} text        The text to use for the assessment.
   * @param {string} regexString The regex to test the text against.
   *
   * @return {Array} The matched set.
   */
  match(t, s) {
    const n = new RegExp(s, "ig"), i = t.match(n);
    return i === null ? [] : i;
  }
}
class Yb extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add short and concise paragraphs for better readability and UX.", "rank-math")).setTooltip(t.__("Short paragraphs are easier to read and more pleasing to the eye. Long paragraphs scare the visitor, and they might result to SERPs looking for better readable content.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("getParagraphs")(t.getText()).some((a) => 120 < a.wordCount);
    return i.setScore(this.calculateScore(o)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasBigParagraphs Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? null : this.getScore();
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_contentHasShortParagraphs_score", 3);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("You are using short paragraphs.", "rank-math") : s.__("At least one paragraph is long. Consider using short paragraphs.", "rank-math");
  }
}
const ke = {
  tocKbLink: "https://s.rankmath.com/tockb",
  contentLength: "https://s.rankmath.com/100contentlength",
  contentAILink: "https://rankmath.com/kb/how-to-use-content-ai/",
  productReview: "https://rankmath.com/kb/woocommerce-product-schema/?utm_source=Plugin&utm_medium=Content%20Analysis%20Single%20Test%20KB&utm_campaign=WP#reviews"
};
class Zb extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use Table of Content to break-down your text.", "rank-math")).setTooltip(t.__("Table of Contents help break down content into smaller, digestible chunks. It makes reading easier which in turn results in better rankings.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = this.configs.assessor.hasTOCPlugin;
    return i.setScore(this.calculateScore(r)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable() {
    return this.configs.assessor.hasTOCPlugin;
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasTOCPlugin Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_contentHasTOC_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.sprintf(
      /* Translators: Placeholder expands to "Table of Contents plugin" with a link to the corresponding KB article. */
      s.__("You seem to be using a %1$s to break-down your text.", "rank-math"),
      '<a href="' + ke.tocKbLink + '" target="_blank">Table of Contents plugin</a>'
    ) : s.sprintf(
      /* Translators: Placeholder expands to "Table of Contents plugin" with a link to the corresponding KB article. */
      s.__("You don't seem to be using a %1$s.", "rank-math"),
      '<a href="' + ke.tocKbLink + '" target="_blank">Table of Contents plugin</a>'
    );
  }
}
var Jb = Math.max, Xb = Math.min;
function Qb(e, t, s) {
  return e >= Xb(t, s) && e < Jb(t, s);
}
var e3 = Qb, t3 = e3, gn = Ai, s3 = Jt;
function n3(e, t, s) {
  return t = gn(t), s === void 0 ? (s = t, t = 0) : s = gn(s), e = s3(e), t3(e, t, s);
}
var zt = n3;
const Pi = (e) => e.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
class i3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Keyword Density is 0. Aim for around 1% Keyword Density.", "rank-math")).setTooltip(t.__("There is no ideal keyword density percentage, but it should not be too high. The most important thing is to keep the copy natural.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("wordCount")(t.getTextLower()), a = t.get("keywords");
    if (o === !1 || o === 0 || ze(a))
      return i;
    const c = new RegExp(Me(a, Pi).join("|"), "gi"), u = (ns(t.getText()).match(c) || []).length, l = w("rankMath_analysis_keywordDensity", (u / o * 100).toFixed(2), u), p = this.calculateScore(l);
    return i.setScore(p.score).setText(
      n.sprintf(
        this.translateScore(p.type, n),
        l,
        u
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {string} type Type of score.
   * @param {Jed}    i18n The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t === "low" ? s.__("Keyword Density is %1$s which is low, the Focus Keyword and combination appears %2$s times.", "rank-math") : t === "high" ? s.__("Keyword Density is %1$s which is high, the Focus Keyword and combination appears %2$s times.", "rank-math") : s.__("Keyword Density is %1$s, the Focus Keyword and combination appears %2$s times.", "rank-math");
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} keywordDensity Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    const s = this.getBoundaries();
    return 0.5 > t ? {
      type: "low",
      score: s.fail
    } : 2.5 < t ? {
      type: "high",
      score: s.fail
    } : zt(t, 0.5, 0.75) ? {
      type: "fair",
      score: s.fair
    } : zt(t, 0.76, 1) ? {
      type: "good",
      score: s.good
    } : {
      type: "best",
      score: s.best
    };
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return this.getBoundaries().best;
  }
  getBoundaries() {
    return w(
      "rankMath_analysis_keywordDensity_score",
      {
        fail: 0,
        fair: 2,
        good: 3,
        best: 6
      }
    );
  }
}
class r3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use Focus Keyword at the beginning of your content.", "rank-math")).setTooltip(t.__("The first 10% of the content should contain the Focus Keyword preferably at the beginning.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = s.getResearch("getWords");
    let o = r(t.getTextLower());
    if (o === !1)
      return i;
    400 < o.length && (o = o.slice(0, Math.floor(o.length * 0.1))), o = o.join(" ");
    const a = r(t.getLower("keyword")).join(" "), c = B(o, a);
    return i.setScore(this.calculateScore(c)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordIn10Percent_score", 3);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword appears in the first 10% of the content.", "rank-math") : s.__("Focus Keyword doesn't appear at the beginning of your content.", "rank-math");
  }
}
class o3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use Focus Keyword in the content.", "rank-math")).setTooltip(t.__("It is recommended to make the focus keyword appear in the post content too.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = ns(t.getTextLower()), o = B(r, t.getLower("keyword"));
    return i.setScore(this.calculateScore(o)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordInContent_score", 3);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword found in the content.", "rank-math") : s.__("Focus Keyword doesn't appear in the content.", "rank-math");
  }
}
class a3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add an image with your Focus Keyword as alt text.", "rank-math")).setTooltip(t.__("It is recommended to add the focus keyword in the alt attribute of one or more images.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.getLower("thumbnailAlt");
    let o = t.getLower("keyword");
    if (o === r)
      return i.setScore(this.calculateScore(!0)).setText(this.translateScore(i, n)), i;
    o = Fi(o.split(" ")).join(" ");
    const a = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, ".*");
    let c = new RegExp(`<img[^>]*alt=['"][^'"]*` + a + `[^'"]*['"]`, "gi");
    return t.getTextLower().match(c) !== null || B(t.getLower("thumbnailAlt"), o) ? (i.setScore(this.calculateScore(!0)).setText(this.translateScore(i, n)), i) : (c = new RegExp("\\[gallery( [^\\]]+?)?\\]", "ig"), t.getTextLower().match(c) !== null && i.setScore(this.calculateScore(!0)).setText(n.__("We detected a gallery in your content & assuming that you added Focus Keyword in alt in at least one of the gallery images.", "rank-math")), i);
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && (t.hasText() || t.hasThumbnailAltText());
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordInImageAlt_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword found in image alt attribute(s).", "rank-math") : s.__("Focus Keyword not found in image alt attribute(s).", "rank-math");
  }
}
class c3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add Focus Keyword to your SEO Meta Description.", "rank-math")).setTooltip(t.__("Make sure the focus keyword appears in the SEO description too.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = B(t.getLower("description"), t.getLower("keyword"));
    return i.setScore(this.calculateScore(r)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasDescription();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordInMetaDescription_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword used inside SEO Meta Description.", "rank-math") : s.__("Focus Keyword not found in your SEO Meta Description.", "rank-math");
  }
}
class u3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use Focus Keyword in the URL.", "rank-math")).setTooltip(t.__("Include the focus keyword in the slug (permalink) of this post.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.getUrl().replace(/[-_]/ig, "-"), o = B(r, t.getKeywordPermalink(s)) || B(r, t.getPermalinkWithStopwords(s));
    return i.setScore(this.calculateScore(o)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasPermalink();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordInPermalink_score", 5);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword used in the URL.", "rank-math") : s.__("Focus Keyword not found in the URL.", "rank-math");
  }
}
class l3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use Focus Keyword in subheading(s) like H2, H3, H4, etc..", "rank-math")).setTooltip(t.__("It is recommended to add the focus keyword as part of one or more subheadings in the content.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = new RegExp("<h[2-6][^>]*>.*" + Pi(t.getLower("keyword")) + ".*</h[2-6]>", "gi"), o = t.getTextLower().match(r) !== null;
    return i.setScore(this.calculateScore(o)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_keywordInSubheadings_score", 3);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword found in the subheading(s).", "rank-math") : s.__("Focus Keyword not found in subheading(s) like H2, H3, H4, etc..", "rank-math");
  }
}
class d3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed}   i18n  The i18n-object used for parsing translations.
   * @param {Paper} paper The paper to run this assessment on.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t, s) {
    return new C().setMaxScore(this.getScore(s.getShortLocale())).setEmpty(t.__("Add Focus Keyword to the SEO title.", "rank-math")).setTooltip(t.__("Make sure the focus keyword appears in the SEO post title too.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n, t), r = B(t.getLower("title"), t.getLower("keyword"));
    return i.setScore(this.calculateScore(r, t)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasTitle();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasKeyword Title has number or not.
   * @param {Paper}   paper      The paper to use for the assessment.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t, s) {
    return t ? this.getScore(s.getShortLocale()) : null;
  }
  /**
   * Get analysis max score.
   *
   * @param {string} locale The paper locale.
   *
   * @return {number} Max score an analysis has
   */
  getScore(t) {
    return w("rankMath_analysis_keywordInTitle_score", t === "en" ? 36 : 38);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Hurray! You're using Focus Keyword in the SEO Title.", "rank-math") : s.__("Focus Keyword does not appear in the SEO title.", "rank-math");
  }
}
class p3 extends A {
  constructor() {
    super(...arguments);
    /**
     * Hold checked keywords status
     *
     * @type {Object}
     */
    mt(this, "keywordsChecked", {});
  }
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(s) {
    return new C().setMaxScore(this.getScore()).setEmpty(s.__("Set a Focus Keyword for this content.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(s, n, i) {
    const r = this.newResult(i), o = s.getLower("keyword").trim();
    return R(this.keywordsChecked[o]) ? (this.keywordsChecked[o] = !0, r.setText(i.__("We are searching in database.", "rank-math")), r) : (r.has = this.keywordsChecked[o], r.setText(this.translateScore(o, this.keywordsChecked[o], i)), jy("rankMath_analysis_keywordUsage_updated", o, r), r);
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(s) {
    return s.hasKeyword();
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {string}  keyword      The keyword.
   * @param {boolean} isNewKeyword Is the selected keyword new or not.
   * @param {Jed}     i18n         The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(s, n, i) {
    return n ? i.__("You haven't used this Focus Keyword before.", "rank-math") : i.sprintf(
      /* Translators: placeholder expands to the words [already used] with a link to see the related posts. */
      i.__("You have %1$s this Focus Keyword.", "rank-math"),
      '<a target="_blank" href="' + this.changeKeywordInLink(s) + '">' + i.__("already used", "rank-math") + "</a>"
    );
  }
  /**
   * Change keyword in link for post list.
   *
   * @param {string} keyword The keyword.
   *
   * @return {string} Generated url.
   */
  changeKeywordInLink(s) {
    return this.configs.assessor.focusKeywordLink.replace("%focus_keyword%", s).replace("%post_type%", this.configs.objectType).replace("%yaxonomy%", this.configs.objectType);
  }
}
class g3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(
      this.getFilteredText("emptyContent", t)
    ).setTooltip(this.getFilteredText("tooltipText", t));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("wordCount")(t.getTextLower());
    return o === !1 || o === 0 || i.setScore(this.calculateScore(o)).setText(
      n.sprintf(
        this.translateScore(i, n),
        o
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Calculates the score based on the word count.
   *
   * @param {number} wordCount Word count.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    const s = this.getBoundaries();
    let n = 1e5, i = !1;
    return Oe(s, (r) => {
      zt(t, r.boundary, n) && (i = r), n = r.boundary + 1;
    }), i !== !1 ? i.score : 0;
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? this.getFilteredText("hasScore", s) : this.getFilteredText("failed", s);
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return this.getBoundaries().recommended.score;
  }
  getBoundaries() {
    return w(
      "rankMath_analysis_contentLength_boundaries",
      {
        recommended: {
          boundary: 2500,
          score: 8
        },
        belowRecommended: {
          boundary: 2e3,
          score: 5
        },
        medium: {
          boundary: 1500,
          score: 4
        },
        belowMedium: {
          boundary: 1e3,
          score: 3
        },
        low: {
          boundary: 600,
          score: 2
        }
      }
    );
  }
  getFilteredText(t, s) {
    return w("rankMath_analysis_contentLength", {
      /* Translators: word count. */
      hasScore: s.__("Content is %1$d words long. Good job!", "rank-math"),
      /* Translators: word count. */
      failed: s.__("Content is %1$d words long. Consider using at least 600 words.", "rank-math"),
      emptyContent: s.sprintf(
        /* Translators: content length. */
        s.__("Content should be %1$s long.", "rank-math"),
        '<a href="' + ke.contentLength + '" target="_blank">600-2500 words</a>'
      ),
      tooltipText: s.__("Minimum recommended content length should be 600 words.", "rank-math")
    })[t];
  }
}
class h3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("URL unavailable. Add a short URL.", "rank-math")).setTooltip(t.__("Permalink should be at most 75 characters long.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.getUrl().length;
    return i.setScore(this.calculateScore(r)).setText(
      n.sprintf(
        this.translateScore(i, n),
        r
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasUrl();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {number} permalinkLength Length of Url to run the analysis on.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return 75 < t ? null : this.getScore();
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_permalinkLength_score", 4);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? (
      /* Translators: The placeholder is the number of characters. */
      s.__("URL is %1$d characters long. Kudos!", "rank-math")
    ) : (
      /* Translators: The placeholder is the number of characters. */
      s.__("URL is %1$d characters long. Consider shortening it.", "rank-math")
    );
  }
}
class f3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Link out to external resources.", "rank-math")).setTooltip(t.__("It helps visitors read more about a topic and prevents pogosticking.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("getLinkStats")(t.getText(), t.configs);
    return o.total === 0 || i.setScore(this.calculateScore(0 < o.externalTotal)).setText(
      n.sprintf(
        this.translateScore(i, n),
        o.externalTotal
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasExternalDofollow Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_linksHasExternals_score", 4);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Great! You are linking to external resources.", "rank-math") : s.__("No outbound links were found. Link out to external resources.", "rank-math");
  }
}
class m3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add internal links in your content.", "rank-math")).setTooltip(t.__("Internal links decrease your bounce rate and improve SEO.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("getLinkStats")(t.getText(), t.configs);
    return o.total === 0 || i.setScore(this.calculateScore(0 < o.internalTotal)).setText(
      n.sprintf(
        this.translateScore(i, n),
        o.internalTotal
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasInternal Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_linksHasInternal_score", 5);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("You are linking to other resources on your website which is great.", "rank-math") : s.__("We couldn't find any internal links in your content.", "rank-math");
  }
}
class y3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add DoFollow links pointing to external resources.", "rank-math")).setTooltip(t.__("PageRank Sculpting no longer works. Your posts should have a mix of nofollow and DoFollow links.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), o = s.getResearch("getLinkStats")(t.getText(), t.configs);
    return o.total === 0 ? (i.setText(n.__("Add DoFollow links pointing to external resources.", "rank-math")), i) : (i.setScore(this.calculateScore(0 < o.externalDofollow)).setText(
      n.sprintf(
        this.translateScore(i, n),
        o.externalTotal
      )
    ), i);
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasText();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasExternalDofollow Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_linksNotAllExternals_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("At least one external link with DoFollow found in your content.", "rank-math") : (
      /* Translators: placeholder is the number of links. */
      s.__("We found %1$d outbound links in your content and all of them are nofollow.", "rank-math")
    );
  }
}
class b3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Add a number to your title to improve CTR.", "rank-math")).setTooltip(t.__("Headlines with numbers are 36% more likely to generate clicks, according to research by Conductor.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = /\d+/.test(t.getTitle());
    return i.setScore(this.calculateScore(r)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasTitle();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasNumber Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_titleHasNumber_score", 1);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("You are using a number in your SEO title.", "rank-math") : s.__("Your SEO title doesn't contain a number.", "rank-math");
  }
}
var v3 = Le, D3 = Xt, w3 = Math.max;
function k3(e, t, s) {
  var n = e == null ? 0 : e.length;
  if (!n)
    return -1;
  var i = s == null ? 0 : D3(s);
  return i < 0 && (i = w3(n + i, 0)), v3(e, t, i);
}
var F3 = k3;
class A3 extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return this.hasPowerWords() ? new C().setMaxScore(this.getScore()).setEmpty(
      t.sprintf(
        /* Translators: placeholder is the words "power words" as a link to the corresponding KB article. */
        t.__("Add %s to your title to increase CTR.", "rank-math"),
        '<a href="https://rankmath.com/blog/power-words/" target="_blank">power words</a>'
      )
    ).setTooltip(t.__("Power Words are tried-and-true words that copywriters use to attract more clicks.", "rank-math")) : null;
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.getLower("title").split(" "), o = this.configs.assessor.powerWords.filter((c) => F3(r, c) >= 0), a = 0 < o.length;
    return i.setScore(this.calculateScore(a)).setText(
      n.sprintf(
        this.translateScore(i, n),
        o.length
      )
    ), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return this.hasPowerWords() && t.hasTitle();
  }
  /**
   * Is power words availablel for current site language.
   *
   * @return {boolean} True if available.
   */
  hasPowerWords() {
    return !ze(this.configs.assessor.powerWords);
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasPowerWords Title has power words or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_titleHasPowerWords_score", 1);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult}  analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? (
      /* Translators: placeholder is the number of power words. */
      s.__("Your title contains %1$d power word(s). Booyah!", "rank-math")
    ) : s.sprintf(
      /* Translators: placeholder is the words "power word" as a link to the corresponding KB article. */
      s.__("Your title doesn't contain a %1$s. Add at least one.", "rank-math"),
      '<a href="https://rankmath.com/blog/power-words/" target="_blank">power word</a>'
    );
  }
}
var C3 = function(e) {
  return e.toLowerCase().replace(/\n/g, " ").replace(/[.,\/#!?$%\^&\*;:{}=_`\"~()]/g, " ").replace(/\s\s+/g, " ").trim().split(" ");
};
function _3(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
const E3 = {
  "😂": 1,
  "❤": 3,
  "♥": 3,
  "😍": 3,
  "😭": -1,
  "😘": 3,
  "😊": 3,
  "👌": 2,
  "💕": 3,
  "👏": 2,
  "😁": 2,
  "☺": 3,
  "♡": 3,
  "👍": 2,
  "😩": -2,
  "🙏": 2,
  "✌": 2,
  "😏": 1,
  "😉": 2,
  "🙌": 2,
  "🙈": 2,
  "💪": 2,
  "😄": 2,
  "😒": -2,
  "💃": 3,
  "💖": 3,
  "😃": 2,
  "😔": -1,
  "🎉": 3,
  "😜": 2,
  "🌸": 3,
  "💜": 3,
  "💙": 3,
  "✨": 1,
  "💗": 3,
  "★": 1,
  "█": -1,
  "☀": 2,
  "😡": -1,
  "😎": 2,
  "💋": 3,
  "😋": 3,
  "🙊": 2,
  "😴": -1,
  "🎶": 2,
  "💞": 3,
  "😌": 2,
  "🔫": -1,
  "💛": 3,
  "💁": 1,
  "💚": 3,
  "♫": 1,
  "😞": -1,
  "😆": 2,
  "😝": 2,
  "😪": -1,
  "😫": -1,
  "👊": 1,
  "💀": -2,
  "😀": 2,
  "😚": 3,
  "😻": 3,
  "💘": 3,
  "☕": 1,
  "👋": 2,
  "🎊": 3,
  "🍕": 2,
  "❄": 2,
  "😕": -2,
  "💔": -1,
  "😤": -2,
  "😈": 1,
  "✈": 2,
  "🔝": 2,
  "😰": -1,
  "⚽": 3,
  "😑": -2,
  "👑": 3,
  "👉": 1,
  "🍃": 1,
  "🎁": 3,
  "😠": -2,
  "🐧": 2,
  "☆": 2,
  "🍀": 1,
  "🎈": 3,
  "🎅": 1,
  "😓": -1,
  "😣": -2,
  "😐": -2,
  "✊": 2,
  "😨": -1,
  "😖": -1,
  "💤": 1,
  "💓": 3,
  "👎": -1,
  "💦": 2,
  "✔": 1,
  "😷": -1,
  "🙋": 2,
  "🎄": 2,
  "💩": -1,
  "🎵": 2,
  "😛": 3,
  "👯": 2,
  "💎": 2,
  "🌿": 1,
  "🎂": 3,
  "🌟": 1,
  "🔮": 1,
  "👫": 1,
  "🏆": 3,
  "✖": 1,
  "☝": 1,
  "😙": 3,
  "⛄": 2,
  "👅": 2,
  "♪": 2,
  "🍂": 2,
  "💏": 1,
  "🌴": 2,
  "👈": 2,
  "🌹": 3,
  "🙆": 2,
  "👻": 1,
  "💰": 1,
  "🍻": 2,
  "🙅": -2,
  "🌞": 2,
  "🍁": 2,
  "⭐": 2,
  "▪": 1,
  "🎀": 3,
  "🐷": 1,
  "🙉": 1,
  "🌺": 2,
  "💅": 1,
  "🐶": 2,
  "🌚": 2,
  "👽": 1,
  "🎤": 2,
  "👭": 2,
  "🎧": 2,
  "👆": 1,
  "🍸": 2,
  "🍷": 2,
  "®": 1,
  "🍉": 3,
  "😇": 3,
  "🏃": 2,
  "😿": -2,
  "│": 1,
  "🍺": 2,
  "▶": 1,
  "😲": -1,
  "🎸": 2,
  "🍹": 3,
  "💫": 2,
  "📚": 1,
  "😶": -1,
  "🌷": 2,
  "💝": 3,
  "💨": 1,
  "🏈": 2,
  "💍": 2,
  "☔": 1,
  "👸": 3,
  "🇪": 3,
  "░": -1,
  "🍩": 1,
  "👾": 1,
  "☁": 1,
  "🌻": 2,
  "↿": 3,
  "🐯": 2,
  "👼": 1,
  "🍔": 1,
  "😸": 2,
  "👶": 2,
  "↾": 3,
  "💐": 3,
  "🌊": 2,
  "🍦": 2,
  "🍓": 3,
  "👇": 1,
  "💆": 1,
  "🍴": 2,
  "😧": -1,
  "🇸": 2,
  "😮": 1,
  "🚫": -3,
  "😽": 2,
  "🌈": 2,
  "🙀": 1,
  "⚠": -1,
  "🎮": 2,
  "╯": -1,
  "🍆": 2,
  "🍰": 2,
  "✓": 1,
  "👐": -1,
  "🍟": 1,
  "🍌": 2,
  "💑": 3,
  "👬": -1,
  "🐣": 2,
  "🎃": 3,
  "▬": 2,
  "￼": -3,
  "🐾": 3,
  "🎓": 2,
  "🏊": 2,
  "📷": 2,
  "👄": 2,
  "🌼": 4,
  "🚶": -1,
  "🐱": 2,
  "🐸": -1,
  "🇺": 2,
  "👿": -3,
  "🚬": 2,
  "✿": 1,
  "🐒": 2,
  "🌍": 3,
  "┊": 5,
  "🐥": 3,
  "🐼": 1,
  "🎥": 1,
  "💄": 2,
  "⛔": 2,
  "🏀": 1,
  "💉": 1,
  "💟": 3,
  "🚗": 1,
  "📝": 1,
  "♦": 2,
  "💭": 1,
  "🌙": 3,
  "🐟": 3,
  "👣": 1,
  "✂": -3,
  "🗿": 2,
  "👪": -1,
  "🍭": 1,
  "🌃": 2,
  "❌": 1,
  "🐰": 3,
  "💊": 2,
  "🚨": 3,
  "😦": -2,
  "🍪": 1,
  "🍣": -2,
  "✧": 1,
  "🎆": 3,
  "🎎": 4,
  "🇩": 3,
  "✅": 2,
  "📱": 1,
  "🙍": -2,
  "🍑": 1,
  "🎼": 1,
  "🔊": 2,
  "🌌": 2,
  "🍎": 1,
  "🐻": 2,
  "╰": -1,
  "💇": 1,
  "♬": 1,
  "🔴": 2,
  "🍱": -2,
  "🍊": 2,
  "🍒": 1,
  "🐭": 3,
  "👟": 2,
  "🌎": 1,
  "🍍": 2,
  "🐮": 3,
  "📲": 1,
  "☼": 1,
  "🌅": 1,
  "🇷": 3,
  "👠": 1,
  "🌽": 2,
  "💧": -1,
  "🍬": 1,
  "😺": 2,
  "🚀": 2,
  "¦": 3,
  "💢": 1,
  "🎬": 1,
  "🍧": 1,
  "🍜": 2,
  "🐏": 3,
  "🏄": 2,
  "➤": 1,
  "⬆": 1,
  "🍋": 1,
  "🆗": 2,
  "⚪": 2,
  "📺": 2,
  "🍅": 1,
  "⛅": 2,
  "🐢": 1,
  "👙": 2,
  "🏡": 2,
  "🌾": 2,
  "◉": 1,
  "✏": 1,
  "🐬": 2,
  "🇹": 3,
  "♣": 1,
  "🐝": 1,
  "🌝": 1,
  "🇮": 3,
  "🔋": -3,
  "🐍": 1,
  "♔": 2,
  "🔵": 1,
  "😾": -2,
  "🌕": 3,
  "🐨": 2,
  "🔐": 1,
  "💿": 3,
  "🌳": 2,
  "👰": 2,
  "❀": 2,
  "⚓": 3,
  "🚴": 3,
  "▀": -1,
  "👗": 1,
  "➕": 2,
  "💬": 2,
  "▒": -1,
  "🔜": 1,
  "🍨": 1,
  "💲": 1,
  "🍙": 1,
  "🍥": -4,
  "▸": 1,
  "♛": 1,
  "😼": 1,
  "🐙": 2,
  "👨": 2,
  "🍚": 2,
  "♨": 4,
  "🎹": 1,
  "♕": 2,
  "▃": 5,
  "🇬": 1,
  "🇧": 1,
  "☠": -1,
  "🐠": 2,
  "🚹": 3,
  "💵": 2,
  "✰": 4,
  "╠": 1,
  "👛": 2,
  "🌱": 3,
  "💻": 1,
  "🌏": 1,
  "▄": -1,
  "👓": 1,
  "◄": 1,
  "⚾": -1,
  "🌲": 2,
  "👴": 1,
  "🏠": 2,
  "🍇": 1,
  "🍘": 2,
  "🐇": 1,
  "🔞": -1,
  "👵": 2,
  "◀": 1,
  "🔙": 1,
  "🌵": 1,
  "🍮": -1,
  "🎇": 3,
  "🐎": 2,
  "➔": -1,
  "🐤": 2,
  "╩": 1,
  "🌑": 2,
  "🚲": 2,
  "🐑": -1,
  "🏁": 2,
  "🎾": 3,
  "╚": 1,
  "🈹": 1,
  "👮": -2,
  "☹": -3,
  "🐵": 2,
  "✪": 1,
  "◕": 2,
  "🗼": 3,
  "▐": -1,
  "♠": 1,
  "┳": -2,
  "👺": -2,
  "🐚": 1,
  "👂": -1,
  "🗽": 1,
  "🍵": 2,
  "🆒": 2,
  "🐺": 1,
  "⇨": 2,
  "🌓": 3,
  "🔒": 1,
  "╬": -1,
  "👳": 3,
  "🌂": 1,
  "🚌": 1,
  "♩": 3,
  "🍡": -1,
  "❥": 1,
  "🎡": 1,
  "💌": 2,
  "🐩": 2,
  "🌜": 2,
  "⌚": 1,
  "🚿": 3,
  "🔆": 3,
  "🌛": 3,
  "💂": -1,
  "🐔": 1,
  "🙎": -1,
  "🏩": 2,
  "🇫": 2,
  "🔨": -1,
  "📢": 2,
  "🐦": 2,
  "🐲": -1,
  "♻": 2,
  "🌘": 3,
  "🌔": 3,
  "👖": 2,
  "😗": 3,
  "🐄": 1,
  "◟": -1,
  "🍢": -1,
  "🎨": 1,
  "⬇": 2,
  "🚼": 3,
  "🇴": 2,
  "🌗": 3,
  "🌖": 3,
  "🔅": 5,
  "👜": 1,
  "🐌": 3,
  "💼": 3,
  "🐹": 1,
  "🌠": 3,
  "🐈": 1,
  "🌁": 1,
  "⚫": 1,
  "♧": 2,
  "🏰": 1,
  "🚵": 2,
  "🎢": 2,
  "🎷": 3,
  "🎐": 1,
  "┈": -4,
  "╗": 2,
  "🌇": 3,
  "⏰": 2,
  "🚂": 1,
  "◠": 2,
  "🎿": 2,
  "🆔": 4,
  "🌒": 3,
  "🐪": 3,
  "╔": 1,
  "╝": 2,
  "👔": 2,
  "🆓": 1,
  "🐋": 1,
  "▽": 2,
  "🐛": 1,
  "👕": 2,
  "💳": 2,
  "🏧": 5,
  "💡": 3,
  "⬅": 2,
  "🐫": 2,
  "🇱": 2,
  "📹": 2,
  "👞": 2,
  "👚": 3,
  "□": -2,
  "🚣": 3,
  "🏉": 3,
  "🗻": 3,
  "╦": 2,
  "⛺": 3,
  "🐕": 1,
  "🏂": 2,
  "👡": 2,
  "📻": 2,
  "✒": 1,
  "🌰": 3,
  "🏢": 1,
  "🎒": 3,
  "⌒": 3,
  "🏫": -2,
  "📴": 4,
  "🚢": 1,
  "🚚": -1,
  "🐉": 1,
  "❒": 1,
  "🔔": 5,
  "◢": 4,
  "🏥": 1,
  "🚖": -1,
  "▌": -2,
  "☛": 2,
  "💒": 3,
  "🚤": 2,
  "🐐": 2,
  "■": -2,
  "🔚": 2,
  "🎻": 2,
  "🔷": 1,
  "🎽": 2,
  "📅": 1,
  "🎺": 3,
  "🍈": -3,
  "✉": 1,
  "◤": 5,
  "○": 3,
  "🍼": 3,
  "🚛": -2,
  "📓": 1,
  "☉": 1,
  "💴": -2,
  "➰": -1,
  "🔌": -1,
  "📕": 1,
  "📣": 2,
  "🚓": 1,
  "🐗": 3,
  "⛳": 4,
  "┻": -3,
  "┛": 3,
  "┃": 2,
  "💺": 1,
  "🏇": -1,
  "☻": 1,
  "📞": 2,
  "Ⓐ": -1,
  "🌉": 3,
  "🚩": -2,
  "✎": 3,
  "📃": 2,
  "🏨": 1,
  "📌": -3,
  "♎": -1,
  "💷": 2,
  "🚄": 3,
  "▲": 3,
  "⛵": 3,
  "🔸": 1,
  "🚜": 5,
  "🐆": 2,
  "👒": 1,
  "❕": 1,
  "🔛": 2,
  "♢": 2,
  "🇲": 2,
  "❅": 4,
  "👝": 2,
  "✞": 2,
  "◡": 1,
  "🎋": 3,
  "👥": 1,
  "🐡": 1,
  "◆": 4,
  "🔭": 2,
  "🎪": 1,
  "🐜": 3,
  "♌": 4,
  "☐": -5,
  "👷": 1,
  "🔈": 1,
  "📄": 5,
  "🚐": 4,
  "🌋": 3,
  "📡": 1,
  "🚳": 5,
  "✘": 4,
  "🅰": 1,
  "🇼": 2,
  "┓": 3,
  "┣": 3,
  "Ⓛ": 2,
  "Ⓔ": 2,
  "👤": 4,
  "🚁": 1,
  "🎠": 3,
  "🐁": -2,
  "📗": 1,
  "┐": -1,
  "♂": 1,
  "📯": -1,
  "🔩": 1,
  "👢": 4,
  "◂": 2,
  "📰": 1,
  "📶": 2,
  "🌄": 1,
  "🗾": 2,
  "🔶": 2,
  "🏤": 2,
  "🎩": 2,
  "Ⓜ": 1,
  "🔧": -4,
  "🐅": 1,
  "♮": 1,
  "🅾": -1,
  "📦": 1,
  "🚊": 1,
  "🔲": 3,
  "△": 1,
  "📆": 5,
  "❛": 2,
  "📉": 2,
  "▵": 2,
  "🔎": 3,
  "☜": 1,
  "🇯": 2,
  "🇵": 2,
  "📘": 1,
  "ⓔ": 3,
  "🔑": 1,
  "⭕": 2,
  "🔘": 1,
  "🚭": 5,
  "🚉": 3,
  "🚪": 3,
  "➳": 2,
  "🚃": 3,
  "┯": -3,
  "🆙": 2,
  "🆖": 1,
  "┗": 5,
  "Ⓞ": 2,
  "❇": 3,
  "✴": 3,
  "☊": 5,
  "🔕": -2,
  "⬛": -2,
  "🚞": 3,
  "🍶": 3,
  "🌐": 3,
  "♀": 1,
  "🚅": 3,
  "🚒": -2,
  "♋": 1,
  "♍": 3,
  "🕝": -2,
  "ⓐ": 5,
  "📙": 1,
  "Ⓢ": 1,
  "📋": 3,
  "🎱": 1,
  "🐞": 1,
  "🔺": 1,
  "ⓡ": 5,
  "♤": 3,
  "🎯": 3,
  "🔉": 3,
  "↩": 5,
  "🚾": 1,
  "🎣": -4,
  "🔣": 1,
  "❎": -5,
  "➥": 1,
  "🎌": 5,
  "◣": 1,
  "⏬": 5,
  "♭": 1,
  "ⓞ": 5,
  "🔳": 2,
  "🏭": 2,
  "🎳": -3,
  "☚": 5,
  "➽": 2,
  "➫": 2,
  "➖": -5,
  "꒰": 2,
  "꒱": 2,
  "◝": -3,
  "📑": 5,
  "ⓧ": 5,
  "🔟": 5,
  "〓": 5,
  "ⓜ": 2,
  "➠": 5,
  "🚆": 2,
  "℅": -5,
  "☃": 2,
  "🚽": 5,
  "ⓝ": 5,
  "⇦": 5,
  "👲": 2,
  "🚡": -3,
  "🔬": 5,
  "➗": -3,
  "📈": 2,
  "⏪": 2,
  "◎": 5,
  "꒦": -5,
  "📎": 5,
  "⑅": 5,
  "✭": 5,
  "♓": 2,
  "┏": 5,
  "☇": 5,
  "࿎": -5,
  "👘": 5,
  "↙": 5,
  "Ⓕ": 2,
  "Ⓦ": 2,
  "Ⓟ": 2,
  "🕑": 2,
  "🕛": 5,
  "♈": -5,
  "↬": 5,
  "✍": 5,
  "🏦": 5,
  "🔻": 5,
  "ⓟ": 5,
  "ⓕ": 5,
  "ⓘ": 5,
  "♿": 5,
  "⇗": 5,
  "⇘": 5,
  "ⓨ": 5,
  "ⓙ": 5,
  "▫": 5,
  "🔇": 5,
  "⌃": -5,
  "🔖": 5,
  "📜": 5,
  "🚝": 5,
  "┘": -5,
  "✝": -5,
  "⍣": -5,
  "📮": -5,
  "🕕": -5,
  "🔯": 5,
  "➸": 5,
  "꒵": 5,
  "🕥": -5,
  "✽": 5,
  "📼": 5,
  "🕐": -5,
  "🀄": 5,
  "✬": 5,
  "✫": 5,
  "🕔": -5,
  "❣": 5,
  "📫": 5,
  "🉐": 5,
  "🈂": -5,
  "🎰": -5,
  "҂": -5,
  "╤": -5,
  "📔": 5
}, x3 = -2, S3 = -2, $3 = -2, B3 = -2, z3 = -2, T3 = -2, R3 = -3, P3 = -3, j3 = -3, I3 = -3, O3 = 2, L3 = 2, M3 = 1, q3 = -1, N3 = -1, K3 = -1, W3 = -1, U3 = 2, H3 = 2, G3 = 2, V3 = 2, Y3 = 1, Z3 = -3, J3 = -3, X3 = -3, Q3 = -3, ev = -3, tv = 1, sv = 1, nv = 1, iv = 1, rv = 1, ov = 1, av = 1, cv = -2, uv = -2, lv = -2, dv = -2, pv = 2, gv = 2, hv = 2, fv = 2, mv = 2, yv = 2, bv = 2, vv = 2, Dv = -2, wv = -2, kv = -2, Fv = -2, Av = -2, Cv = -2, _v = -2, Ev = 1, xv = -2, Sv = 2, $v = 2, Bv = 2, zv = 2, Tv = -3, Rv = 1, Pv = 1, jv = 3, Iv = 3, Ov = 3, Lv = 3, Mv = -1, qv = -1, Nv = -1, Kv = -2, Wv = -2, Uv = 1, Hv = 1, Gv = 3, Vv = 3, Yv = 3, Zv = 3, Jv = 3, Xv = 3, Qv = 3, e0 = 1, t0 = 2, s0 = 2, n0 = 2, i0 = 2, r0 = 2, o0 = 2, a0 = 2, c0 = -1, u0 = 1, l0 = -1, d0 = 3, p0 = 3, g0 = 3, h0 = -1, f0 = 2, m0 = -1, y0 = 2, b0 = -2, v0 = -2, D0 = -2, w0 = -2, k0 = -2, F0 = -2, A0 = -2, C0 = -2, _0 = -2, E0 = -2, x0 = 2, S0 = -3, $0 = -3, B0 = -3, z0 = -3, T0 = -3, R0 = -3, P0 = -3, j0 = -3, I0 = 1, O0 = 2, L0 = 1, M0 = 1, q0 = 1, N0 = -2, K0 = -2, W0 = -2, U0 = -2, H0 = -1, G0 = -1, V0 = -2, Y0 = 1, Z0 = -2, J0 = -2, X0 = -2, Q0 = 1, eD = 2, tD = -2, sD = 2, nD = 2, iD = 2, rD = 2, oD = 4, aD = 2, cD = -1, uD = 2, lD = 3, dD = 3, pD = 3, gD = 3, hD = -3, fD = -3, mD = -3, yD = -3, bD = -3, vD = -3, DD = -2, wD = -2, kD = -2, FD = -2, AD = -2, CD = -2, _D = -2, ED = -1, xD = 1, SD = -2, $D = -2, BD = -3, zD = -3, TD = -3, RD = -2, PD = -1, jD = -1, ID = -1, OD = -1, LD = -1, MD = -1, qD = -1, ND = -1, KD = -1, WD = -2, UD = -2, HD = 2, GD = 2, VD = 2, YD = 2, ZD = 2, JD = 2, XD = 2, QD = 2, ew = 2, tw = 2, sw = 2, nw = 2, iw = 2, rw = 2, ow = 2, aw = -2, cw = 2, uw = 2, lw = 2, dw = 2, pw = 2, gw = 1, hw = -2, fw = -3, mw = -2, yw = -2, bw = -4, vw = -2, Dw = -2, ww = -4, kw = -3, Fw = -3, Aw = -2, Cw = -2, _w = 2, Ew = 2, xw = -4, Sw = -4, $w = 2, Bw = 3, zw = 3, Tw = 3, Rw = 3, Pw = 3, jw = -3, Iw = -3, Ow = -1, Lw = -1, Mw = -1, qw = -1, Nw = 1, Kw = 1, Ww = 2, Uw = 2, Hw = 2, Gw = 2, Vw = 2, Yw = 2, Zw = 1, Jw = 3, Xw = 1, Qw = 1, ek = -2, tk = -2, sk = -2, nk = -2, ik = -2, rk = -2, ok = -1, ak = -1, ck = -1, uk = 2, lk = -1, dk = -1, pk = -1, gk = -1, hk = -1, fk = 3, mk = 3, yk = 3, bk = 4, vk = -3, Dk = -2, wk = -1, kk = -1, Fk = 1, Ak = 2, Ck = 1, _k = -3, Ek = -3, xk = -3, Sk = -3, $k = -2, Bk = 1, zk = -2, Tk = -2, Rk = -2, Pk = -2, jk = -1, Ik = -3, Ok = -3, Lk = -3, Mk = -2, qk = -2, Nk = -2, Kk = -2, Wk = 2, Uk = -2, Hk = -5, Gk = -5, Vk = -1, Yk = -1, Zk = -1, Jk = -2, Xk = -2, Qk = 3, e4 = -1, t4 = 3, s4 = 3, n4 = 3, i4 = 3, r4 = 3, o4 = 2, a4 = 2, c4 = -2, u4 = -2, l4 = 3, d4 = 2, p4 = 2, g4 = 2, h4 = 2, f4 = 2, m4 = 2, y4 = 3, b4 = -2, v4 = -2, D4 = -2, w4 = -2, k4 = 3, F4 = -3, A4 = -3, C4 = -3, _4 = -3, E4 = -3, x4 = 2, S4 = -1, $4 = -2, B4 = 1, z4 = -5, T4 = -5, R4 = -2, P4 = -2, j4 = -2, I4 = -2, O4 = -3, L4 = -3, M4 = -3, q4 = -3, N4 = -2, K4 = -2, W4 = -2, U4 = -2, H4 = -2, G4 = 2, V4 = 2, Y4 = 3, Z4 = 3, J4 = -1, X4 = 3, Q4 = 3, e5 = 2, t5 = -1, s5 = -1, n5 = -2, i5 = 3, r5 = -1, o5 = -1, a5 = -1, c5 = -3, u5 = -2, l5 = -2, d5 = 2, p5 = 2, g5 = -1, h5 = 1, f5 = 1, m5 = 1, y5 = 1, b5 = -2, v5 = -2, D5 = -3, w5 = -2, k5 = -2, F5 = -2, A5 = -2, C5 = -2, _5 = -2, E5 = -2, x5 = -2, S5 = -3, $5 = 2, B5 = 2, z5 = 2, T5 = 3, R5 = -2, P5 = -2, j5 = -2, I5 = -2, O5 = 3, L5 = 5, M5 = -3, q5 = -3, N5 = -3, K5 = -3, W5 = 1, U5 = 2, H5 = 1, G5 = 4, V5 = 3, Y5 = 3, Z5 = 2, J5 = -1, X5 = -1, Q5 = -2, eF = -3, tF = -3, sF = -2, nF = -4, iF = -2, rF = -2, oF = -2, aF = 2, cF = -2, uF = -2, lF = -2, dF = -2, pF = -2, gF = -2, hF = 2, fF = 2, mF = 2, yF = 2, bF = -1, vF = -1, DF = -1, wF = -1, kF = -1, FF = 1, AF = 1, CF = 1, _F = 3, EF = 2, xF = 1, SF = 2, $F = 2, BF = 2, zF = -2, TF = 2, RF = 2, PF = -2, jF = -3, IF = -4, OF = -1, LF = 3, MF = 3, qF = 3, NF = 3, KF = 3, WF = 3, UF = -2, HF = -2, GF = -2, VF = 1, YF = -2, ZF = -2, JF = -1, XF = 2, QF = 2, eA = 2, tA = 2, sA = 2, nA = -2, iA = -2, rA = -3, oA = -2, aA = 2, cA = 2, uA = 3, lA = 3, dA = 3, pA = -3, gA = -3, hA = -3, fA = -3, mA = -3, yA = -3, bA = -3, vA = -3, DA = -3, wA = -3, kA = -3, FA = 2, AA = 2, CA = 2, _A = 2, EA = 2, xA = -2, SA = 2, $A = 3, BA = 2, zA = 2, TA = 2, RA = 2, PA = 2, jA = -3, IA = -3, OA = -3, LA = -3, MA = -2, qA = -1, NA = -2, KA = -2, WA = -2, UA = -2, HA = 2, GA = 2, VA = -2, YA = 3, ZA = 2, JA = 2, XA = 1, QA = 1, eC = 1, tC = 1, sC = 2, nC = -1, iC = -2, rC = -5, oC = -5, aC = -5, cC = -2, uC = -2, lC = -2, dC = -2, pC = -2, gC = -2, hC = -2, fC = -1, mC = -1, yC = -1, bC = -2, vC = -2, DC = -3, wC = -1, kC = -1, FC = 1, AC = 2, CC = 2, _C = 2, EC = 2, xC = 2, SC = 1, $C = 2, BC = 2, zC = 1, TC = 2, RC = 1, PC = 1, jC = 1, IC = 2, OC = 2, LC = 1, MC = 1, qC = 2, NC = 2, KC = -2, WC = -2, UC = -2, HC = -2, GC = -2, VC = -2, YC = -2, ZC = -2, JC = 2, XC = 2, QC = 2, e_ = 2, t_ = -2, s_ = 2, n_ = 2, i_ = 2, r_ = 2, o_ = -2, a_ = -2, c_ = -2, u_ = -2, l_ = 2, d_ = 2, p_ = 2, g_ = -2, h_ = -2, f_ = -2, m_ = -2, y_ = -2, b_ = -2, v_ = -2, D_ = 2, w_ = 2, k_ = 2, F_ = 2, A_ = 2, C_ = 2, __ = 2, E_ = -3, x_ = -2, S_ = -2, $_ = -2, B_ = -2, z_ = -1, T_ = -2, R_ = -2, P_ = -2, j_ = -2, I_ = -2, O_ = -2, L_ = -2, M_ = -2, q_ = -2, N_ = -2, K_ = -2, W_ = -2, U_ = -1, H_ = -1, G_ = -1, V_ = -2, Y_ = -2, Z_ = -2, J_ = -2, X_ = -2, Q_ = -2, eE = -2, tE = 1, sE = 1, nE = 1, iE = 2, rE = 1, oE = -2, aE = -1, cE = -3, uE = -3, lE = -3, dE = -3, pE = -3, gE = -2, hE = 2, fE = 2, mE = 2, yE = 2, bE = 2, vE = 2, DE = -2, wE = -2, kE = 2, FE = -1, AE = -3, CE = -3, _E = -2, EE = -2, xE = -2, SE = -2, $E = 2, BE = -2, zE = -2, TE = -2, RE = -3, PE = -3, jE = -3, IE = -3, OE = -3, LE = -3, ME = -3, qE = -3, NE = -2, KE = -2, WE = -2, UE = -2, HE = -2, GE = -2, VE = -2, YE = -2, ZE = -2, JE = -2, XE = -2, QE = -2, ex = -1, tx = -1, sx = -3, nx = -3, ix = -1, rx = -2, ox = -1, ax = -1, cx = -1, ux = -2, lx = 2, dx = -5, px = 1, gx = -1, hx = -1, fx = -2, mx = -2, yx = 2, bx = -1, vx = -1, Dx = -2, wx = -2, kx = -2, Fx = -3, Ax = -3, Cx = -3, _x = -3, Ex = -2, xx = -4, Sx = -4, $x = -2, Bx = -2, zx = -2, Tx = 2, Rx = 2, Px = -2, jx = -1, Ix = 2, Ox = 3, Lx = -3, Mx = -2, qx = -2, Nx = -3, Kx = -1, Wx = 2, Ux = 3, Hx = -2, Gx = -2, Vx = 2, Yx = -2, Zx = -3, Jx = -3, Xx = -3, Qx = -3, eS = -3, tS = -3, sS = -3, nS = -3, iS = 1, rS = 2, oS = 2, aS = -2, cS = -2, uS = -3, lS = -3, dS = -3, pS = 2, gS = 2, hS = -2, fS = -1, mS = -1, yS = -1, bS = -2, vS = -2, DS = -2, wS = -2, kS = -2, FS = -2, AS = -2, CS = -3, _S = -3, ES = 2, xS = -2, SS = -2, $S = -2, BS = -2, zS = -2, TS = -2, RS = -2, PS = -2, jS = -2, IS = -2, OS = -2, LS = -2, MS = -1, qS = -1, NS = 3, KS = 3, WS = 3, US = 3, HS = 3, GS = 3, VS = 3, YS = 3, ZS = -1, JS = -1, XS = -1, QS = -1, e$ = -1, t$ = -2, s$ = -2, n$ = -2, i$ = -2, r$ = -2, o$ = -2, a$ = -2, c$ = -2, u$ = -2, l$ = -2, d$ = -2, p$ = -2, g$ = -2, h$ = -2, f$ = -2, m$ = -3, y$ = -3, b$ = -3, v$ = -3, D$ = -2, w$ = -2, k$ = -2, F$ = -2, A$ = -2, C$ = -2, _$ = -2, E$ = -2, x$ = -3, S$ = -2, $$ = -2, B$ = -2, z$ = -2, T$ = -2, R$ = -2, P$ = -2, j$ = -2, I$ = -2, O$ = 2, L$ = 1, M$ = 2, q$ = 2, N$ = -3, K$ = -3, W$ = -3, U$ = -3, H$ = -3, G$ = -3, V$ = -3, Y$ = -3, Z$ = -3, J$ = -3, X$ = -3, Q$ = -3, e7 = -1, t7 = -2, s7 = -2, n7 = -2, i7 = -2, r7 = -2, o7 = -2, a7 = -2, c7 = 2, u7 = -2, l7 = -1, d7 = -1, p7 = -1, g7 = -2, h7 = -2, f7 = -2, m7 = -2, y7 = -2, b7 = 3, v7 = 2, D7 = 2, w7 = 1, k7 = -4, F7 = -4, A7 = -3, C7 = -3, _7 = -1, E7 = -2, x7 = 2, S7 = -1, $7 = 2, B7 = -3, z7 = -3, T7 = -3, R7 = -2, P7 = -2, j7 = -2, I7 = -2, O7 = -2, L7 = -2, M7 = -1, q7 = -2, N7 = -2, K7 = -2, W7 = -2, U7 = -2, H7 = -1, G7 = -1, V7 = -1, Y7 = -2, Z7 = -2, J7 = -2, X7 = -2, Q7 = -2, e9 = -2, t9 = -2, s9 = -2, n9 = -2, i9 = -2, r9 = -2, o9 = -2, a9 = -2, c9 = -2, u9 = -3, l9 = -2, d9 = -1, p9 = -1, g9 = -1, h9 = -1, f9 = 2, m9 = -2, y9 = -2, b9 = -2, v9 = -2, D9 = -2, w9 = -1, k9 = -2, F9 = -2, A9 = -2, C9 = -2, _9 = -2, E9 = -2, x9 = -2, S9 = -2, $9 = -1, B9 = -1, z9 = -2, T9 = -2, R9 = -1, P9 = -1, j9 = -1, I9 = -1, O9 = -3, L9 = -3, M9 = -3, q9 = -3, N9 = -2, K9 = -2, W9 = -2, U9 = -2, H9 = -2, G9 = -2, V9 = -2, Y9 = -2, Z9 = -2, J9 = -2, X9 = -2, Q9 = -2, eB = -2, tB = -2, sB = -2, nB = -2, iB = -2, rB = -2, oB = -2, aB = -2, cB = -2, uB = -2, lB = -2, dB = -2, pB = -2, gB = -2, hB = -2, fB = -2, mB = -2, yB = -2, bB = -2, vB = -2, DB = -2, wB = -2, kB = -2, FB = -2, AB = -2, CB = -2, _B = -2, EB = -2, xB = -2, SB = -2, $B = -2, BB = 2, zB = -2, TB = -2, RB = -2, PB = -2, jB = -2, IB = -2, OB = -2, LB = -2, MB = -2, qB = -2, NB = -2, KB = -2, WB = -3, UB = -3, HB = -2, GB = -2, VB = -2, YB = -2, ZB = -2, JB = -1, XB = -1, QB = -2, e6 = -2, t6 = -2, s6 = 2, n6 = 2, i6 = 2, r6 = 2, o6 = 2, a6 = -2, c6 = -2, u6 = -1, l6 = -1, d6 = -1, p6 = -1, g6 = -1, h6 = -3, f6 = -3, m6 = -2, y6 = -2, b6 = -2, v6 = -2, D6 = -2, w6 = -1, k6 = -1, F6 = -1, A6 = -2, C6 = -2, _6 = -2, E6 = -3, x6 = -2, S6 = 1, $6 = 1, B6 = -2, z6 = -2, T6 = -1, R6 = -1, P6 = -2, j6 = -2, I6 = -2, O6 = -2, L6 = -2, M6 = -2, q6 = -2, N6 = -2, K6 = -3, W6 = -3, U6 = -1, H6 = -2, G6 = -1, V6 = -2, Y6 = -2, Z6 = -2, J6 = 2, X6 = -3, Q6 = -2, ez = 2, tz = 2, sz = 2, nz = 1, iz = 4, rz = -2, oz = -2, az = 2, cz = 2, uz = 2, lz = 2, dz = 3, pz = 3, gz = 2, hz = 2, fz = -2, mz = -2, yz = -2, bz = -2, vz = -2, Dz = -3, wz = -2, kz = 1, Fz = -2, Az = 2, Cz = 2, _z = 2, Ez = -1, xz = -1, Sz = 2, $z = 2, Bz = 2, zz = 2, Tz = 2, Rz = 2, Pz = 2, jz = 2, Iz = 2, Oz = 2, Lz = -2, Mz = -2, qz = 2, Nz = 1, Kz = 1, Wz = 1, Uz = 3, Hz = 2, Gz = 2, Vz = 2, Yz = 2, Zz = 2, Jz = 2, Xz = 2, Qz = 2, eT = 2, tT = -2, sT = -2, nT = -2, iT = -2, rT = -2, oT = 3, aT = -2, cT = -2, uT = -2, lT = 1, dT = 1, pT = 1, gT = 2, hT = 3, fT = 3, mT = 1, yT = 2, bT = -1, vT = -2, DT = -1, wT = -1, kT = -2, FT = -2, AT = -2, CT = -1, _T = -1, ET = 2, xT = 2, ST = 2, $T = 3, BT = 4, zT = -1, TT = -1, RT = -1, PT = -1, jT = -1, IT = 2, OT = 2, LT = -3, MT = -1, qT = -3, NT = -2, KT = -2, WT = -2, UT = -2, HT = -2, GT = -2, VT = -2, YT = -2, ZT = -2, JT = -2, XT = -2, QT = -2, e8 = 3, t8 = 3, s8 = 3, n8 = 3, i8 = 3, r8 = 3, o8 = -1, a8 = -2, c8 = -1, u8 = 2, l8 = -1, d8 = -1, p8 = -1, g8 = -2, h8 = 3, f8 = 3, m8 = 3, y8 = 2, b8 = 2, v8 = 2, D8 = 2, w8 = 1, k8 = 1, F8 = -2, A8 = -2, C8 = -2, _8 = -2, E8 = 2, x8 = -2, S8 = -2, $8 = -2, B8 = -2, z8 = 1, T8 = 1, R8 = -1, P8 = -1, j8 = -1, I8 = -1, O8 = 3, L8 = 1, M8 = -2, q8 = -2, N8 = 4, K8 = 3, W8 = 3, U8 = 4, H8 = 4, G8 = -2, V8 = -3, Y8 = -3, Z8 = -3, J8 = -2, X8 = -2, Q8 = -2, eR = -2, tR = -2, sR = -2, nR = -2, iR = 2, rR = 2, oR = 1, aR = 3, cR = -3, uR = -3, lR = -3, dR = -3, pR = -2, gR = -1, hR = -2, fR = -3, mR = -3, yR = 1, bR = -2, vR = 2, DR = 3, wR = 4, kR = -1, FR = 3, AR = 3, CR = 3, _R = 3, ER = 3, xR = -2, SR = -2, $R = -3, BR = -3, zR = -3, TR = -2, RR = -2, PR = -2, jR = -2, IR = 2, OR = 2, LR = 2, MR = 2, qR = 2, NR = 2, KR = 2, WR = 2, UR = 2, HR = 2, GR = 2, VR = 2, YR = 2, ZR = 2, JR = 2, XR = 2, QR = -2, eP = -2, tP = -2, sP = -2, nP = 2, iP = 2, rP = -2, oP = -2, aP = 1, cP = -3, uP = -3, lP = 2, dP = 2, pP = 2, gP = 2, hP = -2, fP = -3, mP = -2, yP = -1, bP = -2, vP = 2, DP = -2, wP = 3, kP = -2, FP = -2, AP = -2, CP = 1, _P = 1, EP = -2, xP = -2, SP = 2, $P = -2, BP = -3, zP = 2, TP = 2, RP = -2, PP = -1, jP = -2, IP = -2, OP = -2, LP = -2, MP = 2, qP = 2, NP = 2, KP = -2, WP = -2, UP = -2, HP = -1, GP = -2, VP = -2, YP = -1, ZP = -2, JP = -2, XP = 1, QP = -1, ej = -2, tj = -1, sj = 1, nj = 1, ij = -1, rj = -1, oj = 2, aj = 2, cj = 2, uj = -3, lj = -1, dj = -4, pj = -4, gj = -4, hj = -4, fj = -4, mj = -4, yj = -2, bj = 1, vj = 2, Dj = 2, wj = -3, kj = 1, Fj = 1, Aj = 2, Cj = 2, _j = 2, Ej = -2, xj = -2, Sj = -3, $j = -2, Bj = 2, zj = -1, Tj = -2, Rj = -2, Pj = -2, jj = -2, Ij = -2, Oj = -2, Lj = 3, Mj = -4, qj = -4, Nj = -4, Kj = -4, Wj = -4, Uj = -4, Hj = -4, Gj = -4, Vj = -4, Yj = -3, Zj = -4, Jj = -4, Xj = 2, Qj = 2, eI = 2, tI = 2, sI = -2, nI = 4, iI = -1, rI = -1, oI = 2, aI = 4, cI = 4, uI = -3, lI = -2, dI = -2, pI = -2, gI = 2, hI = 2, fI = 2, mI = 2, yI = 3, bI = 3, vI = 3, DI = -1, wI = 3, kI = 2, FI = 2, AI = 3, CI = -2, _I = -1, EI = -2, xI = 2, SI = 3, $I = 3, BI = 3, zI = 3, TI = 3, RI = -1, PI = -2, jI = 2, II = 2, OI = -2, LI = 1, MI = -3, qI = 4, NI = 2, KI = 3, WI = 3, UI = 1, HI = 3, GI = 3, VI = -2, YI = -2, ZI = 1, JI = 2, XI = 3, QI = 3, eO = 1, tO = 1, sO = 1, nO = 1, iO = 3, rO = 2, oO = -2, aO = -1, cO = -2, uO = 3, lO = 3, dO = 3, pO = 3, gO = -3, hO = -2, fO = -3, mO = -3, yO = -3, bO = -3, vO = 1, DO = 1, wO = 1, kO = 2, FO = 1, AO = -1, CO = -2, _O = -2, EO = -2, xO = 2, SO = -2, $O = -2, BO = -2, zO = -2, TO = -2, RO = 1, PO = 2, jO = 2, IO = -3, OO = 1, LO = -3, MO = -3, qO = -2, NO = -2, KO = -1, WO = 2, UO = -1, HO = 3, GO = 3, VO = 3, YO = 2, ZO = 2, JO = 3, XO = 1, QO = 3, eL = -2, tL = -2, sL = 3, nL = 3, iL = 3, rL = -3, oL = -3, aL = -3, cL = -3, uL = -3, lL = -1, dL = 2, pL = -2, gL = 2, hL = -2, fL = -2, mL = -2, yL = -2, bL = 2, vL = 2, DL = 2, wL = -2, kL = -2, FL = -2, AL = -2, CL = -2, _L = -2, EL = -3, xL = -3, SL = -3, $L = -3, BL = -3, zL = -3, TL = -3, RL = -1, PL = -2, jL = 1, IL = -1, OL = -2, LL = -3, ML = -2, qL = 2, NL = -3, KL = -3, WL = 3, UL = -2, HL = 3, GL = 2, VL = 4, YL = -2, ZL = 2, JL = -4, XL = -2, QL = 2, eM = 2, tM = 2, sM = -2, nM = 2, iM = 2, rM = 2, oM = 3, aM = -2, cM = -2, uM = -1, lM = -1, dM = -3, pM = -1, gM = -1, hM = 2, fM = 2, mM = -2, yM = -2, bM = -2, vM = -1, DM = -2, wM = -2, kM = -2, FM = -2, AM = 2, CM = 2, _M = 2, EM = 2, xM = 2, SM = 2, $M = 2, BM = -2, zM = -2, TM = -2, RM = 2, PM = 2, jM = 2, IM = -2, OM = -2, LM = 2, MM = 2, qM = -3, NM = -3, KM = -3, WM = -3, UM = -3, HM = -2, GM = -2, VM = -2, YM = 2, ZM = 1, JM = 2, XM = 2, QM = 1, eq = -2, tq = 3, sq = -3, nq = -3, iq = 2, rq = 2, oq = 2, aq = 2, cq = -2, uq = 5, lq = -2, dq = -2, pq = -2, gq = -2, hq = -3, fq = -3, mq = -3, yq = -3, bq = -3, vq = -3, Dq = -3, wq = -2, kq = -2, Fq = -1, Aq = -2, Cq = -1, _q = -2, Eq = -3, xq = -3, Sq = -3, $q = -2, Bq = -2, zq = -2, Tq = -2, Rq = 2, Pq = -3, jq = -1, Iq = 2, Oq = 1, Lq = -2, Mq = -2, qq = -2, Nq = -2, Kq = -2, Wq = -2, Uq = -3, Hq = -3, Gq = -2, Vq = -2, Yq = -2, Zq = -2, Jq = -2, Xq = -2, Qq = 2, eN = 2, tN = -1, sN = -1, nN = -1, iN = -1, rN = -2, oN = -2, aN = 3, cN = 3, uN = 3, lN = 3, dN = -2, pN = -2, gN = -2, hN = -2, fN = 2, mN = 2, yN = 2, bN = 2, vN = 2, DN = -2, wN = -2, kN = -2, FN = -2, AN = -2, CN = -2, _N = -2, EN = -2, xN = -2, SN = -2, $N = -2, BN = -2, zN = -2, TN = -2, RN = -2, PN = -2, jN = -1, IN = -2, ON = -2, LN = -2, MN = -2, qN = 1, NN = 1, KN = -2, WN = 2, UN = -2, HN = -2, GN = -2, VN = -2, YN = -2, ZN = -2, JN = -2, XN = -2, QN = -2, eK = -2, tK = -3, sK = -3, nK = -2, iK = -2, rK = -2, oK = -2, aK = -2, cK = -2, uK = -2, lK = -2, dK = -2, pK = -2, gK = 2, hK = 2, fK = -2, mK = -2, yK = -2, bK = -2, vK = -2, DK = -2, wK = -2, kK = -2, FK = -2, AK = -2, CK = -2, _K = -2, EK = -2, xK = -2, SK = -2, $K = -2, BK = -2, zK = 2, TK = -2, RK = -2, PK = -2, jK = -2, IK = -2, OK = -2, LK = -2, MK = -2, qK = -2, NK = -1, KK = -2, WK = -2, UK = -2, HK = -2, GK = -2, VK = 1, YK = 1, ZK = 1, JK = 2, XK = -2, QK = -2, eW = 2, tW = -2, sW = -2, nW = -2, iW = -2, rW = -2, oW = -2, aW = -2, cW = -2, uW = -2, lW = 2, dW = 2, pW = 2, gW = 2, hW = 2, fW = 3, mW = -2, yW = -2, bW = -2, vW = -2, DW = -2, wW = -2, kW = -2, FW = 2, AW = 2, CW = 2, _W = 1, EW = 1, xW = 2, SW = 2, $W = 1, BW = -2, zW = -2, TW = -2, RW = -2, PW = -2, jW = -2, IW = 2, OW = -2, LW = -2, MW = -2, qW = -2, NW = -2, KW = -2, WW = -2, UW = 2, HW = 1, GW = -1, VW = 2, YW = 1, ZW = 1, JW = 2, XW = -3, QW = -1, eU = -1, tU = -1, sU = -2, nU = -2, iU = 2, rU = 2, oU = -2, aU = -2, cU = -2, uU = -1, lU = -1, dU = -3, pU = -3, gU = -3, hU = -3, fU = -1, mU = -2, yU = -4, bU = -4, vU = -2, DU = 2, wU = -2, kU = -2, FU = -2, AU = -3, CU = 1, _U = 1, EU = 1, xU = 2, SU = 1, $U = 2, BU = 2, zU = 2, TU = 2, RU = 3, PU = 3, jU = 3, IU = -2, OU = 3, LU = 3, MU = -1, qU = 2, NU = 2, KU = 2, WU = 1, UU = -3, HU = -3, GU = -2, VU = -2, YU = -2, ZU = -2, JU = -2, XU = -3, QU = -3, eH = -3, tH = -3, sH = 2, nH = 2, iH = 2, rH = 2, oH = 3, aH = -2, cH = -2, uH = -1, lH = -2, dH = -2, pH = -2, gH = -2, hH = 2, fH = -1, mH = -1, yH = 1, bH = 1, vH = 1, DH = 1, wH = 1, kH = 1, FH = 3, AH = -2, CH = -2, _H = -1, EH = 1, xH = 2, SH = -1, $H = -1, BH = -1, zH = 1, TH = 1, RH = 1, PH = -2, jH = -2, IH = -2, OH = -2, LH = -3, MH = -3, qH = -2, NH = -2, KH = -1, WH = 4, UH = 1, HH = 2, GH = 2, VH = 2, YH = 2, ZH = 2, JH = 2, XH = 2, QH = -1, eG = -1, tG = -1, sG = -1, nG = -2, iG = 2, rG = -2, oG = 4, aG = 4, cG = -3, uG = -3, lG = -3, dG = -3, pG = -3, gG = -2, hG = -2, fG = -2, mG = -2, yG = -2, bG = 3, vG = 4, DG = 4, wG = 4, kG = -2, FG = -2, AG = -1, CG = 3, _G = -1, EG = -1, xG = -1, SG = -1, $G = 3, BG = 3, zG = -3, TG = -3, RG = -3, PG = -3, jG = -3, IG = -3, OG = -3, LG = -2, MG = 3, qG = 3, NG = 3, KG = 3, WG = 3, UG = 3, HG = 2, GG = -1, VG = 3, YG = 3, ZG = 3, JG = 3, XG = 3, QG = 3, eV = -3, tV = -2, sV = -3, nV = -3, iV = -1, rV = -1, oV = -1, aV = 2, cV = -2, uV = -3, lV = -3, dV = -3, pV = -3, gV = 3, hV = -2, fV = -2, mV = -2, yV = -1, bV = -1, vV = -1, DV = -1, wV = -3, kV = 3, FV = 3, AV = 3, CV = 4, _V = 4, EV = 1, xV = 1, SV = 2, $V = 2, BV = -2, zV = 3, TV = -3, RV = 1, PV = -2, jV = 1, IV = -2, OV = -2, LV = -2, MV = -2, qV = 2, NV = 3, KV = 3, WV = -2, UV = -2, HV = 2, GV = 2, VV = -2, YV = 4, ZV = 3, JV = 3, XV = 3, QV = -2, eY = -2, tY = -2, sY = -2, nY = -3, iY = -2, rY = -1, oY = -1, aY = -2, cY = -2, uY = -2, lY = -2, dY = -2, pY = -2, gY = -2, hY = -3, fY = -3, mY = -2, yY = -2, bY = -2, vY = -2, DY = -2, wY = -2, kY = -2, FY = -3, AY = -3, CY = -3, _Y = -3, EY = -2, xY = -2, SY = -2, $Y = -2, BY = -3, zY = -1, TY = -2, RY = -2, PY = -2, jY = -2, IY = -2, OY = -2, LY = -2, MY = -2, qY = -2, NY = -2, KY = -2, WY = -2, UY = -2, HY = -2, GY = -2, VY = -2, YY = -2, ZY = -2, JY = -2, XY = -2, QY = -2, eZ = -2, tZ = -2, sZ = -2, nZ = -2, iZ = -2, rZ = -2, oZ = -2, aZ = -2, cZ = -2, uZ = -2, lZ = -2, dZ = -2, pZ = 2, gZ = 2, hZ = 2, fZ = 2, mZ = -2, yZ = -2, bZ = -2, vZ = -2, DZ = -2, wZ = -1, kZ = -1, FZ = -1, AZ = -1, CZ = -3, _Z = -5, EZ = -5, xZ = 1, SZ = 2, $Z = 2, BZ = 1, zZ = -2, TZ = -2, RZ = -2, PZ = -2, jZ = -2, IZ = -2, OZ = -2, LZ = -2, MZ = -2, qZ = -3, NZ = -3, KZ = -2, WZ = -2, UZ = -1, HZ = -2, GZ = -2, VZ = -2, YZ = -3, ZZ = 1, JZ = -2, XZ = -2, QZ = -2, eJ = -2, tJ = -2, sJ = -2, nJ = -2, iJ = -1, rJ = -2, oJ = -2, aJ = 3, cJ = 2, uJ = -5, lJ = -5, dJ = -1, pJ = 2, gJ = 2, hJ = -1, fJ = -2, mJ = -2, yJ = -2, bJ = 2, vJ = 2, DJ = -2, wJ = 2, kJ = -1, FJ = 2, AJ = -3, CJ = -2, _J = -2, EJ = -3, xJ = -2, SJ = -2, $J = 2, BJ = -2, zJ = -2, TJ = -2, RJ = -2, PJ = -2, jJ = -2, IJ = -2, OJ = -2, LJ = -2, MJ = -2, qJ = -2, NJ = -2, KJ = -2, WJ = -2, UJ = -2, HJ = -2, GJ = -2, VJ = -2, YJ = -2, ZJ = -2, JJ = -2, XJ = -1, QJ = 2, eX = 3, tX = -2, sX = 2, nX = 2, iX = -2, rX = -2, oX = -2, aX = -2, cX = 2, uX = 2, lX = -2, dX = -2, pX = -2, gX = -2, hX = -2, fX = -2, mX = -2, yX = -2, bX = -2, vX = -2, DX = -2, wX = -2, kX = -3, FX = -3, AX = -3, CX = 2, _X = 5, EX = 4, xX = -1, SX = -1, $X = -2, BX = -2, zX = -2, TX = -2, RX = -2, PX = -2, jX = -2, IX = -2, OX = -2, LX = -2, MX = -1, qX = -2, NX = -2, KX = -2, WX = -2, UX = -2, HX = -2, GX = -2, VX = -1, YX = -3, ZX = -1, JX = -2, XX = -2, QX = -2, eQ = -3, tQ = -3, sQ = -3, nQ = 3, iQ = -1, rQ = 2, oQ = 2, aQ = 2, cQ = 2, uQ = -1, lQ = 1, dQ = 2, pQ = -1, gQ = -1, hQ = -2, fQ = -1, mQ = 2, yQ = 2, bQ = 2, vQ = -2, DQ = -2, wQ = -2, kQ = -2, FQ = -2, AQ = -1, CQ = 3, _Q = 2, EQ = 3, xQ = 3, SQ = 2, $Q = -2, BQ = -3, zQ = -2, TQ = -2, RQ = -2, PQ = -2, jQ = -2, IQ = -2, OQ = -2, LQ = -2, MQ = -2, qQ = -3, NQ = -2, KQ = -2, WQ = -2, UQ = -2, HQ = 2, GQ = -2, VQ = 2, YQ = -1, ZQ = -2, JQ = -2, XQ = -2, QQ = -4, eee = -4, tee = -3, see = -2, nee = -1, iee = -2, ree = -3, oee = -3, aee = -3, cee = -3, uee = 2, lee = 3, dee = 1, pee = 3, gee = 3, hee = 3, fee = -2, mee = 2, yee = -2, bee = -2, vee = -2, Dee = -2, wee = -2, kee = 2, Fee = 2, Aee = 2, Cee = -2, _ee = -2, Eee = -2, xee = -2, See = -2, $ee = -2, Bee = -2, zee = -2, Tee = -2, Ree = -2, Pee = -2, jee = 3, Iee = 3, Oee = 2, Lee = 2, Mee = -2, qee = -1, Nee = -1, Kee = -1, Wee = -1, Uee = -1, Hee = 2, Gee = -2, Vee = 3, Yee = 3, Zee = 3, Jee = 3, Xee = 1, Qee = 1, ete = 1, tte = -2, ste = -2, nte = -2, ite = 1, rte = -1, ote = -2, ate = -1, cte = -1, ute = -1, lte = 1, dte = -1, pte = -1, gte = -1, hte = -1, fte = -5, mte = -2, yte = -2, bte = -2, vte = 2, Dte = 2, wte = -2, kte = -2, Fte = 2, Ate = 2, Cte = -2, _te = 2, Ete = 2, xte = -1, Ste = -1, $te = 2, Bte = 1, zte = 1, Tte = 1, Rte = 1, Pte = 1, jte = 1, Ite = 1, Ote = 1, Lte = -2, Mte = -1, qte = -2, Nte = -1, Kte = -1, Wte = 1, Ute = 1, Hte = 3, Gte = 3, Vte = 1, Yte = 1, Zte = -2, Jte = -2, Xte = -2, Qte = -2, ese = 2, tse = 2, sse = -1, nse = -1, ise = -1, rse = -1, ose = 2, ase = -3, cse = -2, use = -2, lse = -2, dse = -2, pse = -2, gse = -2, hse = 1, fse = 1, mse = 2, yse = -1, bse = -2, vse = -2, Dse = 2, wse = 2, kse = -2, Fse = -1, Ase = -1, Cse = -3, _se = -3, Ese = -3, xse = -2, Sse = -2, $se = -1, Bse = -3, zse = -3, Tse = -3, Rse = -3, Pse = -4, jse = -4, Ise = -4, Ose = 2, Lse = 2, Mse = 2, qse = 4, Nse = -2, Kse = 2, Wse = 1, Use = 1, Hse = 1, Gse = 1, Vse = 1, Yse = 1, Zse = 1, Jse = 2, Xse = -2, Qse = -2, ene = -2, tne = -2, sne = -2, nne = 2, ine = 2, rne = 2, one = 2, ane = 2, cne = 1, une = 1, lne = 1, dne = 2, pne = -2, gne = -2, hne = -2, fne = -2, mne = -2, yne = -2, bne = -2, vne = -2, Dne = -2, wne = 1, kne = -1, Fne = -1, Ane = -1, Cne = -2, _ne = -1, Ene = 4, xne = 4, Sne = 4, $ne = 4, Bne = 2, zne = -1, Tne = 2, Rne = 2, Pne = 2, jne = 2, Ine = 1, One = 2, Lne = 1, Mne = 2, qne = 2, Nne = 2, Kne = -2, Wne = -2, Une = -2, Hne = -2, Gne = -2, Vne = -2, Yne = -2, Zne = -2, Jne = -1, Xne = -2, Qne = -2, eie = 2, tie = 2, sie = 2, nie = -2, iie = -1, rie = -1, oie = -1, aie = -1, cie = 2, uie = 2, lie = 2, die = 2, pie = 2, gie = 2, hie = 2, fie = 2, mie = 2, yie = 1, bie = 2, vie = 2, Die = 2, wie = -2, kie = 1, Fie = 1, Aie = 1, Cie = 1, _ie = -2, Eie = -2, xie = -2, Sie = -2, $ie = -1, Bie = -2, zie = -1, Tie = -2, Rie = -2, Pie = -1, jie = -2, Iie = -2, Oie = 2, Lie = 2, Mie = 2, qie = -2, Nie = 2, Kie = 2, Wie = 2, Uie = 2, Hie = 2, Gie = 2, Vie = -3, Yie = -1, Zie = -1, Jie = 2, Xie = 2, Qie = 2, ere = 3, tre = 3, sre = -2, nre = -2, ire = 1, rre = 1, ore = -2, are = -2, cre = -2, ure = 3, lre = -2, dre = -2, pre = -2, gre = -2, hre = -2, fre = 2, mre = 4, yre = 4, bre = 4, vre = 2, Dre = 2, wre = 2, kre = 1, Fre = 4, Are = 4, Cre = 4, _re = -3, Ere = -2, xre = -2, Sre = -2, $re = -2, Bre = -2, zre = -2, Tre = -2, Rre = -2, Pre = -2, jre = -2, Ire = 1, Ore = 1, Lre = 2, Mre = 1, qre = 1, Nre = 2, Kre = 2, Wre = 2, Ure = 2, Hre = 2, Gre = -1, Vre = -2, Yre = 2, Zre = -2, Jre = -2, Xre = 2, Qre = 2, eoe = 1, toe = -2, soe = -2, noe = -3, ioe = -3, roe = -3, ooe = -2, aoe = -2, coe = -2, uoe = -2, loe = -2, doe = -2, poe = -2, goe = -2, hoe = -2, foe = 3, moe = -2, yoe = -2, boe = -2, voe = -2, Doe = -2, woe = -2, koe = -2, Foe = -3, Aoe = -4, Coe = 2, _oe = 2, Eoe = 2, xoe = 2, Soe = 2, $oe = -2, Boe = -2, zoe = -1, Toe = -3, Roe = -3, Poe = -2, joe = -2, Ioe = -2, Ooe = -2, Loe = 2, Moe = 1, qoe = 1, Noe = -2, Koe = -2, Woe = -2, Uoe = -2, Hoe = 3, Goe = -2, Voe = -2, Yoe = -2, Zoe = -2, Joe = 1, Xoe = 1, Qoe = 1, eae = -2, tae = -4, sae = -4, nae = -3, iae = -2, rae = -2, oae = -2, aae = -2, cae = -2, uae = -1, lae = -2, dae = -2, pae = -4, gae = -1, hae = -2, fae = -2, mae = -2, yae = 1, bae = 1, vae = -1, Dae = -1, wae = 1, kae = -2, Fae = 2, Aae = 2, Cae = 2, _ae = 2, Eae = -3, xae = -2, Sae = -2, $ae = -2, Bae = -2, zae = -2, Tae = -2, Rae = -2, Pae = -2, jae = -2, Iae = -2, Oae = -2, Lae = -2, Mae = -3, qae = -3, Nae = -3, Kae = -2, Wae = 2, Uae = 2, Hae = 2, Gae = -1, Vae = -2, Yae = -2, Zae = -1, Jae = -5, Xae = 1, Qae = 2, ece = 2, tce = -2, sce = 2, nce = 2, ice = 2, rce = 2, oce = -2, ace = -2, cce = -2, uce = -2, lce = -2, dce = -1, pce = -2, gce = -2, hce = -2, fce = -2, mce = -2, yce = -2, bce = -2, vce = -2, Dce = 1, wce = -1, kce = 2, Fce = 2, Ace = 2, Cce = 2, _ce = 2, Ece = 2, xce = 1, Sce = 1, $ce = 1, Bce = 1, zce = 1, Tce = 1, Rce = -2, Pce = 3, jce = 3, Ice = 3, Oce = 2, Lce = -1, Mce = -2, qce = -2, Nce = -1, Kce = 1, Wce = -2, Uce = -3, Hce = -3, Gce = -2, Vce = 1, Yce = 3, Zce = 3, Jce = 3, Xce = 2, Qce = -2, eue = 1, tue = 2, sue = -2, nue = -2, iue = 3, rue = -2, oue = -2, aue = 2, cue = 2, uue = -2, lue = -2, due = -2, pue = -2, gue = -1, hue = -2, fue = -2, mue = 2, yue = -2, bue = -2, vue = -2, Due = -2, wue = 2, kue = -2, Fue = -2, Aue = -2, Cue = 3, _ue = -2, Eue = -2, xue = -2, Sue = -2, $ue = 2, Bue = -2, zue = -2, Tue = -2, Rue = -2, Pue = -2, jue = -1, Iue = 1, Oue = 1, Lue = 1, Mue = 2, que = -2, Nue = -2, Kue = -2, Wue = -2, Uue = -2, Hue = -2, Gue = -2, Vue = -2, Yue = -2, Zue = -1, Jue = -1, Xue = -1, Que = -1, ele = 2, tle = 1, sle = -1, nle = -1, ile = -2, rle = 2, ole = 2, ale = 2, cle = 2, ule = 2, lle = 2, dle = -1, ple = -2, gle = -2, hle = -2, fle = -2, mle = -1, yle = -2, ble = -1, vle = 2, Dle = 2, wle = 2, kle = -1, Fle = -2, Ale = -2, Cle = -2, _le = -2, Ele = -2, xle = -2, Sle = -2, $le = 4, Ble = -2, zle = -3, Tle = -2, Rle = 2, Ple = -2, jle = 1, Ile = 1, Ole = -2, Lle = 3, Mle = 3, qle = 3, Nle = 3, Kle = 2, Wle = 3, Ule = 3, Hle = -3, Gle = -3, Vle = -2, Yle = -2, Zle = -2, Jle = -2, Xle = -2, Qle = -2, ede = -2, tde = -2, sde = -2, nde = -2, ide = -2, rde = -2, ode = -2, ade = -2, cde = 2, ude = 2, lde = -2, dde = -2, pde = -2, gde = 2, hde = 5, fde = 2, mde = 2, yde = 2, bde = 1, vde = 1, Dde = 1, wde = 2, kde = 2, Fde = 4, Ade = 2, Cde = 2, _de = 2, Ede = -1, xde = -1, Sde = -1, $de = -1, Bde = -1, zde = -1, Tde = -2, Rde = 1, Pde = 2, jde = 2, Ide = -2, Ode = -2, Lde = -2, Mde = 2, qde = 3, Nde = 3, Kde = 2, Wde = 2, Ude = -3, Hde = -3, Gde = -3, Vde = 2, Yde = 2, Zde = -2, Jde = -2, Xde = 2, Qde = -2, e1e = -2, t1e = -2, s1e = -2, n1e = -2, i1e = 2, r1e = 2, o1e = -2, a1e = -1, c1e = -3, u1e = -3, l1e = 4, d1e = 4, p1e = -3, g1e = -3, h1e = -2, f1e = -2, m1e = -3, y1e = -3, b1e = -3, v1e = 2, D1e = 2, w1e = 2, k1e = -2, F1e = 2, A1e = -2, C1e = -2, _1e = -2, E1e = -2, x1e = -2, S1e = -2, $1e = -2, B1e = 5, z1e = -2, T1e = -2, R1e = -2, P1e = -2, j1e = -2, I1e = -2, O1e = -2, L1e = -2, M1e = 2, q1e = 2, N1e = -2, K1e = 2, W1e = 2, U1e = -2, H1e = -4, G1e = -4, V1e = -4, Y1e = -4, Z1e = -2, J1e = -2, X1e = -2, Q1e = -2, epe = -2, tpe = -2, spe = -3, npe = -2, ipe = -2, rpe = -2, ope = 2, ape = -2, cpe = -2, upe = -2, lpe = -2, dpe = -1, ppe = -2, gpe = -1, hpe = -3, fpe = -3, mpe = -2, ype = -3, bpe = -3, vpe = 2, Dpe = 2, wpe = -2, kpe = -2, Fpe = -2, Ape = -2, Cpe = -2, _pe = 2, Epe = -2, xpe = -2, Spe = 4, $pe = 4, Bpe = -2, zpe = -2, Tpe = -2, Rpe = -2, Ppe = -2, jpe = 1, Ipe = 2, Ope = 1, Lpe = -2, Mpe = -5, qpe = -3, Npe = -3, Kpe = -3, Wpe = -3, Upe = -3, Hpe = 2, Gpe = -2, Vpe = -3, Ype = -3, Zpe = -2, Jpe = -2, Xpe = -2, Qpe = -2, ege = -2, tge = -2, sge = -1, nge = -2, ige = -2, rge = -2, oge = -1, age = -1, cge = 2, uge = -1, lge = -1, dge = -2, pge = -2, gge = -1, hge = -1, fge = -1, mge = -1, yge = -2, bge = -1, vge = -1, Dge = -1, wge = -1, kge = -2, Fge = -2, Age = -2, Cge = -2, _ge = -2, Ege = -2, xge = -2, Sge = -2, $ge = -2, Bge = -2, zge = -2, Tge = -1, Rge = -2, Pge = -1, jge = 2, Ige = -2, Oge = -2, Lge = -2, Mge = -2, qge = -2, Nge = -2, Kge = -2, Wge = -3, Uge = -2, Hge = -2, Gge = -2, Vge = -2, Yge = -3, Zge = -2, Jge = -2, Xge = -2, Qge = -2, ehe = 1, the = -2, she = -2, nhe = -2, ihe = -2, rhe = -2, ohe = -2, ahe = 1, che = -2, uhe = -1, lhe = -2, dhe = -2, phe = 1, ghe = -2, hhe = -2, fhe = -2, mhe = -2, yhe = -2, bhe = -2, vhe = 1, Dhe = -2, whe = -2, khe = -2, Fhe = -2, Ahe = -2, Che = -2, _he = 2, Ehe = -1, xhe = -1, She = -2, $he = -2, Bhe = -2, zhe = 2, The = -2, Rhe = -2, Phe = -2, jhe = -1, Ihe = 2, Ohe = -2, Lhe = -2, Mhe = -2, qhe = 2, Nhe = -3, Khe = -2, Whe = -2, Uhe = -2, Hhe = -2, Ghe = -1, Vhe = 2, Yhe = 2, Zhe = -2, Jhe = -2, Xhe = -2, Qhe = 1, e2e = 1, t2e = 1, s2e = 1, n2e = -2, i2e = -1, r2e = -1, o2e = 1, a2e = -2, c2e = -2, u2e = 3, l2e = -2, d2e = -3, p2e = -3, g2e = -3, h2e = -3, f2e = -3, m2e = -3, y2e = -3, b2e = 3, v2e = 3, D2e = 3, w2e = 3, k2e = 3, F2e = 3, A2e = -3, C2e = 2, _2e = 2, E2e = 2, x2e = 2, S2e = -2, $2e = -2, B2e = -2, z2e = -2, T2e = -2, R2e = -2, P2e = -3, j2e = -3, I2e = -3, O2e = 2, L2e = -2, M2e = 1, q2e = 3, N2e = 1, K2e = 1, W2e = 3, U2e = 1, H2e = -3, G2e = 3, V2e = 2, Y2e = -1, Z2e = -3, J2e = -3, X2e = -3, Q2e = -3, efe = -2, tfe = -2, sfe = -2, nfe = -2, ife = -3, rfe = 1, ofe = -2, afe = -2, cfe = 1, ufe = 2, lfe = 2, dfe = 2, pfe = -2, gfe = -2, hfe = -3, ffe = -3, mfe = -2, yfe = -1, bfe = -2, vfe = -2, Dfe = -1, wfe = -2, kfe = -2, Ffe = -2, Afe = -2, Cfe = 3, _fe = 2, Efe = 2, xfe = -2, Sfe = -2, $fe = -2, Bfe = -2, zfe = 2, Tfe = 2, Rfe = 2, Pfe = 1, jfe = -3, Ife = -4, Ofe = -2, Lfe = -1, Mfe = 2, qfe = 4, Nfe = 4, Kfe = 4, Wfe = 4, Ufe = 3, Hfe = 1, Gfe = 1, Vfe = 1, Yfe = 1, Zfe = -3, Jfe = 2, Xfe = -2, Qfe = -3, eme = 3, tme = 4, sme = 4, nme = 3, ime = 3, rme = 4, ome = 4, ame = -1, cme = -3, ume = -3, lme = -3, dme = -3, pme = -3, gme = -3, hme = -3, fme = -3, mme = -3, yme = 3, bme = -3, vme = 2, Dme = -2, wme = 2, kme = 4, Fme = 4, Ame = 4, Cme = -3, _me = -2, Eme = -2, xme = -2, Sme = -2, $me = -2, Bme = -2, zme = -2, Tme = -2, Rme = -2, Pme = -4, jme = -4, Ime = -4, Ome = 3, Lme = 3, Mme = 4, qme = 4, Nme = 1, Kme = 1, Wme = 2, Ume = 1, Hme = 2, Gme = -2, Vme = 3, Yme = -2, Zme = -2, Jme = 2, Xme = {
  abandon: x3,
  abandoned: S3,
  abandons: $3,
  abducted: B3,
  abduction: z3,
  abductions: T3,
  abhor: R3,
  abhorred: P3,
  abhorrent: j3,
  abhors: I3,
  abilities: O3,
  ability: L3,
  aboard: M3,
  aborted: q3,
  aborts: N3,
  absentee: K3,
  absentees: W3,
  absolve: U3,
  absolved: H3,
  absolves: G3,
  absolving: V3,
  absorbed: Y3,
  abuse: Z3,
  abused: J3,
  abuses: X3,
  abusing: Q3,
  abusive: ev,
  accept: tv,
  acceptable: sv,
  acceptance: nv,
  accepted: iv,
  accepting: rv,
  accepts: ov,
  accessible: av,
  accident: cv,
  accidental: uv,
  accidentally: lv,
  accidents: dv,
  acclaim: pv,
  acclaimed: gv,
  accolade: hv,
  accomplish: fv,
  accomplished: mv,
  accomplishes: yv,
  accomplishment: bv,
  accomplishments: vv,
  accusation: Dv,
  accusations: wv,
  accuse: kv,
  accused: Fv,
  accuses: Av,
  accusing: Cv,
  ache: _v,
  achievable: Ev,
  aching: xv,
  acquit: Sv,
  acquits: $v,
  acquitted: Bv,
  acquitting: zv,
  acrimonious: Tv,
  active: Rv,
  adequate: Pv,
  admire: jv,
  admired: Iv,
  admires: Ov,
  admiring: Lv,
  admit: Mv,
  admits: qv,
  admitted: Nv,
  admonish: Kv,
  admonished: Wv,
  adopt: Uv,
  adopts: Hv,
  adorable: Gv,
  adoration: Vv,
  adore: Yv,
  adored: Zv,
  adores: Jv,
  adoring: Xv,
  adoringly: Qv,
  advanced: e0,
  advantage: t0,
  advantageous: s0,
  advantageously: n0,
  advantages: i0,
  adventure: r0,
  adventures: o0,
  adventurous: a0,
  adversary: c0,
  advisable: u0,
  affected: l0,
  affection: d0,
  affectionate: p0,
  affectionateness: g0,
  afflicted: h0,
  affordable: f0,
  affronted: m0,
  aficionados: y0,
  afraid: b0,
  aggravate: v0,
  aggravated: D0,
  aggravates: w0,
  aggravating: k0,
  aggression: F0,
  aggressions: A0,
  aggressive: C0,
  aggressiveness: _0,
  aghast: E0,
  agog: x0,
  agonise: S0,
  agonised: $0,
  agonises: B0,
  agonising: z0,
  agonize: T0,
  agonized: R0,
  agonizes: P0,
  agonizing: j0,
  agree: I0,
  agreeable: O0,
  agreed: L0,
  agreement: M0,
  agrees: q0,
  alarm: N0,
  alarmed: K0,
  alarmist: W0,
  alarmists: U0,
  alas: H0,
  alert: G0,
  alienation: V0,
  alive: Y0,
  allegation: Z0,
  allegations: J0,
  allergic: X0,
  allow: Q0,
  ally: eD,
  alone: tD,
  altruistic: sD,
  amaze: nD,
  amazed: iD,
  amazes: rD,
  amazing: oD,
  ambitious: aD,
  ambivalent: cD,
  amicable: uD,
  amuse: lD,
  amused: dD,
  amusement: pD,
  amusements: gD,
  anger: hD,
  angered: fD,
  angers: mD,
  angry: yD,
  anguish: bD,
  anguished: vD,
  animosity: DD,
  annoy: wD,
  annoyance: kD,
  annoyed: FD,
  annoying: AD,
  annoys: CD,
  antagonistic: _D,
  anti: ED,
  anticipation: xD,
  anxiety: SD,
  anxious: $D,
  apathetic: BD,
  apathy: zD,
  apeshit: TD,
  apocalyptic: RD,
  apologise: PD,
  apologised: jD,
  apologises: ID,
  apologising: OD,
  apologize: LD,
  apologized: MD,
  apologizes: qD,
  apologizing: ND,
  apology: KD,
  appalled: WD,
  appalling: UD,
  appealing: HD,
  appease: GD,
  appeased: VD,
  appeases: YD,
  appeasing: ZD,
  applaud: JD,
  applauded: XD,
  applauding: QD,
  applauds: ew,
  applause: tw,
  appreciate: sw,
  appreciated: nw,
  appreciates: iw,
  appreciating: rw,
  appreciation: ow,
  apprehensive: aw,
  appropriate: cw,
  appropriately: uw,
  approval: lw,
  approved: dw,
  approves: pw,
  ardent: gw,
  arrest: hw,
  arrested: fw,
  arrests: mw,
  arrogant: yw,
  arsehole: bw,
  ashame: vw,
  ashamed: Dw,
  ass: ww,
  assassination: kw,
  assassinations: Fw,
  assault: Aw,
  assaults: Cw,
  asset: _w,
  assets: Ew,
  assfucking: xw,
  asshole: Sw,
  astonished: $w,
  astound: Bw,
  astounded: zw,
  astounding: Tw,
  astoundingly: Rw,
  astounds: Pw,
  atrocious: jw,
  atrocity: Iw,
  attack: Ow,
  attacked: Lw,
  attacking: Mw,
  attacks: qw,
  attract: Nw,
  attracted: Kw,
  attracting: Ww,
  attraction: Uw,
  attractions: Hw,
  attractive: Gw,
  attractively: Vw,
  attractiveness: Yw,
  attracts: Zw,
  audacious: Jw,
  aura: Xw,
  authority: Qw,
  avenge: ek,
  avenged: tk,
  avenger: sk,
  avengers: nk,
  avenges: ik,
  avenging: rk,
  avert: ok,
  averted: ak,
  averts: ck,
  avid: uk,
  avoid: lk,
  avoided: dk,
  avoids: pk,
  await: -1,
  awaited: gk,
  awaits: hk,
  award: fk,
  awarded: mk,
  awards: yk,
  awesome: bk,
  awful: vk,
  awkward: Dk,
  axe: wk,
  axed: kk,
  backed: Fk,
  backing: Ak,
  backs: Ck,
  bad: _k,
  "bad luck": -2,
  badass: Ek,
  badly: xk,
  badness: Sk,
  bailout: $k,
  balanced: Bk,
  bamboozle: zk,
  bamboozled: Tk,
  bamboozles: Rk,
  ban: Pk,
  banish: jk,
  bankrupt: Ik,
  bankruptcy: Ok,
  bankster: Lk,
  banned: Mk,
  barbarian: qk,
  barbaric: Nk,
  barbarous: Kk,
  bargain: Wk,
  barrier: Uk,
  bastard: Hk,
  bastards: Gk,
  battle: Vk,
  battled: Yk,
  battles: Zk,
  battling: Jk,
  beaten: Xk,
  beatific: Qk,
  beating: e4,
  beauties: t4,
  beautiful: s4,
  beautifully: n4,
  beautify: i4,
  beauty: r4,
  befit: o4,
  befitting: a4,
  belittle: c4,
  belittled: u4,
  beloved: l4,
  benefactor: d4,
  benefactors: p4,
  benefit: g4,
  benefits: h4,
  benefitted: f4,
  benefitting: m4,
  benevolent: y4,
  bereave: b4,
  bereaved: v4,
  bereaves: D4,
  bereaving: w4,
  best: k4,
  "best damn": 4,
  betray: F4,
  betrayal: A4,
  betrayed: C4,
  betraying: _4,
  betrays: E4,
  better: x4,
  bias: S4,
  biased: $4,
  big: B4,
  bitch: z4,
  bitches: T4,
  bitter: R4,
  bitterest: P4,
  bitterly: j4,
  bizarre: I4,
  blackmail: O4,
  blackmailed: L4,
  blackmailing: M4,
  blackmails: q4,
  blah: N4,
  blame: K4,
  blamed: W4,
  blames: U4,
  blaming: H4,
  bless: G4,
  blesses: V4,
  blessing: Y4,
  blessings: Z4,
  blind: J4,
  bliss: X4,
  blissful: Q4,
  blithe: e5,
  bloated: t5,
  block: s5,
  blockade: n5,
  blockbuster: i5,
  blocked: r5,
  blocking: o5,
  blocks: a5,
  bloody: c5,
  blurry: u5,
  boastful: l5,
  bold: d5,
  boldly: p5,
  bomb: g5,
  boost: h5,
  boosted: f5,
  boosting: m5,
  boosts: y5,
  bore: b5,
  bored: v5,
  boring: D5,
  bother: w5,
  bothered: k5,
  bothers: F5,
  bothersome: A5,
  boycott: C5,
  boycotted: _5,
  boycotting: E5,
  boycotts: x5,
  brainwashing: S5,
  brave: $5,
  braveness: B5,
  bravery: z5,
  bravura: T5,
  breach: R5,
  breached: P5,
  breaches: j5,
  breaching: I5,
  breakthrough: O5,
  breathtaking: L5,
  bribe: M5,
  bribed: q5,
  bribes: N5,
  bribing: K5,
  bright: W5,
  brightest: U5,
  brightness: H5,
  brilliant: G5,
  brilliance: V5,
  brilliances: Y5,
  brisk: Z5,
  broke: J5,
  broken: X5,
  brooding: Q5,
  brutal: eF,
  brutally: tF,
  bullied: sF,
  bullshit: nF,
  bully: iF,
  bullying: rF,
  bummer: oF,
  buoyant: aF,
  burden: cF,
  burdened: uF,
  burdening: lF,
  burdens: dF,
  burglar: pF,
  burglary: gF,
  calm: hF,
  calmed: fF,
  calming: mF,
  calms: yF,
  "can't stand": -3,
  cancel: bF,
  cancelled: vF,
  cancelling: DF,
  cancels: wF,
  cancer: kF,
  capabilities: FF,
  capability: AF,
  capable: CF,
  captivated: _F,
  care: EF,
  carefree: xF,
  careful: SF,
  carefully: $F,
  carefulness: BF,
  careless: zF,
  cares: TF,
  caring: RF,
  "cashing in": -2,
  casualty: PF,
  catastrophe: jF,
  catastrophic: IF,
  cautious: OF,
  celebrate: LF,
  celebrated: MF,
  celebrates: qF,
  celebrating: NF,
  celebration: KF,
  celebrations: WF,
  censor: UF,
  censored: HF,
  censors: GF,
  certain: VF,
  chagrin: YF,
  chagrined: ZF,
  challenge: JF,
  champion: XF,
  championed: QF,
  champions: eA,
  chance: tA,
  chances: sA,
  chaos: nA,
  chaotic: iA,
  charged: rA,
  charges: oA,
  charisma: aA,
  charitable: cA,
  charm: uA,
  charming: lA,
  charmingly: dA,
  charmless: pA,
  chastise: gA,
  chastised: hA,
  chastises: fA,
  chastising: mA,
  cheat: yA,
  cheated: bA,
  cheater: vA,
  cheaters: DA,
  cheating: wA,
  cheats: kA,
  cheer: FA,
  cheered: AA,
  cheerful: CA,
  cheerfully: _A,
  cheering: EA,
  cheerless: xA,
  cheers: SA,
  cheery: $A,
  cherish: BA,
  cherished: zA,
  cherishes: TA,
  cherishing: RA,
  chic: PA,
  chide: jA,
  chided: IA,
  chides: OA,
  chiding: LA,
  childish: MA,
  chilling: qA,
  choke: NA,
  choked: KA,
  chokes: WA,
  choking: UA,
  clarifies: HA,
  clarity: GA,
  clash: VA,
  classy: YA,
  clean: ZA,
  cleaner: JA,
  clear: XA,
  cleared: QA,
  clearly: eC,
  clears: tC,
  clever: sC,
  clouded: nC,
  clueless: iC,
  cock: rC,
  cocksucker: oC,
  cocksuckers: aC,
  cocky: cC,
  coerced: uC,
  coercion: lC,
  collapse: dC,
  collapsed: pC,
  collapses: gC,
  collapsing: hC,
  collide: fC,
  collides: mC,
  colliding: yC,
  collision: bC,
  collisions: vC,
  colluding: DC,
  combat: wC,
  combats: kC,
  comedy: FC,
  comfort: AC,
  comfortable: CC,
  comfortably: _C,
  comforting: EC,
  comforts: xC,
  comic: SC,
  commend: $C,
  commended: BC,
  commit: zC,
  commitment: TC,
  commits: RC,
  committed: PC,
  committing: jC,
  compassion: IC,
  compassionate: OC,
  compelled: LC,
  competencies: MC,
  competent: qC,
  competitive: NC,
  complacent: KC,
  complain: WC,
  complained: UC,
  complaining: HC,
  complains: GC,
  complaint: VC,
  complaints: YC,
  complicating: ZC,
  compliment: JC,
  complimented: XC,
  compliments: QC,
  comprehensive: e_,
  concerned: t_,
  conciliate: s_,
  conciliated: n_,
  conciliates: i_,
  conciliating: r_,
  condemn: o_,
  condemnation: a_,
  condemned: c_,
  condemns: u_,
  confidence: l_,
  confident: d_,
  confidently: p_,
  conflict: g_,
  conflicting: h_,
  conflictive: f_,
  conflicts: m_,
  confuse: y_,
  confused: b_,
  confusing: v_,
  congrats: D_,
  congratulate: w_,
  congratulation: k_,
  congratulations: F_,
  consent: A_,
  consents: C_,
  consolable: __,
  conspiracy: E_,
  constipation: x_,
  constrained: S_,
  contagion: $_,
  contagions: B_,
  contagious: z_,
  contaminant: T_,
  contaminants: R_,
  contaminate: P_,
  contaminated: j_,
  contaminates: I_,
  contaminating: O_,
  contamination: L_,
  contaminations: M_,
  contempt: q_,
  contemptible: N_,
  contemptuous: K_,
  contemptuously: W_,
  contend: U_,
  contender: H_,
  contending: G_,
  contentious: V_,
  contestable: Y_,
  controversial: Z_,
  controversially: J_,
  controversies: X_,
  controversy: Q_,
  convicted: eE,
  convince: tE,
  convinced: sE,
  convinces: nE,
  convivial: iE,
  cool: rE,
  "cool stuff": 3,
  cornered: oE,
  corpse: aE,
  corrupt: cE,
  corrupted: uE,
  corrupting: lE,
  corruption: dE,
  corrupts: pE,
  costly: gE,
  courage: hE,
  courageous: fE,
  courageously: mE,
  courageousness: yE,
  courteous: bE,
  courtesy: vE,
  "cover-up": -3,
  coward: DE,
  cowardly: wE,
  coziness: kE,
  cramp: FE,
  crap: AE,
  crappy: CE,
  crash: _E,
  crazier: EE,
  craziest: xE,
  crazy: SE,
  creative: $E,
  crestfallen: BE,
  cried: zE,
  cries: TE,
  crime: RE,
  crimes: PE,
  criminal: jE,
  criminals: IE,
  criminate: OE,
  criminated: LE,
  criminates: ME,
  crisis: qE,
  critic: NE,
  criticise: KE,
  criticised: WE,
  criticises: UE,
  criticising: HE,
  criticism: GE,
  criticize: VE,
  criticized: YE,
  criticizes: ZE,
  criticizing: JE,
  critics: XE,
  critique: QE,
  crowding: ex,
  crude: tx,
  cruel: sx,
  cruelty: nx,
  crush: ix,
  crushed: rx,
  crushes: ox,
  crushing: ax,
  cry: cx,
  crying: ux,
  cunning: lx,
  cunt: dx,
  curious: px,
  curse: gx,
  cut: hx,
  cutback: fx,
  cutbacks: mx,
  cute: yx,
  cuts: bx,
  cutting: vx,
  cynic: Dx,
  cynical: wx,
  cynicism: kx,
  damage: Fx,
  damaged: Ax,
  damages: Cx,
  damaging: _x,
  damn: Ex,
  "damn cute": 3,
  "damn good": 4,
  damned: xx,
  damnit: Sx,
  danger: $x,
  dangerous: Bx,
  dangerously: zx,
  daredevil: Tx,
  daring: Rx,
  darkest: Px,
  darkness: jx,
  dauntless: Ix,
  dazzling: Ox,
  dead: Lx,
  deadening: Mx,
  deadlock: qx,
  deadly: Nx,
  deafening: Kx,
  dear: Wx,
  dearly: Ux,
  death: Hx,
  deaths: Gx,
  debonair: Vx,
  debt: Yx,
  deceit: Zx,
  deceitful: Jx,
  deceive: Xx,
  deceived: Qx,
  deceives: eS,
  deceiving: tS,
  deception: sS,
  deceptive: nS,
  decisive: iS,
  dedicated: rS,
  dedication: oS,
  defeat: aS,
  defeated: cS,
  defect: uS,
  defective: lS,
  defects: dS,
  defender: pS,
  defenders: gS,
  defenseless: hS,
  defer: fS,
  deferring: mS,
  defiant: yS,
  deficient: bS,
  deficiency: vS,
  deficiencies: DS,
  deficit: wS,
  deformed: kS,
  deformities: FS,
  deformity: AS,
  defraud: CS,
  defrauds: _S,
  deft: ES,
  defunct: xS,
  degrade: SS,
  degraded: $S,
  degrades: BS,
  dehumanize: zS,
  dehumanized: TS,
  dehumanizes: RS,
  dehumanizing: PS,
  deject: jS,
  dejected: IS,
  dejecting: OS,
  dejects: LS,
  delay: MS,
  delayed: qS,
  delectable: NS,
  delicious: KS,
  delight: WS,
  delighted: US,
  delightful: HS,
  delightfully: GS,
  delighting: VS,
  delights: YS,
  demand: ZS,
  demanded: JS,
  demanding: XS,
  demands: QS,
  demonstration: e$,
  demoralize: t$,
  demoralized: s$,
  demoralizes: n$,
  demoralizing: i$,
  denial: r$,
  denials: o$,
  denied: a$,
  denier: c$,
  deniers: u$,
  denies: l$,
  denounce: d$,
  denounces: p$,
  dent: g$,
  deny: h$,
  denying: f$,
  deplore: m$,
  deplored: y$,
  deplores: b$,
  deploring: v$,
  deport: D$,
  deported: w$,
  deporting: k$,
  deports: F$,
  deportation: A$,
  deportations: C$,
  depressed: _$,
  depressing: E$,
  deprivation: x$,
  derail: S$,
  derailed: $$,
  derails: B$,
  derelict: z$,
  deride: T$,
  derided: R$,
  derides: P$,
  deriding: j$,
  derision: I$,
  desirable: O$,
  desire: L$,
  desired: M$,
  desirous: q$,
  despair: N$,
  despairing: K$,
  despairs: W$,
  desperate: U$,
  desperately: H$,
  despondent: G$,
  destroy: V$,
  destroyed: Y$,
  destroying: Z$,
  destroys: J$,
  destruction: X$,
  destructive: Q$,
  detached: e7,
  detain: t7,
  detained: s7,
  detention: n7,
  deteriorate: i7,
  deteriorated: r7,
  deteriorates: o7,
  deteriorating: a7,
  determined: c7,
  deterrent: u7,
  detract: l7,
  detracted: d7,
  detracts: p7,
  devastate: g7,
  devastated: h7,
  devastating: f7,
  devastation: m7,
  devastations: y7,
  devoted: b7,
  devotion: v7,
  devotional: D7,
  diamond: w7,
  dick: k7,
  dickhead: F7,
  die: A7,
  died: C7,
  difficult: _7,
  diffident: E7,
  dignity: x7,
  dilemma: S7,
  dilligence: $7,
  dipshit: B7,
  dire: z7,
  direful: T7,
  dirt: R7,
  dirtier: P7,
  dirtiest: j7,
  dirty: I7,
  disabilities: O7,
  disability: L7,
  disabling: M7,
  disadvantage: q7,
  disadvantaged: N7,
  disagree: K7,
  disagreeable: W7,
  disagreement: U7,
  disappear: H7,
  disappeared: G7,
  disappears: V7,
  disappoint: Y7,
  disappointed: Z7,
  disappointing: J7,
  disappointment: X7,
  disappointments: Q7,
  disappoints: e9,
  disapproval: t9,
  disapprovals: s9,
  disapprove: n9,
  disapproved: i9,
  disapproves: r9,
  disapproving: o9,
  disaster: a9,
  disasters: c9,
  disastrous: u9,
  disbelieve: l9,
  discard: d9,
  discarded: p9,
  discarding: g9,
  discards: h9,
  discernment: f9,
  discomfort: m9,
  disconsolate: y9,
  disconsolation: b9,
  discontented: v9,
  discord: D9,
  discounted: w9,
  discouraged: k9,
  discredited: F9,
  discriminate: A9,
  discriminated: C9,
  discriminates: _9,
  discriminating: E9,
  discriminatory: x9,
  disdain: S9,
  disease: $9,
  diseases: B9,
  disgrace: z9,
  disgraced: T9,
  disguise: R9,
  disguised: P9,
  disguises: j9,
  disguising: I9,
  disgust: O9,
  disgusted: L9,
  disgustful: M9,
  disgusting: q9,
  disheartened: N9,
  dishonest: K9,
  disillusioned: W9,
  disinclined: U9,
  disjointed: H9,
  dislike: G9,
  disliked: V9,
  dislikes: Y9,
  dismal: Z9,
  dismayed: J9,
  dismissed: X9,
  disorder: Q9,
  disorders: eB,
  disorganized: tB,
  disoriented: sB,
  disparage: nB,
  disparaged: iB,
  disparages: rB,
  disparaging: oB,
  displeased: aB,
  displeasure: cB,
  disproportionate: uB,
  dispute: lB,
  disputed: dB,
  disputes: pB,
  disputing: gB,
  disqualified: hB,
  disquiet: fB,
  disregard: mB,
  disregarded: yB,
  disregarding: bB,
  disregards: vB,
  disrespect: DB,
  disrespected: wB,
  disrupt: kB,
  disrupted: FB,
  disrupting: AB,
  disruption: CB,
  disruptions: _B,
  disruptive: EB,
  disrupts: xB,
  dissatisfied: SB,
  distasteful: $B,
  distinguished: BB,
  distort: zB,
  distorted: TB,
  distorting: RB,
  distorts: PB,
  distract: jB,
  distracted: IB,
  distraction: OB,
  distracts: LB,
  distress: MB,
  distressed: qB,
  distresses: NB,
  distressing: KB,
  distrust: WB,
  distrustful: UB,
  disturb: HB,
  disturbed: GB,
  disturbing: VB,
  disturbs: YB,
  dithering: ZB,
  diverting: JB,
  dizzy: XB,
  dodging: QB,
  dodgy: e6,
  "does not work": -3,
  dolorous: t6,
  donate: s6,
  donated: n6,
  donates: i6,
  donating: r6,
  donation: o6,
  "dont like": -2,
  doom: a6,
  doomed: c6,
  doubt: u6,
  doubted: l6,
  doubtful: d6,
  doubting: p6,
  doubts: g6,
  douche: h6,
  douchebag: f6,
  dour: m6,
  downcast: y6,
  downer: b6,
  downhearted: v6,
  downside: D6,
  drag: w6,
  dragged: k6,
  drags: F6,
  drained: A6,
  dread: C6,
  dreaded: _6,
  dreadful: E6,
  dreading: x6,
  dream: S6,
  dreams: $6,
  dreary: B6,
  droopy: z6,
  drop: T6,
  dropped: R6,
  drown: P6,
  drowned: j6,
  drowns: I6,
  drudgery: O6,
  drunk: L6,
  dubious: M6,
  dud: q6,
  dull: N6,
  dumb: K6,
  dumbass: W6,
  dump: U6,
  dumped: H6,
  dumps: G6,
  dupe: V6,
  duped: Y6,
  dupery: Z6,
  durable: J6,
  dying: X6,
  dysfunction: Q6,
  eager: ez,
  earnest: tz,
  ease: sz,
  easy: nz,
  ecstatic: iz,
  eerie: rz,
  eery: oz,
  effective: az,
  effectively: cz,
  effectiveness: uz,
  effortlessly: lz,
  elated: dz,
  elation: pz,
  elegant: gz,
  elegantly: hz,
  embarrass: fz,
  embarrassed: mz,
  embarrasses: yz,
  embarrassing: bz,
  embarrassment: vz,
  embezzlement: Dz,
  embittered: wz,
  embrace: kz,
  emergency: Fz,
  empathetic: Az,
  empower: Cz,
  empowerment: _z,
  emptiness: Ez,
  empty: xz,
  enchanted: Sz,
  encourage: $z,
  encouraged: Bz,
  encouragement: zz,
  encourages: Tz,
  encouraging: Rz,
  endorse: Pz,
  endorsed: jz,
  endorsement: Iz,
  endorses: Oz,
  enemies: Lz,
  enemy: Mz,
  energetic: qz,
  engage: Nz,
  engages: Kz,
  engrossed: Wz,
  engrossing: Uz,
  enjoy: Hz,
  enjoyable: Gz,
  enjoyed: Vz,
  enjoying: Yz,
  enjoys: Zz,
  enlighten: Jz,
  enlightened: Xz,
  enlightening: Qz,
  enlightens: eT,
  ennui: tT,
  enrage: sT,
  enraged: nT,
  enrages: iT,
  enraging: rT,
  enrapture: oT,
  enslave: aT,
  enslaved: cT,
  enslaves: uT,
  ensure: lT,
  ensuring: dT,
  enterprising: pT,
  entertaining: gT,
  enthral: hT,
  enthusiastic: fT,
  entitled: mT,
  entrusted: yT,
  envies: bT,
  envious: vT,
  "environment-friendly": 2,
  envy: DT,
  envying: wT,
  erroneous: kT,
  error: FT,
  errors: AT,
  escape: -1,
  escapes: CT,
  escaping: _T,
  esteem: ET,
  esteemed: xT,
  ethical: ST,
  euphoria: $T,
  euphoric: BT,
  evacuate: zT,
  evacuated: TT,
  evacuates: RT,
  evacuating: PT,
  evacuation: jT,
  evergreen: IT,
  evergreens: OT,
  evergreening: LT,
  eviction: MT,
  evil: qT,
  exacerbate: NT,
  exacerbated: KT,
  exacerbates: WT,
  exacerbating: UT,
  exaggerate: HT,
  exaggerated: GT,
  exaggerates: VT,
  exaggerating: YT,
  exasparate: ZT,
  exasperated: JT,
  exasperates: XT,
  exasperating: QT,
  excellence: e8,
  excellent: t8,
  excite: s8,
  excited: n8,
  excitement: i8,
  exciting: r8,
  exclude: o8,
  excluded: a8,
  exclusion: c8,
  exclusive: u8,
  excruciatingly: l8,
  excuse: d8,
  exempt: p8,
  exhausted: g8,
  exhilarated: h8,
  exhilarates: f8,
  exhilarating: m8,
  exonerate: y8,
  exonerated: b8,
  exonerates: v8,
  exonerating: D8,
  expand: w8,
  expands: k8,
  expel: F8,
  expelled: A8,
  expelling: C8,
  expels: _8,
  expertly: E8,
  exploit: x8,
  exploited: S8,
  exploiting: $8,
  exploits: B8,
  exploration: z8,
  explorations: T8,
  expose: R8,
  exposed: P8,
  exposes: j8,
  exposing: I8,
  exquisite: O8,
  extend: L8,
  extends: 1,
  extremist: M8,
  extremists: q8,
  exuberant: N8,
  exultant: K8,
  exultantly: W8,
  fabulous: U8,
  fabulously: H8,
  fad: G8,
  fag: V8,
  faggot: Y8,
  faggots: Z8,
  fail: J8,
  failed: X8,
  failing: Q8,
  fails: eR,
  failure: tR,
  failures: sR,
  fainthearted: nR,
  fair: iR,
  fairness: rR,
  faith: oR,
  faithful: aR,
  fake: cR,
  faker: uR,
  fakes: lR,
  faking: dR,
  fallen: pR,
  falling: gR,
  false: -1,
  falsely: hR,
  falsified: fR,
  falsify: mR,
  fame: yR,
  famine: bR,
  famous: vR,
  fan: DR,
  fantastic: wR,
  farce: kR,
  fascinate: FR,
  fascinated: AR,
  fascinates: CR,
  fascinating: _R,
  fascination: ER,
  fascist: xR,
  fascists: SR,
  fatal: $R,
  fatalities: BR,
  fatality: zR,
  fatigue: TR,
  fatigued: RR,
  fatigues: PR,
  fatiguing: jR,
  favor: IR,
  favorable: OR,
  favorably: LR,
  favored: MR,
  favorite: qR,
  favorited: NR,
  favorites: KR,
  favors: WR,
  favour: UR,
  favourable: HR,
  favourably: GR,
  favoured: VR,
  favourite: YR,
  favourited: ZR,
  favourites: JR,
  favours: XR,
  fear: QR,
  fearful: eP,
  fearfully: tP,
  fearing: sP,
  fearless: nP,
  fearlessness: iP,
  fearsome: rP,
  "fed up": -3,
  feeble: oP,
  feeling: aP,
  felonies: cP,
  felony: uP,
  fertile: lP,
  fervent: dP,
  fervid: pP,
  festive: gP,
  fever: hP,
  fiasco: fP,
  fidgety: mP,
  fight: yP,
  fighting: bP,
  fine: vP,
  fines: DP,
  finest: wP,
  fire: kP,
  fired: FP,
  firing: AP,
  fit: CP,
  fitness: _P,
  filth: EP,
  filthy: xP,
  flagship: SP,
  flaw: $P,
  flawed: BP,
  flawless: zP,
  flawlessly: TP,
  flaws: RP,
  flees: PP,
  flop: jP,
  flops: IP,
  flu: OP,
  flustered: LP,
  focused: MP,
  fond: qP,
  fondness: NP,
  fool: KP,
  foolish: WP,
  fools: UP,
  forbid: HP,
  forbidden: GP,
  forbidding: VP,
  forced: YP,
  foreclosure: ZP,
  foreclosures: JP,
  forefront: XP,
  forget: QP,
  forgetful: ej,
  forgettable: tj,
  forgive: sj,
  forgiving: nj,
  forgot: ij,
  forgotten: rj,
  fortune: oj,
  fortunate: aj,
  fortunately: cj,
  foul: uj,
  frantic: lj,
  fraud: dj,
  frauds: pj,
  fraudster: gj,
  fraudsters: hj,
  fraudulence: fj,
  fraudulent: mj,
  freak: yj,
  free: bj,
  freedom: vj,
  freedoms: Dj,
  frenzy: wj,
  fresh: kj,
  friend: Fj,
  friendliness: Aj,
  friendly: Cj,
  friendship: _j,
  fright: Ej,
  frightened: xj,
  frightening: Sj,
  frikin: $j,
  frisky: Bj,
  frowning: zj,
  fruitless: Tj,
  frustrate: Rj,
  frustrated: Pj,
  frustrates: jj,
  frustrating: Ij,
  frustration: Oj,
  ftw: Lj,
  fuck: Mj,
  fucked: qj,
  fucker: Nj,
  fuckers: Kj,
  fuckface: Wj,
  fuckhead: Uj,
  fuckin: Hj,
  fucking: Gj,
  "fucking amazing": 4,
  "fucking beautiful": 4,
  "fucking cute": 4,
  "fucking fantastic": 4,
  "fucking good": 4,
  "fucking great": 4,
  "fucking hot": 2,
  "fucking love": 4,
  "fucking loves": 4,
  "fucking perfect": 4,
  fucktard: Vj,
  fud: Yj,
  fuked: Zj,
  fuking: Jj,
  fulfill: Xj,
  fulfilled: Qj,
  fulfillment: eI,
  fulfills: tI,
  fuming: sI,
  fun: nI,
  funeral: iI,
  funerals: rI,
  funky: oI,
  funnier: aI,
  funny: cI,
  furious: uI,
  futile: lI,
  gag: dI,
  gagged: pI,
  gain: gI,
  gained: hI,
  gaining: fI,
  gains: mI,
  gallant: yI,
  gallantly: bI,
  gallantry: vI,
  "game-changing": 3,
  garbage: DI,
  gem: wI,
  generous: kI,
  generously: FI,
  genial: AI,
  ghastly: CI,
  ghost: _I,
  giddy: EI,
  gift: xI,
  glad: SI,
  glamorous: $I,
  glamourous: BI,
  glee: zI,
  gleeful: TI,
  gloom: RI,
  gloomy: PI,
  glorious: jI,
  glory: II,
  glum: OI,
  god: LI,
  goddamn: MI,
  godsend: qI,
  gold: NI,
  good: KI,
  goodlooking: WI,
  goodmorning: UI,
  goodness: HI,
  goodwill: GI,
  goofiness: VI,
  goofy: YI,
  grace: ZI,
  graceful: JI,
  gracious: XI,
  grand: QI,
  grant: eO,
  granted: tO,
  granting: sO,
  grants: nO,
  grateful: iO,
  gratification: rO,
  grave: oO,
  gray: aO,
  grisly: cO,
  gr8: uO,
  great: lO,
  greater: dO,
  greatest: pO,
  greed: gO,
  greedy: hO,
  "green wash": -3,
  "green washing": -3,
  greenwash: fO,
  greenwasher: mO,
  greenwashers: yO,
  greenwashing: bO,
  greet: vO,
  greeted: DO,
  greeting: wO,
  greetings: kO,
  greets: FO,
  grey: AO,
  grief: CO,
  grieved: _O,
  grim: EO,
  gripping: xO,
  groan: SO,
  groaned: $O,
  groaning: BO,
  groans: zO,
  gross: TO,
  growing: RO,
  growth: PO,
  growths: jO,
  gruesome: IO,
  guarantee: OO,
  guilt: LO,
  guilty: MO,
  gullibility: qO,
  gullible: NO,
  gun: KO,
  ha: WO,
  hacked: UO,
  haha: HO,
  hahaha: GO,
  hahahah: VO,
  hail: YO,
  hailed: ZO,
  hallelujah: JO,
  handpicked: XO,
  handsome: QO,
  hapless: eL,
  haplessness: tL,
  happiest: sL,
  happiness: nL,
  happy: iL,
  harass: rL,
  harassed: oL,
  harasses: aL,
  harassing: cL,
  harassment: uL,
  hard: lL,
  hardier: dL,
  hardship: pL,
  hardy: gL,
  harm: hL,
  harmed: fL,
  harmful: mL,
  harming: yL,
  harmony: bL,
  harmonious: vL,
  harmoniously: DL,
  harms: wL,
  harried: kL,
  harsh: FL,
  harsher: AL,
  harshest: CL,
  harshly: _L,
  hate: EL,
  hated: xL,
  hater: SL,
  haters: $L,
  hates: BL,
  hating: zL,
  hatred: TL,
  haunt: RL,
  haunted: PL,
  haunting: jL,
  haunts: IL,
  havoc: OL,
  hazardous: LL,
  headache: ML,
  healthy: qL,
  heartbreaking: NL,
  heartbroken: KL,
  heartfelt: WL,
  heartless: UL,
  heartwarming: HL,
  heaven: GL,
  heavenly: VL,
  heavyhearted: YL,
  hehe: ZL,
  hell: JL,
  hellish: XL,
  help: QL,
  helpful: eM,
  helping: tM,
  helpless: sM,
  helps: nM,
  hero: iM,
  heroes: rM,
  heroic: oM,
  hesitant: aM,
  hesitate: cM,
  hid: uM,
  hide: lM,
  hideous: dM,
  hides: pM,
  hiding: gM,
  highlight: hM,
  hilarious: fM,
  hinder: mM,
  hindrance: yM,
  hoax: bM,
  hollow: vM,
  homeless: DM,
  homesick: wM,
  homicide: kM,
  homicides: FM,
  honest: AM,
  honor: CM,
  honored: _M,
  honoring: EM,
  honour: xM,
  honoured: SM,
  honouring: $M,
  hooligan: BM,
  hooliganism: zM,
  hooligans: TM,
  hope: RM,
  hopeful: PM,
  hopefully: jM,
  hopeless: IM,
  hopelessness: OM,
  hopes: LM,
  hoping: MM,
  horrendous: qM,
  horrid: NM,
  horrible: KM,
  horrific: WM,
  horrified: UM,
  hospitalized: HM,
  hostile: GM,
  huckster: VM,
  hug: YM,
  huge: ZM,
  hugs: JM,
  humane: XM,
  humble: QM,
  humbug: eq,
  humerous: tq,
  humiliated: sq,
  humiliation: nq,
  humor: iq,
  humorous: rq,
  humour: oq,
  humourous: aq,
  hunger: cq,
  hurrah: uq,
  hurt: lq,
  hurting: dq,
  hurts: pq,
  hypocritical: gq,
  hysteria: hq,
  hysterical: fq,
  hysterics: mq,
  icky: yq,
  idiocy: bq,
  idiot: vq,
  idiotic: Dq,
  ignorance: wq,
  ignorant: kq,
  ignore: Fq,
  ignored: Aq,
  ignores: Cq,
  ill: _q,
  "ill-fated": -2,
  illegal: Eq,
  illegally: xq,
  illegitimate: Sq,
  illiteracy: $q,
  illness: Bq,
  illnesses: zq,
  illogical: Tq,
  imaginative: Rq,
  imbecile: Pq,
  immobilized: jq,
  immortal: Iq,
  immune: Oq,
  impair: Lq,
  impaired: Mq,
  impairing: qq,
  impairment: Nq,
  impairs: Kq,
  impatient: Wq,
  impeachment: Uq,
  impeachments: Hq,
  impede: Gq,
  impeded: Vq,
  impedes: Yq,
  impeding: Zq,
  impedingly: Jq,
  imperfect: Xq,
  importance: Qq,
  important: eN,
  impose: tN,
  imposed: sN,
  imposes: nN,
  imposing: iN,
  imposter: rN,
  impotent: oN,
  impress: aN,
  impressed: cN,
  impresses: uN,
  impressive: lN,
  imprisoned: dN,
  imprisonment: pN,
  improper: gN,
  improperly: hN,
  improve: fN,
  improved: mN,
  improvement: yN,
  improves: bN,
  improving: vN,
  inability: DN,
  inaction: wN,
  inadequate: kN,
  inadvertently: FN,
  inappropriate: AN,
  incapable: CN,
  incapacitated: _N,
  incapacitates: EN,
  incapacitating: xN,
  incense: SN,
  incensed: $N,
  incenses: BN,
  incensing: zN,
  incoherent: TN,
  incompetence: RN,
  incompetent: PN,
  incomplete: jN,
  incomprehensible: IN,
  inconsiderate: ON,
  inconvenience: LN,
  inconvenient: MN,
  increase: qN,
  increased: NN,
  indecisive: KN,
  indestructible: WN,
  indicted: UN,
  indifference: HN,
  indifferent: GN,
  indignant: VN,
  indignation: YN,
  indoctrinate: ZN,
  indoctrinated: JN,
  indoctrinates: XN,
  indoctrinating: QN,
  inediable: eK,
  inexorable: tK,
  inexcusable: sK,
  ineffective: nK,
  ineffectively: iK,
  ineffectual: rK,
  inefficiency: oK,
  inefficient: aK,
  inefficiently: cK,
  inept: uK,
  ineptitude: lK,
  infantile: dK,
  infantilized: pK,
  infatuated: gK,
  infatuation: hK,
  infect: fK,
  infected: mK,
  infecting: yK,
  infection: bK,
  infections: vK,
  infectious: DK,
  infects: wK,
  inferior: kK,
  infest: FK,
  infested: AK,
  infesting: CK,
  infests: _K,
  inflamed: EK,
  inflict: xK,
  inflicted: SK,
  inflicting: $K,
  inflicts: BK,
  influential: zK,
  infract: TK,
  infracted: RK,
  infracting: PK,
  infracts: jK,
  infringement: IK,
  infuriate: OK,
  infuriated: LK,
  infuriates: MK,
  infuriating: qK,
  inhibit: NK,
  inhuman: KK,
  injured: WK,
  injuries: UK,
  injury: HK,
  injustice: GK,
  innovate: VK,
  innovates: YK,
  innovation: ZK,
  innovative: JK,
  inoperative: XK,
  inquisition: QK,
  inquisitive: eW,
  insane: tW,
  insanity: sW,
  insecure: nW,
  insensitive: iW,
  insensitivity: rW,
  insignificant: oW,
  insipid: aW,
  insolvent: cW,
  insomnia: uW,
  inspiration: lW,
  inspirational: dW,
  inspire: pW,
  inspired: gW,
  inspires: hW,
  inspiring: fW,
  insufficiency: mW,
  insufficient: yW,
  insufficiently: bW,
  insult: vW,
  insulted: DW,
  insulting: wW,
  insults: kW,
  intact: FW,
  integrity: AW,
  intelligent: CW,
  intense: _W,
  interest: EW,
  interested: xW,
  interesting: SW,
  interests: $W,
  interrogated: BW,
  interrupt: zW,
  interrupted: TW,
  interrupting: RW,
  interruption: PW,
  interrupts: jW,
  intimacy: IW,
  intimidate: OW,
  intimidated: LW,
  intimidates: MW,
  intimidating: qW,
  intimidation: NW,
  intransigence: KW,
  intransigency: WW,
  intricate: UW,
  intrigues: HW,
  invasion: GW,
  invincible: VW,
  invite: YW,
  inviting: ZW,
  invulnerable: JW,
  irate: XW,
  ironic: QW,
  irony: eU,
  irrational: tU,
  irreparable: sU,
  irreproducible: nU,
  irresistible: iU,
  irresistibly: rU,
  irresolute: oU,
  irresponsible: aU,
  irresponsibly: cU,
  irreversible: uU,
  irreversibly: lU,
  irritate: dU,
  irritated: pU,
  irritates: gU,
  irritating: hU,
  isolated: fU,
  itchy: mU,
  jackass: yU,
  jackasses: bU,
  jailed: vU,
  jaunty: DU,
  jealous: wU,
  jealousy: kU,
  jeopardy: FU,
  jerk: AU,
  jesus: CU,
  jewel: _U,
  jewels: EU,
  jocular: xU,
  join: SU,
  joke: $U,
  jokes: BU,
  jolly: zU,
  jovial: TU,
  joy: RU,
  joyful: PU,
  joyfully: jU,
  joyless: IU,
  joyous: OU,
  jubilant: LU,
  jumpy: MU,
  justice: qU,
  justifiably: NU,
  justified: KU,
  keen: WU,
  kickback: UU,
  kickbacks: HU,
  kidnap: GU,
  kidnapped: VU,
  kidnapping: YU,
  kidnappings: ZU,
  kidnaps: JU,
  kill: XU,
  killed: QU,
  killing: eH,
  kills: tH,
  kind: sH,
  "kind of": 0,
  kinder: nH,
  kindness: iH,
  kiss: rH,
  kudos: oH,
  lack: aH,
  lackadaisical: cH,
  lag: uH,
  lagged: lH,
  lagging: dH,
  lags: pH,
  lame: gH,
  landmark: hH,
  lapse: fH,
  lapsed: mH,
  laugh: yH,
  laughed: bH,
  laughing: vH,
  laughs: DH,
  laughting: wH,
  launched: kH,
  lawl: FH,
  lawsuit: AH,
  lawsuits: CH,
  lazy: _H,
  leadership: EH,
  leading: xH,
  leak: SH,
  leaked: $H,
  leave: BH,
  legal: zH,
  legally: TH,
  lenient: RH,
  lethal: PH,
  lethality: jH,
  lethargic: IH,
  lethargy: OH,
  liar: LH,
  liars: MH,
  libelous: qH,
  lied: NH,
  lifeless: KH,
  lifesaver: WH,
  lighthearted: UH,
  likable: HH,
  like: GH,
  likeable: VH,
  liked: YH,
  likers: ZH,
  likes: JH,
  liking: XH,
  limitation: QH,
  limited: eG,
  limits: tG,
  litigation: sG,
  litigious: nG,
  lively: iG,
  livid: rG,
  lmao: oG,
  lmfao: aG,
  loathe: cG,
  loathed: uG,
  loathes: lG,
  loathing: dG,
  loathsome: pG,
  lobbied: gG,
  lobby: hG,
  lobbying: fG,
  lobbyist: mG,
  lobbyists: yG,
  lol: bG,
  lolol: vG,
  lololol: DG,
  lolololol: wG,
  lonely: kG,
  lonesome: FG,
  longing: AG,
  lool: CG,
  loom: _G,
  loomed: EG,
  looming: xG,
  looms: SG,
  loool: $G,
  looool: BG,
  loose: zG,
  looses: TG,
  loser: RG,
  losing: PG,
  loss: jG,
  losses: IG,
  lost: OG,
  lousy: LG,
  lovable: MG,
  love: qG,
  loved: NG,
  lovelies: KG,
  lovely: WG,
  loves: UG,
  loving: HG,
  "loving-kindness": 3,
  lowest: GG,
  loyal: VG,
  loyalty: YG,
  luck: ZG,
  luckily: JG,
  lucky: XG,
  lucrative: QG,
  ludicrous: eV,
  lugubrious: tV,
  lunatic: sV,
  lunatics: nV,
  lurk: iV,
  lurking: rV,
  lurks: oV,
  luxury: aV,
  macabre: cV,
  mad: uV,
  maddening: lV,
  "made-up": -1,
  madly: dV,
  madness: pV,
  magnificent: gV,
  maladaption: hV,
  maldevelopment: fV,
  maltreatment: mV,
  mandatory: yV,
  manipulated: bV,
  manipulating: vV,
  manipulation: DV,
  manslaughter: wV,
  marvel: kV,
  marvelous: FV,
  marvels: AV,
  masterpiece: CV,
  masterpieces: _V,
  matter: EV,
  matters: xV,
  mature: SV,
  meaningful: $V,
  meaningless: BV,
  medal: zV,
  mediocrity: TV,
  meditative: RV,
  melancholy: PV,
  memorable: jV,
  memoriam: IV,
  menace: OV,
  menaced: LV,
  menaces: MV,
  mercy: qV,
  merry: NV,
  mesmerizing: KV,
  mess: WV,
  messed: UV,
  "messing up": -2,
  methodical: HV,
  methodically: GV,
  mindless: VV,
  miracle: YV,
  mirth: ZV,
  mirthful: JV,
  mirthfully: XV,
  misbehave: QV,
  misbehaved: eY,
  misbehaves: tY,
  misbehaving: sY,
  misbranding: nY,
  miscast: iY,
  mischief: rY,
  mischiefs: oY,
  misclassified: aY,
  misclassifies: cY,
  misclassify: uY,
  misconduct: lY,
  misconducted: dY,
  misconducting: pY,
  misconducts: gY,
  miserable: hY,
  miserably: fY,
  misery: mY,
  misfire: yY,
  misfortune: bY,
  misgiving: vY,
  misinformation: DY,
  misinformed: wY,
  misinterpreted: kY,
  mislead: FY,
  misleaded: AY,
  misleading: CY,
  misleads: _Y,
  misplace: EY,
  misplaced: xY,
  misplaces: SY,
  misplacing: $Y,
  mispricing: BY,
  misread: zY,
  misreport: TY,
  misreported: RY,
  misreporting: PY,
  misreports: jY,
  misrepresent: IY,
  misrepresentation: OY,
  misrepresentations: LY,
  misrepresented: MY,
  misrepresenting: qY,
  misrepresents: NY,
  miss: KY,
  missed: WY,
  missing: UY,
  mistake: HY,
  mistaken: GY,
  mistakes: VY,
  mistaking: YY,
  misunderstand: ZY,
  misunderstanding: JY,
  misunderstands: XY,
  misunderstood: QY,
  misuse: eZ,
  misused: tZ,
  misuses: sZ,
  misusing: nZ,
  moan: iZ,
  moaned: rZ,
  moaning: oZ,
  moans: aZ,
  mock: cZ,
  mocked: uZ,
  mocking: lZ,
  mocks: dZ,
  modernize: pZ,
  modernized: gZ,
  modernizes: hZ,
  modernizing: fZ,
  mongering: mZ,
  monopolize: yZ,
  monopolized: bZ,
  monopolizes: vZ,
  monopolizing: DZ,
  monotone: wZ,
  moody: kZ,
  mope: FZ,
  moping: AZ,
  moron: CZ,
  motherfucker: _Z,
  motherfucking: EZ,
  motivate: xZ,
  motivated: SZ,
  motivating: $Z,
  motivation: BZ,
  mourn: zZ,
  mourned: TZ,
  mournful: RZ,
  mourning: PZ,
  mourns: jZ,
  muddy: IZ,
  mumpish: OZ,
  murder: LZ,
  murderer: MZ,
  murdering: qZ,
  murderous: NZ,
  murders: KZ,
  murky: WZ,
  myth: UZ,
  n00b: HZ,
  naive: GZ,
  narcissism: VZ,
  nasty: YZ,
  natural: ZZ,
  naïve: -2,
  needy: JZ,
  negative: XZ,
  negativity: QZ,
  neglect: eJ,
  neglected: tJ,
  neglecting: sJ,
  neglects: nJ,
  nerves: iJ,
  nervous: rJ,
  nervously: oJ,
  nice: aJ,
  nifty: cJ,
  niggas: uJ,
  nigger: lJ,
  no: dJ,
  "no fun": -3,
  noble: pJ,
  noblest: gJ,
  noisy: hJ,
  "non-approved": -2,
  nonsense: fJ,
  noob: mJ,
  nosey: yJ,
  "not good": -2,
  "not working": -3,
  notable: bJ,
  noticeable: vJ,
  notorious: DJ,
  novel: wJ,
  numb: kJ,
  nurturing: FJ,
  nuts: AJ,
  obliterate: CJ,
  obliterated: _J,
  obnoxious: EJ,
  obscene: xJ,
  obscenity: SJ,
  obsessed: $J,
  obsolete: BJ,
  obstacle: zJ,
  obstacles: TJ,
  obstinate: RJ,
  obstruct: PJ,
  obstructed: jJ,
  obstructing: IJ,
  obstruction: OJ,
  obstructs: LJ,
  odd: MJ,
  offence: qJ,
  offences: NJ,
  offend: KJ,
  offended: WJ,
  offender: UJ,
  offending: HJ,
  offends: GJ,
  offense: VJ,
  offenses: YJ,
  offensive: ZJ,
  offensively: JJ,
  offline: XJ,
  oks: QJ,
  ominous: eX,
  "once-in-a-lifetime": 3,
  oops: tX,
  opportunities: sX,
  opportunity: nX,
  oppressed: iX,
  oppression: rX,
  oppressions: oX,
  oppressive: aX,
  optimism: cX,
  optimistic: uX,
  optionless: lX,
  ostracize: dX,
  ostracized: pX,
  ostracizes: gX,
  ouch: hX,
  outage: fX,
  outages: mX,
  outbreak: yX,
  outbreaks: bX,
  outcry: vX,
  outmaneuvered: DX,
  outnumbered: wX,
  outrage: kX,
  outraged: FX,
  outrageous: AX,
  outreach: CX,
  outstanding: _X,
  overjoyed: EX,
  overload: xX,
  overlooked: SX,
  overprotective: $X,
  overran: BX,
  overreact: zX,
  overreacted: TX,
  overreacting: RX,
  overreaction: PX,
  overreacts: jX,
  oversell: IX,
  overselling: OX,
  oversells: LX,
  oversight: MX,
  oversimplification: qX,
  oversimplified: NX,
  oversimplifies: KX,
  oversimplify: WX,
  oversold: UX,
  overstatement: HX,
  overstatements: GX,
  overweight: VX,
  overwrought: YX,
  oxymoron: ZX,
  pain: JX,
  pained: XX,
  painful: QX,
  panic: eQ,
  panicked: tQ,
  panics: sQ,
  paradise: nQ,
  paradox: iQ,
  pardon: rQ,
  pardoned: oQ,
  pardoning: aQ,
  pardons: cQ,
  parley: uQ,
  passion: lQ,
  passionate: dQ,
  passive: pQ,
  passively: gQ,
  pathetic: hQ,
  pay: fQ,
  peace: mQ,
  peaceful: yQ,
  peacefully: bQ,
  penalize: vQ,
  penalized: DQ,
  penalizes: wQ,
  penalizing: kQ,
  penalty: FQ,
  pensive: AQ,
  perfect: CQ,
  perfected: _Q,
  perfection: EQ,
  perfectly: xQ,
  perfects: SQ,
  peril: $Q,
  perjury: BQ,
  perpetrated: zQ,
  perpetrator: TQ,
  perpetrators: RQ,
  perplexed: PQ,
  persecute: jQ,
  persecuted: IQ,
  persecutes: OQ,
  persecuting: LQ,
  perturbed: MQ,
  pervert: qQ,
  pesky: NQ,
  pessimism: KQ,
  pessimistic: WQ,
  petrified: UQ,
  philanthropy: HQ,
  phobic: GQ,
  picturesque: VQ,
  pileup: YQ,
  pillage: ZQ,
  pique: JQ,
  piqued: XQ,
  piss: QQ,
  pissed: eee,
  pissing: tee,
  piteous: see,
  pitied: nee,
  pity: iee,
  plague: ree,
  plagued: oee,
  plagues: aee,
  plaguing: cee,
  playful: uee,
  pleasant: lee,
  please: dee,
  pleased: pee,
  pleasurable: gee,
  pleasure: hee,
  plodding: fee,
  poignant: mee,
  pointless: yee,
  poised: bee,
  poison: vee,
  poisoned: Dee,
  poisons: wee,
  polished: kee,
  polite: Fee,
  politeness: Aee,
  pollutant: Cee,
  pollute: _ee,
  polluted: Eee,
  polluter: xee,
  polluters: See,
  pollutes: $ee,
  pollution: Bee,
  poor: zee,
  poorer: Tee,
  poorest: Ree,
  poorly: Pee,
  popular: jee,
  popularity: Iee,
  positive: Oee,
  positively: Lee,
  possessive: Mee,
  "post-traumatic": -2,
  postpone: qee,
  postponed: Nee,
  postpones: Kee,
  postponing: Wee,
  poverty: Uee,
  powerful: Hee,
  powerless: Gee,
  praise: Vee,
  praised: Yee,
  praises: Zee,
  praising: Jee,
  pray: Xee,
  praying: Qee,
  prays: ete,
  prblm: tte,
  prblms: ste,
  predatory: nte,
  prepared: ite,
  pressure: rte,
  pressured: ote,
  pretend: ate,
  pretending: cte,
  pretends: ute,
  pretty: lte,
  prevent: dte,
  prevented: pte,
  preventing: gte,
  prevents: hte,
  prick: fte,
  prison: mte,
  prisoner: yte,
  prisoners: bte,
  privileged: vte,
  proactive: Dte,
  problem: wte,
  problems: kte,
  profit: Fte,
  profitable: Ate,
  profiteer: Cte,
  profits: _te,
  progress: Ete,
  prohibit: xte,
  prohibits: Ste,
  prominent: $te,
  promise: Bte,
  promised: zte,
  promises: Tte,
  promote: Rte,
  promoted: Pte,
  promotes: jte,
  promoting: Ite,
  promptly: Ote,
  propaganda: Lte,
  prosecute: Mte,
  prosecuted: qte,
  prosecutes: Nte,
  prosecution: Kte,
  prospect: Wte,
  prospects: Ute,
  prosperity: Hte,
  prosperous: Gte,
  protect: Vte,
  protected: 1,
  protects: Yte,
  protest: Zte,
  protesters: Jte,
  protesting: Xte,
  protests: Qte,
  proud: ese,
  proudly: tse,
  provoke: sse,
  provoked: nse,
  provokes: ise,
  provoking: rse,
  prudence: ose,
  pseudoscience: ase,
  psychopathic: cse,
  punish: use,
  punished: lse,
  punishes: dse,
  punishing: pse,
  punitive: gse,
  pure: hse,
  purest: fse,
  purposeful: mse,
  pushy: yse,
  puzzled: bse,
  quaking: vse,
  qualities: Dse,
  quality: wse,
  questionable: kse,
  questioned: Fse,
  questioning: Ase,
  racism: Cse,
  racist: _se,
  racists: Ese,
  rage: xse,
  rageful: Sse,
  rainy: $se,
  rant: Bse,
  ranter: zse,
  ranters: Tse,
  rants: Rse,
  rape: Pse,
  raped: jse,
  rapist: Ise,
  rapture: Ose,
  raptured: Lse,
  raptures: Mse,
  rapturous: qse,
  rash: Nse,
  ratified: Kse,
  reach: Wse,
  reached: Use,
  reaches: Hse,
  reaching: Gse,
  reassure: Vse,
  reassured: Yse,
  reassures: Zse,
  reassuring: Jse,
  rebel: Xse,
  rebellion: Qse,
  rebels: ene,
  recession: tne,
  reckless: sne,
  recognition: nne,
  recommend: ine,
  recommended: rne,
  recommends: one,
  redeemed: ane,
  refine: cne,
  refined: une,
  refines: lne,
  refreshingly: dne,
  refuse: pne,
  refused: gne,
  refuses: hne,
  refusing: fne,
  regret: mne,
  regretful: yne,
  regrets: bne,
  regretted: vne,
  regretting: Dne,
  reigning: wne,
  reject: kne,
  rejected: Fne,
  rejecting: Ane,
  rejection: Cne,
  rejects: _ne,
  rejoice: Ene,
  rejoiced: xne,
  rejoices: Sne,
  rejoicing: $ne,
  relaxed: Bne,
  relentless: zne,
  reliability: Tne,
  reliable: Rne,
  reliably: Pne,
  reliant: jne,
  relieve: Ine,
  relieved: One,
  relieves: Lne,
  relieving: Mne,
  relishing: qne,
  remarkable: Nne,
  remorse: Kne,
  repellent: Wne,
  repercussion: Une,
  repercussions: Hne,
  reprimand: Gne,
  reprimanded: Vne,
  reprimanding: Yne,
  reprimands: Zne,
  repulse: Jne,
  repulsed: Xne,
  repulsive: Qne,
  rescue: eie,
  rescued: tie,
  rescues: sie,
  resentful: nie,
  resign: iie,
  resigned: rie,
  resigning: oie,
  resigns: aie,
  resolute: cie,
  resolution: uie,
  resolve: lie,
  resolved: die,
  resolves: pie,
  resolving: gie,
  respect: hie,
  respected: fie,
  respects: mie,
  responsibility: yie,
  responsible: bie,
  responsive: vie,
  restful: Die,
  restless: wie,
  restore: kie,
  restored: Fie,
  restores: Aie,
  restoring: Cie,
  restrict: _ie,
  restricted: Eie,
  restricting: xie,
  restriction: Sie,
  restrictive: $ie,
  restricts: Bie,
  retained: zie,
  retard: Tie,
  retarded: Rie,
  retreat: Pie,
  revenge: jie,
  revengeful: Iie,
  revered: Oie,
  revive: Lie,
  revives: Mie,
  revolting: qie,
  reward: Nie,
  rewarded: Kie,
  rewarding: Wie,
  rewards: Uie,
  rich: Hie,
  richly: Gie,
  ridiculous: Vie,
  rig: Yie,
  rigged: Zie,
  "right direction": 3,
  righteousness: Jie,
  rightful: Xie,
  rightfully: Qie,
  rigorous: ere,
  rigorously: tre,
  riot: sre,
  riots: nre,
  rise: ire,
  rises: rre,
  risk: ore,
  risks: are,
  risky: cre,
  riveting: ure,
  rob: lre,
  robber: dre,
  robed: pre,
  robing: gre,
  robs: hre,
  robust: fre,
  rofl: mre,
  roflcopter: yre,
  roflmao: bre,
  romance: vre,
  romantical: Dre,
  romantically: wre,
  rose: kre,
  rotfl: Fre,
  rotflmfao: Are,
  rotflol: Cre,
  rotten: _re,
  rude: Ere,
  ruin: xre,
  ruined: Sre,
  ruining: $re,
  ruins: Bre,
  sabotage: zre,
  sad: Tre,
  sadden: Rre,
  saddened: Pre,
  sadly: jre,
  safe: Ire,
  safely: Ore,
  safer: Lre,
  safety: Mre,
  salient: qre,
  salute: Nre,
  saluted: Kre,
  salutes: Wre,
  saluting: Ure,
  salvation: Hre,
  sappy: Gre,
  sarcastic: Vre,
  satisfied: Yre,
  savange: Zre,
  savanges: Jre,
  save: Xre,
  saved: Qre,
  savings: eoe,
  scam: toe,
  scams: soe,
  scandal: noe,
  scandalous: ioe,
  scandals: roe,
  scapegoat: ooe,
  scapegoats: aoe,
  scare: coe,
  scared: uoe,
  scar: loe,
  scars: doe,
  scary: poe,
  sceptical: goe,
  scold: hoe,
  scoop: foe,
  scorn: moe,
  scornful: yoe,
  scream: boe,
  screamed: voe,
  screaming: Doe,
  screams: woe,
  screwed: koe,
  "screwed up": -3,
  scum: Foe,
  scumbag: Aoe,
  seamless: Coe,
  seamlessly: _oe,
  secure: Eoe,
  secured: xoe,
  secures: Soe,
  sedition: $oe,
  seditious: Boe,
  seduced: zoe,
  "self-abuse": -2,
  "self-confident": 2,
  "self-contradictory": -2,
  "self-deluded": -2,
  selfish: Toe,
  selfishness: Roe,
  sentence: Poe,
  sentenced: joe,
  sentences: Ioe,
  sentencing: Ooe,
  serene: Loe,
  settlement: Moe,
  settlements: qoe,
  severe: Noe,
  severely: Koe,
  sexist: Woe,
  sexistic: Uoe,
  sexy: Hoe,
  shaky: Goe,
  shame: Voe,
  shamed: Yoe,
  shameful: Zoe,
  share: Joe,
  shared: Xoe,
  shares: Qoe,
  shattered: eae,
  shit: tae,
  shithead: sae,
  shitty: nae,
  shock: iae,
  shocked: rae,
  shocking: oae,
  shocks: aae,
  shoody: cae,
  shoot: uae,
  "short-sighted": -2,
  "short-sightedness": -2,
  shortage: lae,
  shortages: dae,
  shrew: pae,
  shy: gae,
  sick: hae,
  sickness: fae,
  "side-effect": -2,
  "side-effects": -2,
  sigh: mae,
  significance: yae,
  significant: bae,
  silencing: vae,
  silly: Dae,
  simplicity: wae,
  sin: kae,
  sincere: Fae,
  sincerely: Aae,
  sincerest: Cae,
  sincerity: _ae,
  sinful: Eae,
  singleminded: xae,
  sinister: Sae,
  sins: $ae,
  skeptic: Bae,
  skeptical: zae,
  skepticism: Tae,
  skeptics: Rae,
  slam: Pae,
  slash: jae,
  slashed: Iae,
  slashes: Oae,
  slashing: Lae,
  slave: Mae,
  slavery: qae,
  slaves: Nae,
  sleeplessness: Kae,
  slick: Wae,
  slicker: Uae,
  slickest: Hae,
  slip: Gae,
  sloppy: Vae,
  sluggish: Yae,
  slumping: Zae,
  slut: Jae,
  smart: Xae,
  smarter: Qae,
  smartest: ece,
  smear: tce,
  smile: sce,
  smiled: nce,
  smiles: ice,
  smiling: rce,
  smog: oce,
  smuggle: ace,
  smuggled: cce,
  smuggling: uce,
  smuggles: lce,
  sneaky: dce,
  sneeze: pce,
  sneezed: gce,
  sneezes: hce,
  sneezing: fce,
  snub: mce,
  snubbed: yce,
  snubbing: bce,
  snubs: vce,
  sobering: Dce,
  solemn: wce,
  solid: kce,
  solidarity: Fce,
  solidified: Ace,
  solidifies: Cce,
  solidify: _ce,
  solidifying: Ece,
  solution: xce,
  solutions: Sce,
  solve: $ce,
  solved: Bce,
  solves: zce,
  solving: Tce,
  somber: Rce,
  "some kind": 0,
  "son-of-a-bitch": -5,
  soothe: Pce,
  soothed: jce,
  soothing: Ice,
  sophisticated: Oce,
  sore: Lce,
  sorrow: Mce,
  sorrowful: qce,
  sorry: Nce,
  spacious: Kce,
  spam: Wce,
  spammer: Uce,
  spammers: Hce,
  spamming: Gce,
  spark: Vce,
  sparkle: Yce,
  sparkles: Zce,
  sparkling: Jce,
  spearhead: Xce,
  speculative: Qce,
  spirit: eue,
  spirited: tue,
  spiritless: sue,
  spiteful: nue,
  splendid: iue,
  spoiled: rue,
  spoilt: oue,
  spotless: aue,
  sprightly: cue,
  squander: uue,
  squandered: lue,
  squandering: due,
  squanders: pue,
  squelched: gue,
  stab: hue,
  stabbed: fue,
  stable: mue,
  stabs: yue,
  stall: bue,
  stalled: vue,
  stalling: Due,
  stamina: wue,
  stampede: kue,
  stank: Fue,
  startled: Aue,
  startling: Cue,
  starve: _ue,
  starved: Eue,
  starves: xue,
  starving: Sue,
  steadfast: $ue,
  steal: Bue,
  stealing: zue,
  steals: Tue,
  stereotype: Rue,
  stereotyped: Pue,
  stifled: jue,
  stimulate: Iue,
  stimulated: Oue,
  stimulates: Lue,
  stimulating: Mue,
  stingy: que,
  stink: Nue,
  stinked: Kue,
  stinker: Wue,
  stinking: Uue,
  stinks: Hue,
  stinky: Gue,
  stole: Vue,
  stolen: Yue,
  stop: Zue,
  stopped: Jue,
  stopping: Xue,
  stops: Que,
  stout: ele,
  straight: tle,
  strange: sle,
  strangely: nle,
  strangled: ile,
  strength: rle,
  strengthen: ole,
  strengthened: ale,
  strengthening: cle,
  strengthens: ule,
  strengths: lle,
  stress: dle,
  stressed: ple,
  stressor: gle,
  stressors: hle,
  stricken: fle,
  strike: mle,
  strikers: yle,
  strikes: ble,
  strong: vle,
  stronger: Dle,
  strongest: wle,
  struck: kle,
  struggle: Fle,
  struggled: Ale,
  struggles: Cle,
  struggling: _le,
  stubborn: Ele,
  stuck: xle,
  stunned: Sle,
  stunning: $le,
  stupid: Ble,
  stupidity: zle,
  stupidly: Tle,
  suave: Rle,
  subpoena: Ple,
  substantial: jle,
  substantially: Ile,
  subversive: Ole,
  succeed: Lle,
  succeeded: Mle,
  succeeding: qle,
  succeeds: Nle,
  success: Kle,
  successful: Wle,
  successfully: Ule,
  suck: Hle,
  sucks: Gle,
  sue: Vle,
  sued: Yle,
  sueing: Zle,
  sues: Jle,
  suffer: Xle,
  suffered: Qle,
  sufferer: ede,
  sufferers: tde,
  suffering: sde,
  suffers: nde,
  suicidal: ide,
  suicide: rde,
  suicides: ode,
  suing: ade,
  suitable: cde,
  suited: ude,
  sulking: lde,
  sulky: dde,
  sullen: pde,
  sunshine: gde,
  super: 3,
  superb: hde,
  superior: fde,
  support: mde,
  supported: yde,
  supporter: bde,
  supporters: vde,
  supporting: Dde,
  supportive: wde,
  supports: kde,
  supreme: Fde,
  survived: Ade,
  surviving: Cde,
  survivor: _de,
  suspect: Ede,
  suspected: xde,
  suspecting: Sde,
  suspects: $de,
  suspend: Bde,
  suspended: zde,
  suspicious: Tde,
  sustainability: Rde,
  sustainable: Pde,
  sustainably: jde,
  swear: Ide,
  swearing: Ode,
  swears: Lde,
  sweet: Mde,
  sweeter: qde,
  sweetest: Nde,
  swift: Kde,
  swiftly: Wde,
  swindle: Ude,
  swindles: Hde,
  swindling: Gde,
  sympathetic: Vde,
  sympathy: Yde,
  taint: Zde,
  tainted: Jde,
  talent: Xde,
  tard: Qde,
  tarnish: e1e,
  tarnished: t1e,
  tarnishes: s1e,
  tears: n1e,
  tender: i1e,
  tenderness: r1e,
  tense: o1e,
  tension: a1e,
  terrible: c1e,
  terribly: u1e,
  terrific: l1e,
  terrifically: d1e,
  terrified: p1e,
  terror: g1e,
  terrorist: h1e,
  terrorists: f1e,
  terrorize: m1e,
  terrorized: y1e,
  terrorizes: b1e,
  thank: v1e,
  thankful: D1e,
  thanks: w1e,
  thorny: k1e,
  thoughtful: F1e,
  thoughtless: A1e,
  threat: C1e,
  threaten: _1e,
  threatened: E1e,
  threatening: x1e,
  threatens: S1e,
  threats: $1e,
  thrilled: B1e,
  thwart: z1e,
  thwarted: T1e,
  thwarting: R1e,
  thwarts: P1e,
  timid: j1e,
  timorous: I1e,
  tired: O1e,
  tits: L1e,
  tolerance: M1e,
  tolerant: q1e,
  toothless: N1e,
  top: K1e,
  tops: W1e,
  torn: U1e,
  torture: H1e,
  tortured: G1e,
  tortures: V1e,
  torturing: Y1e,
  totalitarian: Z1e,
  totalitarianism: J1e,
  tout: X1e,
  touted: Q1e,
  touting: epe,
  touts: tpe,
  toxic: spe,
  tragedies: npe,
  tragedy: ipe,
  tragic: rpe,
  tranquil: ope,
  transgress: ape,
  transgressed: cpe,
  transgresses: upe,
  transgressing: lpe,
  trap: dpe,
  trapped: ppe,
  traps: gpe,
  trauma: hpe,
  traumatic: fpe,
  travesty: mpe,
  treason: ype,
  treasonous: bpe,
  treasure: vpe,
  treasures: Dpe,
  trembling: wpe,
  tremor: kpe,
  tremors: Fpe,
  tremulous: Ape,
  tribulation: Cpe,
  tribute: _pe,
  tricked: Epe,
  trickery: xpe,
  triumph: Spe,
  triumphant: $pe,
  troll: Bpe,
  trouble: zpe,
  troubled: Tpe,
  troubles: Rpe,
  troubling: Ppe,
  true: 2,
  trust: jpe,
  trusted: Ipe,
  trusts: Ope,
  tumor: Lpe,
  twat: Mpe,
  tyran: qpe,
  tyrannic: Npe,
  tyrannical: Kpe,
  tyrannically: Wpe,
  tyrans: Upe,
  ubiquitous: Hpe,
  ugh: Gpe,
  ugliness: Vpe,
  ugly: Ype,
  unable: Zpe,
  unacceptable: Jpe,
  unappeasable: Xpe,
  unappreciated: Qpe,
  unapproved: ege,
  unattractive: tge,
  unavailable: sge,
  unavailing: nge,
  unaware: ige,
  unbearable: rge,
  unbelievable: oge,
  unbelieving: age,
  unbiased: cge,
  uncertain: uge,
  unclear: lge,
  uncomfortable: dge,
  unconcerned: pge,
  unconfirmed: gge,
  unconvinced: hge,
  uncredited: fge,
  undecided: mge,
  undercooked: yge,
  underestimate: bge,
  underestimated: vge,
  underestimates: Dge,
  underestimating: wge,
  undermine: kge,
  undermined: Fge,
  undermines: Age,
  undermining: Cge,
  underperform: _ge,
  underperformed: Ege,
  underperforming: xge,
  underperforms: Sge,
  undeserving: $ge,
  undesirable: Bge,
  uneasy: zge,
  unemployed: Tge,
  unemployment: Rge,
  unequal: Pge,
  unequaled: jge,
  unethical: Ige,
  uneventful: Oge,
  unfair: Lge,
  unfavorable: Mge,
  unfit: qge,
  unfitted: Nge,
  unfocused: Kge,
  unforgivable: Wge,
  unforgiving: Uge,
  unfulfilled: Hge,
  unfunny: Gge,
  ungenerous: Vge,
  ungrateful: Yge,
  unhappy: Zge,
  unhappiness: Jge,
  unhealthy: Xge,
  unhygienic: Qge,
  unified: ehe,
  unimaginative: the,
  unimpressed: she,
  uninspired: nhe,
  unintelligent: ihe,
  unintentional: rhe,
  uninvolving: ohe,
  united: ahe,
  unjust: che,
  unlikely: uhe,
  unlovable: lhe,
  unloved: dhe,
  unmatched: phe,
  unmotivated: ghe,
  unoriginal: hhe,
  unparliamentary: fhe,
  unpleasant: mhe,
  unpleasantness: yhe,
  unprofessional: bhe,
  unravel: vhe,
  unreleting: Dhe,
  unresearched: whe,
  unsafe: khe,
  unsatisfied: Fhe,
  unscientific: Ahe,
  unsecured: Che,
  unselfish: _he,
  unsettled: Ehe,
  unsold: xhe,
  unsophisticated: She,
  unsound: $he,
  unstable: Bhe,
  unstoppable: zhe,
  unsuccessful: The,
  unsuccessfully: Rhe,
  unsupported: Phe,
  unsure: jhe,
  untarnished: Ihe,
  untrue: Ohe,
  unwanted: Lhe,
  unworthy: Mhe,
  uplifting: qhe,
  uproar: Nhe,
  upset: Khe,
  upsets: Whe,
  upsetting: Uhe,
  uptight: Hhe,
  urgent: Ghe,
  useful: Vhe,
  usefulness: Yhe,
  useless: Zhe,
  uselessness: Jhe,
  vague: Xhe,
  validate: Qhe,
  validated: e2e,
  validates: t2e,
  validating: s2e,
  vapid: n2e,
  verdict: i2e,
  verdicts: r2e,
  vested: o2e,
  vexation: a2e,
  vexing: c2e,
  vibrant: u2e,
  vicious: l2e,
  victim: d2e,
  victimization: p2e,
  victimize: g2e,
  victimized: h2e,
  victimizes: f2e,
  victimizing: m2e,
  victims: y2e,
  victor: b2e,
  victors: v2e,
  victory: D2e,
  victories: w2e,
  vigilant: k2e,
  vigor: F2e,
  vile: A2e,
  vindicate: C2e,
  vindicated: _2e,
  vindicates: E2e,
  vindicating: x2e,
  violate: S2e,
  violated: $2e,
  violates: B2e,
  violating: z2e,
  violation: T2e,
  violations: R2e,
  violence: P2e,
  "violence-related": -3,
  violent: j2e,
  violently: I2e,
  virtuous: O2e,
  virulent: L2e,
  vision: M2e,
  visionary: q2e,
  visioning: N2e,
  visions: K2e,
  vitality: W2e,
  vitamin: U2e,
  vitriolic: H2e,
  vivacious: G2e,
  vividly: V2e,
  vociferous: Y2e,
  vomit: Z2e,
  vomited: J2e,
  vomiting: X2e,
  vomits: Q2e,
  vulnerability: efe,
  vulnerable: tfe,
  walkout: sfe,
  walkouts: nfe,
  wanker: ife,
  want: rfe,
  war: ofe,
  warfare: afe,
  warm: cfe,
  warmhearted: ufe,
  warmness: lfe,
  warmth: dfe,
  warn: pfe,
  warned: gfe,
  warning: hfe,
  warnings: ffe,
  warns: mfe,
  waste: yfe,
  wasted: bfe,
  wasting: vfe,
  wavering: Dfe,
  weak: wfe,
  weakened: kfe,
  weakness: Ffe,
  weaknesses: Afe,
  wealth: Cfe,
  wealthier: _fe,
  wealthy: Efe,
  weary: xfe,
  weep: Sfe,
  weeping: $fe,
  weird: Bfe,
  welcome: zfe,
  welcomed: Tfe,
  welcomes: Rfe,
  "well-being": 2,
  "well-championed": 3,
  "well-developed": 2,
  "well-established": 2,
  "well-focused": 2,
  "well-groomed": 2,
  "well-proportioned": 2,
  whimsical: Pfe,
  whitewash: jfe,
  whore: Ife,
  wicked: Ofe,
  widowed: Lfe,
  willingness: Mfe,
  win: qfe,
  winner: Nfe,
  winning: Kfe,
  wins: Wfe,
  winwin: Ufe,
  wisdom: Hfe,
  wish: Gfe,
  wishes: Vfe,
  wishing: Yfe,
  withdrawal: Zfe,
  wits: Jfe,
  woebegone: Xfe,
  woeful: Qfe,
  won: eme,
  wonderful: tme,
  wonderfully: sme,
  woo: nme,
  woohoo: ime,
  wooo: rme,
  woow: ome,
  worn: ame,
  worried: cme,
  worries: ume,
  worry: lme,
  worrying: dme,
  worse: pme,
  worsen: gme,
  worsened: hme,
  worsening: fme,
  worsens: mme,
  worshiped: yme,
  worst: bme,
  worth: vme,
  worthless: Dme,
  worthy: wme,
  wow: kme,
  wowow: Fme,
  wowww: Ame,
  wrathful: Cme,
  wreck: _me,
  wrenching: Eme,
  wrong: xme,
  wrongdoing: Sme,
  wrongdoings: $me,
  wronged: Bme,
  wrongful: zme,
  wrongfully: Tme,
  wrongly: Rme,
  wtf: Pme,
  wtff: jme,
  wtfff: Ime,
  xo: Ome,
  xoxo: Lme,
  xoxoxo: Mme,
  xoxoxoxo: qme,
  yeah: Nme,
  yearning: Kme,
  yeees: Wme,
  yes: Ume,
  youthful: Hme,
  yucky: Gme,
  yummy: Vme,
  zealot: Yme,
  zealots: Zme,
  zealous: Jme
}, Qme = 1, eye = 1, tye = 1, sye = 1, nye = 1, iye = 1, rye = 1, oye = {
  cant: Qme,
  "can't": 1,
  dont: eye,
  "don't": 1,
  doesnt: tye,
  "doesn't": 1,
  not: sye,
  non: nye,
  wont: iye,
  "won't": 1,
  isnt: rye,
  "isn't": 1
};
var aye = oye, cye = {
  apply: function(e, t, s) {
    if (t > 0) {
      var n = e[t - 1];
      aye[n] && (s = -s);
    }
    return s;
  }
}, uye = {
  labels: Xme,
  scoringStrategy: cye
}, ji = E3, Ii = uye;
Object.assign(Ii.labels, ji);
var Ye = {
  en: Ii
}, lye = {
  /**
   * Registers the specified language
   *
   * @param {String} languageCode
   *     - Two-digit code for the language to register
   * @param {Object} language
   *     - The language module to register
   */
  addLanguage: function(e, t) {
    if (!t.labels)
      throw new Error("language.labels must be defined!");
    Object.assign(t.labels, ji), Ye[e] = t;
  },
  /**
   * Retrieves a language object from the cache,
   * or tries to load it from the set of supported languages
   *
   * @param {String} languageCode - Two-digit code for the language to fetch
   */
  getLanguage: function(e) {
    if (!e)
      return Ye.en;
    if (!Ye[e])
      try {
        var t = _3("../languages/" + e + "/index");
        this.addLanguage(e, t);
      } catch {
        throw new Error("No language found: " + e);
      }
    return Ye[e];
  },
  /**
   * Returns AFINN-165 weighted labels for the specified language
   *
   * @param {String} languageCode - Two-digit language code
   * @return {Object}
   */
  getLabels: function(e) {
    var t = this.getLanguage(e);
    return t.labels;
  },
  /**
   * Applies a scoring strategy for the current token
   *
   * @param {String} languageCode - Two-digit language code
   * @param {Array} tokens - Tokens of the phrase to analyze
   * @param {int} cursor - Cursor of the current token being analyzed
   * @param {int} tokenScore - The score of the current token being analyzed
   */
  applyScoringStrategy: function(e, t, s, n) {
    var i = this.getLanguage(e), r = i.scoringStrategy || dye;
    return r.apply(t, s, n);
  }
}, dye = {
  apply: function(e, t, s) {
    return s;
  }
}, pye = C3, Tt = lye, is = function(e) {
  this.options = e;
};
is.prototype.registerLanguage = function(e, t) {
  Tt.addLanguage(e, t);
};
is.prototype.analyze = function(e, t, s) {
  typeof e > "u" && (e = ""), typeof t == "function" && (s = t, t = {}), t = t || {};
  var n = t.language || "en", i = Tt.getLabels(n);
  typeof t.extras == "object" && (i = Object.assign(i, t.extras));
  for (var r = pye(e), o = 0, a = [], c = [], u = [], l = [], p = r.length; p--; ) {
    var d = r[p];
    if (i.hasOwnProperty(d)) {
      a.push(d);
      var f = i[d];
      f = Tt.applyScoringStrategy(n, r, p, f), f > 0 && c.push(d), f < 0 && u.push(d), o += f;
      var y = {};
      y[d] = f, l.push(y);
    }
  }
  var E = {
    score: o,
    comparative: r.length > 0 ? o / r.length : 0,
    calculation: l,
    tokens: r,
    words: a,
    positive: c,
    negative: u
  };
  if (typeof s == "function")
    process.nextTick(function() {
      s(null, E);
    });
  else
    return E;
};
var gye = is;
const hye = { extras: { "a+": 5, abound: 2, abounds: 2, abundance: 4, abundant: 4, accessable: 3, accessible: 3, acclaim: 2, acclaimed: 2, acclamation: 2, accolade: 3, accolades: 3, accommodative: 2, accomodative: 2, accomplish: 5, accomplished: 5, accomplishment: 5, accomplishments: 5, accurate: 3, accurately: 3, achievable: 3, achievement: 3, achievements: 3, achievible: 3, acumen: 1, adaptable: 1, adaptive: 1, adequate: 1, adjustable: 2, admirable: 2, admirably: 2, admiration: 2, admire: 2, admirer: 2, admiring: 2, admiringly: 2, adorable: 3, adore: 3, adored: 3, adorer: 3, adoring: 3, adoringly: 3, adroit: 2, adroitly: 2, adulate: 2, adulation: 1, adulatory: 1, advanced: 3, advantage: 3, advantageous: 2, advantageously: 2, advantages: 2, adventuresome: 2, adventurous: 2, advocate: 2, advocated: 2, advocates: 2, affability: 2, affable: 2, affably: 2, affectation: 3, affection: 3, affectionate: 3, affinity: 3, affirm: 2, affirmation: 2, affirmative: 2, affluence: 2, affluent: 3, afford: 2, affordable: 2, affordably: 2, afordable: 2, agile: 3, agilely: 2, agility: 2, agreeable: 3, agreeableness: 3, agreeably: 2, "all-around": 2, alluring: 3, alluringly: 3, altruistic: 3, altruistically: 3, amaze: 4, amazed: 4, amazement: 4, amazes: 4, amazing: 4, amazingly: 4, ambitious: 4, ambitiously: 4, ameliorate: 4, amenable: 3, amenity: 3, amiability: 3, amiabily: 3, amiable: 3, amicability: 3, amicable: 3, amicably: 3, amity: 2, ample: 2, amply: 2, amuse: 2, amusing: 2, amusingly: 2, angel: 5, angelic: 5, apotheosis: 1, appeal: 4, appealing: 4, applaud: 4, appreciable: 4, appreciate: 4, appreciated: 4, appreciates: 4, appreciative: 4, appreciatively: 4, appropriate: 4, approval: 4, approve: 4, ardent: 1, ardently: 1, ardor: 1, articulate: 1, aspiration: 3, aspirations: 3, aspire: 3, assurance: 3, assurances: 3, assure: 3, assuredly: 3, assuring: 3, astonish: 4, astonished: 4, astonishing: 4, astonishingly: 4, astonishment: 4, astound: 4, astounded: 4, astounding: 4, astoundingly: 4, astutely: 1, attentive: 1, attraction: 1, attractive: 1, attractively: 1, attune: 1, audible: 1, audibly: 1, auspicious: 1, authentic: 1, authoritative: 1, autonomous: 1, available: 1, aver: 1, avid: 1, avidly: 1, award: 1, awarded: 1, awards: 1, awe: 5, awed: 1, awesome: 5, awesomely: 4, awesomeness: 4, awestruck: 4, awsome: 4, backbone: 3, balanced: 3, bargain: 3, beauteous: 3, beautiful: 3, beautifullly: 3, beautifully: 3, beautify: 3, beauty: 3, beckon: 2, beckoned: 1, beckoning: 1, beckons: 1, believable: 3, believeable: 3, beloved: 3, benefactor: 2, beneficent: 2, beneficial: 2, beneficially: 2, beneficiary: 2, benefit: 3, benefits: 3, benevolence: 1, benevolent: 1, benifits: 2, best: 5, "best-known": 5, "best-performing": 5, "best-selling": 5, better: 5, "better-known": 5, "better-than-expected": 4, beutifully: 5, blameless: 4, bless: 3, blessing: 3, bliss: 4, blissful: 4, blissfully: 4, blithe: 1, blockbuster: 5, bloom: 3, blossom: 4, bolster: 1, bonny: 1, bonus: 4, bonuses: 4, boom: 2, booming: 3, boost: 4, boundless: 4, bountiful: 3, brainiest: 3, brainy: 3, "brand-new": 5, brave: 3, bravery: 3, bravo: 2, breakthrough: 5, breakthroughs: 5, breathlessness: 5, breathtaking: 5, breathtakingly: 5, breeze: 4, bright: 4, brighten: 4, brighter: 4, brightest: 4, brilliance: 4, brilliances: 4, brilliant: 4, brilliantly: 4, brisk: 3, brotherly: 4, bullish: 1, buoyant: 1, cajole: 1, calm: 3, calming: 3, calmness: 3, capability: 4, capable: 4, capably: 4, captivate: 4, captivating: 4, carefree: 1, cashback: 1, cashbacks: 1, catchy: 1, celebrate: 4, celebrated: 4, celebration: 4, celebratory: 4, champ: 3, champion: 3, charisma: 4, charismatic: 4, charitable: 3, charm: 5, charming: 5, charmingly: 5, chaste: 1, cheaper: 1, cheapest: 1, cheer: 4, cheerful: 4, cheery: 4, cherish: 4, cherished: 4, cherub: 1, chic: 1, chivalrous: 2, chivalry: 2, civility: 2, civilize: 2, clarity: 4, classic: 1, classy: 1, clean: 3, cleaner: 3, cleanest: 3, cleanliness: 3, cleanly: 3, clear: 3, "clear-cut": 3, cleared: 3, clearer: 3, clearly: 3, clears: 3, clever: 3, cleverly: 2, cohere: 2, coherence: 2, coherent: 2, cohesive: 2, colorful: 3, comely: 1, comfort: 4, comfortable: 4, comfortably: 4, comforting: 4, comfy: 4, commend: 1, commendable: 1, commendably: 1, commitment: 3, commodious: 1, compact: 3, compactly: 2, compassion: 3, compassionate: 4, compatible: 3, competitive: 3, complement: 3, complementary: 3, complemented: 3, complements: 3, compliant: 2, compliment: 5, complimentary: 5, comprehensive: 5, conciliate: 1, conciliatory: 1, concise: 2, confidence: 3, confident: 4, congenial: 1, congratulate: 5, congratulation: 5, congratulations: 5, congratulatory: 5, conscientious: 2, considerate: 4, consistent: 4, consistently: 4, constructive: 4, consummate: 1, contentment: 1, continuity: 4, contrasty: 1, contribution: 2, convenience: 3, convenient: 3, conveniently: 3, convience: 3, convienient: 3, convient: 3, convincing: 3, convincingly: 3, cool: 5, coolest: 5, cooperative: 3, cooperatively: 3, cornerstone: 3, correct: 5, correctly: 5, "cost-effective": 3, "cost-saving": 3, "counter-attack": 2, "counter-attacks": 2, courage: 3, courageous: 3, courageously: 3, courageousness: 3, courteous: 3, courtly: 2, covenant: 2, cozy: 2, creative: 2, credence: 2, credible: 2, crisp: 1, crisper: 1, cure: 4, "cure-all": 1, cushy: 1, cute: 5, cuteness: 5, danke: 1, danken: 1, daring: 5, daringly: 5, darling: 5, dashing: 5, dauntless: 1, dawn: 1, dazzle: 5, dazzled: 5, dazzling: 5, "dead-cheap": 1, "dead-on": 1, decency: 5, decent: 5, decisive: 5, decisiveness: 5, dedicated: 5, defeat: 1, defeated: 1, defeating: 1, defeats: 1, defender: 1, deference: 1, deft: 1, deginified: 1, delectable: 1, delicacy: 4, delicate: 4, delicious: 4, delight: 4, delighted: 4, delightful: 4, delightfully: 4, delightfulness: 4, dependable: 2, dependably: 2, deservedly: 5, deserving: 5, desirable: 5, desiring: 5, desirous: 5, destiny: 5, detachable: 5, devout: 5, dexterous: 5, dexterously: 5, dextrous: 5, dignified: 5, dignify: 5, dignity: 5, diligence: 3, diligent: 3, diligently: 3, diplomatic: 3, "dirt-cheap": 3, distinction: 3, distinctive: 3, distinguished: 3, diversified: 3, divine: 5, divinely: 5, dominate: 5, dominated: 5, dominates: 5, dote: 1, dotingly: 1, doubtless: 1, dreamland: 1, dumbfounded: 1, dumbfounding: 1, "dummy-proof": 1, durable: 3, dynamic: 3, eager: 5, eagerly: 5, eagerness: 5, earnest: 5, earnestly: 5, earnestness: 5, ease: 4, eased: 4, eases: 4, easier: 4, easiest: 4, easiness: 4, easing: 4, easy: 4, "easy-to-use": 5, easygoing: 5, ebullience: 1, ebullient: 1, ebulliently: 1, ecenomical: 1, economical: 5, ecstasies: 5, ecstasy: 5, ecstatic: 5, ecstatically: 5, edify: 1, educated: 5, effective: 5, effectively: 5, effectiveness: 5, effectual: 5, efficacious: 5, efficient: 5, efficiently: 5, effortless: 5, effortlessly: 5, effusion: 5, effusive: 5, effusively: 5, effusiveness: 5, elan: 2, elate: 2, elated: 2, elatedly: 2, elation: 3, electrify: 5, elegance: 5, elegant: 5, elegantly: 5, elevate: 5, elite: 5, eloquence: 3, eloquent: 3, eloquently: 3, embolden: 3, eminence: 3, eminent: 3, empathize: 5, empathy: 5, empower: 5, empowerment: 5, enchant: 5, enchanted: 5, enchanting: 5, enchantingly: 5, encourage: 5, encouragement: 5, encouraging: 5, encouragingly: 5, endear: 3, endearing: 3, endorse: 3, endorsed: 3, endorsement: 3, endorses: 3, endorsing: 2, energetic: 5, energize: 5, "energy-efficient": 5, "energy-saving": 5, engaging: 2, engrossing: 2, enhance: 5, enhanced: 5, enhancement: 5, enhances: 5, enjoy: 5, enjoyable: 5, enjoyably: 5, enjoyed: 5, enjoying: 5, enjoyment: 5, enjoys: 5, enlighten: 5, enlightenment: 5, enliven: 1, ennoble: 2, enough: 3, enrapt: 2, enrapture: 1, enraptured: 1, enrich: 5, enrichment: 3, enterprising: 3, entertain: 3, entertaining: 5, entertains: 5, enthral: 2, enthrall: 1, enthralled: 1, enthuse: 1, enthusiasm: 4, enthusiast: 4, enthusiastic: 4, enthusiastically: 3, entice: 3, enticed: 4, enticing: 3, enticingly: 4, entranced: 3, entrancing: 3, entrust: 4, enviable: 3, enviably: 3, envious: 3, enviously: 3, enviousness: 1, envy: 1, equitable: 1, ergonomical: 5, "err-free": 1, erudite: 1, ethical: 4, eulogize: 2, euphoria: 3, euphoric: 3, euphorically: 3, evaluative: 4, evenly: 5, eventful: 4, everlasting: 5, evocative: 2, exalt: 1, exaltation: 2, exalted: 3, exaltedly: 3, exalting: 3, exaltingly: 3, examplar: 1, examplary: 1, excallent: 1, exceed: 5, exceeded: 5, exceeding: 5, exceedingly: 5, exceeds: 5, excel: 5, exceled: 5, excelent: 5, excellant: 5, excelled: 5, excellence: 5, excellency: 5, excellent: 5, excellently: 5, excels: 5, exceptional: 5, exceptionally: 5, excite: 5, excited: 5, excitedly: 5, excitedness: 5, excitement: 5, excites: 5, exciting: 5, excitingly: 5, exellent: 5, exemplar: 3, exemplary: 3, exhilarate: 3, exhilarating: 3, exhilaratingly: 3, exhilaration: 3, exonerate: 3, expansive: 3, expeditiously: 3, expertly: 4, exquisite: 1, exquisitely: 1, extol: 1, extoll: 1, extraordinarily: 5, extraordinary: 5, exuberance: 3, exuberant: 3, exuberantly: 3, exult: 1, exultant: 1, exultation: 1, exultingly: 1, "eye-catch": 5, "eye-catching": 5, eyecatch: 5, eyecatching: 5, fabulous: 1, fabulously: 4, facilitate: 4, fair: 5, fairly: 5, fairness: 5, faith: 4, faithful: 4, faithfully: 4, faithfulness: 4, fame: 4, famed: 4, famous: 4, famously: 4, fancier: 5, fancinating: 5, fancy: 5, fanfare: 3, fans: 3, fantastic: 3, fantastically: 3, fascinate: 5, fascinating: 5, fascinatingly: 5, fascination: 5, fashionable: 5, fashionably: 5, fast: 2, "fast-growing": 2, "fast-paced": 2, faster: 5, fastest: 5, "fastest-growing": 5, faultless: 3, fav: 4, fave: 4, favor: 4, favorable: 4, favored: 4, favorite: 4, favorited: 4, favour: 4, fearless: 5, fearlessly: 5, feasible: 3, feasibly: 3, feat: 2, "feature-rich": 2, fecilitous: 2, feisty: 2, felicitate: 2, felicitous: 2, felicity: 3, fertile: 3, fervent: 3, fervently: 3, fervid: 3, fervidly: 3, fervor: 3, festive: 3, fidelity: 1, fiery: 1, fine: 5, "fine-looking": 5, finely: 5, finer: 5, finest: 5, firmer: 4, "first-class": 4, "first-in-class": 4, "first-rate": 5, flashy: 5, flatter: 4, flattering: 4, flatteringly: 4, flawless: 5, flawlessly: 5, flexibility: 3, flexible: 3, flourish: 1, flourishing: 1, fluent: 2, flutter: 2, fond: 4, fondly: 4, fondness: 4, foolproof: 4, foremost: 3, foresight: 5, formidable: 4, fortitude: 5, fortuitous: 5, fortuitously: 3, fortunate: 5, fortunately: 5, fortune: 5, fragrant: 4, free: 5, freed: 5, freedom: 5, freedoms: 5, fresh: 5, fresher: 5, freshest: 5, friendliness: 4, friendly: 4, frolic: 3, frugal: 3, fruitful: 4, ftw: 4, fulfillment: 4, fun: 5, futurestic: 4, futuristic: 4, gaiety: 1, gaily: 1, gain: 4, gained: 4, gainful: 4, gainfully: 4, gaining: 4, gains: 4, gallant: 2, gallantly: 2, galore: 4, geekier: 4, geeky: 3, gem: 4, gems: 4, generosity: 4, generous: 5, generously: 5, genial: 1, genius: 4, gentle: 4, gentlest: 4, genuine: 5, gifted: 5, glad: 4, gladden: 1, gladly: 4, gladness: 4, glamorous: 5, glee: 1, gleeful: 1, gleefully: 1, glimmer: 1, glimmering: 1, glisten: 1, glistening: 1, glitter: 1, glitz: 1, glorify: 5, glorious: 5, gloriously: 5, glory: 5, glow: 4, glowing: 4, glowingly: 4, "god-given": 3, "god-send": 3, godlike: 4, godsend: 4, gold: 3, golden: 3, good: 5, goodly: 5, goodness: 4, goodwill: 3, goood: 5, gooood: 5, gorgeous: 4, gorgeously: 4, grace: 4, graceful: 4, gracefully: 4, gracious: 4, graciously: 4, graciousness: 4, grand: 5, grandeur: 3, grateful: 3, gratefully: 3, gratification: 3, gratified: 3, gratifies: 3, gratify: 3, gratifying: 3, gratifyingly: 3, gratitude: 5, great: 5, greatest: 5, greatness: 5, grin: 3, groundbreaking: 3, guarantee: 3, guidance: 3, guiltless: 3, gumption: 1, gush: 1, gusto: 1, gutsy: 1, hail: 1, halcyon: 1, hale: 1, hallmark: 1, hallmarks: 1, hallowed: 1, handier: 1, handily: 1, "hands-down": 4, handsome: 5, handsomely: 5, handy: 5, happier: 5, happily: 5, happiness: 5, happy: 5, "hard-working": 4, hardier: 4, hardy: 4, harmless: 3, harmonious: 1, harmoniously: 1, harmonize: 1, harmony: 4, headway: 1, heal: 5, healthful: 5, healthy: 4, hearten: 2, heartening: 2, heartfelt: 3, heartily: 3, heartwarming: 4, heaven: 5, heavenly: 5, helped: 4, helpful: 4, helping: 4, hero: 4, heroic: 4, heroically: 4, heroine: 2, heroize: 2, heros: 4, "high-quality": 5, "high-spirited": 3, hilarious: 3, holy: 3, homage: 2, honest: 3, honesty: 4, honor: 3, honorable: 3, honored: 3, honoring: 3, hooray: 4, hopeful: 4, hospitable: 4, hot: 2, hotcake: 2, hotcakes: 3, hottest: 4, hug: 3, humane: 4, humble: 3, humility: 4, humor: 3, humorous: 3, humorously: 3, humour: 3, humourous: 3, ideal: 4, idealize: 3, ideally: 3, idol: 2, idolize: 2, idolized: 2, idyllic: 1, illuminate: 5, illuminati: 1, illuminating: 4, illumine: 2, illustrious: 3, ilu: 1, imaculate: 5, imaginative: 5, immaculate: 5, immaculately: 5, immense: 3, impartial: 3, impartiality: 3, impartially: 3, impassioned: 3, impeccable: 3, impeccably: 3, important: 4, impress: 4, impressed: 4, impresses: 4, impressive: 4, impressively: 4, impressiveness: 4, improve: 4, improved: 3, improvement: 4, improvements: 5, improves: 5, improving: 3, incredible: 4, incredibly: 5, indebted: 4, individualized: 1, indulgence: 1, indulgent: 1, industrious: 1, inestimable: 1, inestimably: 1, inexpensive: 4, infallibility: 1, infallible: 1, infallibly: 1, influential: 1, ingenious: 2, ingeniously: 3, ingenuity: 3, ingenuous: 3, ingenuously: 2, innocuous: 3, innovation: 4, innovative: 4, inpressed: 2, insightful: 4, insightfully: 3, inspiration: 4, inspirational: 5, inspire: 5, inspiring: 5, instantly: 3, instructive: 3, instrumental: 3, integral: 3, integrated: 3, intelligence: 3, intelligent: 3, intelligible: 2, interesting: 4, interests: 3, intimacy: 2, intimate: 2, intricate: 3, intrigue: 2, intriguing: 2, intriguingly: 2, intuitive: 3, invaluable: 5, invaluablely: 5, inventive: 3, invigorate: 3, invigorating: 2, invincibility: 3, invincible: 5, inviolable: 3, inviolate: 3, invulnerable: 4, irreplaceable: 3, irreproachable: 3, irresistible: 3, irresistibly: 3, "issue-free": 3, "jaw-droping": 5, "jaw-dropping": 5, jollify: 3, jolly: 3, jovial: 2, joy: 4, joyful: 5, joyfully: 5, joyous: 4, joyously: 4, jubilant: 4, jubilantly: 3, jubilate: 3, jubilation: 3, jubiliant: 3, judicious: 3, justly: 3, keen: 3, keenly: 4, keenness: 4, "kid-friendly": 3, kindliness: 5, kindly: 5, kindness: 5, knowledgeable: 4, kudos: 3, "large-capacity": 3, laud: 3, laudable: 4, laudably: 4, lavish: 5, lavishly: 5, "law-abiding": 4, lawful: 4, lawfully: 4, lead: 3, leading: 3, leads: 1, lean: 1, led: 1, legendary: 5, leverage: 3, levity: 2, liberate: 4, liberation: 4, liberty: 4, lifesaver: 5, "light-hearted": 3, lighter: 3, likable: 4, like: 5, liked: 4, likes: 4, liking: 5, lionhearted: 4, lively: 5, logical: 4, "long-lasting": 5, lovable: 4, lovably: 5, love: 5, loved: 5, loveliness: 4, lovely: 5, lover: 4, loves: 4, loving: 5, "low-cost": 2, "low-price": 2, "low-priced": 2, "low-risk": 3, "lower-priced": 3, loyal: 4, loyalty: 4, lucid: 2, lucidly: 2, luck: 4, luckier: 4, luckiest: 4, luckiness: 4, lucky: 5, lucrative: 3, luminous: 3, lush: 2, luster: 2, lustrous: 3, luxuriant: 3, luxuriate: 3, luxurious: 3, luxuriously: 4, luxury: 5, lyrical: 2, magic: 3, magical: 4, magnanimous: 3, magnanimously: 3, magnificence: 2, magnificent: 3, magnificently: 3, majestic: 3, majesty: 3, manageable: 2, maneuverable: 2, marvel: 4, marveled: 4, marvelled: 4, marvellous: 4, marvelous: 4, marvelously: 5, marvelousness: 3, marvels: 3, master: 5, masterful: 5, masterfully: 5, masterpiece: 5, masterpieces: 5, masters: 5, mastery: 4, matchless: 4, mature: 3, maturely: 2, maturity: 3, meaningful: 4, memorable: 5, merciful: 5, mercifully: 5, mercy: 5, merit: 4, meritorious: 4, merrily: 3, merriment: 2, merriness: 2, merry: 4, mesmerize: 3, mesmerized: 3, mesmerizes: 3, mesmerizing: 3, mesmerizingly: 3, meticulous: 3, meticulously: 3, mightily: 4, mighty: 2, "mind-blowing": 5, miracle: 5, miracles: 5, miraculous: 5, miraculously: 5, miraculousness: 1, modern: 3, modest: 3, modesty: 3, momentous: 3, monumental: 3, monumentally: 3, morality: 3, motivated: 3, "multi-purpose": 3, navigable: 3, neat: 5, neatest: 5, neatly: 5, nice: 5, nicely: 5, nicer: 5, nicest: 5, nifty: 4, nimble: 4, noble: 4, nobly: 4, noiseless: 4, "non-violence": 2, "non-violent": 2, notably: 4, noteworthy: 4, nourish: 4, nourishing: 4, nourishment: 4, novelty: 3, nurturing: 3, oasis: 3, obsession: 3, obsessions: 3, obtainable: 3, openly: 1, openness: 1, optimal: 3, optimism: 3, optimistic: 3, opulent: 1, orderly: 4, originality: 4, outdo: 4, outdone: 4, outperform: 4, outperformed: 4, outperforming: 4, outperforms: 4, outshine: 5, outshone: 5, outsmart: 5, outstanding: 3, outstandingly: 3, outstrip: 4, outwit: 4, ovation: 2, overjoyed: 2, overtake: 3, overtaken: 3, overtakes: 4, overtaking: 4, overtook: 3, overture: 3, "pain-free": 4, painless: 4, painlessly: 5, palatial: 2, pamper: 3, pampered: 3, pamperedly: 3, pamperedness: 2, pampers: 2, panoramic: 3, paradise: 4, paramount: 2, pardon: 2, passion: 2, passionate: 2, passionately: 2, patience: 3, patient: 3, patiently: 2, patriot: 2, patriotic: 2, peace: 5, peaceable: 5, peaceful: 5, peacefully: 5, peacekeepers: 5, peach: 3, peerless: 3, pep: 2, pepped: 2, pepping: 2, peppy: 2, peps: 2, perfect: 5, perfection: 5, perfectly: 5, permissible: 2, perseverance: 2, persevere: 1, personages: 1, personalized: 3, phenomenal: 4, phenomenally: 4, picturesque: 4, piety: 3, pinnacle: 4, playful: 4, playfully: 4, pleasant: 4, pleasantly: 3, pleased: 4, pleases: 4, pleasing: 3, pleasingly: 4, pleasurable: 4, pleasurably: 3, pleasure: 3, plentiful: 4, pluses: 2, plush: 1, plusses: 1, poetic: 1, poeticize: 1, poignant: 1, poise: 1, poised: 2, polished: 2, polite: 4, politeness: 4, popular: 5, portable: 4, posh: 3, positive: 4, positively: 5, positives: 5, powerful: 5, powerfully: 5, praise: 5, praiseworthy: 5, praising: 4, "pre-eminent": 2, precious: 2, precise: 2, precisely: 2, preeminent: 2, prefer: 2, preferable: 2, preferably: 2, prefered: 2, preferes: 2, preferring: 2, prefers: 2, premier: 2, prestige: 4, prestigious: 2, prettily: 2, pretty: 5, priceless: 5, pride: 4, principled: 2, privilege: 2, privileged: 2, prize: 2, proactive: 2, "problem-free": 2, "problem-solver": 2, prodigious: 2, prodigiously: 2, prodigy: 2, productive: 2, productively: 2, proficient: 2, proficiently: 2, profound: 3, profoundly: 3, profuse: 2, profusion: 2, progress: 2, progressive: 2, prolific: 2, prominence: 2, prominent: 2, promise: 2, promised: 2, promises: 2, promising: 2, promoter: 2, prompt: 2, promptly: 2, proper: 2, properly: 2, propitious: 2, propitiously: 2, pros: 2, prosper: 2, prosperity: 3, prosperous: 3, prospros: 3, protect: 3, protection: 4, protective: 4, proud: 2, proven: 2, proves: 2, providence: 2, proving: 2, prowess: 2, prudence: 2, prudent: 2, prudently: 2, punctual: 2, pure: 5, purify: 5, purposeful: 2, quaint: 2, qualified: 2, qualify: 4, quicker: 5, quiet: 5, quieter: 2, radiance: 2, radiant: 2, rapid: 2, rapport: 2, rapt: 1, rapture: 1, raptureous: 1, raptureously: 1, rapturous: 1, rapturously: 1, rational: 1, "razor-sharp": 2, reachable: 1, readable: 2, readily: 2, ready: 5, reaffirm: 1, reaffirmation: 2, realistic: 2, realizable: 2, reasonable: 2, reasonably: 2, reasoned: 2, reassurance: 2, reassure: 2, receptive: 2, reclaim: 2, recomend: 4, recommend: 4, recommendation: 4, recommendations: 4, recommended: 5, reconcile: 3, reconciliation: 3, "record-setting": 4, recover: 4, recovery: 4, rectification: 4, rectify: 3, rectifying: 3, redeem: 3, redeeming: 3, redemption: 1, refine: 1, refined: 3, refinement: 3, reform: 4, reformed: 4, reforming: 3, reforms: 3, refresh: 3, refreshed: 3, refreshing: 3, refund: 3, refunded: 2, regal: 2, regally: 2, regard: 2, rejoice: 2, rejoicing: 3, rejoicingly: 3, rejuvenate: 3, rejuvenated: 3, rejuvenating: 3, relaxed: 4, relent: 4, reliable: 4, reliably: 4, relief: 4, relish: 4, remarkable: 3, remarkably: 3, remedy: 3, remission: 3, remunerate: 3, renaissance: 3, renewed: 2, renown: 2, renowned: 2, replaceable: 3, reputable: 3, reputation: 4, resilient: 4, resolute: 4, resound: 4, resounding: 2, resourceful: 2, resourcefulness: 3, respect: 3, respectable: 3, respectful: 2, respectfully: 2, respite: 2, resplendent: 2, responsibly: 2, responsive: 4, restful: 4, restored: 2, restructure: 2, restructured: 2, restructuring: 2, retractable: 2, revel: 2, revelation: 2, revere: 2, reverence: 2, reverent: 2, reverently: 2, revitalize: 2, revival: 2, revive: 4, revives: 2, revolutionary: 2, revolutionize: 2, revolutionized: 2, revolutionizes: 2, reward: 5, rewarding: 5, rewardingly: 5, rich: 4, richer: 4, richly: 4, richness: 4, right: 4, righten: 3, righteous: 3, righteously: 2, righteousness: 2, rightful: 2, rightfully: 2, rightly: 2, rightness: 2, "risk-free": 2, robust: 2, "rock-star": 4, "rock-stars": 4, rockstar: 2, rockstars: 2, romantic: 2, romantically: 2, romanticize: 2, roomier: 2, roomy: 2, rosy: 2, safe: 4, safely: 4, sagacity: 2, sagely: 2, saint: 2, saintliness: 2, saintly: 2, salutary: 2, salute: 2, sane: 3, satisfactorily: 3, satisfactory: 3, satisfied: 3, satisfies: 3, satisfy: 3, satisfying: 3, satisified: 3, saver: 4, savings: 4, savior: 4, savvy: 4, scenic: 4, seamless: 4, seasoned: 2, secure: 5, securely: 2, selective: 3, "self-determination": 3, "self-respect": 5, "self-satisfaction": 5, "self-sufficiency": 5, "self-sufficient": 5, sensation: 5, sensational: 4, sensationally: 4, sensations: 4, sensible: 4, sensibly: 4, sensitive: 2, serene: 2, serenity: 2, sexy: 4, sharp: 2, sharper: 2, sharpest: 2, shimmering: 2, shimmeringly: 2, shine: 2, shiny: 2, significant: 2, silent: 3, simpler: 3, simplest: 2, simplified: 2, simplifies: 2, simplify: 2, simplifying: 2, sincere: 5, sincerely: 2, sincerity: 2, skill: 4, skilled: 2, skillful: 2, skillfully: 2, slammin: 2, sleek: 2, slick: 2, smart: 3, smarter: 3, smartest: 2, smartly: 2, smile: 2, smiles: 2, smiling: 2, smilingly: 2, smitten: 2, smooth: 2, smoother: 2, smoothes: 2, smoothest: 2, smoothly: 2, snappy: 2, snazzy: 2, sociable: 2, soft: 4, softer: 4, solace: 2, solicitous: 2, solicitously: 2, solid: 2, solidarity: 2, soothe: 2, soothingly: 2, sophisticated: 2, soulful: 3, soundly: 3, soundness: 2, spacious: 2, sparkle: 2, sparkling: 2, spectacular: 5, spectacularly: 5, speedily: 2, speedy: 2, spellbind: 2, spellbinding: 2, spellbindingly: 2, spellbound: 2, spirited: 2, spiritual: 2, splendid: 2, splendidly: 2, splendor: 2, spontaneous: 2, sporty: 1, spotless: 2, sprightly: 1, stability: 2, stabilize: 2, stable: 4, stainless: 2, standout: 2, "state-of-the-art": 2, stately: 2, statuesque: 2, staunch: 2, staunchly: 2, staunchness: 2, steadfast: 2, steadfastly: 2, steadfastness: 2, steadiest: 3, steadiness: 3, steady: 5, stellar: 5, stellarly: 2, stimulate: 2, stimulates: 2, stimulating: 2, stimulative: 2, stirringly: 1, straighten: 1, straightforward: 3, streamlined: 3, striking: 2, strikingly: 2, striving: 2, strong: 4, stronger: 4, strongest: 4, stunned: 4, stunning: 5, stunningly: 5, stupendous: 1, stupendously: 1, sturdier: 1, sturdy: 1, stylish: 4, stylishly: 4, stylized: 4, suave: 2, suavely: 1, sublime: 2, subsidize: 1, subsidized: 1, subsidizes: 1, subsidizing: 1, substantive: 1, succeed: 3, succeeded: 4, succeeding: 3, succeeds: 3, succes: 1, success: 4, successes: 2, successful: 2, successfully: 4, suffice: 2, sufficed: 3, suffices: 2, sufficient: 3, sufficiently: 3, suitable: 4, sumptuous: 1, sumptuously: 1, sumptuousness: 1, super: 5, superb: 5, superbly: 5, superior: 2, superiority: 4, supple: 2, support: 3, supported: 3, supporter: 3, supporting: 3, supportive: 3, supports: 3, supremacy: 4, supreme: 4, supremely: 4, supurb: 4, supurbly: 3, surmount: 2, surpass: 3, surreal: 4, survival: 2, survivor: 2, sustainability: 2, sustainable: 2, swank: 1, swankier: 1, swankiest: 1, swanky: 1, sweeping: 2, sweet: 4, sweeten: 3, sweetheart: 5, sweetly: 4, sweetness: 5, swift: 3, swiftness: 3, talent: 2, talented: 2, talents: 2, tantalize: 1, tantalizing: 1, tantalizingly: 1, tempt: 1, tempting: 3, temptingly: 3, tenacious: 2, tenaciously: 2, tenacity: 2, tender: 4, tenderly: 4, terrific: 4, terrifically: 4, thank: 4, thankful: 4, thinner: 3, thoughtful: 2, thoughtfully: 2, thoughtfulness: 2, thrift: 2, thrifty: 2, thrill: 2, thrilled: 2, thrilling: 2, thrillingly: 2, thrills: 2, thrive: 2, thriving: 2, "thumb-up": 2, "thumbs-up": 2, tickle: 2, tidy: 2, "time-honored": 1, timely: 2, tingle: 2, titillate: 1, titillating: 1, titillatingly: 1, togetherness: 2, tolerable: 3, "toll-free": 1, top: 4, "top-notch": 5, "top-quality": 5, topnotch: 5, tops: 5, tough: 2, tougher: 3, toughest: 4, traction: 1, tranquil: 1, tranquility: 1, transparent: 2, treasure: 4, tremendously: 5, trendy: 5, triumph: 5, triumphal: 5, triumphant: 1, triumphantly: 1, trivially: 1, trophy: 1, "trouble-free": 2, trump: 5, trumpet: 1, trust: 5, trusted: 2, trusting: 3, trustingly: 2, trustworthiness: 2, trustworthy: 2, trusty: 4, truthful: 2, truthfully: 2, truthfulness: 2, twinkly: 2, "ultra-crisp": 5, unabashed: 2, unabashedly: 2, unaffected: 1, unassailable: 2, unbeatable: 2, unbiased: 2, unbound: 2, uncomplicated: 3, unconditional: 2, undamaged: 3, undaunted: 2, understandable: 2, undisputable: 2, undisputably: 2, undisputed: 3, unencumbered: 1, unequivocal: 1, unequivocally: 1, unfazed: 2, unfettered: 1, unforgettable: 3, unity: 2, unlimited: 3, unmatched: 2, unparalleled: 1, unquestionable: 1, unquestionably: 1, unreal: 3, unrestricted: 2, unrivaled: 2, unselfish: 2, unwavering: 3, upbeat: 2, upgradable: 2, upgradeable: 2, upgraded: 2, upheld: 2, uphold: 2, uplift: 2, uplifting: 2, upliftingly: 2, upliftment: 2, upscale: 2, usable: 4, useable: 2, useful: 5, "user-friendly": 2, "user-replaceable": 2, valiant: 1, valiantly: 2, valor: 2, valuable: 5, variety: 2, venerate: 2, verifiable: 1, veritable: 1, versatile: 2, versatility: 1, vibrant: 4, vibrantly: 4, victorious: 5, victory: 5, viewable: 2, vigilance: 2, vigilant: 3, virtue: 2, virtuous: 2, virtuously: 2, visionary: 2, vivacious: 2, vivid: 2, vouch: 3, vouchsafe: 2, warm: 4, warmer: 2, warmhearted: 2, warmly: 4, warmth: 5, wealthy: 5, welcome: 2, well: 5, "well-backlit": 2, "well-balanced": 2, "well-behaved": 5, "well-being": 2, "well-bred": 2, "well-connected": 2, "well-educated": 2, "well-established": 1, "well-informed": 1, "well-intentioned": 2, "well-known": 3, "well-made": 5, "well-managed": 2, "well-mannered": 2, "well-positioned": 2, "well-received": 2, "well-regarded": 2, "well-rounded": 2, "well-run": 2, "well-wishers": 2, wellbeing: 2, whoa: 2, wholeheartedly: 2, wholesome: 2, whooa: 2, whoooa: 2, wieldy: 1, willing: 2, willingly: 2, willingness: 3, win: 5, windfall: 2, winnable: 2, winner: 2, winners: 2, winning: 2, wins: 2, wisdom: 2, wise: 2, wisely: 2, witty: 4, won: 5, wonder: 2, wonderful: 2, wonderfully: 2, wonderous: 2, wonderously: 2, wonders: 2, wondrous: 2, woo: 3, work: 2, workable: 2, worked: 3, works: 4, "world-famous": 2, worth: 2, "worth-while": 2, worthiness: 2, worthwhile: 2, worthy: 4, wow: 5, wowed: 2, wowing: 2, wows: 2, yay: 4, youthful: 5, zeal: 2, zenith: 2, zest: 4, zippy: 2, "2-faced": -1, "2-faces": -1, abnormal: -5, abolish: -4, abominable: -3, abominably: -3, abominate: -2, abomination: -3, abort: -2, aborted: -3, aborts: -3, abrade: -2, abrasive: -4, abrupt: -2, abruptly: -2, abscond: -4, aborted: -5, absence: -5, "absent-minded": -5, absentee: -5, absurd: -4, absurdity: -3, absurdly: -3, absurdness: -3, abuse: -4, abused: -4, abuses: -4, abusive: -3, abysmal: -2, abysmally: -1, abyss: -1, accidental: -3, accost: -1, accursed: -1, accusation: -5, accusations: -1, accuse: -3, accuses: -3, accusing: -2, accusingly: -4, acerbate: -1, acerbic: -1, acerbically: -1, ache: -5, ached: -1, aches: -2, achey: -1, aching: -5, acrid: -1, acridly: -1, acridness: -1, acrimonious: -1, acrimoniously: -1, acrimony: -1, adamant: -4, adamantly: -4, addict: -5, addicted: -2, addicting: -2, addicts: -3, admonish: -4, admonisher: -2, admonishingly: -3, admonishment: -4, admonition: -3, adulterate: -1, adulterated: -3, adulteration: -5, adulterier: -2, adversarial: -1, adversary: -1, adverse: -4, adversity: -5, afflict: -1, affliction: -1, afflictive: -1, affront: -1, afraid: -5, aggravate: -4, aggravating: -4, aggravation: -5, aggression: -5, aggressive: -5, aggressiveness: -4, aggressor: -4, aggrieve: -3, aggrieved: -4, aggrivation: -5, aghast: -2, agonies: -4, agonize: -5, agonizing: -5, agonizingly: -4, agony: -5, aground: -2, ail: -1, ailing: -1, ailment: -2, aimless: -2, alarm: -1, alarmed: -1, alarming: -1, alarmingly: -1, alienate: -2, alienated: -1, alienation: -1, allegation: -2, allegations: -3, allege: -1, allergic: -1, allergies: -1, allergy: -1, aloof: -1, altercation: -1, ambiguity: -2, ambiguous: -2, ambivalence: -1, ambivalent: -1, ambush: -1, amiss: -1, amputate: -3, anarchism: -1, anarchist: -4, anarchistic: -1, anarchy: -1, anemic: -1, anger: -4, angrily: -5, angriness: -5, angry: -5, anguish: -3, animosity: -1, annihilate: -1, annihilation: -1, annoy: -3, annoyance: -4, annoyances: -4, annoyed: -2, annoying: -2, annoyingly: -3, annoys: -1, anomalous: -1, anomaly: -3, antagonism: -1, antagonist: -1, antagonistic: -1, antagonize: -1, "anti-": -1, "anti-american": -1, "anti-israeli": -1, "anti-occupation": -1, "anti-proliferation": -1, "anti-semites": -1, "anti-social": -1, "anti-us": -1, "anti-white": -1, antipathy: -1, antiquated: -1, antithetical: -1, anxieties: -1, anxiety: -2, anxious: -3, anxiously: -3, anxiousness: -1, apathetic: -4, apathetically: -1, apathy: -5, apocalypse: -5, apocalyptic: -4, apologist: -3, apologists: -2, appal: -1, appall: -1, appalled: -1, appalling: -1, appallingly: -1, apprehension: -1, apprehensions: -1, apprehensive: -1, apprehensively: -1, arbitrary: -1, arcane: -1, archaic: -1, arduous: -1, arduously: -1, argumentative: -1, arrogance: -3, arrogant: -4, arrogantly: -5, ashamed: -4, asinine: -1, asininely: -1, asinininity: -1, askance: -1, asperse: -1, aspersion: -1, aspersions: -1, assail: -1, assassin: -2, assassinate: -2, assault: -1, assult: -1, astray: -1, asunder: -1, atrocious: -1, atrocities: -1, atrocity: -1, atrophy: -1, attack: -3, attacks: -3, audacious: -3, audaciously: -2, audaciousness: -2, audacity: -2, audiciously: -1, austere: -1, authoritarian: -1, autocrat: -1, autocratic: -1, avalanche: -2, avarice: -1, avaricious: -1, avariciously: -1, avenge: -4, averse: -1, aversion: -1, aweful: -4, awful: -5, awfully: -1, awfulness: -1, awkward: -3, awkwardness: -2, ax: -1, babble: -1, "back-logged": -1, "back-wood": -1, "back-woods": -1, backache: -1, backaches: -1, backaching: -1, backbite: -1, backbiting: -1, backward: -1, backwardness: -1, backwood: -1, backwoods: -1, bad: -4, badly: -2, baffle: -5, baffled: -4, bafflement: -1, baffling: -1, bait: -1, balk: -1, banal: -1, banalize: -1, bane: -1, banish: -5, banishment: -4, bankrupt: -2, barbarian: -5, barbaric: -4, barbarically: -3, barbarity: -2, barbarous: -3, barbarously: -1, barren: -3, baseless: -2, bash: -1, bashed: -1, bashful: -1, bashing: -1, bastard: -2, bastards: -2, battered: -1, battering: -1, batty: -1, bearish: -1, beastly: -1, bedlam: -1, bedlamite: -1, befoul: -1, beg: -1, beggar: -1, beggarly: -1, begging: -1, beguile: -1, belabor: -1, belated: -1, beleaguer: -1, belie: -2, belittle: -2, belittled: -2, belittling: -2, bellicose: -2, belligerence: -2, belligerent: -2, belligerently: -2, bemoan: -2, bemoaning: -2, bemused: -2, bent: -2, berate: -2, bereave: -2, bereavement: -2, bereft: -2, berserk: -2, beseech: -1, beset: -1, besiege: -1, besmirch: -1, bestial: -1, betray: -1, betrayal: -1, betrayals: -1, betrayer: -1, betraying: -1, betrays: -1, bewail: -1, beware: -2, bewilder: -1, bewildered: -1, bewildering: -1, bewilderingly: -1, bewilderment: -1, bewitch: -1, bias: -3, biased: -1, biases: -1, bicker: -1, bickering: -1, "bid-rigging": -1, bigotries: -1, bigotry: -4, bitch: -5, bitchy: -5, biting: -5, bitingly: -5, bitter: -5, bitterly: -5, bitterness: -5, bizarre: -1, blab: -1, blabber: -1, blackmail: -1, blah: -1, blame: -3, blameworthy: -1, bland: -1, blandish: -1, blaspheme: -1, blasphemous: -1, blasphemy: -1, blasted: -1, blatant: -1, blatantly: -1, blather: -1, bleak: -1, bleakly: -1, bleakness: -1, bleed: -2, bleeding: -3, bleeds: -3, blemish: -1, blind: -2, blinding: -1, blindingly: -1, blindside: -1, blister: -1, blistering: -1, bloated: -1, blockage: -1, blockhead: -1, bloodshed: -1, bloodthirsty: -1, bloody: -1, blotchy: -1, blow: -3, blunder: -1, blundering: -1, blunders: -1, blunt: -1, blur: -1, bluring: -1, blurred: -1, blurring: -1, blurry: -1, blurs: -1, blurt: -1, boastful: -1, boggle: -3, bogus: -2, boil: -2, boiling: -3, boisterous: -2, bomb: -4, bombard: -2, bombardment: -1, bombastic: -1, bondage: -1, bonkers: -4, bore: -1, bored: -1, boredom: -2, bores: -2, boring: -1, botch: -1, bother: -1, bothered: -1, bothering: -1, bothers: -1, bothersome: -1, bowdlerize: -1, boycott: -3, braggart: -3, bragger: -2, brainless: -3, brainwash: -1, brash: -1, brashly: -1, brashness: -1, brat: -1, bravado: -1, brazen: -1, brazenly: -2, brazenness: -2, breach: -3, break: -2, "break-up": -2, "break-ups": -1, breakdown: -4, breaking: -1, breaks: -2, breakup: -2, breakups: -2, bribery: -2, brimstone: -2, bristle: -2, brittle: -3, broke: -3, broken: -3, "broken-hearted": -3, brood: -3, browbeat: -3, bruise: -3, bruised: -2, bruises: -2, bruising: -2, brusque: -3, brutal: -3, brutalising: -3, brutalities: -2, brutality: -2, brutalize: -2, brutalizing: -2, brutally: -2, brute: -2, brutish: -1, bs: -3, buckle: -1, bug: -2, bugging: -5, buggy: -3, bugs: -2, bulkier: -2, bulkiness: -1, bulky: -3, bulkyness: -1, "bull****": -3, "bull----": -3, bullies: -2, bullshit: -5, bullshyt: -1, bully: -2, bullying: -1, bullyingly: -1, bum: -1, bump: -1, bumped: -3, bumping: -1, bumpping: -1, bumps: -1, bumpy: -1, bungle: -1, bungler: -1, bungling: -1, bunk: -1, burden: -4, burdensome: -1, burdensomely: -1, burn: -5, burned: -4, burning: -1, burns: -1, bust: -1, busts: -1, busybody: -1, butcher: -1, butchery: -1, buzzing: -1, byzantine: -1, cackle: -1, calamities: -3, calamitous: -3, calamitously: -3, calamity: -4, callous: -2, calumniate: -1, calumniation: -1, calumnies: -1, calumnious: -1, calumniously: -1, calumny: -1, cancer: -5, cancerous: -1, cannibal: -1, cannibalize: -5, capitulate: -1, capricious: -1, capriciously: -1, capriciousness: -1, capsize: -1, careless: -4, carelessness: -5, caricature: -1, carnage: -1, carp: -1, cartoonish: -1, "cash-strapped": -1, castigate: -1, castrated: -1, casualty: -3, cataclysm: -2, cataclysmal: -2, cataclysmic: -2, cataclysmically: -1, catastrophe: -4, catastrophes: -4, catastrophic: -4, catastrophically: -1, catastrophies: -1, caustic: -1, caustically: -1, cautionary: -3, cave: -1, censure: -1, chafe: -1, chaff: -1, chagrin: -1, challenging: -3, chaos: -5, chaotic: -1, chasten: -1, chastise: -1, chastisement: -1, chatter: -1, chatterbox: -1, cheap: -3, cheapen: -1, cheaply: -1, cheat: -2, cheated: -3, cheater: -2, cheating: -1, cheats: -1, checkered: -1, cheerless: -1, cheesy: -1, chide: -1, childish: -1, chill: -1, chilly: -1, chintzy: -1, choke: -1, choleric: -1, choppy: -1, chore: -1, chronic: -1, chunky: -1, clamor: -1, clamorous: -1, clash: -1, cliche: -1, cliched: -1, clique: -1, clog: -1, clogged: -1, clogs: -1, cloud: -1, clouding: -1, cloudy: -1, clueless: -1, clumsy: -3, clunky: -3, coarse: -3, cocky: -1, coerce: -2, coercion: -2, coercive: -2, cold: -3, coldly: -1, collapse: -1, collude: -1, collusion: -1, combative: -1, combust: -2, comical: -2, commiserate: -2, commonplace: -2, commotion: -3, commotions: -3, complacent: -3, complain: -3, complained: -4, complaining: -4, complains: -4, complaint: -4, complaints: -2, complex: -2, complicated: -4, complication: -4, complicit: -4, compulsion: -4, compulsive: -1, concede: -1, conceded: -1, conceit: -1, conceited: -1, concen: -1, concens: -2, concern: -1, concerned: -1, concerns: -1, concession: -1, concessions: -1, condemn: -1, condemnable: -1, condemnation: -1, condemned: -1, condemns: -1, condescend: -1, condescending: -1, condescendingly: -1, condescension: -1, confess: -1, confession: -4, confessions: -2, confined: -2, conflict: -2, conflicted: -2, conflicting: -2, conflicts: -2, confound: -2, confounded: -2, confounding: -2, confront: -3, confrontation: -3, confrontational: -3, confuse: -5, confused: -4, confuses: -4, confusing: -4, confusion: -4, confusions: -4, congested: -4, congestion: -4, cons: -5, conscons: -2, conservative: -1, conspicuous: -1, conspicuously: -1, conspiracies: -1, conspiracy: -4, conspirator: -1, conspiratorial: -1, conspire: -5, consternation: -1, contagious: -3, contaminate: -3, contaminated: -3, contaminates: -2, contaminating: -2, contamination: -1, contempt: -1, contemptible: -1, contemptuous: -2, contemptuously: -2, contend: -2, contention: -2, contentious: -2, contort: -3, contortions: -3, contradict: -3, contradiction: -3, contradictory: -3, contrariness: -3, contravene: -3, contrive: -3, contrived: -3, controversial: -3, controversy: -2, convoluted: -2, corrode: -2, corrosion: -3, corrosions: -3, corrosive: -3, corrupt: -4, corrupted: -4, corrupting: -4, corruption: -4, corrupts: -4, corruptted: -4, costlier: -3, costly: -3, "counter-productive": -3, counterproductive: -3, coupists: -1, covetous: -2, coward: -4, cowardly: -5, crabby: -2, crack: -2, cracked: -2, cracks: -1, craftily: -1, craftly: -1, crafty: -1, cramp: -1, cramped: -1, cramping: -1, cranky: -1, crap: -4, crappy: -5, craps: -3, crash: -3, crashed: -2, crashes: -2, crashing: -1, crass: -1, craven: -1, cravenly: -1, craze: -1, crazily: -1, craziness: -1, crazy: -2, creak: -3, creaking: -3, creaks: -1, credulous: -1, creep: -1, creeping: -1, creeps: -1, creepy: -1, crept: -1, crime: -4, criminal: -4, cringe: -2, cringed: -2, cringes: -2, cripple: -2, crippled: -3, cripples: -3, crippling: -4, crisis: -4, critic: -4, critical: -1, criticism: -1, criticisms: -1, criticize: -1, criticized: -1, criticizing: -1, critics: -3, cronyism: -3, crook: -3, crooked: -3, crooks: -1, crowded: -1, crowdedness: -1, crude: -1, cruel: -5, crueler: -5, cruelest: -5, cruelly: -5, cruelness: -4, cruelties: -4, cruelty: -4, crumble: -3, crumbling: -3, crummy: -2, crumple: -2, crumpled: -2, crumples: -1, crush: -3, crushed: -1, crushing: -1, cry: -3, culpable: -1, culprit: -3, cumbersome: -1, cunt: -5, cunts: -5, cuplrit: -1, curse: -3, cursed: -3, curses: -4, curt: -1, cuss: -3, cussed: -3, cutthroat: -2, cynical: -3, cynicism: -3, "d*mn": -3, damage: -3, damaged: -3, damages: -3, damaging: -3, damn: -4, damnable: -5, damnably: -5, damnation: -5, damned: -5, damning: -5, damper: -2, danger: -2, dangerous: -2, dangerousness: -3, dark: -3, darken: -2, darkened: -2, darker: -2, darkness: -2, dastard: -1, dastardly: -1, daunt: -1, daunting: -2, dauntingly: -2, dawdle: -1, daze: -1, dazed: -1, dead: -5, deadbeat: -5, deadlock: -3, deadly: -4, deadweight: -3, deaf: -3, dearth: -1, death: -4, debacle: -1, debase: -1, debasement: -1, debaser: -1, debatable: -1, debauch: -1, debaucher: -1, debauchery: -1, debilitate: -1, debilitating: -1, debility: -1, debt: -2, debts: -2, decadence: -1, decadent: -1, decay: -4, decayed: -4, deceit: -3, deceitful: -3, deceitfully: -3, deceitfulness: -3, deceive: -3, deceiver: -3, deceivers: -3, deceiving: -3, deception: -4, deceptive: -4, deceptively: -5, declaim: -3, decline: -2, declines: -2, declining: -2, decrement: -2, decrepit: -2, decrepitude: -1, decry: -1, defamation: -3, defamations: -3, defamatory: -3, defame: -3, defect: -4, defective: -4, defects: -4, defensive: -3, defiance: -3, defiant: -3, defiantly: -3, deficiencies: -3, deficiency: -3, deficient: -3, defile: -3, defiler: -3, deform: -3, deformed: -3, defrauding: -4, defunct: -2, defy: -1, degenerate: -2, degenerately: -2, degeneration: -2, degradation: -3, degrade: -3, degrading: -3, degradingly: -3, dehumanization: -2, dehumanize: -2, deign: -1, deject: -1, dejected: -1, dejectedly: -1, dejection: -1, delay: -1, delayed: -1, delaying: -1, delays: -1, delinquency: -1, delinquent: -1, delirious: -1, delirium: -1, delude: -1, deluded: -1, deluge: -1, delusion: -1, delusional: -1, delusions: -1, demean: -2, demeaning: -1, demise: -3, demolish: -3, demolisher: -3, demon: -4, demonic: -4, demonize: -4, demonized: -4, demonizes: -4, demonizing: -4, demoralize: -1, demoralizing: -1, demoralizingly: -1, denial: -2, denied: -2, denies: -1, denigrate: -1, denounce: -1, dense: -1, dent: -1, dented: -1, dents: -1, denunciate: -1, denunciation: -1, denunciations: -1, deny: -2, denying: -2, deplete: -1, deplorable: -1, deplorably: -1, deplore: -1, deploring: -1, deploringly: -1, deprave: -1, depraved: -1, depravedly: -1, deprecate: -1, depress: -4, depressed: -3, depressing: -4, depressingly: -3, depression: -4, depressions: -4, deprive: -3, deprived: -3, deride: -1, derision: -1, derisive: -1, derisively: -1, derisiveness: -1, derogatory: -3, desecrate: -1, desert: -2, desertion: -1, desiccate: -1, desiccated: -1, desititute: -1, desolate: -1, desolately: -1, desolation: -1, despair: -1, despairing: -1, despairingly: -1, desperate: -2, desperately: -2, desperation: -1, despicable: -2, despicably: -1, despise: -1, despised: -1, despoil: -1, despoiler: -1, despondence: -1, despondency: -1, despondent: -1, despondently: -1, despot: -1, despotic: -1, despotism: -1, destabilisation: -1, destains: -1, destitute: -1, destitution: -1, destroy: -5, destroyer: -5, destruction: -5, destructive: -5, desultory: -1, deter: -2, deteriorate: -5, deteriorating: -5, deterioration: -5, deterrent: -5, detest: -3, detestable: -3, detestably: -3, detested: -3, detesting: -3, detests: -3, detract: -3, detracted: -2, detracting: -2, detraction: -2, detracts: -2, detriment: -2, detrimental: -2, devastate: -5, devastated: -5, devastates: -5, devastating: -5, devastatingly: -5, devastation: -5, deviate: -2, deviation: -2, devil: -2, devilish: -2, devilishly: -2, devilment: -2, devilry: -2, devious: -3, deviously: -3, deviousness: -3, devoid: -2, diabolic: -2, diabolical: -2, diabolically: -2, diametrically: -1, diappointed: -5, diatribe: -1, diatribes: -1, dick: -5, dictator: -4, dictatorial: -3, die: -5, "die-hard": -2, died: -4, dies: -3, difficult: -2, difficulties: -2, difficulty: -2, diffidence: -1, dilapidated: -1, dilemma: -1, "dilly-dally": -1, dim: -1, dimmer: -1, din: -1, ding: -1, dings: -1, dinky: -1, dire: -1, direly: -1, direness: -1, dirt: -2, dirtbag: -1, dirtbags: -1, dirts: -2, dirty: -2, disable: -1, disabled: -1, disaccord: -1, disadvantage: -1, disadvantaged: -1, disadvantageous: -1, disadvantages: -1, disaffect: -1, disaffected: -1, disaffirm: -1, disagree: -2, disagreeable: -1, disagreeably: -1, disagreed: -2, disagreeing: -1, disagreement: -1, disagrees: -1, disallow: -4, disapointed: -5, disapointing: -5, disapointment: -5, disappoint: -5, disappointed: -4, disappointing: -4, disappointingly: -4, disappointment: -4, disappointments: -4, disappoints: -3, disapprobation: -1, disapproval: -2, disapprove: -2, disapproving: -2, disarm: -2, disarray: -1, disaster: -1, disasterous: -2, disastrous: -2, disastrously: -1, disavow: -3, disavowal: -3, disbelief: -2, disbelieve: -2, disbeliever: -2, disclaim: -1, discombobulate: -1, discomfit: -3, discomfititure: -1, discomfort: -1, discompose: -1, disconcert: -1, disconcerted: -1, disconcerting: -1, disconcertingly: -1, disconsolate: -1, disconsolately: -1, disconsolation: -1, discontent: -2, discontented: -2, discontentedly: -2, discontinued: -2, discontinuity: -1, discontinuous: -1, discord: -1, discordance: -1, discordant: -1, discountenance: -1, discourage: -1, discouragement: -1, discouraging: -1, discouragingly: -1, discourteous: -1, discourteously: -1, discoutinous: -1, discredit: -1, discrepant: -1, discriminate: -2, discrimination: -2, discriminatory: -2, disdain: -1, disdained: -1, disdainful: -1, disdainfully: -1, disfavor: -1, disgrace: -5, disgraced: -5, disgraceful: -5, disgracefully: -5, disgruntle: -3, disgruntled: -3, disgust: -5, disgusted: -5, disgustedly: -5, disgustful: -5, disgustfully: -5, disgusting: -5, disgustingly: -5, dishearten: -4, disheartening: -4, dishearteningly: -4, dishonest: -3, dishonestly: -3, dishonesty: -3, dishonor: -3, dishonorable: -3, dishonorablely: -3, disillusion: -2, disillusioned: -2, disillusionment: -2, disillusions: -2, disinclination: -2, disinclined: -2, disingenuous: -2, disingenuously: -2, disintegrate: -2, disintegrated: -2, disintegrates: -2, disintegration: -2, disinterest: -2, disinterested: -2, dislike: -3, disliked: -3, dislikes: -3, disliking: -3, dislocated: -3, disloyal: -3, disloyalty: -3, dismal: -1, dismally: -1, dismalness: -1, dismay: -3, dismayed: -3, dismaying: -3, dismayingly: -3, dismissive: -2, dismissively: -2, disobedience: -2, disobedient: -2, disobey: -1, disoobedient: -1, disorder: -1, disordered: -1, disorderly: -1, disorganized: -1, disorient: -1, disoriented: -1, disown: -1, disparage: -1, disparaging: -1, disparagingly: -1, dispensable: -1, dispirit: -1, dispirited: -1, dispiritedly: -1, dispiriting: -1, displace: -1, displaced: -1, displease: -1, displeased: -1, displeasing: -1, displeasure: -1, disproportionate: -1, disprove: -2, disputable: -1, dispute: -3, disputed: -3, disquiet: -1, disquieting: -1, disquietingly: -1, disquietude: -1, disregard: -3, disregardful: -1, disreputable: -1, disrepute: -2, disrespect: -1, disrespectable: -1, disrespectablity: -1, disrespectful: -1, disrespectfully: -1, disrespectfulness: -1, disrespecting: -1, disrupt: -4, disruption: -4, disruptive: -4, diss: -1, dissapointed: -5, dissappointed: -5, dissappointing: -5, dissatisfaction: -4, dissatisfactory: -4, dissatisfied: -4, dissatisfies: -4, dissatisfy: -4, dissatisfying: -4, dissed: -1, dissemble: -1, dissembler: -1, dissension: -1, dissent: -1, dissenter: -1, dissention: -1, disservice: -1, disses: -1, dissidence: -1, dissident: -1, dissidents: -1, dissing: -1, dissocial: -1, dissolute: -1, dissolution: -1, dissonance: -1, dissonant: -1, dissonantly: -1, dissuade: -1, dissuasive: -1, distains: -1, distaste: -1, distasteful: -1, distastefully: -1, distort: -1, distorted: -1, distortion: -1, distorts: -1, distract: -1, distracting: -1, distraction: -1, distraught: -1, distraughtly: -1, distraughtness: -1, distress: -2, distressed: -2, distressing: -2, distressingly: -1, distrust: -3, distrustful: -3, distrusting: -3, disturb: -3, disturbance: -3, disturbed: -3, disturbing: -3, disturbingly: -3, disunity: -2, disvalue: -2, divergent: -2, divisive: -2, divisively: -2, divisiveness: -2, dizzing: -2, dizzingly: -2, dizzy: -2, doddering: -2, dodgey: -2, dogged: -2, doggedly: -2, dogmatic: -2, doldrums: -2, domineer: -2, domineering: -2, donside: -2, doom: -4, doomed: -4, doomsday: -3, dope: -1, doubt: -2, doubtful: -1, doubtfully: -1, doubts: -2, douchbag: -5, douchebag: -5, douchebags: -5, downbeat: -3, downcast: -1, downer: -1, downfall: -1, downfallen: -1, downgrade: -1, downhearted: -1, downheartedly: -1, downhill: -1, downside: -3, downsides: -1, downturn: -1, downturns: -1, drab: -1, draconian: -1, draconic: -1, drag: -2, dragged: -1, dragging: -1, dragoon: -1, drags: -1, drain: -3, drained: -3, draining: -3, drains: -1, drastic: -1, drastically: -1, drawback: -1, drawbacks: -1, dread: -4, dreadful: -4, dreadfully: -4, dreadfulness: -4, dreary: -2, dripped: -2, dripping: -2, drippy: -2, drips: -2, drones: -2, droop: -2, droops: -2, "drop-out": -3, "drop-outs": -3, dropout: -3, dropouts: -2, drought: -2, drowning: -3, drunk: -3, drunkard: -1, drunken: -1, dubious: -1, dubiously: -1, dubitable: -1, dud: -1, dull: -1, dullard: -1, dumb: -2, dumbfound: -2, dump: -2, dumped: -3, dumping: -3, dumps: -3, dunce: -1, dungeon: -1, dungeons: -1, dupe: -2, dust: -2, dusty: -2, dwindling: -1, dying: -1, earsplitting: -1, eccentric: -1, eccentricity: -1, effigy: -1, effrontery: -1, egocentric: -2, egomania: -3, egotism: -1, egotistical: -1, egotistically: -1, egregious: -1, egregiously: -1, "election-rigger": -1, elimination: -1, emaciated: -1, emasculate: -1, embarrass: -1, embarrassing: -1, embarrassingly: -1, embarrassment: -1, embattled: -1, embroil: -1, embroiled: -1, embroilment: -1, emergency: -1, emphatic: -1, emphatically: -1, emptiness: -1, encroach: -1, encroachment: -1, endanger: -3, enemies: -2, enemy: -2, enervate: -1, enfeeble: -1, enflame: -1, engulf: -1, enjoin: -1, enmity: -1, enrage: -1, enraged: -1, enraging: -1, enslave: -3, entangle: -1, entanglement: -1, entrap: -1, entrapment: -1, envious: -1, enviously: -1, enviousness: -1, epidemic: -4, equivocal: -1, erase: -3, erode: -5, erodes: -5, erosion: -5, err: -1, errant: -1, erratic: -1, erratically: -1, erroneous: -1, erroneously: -1, error: -3, errors: -3, eruptions: -1, escapade: -1, eschew: -1, estranged: -1, evade: -1, evasion: -1, evasive: -1, evil: -1, evildoer: -1, evils: -1, eviscerate: -1, exacerbate: -1, exagerate: -3, exagerated: -3, exagerates: -3, exaggerate: -3, exaggeration: -3, exasperate: -3, exasperated: -3, exasperating: -3, exasperatingly: -3, exasperation: -3, excessive: -3, excessively: -2, exclusion: -2, excoriate: -2, excruciating: -2, excruciatingly: -1, excuse: -2, excuses: -2, execrate: -3, exhaust: -3, exhausted: -3, exhaustion: -3, exhausts: -3, exhorbitant: -2, exhort: -2, exile: -2, exorbitant: -2, exorbitantance: -2, exorbitantly: -2, expel: -4, expensive: -4, expire: -4, expired: -4, explode: -4, exploit: -4, exploitation: -3, explosive: -3, expropriate: -3, expropriation: -3, expulse: -1, expunge: -1, exterminate: -3, extermination: -3, extinguish: -1, extort: -5, extortion: -5, extraneous: -1, extravagance: -2, extravagant: -1, extravagantly: -1, extremism: -3, extremist: -5, extremists: -5, eyesore: -3, "f**k": -5, fabricate: -3, fabrication: -1, facetious: -1, facetiously: -1, fail: -5, failed: -4, failing: -4, fails: -4, failure: -4, failures: -4, faint: -2, fainthearted: -2, faithless: -2, fake: -2, fall: -2, fallacies: -2, fallacious: -1, fallaciously: -1, fallaciousness: -1, fallacy: -3, fallen: -3, falling: -3, fallout: -4, falls: -3, false: -1, falsehood: -5, falsely: -4, falsify: -4, falter: -1, faltered: -1, famine: -5, famished: -1, fanatic: -3, fanatical: -3, fanatically: -4, fanaticism: -2, fanatics: -2, fanciful: -2, "far-fetched": -1, farce: -1, farcical: -1, "farcical-yet-provocative": -1, farcically: -1, farfetched: -1, fascism: -5, fascist: -5, fastidious: -1, fastidiously: -1, fastuous: -1, fat: -1, "fat-cat": -1, "fat-cats": -1, fatal: -4, fatalistic: -4, fatalistically: -4, fatally: -4, fatcat: -1, fatcats: -1, fateful: -3, fatefully: -3, fathomless: -1, fatigue: -4, fatigued: -4, fatique: -4, fatty: -4, fatuity: -2, fatuous: -2, fatuously: -2, fault: -4, faults: -4, faulty: -4, fawningly: -1, faze: -1, fear: -5, fearful: -5, fearfully: -5, fears: -5, fearsome: -5, feckless: -1, feeble: -1, feeblely: -1, feebleminded: -1, feign: -1, feint: -1, fell: -1, felon: -1, felonious: -1, ferociously: -1, ferocity: -1, fetid: -1, fever: -3, feverish: -1, fevers: -1, fiasco: -1, fib: -1, fibber: -1, fickle: -1, fiction: -3, fictional: -3, fictitious: -3, fidget: -1, fidgety: -1, fiend: -1, fiendish: -1, fierce: -1, figurehead: -1, filth: -2, filthy: -2, finagle: -2, finicky: -2, fissures: -2, fist: -1, flabbergast: -1, flabbergasted: -1, flagging: -1, flagrant: -1, flagrantly: -1, flair: -1, flairs: -1, flak: -1, flake: -1, flakey: -1, flakieness: -1, flaking: -1, flaky: -1, flare: -1, flares: -1, flareup: -1, flareups: -1, "flat-out": -1, flaunt: -1, flaw: -5, flawed: -5, flaws: -5, flee: -2, fleed: -2, fleeing: -2, fleer: -2, flees: -2, fleeting: -3, flicering: -3, flicker: -3, flickering: -3, flickers: -2, flighty: -2, flimflam: -2, flimsy: -3, flirt: -3, flirty: -3, floored: -3, flounder: -3, floundering: -3, flout: -3, fluster: -2, foe: -4, fool: -3, fooled: -3, foolhardy: -3, foolish: -3, foolishly: -3, foolishness: -3, forbid: -3, forbidden: -2, forbidding: -2, forceful: -2, foreboding: -1, forebodingly: -1, forfeit: -1, forged: -1, forgetful: -1, forgetfully: -1, forgetfulness: -1, forlorn: -1, forlornly: -1, forsake: -2, forsaken: -2, forswear: -2, foul: -5, foully: -5, foulness: -5, fractious: -3, fractiously: -3, fracture: -3, fragile: -3, fragmented: -3, frail: -3, frantic: -3, frantically: -3, franticly: -3, fraud: -3, fraudulent: -3, fraught: -3, frazzle: -2, frazzled: -2, freak: -2, freaking: -3, freakish: -3, freakishly: -3, freaks: -2, freeze: -2, freezes: -2, freezing: -2, frenetic: -2, frenetically: -3, frenzied: -3, frenzy: -3, fret: -3, fretful: -3, frets: -3, friction: -3, frictions: -3, fried: -3, friggin: -3, frigging: -3, fright: -3, frighten: -2, frightening: -2, frighteningly: -2, frightful: -2, frightfully: -2, frigid: -3, frost: -3, frown: -3, froze: -3, frozen: -2, fruitless: -2, fruitlessly: -2, frustrate: -2, frustrated: -5, frustrates: -5, frustrating: -5, frustratingly: -5, frustration: -5, frustrations: -5, fuck: -5, fucking: -5, fudge: -2, fugitive: -2, "full-blown": -3, fulminate: -3, fumble: -3, fume: -3, fumes: -3, fundamentalism: -2, funky: -2, funnily: -2, funny: -1, furious: -2, furiously: -2, furor: -2, fury: -3, fuss: -3, fussy: -3, fustigate: -3, fusty: -3, futile: -3, futilely: -3, futility: -3, fuzzy: -3, gabble: -2, gaff: -2, gaffe: -2, gainsay: -2, gainsayer: -2, gall: -2, galling: -2, gallingly: -2, galls: -2, gangster: -5, gape: -5, garbage: -5, garish: -1, gasp: -1, gauche: -1, gaudy: -1, gawk: -1, gawky: -3, geezer: -1, genocide: -3, "get-rich": -1, ghastly: -1, ghetto: -1, ghosting: -1, gibber: -1, gibberish: -1, gibe: -1, giddy: -1, gimmick: -3, gimmicked: -3, gimmicking: -3, gimmicks: -3, gimmicky: -3, glare: -1, glaringly: -1, glib: -1, glibly: -1, glitch: -1, glitches: -1, gloatingly: -1, gloom: -1, gloomy: -1, glower: -1, glum: -1, glut: -1, gnawing: -1, goad: -1, goading: -1, "god-awful": -1, goof: -1, goofy: -1, goon: -1, gossip: -1, graceless: -1, gracelessly: -1, graft: -1, grainy: -1, grapple: -1, grate: -1, grating: -1, gravely: -1, greasy: -1, greed: -4, greedy: -4, grief: -5, grievance: -5, grievances: -5, grieve: -5, grieving: -5, grievous: -5, grievously: -5, grim: -2, grimace: -2, grind: -1, gripe: -1, gripes: -1, grisly: -1, gritty: -1, gross: -2, grossly: -2, grotesque: -1, grouch: -1, grouchy: -1, groundless: -1, grouse: -1, growl: -3, grudge: -4, grudges: -4, grudging: -4, grudgingly: -4, gruesome: -5, gruesomely: -5, gruff: -1, grumble: -1, grumpier: -1, grumpiest: -1, grumpily: -1, grumpish: -1, grumpy: -1, guile: -1, guilt: -3, guiltily: -3, guilty: -3, gullible: -3, gutless: -1, gutter: -1, hack: -2, hacks: -2, haggard: -2, haggle: -2, hairloss: -1, halfhearted: -1, halfheartedly: -1, hallucinate: -1, hallucination: -1, hamper: -1, hampered: -1, handicapped: -1, hang: -1, hangs: -1, haphazard: -1, hapless: -1, harangue: -1, harass: -3, harassed: -3, harasses: -3, harassment: -3, harboring: -1, harbors: -1, hard: -4, "hard-hit": -3, "hard-line": -3, "hard-liner": -3, hardball: -3, harden: -3, hardened: -3, hardheaded: -3, hardhearted: -3, hardliner: -3, hardliners: -3, hardship: -5, hardships: -5, harm: -5, harmed: -5, harmful: -5, harms: -5, harpy: -1, harridan: -1, harried: -1, harrow: -1, harsh: -1, harshly: -1, hasseling: -1, hassle: -3, hassled: -3, hassles: -3, haste: -5, hastily: -1, hasty: -1, hate: -5, hated: -5, hateful: -5, hatefully: -5, hatefulness: -5, hater: -5, haters: -5, hates: -5, hating: -5, hatred: -5, haughtily: -1, haughty: -1, haunt: -3, haunting: -3, havoc: -1, hawkish: -1, haywire: -1, hazard: -3, hazardous: -3, haze: -1, hazy: -1, "head-aches": -1, headache: -2, headaches: -2, heartbreaker: -4, heartbreaking: -4, heartbreakingly: -4, heartless: -4, heathen: -1, "heavy-handed": -2, heavyhearted: -2, heck: -1, heckle: -1, heckled: -1, heckles: -1, hectic: -1, hedge: -1, hedonistic: -1, heedless: -1, hefty: -1, hegemonism: -1, hegemonistic: -1, hegemony: -1, heinous: -1, hell: -2, "hell-bent": -2, hellion: -1, hells: -1, helpless: -3, helplessly: -3, helplessness: -1, heresy: -1, heretic: -1, heretical: -1, hesitant: -1, hestitant: -1, hideous: -1, hideously: -1, hideousness: -1, "high-priced": -1, hiliarious: -1, hinder: -1, hindrance: -1, hiss: -1, hissed: -1, hissing: -1, "ho-hum": -1, hoard: -1, hoax: -5, hobble: -5, hogs: -1, hollow: -1, hoodium: -1, hoodwink: -1, hooligan: -1, hopeless: -2, hopelessly: -2, hopelessness: -2, horde: -2, horrendous: -1, horrendously: -1, horrible: -1, horrid: -1, horrific: -1, horrified: -1, horrifies: -1, horrify: -1, horrifying: -1, horrifys: -1, hostage: -1, hostile: -1, hostilities: -1, hostility: -1, hotbeds: -1, hothead: -1, hotheaded: -1, hothouse: -1, hubris: -1, huckster: -1, hum: -1, humid: -1, humiliate: -3, humiliating: -3, humiliation: -3, humming: -1, hung: -3, hurt: -5, hurted: -5, hurtful: -5, hurting: -5, hurts: -4, hustler: -1, hype: -1, hypocricy: -3, hypocrisy: -3, hypocrite: -3, hypocrites: -3, hypocritical: -3, hypocritically: -3, hysteria: -2, hysteric: -2, hysterical: -2, hysterically: -2, hysterics: -2, idiocies: -1, idiocy: -1, idiot: -3, idiotic: -3, idiotically: -3, idiots: -3, idle: -1, ignoble: -1, ignominious: -3, ignominiously: -3, ignominy: -3, ignorance: -5, ignorant: -5, ignore: -5, "ill-advised": -2, "ill-conceived": -2, "ill-defined": -2, "ill-designed": -2, "ill-fated": -2, "ill-favored": -2, "ill-formed": -2, "ill-mannered": -2, "ill-natured": -2, "ill-sorted": -2, "ill-tempered": -2, "ill-treated": -2, "ill-treatment": -2, "ill-usage": -2, "ill-used": -2, illegal: -4, illegally: -4, illegitimate: -1, illicit: -1, illiterate: -1, illness: -1, illogic: -1, illogical: -1, illogically: -1, illusion: -1, illusions: -1, illusory: -1, imaginary: -1, imbalance: -1, imbecile: -1, imbroglio: -1, immaterial: -1, immature: -1, imminence: -1, imminently: -1, immobilized: -1, immoderate: -1, immoderately: -1, immodest: -1, immoral: -1, immorality: -1, immorally: -1, immovable: -1, impair: -3, impaired: -1, impasse: -1, impatience: -2, impatient: -1, impatiently: -1, impeach: -1, impedance: -1, impede: -1, impediment: -1, impending: -1, impenitent: -1, imperfect: -1, imperfection: -1, imperfections: -1, imperfectly: -3, imperialist: -2, imperil: -2, imperious: -1, imperiously: -1, impermissible: -1, impersonal: -1, impertinent: -1, impetuous: -1, impetuously: -1, impiety: -1, impinge: -1, impious: -1, implacable: -1, implausible: -1, implausibly: -1, implicate: -1, implication: -1, implode: -2, impolite: -1, impolitely: -1, impolitic: -1, importunate: -1, importune: -1, impose: -1, imposers: -1, imposing: -1, imposition: -1, impossible: -3, impossiblity: -3, impossibly: -1, impotent: -2, impoverish: -1, impoverished: -1, impractical: -1, imprecate: -1, imprecise: -2, imprecisely: -1, imprecision: -1, imprison: -1, imprisonment: -1, improbability: -1, improbable: -1, improbably: -1, improper: -1, improperly: -1, impropriety: -1, imprudence: -1, imprudent: -1, impudence: -1, impudent: -1, impudently: -1, impugn: -1, impulsive: -3, impulsively: -3, impunity: -1, impure: -1, impurity: -1, inability: -1, inaccuracies: -1, inaccuracy: -1, inaccurate: -1, inaccurately: -1, inaction: -1, inactive: -1, inadequacy: -1, inadequate: -1, inadequately: -1, inadverent: -1, inadverently: -1, inadvisable: -1, inadvisably: -1, inane: -1, inanely: -1, inappropriate: -1, inappropriately: -1, inapt: -1, inaptitude: -1, inarticulate: -1, inattentive: -1, inaudible: -1, incapable: -1, incapably: -1, incautious: -1, incendiary: -1, incense: -2, incessant: -1, incessantly: -1, incite: -1, incitement: -1, incivility: -1, inclement: -1, incognizant: -1, incoherence: -1, incoherent: -1, incoherently: -1, incommensurate: -1, incomparable: -1, incomparably: -1, incompatability: -2, incompatibility: -2, incompatible: -2, incompetence: -2, incompetent: -2, incompetently: -2, incomplete: -3, incompliant: -3, incomprehensible: -3, incomprehension: -3, inconceivable: -3, inconceivably: -3, incongruous: -3, incongruously: -3, inconsequent: -3, inconsequential: -1, inconsequentially: -1, inconsequently: -1, inconsiderate: -1, inconsiderately: -1, inconsistence: -4, inconsistencies: -1, inconsistency: -1, inconsistent: -4, inconsolable: -1, inconsolably: -1, inconstant: -1, inconvenience: -1, inconveniently: -1, incorrect: -5, incorrectly: -1, incorrigible: -1, incorrigibly: -1, incredulous: -1, incredulously: -1, inculcate: -1, indecency: -5, indecent: -5, indecently: -5, indecision: -2, indecisive: -2, indecisively: -1, indecorum: -1, indefensible: -1, indelicate: -1, indeterminable: -1, indeterminably: -1, indeterminate: -1, indifference: -1, indifferent: -1, indigent: -1, indignant: -1, indignantly: -1, indignation: -1, indignity: -1, indiscernible: -1, indiscreet: -1, indiscreetly: -1, indiscretion: -1, indiscriminate: -2, indiscriminately: -2, indiscriminating: -2, indistinguishable: -2, indoctrinate: -1, indoctrination: -1, indolent: -1, indulge: -1, ineffective: -1, ineffectively: -1, ineffectiveness: -1, ineffectual: -1, ineffectually: -1, ineffectualness: -1, inefficacious: -1, inefficacy: -1, inefficiency: -1, inefficient: -1, inefficiently: -1, inelegance: -1, inelegant: -1, ineligible: -1, ineloquent: -1, ineloquently: -1, inept: -1, ineptitude: -1, ineptly: -1, inequalities: -1, inequality: -1, inequitable: -1, inequitably: -1, inequities: -1, inescapable: -1, inescapably: -1, inessential: -1, inevitable: -1, inevitably: -1, inexcusable: -1, inexcusably: -1, inexorable: -1, inexorably: -1, inexperience: -1, inexperienced: -1, inexpert: -1, inexpertly: -1, inexpiable: -1, inexplainable: -1, inextricable: -1, inextricably: -1, infamous: -1, infamously: -1, infamy: -1, infected: -4, infection: -1, infections: -1, inferior: -1, inferiority: -1, infernal: -1, infest: -1, infested: -1, infidel: -1, infidels: -1, infiltrator: -1, infiltrators: -1, infirm: -1, inflame: -1, inflammation: -1, inflammatory: -1, inflammed: -1, inflated: -1, inflationary: -1, inflexible: -1, inflict: -1, infraction: -1, infringe: -1, infringement: -1, infringements: -1, infuriate: -2, infuriated: -2, infuriating: -2, infuriatingly: -2, inglorious: -2, ingrate: -2, ingratitude: -2, inhibit: -2, inhibition: -2, inhospitable: -2, inhospitality: -2, inhuman: -1, inhumane: -3, inhumanity: -3, inimical: -1, inimically: -1, iniquitous: -1, iniquity: -1, injudicious: -1, injure: -3, injurious: -3, injury: -3, injustice: -3, injustices: -1, innuendo: -1, inoperable: -1, inopportune: -1, inordinate: -1, inordinately: -1, insane: -3, insanely: -3, insanity: -3, insatiable: -1, insecure: -1, insecurity: -1, insensible: -2, insensitive: -2, insensitively: -3, insensitivity: -3, insidious: -3, insidiously: -2, insignificance: -3, insignificant: -3, insignificantly: -3, insincere: -4, insincerely: -4, insincerity: -4, insinuate: -2, insinuating: -1, insinuation: -1, insociable: -1, insolence: -1, insolent: -1, insolently: -1, insolvent: -1, insouciance: -1, instability: -1, instable: -2, instigate: -2, instigator: -2, instigators: -2, insubordinate: -4, insubstantial: -4, insubstantially: -4, insufferable: -2, insufferably: -2, insufficiency: -2, insufficient: -2, insufficiently: -2, insular: -1, insult: -5, insulted: -1, insulting: -1, insultingly: -1, insults: -1, insupportable: -1, insupportably: -1, insurmountable: -1, insurmountably: -1, insurrection: -1, intefere: -1, inteferes: -1, intense: -1, interfere: -1, interference: -1, interferes: -1, intermittent: -1, interrupt: -1, interruption: -1, interruptions: -1, intimidate: -1, intimidating: -1, intimidatingly: -1, intimidation: -1, intolerable: -1, intolerablely: -1, intolerance: -1, intoxicate: -1, intractable: -1, intransigence: -1, intransigent: -1, intrude: -4, intrusion: -4, intrusive: -1, inundate: -1, inundated: -1, invader: -1, invalid: -5, invalidate: -1, invalidity: -1, invasive: -1, invective: -1, inveigle: -1, invidious: -1, invidiously: -1, invidiousness: -1, invisible: -4, involuntarily: -1, involuntary: -1, irascible: -1, irate: -1, irately: -1, ire: -1, irk: -1, irked: -1, irking: -1, irks: -1, irksome: -1, irksomely: -1, irksomeness: -1, irksomenesses: -1, ironic: -3, ironical: -3, ironically: -3, ironies: -3, irony: -3, irragularity: -1, irrational: -1, irrationalities: -1, irrationality: -1, irrationally: -1, irrationals: -1, irreconcilable: -1, irrecoverable: -1, irrecoverableness: -1, irrecoverablenesses: -1, irrecoverably: -1, irredeemable: -1, irredeemably: -1, irreformable: -1, irregular: -2, irregularity: -2, irrelevance: -2, irrelevant: -2, irreparable: -2, irreplacible: -2, irrepressible: -2, irresolute: -2, irresolvable: -2, irresponsible: -2, irresponsibly: -1, irretating: -1, irretrievable: -1, irreversible: -1, irritable: -1, irritably: -1, irritant: -1, irritate: -1, irritated: -1, irritating: -1, irritation: -1, irritations: -1, isolate: -2, isolated: -2, isolation: -2, issue: -2, issues: -1, itch: -1, itching: -3, itchy: -1, jabber: -1, jaded: -1, jagged: -1, jam: -1, jarring: -1, jaundiced: -1, jealous: -2, jealously: -2, jealousness: -2, jealousy: -2, jeer: -1, jeering: -1, jeeringly: -1, jeers: -1, jeopardize: -1, jeopardy: -1, jerk: -1, jerky: -1, jitter: -1, jitters: -1, jittery: -1, "job-killing": -1, jobless: -3, joke: -1, joker: -1, jolt: -3, judder: -1, juddering: -1, judders: -1, jumpy: -1, junk: -3, junky: -1, junkyard: -1, jutter: -1, jutters: -1, kaput: -1, kill: -5, killed: -5, killer: -4, killing: -4, killjoy: -4, kills: -4, knave: -1, knife: -1, knock: -2, knotted: -1, kook: -1, kooky: -1, lack: -3, lackadaisical: -1, lacked: -1, lackey: -1, lackeys: -1, lacking: -1, lackluster: -1, lacks: -1, laconic: -1, lag: -1, lagged: -1, lagging: -1, laggy: -1, lags: -1, "laid-off": -1, lambast: -1, lambaste: -1, lame: -1, "lame-duck": -1, lament: -1, lamentable: -1, lamentably: -1, languid: -1, languish: -1, languor: -1, languorous: -1, languorously: -1, lanky: -1, lapse: -1, lapsed: -1, lapses: -1, lascivious: -1, "last-ditch": -1, latency: -1, laughable: -1, laughably: -1, laughingstock: -1, lawbreaker: -1, lawbreaking: -1, lawless: -1, lawlessness: -1, layoff: -1, "layoff-happy": -1, lazy: -3, leak: -1, leakage: -1, leakages: -1, leaking: -1, leaks: -1, leaky: -1, lech: -1, lecher: -1, lecherous: -1, lechery: -1, leech: -1, leer: -1, leery: -1, "left-leaning": -1, lemon: -1, lengthy: -1, "less-developed": -1, "lesser-known": -1, letch: -1, lethal: -1, lethargic: -1, lethargy: -1, lewd: -1, lewdly: -1, lewdness: -1, liability: -1, liable: -2, liar: -3, liars: -4, licentious: -1, licentiously: -1, licentiousness: -1, lie: -3, lied: -3, lier: -3, lies: -3, "life-threatening": -4, lifeless: -4, limit: -3, limitation: -3, limitations: -3, limited: -3, limits: -3, limp: -1, listless: -1, litigious: -1, "little-known": -1, livid: -1, lividly: -1, loath: -1, loathe: -1, loathing: -4, loathly: -4, loathsome: -1, loathsomely: -1, lone: -1, loneliness: -1, lonely: -1, loner: -1, lonesome: -1, "long-time": -1, "long-winded": -1, longing: -3, longingly: -3, loophole: -2, loopholes: -2, loose: -3, loot: -1, lorn: -1, lose: -5, loser: -5, losers: -5, loses: -5, losing: -5, loss: -5, losses: -5, lost: -5, loud: -2, louder: -2, lousy: -2, loveless: -2, lovelorn: -2, "low-rated": -2, lowly: -2, ludicrous: -2, ludicrously: -2, lugubrious: -2, lukewarm: -2, lull: -2, lumpy: -2, lunatic: -2, lunaticism: -2, lurch: -2, lure: -1, lurid: -1, lurk: -1, lurking: -1, lying: -1, macabre: -1, mad: -1, madden: -1, maddening: -1, maddeningly: -1, madder: -1, madly: -3, madman: -3, madness: -3, maladjusted: -3, maladjustment: -3, malady: -3, malaise: -3, malcontent: -3, malcontented: -1, maledict: -1, malevolence: -1, malevolent: -1, malevolently: -1, malice: -1, malicious: -1, maliciously: -1, maliciousness: -1, malign: -2, malignant: -2, malodorous: -2, maltreatment: -2, mangle: -2, mangled: -2, mangles: -2, mangling: -2, mania: -3, maniac: -3, maniacal: -3, manic: -3, manipulate: -3, manipulation: -3, manipulative: -3, manipulators: -3, mar: -1, marginal: -1, marginally: -1, martyrdom: -1, "martyrdom-seeking": -1, mashed: -1, massacre: -1, massacres: -1, matte: -1, mawkish: -1, mawkishly: -1, mawkishness: -1, meager: -1, meaningless: -4, meanness: -2, measly: -2, meddle: -2, meddlesome: -2, mediocre: -2, mediocrity: -2, melancholy: -2, melodramatic: -2, melodramatically: -1, meltdown: -2, menace: -2, menacing: -2, menacingly: -2, mendacious: -2, mendacity: -2, menial: -2, merciless: -2, mercilessly: -1, mess: -1, messed: -1, messes: -1, messing: -1, messy: -1, midget: -1, miff: -1, militancy: -1, mindless: -1, mindlessly: -1, mirage: -1, mire: -1, misalign: -1, misaligned: -1, misaligns: -1, misapprehend: -1, misbecome: -1, misbecoming: -1, misbegotten: -1, misbehave: -1, misbehavior: -1, miscalculate: -1, miscalculation: -1, miscellaneous: -1, mischief: -1, mischievous: -1, mischievously: -1, misconception: -1, misconceptions: -3, miscreant: -3, miscreants: -3, misdirection: -3, miser: -3, miserable: -3, miserableness: -3, miserably: -3, miseries: -2, miserly: -2, misery: -2, misfit: -1, misfortune: -5, misgiving: -3, misgivings: -3, misguidance: -3, misguide: -3, misguided: -3, mishandle: -3, mishap: -4, misinform: -2, misinformed: -2, misinterpret: -2, misjudge: -2, misjudgment: -3, mislead: -3, misleading: -3, misleadingly: -3, mislike: -4, mismanage: -2, mispronounce: -2, mispronounced: -2, mispronounces: -2, misread: -3, misreading: -3, misrepresent: -2, misrepresentation: -2, miss: -1, missed: -1, misses: -1, misstatement: -1, mist: -1, mistake: -3, mistaken: -3, mistakenly: -3, mistakes: -3, mistified: -1, mistress: -1, mistrust: -1, mistrustful: -1, mistrustfully: -1, mists: -1, misunderstand: -2, misunderstanding: -2, misunderstandings: -2, misunderstood: -2, misuse: -3, moan: -1, mobster: -1, mock: -3, mocked: -3, mockeries: -1, mockery: -1, mocking: -1, mockingly: -1, mocks: -1, molest: -5, molestation: -5, monotonous: -2, monotony: -2, monster: -5, monstrosities: -2, monstrosity: -2, monstrous: -3, monstrously: -3, moody: -4, moot: -1, mope: -1, morbid: -3, morbidly: -3, mordant: -2, mordantly: -1, moribund: -1, moron: -4, moronic: -4, morons: -4, mortification: -1, mortified: -1, mortify: -3, mortifying: -1, motionless: -1, motley: -1, mourn: -4, mourner: -3, mournful: -3, mournfully: -3, muddle: -1, muddy: -1, mudslinger: -1, mudslinging: -1, mulish: -1, "multi-polarization": -1, mundane: -1, murder: -3, murderer: -1, murderous: -1, murderously: -1, murky: -1, "muscle-flexing": -1, mushy: -1, musty: -1, mysterious: -3, mysteriously: -3, mystery: -3, mystify: -3, myth: -2, nag: -1, nagging: -2, naive: -5, naively: -5, narrower: -1, nastily: -1, nastiness: -1, nasty: -3, naughty: -4, nauseate: -1, nauseates: -1, nauseating: -1, nauseatingly: -1, naïve: -3, nebulous: -1, nebulously: -1, needless: -1, needlessly: -1, needy: -3, nefarious: -1, nefariously: -1, negate: -1, negation: -1, negative: -5, negatives: -4, negativity: -4, neglect: -4, neglected: -3, negligence: -3, negligent: -3, nemesis: -2, nepotism: -1, nervous: -4, nervously: -4, nervousness: -4, nettle: -1, nettlesome: -1, neurotic: -1, neurotically: -1, niggle: -1, niggles: -1, nightmare: -4, nightmarish: -4, nightmarishly: -3, nitpick: -1, nitpicking: -1, noise: -3, noises: -3, noisier: -1, noisy: -2, "non-confidence": -1, nonexistent: -1, nonresponsive: -1, nonsense: -4, nosey: -3, notoriety: -1, notorious: -1, notoriously: -1, noxious: -1, nuisance: -1, numb: -3, obese: -1, object: -1, objection: -1, objectionable: -1, objections: -1, oblique: -1, obliterate: -1, obliterated: -1, oblivious: -1, obnoxious: -1, obnoxiously: -1, obscene: -5, obscenely: -5, obscenity: -5, obscure: -1, obscured: -1, obscures: -1, obscurity: -1, obsess: -4, obsessive: -1, obsessively: -1, obsessiveness: -1, obsolete: -1, obstacle: -1, obstinate: -1, obstinately: -1, obstruct: -1, obstructed: -1, obstructing: -1, obstruction: -1, obstructs: -1, obtrusive: -1, obtuse: -1, occlude: -1, occluded: -1, occludes: -1, occluding: -1, odd: -3, odder: -3, oddest: -1, oddities: -1, oddity: -1, oddly: -2, odor: -1, offence: -3, offend: -3, offender: -3, offending: -3, offenses: -3, offensive: -3, offensively: -3, offensiveness: -1, officious: -1, ominous: -1, ominously: -1, omission: -1, omit: -1, "one-sided": -1, onerous: -1, onerously: -1, onslaught: -1, opinionated: -1, opponent: -1, opportunistic: -1, oppose: -1, opposition: -1, oppositions: -1, oppress: -1, oppression: -5, oppressive: -5, oppressively: -5, oppressiveness: -5, oppressors: -5, ordeal: -3, orphan: -2, ostracize: -1, outbreak: -1, outburst: -3, outbursts: -3, outcast: -2, outcry: -3, outlaw: -4, outmoded: -2, outrage: -5, outraged: -5, outrageous: -5, outrageously: -5, outrageousness: -5, outrages: -1, outsider: -1, "over-acted": -1, "over-awe": -1, "over-balanced": -1, "over-hyped": -1, "over-priced": -1, "over-valuation": -1, overact: -2, overacted: -2, overawe: -1, overbalance: -1, overbalanced: -1, overbearing: -1, overbearingly: -1, overblown: -1, overdo: -1, overdone: -1, overdue: -1, overemphasize: -1, overheat: -1, overkill: -1, overloaded: -1, overlook: -1, overpaid: -1, overpayed: -1, overplay: -1, overpower: -1, overpriced: -1, overrated: -1, overreach: -1, overrun: -3, overshadow: -3, oversight: -1, oversights: -1, oversimplification: -1, oversimplified: -1, oversimplify: -1, oversize: -3, overstate: -1, overstated: -1, overstatement: -1, overstatements: -1, overstates: -1, overtaxed: -1, overthrow: -1, overthrows: -1, overturn: -2, overweight: -1, overwhelm: -1, overwhelmed: -1, overwhelming: -1, overwhelmingly: -1, overwhelms: -1, overzealous: -1, overzealously: -1, overzelous: -1, pain: -4, painful: -4, painfull: -4, painfully: -4, pains: -4, pale: -2, pales: -2, paltry: -1, pan: -1, pandemonium: -1, pander: -1, pandering: -1, panders: -1, panic: -1, panick: -3, panicked: -3, panicking: -3, panicky: -1, paradoxical: -1, paradoxically: -1, paralize: -2, paralyzed: -2, paranoia: -3, paranoid: -3, parasite: -3, pariah: -1, parody: -4, partiality: -1, partisan: -1, partisans: -1, passe: -1, passive: -1, passiveness: -1, pathetic: -1, pathetically: -1, patronize: -1, paucity: -1, pauper: -1, paupers: -1, payback: -1, peculiar: -1, peculiarly: -1, pedantic: -1, peeled: -1, peeve: -1, peeved: -1, peevish: -1, peevishly: -1, penalize: -3, penalty: -3, perfidious: -1, perfidity: -1, perfunctory: -1, peril: -1, perilous: -1, perilously: -1, perish: -1, pernicious: -1, perplex: -1, perplexed: -1, perplexing: -1, perplexity: -1, persecute: -1, persecution: -1, pertinacious: -1, pertinaciously: -1, pertinacity: -1, perturb: -1, perturbed: -1, pervasive: -2, perverse: -2, perversely: -1, perversion: -1, perversity: -1, pervert: -1, perverted: -1, perverts: -1, pessimism: -3, pessimistic: -3, pessimistically: -3, pest: -1, pestilent: -1, petrified: -1, petrify: -1, pettifog: -1, petty: -1, phobia: -2, phobic: -1, phony: -1, picket: -1, picketed: -1, picketing: -1, pickets: -1, picky: -1, pig: -3, pigs: -3, pillage: -1, pillory: -1, pimple: -2, pinch: -1, pique: -1, pitiable: -1, pitiful: -1, pitifully: -1, pitiless: -1, pitilessly: -1, pittance: -1, pity: -3, plagiarize: -1, plague: -1, plasticky: -1, plaything: -1, plea: -1, pleas: -1, plebeian: -1, plight: -1, plot: -1, plotters: -1, ploy: -1, plunder: -1, plunderer: -1, pointless: -1, pointlessly: -1, poison: -2, poisonous: -2, poisonously: -2, pokey: -1, poky: -1, polarisation: -3, polemize: -1, pollute: -2, polluter: -2, polluters: -2, polution: -2, pompous: -1, poor: -2, poorer: -2, poorest: -2, poorly: -2, posturing: -1, pout: -1, poverty: -4, powerless: -4, prate: -1, pratfall: -1, prattle: -1, precarious: -1, precariously: -1, precipitate: -1, precipitous: -1, predatory: -1, predicament: -1, prejudge: -2, prejudice: -2, prejudices: -2, prejudicial: -2, premeditated: -1, preoccupy: -1, preposterous: -1, preposterously: -1, presumptuous: -1, presumptuously: -1, pretence: -1, pretend: -1, pretense: -1, pretentious: -1, pretentiously: -1, prevaricate: -1, pricey: -1, pricier: -1, prick: -1, prickle: -1, prickles: -1, prideful: -1, prik: -1, primitive: -1, prison: -1, prisoner: -1, problem: -3, problematic: -3, problems: -3, procrastinate: -2, procrastinates: -2, procrastination: -2, profane: -1, profanity: -1, prohibit: -3, prohibitive: -3, prohibitively: -3, propaganda: -1, propagandize: -1, proprietary: -1, prosecute: -1, protest: -3, protested: -3, protesting: -1, protests: -1, protracted: -1, provocation: -1, provocative: -1, provoke: -1, pry: -1, pugnacious: -1, pugnaciously: -1, pugnacity: -1, punch: -1, punish: -3, punishable: -3, punitive: -3, punk: -2, puny: -2, puppet: -1, puppets: -1, puzzled: -1, puzzlement: -1, puzzling: -1, quack: -1, qualm: -1, qualms: -1, quandary: -1, quarrel: -3, quarrellous: -1, quarrellously: -1, quarrels: -1, quarrelsome: -1, quash: -1, queer: -1, questionable: -1, quibble: -1, quibbles: -1, quitter: -1, rabid: -1, racism: -1, racist: -5, racists: -5, racy: -2, radical: -4, radicalization: -5, radically: -5, radicals: -5, rage: -4, ragged: -3, raging: -3, rail: -1, raked: -1, rampage: -3, rampant: -3, ramshackle: -1, rancor: -1, randomly: -2, rankle: -1, rant: -1, ranted: -1, ranting: -1, rantingly: -1, rants: -1, rape: -5, raped: -5, raping: -5, rascal: -4, rascals: -4, rash: -3, rattle: -2, rattled: -2, rattles: -2, ravage: -3, raving: -2, reactionary: -1, rebellious: -3, rebuff: -1, rebuke: -1, recalcitrant: -1, recant: -1, recession: -1, recessionary: -1, reckless: -4, recklessly: -4, recklessness: -4, recoil: -1, recourses: -1, redundancy: -1, redundant: -1, refusal: -1, refuse: -4, refused: -2, refuses: -2, refusing: -2, refutation: -1, refute: -1, refuted: -1, refutes: -1, refuting: -1, regress: -1, regression: -1, regressive: -1, regret: -4, regreted: -4, regretful: -4, regretfully: -4, regrets: -4, regrettable: -4, regrettably: -4, regretted: -4, reject: -5, rejected: -5, rejecting: -5, rejection: -5, rejects: -5, relapse: -5, relentless: -3, relentlessly: -3, relentlessness: -3, reluctance: -2, reluctant: -2, reluctantly: -2, remorse: -4, remorseful: -4, remorsefully: -4, remorseless: -4, remorselessly: -4, remorselessness: -4, renounce: -1, renunciation: -1, repel: -1, repetitive: -3, reprehensible: -1, reprehensibly: -1, reprehension: -1, reprehensive: -1, repress: -1, repression: -1, repressive: -1, reprimand: -1, reproach: -1, reproachful: -1, reprove: -1, reprovingly: -1, repudiate: -1, repudiation: -1, repugn: -1, repugnance: -1, repugnant: -1, repugnantly: -1, repulse: -3, repulsed: -2, repulsing: -2, repulsive: -3, repulsively: -1, repulsiveness: -1, resent: -1, resentful: -1, resentment: -1, resignation: -1, resigned: -1, resistance: -1, restless: -3, restlessness: -3, restrict: -3, restricted: -3, restriction: -3, restrictive: -3, resurgent: -1, retaliate: -2, retaliatory: -2, retard: -3, retarded: -3, retardedness: -3, retards: -3, reticent: -2, retract: -2, retreat: -2, retreated: -2, revenge: -5, revengeful: -5, revengefully: -5, revert: -4, revile: -3, reviled: -3, revoke: -3, revolt: -4, revolting: -4, revoltingly: -4, revulsion: -3, revulsive: -3, rhapsodize: -1, rhetoric: -3, rhetorical: -3, ricer: -2, ridicule: -2, ridicules: -2, ridiculous: -3, ridiculously: -2, rife: -1, rift: -5, rifts: -5, rigid: -3, rigidity: -2, rigidness: -2, rile: -1, riled: -1, rip: -4, "rip-off": -3, ripoff: -3, ripped: -3, risk: -4, risks: -4, risky: -4, rival: -5, rivalry: -5, roadblocks: -3, rocky: -1, rogue: -3, rollercoaster: -2, rot: -2, rotten: -2, rough: -2, rremediable: -1, rubbish: -2, rude: -4, rue: -1, ruffian: -1, ruffle: -1, ruin: -3, ruined: -3, ruining: -3, ruinous: -3, ruins: -3, rumbling: -2, rumor: -2, rumors: -2, rumours: -2, rumple: -1, "run-down": -2, runaway: -2, rupture: -4, rust: -3, rusts: -3, rusty: -3, rut: -2, ruthless: -2, ruthlessly: -1, ruthlessness: -1, ruts: -1, sabotage: -3, sack: -1, sacrificed: -3, sad: -4, sadden: -4, sadly: -4, sadness: -4, sag: -1, sagged: -1, sagging: -1, saggy: -1, sags: -1, salacious: -1, sanctimonious: -1, sap: -1, sarcasm: -2, sarcastic: -2, sarcastically: -2, sardonic: -4, sardonically: -4, sass: -1, satirical: -1, satirize: -1, savage: -3, savaged: -3, savagery: -4, savages: -4, scaly: -1, scam: -5, scams: -5, scandal: -5, scandalize: -5, scandalized: -5, scandalous: -5, scandalously: -5, scandals: -5, scandel: -1, scandels: -1, scant: -1, scapegoat: -1, scar: -1, scarce: -1, scarcely: -4, scarcity: -4, scare: -5, scared: -5, scarier: -4, scariest: -5, scarily: -4, scarred: -1, scars: -1, scary: -4, scathing: -1, scathingly: -1, sceptical: -1, scoff: -1, scoffingly: -1, scold: -2, scolded: -1, scolding: -1, scoldingly: -1, scorching: -1, scorchingly: -1, scorn: -1, scornful: -1, scornfully: -1, scoundrel: -1, scourge: -1, scowl: -1, scramble: -1, scrambled: -1, scrambles: -1, scrambling: -1, scrap: -3, scratch: -3, scratched: -1, scratches: -1, scratchy: -1, scream: -1, screech: -1, "screw-up": -1, screwed: -1, "screwed-up": -1, screwy: -1, scuff: -1, scuffs: -1, scum: -2, scummy: -1, "second-class": -1, "second-tier": -1, secretive: -1, sedentary: -3, seedy: -1, seethe: -1, seething: -1, "self-coup": -1, "self-criticism": -1, "self-defeating": -1, "self-destructive": -1, "self-humiliation": -1, "self-interest": -1, "self-interested": -1, "self-serving": -1, selfinterested: -1, selfish: -4, selfishly: -4, selfishness: -4, "semi-retarded": -1, senile: -5, sensationalize: -1, senseless: -3, senselessly: -3, seriousness: -1, sermonize: -1, servitude: -1, "set-up": -1, setback: -3, setbacks: -3, sever: -2, severe: -2, severity: -2, "sh*t": -5, shabby: -1, shadowy: -1, shady: -2, shake: -2, shaky: -2, shallow: -2, sham: -3, shambles: -3, shame: -3, shameful: -2, shamefully: -1, shamefulness: -1, shameless: -3, shamelessly: -3, shamelessness: -3, shark: -2, sharply: -2, shatter: -1, shemale: -1, shimmer: -1, shimmy: -1, shipwreck: -2, shirk: -2, shirker: -1, shit: -5, shiver: -1, shock: -3, shocked: -3, shocking: -3, shockingly: -3, shoddy: -1, "short-lived": -1, shortage: -3, shortchange: -1, shortcoming: -1, shortcomings: -1, shortness: -2, shortsighted: -4, shortsightedness: -2, showdown: -2, shrew: -1, shriek: -1, shrill: -1, shrilly: -1, shrivel: -1, shroud: -1, shrouded: -1, shrug: -1, shun: -1, shunned: -1, sick: -3, sicken: -3, sickening: -3, sickeningly: -1, sickly: -1, sickness: -1, sidetrack: -1, sidetracked: -1, siege: -1, sillily: -1, silly: -1, simplistic: -3, simplistically: -1, sin: -3, sinful: -3, sinfully: -3, sinister: -3, sinisterly: -1, sink: -2, sinking: -1, skeletons: -2, skeptic: -3, skeptical: -3, skeptically: -3, skepticism: -3, sketchy: -4, skimpy: -2, skinny: -2, skittish: -1, skittishly: -1, skulk: -1, slack: -1, slander: -3, slanderer: -3, slanderous: -3, slanderously: -3, slanders: -1, slap: -2, slashing: -1, slaughter: -5, slaughtered: -5, slave: -4, slaves: -4, sleazy: -3, slime: -1, slog: -1, slogged: -1, slogging: -1, slogs: -1, sloooooooooooooow: -1, sloooow: -1, slooow: -1, sloow: -1, sloppily: -1, sloppy: -1, sloth: -1, slothful: -1, slow: -1, "slow-moving": -1, slowed: -1, slower: -1, slowest: -1, slowly: -1, sloww: -1, slowww: -1, slowwww: -1, slug: -1, sluggish: -1, slump: -1, slumping: -1, slumpping: -1, slur: -1, slut: -5, sluts: -5, sly: -1, smack: -2, smallish: -2, smash: -2, smear: -1, smell: -1, smelled: -1, smelling: -1, smells: -1, smelly: -1, smelt: -1, smoke: -2, smokescreen: -1, smolder: -1, smoldering: -1, smother: -1, smoulder: -1, smouldering: -1, smudge: -1, smudged: -1, smudges: -1, smudging: -1, smug: -1, smugly: -1, smut: -1, smuttier: -1, smuttiest: -1, smutty: -1, snag: -1, snagged: -1, snagging: -1, snags: -1, snappish: -1, snappishly: -1, snare: -1, snarky: -1, snarl: -1, sneak: -2, sneakily: -2, sneaky: -2, sneer: -1, sneering: -1, sneeringly: -1, snob: -1, snobbish: -1, snobby: -1, snobish: -1, snobs: -1, snub: -1, "so-cal": -1, soapy: -1, sob: -1, sober: -1, sobering: -1, solemn: -1, solicitude: -1, somber: -1, sore: -1, sorely: -1, soreness: -1, sorrow: -1, sorrowful: -1, sorrowfully: -1, sorry: -1, sour: -2, sourly: -1, spade: -1, spank: -3, spendy: -1, spew: -1, spewed: -1, spewing: -1, spews: -1, spilling: -1, spinster: -1, spiritless: -3, spite: -1, spiteful: -1, spitefully: -1, spitefulness: -1, splatter: -1, split: -2, splitting: -1, spoil: -2, spoilage: -1, spoilages: -1, spoiled: -1, spoilled: -1, spoils: -2, spook: -1, spookier: -1, spookiest: -1, spookily: -1, spooky: -1, "spoon-fed": -1, "spoon-feed": -1, spoonfed: -2, sporadic: -1, spotty: -1, spurious: -1, spurn: -1, sputter: -1, squabble: -1, squabbling: -1, squander: -1, squash: -1, squeak: -1, squeaks: -1, squeaky: -1, squeal: -1, squealing: -1, squeals: -1, squirm: -1, stab: -2, stagnant: -1, stagnate: -1, stagnation: -1, staid: -1, stain: -1, stains: -1, stale: -1, stalemate: -1, stall: -1, stalls: -1, stammer: -1, stampede: -1, standstill: -1, stark: -2, starkly: -2, startle: -1, startling: -1, startlingly: -1, starvation: -1, starve: -2, static: -1, steal: -3, stealing: -3, steals: -3, steep: -1, steeply: -1, stench: -1, stereotype: -1, stereotypical: -1, stereotypically: -1, stern: -1, stew: -1, sticky: -2, stiff: -1, stiffness: -1, stifle: -1, stifling: -1, stiflingly: -1, stigma: -1, stigmatize: -1, sting: -1, stinging: -1, stingingly: -1, stingy: -1, stink: -2, stinks: -2, stodgy: -2, stole: -2, stolen: -2, stooge: -2, stooges: -2, stormy: -2, straggle: -2, straggler: -2, strain: -2, strained: -1, straining: -1, strange: -3, strangely: -3, stranger: -1, strangest: -1, strangle: -1, streaky: -1, strenuous: -1, stress: -3, stresses: -1, stressful: -1, stressfully: -1, stricken: -1, strict: -3, strictly: -3, strident: -1, stridently: -1, strife: -1, strike: -1, stringent: -1, stringently: -1, struck: -3, struggle: -1, struggled: -1, struggles: -1, struggling: -1, strut: -1, stubborn: -4, stubbornly: -4, stubbornness: -4, stuck: -3, stuffy: -1, stumble: -1, stumbled: -1, stumbles: -1, stump: -1, stumped: -1, stumps: -1, stun: -2, stunt: -3, stunted: -3, stupid: -1, stupidest: -1, stupidity: -1, stupidly: -1, stupified: -1, stupify: -1, stupor: -1, stutter: -1, stuttered: -1, stuttering: -1, stutters: -1, sty: -1, stymied: -1, "sub-par": -3, subdued: -1, subjected: -1, subjection: -1, subjugate: -1, subjugation: -1, submissive: -3, subordinate: -1, subpoena: -1, subpoenas: -1, subservience: -1, subservient: -1, substandard: -1, subtract: -3, subversion: -1, subversive: -1, subversively: -1, subvert: -1, succumb: -2, suck: -4, sucked: -3, sucker: -3, sucks: -3, sucky: -2, sue: -3, sued: -3, sueing: -3, sues: -1, suffer: -1, suffered: -1, sufferer: -1, sufferers: -1, suffering: -1, suffers: -1, suffocate: -1, "sugar-coat": -1, "sugar-coated": -1, sugarcoated: -1, suicidal: -5, suicide: -5, sulk: -4, sullen: -1, sully: -1, sunder: -1, sunk: -3, sunken: -3, superficial: -1, superficiality: -1, superficially: -1, superfluous: -1, superstition: -3, superstitious: -3, suppress: -1, suppression: -1, surrender: -1, susceptible: -1, suspect: -2, suspicion: -2, suspicions: -2, suspicious: -1, suspiciously: -1, swagger: -1, swamped: -1, sweaty: -2, swelled: -1, swelling: -1, swindle: -1, swipe: -3, swollen: -1, symptom: -1, symptoms: -1, syndrome: -1, taboo: -1, tacky: -1, taint: -1, tainted: -1, tamper: -1, tangle: -1, tangled: -1, tangles: -1, tank: -1, tanked: -1, tanks: -1, tantrum: -1, tardy: -1, tarnish: -2, tarnished: -1, tarnishes: -1, tarnishing: -1, tattered: -1, taunt: -1, taunting: -1, tauntingly: -1, taunts: -3, taut: -1, tawdry: -1, taxing: -1, tease: -1, teasingly: -1, tedious: -1, tediously: -1, temerity: -1, temper: -3, tempest: -2, temptation: -1, tenderness: -1, tense: -1, tension: -1, tentative: -1, tentatively: -1, tenuous: -1, tenuously: -1, tepid: -1, terrible: -5, terribleness: -5, terribly: -4, terror: -4, "terror-genic": -1, terrorism: -5, terrorize: -5, testily: -1, testy: -1, tetchily: -1, tetchy: -1, thankless: -2, thicker: -1, thirst: -1, thorny: -4, thoughtless: -3, thoughtlessly: -3, thoughtlessness: -3, thrash: -4, threat: -4, threaten: -4, threatening: -4, threats: -4, threesome: -3, throb: -2, throbbed: -2, throbbing: -2, throbs: -2, throttle: -1, thug: -4, "thumb-down": -3, "thumbs-down": -3, thwart: -2, "time-consuming": -1, timid: -3, timidity: -3, timidly: -3, timidness: -3, "tin-y": -1, tingled: -1, tingling: -1, tired: -2, tiresome: -2, tiring: -1, tiringly: -1, toil: -1, toll: -1, "top-heavy": -2, topple: -1, torment: -5, tormented: -5, torrent: -2, tortuous: -1, torture: -4, tortured: -4, tortures: -4, torturing: -4, torturous: -4, torturously: -4, totalitarian: -2, touchy: -1, toughness: -1, tout: -1, touted: -1, touts: -1, toxic: -4, traduce: -1, tragedy: -5, tragic: -5, tragically: -5, traitor: -4, traitorous: -1, traitorously: -1, tramp: -1, trample: -1, transgress: -2, transgression: -2, trap: -4, traped: -4, trapped: -4, trash: -1, trashed: -1, trashy: -1, trauma: -2, traumatic: -2, traumatically: -1, traumatize: -1, traumatized: -1, travesties: -1, travesty: -1, treacherous: -1, treacherously: -1, treachery: -1, treason: -1, treasonous: -1, trick: -1, tricked: -1, trickery: -1, tricky: -1, trivial: -1, trivialize: -1, trouble: -2, troubled: -2, troublemaker: -1, troubles: -1, troublesome: -1, troublesomely: -1, troubling: -1, troublingly: -1, truant: -1, tumble: -1, tumbled: -1, tumbles: -1, tumultuous: -1, turbulent: -1, turmoil: -1, twist: -1, twisted: -1, twists: -1, "two-faced": -1, "two-faces": -1, tyrannical: -4, tyrannically: -4, tyranny: -4, tyrant: -4, ugh: -1, uglier: -4, ugliest: -5, ugliness: -4, ugly: -3, ulterior: -3, ultimatum: -3, ultimatums: -3, "ultra-hardline": -1, "un-viewable": -1, unable: -1, unacceptable: -2, unacceptablely: -2, unacceptably: -2, unaccessible: -2, unaccustomed: -2, unachievable: -2, unaffordable: -2, unappealing: -4, unattractive: -3, unauthentic: -3, unavailable: -3, unavoidably: -3, unbearable: -3, unbearablely: -3, unbelievable: -3, unbelievably: -3, uncaring: -3, uncertain: -1, uncivil: -1, uncivilized: -1, unclean: -2, unclear: -2, uncollectible: -2, uncomfortable: -2, uncomfortably: -2, uncomfy: -2, uncompetitive: -2, uncompromising: -1, uncompromisingly: -1, unconfirmed: -1, unconstitutional: -1, uncontrolled: -2, unconvincing: -2, unconvincingly: -2, uncooperative: -2, uncouth: -1, uncreative: -1, undecided: -1, undefined: -3, undependability: -1, undependable: -1, undercut: -2, undercuts: -1, undercutting: -1, underdog: -1, underestimate: -1, underlings: -1, undermine: -3, undermined: -3, undermines: -3, undermining: -3, underpaid: -3, underpowered: -2, undersized: -2, undesirable: -3, undetermined: -1, undid: -1, undignified: -1, undissolved: -1, undocumented: -1, undone: -1, undue: -1, unease: -1, uneasily: -1, uneasiness: -1, uneasy: -1, uneconomical: -2, unemployed: -3, unequal: -1, unethical: -3, uneven: -1, uneventful: -1, unexpected: -1, unexpectedly: -1, unexplained: -1, unfairly: -1, unfaithful: -1, unfaithfully: -1, unfamiliar: -1, unfavorable: -1, unfeeling: -1, unfinished: -1, unfit: -2, unforeseen: -3, unforgiving: -1, unfortunate: -5, unfortunately: -5, unfounded: -1, unfriendly: -2, unfulfilled: -1, unfunded: -1, ungovernable: -1, ungrateful: -1, unhappily: -4, unhappiness: -4, unhappy: -4, unhealthy: -4, unhelpful: -3, unilateralism: -1, unimaginable: -1, unimaginably: -1, unimportant: -1, uninformed: -1, uninsured: -1, unintelligible: -1, unintelligile: -1, unipolar: -1, unjust: -1, unjustifiable: -1, unjustifiably: -1, unjustified: -1, unjustly: -1, unkind: -1, unkindly: -1, unknown: -1, unlamentable: -1, unlamentably: -1, unlawful: -2, unlawfully: -2, unlawfulness: -2, unleash: -1, unlicensed: -1, unlikely: -1, unlucky: -1, unmoved: -3, unnatural: -2, unnaturally: -2, unnecessary: -4, unneeded: -1, unnerve: -1, unnerved: -1, unnerving: -1, unnervingly: -1, unnoticed: -2, unobserved: -3, unorthodox: -3, unorthodoxy: -3, unpleasant: -1, unpleasantries: -2, unpopular: -2, unpredictable: -1, unprepared: -1, unproductive: -1, unprofitable: -1, unprove: -1, unproved: -1, unproven: -1, unproves: -1, unproving: -1, unqualified: -1, unravel: -1, unraveled: -1, unreachable: -1, unreadable: -1, unrealistic: -1, unreasonable: -1, unreasonably: -1, unrelenting: -2, unrelentingly: -2, unreliability: -2, unreliable: -2, unresolved: -2, unresponsive: -3, unrest: -3, unruly: -1, unsafe: -1, unsatisfactory: -1, unsavory: -1, unscrupulous: -1, unscrupulously: -1, unsecure: -2, unseemly: -1, unsettle: -3, unsettled: -3, unsettling: -3, unsettlingly: -1, unskilled: -4, unsophisticated: -1, unsound: -1, unspeakable: -1, unspeakablely: -1, unspecified: -1, unstable: -1, unsteadily: -1, unsteadiness: -1, unsteady: -1, unsuccessful: -1, unsuccessfully: -1, unsupported: -1, unsupportive: -1, unsure: -1, unsuspecting: -1, unsustainable: -1, untenable: -1, untested: -1, unthinkable: -1, unthinkably: -1, untimely: -1, untouched: -1, untrue: -1, untrustworthy: -1, untruthful: -1, unusable: -1, unusably: -1, unuseable: -1, unuseably: -1, unusual: -1, unusually: -1, unviewable: -1, unwanted: -1, unwarranted: -1, unwatchable: -1, unwelcome: -1, unwell: -1, unwieldy: -1, unwilling: -1, unwillingly: -1, unwillingness: -1, unwise: -1, unwisely: -1, unworkable: -1, unworthy: -1, unyielding: -1, upbraid: -1, upheaval: -1, uprising: -1, uproar: -3, uproarious: -1, uproariously: -1, uproarous: -1, uproarously: -1, uproot: -2, upset: -1, upseting: -1, upsets: -1, upsetting: -1, upsettingly: -1, urgent: -1, useless: -2, usurp: -1, usurper: -1, utterly: -1, vagrant: -1, vague: -2, vagueness: -1, vain: -1, vainly: -1, vanity: -1, vehement: -1, vehemently: -1, vengeance: -4, vengeful: -4, vengefully: -4, vengefulness: -4, venom: -3, venomous: -3, venomously: -3, vent: -3, vestiges: -1, vex: -1, vexation: -1, vexing: -1, vexingly: -1, vibrate: -1, vibrated: -1, vibrates: -1, vibrating: -1, vibration: -1, vice: -1, vicious: -1, viciously: -1, viciousness: -1, victimize: -1, vile: -1, vileness: -1, vilify: -1, villainous: -1, villainously: -1, villains: -1, villian: -1, villianous: -1, villianously: -1, villify: -1, vindictive: -1, vindictively: -1, vindictiveness: -1, violate: -1, violation: -1, violator: -1, violators: -1, violent: -1, violently: -1, viper: -1, virulence: -1, virulent: -1, virulently: -1, virus: -3, vociferous: -1, vociferously: -1, volatile: -1, volatility: -1, vomit: -1, vomited: -1, vomiting: -1, vomits: -1, vulgar: -1, vulnerable: -1, wack: -1, wail: -1, wallow: -1, wane: -1, waning: -1, wanton: -1, "war-like": -3, warily: -3, wariness: -3, warlike: -3, warned: -2, warning: -2, warp: -1, warped: -1, wary: -1, "washed-out": -1, waste: -1, wasted: -1, wasteful: -1, wastefulness: -1, wasting: -1, "water-down": -1, "watered-down": -1, wayward: -1, weak: -4, weaken: -4, weakening: -3, weaker: -3, weakness: -3, weaknesses: -3, weariness: -1, wearisome: -1, weary: -1, wedge: -1, weed: -1, weep: -1, weird: -1, weirdly: -1, wheedle: -1, whimper: -1, whine: -3, whining: -1, whiny: -1, whips: -1, whore: -1, whores: -1, wicked: -1, wickedly: -1, wickedness: -1, wild: -1, wildly: -1, wiles: -1, wilt: -1, wily: -1, wimpy: -1, wince: -1, wobble: -1, wobbled: -1, wobbles: -1, woe: -1, woebegone: -1, woeful: -1, woefully: -1, womanizer: -1, womanizing: -1, worn: -1, worried: -1, worriedly: -1, worrier: -1, worries: -1, worrisome: -1, worry: -1, worrying: -1, worryingly: -1, worse: -5, worsen: -5, worsening: -5, worst: -5, worthless: -3, worthlessly: -3, worthlessness: -3, wound: -3, wounds: -3, wrangle: -2, wrath: -3, wreak: -3, wreaked: -3, wreaks: -3, wreck: -3, wrest: -2, wrestle: -2, wretch: -3, wretched: -3, wretchedly: -2, wretchedness: -2, wrinkle: -3, wrinkled: -3, wrinkles: -3, wrip: -1, wripped: -1, wripping: -1, writhe: -1, wrong: -3, wrongful: -3, wrongly: -3, wrought: -3, yawn: -2, zap: -2, zapped: -2, zaps: -1, zealot: -3, zealous: -3, zealously: -3, zombie: -4 } };
class fye extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed}   i18n  The i18n-object used for parsing translations.
   * @param {Paper} paper The paper to run this assessment on.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t, s) {
    return s.getShortLocale() !== "en" ? null : new C().setMaxScore(this.getScore()).setEmpty(t.__("Titles with positive or negative sentiment work best for higher CTR.", "rank-math")).setTooltip(t.__("Headlines with a strong emotional sentiment (positive or negative) tend to receive more clicks.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n, t), o = new gye().analyze(t.getLower("title"), hye).score;
    return i.setScore(this.calculateScore(o)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.getShortLocale() === "en" && t.hasTitle();
  }
  /**
   * Calculates the score based on the sentiment score.
   *
   * @param {boolean} sentimentScore Sentiment score.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t !== 0 ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_titleSentiment_score", 1);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Your title has a positive or a negative sentiment.", "rank-math") : s.sprintf(
      /* Translators: placeholder is the words "positive or a negative sentiment" as a link to the corresponding KB article. */
      s.__("Your title doesn't contain a %1$s word.", "rank-math"),
      '<a href="https://rankmath.com/kb/score-100-in-tests/#sentiment-in-a-title" target="_blank">positive or a negative sentiment</a>'
    );
  }
}
class mye extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Use the Focus Keyword near the beginning of SEO title.", "rank-math")).setTooltip(t.__("The SEO page title should contain the Focus Keyword preferably at the beginning.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.getLower("title"), o = r.indexOf(t.getLower("keyword")), a = Math.floor(r.length / 2), c = 0 <= o && o < a;
    return i.setScore(this.calculateScore(c)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.hasKeyword() && t.hasTitle();
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} startWithKeyword Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_titleStartWithKeyword_score", 3);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Focus Keyword used at the beginning of SEO title.", "rank-math") : s.__("Focus Keyword doesn't appear at the beginning of SEO title.", "rank-math");
  }
}
function yye(e, t, s, n) {
  var i = -1, r = e == null ? 0 : e.length;
  for (n && r && (s = e[++i]); ++i < r; )
    s = t(s, e[i], i, e);
  return s;
}
var bye = yye, vye = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Dye(e) {
  return e.match(vye) || [];
}
var wye = Dye, kye = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Fye(e) {
  return kye.test(e);
}
var Aye = Fye, Oi = "\\ud800-\\udfff", Cye = "\\u0300-\\u036f", _ye = "\\ufe20-\\ufe2f", Eye = "\\u20d0-\\u20ff", xye = Cye + _ye + Eye, Li = "\\u2700-\\u27bf", Mi = "a-z\\xdf-\\xf6\\xf8-\\xff", Sye = "\\xac\\xb1\\xd7\\xf7", $ye = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Bye = "\\u2000-\\u206f", zye = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", qi = "A-Z\\xc0-\\xd6\\xd8-\\xde", Tye = "\\ufe0e\\ufe0f", Ni = Sye + $ye + Bye + zye, Ki = "['’]", hn = "[" + Ni + "]", Rye = "[" + xye + "]", Wi = "\\d+", Pye = "[" + Li + "]", Ui = "[" + Mi + "]", Hi = "[^" + Oi + Ni + Wi + Li + Mi + qi + "]", jye = "\\ud83c[\\udffb-\\udfff]", Iye = "(?:" + Rye + "|" + jye + ")", Oye = "[^" + Oi + "]", Gi = "(?:\\ud83c[\\udde6-\\uddff]){2}", Vi = "[\\ud800-\\udbff][\\udc00-\\udfff]", De = "[" + qi + "]", Lye = "\\u200d", fn = "(?:" + Ui + "|" + Hi + ")", Mye = "(?:" + De + "|" + Hi + ")", mn = "(?:" + Ki + "(?:d|ll|m|re|s|t|ve))?", yn = "(?:" + Ki + "(?:D|LL|M|RE|S|T|VE))?", Yi = Iye + "?", Zi = "[" + Tye + "]?", qye = "(?:" + Lye + "(?:" + [Oye, Gi, Vi].join("|") + ")" + Zi + Yi + ")*", Nye = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Kye = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Wye = Zi + Yi + qye, Uye = "(?:" + [Pye, Gi, Vi].join("|") + ")" + Wye, Hye = RegExp([
  De + "?" + Ui + "+" + mn + "(?=" + [hn, De, "$"].join("|") + ")",
  Mye + "+" + yn + "(?=" + [hn, De + fn, "$"].join("|") + ")",
  De + "?" + fn + "+" + mn,
  De + "+" + yn,
  Kye,
  Nye,
  Wi,
  Uye
].join("|"), "g");
function Gye(e) {
  return e.match(Hye) || [];
}
var Vye = Gye, Yye = wye, Zye = Aye, Jye = ge, Xye = Vye;
function Qye(e, t, s) {
  return e = Jye(e), t = s ? void 0 : t, t === void 0 ? Zye(e) ? Xye(e) : Yye(e) : e.match(t) || [];
}
var ebe = Qye, tbe = bye, sbe = Kn, nbe = ebe, ibe = "['’]", rbe = RegExp(ibe, "g");
function obe(e) {
  return function(t) {
    return tbe(nbe(sbe(t).replace(rbe, "")), e, "");
  };
}
var abe = obe, cbe = Un, ube = Hn, lbe = Qn, dbe = ge;
function pbe(e) {
  return function(t) {
    t = dbe(t);
    var s = ube(t) ? lbe(t) : void 0, n = s ? s[0] : t.charAt(0), i = s ? cbe(s, 1).join("") : t.slice(1);
    return n[e]() + i;
  };
}
var gbe = pbe, hbe = gbe, fbe = hbe("toUpperCase"), mbe = fbe, ybe = abe, bbe = mbe, vbe = ybe(function(e, t, s) {
  return e + (s ? " " : "") + bbe(t);
}), bn = vbe;
class Dbe extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    const s = R(this.configs.postType) ? "Post" : bn(this.configs.postType);
    return new C().setMaxScore(this.getScore()).setEmpty(
      t.sprintf(
        /* Translators: 1) Placeholder expands to "Content AI" with a link to the corresponding KB article. 2) Post Type. */
        t.__("Use %1$s to optimise the  %2$s.", "rank-math"),
        '<a class="rank-math-open-contentai" href="' + ke.contentAILink + '" target="_blank">Content AI</a>',
        s
      )
    );
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = t.get("contentAI") !== !1;
    return i.setScore(this.calculateScore(r)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return t.get("contentAI") !== !1;
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasContentAI Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_contentAI", 5);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    const n = R(this.configs.postType) ? "Post" : bn(this.configs.postType);
    return t.hasScore() ? s.sprintf(
      /* Translators: 1. Placeholder expands to "Content AI" with a link to the corresponding KB article. 2. Post Type. */
      s.__("You are using %1$s to optimise this %2$s.", "rank-math"),
      '<a href="' + ke.contentAILink + '" target="_blank">Content AI</a>',
      n
    ) : s.sprintf(
      /* Translators: 1. Placeholder expands to "Content AI" with a link to the corresponding KB article. 2. Post Type. */
      s.__("You are not using %1$s to optimise this %2$s.", "rank-math"),
      '<a class="rank-math-open-contentai" href="' + ke.contentAILink + '" target="_blank">Content AI</a>',
      n
    );
  }
}
class wbe extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("Reviews are disabled on this Product.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = this.newResult(n), r = this.configs.assessor.isReviewEnabled;
    return i.setScore(this.calculateScore(r)).setText(this.translateScore(i, n)), i;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable() {
    return this.configs.assessor.isReviewEnabled;
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasReview Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_isReviewEnabled_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("Reviews are enabled for this Product. Good Job!", "rank-math") : s.__("Reviews are disabled on this Product.", "rank-math");
  }
}
class kbe extends A {
  /**
   * Create new analysis result instance.
   *
   * @param {Jed} i18n The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} New instance.
   */
  newResult(t) {
    return new C().setMaxScore(this.getScore()).setEmpty(t.__("You are not using the Product Schema for this Product.", "rank-math"));
  }
  /**
   * Executes the assessment and return its result
   *
   * @param {Paper}      paper      The paper to run this assessment on.
   * @param {Researcher} researcher The researcher used for the assessment.
   * @param {Jed}        i18n       The i18n-object used for parsing translations.
   *
   * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
   */
  getResult(t, s, n) {
    const i = t.get("schemas");
    let r = !1;
    ze(i) || Oe(i, (a) => {
      B(["WooCommerceProduct", "EDDProduct", "Product"], a["@type"]) && (r = !0);
    });
    const o = this.newResult(n);
    return o.setScore(this.calculateScore(r)).setText(this.translateScore(o, n)), o;
  }
  /**
   * Checks whether paper meet analysis requirements.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @return {boolean} True when requirements meet.
   */
  isApplicable(t) {
    return !ze(t.get("schemas"));
  }
  /**
   * Calculates the score based on the url length.
   *
   * @param {boolean} hasSchema Title has number or not.
   *
   * @return {number} The calculated score.
   */
  calculateScore(t) {
    return t ? this.getScore() : null;
  }
  /**
   * Get analysis max score.
   *
   * @return {number} Max score an analysis has
   */
  getScore() {
    return w("rankMath_analysis_hasProductSchema_score", 2);
  }
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
   * @param {Jed}            i18n           The i18n-object used for parsing translations.
   *
   * @return {string} The translated string.
   */
  translateScore(t, s) {
    return t.hasScore() ? s.__("You are using the Product Schema for this Product", "rank-math") : s.__("You are not using the Product Schema for this Product.", "rank-math");
  }
}
class Fbe {
  /**
   * Constructor
   *
   * @param {Object} options Options for analyzer.
   */
  constructor(t) {
    this.options = t, this.researcher = le(t, "researcher") ? t.researcher : new Ri(), this.setI18n(le(t, "i18n") ? t.i18n : void 0), this.setAnalyses();
  }
  /**
   * Runs the analyses defined in the tasklist or the default analyses.
   *
   * @param {Paper} paper The paper to run analyses on.
   *
   * @return {Promise} Promise object.
   */
  analyze(t) {
    return this.generateResults(this.analyses, t);
  }
  /**
   * Runs the analyses defined.
   *
   * @param {Array} analyses List of analyses to run.
   * @param {Paper} paper    The paper to run analyses on.
   *
   * @return {Promise} Promise object.
   */
  analyzeSome(t, s) {
    return this.generateResults(As(this.defaultAnalyses, t), s);
  }
  /**
   * Generate results.
   *
   * @param {Array} analyses List of analyses to run.
   * @param {Paper} paper    The paper to run analyses on.
   *
   * @return {Promise} Promise object.
   */
  generateResults(t, s) {
    return new Promise((n) => {
      this.results = {}, this.researcher.setPaper(s), Oe(t, (i, r) => {
        i.setConfig(s.configs);
        const o = i.isApplicable(s, this.researcher) ? i.getResult(s, this.researcher, this.i18n) : i.newResult(this.i18n, s);
        o !== null && (this.results[r] = o);
      }), n(this.results);
    });
  }
  /**
   * Set i18n object.
   *
   * @param {Object} i18n The i18n object used for translations.
   *
   * @throws {Error} Parameter needs to be a valid i18n object.
   */
  setI18n(t) {
    if (R(t))
      throw new Error("The assessor requires an i18n object.");
    this.i18n = t;
  }
  /**
   * Set analyses.
   */
  setAnalyses() {
    this.defaultAnalyses = {
      contentHasAssets: new Vb(),
      contentHasShortParagraphs: new Yb(),
      contentHasTOC: new Zb(),
      keywordDensity: new i3(),
      keywordIn10Percent: new r3(),
      keywordInContent: new o3(),
      keywordInImageAlt: new a3(),
      keywordInMetaDescription: new c3(),
      keywordInPermalink: new u3(),
      keywordInSubheadings: new l3(),
      keywordInTitle: new d3(),
      keywordNotUsed: new p3(),
      lengthContent: new g3(),
      lengthPermalink: new h3(),
      linksHasExternals: new f3(),
      linksHasInternal: new m3(),
      linksNotAllExternals: new y3(),
      titleHasNumber: new b3(),
      titleHasPowerWords: new A3(),
      titleSentiment: new fye(),
      titleStartWithKeyword: new mye(),
      hasContentAI: new Dbe(),
      isReviewEnabled: new wbe(),
      hasProductSchema: new kbe()
    }, this.analyses = this.defaultAnalyses, le(this.options, "analyses") && !R(this.options.analyses) && (this.analyses = As(this.defaultAnalyses, this.options.analyses));
  }
}
var Abe = Ie, Cbe = jn, _be = In;
function Ebe(e, t) {
  return _be(Cbe(e, t, Abe), e + "");
}
var xbe = Ebe, Sbe = Pe, $be = he, Bbe = ut, zbe = te;
function Tbe(e, t, s) {
  if (!zbe(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? $be(s) && Bbe(t, s.length) : n == "string" && t in s) ? Sbe(s[t], e) : !1;
}
var Rbe = Tbe;
function Pbe(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var jbe = Pbe, Ibe = te, Obe = Nt, Lbe = jbe, Mbe = Object.prototype, qbe = Mbe.hasOwnProperty;
function Nbe(e) {
  if (!Ibe(e))
    return Lbe(e);
  var t = Obe(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !qbe.call(e, n)) || s.push(n);
  return s;
}
var Kbe = Nbe, Wbe = $n, Ube = Kbe, Hbe = he;
function Gbe(e) {
  return Hbe(e) ? Wbe(e, !0) : Ube(e);
}
var Vbe = Gbe, Ybe = xbe, Zbe = Pe, Jbe = Rbe, Xbe = Vbe, Ji = Object.prototype, Qbe = Ji.hasOwnProperty, e3e = Ybe(function(e, t) {
  e = Object(e);
  var s = -1, n = t.length, i = n > 2 ? t[2] : void 0;
  for (i && Jbe(t[0], t[1], i) && (n = 1); ++s < n; )
    for (var r = t[s], o = Xbe(r), a = -1, c = o.length; ++a < c; ) {
      var u = o[a], l = e[u];
      (l === void 0 || Zbe(l, Ji[u]) && !Qbe.call(e, u)) && (e[u] = r[u]);
    }
  return e;
}), vn = e3e;
const Rt = {}, t3e = (e) => {
  Oe(e.assessor.diacritics, (t, s) => Rt[s] = new RegExp(t, "g"));
}, ce = (e) => {
  if (R(e))
    return e;
  for (const t in Rt)
    e = e.replace(Rt[t], t);
  return e;
}, s3e = () => ({
  importConfirm: "Are you sure you want to import settings into Rank Math? Don't worry, your current configuration will be saved as a backup.",
  restoreConfirm: "Are you sure you want to restore this backup? Your current configuration will be overwritten.",
  deleteBackupConfirm: "Are you sure you want to delete this backup?",
  cleanPluginConfirm: "Are you sure you want erase traces of plugin?",
  version: "1.0.28.1",
  ajaxurl: "http://localhost/baeminrider/wp-admin/admin-ajax.php",
  adminurl: "http://localhost/baeminrider/wp-admin/admin.php",
  security: "2c76827766",
  redirectionPastedContent: 100,
  postTitle: "Post Title",
  postUri: "http://localhost/baeminrider/post-title",
  blogName: "MyThemeShop",
  assessor: {
    redirection: {
      id: "",
      url_to: "",
      header_code: "301"
    },
    articleKBLink: "https://s.rankmath.com/google-schema-article",
    richSnippetsKBLink: "https://s.rankmath.com/richsnippets",
    powerWords: ["a cut above", "absolute", "absolutely lowest", "absolutely", "absurd", "abuse", "accurate", "accuse", "achieve", "actionable", "adaptable", "adequate", "admit", "adorable", "advantage", "advice", "affordable", "aggravate", "aggressive", "agitated", "agonizing", "agony", "alarmed", "alarming", "alienated", "aligned", "all-inclusive", "alluring", "always", "amazing", "amp", "animated", "annihilate", "announcing", "anonymous", "antagonistic", "anxious", "apocalypse", "appalled", "approved", "approving", "argumentative", "armageddon", "arrogant", "ass kicking", "assault", "assured", "astonishing", "astounded", "astounding", "at ease", "atrocious", "attractive", "audacity", "authentic", "authoritative", "authority", "aware", "awe-inspiring", "awesome", "awkward", "backbone", "backdoor", "backed", "backlash", "backstabbing", "badass", "balanced", "banned", "bargain", "barrage", "basic", "battle", "beaming", "beat down", "beating", "beautiful", "beauty", "begging", "behind the scenes", "belief", "best-selling", "best", "better", "beware", "big", "billion", "black market", "blacklisted", "blast", "blessed", "blinded", "blissful", "blood", "bloodbath", "bloodcurdling", "bloody", "blunder", "blushing", "bold", "bomb", "bona fide", "bonanza", "bonus", "bootleg", "bottom line", "bountiful", "brave", "bravery", "brazen", "break", "breaking", "breakthrough", "breathtaking", "bright", "brilliant", "broke", "brutal", "budget", "buffoon", "bullshit", "bully", "bumbling", "buy", "cadaver", "calm", "cancel anytime", "capable", "captivate", "captivating", "carefree", "case study", "cash", "cataclysmic", "catapult", "catastrophe", "caution", "censored", "centered", "certain", "certainly", "certified", "challenge", "charming", "cheap", "cheat-sheet", "cheat", "cheer", "cheerful", "child-like", "clarity", "classified", "clear", "clueless", "collapse", "colorful", "colossal", "comfortable", "compare", "competitive", "complete", "completely", "completeness", "comprehensive", "compromise", "compulsive", "concealed", "conclusive", "condemning", "condescending", "confess", "confession", "confessions", "confident", "confidential", "conquer", "conscientious", "constructive", "content", "contrary", "controlling", "controversial", "convenient", "convert", "cooperative", "copy", "corpse", "corrupt", "corrupting", "courage", "courageous", "cover-up", "covert", "coward", "cowardly", "crammed", "crave", "crazy", "creative", "cringeworthy", "cripple", "crisis", "critical", "crooked", "crush", "crushing", "damaging", "danger", "dangerous", "daring", "dazzling", "dead", "deadline", "deadly", "death", "decadent", "deceived", "deceptive", "defiance", "definitely", "definitive", "defying", "dejected", "delicious", "delight", "delighted", "delightful", "delirious", "delivered", "deplorable", "depraved", "desire", "desperate", "despicable", "destiny", "destroy", "detailed", "devastating", "devoted", "diagnosed", "direct", "dirty", "disadvantages", "disastrous", "discount", "discover", "disdainful", "disempowered", "disgusted", "disgusting", "dishonest", "disillusioned", "disoriented", "distracted", "distraught", "distressed", "distrustful", "divulge", "document", "dollar", "doomed", "double", "doubtful", "download", "dreadful", "dreamy", "drive", "drowning", "dumb", "dynamic", "eager", "earnest", "easily", "easy", "economical", "ecstatic", "edge", "effective", "efficient", "effortless", "elated", "eliminate", "elite", "embarrass", "embarrassed", "emergency", "emerging", "emphasize", "empowered", "enchant", "encouraged", "endorsed", "energetic", "energy", "enormous", "enraged", "enthusiastic", "epic", "epidemic", "essential", "ethical", "euphoric", "evil", "exactly", "exasperated", "excellent", "excited", "excitement", "exciting", "exclusive", "exclusivity", "excruciating", "exhilarated", "expensive", "expert", "explode", "exploit", "explosive", "exposed", "exquisite", "extra", "extraordinary", "extremely", "exuberant", "eye-opening", "fail-proof", "fail", "failure", "faith", "famous", "fantasy", "fascinating", "fatigued", "faux pas", "fearless", "feast", "feeble", "festive", "fierce", "fight", "final", "fine", "fired", "first ever", "first", "flirt", "fluid", "focus", "focused", "fool", "fooled", "foolish", "forbidden", "force-fed", "forever", "forgiving", "forgotten", "formula", "fortune", "foul", "frantic", "free", "freebie", "freedom", "frenzied", "frenzy", "frightening", "frisky", "frugal", "frustrated", "fulfill", "fulfilled", "full", "fully", "fun-loving", "fundamentals", "funniest", "funny", "furious", "gambling", "gargantuan", "genius", "genuine", "gift", "gigantic", "giveaway", "glamorous", "gleeful", "glorious", "glowing", "gorgeous", "graceful", "grateful", "gratified", "gravity", "greatest", "greatness", "greed", "greedy", "grit", "grounded", "growth", "guaranteed", "guilt-free", "guilt", "gullible", "guts", "hack", "happiness", "happy", "harmful", "harsh", "hate", "have you heard", "havoc", "hazardous", "healthy", "heart", "heartbreaking", "heartwarming", "heavenly", "helpful", "helplessness", "hero", "hesitant", "hidden", "high tech", "highest", "highly effective", "hilarious", "hoak", "hoax", "holocaust", "honest", "honored", "hope", "hopeful", "horrific", "horror", "hostile", "how to", "huge", "humility", "humor", "hurricane", "hurry", "hypnotic", "idiot", "ignite", "illegal", "illusive", "imagination", "immediately", "imminently", "impatience", "impatient", "impenetrable", "important", "improved", "in the zone", "incapable", "incapacitated", "incompetent", "inconsiderate", "increase", "incredible", "indecisive", "indulgence", "indulgent", "inexpensive", "inferior", "informative", "infuriated", "ingredients", "innocent", "innovative", "insane", "insecure", "insider", "insider", "insidious", "inspired", "inspiring", "instant savings", "instantly", "instructive", "intel", "intelligent", "intense", "interesting", "intriguing", "introducing", "invasion", "investment", "iron-clad", "ironclad", "irresistible", "irs", "is here", "jackpot", "jail", "jaw-dropping", "jealous", "jeopardy", "jittery", "jovial", "joyous", "jubilant", "judgmental", "jumpstart", "just arrived", "keen", "kickass", "kickstart", "know it all", "lame", "largest", "lascivious", "last chance", "last minute", "last", "latest", "laugh", "laughing", "launch", "launching", "lavishly", "lawsuit", "left behind", "legendary", "legitimate", "liberal", "liberated", "lick", "lies", "life-changing", "lifetime", "light", "lighthearted", "likely", "limited", "literally", "little-known", "loathsome", "lonely", "looming", "loser", "lost", "love", "lunatic", "lurking", "lust", "luxurious", "luxury", "lying", "magic", "magical", "magnificent", "mainstream", "malicious", "mammoth", "manipulative", "marked down", "massive", "maul", "mediocre", "meditative", "meltdown", "memorability", "memorable", "menacing", "mesmerizing", "meticulous", "mind-blowing", "minimalist", "miracle", "mired", "mischievous", "misgiving", "missing out", "mistake", "monetize", "money", "moneyback", "moneygrubbing", "monumental", "most important", "motivated", "mouth-watering", "murder", "mystery", "nail", "naked", "natural", "naughty", "nazi", "nest egg", "never", "new", "nightmare", "no good", "no obligation", "no one talks about", "no questions asked", "no risk", "no strings attached", "non-controlling", "noted", "novelty", "now", "obnoxious", "obsessed", "obsession", "obvious", "odd", "off-kilter", "off-limits", "off-the record", "offensive", "official", "okay", "on-demand", "open-minded", "opportunities", "optimistic", "ordeal", "outlawed", "outrageousness", "outstanding", "overcome", "overjoyed", "overnight", "overwhelmed", "painful", "painless", "painstaking", "pale", "panic", "panicked", "paralyzed", "passionate", "pathetic", "pay zero", "payback", "peril", "perplexed", "perspective", "pessimistic", "pioneering", "piranha", "pitfall", "pitiful", "placid", "plague", "played", "playful", "pleased", "pluck", "plummet", "plunge", "poison", "poisonous", "poor", "popular", "portfolio", "pound", "powerful", "powerless", "practical", "preposterous", "prestige", "price", "priceless", "pride", "prison", "privacy", "private", "privileged", "prize", "productive", "professional", "profit", "profitable", "profound", "promiscuous", "promising", "promote", "protect", "protected", "proven", "provocative", "provoke", "psychological", "pummel", "punch", "punish", "pus", "quadruple", "quality", "quarrelsome", "quick-start", "quick", "quickly", "quiet", "radiant", "rare", "ravenous", "rebellious", "recession-proof", "reckoning", "recognized", "recommend", "recreate", "reduced", "reflective", "refugee", "refund", "refundable", "reject", "relaxed", "release", "reliable", "remarkable", "replicate", "report", "reprimanding", "repulsed", "repulsive", "research", "resentful", "resourceful", "responsible", "responsive", "rested", "restricted", "results", "retaliating", "reveal", "revealing", "revenge", "revengeful", "revisited", "revolting", "revolutionary", "reward", "rich", "ridiculous", "risky", "riveting", "rookie", "rowdy", "ruin", "rules", "ruthless", "sabotaging", "sacred", "sadistic", "sadly", "sadness", "safe", "safety", "sale", "sampler", "sarcastic", "satisfied", "savage", "savagery", "save", "savings", "savvy", "scam", "scandal", "scandalous", "scarce", "scared", "scary", "scornful", "scream", "searing", "secret agenda", "secret plot", "secret", "secrets", "secure", "security", "seductive", "seething", "seize", "selected", "self-hating", "self-sufficient", "sensational", "senseless", "sensual", "serene", "severe", "sex", "sexy", "shaking", "shameful", "shameless", "shaming", "shatter", "shellacking", "shocking", "should", "shrewd", "sick and tired", "signs", "silly", "simple", "simplicity", "simplified", "simplistic", "sincere", "sinful", "sins", "six-figure", "sizable", "skill", "skyrocket", "slaughter", "slave", "sleazy", "sleeping", "sly", "smash", "smiling", "smug", "smuggled", "sneak-peek", "sneaky", "sniveling", "snob", "snooty", "snotty", "soar", "soaring", "solid", "solution", "spank", "special", "spectacular", "speedy", "spell-binding", "spine", "spirit", "spirited", "spiteful", "spoiler", "spontaneous", "spotlight", "spunky", "squirming", "stable", "staggering", "startling", "steady", "stealthy", "steamy", "step-by-step", "still", "stoic", "strange", "strangle", "strategy", "stressed", "strong", "strongly suggest", "struggle", "stuck up", "studies", "stunning", "stupid-simple", "stupid", "sturdy", "sublime", "succeed", "success", "successful", "suck", "suddenly", "suffer", "sunny", "super-human", "superb", "supercharge", "superior", "supported", "supportive", "sure fire", "sure", "surefire", "surge", "surging", "surprise", "surprised", "surprising", "survival", "survive", "suspicious", "sweaty", "swoon-worthy", "swoon", "tailspin", "tank", "tantalizing", "targeted", "tawdry", "tease", "technology", "teetering", "tempting", "tenacious", "tense", "terrible", "terrific", "terrified", "terrifying", "terror", "terrorist", "tested", "thankful", "the truth", "threaten", "threatened", "thrilled", "thrilling", "thug", "ticked off", "tickled", "timely", "today", "torture", "toxic", "track record", "trade secret", "tragedy", "tragic", "transform", "transparency", "trap", "trapped", "trauma", "treacherous", "treasure", "tremendous", "trend", "tricks", "triggers", "triple", "triumph", "truly", "trusting", "trustworthy", "truth", "truthful", "turbo-charge", "tweaks", "twitching", "ultimate", "unadulterated", "unassuming", "unauthorized", "unbelievable", "unburdened", "uncaring", "uncensored", "uncertain", "uncomfortable", "unconditional", "uncontrollable", "unconventional", "uncovered", "undeniable", "under priced", "undercover", "underground", "underhanded", "underused", "unexpected", "unforgettable", "unheard of", "unhurried", "uninterested", "unique", "unjustified", "unknowingly", "unleashed", "unlimited", "unlock", "unparalleled", "unreliable", "unresponsive", "unseen", "unstable", "unstoppable", "unsure", "unsurpassed", "untapped", "unusual", "up-sell", "upbeat", "uplifted", "uplifting", "urge", "urgent", "useful", "useless", "validate", "valor", "valuable", "value", "vanquish", "vaporize", "venomous", "verify", "vibrant", "vicious", "victim", "victory", "vigorous", "vilified", "vindictive", "violated", "violent", "volatile", "vulnerable", "waiting", "wanted", "wanton", "warning", "waste", "weak", "wealth", "weird", "what no one tells you", "whip", "whopping", "wicked", "wild", "willpower", "withheld", "wonderful", "wondrous", "woozy", "world", "worry", "worst", "worthwhile", "wounded", "wreaking", "youthful", "zen", "zinger", "kill", "kills", "killed", "killing", "sizzle", "sizzles", "sizzled", "sizzling", "sizzlingly", "turbocharges", "turbo-chargesmugglechallenge", "discovercrave", "unpopular", "impressive", "embarrassing", "sensationalsinful", "zensurprising", "alive", "oddravenous", "lazy", "avoid", "demoralizing", "problem", "horrifying", "attack", "traumatized", "insult", "horribly", "hell", "relentless", "master", "perfect", "super", "create", "packed", "deep", "gripping", "goddamn", "seriously", "envy", "lucrative", "steal", "bona", "fide", "masterclass", "faux", "pas", "belong", "stop", "polarizing", "dominate"],
    serpData: {
      permalinkTemplate: "http://localhost/baeminrider/",
      titleTemplate: "%title% %sep% %sitename%",
      descriptionTemplate: "%excerpt%",
      title: "shakeeb Ahmed",
      description: "",
      focusKeywords: "shakeeb",
      pillarContent: "",
      canonicalUrl: "",
      robots: {
        index: !0,
        nofollow: !0,
        noarchive: !0,
        nosnippet: !0
      },
      authorName: "admin",
      facebookTitle: "Facebook Title",
      facebookDescription: "Facebook Description",
      facebookImage: "",
      facebookImageID: "",
      facebookHasOverlay: "",
      facebookImageOverlay: "",
      facebookAuthor: "",
      twitterCardType: "player",
      twitterUseFacebook: !0,
      twitterTitle: "Twitter Title",
      twitterDescription: "",
      twitterImage: "",
      twitterImageID: "",
      twitterHasOverlay: !1,
      twitterImageOverlay: "play",
      twitterAuthor: "#",
      twitterPlayerUrl: "",
      twitterPlayerSize: "",
      twitterPlayerStream: "",
      twitterPlayerStreamCtype: "vide/mp4",
      twitterAppDescription: "",
      twitterAppIphoneName: "",
      twitterAppIphoneID: "",
      twitterAppIphoneUrl: "",
      twitterAppIpadName: "",
      twitterAppIpadID: "",
      twitterAppIpadUrl: "",
      twitterAppGoogleplayName: "",
      twitterAppGoogleplayID: "",
      twitterAppGoogleplayUrl: "",
      twitterAppCountry: ""
    },
    hasTOCPlugin: !1,
    tocKbLink: "https://s.rankmath.com/tockb",
    sentimentKbLink: "https://s.rankmath.com/sentiments",
    focusKeywordLink: "http://localhost/baeminrider/wp-admin/edit.php?focus_keyword=%focus_keyword%&post_type=%post_type%",
    registrationUrl: "http://localhost/baeminrider/wp-admin/admin.php?page=rank-math&view=help",
    hasOnpageAnalysis: !0,
    hasBreadcrumb: !0,
    isUserEdit: !1,
    socialPanelLink: "http://localhost/baeminrider/wp-admin/admin.php?page=rank-math-options-titles#setting-panel-social"
  },
  richSnippets: {
    shortcode: "[rank_math_rich_snippet]",
    name: "Shakeeb Ahmed",
    desc: "",
    url: "",
    author: "",
    articleType: "NewsArticle",
    bookEditions: [{
      book_format: "Hardcover"
    }],
    courseProviderType: "Person",
    courseProvider: "",
    courseProviderUrl: "",
    eventType: "Event",
    eventVenue: "",
    eventVenueUrl: "",
    eventAddress: "",
    eventPerformerType: "Person",
    eventPerformer: "",
    eventPerformerUrl: "",
    eventStatus: "",
    eventStartdate: "",
    eventEnddate: "",
    eventTicketurl: "",
    eventPrice: "",
    eventCurrency: "",
    eventAvailability: "",
    eventAvailabilityStarts: "",
    eventInventory: "",
    jobpostingSalary: "",
    jobpostingCurrency: "",
    jobpostingPayroll: "",
    jobpostingStartdate: "",
    jobpostingExpirydate: "",
    jobpostingUnpublish: "on",
    jobpostingEmploymentType: "",
    jobpostingOrganization: "",
    jobpostingId: "",
    jobpostingUrl: "",
    jobpostingLogo: "",
    jobpostingAddress: {
      streetAddress: "House # C269",
      addressLocality: "Lukhnow Society",
      addressRegion: "Sindh",
      postalCode: "74900",
      addressCountry: "Pakistan"
    },
    localAddress: "",
    localGeo: "",
    localPhone: "",
    localPriceRange: "",
    localOpens: "",
    localCloses: "",
    localOpendays: "",
    musicType: "MusicAlbum",
    productSku: "",
    productBrand: "",
    productCurrency: "",
    productPrice: "",
    productPriceValid: "",
    productInstock: "on",
    recipeType: "",
    recipeCuisine: "",
    recipeKeywords: "",
    recipeYield: "",
    recipeCalories: "",
    recipePreptime: "",
    recipeCooktime: "",
    recipeTotaltime: "",
    recipeRating: "",
    recipeRatingMin: "",
    recipeRatingMax: "",
    recipeVideo: "",
    recipeVideoThumbnail: "",
    recipeVideoName: "",
    recipeVideoDate: "",
    recipeVideoDescription: "",
    recipeIngredients: "",
    recipeInstructionType: "SingleField",
    recipeInstructionName: "",
    recipeSingleInstructions: "",
    recipeInstructions: [{
      name: "",
      text: ""
    }, {
      name: "",
      text: ""
    }],
    restaurantServesCuisine: "",
    restaurantMenu: "",
    videoUrl: "",
    videoEmbedUrl: "",
    videoDuration: "",
    videoViews: "",
    personEmail: "",
    personAddress: "",
    personGender: "Male",
    personJobTitle: "",
    reviewWorstRating: "1",
    reviewBestRating: "5",
    reviewRatingValue: "",
    reviewLocation: "custom",
    reviewShortcode: "[rank_math_review_snippet]",
    softwarePrice: "",
    softwarePriceCurrency: "",
    softwareOperatingSystem: "",
    softwareApplicationCategory: "",
    softwareRatingValue: "",
    softwareRatingCount: "",
    serviceType: "",
    servicePrice: "",
    servicePriceCurrency: "",
    serviceRatingValue: "",
    serviceRatingCount: "",
    snippetType: "article",
    defaultName: "",
    defaultDescription: "",
    knowledgegraphType: "company"
  },
  api: {
    root: "http://localhost/baeminrider/wp-json/",
    nonce: "cb1b81765a"
  },
  validationl10n: {
    regexErrorDefault: "Please use the correct format.",
    requiredErrorDefault: "This field is required.",
    emailErrorDefault: "Please enter a valid email address.",
    urlErrorDefault: "Please enter a valid URL."
  },
  maxTags: 5,
  customFields: {
    "classic-editor-remember": "block-editor",
    rank_math_internal_links_processed: "1",
    rank_math_primary_category: "0",
    rank_math_seo_score: "10",
    rank_math_robots: 'a:4:{i:0;s:5:"index";i:1;s:8:"nofollow";i:2;s:9:"noarchive";i:3;s:9:"nosnippet";}',
    rank_math_rich_snippet: "article",
    rank_math_snippet_shortcode: "[rank_math_rich_snippet]",
    rank_math_snippet_article_type: "NewsArticle",
    rank_math_snippet_course_provider_type: "Person",
    rank_math_snippet_event_type: "Event",
    rank_math_snippet_event_performer_type: "Person",
    rank_math_snippet_jobposting_unpublish: "on",
    rank_math_snippet_music_type: "MusicAlbum",
    rank_math_snippet_recipe_instruction_type: "SingleField",
    rank_math_snippet_review_worst_rating: "1",
    rank_math_snippet_review_best_rating: "5",
    rank_math_snippet_review_location: "custom",
    rank_math_snippet_review_shortcode: "[rank_math_review_snippet]",
    rank_math_twitter_card_type: "player",
    rank_math_twitter_enable_image_overlay: "off",
    rank_math_twitter_image_overlay: "play",
    rank_math_facebook_title: "Facebook Title",
    rank_math_facebook_description: "Facebook Description",
    rank_math_twitter_title: "Twitter Title",
    rank_math_twitter_player_stream_ctype: "vide/mp4",
    rank_math_snippet_name: "Shakeeb Ahmed",
    rank_math_snippet_book_editions: 'a:1:{i:0;a:1:{s:11:"book_format";s:9:"Hardcover";}}',
    rank_math_snippet_person_gender: "Male",
    rank_math_snippet_jobposting_address: 'a:5:{s:13:"streetAddress";s:12:"House # C269";s:15:"addressLocality";s:15:"Lukhnow Society";s:13:"addressRegion";s:5:"Sindh";s:10:"postalCode";s:5:"74900";s:14:"addressCountry";s:8:"Pakistan";}',
    rank_math_snippet_recipe_instructions: 'a:2:{i:0;a:2:{s:4:"name";s:0:"";s:4:"text";s:0:"";}i:1;a:2:{s:4:"name";s:0:"";s:4:"text";s:0:"";}}',
    rank_math_permalink: "shakeeb",
    rank_math_twitter_use_facebook: "on",
    rank_math_title: "shakeeb Ahmed",
    rank_math_focus_keyword: "shakeeb"
  },
  customTerms: {
    post_format: "Post Format Title",
    post_format_desc: "Post Format Description"
  },
  variables: {
    title: {
      name: "Post Title",
      desc: "Title of the current post/page",
      example: "No Follow Test SEO-Press"
    },
    parent_title: {
      name: "Post Title of parent page",
      desc: "Title of the parent page of the current post/page",
      example: "Example Title"
    },
    sep: {
      name: "Separator Character",
      desc: "Separator character, as set in the Title Settings",
      example: "-"
    },
    sitename: {
      name: "Site Title",
      desc: "Title of the site",
      example: "MyThemeShop"
    },
    sitedesc: {
      name: "Site Description",
      desc: "Description of the site",
      example: "Just another WordPress site"
    },
    date: {
      name: "Date Published",
      desc: "Publication date of the current post/page <strong>OR</strong> specified date on date archives",
      example: "May 15, 2019"
    },
    modified: {
      name: "Date Modified",
      desc: "Last modification date of the current post/page",
      example: "July 12, 2019"
    },
    excerpt: {
      name: "Post Excerpt",
      desc: "Excerpt of the current post (or auto-generated if it does not exist)",
      example: "This is excerpt"
    },
    excerpt_only: {
      name: "Post Excerpt",
      desc: "Excerpt of the current post (without auto-generation)",
      example: "This is excerpt"
    },
    tag: {
      name: "Post Tag",
      desc: "First tag (alphabetically) associated to the current post <strong>OR</strong> current tag on tag archives",
      example: "Example Tag"
    },
    tags: {
      name: "Post Tags",
      desc: "Comma-separated list of tags associated to the current post",
      example: "Example Tag 1, Example Tag 2"
    },
    category: {
      name: "Post Category",
      desc: "First category (alphabetically) associated to the current post <strong>OR</strong> current category on category archives",
      example: "Example Category"
    },
    categories: {
      name: "Post Categories",
      desc: "Comma-separated list of categories associated to the current post",
      example: "Example Category 1, Example Category 2"
    },
    term: {
      name: "Current Term",
      desc: "Current term name",
      example: "Example Term"
    },
    term_description: {
      name: "Term Description",
      desc: "Current term description",
      example: "Example Term Description"
    },
    search_query: {
      name: "Search Query",
      desc: "Search query (only available on search results page)",
      example: "example search"
    },
    name: {
      name: "Post Author",
      desc: "Display author&#039;s nicename of the current post, page or author archive.",
      example: "admin"
    },
    user_description: {
      name: "Author Description",
      desc: "Author&#039;s biographical info of the current post, page or author archive.",
      example: ""
    },
    filename: {
      name: "File Name",
      desc: "File Name of the attachment",
      example: "sunrise at Maldives"
    },
    userid: {
      name: "Author ID",
      desc: "Author&#039;s user id of the current post, page or author archive.",
      example: "1"
    },
    id: {
      name: "Post ID",
      desc: "ID of the current post/page",
      example: 171
    },
    focuskw: {
      name: "Focus Keyword",
      desc: "Focus Keyword of the current post",
      example: "Focus Keyword"
    },
    page: {
      name: "Page",
      desc: "Page number with context (i.e. page 2 of 4). Only displayed on page 2 and above.",
      example: " page 2 of 4"
    },
    pagetotal: {
      name: "Max Pages",
      desc: "Max pages number",
      example: "4"
    },
    pagenumber: {
      name: "Page Number",
      desc: "Current page number",
      example: "4"
    },
    currenttime: {
      name: "Current Time",
      desc: "Current server time",
      example: "8:44 pm"
    },
    currentdate: {
      name: "Current Date",
      desc: "Current server date",
      example: "July 13, 2019"
    },
    currentday: {
      name: "Current Day",
      desc: "Current server day",
      example: "13th"
    },
    currentmonth: {
      name: "Current Month",
      desc: "Current server month",
      example: "July"
    },
    currentyear: {
      name: "Current Year",
      desc: "Current server year",
      example: "2019"
    },
    pt_single: {
      name: "Post Type Name Singular",
      desc: "Name of current post type (singular)",
      example: "Product"
    },
    pt_plural: {
      name: "Post Type Name Plural",
      desc: "Name of current post type (plural)",
      example: "Products"
    },
    "customfield(field-name)": {
      name: "Custom Field (advanced)",
      desc: "Custom field value.",
      example: "Custom field value"
    },
    "date(F jS, Y)": {
      name: "Date Published (advanced)",
      desc: "Publish date with custom formatting pattern.",
      example: "July 13th, 2019"
    },
    "modified(F jS, Y)": {
      name: "Date Modified (advanced)",
      desc: "Modified date with custom formatting pattern.",
      example: "July 13th, 2019"
    },
    "currenttime(F jS, Y)": {
      name: "Current Time (advanced)",
      desc: "Current server time with custom formatting pattern.",
      example: "July 13th, 2019"
    },
    "categories(limit=3&separator= | &exclude=12,23)": {
      name: "Categories (advanced)",
      desc: "Output list of categories associated to the current post, with customization options.",
      example: "Example Category 1 | Example Category 2"
    },
    "tags(limit=3&separator= | &exclude=12,23)": {
      name: "Tags (advanced)",
      desc: "Output list of tags associated to the current post, with customization options.",
      example: "Example Tag 1 | Example Tag 2"
    },
    "count(varname)": {
      name: "Counter",
      desc: "Starts at 1 and increments by 1.",
      example: "2"
    },
    "customterm(taxonomy-name)": {
      name: "Custom Term (advanced)",
      desc: "Custom term value.",
      example: "Custom term value"
    },
    "customterm(taxonomy-name_desc)": {
      name: "Custom Term description",
      desc: "Custom Term description.",
      example: "Custom Term description."
    },
    "customterm(post_format)": {
      name: "Post Format Title",
      desc: "Custom Term title.",
      example: "Post Format Title"
    },
    "customterm(post_format_desc)": {
      name: "Post Format Description",
      desc: "Custom Term description.",
      example: "Post Format Description"
    },
    wc_price: {
      name: "Product&#039;s price.",
      desc: "Product&#039;s price of the current product",
      example: "",
      callback: [{}, "get_product_var_price"]
    },
    wc_sku: {
      name: "Product&#039;s SKU.",
      desc: "Product&#039;s SKU of the current product",
      example: "",
      callback: [{}, "get_product_var_sku"]
    },
    wc_shortdesc: {
      name: "Product&#039;s short description.",
      desc: "Product&#039;s short description of the current product",
      example: "",
      callback: [{}, "get_short_description"]
    },
    wc_brand: {
      name: "Product&#039;s brand.",
      desc: "Product&#039;s brand of the current product",
      example: "",
      callback: [{}, "get_product_var_brand"]
    }
  },
  locale: "en",
  localeFull: "en_US",
  overlayImages: {
    play: {
      name: "Play icon",
      url: "http://localhost/baeminrider/wp-content/plugins/seo-by-rank-math/assets/admin/img/icon-play.png",
      path: "/srv/www/mythemeshop/htdocs/wp-content/plugins/seo-by-rank-math/assets/admin/img/icon-play.png"
    },
    gif: {
      name: "GIF icon",
      url: "http://localhost/baeminrider/wp-content/plugins/seo-by-rank-math/assets/admin/img/icon-gif.png",
      path: "/srv/www/mythemeshop/htdocs/wp-content/plugins/seo-by-rank-math/assets/admin/img/icon-gif.png"
    }
  },
  defautOgImage: "",
  customPermalinks: !0,
  isUserRegistered: !0,
  objectID: 171,
  objectType: "post",
  parentDomain: "mts.test",
  noFollowDomains: [],
  noFollowExcludeDomains: [],
  noFollowExternalLinks: !1,
  featuredImageNotice: "The featured image should be at least 200 by 200 pixels to be picked up by Facebook and other social media sites.",
  postSettings: {
    linkSuggestions: !0,
    useFocusKeyword: !1
  }
});
class n3e {
  /**
   * The constructor.
   *
   * @param {string} text                The text to use in the analysis.
   * @param {Object} args                The object containing all arguments.
   * @param {Object} [args.title]        The SEO title.
   * @param {Object} [args.keyword]      The main keyword.
   * @param {Object} [args.titleWidth]   The width of the title in pixels.
   * @param {Object} [args.url]          The base url + slug.
   * @param {Object} [args.permalink]    The slug.
   * @param {Object} [args.description]  The SEO description.
   * @param {Object} [args.locale]       The locale.
   * @param {Object} [args.thumbnail]    The thumbnail.
   * @param {Object} [args.thumbnailAlt] The thumbnail alt text.
   * @param {Object} [configs]		   The rankMath config
   */
  constructor(t, s, n = {}) {
    /**
     * Arguments.
     */
    mt(this, "args", {});
    s = s || {}, this.args = vn(s, {
      title: "",
      keyword: "",
      keywords: [],
      titleWidth: 0,
      url: "",
      permalink: "",
      description: "",
      thumbnail: "",
      thumbnailAlt: "",
      locale: "en_US",
      contentAI: !1,
      schemas: {}
    }), this.setText(R(t) ? "" : t), this.args.shortLocale = this.args.locale.split("_")[0], this.configs = vn(n, s3e()), t3e(this.configs);
  }
  /**
   * Get argument value.
   *
   * @param {string} id Argument id to get value.
   *
   * @return {string} Return value.
   */
  get(t) {
    return le(this.args, t) ? this.args[t] : "";
  }
  /**
   * Get argument value in lower-case.
   *
   * @param {string} id Argument id to get value.
   *
   * @return {string} Return value.
   */
  getLower(t) {
    return this.get(t + "Lower");
  }
  /**
   * Check whether a keyword is available.
   *
   * @return {boolean} Returns true if the Paper has a keyword.
   */
  hasKeyword() {
    return this.args.keyword !== "";
  }
  /**
   * Return the associated keyword or an empty string if no keyword is available.
   *
   * @return {boolean} Returns Keywords
   */
  getKeyword() {
    return this.args.keyword;
  }
  /**
   * Set the keyword.
   *
   * @param {string} keyword [description]
   */
  setKeyword(t) {
    this.args.keyword = ce(t), this.args.keywordLower = t.toLowerCase(), this.keywordPlurals = !1, this.keywordPermalink = !1, this.keywordPermalinkRaw = !1, this.keywordCombinations = !1;
  }
  /**
   * Set the keywords.
   *
   * @param {string} keywords Array of focus keywords.
   */
  setKeywords(t) {
    this.args.keywords = dt(
      Me(t, (s) => ce(s).toLowerCase())
    );
  }
  /**
   * Check whether an title is available
   *
   * @return {boolean} Returns true if the Paper has a title.
   */
  hasTitle() {
    return this.args.title !== "";
  }
  /**
   * Return the title, or an empty string of no title is available.
   *
   * @return {string} Returns the title
   */
  getTitle() {
    return this.args.title;
  }
  /**
   * Set the title.
   *
   * @param {string} title The title
   */
  setTitle(t) {
    this.args.title = ce(ss(t)), this.args.titleLower = this.args.title.toLowerCase();
  }
  /**
   * Check whether an title width in pixels is available
   *
   * @return {boolean} Returns true if the Paper has a title.
   */
  hasTitleWidth() {
    return this.args.titleWidth !== 0;
  }
  /**
   * Return the title width in pixels, or an empty string of no title width in pixels is available.
   *
   * @return {string} Returns the title
   */
  getTitleWidth() {
    return this.args.titleWidth;
  }
  /**
   * Check whether a permalink is available
   *
   * @return {boolean} Returns true if the Paper has a permalink.
   */
  hasPermalink() {
    return this.args.permalink !== "";
  }
  /**
   * Return the permalink, or an empty string of no permalink is available.
   *
   * @return {string} Returns the permalink.
   */
  getPermalink() {
    return this.args.permalink;
  }
  /**
   * Set the permalink.
   *
   * @param {string} permalink The permalink.
   */
  setPermalink(t) {
    this.args.permalink = t, this.args.permalinkLower = t.toLowerCase();
  }
  /**
   * Check whether a description is available.
   *
   * @return {boolean} Returns true if the paper has a description.
   */
  hasDescription() {
    return this.args.description !== "";
  }
  /**
   * Return the description or an empty string if no description is available.
   *
   * @return {string} Returns the description.
   */
  getDescription() {
    return this.args.description;
  }
  /**
   * Set the description.
   *
   * @param {string} description The description.
   */
  setDescription(t) {
    this.args.description = ce(ht(t)), this.args.descriptionLower = this.args.description.toLowerCase();
  }
  /**
   * Check whether the text is available.
   *
   * @return {boolean} Returns true if the paper has a text.
   */
  hasText() {
    return this.text !== "";
  }
  /**
   * Return the associated text or am empty string if no text is available.
   *
   * @return {string} Returns text
   */
  getText() {
    return this.text;
  }
  /**
   * Return the associated text or am empty string if no text is available.
   *
   * @return {string} Returns text
   */
  getTextLower() {
    return this.textLower;
  }
  /**
   * Set the text.
   *
   * @param {string} text The text.
   */
  setText(t) {
    this.text = t || "", this.textLower = "", t !== "" && (this.text = ce(zi(t)), this.textLower = this.text.toLowerCase());
  }
  /**
   * Check whether an url is available
   *
   * @return {boolean} Returns true if the Paper has an Url.
   */
  hasUrl() {
    return this.args.url !== "";
  }
  /**
   * Return the url, or an empty string of no url is available.
   *
   * @return {string} Returns the url
   */
  getUrl() {
    return this.args.url;
  }
  /**
   * Set the url.
   *
   * @param {string} url The url.
   */
  setUrl(t) {
    this.args.url = t;
  }
  /**
   * Check whether a locale is available
   *
   * @return {boolean} Returns true if the paper has a locale
   */
  hasLocale() {
    return this.args.locale !== "";
  }
  /**
   * Return the locale or an empty string if no locale is available
   *
   * @return {string} Returns the locale
   */
  getLocale() {
    return this.args.locale;
  }
  /**
   * Return the language code from locale
   *
   * @return {string} Returns the locale
   */
  getShortLocale() {
    return this.args.shortLocale;
  }
  /**
   * Check whether a thumbnail is available
   *
   * @return {boolean} Returns true if the Paper has a thumbnail.
   */
  hasThumbnail() {
    return this.args.thumbnail !== "";
  }
  /**
   * Return the thumbnail, or an empty string of no thumbnail is available.
   *
   * @return {string} Returns the thumbnail.
   */
  getThumbnail() {
    return this.args.thumbnail;
  }
  /**
   * Set the thumbnail.
   *
   * @param {string} thumbnail The thumbnail.
   */
  setThumbnail(t) {
    this.args.thumbnail = t;
  }
  /**
   * Check whether a thumbnailAlt is available
   *
   * @return {boolean} Returns true if the Paper has a thumbnailAlt.
   */
  hasThumbnailAltText() {
    return this.args.thumbnailAlt !== "";
  }
  /**
   * Return the thumbnailAlt, or an empty string of no thumbnailAlt is available.
   *
   * @return {string} Returns the thumbnailAlt.
   */
  getThumbnailAltText() {
    return this.args.thumbnailAlt;
  }
  /**
   * Set the thumbnailAlt.
   *
   * @param {string} thumbnailAlt The thumbnailAlt.
   */
  setThumbnailAltText(t) {
    this.args.thumbnailAlt = ce(t), this.args.thumbnailAltLower = t.toLowerCase();
  }
  /**
   * Get keyword as permalink.
   *
   * @param {Researcher} researcher The researcher used for the assessment.
   *
   * @return {string} Formatted permalink.
   */
  getKeywordPermalink(t) {
    if (this.keywordPermalink === !1) {
      const s = t.getResearch("slugify"), n = t.getResearch("removePunctuation"), i = this.getLower("keyword").split(".").join("").replace("'", "").replace(/[-_]/ig, "-");
      this.keywordPermalink = s(n(i)), this.keywordPermalinkRaw = this.keywordPermalink;
    }
    return this.keywordPermalink;
  }
  /**
   * Get keyword as permalink with stop words
   *
   * @param {Researcher} researcher The researcher used for the assessment.
   *
   * @return {string} Formatted permalink.
   */
  getPermalinkWithStopwords(t) {
    return this.keywordPermalink === !1 && this.getKeywordPermalink(t), this.keywordPermalinkRaw;
  }
  /**
   * Get keyword combinations.
   *
   * @param {Researcher} researcher The researcher used for the assessment.
   *
   * @return {Array} Array of keyword combination.
   */
  getKeywordCombination(t) {
    return this.hasKeyword() ? (this.keywordCombinations === !1 && this.generateCombinations(t), this.keywordCombinations) : [];
  }
  /**
   * Generate keyword combinations.
   *
   * @param {Researcher} researcher The researcher used for the assessment.
   */
  generateCombinations(t) {
    const s = this.getLower("keyword"), n = t.getResearch("getWords"), i = t.getResearch("pluralize"), r = t.getResearch("combinations");
    this.keywordPlurals = /* @__PURE__ */ new Map(), n(s).forEach(function(o, a) {
      this.keywordPlurals.set(a, { word: o, plural: i.get(o) });
    }, this), this.keywordPermalink = this.getKeywordPermalink(t), this.keywordCombinations = r(this.keywordPlurals);
  }
  /**
   * Set the Content AI.
   *
   * @param {string} value Content AI.
   */
  setContentAI(t) {
    this.args.contentAI = t;
  }
  /**
   * Set schema data.
   *
   * @param {string} schemas Schema Data.
   */
  setSchema(t) {
    this.args.schemas = t;
  }
}
var i3e = Y, r3e = Xt, o3e = Jt, Dn = ge, a3e = i3e.isFinite, c3e = Math.min;
function u3e(e) {
  var t = Math[e];
  return function(s, n) {
    if (s = o3e(s), n = n == null ? 0 : c3e(r3e(n), 292), n && a3e(s)) {
      var i = (Dn(s) + "e").split("e"), r = t(i[0] + "e" + (+i[1] + n));
      return i = (Dn(r) + "e").split("e"), +(i[0] + "e" + (+i[1] - n));
    }
    return t(s);
  };
}
var l3e = u3e, d3e = l3e, p3e = d3e("round"), g3e = p3e;
class h3e {
  /**
   * Class constructor.
   */
  constructor() {
    this.results = /* @__PURE__ */ new Map();
  }
  /**
   * Get all results.
   *
   * @return {Object} Results.
   */
  getResults() {
    return Object.fromEntries(this.results);
  }
  /**
   * Get result for keyword.
   *
   * @param {string} keyword Keyword for which you want score.
   *
   * @return {AnalysisResult} Analysis results for keyword.
   */
  getResult(t) {
    return this.results.get(t);
  }
  /**
   * Get the available score.
   *
   * @param {string} keyword Keyword for which you want score.
   *
   * @return {number} Result score.
   */
  getScore(t) {
    return this.results.has(t) ? this.results.get(t).score : 0;
  }
  /**
   * Add result.
   *
   * @param {string}         keyword   Keyword of which results are.
   * @param {AnalysisResult} results   Analysis results.
   * @param {boolean}        isPrimary Is primary keyword.
   */
  update(t, s, n = !1) {
    this.results.has(t) && (s = {
      ...this.results.get(t).results,
      ...s
    }), this.results.set(
      t,
      {
        results: s,
        isPrimary: n,
        score: this.refreshScore(s)
      }
    );
  }
  /**
   * Refresh score after results update.
   *
   * @param {AnalysisResult} results Analysis results.
   *
   * @return {number} Analysis total score.
   */
  refreshScore(t) {
    let s = 0, n = 0;
    const i = this.configs.localeFull.split("_")[0];
    return Oe(t, (r) => {
      s += r.getScore(), n += r.getMaxScore(i);
    }), g3e(s / n * 100);
  }
  /**
   * Delete result for keyword.
   *
   * @param {string} keyword Keyword for which you want score.
   */
  deleteResult(t) {
    this.results.delete(t);
  }
  /**
   * Check if keyword is primary.
   *
   * @param {string} keyword Keyword for which you want score.
   *
   * @return {boolean} Whether keyword is primary or not.
   */
  isPrimary(t) {
    return this.results.has(t) ? this.results.get(t).isPrimary : !1;
  }
  setConfigs(t) {
    this.configs = t;
  }
}
const f3e = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'"
}, Xi = /&(?:amp|quot|#(0+)?39);/g, m3e = RegExp(Xi.source);
function y3e(e) {
  return e && m3e.test(e) ? e.replace(Xi, (t) => f3e[t] || "'") : e || "";
}
const b3e = {
  cleanHTML: zi,
  cleanText: ht,
  cleanTagsOnly: ns,
  matchParagraphs: Ti,
  removeDiacritics: ce,
  sanitizeText: Nb,
  sanitizeAppData: Kb,
  wordCount: Zt,
  stripStyle: Ke,
  stripScript: We,
  unescape: y3e
};
window.rankMathAnalyzer = {
  Analysis: A,
  AnalysisResult: C,
  Analyzer: Fbe,
  Helpers: b3e,
  Paper: n3e,
  Researcher: Ri,
  ResultManager: h3e
};
export {
  A as Analysis,
  C as AnalysisResult,
  Fbe as Analyzer,
  b3e as Helpers,
  n3e as Paper,
  Ri as Researcher,
  h3e as ResultManager
};
