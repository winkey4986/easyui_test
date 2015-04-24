/* 
* @Author: hikv
* @Date:   2015-04-22 18:43:17
* @Last Modified by:   anchen
* @Last Modified time: 2015-04-24 11:53:26
*/
/* 
* 使外部css文件失效
*/
function invalidLink(fileName){
    var links=document.getElementsByTagName("link");
    for(var i=0;i<links.length;i++){
        if(links[i].href){
          if(links[i].href.indexOf(fileName)>=0){
            links[i].href = "";
            return false;
        }
      }
   }
return false;
}

function viewLongPanel(ref,js){
    $("#long-panal").show();
    $("#easyui-panal").hide();
    invalidLink("easyui.css");
    $("body").removeClass('overflow_hidden');
    $("body").addClass('overflow_auto');
    if (js!=null&&js!="") {
        $.getScript(js);
    };
    $("#long-panal").load(ref);
    
}
function viewNormalPanel(ref,js){
    $("#long-panal").hide();
    $("#easyui-panal").show();
    $("body").removeClass('overflow_auto');
    $("body").addClass('overflow_hidden');
    if (js!=null&&js!="") {
        $.getScript(js);
    };
    //$("#easyui-panal-center").attr("href",ref);
    $("#easyui-panal-center").load(ref);
}

function changePaginationWidth(){
    //alert($("body").width()-$("#ztreeFrame").width())
    $("#gridFrame-pagination").css("width",$(".page.withFixed").css("width"));
    $("#gridFrame-pagination").css("right","0");
    $("#gridFrame-pagination").css("left","auto");
}

function changeToolbarWidth(){
    $("#gridFrame-toolbar").css("width",$(".page.withFixed").css("width"));
    $("#gridFrame-toolbar").css("right","0");
    $("#gridFrame-toolbar").css("left","auto");
}