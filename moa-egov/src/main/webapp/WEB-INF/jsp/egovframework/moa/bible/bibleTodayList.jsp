 <%@ page contentType="text/html; charset=utf-8"%>
 <%@ include file="../include/moa-bootstrap/header.jsp" %>
 


   		<%-- 검색 --%>
		<%@ include file="include/bibleSearchBar.jsp" %>


		<%-- 목록 --%>
		<div class="panel panel-default" id="listArea">
			<div class="panel-heading">
				<span class="count-area text-danger"></span>
				<span class="heading-text"></span>
			</div>
			<div class="panel-body">
				<table class="table table-hover">
					<colgroup>
						<col width="25" />
						<col />
					</colgroup>
					
					<%-- 목록 layout --%>
					<thead id="layout" class="unvisible">
						<tr>
							<td>
								<span class="search-index text-primary unvisible"></span>
								<span class="translate-seq-no unvisible"></span>
								<span class="sort-seq-no unvisible"></span>
								<span class="sort-name unvisible"></span>
								<span class="chapter unvisible"></span>
								<span class="today-seq-no unvisible"></span>
								<span class="verse text-primary"></span>
							</td>
							<td>
								<span class="words"></span>
								<span class="today-icon" aria-hidden="true"></span>
							</td>
						</tr>
					</thead>
					
					<%-- 목록이 화면에 출력되는 곳 --%>
					<tbody id="repeatArea"></tbody>
					
					<%-- 목록에 데이타가 없을 때 --%>
					<tfoot id="notExistsArea" class="unvisible">
						<tr>
							<td class="verse text-primary"><span class="center-block" style="width:150px;">검색 결과가 없습니다.</span></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>


		<%-- 페이지번호 --%>
		<%@ include file="../include/moa-bootstrap/pageNavigation.jsp" %>


		<%-- 오늘의 말씀 추가 팝업 --%>
		<%@ include file="include/bibleTodayPopup.jsp" %>



<link rel="stylesheet" href="<c:url value='/js/egovframework/moa/plugin/moa-bootstrap-dropdown-bible/moa-bootstrap-dropdown.css'/>${dto.addVersion}">
<link rel="stylesheet" href="<c:url value='/js/egovframework/moa/plugin/moa-search/moa-search.css'/>${dto.addVersion}">
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-search/moa-search.js'/>${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-bootstrap-dropdown-bible/moa-bootstrap-dropdown-ajax.js'/>${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-bootstrap-dropdown-bible/moa-bootstrap-dropdown-bible.js'/>${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/bible/bibleTodayList.js' />${dto.addVersion}"></script>
<%@ include file="../include/moa-bootstrap/footer.jsp" %>