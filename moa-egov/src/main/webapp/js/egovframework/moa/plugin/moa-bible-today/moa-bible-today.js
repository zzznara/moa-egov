
/* 
 * # moa-today-bible.js 파일 설명
 * -------------------------------------------------------------------------------
 * - 오늘의 말씀 목록에 액션을 더해 줍니다.
 * -------------------------------------------------------------------------------
 * 생성자 : 최우진
 * 생성일 : 2016.10.05
 * 
 */

var MoaBibleToday = {

		/**
		 * 오늘의 말씀에 배경색을 넣는다.
		 * 오늘의 말씀이 아니면 추가 아이콘을 넣는다.
		 */
		active : function()
		{
				$("#repeatArea tr").each(function(){
					
						var todaySeqNo = $(".today-seq-no", $(this)).html();
						var $iconObj = $(this).find(".today-icon");

						//오늘의 말씀이라면..
						if( todaySeqNo )
						{
								$(this).addClass("bg-success");
	
								$(this).mouseover(function(){
										$iconObj.css({"padding-left": "5px"});
										$iconObj.addClass("glyphicon");
										$iconObj.addClass("glyphicon-minus-sign");
										$iconObj.addClass("text-danger");
										$iconObj.click( MoaBibleToday.remove( $iconObj ) );
								});
								$(this).mouseout(function(){
										$iconObj.css({"padding-left": "5px"});
										$iconObj.removeClass("glyphicon");
										$iconObj.removeClass("glyphicon-minus-sign");
										$iconObj.removeClass("text-danger");
										$iconObj.unbind("click");
								});
						}
						
						// 오늘의 말씀이 아니라면..
						else
						{
								$(this).mouseover(function(){
										$iconObj.css({"padding-left": "5px"});
										$iconObj.addClass("glyphicon");
										$iconObj.addClass("glyphicon-plus-sign");
										$iconObj.addClass("text-primary");
										$iconObj.click( MoaBibleToday.add( $iconObj ) );
								});
								$(this).mouseout(function(){
										$iconObj.css({"padding-left": "5px"});
										$iconObj.removeClass("glyphicon");
										$iconObj.removeClass("glyphicon-plus-sign");
										$iconObj.removeClass("text-primary");
										$iconObj.unbind("click");
								});
						}
				});
		},

		/* 선택된 말씀의 정보를 셋팅한다. */
		selectedWords : function( obj, mode )
		{
				var translateSeqNo = obj.parents("tr").find(".translate-seq-no").html();
				var sortSeqNo = obj.parents("tr").find(".sort-seq-no").html();
				var sortName = obj.parents("tr").find(".sort-name").html();
				var chapter = obj.parents("tr").find(".chapter").html();
				var verse = obj.parents("tr").find(".verse").html();
				var words = obj.parents("tr").find(".words").html();
				var titleName = "오늘의 말씀에 추가하시겠습니까?";
				if( mode == "delete" ) titleName = "오늘의 말씀을 삭제하시겠습니까?";
				
				$("#saveLayerToday .bible-today-title").empty().html( titleName );
				$("#saveLayerToday .selected-words").empty().html( words );
				$("#saveLayerToday .selected-index").empty().html("["+ sortName + " " + chapter + ":"+ verse +"]");
				
				$("#bibleTodayForm [name='mode']").val( mode );
				$("#bibleTodayForm [name='bibleVo.translateSeqNo']").val( translateSeqNo );
				$("#bibleTodayForm [name='bibleVo.sortSeqNo']").val( sortSeqNo );
				$("#bibleTodayForm [name='bibleVo.chapter']").val( chapter );
				$("#bibleTodayForm [name='bibleVo.verse']").val( verse );
		},
		
		/* 해당 말씀을 오늘의 말씀에 추가한다. */
		add : function( obj )
		{
				// 선택된 말씀의 정보를 layer popup에 셋팅한다.
				MoaBibleToday.selectedWords( obj, "add" );
			
				obj.magnificPopup({
					  items: {
					      src: '#saveLayerToday',
					      type: 'inline'
					  },
					  closeBtnInside: false
				});
		},
		
		/* 해당 말씀을 오늘의 말씀에서 제거한다. */
		remove : function( obj )
		{
				// 선택된 말씀의 정보를 layer popup에 셋팅한다.
				MoaBibleToday.selectedWords( obj, "delete" );
				
				obj.magnificPopup({
					  items: {
					      src: '#saveLayerToday',
					      type: 'inline'
					  },
					  closeBtnInside: false
				});
		},
		
		doExists : function()
		{
			    $.ajax({
			        type: "post",
			        url: "existsBibleTodayCount.do",
			        data: $("[name=bibleTodayForm]").serialize(),
			        dataType: "text",
			        success: function( resultText )
			        {
				        	if( resultText == 0 ) {
				        		MoaBibleToday.doSave();
				        	} else {
				        		alert( message.alert.existsTodayWords );
				        		$.magnificPopup.close();
				        	}
			        },
			        error: function() {
			            	alert( message.alert.ajaxFail );
			        }
			    });
		},
		
		doSave : function()
		{			
			    $.ajax({
			        type: "post",
			        url: "saveBibleTodayAjax.do",
			        data: $("[name=bibleTodayForm]").serialize(),
			        dataType: "text",
			        success: function( resultText )
			        {
				        	if( resultText == "SUCCESS" ) {
				        		alert( message.alert.saveComplete );
				        		$.magnificPopup.close();
				        		doSearch();
				        	} else {
				        		alert( message.alert.saveFail );
				        	}
			        },
			        error: function() {
			            	alert( message.alert.ajaxFail );
			        }
			    });
		},
		
		doDelete : function()
		{
			    $.ajax({
			        type: "post",
			        url: "deleteBibleTodayAjax.do",
			        data: $("[name=bibleTodayForm]").serialize(),
			        dataType: "text",
			        success: function( resultText )
			        {
				        	if( resultText == "SUCCESS" ) {
				        		alert( message.alert.deleteComplete );
				        		$.magnificPopup.close();
				        		doSearch();
				        	} else {
				        		alert( message.alert.deleteFail );
				        	}
			        },
			        error: function() {
			            	alert( message.alert.ajaxFail );
			        }
			    });
		},
		
		/* event 함수 */
		event :
		{
				save : function()
				{
						$(".save-today-button").click(function(){
							var mode = $("#bibleTodayForm [name='mode']").val();
							if( mode == "add" ) MoaBibleToday.doExists();
							else if( mode == "delete" ) MoaBibleToday.doDelete();
						});
				},
				
				cancel : function()
				{
						$(".hide-today-button").click(function(){
							$.magnificPopup.close();
						});
				}
		}
}


$(function(){
		MoaBibleToday.event.save();
		MoaBibleToday.event.cancel();
});
