define("./swf_schedule",["./active_x_swf"],function(t){var f=t("./active_x_swf");return f.extend({mode:3,version:2,num:7,maxBoard:4,useMinTimeCell:!1,minTimeCell:30,constructor:function(a){this.base(a,["hikui-schedule"],[{name:"mode",type:"int"},{name:"num",type:"int"},{name:"maxBoard",type:"int"},{name:"useMinTimeCell",type:"boolean"},{name:"minTimeCell",type:"int"}]);var d=this;d._resize=function(){d._value=d.getValue();d.width=d.el.width();d.height=d.el.height();$("#_flash_"+d.id).width(d.width)};
this.el.resize(d._resize)},alert:function(a){a=="copyUnSelect"?jAlert(language.text("shedule.copy"),language.text("dialog.info"),"attention"):a=="canDayDuplicated"?jAlert(language.text("shedule.special.error"),language.text("dialog.info"),"attention"):jAlert(language.text("shedule.delete"),language.text("dialog.info"),"attention")},setTypeColor:function(a,d){return this.findSWF().setTypeColor(a,d)},getLibPath:function(){return f.SWF_URL+"/schedule"},getBarVisibled:function(){return!1},getStyleName:function(){return"style_"+
pt.lang+".css"},init:function(){if(this.mode==1||this.mode==2)this.num=1;this.useMinTimeCell&&this.findSWF().setMinTimeCell(this.minTimeCell);this.setModleMode(this.mode,this.num);if(this._tirggerInit)try{this.findSWF().getValue()!=""&&this.findSWF().getValue()!="<data/>"?this.setValue(this.findSWF().getValue()):this.setValue(this._value)}catch(a){console.info("schedule setValue wrong:"+this._value)}else this.el.trigger("init",this),this.trigger("init",this);this._tirggerInit=!0},render:function(){this.params=
{bgcolor:"#F7F9E8"};this.base(this.getLibPath()+"/main.swf?date="+new Date);if($.browser.msie&&this.ocxEl.attr("classid")==null)throw Error("no classid");},setModleMode:function(a,d){this.mode=a||this.mode;this.num=d||this.num;return this.findSWF().setModleMode(this.mode,this.num)},setValue:function(a){this._value=a;return this.findSWF().setValue(a)},btnHandle:function(a){a=this.findSWF().btnHandle(a);this._value=this.findSWF().getValue();return a},getValue:function(){return this.findSWF().getValue()},
setSpecialDayChecked:function(a){return this.findSWF().setSpecialDayChecked(a)},getCheckedDay:function(){return this.findSWF().getCheckedDay()},setStickStyle:function(a){return this.findSWF().setStickStyle(a)},selectTimes:function(a,d,h){function i(b){b=parseInt(b);if(b<10)return"0"+b;return b.toString()}function l(b,e){var c=b.split(":"),a=parseInt(c[0]),c=parseInt(c[1]);e==0?c==0?(a--,c=59):c--:e==1&&(c==59?(a++,c=0):c++);return a+":"+c}function j(b){$("#startTime_value").text(b.cal.getNewDateStr());
var e=c.endDp,a=e.cal,d=$("#startTime_value").text(),d=l(d,1);a.minDate=a.doCustomDate(d,d!=e.defMinDate?e.realFmt:e.realFullFmt,e.defMinDate);m=b.cal.date.H;n=b.cal.date.m;c._startSv("H",m);c._startSv("m",n)}function k(b){$("#endTime_value").text(b.cal.getNewDateStr());var e=c.startDp,a=e.cal,d=$("#endTime_value").text(),d=l(d,0);a.maxDate=a.doCustomDate(d,d!=e.defMaxDate?e.realFmt:e.realFullFmt,e.defMaxDate);g=b.cal.date.H;o=b.cal.date.m;c._endSv("H",g);g==24?(c._endSv("m",0),c._endD.mI.disabled=
!0):c._endD.mI.disabled=!1;c._endSv("m",o)}function p(){if(!(c==null||c._startSv==null)){c._startSv("H",m);c._startSv("m",n);var b=c.startDp.cal,e=c.startDp,a=f;b.minDate=b.doCustomDate(a,a!=e.defMinDate?e.realFmt:e.realFullFmt,e.defMinDate);j(e);c._endSv("H",g);g==24?(c._endSv("m",0),c._endD.mI.disabled=!0):c._endD.mI.disabled=!1;c._endSv("m",o);a=q;b=c.endDp.cal;e=c.endDp;k(e);b.maxDate=b.doCustomDate(a,a!=e.defMaxDate?e.realFmt:e.realFullFmt,e.defMaxDate);c.startDp.cal.hideDDivChildren();c.endDp.cal.hideDDivChildren()}}
this._selectId=this._selectId||{};this._selectId.id=a;var c=this,f=i(d/60)+":"+i(1*(d%60));$("#startTime_value").text(f);var m=parseInt(d/60),n=parseInt(1*(d%60)),q=i(h/60)+":"+i(1*(h%60));$("#endTime_value").text(q);var g=parseInt(h/60),o=parseInt(1*(h%60));if($("#schedule_time_select").data("dialog")!=null)p(),$("#schedule_time_select").dialog("open");else{seajs.use("{hikui}/calendar/wdatepicker",function(b){c.useWdatepicker=!0;b(null,!0);$dp.$Text=function(c,b){if(this.el==null)return null;var e=
$(c).text();return l(e,b)};var e=0;b({eCont:"startTime",el:"startTime",dateFmt:"HH:mm",maxDate:"#F{$dp.$Text('#endTime_value',0);}",alwaysUseStartDate:!0,notShowSS:!0,init:function(b,a,d){e++;c.startDp=b;c._startSv=d;e==2&&p()},autoShowQS:!1,onpicked:j,Hchanged:j,mchanged:j});b({eCont:"endTime",el:"endTime",dateFmt:"HH:mm",notShowSS:!0,minDate:"#F{$dp.$Text('#startTime_value',1);}",autoShowQS:!1,init:function(b,a,d){e++;c.endDp=b;c._endSv=d;c._endD=a;e==2&&p()},schedule_24:!0,alwaysUseStartDate:!0,
onpicked:k,Hchanged:k,mchanged:k})});var r=function(b){b.indexOf("0")==0&&(b=b.substring(1,2));return parseInt(b)},s=function(b){if(b.length<5)return 0;return r(b.substring(0,2))*60/1+r(b.substring(3,5))/1},c=this;$("#schedule_time_select").dialog({autoOpen:!0,modal:!0,width:450,height:400,buttons:[{text:language.text("dialog.ok"),"class":"bPrimary",click:function(){var b=$("#startTime_value").text();if(b==""||b.length<5)jAlert(language.text("shedule.starttime.empty"),language.text("dialog.info"),
"attention");else{var a=$("#endTime_value").text();if(a==""||a.length<5)jAlert(language.text("shedule.endtime.empty"),language.text("dialog.info"),"attention");else if(b=s(b),a=s(a),b<0)jAlert(language.text("shedule.starttime.invalid"),language.text("dialog.info"),"attention");else if(a>1440)jAlert(language.text("shedule.endtime.invalid"),language.text("dialog.info"),"attention");else if(b>=a)jAlert(language.text("shedule.time.error"),language.text("dialog.info"),"attention");else{var d=c._selectId.id;
c.findSWF().setTimeSelector(d,b,a)<0?jAlert(language.text("shedule.time.repeat"),language.text("dialog.info"),"attention"):(this.close(),$.sticky(language.text("dialog.success"),{type:"ok"}))}}}},{text:language.text("dialog.close"),click:function(){this.close()}}]})}},destroy:function(){this.el.unbind("resize");this.useMinTimeCell&&($("#startTime").remove(),$("#endTime").remove());if(this.useWdatepicker&&(top.$("#_my97DP").remove(),top.$dp=null,typeof $dp!="undefined"))$dp=null,top.$dp.hide(),top.$dp=
null,top.$("#_my97DP").remove();return this.base()},getMaxBoard:function(){return this.maxBoard}})});
