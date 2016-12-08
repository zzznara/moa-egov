 <%@ page contentType="text/html; charset=utf-8"%>
 <%@ include file="../include/moa-bootstrap/header.jsp" %>



        <form id="bibleSearchForm" name="bibleSearchForm" method="post">
        	<input type="hidden" name="searchVo.pageIndex" value="1" />
        	<input type="hidden" name="searchVo.chapter" value="1" />

    
    		<%-- 검색 --%>
    		<div class="btn-toolbar" role="toolbar">
	    		<select name="searchVo.translateSeqNo"></select>
				<select name="searchVo.sortSeqNo"></select>
				<input name="searchVo.words" type="text" placeholder="검색어를 입력하세요." />
				<button id="searchButton" type="button" class="btn btn-primary">조회</button>
			</div>


			<%-- 목록 --%>
			<div id="listArea">
				<ol id="repeatArea">
					<li>
						<div id="list.wordsIndex"></div>
						<div id="list.words"></div>
					</li>
				</ol>
			</div>
			
			
			<%@ include file="../include/moa-bootstrap/pageNavigation.jsp" %>


        </form>



<%@ include file="../include/moa-bootstrap/footer.jsp" %>