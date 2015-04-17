<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
<%@ include file="/vportal/common/commons-index.jsp" %>
<link href="${ctx}/web/assets/default/css/home.css" rel="stylesheet"/>

    <script type="text/x-jquery-tmpl" tmpl-menu>
        <li>
            <a href="#"><span>视频应用</span></a>
            <ul>
                {{each(i, d) data}}
                <li><a href="#">{{= d.name}}</a></li>
                {{/each}}
            </ul>
        </li>
    </script>
    </head>
    <body class="home hasCopyright">
<input type="hidden" id="expireDate" value=""/>

<div id="wrapper">
    <!-- top -->
    <%@ include file="/vportal/common/commons-vportal-top.jsp" %>
    <!-- Content begins -->
    <div id="content" class="layout">

        <div id="template"></div>
    </div>
    <!-- Content ends -->
    <!-- Footer begins -->
    <div id="footer" style=" display:block">
        <div class="wrapper">
            <div class="copyright">
                <s:if test="theme.copyright.show">
            	<s:if test="theme.copyright.url == ''"><i class="logo"></i></s:if><s:else><img src="/data/image${theme.copyright.url}" style="vertical-align: middle;height:10px;width:74px" alt=""></s:else>${theme.copyright.title}
            	</s:if>
            </div>
        </div>
    </div>
</div>
<script>
    $('#template').load('${ctx}/web/gateway/wizard/contentWrapper.action');
</script>
</body>
</html>