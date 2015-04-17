<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="wrapper grid-m0s9">
    <div class="col-main">
        <div class="main-wrap" id="grid-m0s9-1" data-menu-sub>
        </div>
    </div>
    <div class="col-sub" id="grid-m0s9-2">
    	<div id="note">
		</div>
		
		<div id="soft">
		</div>
    </div>
</div>
<script type="text/x-jquery-tmpl" tmpl-menu-sub>
   <div class="block block-home">
        {{each(i, d) data}}
                {{if d.data != null}}
 <div class="nav_content">
                <h2><a href="javascript:void(0);"><span>{{= d.name}}</span></a></h2>
                    <ul>
                        {{each(i,d) data}}
                        <li><a href="javascript:void(0);" onclick="goMenuById({{= d.menuId}})" menuId="{{= d.menuId}}" class="icon_log {{= d.className}}"><span>{{= d.name}}</span></a></li>
                        {{/each}}
                    </ul>
</div>
                {{/if}}
            
        {{/each}}
    </div>
</script>
<script type="text/javascript">
    $(function(){
     _model.require('menu').setOptions({
//    tmplurl: pt.ctx + '/web/gateway/loadMenus.action'
    tmplurl: pt.ctx + '/web/gateway/loadMenus.action?t='+ new Date().getTime()
    })
    _model.require('menu').domInit();
      _model.require('menu').bind('inilize',function(){
         $('.nav_content h2').click(function () {
             $(this).toggleClass('show')
                     .siblings('ul').slideToggle();

         });
     })
    
    $('.topNav').xBreadcrumbs();
    
    $("#note").load(pt.ctx + "/web/gateway/wizard/bulletinPane.action");
    $("#soft").load(pt.ctx + "/web/gateway/wizard/download.action");
    });

</script>