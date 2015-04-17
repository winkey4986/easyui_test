<%@page import="com.hikvision.swdf.extend.impl.view.ViewHelper"%>
<%@page import="com.hikvision.swdf.www.action.View"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
View csc = ViewHelper.getInstance().get("downloadcenter.file.csc");
View cscVersion = ViewHelper.getInstance().get("downloadcenter.file.csc.version");
View download = ViewHelper.getInstance().get("downloadcenter.file.download");
View downloadVersion = ViewHelper.getInstance().get("downloadcenter.file.download.version");
View videoplayer = ViewHelper.getInstance().get("downloadcenter.file.videoplayer");
View videoplayerVersion = ViewHelper.getInstance().get("downloadcenter.file.videoplayer.version");
View ocx = ViewHelper.getInstance().get("downloadcenter.file.ocxexe");
View ocxVersion = ViewHelper.getInstance().get("downloadcenter.file.ocxexe.version");
%>
<div id="download">
	<div class="hd">
		<h3>软件下载</h3>
	</div>
	<div class="bd">
			<%if(csc.getValue() == null && ocx.getValue() == null){ %>
			<div class="no_download"> 
					暂无可下载的软件
					</div>

			<%}else{ %>
				<ul class="text-list hasTime">
				<%if(csc.getValue() != null){ %>
				<li><a href="/download/<%=csc.getValue() %>"><%=csc.getName()%>(<%=cscVersion.getValue() == null ? "" : cscVersion.getValue() %>)<i class="down_icon"></i></a><span><%=cscVersion.getLabel() == null ? "" : cscVersion.getLabel()%></span></li>
				<%} %>
				<%if(ocx.getValue() != null){ %>
				<li><a href="/download/<%=ocx.getValue() %>"><%=ocx.getName()%>(<%=ocxVersion.getValue() == null ? "" : ocxVersion.getValue() %>)<i class="down_icon"></i></a><span><%=ocxVersion.getLabel() == null ? "" : ocxVersion.getLabel()%></span></li>
				<%} %>
		</ul>
			<%} %>
	</div>
</div>