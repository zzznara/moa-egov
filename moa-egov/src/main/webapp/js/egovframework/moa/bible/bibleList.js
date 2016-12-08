/**
 *
 * 파일명 : bibleList.js
 * 설 명 : 성경 목록 자바스크립트
 *
 *     수정일       수정자      Version      내용
 * -----------  ---------  ----------  ----------------------------
 *  2015.06.23    최우진        1.0        최초생성
 *
 */


$(function(){
	
		// event 함수
		funcEvent();
});

/* event함수 셋팅 */
function funcEvent()
{

}

/* validate 체크 */
function validateSearch()
{
		if( $("[name=mode]").val() == "search" )
		{
				if( $.trim( $("[name='searchVo.words']").val() ) == "" ) {
					alert("검색어를 입력해 주세요.");
					$("[name='searchVo.words']").focus();
					return false;
				}
		}
		
		return true;
}

/* 검색 */
function doSearch( pageIndex )
{
		if( !pageIndex ) pageIndex = 1;
		$("[name='searchVo.pageIndex']").val( pageIndex );
	
		if( validateSearch() == false ) return;

		doListAjax( $("[name=mode]").val() );
}

/* 보기모드에서의 ajax 호출 */
function doListAjax( mode )
{
		if( mode == "view")
		{
				// 페이지번호 안보이게 처리
				$(".pagination").hide();
			
				// 목록을 불러온다.
				$("#listArea").moaSearch({
					listUrl: "bibleListAjax.do",
					form: $("#bibleForm"),
					isSearchCount: false,
					isUsePage: false,
					keyJson: [
					          		{obj:".translate-seq-no", jsonKey:"translateSeqNo"},
					          		{obj:".sort-seq-no", jsonKey:"sortSeqNo"},
					          		{obj:".sort-name", jsonKey:"sortName"},
					          		{obj:".chapter", jsonKey:"chapter"},
					          		{obj:".verse", jsonKey:"verse"},
					          		{obj:".today-seq-no", jsonKey:"todaySeqNo"},			          		
					          		{obj:".words", jsonKey:"words"}
					          	],
					callListAfter: function()
					{
							// 검색 결과수 출력된 내용을 제거한다.
							$("#listArea .panel-heading .count-area").empty();
						
							// 목록 위에 "창세기 1장 [개역개정]" 이렇게 타이틀을 출력한다.
							var str = $("[id='searchVo.sortSeqNo.layer'] .dropdown-menu [role=presentation] a[seq-no="+ $("[name='searchVo.sortSeqNo']").val() +"]").attr("text")
									   + " "
									   + $("[id='searchVo.chapter.layer'] .dropdown-menu [role=presentation] a[seq-no="+ $("[name='searchVo.chapter']").val() +"]").attr("text")
									   + "장 "
									   + "["+ $("[id='searchVo.translateSeqNo.layer'] .dropdown-menu [role=presentation] a[seq-no="+ $("[name='searchVo.translateSeqNo']").val() +"]").attr("text") +"]"
									   ;
							$("#listArea .panel-heading .heading-text").html( "<strong>"+ str +"</strong>" );

							// 보기모드는, verse는 보이고, search-index를 숨긴다.
							$("#listArea .search-index").hide();
							$("#listArea .verse").show();
							$("#listArea .search-index").each(function(){
								$(this).empty();
							});
							
							// 오늘의 말씀 관련 함수 실행
							MoaBibleToday.active();
					}
				});
		}
		else if( mode == "search" )
		{
				// 페이지번호 보이게 처리
				$(".pagination").show();
				
				// 목록을 불러온다.
			    $.ajax({
			        type: "POST",
			        url: "bibleSearchListAjax.do",
			        data: $("[name=bibleForm]").serialize(),
			        dataType: "json",
			        success: function( jsonObj )
			        {
							$("#listArea").moaSearch({
								listJson: jsonObj,
								form: $("#bibleForm"),
								pageIndex: $("[name='searchVo.pageIndex']").val(),
								listCountUrl: "bibleSearchListCountAjax.do",
								totalCountObj: $("#listArea .panel-heading .count-area").empty().append( "<strong>총 <font color='red'><span class='total-count'>0</span></font>건</strong>" ).find(".total-count"), 
								keyJson: [
								          		{obj:".translate-seq-no", jsonKey:"translateSeqNo"},
								          		{obj:".sort-seq-no", jsonKey:"sortSeqNo"},
								          		{obj:".sort-name", jsonKey:"sortName"},
								          		{obj:".chapter", jsonKey:"chapter"},
								          		{obj:".verse", jsonKey:"verse"},
								          		{obj:".search-index", jsonKey:"rnum"},
								          		{obj:".today-seq-no", jsonKey:"todaySeqNo"},
								          		{obj:".words", jsonKey:"words"}
								          	],
								callListAfter: function()
								{									
										// 목록 위에 "창세기 1장 [개역개정]" 이렇게 타이틀을 출력한다.
										var $selSortObj = $("[id='searchVo.sortSeqNo.layer'] [role=button]").clone();
										var $selTranseObj = $("[id='searchVo.translateSeqNo.layer'] [role=button]").clone();
										$selSortObj.children("span").remove();
										$selTranseObj.children("span").remove();
										
										var str = " - "
												   + $selSortObj.html()
												   + " "
												   + "["+ $selTranseObj.html() +"] "
												   + "검색 결과"
												   ;
										$("#listArea .panel-heading .heading-text").html( "<strong>"+ str +"</strong>" );
										
										// 검색모드는, verse는 숨기고, search-index는 보여준다.
										$("#listArea .search-index").show();
										$("#listArea .verse").hide();
										
										// 오늘의 말씀 관련 함수 실행
										MoaBibleToday.active();
								}
							});
			        },
			        error: function() {
			            	alert("호출에 실패했습니다.");
			        }
			    });
		}

}