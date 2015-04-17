<%@page import="com.hikvision.hikframework.gateway.bo.Bulletin"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div id="announce" >
	<div class="hd">
		<h3>公告</h3>
		<span class="more"><a href="${ctx}/web/gateway/bulletin.action">更多</a></span>
	</div>
	<div class="bd">
			<s:if test="bulletins.size() > 0">
		<ul class="text-list hasTime">
			<s:iterator value="bulletins" status="status">
				<li><span class="title"><a href="${ctx}/web/gateway/bulletin.action?type=show&id=${id}" title="${title}"><s:property value="title"/></a></span><span class="date">${time}</span></li>
			 </s:iterator>
		</ul>
			 </s:if>
			 <s:else>
			 <div class="no_annouce"> 
	暂无公告
	</div>
			 </s:else>
	</div>
</div>