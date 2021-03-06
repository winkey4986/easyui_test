/*
 * Fuel UX Combobox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

var Combobox = function (a, b) {
    this.$element = $(a);
    this.options = $.extend({}, $.fn.combobox.defaults, b);
    this.$element.on("click", "a", $.proxy(this.itemclicked, this));
    this.$input = this.$element.find("input")
};
Combobox.prototype = {constructor: Combobox, select: function (a) {
    this.$input.val(a).change();
    return this
}, itemclicked: function (a) {
    this.select($(a.target).text());
    $("body").click();
    a.preventDefault()
}};
$.fn.combobox = function (a) {
    return this.each(function () {
        var b = $(this), c = b.data("combobox"), d = "object" === typeof a && a;
        c || b.data("combobox", c = new Combobox(this, d));
        if ("string" === typeof a)c[a]()
    })
};
$.fn.combobox.defaults = {};
$.fn.combobox.Constructor = Combobox;
$(function () {
    $("body").on("mousedown.combobox.data-api", ".combobox", function () {
        var a = $(this);
        a.data("combobox") || a.combobox(a.data())
    })
});