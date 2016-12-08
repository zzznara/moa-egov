/*
 * 목록의 페이지번호를 부트스트랩 UI로 출력해주는 jQuery Plugin
 * 작성자 : 최우진(http://zzznara2.tistory.com)
 * 작성일 : 2016.07.22
 * 
 * #파리미터 설명
 *  - total_row_count : 게시물 총 갯수
 *  - page_row_count : 보여질 게시물 목록 수
 *  - page_block_count : 보여질 페이지 링크 수
 *  - current_page_no : 현재 페이지 번호
 *
 * #사용법
 * $("#객체ID명").moaBootstapPagination( total_row_count, page_row_count, page_block_count, current_page_no );
 * $("[id='객체ID명']").MoaBootstapPagination( total_row_count, page_row_count, page_block_count, current_page_no );
 * 
 */


jQuery(function($)
{
	$.fn.moaBootstapPagination = function( total_row_count, page_row_count, page_block_count, current_page_no, obj_current_page_name )
	{
		// 레이아웃 셋팅
		var $thisPaginationObj = this;
		var $thisPaginationObj_ = this.clone();
		var $previousPageObj_ = $thisPaginationObj_.children().eq(0).clone();
		var $currentPageObj_ = $thisPaginationObj_.children().eq(1).clone();
		var $nextPageObj_ = $thisPaginationObj_.children().eq(2).clone();

		return this.each( function()
		{			
			// 마지막페이지번호
			var lastPageNo = parseInt( (total_row_count - 1) / page_row_count ) + 1;

			// 현재페이지번호가 1보다 작다면 1로 셋팅한다.
			if( current_page_no < 1 ) current_page_no = 1;

			// 현재페이지번호가 마지막페이지번호보다 크다면 마지막페이지번호로 셋팅한다.
			if( current_page_no > lastPageNo ) current_page_no = lastPageNo;

			// 현재 페이지블록 번호
			var currentPageBlockNo = parseInt( (current_page_no - 1) / page_block_count ) + 1

			// 현재 보여줄 페이지번호 블록의 시작페이지번호와 마지막페이지번호를 가져온다.
			var startViewPageNo = (currentPageBlockNo - 1) * page_block_count + 1;
			var endViewPageNo = startViewPageNo + page_block_count - 1;
			if( endViewPageNo > lastPageNo ) endViewPageNo = lastPageNo;

			// 객체 비우기
			$thisPaginationObj.html("");
			
			// previous 아이콘 출력
			if( startViewPageNo <= page_block_count ) {
				$previousPageObj_.addClass("disabled");
			}
			$thisPaginationObj.append( $previousPageObj_ );

			// 페이지번호 출력
			for(var i = startViewPageNo; i <= endViewPageNo; i++)
			{
				var $currentPageObj = $currentPageObj_.clone();
				
				// 현재페이지일 경우
				if( i == current_page_no )
				{
					$currentPageObj.addClass("active");
					$thisPaginationObj.append( $currentPageObj );
				}
				// 현재페이지가 아닐 경우
				else
				{
					$currentPageObj.children().eq(0).html( i );
					$currentPageObj.children().eq(0).html( i +" <span class='sr-only'>(current)</span>" ).click(function(){
						$(this).next().trigger("click")
					});
					$currentPageObj.append( $("<button />").attr("onclick", "this.form."+ obj_current_page_name +".value="+ i +";this.form.submit();").hide() );
					$thisPaginationObj.append( $currentPageObj );
				}
			}

			// next 아이콘 출력
			if( endViewPageNo <= ( currentPageBlockNo * page_block_count ) ) {
				$nextPageObj_.addClass("disabled");
			}
			$thisPaginationObj.append( $nextPageObj_ );
			
		});
	}
});


//페이지 네비게이션 셋팅
function setMoaEgovPagination() {
	if( $(".pagination").length > 0 ) {
		$(".pagination").moaBootstapPagination(
																	document.paginationForm["paginationInfo.totalRecordCount"].value,
																	document.paginationForm["paginationInfo.recordCountPerPage"].value,
																	document.paginationForm["paginationInfo.pageSize"].value,
																	document.paginationForm["paginationInfo.currentPageNo"].value,
																	"pageIndex"
																);
	}
}
