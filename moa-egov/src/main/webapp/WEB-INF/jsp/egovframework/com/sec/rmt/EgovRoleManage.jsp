<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%

/**
 * @Class Name : EgovRoleManage.java
 * @Description : EgovRoleManage jsp
 * @Modification Information
 * @
 * @  수정일                    수정자                수정내용
 * @ ---------     --------    ---------------------------
 * @ 2009.02.01    lee.m.j     최초 생성
 *
 *  @author lee.m.j
 *  @since 2009.03.21
 *  @version 1.0
 *  @see
 *
 */

%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>롤관리</title>
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
	                	checkCount++;
	                    checkField[i].value = checkId[i].value;
	                    if(returnValue == "")
	                        returnValue = checkField[i].value;
	                    else
	                        returnValue = returnValue + ";" + checkField[i].value;
	                }
	            }
	            if(checkCount > 0)
	                returnBoolean = true;
	            else {
	                alert("선택된  롤이 없습니다.");
	                returnBoolean = false;
	            }
	        } else {
	            if(document.listForm.delYn.checked == false) {
	                alert("선택된 롤이 없습니다.");
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
	
	    document.listForm.roleCodes.value = returnValue;
	    return returnBoolean;
	}
	
	function fncSelectRoleList(pageNo){
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/rmt/EgovRoleList.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectRole(roleCode) {
	    document.listForm.roleCode.value = roleCode;
	    document.listForm.action = "<c:url value='/sec/rmt/EgovRole.do'/>";
	    document.listForm.submit();
	}
	
	function fncAddRoleInsert() {
	    location.replace("<c:url value='/sec/rmt/EgovRoleInsertView.do'/>");
	}
	
	function fncRoleListDelete() {
		if(fncManageChecked()) {
	        if(confirm("삭제하시겠습니까?")) {
	            document.listForm.action = "<c:url value='/sec/rmt/EgovRoleListDelete.do'/>";
	            document.listForm.submit();
	        }
	    }
	}
	
	function fncAddRoleView() {
	    document.listForm.action = "<c:url value='/sec/rmt/EgovRoleUpdate.do'/>";
	    document.listForm.submit();
	}
	
	function linkPage(pageNo){
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/rmt/EgovRoleList.do'/>";
	    document.listForm.submit();
	}
	
	function press() {
	
	    if (event.keyCode==13) {
	    	fncSelectRoleList('1');
	    }
	}

</script>

</head>

<body>
<DIV class="container">



		<form:form name="listForm" action="${pageContext.request.contextPath}/sec/rmt/EgovRoleList.do" method="post">
			
			
			<div class=”page-header“ style="margin-bottom:20px;">
				<h1><span class="glyphicon glyphicon-home"></span> 롤 관리</h1>
			</div>
	
	
			<div class="btn-toolbar" role="toolbar" style="margin-bottom:5px;">
				<div class="pull-left">
					롤 명 :
					<input name="searchKeyword" type="text" value="<c:out value='${roleManageVO.searchKeyword}'/>" size="25" title="검색" onkeypress="press();" />
				</div>
				<div class="btn-group pull-right" role="group">
					<button type="button" class="btn btn-primary" onclick="javascript:fncSelectRoleList(1)">조회</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncAddRoleInsert()">등록</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncRoleListDelete()">삭제</button>
				</div>
			</div>
		
		
			<div class="table-responsive">
				<table class="table" summary="롤 관리 테이블입니다.롤  ID,롤 명,롤 타입,롤 Sort,롤 설명,등록일자의 정보를 담고 있습니다.">
					<thead>
						<tr>
							<th class="text-center"><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="전체선택"></th>
							<th class="text-center" nowrap="nowrap">롤ID</th>
							<th class="text-center" nowrap="nowrap">롤명</th>
							<th class="text-center" nowrap="nowrap">롤타입</th>
							<th class="text-center" nowrap="nowrap">롤Sort</th>
							<th class="text-center" nowrap="nowrap">롤설명</th>
							<th class="text-center" nowrap="nowrap">등록일자</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="role" items="${roleList}" varStatus="status">
							<tr>
								<td class="text-center"><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${role.roleCode}"/>" /></td>
								<td><c:out value="${role.roleCode}"/></td>
								<td><a href="#LINK" onclick="javascript:fncSelectRole('<c:out value="${role.roleCode}"/>')"><c:out value="${role.roleNm}"/></a></td>
								<td><c:out value="${role.roleTyp}"/></td>
								<td><c:out value="${role.roleSort}"/></td>
								<td><c:out value="${role.roleDc}"/></td>
								<td class="text-center"><c:out value="${role.roleCreatDe}"/></td>
							</tr>
						</c:forEach>
						<c:if test="${fn:length(roleList) == 0}">
							<tr>
								<td colspan="7">
									<spring:message code="common.nodata.msg" />
								</td>
							</tr>
						</c:if>
					</tbody>
				</table>
			</div>
			
		
			<%@ include file="../../../moa/include/egov-bootstrap/pageNavigation.jsp" %>
			<%@ include file="../../../moa/include/egov-bootstrap/processMessage.jsp" %>
		
		
			<input type="hidden" name="roleCode"/>
			<input type="hidden" name="roleCodes"/>
			<input type="hidden" name="pageIndex" value="<c:out value='${roleManageVO.pageIndex}'/>"/>
			<input type="hidden" name="searchCondition"/>
		</form:form>



</DIV>
</body>
</html>
