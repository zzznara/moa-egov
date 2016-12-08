<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
 /**
  * @Class Name : EgovDeptAuthorManage.java
  * @Description : EgovDeptAuthorManage List 화면
  * @Modification Information
  * @
  * @  수정일        수정자                    수정내용
  * @ -------      ---------    ---------------------------
  * @ 2009.03.23    Lee.m.j       최초 생성
  * @ 2011.11.11    이기하		  부서권한관리 등록시 오류 수정
  *
  *  @author Lee.m.j
  *  @since 2009.03.23
  *  @version 1.0
  *  @see
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>부서 권한 관리</title>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="<c:url value='/css/egovframework/moa/moa-bootstrap-egov.css'/>">
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-bootstrap-pagination.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-bootstrap-egov.js'/>"></script>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="userManageVO" staticJavascript="false" xhtml="true" cdata="false"/>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/sym/ccm/zip/EgovZipPopup.js' />" ></script>
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
	
	    var resultCheck = true;
	
	    var checkField = document.listForm.delYn;
	    var checkId = document.listForm.checkId;
	    var selectAuthor = document.listForm.authorManageCombo;
	    var booleanRegYn = document.listForm.regYn;
	
	    var returnId = "";
	    var returnAuthor = "";
	    var returnRegYn = "";
	
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
	                    }
	                    else {
	                        returnId = returnId + ";" + checkField[i].value;
	                        returnAuthor = returnAuthor + ";" + selectAuthor[i].value;
	                        returnRegYn = returnRegYn + ";" + booleanRegYn[i].value;
	                    }
	                }
	            }
	            if(checkedCount > 0)
	                resultCheck = true;
	            else {
	                alert("선택된  사용자가 없습니다.");
	                resultCheck = false;
	            }
	        } else {
	        	if(document.listForm.delYn.checked == false) {
	                alert("선택된 사용자가  없습니다.");
	                resultCheck = false;
	            }
	            else {
	            	returnId = checkId.value;
	                returnAuthor = selectAuthor.value;
	                returnRegYn = booleanRegYn.value;
	                resultCheck = true;
	            }
	        }
	    } else {
	    	resultCheck = false;
	        alert("조회된 결과가 없습니다.");
	    }
	
	    document.listForm.userIds.value = returnId;
	    document.listForm.authorCodes.value = returnAuthor;
	    document.listForm.regYns.value = returnRegYn;
	
	    return resultCheck;
	}
	
	function fncSelectDeptAuthorList(pageNo) {
		if(document.listForm.deptCode.value == '') {
			alert("부서를 선택하세요");
			return;
		}
	
	    document.listForm.searchCondition.value = "1";
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/drm/EgovDeptAuthorList.do'/>";
	    document.listForm.submit();
	}
	
	function fncAddDeptAuthorInsert() {
	
	    if(!fncManageChecked()) return;
	
	    if(confirm("등록하시겠습니까?")) {
	        document.listForm.action = "<c:url value='/sec/drm/EgovDeptAuthorInsert.do'/>";
	        document.listForm.submit();
	    }
	}
	
	function fncDeptAuthorDeleteList() {
	
	    if(!fncManageChecked()) return;
	
	    if(confirm("삭제하시겠습니까?")) {
	        document.listForm.action = "<c:url value='/sec/drm/EgovDeptAuthorDelete.do'/>";
	        document.listForm.submit();
	    }
	}
	
	function linkPage(pageNo){
	    document.listForm.pageIndex.value = pageNo;
	    document.listForm.action = "<c:url value='/sec/drm/EgovDeptAuthorList.do'/>";
	    document.listForm.submit();
	}
	
	
	/*
	function fncSelectDeptAuthorPop() {
	
	    var url = "<c:url value='/sec/drm/EgovDeptSearchView.do'/>";
	    var varParam = new Object();
	    var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
	
	    var retVal = window.showModalDialog(url, varParam, openParam);
	    if(retVal) {
	        document.listForm.deptCode.value = retVal.substring(0, retVal.indexOf("|"));
	        document.listForm.deptNm.value = retVal.substring(retVal.indexOf("|")+1, retVal.length);
	    }
	}
	*/
	function fncSelectDeptAuthorPop() {
	
	
	    var url = "<c:url value='/sec/drm/EgovDeptSearchList.do'/>";
	    var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
	    /*
	    var retVal = window.showModalDialog(url, varParam, openParam);
	    if(retVal) {
	        document.listForm.deptCode.value = retVal.substring(0, retVal.indexOf("|"));
	        document.listForm.deptNm.value = retVal.substring(retVal.indexOf("|")+1, retVal.length);
	    }
	    */
	
	    window.open(url,"부서검색",'width=500,height=485,scrollbars=no,resizable=no,status=no,center:yes');
	
	}
	
	function press() {
	
	    if (event.keyCode==13) {
	    	fncSelectDeptAuthorList('1');
	    }
	}

</script>

</head>

<body>
<DIV class="container">



		<form:form name="listForm" action="${pageContext.request.contextPath}/sec/drm/EgovDeptAuthorList.do" method="post">
		
	
			<div class=”page-header“ style="margin-bottom:20px;">
				<h1><span class="glyphicon glyphicon-home"></span> 부서권한 관리</h1>
			</div>
	
			<div class="btn-toolbar" role="toolbar" style="margin-bottom:5px;">
				<div class="pull-left">
	
						<div class="controls form-inline">
							<span>부서 *</span>
							<input type="text" name="deptCode" value="<c:out value='${deptAuthorVO.deptCode}' />" title="부서코드" onkeypress="press();">
							<input type="text" name="deptNm" value="<c:out value='${deptAuthorVO.deptNm}'/>" title="부서명" onkeypress="press();">
							<button class="btn btn-info" type="button" onclick="fncSelectDeptAuthorPop()">부서조회 팝업</button>
						</div>
					
				</div>
				<div class="pull-right btn-group" role="group">
					<button type="button" class="btn btn-primary" onclick="fncSelectDeptAuthorList(1)">조회</button>
					<button type="button" class="btn btn-primary" onclick="fncAddDeptAuthorInsert()">등록</button>
					<button type="button" class="btn btn-primary" onclick="fncDeptAuthorDeleteList()">삭제</button>
				</div>
			</div>
		
		
			<div class="table-responsive">
				<table class="table" summary="부서 권한 관리 테이블입니다.사용자 ID,사용자 명,권한,등록 여부 정보를 담고 있습니다.">
					<thead>
						<tr>
							<th class="text-center"><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="전체선택"></th>
							<th class="text-center" nowrap="nowrap">사용자ID</th>
							<th class="text-center" nowrap="nowrap">사용자명</th>
							<th class="text-center" nowrap="nowrap">권한</th>
							<th class="text-center" nowrap="nowrap">등록여부</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="deptAuthor" items="${deptAuthorList}" varStatus="status">
							<tr>
								<td class="text-center"><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${deptAuthor.uniqId}"/>" /></td>
								<td><c:out value="${deptAuthor.userId}"/></td>
								<td><c:out value="${deptAuthor.userNm}"/></td>
								<td class="text-center">
									<select name="authorManageCombo" title="등록여부" style="width:100%;">
										<c:forEach var="authorManage" items="${authorManageList}" varStatus="status">
											<option value="<c:out value="${authorManage.authorCode}"/>" <c:if test="${authorManage.authorCode == deptAuthor.authorCode}">selected</c:if> ><c:out value="${authorManage.authorNm}"/></option>
										</c:forEach>
									</select>
								</td>
								<td class="text-center"><c:out value="${deptAuthor.regYn}"/><input type="hidden" name="regYn" value="<c:out value="${deptAuthor.regYn}"/>"></td>
							</tr>
						</c:forEach>
						<c:if test="${fn:length(deptAuthorList) == 0}">
							<tr>
								<td colspan="5" class="text-center">
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
			<input type="hidden" name="pageIndex" value="<c:out value='${deptAuthorVO.pageIndex}'/>"/>
			<input type="hidden" name="searchCondition"/>
		</form:form>



</DIV>
</body>
</html>
