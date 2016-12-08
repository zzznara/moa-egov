$(function(){
	
	// 페이지 네비게이션 셋팅
	setMoaEgovPagination();
	
	$(".table-responsive > .table").addClass("table-hover");
	$(".table-responsive > .table").addClass("table-bordered");
	$(".table-responsive > .table").addClass("table-striped");
});


// 페이지 네비게이션 셋팅
function setMoaEgovPagination() {
	if( $(".pagination").length > 0 ) {
		$(".pagination").moaBootstapPagination(
																	$("[name='paginationInfo.totalRecordCount']").val(),
																	$("[name='paginationInfo.recordCountPerPage']").val(),
																	$("[name='paginationInfo.pageSize']").val(),
																	$("[name='paginationInfo.currentPageNo']").val(),
																	"pageIndex"
																);
	}
}