define('./pdTangram', [ './component' ], function(require, exports) {
	var Component = require('./component');
	return Component.extend({
		$tip : null,
		constructor : function(opt) {
			this.base(opt);
		},
		render : function() {
			var self = this;
			this.el.bind('keyup change', function() {
				self.authPasswd(this.value);
			})
		},
		destroy : function() {
			this.base();
		},
		noticeAssign : function(num) {
			this.trigger('noticeAssign', num);
		},
		authPasswd : function(string) {
			if (string.length >= 6) {
				if (/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+/.test(string)) {
					this.noticeAssign(3);
				} else if ((/[a-zA-Z]+/.test(string)) || (/[0-9]+/.test(string)) || (/\W+/.test(string))) {
					if (/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
						this.noticeAssign(2);
					} else if (/[a-zA-Z]+/.test(string) && /\W+/.test(string)) {
						this.noticeAssign(2);
					} else if (/[0-9]+/.test(string) && /\W+/.test(string)) {
						this.noticeAssign(2);
					} else {
						this.noticeAssign(1);
					}
				}
			} else {
				this.noticeAssign(0);
			}
		}
	});
});
