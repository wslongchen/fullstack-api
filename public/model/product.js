var url = '/api/v1/production/getProductionList';
		$.ajax({
			type : "POST",
			url : url,
			traditional : true,
			success : function(rs) {
				alert(rs);
			}
		});