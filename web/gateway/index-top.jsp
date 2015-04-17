<!DOCTYPE HTML>
<%@page import="com.ivms6.core.util.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 以下为通用脚本 -->
<%@ include file="/vportal/common/commons-index.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</head>
<body class="noNavbar">
	<div id="wrapper">
		<!-- Top begins -->
		<%@ include file="/vportal/common/commons-menu-top.jsp"%>
		<!-- Top ends -->
		<!-- Header begins -->
		<!-- Header ends -->
		<!-- Content begins -->
		<div id="content" class="layout">
			<div class="breadLine">
				<ul class="breadcrumbs">
				</ul>
			</div>
			<div class="wrapper grid-m">
				<div class="col-main">
					<div class="main-wrap">
						<iframe id="mainFrame" name="mainFrame" src="${url}" frameborder="0" class="autoIframe" scrolling="auto"></iframe>
					</div>
				</div>
			</div>
		</div>
		<!-- Content ends -->
		<!-- Footer begins -->
		<div id="footer">
			<div class="wrapper">
				<div class="copyright">
					<s:if test="theme.copyright.show">
	            	<s:if test="theme.copyright.logo != ''"><i class="logo"></i></s:if>${theme.copyright.title}
	            	</s:if>
				</div>
			</div>
		</div>
		<!-- Footer ends -->
	</div>
	<!-- 以下为当前页脚本 -->
	<script type="text/javascript">
		if (self != top) {
			var url= window.location.href;
			if(url.indexOf('?')>0){
				url = url.substring(0,url.indexOf('?'));
			}
			top.location.href = url;
		}
		$(document).ready(function(){
        });
		function openUrl(dtype, url){
            if(url != null && url != "") {
                      if(parseInt(dtype) == 1) {
                               window.open(url, "DisplayWindow", "toolbar=no,,menubar=no,location=no,scrollbars=no");
                      } else if(parseInt(dtype) == 2) {
                               window.location.href = url;
                      } else if(parseInt(dtype) == 3 || parseInt(dtype) == 0) {
                               document.getElementById("mainFrame").src = url;
                                }
                                if (window.event) {
                                          window.event.returnValue = false;
                                }        
            }
		}
	</script>
</body>
</html>
