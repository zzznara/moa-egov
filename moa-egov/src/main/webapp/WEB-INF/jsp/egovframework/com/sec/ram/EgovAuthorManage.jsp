<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
 /**
  * @Class Name : EgovAuthorManage.java
  * @Description : EgovAuthorManage List 화면
  * @Modification Information
  * @
  * @  수정일                     수정자                    수정내용
  * @ -------       --------    ---------------------------
  * @ 2009.03.01    Lee.m.j       최초 생성
  *
  *  @author 실행환경 개발팀 홍길동
  *  @since 2009.02.01
  *  @version 1.0
  *  @see
  *
  */
%>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>권한관리</title>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="<c:url value='/css/egovframework/moa/moa-bootstrap-egov.css'/>">
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-bootstrap-pagination.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-bootstrap-egov.js'/>"></script>
<script type="text/javaScript" language="javascript" defer="defer">
	
	function fncCheckAll() {
	    var checkField = document.listForm.delYn;
	    if(document.listForm.checkAll.checked) {
	        if(checkField) {
	            if(checkField.length > 1) {
	                for(var i=0; i < checkField.length; i++) {
	                    checkField[i].checked = true;
	                }
	            } else {
	                checkField.checked = true;
	            }
	        }
	    } else {
	        if(checkField) {
	            if(checkField.length > 1) {
	                for(var j=0; j < checkField.length; j++) {
	                    checkField[j].checked = false;
	                }
	            } else {
	                checkField.checked = false;
	            }
	        }
	    }
	}
	
	function fncManageChecked() {
	
	    var checkField = document.listForm.delYn;
	    var checkId = document.listForm.checkId;
	    var returnValue = "";
	
	    var returnBoolean = false;
	    var checkCount = 0;
	
	    if(checkField) {
	        if(checkField.length > 1) {
	            for(var i=0; i<checkField.length; i++) {
	                if(checkField[i].checked) {
	                    checkField[i].value = checkId[i].value;
	                    if(returnValue == "")
	                        returnValue = checkField[i].value;
	                    else
	                	    returnValue = returnValue + ";" + checkField[i].value;
	                    checkCount++;
	                }
	            }
	            if(checkCount > 0)
	                returnBoolean = true;
	            else {
	                alert("선택된 권한이 없습니다.");
	                returnBoolean = false;
	            }
	        } else {
	            if(document.listForm.delYn.checked == false) {
	                alert("선택된 권한이 없습니다.");
	                returnBoolean = false;
	            }
	            else {
	                returnValue = checkId.value;
	                returnBoolean = true;
	            }
	        }
	    } else {
	        alert("조회된 결과가 없습니다.");
	    }
	
	    document.listForm.authorCodes.value = returnValue;
	
	    return returnBoolean;
	}
	
	function fncSelectAuthorList(pageNo){
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorList.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectAuthor(author) {
	    document.listForm.authorCode.value = author;
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthor.do'/>";
	    document.listForm.submit();
	}
	
	function fncAddAuthorInsert() {
	    location.replace("<c:url value='/sec/ram/EgovAuthorInsertView.do'/>");
	}
	
	function fncAuthorDeleteList() {
	
	    if(fncManageChecked()) {
	        if(confirm("삭제하시겠습니까?")) {
	            document.listForm.action = "<c:url value='/sec/ram/EgovAuthorListDelete.do'/>";
	            document.listForm.submit();
	        }
	    }
	}
	
	function fncAddAuthorView() {
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorUpdate.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectAuthorRole(author) {
	    document.listForm.searchKeyword.value = author;
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorRoleList.do'/>";
	    document.listForm.submit();
	}
	
	function linkPage(pageNo){
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorList.do'/>";
	    document.listForm.submit();
	}
	
	function press() {
	    if (event.keyCode==13) {
	    	fncSelectAuthorList('1');
	    }
	}
	
</script>
</head>
<body>
<DIV class="container">



		<form:form name="listForm" action="${pageContext.request.contextPath}/sec/ram/EgovAuthorList.do" method="post" class="form-inline" role="form">
		
		
			<div class=”page-header“ style="margin-bottom:20px;">
				<h1><span class="glyphicon glyphicon-home"></span> 권한 관리</h1>
			</div>
	
	
			<div class="btn-toolbar" role="toolbar" style="margin-bottom:5px;">
				<div class="pull-left">
					&nbsp;<input name="searchKeyword" type="text" value="<c:out value='${authorManageVO.searchKeyword}'/>" placeholder="권한명으로 검색하세요." onkeypress="press();" />
				</div>
				<div class="btn-group pull-right" role="group">
					<button type="button" class="btn btn-primary" onclick="fncSelectAuthorList(1)">조회</button>
					<button type="button" class="btn btn-primary" onclick="fncAddAuthorInsert()">등록</button>
					<button type="button" class="btn btn-primary" onclick="fncAuthorDeleteList()">삭제</button>
				</div>
			</div>
		
		
			<div class="table-responsive">
				<table class="table" summary="권한관리에  관한 테이블입니다. 권한ID, 권한 명, 설명, 등록일자, 롤 정보의 내용을 담고 있습니다.">
					<thead>
						<tr>
							<th class="text-center"><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="전체선택"></th>
							<th class="text-center" nowrap="nowrap">권한ID</th>
							<th class="text-center" nowrap="nowrap">권한명</th>
							<th class="text-center" nowrap="nowrap">설명</th>
							<th class="text-center" nowrap="nowrap">등록일자</th>
							<th class="text-center" nowrap="nowrap">롤정보</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="author" items="${authorList}" varStatus="status">
							<tr>
								<td class="text-center"><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${author.authorCode}"/>" /></td>
								<td><a href="#LINK" onclick="javascript:fncSelectAuthor('<c:out value="${author.authorCode}"/>')"><c:out value="${author.authorCode}"/></a></td>
								<td><c:out value="${author.authorNm}"/></td>
								<td><c:out value="${author.authorDc}"/></td>
								<td class="text-center"><c:out value="${author.authorCreatDe}"/></td>
								<td class="text-center"><a href="#LINK" onclick="javascript:fncSelectAuthorRole('<c:out value="${author.authorCode}"/>')"><span class="glyphicon glyphicon-new-window"></span></a></td>
							</tr>
						</c:forEach>
						<c:if test="${fn:length(authorList) == 0}">
							<tr>
								<td colspan="6">
									<spring:message code="common.nodata.msg" />
								</td>
							</tr>
						</c:if>
					</tbody>
				</table>
			</div>
		
	
			<%@ include file="../../../moa/include/egov-bootstrap/pageNavigation.jsp" %>
			<%@ include file="../../../moa/include/egov-bootstrap/processMessage.jsp" %>


			<input type="hidden" name="authorCode"/>
			<input type="hidden" name="authorCodes"/>
			<input type="hidden" name="pageIndex" value="<c:out value='${authorManageVO.pageIndex}'/>"/>
			<input type="hidden" name="searchCondition"/>
		</form:form>



</DIV>
</body>
</html>
