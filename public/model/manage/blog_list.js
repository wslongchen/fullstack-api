jQuery.ajaxSetup({
		cache : false
	});
$(function() {
		initTable();
		$("#btn_add").on("click",function(){
			add_article();
		});
});

function add_article(){
	$("#content-page").load("/templates/manage_blog_add.html");
}

function initTable(){
	$("#list_article").bootstrapTable({
		striped: false,
		pagination: false,
		pageList: [10,20],
		pageSize:10,
		pageNumber:1,
		search: true,
		queryParamsType: "limit",
		sidePagination: "server",
		toolbar: '#toolbar',
		responseHandler: responseHandler,
		showExport: true,                     //是否显示导出
		exportDataType: "basic",
		detailView: false,
		exportOptions:{fileName:"FullStack"},
		onLoadSuccess: function(){ 
		},
		columns : [
		{
            checkbox: true
            },{
			field : "title",
			title : "名称",
			align : "center",
			
		}, {
			field : "author",
			title : "作者",
			align : "center"
		}]
	});
}

// 查询参数处理器
function queryParams(params) {
	var pageSize = params.limit;
	var pageNumber = (params.offset / pageSize) + 1;
	var objHours = "24";
	//addCookie("pageNo", pageNumber, objHours);
	return {
		"pageSize" : pageSize,
		"pageNo" : pageNumber
	};
}

// 服务端返回处理器
function responseHandler(res) {
	if(res.totalCount != null){
		//addCookie("totalCount", res.totalCount, "24");
		alert(res.totalCount);
	}
	//addCookie("totalAll", res.totalAll, "24");
	if (res) {
		return {
			"rows" : res.data,
			"total" : 0
		}
	} else {
		return {
			"rows" : [],
			"total" : 0
		}
	}
}