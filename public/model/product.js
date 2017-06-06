jQuery.ajaxSetup({
		cache : false
	});
$(function() {
	var url = '/api/v1/production/getProductionList';
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
    var falgs= new Array();
    var str="<button data-filter='*'>all</button>";
	 $.each(data, function(index, item) {

	 	//图片描述
	 	var li="<div class='pf-grid-item "+item.type+"'><div class='project'><figure class='portfolio-figure'><img src='"+item.img+"' alt=''></figure><div class='portfolio-caption text-center'><div class='valign-table'><div class='valign-cell'><h2 class='text-upper'>"+item.name+"</h2><p>"+item.description+"</p>"
        +"<a href='#pf-popup-7' class='pf-btn-view btn btn-primary'>View More</a></div></div></div></div><div id='pf-popup-7' class='pf-popup clearfix'><div class='pf-popup-col1'>"
        +"<div class='sss clear-mrg' >"
         +"<img src='"+item.img+"' alt='' ></div></div><div class='pf-popup-col2'>"
        +"<div class='pf-popup-info clear-mrg'><h2 class='text-upper'>"+item.name+"</h2><p class='text-muted'><strong>"+item.tag+"</strong></p><dl class='dl-horizontal'><dt>Date:</dt><dd>"+item.time+"</dd><dt>Site link:</dt><dd><a href='"+item.url+"'>"+item.url+"</a></dd><dt>Client:</dt><dd>11 Jan 2012</dd>"
        +"</dl><p>"+item.content+" </p></div><!-- .pf-popup-info --></div><!-- .pf-popup-col2 --></div><!-- .pf-popup --></div>";
	$("#products").append(li);	
        // alert(li);
        if(falgs.length>0){
            for(var i=0;i<falgs.length;i++){
                if(!contains(falgs,item.type)){
                     str+="<button data-filter='."+item.type+"'>"+item.type+"</button>";
                    falgs[index]=item.type;
                }
            }
        }else{
                falgs[index]=item.type;
                str+="<button data-filter='."+item.type+"'>"+item.type+"</button>";
        }
         

	});
        
$("#flags").append(str);  
	
}

function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  