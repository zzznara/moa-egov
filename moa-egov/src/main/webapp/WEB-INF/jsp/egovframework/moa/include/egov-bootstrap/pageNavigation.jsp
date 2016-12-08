<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>


			<nav align="center">
				<ul class="pagination">
					<li><a href="#"><span aria-hidden="true">«</span><span class="sr-only">Previous</span></a></li>
					<li><a href="#">1</a></li>
					<li><a href="#"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>
				</ul>
			</nav>


			<input type="hidden" name="paginationInfo.totalRecordCount" value="${paginationInfo.totalRecordCount}" />
			<input type="hidden" name="paginationInfo.recordCountPerPage" value="${paginationInfo.recordCountPerPage}" />
			<input type="hidden" name="paginationInfo.pageSize" value="${paginationInfo.pageSize}" />
			<input type="hidden" name="paginationInfo.currentPageNo" value="${paginationInfo.currentPageNo}" />