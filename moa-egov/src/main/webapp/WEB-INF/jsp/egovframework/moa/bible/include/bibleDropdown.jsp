<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


	<%-- 번역본 목록 --%>
	<div class="dropdown form-group" id="searchVo.translateSeqNo.layer">
		<input type="hidden" name="searchVo.translateSeqNo" value="${dto.searchVo.translateSeqNo}" />
		<a class="btn btn-default dropdown-toggle" type="button" id="searchVo.translateSeqNo" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
			${dto.bibleByTranslateList[0].name}
			<span class="caret"></span>
		</a>
		
		<ul class="dropdown-menu" role="menu" aria-labelledby="searchVo.translateSeqNo">
			<c:forEach var="list" items="${dto.bibleByTranslateList}" >
				<li role="presentation"><a role="menuitem" tabindex="-1" href="#" seq-no="${list.seqNo}" code="${list.code}" text="${list.name}" language="${list.language}">${list.name}</a></li>
			</c:forEach>
		</ul>
	</div>

	<%-- 성경 목록 --%>
	<div class="dropdown form-group" id="searchVo.sortSeqNo.layer">
		<input type="hidden" name="searchVo.sortSeqNo" value="${dto.searchVo.sortSeqNo}" />
		<a class="btn btn-default dropdown-toggle" type="button" id="searchVo.sortSeqNo" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
			${dto.bibleBySortList[0].name}
			<span class="caret"></span>
		</a>
		
		<div class="dropdown-menu" role="menu" aria-labelledby="searchVo.sortSeqNo">
			<table>
				<tbody>
<%--
 					<tr>
						<td role="presentation"><a role="menuitem"
																class="all"
																class-name='all'
																tabindex="-1"
																href="#"
																seq-no="all"
																code="all"
																text="성경 전체"
																language="KO"
																enum-name="성경 전체"
																chapter-num="">성경 전체</a></td>
						<td role="presentation"><a role="menuitem"
																class="all"
																class-name='all'
																tabindex="-1"
																href="#"
																seq-no="old"
																code="new"
																text="구약 전체"
																language="KO"
																enum-name="구약 전체"
																chapter-num="">구약 전체</a></td>
						<td role="presentation"><a role="menuitem"
																class="all"
																class-name='all'
																tabindex="-1"
																href="#"
																seq-no="new"
																code="new"
																text="신약 전체"
																language="KO"
																enum-name="신약 전체"
																chapter-num="">신약 전체</a></td>
						<td></td>
						<td></td>
					</tr>
--%>
					<c:set var="widthCount" value="5" />
					<c:set var="thisCount" value="0" />
					<c:set var="className" value="default" />
					<c:set var="preTestament" value="" />
					<c:forEach var="list" items="${dto.bibleBySortList}" varStatus="row">
						<c:if test="${list.testament eq 'NEW'}">
							<c:if test="${!empty preTestament && preTestament != list.testament}">
								<c:if test="${thisCount % widthCount eq 0}">
									<tr>
								</c:if>
								<td></td>
								<c:if test="${thisCount % widthCount eq (widthCount-1)}">
									</tr>
								</c:if>
								<c:set var="thisCount" value="${thisCount + 1}" />
							</c:if>
							<c:set var="className" value="white" />
						</c:if>
						<c:if test="${thisCount % widthCount eq 0}">
							<tr>
						</c:if>
						<td role="presentation"><a role="menuitem"
																class="${className}"
																class-name='${className}'
																tabindex="-1"
																href="#"
																seq-no="${list.seqNo}"
																code="${list.code}"
																text="${list.name}"
																language="${list.language}"
																enum-name="${list.enumName}"
																chapter-num="${list.chapterNum}">${list.name}</a></td>
						<c:if test="${thisCount % widthCount eq (widthCount-1)}">
							</tr>
						</c:if>
						<c:set var="preTestament" value="${list.testament}" />
						<c:set var="thisCount" value="${thisCount + 1}" />
					</c:forEach>
					<c:if test="${thisCount % widthCount ne 0}">
						<c:forEach var="i" begin="1" end="${widthCount - (thisCount % widthCount)}" step="1">
							<td></td>
						</c:forEach>
						</tr>
					</c:if>
				</tbody>
			</table>
		</div>
	</div>

	<%-- chapter 목록 --%>
	<div class="dropdown form-group view-mode" id="searchVo.chapter.layer">
		<input type="hidden" name="searchVo.chapter" value="${dto.searchVo.chapter}" />
		<a class="btn btn-default dropdown-toggle" type="button" id="searchVo.chapter" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
			<span class="caret"></span>
		</a>
		
		<div class="dropdown-menu" role="menu" aria-labelledby="searchVo.chapter">
			<span role="presentation"><a role="menuitem" class="default" tabindex="-1" href="#"></a></span>
		</div>
<!-- 		<ul class="dropdown-menu" role="menu" aria-labelledby="searchVo.chapter">
			<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>
		</ul> -->
	</div>

