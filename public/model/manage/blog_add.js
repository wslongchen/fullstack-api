jQuery.ajaxSetup({
		cache : false
	});
$(function() {
	var editor = CKEDITOR.replace('comment');
	$('btn_submit2').on('click',function(){
		upload();
	});
});

function upload(){
	var data = new FormData();  
	files = $("#idFile")[0].files;  
	if(files){  
    data.append("file", files[0]);  
	data.append("CompanyPicAddress","123");    
  
$.ajax({  
    type: 'post',  
    dataType: 'json',  
    url:'/api/v1/article/uploadImage',  
    data : data,  
    contentType: false,  
    processData: false,  
    success : function (data, textStatus){            
    },  
    error:function(XMLHttpRequest, textStatus, errorThrown){  
          
    }  
}); 
}