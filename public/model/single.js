jQuery.ajaxSetup({
	cache : false
});
$(function() {
	var aid=$("#aid").val();
	var url = '/api/v1/article/getArticle?aid='+aid;
	$.ajax({
		url: url,
		type: 'POST',
		cache: false,
        contentType: false, //不可缺参数
        processData: false, //不可缺参数
        success: function(data) {
            bindData(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	alert("服务器错误！");
        }
    });
});

function bindData(data){
	$('#single_title').html(data.data[0].title);
	$('#single_time').html(data.data[0].createDate);
	$('#single_author').html(data.data[0].author);
	//$('#single_content').append(data.data[0].content);
	/*var converter = new showdown.Converter();
    //进行转换
    var html = converter.makeHtml(data.data[0].content);*/
    //展示到对应的地方  result便是id名称
	$("#single_content").append(data.data[0].content);
	$("#single_tag").html(data.data[0].tag);
	var type=data.data[0].type;
	var item=data.data[0];
	var media="";
	if(type==2){
		var imgs = item.resources.split(",");
	 		media="<div class='post-slider slider'>";
	 		if(imgs.length>0){
	 			
	 			$.each(imgs, function(index, img) {
	 				media += "<div><a href='"+item.url+"' rel='bookmark'><img src='"+img+"' alt='123'></a></div>";
	 			});
	 			flag=true;
	 		}
	 		media += "</div>";
	}else if(type==3){
		media = "<a href='' rel='bookmark'><figure class='post-figure'><img src='"+item.headerImage+"' alt=''></figure></a>\
								<span class='post-play'><i class='ace-icon ace-icon-play'></i></span>";
	}
	else if(type==1){
		media = "<a href='' rel='bookmark'><figure class='post-figure'><img src='"+item.headerImage+"' alt=''></figure></a>";
	}

	var str="<div class='post-media'>\
			"+media+"</div>";
	if(type==0){
		 $("#single_media").hide();
	}else{
		$("#single_media").append(str);
		$('.slider').slick({
            dots: true,
            fade : true,
            autoplay:true,
            autoplaySpeed : 3000
        });
	}
}