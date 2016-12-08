 <%@ page contentType="text/html; charset=utf-8"%>
 <%@ include file="../include/moa-bootstrap/header.jsp" %>



		<form id="saveForm" name="saveForm" method="post" autocomplete="off">
			<input type="hidden" name="fileName" />
			<input type="hidden" name="bibleByTranslateVo.code" />
			<input type="hidden" name="bibleByTranslateVo.name" />
			<input type="hidden" name="bibleByTranslateVo.language" />
		</form>
		
		<div id="listArea">
			<ul id="layout" class="unvisible">
				<li>
					<span id="list.name"></span>
					[<a id="list.create" href="#">생성</a>]
					[<a id="list.drop" href="#">삭제</a>]
				</li>
			</ul>
			<ul id="repeatArea"></ul>
			<ul id="notExistsArea" class="unvisible">
				<li>성경 파일이 없습니다.</li>
			</ul>
		</div>



<link rel="stylesheet" href="<c:url value='/js/egovframework/moa/plugin/moa-search/moa-search.css'/>${dto.addVersion}">
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-search/moa-search.js'/>${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/bible/bibleByTranslate.js' />${dto.addVersion}"></script>
<%@ include file="../include/moa-bootstrap/footer.jsp" %>