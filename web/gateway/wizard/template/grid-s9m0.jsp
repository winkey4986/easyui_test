<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
$(document).ready(function(){
	var grid_s9m0_1_url = '${grid_s9m0_1}';
	if(grid_s9m0_1_url != null && grid_s9m0_1_url != ''){
		$('#grid-s9m0-1').load(grid_s9m0_1_url);
	}
	var grid_s9m0_2_url = '${grid_s9m0_2}';
	if(grid_s9m0_2_url != null && grid_s9m0_2_url != ''){
		$('#grid-s9m0-2').load(grid_s9m0_2_url);
	}
	var grid_s9m0_3_url = '${grid_s9m0_3}';
	if(grid_s9m0_3_url != null && grid_s9m0_3_url != ''){
		$('#grid-s9m0-3').load(grid_s9m0_3_url);
	}
	var grid_s9m0_4_url = '${grid_s9m0_4}';
	if(grid_s9m0_4_url != null && grid_s9m0_4_url != ''){
		$('#grid-s9m0-4').load(grid_s9m0_4_url);
	}
});
</script>
<div class="wrapper grid-s9m0">
	<div class="col-main">
		<div class="main-wrap" id="grid-s9m0-1">

		</div>
	</div>
	<div class="col-sub" id="grid-s9m0-2">

	</div>
</div>
<div class="wrapper grid-s9m0">
	<div class="col-main">
		<div class="main-wrap" id="grid-s9m0-3">

		</div>
	</div>
	<div class="col-sub" id="grid-s9m0-4">

	</div>
</div>