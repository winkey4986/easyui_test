<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<%@ include file="/vportal/common/commons-index.jsp" %>
<script type="text/javascript">
if (self != top) {
	top.document.getElementById("mainFrame").src = '${iframeUrl}';
}
</script>
</head>
<body class="<s:if test='theme.copyright.show'>hasCopyright</s:if>">
	<div id="wrapper">
		<!-- Top begins -->
		<%@ include file="/vportal/common/commons-menu-top.jsp"%>
		<!-- Top ends -->
		<%@include file="/vportal/common/commons-menu.jsp"%>
		<!-- Navbar ends -->
		<!-- Content begins -->
		<div id="content" class="layout">
			<div class="breadLine">
				<ul class="breadcrumbs">
				</ul>
			</div>
			<div class="wrapper grid-m">
				<div class="col-main">
					<div class="main-wrap">
						<iframe id="mainFrame" name="mainFrame" src="${iframeUrl}" frameborder="0" class="autoIframe"></iframe>
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
	            	<s:if test="theme.copyright.url == ''"><i class="logo"></i></s:if><s:else><img src="/data/image${theme.copyright.url}" style="vertical-align: middle;height:10px;width:74px" alt=""></s:else>${theme.copyright.title}
	            	</s:if>
				</div>
			</div>
		</div>
		<!-- Footer ends -->
	</div>
	<!-- 以下为当前页脚本 -->
	<script type="text/javascript">
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
        $(document).ready(function(){
        	$('.topNav').xBreadcrumbs();
        });
	</script>
</body>
</html>
