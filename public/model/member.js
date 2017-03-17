jQuery.ajaxSetup({
		cache : false
	});
$(function() {
	var url = '/api/v1/member/getMemberList';
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
	 	var str="<div class='ref-box brd-btm hreview'>\
                    <div class='ref-avatar'>\
                        <img alt='"+item.nickName+"' src='"+item.avatar+"' class='avatar avatar-54 photo' height='54' width='54'>\
                    </div>\
                    <div class='ref-info'>\
                        <div class='ref-author'>\
                            <strong>"+item.nickName+"</strong>\
                            <span>"+item.tag+"</span>\
                        </div>\
                        <blockquote class='ref-cont clear-mrg'>\
                            <p>"+item.description+"</p>\
                        </blockquote>\
                    </div>\
                </div><!-- .ref-box -->";
        var site="<li><a href='"+item.site+"'><img src='"+item.avatar+"' alt='"+item.nickName+"'></a></li>";
	$("#members").append(str);
    $("#sites").append(site);
	});
	
}