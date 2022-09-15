/*
 AngularJS v1.3.4
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (U, V, u) {
  "use strict";
  function z(b) {
    return function () {
      var a = arguments[0],
        c;
      c =
        "[" +
        (b ? b + ":" : "") +
        a +
        "] http://errors.angularjs.org/1.3.4/" +
        (b ? b + "/" : "") +
        a;
      for (a = 1; a < arguments.length; a++) {
        c = c + (1 == a ? "?" : "&") + "p" + (a - 1) + "=";
        var d = encodeURIComponent,
          e;
        e = arguments[a];
        e =
          "function" == typeof e
            ? e.toString().replace(/ \{[\s\S]*$/, "")
            : "undefined" == typeof e
            ? "undefined"
            : "string" != typeof e
            ? JSON.stringify(e)
            : e;
        c += d(e);
  }
      return Error(c);
    };
  }
  function Ra(b) {
    if (null == b || Sa(b)) return !1;
    var a = b.length;
    return b.nodeType === na && a
      ? !0
      : I(b) ||
          D(b) ||
          0 === a ||
          ("number" === typeof a && 0 < a && a - 1 in b);
  }
  function r(b, a, c) {
    var d, e;
    if (b)
      if (F(b))
        for (d in b)
          "prototype" == d ||
            "length" == d ||
            "name" == d ||
            (b.hasOwnProperty && !b.hasOwnProperty(d)) ||
            a.call(c, b[d], d, b);
      else if (D(b) || Ra(b)) {
        var f = "object" !== typeof b;
        d = 0;
        for (e = b.length; d < e; d++) (f || d in b) && a.call(c, b[d], d, b);
      } else if (b.forEach && b.forEach !== r) b.forEach(a, c, b);
      else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d, b);
    return b;
  }
  function Bd(b, a, c) {
    for (var d = Object.keys(b).sort(), e = 0; e < d.length; e++)
      a.call(c, b[d[e]], d[e]);
    return d;
  }
  function kc(b) {
    return function (a, c) {
      b(c, a);
    };
  }
  function Cd() {
    return ++kb;
  }
  function lc(b, a) {
    a ? (b.$$hashKey = a) : delete b.$$hashKey;
  }
  function C(b) {
    for (var a = b.$$hashKey, c = 1, d = arguments.length; c < d; c++) {
      var e = arguments[c];
      if (e)
        for (var f = Object.keys(e), g = 0, h = f.length; g < h; g++) {
          var k = f[g];
          b[k] = e[k];
        }
    }
    lc(b, a);
    return b;
  }
  function $(b) {
    return parseInt(b, 10);
  }
  function x() {}
  function oa(b) {
    return b;
  }
  function ca(b) {
    return function () {
      return b;
    };
  }
  function G(b) {
    return "undefined" === typeof b;
  }
  function y(b) {
    return "undefined" !== typeof b;
  }
  function K(b) {
    return null !== b && "object" === typeof b;
  }
  function I(b) {
    return "string" === typeof b;
  }
  function X(b) {
    return "number" === typeof b;
  }
  function fa(b) {
    return "[object Date]" === Ja.call(b);
  }
  function F(b) {
    return "function" === typeof b;
  }
  function lb(b) {
    return "[object RegExp]" === Ja.call(b);
  }
  function Sa(b) {
    return b && b.window === b;
  }
  function Ta(b) {
    return b && b.$evalAsync && b.$watch;
  }
  function Ua(b) {
    return "boolean" === typeof b;
  }
  function mc(b) {
    return !(!b || !(b.nodeName || (b.prop && b.attr && b.find)));
  }
  function Dd(b) {
    var a = {};
    b = b.split(",");
    var c;
    for (c = 0; c < b.length; c++) a[b[c]] = !0;
    return a;
  }
  function ta(b) {
    return R(b.nodeName || (b[0] && b[0].nodeName));
  }
  function Va(b, a) {
    var c = b.indexOf(a);
    0 <= c && b.splice(c, 1);
    return a;
  }
  function Ca(b, a, c, d) {
    if (Sa(b) || Ta(b)) throw Wa("cpws");
    if (a) {
      if (b === a) throw Wa("cpi");
      c = c || [];
      d = d || [];
      if (K(b)) {
        var e = c.indexOf(b);
        if (-1 !== e) return d[e];
        c.push(b);
        d.push(a);
      }
      if (D(b))
        for (var f = (a.length = 0); f < b.length; f++)
          (e = Ca(b[f], null, c, d)),
            K(b[f]) && (c.push(b[f]), d.push(e)),
            a.push(e);
      else {
        var g = a.$$hashKey;
        D(a)
          ? (a.length = 0)
          : r(a, function (b, c) {
              delete a[c];
            });
        for (f in b)
          b.hasOwnProperty(f) &&
            ((e = Ca(b[f], null, c, d)),
            K(b[f]) && (c.push(b[f]), d.push(e)),
            (a[f] = e));
        lc(a, g);
      }
    } else if ((a = b))
      D(b)
        ? (a = Ca(b, [], c, d))
        : fa(b)
        ? (a = new Date(b.getTime()))
        : lb(b)
        ? ((a = new RegExp(b.source, b.toString().match(/[^\/]*$/)[0])),
          (a.lastIndex = b.lastIndex))
        : K(b) &&
          ((e = Object.create(Object.getPrototypeOf(b))), (a = Ca(b, e, c, d)));
    return a;
  }
  function ua(b, a) {
    if (D(b)) {
      a = a || [];
      for (var c = 0, d = b.length; c < d; c++) a[c] = b[c];
    } else if (K(b))
      for (c in ((a = a || {}), b))
        if ("$" !== c.charAt(0) || "$" !== c.charAt(1)) a[c] = b[c];
    return a || b;
  }
  function pa(b, a) {
    if (b === a) return !0;
    if (null === b || null === a) return !1;
    if (b !== b && a !== a) return !0;
    var c = typeof b,
      d;
    if (c == typeof a && "object" == c)
      if (D(b)) {
        if (!D(a)) return !1;
        if ((c = b.length) == a.length) {
          for (d = 0; d < c; d++) if (!pa(b[d], a[d])) return !1;
          return !0;
        }
      } else {
        if (fa(b)) return fa(a) ? pa(b.getTime(), a.getTime()) : !1;
        if (lb(b) && lb(a)) return b.toString() == a.toString();
        if (Ta(b) || Ta(a) || Sa(b) || Sa(a) || D(a)) return !1;
        c = {};
        for (d in b)
          if ("$" !== d.charAt(0) && !F(b[d])) {
            if (!pa(b[d], a[d])) return !1;
            c[d] = !0;
          }
        for (d in a)
          if (
            !c.hasOwnProperty(d) &&
            "$" !== d.charAt(0) &&
            a[d] !== u &&
            !F(a[d])
          )
            return !1;
        return !0;
      }
    return !1;
  }
  function Xa(b, a, c) {
    return b.concat(Ya.call(a, c));
  }
  function nc(b, a) {
    var c = 2 < arguments.length ? Ya.call(arguments, 2) : [];
    return !F(a) || a instanceof RegExp
      ? a
      : c.length
      ? function () {
          return arguments.length
            ? a.apply(b, Xa(c, arguments, 0))
            : a.apply(b, c);
        }
      : function () {
          return arguments.length ? a.apply(b, arguments) : a.call(b);
        };
  }
  function Ed(b, a) {
    var c = a;
    "string" === typeof b && "$" === b.charAt(0) && "$" === b.charAt(1)
      ? (c = u)
      : Sa(a)
      ? (c = "$WINDOW")
      : a && V === a
      ? (c = "$DOCUMENT")
      : Ta(a) && (c = "$SCOPE");
    return c;
  }
  function Za(b, a) {
    return "undefined" === typeof b
      ? u
      : JSON.stringify(b, Ed, a ? "  " : null);
  }
  function oc(b) {
    return I(b) ? JSON.parse(b) : b;
  }
  function va(b) {
    b = A(b).clone();
    try {
      b.empty();
    } catch (a) {}
    var c = A("<div>").append(b).html();
    try {
      return b[0].nodeType === mb
        ? R(c)
        : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
            return "<" + R(b);
          });
    } catch (d) {
      return R(c);
    }
  }
  function pc(b) {
    try {
      return decodeURIComponent(b);
    } catch (a) {}
  }
  function qc(b) {
    var a = {},
      c,
      d;
    r((b || "").split("&"), function (b) {
      b &&
        ((c = b.replace(/\+/g, "%20").split("=")),
        (d = pc(c[0])),
        y(d) &&
          ((b = y(c[1]) ? pc(c[1]) : !0),
          Jb.call(a, d)
            ? D(a[d])
              ? a[d].push(b)
              : (a[d] = [a[d], b])
            : (a[d] = b)));
    });
    return a;
  }
  function Kb(b) {
    var a = [];
    r(b, function (b, d) {
      D(b)
        ? r(b, function (b) {
            a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)));
          })
        : a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)));
    });
    return a.length ? a.join("&") : "";
  }
  function nb(b) {
    return Da(b, !0)
      .replace(/%26/gi, "&")
      .replace(/%3D/gi, "=")
      .replace(/%2B/gi, "+");
  }
  function Da(b, a) {
    return encodeURIComponent(b)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%3B/gi, ";")
      .replace(/%20/g, a ? "%20" : "+");
  }
  function Fd(b, a) {
    var c,
      d,
      e = ob.length;
    b = A(b);
    for (d = 0; d < e; ++d) if (((c = ob[d] + a), I((c = b.attr(c))))) return c;
    return null;
  }
  function Gd(b, a) {
    var c,
      d,
      e = {};
    r(ob, function (a) {
      a += "app";
      !c &&
        b.hasAttribute &&
        b.hasAttribute(a) &&
        ((c = b), (d = b.getAttribute(a)));
    });
    r(ob, function (a) {
      a += "app";
      var e;
      !c &&
        (e = b.querySelector("[" + a.replace(":", "\\:") + "]")) &&
        ((c = e), (d = e.getAttribute(a)));
    });
    c && ((e.strictDi = null !== Fd(c, "strict-di")), a(c, d ? [d] : [], e));
  }
  function rc(b, a, c) {
    K(c) || (c = {});
    c = C({ strictDi: !1 }, c);
    var d = function () {
        b = A(b);
        if (b.injector()) {
          var d = b[0] === V ? "document" : va(b);
          throw Wa("btstrpd", d.replace(/</, "&lt;").replace(/>/, "&gt;"));
        }
        a = a || [];
        a.unshift([
          "$provide",
          function (a) {
            a.value("$rootElement", b);
          },
        ]);
        c.debugInfoEnabled &&
          a.push([
            "$compileProvider",
            function (a) {
              a.debugInfoEnabled(!0);
            },
          ]);
        a.unshift("ng");
        d = Lb(a, c.strictDi);
        d.invoke([
          "$rootScope",
          "$rootElement",
          "$compile",
          "$injector",
          function (a, b, c, d) {
            a.$apply(function () {
              b.data("$injector", d);
              c(b)(a);
            });
          },
        ]);
        return d;
      },
      e = /^NG_ENABLE_DEBUG_INFO!/,
      f = /^NG_DEFER_BOOTSTRAP!/;
    U &&
      e.test(U.name) &&
      ((c.debugInfoEnabled = !0), (U.name = U.name.replace(e, "")));
    if (U && !f.test(U.name)) return d();
    U.name = U.name.replace(f, "");
    ha.resumeBootstrap = function (b) {
      r(b, function (b) {
        a.push(b);
      });
      d();
    };
  }
  function Hd() {
    U.name = "NG_ENABLE_DEBUG_INFO!" + U.name;
    U.location.reload();
  }
  function Id(b) {
    return ha.element(b).injector().get("$$testability");
  }
  function Mb(b, a) {
    a = a || "_";
    return b.replace(Jd, function (b, d) {
      return (d ? a : "") + b.toLowerCase();
    });
  }
  function Kd() {
    var b;
    sc ||
      ((qa = U.jQuery) && qa.fn.on
        ? ((A = qa),
          C(qa.fn, {
            scope: Ka.scope,
            isolateScope: Ka.isolateScope,
            controller: Ka.controller,
            injector: Ka.injector,
            inheritedData: Ka.inheritedData,
          }),
          (b = qa.cleanData),
          (qa.cleanData = function (a) {
            var c;
            if (Nb) Nb = !1;
            else
              for (var d = 0, e; null != (e = a[d]); d++)
                (c = qa._data(e, "events")) &&
                  c.$destroy &&
                  qa(e).triggerHandler("$destroy");
            b(a);
          }))
        : (A = S),
      (ha.element = A),
      (sc = !0));
  }
  function Ob(b, a, c) {
    if (!b) throw Wa("areq", a || "?", c || "required");
    return b;
  }
  function pb(b, a, c) {
    c && D(b) && (b = b[b.length - 1]);
    Ob(
      F(b),
      a,
      "not a function, got " +
        (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b)
    );
    return b;
  }
  function La(b, a) {
    if ("hasOwnProperty" === b) throw Wa("badname", a);
  }
  function tc(b, a, c) {
    if (!a) return b;
    a = a.split(".");
    for (var d, e = b, f = a.length, g = 0; g < f; g++)
      (d = a[g]), b && (b = (e = b)[d]);
    return !c && F(b) ? nc(e, b) : b;
  }
  function qb(b) {
    var a = b[0];
    b = b[b.length - 1];
    var c = [a];
    do {
      a = a.nextSibling;
      if (!a) break;
      c.push(a);
    } while (a !== b);
    return A(c);
  }
  function ia() {
    return Object.create(null);
  }
  function Ld(b) {
    function a(a, b, c) {
      return a[b] || (a[b] = c());
    }
    var c = z("$injector"),
      d = z("ng");
    b = a(b, "angular", Object);
    b.$$minErr = b.$$minErr || z;
    return a(b, "module", function () {
      var b = {};
      return function (f, g, h) {
        if ("hasOwnProperty" === f) throw d("badname", "module");
        g && b.hasOwnProperty(f) && (b[f] = null);
        return a(b, f, function () {
          function a(c, d, e, f) {
            f || (f = b);
            return function () {
              f[e || "push"]([c, d, arguments]);
              return t;
            };
          }
          if (!g) throw c("nomod", f);
          var b = [],
            d = [],
            e = [],
            s = a("$injector", "invoke", "push", d),
            t = {
              _invokeQueue: b,
              _configBlocks: d,
              _runBlocks: e,
              requires: g,
              name: f,
              provider: a("$provide", "provider"),
              factory: a("$provide", "factory"),
              service: a("$provide", "service"),
              value: a("$provide", "value"),
              constant: a("$provide", "constant", "unshift"),
              animation: a("$animateProvider", "register"),
              filter: a("$filterProvider", "register"),
              controller: a("$controllerProvider", "register"),
              directive: a("$compileProvider", "directive"),
              config: s,
              run: function (a) {
                e.push(a);
                return this;
              },
            };
          h && s(h);
          return t;
        });
      };
    });
  }
  function Md(b) {
    C(b, {
      bootstrap: rc,
      copy: Ca,
      extend: C,
      equals: pa,
      element: A,
      forEach: r,
      injector: Lb,
      noop: x,
      bind: nc,
      toJson: Za,
      fromJson: oc,
      identity: oa,
      isUndefined: G,
      isDefined: y,
      isString: I,
      isFunction: F,
      isObject: K,
      isNumber: X,
      isElement: mc,
      isArray: D,
      version: Nd,
      isDate: fa,
      lowercase: R,
      uppercase: rb,
      callbacks: { counter: 0 },
      getTestability: Id,
      $$minErr: z,
      $$csp: $a,
      reloadWithDebugInfo: Hd,
    });
    ab = Ld(U);
    try {
      ab("ngLocale");
    } catch (a) {
      ab("ngLocale", []).provider("$locale", Od);
    }
    ab(
      "ng",
      ["ngLocale"],
      [
        "$provide",
        function (a) {
          a.provider({ $$sanitizeUri: Pd });
          a.provider("$compile", uc)
            .directive({
              a: Qd,
              input: vc,
              textarea: vc,
              form: Rd,
              script: Sd,
              select: Td,
              style: Ud,
              option: Vd,
              ngBind: Wd,
              ngBindHtml: Xd,
              ngBindTemplate: Yd,
              ngClass: Zd,
              ngClassEven: $d,
              ngClassOdd: ae,
              ngCloak: be,
              ngController: ce,
              ngForm: de,
              ngHide: ee,
              ngIf: fe,
              ngInclude: ge,
              ngInit: he,
              ngNonBindable: ie,
              ngPluralize: je,
              ngRepeat: ke,
              ngShow: le,
              ngStyle: me,
              ngSwitch: ne,
              ngSwitchWhen: oe,
              ngSwitchDefault: pe,
              ngOptions: qe,
              ngTransclude: re,
              ngModel: se,
              ngList: te,
              ngChange: ue,
              pattern: wc,
              ngPattern: wc,
              required: xc,
              ngRequired: xc,
              minlength: yc,
              ngMinlength: yc,
              maxlength: zc,
              ngMaxlength: zc,
              ngValue: ve,
              ngModelOptions: we,
            })
            .directive({ ngInclude: xe })
            .directive(sb)
            .directive(Ac);
          a.provider({
            $anchorScroll: ye,
            $animate: ze,
            $browser: Ae,
            $cacheFactory: Be,
            $controller: Ce,
            $document: De,
            $exceptionHandler: Ee,
            $filter: Bc,
            $interpolate: Fe,
            $interval: Ge,
            $http: He,
            $httpBackend: Ie,
            $location: Je,
            $log: Ke,
            $parse: Le,
            $rootScope: Me,
            $q: Ne,
            $$q: Oe,
            $sce: Pe,
            $sceDelegate: Qe,
            $sniffer: Re,
            $templateCache: Se,
            $templateRequest: Te,
            $$testability: Ue,
            $timeout: Ve,
            $window: We,
            $$rAF: Xe,
            $$asyncCallback: Ye,
          });
        },
      ]
    );
  }
  function bb(b) {
    return b
      .replace(Ze, function (a, b, d, e) {
        return e ? d.toUpperCase() : d;
      })
      .replace($e, "Moz$1");
  }
  function Cc(b) {
    b = b.nodeType;
    return b === na || !b || 9 === b;
  }
  function Dc(b, a) {
    var c,
      d,
      e = a.createDocumentFragment(),
      f = [];
    if (Pb.test(b)) {
      c = c || e.appendChild(a.createElement("div"));
      d = (af.exec(b) || ["", ""])[1].toLowerCase();
      d = ja[d] || ja._default;
      c.innerHTML = d[1] + b.replace(bf, "<$1></$2>") + d[2];
      for (d = d[0]; d--; ) c = c.lastChild;
      f = Xa(f, c.childNodes);
      c = e.firstChild;
      c.textContent = "";
    } else f.push(a.createTextNode(b));
    e.textContent = "";
    e.innerHTML = "";
    r(f, function (a) {
      e.appendChild(a);
    });
    return e;
  }
  function S(b) {
    if (b instanceof S) return b;
    var a;
    I(b) && ((b = P(b)), (a = !0));
    if (!(this instanceof S)) {
      if (a && "<" != b.charAt(0)) throw Qb("nosel");
      return new S(b);
    }
    if (a) {
      a = V;
      var c;
      b = (c = cf.exec(b))
        ? [a.createElement(c[1])]
        : (c = Dc(b, a))
        ? c.childNodes
        : [];
    }
    Ec(this, b);
  }
  function Rb(b) {
    return b.cloneNode(!0);
  }
  function tb(b, a) {
    a || ub(b);
    if (b.querySelectorAll)
      for (var c = b.querySelectorAll("*"), d = 0, e = c.length; d < e; d++)
        ub(c[d]);
  }
  function Fc(b, a, c, d) {
    if (y(d)) throw Qb("offargs");
    var e = (d = vb(b)) && d.events,
      f = d && d.handle;
    if (f)
      if (a)
        r(a.split(" "), function (a) {
          if (y(c)) {
            var d = e[a];
            Va(d || [], c);
            if (d && 0 < d.length) return;
          }
          b.removeEventListener(a, f, !1);
          delete e[a];
        });
      else
        for (a in e)
          "$destroy" !== a && b.removeEventListener(a, f, !1), delete e[a];
  }
  function ub(b, a) {
    var c = b.ng339,
      d = c && wb[c];
    d &&
      (a
        ? delete d.data[a]
        : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), Fc(b)),
          delete wb[c],
          (b.ng339 = u)));
  }
  function vb(b, a) {
    var c = b.ng339,
      c = c && wb[c];
    a &&
      !c &&
      ((b.ng339 = c = ++df), (c = wb[c] = { events: {}, data: {}, handle: u }));
    return c;
  }
  function Sb(b, a, c) {
    if (Cc(b)) {
      var d = y(c),
        e = !d && a && !K(a),
        f = !a;
      b = (b = vb(b, !e)) && b.data;
      if (d) b[a] = c;
      else {
        if (f) return b;
        if (e) return b && b[a];
        C(b, a);
      }
    }
  }
  function Tb(b, a) {
    return b.getAttribute
      ? -1 <
          (" " + (b.getAttribute("class") || "") + " ")
            .replace(/[\n\t]/g, " ")
            .indexOf(" " + a + " ")
      : !1;
  }
  function Ub(b, a) {
    a &&
      b.setAttribute &&
      r(a.split(" "), function (a) {
        b.setAttribute(
          "class",
          P(
            (" " + (b.getAttribute("class") || "") + " ")
              .replace(/[\n\t]/g, " ")
              .replace(" " + P(a) + " ", " ")
          )
        );
      });
  }
  function Vb(b, a) {
    if (a && b.setAttribute) {
      var c = (" " + (b.getAttribute("class") || "") + " ").replace(
        /[\n\t]/g,
        " "
      );
      r(a.split(" "), function (a) {
        a = P(a);
        -1 === c.indexOf(" " + a + " ") && (c += a + " ");
      });
      b.setAttribute("class", P(c));
    }
  }
  function Ec(b, a) {
    if (a)
      if (a.nodeType) b[b.length++] = a;
      else {
        var c = a.length;
        if ("number" === typeof c && a.window !== a) {
          if (c) for (var d = 0; d < c; d++) b[b.length++] = a[d];
        } else b[b.length++] = a;
      }
  }
  function Gc(b, a) {
    return xb(b, "$" + (a || "ngController") + "Controller");
  }
  function xb(b, a, c) {
    9 == b.nodeType && (b = b.documentElement);
    for (a = D(a) ? a : [a]; b; ) {
      for (var d = 0, e = a.length; d < e; d++)
        if ((c = A.data(b, a[d])) !== u) return c;
      b = b.parentNode || (11 === b.nodeType && b.host);
    }
  }
  function Hc(b) {
    for (tb(b, !0); b.firstChild; ) b.removeChild(b.firstChild);
  }
  function Ic(b, a) {
    a || tb(b);
    var c = b.parentNode;
    c && c.removeChild(b);
  }
  function ef(b, a) {
    a = a || U;
    if ("complete" === a.document.readyState) a.setTimeout(b);
    else A(a).on("load", b);
  }
  function Jc(b, a) {
    var c = yb[a.toLowerCase()];
    return c && Kc[ta(b)] && c;
  }
  function ff(b, a) {
    var c = b.nodeName;
    return ("INPUT" === c || "TEXTAREA" === c) && Lc[a];
  }
  function gf(b, a) {
    var c = function (c, e) {
      c.isDefaultPrevented = function () {
        return c.defaultPrevented;
      };
      var f = a[e || c.type],
        g = f ? f.length : 0;
      if (g) {
        if (G(c.immediatePropagationStopped)) {
          var h = c.stopImmediatePropagation;
          c.stopImmediatePropagation = function () {
            c.immediatePropagationStopped = !0;
            c.stopPropagation && c.stopPropagation();
            h && h.call(c);
          };
        }
        c.isImmediatePropagationStopped = function () {
          return !0 === c.immediatePropagationStopped;
        };
        1 < g && (f = ua(f));
        for (var k = 0; k < g; k++)
          c.isImmediatePropagationStopped() || f[k].call(b, c);
      }
    };
    c.elem = b;
    return c;
  }
  function Ma(b, a) {
    var c = b && b.$$hashKey;
    if (c) return "function" === typeof c && (c = b.$$hashKey()), c;
    c = typeof b;
    return (c =
      "function" == c || ("object" == c && null !== b)
        ? (b.$$hashKey = c + ":" + (a || Cd)())
        : c + ":" + b);
  }
  function cb(b, a) {
    if (a) {
      var c = 0;
      this.nextUid = function () {
        return ++c;
      };
    }
    r(b, this.put, this);
  }
  function hf(b) {
    return (b = b.toString().replace(Mc, "").match(Nc))
      ? "function(" + (b[1] || "").replace(/[\s\r\n]+/, " ") + ")"
      : "fn";
  }
  function Wb(b, a, c) {
    var d;
    if ("function" === typeof b) {
      if (!(d = b.$inject)) {
        d = [];
        if (b.length) {
          if (a)
            throw ((I(c) && c) || (c = b.name || hf(b)), Ea("strictdi", c));
          a = b.toString().replace(Mc, "");
          a = a.match(Nc);
          r(a[1].split(jf), function (a) {
            a.replace(kf, function (a, b, c) {
              d.push(c);
            });
          });
        }
        b.$inject = d;
      }
    } else
      D(b)
        ? ((a = b.length - 1), pb(b[a], "fn"), (d = b.slice(0, a)))
        : pb(b, "fn", !0);
    return d;
  }
  function Lb(b, a) {
    function c(a) {
      return function (b, c) {
        if (K(b)) r(b, kc(a));
        else return a(b, c);
      };
    }
    function d(a, b) {
      La(a, "service");
      if (F(b) || D(b)) b = s.instantiate(b);
      if (!b.$get) throw Ea("pget", a);
      return (p[a + "Provider"] = b);
    }
    function e(a, b) {
      return function () {
        var c = q.invoke(b, this, u, a);
        if (G(c)) throw Ea("undef", a);
        return c;
      };
    }
    function f(a, b, c) {
      return d(a, { $get: !1 !== c ? e(a, b) : b });
    }
    function g(a) {
      var b = [],
        c;
      r(a, function (a) {
        function d(a) {
          var b, c;
          b = 0;
          for (c = a.length; b < c; b++) {
            var e = a[b],
              f = s.get(e[0]);
            f[e[1]].apply(f, e[2]);
          }
        }
        if (!m.get(a)) {
          m.put(a, !0);
          try {
            I(a)
              ? ((c = ab(a)),
                (b = b.concat(g(c.requires)).concat(c._runBlocks)),
                d(c._invokeQueue),
                d(c._configBlocks))
              : F(a)
              ? b.push(s.invoke(a))
              : D(a)
              ? b.push(s.invoke(a))
              : pb(a, "module");
          } catch (e) {
            throw (
              (D(a) && (a = a[a.length - 1]),
              e.message &&
                e.stack &&
                -1 == e.stack.indexOf(e.message) &&
                (e = e.message + "\n" + e.stack),
              Ea("modulerr", a, e.stack || e.message || e))
            );
          }
        }
      });
      return b;
    }
    function h(b, c) {
      function d(a) {
        if (b.hasOwnProperty(a)) {
          if (b[a] === k) throw Ea("cdep", a + " <- " + l.join(" <- "));
          return b[a];
        }
        try {
          return l.unshift(a), (b[a] = k), (b[a] = c(a));
        } catch (e) {
          throw (b[a] === k && delete b[a], e);
        } finally {
          l.shift();
        }
      }
      function e(b, c, f, g) {
        "string" === typeof f && ((g = f), (f = null));
        var k = [];
        g = Wb(b, a, g);
        var h, l, q;
        l = 0;
        for (h = g.length; l < h; l++) {
          q = g[l];
          if ("string" !== typeof q) throw Ea("itkn", q);
          k.push(f && f.hasOwnProperty(q) ? f[q] : d(q));
        }
        D(b) && (b = b[h]);
        return b.apply(c, k);
      }
      return {
        invoke: e,
        instantiate: function (a, b, c) {
          var d = Object.create((D(a) ? a[a.length - 1] : a).prototype);
          a = e(a, d, b, c);
          return K(a) || F(a) ? a : d;
        },
        get: d,
        annotate: Wb,
        has: function (a) {
          return p.hasOwnProperty(a + "Provider") || b.hasOwnProperty(a);
        },
      };
    }
    a = !0 === a;
    var k = {},
      l = [],
      m = new cb([], !0),
      p = {
        $provide: {
          provider: c(d),
          factory: c(f),
          service: c(function (a, b) {
            return f(a, [
              "$injector",
              function (a) {
                return a.instantiate(b);
              },
            ]);
          }),
          value: c(function (a, b) {
            return f(a, ca(b), !1);
          }),
          constant: c(function (a, b) {
            La(a, "constant");
            p[a] = b;
            t[a] = b;
          }),
          decorator: function (a, b) {
            var c = s.get(a + "Provider"),
              d = c.$get;
            c.$get = function () {
              var a = q.invoke(d, c);
              return q.invoke(b, null, { $delegate: a });
            };
          },
        },
      },
      s = (p.$injector = h(p, function () {
        throw Ea("unpr", l.join(" <- "));
      })),
      t = {},
      q = (t.$injector = h(t, function (a) {
        var b = s.get(a + "Provider");
        return q.invoke(b.$get, b, u, a);
      }));
    r(g(b), function (a) {
      q.invoke(a || x);
    });
    return q;
  }
  function ye() {
    var b = !0;
    this.disableAutoScrolling = function () {
      b = !1;
    };
    this.$get = [
      "$window",
      "$location",
      "$rootScope",
      function (a, c, d) {
        function e(a) {
          var b = null;
          Array.prototype.some.call(a, function (a) {
            if ("a" === ta(a)) return (b = a), !0;
          });
          return b;
        }
        function f(b) {
          if (b) {
            b.scrollIntoView();
            var c;
            c = g.yOffset;
            F(c)
              ? (c = c())
              : mc(c)
              ? ((c = c[0]),
                (c =
                  "fixed" !== a.getComputedStyle(c).position
                    ? 0
                    : c.getBoundingClientRect().bottom))
              : X(c) || (c = 0);
            c && ((b = b.getBoundingClientRect().top), a.scrollBy(0, b - c));
          } else a.scrollTo(0, 0);
        }
        function g() {
          var a = c.hash(),
            b;
          a
            ? (b = h.getElementById(a))
              ? f(b)
              : (b = e(h.getElementsByName(a)))
              ? f(b)
              : "top" === a && f(null)
            : f(null);
        }
        var h = a.document;
        b &&
          d.$watch(
            function () {
              return c.hash();
            },
            function (a, b) {
              (a === b && "" === a) ||
                ef(function () {
                  d.$evalAsync(g);
                });
            }
          );
        return g;
      },
    ];
  }
  function Ye() {
    this.$get = [
      "$$rAF",
      "$timeout",
      function (b, a) {
        return b.supported
          ? function (a) {
              return b(a);
            }
          : function (b) {
              return a(b, 0, !1);
            };
      },
    ];
  }
  function lf(b, a, c, d) {
    function e(a) {
      try {
        a.apply(null, Ya.call(arguments, 1));
      } finally {
        if ((v--, 0 === v))
          for (; w.length; )
            try {
              w.pop()();
            } catch (b) {
              c.error(b);
            }
      }
    }
    function f(a, b) {
      (function ya() {
        r(O, function (a) {
          a();
        });
        E = b(ya, a);
      })();
    }
    function g() {
      h();
      k();
    }
    function h() {
      H = b.history.state;
      H = G(H) ? null : H;
      pa(H, Q) && (H = Q);
      Q = H;
    }
    function k() {
      if (B !== m.url() || M !== H)
        (B = m.url()),
          (M = H),
          r(W, function (a) {
            a(m.url(), H);
          });
    }
    function l(a) {
      try {
        return decodeURIComponent(a);
      } catch (b) {
        return a;
      }
    }
    var m = this,
      p = a[0],
      s = b.location,
      t = b.history,
      q = b.setTimeout,
      N = b.clearTimeout,
      n = {};
    m.isMock = !1;
    var v = 0,
      w = [];
    m.$$completeOutstandingRequest = e;
    m.$$incOutstandingRequestCount = function () {
      v++;
    };
    m.notifyWhenNoOutstandingRequests = function (a) {
      r(O, function (a) {
        a();
      });
      0 === v ? a() : w.push(a);
    };
    var O = [],
      E;
    m.addPollFn = function (a) {
      G(E) && f(100, q);
      O.push(a);
      return a;
    };
    var H,
      M,
      B = s.href,
      ea = a.find("base"),
      L = null;
    h();
    M = H;
    m.url = function (a, c, e) {
      G(e) && (e = null);
      s !== b.location && (s = b.location);
      t !== b.history && (t = b.history);
      if (a) {
        var f = M === e;
        if (B === a && (!d.history || f)) return m;
        var g = B && Fa(B) === Fa(a);
        B = a;
        M = e;
        !d.history || (g && f)
          ? (g || (L = a), c ? s.replace(a) : (s.href = a))
          : (t[c ? "replaceState" : "pushState"](e, "", a), h(), (M = H));
        return m;
      }
      return L || s.href.replace(/%27/g, "'");
    };
    m.state = function () {
      return H;
    };
    var W = [],
      ba = !1,
      Q = null;
    m.onUrlChange = function (a) {
      if (!ba) {
        if (d.history) A(b).on("popstate", g);
        A(b).on("hashchange", g);
        ba = !0;
      }
      W.push(a);
      return a;
    };
    m.$$checkUrlChange = k;
    m.baseHref = function () {
      var a = ea.attr("href");
      return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
    };
    var aa = {},
      y = "",
      da = m.baseHref();
    m.cookies = function (a, b) {
      var d, e, f, g;
      if (a)
        b === u
          ? (p.cookie =
              encodeURIComponent(a) +
              "=;path=" +
              da +
              ";expires=Thu, 01 Jan 1970 00:00:00 GMT")
          : I(b) &&
            ((d =
              (p.cookie =
                encodeURIComponent(a) +
                "=" +
                encodeURIComponent(b) +
                ";path=" +
                da).length + 1),
            4096 < d &&
              c.warn(
                "Cookie '" +
                  a +
                  "' possibly not set or overflowed because it was too large (" +
                  d +
                  " > 4096 bytes)!"
              ));
      else {
        if (p.cookie !== y)
          for (
            y = p.cookie, d = y.split("; "), aa = {}, f = 0;
            f < d.length;
            f++
          )
            (e = d[f]),
              (g = e.indexOf("=")),
              0 < g &&
                ((a = l(e.substring(0, g))),
                aa[a] === u && (aa[a] = l(e.substring(g + 1))));
        return aa;
      }
    };
    m.defer = function (a, b) {
      var c;
      v++;
      c = q(function () {
        delete n[c];
        e(a);
      }, b || 0);
      n[c] = !0;
      return c;
    };
    m.defer.cancel = function (a) {
      return n[a] ? (delete n[a], N(a), e(x), !0) : !1;
    };
  }
  function Ae() {
    this.$get = [
      "$window",
      "$log",
      "$sniffer",
      "$document",
      function (b, a, c, d) {
        return new lf(b, d, a, c);
      },
    ];
  }
  function Be() {
    this.$get = function () {
      function b(b, d) {
        function e(a) {
          a != p &&
            (s ? s == a && (s = a.n) : (s = a),
            f(a.n, a.p),
            f(a, p),
            (p = a),
            (p.n = null));
        }
        function f(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a));
        }
        if (b in a) throw z("$cacheFactory")("iid", b);
        var g = 0,
          h = C({}, d, { id: b }),
          k = {},
          l = (d && d.capacity) || Number.MAX_VALUE,
          m = {},
          p = null,
          s = null;
        return (a[b] = {
          put: function (a, b) {
            if (l < Number.MAX_VALUE) {
              var c = m[a] || (m[a] = { key: a });
              e(c);
            }
            if (!G(b))
              return a in k || g++, (k[a] = b), g > l && this.remove(s.key), b;
          },
          get: function (a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];
              if (!b) return;
              e(b);
            }
            return k[a];
          },
          remove: function (a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];
              if (!b) return;
              b == p && (p = b.p);
              b == s && (s = b.n);
              f(b.n, b.p);
              delete m[a];
            }
            delete k[a];
            g--;
          },
          removeAll: function () {
            k = {};
            g = 0;
            m = {};
            p = s = null;
          },
          destroy: function () {
            m = h = k = null;
            delete a[b];
          },
          info: function () {
            return C({}, h, { size: g });
          },
        });
      }
      var a = {};
      b.info = function () {
        var b = {};
        r(a, function (a, e) {
          b[e] = a.info();
        });
        return b;
      };
      b.get = function (b) {
        return a[b];
      };
      return b;
    };
  }
  function Se() {
    this.$get = [
      "$cacheFactory",
      function (b) {
        return b("templates");
      },
    ];
  }
  function uc(b, a) {
    function c(a, b) {
      var c = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
        d = {};
      r(a, function (a, e) {
        var f = a.match(c);
        if (!f) throw ka("iscp", b, e, a);
        d[e] = {
          mode: f[1][0],
          collection: "*" === f[2],
          optional: "?" === f[3],
          attrName: f[4] || e,
        };
      });
      return d;
    }
    var d = {},
      e = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
      f = /(([\w\-]+)(?:\:([^;]+))?;?)/,
      g = Dd("ngSrc,ngSrcset,src,srcset"),
      h = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
      k = /^(on[a-z]+|formaction)$/;
    this.directive = function p(a, e) {
      La(a, "directive");
      I(a)
        ? (Ob(e, "directiveFactory"),
          d.hasOwnProperty(a) ||
            ((d[a] = []),
            b.factory(a + "Directive", [
              "$injector",
              "$exceptionHandler",
              function (b, e) {
                var f = [];
                r(d[a], function (d, g) {
                  try {
                    var h = b.invoke(d);
                    F(h)
                      ? (h = { compile: ca(h) })
                      : !h.compile && h.link && (h.compile = ca(h.link));
                    h.priority = h.priority || 0;
                    h.index = g;
                    h.name = h.name || a;
                    h.require = h.require || (h.controller && h.name);
                    h.restrict = h.restrict || "EA";
                    K(h.scope) && (h.$$isolateBindings = c(h.scope, h.name));
                    f.push(h);
                  } catch (k) {
                    e(k);
                  }
                });
                return f;
              },
            ])),
          d[a].push(e))
        : r(a, kc(p));
      return this;
    };
    this.aHrefSanitizationWhitelist = function (b) {
      return y(b)
        ? (a.aHrefSanitizationWhitelist(b), this)
        : a.aHrefSanitizationWhitelist();
    };
    this.imgSrcSanitizationWhitelist = function (b) {
      return y(b)
        ? (a.imgSrcSanitizationWhitelist(b), this)
        : a.imgSrcSanitizationWhitelist();
    };
    var l = !0;
    this.debugInfoEnabled = function (a) {
      return y(a) ? ((l = a), this) : l;
    };
    this.$get = [
      "$injector",
      "$interpolate",
      "$exceptionHandler",
      "$templateRequest",
      "$parse",
      "$controller",
      "$rootScope",
      "$document",
      "$sce",
      "$animate",
      "$$sanitizeUri",
      function (a, b, c, q, N, n, v, w, O, E, H) {
        function M(a, b) {
          try {
            a.addClass(b);
          } catch (c) {}
        }
        function B(a, b, c, d, e) {
          a instanceof A || (a = A(a));
          r(a, function (b, c) {
            b.nodeType == mb &&
              b.nodeValue.match(/\S+/) &&
              (a[c] = A(b).wrap("<span></span>").parent()[0]);
          });
          var f = ea(a, b, a, c, d, e);
          B.$$addScopeClass(a);
          var g = null;
          return function (b, c, d) {
            Ob(b, "scope");
            d = d || {};
            var e = d.parentBoundTranscludeFn,
              h = d.transcludeControllers;
            d = d.futureParentElement;
            e && e.$$boundTransclude && (e = e.$$boundTransclude);
            g ||
              (g = (d = d && d[0])
                ? "foreignobject" !== ta(d) && d.toString().match(/SVG/)
                  ? "svg"
                  : "html"
                : "html");
            d =
              "html" !== g
                ? A(U(g, A("<div>").append(a).html()))
                : c
                ? Ka.clone.call(a)
                : a;
            if (h)
              for (var k in h) d.data("$" + k + "Controller", h[k].instance);
            B.$$addScopeInfo(d, b);
            c && c(d, b);
            f && f(b, d, d, e);
            return d;
          };
        }
        function ea(a, b, c, d, e, f) {
          function g(a, c, d, e) {
            var f, k, l, q, s, n, w;
            if (p)
              for (w = Array(c.length), q = 0; q < h.length; q += 3)
                (f = h[q]), (w[f] = c[f]);
            else w = c;
            q = 0;
            for (s = h.length; q < s; )
              (k = w[h[q++]]),
                (c = h[q++]),
                (f = h[q++]),
                c
                  ? (c.scope
                      ? ((l = a.$new()), B.$$addScopeInfo(A(k), l))
                      : (l = a),
                    (n = c.transcludeOnThisElement
                      ? L(a, c.transclude, e, c.elementTranscludeOnThisElement)
                      : !c.templateOnThisElement && e
                      ? e
                      : !e && b
                      ? L(a, b)
                      : null),
                    c(f, l, k, d, n))
                  : f && f(a, k.childNodes, u, e);
          }
          for (var h = [], k, l, q, s, p, n = 0; n < a.length; n++) {
            k = new X();
            l = W(a[n], [], k, 0 === n ? d : u, e);
            (f = l.length ? aa(l, a[n], k, b, c, null, [], [], f) : null) &&
              f.scope &&
              B.$$addScopeClass(k.$$element);
            k =
              (f && f.terminal) || !(q = a[n].childNodes) || !q.length
                ? null
                : ea(
                    q,
                    f
                      ? (f.transcludeOnThisElement ||
                          !f.templateOnThisElement) &&
                          f.transclude
                      : b
                  );
            if (f || k) h.push(n, f, k), (s = !0), (p = p || f);
            f = null;
          }
          return s ? g : null;
        }
        function L(a, b, c, d) {
          return function (d, e, f, g, h) {
            d || ((d = a.$new(!1, h)), (d.$$transcluded = !0));
            return b(d, e, {
              parentBoundTranscludeFn: c,
              transcludeControllers: f,
              futureParentElement: g,
            });
          };
        }
        function W(b, c, g, h, k) {
          var l = g.$attr,
            q;
          switch (b.nodeType) {
            case na:
              da(c, wa(ta(b)), "E", h, k);
              for (
                var s, n, w, N = b.attributes, t = 0, O = N && N.length;
                t < O;
                t++
              ) {
                var H = !1,
                  v = !1;
                s = N[t];
                q = s.name;
                s = P(s.value);
                n = wa(q);
                if ((w = za.test(n))) q = Mb(n.substr(6), "-");
                var M = n.replace(/(Start|End)$/, ""),
                  E;
                a: {
                  var B = M;
                  if (d.hasOwnProperty(B)) {
                    E = void 0;
                    for (
                      var B = a.get(B + "Directive"), W = 0, r = B.length;
                      W < r;
                      W++
                    )
                      if (((E = B[W]), E.multiElement)) {
                        E = !0;
                        break a;
                      }
                  }
                  E = !1;
                }
                E &&
                  n === M + "Start" &&
                  ((H = q),
                  (v = q.substr(0, q.length - 5) + "end"),
                  (q = q.substr(0, q.length - 6)));
                n = wa(q.toLowerCase());
                l[n] = q;
                if (w || !g.hasOwnProperty(n))
                  (g[n] = s), Jc(b, n) && (g[n] = !0);
                S(b, c, s, n, w);
                da(c, n, "A", h, k, H, v);
              }
              b = b.className;
              if (I(b) && "" !== b)
                for (; (q = f.exec(b)); )
                  (n = wa(q[2])),
                    da(c, n, "C", h, k) && (g[n] = P(q[3])),
                    (b = b.substr(q.index + q[0].length));
              break;
            case mb:
              T(c, b.nodeValue);
              break;
            case 8:
              try {
                if ((q = e.exec(b.nodeValue)))
                  (n = wa(q[1])), da(c, n, "M", h, k) && (g[n] = P(q[2]));
              } catch (Q) {}
          }
          c.sort(z);
          return c;
        }
        function ba(a, b, c) {
          var d = [],
            e = 0;
          if (b && a.hasAttribute && a.hasAttribute(b)) {
            do {
              if (!a) throw ka("uterdir", b, c);
              a.nodeType == na &&
                (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
              d.push(a);
              a = a.nextSibling;
            } while (0 < e);
          } else d.push(a);
          return A(d);
        }
        function Q(a, b, c) {
          return function (d, e, f, g, h) {
            e = ba(e[0], b, c);
            return a(d, e, f, g, h);
          };
        }
        function aa(a, d, e, f, g, k, l, q, p) {
          function w(a, b, c, d) {
            if (a) {
              c && (a = Q(a, c, d));
              a.require = J.require;
              a.directiveName = ga;
              if (L === J || J.$$isolateScope) a = Y(a, { isolateScope: !0 });
              l.push(a);
            }
            if (b) {
              c && (b = Q(b, c, d));
              b.require = J.require;
              b.directiveName = ga;
              if (L === J || J.$$isolateScope) b = Y(b, { isolateScope: !0 });
              q.push(b);
            }
          }
          function O(a, b, c, d) {
            var e,
              f = "data",
              g = !1,
              k = c,
              l;
            if (I(b)) {
              l = b.match(h);
              b = b.substring(l[0].length);
              l[3] && (l[1] ? (l[3] = null) : (l[1] = l[3]));
              "^" === l[1]
                ? (f = "inheritedData")
                : "^^" === l[1] && ((f = "inheritedData"), (k = c.parent()));
              "?" === l[2] && (g = !0);
              e = null;
              d && "data" === f && (e = d[b]) && (e = e.instance);
              e = e || k[f]("$" + b + "Controller");
              if (!e && !g) throw ka("ctreq", b, a);
              return e || null;
            }
            D(b) &&
              ((e = []),
              r(b, function (b) {
                e.push(O(a, b, c, d));
              }));
            return e;
          }
          function H(a, c, f, g, h) {
            function k(a, b, c) {
              var d;
              Ta(a) || ((c = b), (b = a), (a = u));
              C && (d = M);
              c || (c = C ? W.parent() : W);
              return h(a, b, d, c, Xb);
            }
            var p, w, t, v, M, db, W, Q;
            d === f
              ? ((Q = e), (W = e.$$element))
              : ((W = A(f)), (Q = new X(W, e)));
            L && (v = c.$new(!0));
            h && ((db = k), (db.$$boundTransclude = h));
            E &&
              ((ea = {}),
              (M = {}),
              r(E, function (a) {
                var b = {
                  $scope: a === L || a.$$isolateScope ? v : c,
                  $element: W,
                  $attrs: Q,
                  $transclude: db,
                };
                t = a.controller;
                "@" == t && (t = Q[a.name]);
                b = n(t, b, !0, a.controllerAs);
                M[a.name] = b;
                C || W.data("$" + a.name + "Controller", b.instance);
                ea[a.name] = b;
              }));
            if (L) {
              B.$$addScopeInfo(
                W,
                v,
                !0,
                !(aa && (aa === L || aa === L.$$originalDirective))
              );
              B.$$addScopeClass(W, !0);
              g = ea && ea[L.name];
              var ba = v;
              g &&
                g.identifier &&
                !0 === L.bindToController &&
                (ba = g.instance);
              r((v.$$isolateBindings = L.$$isolateBindings), function (a, d) {
                var e = a.attrName,
                  f = a.optional,
                  g,
                  h,
                  k,
                  l;
                switch (a.mode) {
                  case "@":
                    Q.$observe(e, function (a) {
                      ba[d] = a;
                    });
                    Q.$$observers[e].$$scope = c;
                    Q[e] && (ba[d] = b(Q[e])(c));
                    break;
                  case "=":
                    if (f && !Q[e]) break;
                    h = N(Q[e]);
                    l = h.literal
                      ? pa
                      : function (a, b) {
                          return a === b || (a !== a && b !== b);
                        };
                    k =
                      h.assign ||
                      function () {
                        g = ba[d] = h(c);
                        throw ka("nonassign", Q[e], L.name);
                      };
                    g = ba[d] = h(c);
                    f = function (a) {
                      l(a, ba[d]) ||
                        (l(a, g) ? k(c, (a = ba[d])) : (ba[d] = a));
                      return (g = a);
                    };
                    f.$stateful = !0;
                    f = a.collection
                      ? c.$watchCollection(Q[e], f)
                      : c.$watch(N(Q[e], f), null, h.literal);
                    v.$on("$destroy", f);
                    break;
                  case "&":
                    (h = N(Q[e])),
                      (ba[d] = function (a) {
                        return h(c, a);
                      });
                }
              });
            }
            ea &&
              (r(ea, function (a) {
                a();
              }),
              (ea = null));
            g = 0;
            for (p = l.length; g < p; g++)
              (w = l[g]),
                Z(
                  w,
                  w.isolateScope ? v : c,
                  W,
                  Q,
                  w.require && O(w.directiveName, w.require, W, M),
                  db
                );
            var Xb = c;
            L && (L.template || null === L.templateUrl) && (Xb = v);
            a && a(Xb, f.childNodes, u, h);
            for (g = q.length - 1; 0 <= g; g--)
              (w = q[g]),
                Z(
                  w,
                  w.isolateScope ? v : c,
                  W,
                  Q,
                  w.require && O(w.directiveName, w.require, W, M),
                  db
                );
          }
          p = p || {};
          for (
            var v = -Number.MAX_VALUE,
              M,
              E = p.controllerDirectives,
              ea,
              L = p.newIsolateScopeDirective,
              aa = p.templateDirective,
              da = p.nonTlbTranscludeDirective,
              x = !1,
              Na = !1,
              C = p.hasElementTranscludeDirective,
              T = (e.$$element = A(d)),
              J,
              ga,
              z,
              Ga = f,
              R,
              S = 0,
              za = a.length;
            S < za;
            S++
          ) {
            J = a[S];
            var zb = J.$$start,
              $ = J.$$end;
            zb && (T = ba(d, zb, $));
            z = u;
            if (v > J.priority) break;
            if ((z = J.scope))
              J.templateUrl ||
                (K(z)
                  ? (ya("new/isolated scope", L || M, J, T), (L = J))
                  : ya("new/isolated scope", L, J, T)),
                (M = M || J);
            ga = J.name;
            !J.templateUrl &&
              J.controller &&
              ((z = J.controller),
              (E = E || {}),
              ya("'" + ga + "' controller", E[ga], J, T),
              (E[ga] = J));
            if ((z = J.transclude))
              (x = !0),
                J.$$tlb || (ya("transclusion", da, J, T), (da = J)),
                "element" == z
                  ? ((C = !0),
                    (v = J.priority),
                    (z = T),
                    (T = e.$$element = A(
                      V.createComment(" " + ga + ": " + e[ga] + " ")
                    )),
                    (d = T[0]),
                    Ab(g, Ya.call(z, 0), d),
                    (Ga = B(z, f, v, k && k.name, {
                      nonTlbTranscludeDirective: da,
                    })))
                  : ((z = A(Rb(d)).contents()), T.empty(), (Ga = B(z, f)));
            if (J.template)
              if (
                ((Na = !0),
                ya("template", aa, J, T),
                (aa = J),
                (z = F(J.template) ? J.template(T, e) : J.template),
                (z = Pc(z)),
                J.replace)
              ) {
                k = J;
                z = Pb.test(z) ? Qc(U(J.templateNamespace, P(z))) : [];
                d = z[0];
                if (1 != z.length || d.nodeType !== na)
                  throw ka("tplrt", ga, "");
                Ab(g, T, d);
                za = { $attr: {} };
                z = W(d, [], za);
                var mf = a.splice(S + 1, a.length - (S + 1));
                L && y(z);
                a = a.concat(z).concat(mf);
                Oc(e, za);
                za = a.length;
              } else T.html(z);
            if (J.templateUrl)
              (Na = !0),
                ya("template", aa, J, T),
                (aa = J),
                J.replace && (k = J),
                (H = G(a.splice(S, a.length - S), T, e, g, x && Ga, l, q, {
                  controllerDirectives: E,
                  newIsolateScopeDirective: L,
                  templateDirective: aa,
                  nonTlbTranscludeDirective: da,
                })),
                (za = a.length);
            else if (J.compile)
              try {
                (R = J.compile(T, e, Ga)),
                  F(R) ? w(null, R, zb, $) : R && w(R.pre, R.post, zb, $);
              } catch (ca) {
                c(ca, va(T));
              }
            J.terminal && ((H.terminal = !0), (v = Math.max(v, J.priority)));
          }
          H.scope = M && !0 === M.scope;
          H.transcludeOnThisElement = x;
          H.elementTranscludeOnThisElement = C;
          H.templateOnThisElement = Na;
          H.transclude = Ga;
          p.hasElementTranscludeDirective = C;
          return H;
        }
        function y(a) {
          for (var b = 0, c = a.length; b < c; b++) {
            var d = b,
              e;
            e = C(Object.create(a[b]), { $$isolateScope: !0 });
            a[d] = e;
          }
        }
        function da(b, e, f, g, h, k, l) {
          if (e === h) return null;
          h = null;
          if (d.hasOwnProperty(e)) {
            var q;
            e = a.get(e + "Directive");
            for (var s = 0, n = e.length; s < n; s++)
              try {
                if (
                  ((q = e[s]),
                  (g === u || g > q.priority) && -1 != q.restrict.indexOf(f))
                ) {
                  if (k) {
                    var w = { $$start: k, $$end: l };
                    q = C(Object.create(q), w);
                  }
                  b.push(q);
                  h = q;
                }
              } catch (N) {
                c(N);
              }
          }
          return h;
        }
        function Oc(a, b) {
          var c = b.$attr,
            d = a.$attr,
            e = a.$$element;
          r(a, function (d, e) {
            "$" != e.charAt(0) &&
              (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]),
              a.$set(e, d, !0, c[e]));
          });
          r(b, function (b, f) {
            "class" == f
              ? (M(e, b),
                (a["class"] = (a["class"] ? a["class"] + " " : "") + b))
              : "style" == f
              ? (e.attr("style", e.attr("style") + ";" + b),
                (a.style = (a.style ? a.style + ";" : "") + b))
              : "$" == f.charAt(0) ||
                a.hasOwnProperty(f) ||
                ((a[f] = b), (d[f] = c[f]));
          });
        }
        function G(a, b, c, d, e, f, g, h) {
          var k = [],
            l,
            s,
            p = b[0],
            n = a.shift(),
            w = C({}, n, {
              templateUrl: null,
              transclude: null,
              replace: null,
              $$originalDirective: n,
            }),
            N = F(n.templateUrl) ? n.templateUrl(b, c) : n.templateUrl,
            t = n.templateNamespace;
          b.empty();
          q(O.getTrustedResourceUrl(N)).then(function (q) {
            var v, O;
            q = Pc(q);
            if (n.replace) {
              q = Pb.test(q) ? Qc(U(t, P(q))) : [];
              v = q[0];
              if (1 != q.length || v.nodeType !== na)
                throw ka("tplrt", n.name, N);
              q = { $attr: {} };
              Ab(d, b, v);
              var H = W(v, [], q);
              K(n.scope) && y(H);
              a = H.concat(a);
              Oc(c, q);
            } else (v = p), b.html(q);
            a.unshift(w);
            l = aa(a, v, c, e, b, n, f, g, h);
            r(d, function (a, c) {
              a == v && (d[c] = b[0]);
            });
            for (s = ea(b[0].childNodes, e); k.length; ) {
              q = k.shift();
              O = k.shift();
              var E = k.shift(),
                B = k.shift(),
                H = b[0];
              if (!q.$$destroyed) {
                if (O !== p) {
                  var Q = O.className;
                  (h.hasElementTranscludeDirective && n.replace) || (H = Rb(v));
                  Ab(E, A(O), H);
                  M(A(H), Q);
                }
                O = l.transcludeOnThisElement ? L(q, l.transclude, B) : B;
                l(s, q, H, d, O);
              }
            }
            k = null;
          });
          return function (a, b, c, d, e) {
            a = e;
            b.$$destroyed ||
              (k
                ? k.push(b, c, d, a)
                : (l.transcludeOnThisElement && (a = L(b, l.transclude, e)),
                  l(s, b, c, d, a)));
          };
        }
        function z(a, b) {
          var c = b.priority - a.priority;
          return 0 !== c
            ? c
            : a.name !== b.name
            ? a.name < b.name
              ? -1
              : 1
            : a.index - b.index;
        }
        function ya(a, b, c, d) {
          if (b) throw ka("multidir", b.name, c.name, a, va(d));
        }
        function T(a, c) {
          var d = b(c, !0);
          d &&
            a.push({
              priority: 0,
              compile: function (a) {
                a = a.parent();
                var b = !!a.length;
                b && B.$$addBindingClass(a);
                return function (a, c) {
                  var e = c.parent();
                  b || B.$$addBindingClass(e);
                  B.$$addBindingInfo(e, d.expressions);
                  a.$watch(d, function (a) {
                    c[0].nodeValue = a;
                  });
                };
              },
            });
        }
        function U(a, b) {
          a = R(a || "html");
          switch (a) {
            case "svg":
            case "math":
              var c = V.createElement("div");
              c.innerHTML = "<" + a + ">" + b + "</" + a + ">";
              return c.childNodes[0].childNodes;
            default:
              return b;
          }
        }
        function Ga(a, b) {
          if ("srcdoc" == b) return O.HTML;
          var c = ta(a);
          if (
            "xlinkHref" == b ||
            ("form" == c && "action" == b) ||
            ("img" != c && ("src" == b || "ngSrc" == b))
          )
            return O.RESOURCE_URL;
        }
        function S(a, c, d, e, f) {
          var h = b(d, !0);
          if (h) {
            if ("multiple" === e && "select" === ta(a))
              throw ka("selmulti", va(a));
            c.push({
              priority: 100,
              compile: function () {
                return {
                  pre: function (c, d, l) {
                    d = l.$$observers || (l.$$observers = {});
                    if (k.test(e)) throw ka("nodomevents");
                    l[e] &&
                      (h = b(l[e], !0, Ga(a, e), g[e] || f)) &&
                      ((l[e] = h(c)),
                      ((d[e] || (d[e] = [])).$$inter = !0),
                      ((l.$$observers && l.$$observers[e].$$scope) || c).$watch(
                        h,
                        function (a, b) {
                          "class" === e && a != b
                            ? l.$updateClass(a, b)
                            : l.$set(e, a);
                        }
                      ));
                  },
                };
              },
            });
          }
        }
        function Ab(a, b, c) {
          var d = b[0],
            e = b.length,
            f = d.parentNode,
            g,
            h;
          if (a)
            for (g = 0, h = a.length; g < h; g++)
              if (a[g] == d) {
                a[g++] = c;
                h = g + e - 1;
                for (var k = a.length; g < k; g++, h++)
                  h < k ? (a[g] = a[h]) : delete a[g];
                a.length -= e - 1;
                a.context === d && (a.context = c);
                break;
              }
          f && f.replaceChild(c, d);
          a = V.createDocumentFragment();
          a.appendChild(d);
          A(c).data(A(d).data());
          qa ? ((Nb = !0), qa.cleanData([d])) : delete A.cache[d[A.expando]];
          d = 1;
          for (e = b.length; d < e; d++)
            (f = b[d]), A(f).remove(), a.appendChild(f), delete b[d];
          b[0] = c;
          b.length = 1;
        }
        function Y(a, b) {
          return C(
            function () {
              return a.apply(null, arguments);
            },
            a,
            b
          );
        }
        function Z(a, b, d, e, f, g) {
          try {
            a(b, d, e, f, g);
          } catch (h) {
            c(h, va(d));
          }
        }
        var X = function (a, b) {
          if (b) {
            var c = Object.keys(b),
              d,
              e,
              f;
            d = 0;
            for (e = c.length; d < e; d++) (f = c[d]), (this[f] = b[f]);
          } else this.$attr = {};
          this.$$element = a;
        };
        X.prototype = {
          $normalize: wa,
          $addClass: function (a) {
            a && 0 < a.length && E.addClass(this.$$element, a);
          },
          $removeClass: function (a) {
            a && 0 < a.length && E.removeClass(this.$$element, a);
          },
          $updateClass: function (a, b) {
            var c = Rc(a, b);
            c && c.length && E.addClass(this.$$element, c);
            (c = Rc(b, a)) && c.length && E.removeClass(this.$$element, c);
          },
          $set: function (a, b, d, e) {
            var f = this.$$element[0],
              g = Jc(f, a),
              h = ff(f, a),
              f = a;
            g
              ? (this.$$element.prop(a, b), (e = g))
              : h && ((this[h] = b), (f = h));
            this[a] = b;
            e
              ? (this.$attr[a] = e)
              : (e = this.$attr[a]) || (this.$attr[a] = e = Mb(a, "-"));
            g = ta(this.$$element);
            if (("a" === g && "href" === a) || ("img" === g && "src" === a))
              this[a] = b = H(b, "src" === a);
            else if ("img" === g && "srcset" === a) {
              for (
                var g = "",
                  h = P(b),
                  k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,
                  k = /\s/.test(h) ? k : /(,)/,
                  h = h.split(k),
                  k = Math.floor(h.length / 2),
                  l = 0;
                l < k;
                l++
              )
                var q = 2 * l,
                  g = g + H(P(h[q]), !0),
                  g = g + (" " + P(h[q + 1]));
              h = P(h[2 * l]).split(/\s/);
              g += H(P(h[0]), !0);
              2 === h.length && (g += " " + P(h[1]));
              this[a] = b = g;
            }
            !1 !== d &&
              (null === b || b === u
                ? this.$$element.removeAttr(e)
                : this.$$element.attr(e, b));
            (a = this.$$observers) &&
              r(a[f], function (a) {
                try {
                  a(b);
                } catch (d) {
                  c(d);
                }
              });
          },
          $observe: function (a, b) {
            var c = this,
              d = c.$$observers || (c.$$observers = ia()),
              e = d[a] || (d[a] = []);
            e.push(b);
            v.$evalAsync(function () {
              !e.$$inter && c.hasOwnProperty(a) && b(c[a]);
            });
            return function () {
              Va(e, b);
            };
          },
        };
        var Na = b.startSymbol(),
          ga = b.endSymbol(),
          Pc =
            "{{" == Na || "}}" == ga
              ? oa
              : function (a) {
                  return a.replace(/\{\{/g, Na).replace(/}}/g, ga);
                },
          za = /^ngAttr[A-Z]/;
        B.$$addBindingInfo = l
          ? function (a, b) {
              var c = a.data("$binding") || [];
              D(b) ? (c = c.concat(b)) : c.push(b);
              a.data("$binding", c);
            }
          : x;
        B.$$addBindingClass = l
          ? function (a) {
              M(a, "ng-binding");
            }
          : x;
        B.$$addScopeInfo = l
          ? function (a, b, c, d) {
              a.data(
                c
                  ? d
                    ? "$isolateScopeNoTemplate"
                    : "$isolateScope"
                  : "$scope",
                b
              );
            }
          : x;
        B.$$addScopeClass = l
          ? function (a, b) {
              M(a, b ? "ng-isolate-scope" : "ng-scope");
            }
          : x;
        return B;
      },
    ];
  }
  function wa(b) {
    return bb(b.replace(nf, ""));
  }
  function Rc(b, a) {
    var c = "",
      d = b.split(/\s+/),
      e = a.split(/\s+/),
      f = 0;
    a: for (; f < d.length; f++) {
      for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
      c += (0 < c.length ? " " : "") + g;
    }
    return c;
  }
  function Qc(b) {
    b = A(b);
    var a = b.length;
    if (1 >= a) return b;
    for (; a--; ) 8 === b[a].nodeType && of.call(b, a, 1);
    return b;
  }
  function Ce() {
    var b = {},
      a = !1,
      c = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (a, c) {
      La(a, "controller");
      K(a) ? C(b, a) : (b[a] = c);
    };
    this.allowGlobals = function () {
      a = !0;
    };
    this.$get = [
      "$injector",
      "$window",
      function (d, e) {
        function f(a, b, c, d) {
          if (!a || !K(a.$scope)) throw z("$controller")("noscp", d, b);
          a.$scope[b] = c;
        }
        return function (g, h, k, l) {
          var m, p, s;
          k = !0 === k;
          l && I(l) && (s = l);
          I(g) &&
            ((l = g.match(c)),
            (p = l[1]),
            (s = s || l[3]),
            (g = b.hasOwnProperty(p)
              ? b[p]
              : tc(h.$scope, p, !0) || (a ? tc(e, p, !0) : u)),
            pb(g, p, !0));
          if (k)
            return (
              (k = (D(g) ? g[g.length - 1] : g).prototype),
              (m = Object.create(k)),
              s && f(h, s, m, p || g.name),
              C(
                function () {
                  d.invoke(g, m, h, p);
                  return m;
                },
                { instance: m, identifier: s }
              )
            );
          m = d.instantiate(g, h, p);
          s && f(h, s, m, p || g.name);
          return m;
        };
      },
    ];
  }
  function De() {
    this.$get = [
      "$window",
      function (b) {
        return A(b.document);
      },
    ];
  }
  function Ee() {
    this.$get = [
      "$log",
      function (b) {
        return function (a, c) {
          b.error.apply(b, arguments);
        };
      },
    ];
  }
  function Yb(b, a) {
    if (I(b)) {
      b = b.replace(pf, "");
      var c = a("Content-Type");
      if ((c && 0 === c.indexOf(Sc) && b.trim()) || (qf.test(b) && rf.test(b)))
        b = oc(b);
    }
    return b;
  }
  function Tc(b) {
    var a = ia(),
      c,
      d,
      e;
    if (!b) return a;
    r(b.split("\n"), function (b) {
      e = b.indexOf(":");
      c = R(P(b.substr(0, e)));
      d = P(b.substr(e + 1));
      c && (a[c] = a[c] ? a[c] + ", " + d : d);
    });
    return a;
  }
  function Uc(b) {
    var a = K(b) ? b : u;
    return function (c) {
      a || (a = Tc(b));
      return c ? ((c = a[R(c)]), void 0 === c && (c = null), c) : a;
    };
  }
  function Vc(b, a, c) {
    if (F(c)) return c(b, a);
    r(c, function (c) {
      b = c(b, a);
    });
    return b;
  }
  function He() {
    var b = (this.defaults = {
        transformResponse: [Yb],
        transformRequest: [
          function (a) {
            return K(a) &&
              "[object File]" !== Ja.call(a) &&
              "[object Blob]" !== Ja.call(a)
              ? Za(a)
              : a;
          },
        ],
        headers: {
          common: { Accept: "application/json, text/plain, */*" },
          post: ua(Zb),
          put: ua(Zb),
          patch: ua(Zb),
        },
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
      }),
      a = !1;
    this.useApplyAsync = function (b) {
      return y(b) ? ((a = !!b), this) : a;
    };
    var c = (this.interceptors = []);
    this.$get = [
      "$httpBackend",
      "$browser",
      "$cacheFactory",
      "$rootScope",
      "$q",
      "$injector",
      function (d, e, f, g, h, k) {
        function l(a) {
          function c(a) {
            var b = C({}, a);
            b.data = a.data
              ? Vc(a.data, a.headers, d.transformResponse)
              : a.data;
            a = a.status;
            return 200 <= a && 300 > a ? b : h.reject(b);
          }
          var d = {
              method: "get",
              transformRequest: b.transformRequest,
              transformResponse: b.transformResponse,
            },
            e = (function (a) {
              var c = b.headers,
                d = C({}, a.headers),
                e,
                f,
                c = C({}, c.common, c[R(a.method)]);
              a: for (e in c) {
                a = R(e);
                for (f in d) if (R(f) === a) continue a;
                d[e] = c[e];
              }
              (function (a) {
                var b;
                r(a, function (c, d) {
                  F(c) && ((b = c()), null != b ? (a[d] = b) : delete a[d]);
                });
              })(d);
              return d;
            })(a);
          if (!ha.isObject(a)) throw z("$http")("badreq", a);
          C(d, a);
          d.headers = e;
          d.method = rb(d.method);
          var f = [
              function (a) {
                e = a.headers;
                var d = Vc(a.data, Uc(e), a.transformRequest);
                G(d) &&
                  r(e, function (a, b) {
                    "content-type" === R(b) && delete e[b];
                  });
                G(a.withCredentials) &&
                  !G(b.withCredentials) &&
                  (a.withCredentials = b.withCredentials);
                return m(a, d, e).then(c, c);
              },
              u,
            ],
            g = h.when(d);
          for (
            r(t, function (a) {
              (a.request || a.requestError) &&
                f.unshift(a.request, a.requestError);
              (a.response || a.responseError) &&
                f.push(a.response, a.responseError);
            });
            f.length;

          ) {
            a = f.shift();
            var k = f.shift(),
              g = g.then(a, k);
          }
          g.success = function (a) {
            g.then(function (b) {
              a(b.data, b.status, b.headers, d);
            });
            return g;
          };
          g.error = function (a) {
            g.then(null, function (b) {
              a(b.data, b.status, b.headers, d);
            });
            return g;
          };
          return g;
        }
        function m(c, f, k) {
          function m(b, c, d, e) {
            function f() {
              w(c, b, d, e);
            }
            M &&
              (200 <= b && 300 > b ? M.put(r, [b, c, Tc(d), e]) : M.remove(r));
            a ? g.$applyAsync(f) : (f(), g.$$phase || g.$apply());
          }
          function w(a, b, d, e) {
            b = Math.max(b, 0);
            (200 <= b && 300 > b ? E.resolve : E.reject)({
              data: a,
              status: b,
              headers: Uc(d),
              config: c,
              statusText: e,
            });
          }
          function t() {
            var a = l.pendingRequests.indexOf(c);
            -1 !== a && l.pendingRequests.splice(a, 1);
          }
          var E = h.defer(),
            H = E.promise,
            M,
            B,
            r = p(c.url, c.params);
          l.pendingRequests.push(c);
          H.then(t, t);
          (!c.cache && !b.cache) ||
            !1 === c.cache ||
            ("GET" !== c.method && "JSONP" !== c.method) ||
            (M = K(c.cache) ? c.cache : K(b.cache) ? b.cache : s);
          if (M)
            if (((B = M.get(r)), y(B))) {
              if (B && F(B.then)) return B.then(t, t), B;
              D(B) ? w(B[1], B[0], ua(B[2]), B[3]) : w(B, 200, {}, "OK");
            } else M.put(r, H);
          G(B) &&
            ((B = Wc(c.url)
              ? e.cookies()[c.xsrfCookieName || b.xsrfCookieName]
              : u) && (k[c.xsrfHeaderName || b.xsrfHeaderName] = B),
            d(
              c.method,
              r,
              f,
              m,
              k,
              c.timeout,
              c.withCredentials,
              c.responseType
            ));
          return H;
        }
        function p(a, b) {
          if (!b) return a;
          var c = [];
          Bd(b, function (a, b) {
            null === a ||
              G(a) ||
              (D(a) || (a = [a]),
              r(a, function (a) {
                K(a) && (a = fa(a) ? a.toISOString() : Za(a));
                c.push(Da(b) + "=" + Da(a));
              }));
          });
          0 < c.length &&
            (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
          return a;
        }
        var s = f("$http"),
          t = [];
        r(c, function (a) {
          t.unshift(I(a) ? k.get(a) : k.invoke(a));
        });
        l.pendingRequests = [];
        (function (a) {
          r(arguments, function (a) {
            l[a] = function (b, c) {
              return l(C(c || {}, { method: a, url: b }));
            };
          });
        })("get", "delete", "head", "jsonp");
        (function (a) {
          r(arguments, function (a) {
            l[a] = function (b, c, d) {
              return l(C(d || {}, { method: a, url: b, data: c }));
            };
          });
        })("post", "put", "patch");
        l.defaults = b;
        return l;
      },
    ];
  }
  function sf() {
    return new U.XMLHttpRequest();
  }
  function Ie() {
    this.$get = [
      "$browser",
      "$window",
      "$document",
      function (b, a, c) {
        return tf(b, sf, b.defer, a.angular.callbacks, c[0]);
      },
    ];
  }
  function tf(b, a, c, d, e) {
    function f(a, b, c) {
      var f = e.createElement("script"),
        m = null;
      f.type = "text/javascript";
      f.src = a;
      f.async = !0;
      m = function (a) {
        f.removeEventListener("load", m, !1);
        f.removeEventListener("error", m, !1);
        e.body.removeChild(f);
        f = null;
        var g = -1,
          t = "unknown";
        a &&
          ("load" !== a.type || d[b].called || (a = { type: "error" }),
          (t = a.type),
          (g = "error" === a.type ? 404 : 200));
        c && c(g, t);
      };
      f.addEventListener("load", m, !1);
      f.addEventListener("error", m, !1);
      e.body.appendChild(f);
      return m;
    }
    return function (e, h, k, l, m, p, s, t) {
      function q() {
        v && v();
        w && w.abort();
      }
      function N(a, d, e, f, g) {
        E && c.cancel(E);
        v = w = null;
        a(d, e, f, g);
        b.$$completeOutstandingRequest(x);
      }
      b.$$incOutstandingRequestCount();
      h = h || b.url();
      if ("jsonp" == R(e)) {
        var n = "_" + (d.counter++).toString(36);
        d[n] = function (a) {
          d[n].data = a;
          d[n].called = !0;
        };
        var v = f(
          h.replace("JSON_CALLBACK", "angular.callbacks." + n),
          n,
          function (a, b) {
            N(l, a, d[n].data, "", b);
            d[n] = x;
          }
        );
      } else {
        var w = a();
        w.open(e, h, !0);
        r(m, function (a, b) {
          y(a) && w.setRequestHeader(b, a);
        });
        w.onload = function () {
          var a = w.statusText || "",
            b = "response" in w ? w.response : w.responseText,
            c = 1223 === w.status ? 204 : w.status;
          0 === c && (c = b ? 200 : "file" == Aa(h).protocol ? 404 : 0);
          N(l, c, b, w.getAllResponseHeaders(), a);
        };
        e = function () {
          N(l, -1, null, null, "");
        };
        w.onerror = e;
        w.onabort = e;
        s && (w.withCredentials = !0);
        if (t)
          try {
            w.responseType = t;
          } catch (O) {
            if ("json" !== t) throw O;
          }
        w.send(k || null);
      }
      if (0 < p) var E = c(q, p);
      else p && F(p.then) && p.then(q);
    };
  }
  function Fe() {
    var b = "{{",
      a = "}}";
    this.startSymbol = function (a) {
      return a ? ((b = a), this) : b;
    };
    this.endSymbol = function (b) {
      return b ? ((a = b), this) : a;
    };
    this.$get = [
      "$parse",
      "$exceptionHandler",
      "$sce",
      function (c, d, e) {
        function f(a) {
          return "\\\\\\" + a;
        }
        function g(f, g, t, q) {
          function N(c) {
            return c.replace(l, b).replace(m, a);
          }
          function n(a) {
            try {
              var b = a;
              a = t ? e.getTrusted(t, b) : e.valueOf(b);
              var c;
              if (q && !y(a)) c = a;
              else if (null == a) c = "";
              else {
                switch (typeof a) {
                  case "string":
                    break;
                  case "number":
                    a = "" + a;
                    break;
                  default:
                    a = Za(a);
                }
                c = a;
              }
              return c;
            } catch (g) {
              (c = $b("interr", f, g.toString())), d(c);
            }
          }
          q = !!q;
          for (
            var v, w, O = 0, E = [], H = [], M = f.length, B = [], r = [];
            O < M;

          )
            if (-1 != (v = f.indexOf(b, O)) && -1 != (w = f.indexOf(a, v + h)))
              O !== v && B.push(N(f.substring(O, v))),
                (O = f.substring(v + h, w)),
                E.push(O),
                H.push(c(O, n)),
                (O = w + k),
                r.push(B.length),
                B.push("");
            else {
              O !== M && B.push(N(f.substring(O)));
              break;
            }
          if (t && 1 < B.length) throw $b("noconcat", f);
          if (!g || E.length) {
            var L = function (a) {
              for (var b = 0, c = E.length; b < c; b++) {
                if (q && G(a[b])) return;
                B[r[b]] = a[b];
              }
              return B.join("");
            };
            return C(
              function (a) {
                var b = 0,
                  c = E.length,
                  e = Array(c);
                try {
                  for (; b < c; b++) e[b] = H[b](a);
                  return L(e);
                } catch (g) {
                  (a = $b("interr", f, g.toString())), d(a);
                }
              },
              {
                exp: f,
                expressions: E,
                $$watchDelegate: function (a, b, c) {
                  var d;
                  return a.$watchGroup(
                    H,
                    function (c, e) {
                      var f = L(c);
                      F(b) && b.call(this, f, c !== e ? d : f, a);
                      d = f;
                    },
                    c
                  );
                },
              }
            );
          }
        }
        var h = b.length,
          k = a.length,
          l = new RegExp(b.replace(/./g, f), "g"),
          m = new RegExp(a.replace(/./g, f), "g");
        g.startSymbol = function () {
          return b;
        };
        g.endSymbol = function () {
          return a;
        };
        return g;
      },
    ];
  }
  function Ge() {
    this.$get = [
      "$rootScope",
      "$window",
      "$q",
      "$$q",
      function (b, a, c, d) {
        function e(e, h, k, l) {
          var m = a.setInterval,
            p = a.clearInterval,
            s = 0,
            t = y(l) && !l,
            q = (t ? d : c).defer(),
            N = q.promise;
          k = y(k) ? k : 0;
          N.then(null, null, e);
          N.$$intervalId = m(function () {
            q.notify(s++);
            0 < k &&
              s >= k &&
              (q.resolve(s), p(N.$$intervalId), delete f[N.$$intervalId]);
            t || b.$apply();
          }, h);
          f[N.$$intervalId] = q;
          return N;
        }
        var f = {};
        e.cancel = function (b) {
          return b && b.$$intervalId in f
            ? (f[b.$$intervalId].reject("canceled"),
              a.clearInterval(b.$$intervalId),
              delete f[b.$$intervalId],
              !0)
            : !1;
        };
        return e;
      },
    ];
  }
  function Od() {
    this.$get = function () {
      return {
        id: "en-us",
        NUMBER_FORMATS: {
          DECIMAL_SEP: ".",
          GROUP_SEP: ",",
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: "",
              posSuf: "",
              negPre: "-",
              negSuf: "",
              gSize: 3,
              lgSize: 3,
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: "\u00a4",
              posSuf: "",
              negPre: "(\u00a4",
              negSuf: ")",
              gSize: 3,
              lgSize: 3,
            },
          ],
          CURRENCY_SYM: "$",
        },
        DATETIME_FORMATS: {
          MONTH: "January February March April May June July August September October November December".split(
            " "
          ),
          SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
            " "
          ),
          DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
            " "
          ),
          SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
          AMPMS: ["AM", "PM"],
          medium: "MMM d, y h:mm:ss a",
          short: "M/d/yy h:mm a",
          fullDate: "EEEE, MMMM d, y",
          longDate: "MMMM d, y",
          mediumDate: "MMM d, y",
          shortDate: "M/d/yy",
          mediumTime: "h:mm:ss a",
          shortTime: "h:mm a",
        },
        pluralCat: function (b) {
          return 1 === b ? "one" : "other";
        },
      };
    };
  }
  function ac(b) {
    b = b.split("/");
    for (var a = b.length; a--; ) b[a] = nb(b[a]);
    return b.join("/");
  }
  function Xc(b, a) {
    var c = Aa(b);
    a.$$protocol = c.protocol;
    a.$$host = c.hostname;
    a.$$port = $(c.port) || uf[c.protocol] || null;
  }
  function Yc(b, a) {
    var c = "/" !== b.charAt(0);
    c && (b = "/" + b);
    var d = Aa(b);
    a.$$path = decodeURIComponent(
      c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname
    );
    a.$$search = qc(d.search);
    a.$$hash = decodeURIComponent(d.hash);
    a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
  }
  function xa(b, a) {
    if (0 === a.indexOf(b)) return a.substr(b.length);
  }
  function Fa(b) {
    var a = b.indexOf("#");
    return -1 == a ? b : b.substr(0, a);
  }
  function bc(b) {
    return b.substr(0, Fa(b).lastIndexOf("/") + 1);
  }
  function cc(b, a) {
    this.$$html5 = !0;
    a = a || "";
    var c = bc(b);
    Xc(b, this);
    this.$$parse = function (a) {
      var b = xa(c, a);
      if (!I(b)) throw eb("ipthprfx", a, c);
      Yc(b, this);
      this.$$path || (this.$$path = "/");
      this.$$compose();
    };
    this.$$compose = function () {
      var a = Kb(this.$$search),
        b = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (a ? "?" + a : "") + b;
      this.$$absUrl = c + this.$$url.substr(1);
    };
    this.$$parseLinkUrl = function (d, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
      var f, g;
      (f = xa(b, d)) !== u
        ? ((g = f), (g = (f = xa(a, f)) !== u ? c + (xa("/", f) || f) : b + g))
        : (f = xa(c, d)) !== u
        ? (g = c + f)
        : c == d + "/" && (g = c);
      g && this.$$parse(g);
      return !!g;
    };
  }
  function dc(b, a) {
    var c = bc(b);
    Xc(b, this);
    this.$$parse = function (d) {
      var e = xa(b, d) || xa(c, d),
        e = "#" == e.charAt(0) ? xa(a, e) : this.$$html5 ? e : "";
      if (!I(e)) throw eb("ihshprfx", d, a);
      Yc(e, this);
      d = this.$$path;
      var f = /^\/[A-Z]:(\/.*)/;
      0 === e.indexOf(b) && (e = e.replace(b, ""));
      f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
      this.$$path = d;
      this.$$compose();
    };
    this.$$compose = function () {
      var c = Kb(this.$$search),
        e = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
      this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
    };
    this.$$parseLinkUrl = function (a, c) {
      return Fa(b) == Fa(a) ? (this.$$parse(a), !0) : !1;
    };
  }
  function Zc(b, a) {
    this.$$html5 = !0;
    dc.apply(this, arguments);
    var c = bc(b);
    this.$$parseLinkUrl = function (d, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
      var f, g;
      b == Fa(d)
        ? (f = d)
        : (g = xa(c, d))
        ? (f = b + a + g)
        : c === d + "/" && (f = c);
      f && this.$$parse(f);
      return !!f;
    };
    this.$$compose = function () {
      var c = Kb(this.$$search),
        e = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
      this.$$absUrl = b + a + this.$$url;
    };
  }
  function Bb(b) {
    return function () {
      return this[b];
    };
  }
  function $c(b, a) {
    return function (c) {
      if (G(c)) return this[b];
      this[b] = a(c);
      this.$$compose();
      return this;
    };
  }
  function Je() {
    var b = "",
      a = { enabled: !1, requireBase: !0, rewriteLinks: !0 };
    this.hashPrefix = function (a) {
      return y(a) ? ((b = a), this) : b;
    };
    this.html5Mode = function (b) {
      return Ua(b)
        ? ((a.enabled = b), this)
        : K(b)
        ? (Ua(b.enabled) && (a.enabled = b.enabled),
          Ua(b.requireBase) && (a.requireBase = b.requireBase),
          Ua(b.rewriteLinks) && (a.rewriteLinks = b.rewriteLinks),
          this)
        : a;
    };
    this.$get = [
      "$rootScope",
      "$browser",
      "$sniffer",
      "$rootElement",
      function (c, d, e, f) {
        function g(a, b, c) {
          var e = k.url(),
            f = k.$$state;
          try {
            d.url(a, b, c), (k.$$state = d.state());
          } catch (g) {
            throw (k.url(e), (k.$$state = f), g);
          }
        }
        function h(a, b) {
          c.$broadcast("$locationChangeSuccess", k.absUrl(), a, k.$$state, b);
        }
        var k, l;
        l = d.baseHref();
        var m = d.url(),
          p;
        if (a.enabled) {
          if (!l && a.requireBase) throw eb("nobase");
          p = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (l || "/");
          l = e.history ? cc : Zc;
        } else (p = Fa(m)), (l = dc);
        k = new l(p, "#" + b);
        k.$$parseLinkUrl(m, m);
        k.$$state = d.state();
        var s = /^\s*(javascript|mailto):/i;
        f.on("click", function (b) {
          if (a.rewriteLinks && !b.ctrlKey && !b.metaKey && 2 != b.which) {
            for (var e = A(b.target); "a" !== ta(e[0]); )
              if (e[0] === f[0] || !(e = e.parent())[0]) return;
            var g = e.prop("href"),
              h = e.attr("href") || e.attr("xlink:href");
            K(g) &&
              "[object SVGAnimatedString]" === g.toString() &&
              (g = Aa(g.animVal).href);
            s.test(g) ||
              !g ||
              e.attr("target") ||
              b.isDefaultPrevented() ||
              !k.$$parseLinkUrl(g, h) ||
              (b.preventDefault(),
              k.absUrl() != d.url() &&
                (c.$apply(), (U.angular["ff-684208-preventDefault"] = !0)));
          }
        });
        k.absUrl() != m && d.url(k.absUrl(), !0);
        var t = !0;
        d.onUrlChange(function (a, b) {
          c.$evalAsync(function () {
            var d = k.absUrl(),
              e = k.$$state,
              f;
            k.$$parse(a);
            k.$$state = b;
            f = c.$broadcast("$locationChangeStart", a, d, b, e)
              .defaultPrevented;
            k.absUrl() === a &&
              (f
                ? (k.$$parse(d), (k.$$state = e), g(d, !1, e))
                : ((t = !1), h(d, e)));
          });
          c.$$phase || c.$digest();
        });
        c.$watch(function () {
          var a = d.url(),
            b = d.state(),
            f = k.$$replace,
            l = a !== k.absUrl() || (k.$$html5 && e.history && b !== k.$$state);
          if (t || l)
            (t = !1),
              c.$evalAsync(function () {
                var d = k.absUrl(),
                  e = c.$broadcast("$locationChangeStart", d, a, k.$$state, b)
                    .defaultPrevented;
                k.absUrl() === d &&
                  (e
                    ? (k.$$parse(a), (k.$$state = b))
                    : (l && g(d, f, b === k.$$state ? null : k.$$state),
                      h(a, b)));
              });
          k.$$replace = !1;
        });
        return k;
      },
    ];
  }
  function Ke() {
    var b = !0,
      a = this;
    this.debugEnabled = function (a) {
      return y(a) ? ((b = a), this) : b;
    };
    this.$get = [
      "$window",
      function (c) {
        function d(a) {
          a instanceof Error &&
            (a.stack
              ? (a =
                  a.message && -1 === a.stack.indexOf(a.message)
                    ? "Error: " + a.message + "\n" + a.stack
                    : a.stack)
              : a.sourceURL &&
                (a = a.message + "\n" + a.sourceURL + ":" + a.line));
          return a;
        }
        function e(a) {
          var b = c.console || {},
            e = b[a] || b.log || x;
          a = !1;
          try {
            a = !!e.apply;
          } catch (k) {}
          return a
            ? function () {
                var a = [];
                r(arguments, function (b) {
                  a.push(d(b));
                });
                return e.apply(b, a);
              }
            : function (a, b) {
                e(a, null == b ? "" : b);
              };
        }
        return {
          log: e("log"),
          info: e("info"),
          warn: e("warn"),
          error: e("error"),
          debug: (function () {
            var c = e("debug");
            return function () {
              b && c.apply(a, arguments);
            };
          })(),
        };
      },
    ];
  }
  function ra(b, a) {
    if (
      "__defineGetter__" === b ||
      "__defineSetter__" === b ||
      "__lookupGetter__" === b ||
      "__lookupSetter__" === b ||
      "__proto__" === b
    )
      throw la("isecfld", a);
    return b;
  }
  function sa(b, a) {
    if (b) {
      if (b.constructor === b) throw la("isecfn", a);
      if (b.window === b) throw la("isecwindow", a);
      if (b.children && (b.nodeName || (b.prop && b.attr && b.find)))
        throw la("isecdom", a);
      if (b === Object) throw la("isecobj", a);
    }
    return b;
  }
  function ec(b) {
    return b.constant;
  }
  function Oa(b, a, c, d) {
    sa(b, d);
    a = a.split(".");
    for (var e, f = 0; 1 < a.length; f++) {
      e = ra(a.shift(), d);
      var g = sa(b[e], d);
      g || ((g = {}), (b[e] = g));
      b = g;
    }
    e = ra(a.shift(), d);
    sa(b[e], d);
    return (b[e] = c);
  }
  function Pa(b) {
    return "constructor" == b;
  }
  function ad(b, a, c, d, e, f, g) {
    ra(b, f);
    ra(a, f);
    ra(c, f);
    ra(d, f);
    ra(e, f);
    var h = function (a) {
        return sa(a, f);
      },
      k = g || Pa(b) ? h : oa,
      l = g || Pa(a) ? h : oa,
      m = g || Pa(c) ? h : oa,
      p = g || Pa(d) ? h : oa,
      s = g || Pa(e) ? h : oa;
    return function (f, g) {
      var h = g && g.hasOwnProperty(b) ? g : f;
      if (null == h) return h;
      h = k(h[b]);
      if (!a) return h;
      if (null == h) return u;
      h = l(h[a]);
      if (!c) return h;
      if (null == h) return u;
      h = m(h[c]);
      if (!d) return h;
      if (null == h) return u;
      h = p(h[d]);
      return e ? (null == h ? u : (h = s(h[e]))) : h;
    };
  }
  function vf(b, a) {
    return function (c, d) {
      return b(c, d, sa, a);
    };
  }
  function bd(b, a, c) {
    var d = a.expensiveChecks,
      e = d ? wf : xf,
      f = e[b];
    if (f) return f;
    var g = b.split("."),
      h = g.length;
    if (a.csp)
      f =
        6 > h
          ? ad(g[0], g[1], g[2], g[3], g[4], c, d)
          : function (a, b) {
              var e = 0,
                f;
              do
                (f = ad(g[e++], g[e++], g[e++], g[e++], g[e++], c, d)(a, b)),
                  (b = u),
                  (a = f);
              while (e < h);
              return f;
            };
    else {
      var k = "";
      d && (k += "s = eso(s, fe);\nl = eso(l, fe);\n");
      var l = d;
      r(g, function (a, b) {
        ra(a, c);
        var e =
          (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a;
        if (d || Pa(a)) (e = "eso(" + e + ", fe)"), (l = !0);
        k += "if(s == null) return undefined;\ns=" + e + ";\n";
      });
      k += "return s;";
      a = new Function("s", "l", "eso", "fe", k);
      a.toString = ca(k);
      l && (a = vf(a, c));
      f = a;
    }
    f.sharedGetter = !0;
    f.assign = function (a, c) {
      return Oa(a, b, c, b);
    };
    return (e[b] = f);
  }
  function fc(b) {
    return F(b.valueOf) ? b.valueOf() : yf.call(b);
  }
  function Le() {
    var b = ia(),
      a = ia();
    this.$get = [
      "$filter",
      "$sniffer",
      function (c, d) {
        function e(a) {
          var b = a;
          a.sharedGetter &&
            ((b = function (b, c) {
              return a(b, c);
            }),
            (b.literal = a.literal),
            (b.constant = a.constant),
            (b.assign = a.assign));
          return b;
        }
        function f(a, b) {
          for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c];
            e.constant ||
              (e.inputs ? f(e.inputs, b) : -1 === b.indexOf(e) && b.push(e));
          }
          return b;
        }
        function g(a, b) {
          return null == a || null == b
            ? a === b
            : "object" === typeof a && ((a = fc(a)), "object" === typeof a)
            ? !1
            : a === b || (a !== a && b !== b);
        }
        function h(a, b, c, d) {
          var e = d.$$inputs || (d.$$inputs = f(d.inputs, [])),
            h;
          if (1 === e.length) {
            var k = g,
              e = e[0];
            return a.$watch(
              function (a) {
                var b = e(a);
                g(b, k) || ((h = d(a)), (k = b && fc(b)));
                return h;
              },
              b,
              c
            );
          }
          for (var l = [], s = 0, m = e.length; s < m; s++) l[s] = g;
          return a.$watch(
            function (a) {
              for (var b = !1, c = 0, f = e.length; c < f; c++) {
                var k = e[c](a);
                if (b || (b = !g(k, l[c]))) l[c] = k && fc(k);
              }
              b && (h = d(a));
              return h;
            },
            b,
            c
          );
        }
        function k(a, b, c, d) {
          var e, f;
          return (e = a.$watch(
            function (a) {
              return d(a);
            },
            function (a, c, d) {
              f = a;
              F(b) && b.apply(this, arguments);
              y(a) &&
                d.$$postDigest(function () {
                  y(f) && e();
                });
            },
            c
          ));
        }
        function l(a, b, c, d) {
          function e(a) {
            var b = !0;
            r(a, function (a) {
              y(a) || (b = !1);
            });
            return b;
          }
          var f, g;
          return (f = a.$watch(
            function (a) {
              return d(a);
            },
            function (a, c, d) {
              g = a;
              F(b) && b.call(this, a, c, d);
              e(a) &&
                d.$$postDigest(function () {
                  e(g) && f();
                });
            },
            c
          ));
        }
        function m(a, b, c, d) {
          var e;
          return (e = a.$watch(
            function (a) {
              return d(a);
            },
            function (a, c, d) {
              F(b) && b.apply(this, arguments);
              e();
            },
            c
          ));
        }
        function p(a, b) {
          if (!b) return a;
          var c = a.$$watchDelegate,
            c =
              c !== l && c !== k
                ? function (c, d) {
                    var e = a(c, d);
                    return b(e, c, d);
                  }
                : function (c, d) {
                    var e = a(c, d),
                      f = b(e, c, d);
                    return y(e) ? f : e;
                  };
          a.$$watchDelegate && a.$$watchDelegate !== h
            ? (c.$$watchDelegate = a.$$watchDelegate)
            : b.$stateful || ((c.$$watchDelegate = h), (c.inputs = [a]));
          return c;
        }
        var s = { csp: d.csp, expensiveChecks: !1 },
          t = { csp: d.csp, expensiveChecks: !0 };
        return function (d, f, g) {
          var v, w, O;
          switch (typeof d) {
            case "string":
              O = d = d.trim();
              var E = g ? a : b;
              v = E[O];
              v ||
                (":" === d.charAt(0) &&
                  ":" === d.charAt(1) &&
                  ((w = !0), (d = d.substring(2))),
                (g = g ? t : s),
                (v = new gc(g)),
                (v = new fb(v, c, g).parse(d)),
                v.constant
                  ? (v.$$watchDelegate = m)
                  : w
                  ? ((v = e(v)), (v.$$watchDelegate = v.literal ? l : k))
                  : v.inputs && (v.$$watchDelegate = h),
                (E[O] = v));
              return p(v, f);
            case "function":
              return p(d, f);
            default:
              return p(x, f);
          }
        };
      },
    ];
  }
  function Ne() {
    this.$get = [
      "$rootScope",
      "$exceptionHandler",
      function (b, a) {
        return cd(function (a) {
          b.$evalAsync(a);
        }, a);
      },
    ];
  }
  function Oe() {
    this.$get = [
      "$browser",
      "$exceptionHandler",
      function (b, a) {
        return cd(function (a) {
          b.defer(a);
        }, a);
      },
    ];
  }
  function cd(b, a) {
    function c(a, b, c) {
      function d(b) {
        return function (c) {
          e || ((e = !0), b.call(a, c));
        };
      }
      var e = !1;
      return [d(b), d(c)];
    }
    function d() {
      this.$$state = { status: 0 };
    }
    function e(a, b) {
      return function (c) {
        b.call(a, c);
      };
    }
    function f(c) {
      !c.processScheduled &&
        c.pending &&
        ((c.processScheduled = !0),
        b(function () {
          var b, d, e;
          e = c.pending;
          c.processScheduled = !1;
          c.pending = u;
          for (var f = 0, g = e.length; f < g; ++f) {
            d = e[f][0];
            b = e[f][c.status];
            try {
              F(b)
                ? d.resolve(b(c.value))
                : 1 === c.status
                ? d.resolve(c.value)
                : d.reject(c.value);
            } catch (h) {
              d.reject(h), a(h);
            }
          }
        }));
    }
    function g() {
      this.promise = new d();
      this.resolve = e(this, this.resolve);
      this.reject = e(this, this.reject);
      this.notify = e(this, this.notify);
    }
    var h = z("$q", TypeError);
    d.prototype = {
      then: function (a, b, c) {
        var d = new g();
        this.$$state.pending = this.$$state.pending || [];
        this.$$state.pending.push([d, a, b, c]);
        0 < this.$$state.status && f(this.$$state);
        return d.promise;
      },
      catch: function (a) {
        return this.then(null, a);
      },
      finally: function (a, b) {
        return this.then(
          function (b) {
            return l(b, !0, a);
          },
          function (b) {
            return l(b, !1, a);
          },
          b
        );
      },
    };
    g.prototype = {
      resolve: function (a) {
        this.promise.$$state.status ||
          (a === this.promise
            ? this.$$reject(h("qcycle", a))
            : this.$$resolve(a));
      },
      $$resolve: function (b) {
        var d, e;
        e = c(this, this.$$resolve, this.$$reject);
        try {
          if (K(b) || F(b)) d = b && b.then;
          F(d)
            ? ((this.promise.$$state.status = -1),
              d.call(b, e[0], e[1], this.notify))
            : ((this.promise.$$state.value = b),
              (this.promise.$$state.status = 1),
              f(this.promise.$$state));
        } catch (g) {
          e[1](g), a(g);
        }
      },
      reject: function (a) {
        this.promise.$$state.status || this.$$reject(a);
      },
      $$reject: function (a) {
        this.promise.$$state.value = a;
        this.promise.$$state.status = 2;
        f(this.promise.$$state);
      },
      notify: function (c) {
        var d = this.promise.$$state.pending;
        0 >= this.promise.$$state.status &&
          d &&
          d.length &&
          b(function () {
            for (var b, e, f = 0, g = d.length; f < g; f++) {
              e = d[f][0];
              b = d[f][3];
              try {
                e.notify(F(b) ? b(c) : c);
              } catch (h) {
                a(h);
              }
            }
          });
      },
    };
    var k = function (a, b) {
        var c = new g();
        b ? c.resolve(a) : c.reject(a);
        return c.promise;
      },
      l = function (a, b, c) {
        var d = null;
        try {
          F(c) && (d = c());
        } catch (e) {
          return k(e, !1);
        }
        return d && F(d.then)
          ? d.then(
              function () {
                return k(a, b);
              },
              function (a) {
                return k(a, !1);
              }
            )
          : k(a, b);
      },
      m = function (a, b, c, d) {
        var e = new g();
        e.resolve(a);
        return e.promise.then(b, c, d);
      },
      p = function t(a) {
        if (!F(a)) throw h("norslvr", a);
        if (!(this instanceof t)) return new t(a);
        var b = new g();
        a(
          function (a) {
            b.resolve(a);
          },
          function (a) {
            b.reject(a);
          }
        );
        return b.promise;
      };
    p.defer = function () {
      return new g();
    };
    p.reject = function (a) {
      var b = new g();
      b.reject(a);
      return b.promise;
    };
    p.when = m;
    p.all = function (a) {
      var b = new g(),
        c = 0,
        d = D(a) ? [] : {};
      r(a, function (a, e) {
        c++;
        m(a).then(
          function (a) {
            d.hasOwnProperty(e) || ((d[e] = a), --c || b.resolve(d));
          },
          function (a) {
            d.hasOwnProperty(e) || b.reject(a);
          }
        );
      });
      0 === c && b.resolve(d);
      return b.promise;
    };
    return p;
  }
  function Xe() {
    this.$get = [
      "$window",
      "$timeout",
      function (b, a) {
        var c =
            b.requestAnimationFrame ||
            b.webkitRequestAnimationFrame ||
            b.mozRequestAnimationFrame,
          d =
            b.cancelAnimationFrame ||
            b.webkitCancelAnimationFrame ||
            b.mozCancelAnimationFrame ||
            b.webkitCancelRequestAnimationFrame,
          e = !!c,
          f = e
            ? function (a) {
                var b = c(a);
                return function () {
                  d(b);
                };
              }
            : function (b) {
                var c = a(b, 16.66, !1);
                return function () {
                  a.cancel(c);
                };
              };
        f.supported = e;
        return f;
      },
    ];
  }
  function Me() {
    var b = 10,
      a = z("$rootScope"),
      c = null,
      d = null;
    this.digestTtl = function (a) {
      arguments.length && (b = a);
      return b;
    };
    this.$get = [
      "$injector",
      "$exceptionHandler",
      "$parse",
      "$browser",
      function (e, f, g, h) {
        function k() {
          this.$id = ++kb;
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this.$root = this;
          this.$$destroyed = !1;
          this.$$listeners = {};
          this.$$listenerCount = {};
          this.$$isolateBindings = null;
        }
        function l(b) {
          if (q.$$phase) throw a("inprog", q.$$phase);
          q.$$phase = b;
        }
        function m(a, b, c) {
          do
            (a.$$listenerCount[c] -= b),
              0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
          while ((a = a.$parent));
        }
        function p() {}
        function s() {
          for (; v.length; )
            try {
              v.shift()();
            } catch (a) {
              f(a);
            }
          d = null;
        }
        function t() {
          null === d &&
            (d = h.defer(function () {
              q.$apply(s);
            }));
        }
        k.prototype = {
          constructor: k,
          $new: function (a, b) {
            function c() {
              d.$$destroyed = !0;
            }
            var d;
            b = b || this;
            a
              ? ((d = new k()), (d.$root = this.$root))
              : (this.$$ChildScope ||
                  ((this.$$ChildScope = function () {
                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                    this.$$listeners = {};
                    this.$$listenerCount = {};
                    this.$id = ++kb;
                    this.$$ChildScope = null;
                  }),
                  (this.$$ChildScope.prototype = this)),
                (d = new this.$$ChildScope()));
            d.$parent = b;
            d.$$prevSibling = b.$$childTail;
            b.$$childHead
              ? ((b.$$childTail.$$nextSibling = d), (b.$$childTail = d))
              : (b.$$childHead = b.$$childTail = d);
            (a || b != this) && d.$on("$destroy", c);
            return d;
          },
          $watch: function (a, b, d) {
            var e = g(a);
            if (e.$$watchDelegate) return e.$$watchDelegate(this, b, d, e);
            var f = this.$$watchers,
              h = { fn: b, last: p, get: e, exp: a, eq: !!d };
            c = null;
            F(b) || (h.fn = x);
            f || (f = this.$$watchers = []);
            f.unshift(h);
            return function () {
              Va(f, h);
              c = null;
            };
          },
          $watchGroup: function (a, b) {
            function c() {
              h = !1;
              k ? ((k = !1), b(e, e, g)) : b(e, d, g);
            }
            var d = Array(a.length),
              e = Array(a.length),
              f = [],
              g = this,
              h = !1,
              k = !0;
            if (!a.length) {
              var l = !0;
              g.$evalAsync(function () {
                l && b(e, e, g);
              });
              return function () {
                l = !1;
              };
            }
            if (1 === a.length)
              return this.$watch(a[0], function (a, c, f) {
                e[0] = a;
                d[0] = c;
                b(e, a === c ? e : d, f);
              });
            r(a, function (a, b) {
              var k = g.$watch(a, function (a, f) {
                e[b] = a;
                d[b] = f;
                h || ((h = !0), g.$evalAsync(c));
              });
              f.push(k);
            });
            return function () {
              for (; f.length; ) f.shift()();
            };
          },
          $watchCollection: function (a, b) {
            function c(a) {
              e = a;
              var b, d, g, h;
              if (!G(e)) {
                if (K(e))
                  if (Ra(e))
                    for (
                      f !== p && ((f = p), (n = f.length = 0), l++),
                        a = e.length,
                        n !== a && (l++, (f.length = n = a)),
                        b = 0;
                      b < a;
                      b++
                    )
                      (h = f[b]),
                        (g = e[b]),
                        (d = h !== h && g !== g),
                        d || h === g || (l++, (f[b] = g));
                  else {
                    f !== s && ((f = s = {}), (n = 0), l++);
                    a = 0;
                    for (b in e)
                      e.hasOwnProperty(b) &&
                        (a++,
                        (g = e[b]),
                        (h = f[b]),
                        b in f
                          ? ((d = h !== h && g !== g),
                            d || h === g || (l++, (f[b] = g)))
                          : (n++, (f[b] = g), l++));
                    if (n > a)
                      for (b in (l++, f))
                        e.hasOwnProperty(b) || (n--, delete f[b]);
                  }
                else f !== e && ((f = e), l++);
                return l;
              }
            }
            c.$stateful = !0;
            var d = this,
              e,
              f,
              h,
              k = 1 < b.length,
              l = 0,
              m = g(a, c),
              p = [],
              s = {},
              q = !0,
              n = 0;
            return this.$watch(m, function () {
              q ? ((q = !1), b(e, e, d)) : b(e, h, d);
              if (k)
                if (K(e))
                  if (Ra(e)) {
                    h = Array(e.length);
                    for (var a = 0; a < e.length; a++) h[a] = e[a];
                  } else
                    for (a in ((h = {}), e)) Jb.call(e, a) && (h[a] = e[a]);
                else h = e;
            });
          },
          $digest: function () {
            var e,
              g,
              k,
              m,
              t,
              v,
              r = b,
              L,
              u = [],
              y,
              Q;
            l("$digest");
            h.$$checkUrlChange();
            this === q && null !== d && (h.defer.cancel(d), s());
            c = null;
            do {
              v = !1;
              for (L = this; N.length; ) {
                try {
                  (Q = N.shift()), Q.scope.$eval(Q.expression);
                } catch (z) {
                  f(z);
                }
                c = null;
              }
              a: do {
                if ((m = L.$$watchers))
                  for (t = m.length; t--; )
                    try {
                      if ((e = m[t]))
                        if (
                          (g = e.get(L)) !== (k = e.last) &&
                          !(e.eq
                            ? pa(g, k)
                            : "number" === typeof g &&
                              "number" === typeof k &&
                              isNaN(g) &&
                              isNaN(k))
                        )
                          (v = !0),
                            (c = e),
                            (e.last = e.eq ? Ca(g, null) : g),
                            e.fn(g, k === p ? g : k, L),
                            5 > r &&
                              ((y = 4 - r),
                              u[y] || (u[y] = []),
                              u[y].push({
                                msg: F(e.exp)
                                  ? "fn: " + (e.exp.name || e.exp.toString())
                                  : e.exp,
                                newVal: g,
                                oldVal: k,
                              }));
                        else if (e === c) {
                          v = !1;
                          break a;
                        }
                    } catch (A) {
                      f(A);
                    }
                if (!(m = L.$$childHead || (L !== this && L.$$nextSibling)))
                  for (; L !== this && !(m = L.$$nextSibling); ) L = L.$parent;
              } while ((L = m));
              if ((v || N.length) && !r--)
                throw ((q.$$phase = null), a("infdig", b, u));
            } while (v || N.length);
            for (q.$$phase = null; n.length; )
              try {
                n.shift()();
              } catch (da) {
                f(da);
              }
          },
          $destroy: function () {
            if (!this.$$destroyed) {
              var a = this.$parent;
              this.$broadcast("$destroy");
              this.$$destroyed = !0;
              if (this !== q) {
                for (var b in this.$$listenerCount)
                  m(this, this.$$listenerCount[b], b);
                a.$$childHead == this && (a.$$childHead = this.$$nextSibling);
                a.$$childTail == this && (a.$$childTail = this.$$prevSibling);
                this.$$prevSibling &&
                  (this.$$prevSibling.$$nextSibling = this.$$nextSibling);
                this.$$nextSibling &&
                  (this.$$nextSibling.$$prevSibling = this.$$prevSibling);
                this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = x;
                this.$on = this.$watch = this.$watchGroup = function () {
                  return x;
                };
                this.$$listeners = {};
                this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
              }
            }
          },
          $eval: function (a, b) {
            return g(a)(this, b);
          },
          $evalAsync: function (a) {
            q.$$phase ||
              N.length ||
              h.defer(function () {
                N.length && q.$digest();
              });
            N.push({ scope: this, expression: a });
          },
          $$postDigest: function (a) {
            n.push(a);
          },
          $apply: function (a) {
            try {
              return l("$apply"), this.$eval(a);
            } catch (b) {
              f(b);
            } finally {
              q.$$phase = null;
              try {
                q.$digest();
              } catch (c) {
                throw (f(c), c);
              }
            }
          },
          $applyAsync: function (a) {
            function b() {
              c.$eval(a);
            }
            var c = this;
            a && v.push(b);
            t();
          },
          $on: function (a, b) {
            var c = this.$$listeners[a];
            c || (this.$$listeners[a] = c = []);
            c.push(b);
            var d = this;
            do
              d.$$listenerCount[a] || (d.$$listenerCount[a] = 0),
                d.$$listenerCount[a]++;
            while ((d = d.$parent));
            var e = this;
            return function () {
              var d = c.indexOf(b);
              -1 !== d && ((c[d] = null), m(e, 1, a));
            };
          },
          $emit: function (a, b) {
            var c = [],
              d,
              e = this,
              g = !1,
              h = {
                name: a,
                targetScope: e,
                stopPropagation: function () {
                  g = !0;
                },
                preventDefault: function () {
                  h.defaultPrevented = !0;
                },
                defaultPrevented: !1,
              },
              k = Xa([h], arguments, 1),
              l,
              m;
            do {
              d = e.$$listeners[a] || c;
              h.currentScope = e;
              l = 0;
              for (m = d.length; l < m; l++)
                if (d[l])
                  try {
                    d[l].apply(null, k);
                  } catch (p) {
                    f(p);
                  }
                else d.splice(l, 1), l--, m--;
              if (g) return (h.currentScope = null), h;
              e = e.$parent;
            } while (e);
            h.currentScope = null;
            return h;
          },
          $broadcast: function (a, b) {
            var c = this,
              d = this,
              e = {
                name: a,
                targetScope: this,
                preventDefault: function () {
                  e.defaultPrevented = !0;
                },
                defaultPrevented: !1,
              };
            if (!this.$$listenerCount[a]) return e;
            for (var g = Xa([e], arguments, 1), h, k; (c = d); ) {
              e.currentScope = c;
              d = c.$$listeners[a] || [];
              h = 0;
              for (k = d.length; h < k; h++)
                if (d[h])
                  try {
                    d[h].apply(null, g);
                  } catch (l) {
                    f(l);
                  }
                else d.splice(h, 1), h--, k--;
              if (
                !(d =
                  (c.$$listenerCount[a] && c.$$childHead) ||
                  (c !== this && c.$$nextSibling))
              )
                for (; c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
            }
            e.currentScope = null;
            return e;
          },
        };
        var q = new k(),
          N = (q.$$asyncQueue = []),
          n = (q.$$postDigestQueue = []),
          v = (q.$$applyAsyncQueue = []);
        return q;
      },
    ];
  }
  function Pd() {
    var b = /^\s*(https?|ftp|mailto|tel|file):/,
      a = /^\s*((https?|ftp|file|blob):|data:image\/)/;
    this.aHrefSanitizationWhitelist = function (a) {
      return y(a) ? ((b = a), this) : b;
    };
    this.imgSrcSanitizationWhitelist = function (b) {
      return y(b) ? ((a = b), this) : a;
    };
    this.$get = function () {
      return function (c, d) {
        var e = d ? a : b,
          f;
        f = Aa(c).href;
        return "" === f || f.match(e) ? c : "unsafe:" + f;
      };
    };
  }
  function zf(b) {
    if ("self" === b) return b;
    if (I(b)) {
      if (-1 < b.indexOf("***")) throw Ba("iwcard", b);
      b = dd(b).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
      return new RegExp("^" + b + "$");
    }
    if (lb(b)) return new RegExp("^" + b.source + "$");
    throw Ba("imatcher");
  }
  function ed(b) {
    var a = [];
    y(b) &&
      r(b, function (b) {
        a.push(zf(b));
      });
    return a;
  }
  function Qe() {
    this.SCE_CONTEXTS = ma;
    var b = ["self"],
      a = [];
    this.resourceUrlWhitelist = function (a) {
      arguments.length && (b = ed(a));
      return b;
    };
    this.resourceUrlBlacklist = function (b) {
      arguments.length && (a = ed(b));
      return a;
    };
    this.$get = [
      "$injector",
      function (c) {
        function d(a, b) {
          return "self" === a ? Wc(b) : !!a.exec(b.href);
        }
        function e(a) {
          var b = function (a) {
            this.$$unwrapTrustedValue = function () {
              return a;
            };
          };
          a && (b.prototype = new a());
          b.prototype.valueOf = function () {
            return this.$$unwrapTrustedValue();
          };
          b.prototype.toString = function () {
            return this.$$unwrapTrustedValue().toString();
          };
          return b;
        }
        var f = function (a) {
          throw Ba("unsafe");
        };
        c.has("$sanitize") && (f = c.get("$sanitize"));
        var g = e(),
          h = {};
        h[ma.HTML] = e(g);
        h[ma.CSS] = e(g);
        h[ma.URL] = e(g);
        h[ma.JS] = e(g);
        h[ma.RESOURCE_URL] = e(h[ma.URL]);
        return {
          trustAs: function (a, b) {
            var c = h.hasOwnProperty(a) ? h[a] : null;
            if (!c) throw Ba("icontext", a, b);
            if (null === b || b === u || "" === b) return b;
            if ("string" !== typeof b) throw Ba("itype", a);
            return new c(b);
          },
          getTrusted: function (c, e) {
            if (null === e || e === u || "" === e) return e;
            var g = h.hasOwnProperty(c) ? h[c] : null;
            if (g && e instanceof g) return e.$$unwrapTrustedValue();
            if (c === ma.RESOURCE_URL) {
              var g = Aa(e.toString()),
                p,
                s,
                t = !1;
              p = 0;
              for (s = b.length; p < s; p++)
                if (d(b[p], g)) {
                  t = !0;
                  break;
                }
              if (t)
                for (p = 0, s = a.length; p < s; p++)
                  if (d(a[p], g)) {
                    t = !1;
                    break;
                  }
              if (t) return e;
              throw Ba("insecurl", e.toString());
            }
            if (c === ma.HTML) return f(e);
            throw Ba("unsafe");
          },
          valueOf: function (a) {
            return a instanceof g ? a.$$unwrapTrustedValue() : a;
          },
        };
      },
    ];
  }
  function Pe() {
    var b = !0;
    this.enabled = function (a) {
      arguments.length && (b = !!a);
      return b;
    };
    this.$get = [
      "$parse",
      "$sceDelegate",
      function (a, c) {
        if (b && 8 > Ha) throw Ba("iequirks");
        var d = ua(ma);
        d.isEnabled = function () {
          return b;
        };
        d.trustAs = c.trustAs;
        d.getTrusted = c.getTrusted;
        d.valueOf = c.valueOf;
        b ||
          ((d.trustAs = d.getTrusted = function (a, b) {
            return b;
          }),
          (d.valueOf = oa));
        d.parseAs = function (b, c) {
          var e = a(c);
          return e.literal && e.constant
            ? e
            : a(c, function (a) {
                return d.getTrusted(b, a);
              });
        };
        var e = d.parseAs,
          f = d.getTrusted,
          g = d.trustAs;
        r(ma, function (a, b) {
          var c = R(b);
          d[bb("parse_as_" + c)] = function (b) {
            return e(a, b);
          };
          d[bb("get_trusted_" + c)] = function (b) {
            return f(a, b);
          };
          d[bb("trust_as_" + c)] = function (b) {
            return g(a, b);
          };
        });
        return d;
      },
    ];
  }
  function Re() {
    this.$get = [
      "$window",
      "$document",
      function (b, a) {
        var c = {},
          d = $(
            (/android (\d+)/.exec(R((b.navigator || {}).userAgent)) || [])[1]
          ),
          e = /Boxee/i.test((b.navigator || {}).userAgent),
          f = a[0] || {},
          g,
          h = /^(Moz|webkit|ms)(?=[A-Z])/,
          k = f.body && f.body.style,
          l = !1,
          m = !1;
        if (k) {
          for (var p in k)
            if ((l = h.exec(p))) {
              g = l[0];
              g = g.substr(0, 1).toUpperCase() + g.substr(1);
              break;
            }
          g || (g = "WebkitOpacity" in k && "webkit");
          l = !!("transition" in k || g + "Transition" in k);
          m = !!("animation" in k || g + "Animation" in k);
          !d ||
            (l && m) ||
            ((l = I(f.body.style.webkitTransition)),
            (m = I(f.body.style.webkitAnimation)));
        }
        return {
          history: !(!b.history || !b.history.pushState || 4 > d || e),
          hasEvent: function (a) {
            if ("input" == a && 9 == Ha) return !1;
            if (G(c[a])) {
              var b = f.createElement("div");
              c[a] = "on" + a in b;
            }
            return c[a];
          },
          csp: $a(),
          vendorPrefix: g,
          transitions: l,
          animations: m,
          android: d,
        };
      },
    ];
  }
  function Te() {
    this.$get = [
      "$templateCache",
      "$http",
      "$q",
      function (b, a, c) {
        function d(e, f) {
          d.totalPendingRequests++;
          var g = a.defaults && a.defaults.transformResponse;
          if (D(g))
            for (var h = g, g = [], k = 0; k < h.length; ++k) {
              var l = h[k];
              l !== Yb && g.push(l);
            }
          else g === Yb && (g = null);
          return a.get(e, { cache: b, transformResponse: g }).then(
            function (a) {
              a = a.data;
              d.totalPendingRequests--;
              b.put(e, a);
              return a;
            },
            function () {
              d.totalPendingRequests--;
              if (!f) throw ka("tpload", e);
              return c.reject();
            }
          );
        }
        d.totalPendingRequests = 0;
        return d;
      },
    ];
  }
  function Ue() {
    this.$get = [
      "$rootScope",
      "$browser",
      "$location",
      function (b, a, c) {
        return {
          findBindings: function (a, b, c) {
            a = a.getElementsByClassName("ng-binding");
            var g = [];
            r(a, function (a) {
              var d = ha.element(a).data("$binding");
              d &&
                r(d, function (d) {
                  c
                    ? new RegExp("(^|\\s)" + dd(b) + "(\\s|\\||$)").test(d) &&
                      g.push(a)
                    : -1 != d.indexOf(b) && g.push(a);
                });
            });
            return g;
          },
          findModels: function (a, b, c) {
            for (
              var g = ["ng-", "data-ng-", "ng\\:"], h = 0;
              h < g.length;
              ++h
            ) {
              var k = a.querySelectorAll(
                "[" + g[h] + "model" + (c ? "=" : "*=") + '"' + b + '"]'
              );
              if (k.length) return k;
            }
          },
          getLocation: function () {
            return c.url();
          },
          setLocation: function (a) {
            a !== c.url() && (c.url(a), b.$digest());
          },
          whenStable: function (b) {
            a.notifyWhenNoOutstandingRequests(b);
          },
        };
      },
    ];
  }
  function Ve() {
    this.$get = [
      "$rootScope",
      "$browser",
      "$q",
      "$$q",
      "$exceptionHandler",
      function (b, a, c, d, e) {
        function f(f, k, l) {
          var m = y(l) && !l,
            p = (m ? d : c).defer(),
            s = p.promise;
          k = a.defer(function () {
            try {
              p.resolve(f());
            } catch (a) {
              p.reject(a), e(a);
            } finally {
              delete g[s.$$timeoutId];
            }
            m || b.$apply();
          }, k);
          s.$$timeoutId = k;
          g[k] = p;
          return s;
        }
        var g = {};
        f.cancel = function (b) {
          return b && b.$$timeoutId in g
            ? (g[b.$$timeoutId].reject("canceled"),
              delete g[b.$$timeoutId],
              a.defer.cancel(b.$$timeoutId))
            : !1;
        };
        return f;
      },
    ];
  }
  function Aa(b) {
    Ha && (Y.setAttribute("href", b), (b = Y.href));
    Y.setAttribute("href", b);
    return {
      href: Y.href,
      protocol: Y.protocol ? Y.protocol.replace(/:$/, "") : "",
      host: Y.host,
      search: Y.search ? Y.search.replace(/^\?/, "") : "",
      hash: Y.hash ? Y.hash.replace(/^#/, "") : "",
      hostname: Y.hostname,
      port: Y.port,
      pathname: "/" === Y.pathname.charAt(0) ? Y.pathname : "/" + Y.pathname,
    };
  }
  function Wc(b) {
    b = I(b) ? Aa(b) : b;
    return b.protocol === fd.protocol && b.host === fd.host;
  }
  function We() {
    this.$get = ca(U);
  }
  function Bc(b) {
    function a(c, d) {
      if (K(c)) {
        var e = {};
        r(c, function (b, c) {
          e[c] = a(c, b);
        });
        return e;
      }
      return b.factory(c + "Filter", d);
    }
    this.register = a;
    this.$get = [
      "$injector",
      function (a) {
        return function (b) {
          return a.get(b + "Filter");
        };
      },
    ];
    a("currency", gd);
    a("date", hd);
    a("filter", Af);
    a("json", Bf);
    a("limitTo", Cf);
    a("lowercase", Df);
    a("number", id);
    a("orderBy", jd);
    a("uppercase", Ef);
  }
  function Af() {
    return function (b, a, c) {
      if (!D(b)) return b;
      var d = typeof c,
        e = [];
      e.check = function (a, b) {
        for (var c = 0; c < e.length; c++) if (!e[c](a, b)) return !1;
        return !0;
      };
      "function" !== d &&
        (c =
          "boolean" === d && c
            ? function (a, b) {
                return ha.equals(a, b);
              }
            : function (a, b) {
                if (a && b && "object" === typeof a && "object" === typeof b) {
                  for (var d in a)
                    if ("$" !== d.charAt(0) && Jb.call(a, d) && c(a[d], b[d]))
                      return !0;
                  return !1;
                }
                b = ("" + b).toLowerCase();
                return -1 < ("" + a).toLowerCase().indexOf(b);
              });
      var f = function (a, b) {
        if ("string" === typeof b && "!" === b.charAt(0))
          return !f(a, b.substr(1));
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
            return c(a, b);
          case "object":
            switch (typeof b) {
              case "object":
                return c(a, b);
              default:
                for (var d in a)
                  if ("$" !== d.charAt(0) && f(a[d], b)) return !0;
            }
            return !1;
          case "array":
            for (d = 0; d < a.length; d++) if (f(a[d], b)) return !0;
            return !1;
          default:
            return !1;
        }
      };
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
          a = { $: a };
        case "object":
          for (var g in a)
            (function (b) {
              "undefined" !== typeof a[b] &&
                e.push(function (c) {
                  return f("$" == b ? c : c && c[b], a[b]);
                });
            })(g);
          break;
        case "function":
          e.push(a);
          break;
        default:
          return b;
      }
      d = [];
      for (g = 0; g < b.length; g++) {
        var h = b[g];
        e.check(h, g) && d.push(h);
      }
      return d;
    };
  }
  function gd(b) {
    var a = b.NUMBER_FORMATS;
    return function (b, d, e) {
      G(d) && (d = a.CURRENCY_SYM);
      G(e) && (e = a.PATTERNS[1].maxFrac);
      return null == b
        ? b
        : kd(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, e).replace(
            /\u00A4/g,
            d
          );
    };
  }
  function id(b) {
    var a = b.NUMBER_FORMATS;
    return function (b, d) {
      return null == b
        ? b
        : kd(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
    };
  }
  function kd(b, a, c, d, e) {
    if (!isFinite(b) || K(b)) return "";
    var f = 0 > b;
    b = Math.abs(b);
    var g = b + "",
      h = "",
      k = [],
      l = !1;
    if (-1 !== g.indexOf("e")) {
      var m = g.match(/([\d\.]+)e(-?)(\d+)/);
      m && "-" == m[2] && m[3] > e + 1
        ? ((g = "0"), (b = 0))
        : ((h = g), (l = !0));
    }
    if (l) 0 < e && -1 < b && 1 > b && (h = b.toFixed(e));
    else {
      g = (g.split(ld)[1] || "").length;
      G(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac));
      b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e);
      0 === b && (f = !1);
      b = ("" + b).split(ld);
      g = b[0];
      b = b[1] || "";
      var m = 0,
        p = a.lgSize,
        s = a.gSize;
      if (g.length >= p + s)
        for (m = g.length - p, l = 0; l < m; l++)
          0 === (m - l) % s && 0 !== l && (h += c), (h += g.charAt(l));
      for (l = m; l < g.length; l++)
        0 === (g.length - l) % p && 0 !== l && (h += c), (h += g.charAt(l));
      for (; b.length < e; ) b += "0";
      e && "0" !== e && (h += d + b.substr(0, e));
    }
    k.push(f ? a.negPre : a.posPre, h, f ? a.negSuf : a.posSuf);
    return k.join("");
  }
  function Cb(b, a, c) {
    var d = "";
    0 > b && ((d = "-"), (b = -b));
    for (b = "" + b; b.length < a; ) b = "0" + b;
    c && (b = b.substr(b.length - a));
    return d + b;
  }
  function Z(b, a, c, d) {
    c = c || 0;
    return function (e) {
      e = e["get" + b]();
      if (0 < c || e > -c) e += c;
      0 === e && -12 == c && (e = 12);
      return Cb(e, a, d);
    };
  }
  function Db(b, a) {
    return function (c, d) {
      var e = c["get" + b](),
        f = rb(a ? "SHORT" + b : b);
      return d[f][e];
    };
  }
  function md(b) {
    var a = new Date(b, 0, 1).getDay();
    return new Date(b, 0, (4 >= a ? 5 : 12) - a);
  }
  function nd(b) {
    return function (a) {
      var c = md(a.getFullYear());
      a =
        +new Date(
          a.getFullYear(),
          a.getMonth(),
          a.getDate() + (4 - a.getDay())
        ) - +c;
      a = 1 + Math.round(a / 6048e5);
      return Cb(a, b);
    };
  }
  function hd(b) {
    function a(a) {
      var b;
      if ((b = a.match(c))) {
        a = new Date(0);
        var f = 0,
          g = 0,
          h = b[8] ? a.setUTCFullYear : a.setFullYear,
          k = b[8] ? a.setUTCHours : a.setHours;
        b[9] && ((f = $(b[9] + b[10])), (g = $(b[9] + b[11])));
        h.call(a, $(b[1]), $(b[2]) - 1, $(b[3]));
        f = $(b[4] || 0) - f;
        g = $(b[5] || 0) - g;
        h = $(b[6] || 0);
        b = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
        k.call(a, f, g, h, b);
      }
      return a;
    }
    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, e, f) {
      var g = "",
        h = [],
        k,
        l;
      e = e || "mediumDate";
      e = b.DATETIME_FORMATS[e] || e;
      I(c) && (c = Ff.test(c) ? $(c) : a(c));
      X(c) && (c = new Date(c));
      if (!fa(c)) return c;
      for (; e; )
        (l = Gf.exec(e))
          ? ((h = Xa(h, l, 1)), (e = h.pop()))
          : (h.push(e), (e = null));
      f &&
        "UTC" === f &&
        ((c = new Date(c.getTime())),
        c.setMinutes(c.getMinutes() + c.getTimezoneOffset()));
      r(h, function (a) {
        k = Hf[a];
        g += k
          ? k(c, b.DATETIME_FORMATS)
          : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
      });
      return g;
    };
  }
  function Bf() {
    return function (b) {
      return Za(b, !0);
    };
  }
  function Cf() {
    return function (b, a) {
      X(b) && (b = b.toString());
      if (!D(b) && !I(b)) return b;
      a = Infinity === Math.abs(Number(a)) ? Number(a) : $(a);
      if (I(b)) return a ? (0 <= a ? b.slice(0, a) : b.slice(a, b.length)) : "";
      var c = [],
        d,
        e;
      a > b.length ? (a = b.length) : a < -b.length && (a = -b.length);
      0 < a ? ((d = 0), (e = a)) : ((d = b.length + a), (e = b.length));
      for (; d < e; d++) c.push(b[d]);
      return c;
    };
  }
  function jd(b) {
    return function (a, c, d) {
      function e(a, b) {
        return b
          ? function (b, c) {
              return a(c, b);
            }
          : a;
      }
      function f(a, b) {
        var c = typeof a,
          d = typeof b;
        return c == d
          ? (fa(a) && fa(b) && ((a = a.valueOf()), (b = b.valueOf())),
            "string" == c && ((a = a.toLowerCase()), (b = b.toLowerCase())),
            a === b ? 0 : a < b ? -1 : 1)
          : c < d
          ? -1
          : 1;
      }
      if (!Ra(a)) return a;
      c = D(c) ? c : [c];
      0 === c.length && (c = ["+"]);
      c = c.map(function (a) {
        var c = !1,
          d = a || oa;
        if (I(a)) {
          if ("+" == a.charAt(0) || "-" == a.charAt(0))
            (c = "-" == a.charAt(0)), (a = a.substring(1));
          if ("" === a)
            return e(function (a, b) {
              return f(a, b);
            }, c);
          d = b(a);
          if (d.constant) {
            var l = d();
            return e(function (a, b) {
              return f(a[l], b[l]);
            }, c);
          }
        }
        return e(function (a, b) {
          return f(d(a), d(b));
        }, c);
      });
      return Ya.call(a).sort(
        e(function (a, b) {
          for (var d = 0; d < c.length; d++) {
            var e = c[d](a, b);
            if (0 !== e) return e;
          }
          return 0;
        }, d)
      );
    };
  }
  function Ia(b) {
    F(b) && (b = { link: b });
    b.restrict = b.restrict || "AC";
    return ca(b);
  }
  function od(b, a, c, d, e) {
    var f = this,
      g = [],
      h = (f.$$parentForm = b.parent().controller("form") || Eb);
    f.$error = {};
    f.$$success = {};
    f.$pending = u;
    f.$name = e(a.name || a.ngForm || "")(c);
    f.$dirty = !1;
    f.$pristine = !0;
    f.$valid = !0;
    f.$invalid = !1;
    f.$submitted = !1;
    h.$addControl(f);
    f.$rollbackViewValue = function () {
      r(g, function (a) {
        a.$rollbackViewValue();
      });
    };
    f.$commitViewValue = function () {
      r(g, function (a) {
        a.$commitViewValue();
      });
    };
    f.$addControl = function (a) {
      La(a.$name, "input");
      g.push(a);
      a.$name && (f[a.$name] = a);
    };
    f.$$renameControl = function (a, b) {
      var c = a.$name;
      f[c] === a && delete f[c];
      f[b] = a;
      a.$name = b;
    };
    f.$removeControl = function (a) {
      a.$name && f[a.$name] === a && delete f[a.$name];
      r(f.$pending, function (b, c) {
        f.$setValidity(c, null, a);
      });
      r(f.$error, function (b, c) {
        f.$setValidity(c, null, a);
      });
      Va(g, a);
    };
    pd({
      ctrl: this,
      $element: b,
      set: function (a, b, c) {
        var d = a[b];
        d ? -1 === d.indexOf(c) && d.push(c) : (a[b] = [c]);
      },
      unset: function (a, b, c) {
        var d = a[b];
        d && (Va(d, c), 0 === d.length && delete a[b]);
      },
      parentForm: h,
      $animate: d,
    });
    f.$setDirty = function () {
      d.removeClass(b, Qa);
      d.addClass(b, Fb);
      f.$dirty = !0;
      f.$pristine = !1;
      h.$setDirty();
    };
    f.$setPristine = function () {
      d.setClass(b, Qa, Fb + " ng-submitted");
      f.$dirty = !1;
      f.$pristine = !0;
      f.$submitted = !1;
      r(g, function (a) {
        a.$setPristine();
      });
    };
    f.$setUntouched = function () {
      r(g, function (a) {
        a.$setUntouched();
      });
    };
    f.$setSubmitted = function () {
      d.addClass(b, "ng-submitted");
      f.$submitted = !0;
      h.$setSubmitted();
    };
  }
  function hc(b) {
    b.$formatters.push(function (a) {
      return b.$isEmpty(a) ? a : a.toString();
    });
  }
  function gb(b, a, c, d, e, f) {
    var g = a[0].placeholder,
      h = {},
      k = R(a[0].type);
    if (!e.android) {
      var l = !1;
      a.on("compositionstart", function (a) {
        l = !0;
      });
      a.on("compositionend", function () {
        l = !1;
        m();
      });
    }
    var m = function (b) {
      if (!l) {
        var e = a.val(),
          f = b && b.type;
        Ha && "input" === (b || h).type && a[0].placeholder !== g
          ? (g = a[0].placeholder)
          : ("password" === k ||
              (c.ngTrim && "false" === c.ngTrim) ||
              (e = P(e)),
            (d.$viewValue !== e || ("" === e && d.$$hasNativeValidators)) &&
              d.$setViewValue(e, f));
      }
    };
    if (e.hasEvent("input")) a.on("input", m);
    else {
      var p,
        s = function (a) {
          p ||
            (p = f.defer(function () {
              m(a);
              p = null;
            }));
        };
      a.on("keydown", function (a) {
        var b = a.keyCode;
        91 === b || (15 < b && 19 > b) || (37 <= b && 40 >= b) || s(a);
      });
      if (e.hasEvent("paste")) a.on("paste cut", s);
    }
    a.on("change", m);
    d.$render = function () {
      a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
    };
  }
  function Gb(b, a) {
    return function (c, d) {
      var e, f;
      if (fa(c)) return c;
      if (I(c)) {
        '"' == c.charAt(0) &&
          '"' == c.charAt(c.length - 1) &&
          (c = c.substring(1, c.length - 1));
        if (If.test(c)) return new Date(c);
        b.lastIndex = 0;
        if ((e = b.exec(c)))
          return (
            e.shift(),
            (f = d
              ? {
                  yyyy: d.getFullYear(),
                  MM: d.getMonth() + 1,
                  dd: d.getDate(),
                  HH: d.getHours(),
                  mm: d.getMinutes(),
                  ss: d.getSeconds(),
                  sss: d.getMilliseconds() / 1e3,
                }
              : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }),
            r(e, function (b, c) {
              c < a.length && (f[a[c]] = +b);
            }),
            new Date(
              f.yyyy,
              f.MM - 1,
              f.dd,
              f.HH,
              f.mm,
              f.ss || 0,
              1e3 * f.sss || 0
            )
          );
      }
      return NaN;
    };
  }
  function hb(b, a, c, d) {
    return function (e, f, g, h, k, l, m) {
      function p(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime());
      }
      function s(a) {
        return y(a) ? (fa(a) ? a : c(a)) : u;
      }
      qd(e, f, g, h);
      gb(e, f, g, h, k, l);
      var t = h && h.$options && h.$options.timezone,
        q;
      h.$$parserName = b;
      h.$parsers.push(function (b) {
        return h.$isEmpty(b)
          ? null
          : a.test(b)
          ? ((b = c(b, q)),
            "UTC" === t && b.setMinutes(b.getMinutes() - b.getTimezoneOffset()),
            b)
          : u;
      });
      h.$formatters.push(function (a) {
        if (a && !fa(a)) throw Hb("datefmt", a);
        if (p(a)) {
          if ((q = a) && "UTC" === t) {
            var b = 6e4 * q.getTimezoneOffset();
            q = new Date(q.getTime() + b);
          }
          return m("date")(a, d, t);
        }
        q = null;
        return "";
      });
      if (y(g.min) || g.ngMin) {
        var r;
        h.$validators.min = function (a) {
          return !p(a) || G(r) || c(a) >= r;
        };
        g.$observe("min", function (a) {
          r = s(a);
          h.$validate();
        });
      }
      if (y(g.max) || g.ngMax) {
        var n;
        h.$validators.max = function (a) {
          return !p(a) || G(n) || c(a) <= n;
        };
        g.$observe("max", function (a) {
          n = s(a);
          h.$validate();
        });
      }
    };
  }
  function qd(b, a, c, d) {
    (d.$$hasNativeValidators = K(a[0].validity)) &&
      d.$parsers.push(function (b) {
        var c = a.prop("validity") || {};
        return c.badInput && !c.typeMismatch ? u : b;
      });
  }
  function rd(b, a, c, d, e) {
    if (y(d)) {
      b = b(d);
      if (!b.constant) throw z("ngModel")("constexpr", c, d);
      return b(a);
    }
    return e;
  }
  function pd(b) {
    function a(a, b) {
      b && !f[a]
        ? (l.addClass(e, a), (f[a] = !0))
        : !b && f[a] && (l.removeClass(e, a), (f[a] = !1));
    }
    function c(b, c) {
      b = b ? "-" + Mb(b, "-") : "";
      a(ib + b, !0 === c);
      a(sd + b, !1 === c);
    }
    var d = b.ctrl,
      e = b.$element,
      f = {},
      g = b.set,
      h = b.unset,
      k = b.parentForm,
      l = b.$animate;
    f[sd] = !(f[ib] = e.hasClass(ib));
    d.$setValidity = function (b, e, f) {
      e === u
        ? (d.$pending || (d.$pending = {}), g(d.$pending, b, f))
        : (d.$pending && h(d.$pending, b, f),
          td(d.$pending) && (d.$pending = u));
      Ua(e)
        ? e
          ? (h(d.$error, b, f), g(d.$$success, b, f))
          : (g(d.$error, b, f), h(d.$$success, b, f))
        : (h(d.$error, b, f), h(d.$$success, b, f));
      d.$pending
        ? (a(ud, !0), (d.$valid = d.$invalid = u), c("", null))
        : (a(ud, !1),
          (d.$valid = td(d.$error)),
          (d.$invalid = !d.$valid),
          c("", d.$valid));
      e =
        d.$pending && d.$pending[b]
          ? u
          : d.$error[b]
          ? !1
          : d.$$success[b]
          ? !0
          : null;
      c(b, e);
      k.$setValidity(b, e, d);
    };
  }
  function td(b) {
    if (b) for (var a in b) return !1;
    return !0;
  }
  function ic(b, a) {
    b = "ngClass" + b;
    return [
      "$animate",
      function (c) {
        function d(a, b) {
          var c = [],
            d = 0;
          a: for (; d < a.length; d++) {
            for (var e = a[d], m = 0; m < b.length; m++)
              if (e == b[m]) continue a;
            c.push(e);
          }
          return c;
        }
        function e(a) {
          if (!D(a)) {
            if (I(a)) return a.split(" ");
            if (K(a)) {
              var b = [];
              r(a, function (a, c) {
                a && (b = b.concat(c.split(" ")));
              });
              return b;
            }
          }
          return a;
        }
        return {
          restrict: "AC",
          link: function (f, g, h) {
            function k(a, b) {
              var c = g.data("$classCounts") || {},
                d = [];
              r(a, function (a) {
                if (0 < b || c[a])
                  (c[a] = (c[a] || 0) + b), c[a] === +(0 < b) && d.push(a);
              });
              g.data("$classCounts", c);
              return d.join(" ");
            }
            function l(b) {
              if (!0 === a || f.$index % 2 === a) {
                var l = e(b || []);
                if (!m) {
                  var t = k(l, 1);
                  h.$addClass(t);
                } else if (!pa(b, m)) {
                  var q = e(m),
                    t = d(l, q),
                    l = d(q, l),
                    t = k(t, 1),
                    l = k(l, -1);
                  t && t.length && c.addClass(g, t);
                  l && l.length && c.removeClass(g, l);
                }
              }
              m = ua(b);
            }
            var m;
            f.$watch(h[b], l, !0);
            h.$observe("class", function (a) {
              l(f.$eval(h[b]));
            });
            "ngClass" !== b &&
              f.$watch("$index", function (c, d) {
                var g = c & 1;
                if (g !== (d & 1)) {
                  var l = e(f.$eval(h[b]));
                  g === a
                    ? ((g = k(l, 1)), h.$addClass(g))
                    : ((g = k(l, -1)), h.$removeClass(g));
                }
              });
          },
        };
      },
    ];
  }
  var Jf = /^\/(.+)\/([a-z]*)$/,
    R = function (b) {
      return I(b) ? b.toLowerCase() : b;
    },
    Jb = Object.prototype.hasOwnProperty,
    rb = function (b) {
      return I(b) ? b.toUpperCase() : b;
    },
    Ha,
    A,
    qa,
    Ya = [].slice,
    of = [].splice,
    Kf = [].push,
    Ja = Object.prototype.toString,
    Wa = z("ng"),
    ha = U.angular || (U.angular = {}),
    ab,
    kb = 0;
  Ha = V.documentMode;
  x.$inject = [];
  oa.$inject = [];
  var D = Array.isArray,
    P = function (b) {
      return I(b) ? b.trim() : b;
    },
    dd = function (b) {
      return b
        .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08");
    },
    $a = function () {
      if (y($a.isActive_)) return $a.isActive_;
      var b = !(
        !V.querySelector("[ng-csp]") && !V.querySelector("[data-ng-csp]")
      );
      if (!b)
        try {
          new Function("");
        } catch (a) {
          b = !0;
        }
      return ($a.isActive_ = b);
    },
    ob = ["ng-", "data-ng-", "ng:", "x-ng-"],
    Jd = /[A-Z]/g,
    sc = !1,
    Nb,
    na = 1,
    mb = 3,
    Nd = {
      full: "1.3.4",
      major: 1,
      minor: 3,
      dot: 4,
      codeName: "highfalutin-petroglyph",
    };
  S.expando = "ng339";
  var wb = (S.cache = {}),
    df = 1;
  S._data = function (b) {
    return this.cache[b[this.expando]] || {};
  };
  var Ze = /([\:\-\_]+(.))/g,
    $e = /^moz([A-Z])/,
    Lf = { mouseleave: "mouseout", mouseenter: "mouseover" },
    Qb = z("jqLite"),
    cf = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    Pb = /<|&#?\w+;/,
    af = /<([\w:]+)/,
    bf = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ja = {
      option: [1, '<select multiple="multiple">', "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
  ja.optgroup = ja.option;
  ja.tbody = ja.tfoot = ja.colgroup = ja.caption = ja.thead;
  ja.th = ja.td;
  var Ka = (S.prototype = {
      ready: function (b) {
        function a() {
          c || ((c = !0), b());
        }
        var c = !1;
        "complete" === V.readyState
          ? setTimeout(a)
          : (this.on("DOMContentLoaded", a), S(U).on("load", a));
      },
      toString: function () {
        var b = [];
        r(this, function (a) {
          b.push("" + a);
        });
        return "[" + b.join(", ") + "]";
      },
      eq: function (b) {
        return 0 <= b ? A(this[b]) : A(this[this.length + b]);
      },
      length: 0,
      push: Kf,
      sort: [].sort,
      splice: [].splice,
    }),
    yb = {};
  r(
    "multiple selected checked disabled readOnly required open".split(" "),
    function (b) {
      yb[R(b)] = b;
    }
  );
  var Kc = {};
  r("input select option textarea button form details".split(" "), function (
    b
  ) {
    Kc[b] = !0;
  });
  var Lc = {
    ngMinlength: "minlength",
    ngMaxlength: "maxlength",
    ngMin: "min",
    ngMax: "max",
    ngPattern: "pattern",
  };
  r({ data: Sb, removeData: ub }, function (b, a) {
    S[a] = b;
  });
  r(
    {
      data: Sb,
      inheritedData: xb,
      scope: function (b) {
        return (
          A.data(b, "$scope") ||
          xb(b.parentNode || b, ["$isolateScope", "$scope"])
        );
      },
      isolateScope: function (b) {
        return (
          A.data(b, "$isolateScope") || A.data(b, "$isolateScopeNoTemplate")
        );
      },
      controller: Gc,
      injector: function (b) {
        return xb(b, "$injector");
      },
      removeAttr: function (b, a) {
        b.removeAttribute(a);
      },
      hasClass: Tb,
      css: function (b, a, c) {
        a = bb(a);
        if (y(c)) b.style[a] = c;
        else return b.style[a];
      },
      attr: function (b, a, c) {
        var d = R(a);
        if (yb[d])
          if (y(c))
            c
              ? ((b[a] = !0), b.setAttribute(a, d))
              : ((b[a] = !1), b.removeAttribute(d));
          else
            return b[a] || (b.attributes.getNamedItem(a) || x).specified
              ? d
              : u;
        else if (y(c)) b.setAttribute(a, c);
        else if (b.getAttribute)
          return (b = b.getAttribute(a, 2)), null === b ? u : b;
      },
      prop: function (b, a, c) {
        if (y(c)) b[a] = c;
        else return b[a];
      },
      text: (function () {
        function b(a, b) {
          if (G(b)) {
            var d = a.nodeType;
            return d === na || d === mb ? a.textContent : "";
          }
          a.textContent = b;
        }
        b.$dv = "";
        return b;
      })(),
      val: function (b, a) {
        if (G(a)) {
          if (b.multiple && "select" === ta(b)) {
            var c = [];
            r(b.options, function (a) {
              a.selected && c.push(a.value || a.text);
            });
            return 0 === c.length ? null : c;
          }
          return b.value;
        }
        b.value = a;
      },
      html: function (b, a) {
        if (G(a)) return b.innerHTML;
        tb(b, !0);
        b.innerHTML = a;
      },
      empty: Hc,
    },
    function (b, a) {
      S.prototype[a] = function (a, d) {
        var e,
          f,
          g = this.length;
        if (b !== Hc && (2 == b.length && b !== Tb && b !== Gc ? a : d) === u) {
          if (K(a)) {
            for (e = 0; e < g; e++)
              if (b === Sb) b(this[e], a);
              else for (f in a) b(this[e], f, a[f]);
            return this;
          }
          e = b.$dv;
          g = e === u ? Math.min(g, 1) : g;
          for (f = 0; f < g; f++) {
            var h = b(this[f], a, d);
            e = e ? e + h : h;
          }
          return e;
        }
        for (e = 0; e < g; e++) b(this[e], a, d);
        return this;
      };
    }
  );
  r(
    {
      removeData: ub,
      on: function a(c, d, e, f) {
        if (y(f)) throw Qb("onargs");
        if (Cc(c)) {
          var g = vb(c, !0);
          f = g.events;
          var h = g.handle;
          h || (h = g.handle = gf(c, f));
          for (
            var g = 0 <= d.indexOf(" ") ? d.split(" ") : [d], k = g.length;
            k--;

          ) {
            d = g[k];
            var l = f[d];
            l ||
              ((f[d] = []),
              "mouseenter" === d || "mouseleave" === d
                ? a(c, Lf[d], function (a) {
                    var c = a.relatedTarget;
                    (c && (c === this || this.contains(c))) || h(a, d);
                  })
                : "$destroy" !== d && c.addEventListener(d, h, !1),
              (l = f[d]));
            l.push(e);
          }
        }
      },
      off: Fc,
      one: function (a, c, d) {
        a = A(a);
        a.on(c, function f() {
          a.off(c, d);
          a.off(c, f);
        });
        a.on(c, d);
      },
      replaceWith: function (a, c) {
        var d,
          e = a.parentNode;
        tb(a);
        r(new S(c), function (c) {
          d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
          d = c;
        });
      },
      children: function (a) {
        var c = [];
        r(a.childNodes, function (a) {
          a.nodeType === na && c.push(a);
        });
        return c;
      },
      contents: function (a) {
        return a.contentDocument || a.childNodes || [];
      },
      append: function (a, c) {
        var d = a.nodeType;
        if (d === na || 11 === d) {
          c = new S(c);
          for (var d = 0, e = c.length; d < e; d++) a.appendChild(c[d]);
        }
      },
      prepend: function (a, c) {
        if (a.nodeType === na) {
          var d = a.firstChild;
          r(new S(c), function (c) {
            a.insertBefore(c, d);
          });
        }
      },
      wrap: function (a, c) {
        c = A(c).eq(0).clone()[0];
        var d = a.parentNode;
        d && d.replaceChild(c, a);
        c.appendChild(a);
      },
      remove: Ic,
      detach: function (a) {
        Ic(a, !0);
      },
      after: function (a, c) {
        var d = a,
          e = a.parentNode;
        c = new S(c);
        for (var f = 0, g = c.length; f < g; f++) {
          var h = c[f];
          e.insertBefore(h, d.nextSibling);
          d = h;
        }
      },
      addClass: Vb,
      removeClass: Ub,
      toggleClass: function (a, c, d) {
        c &&
          r(c.split(" "), function (c) {
            var f = d;
            G(f) && (f = !Tb(a, c));
            (f ? Vb : Ub)(a, c);
          });
      },
      parent: function (a) {
        return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
      },
      next: function (a) {
        return a.nextElementSibling;
      },
      find: function (a, c) {
        return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
      },
      clone: Rb,
      triggerHandler: function (a, c, d) {
        var e,
          f,
          g = c.type || c,
          h = vb(a);
        if ((h = (h = h && h.events) && h[g]))
          (e = {
            preventDefault: function () {
              this.defaultPrevented = !0;
            },
            isDefaultPrevented: function () {
              return !0 === this.defaultPrevented;
            },
            stopImmediatePropagation: function () {
              this.immediatePropagationStopped = !0;
            },
            isImmediatePropagationStopped: function () {
              return !0 === this.immediatePropagationStopped;
            },
            stopPropagation: x,
            type: g,
            target: a,
          }),
            c.type && (e = C(e, c)),
            (c = ua(h)),
            (f = d ? [e].concat(d) : [e]),
            r(c, function (c) {
              e.isImmediatePropagationStopped() || c.apply(a, f);
            });
      },
    },
    function (a, c) {
      S.prototype[c] = function (c, e, f) {
        for (var g, h = 0, k = this.length; h < k; h++)
          G(g)
            ? ((g = a(this[h], c, e, f)), y(g) && (g = A(g)))
            : Ec(g, a(this[h], c, e, f));
        return y(g) ? g : this;
      };
      S.prototype.bind = S.prototype.on;
      S.prototype.unbind = S.prototype.off;
    }
  );
  cb.prototype = {
    put: function (a, c) {
      this[Ma(a, this.nextUid)] = c;
    },
    get: function (a) {
      return this[Ma(a, this.nextUid)];
    },
    remove: function (a) {
      var c = this[(a = Ma(a, this.nextUid))];
      delete this[a];
      return c;
    },
  };
  var Nc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
    jf = /,/,
    kf = /^\s*(_?)(\S+?)\1\s*$/,
    Mc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
    Ea = z("$injector");
  Lb.$$annotate = Wb;
  var Mf = z("$animate"),
    ze = [
      "$provide",
      function (a) {
        this.$$selectors = {};
        this.register = function (c, d) {
          var e = c + "-animation";
          if (c && "." != c.charAt(0)) throw Mf("notcsel", c);
          this.$$selectors[c.substr(1)] = e;
          a.factory(e, d);
        };
        this.classNameFilter = function (a) {
          1 === arguments.length &&
            (this.$$classNameFilter = a instanceof RegExp ? a : null);
          return this.$$classNameFilter;
        };
        this.$get = [
          "$$q",
          "$$asyncCallback",
          "$rootScope",
          function (a, d, e) {
            function f(d) {
              var f,
                g = a.defer();
              g.promise.$$cancelFn = function () {
                f && f();
              };
              e.$$postDigest(function () {
                f = d(function () {
                  g.resolve();
                });
              });
              return g.promise;
            }
            function g(a, c) {
              var d = [],
                e = [],
                f = ia();
              r((a.attr("class") || "").split(/\s+/), function (a) {
                f[a] = !0;
              });
              r(c, function (a, c) {
                var g = f[c];
                !1 === a && g ? e.push(c) : !0 !== a || g || d.push(c);
              });
              return (
                0 < d.length + e.length && [
                  d.length ? d : null,
                  e.length ? e : null,
                ]
              );
            }
            function h(a, c, d) {
              for (var e = 0, f = c.length; e < f; ++e) a[c[e]] = d;
            }
            function k() {
              m ||
                ((m = a.defer()),
                d(function () {
                  m.resolve();
                  m = null;
                }));
              return m.promise;
            }
            function l(a, c) {
              if (ha.isObject(c)) {
                var d = C(c.from || {}, c.to || {});
                a.css(d);
              }
            }
            var m;
            return {
              animate: function (a, c, d) {
                l(a, { from: c, to: d });
                return k();
              },
              enter: function (a, c, d, e) {
                l(a, e);
                d ? d.after(a) : c.prepend(a);
                return k();
              },
              leave: function (a, c) {
                a.remove();
                return k();
              },
              move: function (a, c, d, e) {
                return this.enter(a, c, d, e);
              },
              addClass: function (a, c, d) {
                return this.setClass(a, c, [], d);
              },
              $$addClassImmediately: function (a, c, d) {
                a = A(a);
                c = I(c) ? c : D(c) ? c.join(" ") : "";
                r(a, function (a) {
                  Vb(a, c);
                });
                l(a, d);
                return k();
              },
              removeClass: function (a, c, d) {
                return this.setClass(a, [], c, d);
              },
              $$removeClassImmediately: function (a, c, d) {
                a = A(a);
                c = I(c) ? c : D(c) ? c.join(" ") : "";
                r(a, function (a) {
                  Ub(a, c);
                });
                l(a, d);
                return k();
              },
              setClass: function (a, c, d, e) {
                var k = this,
                  l = !1;
                a = A(a);
                var m = a.data("$$animateClasses");
                m
                  ? e &&
                    m.options &&
                    (m.options = ha.extend(m.options || {}, e))
                  : ((m = { classes: {}, options: e }), (l = !0));
                e = m.classes;
                c = D(c) ? c : c.split(" ");
                d = D(d) ? d : d.split(" ");
                h(e, c, !0);
                h(e, d, !1);
                l &&
                  ((m.promise = f(function (c) {
                    var d = a.data("$$animateClasses");
                    a.removeData("$$animateClasses");
                    if (d) {
                      var e = g(a, d.classes);
                      e && k.$$setClassImmediately(a, e[0], e[1], d.options);
                    }
                    c();
                  })),
                  a.data("$$animateClasses", m));
                return m.promise;
              },
              $$setClassImmediately: function (a, c, d, e) {
                c && this.$$addClassImmediately(a, c);
                d && this.$$removeClassImmediately(a, d);
                l(a, e);
                return k();
              },
              enabled: x,
              cancel: x,
            };
          },
        ];
      },
    ],
    ka = z("$compile");
  uc.$inject = ["$provide", "$$sanitizeUriProvider"];
  var nf = /^((?:x|data)[\:\-_])/i,
    Sc = "application/json",
    Zb = { "Content-Type": Sc + ";charset=utf-8" },
    qf = /^\s*(\[|\{[^\{])/,
    rf = /[\}\]]\s*$/,
    pf = /^\)\]\}',?\n/,
    $b = z("$interpolate"),
    Nf = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
    uf = { http: 80, https: 443, ftp: 21 },
    eb = z("$location"),
    Of = {
      $$html5: !1,
      $$replace: !1,
      absUrl: Bb("$$absUrl"),
      url: function (a) {
        if (G(a)) return this.$$url;
        var c = Nf.exec(a);
        (c[1] || "" === a) && this.path(decodeURIComponent(c[1]));
        (c[2] || c[1] || "" === a) && this.search(c[3] || "");
        this.hash(c[5] || "");
        return this;
      },
      protocol: Bb("$$protocol"),
      host: Bb("$$host"),
      port: Bb("$$port"),
      path: $c("$$path", function (a) {
        a = null !== a ? a.toString() : "";
        return "/" == a.charAt(0) ? a : "/" + a;
      }),
      search: function (a, c) {
        switch (arguments.length) {
          case 0:
            return this.$$search;
          case 1:
            if (I(a) || X(a)) (a = a.toString()), (this.$$search = qc(a));
            else if (K(a))
              (a = Ca(a, {})),
                r(a, function (c, e) {
                  null == c && delete a[e];
                }),
                (this.$$search = a);
            else throw eb("isrcharg");
            break;
          default:
            G(c) || null === c
              ? delete this.$$search[a]
              : (this.$$search[a] = c);
        }
        this.$$compose();
        return this;
      },
      hash: $c("$$hash", function (a) {
        return null !== a ? a.toString() : "";
      }),
      replace: function () {
        this.$$replace = !0;
        return this;
      },
    };
  r([Zc, dc, cc], function (a) {
    a.prototype = Object.create(Of);
    a.prototype.state = function (c) {
      if (!arguments.length) return this.$$state;
      if (a !== cc || !this.$$html5) throw eb("nostate");
      this.$$state = G(c) ? null : c;
      return this;
    };
  });
  var la = z("$parse"),
    Pf = Function.prototype.call,
    Qf = Function.prototype.apply,
    Rf = Function.prototype.bind,
    Ib = ia();
  r(
    {
      null: function () {
        return null;
      },
      true: function () {
        return !0;
      },
      false: function () {
        return !1;
      },
      undefined: function () {},
    },
    function (a, c) {
      a.constant = a.literal = a.sharedGetter = !0;
      Ib[c] = a;
    }
  );
  Ib["this"] = function (a) {
    return a;
  };
  Ib["this"].sharedGetter = !0;
  var jb = C(ia(), {
      "+": function (a, c, d, e) {
        d = d(a, c);
        e = e(a, c);
        return y(d) ? (y(e) ? d + e : d) : y(e) ? e : u;
      },
      "-": function (a, c, d, e) {
        d = d(a, c);
        e = e(a, c);
        return (y(d) ? d : 0) - (y(e) ? e : 0);
      },
      "*": function (a, c, d, e) {
        return d(a, c) * e(a, c);
      },
      "/": function (a, c, d, e) {
        return d(a, c) / e(a, c);
      },
      "%": function (a, c, d, e) {
        return d(a, c) % e(a, c);
      },
      "===": function (a, c, d, e) {
        return d(a, c) === e(a, c);
      },
      "!==": function (a, c, d, e) {
        return d(a, c) !== e(a, c);
      },
      "==": function (a, c, d, e) {
        return d(a, c) == e(a, c);
      },
      "!=": function (a, c, d, e) {
        return d(a, c) != e(a, c);
      },
      "<": function (a, c, d, e) {
        return d(a, c) < e(a, c);
      },
      ">": function (a, c, d, e) {
        return d(a, c) > e(a, c);
      },
      "<=": function (a, c, d, e) {
        return d(a, c) <= e(a, c);
      },
      ">=": function (a, c, d, e) {
        return d(a, c) >= e(a, c);
      },
      "&&": function (a, c, d, e) {
        return d(a, c) && e(a, c);
      },
      "||": function (a, c, d, e) {
        return d(a, c) || e(a, c);
      },
      "!": function (a, c, d) {
        return !d(a, c);
      },
      "=": !0,
      "|": !0,
    }),
    Sf = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' },
    gc = function (a) {
      this.options = a;
    };
  gc.prototype = {
    constructor: gc,
    lex: function (a) {
      this.text = a;
      this.index = 0;
      for (this.tokens = []; this.index < this.text.length; )
        if (((a = this.text.charAt(this.index)), '"' === a || "'" === a))
          this.readString(a);
        else if (this.isNumber(a) || ("." === a && this.isNumber(this.peek())))
          this.readNumber();
        else if (this.isIdent(a)) this.readIdent();
        else if (this.is(a, "(){}[].,;:?"))
          this.tokens.push({ index: this.index, text: a }), this.index++;
        else if (this.isWhitespace(a)) this.index++;
        else {
          var c = a + this.peek(),
            d = c + this.peek(2),
            e = jb[c],
            f = jb[d];
          jb[a] || e || f
            ? ((a = f ? d : e ? c : a),
              this.tokens.push({ index: this.index, text: a, operator: !0 }),
              (this.index += a.length))
            : this.throwError(
                "Unexpected next character ",
                this.index,
                this.index + 1
              );
        }
      return this.tokens;
    },
    is: function (a, c) {
      return -1 !== c.indexOf(a);
    },
    peek: function (a) {
      a = a || 1;
      return this.index + a < this.text.length
        ? this.text.charAt(this.index + a)
        : !1;
    },
    isNumber: function (a) {
      return "0" <= a && "9" >= a && "string" === typeof a;
    },
    isWhitespace: function (a) {
      return (
        " " === a ||
        "\r" === a ||
        "\t" === a ||
        "\n" === a ||
        "\v" === a ||
        "\u00a0" === a
      );
    },
    isIdent: function (a) {
      return (
        ("a" <= a && "z" >= a) ||
        ("A" <= a && "Z" >= a) ||
        "_" === a ||
        "$" === a
      );
    },
    isExpOperator: function (a) {
      return "-" === a || "+" === a || this.isNumber(a);
    },
    throwError: function (a, c, d) {
      d = d || this.index;
      c = y(c)
        ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]"
        : " " + d;
      throw la("lexerr", a, c, this.text);
    },
    readNumber: function () {
      for (var a = "", c = this.index; this.index < this.text.length; ) {
        var d = R(this.text.charAt(this.index));
        if ("." == d || this.isNumber(d)) a += d;
        else {
          var e = this.peek();
          if ("e" == d && this.isExpOperator(e)) a += d;
          else if (
            this.isExpOperator(d) &&
            e &&
            this.isNumber(e) &&
            "e" == a.charAt(a.length - 1)
          )
            a += d;
          else if (
            !this.isExpOperator(d) ||
            (e && this.isNumber(e)) ||
            "e" != a.charAt(a.length - 1)
          )
            break;
          else this.throwError("Invalid exponent");
        }
        this.index++;
      }
      this.tokens.push({ index: c, text: a, constant: !0, value: Number(a) });
    },
    readIdent: function () {
      for (var a = this.index; this.index < this.text.length; ) {
        var c = this.text.charAt(this.index);
        if (!this.isIdent(c) && !this.isNumber(c)) break;
        this.index++;
      }
      this.tokens.push({
        index: a,
        text: this.text.slice(a, this.index),
        identifier: !0,
      });
    },
    readString: function (a) {
      var c = this.index;
      this.index++;
      for (var d = "", e = a, f = !1; this.index < this.text.length; ) {
        var g = this.text.charAt(this.index),
          e = e + g;
        if (f)
          "u" === g
            ? ((f = this.text.substring(this.index + 1, this.index + 5)),
              f.match(/[\da-f]{4}/i) ||
                this.throwError("Invalid unicode escape [\\u" + f + "]"),
              (this.index += 4),
              (d += String.fromCharCode(parseInt(f, 16))))
            : (d += Sf[g] || g),
            (f = !1);
        else if ("\\" === g) f = !0;
        else {
          if (g === a) {
            this.index++;
            this.tokens.push({ index: c, text: e, constant: !0, value: d });
            return;
          }
          d += g;
        }
        this.index++;
      }
      this.throwError("Unterminated quote", c);
    },
  };
  var fb = function (a, c, d) {
    this.lexer = a;
    this.$filter = c;
    this.options = d;
  };
  fb.ZERO = C(
    function () {
      return 0;
    },
    { sharedGetter: !0, constant: !0 }
  );
  fb.prototype = {
    constructor: fb,
    parse: function (a) {
      this.text = a;
      this.tokens = this.lexer.lex(a);
      a = this.statements();
      0 !== this.tokens.length &&
        this.throwError("is an unexpected token", this.tokens[0]);
      a.literal = !!a.literal;
      a.constant = !!a.constant;
      return a;
    },
    primary: function () {
      var a;
      this.expect("(")
        ? ((a = this.filterChain()), this.consume(")"))
        : this.expect("[")
        ? (a = this.arrayDeclaration())
        : this.expect("{")
        ? (a = this.object())
        : this.peek().identifier
        ? (a = this.identifier())
        : this.peek().constant
        ? (a = this.constant())
        : this.throwError("not a primary expression", this.peek());
      for (var c, d; (c = this.expect("(", "[", ".")); )
        "(" === c.text
          ? ((a = this.functionCall(a, d)), (d = null))
          : "[" === c.text
          ? ((d = a), (a = this.objectIndex(a)))
          : "." === c.text
          ? ((d = a), (a = this.fieldAccess(a)))
          : this.throwError("IMPOSSIBLE");
      return a;
    },
    throwError: function (a, c) {
      throw la(
        "syntax",
        c.text,
        a,
        c.index + 1,
        this.text,
        this.text.substring(c.index)
      );
    },
    peekToken: function () {
      if (0 === this.tokens.length) throw la("ueoe", this.text);
      return this.tokens[0];
    },
    peek: function (a, c, d, e) {
      return this.peekAhead(0, a, c, d, e);
    },
    peekAhead: function (a, c, d, e, f) {
      if (this.tokens.length > a) {
        a = this.tokens[a];
        var g = a.text;
        if (g === c || g === d || g === e || g === f || !(c || d || e || f))
          return a;
      }
      return !1;
    },
    expect: function (a, c, d, e) {
      return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
    },
    consume: function (a) {
      if (0 === this.tokens.length) throw la("ueoe", this.text);
      var c = this.expect(a);
      c || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
      return c;
    },
    unaryFn: function (a, c) {
      var d = jb[a];
      return C(
        function (a, f) {
          return d(a, f, c);
        },
        { constant: c.constant, inputs: [c] }
      );
    },
    binaryFn: function (a, c, d, e) {
      var f = jb[c];
      return C(
        function (c, e) {
          return f(c, e, a, d);
        },
        { constant: a.constant && d.constant, inputs: !e && [a, d] }
      );
    },
    identifier: function () {
      for (
        var a = this.consume().text;
        this.peek(".") &&
        this.peekAhead(1).identifier &&
        !this.peekAhead(2, "(");

      )
        a += this.consume().text + this.consume().text;
      return Ib[a] || bd(a, this.options, this.text);
    },
    constant: function () {
      var a = this.consume().value;
      return C(
        function () {
          return a;
        },
        { constant: !0, literal: !0 }
      );
    },
    statements: function () {
      for (var a = []; ; )
        if (
          (0 < this.tokens.length &&
            !this.peek("}", ")", ";", "]") &&
            a.push(this.filterChain()),
          !this.expect(";"))
        )
          return 1 === a.length
            ? a[0]
            : function (c, d) {
                for (var e, f = 0, g = a.length; f < g; f++) e = a[f](c, d);
                return e;
              };
    },
    filterChain: function () {
      for (var a = this.expression(); this.expect("|"); ) a = this.filter(a);
      return a;
    },
    filter: function (a) {
      var c = this.$filter(this.consume().text),
        d,
        e;
      if (this.peek(":"))
        for (d = [], e = []; this.expect(":"); ) d.push(this.expression());
      var f = [a].concat(d || []);
      return C(
        function (f, h) {
          var k = a(f, h);
          if (e) {
            e[0] = k;
            for (k = d.length; k--; ) e[k + 1] = d[k](f, h);
            return c.apply(u, e);
          }
          return c(k);
        },
        { constant: !c.$stateful && f.every(ec), inputs: !c.$stateful && f }
      );
    },
    expression: function () {
      return this.assignment();
    },
    assignment: function () {
      var a = this.ternary(),
        c,
        d;
      return (d = this.expect("="))
        ? (a.assign ||
            this.throwError(
              "implies assignment but [" +
                this.text.substring(0, d.index) +
                "] can not be assigned to",
              d
            ),
          (c = this.ternary()),
          C(
            function (d, f) {
              return a.assign(d, c(d, f), f);
            },
            { inputs: [a, c] }
          ))
        : a;
    },
    ternary: function () {
      var a = this.logicalOR(),
        c;
      if (this.expect("?") && ((c = this.assignment()), this.consume(":"))) {
        var d = this.assignment();
        return C(
          function (e, f) {
            return a(e, f) ? c(e, f) : d(e, f);
          },
          { constant: a.constant && c.constant && d.constant }
        );
      }
      return a;
    },
    logicalOR: function () {
      for (var a = this.logicalAND(), c; (c = this.expect("||")); )
        a = this.binaryFn(a, c.text, this.logicalAND(), !0);
      return a;
    },
    logicalAND: function () {
      var a = this.equality(),
        c;
      if ((c = this.expect("&&")))
        a = this.binaryFn(a, c.text, this.logicalAND(), !0);
      return a;
    },
    equality: function () {
      var a = this.relational(),
        c;
      if ((c = this.expect("==", "!=", "===", "!==")))
        a = this.binaryFn(a, c.text, this.equality());
      return a;
    },
    relational: function () {
      var a = this.additive(),
        c;
      if ((c = this.expect("<", ">", "<=", ">=")))
        a = this.binaryFn(a, c.text, this.relational());
      return a;
    },
    additive: function () {
      for (var a = this.multiplicative(), c; (c = this.expect("+", "-")); )
        a = this.binaryFn(a, c.text, this.multiplicative());
      return a;
    },
    multiplicative: function () {
      for (var a = this.unary(), c; (c = this.expect("*", "/", "%")); )
        a = this.binaryFn(a, c.text, this.unary());
      return a;
    },
    unary: function () {
      var a;
      return this.expect("+")
        ? this.primary()
        : (a = this.expect("-"))
        ? this.binaryFn(fb.ZERO, a.text, this.unary())
        : (a = this.expect("!"))
        ? this.unaryFn(a.text, this.unary())
        : this.primary();
    },
    fieldAccess: function (a) {
      var c = this.text,
        d = this.consume().text,
        e = bd(d, this.options, c);
      return C(
        function (c, d, h) {
          return e(h || a(c, d));
        },
        {
          assign: function (e, g, h) {
            (h = a(e, h)) || a.assign(e, (h = {}));
            return Oa(h, d, g, c);
          },
        }
      );
    },
    objectIndex: function (a) {
      var c = this.text,
        d = this.expression();
      this.consume("]");
      return C(
        function (e, f) {
          var g = a(e, f),
            h = d(e, f);
          ra(h, c);
          return g ? sa(g[h], c) : u;
        },
        {
          assign: function (e, f, g) {
            var h = ra(d(e, g), c);
            (g = sa(a(e, g), c)) || a.assign(e, (g = {}));
            return (g[h] = f);
          },
        }
      );
    },
    functionCall: function (a, c) {
      var d = [];
      if (")" !== this.peekToken().text) {
        do d.push(this.expression());
        while (this.expect(","));
      }
      this.consume(")");
      var e = this.text,
        f = d.length ? [] : null;
      return function (g, h) {
        var k = c ? c(g, h) : g,
          l = a(g, h, k) || x;
        if (f) for (var m = d.length; m--; ) f[m] = sa(d[m](g, h), e);
        sa(k, e);
        if (l) {
          if (l.constructor === l) throw la("isecfn", e);
          if (l === Pf || l === Qf || l === Rf) throw la("isecff", e);
        }
        k = l.apply ? l.apply(k, f) : l(f[0], f[1], f[2], f[3], f[4]);
        return sa(k, e);
      };
    },
    arrayDeclaration: function () {
      var a = [];
      if ("]" !== this.peekToken().text) {
        do {
          if (this.peek("]")) break;
          a.push(this.expression());
        } while (this.expect(","));
      }
      this.consume("]");
      return C(
        function (c, d) {
          for (var e = [], f = 0, g = a.length; f < g; f++) e.push(a[f](c, d));
          return e;
        },
        { literal: !0, constant: a.every(ec), inputs: a }
      );
    },
    object: function () {
      var a = [],
        c = [];
      if ("}" !== this.peekToken().text) {
        do {
          if (this.peek("}")) break;
          var d = this.consume();
          d.constant
            ? a.push(d.value)
            : d.identifier
            ? a.push(d.text)
            : this.throwError("invalid key", d);
          this.consume(":");
          c.push(this.expression());
        } while (this.expect(","));
      }
      this.consume("}");
      return C(
        function (d, f) {
          for (var g = {}, h = 0, k = c.length; h < k; h++)
            g[a[h]] = c[h](d, f);
          return g;
        },
        { literal: !0, constant: c.every(ec), inputs: c }
      );
    },
  };
  var xf = ia(),
    wf = ia(),
    yf = Object.prototype.valueOf,
    Ba = z("$sce"),
    ma = {
      HTML: "html",
      CSS: "css",
      URL: "url",
      RESOURCE_URL: "resourceUrl",
      JS: "js",
    },
    ka = z("$compile"),
    Y = V.createElement("a"),
    fd = Aa(U.location.href);
  Bc.$inject = ["$provide"];
  gd.$inject = ["$locale"];
  id.$inject = ["$locale"];
  var ld = ".",
    Hf = {
      yyyy: Z("FullYear", 4),
      yy: Z("FullYear", 2, 0, !0),
      y: Z("FullYear", 1),
      MMMM: Db("Month"),
      MMM: Db("Month", !0),
      MM: Z("Month", 2, 1),
      M: Z("Month", 1, 1),
      dd: Z("Date", 2),
      d: Z("Date", 1),
      HH: Z("Hours", 2),
      H: Z("Hours", 1),
      hh: Z("Hours", 2, -12),
      h: Z("Hours", 1, -12),
      mm: Z("Minutes", 2),
      m: Z("Minutes", 1),
      ss: Z("Seconds", 2),
      s: Z("Seconds", 1),
      sss: Z("Milliseconds", 3),
      EEEE: Db("Day"),
      EEE: Db("Day", !0),
      a: function (a, c) {
        return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
      },
      Z: function (a) {
        a = -1 * a.getTimezoneOffset();
        return (a =
          (0 <= a ? "+" : "") +
          (Cb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) +
            Cb(Math.abs(a % 60), 2)));
      },
      ww: nd(2),
      w: nd(1),
    },
    Gf = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
    Ff = /^\-?\d+$/;
  hd.$inject = ["$locale"];
  var Df = ca(R),
    Ef = ca(rb);
  jd.$inject = ["$parse"];
  var Qd = ca({
      restrict: "E",
      compile: function (a, c) {
        if (!c.href && !c.xlinkHref && !c.name)
          return function (a, c) {
            var f =
              "[object SVGAnimatedString]" === Ja.call(c.prop("href"))
                ? "xlink:href"
                : "href";
            c.on("click", function (a) {
              c.attr(f) || a.preventDefault();
            });
          };
      },
    }),
    sb = {};
  r(yb, function (a, c) {
    if ("multiple" != a) {
      var d = wa("ng-" + c);
      sb[d] = function () {
        return {
          restrict: "A",
          priority: 100,
          link: function (a, f, g) {
            a.$watch(g[d], function (a) {
              g.$set(c, !!a);
            });
          },
        };
      };
    }
  });
  r(Lc, function (a, c) {
    sb[c] = function () {
      return {
        priority: 100,
        link: function (a, e, f) {
          if (
            "ngPattern" === c &&
            "/" == f.ngPattern.charAt(0) &&
            (e = f.ngPattern.match(Jf))
          ) {
            f.$set("ngPattern", new RegExp(e[1], e[2]));
            return;
          }
          a.$watch(f[c], function (a) {
            f.$set(c, a);
          });
        },
      };
    };
  });
  r(["src", "srcset", "href"], function (a) {
    var c = wa("ng-" + a);
    sb[c] = function () {
      return {
        priority: 99,
        link: function (d, e, f) {
          var g = a,
            h = a;
          "href" === a &&
            "[object SVGAnimatedString]" === Ja.call(e.prop("href")) &&
            ((h = "xlinkHref"), (f.$attr[h] = "xlink:href"), (g = null));
          f.$observe(c, function (c) {
            c
              ? (f.$set(h, c), Ha && g && e.prop(g, f[h]))
              : "href" === a && f.$set(h, null);
          });
        },
      };
    };
  });
  var Eb = {
    $addControl: x,
    $$renameControl: function (a, c) {
      a.$name = c;
    },
    $removeControl: x,
    $setValidity: x,
    $setDirty: x,
    $setPristine: x,
    $setSubmitted: x,
  };
  od.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
  var vd = function (a) {
      return [
        "$timeout",
        function (c) {
          return {
            name: "form",
            restrict: a ? "EAC" : "E",
            controller: od,
            compile: function (a) {
              a.addClass(Qa).addClass(ib);
              return {
                pre: function (a, d, g, h) {
                  if (!("action" in g)) {
                    var k = function (c) {
                      a.$apply(function () {
                        h.$commitViewValue();
                        h.$setSubmitted();
                      });
                      c.preventDefault();
                    };
                    d[0].addEventListener("submit", k, !1);
                    d.on("$destroy", function () {
                      c(
                        function () {
                          d[0].removeEventListener("submit", k, !1);
                        },
                        0,
                        !1
                      );
                    });
                  }
                  var l = h.$$parentForm,
                    m = h.$name;
                  m &&
                    (Oa(a, m, h, m),
                    g.$observe(g.name ? "name" : "ngForm", function (c) {
                      m !== c &&
                        (Oa(a, m, u, m),
                        (m = c),
                        Oa(a, m, h, m),
                        l.$$renameControl(h, m));
                    }));
                  d.on("$destroy", function () {
                    l.$removeControl(h);
                    m && Oa(a, m, u, m);
                    C(h, Eb);
                  });
                },
              };
            },
          };
        },
      ];
    },
    Rd = vd(),
    de = vd(!0),
    If = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    Tf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    Uf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    Vf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
    wd = /^(\d{4})-(\d{2})-(\d{2})$/,
    xd = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
    jc = /^(\d{4})-W(\d\d)$/,
    yd = /^(\d{4})-(\d\d)$/,
    zd = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
    Wf = /(\s+|^)default(\s+|$)/,
    Hb = new z("ngModel"),
    Ad = {
      text: function (a, c, d, e, f, g) {
        gb(a, c, d, e, f, g);
        hc(e);
      },
      date: hb("date", wd, Gb(wd, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
      "datetime-local": hb(
        "datetimelocal",
        xd,
        Gb(xd, "yyyy MM dd HH mm ss sss".split(" ")),
        "yyyy-MM-ddTHH:mm:ss.sss"
      ),
      time: hb("time", zd, Gb(zd, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
      week: hb(
        "week",
        jc,
        function (a, c) {
          if (fa(a)) return a;
          if (I(a)) {
            jc.lastIndex = 0;
            var d = jc.exec(a);
            if (d) {
              var e = +d[1],
                f = +d[2],
                g = (d = 0),
                h = 0,
                k = 0,
                l = md(e),
                f = 7 * (f - 1);
              c &&
                ((d = c.getHours()),
                (g = c.getMinutes()),
                (h = c.getSeconds()),
                (k = c.getMilliseconds()));
              return new Date(e, 0, l.getDate() + f, d, g, h, k);
            }
          }
          return NaN;
        },
        "yyyy-Www"
      ),
      month: hb("month", yd, Gb(yd, ["yyyy", "MM"]), "yyyy-MM"),
      number: function (a, c, d, e, f, g) {
        qd(a, c, d, e);
        gb(a, c, d, e, f, g);
        e.$$parserName = "number";
        e.$parsers.push(function (a) {
          return e.$isEmpty(a) ? null : Vf.test(a) ? parseFloat(a) : u;
        });
        e.$formatters.push(function (a) {
          if (!e.$isEmpty(a)) {
            if (!X(a)) throw Hb("numfmt", a);
            a = a.toString();
          }
          return a;
        });
        if (d.min || d.ngMin) {
          var h;
          e.$validators.min = function (a) {
            return e.$isEmpty(a) || G(h) || a >= h;
          };
          d.$observe("min", function (a) {
            y(a) && !X(a) && (a = parseFloat(a, 10));
            h = X(a) && !isNaN(a) ? a : u;
            e.$validate();
          });
        }
        if (d.max || d.ngMax) {
          var k;
          e.$validators.max = function (a) {
            return e.$isEmpty(a) || G(k) || a <= k;
          };
          d.$observe("max", function (a) {
            y(a) && !X(a) && (a = parseFloat(a, 10));
            k = X(a) && !isNaN(a) ? a : u;
            e.$validate();
          });
        }
      },
      url: function (a, c, d, e, f, g) {
        gb(a, c, d, e, f, g);
        hc(e);
        e.$$parserName = "url";
        e.$validators.url = function (a, c) {
          var d = a || c;
          return e.$isEmpty(d) || Tf.test(d);
        };
      },
      email: function (a, c, d, e, f, g) {
        gb(a, c, d, e, f, g);
        hc(e);
        e.$$parserName = "email";
        e.$validators.email = function (a, c) {
          var d = a || c;
          return e.$isEmpty(d) || Uf.test(d);
        };
      },
      radio: function (a, c, d, e) {
        G(d.name) && c.attr("name", ++kb);
        c.on("click", function (a) {
          c[0].checked && e.$setViewValue(d.value, a && a.type);
        });
        e.$render = function () {
          c[0].checked = d.value == e.$viewValue;
        };
        d.$observe("value", e.$render);
      },
      checkbox: function (a, c, d, e, f, g, h, k) {
        var l = rd(k, a, "ngTrueValue", d.ngTrueValue, !0),
          m = rd(k, a, "ngFalseValue", d.ngFalseValue, !1);
        c.on("click", function (a) {
          e.$setViewValue(c[0].checked, a && a.type);
        });
        e.$render = function () {
          c[0].checked = e.$viewValue;
        };
        e.$isEmpty = function (a) {
          return !1 === a;
        };
        e.$formatters.push(function (a) {
          return pa(a, l);
        });
        e.$parsers.push(function (a) {
          return a ? l : m;
        });
      },
      hidden: x,
      button: x,
      submit: x,
      reset: x,
      file: x,
    },
    vc = [
      "$browser",
      "$sniffer",
      "$filter",
      "$parse",
      function (a, c, d, e) {
        return {
          restrict: "E",
          require: ["?ngModel"],
          link: {
            pre: function (f, g, h, k) {
              k[0] && (Ad[R(h.type)] || Ad.text)(f, g, h, k[0], c, a, d, e);
            },
          },
        };
      },
    ],
    ib = "ng-valid",
    sd = "ng-invalid",
    Qa = "ng-pristine",
    Fb = "ng-dirty",
    ud = "ng-pending",
    Xf = [
      "$scope",
      "$exceptionHandler",
      "$attrs",
      "$element",
      "$parse",
      "$animate",
      "$timeout",
      "$rootScope",
      "$q",
      "$interpolate",
      function (a, c, d, e, f, g, h, k, l, m) {
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$$rawModelValue = u;
        this.$validators = {};
        this.$asyncValidators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = !0;
        this.$touched = !1;
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$error = {};
        this.$$success = {};
        this.$pending = u;
        this.$name = m(d.name || "", !1)(a);
        var p = f(d.ngModel),
          s = p.assign,
          t = p,
          q = s,
          N = null,
          n = this;
        this.$$setOptions = function (a) {
          if ((n.$options = a) && a.getterSetter) {
            var c = f(d.ngModel + "()"),
              g = f(d.ngModel + "($$$p)");
            t = function (a) {
              var d = p(a);
              F(d) && (d = c(a));
              return d;
            };
            q = function (a, c) {
              F(p(a)) ? g(a, { $$$p: n.$modelValue }) : s(a, n.$modelValue);
            };
          } else if (!p.assign) throw Hb("nonassign", d.ngModel, va(e));
        };
        this.$render = x;
        this.$isEmpty = function (a) {
          return G(a) || "" === a || null === a || a !== a;
        };
        var v = e.inheritedData("$formController") || Eb,
          w = 0;
        pd({
          ctrl: this,
          $element: e,
          set: function (a, c) {
            a[c] = !0;
          },
          unset: function (a, c) {
            delete a[c];
          },
          parentForm: v,
          $animate: g,
        });
        this.$setPristine = function () {
          n.$dirty = !1;
          n.$pristine = !0;
          g.removeClass(e, Fb);
          g.addClass(e, Qa);
        };
        this.$setDirty = function () {
          n.$dirty = !0;
          n.$pristine = !1;
          g.removeClass(e, Qa);
          g.addClass(e, Fb);
          v.$setDirty();
        };
        this.$setUntouched = function () {
          n.$touched = !1;
          n.$untouched = !0;
          g.setClass(e, "ng-untouched", "ng-touched");
        };
        this.$setTouched = function () {
          n.$touched = !0;
          n.$untouched = !1;
          g.setClass(e, "ng-touched", "ng-untouched");
        };
        this.$rollbackViewValue = function () {
          h.cancel(N);
          n.$viewValue = n.$$lastCommittedViewValue;
          n.$render();
        };
        this.$validate = function () {
          if (!X(n.$modelValue) || !isNaN(n.$modelValue)) {
            var a = n.$$rawModelValue,
              c = n.$valid,
              d = n.$modelValue,
              e = n.$options && n.$options.allowInvalid;
            n.$$runValidators(
              n.$error[n.$$parserName || "parse"] ? !1 : u,
              a,
              n.$$lastCommittedViewValue,
              function (f) {
                e ||
                  c === f ||
                  ((n.$modelValue = f ? a : u),
                  n.$modelValue !== d && n.$$writeModelToScope());
              }
            );
          }
        };
        this.$$runValidators = function (a, c, d, e) {
          function f() {
            var a = !0;
            r(n.$validators, function (e, f) {
              var g = e(c, d);
              a = a && g;
              h(f, g);
            });
            return a
              ? !0
              : (r(n.$asyncValidators, function (a, c) {
                  h(c, null);
                }),
                !1);
          }
          function g() {
            var a = [],
              e = !0;
            r(n.$asyncValidators, function (f, g) {
              var k = f(c, d);
              if (!k || !F(k.then)) throw Hb("$asyncValidators", k);
              h(g, u);
              a.push(
                k.then(
                  function () {
                    h(g, !0);
                  },
                  function (a) {
                    e = !1;
                    h(g, !1);
                  }
                )
              );
            });
            a.length
              ? l.all(a).then(function () {
                  k(e);
                }, x)
              : k(!0);
          }
          function h(a, c) {
            m === w && n.$setValidity(a, c);
          }
          function k(a) {
            m === w && e(a);
          }
          w++;
          var m = w;
          (function (a) {
            var c = n.$$parserName || "parse";
            if (a === u) h(c, null);
            else if ((h(c, a), !a))
              return (
                r(n.$validators, function (a, c) {
                  h(c, null);
                }),
                r(n.$asyncValidators, function (a, c) {
                  h(c, null);
                }),
                !1
              );
            return !0;
          })(a)
            ? f()
              ? g()
              : k(!1)
            : k(!1);
        };
        this.$commitViewValue = function () {
          var a = n.$viewValue;
          h.cancel(N);
          if (
            n.$$lastCommittedViewValue !== a ||
            ("" === a && n.$$hasNativeValidators)
          )
            (n.$$lastCommittedViewValue = a),
              n.$pristine && this.$setDirty(),
              this.$$parseAndValidate();
        };
        this.$$parseAndValidate = function () {
          var c = n.$$lastCommittedViewValue,
            d = c,
            e = G(d) ? u : !0;
          if (e)
            for (var f = 0; f < n.$parsers.length; f++)
              if (((d = n.$parsers[f](d)), G(d))) {
                e = !1;
                break;
              }
          X(n.$modelValue) && isNaN(n.$modelValue) && (n.$modelValue = t(a));
          var g = n.$modelValue,
            h = n.$options && n.$options.allowInvalid;
          n.$$rawModelValue = d;
          h &&
            ((n.$modelValue = d),
            n.$modelValue !== g && n.$$writeModelToScope());
          n.$$runValidators(e, d, c, function (a) {
            h ||
              ((n.$modelValue = a ? d : u),
              n.$modelValue !== g && n.$$writeModelToScope());
          });
        };
        this.$$writeModelToScope = function () {
          q(a, n.$modelValue);
          r(n.$viewChangeListeners, function (a) {
            try {
              a();
            } catch (d) {
              c(d);
            }
          });
        };
        this.$setViewValue = function (a, c) {
          n.$viewValue = a;
          (n.$options && !n.$options.updateOnDefault) ||
            n.$$debounceViewValueCommit(c);
        };
        this.$$debounceViewValueCommit = function (c) {
          var d = 0,
            e = n.$options;
          e &&
            y(e.debounce) &&
            ((e = e.debounce),
            X(e)
              ? (d = e)
              : X(e[c])
              ? (d = e[c])
              : X(e["default"]) && (d = e["default"]));
          h.cancel(N);
          d
            ? (N = h(function () {
                n.$commitViewValue();
              }, d))
            : k.$$phase
            ? n.$commitViewValue()
            : a.$apply(function () {
                n.$commitViewValue();
              });
        };
        a.$watch(function () {
          var c = t(a);
          if (c !== n.$modelValue) {
            n.$modelValue = n.$$rawModelValue = c;
            for (var d = n.$formatters, e = d.length, f = c; e--; ) f = d[e](f);
            n.$viewValue !== f &&
              ((n.$viewValue = n.$$lastCommittedViewValue = f),
              n.$render(),
              n.$$runValidators(u, c, f, x));
          }
          return c;
        });
      },
    ],
    se = [
      "$rootScope",
      function (a) {
        return {
          restrict: "A",
          require: ["ngModel", "^?form", "^?ngModelOptions"],
          controller: Xf,
          priority: 1,
          compile: function (c) {
            c.addClass(Qa).addClass("ng-untouched").addClass(ib);
            return {
              pre: function (a, c, f, g) {
                var h = g[0],
                  k = g[1] || Eb;
                h.$$setOptions(g[2] && g[2].$options);
                k.$addControl(h);
                f.$observe("name", function (a) {
                  h.$name !== a && k.$$renameControl(h, a);
                });
                a.$on("$destroy", function () {
                  k.$removeControl(h);
                });
              },
              post: function (c, e, f, g) {
                var h = g[0];
                if (h.$options && h.$options.updateOn)
                  e.on(h.$options.updateOn, function (a) {
                    h.$$debounceViewValueCommit(a && a.type);
                  });
                e.on("blur", function (e) {
                  h.$touched ||
                    (a.$$phase
                      ? c.$evalAsync(h.$setTouched)
                      : c.$apply(h.$setTouched));
                });
              },
            };
          },
        };
      },
    ],
    ue = ca({
      restrict: "A",
      require: "ngModel",
      link: function (a, c, d, e) {
        e.$viewChangeListeners.push(function () {
          a.$eval(d.ngChange);
        });
      },
    }),
    xc = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, c, d, e) {
          e &&
            ((d.required = !0),
            (e.$validators.required = function (a, c) {
              return !d.required || !e.$isEmpty(c);
            }),
            d.$observe("required", function () {
              e.$validate();
            }));
        },
      };
    },
    wc = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, c, d, e) {
          if (e) {
            var f,
              g = d.ngPattern || d.pattern;
            d.$observe("pattern", function (a) {
              I(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));
              if (a && !a.test) throw z("ngPattern")("noregexp", g, a, va(c));
              f = a || u;
              e.$validate();
            });
            e.$validators.pattern = function (a) {
              return e.$isEmpty(a) || G(f) || f.test(a);
            };
          }
        },
      };
    },
    zc = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, c, d, e) {
          if (e) {
            var f = -1;
            d.$observe("maxlength", function (a) {
              a = $(a);
              f = isNaN(a) ? -1 : a;
              e.$validate();
            });
            e.$validators.maxlength = function (a, c) {
              return 0 > f || e.$isEmpty(a) || c.length <= f;
            };
          }
        },
      };
    },
    yc = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, c, d, e) {
          if (e) {
            var f = 0;
            d.$observe("minlength", function (a) {
              f = $(a) || 0;
              e.$validate();
            });
            e.$validators.minlength = function (a, c) {
              return e.$isEmpty(c) || c.length >= f;
            };
          }
        },
      };
    },
    te = function () {
      return {
        restrict: "A",
        priority: 100,
        require: "ngModel",
        link: function (a, c, d, e) {
          var f = c.attr(d.$attr.ngList) || ", ",
            g = "false" !== d.ngTrim,
            h = g ? P(f) : f;
          e.$parsers.push(function (a) {
            if (!G(a)) {
              var c = [];
              a &&
                r(a.split(h), function (a) {
                  a && c.push(g ? P(a) : a);
                });
              return c;
            }
          });
          e.$formatters.push(function (a) {
            return D(a) ? a.join(f) : u;
          });
          e.$isEmpty = function (a) {
            return !a || !a.length;
          };
        },
      };
    },
    Yf = /^(true|false|\d+)$/,
    ve = function () {
      return {
        restrict: "A",
        priority: 100,
        compile: function (a, c) {
          return Yf.test(c.ngValue)
            ? function (a, c, f) {
                f.$set("value", a.$eval(f.ngValue));
              }
            : function (a, c, f) {
                a.$watch(f.ngValue, function (a) {
                  f.$set("value", a);
                });
              };
        },
      };
    },
    we = function () {
      return {
        restrict: "A",
        controller: [
          "$scope",
          "$attrs",
          function (a, c) {
            var d = this;
            this.$options = a.$eval(c.ngModelOptions);
            this.$options.updateOn !== u
              ? ((this.$options.updateOnDefault = !1),
                (this.$options.updateOn = P(
                  this.$options.updateOn.replace(Wf, function () {
                    d.$options.updateOnDefault = !0;
                    return " ";
                  })
                )))
              : (this.$options.updateOnDefault = !0);
          },
        ],
      };
    },
    Wd = [
      "$compile",
      function (a) {
        return {
          restrict: "AC",
          compile: function (c) {
            a.$$addBindingClass(c);
            return function (c, e, f) {
              a.$$addBindingInfo(e, f.ngBind);
              e = e[0];
              c.$watch(f.ngBind, function (a) {
                e.textContent = a === u ? "" : a;
              });
            };
          },
        };
      },
    ],
    Yd = [
      "$interpolate",
      "$compile",
      function (a, c) {
        return {
          compile: function (d) {
            c.$$addBindingClass(d);
            return function (d, f, g) {
              d = a(f.attr(g.$attr.ngBindTemplate));
              c.$$addBindingInfo(f, d.expressions);
              f = f[0];
              g.$observe("ngBindTemplate", function (a) {
                f.textContent = a === u ? "" : a;
              });
            };
          },
        };
      },
    ],
    Xd = [
      "$sce",
      "$parse",
      "$compile",
      function (a, c, d) {
        return {
          restrict: "A",
          compile: function (e, f) {
            var g = c(f.ngBindHtml),
              h = c(f.ngBindHtml, function (a) {
                return (a || "").toString();
              });
            d.$$addBindingClass(e);
            return function (c, e, f) {
              d.$$addBindingInfo(e, f.ngBindHtml);
              c.$watch(h, function () {
                e.html(a.getTrustedHtml(g(c)) || "");
              });
            };
          },
        };
      },
    ],
    Zd = ic("", !0),
    ae = ic("Odd", 0),
    $d = ic("Even", 1),
    be = Ia({
      compile: function (a, c) {
        c.$set("ngCloak", u);
        a.removeClass("ng-cloak");
      },
    }),
    ce = [
      function () {
        return { restrict: "A", scope: !0, controller: "@", priority: 500 };
      },
    ],
    Ac = {},
    Zf = { blur: !0, focus: !0 };
  r(
    "click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(
      " "
    ),
    function (a) {
      var c = wa("ng-" + a);
      Ac[c] = [
        "$parse",
        "$rootScope",
        function (d, e) {
          return {
            restrict: "A",
            compile: function (f, g) {
              var h = d(g[c], null, !0);
              return function (c, d) {
                d.on(a, function (d) {
                  var f = function () {
                    h(c, { $event: d });
                  };
                  Zf[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f);
                });
              };
            },
          };
        },
      ];
    }
  );
  var fe = [
      "$animate",
      function (a) {
        return {
          multiElement: !0,
          transclude: "element",
          priority: 600,
          terminal: !0,
          restrict: "A",
          $$tlb: !0,
          link: function (c, d, e, f, g) {
            var h, k, l;
            c.$watch(e.ngIf, function (c) {
              c
                ? k ||
                  g(function (c, f) {
                    k = f;
                    c[c.length++] = V.createComment(
                      " end ngIf: " + e.ngIf + " "
                    );
                    h = { clone: c };
                    a.enter(c, d.parent(), d);
                  })
                : (l && (l.remove(), (l = null)),
                  k && (k.$destroy(), (k = null)),
                  h &&
                    ((l = qb(h.clone)),
                    a.leave(l).then(function () {
                      l = null;
                    }),
                    (h = null)));
            });
          },
        };
      },
    ],
    ge = [
      "$templateRequest",
      "$anchorScroll",
      "$animate",
      "$sce",
      function (a, c, d, e) {
        return {
          restrict: "ECA",
          priority: 400,
          terminal: !0,
          transclude: "element",
          controller: ha.noop,
          compile: function (f, g) {
            var h = g.ngInclude || g.src,
              k = g.onload || "",
              l = g.autoscroll;
            return function (f, g, s, r, q) {
              var u = 0,
                n,
                v,
                w,
                O = function () {
                  v && (v.remove(), (v = null));
                  n && (n.$destroy(), (n = null));
                  w &&
                    (d.leave(w).then(function () {
                      v = null;
                    }),
                    (v = w),
                    (w = null));
                };
              f.$watch(e.parseAsResourceUrl(h), function (e) {
                var h = function () {
                    !y(l) || (l && !f.$eval(l)) || c();
                  },
                  s = ++u;
                e
                  ? (a(e, !0).then(
                      function (a) {
                        if (s === u) {
                          var c = f.$new();
                          r.template = a;
                          a = q(c, function (a) {
                            O();
                            d.enter(a, null, g).then(h);
                          });
                          n = c;
                          w = a;
                          n.$emit("$includeContentLoaded", e);
                          f.$eval(k);
                        }
                      },
                      function () {
                        s === u && (O(), f.$emit("$includeContentError", e));
                      }
                    ),
                    f.$emit("$includeContentRequested", e))
                  : (O(), (r.template = null));
              });
            };
          },
        };
      },
    ],
    xe = [
      "$compile",
      function (a) {
        return {
          restrict: "ECA",
          priority: -400,
          require: "ngInclude",
          link: function (c, d, e, f) {
            /SVG/.test(d[0].toString())
              ? (d.empty(),
                a(Dc(f.template, V).childNodes)(
                  c,
                  function (a) {
                    d.append(a);
                  },
                  { futureParentElement: d }
                ))
              : (d.html(f.template), a(d.contents())(c));
          },
        };
      },
    ],
    he = Ia({
      priority: 450,
      compile: function () {
        return {
          pre: function (a, c, d) {
            a.$eval(d.ngInit);
          },
        };
      },
    }),
    ie = Ia({ terminal: !0, priority: 1e3 }),
    je = [
      "$locale",
      "$interpolate",
      function (a, c) {
        var d = /{}/g,
          e = /^when(Minus)?(.+)$/;
        return {
          restrict: "EA",
          link: function (f, g, h) {
            function k(a) {
              g.text(a || "");
            }
            var l = h.count,
              m = h.$attr.when && g.attr(h.$attr.when),
              p = h.offset || 0,
              s = f.$eval(m) || {},
              t = {},
              m = c.startSymbol(),
              q = c.endSymbol(),
              u = m + l + "-" + p + q,
              n = ha.noop,
              v;
            r(h, function (a, c) {
              var d = e.exec(c);
              d &&
                ((d = (d[1] ? "-" : "") + R(d[2])),
                (s[d] = g.attr(h.$attr[c])));
            });
            r(s, function (a, e) {
              t[e] = c(a.replace(d, u));
            });
            f.$watch(l, function (c) {
              c = parseFloat(c);
              var d = isNaN(c);
              d || c in s || (c = a.pluralCat(c - p));
              c === v ||
                (d && isNaN(v)) ||
                (n(), (n = f.$watch(t[c], k)), (v = c));
            });
          },
        };
      },
    ],
    ke = [
      "$parse",
      "$animate",
      function (a, c) {
        var d = z("ngRepeat"),
          e = function (a, c, d, e, l, m, p) {
            a[d] = e;
            l && (a[l] = m);
            a.$index = c;
            a.$first = 0 === c;
            a.$last = c === p - 1;
            a.$middle = !(a.$first || a.$last);
            a.$odd = !(a.$even = 0 === (c & 1));
          };
        return {
          restrict: "A",
          multiElement: !0,
          transclude: "element",
          priority: 1e3,
          terminal: !0,
          $$tlb: !0,
          compile: function (f, g) {
            var h = g.ngRepeat,
              k = V.createComment(" end ngRepeat: " + h + " "),
              l = h.match(
                /^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/
              );
            if (!l) throw d("iexp", h);
            var m = l[1],
              p = l[2],
              s = l[3],
              t = l[4],
              l = m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
            if (!l) throw d("iidexp", m);
            var q = l[3] || l[1],
              y = l[2];
            if (
              s &&
              (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s) ||
                /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(
                  s
                ))
            )
              throw d("badident", s);
            var n,
              v,
              w,
              z,
              E = { $id: Ma };
            t
              ? (n = a(t))
              : ((w = function (a, c) {
                  return Ma(c);
                }),
                (z = function (a) {
                  return a;
                }));
            return function (a, f, g, l, m) {
              n &&
                (v = function (c, d, e) {
                  y && (E[y] = c);
                  E[q] = d;
                  E.$index = e;
                  return n(a, E);
                });
              var t = ia();
              a.$watchCollection(p, function (g) {
                var l,
                  n,
                  p = f[0],
                  B,
                  E = ia(),
                  C,
                  x,
                  G,
                  T,
                  D,
                  F,
                  I;
                s && (a[s] = g);
                if (Ra(g)) (D = g), (n = v || w);
                else {
                  n = v || z;
                  D = [];
                  for (I in g)
                    g.hasOwnProperty(I) && "$" != I.charAt(0) && D.push(I);
                  D.sort();
                }
                C = D.length;
                I = Array(C);
                for (l = 0; l < C; l++)
                  if (
                    ((x = g === D ? l : D[l]),
                    (G = g[x]),
                    (T = n(x, G, l)),
                    t[T])
                  )
                    (F = t[T]), delete t[T], (E[T] = F), (I[l] = F);
                  else {
                    if (E[T])
                      throw (
                        (r(I, function (a) {
                          a && a.scope && (t[a.id] = a);
                        }),
                        d("dupes", h, T, G))
                      );
                    I[l] = { id: T, scope: u, clone: u };
                    E[T] = !0;
                  }
                for (B in t) {
                  F = t[B];
                  T = qb(F.clone);
                  c.leave(T);
                  if (T[0].parentNode)
                    for (l = 0, n = T.length; l < n; l++)
                      T[l].$$NG_REMOVED = !0;
                  F.scope.$destroy();
                }
                for (l = 0; l < C; l++)
                  if (
                    ((x = g === D ? l : D[l]), (G = g[x]), (F = I[l]), F.scope)
                  ) {
                    B = p;
                    do B = B.nextSibling;
                    while (B && B.$$NG_REMOVED);
                    F.clone[0] != B && c.move(qb(F.clone), null, A(p));
                    p = F.clone[F.clone.length - 1];
                    e(F.scope, l, q, G, y, x, C);
                  } else
                    m(function (a, d) {
                      F.scope = d;
                      var f = k.cloneNode(!1);
                      a[a.length++] = f;
                      c.enter(a, null, A(p));
                      p = f;
                      F.clone = a;
                      E[F.id] = F;
                      e(F.scope, l, q, G, y, x, C);
                    });
                t = E;
              });
            };
          },
        };
      },
    ],
    le = [
      "$animate",
      function (a) {
        return {
          restrict: "A",
          multiElement: !0,
          link: function (c, d, e) {
            c.$watch(e.ngShow, function (c) {
              a[c ? "removeClass" : "addClass"](d, "ng-hide", {
                tempClasses: "ng-hide-animate",
              });
            });
          },
        };
      },
    ],
    ee = [
      "$animate",
      function (a) {
        return {
          restrict: "A",
          multiElement: !0,
          link: function (c, d, e) {
            c.$watch(e.ngHide, function (c) {
              a[c ? "addClass" : "removeClass"](d, "ng-hide", {
                tempClasses: "ng-hide-animate",
              });
            });
          },
        };
      },
    ],
    me = Ia(function (a, c, d) {
      a.$watch(
        d.ngStyle,
        function (a, d) {
          d &&
            a !== d &&
            r(d, function (a, d) {
              c.css(d, "");
            });
          a && c.css(a);
        },
        !0
      );
    }),
    ne = [
      "$animate",
      function (a) {
        return {
          restrict: "EA",
          require: "ngSwitch",
          controller: [
            "$scope",
            function () {
              this.cases = {};
            },
          ],
          link: function (c, d, e, f) {
            var g = [],
              h = [],
              k = [],
              l = [],
              m = function (a, c) {
                return function () {
                  a.splice(c, 1);
                };
              };
            c.$watch(e.ngSwitch || e.on, function (c) {
              var d, e;
              d = 0;
              for (e = k.length; d < e; ++d) a.cancel(k[d]);
              d = k.length = 0;
              for (e = l.length; d < e; ++d) {
                var q = qb(h[d].clone);
                l[d].$destroy();
                (k[d] = a.leave(q)).then(m(k, d));
              }
              h.length = 0;
              l.length = 0;
              (g = f.cases["!" + c] || f.cases["?"]) &&
                r(g, function (c) {
                  c.transclude(function (d, e) {
                    l.push(e);
                    var f = c.element;
                    d[d.length++] = V.createComment(" end ngSwitchWhen: ");
                    h.push({ clone: d });
                    a.enter(d, f.parent(), f);
                  });
                });
            });
          },
        };
      },
    ],
    oe = Ia({
      transclude: "element",
      priority: 1200,
      require: "^ngSwitch",
      multiElement: !0,
      link: function (a, c, d, e, f) {
        e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
        e.cases["!" + d.ngSwitchWhen].push({ transclude: f, element: c });
      },
    }),
    pe = Ia({
      transclude: "element",
      priority: 1200,
      require: "^ngSwitch",
      multiElement: !0,
      link: function (a, c, d, e, f) {
        e.cases["?"] = e.cases["?"] || [];
        e.cases["?"].push({ transclude: f, element: c });
      },
    }),
    re = Ia({
      restrict: "EAC",
      link: function (a, c, d, e, f) {
        if (!f) throw z("ngTransclude")("orphan", va(c));
        f(function (a) {
          c.empty();
          c.append(a);
        });
      },
    }),
    Sd = [
      "$templateCache",
      function (a) {
        return {
          restrict: "E",
          terminal: !0,
          compile: function (c, d) {
            "text/ng-template" == d.type && a.put(d.id, c[0].text);
          },
        };
      },
    ],
    $f = z("ngOptions"),
    qe = ca({ restrict: "A", terminal: !0 }),
    Td = [
      "$compile",
      "$parse",
      function (a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
          e = { $setViewValue: x };
        return {
          restrict: "E",
          require: ["select", "?ngModel"],
          controller: [
            "$element",
            "$scope",
            "$attrs",
            function (a, c, d) {
              var k = this,
                l = {},
                m = e,
                p;
              k.databound = d.ngModel;
              k.init = function (a, c, d) {
                m = a;
                p = d;
              };
              k.addOption = function (c, d) {
                La(c, '"option value"');
                l[c] = !0;
                m.$viewValue == c && (a.val(c), p.parent() && p.remove());
                d && d[0].hasAttribute("selected") && (d[0].selected = !0);
              };
              k.removeOption = function (a) {
                this.hasOption(a) &&
                  (delete l[a],
                  m.$viewValue == a && this.renderUnknownOption(a));
              };
              k.renderUnknownOption = function (c) {
                c = "? " + Ma(c) + " ?";
                p.val(c);
                a.prepend(p);
                a.val(c);
                p.prop("selected", !0);
              };
              k.hasOption = function (a) {
                return l.hasOwnProperty(a);
              };
              c.$on("$destroy", function () {
                k.renderUnknownOption = x;
              });
            },
          ],
          link: function (e, g, h, k) {
            function l(a, c, d, e) {
              d.$render = function () {
                var a = d.$viewValue;
                e.hasOption(a)
                  ? (E.parent() && E.remove(),
                    c.val(a),
                    "" === a && n.prop("selected", !0))
                  : G(a) && n
                  ? c.val("")
                  : e.renderUnknownOption(a);
              };
              c.on("change", function () {
                a.$apply(function () {
                  E.parent() && E.remove();
                  d.$setViewValue(c.val());
                });
              });
            }
            function m(a, c, d) {
              var e;
              d.$render = function () {
                var a = new cb(d.$viewValue);
                r(c.find("option"), function (c) {
                  c.selected = y(a.get(c.value));
                });
              };
              a.$watch(function () {
                pa(e, d.$viewValue) || ((e = ua(d.$viewValue)), d.$render());
              });
              c.on("change", function () {
                a.$apply(function () {
                  var a = [];
                  r(c.find("option"), function (c) {
                    c.selected && a.push(c.value);
                  });
                  d.$setViewValue(a);
                });
              });
            }
            function p(e, f, g) {
              function h(a, c, d) {
                U[x] = d;
                G && (U[G] = c);
                return a(e, U);
              }
              function k(a) {
                var c;
                if (t)
                  if (K && D(a)) {
                    c = new cb([]);
                    for (var d = 0; d < a.length; d++)
                      c.put(h(K, null, a[d]), !0);
                  } else c = new cb(a);
                else K && (a = h(K, null, a));
                return function (d, e) {
                  var f;
                  f = K ? K : C ? C : H;
                  return t ? y(c.remove(h(f, d, e))) : a === h(f, d, e);
                };
              }
              function l() {
                v || (e.$$postDigest(n), (v = !0));
              }
              function m(a, c, d) {
                a[c] = a[c] || 0;
                a[c] += d ? 1 : -1;
              }
              function n() {
                v = !1;
                var a = { "": [] },
                  c = [""],
                  d,
                  l,
                  p,
                  q,
                  u;
                p = g.$viewValue;
                q = M(e) || [];
                var C = G ? Object.keys(q).sort() : q,
                  x,
                  A,
                  H,
                  D,
                  Q = {};
                u = k(p);
                var P = !1,
                  V,
                  X;
                S = {};
                for (D = 0; (H = C.length), D < H; D++) {
                  x = D;
                  if (G && ((x = C[D]), "$" === x.charAt(0))) continue;
                  A = q[x];
                  d = h(I, x, A) || "";
                  (l = a[d]) || ((l = a[d] = []), c.push(d));
                  d = u(x, A);
                  P = P || d;
                  A = h(E, x, A);
                  A = y(A) ? A : "";
                  X = K ? K(e, U) : G ? C[D] : D;
                  K && (S[X] = x);
                  l.push({ id: X, label: A, selected: d });
                }
                t ||
                  (z || null === p
                    ? a[""].unshift({ id: "", label: "", selected: !P })
                    : P || a[""].unshift({ id: "?", label: "", selected: !0 }));
                x = 0;
                for (C = c.length; x < C; x++) {
                  d = c[x];
                  l = a[d];
                  R.length <= x
                    ? ((p = {
                        element: F.clone().attr("label", d),
                        label: l.label,
                      }),
                      (q = [p]),
                      R.push(q),
                      f.append(p.element))
                    : ((q = R[x]),
                      (p = q[0]),
                      p.label != d && p.element.attr("label", (p.label = d)));
                  P = null;
                  D = 0;
                  for (H = l.length; D < H; D++)
                    (d = l[D]),
                      (u = q[D + 1])
                        ? ((P = u.element),
                          u.label !== d.label &&
                            (m(Q, u.label, !1),
                            m(Q, d.label, !0),
                            P.text((u.label = d.label)),
                            P.prop("label", u.label)),
                          u.id !== d.id && P.val((u.id = d.id)),
                          P[0].selected !== d.selected &&
                            (P.prop("selected", (u.selected = d.selected)),
                            Ha && P.prop("selected", u.selected)))
                        : ("" === d.id && z
                            ? (V = z)
                            : (V = w.clone())
                                .val(d.id)
                                .prop("selected", d.selected)
                                .attr("selected", d.selected)
                                .prop("label", d.label)
                                .text(d.label),
                          q.push(
                            (u = {
                              element: V,
                              label: d.label,
                              id: d.id,
                              selected: d.selected,
                            })
                          ),
                          m(Q, d.label, !0),
                          P ? P.after(V) : p.element.append(V),
                          (P = V));
                  for (D++; q.length > D; )
                    (d = q.pop()), m(Q, d.label, !1), d.element.remove();
                  r(Q, function (a, c) {
                    0 < a ? s.addOption(c) : 0 > a && s.removeOption(c);
                  });
                }
                for (; R.length > x; ) R.pop()[0].element.remove();
              }
              var p;
              if (!(p = q.match(d))) throw $f("iexp", q, va(f));
              var E = c(p[2] || p[1]),
                x = p[4] || p[6],
                A = / as /.test(p[0]) && p[1],
                C = A ? c(A) : null,
                G = p[5],
                I = c(p[3] || ""),
                H = c(p[2] ? p[1] : x),
                M = c(p[7]),
                K = p[8] ? c(p[8]) : null,
                S = {},
                R = [[{ element: f, label: "" }]],
                U = {};
              z && (a(z)(e), z.removeClass("ng-scope"), z.remove());
              f.empty();
              f.on("change", function () {
                e.$apply(function () {
                  var a = M(e) || [],
                    c;
                  if (t)
                    (c = []),
                      r(f.val(), function (d) {
                        d = K ? S[d] : d;
                        c.push(
                          "?" === d
                            ? u
                            : "" === d
                            ? null
                            : h(C ? C : H, d, a[d])
                        );
                      });
                  else {
                    var d = K ? S[f.val()] : f.val();
                    c = "?" === d ? u : "" === d ? null : h(C ? C : H, d, a[d]);
                  }
                  g.$setViewValue(c);
                  n();
                });
              });
              g.$render = n;
              e.$watchCollection(M, l);
              e.$watchCollection(function () {
                var a = M(e),
                  c;
                if (a && D(a)) {
                  c = Array(a.length);
                  for (var d = 0, f = a.length; d < f; d++)
                    c[d] = h(E, d, a[d]);
                } else if (a) for (d in ((c = {}), a)) a.hasOwnProperty(d) && (c[d] = h(E, d, a[d]));
                return c;
              }, l);
              t &&
                e.$watchCollection(function () {
                  return g.$modelValue;
                }, l);
            }
            if (k[1]) {
              var s = k[0];
              k = k[1];
              var t = h.multiple,
                q = h.ngOptions,
                z = !1,
                n,
                v = !1,
                w = A(V.createElement("option")),
                F = A(V.createElement("optgroup")),
                E = w.clone();
              h = 0;
              for (var x = g.children(), C = x.length; h < C; h++)
                if ("" === x[h].value) {
                  n = z = x.eq(h);
                  break;
                }
              s.init(k, z, E);
              t &&
                (k.$isEmpty = function (a) {
                  return !a || 0 === a.length;
                });
              q ? p(e, g, k) : t ? m(e, g, k) : l(e, g, k, s);
            }
          },
        };
      },
    ],
    Vd = [
      "$interpolate",
      function (a) {
        var c = { addOption: x, removeOption: x };
        return {
          restrict: "E",
          priority: 100,
          compile: function (d, e) {
            if (G(e.value)) {
              var f = a(d.text(), !0);
              f || e.$set("value", d.text());
            }
            return function (a, d, e) {
              var l = d.parent(),
                m =
                  l.data("$selectController") ||
                  l.parent().data("$selectController");
              (m && m.databound) || (m = c);
              f
                ? a.$watch(f, function (a, c) {
                    e.$set("value", a);
                    c !== a && m.removeOption(c);
                    m.addOption(a, d);
                  })
                : m.addOption(e.value, d);
              d.on("$destroy", function () {
                m.removeOption(e.value);
              });
            };
          },
        };
      },
    ],
    Ud = ca({ restrict: "E", terminal: !1 });
  U.angular.bootstrap
    ? console.log("WARNING: Tried to load angular more than once.")
    : (Kd(),
      Md(ha),
      A(V).ready(function () {
        Gd(V, rc);
      }));
})(window, document);
!window.angular.$$csp() &&
  window.angular
    .element(document)
    .find("head")
    .prepend(
      '<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'
    );
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.4
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (p, d, C) {
  "use strict";
  function v(r, h, g) {
    return {
      restrict: "ECA",
      terminal: !0,
      priority: 400,
      transclude: "element",
      link: function (a, c, b, f, y) {
        function z() {
          k && (g.cancel(k), (k = null));
          l && (l.$destroy(), (l = null));
          m &&
            ((k = g.leave(m)),
            k.then(function () {
              k = null;
            }),
            (m = null));
        }
        function x() {
          var b = r.current && r.current.locals;
          if (d.isDefined(b && b.$template)) {
            var b = a.$new(),
              f = r.current;
            m = y(b, function (b) {
              g.enter(b, null, m || c).then(function () {
                !d.isDefined(t) || (t && !a.$eval(t)) || h();
              });
              z();
            });
            l = f.scope = b;
            l.$emit("$viewContentLoaded");
            l.$eval(w);
          } else z();
        }
        var l,
          m,
          k,
          t = b.autoscroll,
          w = b.onload || "";
        a.$on("$routeChangeSuccess", x);
        x();
      },
    };
  }
  function A(d, h, g) {
    return {
      restrict: "ECA",
      priority: -400,
      link: function (a, c) {
        var b = g.current,
          f = b.locals;
        c.html(f.$template);
        var y = d(c.contents());
        b.controller &&
          ((f.$scope = a),
          (f = h(b.controller, f)),
          b.controllerAs && (a[b.controllerAs] = f),
          c.data("$ngControllerController", f),
          c.children().data("$ngControllerController", f));
        y(a);
      },
    };
  }
  p = d.module("ngRoute", ["ng"]).provider("$route", function () {
    function r(a, c) {
      return d.extend(Object.create(a), c);
    }
    function h(a, d) {
      var b = d.caseInsensitiveMatch,
        f = { originalPath: a, regexp: a },
        g = (f.keys = []);
      a = a
        .replace(/([().])/g, "\\$1")
        .replace(/(\/)?:(\w+)([\?\*])?/g, function (a, d, b, c) {
          a = "?" === c ? c : null;
          c = "*" === c ? c : null;
          g.push({ name: b, optional: !!a });
          d = d || "";
          return (
            "" +
            (a ? "" : d) +
            "(?:" +
            (a ? d : "") +
            ((c && "(.+?)") || "([^/]+)") +
            (a || "") +
            ")" +
            (a || "")
          );
        })
        .replace(/([\/$\*])/g, "\\$1");
      f.regexp = new RegExp("^" + a + "$", b ? "i" : "");
      return f;
    }
    var g = {};
    this.when = function (a, c) {
      var b = d.copy(c);
      d.isUndefined(b.reloadOnSearch) && (b.reloadOnSearch = !0);
      d.isUndefined(b.caseInsensitiveMatch) &&
        (b.caseInsensitiveMatch = this.caseInsensitiveMatch);
      g[a] = d.extend(b, a && h(a, b));
      if (a) {
        var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
        g[f] = d.extend({ redirectTo: a }, h(f, b));
      }
      return this;
    };
    this.caseInsensitiveMatch = !1;
    this.otherwise = function (a) {
      "string" === typeof a && (a = { redirectTo: a });
      this.when(null, a);
      return this;
    };
    this.$get = [
      "$rootScope",
      "$location",
      "$routeParams",
      "$q",
      "$injector",
      "$templateRequest",
      "$sce",
      function (a, c, b, f, h, p, x) {
        function l(b) {
          var e = s.current;
          (v =
            (n = k()) &&
            e &&
            n.$$route === e.$$route &&
            d.equals(n.pathParams, e.pathParams) &&
            !n.reloadOnSearch &&
            !w) ||
            (!e && !n) ||
            (a.$broadcast("$routeChangeStart", n, e).defaultPrevented &&
              b &&
              b.preventDefault());
        }
        function m() {
          var u = s.current,
            e = n;
          if (v)
            (u.params = e.params),
              d.copy(u.params, b),
              a.$broadcast("$routeUpdate", u);
          else if (e || u)
            (w = !1),
              (s.current = e) &&
                e.redirectTo &&
                (d.isString(e.redirectTo)
                  ? c.path(t(e.redirectTo, e.params)).search(e.params).replace()
                  : c
                      .url(e.redirectTo(e.pathParams, c.path(), c.search()))
                      .replace()),
              f
                .when(e)
                .then(function () {
                  if (e) {
                    var a = d.extend({}, e.resolve),
                      b,
                      c;
                    d.forEach(a, function (b, e) {
                      a[e] = d.isString(b)
                        ? h.get(b)
                        : h.invoke(b, null, null, e);
                    });
                    d.isDefined((b = e.template))
                      ? d.isFunction(b) && (b = b(e.params))
                      : d.isDefined((c = e.templateUrl)) &&
                        (d.isFunction(c) && (c = c(e.params)),
                        (c = x.getTrustedResourceUrl(c)),
                        d.isDefined(c) &&
                          ((e.loadedTemplateUrl = c), (b = p(c))));
                    d.isDefined(b) && (a.$template = b);
                    return f.all(a);
                  }
                })
                .then(
                  function (c) {
                    e == s.current &&
                      (e && ((e.locals = c), d.copy(e.params, b)),
                      a.$broadcast("$routeChangeSuccess", e, u));
                  },
                  function (b) {
                    e == s.current &&
                      a.$broadcast("$routeChangeError", e, u, b);
                  }
                );
        }
        function k() {
          var a, b;
          d.forEach(g, function (f, g) {
            var q;
            if ((q = !b)) {
              var h = c.path();
              q = f.keys;
              var l = {};
              if (f.regexp)
                if ((h = f.regexp.exec(h))) {
                  for (var k = 1, m = h.length; k < m; ++k) {
                    var n = q[k - 1],
                      p = h[k];
                    n && p && (l[n.name] = p);
                  }
                  q = l;
                } else q = null;
              else q = null;
              q = a = q;
            }
            q &&
              ((b = r(f, {
                params: d.extend({}, c.search(), a),
                pathParams: a,
              })),
              (b.$$route = f));
          });
          return b || (g[null] && r(g[null], { params: {}, pathParams: {} }));
        }
        function t(a, b) {
          var c = [];
          d.forEach((a || "").split(":"), function (a, d) {
            if (0 === d) c.push(a);
            else {
              var f = a.match(/(\w+)(?:[?*])?(.*)/),
                g = f[1];
              c.push(b[g]);
              c.push(f[2] || "");
              delete b[g];
            }
          });
          return c.join("");
        }
        var w = !1,
          n,
          v,
          s = {
            routes: g,
            reload: function () {
              w = !0;
              a.$evalAsync(function () {
                l();
                m();
              });
            },
            updateParams: function (a) {
              if (this.current && this.current.$$route) {
                var b = {},
                  f = this;
                d.forEach(Object.keys(a), function (c) {
                  f.current.pathParams[c] || (b[c] = a[c]);
                });
                a = d.extend({}, this.current.params, a);
                c.path(t(this.current.$$route.originalPath, a));
                c.search(d.extend({}, c.search(), b));
              } else throw B("norout");
            },
          };
        a.$on("$locationChangeStart", l);
        a.$on("$locationChangeSuccess", m);
        return s;
      },
    ];
  });
  var B = d.$$minErr("ngRoute");
  p.provider("$routeParams", function () {
    this.$get = function () {
      return {};
    };
  });
  p.directive("ngView", v);
  p.directive("ngView", A);
  v.$inject = ["$route", "$anchorScroll", "$animate"];
  A.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map

// MIT License:
//
// Copyright (c) 2010-2013, Joe Walnes
//               2013-2017, Drew Noakes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Smoothie Charts - http://smoothiecharts.org/
 * (c) 2010-2013, Joe Walnes
 *     2013-2017, Drew Noakes
 *
 * v1.0: Main charting library, by Joe Walnes
 * v1.1: Auto scaling of axis, by Neil Dunn
 * v1.2: fps (frames per second) option, by Mathias Petterson
 * v1.3: Fix for divide by zero, by Paul Nikitochkin
 * v1.4: Set minimum, top-scale padding, remove timeseries, add optional timer to reset bounds, by Kelley Reynolds
 * v1.5: Set default frames per second to 50... smoother.
 *       .start(), .stop() methods for conserving CPU, by Dmitry Vyal
 *       options.interpolation = 'bezier' or 'line', by Dmitry Vyal
 *       options.maxValue to fix scale, by Dmitry Vyal
 * v1.6: minValue/maxValue will always get converted to floats, by Przemek Matylla
 * v1.7: options.grid.fillStyle may be a transparent color, by Dmitry A. Shashkin
 *       Smooth rescaling, by Kostas Michalopoulos
 * v1.8: Set max length to customize number of live points in the dataset with options.maxDataSetLength, by Krishna Narni
 * v1.9: Display timestamps along the bottom, by Nick and Stev-io
 *       (https://groups.google.com/forum/?fromgroups#!topic/smoothie-charts/-Ywse8FCpKI%5B1-25%5D)
 *       Refactored by Krishna Narni, to support timestamp formatting function
 * v1.10: Switch to requestAnimationFrame, removed the now obsoleted options.fps, by Gergely Imreh
 * v1.11: options.grid.sharpLines option added, by @drewnoakes
 *        Addressed warning seen in Firefox when seriesOption.fillStyle undefined, by @drewnoakes
 * v1.12: Support for horizontalLines added, by @drewnoakes
 *        Support for yRangeFunction callback added, by @drewnoakes
 * v1.13: Fixed typo (#32), by @alnikitich
 * v1.14: Timer cleared when last TimeSeries removed (#23), by @davidgaleano
 *        Fixed diagonal line on chart at start/end of data stream, by @drewnoakes
 * v1.15: Support for npm package (#18), by @dominictarr
 *        Fixed broken removeTimeSeries function (#24) by @davidgaleano
 *        Minor performance and tidying, by @drewnoakes
 * v1.16: Bug fix introduced in v1.14 relating to timer creation/clearance (#23), by @drewnoakes
 *        TimeSeries.append now deals with out-of-order timestamps, and can merge duplicates, by @zacwitte (#12)
 *        Documentation and some local variable renaming for clarity, by @drewnoakes
 * v1.17: Allow control over font size (#10), by @drewnoakes
 *        Timestamp text won't overlap, by @drewnoakes
 * v1.18: Allow control of max/min label precision, by @drewnoakes
 *        Added 'borderVisible' chart option, by @drewnoakes
 *        Allow drawing series with fill but no stroke (line), by @drewnoakes
 * v1.19: Avoid unnecessary repaints, and fixed flicker in old browsers having multiple charts in document (#40), by @asbai
 * v1.20: Add SmoothieChart.getTimeSeriesOptions and SmoothieChart.bringToFront functions, by @drewnoakes
 * v1.21: Add 'step' interpolation mode, by @drewnoakes
 * v1.22: Add support for different pixel ratios. Also add optional y limit formatters, by @copacetic
 * v1.23: Fix bug introduced in v1.22 (#44), by @drewnoakes
 * v1.24: Fix bug introduced in v1.23, re-adding parseFloat to y-axis formatter defaults, by @siggy_sf
 * v1.25: Fix bug seen when adding a data point to TimeSeries which is older than the current data, by @Nking92
 *        Draw time labels on top of series, by @comolosabia
 *        Add TimeSeries.clear function, by @drewnoakes
 * v1.26: Add support for resizing on high device pixel ratio screens, by @copacetic
 * v1.27: Fix bug introduced in v1.26 for non whole number devicePixelRatio values, by @zmbush
 * v1.28: Add 'minValueScale' option, by @megawac
 *        Fix 'labelPos' for different size of 'minValueString' 'maxValueString', by @henryn
 * v1.29: Support responsive sizing, by @drewnoakes
 * v1.29.1: Include types in package, and make property optional, by @TrentHouliston
 * v1.30: Fix inverted logic in devicePixelRatio support, by @scanlime
 * v1.31: Support tooltips, by @Sly1024 and @drewnoakes
 * v1.32: Support frame rate limit, by @dpuyosa
 * v1.33: Use Date static method instead of instance, by @nnnoel
 *        Fix bug with tooltips when multiple charts on a page, by @jpmbiz70
 */

(function (exports) {
  // Date.now polyfill
  Date.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };

  var Util = {
    extend: function () {
      arguments[0] = arguments[0] || {};
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            if (typeof arguments[i][key] === "object") {
              if (arguments[i][key] instanceof Array) {
                arguments[0][key] = arguments[i][key];
              } else {
                arguments[0][key] = Util.extend(
                  arguments[0][key],
                  arguments[i][key]
                );
              }
            } else {
              arguments[0][key] = arguments[i][key];
            }
          }
        }
      }
      return arguments[0];
    },
    binarySearch: function (data, value) {
      var low = 0,
        high = data.length;
      while (low < high) {
        var mid = (low + high) >> 1;
        if (value < data[mid][0]) high = mid;
        else low = mid + 1;
      }
      return low;
    },
  };

  /**
   * Initialises a new <code>TimeSeries</code> with optional data options.
   *
   * Options are of the form (defaults shown):
   *
   * <pre>
   * {
   *   resetBounds: true,        // enables/disables automatic scaling of the y-axis
   *   resetBoundsInterval: 3000 // the period between scaling calculations, in millis
   * }
   * </pre>
   *
   * Presentation options for TimeSeries are specified as an argument to <code>SmoothieChart.addTimeSeries</code>.
   *
   * @constructor
   */
  function TimeSeries(options) {
    this.options = Util.extend({}, TimeSeries.defaultOptions, options);
    this.clear();
  }

  TimeSeries.defaultOptions = {
    resetBoundsInterval: 3000,
    resetBounds: true,
  };

  /**
   * Clears all data and state from this TimeSeries object.
   */
  TimeSeries.prototype.clear = function () {
    this.data = [];
    this.maxValue = Number.NaN; // The maximum value ever seen in this TimeSeries.
    this.minValue = Number.NaN; // The minimum value ever seen in this TimeSeries.
  };

  /**
   * Recalculate the min/max values for this <code>TimeSeries</code> object.
   *
   * This causes the graph to scale itself in the y-axis.
   */
  TimeSeries.prototype.resetBounds = function () {
    if (this.data.length) {
      // Walk through all data points, finding the min/max value
      this.maxValue = this.data[0][1];
      this.minValue = this.data[0][1];
      for (var i = 1; i < this.data.length; i++) {
        var value = this.data[i][1];
        if (value > this.maxValue) {
          this.maxValue = value;
        }
        if (value < this.minValue) {
          this.minValue = value;
        }
      }
    } else {
      // No data exists, so set min/max to NaN
      this.maxValue = Number.NaN;
      this.minValue = Number.NaN;
    }
  };

  /**
   * Adds a new data point to the <code>TimeSeries</code>, preserving chronological order.
   *
   * @param timestamp the position, in time, of this data point
   * @param value the value of this data point
   * @param sumRepeatedTimeStampValues if <code>timestamp</code> has an exact match in the series, this flag controls
   * whether it is replaced, or the values summed (defaults to false.)
   */
  TimeSeries.prototype.append = function (
    timestamp,
    value,
    sumRepeatedTimeStampValues
  ) {
    // Rewind until we hit an older timestamp
    var i = this.data.length - 1;
    while (i >= 0 && this.data[i][0] > timestamp) {
      i--;
    }

    if (i === -1) {
      // This new item is the oldest data
      this.data.splice(0, 0, [timestamp, value]);
    } else if (this.data.length > 0 && this.data[i][0] === timestamp) {
      // Update existing values in the array
      if (sumRepeatedTimeStampValues) {
        // Sum this value into the existing 'bucket'
        this.data[i][1] += value;
        value = this.data[i][1];
      } else {
        // Replace the previous value
        this.data[i][1] = value;
      }
    } else if (i < this.data.length - 1) {
      // Splice into the correct position to keep timestamps in order
      this.data.splice(i + 1, 0, [timestamp, value]);
    } else {
      // Add to the end of the array
      this.data.push([timestamp, value]);
    }

    this.maxValue = isNaN(this.maxValue)
      ? value
      : Math.max(this.maxValue, value);
    this.minValue = isNaN(this.minValue)
      ? value
      : Math.min(this.minValue, value);
  };

  TimeSeries.prototype.dropOldData = function (
    oldestValidTime,
    maxDataSetLength
  ) {
    // We must always keep one expired data point as we need this to draw the
    // line that comes into the chart from the left, but any points prior to that can be removed.
    var removeCount = 0;
    while (
      this.data.length - removeCount >= maxDataSetLength &&
      this.data[removeCount + 1][0] < oldestValidTime
    ) {
      removeCount++;
    }
    if (removeCount !== 0) {
      this.data.splice(0, removeCount);
    }
  };

  /**
   * Initialises a new <code>SmoothieChart</code>.
   *
   * Options are optional, and should be of the form below. Just specify the values you
   * need and the rest will be given sensible defaults as shown:
   *
   * <pre>
   * {
   *   minValue: undefined,                      // specify to clamp the lower y-axis to a given value
   *   maxValue: undefined,                      // specify to clamp the upper y-axis to a given value
   *   maxValueScale: 1,                         // allows proportional padding to be added above the chart. for 10% padding, specify 1.1.
   *   minValueScale: 1,                         // allows proportional padding to be added below the chart. for 10% padding, specify 1.1.
   *   yRangeFunction: undefined,                // function({min: , max: }) { return {min: , max: }; }
   *   scaleSmoothing: 0.125,                    // controls the rate at which y-value zoom animation occurs
   *   millisPerPixel: 20,                       // sets the speed at which the chart pans by
   *   enableDpiScaling: true,                   // support rendering at different DPI depending on the device
   *   yMinFormatter: function(min, precision) { // callback function that formats the min y value label
   *     return parseFloat(min).toFixed(precision);
   *   },
   *   yMaxFormatter: function(max, precision) { // callback function that formats the max y value label
   *     return parseFloat(max).toFixed(precision);
   *   },
   *   maxDataSetLength: 2,
   *   interpolation: 'bezier'                   // one of 'bezier', 'linear', or 'step'
   *   timestampFormatter: null,                 // optional function to format time stamps for bottom of chart
   *                                             // you may use SmoothieChart.timeFormatter, or your own: function(date) { return ''; }
   *   scrollBackwards: false,                   // reverse the scroll direction of the chart
   *   horizontalLines: [],                      // [ { value: 0, color: '#ffffff', lineWidth: 1 } ]
   *   grid:
   *   {
   *     fillStyle: '#000000',                   // the background colour of the chart
   *     lineWidth: 1,                           // the pixel width of grid lines
   *     strokeStyle: '#777777',                 // colour of grid lines
   *     millisPerLine: 1000,                    // distance between vertical grid lines
   *     sharpLines: false,                      // controls whether grid lines are 1px sharp, or softened
   *     verticalSections: 2,                    // number of vertical sections marked out by horizontal grid lines
   *     borderVisible: true                     // whether the grid lines trace the border of the chart or not
   *   },
   *   labels
   *   {
   *     disabled: false,                        // enables/disables labels showing the min/max values
   *     fillStyle: '#ffffff',                   // colour for text of labels,
   *     fontSize: 15,
   *     fontFamily: 'sans-serif',
   *     precision: 2
   *   },
   *   tooltip: false                            // show tooltip when mouse is over the chart
   *   tooltipLine: {                            // properties for a vertical line at the cursor position
   *     lineWidth: 1,
   *     strokeStyle: '#BBBBBB'
   *   },
   *   tooltipFormatter: SmoothieChart.tooltipFormatter, // formatter function for tooltip text
   *   responsive: false,                        // whether the chart should adapt to the size of the canvas
   *   limitFPS: 0                         // maximum frame rate the chart will render at, in FPS (zero means no limit)
   * }
   * </pre>
   *
   * @constructor
   */
  function SmoothieChart(options) {
    this.options = Util.extend({}, SmoothieChart.defaultChartOptions, options);
    this.seriesSet = [];
    this.currentValueRange = 1;
    this.currentVisMinValue = 0;
    this.lastRenderTimeMillis = 0;

    this.mousemove = this.mousemove.bind(this);
    this.mouseout = this.mouseout.bind(this);
  }

  /** Formats the HTML string content of the tooltip. */
  SmoothieChart.tooltipFormatter = function (timestamp, data) {
    var timestampFormatter =
        this.options.timestampFormatter || SmoothieChart.timeFormatter,
      lines = [timestampFormatter(new Date(timestamp))];

    for (var i = 0; i < data.length; ++i) {
      lines.push(
        '<span style="color:' +
          data[i].series.options.strokeStyle +
          '">' +
          this.options.yMaxFormatter(
            data[i].value,
            this.options.labels.precision
          ) +
          "</span>"
      );
    }

    return lines.join("<br>");
  };

  SmoothieChart.defaultChartOptions = {
    millisPerPixel: 20,
    enableDpiScaling: true,
    yMinFormatter: function (min, precision) {
      return parseFloat(min).toFixed(precision);
    },
    yMaxFormatter: function (max, precision) {
      return parseFloat(max).toFixed(precision);
    },
    maxValueScale: 1,
    minValueScale: 1,
    interpolation: "bezier",
    scaleSmoothing: 0.125,
    maxDataSetLength: 2,
    scrollBackwards: false,
    grid: {
      fillStyle: "#000000",
      strokeStyle: "#777777",
      lineWidth: 1,
      sharpLines: false,
      millisPerLine: 1000,
      verticalSections: 2,
      borderVisible: true,
    },
    labels: {
      fillStyle: "#ffffff",
      disabled: false,
      fontSize: 10,
      fontFamily: "monospace",
      precision: 2,
    },
    horizontalLines: [],
    tooltip: false,
    tooltipLine: {
      lineWidth: 1,
      strokeStyle: "#BBBBBB",
    },
    tooltipFormatter: SmoothieChart.tooltipFormatter,
    responsive: false,
    limitFPS: 0,
  };

  // Based on http://inspirit.github.com/jsfeat/js/compatibility.js
  SmoothieChart.AnimateCompatibility = (function () {
    var requestAnimationFrame = function (callback, element) {
        var requestAnimationFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(function () {
              callback(Date.now());
            }, 16);
          };
        return requestAnimationFrame.call(window, callback, element);
      },
      cancelAnimationFrame = function (id) {
        var cancelAnimationFrame =
          window.cancelAnimationFrame ||
          function (id) {
            clearTimeout(id);
          };
        return cancelAnimationFrame.call(window, id);
      };

    return {
      requestAnimationFrame: requestAnimationFrame,
      cancelAnimationFrame: cancelAnimationFrame,
    };
  })();

  SmoothieChart.defaultSeriesPresentationOptions = {
    lineWidth: 1,
    strokeStyle: "#ffffff",
  };

  /**
   * Adds a <code>TimeSeries</code> to this chart, with optional presentation options.
   *
   * Presentation options should be of the form (defaults shown):
   *
   * <pre>
   * {
   *   lineWidth: 1,
   *   strokeStyle: '#ffffff',
   *   fillStyle: undefined
   * }
   * </pre>
   */
  SmoothieChart.prototype.addTimeSeries = function (timeSeries, options) {
    this.seriesSet.push({
      timeSeries: timeSeries,
      options: Util.extend(
        {},
        SmoothieChart.defaultSeriesPresentationOptions,
        options
      ),
    });
    if (
      timeSeries.options.resetBounds &&
      timeSeries.options.resetBoundsInterval > 0
    ) {
      timeSeries.resetBoundsTimerId = setInterval(function () {
        timeSeries.resetBounds();
      }, timeSeries.options.resetBoundsInterval);
    }
  };

  /**
   * Removes the specified <code>TimeSeries</code> from the chart.
   */
  SmoothieChart.prototype.removeTimeSeries = function (timeSeries) {
    // Find the correct timeseries to remove, and remove it
    var numSeries = this.seriesSet.length;
    for (var i = 0; i < numSeries; i++) {
      if (this.seriesSet[i].timeSeries === timeSeries) {
        this.seriesSet.splice(i, 1);
        break;
      }
    }
    // If a timer was operating for that timeseries, remove it
    if (timeSeries.resetBoundsTimerId) {
      // Stop resetting the bounds, if we were
      clearInterval(timeSeries.resetBoundsTimerId);
    }
  };

  /**
   * Gets render options for the specified <code>TimeSeries</code>.
   *
   * As you may use a single <code>TimeSeries</code> in multiple charts with different formatting in each usage,
   * these settings are stored in the chart.
   */
  SmoothieChart.prototype.getTimeSeriesOptions = function (timeSeries) {
    // Find the correct timeseries to remove, and remove it
    var numSeries = this.seriesSet.length;
    for (var i = 0; i < numSeries; i++) {
      if (this.seriesSet[i].timeSeries === timeSeries) {
        return this.seriesSet[i].options;
      }
    }
  };

  /**
   * Brings the specified <code>TimeSeries</code> to the top of the chart. It will be rendered last.
   */
  SmoothieChart.prototype.bringToFront = function (timeSeries) {
    // Find the correct timeseries to remove, and remove it
    var numSeries = this.seriesSet.length;
    for (var i = 0; i < numSeries; i++) {
      if (this.seriesSet[i].timeSeries === timeSeries) {
        var set = this.seriesSet.splice(i, 1);
        this.seriesSet.push(set[0]);
        break;
      }
    }
  };

  /**
   * Instructs the <code>SmoothieChart</code> to start rendering to the provided canvas, with specified delay.
   *
   * @param canvas the target canvas element
   * @param delayMillis an amount of time to wait before a data point is shown. This can prevent the end of the series
   * from appearing on screen, with new values flashing into view, at the expense of some latency.
   */
  SmoothieChart.prototype.streamTo = function (canvas, delayMillis) {
    this.canvas = canvas;
    this.delay = delayMillis;
    this.start();
  };

  SmoothieChart.prototype.getTooltipEl = function () {
    // Create the tool tip element lazily
    if (!this.tooltipEl) {
      this.tooltipEl = document.createElement("div");
      this.tooltipEl.className = "smoothie-chart-tooltip";
      this.tooltipEl.style.position = "absolute";
      this.tooltipEl.style.display = "none";
      document.body.appendChild(this.tooltipEl);
    }
    return this.tooltipEl;
  };

  SmoothieChart.prototype.updateTooltip = function () {
    var el = this.getTooltipEl();

    if (!this.mouseover || !this.options.tooltip) {
      el.style.display = "none";
      return;
    }

    var time = this.lastRenderTimeMillis - (this.delay || 0);

    // Round time down to pixel granularity, so motion appears smoother.
    time -= time % this.options.millisPerPixel;

    // x pixel to time
    var t = this.options.scrollBackwards
      ? time - this.mouseX * this.options.millisPerPixel
      : time -
        (this.canvas.offsetWidth - this.mouseX) * this.options.millisPerPixel;

    var data = [];

    // For each data set...
    for (var d = 0; d < this.seriesSet.length; d++) {
      var timeSeries = this.seriesSet[d].timeSeries,
        // find datapoint closest to time 't'
        closeIdx = Util.binarySearch(timeSeries.data, t);

      if (closeIdx > 0 && closeIdx < timeSeries.data.length) {
        data.push({
          series: this.seriesSet[d],
          index: closeIdx,
          value: timeSeries.data[closeIdx][1],
        });
      }
    }

    if (data.length) {
      el.innerHTML = this.options.tooltipFormatter.call(this, t, data);
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  };

  SmoothieChart.prototype.mousemove = function (evt) {
    this.mouseover = true;
    this.mouseX = evt.offsetX;
    this.mouseY = evt.offsetY;
    this.mousePageX = evt.pageX;
    this.mousePageY = evt.pageY;

    var el = this.getTooltipEl();
    el.style.top = Math.round(this.mousePageY) + "px";
    el.style.left = Math.round(this.mousePageX) + "px";
    this.updateTooltip();
  };

  SmoothieChart.prototype.mouseout = function () {
    this.mouseover = false;
    this.mouseX = this.mouseY = -1;
    if (SmoothieChart.tooltipEl) SmoothieChart.tooltipEl.style.display = "none";
  };

  /**
   * Make sure the canvas has the optimal resolution for the device's pixel ratio.
   */
  SmoothieChart.prototype.resize = function () {
    var dpr =
        !this.options.enableDpiScaling || !window ? 1 : window.devicePixelRatio,
      width,
      height;
    if (this.options.responsive) {
      // Newer behaviour: Use the canvas's size in the layout, and set the internal
      // resolution according to that size and the device pixel ratio (eg: high DPI)
      width = this.canvas.offsetWidth;
      height = this.canvas.offsetHeight;

      if (width !== this.lastWidth) {
        this.lastWidth = width;
        this.canvas.setAttribute("width", Math.floor(width * dpr).toString());
      }
      if (height !== this.lastHeight) {
        this.lastHeight = height;
        this.canvas.setAttribute("height", Math.floor(height * dpr).toString());
      }
    } else if (dpr !== 1) {
      // Older behaviour: use the canvas's inner dimensions and scale the element's size
      // according to that size and the device pixel ratio (eg: high DPI)
      width = parseInt(this.canvas.getAttribute("width"));
      height = parseInt(this.canvas.getAttribute("height"));

      if (
        !this.originalWidth ||
        Math.floor(this.originalWidth * dpr) !== width
      ) {
        this.originalWidth = width;
        this.canvas.setAttribute("width", Math.floor(width * dpr).toString());
        this.canvas.style.width = width + "px";
        this.canvas.getContext("2d").scale(dpr, dpr);
      }

      if (
        !this.originalHeight ||
        Math.floor(this.originalHeight * dpr) !== height
      ) {
        this.originalHeight = height;
        this.canvas.setAttribute("height", Math.floor(height * dpr).toString());
        this.canvas.style.height = height + "px";
        this.canvas.getContext("2d").scale(dpr, dpr);
      }
    }
  };

  /**
   * Starts the animation of this chart.
   */
  SmoothieChart.prototype.start = function () {
    if (this.frame) {
      // We're already running, so just return
      return;
    }

    this.canvas.addEventListener("mousemove", this.mousemove);
    this.canvas.addEventListener("mouseout", this.mouseout);

    // Renders a frame, and queues the next frame for later rendering
    var animate = function () {
      this.frame = SmoothieChart.AnimateCompatibility.requestAnimationFrame(
        function () {
          this.render();
          animate();
        }.bind(this)
      );
    }.bind(this);

    animate();
  };

  /**
   * Stops the animation of this chart.
   */
  SmoothieChart.prototype.stop = function () {
    if (this.frame) {
      SmoothieChart.AnimateCompatibility.cancelAnimationFrame(this.frame);
      delete this.frame;
      this.canvas.removeEventListener("mousemove", this.mousemove);
      this.canvas.removeEventListener("mouseout", this.mouseout);
    }
  };

  SmoothieChart.prototype.updateValueRange = function () {
    // Calculate the current scale of the chart, from all time series.
    var chartOptions = this.options,
      chartMaxValue = Number.NaN,
      chartMinValue = Number.NaN;

    for (var d = 0; d < this.seriesSet.length; d++) {
      // TODO(ndunn): We could calculate / track these values as they stream in.
      var timeSeries = this.seriesSet[d].timeSeries;
      if (!isNaN(timeSeries.maxValue)) {
        chartMaxValue = !isNaN(chartMaxValue)
          ? Math.max(chartMaxValue, timeSeries.maxValue)
          : timeSeries.maxValue;
      }

      if (!isNaN(timeSeries.minValue)) {
        chartMinValue = !isNaN(chartMinValue)
          ? Math.min(chartMinValue, timeSeries.minValue)
          : timeSeries.minValue;
      }
    }

    // Scale the chartMaxValue to add padding at the top if required
    if (chartOptions.maxValue != null) {
      chartMaxValue = chartOptions.maxValue;
    } else {
      chartMaxValue *= chartOptions.maxValueScale;
    }

    // Set the minimum if we've specified one
    if (chartOptions.minValue != null) {
      chartMinValue = chartOptions.minValue;
    } else {
      chartMinValue -= Math.abs(
        chartMinValue * chartOptions.minValueScale - chartMinValue
      );
    }

    // If a custom range function is set, call it
    if (this.options.yRangeFunction) {
      var range = this.options.yRangeFunction({
        min: chartMinValue,
        max: chartMaxValue,
      });
      chartMinValue = range.min;
      chartMaxValue = range.max;
    }

    if (!isNaN(chartMaxValue) && !isNaN(chartMinValue)) {
      var targetValueRange = chartMaxValue - chartMinValue;
      var valueRangeDiff = targetValueRange - this.currentValueRange;
      var minValueDiff = chartMinValue - this.currentVisMinValue;
      this.isAnimatingScale =
        Math.abs(valueRangeDiff) > 0.1 || Math.abs(minValueDiff) > 0.1;
      this.currentValueRange += chartOptions.scaleSmoothing * valueRangeDiff;
      this.currentVisMinValue += chartOptions.scaleSmoothing * minValueDiff;
    }

    this.valueRange = { min: chartMinValue, max: chartMaxValue };
  };

  SmoothieChart.prototype.render = function (canvas, time) {
    var nowMillis = Date.now();

    // Respect any frame rate limit.
    if (
      this.options.limitFPS > 0 &&
      nowMillis - this.lastRenderTimeMillis < 1000 / this.options.limitFPS
    )
      return;

    if (!this.isAnimatingScale) {
      // We're not animating. We can use the last render time and the scroll speed to work out whether
      // we actually need to paint anything yet. If not, we can return immediately.

      // Render at least every 1/6th of a second. The canvas may be resized, which there is
      // no reliable way to detect.
      var maxIdleMillis = Math.min(1000 / 6, this.options.millisPerPixel);

      if (nowMillis - this.lastRenderTimeMillis < maxIdleMillis) {
        return;
      }
    }

    this.resize();
    this.updateTooltip();

    this.lastRenderTimeMillis = nowMillis;

    canvas = canvas || this.canvas;
    time = time || nowMillis - (this.delay || 0);

    // Round time down to pixel granularity, so motion appears smoother.
    time -= time % this.options.millisPerPixel;

    var context = canvas.getContext("2d"),
      chartOptions = this.options,
      dimensions = {
        top: 0,
        left: 0,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      },
      // Calculate the threshold time for the oldest data points.
      oldestValidTime = time - dimensions.width * chartOptions.millisPerPixel,
      valueToYPixel = function (value) {
        var offset = value - this.currentVisMinValue;
        return this.currentValueRange === 0
          ? dimensions.height
          : dimensions.height -
              Math.round((offset / this.currentValueRange) * dimensions.height);
      }.bind(this),
      timeToXPixel = function (t) {
        if (chartOptions.scrollBackwards) {
          return Math.round((time - t) / chartOptions.millisPerPixel);
        }
        return Math.round(
          dimensions.width - (time - t) / chartOptions.millisPerPixel
        );
      };

    this.updateValueRange();

    context.font =
      chartOptions.labels.fontSize + "px " + chartOptions.labels.fontFamily;

    // Save the state of the canvas context, any transformations applied in this method
    // will get removed from the stack at the end of this method when .restore() is called.
    context.save();

    // Move the origin.
    context.translate(dimensions.left, dimensions.top);

    // Create a clipped rectangle - anything we draw will be constrained to this rectangle.
    // This prevents the occasional pixels from curves near the edges overrunning and creating
    // screen cheese (that phrase should need no explanation).
    context.beginPath();
    context.rect(0, 0, dimensions.width, dimensions.height);
    context.clip();

    // Clear the working area.
    context.save();
    context.fillStyle = chartOptions.grid.fillStyle;
    context.clearRect(0, 0, dimensions.width, dimensions.height);
    context.fillRect(0, 0, dimensions.width, dimensions.height);
    context.restore();

    // Grid lines...
    context.save();
    context.lineWidth = chartOptions.grid.lineWidth;
    context.strokeStyle = chartOptions.grid.strokeStyle;
    // Vertical (time) dividers.
    if (chartOptions.grid.millisPerLine > 0) {
      context.beginPath();
      for (
        var t = time - (time % chartOptions.grid.millisPerLine);
        t >= oldestValidTime;
        t -= chartOptions.grid.millisPerLine
      ) {
        var gx = timeToXPixel(t);
        if (chartOptions.grid.sharpLines) {
          gx -= 0.5;
        }
        context.moveTo(gx, 0);
        context.lineTo(gx, dimensions.height);
      }
      context.stroke();
      context.closePath();
    }

    // Horizontal (value) dividers.
    for (var v = 1; v < chartOptions.grid.verticalSections; v++) {
      var gy = Math.round(
        (v * dimensions.height) / chartOptions.grid.verticalSections
      );
      if (chartOptions.grid.sharpLines) {
        gy -= 0.5;
      }
      context.beginPath();
      context.moveTo(0, gy);
      context.lineTo(dimensions.width, gy);
      context.stroke();
      context.closePath();
    }
    // Bounding rectangle.
    if (chartOptions.grid.borderVisible) {
      context.beginPath();
      context.strokeRect(0, 0, dimensions.width, dimensions.height);
      context.closePath();
    }
    context.restore();

    // Draw any horizontal lines...
    if (chartOptions.horizontalLines && chartOptions.horizontalLines.length) {
      for (var hl = 0; hl < chartOptions.horizontalLines.length; hl++) {
        var line = chartOptions.horizontalLines[hl],
          hly = Math.round(valueToYPixel(line.value)) - 0.5;
        context.strokeStyle = line.color || "#ffffff";
        context.lineWidth = line.lineWidth || 1;
        context.beginPath();
        context.moveTo(0, hly);
        context.lineTo(dimensions.width, hly);
        context.stroke();
        context.closePath();
      }
    }

    // For each data set...
    for (var d = 0; d < this.seriesSet.length; d++) {
      context.save();
      var timeSeries = this.seriesSet[d].timeSeries,
        dataSet = timeSeries.data,
        seriesOptions = this.seriesSet[d].options;

      // Delete old data that's moved off the left of the chart.
      timeSeries.dropOldData(oldestValidTime, chartOptions.maxDataSetLength);

      // Set style for this dataSet.
      context.lineWidth = seriesOptions.lineWidth;
      context.strokeStyle = seriesOptions.strokeStyle;
      // Draw the line...
      context.beginPath();
      // Retain lastX, lastY for calculating the control points of bezier curves.
      var firstX = 0,
        lastX = 0,
        lastY = 0;
      for (var i = 0; i < dataSet.length && dataSet.length !== 1; i++) {
        var x = timeToXPixel(dataSet[i][0]),
          y = valueToYPixel(dataSet[i][1]);

        if (i === 0) {
          firstX = x;
          context.moveTo(x, y);
        } else {
          switch (chartOptions.interpolation) {
            case "linear":
            case "line": {
              context.lineTo(x, y);
              break;
            }
            case "bezier":
            default: {
              // Great explanation of Bezier curves: http://en.wikipedia.org/wiki/Bezier_curve#Quadratic_curves
              //
              // Assuming A was the last point in the line plotted and B is the new point,
              // we draw a curve with control points P and Q as below.
              //
              // A---P
              //     |
              //     |
              //     |
              //     Q---B
              //
              // Importantly, A and P are at the same y coordinate, as are B and Q. This is
              // so adjacent curves appear to flow as one.
              //
              context.bezierCurveTo(
                // startPoint (A) is implicit from last iteration of loop
                Math.round((lastX + x) / 2),
                lastY, // controlPoint1 (P)
                Math.round(lastX + x) / 2,
                y, // controlPoint2 (Q)
                x,
                y
              ); // endPoint (B)
              break;
            }
            case "step": {
              context.lineTo(x, lastY);
              context.lineTo(x, y);
              break;
            }
          }
        }

        lastX = x;
        lastY = y;
      }

      if (dataSet.length > 1) {
        if (seriesOptions.fillStyle) {
          // Close up the fill region.
          context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, lastY);
          context.lineTo(
            dimensions.width + seriesOptions.lineWidth + 1,
            dimensions.height + seriesOptions.lineWidth + 1
          );
          context.lineTo(firstX, dimensions.height + seriesOptions.lineWidth);
          context.fillStyle = seriesOptions.fillStyle;
          context.fill();
        }

        if (seriesOptions.strokeStyle && seriesOptions.strokeStyle !== "none") {
          context.stroke();
        }
        context.closePath();
      }
      context.restore();
    }

    if (chartOptions.tooltip && this.mouseX >= 0) {
      // Draw vertical bar to show tooltip position
      context.lineWidth = chartOptions.tooltipLine.lineWidth;
      context.strokeStyle = chartOptions.tooltipLine.strokeStyle;
      context.beginPath();
      context.moveTo(this.mouseX, 0);
      context.lineTo(this.mouseX, dimensions.height);
      context.closePath();
      context.stroke();
      this.updateTooltip();
    }

    // Draw the axis values on the chart.
    if (
      !chartOptions.labels.disabled &&
      !isNaN(this.valueRange.min) &&
      !isNaN(this.valueRange.max)
    ) {
      var maxValueString = chartOptions.yMaxFormatter(
          this.valueRange.max,
          chartOptions.labels.precision
        ),
        minValueString = chartOptions.yMinFormatter(
          this.valueRange.min,
          chartOptions.labels.precision
        ),
        maxLabelPos = chartOptions.scrollBackwards
          ? 0
          : dimensions.width - context.measureText(maxValueString).width - 2,
        minLabelPos = chartOptions.scrollBackwards
          ? 0
          : dimensions.width - context.measureText(minValueString).width - 2;
      context.fillStyle = chartOptions.labels.fillStyle;
      context.fillText(
        maxValueString,
        maxLabelPos,
        chartOptions.labels.fontSize
      );
      context.fillText(minValueString, minLabelPos, dimensions.height - 2);
    }

    // Display timestamps along x-axis at the bottom of the chart.
    if (
      chartOptions.timestampFormatter &&
      chartOptions.grid.millisPerLine > 0
    ) {
      var textUntilX = chartOptions.scrollBackwards
        ? context.measureText(minValueString).width
        : dimensions.width - context.measureText(minValueString).width + 4;
      for (
        var t = time - (time % chartOptions.grid.millisPerLine);
        t >= oldestValidTime;
        t -= chartOptions.grid.millisPerLine
      ) {
        var gx = timeToXPixel(t);
        // Only draw the timestamp if it won't overlap with the previously drawn one.
        if (
          (!chartOptions.scrollBackwards && gx < textUntilX) ||
          (chartOptions.scrollBackwards && gx > textUntilX)
        ) {
          // Formats the timestamp based on user specified formatting function
          // SmoothieChart.timeFormatter function above is one such formatting option
          var tx = new Date(t),
            ts = chartOptions.timestampFormatter(tx),
            tsWidth = context.measureText(ts).width;

          textUntilX = chartOptions.scrollBackwards
            ? gx + tsWidth + 2
            : gx - tsWidth - 2;

          context.fillStyle = chartOptions.labels.fillStyle;
          if (chartOptions.scrollBackwards) {
            context.fillText(ts, gx, dimensions.height - 2);
          } else {
            context.fillText(ts, gx - tsWidth, dimensions.height - 2);
          }
        }
      }
    }

    context.restore(); // See .save() above.
  };

  // Sample timestamp formatting function
  SmoothieChart.timeFormatter = function (date) {
    function pad2(number) {
      return (number < 10 ? "0" : "") + number;
    }
    return (
      pad2(date.getHours()) +
      ":" +
      pad2(date.getMinutes()) +
      ":" +
      pad2(date.getSeconds())
    );
  };

  exports.TimeSeries = TimeSeries;
  exports.SmoothieChart = SmoothieChart;
})(typeof exports === "undefined" ? this : exports);

/*! Sortable 1.7.0 - MIT | git://github.com/rubaxa/Sortable.git */
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(a)
    : "undefined" != typeof module && "undefined" != typeof module.exports
    ? (module.exports = a())
    : (window.Sortable = a());
})(function () {
  "use strict";
  function a(b, c) {
    if (!b || !b.nodeType || 1 !== b.nodeType)
      throw (
        "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(b)
      );
    (this.el = b), (this.options = c = t({}, c)), (b[V] = this);
    var d = {
      group: Math.random(),
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      scroll: !0,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      draggable: /[uo]l/i.test(b.nodeName) ? "li" : ">*",
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      setData: function (a, b) {
        a.setData("Text", b.textContent);
      },
      dropBubble: !1,
      dragoverBubble: !1,
      dataIdAttr: "data-id",
      delay: 0,
      forceFallback: !1,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: !1,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 },
      supportPointer: a.supportPointer !== !1,
    };
    for (var e in d) !(e in c) && (c[e] = d[e]);
    ka(c);
    for (var g in this)
      "_" === g.charAt(0) &&
        "function" == typeof this[g] &&
        (this[g] = this[g].bind(this));
    (this.nativeDraggable = !c.forceFallback && ca),
      f(b, "mousedown", this._onTapStart),
      f(b, "touchstart", this._onTapStart),
      c.supportPointer && f(b, "pointerdown", this._onTapStart),
      this.nativeDraggable && (f(b, "dragover", this), f(b, "dragenter", this)),
      ia.push(this._onDragOver),
      c.store && this.sort(c.store.get(this));
  }
  function b(a, b) {
    "clone" !== a.lastPullMode && (b = !0),
      B &&
        B.state !== b &&
        (i(B, "display", b ? "none" : ""),
        b ||
          (B.state &&
            (a.options.group.revertClone
              ? (C.insertBefore(B, D), a._animate(y, B))
              : C.insertBefore(B, y))),
        (B.state = b));
  }
  function c(a, b, c) {
    if (a) {
      c = c || X;
      do if ((">*" === b && a.parentNode === c) || r(a, b)) return a;
      while ((a = d(a)));
    }
    return null;
  }
  function d(a) {
    var b = a.host;
    return b && b.nodeType ? b : a.parentNode;
  }
  function e(a) {
    a.dataTransfer && (a.dataTransfer.dropEffect = "move"), a.preventDefault();
  }
  function f(a, b, c) {
    a.addEventListener(b, c, aa);
  }
  function g(a, b, c) {
    a.removeEventListener(b, c, aa);
  }
  function h(a, b, c) {
    if (a)
      if (a.classList) a.classList[c ? "add" : "remove"](b);
      else {
        var d = (" " + a.className + " ")
          .replace(T, " ")
          .replace(" " + b + " ", " ");
        a.className = (d + (c ? " " + b : "")).replace(T, " ");
      }
  }
  function i(a, b, c) {
    var d = a && a.style;
    if (d) {
      if (void 0 === c)
        return (
          X.defaultView && X.defaultView.getComputedStyle
            ? (c = X.defaultView.getComputedStyle(a, ""))
            : a.currentStyle && (c = a.currentStyle),
          void 0 === b ? c : c[b]
        );
      b in d || (b = "-webkit-" + b),
        (d[b] = c + ("string" == typeof c ? "" : "px"));
    }
  }
  function j(a, b, c) {
    if (a) {
      var d = a.getElementsByTagName(b),
        e = 0,
        f = d.length;
      if (c) for (; e < f; e++) c(d[e], e);
      return d;
    }
    return [];
  }
  function k(a, b, c, d, e, f, g, h) {
    a = a || b[V];
    var i = X.createEvent("Event"),
      j = a.options,
      k = "on" + c.charAt(0).toUpperCase() + c.substr(1);
    i.initEvent(c, !0, !0),
      (i.to = e || b),
      (i.from = f || b),
      (i.item = d || b),
      (i.clone = B),
      (i.oldIndex = g),
      (i.newIndex = h),
      b.dispatchEvent(i),
      j[k] && j[k].call(a, i);
  }
  function l(a, b, c, d, e, f, g, h) {
    var i,
      j,
      k = a[V],
      l = k.options.onMove;
    return (
      (i = X.createEvent("Event")),
      i.initEvent("move", !0, !0),
      (i.to = b),
      (i.from = a),
      (i.dragged = c),
      (i.draggedRect = d),
      (i.related = e || b),
      (i.relatedRect = f || b.getBoundingClientRect()),
      (i.willInsertAfter = h),
      a.dispatchEvent(i),
      l && (j = l.call(k, i, g)),
      j
    );
  }
  function m(a) {
    a.draggable = !1;
  }
  function n() {
    ea = !1;
  }
  function o(a, b) {
    var c = a.lastElementChild,
      d = c.getBoundingClientRect();
    return (
      b.clientY - (d.top + d.height) > 5 || b.clientX - (d.left + d.width) > 5
    );
  }
  function p(a) {
    for (
      var b = a.tagName + a.className + a.src + a.href + a.textContent,
        c = b.length,
        d = 0;
      c--;

    )
      d += b.charCodeAt(c);
    return d.toString(36);
  }
  function q(a, b) {
    var c = 0;
    if (!a || !a.parentNode) return -1;
    for (; a && (a = a.previousElementSibling); )
      "TEMPLATE" === a.nodeName.toUpperCase() ||
        (">*" !== b && !r(a, b)) ||
        c++;
    return c;
  }
  function r(a, b) {
    if (a) {
      b = b.split(".");
      var c = b.shift().toUpperCase(),
        d = new RegExp("\\s(" + b.join("|") + ")(?=\\s)", "g");
      return !(
        ("" !== c && a.nodeName.toUpperCase() != c) ||
        (b.length &&
          ((" " + a.className + " ").match(d) || []).length != b.length)
      );
    }
    return !1;
  }
  function s(a, b) {
    var c, d;
    return function () {
      void 0 === c &&
        ((c = arguments),
        (d = this),
        Z(function () {
          1 === c.length ? a.call(d, c[0]) : a.apply(d, c), (c = void 0);
        }, b));
    };
  }
  function t(a, b) {
    if (a && b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    return a;
  }
  function u(a) {
    return _ && _.dom
      ? _.dom(a).cloneNode(!0)
      : $
      ? $(a).clone(!0)[0]
      : a.cloneNode(!0);
  }
  function v(a) {
    for (var b = a.getElementsByTagName("input"), c = b.length; c--; ) {
      var d = b[c];
      d.checked && ha.push(d);
    }
  }
  function w(a) {
    return Z(a, 0);
  }
  function x(a) {
    return clearTimeout(a);
  }
  if ("undefined" == typeof window || !window.document)
    return function () {
      throw new Error("Sortable.js requires a window with a document");
    };
  var y,
    z,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S = {},
    T = /\s+/g,
    U = /left|right|inline/,
    V = "Sortable" + new Date().getTime(),
    W = window,
    X = W.document,
    Y = W.parseInt,
    Z = W.setTimeout,
    $ = W.jQuery || W.Zepto,
    _ = W.Polymer,
    aa = !1,
    ba = !1,
    ca = "draggable" in X.createElement("div"),
    da = (function (a) {
      return (
        !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) &&
        ((a = X.createElement("x")),
        (a.style.cssText = "pointer-events:auto"),
        "auto" === a.style.pointerEvents)
      );
    })(),
    ea = !1,
    fa = Math.abs,
    ga = Math.min,
    ha = [],
    ia = [],
    ja = s(function (a, b, c) {
      if (c && b.scroll) {
        var d,
          e,
          f,
          g,
          h,
          i,
          j = c[V],
          k = b.scrollSensitivity,
          l = b.scrollSpeed,
          m = a.clientX,
          n = a.clientY,
          o = window.innerWidth,
          p = window.innerHeight;
        if (G !== c && ((F = b.scroll), (G = c), (H = b.scrollFn), F === !0)) {
          F = c;
          do
            if (
              F.offsetWidth < F.scrollWidth ||
              F.offsetHeight < F.scrollHeight
            )
              break;
          while ((F = F.parentNode));
        }
        F &&
          ((d = F),
          (e = F.getBoundingClientRect()),
          (f = (fa(e.right - m) <= k) - (fa(e.left - m) <= k)),
          (g = (fa(e.bottom - n) <= k) - (fa(e.top - n) <= k))),
          f ||
            g ||
            ((f = (o - m <= k) - (m <= k)),
            (g = (p - n <= k) - (n <= k)),
            (f || g) && (d = W)),
          (S.vx === f && S.vy === g && S.el === d) ||
            ((S.el = d),
            (S.vx = f),
            (S.vy = g),
            clearInterval(S.pid),
            d &&
              (S.pid = setInterval(function () {
                return (
                  (i = g ? g * l : 0),
                  (h = f ? f * l : 0),
                  "function" == typeof H
                    ? H.call(j, h, i, a)
                    : void (d === W
                        ? W.scrollTo(W.pageXOffset + h, W.pageYOffset + i)
                        : ((d.scrollTop += i), (d.scrollLeft += h)))
                );
              }, 24)));
      }
    }, 30),
    ka = function (a) {
      function b(a, b) {
        return (
          (void 0 !== a && a !== !0) || (a = c.name),
          "function" == typeof a
            ? a
            : function (c, d) {
                var e = d.options.group.name;
                return b ? a : a && (a.join ? a.indexOf(e) > -1 : e == a);
              }
        );
      }
      var c = {},
        d = a.group;
      (d && "object" == typeof d) || (d = { name: d }),
        (c.name = d.name),
        (c.checkPull = b(d.pull, !0)),
        (c.checkPut = b(d.put)),
        (c.revertClone = d.revertClone),
        (a.group = c);
    };
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          (ba = !1), (aa = { capture: !1, passive: ba });
        },
      })
    );
  } catch (a) {}
  return (
    (a.prototype = {
      constructor: a,
      _onTapStart: function (a) {
        var b,
          d = this,
          e = this.el,
          f = this.options,
          g = f.preventOnFilter,
          h = a.type,
          i = a.touches && a.touches[0],
          j = (i || a).target,
          l = (a.target.shadowRoot && a.path && a.path[0]) || j,
          m = f.filter;
        if (
          (v(e),
          !y &&
            !(
              (/mousedown|pointerdown/.test(h) && 0 !== a.button) ||
              f.disabled
            ) &&
            !l.isContentEditable &&
            ((j = c(j, f.draggable, e)), j && E !== j))
        ) {
          if (((b = q(j, f.draggable)), "function" == typeof m)) {
            if (m.call(this, a, j, this))
              return (
                k(d, l, "filter", j, e, e, b), void (g && a.preventDefault())
              );
          } else if (
            m &&
            (m = m.split(",").some(function (a) {
              if ((a = c(l, a.trim(), e)))
                return k(d, a, "filter", j, e, e, b), !0;
            }))
          )
            return void (g && a.preventDefault());
          (f.handle && !c(l, f.handle, e)) ||
            this._prepareDragStart(a, i, j, b);
        }
      },
      _prepareDragStart: function (a, b, c, d) {
        var e,
          g = this,
          i = g.el,
          l = g.options,
          n = i.ownerDocument;
        c &&
          !y &&
          c.parentNode === i &&
          ((P = a),
          (C = i),
          (y = c),
          (z = y.parentNode),
          (D = y.nextSibling),
          (E = c),
          (N = l.group),
          (L = d),
          (this._lastX = (b || a).clientX),
          (this._lastY = (b || a).clientY),
          (y.style["will-change"] = "all"),
          (e = function () {
            g._disableDelayedDrag(),
              (y.draggable = g.nativeDraggable),
              h(y, l.chosenClass, !0),
              g._triggerDragStart(a, b),
              k(g, C, "choose", y, C, C, L);
          }),
          l.ignore.split(",").forEach(function (a) {
            j(y, a.trim(), m);
          }),
          f(n, "mouseup", g._onDrop),
          f(n, "touchend", g._onDrop),
          f(n, "touchcancel", g._onDrop),
          f(n, "selectstart", g),
          l.supportPointer && f(n, "pointercancel", g._onDrop),
          l.delay
            ? (f(n, "mouseup", g._disableDelayedDrag),
              f(n, "touchend", g._disableDelayedDrag),
              f(n, "touchcancel", g._disableDelayedDrag),
              f(n, "mousemove", g._disableDelayedDrag),
              f(n, "touchmove", g._disableDelayedDrag),
              l.supportPointer && f(n, "pointermove", g._disableDelayedDrag),
              (g._dragStartTimer = Z(e, l.delay)))
            : e());
      },
      _disableDelayedDrag: function () {
        var a = this.el.ownerDocument;
        clearTimeout(this._dragStartTimer),
          g(a, "mouseup", this._disableDelayedDrag),
          g(a, "touchend", this._disableDelayedDrag),
          g(a, "touchcancel", this._disableDelayedDrag),
          g(a, "mousemove", this._disableDelayedDrag),
          g(a, "touchmove", this._disableDelayedDrag),
          g(a, "pointermove", this._disableDelayedDrag);
      },
      _triggerDragStart: function (a, b) {
        (b = b || ("touch" == a.pointerType ? a : null)),
          b
            ? ((P = { target: y, clientX: b.clientX, clientY: b.clientY }),
              this._onDragStart(P, "touch"))
            : this.nativeDraggable
            ? (f(y, "dragend", this), f(C, "dragstart", this._onDragStart))
            : this._onDragStart(P, !0);
        try {
          X.selection
            ? w(function () {
                X.selection.empty();
              })
            : window.getSelection().removeAllRanges();
        } catch (a) {}
      },
      _dragStarted: function () {
        if (C && y) {
          var b = this.options;
          h(y, b.ghostClass, !0),
            h(y, b.dragClass, !1),
            (a.active = this),
            k(this, C, "start", y, C, C, L);
        } else this._nulling();
      },
      _emulateDragOver: function () {
        if (Q) {
          if (this._lastX === Q.clientX && this._lastY === Q.clientY) return;
          (this._lastX = Q.clientX),
            (this._lastY = Q.clientY),
            da || i(A, "display", "none");
          var a = X.elementFromPoint(Q.clientX, Q.clientY),
            b = a,
            c = ia.length;
          if (
            (a &&
              a.shadowRoot &&
              ((a = a.shadowRoot.elementFromPoint(Q.clientX, Q.clientY)),
              (b = a)),
            b)
          )
            do {
              if (b[V]) {
                for (; c--; )
                  ia[c]({
                    clientX: Q.clientX,
                    clientY: Q.clientY,
                    target: a,
                    rootEl: b,
                  });
                break;
              }
              a = b;
            } while ((b = b.parentNode));
          da || i(A, "display", "");
        }
      },
      _onTouchMove: function (b) {
        if (P) {
          var c = this.options,
            d = c.fallbackTolerance,
            e = c.fallbackOffset,
            f = b.touches ? b.touches[0] : b,
            g = f.clientX - P.clientX + e.x,
            h = f.clientY - P.clientY + e.y,
            j = b.touches
              ? "translate3d(" + g + "px," + h + "px,0)"
              : "translate(" + g + "px," + h + "px)";
          if (!a.active) {
            if (
              d &&
              ga(fa(f.clientX - this._lastX), fa(f.clientY - this._lastY)) < d
            )
              return;
            this._dragStarted();
          }
          this._appendGhost(),
            (R = !0),
            (Q = f),
            i(A, "webkitTransform", j),
            i(A, "mozTransform", j),
            i(A, "msTransform", j),
            i(A, "transform", j),
            b.preventDefault();
        }
      },
      _appendGhost: function () {
        if (!A) {
          var a,
            b = y.getBoundingClientRect(),
            c = i(y),
            d = this.options;
          (A = y.cloneNode(!0)),
            h(A, d.ghostClass, !1),
            h(A, d.fallbackClass, !0),
            h(A, d.dragClass, !0),
            i(A, "top", b.top - Y(c.marginTop, 10)),
            i(A, "left", b.left - Y(c.marginLeft, 10)),
            i(A, "width", b.width),
            i(A, "height", b.height),
            i(A, "opacity", "0.8"),
            i(A, "position", "fixed"),
            i(A, "zIndex", "100000"),
            i(A, "pointerEvents", "none"),
            (d.fallbackOnBody && X.body.appendChild(A)) || C.appendChild(A),
            (a = A.getBoundingClientRect()),
            i(A, "width", 2 * b.width - a.width),
            i(A, "height", 2 * b.height - a.height);
        }
      },
      _onDragStart: function (a, b) {
        var c = this,
          d = a.dataTransfer,
          e = c.options;
        c._offUpEvents(),
          N.checkPull(c, c, y, a) &&
            ((B = u(y)),
            (B.draggable = !1),
            (B.style["will-change"] = ""),
            i(B, "display", "none"),
            h(B, c.options.chosenClass, !1),
            (c._cloneId = w(function () {
              C.insertBefore(B, y), k(c, C, "clone", y);
            }))),
          h(y, e.dragClass, !0),
          b
            ? ("touch" === b
                ? (f(X, "touchmove", c._onTouchMove),
                  f(X, "touchend", c._onDrop),
                  f(X, "touchcancel", c._onDrop),
                  e.supportPointer &&
                    (f(X, "pointermove", c._onTouchMove),
                    f(X, "pointerup", c._onDrop)))
                : (f(X, "mousemove", c._onTouchMove),
                  f(X, "mouseup", c._onDrop)),
              (c._loopId = setInterval(c._emulateDragOver, 50)))
            : (d &&
                ((d.effectAllowed = "move"),
                e.setData && e.setData.call(c, d, y)),
              f(X, "drop", c),
              (c._dragStartId = w(c._dragStarted)));
      },
      _onDragOver: function (d) {
        var e,
          f,
          g,
          h,
          j = this.el,
          k = this.options,
          m = k.group,
          p = a.active,
          q = N === m,
          r = !1,
          s = k.sort;
        if (
          (void 0 !== d.preventDefault &&
            (d.preventDefault(), !k.dragoverBubble && d.stopPropagation()),
          !y.animated &&
            ((R = !0),
            p &&
              !k.disabled &&
              (q
                ? s || (h = !C.contains(y))
                : O === this ||
                  ((p.lastPullMode = N.checkPull(this, p, y, d)) &&
                    m.checkPut(this, p, y, d))) &&
              (void 0 === d.rootEl || d.rootEl === this.el)))
        ) {
          if ((ja(d, k, this.el), ea)) return;
          if (
            ((e = c(d.target, k.draggable, j)),
            (f = y.getBoundingClientRect()),
            O !== this && ((O = this), (r = !0)),
            h)
          )
            return (
              b(p, !0),
              (z = C),
              void (B || D ? C.insertBefore(y, B || D) : s || C.appendChild(y))
            );
          if (
            0 === j.children.length ||
            j.children[0] === A ||
            (j === d.target && o(j, d))
          ) {
            if (
              (0 !== j.children.length &&
                j.children[0] !== A &&
                j === d.target &&
                (e = j.lastElementChild),
              e)
            ) {
              if (e.animated) return;
              g = e.getBoundingClientRect();
            }
            b(p, q),
              l(C, j, y, f, e, g, d) !== !1 &&
                (y.contains(j) || (j.appendChild(y), (z = j)),
                this._animate(f, y),
                e && this._animate(g, e));
          } else if (
            e &&
            !e.animated &&
            e !== y &&
            void 0 !== e.parentNode[V]
          ) {
            I !== e && ((I = e), (J = i(e)), (K = i(e.parentNode))),
              (g = e.getBoundingClientRect());
            var t = g.right - g.left,
              u = g.bottom - g.top,
              v =
                U.test(J.cssFloat + J.display) ||
                ("flex" == K.display &&
                  0 === K["flex-direction"].indexOf("row")),
              w = e.offsetWidth > y.offsetWidth,
              x = e.offsetHeight > y.offsetHeight,
              E =
                (v ? (d.clientX - g.left) / t : (d.clientY - g.top) / u) > 0.5,
              F = e.nextElementSibling,
              G = !1;
            if (v) {
              var H = y.offsetTop,
                L = e.offsetTop;
              G =
                H === L
                  ? (e.previousElementSibling === y && !w) || (E && w)
                  : e.previousElementSibling === y ||
                    y.previousElementSibling === e
                  ? (d.clientY - g.top) / u > 0.5
                  : L > H;
            } else r || (G = (F !== y && !x) || (E && x));
            var M = l(C, j, y, f, e, g, d, G);
            M !== !1 &&
              ((1 !== M && M !== -1) || (G = 1 === M),
              (ea = !0),
              Z(n, 30),
              b(p, q),
              y.contains(j) ||
                (G && !F
                  ? j.appendChild(y)
                  : e.parentNode.insertBefore(y, G ? F : e)),
              (z = y.parentNode),
              this._animate(f, y),
              this._animate(g, e));
          }
        }
      },
      _animate: function (a, b) {
        var c = this.options.animation;
        if (c) {
          var d = b.getBoundingClientRect();
          1 === a.nodeType && (a = a.getBoundingClientRect()),
            i(b, "transition", "none"),
            i(
              b,
              "transform",
              "translate3d(" +
                (a.left - d.left) +
                "px," +
                (a.top - d.top) +
                "px,0)"
            ),
            b.offsetWidth,
            i(b, "transition", "all " + c + "ms"),
            i(b, "transform", "translate3d(0,0,0)"),
            clearTimeout(b.animated),
            (b.animated = Z(function () {
              i(b, "transition", ""), i(b, "transform", ""), (b.animated = !1);
            }, c));
        }
      },
      _offUpEvents: function () {
        var a = this.el.ownerDocument;
        g(X, "touchmove", this._onTouchMove),
          g(X, "pointermove", this._onTouchMove),
          g(a, "mouseup", this._onDrop),
          g(a, "touchend", this._onDrop),
          g(a, "pointerup", this._onDrop),
          g(a, "touchcancel", this._onDrop),
          g(a, "pointercancel", this._onDrop),
          g(a, "selectstart", this);
      },
      _onDrop: function (b) {
        var c = this.el,
          d = this.options;
        clearInterval(this._loopId),
          clearInterval(S.pid),
          clearTimeout(this._dragStartTimer),
          x(this._cloneId),
          x(this._dragStartId),
          g(X, "mouseover", this),
          g(X, "mousemove", this._onTouchMove),
          this.nativeDraggable &&
            (g(X, "drop", this), g(c, "dragstart", this._onDragStart)),
          this._offUpEvents(),
          b &&
            (R && (b.preventDefault(), !d.dropBubble && b.stopPropagation()),
            A && A.parentNode && A.parentNode.removeChild(A),
            (C !== z && "clone" === a.active.lastPullMode) ||
              (B && B.parentNode && B.parentNode.removeChild(B)),
            y &&
              (this.nativeDraggable && g(y, "dragend", this),
              m(y),
              (y.style["will-change"] = ""),
              h(y, this.options.ghostClass, !1),
              h(y, this.options.chosenClass, !1),
              k(this, C, "unchoose", y, z, C, L),
              C !== z
                ? ((M = q(y, d.draggable)),
                  M >= 0 &&
                    (k(null, z, "add", y, z, C, L, M),
                    k(this, C, "remove", y, z, C, L, M),
                    k(null, z, "sort", y, z, C, L, M),
                    k(this, C, "sort", y, z, C, L, M)))
                : y.nextSibling !== D &&
                  ((M = q(y, d.draggable)),
                  M >= 0 &&
                    (k(this, C, "update", y, z, C, L, M),
                    k(this, C, "sort", y, z, C, L, M))),
              a.active &&
                ((null != M && M !== -1) || (M = L),
                k(this, C, "end", y, z, C, L, M),
                this.save()))),
          this._nulling();
      },
      _nulling: function () {
        (C = y = z = A = D = B = E = F = G = P = Q = R = M = I = J = O = N = a.active = null),
          ha.forEach(function (a) {
            a.checked = !0;
          }),
          (ha.length = 0);
      },
      handleEvent: function (a) {
        switch (a.type) {
          case "drop":
          case "dragend":
            this._onDrop(a);
            break;
          case "dragover":
          case "dragenter":
            y && (this._onDragOver(a), e(a));
            break;
          case "mouseover":
            this._onDrop(a);
            break;
          case "selectstart":
            a.preventDefault();
        }
      },
      toArray: function () {
        for (
          var a,
            b = [],
            d = this.el.children,
            e = 0,
            f = d.length,
            g = this.options;
          e < f;
          e++
        )
          (a = d[e]),
            c(a, g.draggable, this.el) &&
              b.push(a.getAttribute(g.dataIdAttr) || p(a));
        return b;
      },
      sort: function (a) {
        var b = {},
          d = this.el;
        this.toArray().forEach(function (a, e) {
          var f = d.children[e];
          c(f, this.options.draggable, d) && (b[a] = f);
        }, this),
          a.forEach(function (a) {
            b[a] && (d.removeChild(b[a]), d.appendChild(b[a]));
          });
      },
      save: function () {
        var a = this.options.store;
        a && a.set(this);
      },
      closest: function (a, b) {
        return c(a, b || this.options.draggable, this.el);
      },
      option: function (a, b) {
        var c = this.options;
        return void 0 === b
          ? c[a]
          : ((c[a] = b), void ("group" === a && ka(c)));
      },
      destroy: function () {
        var a = this.el;
        (a[V] = null),
          g(a, "mousedown", this._onTapStart),
          g(a, "touchstart", this._onTapStart),
          g(a, "pointerdown", this._onTapStart),
          this.nativeDraggable &&
            (g(a, "dragover", this), g(a, "dragenter", this)),
          Array.prototype.forEach.call(
            a.querySelectorAll("[draggable]"),
            function (a) {
              a.removeAttribute("draggable");
            }
          ),
          ia.splice(ia.indexOf(this._onDragOver), 1),
          this._onDrop(),
          (this.el = a = null);
      },
    }),
    f(X, "touchmove", function (b) {
      a.active && b.preventDefault();
    }),
    (a.utils = {
      on: f,
      off: g,
      css: i,
      find: j,
      is: function (a, b) {
        return !!c(a, b, a);
      },
      extend: t,
      throttle: s,
      closest: c,
      toggleClass: h,
      clone: u,
      index: q,
      nextTick: w,
      cancelNextTick: x,
    }),
    (a.create = function (b, c) {
      return new a(b, c);
    }),
    (a.version = "1.7.0"),
    a
  );
});
function runFn(server, $location, $rootScope) {
  server.checkIfWebsocketsAreSupported();

  $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
    var nextRoute = next.split("#")[1];
    if (nextRoute !== "/loading") {
      localStorage.setItem("currentTab", nextRoute);
    }
  });

  $location.path("/loading");
}

angular
  .module("linuxDash", ["ngRoute"])
  .run(["server", "$location", "$rootScope", runFn])
  .config([
    "$compileProvider",
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    },
  ]);

function appLoadController($scope, $location, $rootScope) {
  var loadUrl = localStorage.getItem("currentTab") || "system-status";
  var loadLinuxDash = function () {
    $location.path(loadUrl);
  };

  $rootScope.$on("start-linux-dash", loadLinuxDash);
}

function routesFn($routeProvider) {
  $routeProvider

    .when("/loading", {
      template: [
        '<div class="lead" style="text-align: center;">',
        "<loader></loader>",
        "Loading...",
        "</div>",
      ].join(""),
      controller: ["$scope", "$location", "$rootScope", appLoadController],
    })

    .when("/system-status", {
      template: [
        '<ram-chart sortablejs-id="ram-chart"></ram-chart> ',
        '<cpu-avg-load-chart sortablejs-id="cpu-avg-load-chart"></cpu-avg-load-chart> ',
        '<cpu-utilization-chart sortablejs-id="cpu-util-chart"></cpu-utilization-chart> ',
        '<cpu-temp sortablejs-id="cpu-temp"></cpu-temp> ',
        '<ram-intensive-processes sortablejs-id="ram-intensive-processes"></ram-intensive-processes> ',
        '<cpu-intensive-processes sortablejs-id="cpu-intensive-processes"></cpu-intensive-processes> ',
        '<disk-space sortablejs-id="disk-space"></disk-space> ',
        '<swap-usage sortablejs-id="swap-usage"></swap-usage> ',
        '<docker-processes sortablejs-id="docker"></docker-processes> ',
      ].join(""),
    })

    .when("/basic-info", {
      template: [
        '<machine-info sortablejs-id="machine-info"></machine-info>',
        '<memory-info sortablejs-id="memory-info"></memory-info>',
        '<cpu-info sortablejs-id="cpu-info"></cpu-info>',
        '<scheduled-crons sortablejs-id="scheduled-crons"></scheduled-crons>',
        '<cron-history sortablejs-id="cron-history"></cron-history>',
        '<io-stats sortablejs-id="io-stats"></io-stats>',
      ].join(""),
    })

    .when("/network", {
      template: [
        '<upload-transfer-rate-chart sortablejs-id="upload"></upload-transfer-rate-chart> ',
        '<download-transfer-rate-chart sortablejs-id="download"></download-transfer-rate-chart> ',
        '<ip-addresses sortablejs-id="ip-addresses"></ip-addresses> ',
        '<network-connections sortablejs-id="net-cons"></network-connections> ',
        '<arp-cache-table sortablejs-id="arp"></arp-cache-table> ',
        '<ping-speeds sortablejs-id="ping"></ping-speeds> ',
        '<bandwidth sortablejs-id="bandwidth"></bandwidth> ',
      ].join(""),
    })

    .when("/accounts", {
      template: [
        '<server-accounts sortablejs-id="server-accounts"></server-accounts> ',
        '<logged-in-accounts sortablejs-id="logged-in"></logged-in-accounts> ',
        '<recent-logins sortablejs-id="recent"></recent-logins> ',
      ].join(""),
    })

    .when("/apps", {
      template: [
        '<common-applications sortablejs-id="common-applications"></common-applications>',
        '<memcached sortablejs-id="memcached"></memcached>',
        '<redis sortablejs-id="redis"></redis>',
        '<pm2 sortablejs-id="pm2"></pm2>',
        '<supervisor sortablejs-id="supervisor_status"></pm2>',
      ].join(""),
    })



    .otherwise({
      redirectTo: "/loading",
    });
}

angular.module("linuxDash").config(["$routeProvider", routesFn]);

angular.module("linuxDash").service("server", [
  "$http",
  "$rootScope",
  "$location",
  function ($http, $rootScope, $location) {
    var websocket = {
      connection: null,
      onMessageEventHandlers: {},
    };

    /**
     * @description:
     *   Establish a websocket connection with server
     *
     * @return Null
     */
    var establishWebsocketConnection = function () {
      var websocketUrl =
        (location.protocol === "https:" ? "wss://" : "ws://") +
        window.location.hostname +
        ":" +
        window.location.port;

      if (websocket.connection === null) {
        websocket.connection = new WebSocket(websocketUrl);

        websocket.connection.onopen = function () {
          $rootScope.$broadcast("start-linux-dash", {});
          $rootScope.$apply();
          console.info("Websocket connection is open");
        };

        websocket.connection.onmessage = function (event) {
          var response = JSON.parse(event.data);
          var moduleName = response.moduleName;
          var moduleData = JSON.parse(response.output);

          if (!!websocket.onMessageEventHandlers[moduleName]) {
            websocket.onMessageEventHandlers[moduleName](moduleData);
          } else {
            console.info(
              "Websocket could not find module",
              moduleName,
              "in:",
              websocket.onMessageEventHandlers
            );
          }
        };

        websocket.connection.onclose = function () {
          websocket.connection = null;
        };
      }
    };

    /**
     * @description:
     *   Check if websockets are supported
     *   If so, call establishWebsocketConnection()
     *
     * @return Null
     */
    this.checkIfWebsocketsAreSupported = function () {
      var websocketSupport = {
        browser: null,
        server: null,
      };

      // does browser support websockets?
      if (window.WebSocket) {
        websocketSupport.browser = true;

        // does backend support websockets?
        $http
          .get("/websocket")
          .then(function (response) {
            // if websocket_support property exists and is trurthy
            // websocketSupport.server will equal true.
            websocketSupport.server = !!response.data["websocket_support"];
          })
          .catch(function websocketNotSupportedByServer() {
            websocketSupport.server = false;
            $rootScope.$broadcast("start-linux-dash", {});
          })
          .then(function finalDecisionOnWebsocket() {
            if (websocketSupport.browser && websocketSupport.server) {
              establishWebsocketConnection();
            } else {
              $rootScope.$broadcast("start-linux-dash", {});
            }
          });
      }
    };

    /**
     * Handles requests from modules for data from server
     *
     * @param  {String}   moduleName
     * @param  {Function} callback
     * @return {[ Null || callback(server response) ]}
     */
    this.get = function (moduleName, callback) {
      // if we have a websocket connection
      if (websocket.connection) {
        // and the connection is ready
        if (websocket.connection.readyState === 1) {
          // set the callback as the event handler
          // for server response.
          //
          // Callback instance needs to be overwritten
          // each time for this to work. Not sure why.
          websocket.onMessageEventHandlers[moduleName] = callback;

          //
          websocket.connection.send(moduleName);
        } else {
          console.log("Websocket not ready yet.", moduleName);
        }
      }
      // otherwise
      else {
        var moduleAddress = "server/?module=" + moduleName;

        return $http.get(moduleAddress).then(function (response) {
          return callback(response.data);
        });
      }
    };
  },
]);

angular.module("linuxDash").directive("cpuAvgLoadChart", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        '\
      <multi-line-chart-plugin \
          heading="CPU Avg Load" \
          module-name="load_avg" \
          units="units"> \
      </multi-line-chart-plugin> \
    ',
      link: function (scope) {
        scope.units = "%";
      },
    };
  },
]);




angular.module("linuxDash").directive("cpuTemp", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        ' \
      <line-chart-plugin \
\
        heading="CPU temp" \
        module-name="cpu_temp" \
        color="0,255,0" \
\
        max-value="max" \
        min-value="min" \
        refresh-rate="1500" \
\
        get-display-value="displayValue" \
        metrics="utilMetrics"> \
      </line-chart-plugin> \
    ',
      link: function (scope) {
        scope.min = 0;
        scope.max = 100;

        scope.displayValue = function (serverResponseData) {
          return serverResponseData;
        };

        scope.utilMetrics = [
          {
            name: "Temperature",
            generate: function (serverResponseData) {
              return serverResponseData + " °C";
            },
          },
        ];
      },
    };
  },
]);

angular.module("linuxDash").directive("cpuUtilizationChart", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        ' \
      <line-chart-plugin \
 \
          heading="CPU Utilization" \
          module-name="cpu_utilization" \
          color="0,255,0" \
 \
          max-value="max" \
          min-value="min" \
          refresh-rate="1500" \
 \
          get-display-value="displayValue" \
          metrics="utilMetrics"> \
      </line-chart-plugin> \
    ',
      link: function (scope) {
        scope.min = 0;
        scope.max = 100;

        scope.displayValue = function (serverResponseData) {
          return serverResponseData;
        };

        scope.utilMetrics = [
          {
            name: "Usage",
            generate: function (serverResponseData) {
              return serverResponseData + " %";
            },
          },
        ];
      },
    };
  },
]);


angular.module("linuxDash").directive("downloadTransferRateChart", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        ' \
      <multi-line-chart-plugin \
        heading="Download Transfer Rate" \
        module-name="download_transfer_rate" \
        units="units"> \
      </multi-line-chart-plugin> \
    ',
      link: function (scope) {
        scope.delay = 2000;
        scope.units = "KB/s";
      },
    };
  },
]);

angular.module("linuxDash").directive("ramChart", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        '\
      <line-chart-plugin \
\
          heading="RAM Usage" \
          module-name="current_ram" \
          color="0,255,0" \
\
          max-value="maxRam" \
          min-value="minRam" \
          refresh-rate="1000" \
\
          get-display-value="ramToDisplay" \
          metrics="ramMetrics"> \
      </line-chart-plugin> \
    ',
      link: function (scope) {
        // get max ram available on machine before we
        // can start charting
        server.get("current_ram", function (resp) {
          scope.maxRam = resp.total;
          scope.minRam = 0;
        });

        scope.ramToDisplay = function (serverResponseData) {
          return serverResponseData.used;
        };

        var humanizeRam = function (ramInMB) {
          var ram = {
            value: parseInt(ramInMB, 10),
            unit: "MB",
          };

          // if ram > 1,000 MB, use GB
          if (ram.value > 1000) {
            ram = {
              value: (ramInMB / 1024).toFixed(2),
              unit: "GB",
            };
          }

          return ram.value + " " + ram.unit;
        };

        scope.ramMetrics = [
          {
            name: "Used",
            generate: function (serverResponseData) {
              var ratio = serverResponseData.used / serverResponseData.total;
              var percentage = parseInt(ratio * 100);

              var usedRam = humanizeRam(serverResponseData.used);
              return usedRam + " (" + percentage.toString() + "%)";
            },
          },
          {
            name: "Available",
            generate: function (serverResponseData) {
              var availableRam = humanizeRam(serverResponseData.available);
              var totalRam = humanizeRam(serverResponseData.total);
              return availableRam + " of " + totalRam;
            },
          },
        ];
      },
    };
  },
]);

var simpleTableModules = [
  {
    name: "machineInfo",
    template:
      '<key-value-list heading="General Info." module-name="general_info" info="System Information"></key-value-list>',
  },
  {
    name: "ipAddresses",
    template:
      '<table-data heading="IP Addresses" module-name="ip_addresses" info="IPs assigned to this server"></table-data>',
  },
  {
    name: "ramIntensiveProcesses",
    template:
      '<table-data heading="RAM Processes" module-name="ram_intensive_processes" info="Processes which are using most RAM."></table-data>',
  },
  {
    name: "cpuIntensiveProcesses",
    template:
      '<table-data heading="CPU Processes" module-name="cpu_intensive_processes" info="Processes which are using most CPU."></table-data>',
  },
  {
    name: "dockerProcesses",
    template:
      '<table-data heading="Docker Processes" module-name="docker_processes" info="Processes in Docker Containers sorted by CPU."></table-data>',
  },
  {
    name: "networkConnections",
    template:
      '<table-data heading="Network Connections" module-name="network_connections"></table-data>',
  },
  {
    name: "serverAccounts",
    template:
      '<table-data heading="Accounts" module-name="user_accounts" info="User accounts on this server."></table-data>',
  },
  {
    name: "loggedInAccounts",
    template:
      '<table-data heading="Logged In Accounts" module-name="logged_in_users" info="Users currently logged in."></table-data>',
  },
  {
    name: "recentLogins",
    template:
      '<table-data heading="Recent Logins" module-name="recent_account_logins" info="Recent user sessions."></table-data>',
  },
  {
    name: "arpCacheTable",
    template:
      '<table-data heading="ARP Cache Table" module-name="arp_cache"></table-data>',
  },
  {
    name: "commonApplications",
    template:
      '<table-data heading="Common Applications" module-name="common_applications" info="List of commonly installed applications."></table-data>',
  },
  {
    name: "pingSpeeds",
    template:
      '<table-data heading="Ping Speeds" module-name="ping" info="Ping speed in milliseconds."></table-data>',
  },
  {
    name: "bandwidth",
    template:
      '<table-data heading="Bandwidth" module-name="bandwidth"></table-data>',
  },
  {
    name: "swapUsage",
    template:
      '<table-data heading="Swap Usage" module-name="swap"></table-data>',
  },
  {
    name: "internetSpeed",
    template:
      '<key-value-list heading="Internet Speed" module-name="internet_speed" info="Internet connection speed of server."></key-value-list>',
  },
  {
    name: "memcached",
    template:
      '<key-value-list heading="Memcached" module-name="memcached"></key-value-list>',
  },
  {
    name: "redis",
    template:
      '<key-value-list heading="Redis" module-name="redis"></key-value-list>',
  },
  {
    name: "pm2",
    template:
      '<table-data heading="PM2" module-name="pm2_stats" info="Process Manager 2 (PM2) Node Module stats"></table-data>',
  },
  {
    name: "memoryInfo",
    template:
      '<key-value-list heading="Memory Info" module-name="memory_info" info="/proc/meminfo read-out."></key-value-list>',
  },
  {
    name: "cpuInfo",
    template:
      '<key-value-list heading="CPU Info" module-name="cpu_info" info="/usr/bin/lscpu read-out."></key-value-list>',
  },
  {
    name: "ioStats",
    template:
      '<table-data heading="IO Stats" module-name="io_stats" info="/proc/diskstats read-out."></table-data>',
  },
  {
    name: "scheduledCrons",
    template:
      '<table-data heading="Scheduled Cron Jobs" module-name="scheduled_crons" info="Crons for all users on the server."></table-data>',
  },
  {
    name: "cronHistory",
    template:
      '<table-data heading="Cron Job History" module-name="cron_history" info="Crons which have run recently."></table-data>',
  },
  {
    name: 'supervisorStatus',
    template: '<table-data heading="supervisorStatus" module-name="supervisor_status" info="Shows active supervisor"></table-data>'
  },
];

simpleTableModules.forEach(function (module, key) {
  angular.module("linuxDash").directive(module.name, [
    "server",
    function (server) {
      var moduleDirective = {
        restrict: "E",
        scope: {},
      };

      moduleDirective["template"] = module.template;

      return moduleDirective;
    },
  ]);
});

angular.module("linuxDash").directive("uploadTransferRateChart", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        ' \
      <multi-line-chart-plugin \
          heading="Upload Transfer Rate" \
          module-name="upload_transfer_rate" \
          units="units"> \
      </multi-line-chart-plugin> \
    ',
      link: function (scope) {
        scope.delay = 2000;
        scope.units = "KB/s";
      },
    };
  },
]);

angular.module("linuxDash").directive("supervisorStatus", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      template:
        '\
      <line-chart-plugin \
\
          heading="Supervisor" \
          module-name="supervisor_status" \
          color="0,255,0" \
\
          get-display-value="supDataDisplay" \
          metrics="supDataReturn"> \
      </line-chart-plugin> \
    ',
      link: function (scope) {
        // get max ram available on machine before we
        // can start charting
        server.get("supervisor_status", function (supdata) {
          scope.process = supdata.process;
          scope.status = supdata.status;
        });

        scope.supDataDisplay = function (serverResponseData) {
          return serverResponseData.used;
        };


        scope.supDataReturn = [
          {
            name: "Process",
            generate: function (serverResponseData) {
              var processname = serverResponseData.process;
              return processname;
            },
          },
          {
            name: "Available",
            generate: function (serverResponseData) {
              var availableRam = humanizeRam(serverResponseData.available);
              var totalRam = humanizeRam(serverResponseData.total);
              return availableRam + " of " + totalRam;
            },
          },
        ];
      },
    };
  },
]);

angular.module("linuxDash").run([
  "$rootScope",
  "$location",
  function ($rootScope, $location) {
    var key = "hiddenPlugins";

    var getHiddenPlugins = function () {
      var hiddenPluginsCSV = localStorage.getItem(key) || "";
      return hiddenPluginsCSV.split(",");
    };

    var updateHiddenPlugins = function (hiddenPlugins) {
      localStorage.setItem(key, hiddenPlugins.join(","));
    };

    $rootScope.$on("hide-plugin", function (e, m) {
      var hiddenPlugins = getHiddenPlugins();

      if (hiddenPlugins.indexOf(m) < 0) hiddenPlugins.push(m);

      updateHiddenPlugins(hiddenPlugins);
    });

    $rootScope.$on("show-plugin", function (e, m) {
      var hiddenPlugins = getHiddenPlugins();
      var indexOfPlugin = hiddenPlugins.indexOf(m);

      if (indexOfPlugin > -1) hiddenPlugins.splice(indexOfPlugin, 1);

      updateHiddenPlugins(hiddenPlugins);
    });

    $rootScope.hiddenPlugins = getHiddenPlugins();
  },
]);

angular.module("linuxDash").run([
  "$rootScope",
  "$location",
  function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function () {
      var intervalId = setInterval(function () {
        var el = document.getElementById("plugins");

        if (el) {
          var sortable = Sortable.create(el, {
            group: "plugin-order-" + $location.path().replace("/", ""),
            handle: ".heading",
            ghostClass: "ld-ghost",
            chosenClass: "ld-chosen",
            dataIdAttr: "sortablejs-id",
            animation: 1050,
            store: {
              get: function (sortable) {
                var order = localStorage.getItem(sortable.options.group.name);
                return order ? order.split("|") : [];
              },
              set: function (sortable) {
                var order = sortable.toArray();
                localStorage.setItem(
                  sortable.options.group.name,
                  order.join("|")
                );
              },
            },
          });

          clearInterval(intervalId);
        }
      });
    });
  },
]);

angular.module("linuxDash").directive("diskSpace", [
  "server",
  function (server) {
    return {
      restrict: "E",
      scope: {},
      templateUrl: "src/js/plugins/disk-space/disk-space.html",
      link: function (scope) {
        var getKBMultiplierFn = function (size, power) {
          return function () {
            return size * Math.pow(1024, power);
          };
        };

        var kbDictionary = {
          M: function () {
            return getKBMultiplierFn(size, 1);
          },
          G: function () {
            return getKBMultiplierFn(size, 2);
          },
          T: function () {
            return getKBMultiplierFn(size, 3);
          },
          P: function () {
            return getKBMultiplierFn(size, 4);
          },
          E: function () {
            return getKBMultiplierFn(size, 5);
          },
          Z: function () {
            return getKBMultiplierFn(size, 6);
          },
          Y: function () {
            return getKBMultiplierFn(size, 7);
          },
        };

        scope.heading = "Disk Partitions";
        scope.moduleName = "disk_partitions";

        scope.getData = function () {
          server.get(scope.moduleName, function (serverResponseData) {
            scope.diskSpaceData = serverResponseData;
          });

          scope.lastGet = new Date().getTime();
        };

        scope.getData();

        scope.getKB = function (stringSize) {
          var lastChar = stringSize.slice(-1);
          var size = parseFloat(stringSize.replace(",", "."));

          try {
            return kbDictionary[lastChar](size);
          } catch (err) {
            return size;
          }
        };
      },
    };
  },
]);

angular.module("linuxDash").directive("keyValueList", [
  "server",
  "$rootScope",
  function (server, $rootScope) {
    return {
      scope: {
        heading: "@",
        info: "@",
        moduleName: "@",
      },
      templateUrl: "src/js/core/features/key-value-list/key-value-list.html",
      link: function (scope, element) {
        scope.getData = function () {
          delete scope.tableRows;

          server.get(scope.moduleName, function (serverResponseData) {
            scope.tableRows = serverResponseData;
            scope.lastGet = new Date().getTime();

            if (Object.keys(serverResponseData).length === 0) {
              scope.emptyResult = true;
            }

            if (!scope.$$phase && !$rootScope.$$phase) scope.$digest();
          });
        };

        scope.getData();
      },
    };
  },
]);

angular.module("linuxDash").directive("lineChartPlugin", [
  "$interval",
  "$compile",
  "server",
  "$window",
  function ($interval, $compile, server, $window) {
    return {
      scope: {
        heading: "@",
        moduleName: "@",
        refreshRate: "=",
        maxValue: "=",
        minValue: "=",
        getDisplayValue: "=",
        metrics: "=",
        color: "@",
      },
      templateUrl: "src/js/core/features/line-chart/line-chart-plugin.html",
      link: function (scope, element) {
        scope.initializing = true;

        // wrap the entire plugin into an initializing function
        var start_rendering_line_chart = function () {
          if (!scope.color) scope.color = "0, 255, 0";

          var series, w, h, canvas;

          angular.element($window).bind("resize", function () {
            canvas.width = w;
            canvas.height = h;
          });

          // smoothieJS - Create new chart
          var chart = new SmoothieChart({
            borderVisible: false,
            sharpLines: true,
            grid: {
              //darkmode
              fillStyle: "#121212",
              strokeStyle: "#242424",
              sharpLines: true,
              millisPerLine: 3000,
              borderVisible: false,
            },
            labels: {
              fontSize: 11,
              precision: 0,
              fillStyle: "#0f0e0e",
            },
            maxValue: parseInt(scope.maxValue),
            minValue: parseInt(scope.minValue),
            horizontalLines: [
              {
                value: 5,
                color: "#eff",
                lineWidth: 1,
              },
            ],
          });

          var initializeChart = function () {
            // smoothieJS - set up canvas element for chart
            var checkForCanvasReadyState = $interval(function () {
              if (element.find("canvas")[0]) {
                canvas = element.find("canvas")[0];
                series = series || new TimeSeries();
                w = canvas.width;
                h = canvas.height;

                if (chart.seriesSet.length > 0)
                  chart.removeTimeSeries(chart.seriesSet[0].timeSeries);

                chart.addTimeSeries(series, {
                  strokeStyle: "rgba(" + scope.color + ", 1)",
                  fillStyle: "rgba(" + scope.color + ", 0.2)",
                  lineWidth: 2,
                });

                chart.streamTo(canvas, 1000);
                $interval.cancel(checkForCanvasReadyState);
              }
            }, 100);
          };

          scope.reInitializeChart = function () {
            initializeChart();
          };

          if (!scope.isHidden) initializeChart();

          var dataCallInProgress = false;

          // update data on chart
          scope.getData = function () {
            if (scope.initializing) scope.initializing = false;

            if (dataCallInProgress || !element.find("canvas")[0]) return;

            dataCallInProgress = true;

            server.get(scope.moduleName, function (serverResponseData) {
              if (serverResponseData.length < 1) {
                scope.emptyResult = true;
                return;
              }

              dataCallInProgress = false;
              scope.lastGet = new Date().getTime();

              // change graph colour depending on usage
              if (
                (scope.maxValue / 4) * 3 <
                scope.getDisplayValue(serverResponseData)
              ) {
                chart.seriesSet[0].options.strokeStyle = "rgba(255, 89, 0, 1)";
                chart.seriesSet[0].options.fillStyle = "rgba(255, 89, 0, 0.2)";
              } else if (
                scope.maxValue / 3 <
                scope.getDisplayValue(serverResponseData)
              ) {
                chart.seriesSet[0].options.strokeStyle = "rgba(255, 238, 0, 1)";
                chart.seriesSet[0].options.fillStyle = "rgba(255, 238, 0, 0.2)";
              } else {
                chart.seriesSet[0].options.strokeStyle =
                  "rgba(" + scope.color + ", 1)";
                chart.seriesSet[0].options.fillStyle =
                  "rgba(" + scope.color + ", 0.2)";
              }

              scope.newData = scope.getDisplayValue(serverResponseData);

              // update chart with this response
              series.append(scope.lastGet, scope.newData);

              // update the metrics for this chart
              scope.metrics.forEach(function (metricObj) {
                metricObj.data = metricObj.generate(serverResponseData);
              });
            });
          };

          // set the directive-provided interval
          // at which to run the chart update
          var intervalRef = $interval(scope.getData, scope.refreshRate);
          var removeInterval = function () {
            $interval.cancel(intervalRef);
          };

          element.on("$destroy", removeInterval);
        };

        // only start rendering plugin when we know the scale of max/min for the canvas chart (smoothie)
        var stopWatching = scope.$watch("maxValue", function (n, o) {
          if (n) {
            start_rendering_line_chart();
            stopWatching();
          }
        });
      },
    };
  },
]);

angular.module("linuxDash").directive("loader", function () {
  return {
    scope: {
      width: "@",
    },
    template:
      '\
      <div class="spinner">\
       <div class="rect1"></div>\
       <div class="rect2"></div>\
       <div class="rect3"></div>\
       <div class="rect4"></div>\
       <div class="rect5"></div>\
      </div>\
    ',
  };
});

angular.module("linuxDash").directive("multiLineChartPlugin", [
  "$interval",
  "$compile",
  "server",
  "$window",
  function ($interval, $compile, server, $window) {
    return {
      scope: {
        heading: "@",
        moduleName: "@",
        refreshRate: "=",
        getDisplayValue: "=",
        units: "=",
        delay: "=",
      },
      templateUrl:
        "src/js/core/features/multi-line-chart/multi-line-chart-plugin.html",
      link: function (scope, element) {
        var w, h, canvas;

        angular.element($window).bind("resize", function () {
          canvas.width = w;
          canvas.height = h;
        });

        // smoothieJS - Create new chart
        var chart = new SmoothieChart({
          borderVisible: false,
          sharpLines: true,
          grid: {
            //darkmode
            fillStyle: "#121212",
            strokeStyle: "#242424",
            sharpLines: true,
            borderVisible: false,
          },
          labels: {
            fontSize: 12,
            precision: 0,
            fillStyle: "#0f0e0e",
          },
          maxValue: 100,
          minValue: 0,
          horizontalLines: [
            {
              value: 1,
              color: "#ecc",
              lineWidth: 1,
            },
          ],
        });

        var seriesOptions = [
          {
            strokeStyle: "rgba(255, 0, 0, 1)",
            lineWidth: 2,
          },
          {
            strokeStyle: "rgba(0, 255, 0, 1)",
            lineWidth: 2,
          },
          {
            strokeStyle: "rgba(0, 0, 255, 1)",
            lineWidth: 2,
          },
          {
            strokeStyle: "rgba(255, 255, 0, 1)",
            lineWidth: 1,
          },
        ];

        // smoothieJS - set up canvas element for chart
        scope.seriesArray = [];
        scope.metricsArray = [];

        var delay = 1000;

        if (angular.isDefined(scope.delay)) delay = scope.delay;

        var initializeChart = function () {
          // smoothieJS - set up canvas element for chart
          var checkForCanvasReadyState = $interval(function () {
            if (element.find("canvas")[0]) {
              canvas = element.find("canvas")[0];
              w = canvas.width;
              h = canvas.height;

              // get the data once to set up # of lines on chart
              server.get(scope.moduleName, function (serverResponseData) {
                var numberOfLines = Object.keys(serverResponseData).length;

                for (var x = 0; x < numberOfLines; x++) {
                  var keyForThisLine = Object.keys(serverResponseData)[x];

                  scope.seriesArray[x] = new TimeSeries();
                  chart.addTimeSeries(scope.seriesArray[x], seriesOptions[x]);
                  scope.metricsArray[x] = {
                    name: keyForThisLine,
                    color: seriesOptions[x].strokeStyle,
                  };
                }
              });

              chart.streamTo(canvas, delay);
              $interval.cancel(checkForCanvasReadyState);
            }
          }, 100);
        };

        scope.reInitializeChart = function () {
          chart.seriesSet.forEach(function (ts) {
            chart.removeTimeSeries(ts.timeSeries);
          });

          initializeChart();
        };

        if (!scope.isHidden) initializeChart();

        var dataCallInProgress = false;

        // update data on chart
        scope.getData = function () {
          if (dataCallInProgress) return;

          if (!scope.seriesArray.length) return;

          dataCallInProgress = true;

          server.get(scope.moduleName, function (serverResponseData) {
            dataCallInProgress = false;
            scope.lastGet = new Date().getTime();
            var keyCount = 0;
            var maxAvg = 100;

            // update chart with current response
            for (var key in serverResponseData) {
              scope.seriesArray[keyCount].append(
                scope.lastGet,
                serverResponseData[key]
              );
              keyCount++;
              maxAvg = Math.max(maxAvg, serverResponseData[key]);
            }

            // update the metrics for this chart
            scope.metricsArray.forEach(function (metricObj) {
              metricObj.data =
                serverResponseData[metricObj.name].toString() +
                " " +
                scope.units;
            });

            // round up the average and set the maximum scale
            var len = parseInt(Math.log(maxAvg) / Math.log(10));
            var div = Math.pow(10, len);
            chart.options.maxValue = Math.ceil(maxAvg / div) * div;
          });
        };

        var refreshRate = angular.isDefined(scope.refreshRate)
          ? scope.refreshRate
          : 1000;
        var intervalRef = $interval(scope.getData, refreshRate);
        var removeInterval = function () {
          $interval.cancel(intervalRef);
        };

        element.on("$destroy", removeInterval);
      },
    };
  },
]);

angular.module("linuxDash").directive("navBar", [
  "$location",
  function ($location) {
    return {
      template:
        '\
      \
      <span class="title">Sysinfo</span>\
      \
      <ul> \
        <li ng-class="{active: isActive(navItem) }" ng-repeat="navItem in items"> \
          <a href="#/{{navItem}}" ng-bind="getNavItemName(navItem)"></a> \
          </li> \
      </ul> \
      <span class="switch"> \
      <input class="tgl tgl-skewed" id="cb3" type="checkbox"/> \
      <label class="tgl-btn" data-tg-off="Dark" data-tg-on="Light" for="cb3"></label> \
      </span>\
      <span class="right-content">\
      <a target="_blank" href="https://athe.moe">Home</a> | \
        <a target="_blank" href="https://cloud.digitalocean.com/projects#">Server</a> | \
        <a target="_blank" href="https://github.com/Athemoe">Github</a> | \
        <a target="_blank" href="https://athe.moe/repo">Repo</a> \
      </span>\
    ',
      link: function (scope) {
        scope.items = [
          "system-status",
          "basic-info",
          "network",
          "accounts",
          "apps",
        ];

        scope.getNavItemName = function (url) {
          return url.replace("-", " ");
        };

        scope.isActive = function (route) {
          return "/" + route === $location.path();
        };
      },
    };
  },
]);

angular.module("linuxDash").directive("plugin", [
  "$rootScope",
  function ($rootScope) {
    return {
      transclude: true,
      templateUrl: "src/js/core/features/plugin/plugin.html",
      link: function (s, el, attr) {
        if (attr.hasOwnProperty("chartPlugin")) s.isChartPlugin = true;

        if ($rootScope.hiddenPlugins.indexOf(s.moduleName) > -1)
          s.isHidden = true;

        s.toggleWidth = function () {
          el.find("div")[0].removeAttribute("style");
          s.enlarged = !s.enlarged;
        };

        var setPluginVisibility = function (shouldShow) {
          s.isHidden = !shouldShow;

          if (shouldShow) {
            $rootScope.$emit("show-plugin", s.moduleName);
            if (s.isChartPlugin) s.reInitializeChart();
          } else {
            $rootScope.$emit("hide-plugin", s.moduleName);
          }
        };

        s.toggleVisibility = function () {
          setPluginVisibility(s.isHidden);
        };

        s.$watch("emptyResult", function (n, o) {
          if (n) {
            setPluginVisibility(false);
          }
        });
      },
    };
  },
]);

angular.module("linuxDash").directive("progressBarPlugin", function () {
  return {
    scope: {
      width: "@",
      moduleName: "@",
      name: "@",
      value: "@",
      max: "@",
    },
    template:
      '\
      <div class="progress-bar-container">\
        <div class="progress-bar" style="width:{{width}};">\
          <div style="width: {{ (value/max) * 100 }}%;"></div>\
        </div>\
      </div>\
    ',
  };
});

angular.module("linuxDash").directive("topBar", [
  "$rootScope",
  function ($rootScope) {
    return {
      scope: {
        heading: "=",
        refresh: "&",
        lastUpdated: "=",
        toggleVisibility: "&",
        isHidden: "=",
        toggleWidth: "&",
        isChart: "=",
        info: "=", // not being used; needs a good ui solution
      },
      template:
        '\
      <div class="top-bar"> \
        <span class="heading"> &#9776; {{ heading }}</span> \
        \
        <button \
          class="ld-top-bar-btn minimize-btn" \
          ng-click="toggleVisibility()" \
          ng-class="{ active: isHidden }">-</button> \
        \
        \
        <button class="ld-top-bar-btn width-toggle-btn" ng-if="toggleWidth && !isChart" ng-click="toggleWidth()">&harr;</button> \
        <button ng-if="!isChart && !isHidden" class="ld-top-bar-btn refresh-btn" ng-click="refresh()">↺</button> \
      </div> \
    ',
    };
  },
]);

angular.module("linuxDash").directive("tableData", [
  "server",
  "$rootScope",
  function (server, $rootScope) {
    return {
      scope: {
        heading: "@",
        info: "@",
        moduleName: "@",
        width: "@",
        height: "@",
      },
      templateUrl: "src/js/core/features/table-data/table-data.html",
      link: function (scope, element) {
        scope.sortByColumn = null;
        scope.sortReverse = null;

        // set the column to sort by
        scope.setSortColumn = function (column) {
          // if the column is already being sorted
          // reverse the order
          if (column === scope.sortByColumn) {
            scope.sortReverse = !scope.sortReverse;
          } else {
            scope.sortByColumn = column;
          }

          scope.sortTableRows();
        };

        scope.sortTableRows = function () {
          scope.tableRows.sort(function (currentRow, nextRow) {
            var sortResult = 0;

            if (currentRow[scope.sortByColumn] < nextRow[scope.sortByColumn]) {
              sortResult = -1;
            } else if (
              currentRow[scope.sortByColumn] === nextRow[scope.sortByColumn]
            ) {
              sortResult = 0;
            } else {
              sortResult = 1;
            }

            if (scope.sortReverse) {
              sortResult = -1 * sortResult;
            }

            return sortResult;
          });
        };

        scope.getData = function () {
          delete scope.tableRows;

          server.get(scope.moduleName, function (serverResponseData) {
            if (serverResponseData.length > 0) {
              scope.tableHeaders = Object.keys(serverResponseData[0]);
            }

            scope.tableRows = serverResponseData;

            if (scope.sortByColumn) {
              scope.sortTableRows();
            }

            scope.lastGet = new Date().getTime();

            if (serverResponseData.length < 1) {
              scope.emptyResult = true;
            }

            if (!scope.$$phase && !$rootScope.$$phase) scope.$digest();
          });
        };

        scope.getData();
      },
    };
  },
]);

angular.module("linuxDash").run([
  "$templateCache",
  function ($templateCache) {
    $templateCache.put(
      "src/js/plugins/disk-space/disk-space.html",
      '<plugin\n  heading="Disk Partitions"\n  last-updated="lastGet"\n  on-refresh="getData()">\n\n  <loader ng-hide="diskSpaceData"></loader>\n\n  <table ng-show="diskSpaceData">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th></th>\n        <th>Stats</th>\n        <th>Used</th>\n        <th>Mount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr  ng-repeat="partition in diskSpaceData">\n        <td>{{partition[\'file_system\']}}</td>\n        <td>\n          <progress-bar-plugin\n              width="70px"\n              value="{{ getKB(partition[\'used\']) }}"\n              max="{{ getKB(partition[\'size\']) }}">\n          </progress-bar-plugin>\n        </td>\n        <td>\n          {{ partition[\'used\'] }} / {{ partition[\'size\'] }}\n        </td>\n        <td>\n          {{ partition[\'used%\'] }}\n        </td>\n        <td>{{ partition[\'mounted\'] }}</td>\n      </tr>\n    </tbody>\n  </table>\n\n</plugin>\n'
    );
    $templateCache.put(
      "src/js/core/features/key-value-list/key-value-list.html",
      '<plugin\n  heading="{{ heading }}"\n  last-updated="lastGet"\n  on-refresh="getData()"\n  info="{{ info }}">\n\n  <loader ng-if="!tableRows"></loader>\n\n  <div ng-show="tableRows">\n    <table class="key-value-list">\n      <tbody>\n        <tr ng-repeat="(name, value) in tableRows">\n          <td><strong>{{ name }}</strong></td>\n          <td>{{ value }}</td>\n        </tr>\n      </tbody>\n    </table>\n\n  </div>\n\n  <span ng-show="emptyResult">No data</span>\n</plugin>\n'
    );
    $templateCache.put(
      "src/js/core/features/line-chart/line-chart-plugin.html",
      '<plugin chart-plugin>\n\n  <loader ng-if="!maxValue || initializing"></loader>\n\n  <canvas\n    ng-show="!initializing && !emptyResult"\n    class="canvas"\n    width="400"\n    height="150">\n  </canvas>\n\n  <table ng-show="!initializing && !emptyResult" border="0" class="metrics-table">\n    <tbody>\n      <tr ng-repeat="metric in metrics">\n        <td><strong>{{ metric.name }}</strong></td>\n        <td>{{ metric.data }}</td>\n      </tr>\n    </tbody>\n  </table>\n\n  <span ng-show="emptyResult">No data</span>\n\n</plugin>\n'
    );
    $templateCache.put(
      "src/js/core/features/multi-line-chart/multi-line-chart-plugin.html",
      '<plugin chart-plugin>\n\n  <canvas class="canvas" width="400" height="145"></canvas>\n\n  <table class="metrics-table" border="0">\n    <tbody>\n      <tr ng-repeat="metric in metricsArray">\n        <td>\n          <div\n            class="metric-square"\n            style="display: inline-block; border: 1px solid {{metric.color}}; width: 8px; height: 8px; background: {{metric.color}}">\n          </div>\n        </td>\n        <td>{{ metric.name }}</td>\n        <td>{{ metric.data }}</td>\n      </tr>\n    </tbody>\n  </table>\n\n</plugin>\n'
    );
    $templateCache.put(
      "src/js/core/features/plugin/plugin.html",
      '<div\n  class="plugin"\n  ng-class="{\n    \'plugin-hidden\': isHidden,\n    \'plugin-enlarged\': enlarged,\n    \'chart-plugin\': isChartPlugin,\n  }"\n  >\n\n  <top-bar\n    heading="heading"\n    last-updated="lastGet"\n    info="info"\n    toggle-visibility="toggleVisibility()"\n    is-hidden="isHidden"\n    toggle-width="toggleWidth()"\n    refresh="getData()"\n    is-chart="isChartPlugin">\n  </top-bar>\n\n  <div\n    ng-if="!isHidden"\n    class="plugin-body"\n    ng-class="{ \'plugin-body-short no-padding chart-plugin\': isChartPlugin, }"\n    ng-transclude>\n  </div>\n\n</div>\n'
    );
    $templateCache.put(
      "src/js/core/features/table-data/table-data.html",
      '<plugin\n  heading="{{ heading }}"\n  last-updated="lastGet"\n  on-refresh="getData()"\n  info="{{ info }}">\n\n  <loader ng-if="!tableRows"></loader>\n\n  <div ng-show="tableRows">\n\n    <table class="table-data-plugin" width="{{ width }}" height="{{ height }}">\n      <thead>\n        <tr class="table-data-filter-container" ng-show="tableRows.length">\n          <th colspan="{{ tableHeaders.length }}" class="filter-container">\n            <input class="filter" ng-model="keyword" placeholder="Search">\n          </th>\n        </tr>\n        <tr>\n          <th ng-repeat="header in tableHeaders track by $index">\n            <a href="" ng-click="setSortColumn(header)">{{ header }}</a>\n            <span class="column-sort-caret">\n              {{ (header === sortByColumn && !sortReverse) ? \'&#9650;\': \'\'; }}\n              {{ (header === sortByColumn && sortReverse) ? \'&#9660;\': \'\'; }}\n            </span>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr ng-repeat="row in tableRows | filter:keyword">\n          <td ng-repeat="header in tableHeaders track by $index">\n            {{ row[header] }}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n\n  </div>\n\n  <span ng-show="emptyResult">No data</span>\n</plugin>\n'
    );
  },
]);
