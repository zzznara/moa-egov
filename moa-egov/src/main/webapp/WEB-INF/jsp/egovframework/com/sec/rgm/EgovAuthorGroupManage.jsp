<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
 /**
  * @Class Name : EgovAuthorGroupManage.java
  * @Description : EgovAuthorGroupManage List 화면
  * @Modification Information
  * @
  * @  수정일                     수정자                    수정내용
  * @ -------       --------    ---------------------------
  * @ 2009.03.23    Lee.m.j       최초 생성
  *
  *  @author Lee.m.j
  *  @since 2009.03.23
  *  @version 1.0
  *  @see
  *
  */
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>권한그룹관리</title>
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
	
		var resultCheck = false;
	
	    var checkField = document.listForm.delYn;
	    var checkId = document.listForm.checkId;
	    var selectAuthor = document.listForm.authorManageCombo;
	    var booleanRegYn = document.listForm.regYn;
	    var listMberTyCode = document.listForm.mberTyCode;
	
	    var returnId = "";
	    var returnAuthor = "";
	    var returnRegYn = "";
	    var returnmberTyCode = "";
	
	    var checkedCount = 0;
	
	    if(checkField) {
	        if(checkField.length > 1) {
	            for(var i=0; i<checkField.length; i++) {
	                if(checkField[i].checked) {
	                	checkedCount++;
	                    checkField[i].value = checkId[i].value;
	                    if(returnId == "") {
	                        returnId = checkField[i].value;
	                        returnAuthor = selectAuthor[i].value;
	                        returnRegYn = booleanRegYn[i].value;
	                        returnmberTyCode = listMberTyCode[i].value;
	                    }
	                    else {
	                    	returnId = returnId + ";" + checkField[i].value;
	                    	returnAuthor = returnAuthor + ";" + selectAuthor[i].value;
	                    	returnRegYn = returnRegYn + ";" + booleanRegYn[i].value;
	                    	returnmberTyCode = returnmberTyCode + ";" + listMberTyCode[i].value;
	
	                    }
	                }
	            }
	
	            if(checkedCount > 0)
	            	resultCheck = true;
	            else {
	                alert("선택된  항목이 없습니다.");
	                resultCheck = false;
	            }
	
	        } else {
	        	 if(document.listForm.delYn.checked == false) {
	                alert("선택 항목이 없습니다.");
	                resultCheck = false;
	            }
	            else {
	                returnId = checkId.value;
	                returnAuthor = selectAuthor.value;
	                returnRegYn = booleanRegYn.value;
	                returnmberTyCode = listMberTyCode.value;
	
	                resultCheck = true;
	            }
	        }
	    } else {
	        alert("조회된 결과가 없습니다.");
	    }
	
	    document.listForm.userIds.value = returnId;
	    document.listForm.authorCodes.value = returnAuthor;
	    document.listForm.regYns.value = returnRegYn;
	    document.listForm.mberTyCodes.value = returnmberTyCode;
	    return resultCheck;
	}
	
	function fncSelectAuthorGroupList(pageNo){
	    //document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/rgm/EgovAuthorGroupList.do'/>";
	    document.listForm.submit();
	}
	
	function fncAddAuthorGroupInsert() {
	
		if(!fncManageChecked()) return;
	
	    if(confirm("등록하시겠습니까?")) {
	
	        document.listForm.action = "<c:url value='/sec/rgm/EgovAuthorGroupInsert.do'/>";
	        document.listForm.submit();
	    }
	}
	
	function fncAuthorGroupDeleteList() {
	
		if(!fncManageChecked()) return;
	
	    if(confirm("삭제하시겠습니까?")) {
	        document.listForm.action = "<c:url value='/sec/rgm/EgovAuthorGroupDelete.do'/>";
	        document.listForm.submit();
	    }
	}
	
	function linkPage(pageNo){
	    //document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/rgm/EgovAuthorGroupList.do'/>";
	    document.listForm.submit();
	}
	
	function fncSelectAuthorGroupPop() {
	
	    if(document.listForm.searchCondition.value == '3') {
	    	window.open("<c:url value='/sec/gmt/EgovGroupSearchList.do'/>","notice","height=500, width=485, top=50, left=20, scrollbars=no, resizable=no");
	    } else {
	        alert("그룹을 선택하세요.");
	        return;
	    }
	
	    /*
	    var url = "<c:url value='/sec/gmt/EgovGroupSearchView.do'/>";
	    var varParam = new Object();
	    var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
	    var retVal;
	
	    if(document.listForm.searchCondition.value == '3') {
	        retVal = window.showModalDialog(url, varParam, openParam);
	        if(retVal) {
	            document.listForm.searchKeyword.value = retVal;
	        }
	    } else {
	        alert("그룹을 선택하세요.");
	        return;
	    }
	    */
	
	}
	
	function onSearchCondition() {
		document.listForm.searchKeyword.value = "";
		if(document.listForm.searchCondition.value == '3') {
	        document.listForm.searchKeyword.readOnly = true;
		} else {
			document.listForm.searchKeyword.readOnly = false;
		}
	}
	
	function press() {
	
	    if (event.keyCode==13) {
	    	fncSelectAuthorGroupList('1');
	    }
	}

</script>
</head>
<body>
<DIV class="container">



		<form:form name="listForm" action="${pageContext.request.contextPath}/sec/rgm/EgovAuthorGroupList.do" method="post">
	
	
			<div class=”page-header“ style="margin-bottom:20px;">
				<h1><span class="glyphicon glyphicon-home"></span> 권한그룹관리</h1>
			</div>
	
	
			<div class="btn-toolbar" role="toolbar" style="margin-bottom:5px;">
				<div class="pull-left">
					&nbsp;
					조회조건:
					<select name="searchCondition" onchange="onSearchCondition()" title="조회조건선택">
		                <option value="1" <c:if test="${authorGroupVO.searchCondition == '1'}">selected</c:if> >사용자 ID</option>
		                <option value="2" <c:if test="${authorGroupVO.searchCondition == '2'}">selected</c:if> >사용자 명</option>
		                <option value="3" <c:if test="${authorGroupVO.searchCondition == '3'}">selected</c:if> >그룹</option>
			        </select>
			        <input name="searchKeyword" type="text" value="<c:out value='${authorGroupVO.searchKeyword}'/>" title="검색" onkeypress="press();"/>
				</div>
				<div class="btn-group pull-right" role="group">
					<button type="button" class="btn btn-primary" onclick="javascript:fncSelectAuthorGroupPop()">그룹조회 팝업</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncSelectAuthorGroupList(1)">조회</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncAddAuthorGroupInsert()">등록</button>
					<button type="button" class="btn btn-primary" onclick="javascript:fncAuthorGroupDeleteList()">삭제</button>
				</div>
			</div>
		
		
			<div class="table-responsive">
				<table class="table" summary="권한 그룹을 관리하는 테이블입니다. 사용자 ID, 사용자 명, 사용자 유형, 권한, 등록 여부의 정보를 담고 있습니다.">
					<thead>
						<tr>
							<th class="text-center"><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="전체선택"></th>
							<th class="text-center" nowrap="nowrap">사용자ID</th>
							<th class="text-center" nowrap="nowrap">사용자명</th>
							<th class="text-center" nowrap="nowrap">사용자유형</th>
							<th class="text-center" nowrap="nowrap">권한</th>
							<th class="text-center" nowrap="nowrap">등록여부</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="authorGroup" items="${authorGroupList}" varStatus="status">
							<tr>
								<td class="text-center"><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${authorGroup.uniqId}"/>" /></td>
								<td><c:out value="${authorGroup.userId}"/></td>
								<td><c:out value="${authorGroup.userNm}"/></td>
								<td><c:out value="${authorGroup.mberTyNm}"/><input type="hidden" name="mberTyCode" value="${authorGroup.mberTyCode}"/></td>
								<td>
									<select name="authorManageCombo" title="권한" style="width:100%;">
										<c:forEach var="authorManage" items="${authorManageList}" varStatus="status">
											<option value="<c:out value="${authorManage.authorCode}"/>" <c:if test="${authorManage.authorCode == authorGroup.authorCode}">selected</c:if> ><c:out value="${authorManage.authorNm}"/></option>
										</c:forEach>
									</select>
								</td>
								<td class="text-center"><c:out value="${authorGroup.regYn}"/><input type="hidden" name="regYn" value="<c:out value="${authorGroup.regYn}"/>"></td>
							</tr>
						</c:forEach>
						<c:if test="${fn:length(authorGroupList) == 0}">
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
	
	
			<input type="hidden" name="userId"/>
			<input type="hidden" name="userIds"/>
			<input type="hidden" name="authorCodes"/>
			<input type="hidden" name="regYns"/>
			<input type="hidden" name="mberTyCodes"/>
			<input type="hidden" name="pageIndex" value="<c:out value='${authorGroupVO.pageIndex}'/>"/>
		</form:form>
	


</DIV>
</body>
</html>
