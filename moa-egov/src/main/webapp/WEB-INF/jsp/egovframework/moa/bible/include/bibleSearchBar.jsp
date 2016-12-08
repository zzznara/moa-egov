<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


		<div class="panel panel-default" id="bibleSearchBar">
			<div class="panel-body">

					<form id="bibleForm" name="bibleForm" class="form-inline" role="form" onsubmit="return false;">
						<input type="hidden" name="mode" value="view" />
			        	<input type="hidden" name="searchVo.pageIndex" value="1" />
			        	<input type="hidden" name="searchVo.pageUnit" value="100" />
						<input type="hidden" name="searchVo.testament" />

						<%@ include file="bibleDropdown.jsp" %>

						<div class="form-group search-mode" style="display:none">
							<input name="searchVo.words" type="text" class="form-control" placeholder="검색어를 입력하세요." />
						</div>
						<div class="form-group search-mode" style="display:none">
							<button id="searchButton" type="button" class="btn btn-info search-mode">검색</button>
						</div>
						<div class="form-group">
							<button id="searchModeButton" type="button" class="btn btn-warning view-mode">검색모드</button>
							<button id="viewModeButton" type="button" class="btn btn-warning search-mode" style="display:none">보기모드</button>
						</div>
					</form>
		
			</div>
		</div>

