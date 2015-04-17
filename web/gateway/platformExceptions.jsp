<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
function loadPlatformException(){
	$.post(pt.ctx+'/web/gateway/getPlatformExceptions.action',function(data){
		if(data.success == true){
			if(data.storageCount > 0){
				$('#storageCount').html(data.storageCount);
				$('#li-storageCount').removeClass();
				$('#li-storageCount').addClass('warning');
			} else {
				$('#li-storageCount').removeClass();
				$('#li-storageCount').addClass('ok');
			}
			if(data.deviceExceptionCount > 0){
				$('#deviceExceptionCount').html(data.deviceExceptionCount);
				$('#li-deviceExceptionCount').removeClass();
				$('#li-deviceExceptionCount').addClass('error');
			} else {
				$('#li-deviceExceptionCount').removeClass();
				$('#li-deviceExceptionCount').addClass('ok');
			}
			if(data.deviceInfoExceptionCount > 0){
				$('#deviceInfoExceptionCount').html(data.deviceInfoExceptionCount);
				$('#li-deviceInfoExceptionCount').removeClass();
				$('#li-deviceInfoExceptionCount').addClass('error');
			} else {
				$('#li-deviceInfoExceptionCount').removeClass();
				$('#li-deviceInfoExceptionCount').addClass('ok');
			}
			if(data.serviceExceptionCount > 0){
				$('#serviceExceptionCount').html(data.serviceExceptionCount);
				$('#li-serviceExceptionCount').removeClass();
				$('#li-serviceExceptionCount').addClass('error');
			} else {
				$('#li-serviceExceptionCount').removeClass();
				$('#li-serviceExceptionCount').addClass('ok');
			}
		}
	}, "json");
};
$(document).ready(function(){
	loadPlatformException();
	$('#li-storageCount,#li-deviceExceptionCount,#li-deviceInfoExceptionCount,#li-serviceExceptionCount').click(function(){
		var exceptionType = '1';
		if(this.id == 'li-serviceExceptionCount'){
			exceptionType = '1';
		} else if(this.id == 'li-deviceExceptionCount'){
			exceptionType = '2';
		} else if(this.id == 'li-deviceInfoExceptionCount'){
			exceptionType = '3';
		} else if(this.id == 'li-storageCount'){
			exceptionType = '4';
		}
		window.location.href = pt.ctx+'/web/gateway/exception.action?exceptionType='+exceptionType;
	});
});
</script>
<div id="alarmInfo" class="block block-home">
	<div class="hd">
		<h3>平台异常警示</h3>
	</div>
	<div class="bd">
		<ul class="clearfix">
			<li id="li-serviceExceptionCount" class="ok"><a><span>服务节点不在线</span><em id="serviceExceptionCount">0</em></a></li>
			<li id="li-deviceExceptionCount" class="ok"><a><span>设备接入网关未配置</span><em id="deviceExceptionCount">0</em></a></li>
			<li id="li-deviceInfoExceptionCount" class="ok"><a><span>设备信息异常</span><em id="deviceInfoExceptionCount">0</em></a></li>
			<li id="li-storageCount" class="ok"><a><span>录像计划未配置</span><em id="storageCount">0</em></a></li>
		</ul>
	</div>
</div>