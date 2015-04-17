<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
$(document).ready(function(){
	var grid_m_1_url = '${grid_m_1}';
	if(grid_m_1_url != null && grid_m_1_url != ''){
		$('#grid-m-1').load(grid_m_1_url);
	}
	var grid_m_2_url = '${grid_m_2}';
	if(grid_m_2_url != null && grid_m_2_url != ''){
		$('#grid-m-2').load(grid_m_2_url);
	}
	var grid_m_3_url = '${grid_m_3}';
	if(grid_m_3_url != null && grid_m_3_url != ''){
		$('#grid-m-3').load(grid_m_3_url);
	}
	var grid_m_4_url = '${grid_m_4}';
	if(grid_m_4_url != null && grid_m_4_url != ''){
		$('#grid-m-4').load(grid_m_4_url);
	}
});
</script>
<div class="wrapper grid-m">
	<div class="col-main">
		<div class="main-wrap" id="grid-m-1">

		</div>
	</div>
	<div class="col-sub" id="grid-m-2">

	</div>
</div>
<div class="wrapper grid-m">
	<div class="col-main">
		<div class="main-wrap" id="grid-m-3">

		</div>
	</div>
	<div class="col-sub" id="grid-m-4">

	</div>
</div>