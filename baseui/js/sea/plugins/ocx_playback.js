define("./ocx_playback",["./active_x"],function(f){var e={},d={};return f("./active_x").extend({ocxNotInstall:!1,constructor:function(a){this.base(a,["hikui-active"],[])},render:function(a){a?this.base(a):(this.base("clsid:88F0ADA4-0B55-49EE-BD4E-FC87AD058DEF"),this.ocxEl[0].StopPlayback(0))},throwError:function(a){throw Error(a);},SetBasicInfo:function(a,b){return this.ocxEl[0].SetBasicInfo(a,b)},addIndexCodeMap:function(a,b,c){c!=null&&(d[a]==null&&(d[a]=[]),d[a].push(c),e[c]=b)},removeIndexCodeMap:function(a){var b=
d[a];if(b!=null){var c=null;b.length>0&&(c=b[b.length-1],b.pop());d[a].length<1&&(d[a]=null);c!=null&&(e[c]=null)}},getIndexCodeMap:function(a){return e[a]},SetUserInterface:function(a){return this.ocxEl[0].SetUserInterface(a)},SetPlayWndStateText:function(a,b){return this.ocxEl[0].SetPlayWndStateText(a,b)},SetSearchResult:function(a,b,c){return this.ocxEl[0].SetSearchResult(a,b,c)},SetOccupied:function(a,b){return this.ocxEl[0].SetOccupied(a,b)},StartPlayback:function(a){return this.ocxEl[0].StartPlayback(a)},
StopPlayback:function(a){return this.ocxEl[0].StopPlayback(a)},SetToken:function(a,b){return this.ocxEl[0].SetToken(a,b)},SetLocalParam:function(a){return this.ocxEl[0].SetLocalParam(a)},OpenFolder:function(a){return this.ocxEl[0].OpenFolder(a)},OpenFile:function(a,b,c){return this.ocxEl[0].OpenFile(a,b,c)},SetLabelResult:function(a,b,c){return this.ocxEl[0].SetLabelResult(b,c)},SetLockResult:function(a,b,c){return this.ocxEl[0].SetLockResult(a,b,c)},GetSelWnd:function(){return this.ocxEl[0].GetSelWnd()},
GetWndNumber:function(){return this.ocxEl[0].GetWndNumber()},GetTimeSpan:function(){return this.ocxEl[0].GetTimeSpan()},SetLabelInfo:function(a,b){return this.ocxEl[0].SetLabelInfo(a,b)},SetPreNextBtnState:function(a,b){return this.ocxEl[0].SetPreNextBtnState(a,b)},SetSelWnd:function(a){return this.ocxEl[0].SetSelWnd(a)},SetFitLayout:function(a){return this.ocxEl[0].SetFitLayout(a)},ExitSectionPlay:function(){return this.ocxEl[0].ExitSectionPlay()},PlaySection:function(){return this.ocxEl[0].PlaySection()},
GetIdleWndIndex:function(){return this.ocxEl[0].GetIdleWndIndex()},SetPerformance:function(a){return this.ocxEl[0].SetPerformance(a)},unregister:function(){},register:function(){return!0},getOcxUrl:function(){return pt.ctx+"/web/softs/HIKOCX.CAB"},GetDirectoryPath:function(){try{var a=this.ocxEl[0].GetDirectoryPath();if(a=="null"||a==null)return null;if(a[a.length-1]=="\\")return a;return a+"\\"}catch(b){return null}},GetSystemDrive:function(){try{return this.ocxEl[0].GetSystemDrive()+":"}catch(a){return"C:"}},
GetUserDocument:function(){try{return this.ocxEl[0].GetUserDocument()}catch(a){return"C:\\Program Data"}},SendUrl:function(a){try{return this.ocxEl[0].SendUrl(a)}catch(b){return!1}},checkFile:function(a){var b=null;window.XMLHttpRequest?b=new XMLHttpRequest:window.ActiveXObject&&(b=new ActiveXObject("Microsoft.XMLHTTP"));if(b!=null){if(b.open("GET",a,!1),b.send(),b.readyState==4&&b.status==404)return!1}else jAlert("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301XMLHTTP,\u68c0\u67e5\u6587\u4ef6\u5931\u8d25!");
return!0},handleException:function(){var a=this.checkFile(this.getOcxUrl()),b=this.msgEl||this.el;this.ocxEl!=null&&this.ocxEl.hide();b.find('div[msgType="msg"]').remove();b.find("*").hide();a?b.append('<div class="msg-b msg-b-stop"><i></i><div class="msg-cnt"><span>\u63a7\u4ef6\u5f02\u5e38\uff01</span></div></div>'):b.append('<div class="msg-b msg-b-stop"><i></i><div class="msg-cnt"><span>\u63a7\u4ef6\u5f02\u5e38\uff01</span><p>\u63a7\u4ef6\u4e0d\u5b58\u5728\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\u4e0a\u4f20\u63a7\u4ef6</p></div></div>');
if(a&&this.msgEl&&this.msgEl.length>0&&(typeof currentIsDialog=="undefined"||currentIsDialog==!1))loader.show("\u6700\u65b0\u63a7\u4ef6\u6b63\u5728\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...\uff08\u52a0\u8f7d\u5931\u8d25\u8bf7\u8df3\u8f6c\u5230\u9996\u9875\u8fdb\u884c\u624b\u52a8\u4e0b\u8f7d\u548c\u5b89\u88c5\uff09"),setTimeout(function(){loader.hide();jAlert("\u52a0\u8f7d\u63a7\u4ef6\u5931\u8d25\uff0c\u8bf7\u8df3\u8f6c\u5230\u9996\u9875\u8fdb\u884c\u624b\u52a8\u4e0b\u8f7d\u548c\u5b89\u88c5\u3002")},
15E3);return!1}})});
