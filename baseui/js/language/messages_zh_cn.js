var language = {
	validator_required : "此项为必填项!",
	validator_ip : "IP格式错误，请检查您的输入是否有误!",
	validator_email : "邮箱地址错误，请检查您的输入是否有误!",
	validator_mobile : "请输入正确的手机号码!",
	validator_tel : "电话（传真）号码错误，请检查您的输入是否有误!",
	validator_maxLength : "输入的项的长度不能超过{0}",
    validator_minLength : "输入的项的长度不能少于{0}",
	validator_common : "不允许输入如下特殊字符：{0}",
	validator_fixLength : '必需是{0}个字符',
	validator_noAllowDecimals : "此项不能使用小数点",
	validator_noAllowNegative : "输入的值不能为负数",
	validator_minValue : "输入的值不能小于{0}",
	validator_maxValue : "输入的值不能大于{0}",
	validator_number : "请输入正确的数字",
	validator_invalid : " 此次操作无效",
	validator_paste : "粘贴内容不能包含以下特殊字符:",
	validator_mac : "输入的mac地址格式不正确",
    "validator.unitLength" : "个字",
    "validator.unitLength.chinese" : "个字符,一个汉字代表$[0]个字符",

    info_mobile : '请输入手机号码（11位数字）',
	info_tel : '请输入电话号码（区号-电话号码,或者400号码）',
	info_ip : '请输入有效的IP地址',
	info_email : '请输入有效的邮箱地址',
	info_maxLength : '请输入{0}~{1}',
	info_minLength : '请输入至少{0}',
	info_fixLength : '请输入{0}',
	info_min_maxLength : '请输入{0}~{1}',
	info_common : '不能包含以下字符：{0}',
	info_number : '请输入有效数字',
	info_number_min_max : '请输入{0}~{1}的数字',
	info_number_min : '请输入大于等于{0}的数字',
	info_number_max : '请输入小于等于{0}的数字',
	info_number_allowDN : '不能使用小数点和负数',
	info_number_allowD : '不能使用小数点',
	info_number_allowN : '不能使用负数',
	info_mac : "请输入有效的mac地址",

	ajax_error_default: '操作失败，平台发生异常，请联系管理员',
	ajax_error_0 : '操作失败，平台发生异常，请联系管理员',
	ajax_error_404 : '无效请求(404)',
    ajax_error_413 : '文件过大(413)',
	ajax_error_504 : '操作失败，网关超时(504)，请联系管理员',
	ajax_error_505 : '操作失败，平台发生异常(505)，请联系管理员',
	ajax_error_12029 : '操作失败，平台发生异常，请联系管理员',
	ajax_error_message : '{0}。错误码：{1}',
    ajax_error_inside_message : '{0}。内部错误码：{1}',
    ajax_error_inside_message_without_errorcode : '{0}',
	"ajax.error_parse" : '网络不稳定，请检查',
	ajax_error_title : '错误',
	ajax_error_network : '网络异常',
	
	"ocx.error" : "控件异常" ,
	"ocx.load" : "最新控件正在加载中,请稍后...",
	"flash.error" : "使用该控件需要安装flash active插件...",
	
	"shedule.copy" : "请选择要复制的日期模板",
	"shedule.delete" : "请选择要删除的时间段",
	"shedule.special.error" : "同一个日期不能配置两个特殊日模板",
	"shedule.starttime.empty" : "开始时间不能为空",
	"shedule.endtime.empty" : "结束时间不能为空",
	"shedule.starttime.invalid" : "开始时间无效",
	"shedule.endtime.invalid" : "结束时间无效",
	"shedule.time.error" : "开始时间不能大于等于结束时间",
	"shedule.time.repeat" : "输入无效，时间条不允许重叠",
	
	form_change : "数据已变更,确定要返回吗?",
	dialog_confirm : "确认",
	dialog_info : "提示",
	"dialog.ok" : "确定",
	"dialog.close" : "关闭",
    "dialog.success" : "成功",
    "dialog.cancel" : "取消",
    "dialog.error" : "错误",
    "dialog.warn" : "警告",
	"dialog.forbid" : "禁止",
	"dialog.attention" : "注意",
	form_error : "表单存在错误，请查看！",
	loading : "正在加载中，请稍后.......",
	"error" : "错误",
	ui_loadMore : "加载更多",
	ui_mismatching : "无法匹配",
	ui_progress_runBack : "后台运行",
	
	tree_noData : "对不起，暂无数据！" ,

    /*planTemplate*/
    monday : '星期一',
    tuesday : '星期二',
    wednesday : '星期三',
    thursday : '星期四',
    friday : '星期五',
    saturday : '星期六',
    sunday : '星期日'
};
/*Array.prototype.get = function(i) {
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
};    */
language.text = function(message) {
    var param = Array.prototype.slice.call(arguments, 1);
    message = language[message];
    return message.replace(/{(\d+)}/g, function (m, i) {
        return param[i];
    });
};
var lan = language;