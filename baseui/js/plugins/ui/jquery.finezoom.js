(function (d, h) {
    var m = {max_zoom: 4, zoom_duration: 200, mousewheel: !0, drag_smooth: 3, toolbar: "mouseover", toolbar_pos: ["left", "top"], markers: [], dragEnd: null, drag: null, dragStart: null, zoomEnd: null, zoom: null, zoomStart: null, onLoad: null, start_width: 300, start_height: 300}, l = function (a, c) {
        this.settings = c;
        this.src = a.attr("src");
        this.src_high = null !== a.data("high") ? a.data("high") : !1;
        this.parent = a.parent();
        this.wrapper = d('<div style="position:relative;overflow:hidden;" class="fz-container" />').appendTo(this.parent);
        this.wrapper.css({width: c.start_width, height: c.start_height});
        a.data("oldstyle", a.attr("style"));
        this.image = a.css({position: "absolute", top: 0, left: 0}).hide();
        this.toolbar = d('<div class="fz-toolbar" />').appendTo(this.wrapper);
        this.zoom_in = d('<a class="fz-zoomin" />').appendTo(this.toolbar);
        this.zoom_out = d('<a class="fz-zoomout" />').appendTo(this.toolbar);
        this.reset = d('<a class="fz-reset" />').appendTo(this.toolbar);
        this.download = d('<a class="fz-download" />').appendTo(this.toolbar);
        this.loader = d('<div class="fz-loader" />').appendTo(this.wrapper);
        this.or_w = a.width();
        this.or_h = a.height();
        this.x_factor = 1;
        this.currY = this.currX = this.sy = this.sx = this.my = this.mx = this.limity = this.limitx = 0;
        this.buttTimer = this.dragTimer = null;
        this.perspective = this.support("perspective");
        this.transform = this.support("transform");
        this.transOrigin = this.support("transformOrigin");
        this.transDur = this.support("transitionDuration");
        this.transEnd = this.transitionEvent();
        (this.use_css3 = null !== this.perspective && this.perspective) && this.image.css(this.transOrigin, "0 0");
        this.enabled = !0;
        this.dragging = !1;
        this.start_zoom = !0;
        this.image.addClass("fz-animate");
        this.drag_timeout = 30;
        window.chrome && (this.drag_timeout = 100);
        /Android/.test(navigator.userAgent) && (this.settings.toolbar = !0);
        this.onImageLoad()
    };
    l.prototype = {onImageLoad: function () {
        var a = this;
        if (0 < this.image.width() && 0 < this.image.height())a.init(); else {
            var c = new Image;
            c.onload = function () {
                a.init()
            };
            c.src = this.image.attr("src")
        }
    }, transitionEvent: function () {
        var a = document.createElement("div"), c = {transition: "transitionend", OTransition: "oTransitionEnd", MSTransition: "msTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd"}, b;
        for (b in c)if (a.style[b] !== h)return c[b];
        return!1
    }, addMarkers: function () {
        for (var a = this.settings, c = a.markers, b = 0; b < c.length; b++) {
            var f = c[b], g = d('<a class="fz-marker" />').css({left: f.left, top: f.top}).data("pos", {left: f.left, top: f.top}).appendTo(this.wrapper);
            "function" == typeof f.click && g.bind("click", f, function (b) {
                b.data.click.call(this)
            });
            f["class"] && g.addClass(f["class"]);
            this.use_css3 && (g.addClass("fz-animate2"), g.css(this.transDur, a.zoom_duration + "ms"))
        }
    }, updateMarkers: function () {
        var a = this;
        this.wrapper.find(".fz-marker").each(function () {
            var c = d(this), b = c.data("pos"), f = c.height(), c = c.width(), c = a.x_factor * b.left + a.currX - c * (1 - a.x_factor) / 2, b = a.x_factor * b.top + a.currY - f * (1 - a.x_factor);
            d(this).css({left: c, top: b})
        })
    }, init: function () {
        this.loader.remove();
        this.or_w = this.image.width();
        this.or_h = this.image.height();
        this.image.appendTo(this.wrapper).show();
        this.wrapper.css({width: this.or_w, height: this.or_h});
        this.image.attr("unselectable", "on").css({"max-width": "none", "max-height": "none"}).css("UserSelect", "none").css("MozUserSelect", "none").css("width", this.or_w);
        var a = this.settings.toolbar_pos[0], c = this.settings.toolbar_pos[1];
        "left" == a || "right" == a ? this.toolbar.css(a, 0) : isNaN(a) || this.toolbar.css("left", a);
        "top" == c || "bottom" == c ? this.toolbar.css(c, 0) : isNaN(c) || this.toolbar.css("top", c);
        this.addMarkers();
        "function" == typeof this.settings.onLoad && this.settings.onLoad.call(this);
        this.bindEvents()
    }, zoom: function (a, c, b) {
        var f = this.x_factor;
        this.x_factor = f * a;
        1 >= this.x_factor && (this.x_factor = 1, a = this.x_factor / f);
        this.x_factor >= this.settings.max_zoom && (this.x_factor = this.settings.max_zoom, a = this.x_factor / f);
        if (this.x_factor <= this.settings.max_zoom && 1 <= this.x_factor) {
            this.start_zoom && ("function" == typeof this.settings.zoomStart && this.settings.zoomStart.call(this), this.start_zoom = !1);
            var f = this.or_w * this.x_factor, d = this.or_h * this.x_factor;
            this.limitx = this.or_w - f;
            this.limity = this.or_h - d;
            var e = a * this.currX + this.mx * (1 - a);
            a = a * this.currY + this.my * (1 - a);
            c !== h && !isNaN(c) && (e = c);
            b !== h && !isNaN(b) && (a = b);
            0 <= e && (e = 0);
            e <= this.limitx && (e = this.limitx);
            0 <= a && (a = 0);
            a <= this.limity && (a = this.limity);
            this.currX = e;
            this.currY = a;
            if (this.use_css3)this.image.css(this.transform, "translate3d(" + this.currX + "px," + this.currY + "px, 0) scale(" + this.x_factor + ")"); else {
                var j = this;
                this.image.stop(!0, !1).animate({width: f, height: d, top: this.currY, left: this.currX}, this.settings.zoom_duration, function () {
                    "function" == typeof j.settings.zoomEnd && j.settings.zoomEnd.call(j);
                    j.start_zoom = !0
                })
            }
            if (1.5 < this.x_factor && this.src_high) {
                var k = this.image, j = this;
                c = new Image;
                c.onload = function () {
                    k.attr("src", j.src_high)
                };
                c.onerror = function () {
                    k.attr("src", j.src)
                };
                c.src = this.src_high
            }
            "function" == typeof this.settings.zoom && this.settings.zoom.call(this);
            this.updateMarkers()
        }
    }, mwheel: function (a) {
        a || (a = window.event);
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        a = a.wheelDelta ? a.wheelDelta / 120 : -a.detail / 3;
        this.zoom(0 < a ? a + 1 : 1 / (1 - a))
    }, drag: function () {
        if (this.enabled) {
            this.use_css3 ? (this.currX = this.mx - this.sx, this.currY = this.my - this.sy) : (this.currX += (this.mx - this.sx - this.currX) / this.settings.drag_smooth, this.currY += (this.my - this.sy - this.currY) / this.settings.drag_smooth);
            0 <= this.currX && (this.currX = 0);
            this.currX <= this.limitx && (this.currX = this.limitx);
            0 <= this.currY && (this.currY = 0);
            this.currY <= this.limity && (this.currY = this.limity);
            this.use_css3 ? this.image.css(this.transform, "translate3d(" + this.currX + "px," + this.currY + "px, 0) scale(" + this.x_factor + ")") : this.image.css({left: this.currX, top: this.currY});
            this.updateMarkers();
            "function" == typeof this.settings.drag && this.settings.drag.call(this);
            var a = this;
            this.dragTimer = setTimeout(function () {
                a.drag()
            }, this.drag_timeout)
        }
    }, dragEnd: function () {
        var a = this;
        "function" == typeof a.settings.dragEnd && a.settings.dragEnd.call(a);
        setTimeout(function () {
            a.dragging = !1
        }, 300)
    }, bindEvents: function () {
        var a = this, c = this.settings;
        this.use_css3 && this.image.css(this.transDur, c.zoom_duration + "ms").bind(this.transEnd, this, function (b) {
            b = b.data;
            !b.dragging && "function" == typeof b.settings.zoomEnd && b.settings.zoomEnd.call(b);
            b.start_zoom = !0
        });
        this.wrapper.bind("mousedown.fz touchstart.fz", this,function (b) {
            b.preventDefault();
            b.stopPropagation();
            var a = b.data, c = d(this).offset(), e = b.originalEvent;
            e.touches !== h && null !== e.touches && (b.pageX = e.touches[0].pageX, b.pageY = e.touches[0].pageY);
            a.mx = b.pageX - c.left;
            a.my = b.pageY - c.top;
            a.sx = a.mx - a.currX;
            a.sy = a.my - a.currY;
            d(this).css("cursor", 1 < a.x_factor ? "move" : "");
            1 < a.x_factor && ("function" == typeof a.settings.dragStart && a.settings.dragStart.call(b.data), a.dragging = !0, a.drag())
        }).bind("mousemove.fz touchmove.fz", this,function (a) {
            var c = d(this).offset(), g = a.data, e = a.originalEvent;
            e.touches !== h && null !== e.touches && (a.pageX = e.touches[0].pageX, a.pageY = e.touches[0].pageY);
            g.mx = a.pageX - c.left;
            g.my = a.pageY - c.top
        }).bind("mouseup.fz touchend.fz", this, function (a) {
            clearTimeout(a.data.dragTimer);
            clearInterval(a.data.buttTimer);
            1 < a.data.x_factor && a.data.dragEnd()
        });
        "mouseover" == this.settings.toolbar ? this.wrapper.bind("mouseenter.fz", this,function (a) {
            a.data.toolbar.stop(!0).fadeIn("fast")
        }).bind("mouseleave.fz", this, function (a) {
            a.data.toolbar.stop(!0).fadeOut("fast")
        }) : !0 === this.settings.toolbar ? this.toolbar.show() : this.toolbar.hide();
        this.zoom_in.bind("mousedown.fz touchstart.fz", this,function (a) {
            a.stopPropagation();
            a.preventDefault();
            a.data.mx = a.data.or_w / 2;
            a.data.my = a.data.or_h / 2;
            a.data.buttTimer = setInterval(function () {
                a.data.zoom(1.2)
            }, 30)
        }).bind("mouseup.fz touchend.fz", this, function (a) {
            clearInterval(a.data.buttTimer)
        });
        this.zoom_out.bind("mousedown.fz touchstart.fz", this,function (a) {
            a.stopPropagation();
            a.preventDefault();
            a.data.mx = a.data.or_w / 2;
            a.data.my = a.data.or_h / 2;
            a.data.buttTimer = setInterval(function () {
                a.data.zoom(0.8)
            }, 30)
        }).bind("mouseup.fz touchend.fz", this, function (a) {
            clearInterval(a.data.buttTimer)
        });
        this.reset.bind("click.fz touchstart.fz", this, function (a) {
            a.data.zoom(1 / a.data.x_factor)
        });
        this.download.bind("click.fz touchstart.fz", this, function (a) {
            var imgUrl = a.data.image.attr('src');
            window.open(imgUrl);
        });
        d(document).bind("mouseup.fz touchend.fz", this, function (a) {
            clearTimeout(a.data.dragTimer);
            clearInterval(a.data.buttTimer)
        });
        this.wrapper[0].ongesturechange = function (b) {
            b.preventDefault();
            b.stopPropagation();
            1 < b.touches.length && (a.mx = (b.touches[0].pageX + b.touches[1].pageX) / 2, a.my = (b.touches[0].pageY + b.touches[1].pageY) / 2, a.zoom(b.scale));
            return!1
        };
        this.settings.mousewheel && (this.wrapper[0].addEventListener ? (this.wrapper[0].addEventListener("DOMMouseScroll", function (b) {
            a.mwheel(b)
        }, !1), this.wrapper[0].addEventListener("mousewheel", function (b) {
            a.mwheel(b)
        }, !1)) : this.wrapper[0].onmousewheel = function (b) {
            a.mwheel(b)
        })
    }, focusTo: function (a, c, b) {
        this.zoom(b / this.x_factor, this.or_w / 2 - b * a, this.or_h / 2 - b * c)
    }, support: function (a) {
        var c = null, b = a.charAt(0).toUpperCase() + a.slice(1), d = ["Moz", "Webkit", "O", "ms"], g = document.createElement("div");
        if (a in g.style)c = a; else for (var e = 0; e < d.length; e++)if (a = d[e] + b, a in g.style) {
            c = a;
            break
        }
        return c
    }, enable: function (a) {
        this.enabled = a;
        this.toolbar.css("opacity", a ? 1 : 0.3)
    }};
    var k = {init: function (a) {
        return this.each(function () {
            var c = d.extend({}, m, a), b = d(this);
            b.data("FZ") === h && (b.data("author", "http://www.albanx.com/"), b.data("FZ", new l(b, c)))
        })
    }, enable: function () {
        return this.each(function () {
            d(this).data("FZ").enable(!0)
        })
    }, disable: function () {
        return this.each(function () {
            d(this).data("FZ").enable(!1)
        })
    }, zoomIn: function () {
        d(this).data("FZ").zoom_in.trigger("mousedown.fz")
    }, zoomOut: function () {
        d(this).data("FZ").zoom_out.trigger("mousedown.fz")
    }, zoom: function (a) {
        d(this).data("FZ").zoom(a)
    }, focusTo: function (a, c, b) {
        d(this).data("FZ").focusTo(a, c, b)
    }, getZoom: function () {
        return d(this).data("FZ").x_factor
    }, destroy: function () {
        return this.each(function () {
            var a = d(this), c = a.data("FZ");
            a.removeAttr("style").attr("style", a.data("oldstyle")).attr("src", c.src);
            a.appendTo(c.wrapper.parent());
            c.wrapper.remove();
            a.removeData("FZ")
        })
    }, option: function (a, c) {
        return this.each(function () {
            var b = d(this).data("FZ");
            c !== h && (b.settings[a] = c);
            return b.settings[a]
        })
    }};
    d.fn.finezoom = function (a, c) {
        if (k[a])return k[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof a || !a)return k.init.apply(this, arguments);
        d.error("Method " + a + " does not exist on jQuery.FineZoom")
    }
})(jQuery, void 0);