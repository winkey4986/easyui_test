define("./ocx_kmsfileupload",["{hikui}/active_x"],function(h){return h("{hikui}/active_x").extend({constructor:function(a){this.base(a,["hikui-active"],[])},render:function(){this.base("clsid:8CB60BB1-1658-41A9-A4F9-411E4D91B7BE")},throwError:function(a){throw Error(a);},handleException:function(){jAlert("\u8bf7\u91cd\u65b0\u66f4\u65b0\u63a7\u4ef6!")},UpdateGlobalParam:function(a){this.hasUpdateGlobalParam=!0;this.ocxEl[0].UpdateGlobalParam(["<Globalparam><kms_info><ip>",a.vmsBo.ipAddr,"</ip><port>",
a.vmsBo.wsPort,"</port><user_name>",a.vmsBo.loginName,"</user_name><user_pwd>",a.vmsBo.pwd,"</user_pwd></kms_info></Globalparam>"].join(""))},LocalFileUpLoad:function(a,c,f,d,g,b){return this.ocxEl[0].LocalFileUpLoad(["<FileUploadParam><file_type>",d,"</file_type><dev_type>0</dev_type><camera_index>",a.camera.channelno,"<camera_index><camera_indexcode>",a.camera.indexcode,"</camera_indexcode><camera_name>",a.camera.name,"</camera_name><uploader>",a.camera.creator,"</uploader><file_name>",c,"</file_name></FileUploadParam>"].join(""),
b)},toLocalFileUpLoad:function(a,c,f,d,g){var b=this;$.ajax({url:"loadUploadFileInfo.action",data:{indexCode:c,action:this.hasUpdateGlobalParam?1:0},dataType:"json",success:function(e){if(!b.hasUpdateGlobalParam){if(e.vmsBo==null){jAlert("\u89c6\u9891\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u914d\u7f6ekms\u670d\u52a1!");return}b.UpdateGlobalParam(e)}b.LocalFileUpLoad(e,a,c,f,d,g)}})}})});