<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="topic" class="block block-home">
	<div class="hd">
		<h3>专题与向导</h3>
	</div>
	<div class="bd">
		<ul class="topic-list clearfix">
			<li><a href="javascript:void(0);guide('${vmccUrl}/web/topic/storage/forward_guide.action');" class="thumb"><span><img src="${ctx}/web/assets/${style }/images/icons/videoplan.png"
						alt=""></span>
				<h6>录像计划配置专题</h6></a>
				<div class="desc">
					<p>配置监控点的录像计划，查询配置结果。</p>
				</div>
				<div class="action">
					<a class="buttonS bSuccess" href="javascript:void(0);" onclick="guide('${vmccUrl}/web/topic/storage/forward_guide.action')">进入</a>
				</div></li>
			<li><a href="javascript:void(0);guide('${vmccUrl}/web/topic/tvwall/forward_guide.action');" class="thumb"><span><img
						src="${ctx}/web/assets/${style}/images/icons/monitorview.png" alt=""></span>
				<h6>电视墙专题</h6></a>
				<div class="desc">
					<p>管理电视墙、大屏和预案，操作视频上墙，控制大屏，执行预案。</p>
				</div>
				<div class="action">
					<a class="buttonS bSuccess" href="javascript:void(0);" onclick="guide('${vmccUrl}/web/topic/tvwall/forward_guide.action')">进入</a>
				</div></li>
		</ul>
	</div>
</div>