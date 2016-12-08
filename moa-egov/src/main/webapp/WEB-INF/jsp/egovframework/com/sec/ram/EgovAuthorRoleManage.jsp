<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%

/**
 * @Class Name : EgovAuthorRoleManage.java
 * @Description : EgovAuthorRoleManage.jsp
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
<title>권한관리</title>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
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
	    var checkRegYn = document.listForm.regYn;
	    var returnValue = "";
	    var returnRegYns = "";
	    var checkedCount = 0;
	    var returnBoolean = false;
	
	    if(checkField) {
	        if(checkField.length > 1) {
	            for(var i=0; i<checkField.length; i++) {
	                if(checkField[i].checked) {
	                	checkedCount++;
	                    checkField[i].value = checkId[i].value;
	
		                if(returnValue == "") {
		                    returnValue = checkField[i].value;
		                    returnRegYns = checkRegYn[i].value;
		                }
		                else {
		                    returnValue = returnValue + ";" + checkField[i].value;
		                    returnRegYns = returnRegYns + ";" + checkRegYn[i].value;
		                }
	                }
	            }
	
	            if(checkedCount > 0)
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
	                returnRegYns = checkRegYn.value;
	
	                returnBoolean = true;
	            }
	        }
	    } else {
	        alert("조회된 결과가 없습니다.");
	    }
	
	    document.listForm.roleCodes.value = returnValue;
	    document.listForm.regYns.value = returnRegYns;
	
	    return returnBoolean;
	
	}
	
	function fncSelectAuthorRoleList() {
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = "1";
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorRoleList.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectAuthorList(){
	   // document.listForm.searchCondition.value = "1";
	   // document.listForm.pageIndex.value = "1";
	    document.listForm.searchKeyword.value = "";
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorList.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectAuthorRole(roleCode) {
	    document.listForm.roleCode.value = roleCode;
	    document.listForm.action = "<c:url value='/sec/ram/EgovRole.do'/>";
	    document.listForm.submit();
	}
	
	function fncAddAuthorRoleInsert() {
		if(fncManageChecked()) {
		    if(confirm("등록하시겠습니까?")) {
	            document.listForm.action = "<c:url value='/sec/ram/EgovAuthorRoleInsert.do'/>";
	            document.listForm.submit();
		    }
		} else return;
	}
	
	function linkPage(pageNo){
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/ram/EgovAuthorRoleList.do'/>";
	    document.listForm.submit();
	}
	
	
	function press() {
	
	    if (event.keyCode==13) {
	    	fncSelectAuthorRoleList();
	    }
	}	

</script>

</head>

<body>
<DIV class="container">



		<form:form name="listForm" action="${pageContext.request.contextPath}/sec/ram/EgovAuthorRoleList.do" method="post">
	
	
			<div class=”page-header“ style="margin-bottom:20px;">
				<h1><span class="glyphicon glyphicon-home"></span> 권한 롤 관리</h1>
			</div>
	
	
			<div class="btn-toolbar" role="toolbar" style="margin-bottom:5px;">
				<div class="pull-left">
					&nbsp;<input name="searchKeyword" type="text" value="<c:out value='${authorRoleManageVO.searchKeyword}'/>" placeholder="권한코드로 검색하세요." onkeypress="press();" />
				</div>
				<div class="btn-group pull-right" role="group">
					<button type="button" class="btn btn-primary" onclick="javascript:fncSelectAuthorList()">목록</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncSelectAuthorRoleList()">조회</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncAddAuthorRoleInsert()">등록</button>
				</div>
			</div>
	
		
			<div class=”table-responsive“>
				<table class="table table-hover table-bordered table-striped" summary="권한 롤을 관리하는 테이블입니다. 롤 ID, 롤 명, 롤 타입, 롤 Sort, 롤 설명, 등록일자, 등록여부의 내용을 담고 있습니다.">
					<thead>
						<tr>
							<th class="text-center"><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="전체선택"></th>
							<th class="text-center" nowrap="nowrap">롤 ID</th>
							<th class="text-center" nowrap="nowrap">롤 명</th>
							<th class="text-center" nowrap="nowrap">롤 타입</th>
							<th class="text-center" nowrap="nowrap">롤 Sort</th>
							<th class="text-center" nowrap="nowrap">롤 설명</th>
							<th class="text-center" nowrap="nowrap">등록일자</th>
							<th class="text-center" nowrap="nowrap">등록여부</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="authorRole" items="${authorRoleList}" varStatus="status">
							<tr>
								<td class="text-center"><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${authorRole.roleCode}"/>" /></td>
								<td><c:out value="${authorRole.roleCode}"/></td>
								<td><c:out value="${authorRole.roleNm}"/></td>
								<td><c:out value="${authorRole.roleTyp}"/></td>
								<td><c:out value="${authorRole.roleSort}"/></td>
								<td><c:out value="${authorRole.roleDc}"/></td>
								<td class="text-center"><c:out value="${authorRole.creatDt}"/></td>
								<td>
									<select name="regYn" title="등록여부">
										<option value="Y" <c:if test="${authorRole.regYn == 'Y'}">selected</c:if> >등록</option>
										<option value="N" <c:if test="${authorRole.regYn == 'N'}">selected</c:if> >미등록</option>
									</select>
								</td>
							</tr>
						</c:forEach>
						<c:if test="${fn:length(authorRoleList) == 0}">
							<tr>
								<td colspan="9">
									<spring:message code="common.nodata.msg" />
								</td>
							</tr>
						</c:if>
					</tbody>
				</table>
			</div>
		
	
			<%@ include file="../../../moa/include/egov-bootstrap/pageNavigation.jsp" %>
			<%@ include file="../../../moa/include/egov-bootstrap/processMessage.jsp" %>
	
	
			<input type="hidden" name="roleCodes"/>
			<input type="hidden" name="regYns"/>
			<input type="hidden" name="pageIndex" value="<c:out value='${authorRoleManageVO.pageIndex}'/>"/>
			<input type="hidden" name="authorCode" value="<c:out value="${authorRoleManageVO.searchKeyword}"/>"/>
			<input type="hidden" name="searchCondition"/>
		</form:form>



</DIV>
</body>
</html>
