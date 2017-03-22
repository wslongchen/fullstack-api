jQuery.ajaxSetup({
	cache : false
});
$(function() {
	var editor = CKEDITOR.replace('comment');
	$('#btn_submit').on('click',function(){
		comment();
	});
});
function comment(){
	var title = $('#name').val();
	var type = $('#type').val();
	var id="a"+Date.now();
	var url="/web/blog/single?aid="+id;
	var excerpt=$('#excerpt').val();
	var content=CKEDITOR.instances.comment.getData();
	if(content.trim()==""){
		alert("内容不能为空！");
		return;
	}
	var resources="";
	var headerImage="";
	if(type!=0){
		var imgReg = /<img.*?(?:>|\/>)/gi;
		//匹配src属性
		var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
		var arr = content.match(imgReg);
		for (var i = 0; i < arr.length; i++) {
			var src = arr[i].match(srcReg);
			 //获取图片地址
			 if(src[1]){
			 	if(resources==""){
			 		resources=src[1];
			 		headerImage=src[1];
			 	}else{
			 		resources=resources+","+src[1];
			 	}
			}
		}
	}
			var data={aid:id,title:title,author:'MrPan',type:type,excerpt:excerpt,content:content,
				headerImage:headerImage,resources:resources,url:url};
			$.ajax({
	        type: 'POST',
	        url: '/api/v1/article/addArticle',
	        data: data,
	        success: function(data){
	          if(data.code==0){
	            $("#content-page").load("/templates/manage_blog.html");
	          }else{
	            alert(data.msg);
	          }
	        },
	        error: function(){
	          alert('服务器出错');
	        }
	      });

		}

		function uploadImage(){
			if ($('#idFile').val().length) {
				var fileName = $('#idFile').val();
				var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
				if (extension == ".jpg" || extension == ".png") {
					var data = new FormData();
					data.append('upload', $('#idFile')[0].files[0]);
					$.ajax({
						url: '/api/v1/article/uploadImage',
						type: 'POST',
						data: data,
						cache: false,
                        contentType: false, //不可缺参数
                        processData: false, //不可缺参数
                        success: function(data) {
                        	console.log(data);
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                        	alert("服务器错误！");
                        }
                    });
				} 
			}
		}
