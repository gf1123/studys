$(document).ready(function(){
	var $tab_li = $('#tab ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.tab_box > div').eq(index).show().siblings().hide();

	});	
});
$(document).ready(function(){
	var $tab_li = $('#tab_pic ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected_pic').siblings().removeClass('selected_pic');
		var index = $tab_li.index(this);
		$('div.tab_box_pic > div').eq(index).show().siblings().hide();

	});	
});

$(document).ready(function(){
	var $tab_li = $('#header_tab ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.header_tab_ul_content > div').eq(index).show().siblings().hide();

	});	
});







