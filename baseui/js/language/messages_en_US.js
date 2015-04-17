var language = {
	"validator.required" : "This field is required",
	"validator.ip" : "Invalid IP address",
	"validator.email" : "Please enter a valid email address",
	"validator.mobile" : "Invalid phone number",
	"validator.tel" : "Invalid telphone number",
	"validator.unitLength" : "",
	"validator.unitLength.chinese" : ",one chinese takes $[0] characters",
	"validator.maxLength" : "Please enter no more then $[0] characters",
	"validator.minLength" : "Please enter at least $[0] characters",
	"validator.common" : "Invalid character: $[0]",
	"validator.fixLength" : 'Please enter $[0] characters',
	"validator.noAllowDecimals" : "Please enter only digits",
	"validator.noAllowNegative" : "Please enter only digits",
	"validator.minValue" : "Please enter a value greater than or equal to $[0]",
	"validator.maxValue" : "Please enter a value less than or equal to $[0]",
	"validator.number" : "Please enter only digits",
	"validator.invalid" : " This operation is invalid",
	"validator.paste" : " This field may not contain special characters",
	"validator.mac" : "Invalid mac address",

	"form.info" : 'Please enter ${labelName}',
	"info.mobile" : 'please enter eleven phone numbers',
	"info.tel" : 'Please enter telephone number in 0000-88888888 format or starts with 400',
	"info.ip" : 'Please enter a valid IP address',
	"info.email" : 'Please enter a valid email address.',
	"info.maxLength" : 'please enter a value between $[0] and $[1] characters long',
	"info.minLength" : 'Please enter at least $[0] characters',
	"info.fixLength" : 'please enter $[0] characters',
	"info.min-maxLength" : 'Please enter a value between  $[0] and $[1] characters long',
	"info.common" : '$[0] are not allowed',
	"info.number" : 'Please enter only number',
	"info.number.min-max" : 'Please enter a value between $[0] and $[1]',
	"info.number.min" : 'Please enter a value greater then or equal to $[0]',
	"info.number.max" : 'Please enter a value less then or equal to $[0]',
	"info.number.allowDN" : ', nagitive and decimal are not allowed',
	"info.number.allowD" : ', decimal is not allowed',
	"info.number.allowN" : ', nagitive is not allowed',
	"info.mac" : "Please enter a valid mac address",

	"ajax.error.default" : 'Operation failed，the platform is abnormal, please contact the administrator.',
	"ajax.error.0" : 'Operation failed，the platform is abnormal, please contact the administrator.',
	"ajax.error.404" : 'Invalid request(404)',
	"ajax.error.413" : 'The file is too large(413)',
	"ajax.error.504" : 'Operation failed, gateway timeout(504), please contact the administrator.',
	"ajax.error.505" : 'Operation failed, the platform is abnormal(505), please contact the administrator.',
	"ajax.error.12029" : 'Operation failed, the platform is abnormal, please contact the administrator.',
	"ajax.error_message" : '$[0]. Error code：$[1]',
	"ajax.error_inside_message" : '${get(0)||"Unknown error"}.The error code：$[1]',
	"ajax.error_inside_message_without_errorcode" : '${get(0)||"Unknown error"}.',
	"ajax.error_parse" : 'The network is not stable.',
	"ajax.error_title" : 'Error',
	"ajax.error.network" : 'Network Abnormal',
	
	"ocx.error" : "Errors are found in ActiveX control." ,
	"ocx.load" : "Loading the latest activeX...",
	"flash.error" : "To enable this Function, you should install flash first.",
	
	"shedule.copy" : "Please select a template to copy",
	"shedule.delete" : "please select a time range to delete",
	"shedule.special.error" : "You can not config two special templates on the same day.",
	"shedule.starttime.empty" : "Please select a start time",
	"shedule.endtime.empty" : "please select a end time",
	"shedule.starttime.invalid" : "Invalid start time",
	"shedule.endtime.invalid" : "Invalid end time",
	"shedule.time.error" : "Start time must be earlier then end time.",
	"shedule.time.repeat" : "Invalid input, the time has overlapped ",
	
	"form.change" : 'The data is changed. Return without saving?',
	"dialog.confirm" : "Confirm",
	"dialog.info" : "Note",
	"dialog.ok" : "OK",
	"dialog.close" : "Close",
	"dialog.success" : "Success",
	"dialog.cancel" : "Cancel",
	"dialog.error" : "Error",
	"dialog.warn" : "Caution",
	"dialog.forbid" : "disable",
	"dialog.attention" : "attention",
	"form.error" : "Errors are found in form",
	"loading" : "Loading......",
	"error" : "Error",
	"ui.loadMore" : "loadMore",
	"ui.mismatching" : "Unable to match",
	"ui.progress.runBack" : "Hide",
	
	"tree.noData" : "No data"
};
Array.prototype.get = function(i) {
	return this[i];
};
language.templateSettings = {
	evaluate : /<%([\s\S]+?)%>/g,
	interpolate : /\$\{(.+?)\}/g,
	interpolate_get : /\$\[(.+?)\]/g,
	interpolate_text : /\$text\{(.+?)\}/g
};

language.template = function(str, data, templateSettings) {
	if (data == null) {
		return str;
	}
	var c = language.templateSettings || templateSettings;
	var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\''
			+ str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(c.interpolate, function(match, code) {
				return "'," + code.replace(/\\'/g, "'") + ",'";
			}).replace(c.interpolate_get, function(match, code) {
				return "',get(" + code.replace(/\\'/g, "'") + "),'";
			}).replace(c.evaluate || null, function(match, code) {
				return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
			}).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
	var func = new Function('obj', tmpl);
	return func(data);
};

language.text = function(message, param) {
	if (param != null && typeof(param) != 'object') {
		param = Array.prototype.slice.call(arguments, 1);
	}
	return language.template(language[message], param);
};
var lan = language;