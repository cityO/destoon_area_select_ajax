/*
  	作者：艺灵设计 
  	时间：2016-01-21
  	描述：查询destoon的“省市县地区数据库”信息
  	来源：www.yilingsj.com
  	版权：请使用此源码的看官自主保留版权信息，以便尊重创作者及方便后期获取更新文件，谢谢！
*/


/*方便后面调用*/
var param = new Array();
var $ylsj_id=0;
function yilingsj_select_area(v1,$hd_idx){
	if(!param[v1]){/*点击时如果没有就重新生成*/
	$.get("/ajax-gov-cat.php",{pid:v1},function(data){
			var str="";
			for(var i=0;i<data.length;i++){
			str+='<span class="ylsj-SAC-span" data-aid="'+data[i]["govid"]+'" title="'+data[i]["govname"]+'">'+data[i]["govname"]+'<\/span>';
			};
			param[v1] = str;
			$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city:eq('+$hd_idx+')').html(param[v1]);
		},'json');
	}else{
		$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city:eq('+$hd_idx+')').html(param[v1]);
	}
}
$(function(){
	//获取id序号
	$('.ylsj-SA-inp').attr('data-aid',0);
	//点击时显示隐藏切换
	var $y_div=$('.ylsj-SA-div');
	var $y_inp=$y_div.find('.ylsj-SA-inp');
	var $y_city=$y_div.find('.ylsj-SA-city');
	$y_div.on({mousedown:function(){
		//获取id序号，可以一页面添加多个相同的模板
		$ylsj_id=$(this).parents('.ylsj-select-areaw').data('id');
		$(this).find('.ylsj-SA-city').stop().fadeIn(400);
	},mouseleave:function(){
		$(this).find('.ylsj-SA-city').fadeOut(200);
	}});
	$(document).on('mouseover','.ylsj-SAC-span',function(){
		$(this).addClass('on');
	});
	$(document).on('mouseleave','.ylsj-SAC-span',function(){
		$(this).removeClass('on');
	});

	$(document).on('mousedown','.ylsj-SAC-span',function(){
		v1=$(this).attr('data-aid');
		var $hd_idx = $(this).parents('.ylsj-SA-city').index('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-list .ylsj-SA-city');
		$(this).parents('.ylsj-SA-city').fadeOut(200).siblings('.ylsj-SA-inp').text($(this).text()).attr('data-aid',$(this).attr('data-aid'));
		$hd_idx=$hd_idx+1;
		yilingsj_select_area(v1,$hd_idx);
		switch ($hd_idx){
			case 0:
			case 1:
				if($('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_1').attr('data-aid')!=0){
					$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_1').text("请选择机构所属");
				}
				if($('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_2').attr('data-aid')!=0){
					$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_2').text("请选择机构分类");
				}
				break;
			case 2:
			
				if($('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_2').attr('data-aid')!=0){
					$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_2').text("请选择机构具体分类");
				}
				break;
			default:
				break;
		}
		//选择城市后传递值
		var str_city=$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_0').text()+'/'+$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_1').text()+'/'+$('.ylsj-select-areaw[data-id='+$ylsj_id+'] .ylsj-SA-city_2').text();
		$('.ylsj-site[data-id='+$ylsj_id+']').text(str_city);
		
		if($('.ylsj-aid').length){
			//$('.ylsj-aid[data-id='+$ylsj_id+']').text(v1);
			$('.ylsj-aid[data-id='+$ylsj_id+']').val(v1);
		}

	});
	
	//点击时加载省份
	$('.ylsj-SA-city_0').on('click',function(){
		yilingsj_select_area(0,0);
	});
	

});