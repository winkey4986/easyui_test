<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
$(document).ready(function(){
	var grid_m0s9_1_url = '${grid_m0s9_1}';
	if(grid_m0s9_1_url != null && grid_m0s9_1_url != ''){
		$('#grid-m0s9-1').load(grid_m0s9_1_url);
	}
	var grid_m0s9_2_url = '${grid_m0s9_2}';
	if(grid_m0s9_2_url != null && grid_m0s9_2_url != ''){
		$('#grid-m0s9-2').load(grid_m0s9_2_url);
	}
	var grid_m0s9_3_url = '${grid_m0s9_3}';
	if(grid_m0s9_3_url != null && grid_m0s9_3_url != ''){
		$('#grid-m0s9-3').load(grid_m0s9_3_url);
	}
	var grid_m0s9_4_url = '${grid_m0s9_4}';
	if(grid_m0s9_4_url != null && grid_m0s9_4_url != ''){
		$('#grid-m0s9-4').load(grid_m0s9_4_url);
	}
});
</script>
<div class="wrapper grid-m0s9">
	<div class="col-main">
		<div class="main-wrap" id="grid-m0s9-1">
		</div>
	</div>
	<div class="col-sub" id="grid-m0s9-2">
	</div>
</div>
<div class="wrapper grid-m0s9">
	<div class="col-main">
		<div class="main-wrap" id="grid-m0s9-3">
		</div>
	</div>
	<div class="col-sub" id="grid-m0s9-4">
	</div>
</div>