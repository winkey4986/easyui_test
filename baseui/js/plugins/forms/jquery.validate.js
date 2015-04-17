/**
 * @fileOverview 表单验证控件
 * @description 表单验证控件
 */
(function($) {
    var ASCII_UN_USE = "\\\/:*?\"<|'%>",
        /**
         * @namespace
         * @example
         * 1.使用方法
         *  &lt;input name="userCount" id="userCount" vtype="XXX"/&gt;
         * $('#userCount')。validate();
         * 2.扩展方法
         *
         * $.extand($.vtype,{
 *     xxx : {
 *         valid : function(){
 *             //todo  定义你的验证规则
 *         },
 *         errormsg : '这里写错误提示' ,
 *         info : '这里写info提示'
 *     }
 * })
         */
        VTYPE = {// 验证规则，可以在此处增加验证规则
            /**
             * @memberof VTYPE
             * @description 是否是必输项
             * */
            required: {
                validator: function (val) {
                    return (val && val.length) > 0;
                },
                msg: language.validator_required,
                info: ''
            },
            /**
             * @memberof VTYPE
             * @description 是否是正整数
             * */
            num: {
                validator: function (val) {
                    return /^\d+$/.test(val);
                },
                msg: language.validator_number,
                info: language.info_number
            },
            /**
             * @memberof VTYPE
             * @description 数字，包括负数和浮点数
             * */
            numDN: {
                validator: function (val) {
                    return val - parseFloat(val) >= 0;
                },
                msg: language.validator_number,
                info:language.info_number
            },
            /**
             *
             *  @memberof VTYPE
             *  @description 数字，不包括浮点数
             *  */
            numD: {
                validator: function (val) {
                    return val - parseFloat(val) >= 0 && !/[.]/.test(parseFloat(val));
                },
                msg: language.validator_noAllowDecimals,
                info: language.info_number_allowD
            },
            /**
             * @memberof VTYPE
             * @description 数字，不包括负数
             * */
            numN: {
                validator: function (val) {
                    return  val - parseFloat(val) >= 0 && !/[-]/.test(val)
                },
                msg:  language.validator_noAllowNegative,
                info: language.info_number_allowN
            },
            /**
             * @memberof VTYPE
             * @description 定义不允许输入的特殊字符
             * */
            unusechars: {
                validator: function (val, comp) {
                    var i = val.length;
                    while (val[--i]) {
                        if (!!~comp.indexOf(val[i])) {
                            return false;
                        }
                    }
                    return true;
                },
                msg: language.validator_common,
                info: language.validator_common
            },
            /**
             * @memberof VTYPE
             * @description 定义输入的最大值，一般适用于整数类型
             * */
            maxValue: {
                validator: function (val, comp) {
                    return parseInt(val, 10) <= parseInt(comp, 10);
                },
                msg: language.validator_maxValue,
                info: language.info_number_max
            },
            /**
             * @memberof VTYPE
             * @description 定义输入的最小值，一般适用于整数类型
             * */
            minValue: {
                validator: function (val, comp) {
                    return val >= comp
                },
                msg: language.validator_minValue,
                info: language.info_number_min
            },
            /**
             * @memberof VTYPE
             * @description 定义输入的最长字符数，以一个英文字节为标准，用户可以配置一个中文占多少个字符
             * */
            maxLength: {
                validator: function (val, len) {
                    var ipt = document.createElement('input');
                    if ('maxLength' in ipt) {
                        return true;
                    }
                    return val.length <= len;
                },
                msg: language.validator_maxLength,
                info: language.validator_maxLength
            },
            /**
             * @memberof VTYPE
             * @description 定义输入的最短字符数
             * */
            minLength: {
                validator: function (val, len) {
                    return val.length >= len
                },
                msg: language.validator_minLength,
                info:language.validator_minLength
            },
            /**
             * @memberof VTYPE
             * @description 邮件的验证规则
             * */
            email: {
                validator: function (val) {
                    //var isTrim = this.attr('auto-trim') !== 'false';
                    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val);
                },
                msg: language.validator_email,
                info: language.info_email
            },
            /**
             * @memberof VTYPE
             * @description 手机号码的验证规则
             * */
            mobile: {
                validator: function (val) {
                    return /^[1][1-9][0-9]{9}$/.test(val);
                },
                msg: language.validator_mobile,
                info: language.info_mobile
            },
            /**
             * @memberof VTYPE
             * @description 电话号码的验证规则
             * */
            tel: {
                validator: function (val) {
                    var validateRegs = [/^[0][1-9][0-9]{1,2}-[1-9]{1}[0-9]{6,8}$/, /^[0][1-9][0-9]{1,2}-[1-9]{1}[0-9]{6,8}-[0-9]{2,4}$/, /^(?:(?:400[6-8]{1})-(?:\d{3})-(?:\d{3}))$/, /^(?:(?:400)-(?:\d{4})-(?:\d{3}))$/, /^(?:(?:400)-(?:\d{3})-(?:\d{4}))$/, /^[1-9]{1}[0-9]{6,8}$/, /^(?:(?:400)(?:\d{3})(?:\d{4}))$/]
                    if (val == null) {
                        return true;
                    }
                    val = $.trim(val);
                    for (var i = 0; i < validateRegs.length; i++) {
                        var r = validateRegs[i].test(val);
                        if (r) {
                            return r;
                        }
                    }
                    return false;
                },
                msg: language.validator_tel,
                info: language.info_tel
            },
            atel: {
                validator: function (val) {
                    if (val == null) {
                        return true;
                    }
                    val = $.trim(val);
                    return /^(?:1[3,5,8,7]{1}[\d]{9})|(?:(?:(?:400)-(?:\d{3})-(?:\d{4}))|^(?:(?:\d{7,8})|(?:\d{4}|\d{3})-(?:\d{7,8})|(?:\d{4}|\d{3})-(?:\d{3,7,8})-(?:\d{4}|\d{3}|\d{2}|\d{1})|(?:\d{7,8})-(?:\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(val);
                },
                msg: '',
                info: language.info_tel
            },
            /**
             * @memberof VTYPE
             * @description IP地址的验证规则
             * */
            ip: {
                validator: function (val) {
                    return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test(val);
                },
                msg: language.validator_ip,
                info: language.info_ip
            },
            /**
             * @memberof VTYPE
             * @description mac地址的验证规则
             * */
            mac: {
                validator: function (val) {
                    var c = '';
                    var sep = ':';
                    var i = 0, j = 0;
                    sep = val.indexOf("-") > -1 ? "-" : sep;
                    if (val.indexOf(sep) < 0 || (val.toLowerCase() == 'ff' + sep + 'ff' + sep + 'ff' + sep + 'ff' + sep + 'ff' + sep + 'ff') || (val.toLowerCase() == '00' + sep + '00' + sep + '00' + sep + '00' + sep + '00' + sep + '00')) {
                        return false;
                    }
                    var addrParts = val.split(sep);
                    if (addrParts.length != 6) {
                        return false;
                    }
                    for (i = 0; i < 6; i++) {
                        if (addrParts[i] == '') {
                            return false;
                        }
                        if (addrParts[i].length != 2) {
                            return false;
                        }
                        for (j = 0; j < addrParts[i].length; j++) {
                            c = addrParts[i].toLowerCase().charAt(j);
                            if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f')) {
                                continue;
                            } else {
                                return false;
                            }
                        }
                    }
                    if ((parseInt(addrParts[0], 16) % 2) == 1) {
                        return false;
                    }

                    return true;
                },
                msg: language.validator_mac,
                info: language.info_ip
            },
            /**
             * @memberof VTYPE
             * @description 正则表达式的验证规则
             * */
            regex: {
                validator: function (val,param) {
                    var regExp = this.attr('regex');
                    return new RegExp(param).test(val);
                },
                msg: '',
                info: ''
            },
            /**
             * @memberof VTYPE
             * @description 定义ajax验证的规则
             * */
            ajax: {
                validator: function (val, param, element, startRequest, stopRequest) {
                    var thiz = this;
                    if (typeof startRequest == "function") {
                        startRequest.call(thiz, element);
                    }
                    $.ajax({
                        url: param,
                        data: val,
                        dataType: 'json',
                        success: function (response) {
                            if (!response.success) {
                                thiz.showValidate(element, response.msg);
                                return response.msg;
                            }
                            return true;
                        },
                        error: function () {
                            return false;
                        },
                        complete: function (response) {
                            var result = $.parseJSON(response.responseText), msg = result.msg;
                            if (typeof stopRequest == "function") {
                                stopRequest.call(thiz, element, response.msg);
                            }
                        }
                    });
                    return 'ajax';
                },
                msg: '',
                info: ''
            }
        };
	$.vtype = VTYPE;

    var tips = (function () {
        function getTargetAttr(target) {
            var pos = target.position();
            return {
                width: target.outerWidth(),
                height: target.outerHeight(),
                left: pos.left,
                top: pos.top
            }
        }
        // 显示类型
        var showType = {
            tip: function (elem, data) {
                var target = data.target;
                var tarPos = getTargetAttr(target),
                    pos = data.position || 'topLeft',
                    width = elem.outerWidth(),
                    height = elem.outerHeight(),
                    left, top;

                switch (pos) {
                    case 'topLeft':
                    default :
                        left = tarPos.left;
                        top = tarPos.top - height - 3;
                        elem.css('max-width', tarPos.width);
                        break;
                }
                elem.addClass(data.type)
                    .css({
                        left: left,
                        top: top,
                        position: 'absolute'
                    }).show()
            }
        };
        return {
            show: function (elem) {
                var data = elem.data('tips'),
                    type = data.type;
                showType[type](elem, data);
            }
        }
    }());


    $.fn.rules = function(){
        var rules = this.data('rules'),
            elem, settings, setRules = {},name;
        if (rules) {
            return rules;
        } else {
            elem = this.get(0);
            name = elem.name;
            var instance =  $.data(elem.form ? elem.form : this.closest('form'), 'valid') ? $.data(elem.form ? elem.form : this.closest('form'), 'valid') : $.data(elem, 'valid');
            if(instance)
                setRules =instance.settings.rules[name];
            rules = {};
            var val = this.val(),required = this[0].getAttribute('required'),oldVtype = this.attr('vtype') ? this.attr('vtype').split(',') : [];
            if (required == "required" || required == "true" || required == true) {
                oldVtype.push('required');
            }

            if( this.attr('vtype') && /number/gi.test(this.attr('vtype'))){
                if(!this.attr('allowDecimals') != 'true' && !this.attr('allowNegative') != 'true'){
                    oldVtype.push('numDN');
                }else if(!this.attr('allowDecimals') != 'true' && this.attr('allowNegative') != 'true'){
                    oldVtype.push('numN');
                }else if(this.attr('allowDecimals') != 'true' && !this.attr('allowNegative') != 'true'){
                    oldVtype.push('numD');
                }else{
                    oldVtype.push('num');
                }
            }

            if(this.attr('minValue')){
                oldVtype.push('minValue');
            }

            if(this.attr('maxValue')){
                oldVtype.push('maxValue');
            }

            if(this.attr('minLength') || this.attr('min-length')){
                oldVtype.push('minLength');
            }

            if(this.attr('maxLength') || this.attr('max-length')){
                oldVtype.push('maxLength');
            }
            var unUseChars = getUnUseChars(this[0]);
            if (unUseChars != null) {
                oldVtype.push('unusechars');
            }

            this.attr('vtype', oldVtype.join(','));
            $.extend(true, rules, setRules, $.valid.getElementRules(this));
            this.data('rules', rules);
            return rules;
        }
    }

    $.valid = {
        defaults: {
            errorClass: 'error',
            validClass: 'valid',
            successClass : 'success',
            infoClass: 'info',
            errorElement: 'label',
            infoElement: 'label',
            successElement: 'label',
            iskeyup: false,
            bindSubmit: true,
            errorContainer: $([]),
            isinfo: true,
            validateTag: 'input, textarea, select',
            notvalidateTag: '.notvalidate,[type=submit]',
            rules: {},
            message: {},
            focusClean: true,

            onfocusin: function (element, event) {
                var setts = this.settings,isTip = element.attr('tips') || element.attr('isoverflown');

                if (setts.focusClean) {
                    setts.unhighlight(element, setts.errorClass, setts.validClass);
                }

                if (setts.isinfo) {
                    var info = this.getInfo(element);
                    var label = this.createLabel(element, info, 'info');
                    this.showInfo(element,isTip);
                }
            },

            onfocusout: function (element, event) {
                this.execute(element);
            },

            onkeyup: function (element, event) {
                var setts = this.settings;
                if (setts.iskeyup) {
                    this.element(element, event);
                }
            },

            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
            },

            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            }
        },
        parseStr: function () {
            var str = (typeof arguments[0] == 'function') ? arguments[0]() : arguments[0] ,
                arg = Array.prototype.slice.call(arguments, 1);

            return str.replace(/{(\d+)}/g, function (m, i) {
                return arg[i];
            });
        },
        getElementRules: function (element) {
            var rules = {},
                mthods = $.valid.method,
                vtype = element.attr('vtype'),
                len = 0,
                val;

            if(vtype){
                vtype = vtype.split(',');
                len = vtype.length;
            }
            for (var i=0; i < len; i++) {
                if (vtype[i] in mthods) {
                    rules[vtype[i]] = element.attr(vtype[i]) || true;
                }
            }
            return rules;
        },
        method: $.extend(true, {}, $.vtype || {}, {
        })
    };

	function validate(options,element) {// 验证的处理函数
        this.settings = $.extend(true, {}, $.valid.defaults, options);
        this.content = element;
        this.init();
        return this;
	}

    validate.prototype = {
        init: function () {
            var that = this,
                content = this.content;
            this.errorContext = $(this.content);
            this.pending = {};
            this.pendingRequest = 0;
            this.reset();

            var delegate = function (event) {
                var eventType = 'on' + event.type,
                    valid = that;

                if (valid.settings[eventType]) {
                    valid.settings[eventType].call(valid, this, event)
                }
            };

            var handler = function (event, callback) {
                var valid = that,
                    ret = true;
                if (valid.execute()) {
                    if (valid.pendingRequest !== 0) {
                        ret = false;
                    }
                } else {
                    ret = false;
                }
                callback && callback(ret);
            };
            this.validDelegate(this.settings.validateTag, 'focusin focusout', delegate);
            this.content.bind('validate.valid', function (event, callback, issubmit) {
                that.formSubmited = issubmit ? true : false;
                handler(event, callback);
            });

            if (this.settings.bindSubmit) {
                this.content.bind('submit.valid', function (event) {
                    var elem = $(this),
                        ret;
                    event.preventDefault()
                    elem.trigger('validate.valid', [
                        function (check) {
                            ret = check
                        },
                        true
                    ]);
                    return ret;
                });
            }
        },

        reset: function () {
            this.errorList = [];
            this.errorMap = {};
            this.currentElements = $([]);
        },

        validDelegate: function (delegate, type, handle) {
            var that = this;
            return this.content.bind(type, function (event) {

                var target = $(event.target);
                if (!target.is(that.settings.notvalidateTag)  && target.is(delegate)) {
                    handle.call(target, event)
                }
            })
        },
        getLabel: function (element, type) {
            //FIXME  这段代码为了配合以前的逻辑，耦合性较高，需要改进
            var controlsEl = element.parent('.controls');
            if (controlsEl.length == 0) {
                return element.parent().siblings('#tooltip.'+type);
            }
            return element.siblings('#tooltip.'+type);

        },

        check: function (element) {
            var rules = element.rules(),
                value = this.getValue(element),
                result;
            if (value || ('required' in rules)) {
                for (var key in rules) {
                    var rule = {
                        method: key,
                        param: rules[key]
                    };

                    try {
                        result = $.valid.method[key].validator.call(this, value, rules[key], element, this.startRequest, this.stopRequest);
                        if (result == 'ajax') {
                            return true;
                        }
                        if (result != true && result != 'true') {
                            this.formatErrorResult(element, rule, result);
                            return false;
                        } else {
                            this.formatSuccessResult(element);
                        }
                    } catch (e) {
                        return false;
                    }
                }
            } else{
                this.formatSuccessResult(element);
            }
            return true;
        },

        getValue: function (element) {
            var type = $(element).attr('type'),
                val = $(element).val();

            if (type == 'radio' || type == 'checkbox') {
                return $('input[name="' + element[0].name + '"]:checked', this.content).val()
            }
            return val;
        },

        /**
         * 获取info或error时的HMTL元素
         * 增加vdata的属性
         */
        createLabel: function (element, message, type) {
            var settings = this.settings,
                classes = type + 'Class',
                elem = type + 'Element',
                label = this.getLabel(element,type),
                vdata, icon;

            if (!label.length) {
                label = $('<div id="tooltip" style="display:inline-block;*display:inline;"></div>');
            }
                var controlsEl = element.closest('.controls');
                if (controlsEl.length == 0) {
                    controlsEl = element.parent().parent();
                }
                label.appendTo( controlsEl );
                label.html('<span class="ico i-del" style="display:none;"></span><' + settings[elem] + ' for="' + element[0].name + '" class='+settings[classes]+'>');
                icon = element.attr('vicon');
                vdata = {
                    type: type,
                    target: element,
                    icon: icon
                };
                label.addClass(settings[classes]).data('vdata', vdata);
                label.find(settings[elem]).addClass(settings[classes]).html((icon ? '' : message) + '<i class="arrow ' + (icon ? 'ico i-del' : '') + '"><b></b></i>');

                if((element.attr('data-icon') || element.attr('onlystate')) && type !== 'info'){
                    label.find(settings[elem]).css('display','none');
                    if(type == 'success'){
                        label.find('span.ico')[0].className = "ico i-ok";
                        label.find('span.ico').css('display','inline-block');
                    }else{
                        label.find('span.ico')[0].className = "ico i-del";
                        label.find('span.ico').css('display','inline-block');
                    }

                }

            return label
        },

        elementShow: function (element) {
            var that = this;
            element.each(function () {
                var elem = $(this);

                var vdata = elem.data('vdata') || {};
                var tipdata = that.getPos(elem);
                if (!tipdata.type) {
                    elem.show();
                } else {
                    tips.show(elem);
                }
            })
        },

        getPos: function (element) {
            var tips = element.data('tips'),
                vdata = element.data('vdata'),
                elem = vdata.target;

            if (!tips) {
                tips = {
                    type: elem.attr('isoverflown') ? 'tip' : elem.attr('tips') ,
                    position: elem.attr('tips-pos') || elem.attr('promptposition'),
                    target: vdata.target
                };
                element.data('tips', tips)
                if (vdata.type == 'error' && vdata.icon) {
                    delete tips.type
                }
            }
            return tips
        },
        /**
         * @description 获取用户的错误信息1.后台返回。2.用户自定义整体。3.单个验证失败的信息
         * @param element
         * @param rule
         * @param msg
         */
        formatErrorResult: function (element, rule, msg) {
            var name = element[0].name,
                message = (msg != false) ? msg : this.getMessage(element, rule.method),isExist = false;

            message = $.valid.parseStr(message, rule.param);

            for(var i= 0,len = this.errorList.length;i++;i<len){
                if(element === this.errorList[i]['element'] || name == this.errorList[i]['element'][0].name) {
                    isExist = true;
                    this.errorList[i]['message'] = message;
                    this.errorMap[i][name] = message;
                    break;
                }
            }
            if(!isExist){
                this.errorList.push({
                    message: message,
                    element: element
                });
                this.errorMap[name] = message;
            }
        },

        formatSuccessResult : function(element){
            var name = element[0].name,isExist=false;

            for(var j= 0,lenj= this.errorList.length; j < lenj;j++){
                if(element === this.errorList[j]['element'] || name == this.errorList[j]['element'][0].name) {
                    this.errorList.splice(j,1);
                    delete this.errorMap[name];
                    return;
                }
            }
        },

        domElement: function (element) {
            return $(element)[0]
        },

        getMessage: function (element, key) {
            var message = this.settings.message,
                name = element[0].name,
                dataMessage = element.attr('vm'+key);

            return dataMessage || (message[name] && message[name][key]) || $.valid.method[key].msg;
        },

        getInfo: function (element) {
            var info = element.data('vinfo') || element.attr('vinfo'),
                rules, method, i;

            if (!info) {
                info = [];
                rules = element.rules();
                method = $.valid.method;
                for (i in rules) {
                    if (i !== 'required') {
                        info.push($.valid.parseStr(method[i].info, rules[i]))
                    }
                }
                element.data('vinfo', info.join(','));
            }
            return info;
        },

        execute: function (element) {
            var i, length,flag=true,vElement,vFlag = true;
            vElement = element || this.content.find(this.settings.validateTag).not(this.settings.notvalidateTag);
            for (i = 0, length = vElement.length; i < length; i++) {
                this.currentElements = vElement.eq(i);
                if(this.currentElements[0].type == 'hidden')
                    flag = true;
                else
                    flag = this.check(this.currentElements);
                this.showValidate(this.currentElements,flag);
                if(!flag){
                    vFlag = false;
                }
            }
            return vFlag; //这里不用this.errorList来判断是因为页面存在一些隐藏的div
        },
        /**
         * @lends $.fn.ajaxForm
         * @method
         * 显示验证信息
         * */
        showValidate : function(element,result){
            var settings = this.settings,
                i, length,name = element[0].name,isTip = element.attr('tips') || element.attr('isoverflown');

            if(result== true || result == 'true'){ //验证通过
                if(element.attr('data-icon') || element.attr('onlystate')){
                    this.createLabel.call(this, element, '', 'success');
                }
                this.showSuccess(element, isTip);

            }else{ //验证失败
                if (settings.highlight) {
                    settings.highlight(element, settings.errorClass, settings.validClass);
                }
                this.createLabel.call(this, element, (result != false && result != 'false') ? result : this.errorMap[name], 'error');
                this.showError(element,isTip);
            }

        },
        showError : function(element, isTip){
            this.getLabel(element,'info').hide();
            this.getLabel(element,'success').hide();
            //this.getLabel(element,'error').show();
            var showElement =  this.getLabel(element,'error');
            if(isTip && !element.attr('data-icon') && !element.attr('onlystate')){
                var tipdata = this.getPos(showElement);
                if (!tipdata.type) {
                    showElement.show();
                } else {
                    tips.show(showElement);
                }
            }else{
                showElement.show();
            }
        },
        /**
         * @lends $.fn.ajaxForm
         * @method
         * 显示提示信息
         * */
        showInfo : function(element,isTip){
            this.getLabel(element, 'error').hide() ;
            this.getLabel(element,'success').hide();
            var showElement = this.getLabel(element,'info');
            if(isTip){
                var tipdata = this.getPos(showElement);
                if (!tipdata.type) {
                    showElement.show();
                } else {
                    tips.show(showElement);
                }
            }else{
                showElement.show();
            }
        },
        showSuccess : function(element,isTip){
            this.getLabel(element,'error').hide();
            this.getLabel(element,'info').hide();
            var showElement = this.getLabel(element,'success');
            showElement.show();
        },
        isEmpty: function (obj) {
            for (var prop in obj) {
                if(obj.hasOwnProperty(prop)){
                    return false;
                }
            }
            return true;
        },
        startRequest: function (element) {
            if (!this.pending[element[0].name]) {
                this.pending[element[0].name] = true;
                this.pendingRequest++;
            }
        },

        focusInvalid: function () {
            this.errorList[0].element.focus();
        },

        stopRequest: function (element, valid) {
            this.pendingRequest--;
            if (this.pendingRequest < 0) {
                this.pendingRequest = 0;
            }
            delete this.pending[element.name];

            if (valid && (this.pendingRequest == 0) && this.formSubmited && this.execute()) {
                this.content.submit();
                this.formSubmited = false;
            } else {
                this.currentElements.triggerHandler('evInvalid', [this]);
            }
        }
    }

	$.fn.validate = function(options) {// 验证
        var fn,valid = $.data(this[0], 'valid');
        if (valid) {
            if(typeof options == 'string'){
                fn = valid[options];
                if(!fn){
                    throw new Error('Valid has no Function: ' + options);
                }else{
                    fn.call(valid,this);
                }
            }
            return this;
        }
        this.data('valid', new validate(options, this));
        return this;
	};

    $.fn.showInfo = function(msg){
         var valid = $.data(this[0], 'valid'),showElement;
        if(!valid){
            valid = new validate({},this);
            this.data('valid',valid);
        }
        showElement = valid['getLabel'](this,'info') ;
        showElement.find('label').text(msg);
        return;

    }

    $.fn.clearValidate = function(){

    }

    $.fn.showValidate = function(msg){
        var valid = $.data(this[0], 'valid'),showElement;
        if(!valid){
            valid = new validate({},this);
            this.data('valid',valid);
        }
        showElement = valid['getLabel'](this,'error') ;
        if(!showElement.length){
            valid['showValidate'](this,msg);
        }else
            showElement.find('label').text(msg);
        return;
    }

    $.extend($.validate ,{
        /**
         * @lends $.fn.ajaxForm
         * @method
         * 清除验证信息
         * */
        clearValidate : function(element){
            if(typeof element == 'string')
                element = $(element);
            var cElement = element.find(this.settings.validateTag).not(this.settings.notvalidateTag), i,len;
            for(i=0,len = cElement.length; i < len;i++ ){
                this.getLabel(cElement.eq(i),'error').hide();
                this.getLabel(cElement.eq(i),'success').hide();
                cElement.eq(i).removeClass('error');
            }
        }
    });


    /**
     * @class ajaxForm
     * @name ajaxForm
     * @description 用户表单提交统一处理的方法
     * @example
     *
     * $('.form').ajaxForm([optional] opt);
     *  opt的参数列表参见下面的参数配置
     *
     *  对ajax结果的处理可以做事件监听，见如下示例
     *  $('.form').bind('success|error|complete',function(){})
     *
     *  表单验证失败会触发error和complete事件。
     *
     * */
    $.fn.ajaxForm = function (options) {
        var subForm = $.data(this[0], 'subForm');

        if (subForm) {
            return this;
        }
        this.data('subForm', new ajaxForm(options, this));
        return this;
    };

    $.ajaxForm = {
        /**
         * @lends ajaxForm
         * @property {boolean} validate 是否需要验证，默认true
         * @property {boolean} ajaxSubmit 是否需要提交
         * @property {object} ajaxopts 配置ajax的参数
         */
        defaults: {
            validate: true,
            ajaxSubmit: true,
            ajaxopts: {
                type: 'POST',
                dataType: 'json'
            }
        }
    };


    function ajaxForm(options, content) {
        this.content = content;
        this.settings = $.extend(true, {}, $.ajaxForm.defaults, options);
        if (this.content.is('form')) {
            this.form = this.content;
        } else {
            this.form = this.content.closet('form');
        }
        this.init();
    }

    ajaxForm.prototype = {
        /**@ignore*/
        bindSubmit: function () {
            var that = this,
                settings = this.settings;

            this.form.bind('submit.ajaxForm', function (event) {
                var fn = function(){
                    var ret;
                    if (that.form.data('ajaxsubmiting') != true) {
                        if (that.form.trigger('beforeSubmit', that.form) !== false) {
                            if (settings.validate) {
                                that.form.trigger('validate.valid', [
                                    function (val) {
                                        ret = val
                                    },
                                    true
                                ]);
                                if (ret) {
                                    that.subform();
                                    return false;
                                }else{
                                    that.form.trigger('error').trigger('complete');
                                    if(typeof(jSticky) === 'function'){
                                        jSticky('表单存在错误，请查看！', {
                                            type : "error"
                                        });
                                    }
                                    return false;
                                }

                            } else {
                                return that.subform();

                            }
                        }
                    }
                    return false
                }
                //这样做的目的，是为了让用户的绑定优先执行
                setTimeout(function () {
                    fn();
                    that.form.unbind('.ajaxForm')
                        .bind('submit.ajaxForm', fn);

                },0);
                return false;
            });
        },
        /**@ignore*/
        subform: function () {
            var that = this,
                isajax = this.settings.ajaxSubmit == true,
                ajaxopt = this.settings.ajaxopts, now = $.now(), success, error;

            if (isajax) {
                this.form.data('ajaxsubmiting', true);

                success = ajaxopt.success ? ajaxopt.success : function () {};
                error = ajaxopt.error ? ajaxopt.error : function () {};
                ajaxopt = $.extend({}, this.settings.ajaxopts, {
                    url: this.form.attr('action'),
                    type: this.form.attr('method'),
                    data: this.form.data('form-data') || {},
                    success: function (data) {
                        that.form.removeData('ajaxsubmiting');
                        that.form.data('_doNext', 'on');
                        if (data == null) {
                            that.form.removeData('_doNext');
                            return;
                        }
                        if (data.fieldErrors || data.actionErrors) {
                            for ( var name in data.fieldErrors) {
                                var fieldEl = that.form.find('[name="' + name + '"]');
                                fieldEl.length && fieldEl.showValidate(data.fieldErrors[name][0]);
                            }
                            if (!data.actionErrors || !data.actionErrors.length) {
                                jSticky(language.form_error, {
                                    type : "error"
                                });
                            } else {
                                if(that.form.attr('no-actionError')!=='true'){
                                    for ( var index = 0; index < data.actionErrors.length; index++) {
                                        jSticky(data.actionErrors[index], {
                                            type : "error"
                                        });
                                    }
                                }
                            }
                            that.form.trigger('error', data, data.fieldErrors, data.actionErrors);
                        } else {
                            that.form.trigger('success', data);
                            if (that.form.attr('next')) {
                                var nextMethod = that.form.attr('next-method');
                                if (nextMethod === 'get') {
                                    location.href = that.form.attr('next');
                                } else {
                                    that.form.attr('action', that.form.attr('next'));
                                    that.form[0].submit();
                                }
                            }
                        }
                        that.form.removeData('_doNext');
                        success.call(that.form, data, that.form);
                    },
                    error: function (data) {
                        that.form.removeData('ajaxsubmiting');
                        that.form.data('_doNext', 'on');
                        that.form.trigger('error', {}, {}, {});
                        that.form.removeData('_doNext');
                        error.call(that.form, data, that.form)
                    },
                    complete : function(){
                        that.form.trigger('complete');
                    }
                });

                ajaxopt.url += (!~ajaxopt.url.indexOf('?') ? '?' : '&') + '_time=' + now;
                this.form.ajaxSubmit(ajaxopt);
                return false;
            }
            return true;
        },
        /**@ignore*/
        init: function () {
            var that = this,
                validate;

            this.btnSub = this.form.find('[type="submit"]');
            this.btnSub.bind('click', function () {
                var elem = $(this);
                /**
                 * 当btnSub为以下两种情况时停止提交
                 */
                if (elem.data('disable') == 'disable' || elem.attr('disable') == 'disable') {
                    return false;
                } else {
                    that.form.submit();
                    return false;
                }
            });
            if (validate = this.settings.validate) {
                if (!$.isPlainObject(validate)) {
                    validate = {}
                }
                validate.bindSubmit = false;
                this.form.validate(validate, this.form);
            }
            this.bindSubmit();
        }
    };

	function getUnUseChars(target) {// 特殊字符处理
		var unUseChars = target.getAttribute('unUseChars');
		if (unUseChars != null)
			return unUseChars;
		if (target.getAttribute('vtype') == null || target.getAttribute('vtype').indexOf('common') < 0)
			return null;
		var excludeChars = target.getAttribute('excludeChars'), includeChars = target.getAttribute('includeChars');
		unUseChars = ASCII_UN_USE;
		if (includeChars != null) {
			for ( var index = 0; index < includeChars.length; index++) {
				var includeChar = includeChars.charAt(index);
				unUseChars = unUseChars.indexOf(includeChar) > -1 ? unUseChars : unUseChars + includeChar;
			}
		}
		if (excludeChars != null) {
			for ( var index = 0; index < excludeChars.length; index++) {
				unUseChars = unUseChars.replace(excludeChars.charAt(index), '');
			}
		}
		target.setAttribute('unUseChars', unUseChars);
		return unUseChars;
	}
	$('textarea[maxLength],[max-length]').live({
		keydown : function(event) {
			if (7 < event.keyCode && event.keyCode < 47 && event.keyCode != 32) {
				return;
			}
			var maxLength = this.getAttribute('maxLength') || this.getAttribute('max-length');
			if (!$.isNumeric(maxLength)) {
				return;
			}
			var length = $.trim(this.value).length;
			maxLength = parseInt(maxLength);

			if ($.browser.msie) {
				var sel = document.selection.createRange();
				var slength = sel.text.length;
				if (slength > 0) {
					return true;
				}
			} else {
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				if (endPos > startPos) {
					return true;
				}
			}
			if (length >= maxLength) {
				return false;
			}
		}
	});

	$('[vtype*=number]').live({// 数字验证
		keypress : function(event) {
			if (this.getAttribute('allowNegative') == 'true') {
				if (event.keyCode == 45)
					return true;
			}
			if (this.getAttribute('allowDecimals') == 'true') {
				if (event.keyCode == 46)
					return true;
			}
            var code = (event.keyCode ? event.keyCode : event.which);  //兼容火狐 IE
            if(!$.browser.msie&&(event.keyCode==0x8))  //火狐下不能使用退格键
            {
                return ;
            }
            return code >= 48 && code<= 57;
		},
        blur : function() {
            var val = this.value;
			val = val.replace(/\.$/, '');
			var pattern = /^\d+(\.\d*)?$/;
			this.value = pattern.test(val) ? val : '';
        },
        paste : function() {
            if (window.clipboardData) {
                var s = window.clipboardData.getData('text');
                if (!/\D/.test(s));
                this.value = s.replace(/^0*/, '');
            }
            return false;
        },
        dragenter : function() {
            return false;
        },
        keyup : function() {
            if (/(^0+)/.test(this.value) && this.value.length > 1) {
                if ($(this).attr('filterZero') != 'true') {
                    this.value = this.value.replace(/^0*/, '');
                }
                $(this).trigger('change');
                $(this).trigger('focusin');
            }
        }
	}).css("ime-mode", "disabled");

	$('[vtype*=common]').live({// 特殊字符处理
		keydown : function() {
			getUnUseChars(this);
		},
		keypress : function(event) {// excludeChars includeChars
			// unUseChars
			if (this.getAttribute('unUseChars').indexOf(String.fromCharCode(event.keyCode)) > -1) {
				return false;
			}
			return true;
		}
	});
	$(function() {		
		$('textarea[maxLength],[max-length]').bind('paste',function(){
			if (window.clipboardData) {
        	var s = getClipboardData();
        	var maxLength = this.getAttribute('maxLength') || this.getAttribute('max-length');
			if (!$.isNumeric(maxLength)) {
				return false;
			}
			var lengthMap = getLength($(this), this.value);
			var sLength = document.selection.createRange().text.length;
            if(lengthMap.length - sLength + s.length > maxLength){
				window.clipboardData.setData('Text',s.substring(0,maxLength -(lengthMap.length - sLength) ))
			}            
        	}
		});
		$('body').bind('paste', function(e) {
			var target = e.target;
			if (target.getAttribute('hikui') == 'calendar') {
				return false;
			}
			var vtype = target.getAttribute('vtype');
			var type = target.getAttribute('type');
			var nvp = target.getAttribute('not-validator-paste');

			if (type != 'text' || !vtype || vtype.indexOf('common') < 0 || nvp == true) {
				return;
			}
			getUnUseChars(target);
			var clipboardData = getClipboardData();
			var unUseChars = target.getAttribute('unUseChars');
			for ( var i = 0; i < clipboardData.length; i++) {
				var tempChar = clipboardData.charAt(i);
				if (unUseChars.indexOf(tempChar) > -1) {
					$.sticky(language.text('validator.paste') + unUseChars + language.text('validator.invalid'), {
						type : 'attention'
					});
					return false;
				}
			}
			return true;

		});
		// 目前只考虑了IE
		function getClipboardData() {
			if (window.clipboardData) {
				return window.clipboardData.getData("Text");
			} else {
				return "";
			}
		}
	});
	$(function() {
		$('form[history="true"]').delegate('input[type="text"][not-use-char-code!=true]', {
			'keypress' : function(event) {
				if (ASCII_UN_USE.indexOf(String.fromCharCode(event.keyCode)) > -1) {
					return false;
				}
				return true;
			}
		});

        $('.form-input').not('.noajaxForm').each(function () {
            $(this).ajaxForm()
        })
	});

})(jQuery);
