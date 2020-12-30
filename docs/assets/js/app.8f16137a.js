(function(e) {
  function n(n) {
    for (
      var i, c, u = n[0], f = n[1], l = n[2], a = 0, d = [];
      a < u.length;
      a++
    )
      (c = u[a]),
        Object.prototype.hasOwnProperty.call(r, c) && r[c] && d.push(r[c][0]),
        (r[c] = 0);
    for (i in f) Object.prototype.hasOwnProperty.call(f, i) && (e[i] = f[i]);
    s && s(n);
    while (d.length) d.shift()();
    return o.push.apply(o, l || []), t();
  }
  function t() {
    for (var e, n = 0; n < o.length; n++) {
      for (var t = o[n], i = !0, u = 1; u < t.length; u++) {
        var f = t[u];
        0 !== r[f] && (i = !1);
      }
      i && (o.splice(n--, 1), (e = c((c.s = t[0]))));
    }
    return e;
  }
  var i = {},
    r = { app: 0 },
    o = [];
  function c(n) {
    if (i[n]) return i[n].exports;
    var t = (i[n] = { i: n, l: !1, exports: {} });
    return e[n].call(t.exports, t, t.exports, c), (t.l = !0), t.exports;
  }
  (c.m = e),
    (c.c = i),
    (c.d = function(e, n, t) {
      c.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: t });
    }),
    (c.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (c.t = function(e, n) {
      if ((1 & n && (e = c(e)), 8 & n)) return e;
      if (4 & n && "object" === typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (c.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var i in e)
          c.d(
            t,
            i,
            function(n) {
              return e[n];
            }.bind(null, i)
          );
      return t;
    }),
    (c.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return c.d(n, "a", n), n;
    }),
    (c.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (c.p = "/");
  var u = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    f = u.push.bind(u);
  (u.push = n), (u = u.slice());
  for (var l = 0; l < u.length; l++) n(u[l]);
  var s = f;
  o.push([0, "chunk-vendors"]), t();
})({
  0: function(e, n, t) {
    e.exports = t("56d7");
  },
  "4af6": function(e, n, t) {
    e.exports = t.p + "assets/img/oks.625b729e.svg";
  },
  "56d7": function(e, n, t) {
    "use strict";
    t.r(n);
    t("e260"), t("e6cf"), t("cca6"), t("a79d");
    var i = t("7a23"),
      r = t("c3df"),
      o = t.n(r),
      c = Object(i["c"])(
        "img",
        { class: "game-logo", src: o.a, alt: "Taktou16 game logo" },
        null,
        -1
      );
    function u(e, n, t, r, o, u) {
      var f = Object(i["g"])("Game");
      return (
        Object(i["d"])(), Object(i["b"])("main", null, [c, Object(i["c"])(f)])
      );
    }
    var f = Object(i["h"])("data-v-61238631");
    Object(i["f"])("data-v-61238631");
    var l = { class: "board" };
    Object(i["e"])();
    var s = f(function(e, n, t, r, o, c) {
        return (
          Object(i["d"])(),
          Object(i["b"])("section", l, [
            Object(i["c"])(
              "figure",
              {
                ref: "f00",
                onClick:
                  n[1] ||
                  (n[1] = function(e) {
                    return c.input(0, 0);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f01",
                onClick:
                  n[2] ||
                  (n[2] = function(e) {
                    return c.input(0, 1);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f02",
                onClick:
                  n[3] ||
                  (n[3] = function(e) {
                    return c.input(0, 2);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f03",
                onClick:
                  n[4] ||
                  (n[4] = function(e) {
                    return c.input(0, 3);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f10",
                onClick:
                  n[5] ||
                  (n[5] = function(e) {
                    return c.input(1, 0);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f11",
                onClick:
                  n[6] ||
                  (n[6] = function(e) {
                    return c.input(1, 1);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f12",
                onClick:
                  n[7] ||
                  (n[7] = function(e) {
                    return c.input(1, 2);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f13",
                onClick:
                  n[8] ||
                  (n[8] = function(e) {
                    return c.input(1, 3);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f20",
                onClick:
                  n[9] ||
                  (n[9] = function(e) {
                    return c.input(2, 0);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f21",
                onClick:
                  n[10] ||
                  (n[10] = function(e) {
                    return c.input(2, 1);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f22",
                onClick:
                  n[11] ||
                  (n[11] = function(e) {
                    return c.input(2, 2);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f23",
                onClick:
                  n[12] ||
                  (n[12] = function(e) {
                    return c.input(2, 3);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f30",
                onClick:
                  n[13] ||
                  (n[13] = function(e) {
                    return c.input(3, 0);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f31",
                onClick:
                  n[14] ||
                  (n[14] = function(e) {
                    return c.input(3, 1);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f32",
                onClick:
                  n[15] ||
                  (n[15] = function(e) {
                    return c.input(3, 2);
                  })
              },
              null,
              512
            ),
            Object(i["c"])(
              "figure",
              {
                ref: "f33",
                onClick:
                  n[16] ||
                  (n[16] = function(e) {
                    return c.input(3, 3);
                  })
              },
              null,
              512
            )
          ])
        );
      }),
      a = t("d4ec"),
      d = t("bee2"),
      p = { O: 1, X: -1 },
      h = (function() {
        function e() {
          Object(a["a"])(this, e),
            (this.filds = [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ]),
            (this.winner = 0);
        }
        return (
          Object(d["a"])(e, [
            {
              key: "claim",
              value: function(e, n) {
                var t = e.x,
                  i = e.y;
                return (
                  0 == this.filds[t][i] &&
                  ((this.filds[t][i] = n),
                  this.lookForWin({ x: t, y: i }, n) && (this.winner = n),
                  !0)
                );
              }
            },
            {
              key: "unclaim",
              value: function(e) {
                var n = e.x,
                  t = e.y;
                0 != this.filds[n][t] && (this.filds[n][t] = 0);
              }
            },
            {
              key: "lookForWin",
              value: function() {
                for (
                  var e = Math.abs(
                      this.filds[0][0] +
                        this.filds[1][1] +
                        this.filds[2][2] +
                        this.filds[3][3]
                    ),
                    n = Math.abs(
                      this.filds[0][3] +
                        this.filds[1][2] +
                        this.filds[2][1] +
                        this.filds[3][0]
                    ),
                    t = 0,
                    i = 0,
                    r = 0;
                  r < 4;
                  r++
                )
                  if (
                    ((t = Math.abs(
                      this.filds[r][0] +
                        this.filds[r][1] +
                        this.filds[r][2] +
                        this.filds[r][3]
                    )),
                    (i = Math.abs(
                      this.filds[0][r] +
                        this.filds[1][r] +
                        this.filds[2][r] +
                        this.filds[3][r]
                    )),
                    4 == t || 4 == i || 4 == e || 4 == n)
                  )
                    return !0;
                return !1;
              }
            },
            {
              key: "unclaimedFields",
              value: function() {
                for (var e = [], n = 0; n < 4; n++)
                  for (var t = 0; t < 4; t++)
                    0 == this.filds[n][t] && e.push(this.filds[n][t]);
                return e;
              }
            }
          ]),
          e
        );
      })(),
      b = new h(-1),
      g = {
        name: "Game",
        data: function() {
          return { claimed: [], graphicsO: t("4af6"), graphicsX: t("a163") };
        },
        methods: {
          input: function(e, n) {
            var t = this.getRole();
            b.lookForWin() ||
              (b.claim({ x: e, y: n }, t) &&
                (this.$refs["f" + e + n].classList.add("active"),
                this.$refs["f" + e + n].insertAdjacentHTML(
                  "beforeend",
                  "<img src='" +
                    (t + 1 ? this.graphicsO : this.graphicsX) +
                    "' alt='player x'/>"
                ),
                console.table(b.filds),
                b.lookForWin() &&
                  setTimeout(function() {
                    alert("We have a winner!");
                  }, 500)));
          },
          getRole: function() {
            return b.unclaimedFields().length % 2 == 0 ? p.X : p.O;
          }
        }
      };
    t("ca54"), t("e7ca");
    (g.render = s), (g.__scopeId = "data-v-61238631");
    var v = g,
      O = { name: "App", components: { Game: v } };
    t("6d00");
    O.render = u;
    var j = O,
      k = t("9483");
    Object(k["a"])("".concat("/", "service-worker.js"), {
      ready: function() {
        console.log(
          "App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"
        );
      },
      registered: function() {
        console.log("Service worker has been registered.");
      },
      cached: function() {
        console.log("Content has been cached for offline use.");
      },
      updatefound: function() {
        console.log("New content is downloading.");
      },
      updated: function() {
        console.log("New content is available; please refresh.");
      },
      offline: function() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error: function(e) {
        console.error("Error during service worker registration:", e);
      }
    }),
      Object(i["a"])(j).mount("#app");
  },
  "59ff": function(e, n, t) {},
  "5a25": function(e, n, t) {},
  "6d00": function(e, n, t) {
    "use strict";
    t("59ff");
  },
  a163: function(e, n, t) {
    e.exports = t.p + "assets/img/iks.47ce3472.svg";
  },
  c3df: function(e, n, t) {
    e.exports = t.p + "assets/img/taktou16.5befe801.svg";
  },
  ca54: function(e, n, t) {
    "use strict";
    t("d54d");
  },
  d54d: function(e, n, t) {},
  e7ca: function(e, n, t) {
    "use strict";
    t("5a25");
  }
});
//# sourceMappingURL=app.8f16137a.js.map
