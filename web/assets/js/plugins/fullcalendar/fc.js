
;(function($){
    // set default options
    $.fc = {
        version: "0.0.1",
        setDefaults: function(options){
            $.extend(defaults, options);
        }
    };
    $.fn.fc = function(options) {
        return new FC(this, options);
    };
    var FC = function(element,options){
        var self = this,
            options = $.extend(defaults, options),
            data = options.data,
            selEvent;
        //language
        var LOCAL = {
            'confirm_title': '确认',
            'btn_ok': '确定',
            'btn_cancel': '取消',
            'fc_data_error': '获取数据失败，请刷新页面重试',
            'fc_save_ok': '已成功保存值班计划',
            'fc_save_error': '保存值班计划失败',
            'fc_add_none': '请选择要添加的值班计划',
            'fc_add_ok': '已成功添加值班计划',
            'fc_add_error': '添加值班计划失败',
            'fc_edit_none': '请选择要编辑的值班计划',
            'fc_edit_ok': '已成功编辑值班计划',
            'fc_edit_error': '编辑值班计划失败',
            'fc_copy_none': '请选择要拷贝的值班计划',
            'fc_copy_ok': '已成功拷贝值班计划',
            'fc_paste_none': '请选择要粘贴的日期',
            'fc_paste_confirm': '确定要粘贴该值班计划吗？',
            'fc_paste_ok': '已成功粘贴值班计划',
            'fc_paste_error': '粘贴值班计划失败',
            'fc_insert_none': '请在月视图中选择要插入的日期',
            'fc_insert_confirm': '确定要插入一天吗？',
            'fc_insert_ok': '已成功插入一天',
            'fc_insert_error': '插入一天失败',
            'fc_del_none': '请选择要删除的值班计划',
            'fc_del_confirm': '确定要删除该值班计划吗？',
            'fc_del_ok': '已成功删除值班计划',
            'fc_del_error': '删除值班计划失败'
        };
        var ranger = {
            start : "",
            end : "",
            allDay : "",
            reset : function() {
                this.start = "";
                this.end = "";
                this.allDay = "";
            }
        };
        var eventObj = [];
        this.action = "";
        this.clipboard = [];

        //判断data类型:url || array，并同步Ajax获取数据
        if(!$.isArray(data)) {
            $.ajax({
                url: data,
                async: false,
                success: function(d){
                    data = d;
                },
                error: function(){
                    jSticky(LOCAL.fc_data_error, 'error', {position:'top-center'});
                }
            });
        }

        var calendar = element.fullCalendar({
            header: {
                left: 'today',
                center: 'prev,title,next',
                right: 'agendaDay,agendaWeek,month'
            },
            editable: true,
            selectable: true,
            selectHelper: true,
            select: function(start, end, allDay) {
                //清空选中的event
                calendar.find('.fc-event.selected').removeClass('selected');

                self.action = "select";
                ranger.start = start;
                if(allDay) {
                    var d = end.getDate();
                    var m = end.getMonth();
                    var y = end.getFullYear();
                    end = new Date(y, m, d + 1);
                }
                ranger.end = end;
                ranger.allDay = allDay;
            },
            unselect: function() {
                setTimeout(function(){
                    self.action = "";
                    ranger.reset();
                },100);
            },
            eventClick: function(calEvent, jsEvent, view) {
                var $this = $(this),
                    bgcolor = $this.css('background-color');
                if(checkColor(bgcolor)) {
                    $this.addClass('isDark');
                } else {
                    $this.removeClass('isDark');
                }
                function checkColor(color) {
                    var num, r, g, b, val = 128;
                    if (color[0] == "#") {
                        color = color.slice(1);

                        num = parseInt(color,16);
                        r = (num >> 16);
                        g = (num & 0x0000FF);
                        b = ((num >> 8) & 0x00FF);
                    } else if (color.indexOf('rgb') > -1) {
                        color = color.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");//利用正则表达式去掉多余的部分
                        r = parseInt(color[0]);
                        g = parseInt(color[1]);
                        b = parseInt(color[2]);
                    } else {
                        return false;
                    }
                    var i = 0;
                    if (r < val) i++;
                    if (g < val) i++;
                    if (b < val) i++;

                    return (i > 1);
                }
                self.action = "click";
                $(this).toggleClass('selected');
                console.log('click')

            },
            eventResize:function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                self.saveEvent(event,"update");
            },
            eventDrop:function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
                self.saveEvent(event,"update");
            },
            events: data
        });
        //bind edit and del button of event
        calendar.unbind('.click.fc-event')
            .delegate('.fc-event-edit', 'click.fc-event', function(ev){
                self.editEvent(selEvent);
                ev.stopPropagation();
                return false;
        })
            .delegate('.fc-event-del', 'click.fc-event', function(ev){
                self.delEvent(selEvent);
                ev.stopPropagation();
                return false;
        });

        this.getData = function() {
            return data;
        };
        //save event with Ajax
        this.saveEvent = function(event,action,callback) {
            var result = true,
                url = "http://www.hikvision.com/api/";
            loader.show("正在保存值班计划，请稍后！");
            /*这里设置Ajax数据提交
            $.ajax({
                url: url + action,
                data: event,
                type: "POST",
                success: function(){
                    result = true;
                },
                error: function(){
                    result = false;
                }
            });
            */
            loader.hide();
            //var note = timeStamp2String(event.start) + ' - ' + timeStamp2String(event.end) + '<br>' + event.title;
            if (callback) {
                callback(result);
            } else {
                if(result)
                    jSticky(LOCAL.fc_save_ok, 'ok', {position:'top-center'});
                else
                    jSticky(LOCAL.fc_save_error, 'error', {position:'top-center'});
                return result;
            }
        };
        //add event
        this.addEvent = function() {
            var $dialogAddEvent = showEventDialog();
            $dialogAddEvent.dialog("open");
            //向对话框中的对象赋值
            var $inputStartTime = $dialogAddEvent.find('input[name="duty.createTimeBegin"]');
            var $inputEndTime = $dialogAddEvent.find('input[name="duty.createTimeEnd"]');
            var $inputStaffs = $dialogAddEvent.find('input[name="duty.staffs"]');
            $inputStartTime.val(timeStamp2String(ranger.start));
            $inputEndTime.val(timeStamp2String(ranger.end));

            $('#saveEvent').on('click', function(){
                var newEvent = {};
                newEvent.start = $inputStartTime.val();
                newEvent.end = $inputEndTime.val();
                newEvent.title = $("#staffs").select2('val').toString();
                newEvent.allDay = false;
                self.saveEvent(newEvent,"add",function(result){
                    if(result) {
                        calendar.fullCalendar('renderEvent',
                            newEvent,
                            true // make the event "stick"
                        );
                        jSticky(LOCAL.fc_paste_ok, 'ok', {position:'top-center'});
                    } else {
                        jSticky(LOCAL.fc_paste_error, 'error', {position:'top-center'});
                    }
                });
            });
        };
        //edit event
        this.editEvent = function(event) {
            var selected = getSelEvents();
            if(!selected) {
                jSticky(LOCAL.fc_edit_none, 'attention', {position:'top-center'});
                return;
            }
            var $dialogEditEvent = showEventDialog({
                title: '编辑值班计划'
            });
            $dialogEditEvent.dialog("open");

            $('#saveEvent').on('click', function(){
                self.saveEvent(self.clipboard[0],"update",function(result){
                    if(result) {
                        jSticky(LOCAL.fc_edit_ok, 'ok', {position:'top-center'});
                    } else {
                        jSticky(LOCAL.fc_edit_error,'error', {position:'top-center'});
                    }
                });
            });
        };
        //copy event
        this.copyEvent = function() {
            var selected = getSelEvents();
            var titles = getEventTitles();
            if(!selected && titles.length < 1) {
                jSticky(LOCAL.fc_copy_none, 'attention', {position:'top-center'});
                return;
            }
            ranger.reset();
            jSticky(titles.join(','), LOCAL.fc_copy_ok, 'ok', {position:'top-center'});
        };
        //paste event
        this.pasteEvent = function() {
            var selected = getSelEvents();
            if(!selected) {
                jSticky(LOCAL.fc_paste_none, 'attention', {position:'top-center'});
                return;
            }
            jConfirm(LOCAL.fc_paste_confirm,LOCAL.confirm_title,function(r){
                if(r){
                    self.saveEvent(self.clipboard,"paste",function(result){
                        if(result) {
                            jSticky(LOCAL.fc_paste_ok, 'ok', {position:'top-center'});
                        } else {
                            jSticky(LOCAL.fc_paste_error, 'error', {position:'top-center'});
                        }
                    });
                }
            });
        };
        //insert event
        this.insertEvent = function() {
            var selected = getSelEvents();
            if(!selected) {
                jSticky(LOCAL.fc_insert_none, 'attention', {position:'top-center'});
                return;
            }
            jConfirm(LOCAL.fc_insert_confirm,LOCAL.confirm_title,function(r){
                if(r){
                    self.saveEvent(self.clipboard,"insert",function(result){
                        if(result) {
                            jSticky(LOCAL.fc_insert_ok, 'ok', {position:'top-center'});
                        } else {
                            jSticky(LOCAL.fc_insert_error, 'error', {position:'top-center'});
                        }
                    });
                }
            });

        };
        //del event
        this.delEvent = function(event) {
            var selected = getSelEvents();
            if(!selected) {
                jSticky(LOCAL.fc_del_none, 'attention', {position:'top-center'});
                return;
            }
            jConfirm(LOCAL.fc_del_confirm,LOCAL.confirm_title,function(r){
                if(r){
                    self.saveEvent(self.clipboard,"del",function(result){
                        if(result) {
                            jSticky(LOCAL.fc_del_ok, 'ok', {position:'top-center'});
                        } else {
                            jSticky(LOCAL.fc_del_error, 'error', {position:'top-center'});
                        }
                    });
                }
            });

        };
        //从clipboard获取所有标题title
        function getEventTitles() {
            var titles = [];
            if(self.clipboard.length) {
                $.each(self.clipboard,function(i,e){
                    titles.push(e.title);
                });
            }
            titles = unique(titles);//去重
            return titles;
        }
        //获取视图中选中的事件集，保存到clipboard，并返回是否有选中的状态
        function getSelEvents() {
            if(self.action == "click") {
                self.clipboard = [];
            }
            else if(self.action == "select") {
                self.clipboard = getEvents(ranger.start,ranger.end,options.data);
            }
            else {
                return false;
            }
            self.action = "";
            ranger.reset();
            return true;
        }
        //从数据对象中获取一定时间范围内的事件集
        function getEvents(start, end, data) {
            var contain = false,
                temp = [],
                ranger = {
                    start: start,
                    end: end
                };
            if($.isArray(data) && data.length) {
                $.each(data,function(i,e){
                    contain = compareEvent(e,ranger);
                    if(contain)
                        temp.push(e);
                });
            }
            return temp;
        }
        //compare event A in B, return true
        function compareEvent(a, b) {
            //console.log("a.start:" + timeStamp2String(a.start) + " a.end:" + timeStamp2String(a.end) + " ------------------- b.start:" + timeStamp2String(b.start) + " b.end:" + timeStamp2String(b.end));
            return (a.start - b.start >= 0 && a.end - b.end <= 0);
        }
        //show event dialog
        function showEventDialog(options) {
            var options = $.extend({},dialog_defaults,options);
            var $dialogEvent = $.dialog(options);
            return $dialogEvent;
        }
        var dialog_defaults = {
            autoOpen: false,
            iframeSrc: "module/duty/dialog/dialog_event.html",
            title: '添加值班计划',
            modal: true,
            width: 640,
            height: 400,
            buttons: {
                "ok": {
                    text: LOCAL.btn_ok,
                    id: 'saveEvent',
                    'class': 'bPrimary',
                    click: function () {
                        top.$(this).dialog("destroy");
                    }
                },
                "cancel": {
                    text: LOCAL.btn_cancel,
                    id: 'cancelEvent',
                    click: function () {
                        top.$(this).dialog("destroy");
                    }
                }
            }

        };
        //将时间转化为字符串
        function timeStamp2String(time){
            if(time == "" || time == "undefined") {
                return '';
            }
            var datetime = new Date();
            datetime.setTime(time);
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
            var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
        }
        //返回经过去重的新的数组
        function unique(ary) {
            var i = 0,
                gid='_'+(+new Date)+Math.random(),
                objs = [],
                hash = {
                    'string': {},
                    'boolean': {},
                    'number': {}
                }, p, l = ary.length,
                ret = [];
            for (; i < l; i++) {
                p = ary[i];
                if (p == null) continue;
                tp = typeof p;
                if (tp in hash) {
                    if (!(p in hash[tp])) {
                        hash[tp][p] = 1;
                        ret.push(p);
                    }
                } else {
                    if (p[gid]) continue;
                    p[gid]=1;
                    objs.push(p);
                    ret.push(p);
                }
            }
            for(i=0,l=objs.length;i<l;i++) {
                p=objs[i];
                p[gid]=undefined;
                delete p[gid];
            }
            return ret;
        }
    };
    var defaults = {
        data: ''
    };
})(jQuery);