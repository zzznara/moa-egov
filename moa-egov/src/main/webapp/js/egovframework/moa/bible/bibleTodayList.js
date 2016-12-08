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

		// init 함수
		funcInit();
	
		// event 함수
		funcEvent();
});

/* init 함수 */
function funcInit()
{
		$("[name=mode]").val( "search" );
}

/* event함수 셋팅 */
function funcEvent()
{

}

/* validate 체크 */
function validateSearch()
{		
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