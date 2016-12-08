<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>



		<%-- 오늘의 말씀 추가 팝업 --%>
		<div id="saveLayerToday" class="white-popup mfp-hide">
			<center>
				<h4 class="bible-today-title" style="margin-bottom:20px;"></h4>
				<div class="text-primary selected-words"></div>
				<div class="selected-index"></div>
				<div style="margin-top:20px;">
					<button type="button" class="btn btn-primary save-today-button">확인</button>
					<button type="button" class="btn btn-danger hide-today-button">취소</button>
				</div>
			</center>
		</div>
		
        <form id="bibleTodayForm" name="bibleTodayForm" method="post">
        	<input type="hidden" name="mode" />
        	<input type="hidden" name="bibleVo.translateSeqNo" />
        	<input type="hidden" name="bibleVo.sortSeqNo" />
        	<input type="hidden" name="bibleVo.chapter" />
        	<input type="hidden" name="bibleVo.verse" />
        </form>



<link rel="stylesheet" href="/js/egovframework/moa/plugin/jquery-magnific-popup/magnific-popup.css">
<link rel="stylesheet" href="/js/egovframework/moa/plugin/moa-bible-today/moa-bible-today.css">
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/jquery-magnific-popup/jquery.magnific-popup.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-bible-today/moa-bible-today.js'/>"></script>
