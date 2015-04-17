/**
 * @fileOverview 弹出框控件
 * @description
 * 弹出框控件，基于jquery-ui的核心
 */
(function () {
    $._fixIframe = function (elem) {
        var iframe = $("<iframe style='position:absolute;z-index:-1;filter:alpha(opacity=0);' frameborder='no' border='0'></iframe>");
        iframe.css({
            width: elem.outerWidth(),
            height: elem.outerHeight(),
            top: 0,
            left: 0
        }).appendTo(elem);
    };

    $.widget("hk.pop", {
        options: {
            popClass: 'pop',
            // 遮罩层设置
            modal: true,
            overlayTrans: .5,
            overlayClass: 'overlay',
            // 内容层设置
            wrap: null,
            content: null,
            leaveClose: false,
            position: {
                my : "center",
                at : "center",
                of : window,
                collision : "fit",
                // ensure that the titlebar is never outside the document
                using : function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css("top", pos.top - topOffset);
                    }
                }
            },
            closeDestroy: false,
            leaveclose: false,
            leavecloseTM: 200,
            reserve: true,
            width: 500,
            height: 'auto',
            minHeight : 150,
            iframeFix: false,
            show: 'fade', // 显示效果兼容ui effects API
            zIndex: 1000,
            autoOpen: true,
            draggable: false,
            dragHandle: '.popTitle'
        },
        _create: function () {
            this.initPopup();
        },

        initPopup: function () {
            var opts = this.options,
                that = this,
                elem = this.element,
                wrap, content;

            this.wrap = wrap = (this.wrap || $('<div>'))
                .appendTo('body')
                .addClass(opts.popClass)
                .addClass(opts.type)
                .css({
                    'position': 'absolute',
                    'display': 'none',
                    'zIndex': opts.zIndex
                });
            this.content = content = (this.content || wrap).append(elem.show());

            // TODU: width设在最外层, height设在内层是否合理
            this.wrap.css({width: opts.width});
            this.wrap.css({height: opts.height});

            if (opts.draggable && $.fn.draggable) {
                this.drag();
            }

            if (opts.iframeFix) {
                $._fixIframe(this.wrap);
            }
            this.bindEvent();
            this._isOpen = false;
            if (!this.element.data('pop')) {
                this.element.data('pop', this.element.data(this.widgetName));
            }
            // 对wrap层的事件绑定最好放在这里
            if (opts.autoOpen) {
                this.open()
            }
        },
        drag: function () {
            var that = this, options = this.options,containt;

            if($.isPlainObject(options.position)){
                containt =  options.position.of;
            }

            function filteredUi(ui) {
                return {
                    position : ui.position,
                    offset : ui.offset
                };
            }

            this.wrap.draggable({
                handle : this.options.dragHandle,
                iframeFix: this.options.iframeFix,
                containment : containt ? containt : 'document',
                start : function(event, ui) {
                    $(this).addClass("pop-dragging");
                    that._trigger("dragStart", event, filteredUi(ui));
                },
                drag : function(event, ui) {
                    that._trigger("drag", event, filteredUi(ui));
                },
                stop : function(event, ui) {
                    options.position = [ui.position.left - that.document.scrollLeft(),
                        ui.position.top - that.document.scrollTop()];
                    $(this).removeClass("pop-dragging");
                    that._trigger("dragStop", event, filteredUi(ui));
                }
            });

        },

        _position : function (position) {
            var obj = {
                of : window,
                collision : this.options.positionCollision
            };

            if ($.isPlainObject(position)) {
                position = $.extend(obj, position);
            } else if ($.isArray(position)) {
                if (typeof(position[0]) == 'string' && typeof(position[1]) == 'string') {
                    position = position.join(' ');
                    position = $.extend(obj, {
                        my : position,
                        at : position
                    });
                } else if (position[0].constructor == Number && position[1].constructor == Number) {
                    position = $.extend(obj, {
                        of : document,
                        my : 'left top',
                        at : 'left top',
                        offset : position[0] + ' ' + position[1]
                    });
                } else {
                    position = ['center', 'center'];
                }
            }else if(typeof position === 'string'){
                if(/-/.test(position)){
                    var pos = position.split('-');
                    if(/top|bottom/.test(pos[0]) || /left|right/.test(pos[1]))
                        position = $.extend(obj,{my:pos[1] + ' ' + pos[0] ,at :pos[1] + ' ' + pos[0]});
                    else
                        position = $.extend(obj,{my:pos[0] + ' ' + pos[1] ,at :pos[0] + ' ' + pos[1]});
                }
            } else {
                position = ['center', 'center'];
            }

            if ($.isPlainObject(position)) {
                var isVisible = this.wrap.is(':visible');
                if (!isVisible) {
                    this.wrap.show();
                }
                this.wrap.css({
                    top : 0,
                    left : 0
                }).position(position);
                if (!isVisible) {
                    this.wrap.hide();
                }
            } else {
                //this._position(position);
            }
        },
        _close: function (event) {
            if (!this._isOpen) {
                return;
            }
            var opts = this.options, callback;
            if (this._trigger('beforeClose', event, this.wrap) === false) {
                return false;
            }
            if (this.modal) {
                $.overlay.destory(this.modal);
            }
            callback = $.isFunction(event) ? event : function () {};

            /*if ($.effects && ((isObj=$.isPlainObject(opts.show)) || typeof opts.show === 'string')) {
                if (isObj) {
                    this.wrap.hide(opts.show.effect||'fade', opts.show, opts.show.duration||500, callback)
                } else {
                    this.wrap.hide(opts.show, {}, 500, callback)
                }
            } else {
                this.wrap.hide();
                callback();
            }  */
            this.wrap.hide(opts.speed || '', callback);
             opts.afterclose &&  opts.afterclose();
            this._isOpen = false;
            this._trigger('close');
        },
        close: function () {
            if (this.options.closeDestroy) {
                return this.destory();
            }
            this._close();
        },
        destory: function () {
            var that = this, opts = this.options;
            this._close(function () {
                $.Widget.prototype.destroy.apply(that, arguments);
                if (opts.reserve) {
                    //FIXME 这样做会带来一个问题，iframe或者ajax每生成一次都会往body上append一层元素
                    //that.element.hide().appendTo('body');
                }
                that.wrap.remove();
            })
        },
        clearCloseTM: function () {
            clearTimeout(this.leaveTM);
            this.leaveTM = null;
        },
        open: function () {
            var opts = this.options,
                elem = this.element,
                that = this,
                isObj;
            if (this._isOpen) {
                return;
            }
            this.modal = opts.modal ? $.overlay.create(opts) : null;
            // 当鼠标移除后自动消失
            if (opts.autoclose) {
                this.wrap.one('mousemove.pop', function () {
                    that.clearCloseTM();
                    that.wrap.one('mouseleave.pop', function () {
                        that.leaveTM = setTimeout(function () {
                            that.close()
                        }, opts.autoclose);
                    })
                })
            }
            this._position(opts.position);
            this.show()

        },
        show : function(){
            var opts = this.options,
                that = this,
                callback,nonContentHeight,minContentHeight,autoHeight;

            this.element.show().css({
                width : "auto",
                minHeight : 0,
                height : 0
            });

            nonContentHeight = this.wrap.css({
                height : "auto",
                width : opts.width
            }).outerHeight();

            minContentHeight = Math.max(0, opts.minHeight - nonContentHeight);

            if (opts.height === "auto") {
                // only needed for IE6 support
                if ($.support.minHeight) {
                    this.element.css({
                        minHeight : minContentHeight,
                        height : "auto"
                    });
                } else {
                    this.wrap.show();
                    autoHeight = this.element.css("height", "auto").height();
                    //if (!isVisible) {
                    //    this.uiDialog.hide();
                    // }
                    this.element.height(Math.max(autoHeight, minContentHeight));
                }
            } else {
                this.element.height(Math.max(opts.height - nonContentHeight, 0));
            }

            callback = function () {
                that._isOpen = true;
                that._trigger('open', that.wrap, that);
            };

            //先加入ui的effects
            if ($.effects && ((isObj=$.isPlainObject(opts.show)) || typeof opts.show === 'string')) {
                if (isObj) {
                    this.wrap.show(opts.show.effect||'fade', opts.show, opts.show.duration||500, callback)
                } else {
                    this.wrap.show(opts.show, {}, 500, callback)
                }
            } else {
                this.wrap.show();
                callback();
            }
        },
        bindEvent: function () {
            var that = this, opts = this.options;
            this.wrap.on('click', '[close],[data-close]', function () {
                that.close();
                return false;
            });
        }
    });

    $.overlay = {
        instances : [],
        create : function (opts) {
            var that = this, elem;
            if (this.instances.length === 0) {
                $(window).bind('resize.overlay', function () {
                    that.resize()
                });
            }
            elem = $('<div></div>').appendTo('body').addClass(opts.overlayClass).css({
                opacity : opts.overlayTrans,
                width : that.width(),
                height : that.height(),
                zIndex: opts.zIndex - 1
            });

            if (opts.iframeFix) {
                $._fixIframe(elem);
            }
            this.instances.push(elem);
            return elem;
        },
        destory : function (elem) {
            this.instances.splice($.inArray(this.instances, elem), 1);
            if (this.instances.length === 0) {
                $(window).unbind('.overlay');
            }
            elem.remove();
        },
        height : function () {
            var d = document, b = d.body, e = d.documentElement;
            return Math.max( Math.max( b.scrollHeight, e.scrollHeight ), Math.max( b.clientHeight, e.clientHeight) )
        },
        width : function () {
            var d = document, b = d.body, e = d.documentElement;
            return Math.max( Math.max( b.scrollWidth, e.scrollWidth ), Math.max( b.clientWidth, e.clientWidth) )
        },
        resize : function () {
            var that = this;
            $.each(this.instances, function () {
                $(this).css({
                    width: 0,
                    height: 0
                }).css({
                        width : that.width(),
                        height : that.height()
                    });
            })
        }
    };


    $.widget("hk.popWin", $.hk.pop, {
        options : {
            popClass : 'popWin',
            modal: true,
            overlayTrans : .25,
            closeText : 'close',
            closeButton: true,
            title : '',
            draggable : false,
            // FIX: 这里的class要做修改
            buttonDefaultClass: 'buttonM bDefault',
            buttons: []
        },
        _create : function () {
            var opts = this.options,
                that = this,
                poptitle, popclose;

            if (!this.wrap) {
                this.createHTML();
            }
            // 创建button
            if (($.isArray(opts.buttons) && opts.buttons.length>0) || (typeof opts.buttons === "object" && opts.buttons !== null)) {
                $.each(opts.buttons, function (name, props) {
                    var clickfn = props.click,
                        isfn = typeof clickfn === 'function',
                        maybeRefresh = opts.maybeRefresh,
                        button,click;

                    props = $.isFunction(props) ? {
                        click : props,
                        text : name
                    } : props;

                    props = $.extend({
                        type : "button"
                    }, props);

                    click = maybeRefresh ? props.click.toString() : props.click;
                    if (typeof click === 'string') {
                        props.click = function() {
                            var fn = new that.options.originalPage.Function('return (' +click+ ').apply(this, arguments)')
                            try {
                                fn.call(that, that);
                            } catch(e) {}
                        };
                    } else {
                        props.click = function () {
                            click.call(that, that);
                        }
                    }
                    button = $("<button></button>", props).appendTo(that.button);
                })
            } else {
                this.button.hide();
            }

            poptitle = this.wrap.find('.popTitle h3');
            popclose = this.wrap.find('.popClose');
            // 初始化title
            poptitle.html(opts.title || this.element.attr("title"));

            // 初始化close
            if (opts.closeButton) {
                popclose.html(opts.closeText)
            } else {
                popclose.hide();
            }

            if (!opts.title && !opts.closeButton) {
                poptitle.parent().hide();
            }
            this._super();
        },
        createHTML: function () {
            var that = this,
                opts = this.options;

            this.wrap = $(this.popWinTeml);
            this.content = this.wrap.find('.popContent');
            this.button = this.wrap.find('.popButton')
        },
        popWinTeml: '<div class="popWrap"><div class="popInner">'+
            '<div class="popTitle"><a class="popClose" href="javascript:void(0)" close></a><h3></h3></div>'+
            '<div class="popContent"></div>'+
            '<div class="popButton"></div>'+
            '</div></div>'
    });

    $.widget("hk.popTips", $.hk.popWin, {
        options : {
            popClass : 'popTips',
            tipsType : 'top',
            tipsTarget: null,
            offset: 5,
            show: false,
            modal: false,
            isBindLeave: true,
            isUpdataMsg: true,
            isarrow: true,
            draggable: false,
            arrow : 'left',
            width : 'auto',
            autoOpen: false,
            closeButton: false,
            showTipsClose : false,
            positionCollision : 'none'
        },
        _create: function () {
            var opts = this.options,
                that = this;
            this.target = this.element;
            this.element = $('<span>');

            this.updataMsg();
            this.createHTML();

            if (opts.isarrow) {
                $('<i><b></b></i>')
                    .addClass('tips')
                    .prependTo(this.wrap);
            }

            if(opts.isBindLeave) {
                this.target
                    .bind('mouseenter', function () {
                        that.open();
                    })
                    .bind('mouseleave', function () {
                        that.close();
                    })
            }

            $.hk.popWin.prototype._create.apply(this);
        },

        updataMsg: function () {
            var target = this.target,
                msg = target.data('msg');

            this.element.html(msg);
        },
        updataTipsType: function () {
            var opts = this.options,
                pos = this.target.data('position') || opts.tipsType;

            this.wrap
                .removeClass('popTips-' + opts.tipsType)
                .addClass('popTips-' + pos);

            opts.tipsType = pos;
            return pos;
        },
        open: function () {
            if (this.options.isUpdataMsg) {
                this.updataMsg()
            }
            $.hk.popWin.prototype.open.call(this)
        },
        _position: function () {
            var opts = this.options,
                pos = opts.position,
                type = this.updataTipsType(),
                ofs = opts.offset,
                mypos;
            // 当potions.position为对象时按传进来的参数操作
            if (!$.isPlainObject(pos)) {
                switch(type) {
                    case 'top':
                        mypos = 'bottom';
                        break;
                    case 'bottom':
                        mypos = 'top';
                        break;
                    case 'right':
                        mypos = 'top';
                        break;
                    case 'left':
                        mypos = 'top';
                        break;
                    default:
                        type='top'
                        mypos = 'bottom'
                }

                opts.position = {
                    of: this.target,
                    my: (type == 'left' ? 'right' : 'left') + ' ' + mypos,
                    at: (type== 'right' ? 'right' : 'left') + ' ' + (type == 'bottom' ? 'bottom' : 'top'),
                    offset: (type=='top'||type=='bottom'?'0':type== 'left'?(-ofs):ofs) + ' ' + (type=='left'||type=='right'?'0':type== 'top'?(-ofs):ofs)
                }
            }

            $.hk.popWin.prototype._position.call(this, opts.position);
        }

    });
})();

(function (context) {
    var popSet = {
            popClass: 'popPrompt',
            autoOpen: true,
            closeDestroy: true,
            reserve: false,
            show: false,
            width: 360,
            height: 'auto',
            closeButton: false,
            type : ['ok', 'error', 'stop', 'question', 'notice', 'attention', 'tips', 'alarm']
        },
        popOpts = {
            defaultTitle: '提示',
            defaultLevel: 'attention',
            okbutton: '确定',
            okclass: 'buttonM bBlue',
            cancelclass: 'buttonM bDefault',
            cancelbutton: '取消',
            defaultTempl: '<div class="popMsg"><i class="pop_icon"></i><div class="popMsgContent"></div></div>',
            defaultPromptTempl: '<div class="popPromptMsg"><span></span><br/><input type="text" id="popup_prompt" class="auto-input"  /></div>',
            defaultPromptValue:'请输入值'
        },
        stickySet = {
            popClass: 'popSticky',
            autoOpen: true,
            closeDestroy: true,
            reserve: false,
            show: 'slide',
            speed : 'fast',
            width: 360,
            modal: false,
            height: 'auto',
            minHeight : 93,
            autoclose: 2E3,
            closeButton: true,
            type : ['ok', 'error', 'stop', 'question', 'notice', 'attention', 'tips', 'alarm'],
            html: false
        },
        stickyOpts =  {
            defaultTempl: '<div class="popMsg"><i class="pop_icon"></i><div class="popMsgContent"><h5></h5><p></p></div></div>'
        },
        handelParam= function (opts) {
            var opts = $.isPlainObject(opts) ? opts : {};
            !$.isFunction(opts.callback) && (opts.callback=function () {});
            opts.title == null && (opts.title = popOpts.defaultTitle);
            opts.level == null && (opts.level = popOpts.defaultLevel);

            opts = $.extend(true, {}, popSet, opts);
            return opts;
        },

        factory = function (opts) {
            var html,prompt =  opts.html ?  opts.html.find('#popup_prompt') : {};
            opts.buttons = [{
                text: popOpts.okbutton,
                'class': popOpts.okclass,
                click: function (event) {
                    this.close();
                    if(prompt.length) {
                        opts.callback.call(this, prompt.val());
                    }else{
                        opts.callback.call(this, true);
                    }
                }
            }];

            if (opts.isCancelButton) {
                opts.buttons.push({
                    text: popOpts.cancelbutton,
                    'class': popOpts.cancelClass,
                    click: function (event) {
                        this.close();
                        if(prompt.length){
                            opts.callback.call(this, false);
                        }else{
                            opts.callback.call(this,null);
                        }

                    }
                })
            }
            if (!opts.html) {
                html = $(popOpts.defaultTempl);
                html.find('.pop_icon').addClass(opts.level);
                html.find('.popMsgContent').html(opts.msg);
            } else {
                html = opts.html;
            }
            html.popWin(opts);
        },
        valToObj = function(message, title, level, callback,options) {
            if ($.isPlainObject(message)) {
                return message;
            }
            var obj = {};
            obj.msg = message;
            if ($.isPlainObject(title)) {
                options = title;
            } else if ($.isPlainObject(level)) {
                options = level;
                if ($.isFunction(title)) {
                    callback = title;
                } else {
                    level = title;
                }
                title = null;
            } else if ($.isFunction(title)) {
                callback = title;
                title = null;
            } else if ($.isFunction(level)) {
                options = callback;
                callback = level;
                level = title;
                title = null;
            } else if (level == null && typeof title == 'string') {
                level = title;
                title = null;
            } else if ($.isPlainObject(callback)) {
                options = callback;
                callback = options.callback;
            }
            obj.title = ((typeof title == 'string') && title) || (options ? options.title : null);
            obj.level = ((typeof level == 'string') && level) || (options ? options.level : null);
            obj.callback = options ? (options.callback || null) : callback;
            obj.afterclose = options ? (options.afterclose || null) : null;
            obj.afteropen = options ? (options.afteropen || null) : null;
            obj.options = options;
            (options && options.type) && (obj.type = options.type);
            return obj;
        },
        obj = {
            /**@global*/
            jAlert : function (message, title, level, callback) {
                var opts = handelParam(valToObj(message, title, level, callback));
                factory(opts);
            },
            /**@global*/
            jConfirm  : function (message, title, callback) {
                var opts = handelParam(valToObj(message, title, 'question', callback));
                opts.level = 'question';
                opts.isCancelButton = true;
                factory(opts);
            },
            /**@global*/
            jPrompt : function (message, value, title, callback) {
                var opts = handelParam(valToObj(message, title, 'attention', callback));
                opts.isCancelButton = true;
                opts.html = $(popOpts.defaultPromptTempl);
                opts.value = value;
                opts.html.find('span').html(opts.msg);
                opts.html.find('input').val(opts.value || popOpts.defaultPromptValue);
                factory(opts);
            },
            jSticky : function(message, title, level, callback,options){
                var html = $(stickyOpts.defaultTempl),
                    opts = valToObj(message, title, level, callback,options) || {},
                    opts = $.extend({},opts,opts.options),
                    title = opts.title,
                    level = opts.level ? opts.level : opts.type || 'attention',
                    icon = html.find('i'),
                    ht = html.find('h5'),
                    pt = html.find('p');
                    opts.afterclose =  opts.afterclose || opts.callback;

                if(opts.html) {
                    html = $(opts.message);
                }else{
                    delete opts.title;
                    if (level && stickySet.type.indexOf(level) > -1) {
                        icon.addClass(level);
                        html.addClass('popSticky-icon');
                    } else {
                        icon.hide();
                    }
                    if (title) {
                        ht.html(title);
                    } else {
                        ht.hide()
                    }
                    pt.html(opts.msg);
                }
                html.popWin($.extend(true, {}, stickySet, opts, {
                    open: function (wrap, obj) {
                        var option = obj.options;
                        if (option.autoclose) {
                            obj.leaveTM = setTimeout(function () {
                                obj.close();
                            }, option.autoclose);
                        }
                        opts.open && opts.open.call(this, wrap, obj)
                    }
                }))
            }
        }

    $.extend(context,obj);
    //TODO  这里使用$(function).apply(window)这样不能把对象添加到window层
})(window);


(function (context) {

    var popProperties  = {
        ifrHTML: '<div class="dialog" name="{id}" parentSrc="{href}" style="padding:0;overflow:hidden;">' +
            '<div class="loading-overlay">' +
            '<div class="loading-m"><i></i><span>\u6b63\u5728\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u002e\u002e\u002e</span>' +
            '</div><div class="shadow"></div>' +
            '</div>' +
            '<iframe src="{src}" dialogIframe="true" id="{id}" name = "{id}" frameborder="0" scrolling="auto" class="autoIframe dialog-frame"></iframe>' +
            '</div>',
        ajaxHTML: '<div class="dialog" id="{id}"></div>',
        parseStr : function(str, obj){
            return str.replace(/{([^}]*)}/g, function (a, b) {
                return obj[b] || '';
            })
        },
        run :  function(options){
            var close = options.close, el = options.el;
            options = $.extend(true, {
                autoOpen : true,
                modal : true,
                resizable : false,
                targetPage: window,
                width : 500
            }, options, {
                close: function () {
                    top.iframeOn_El = null;
                    close && close.call(this, options);
                    el.remove();
                }
            });
            return el.popWin(options);
        }
    }

    var _popWin = function(options){
        var options = options || {},base = $('base').attr('href') || '',iframeSrc,ajaxSrc,src,el;
        if(iframeSrc = options.iframeSrc){
            src = ( /^\/|^https?\/\//i.test(iframeSrc) ? '' : base) + iframeSrc;
            options.iframeSrc = src;
            el =   $(popProperties.parseStr(popProperties.ifrHTML, {
                id: options.id,
                href: iframeSrc,
                src: src
            })).appendTo('body');
            el.find('iframe').on('load', function() {
                el.find('.loading-overlay').hide();
            });
        }else if(options.ajax && options.ajax.url){
            ajaxSrc = options.ajax.url;
            src = ( /^\/|^https?\/\//i.test(ajaxSrc) ? '' : base) + ajaxSrc;
            el = $(popProperties.parseStr(popProperties.ajaxHTML,{id:options.id}));
            var success = options.ajax.success;
            options.ajax.success = function() {
                var result = success && success.apply(this, arguments);
                //options.load && option.load();
                return result;
            };

            el.load(options.ajax.url);
        }else if(options.el){
            el = options.el[0] ? $(options.el[0].outerHTML) : $([]);
            //el = options.el.appendTo('body')
            options.el.appendTo('body');
        } else{
            return;
        }

        options.el = el;
        return popProperties.run(options);
    }

    /**@memberof! window*/
    context.popWin = _popWin;


    /*这段代码放出来放在子页面start*/

    $.fn.dialog = function() {
        this.popWin.apply(this, arguments)
        /*
        var $popWin = $.fn.popWin;
        return function(opt) {
           opt.el = this;
            return popWin(opt);
        } */
    };

    $.extend({
        dialog :  function(option){
            if(typeof window.popWin ===  'function'){
                window.popWin($.extend(option, {
                    originalPage: window,
                    originalHref: location.href
                }));
            } else {
                window.popWin(option)
            }
        },
        sticky : function(message, title, level, callback,options){
            jSticky(message, title, level, callback,options);
        }
    });
    /*这段代码放出来放在子页面end*/

})(window);

