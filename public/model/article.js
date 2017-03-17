jQuery.ajaxSetup({
		cache : false
	});
$(function() {
	var url = '/api/v1/article/getArticleList';
	$.ajax({
				type : "POST",
				url : url,
				traditional : true,
				success : function(rs) {
					if(rs){
						bindData(rs.data);
					}
				}
				
		});				
});

function bindData(data){
	 $.each(data, function(index, item) {
	 	var type="";
	 	if(item.type == 3){
	 		type = "<a href='' rel='bookmark'><figure class='post-figure'><img src='"+item.headerImage+"' alt=''></figure></a>\
								<span class='post-play'><i class='ace-icon ace-icon-play'></i></span>";
	 	}else if(item.type == 2){
	 		var imgs = item.resources.split(",");
	 		type="<div class='post-slider slider'>";
	 		if(imgs.length>0){
	 			
	 			$.each(imgs, function(index, img) {
	 				type += "<div><a href='"+item.url+"' rel='bookmark'><img src='"+img+"' alt=''></a></div>";
	 			});
	 		}
	 		type += "</div>";
	 	}else if(item.type=1){
	 		type = "<a href='' rel='bookmark'><figure class='post-figure'><img src='"+item.headerImage+"' alt=''></figure></a>";
	 	}
	 	var str="<article class='post hentry'>\
							<div class='post-media'>"+type+"\
							</div>\
							<div class='padd-box-sm'>\
								<header class='post-header text-center'>\
									<h2 class='post-title entry-title text-upper'><a rel='bookmark' href='single-image.html'>"+item.title+"</a></h2>\
									<div class='post-header-info'>\
										<span class='posted-on'><span class='screen-reader-text'>Posted on </span>\
										<a href='' rel='bookmark'>\
												<time class='post-date published' datetime='2016-07-04T11:33:08+00:00'>"+item.createDate+"</time>\
												<time class='post-date updated' datetime='2016-12-08T14:45:55+00:00'>"+item.modifyDate+"</time>\
											</a></span>\
										&nbsp;<span class='post-author vcard'>by <a class='url fn n' href='' rel='author'>"+item.author+"</a></span>\
									</div>\
								</header>\
								<div class='post-content entry-content editor clearfix clear-mrg'>\
									<p>"+item.excerpt+"</p>\
								</div>\
								<footer class='post-footer'>\
									<div class='post-footer-top brd-btm clearfix'>\
										<div class='post-footer-info'>\
												<span class='post-cat-links'><span class='screen-reader-text'>Categories</span>\
												<a href='#' rel='category tag'>"+item.tag+"</a>\
												</span><span class='post-line'>|</span>\
												<a href='' class='post-comments-count'>0 comments</a>\
										</div>\
										<div class='post-more'>\
											<a class='btn btn-sm btn-primary' href='"+item.url+"' rel='bookmark'>Read More</a>\
										</div>\
									</div>\
								</footer>\
							</div>\
						</article><!-- .post -->";
	$("#articles").append(str);
	});
	
}