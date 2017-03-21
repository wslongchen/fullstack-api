jQuery.ajaxSetup({
		cache : false
	});
$(function() {
	var editor = CKEDITOR.replace('comment');
	$('#btn_submit').on('click',function(){
		upload();
	});
	$('.fileupload').change(function(event) {
        /* Act on the event */
        upload();
    });
});

function upload(){
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
                        error: function() {
                            console.log('error');
                        }
                });
            } 
        }
}
