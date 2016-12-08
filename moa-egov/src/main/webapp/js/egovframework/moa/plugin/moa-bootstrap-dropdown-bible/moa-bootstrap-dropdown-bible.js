/*
 * 번역본/성경 목록 드롭다운
 * 작성자 : 최우진(woojin.choi)
 * 작성일 : 2016.09.20
 * 
 */

var MoaBibleDropDown = {

		options : {
			callback: null
		},
		
		callInit : function( options_ )
		{
				MoaBibleDropDown.options = $.extend(MoaBibleDropDown.options, options_);
			
				// chapter 목록을 불러온다.
				MoaBibleDropDown.callChapter();
				
				// 1. 성경 목록 클릭시 선택된 목록의 값이 셋팅되도록
				// 2. chapter dropdown 목록을 다시 불러온다.
				$.moaBootstrapDropdown({
					target: $("[id='searchVo.sortSeqNo.layer']"),
					hiddenObj: $("[name='searchVo.sortSeqNo']"),
					callback: function() { MoaBibleDropDown.callChapter() }
				});
			
				// 1. 번역본의 목록 클릭시 선택된 목록의 값이 셋팅되도록
				// 2. 성경 dropdown 목록을 다시 불러온다.
				$.moaBootstrapDropdown({
					target: $("[id='searchVo.translateSeqNo.layer']"),
					hiddenObj: $("[name='searchVo.translateSeqNo']"),
					callback: function() { MoaBibleDropDown.callSort() }
				});
		},
		
		addSort : function( language, widthCount, jsonObjNew )
		{
				if( language = "KO")
				{
							// '성경 전체'를 넣는다.
							jsonObjNew.push({
								seqNo: "0",
								everSeqNo: "0",
								testament: "",
								chapterNum: "0",
								enumName: "성경 전체",
								nameShort: "성경 전체",
								name: "성경 전체",
								language: language,
								className: "all"
							});
	
							// '구약 전체'를 넣는다.
							jsonObjNew.push({
								seqNo: "0",
								everSeqNo: "0",
								testament: "old",
								chapterNum: "0",
								enumName: "구약 전체",
								nameShort: "구약 전체",
								name: "구약 전체",
								language: language,
								className: "all"
							});
	
							// '신약 전체'를 넣는다.
							jsonObjNew.push({
								seqNo: "0",
								everSeqNo: "0",
								testament: "new",
								chapterNum: "0",
								enumName: "신약 전체",
								nameShort: "신약 전체",
								name: "신약 전체",
								language: language,
								className: "all"
							});
				}
				else if( language = "EN")
				{
						// All Bible
						jsonObjNew.push({
							seqNo: "0",
							everSeqNo: "0",
							testament: "",
							chapterNum: "0",
							enumName: "All Bible",
							nameShort: "All Bible",
							name: "All Bible",
							language: language,
							className: "all"
						});
	
						// Old Testament
						jsonObjNew.push({
							seqNo: "0",
							everSeqNo: "0",
							testament: "old",
							chapterNum: "0",
							enumName: "Old Testament",
							nameShort: "Old Testament",
							name: "Old Testament",
							language: language,
							className: "all"
						});
	
						// New Testament
						jsonObjNew.push({
							seqNo: "0",
							everSeqNo: "0",
							testament: "new",
							chapterNum: "0",
							enumName: "New Testament",
							nameShort: "New Testament",
							name: "New Testament",
							language: language,
							className: "all"
						});
				}
	
				// 첫째줄 나머지에 '공백'을 넣는다.
				for( var i = 0; i < widthCount - 3; i++ )
				{
						jsonObjNew.push({
							seqNo: "",
							everSeqNo: "",
							chapterNum: "",
							enumName: "",
							nameShort: "",
							name: "",
							language: language,
							testament: "",
							className: ""
						});
				}
				
				return jsonObjNew;
		},
		
		changeSort : function( jsonObj )
		{
				var firstCount = 0;
				var widthCount = 5;
				var jsonObjNew = [];

				if( jsonObj )
				{
						var language = jsonObj[0].language;
						
						// 검색모드면 '성경전체/구약전체/신약전체'를 추가한다.
						if( $("[name=mode]").val() == "search" ) {
							jsonObjNew = MoaBibleDropDown.addSort( language, widthCount, jsonObjNew );
							firstCount = jsonObjNew.length;
						}

						// jsonObj 데이타를 넣는다.
						var k = 0;
						var prevTestament = "";
						var jsonLength = jsonObj.length;
						for( var i = 0; i < jsonLength; i++ )
						{
							if( prevTestament && prevTestament != jsonObj[i].testament ) {
								jsonObjNew.push({
									seqNo: "",
									everSeqNo: "",
									chapterNum: "",
									enumName: "",
									nameShort: "",
									name: "",
									language: language,
									testament: "",
									className: ""
								});
								
								k++;
							}
							
							if( jsonObj[i].testament == "new" ) jsonObj[i].className = "white";

							jsonObjNew[ firstCount + i + k ] = jsonObj[i];
							prevTestament = jsonObj[i].testament;
						}
				}

				return jsonObjNew;
		},
		
		callSort : function()
		{
			    $.ajax({
			        type: "POST",
			        url: "/moa/bible/bibleBySortListAjax.do",
			        data: "searchVo.translateSeqNo="+ $("[name='searchVo.translateSeqNo']").val(),
			        dataType: "json",
			        success: function( jsonObj )
			        {
							$("[id='searchVo.sortSeqNo.layer']").moaBootstrapDropdown({
								json: MoaBibleDropDown.changeSort( jsonObj ),
								hiddenName: "searchVo.sortSeqNo",
								widthCount: 5,
								onclick:  function() { MoaBibleDropDown.callChapter() },
								callback: function() { MoaBibleDropDown.callChapter() }
							});
			        },
			        error: function() {
			            	alert("호출에 실패했습니다.");
			        }
			    });
			
				/*
				 * 원래 아래 소스가 맞음.
				 * 그러나, 전체/구약/신약 등으로 구분해야 하므로 위소스로 변경함
				 * --------------------------------------------------------------------------------
						$("[id='searchVo.sortSeqNo.layer']").moaBootstrapDropdown({
							url: "/moa/bible/bibleBySortListAjax.do",
							params: "searchVo.translateSeqNo="+ $("[name='searchVo.translateSeqNo']").val(),
							hiddenName: "searchVo.sortSeqNo",
							widthCount: 5,
							onclick:  function() { MoaBibleDropDown.callChapter() },
							callback: function() { MoaBibleDropDown.callChapter() }
						});
				 * --------------------------------------------------------------------------------
				*/
		},
		
		callChapter : function()
		{
				var jsonData = [];
				var chapterNum = parseInt( $("[id='searchVo.sortSeqNo.layer']").find(".dropdown-menu [role=presentation] a[seq-no="+ $("[name='searchVo.sortSeqNo']").val() +"]").attr("chapter-num") );
				var lang = $("[id='searchVo.sortSeqNo.layer']").find(".dropdown-menu [role=presentation] a[seq-no="+ $("[name='searchVo.sortSeqNo']").val() +"]").attr("language");

				if( chapterNum > 0 ) {
					for( var i = 1; i <= chapterNum; i++ ) {
						jsonData.push({seqNo:i, code:i, name:""+ i +""});
					}
				}

				$("[id='searchVo.chapter.layer']").moaBootstrapDropdown({
					json: jsonData,
					hiddenName: "searchVo.chapter",
					widthCount: 10,
					onclick:  function() {
						if( MoaBibleDropDown.options.callback ) MoaBibleDropDown.options.callback.call();
					},
					callback: function() {
						if( MoaBibleDropDown.options.callback ) MoaBibleDropDown.options.callback.call();
					}
				});
		},
		
		callSortDropdown : function()
		{
				$("[id='searchVo.translateSeqNo.layer']").find(".dropdown-menu [role=presentation] a.active").trigger("click");
		},
		
		changeMode : function( mode )
		{
				if( mode == "view" ) {
					$(".search-mode").hide();
					$(".view-mode").show();
					$("[name=mode]").val( "view" );
					MoaBibleDropDown.callSortDropdown();
				}
				else if( mode == "search" )
				{
					$(".search-mode").show();
					$(".view-mode").hide();
					$("[name=mode]").val( "search" );
					$("[name='searchVo.words']").focus();
					MoaBibleDropDown.callSortDropdown();
				}
		},
		
		event : function()
		{
				$("[name='searchVo.words']").keyup(function(){
					if( event.keyCode == 13 ) {
						if( typeof( doSearch ) == "function" ) {
							doSearch();
						}
					}
				});
			
				$("#searchButton").click(function(){
					if( typeof( doSearch ) == "function" ) {
						doSearch();
					}
				});
			
				$("#searchModeButton").click(function(){
					MoaBibleDropDown.changeMode("search");
				});
				
				$("#viewModeButton").click(function(){
					MoaBibleDropDown.changeMode("view");
				});
		}
};


$(function(){

		// jstl로 그려준 dropdown 목록에 event를 셋팅한다.
		MoaBibleDropDown.callInit({
			callback: function(){

				// 보기모드일 경우에만, chapter 선택시 실행되도록 한다.
				if( typeof( doSearch ) == "function" ) {
					if( $("[name=mode]").val() == "view" ) {
						doSearch();
					} else {
						if( $.trim( $("[name='searchVo.words']").val() ) != "" ) {
							doSearch();
						}
					}
				}
			}
		});
		
		// event 함수 실행
		MoaBibleDropDown.event();
});