<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%pageContext.setAttribute("crlf", "\r\n"); %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>모아 성경</title>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/moa/util/message.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/moa/util/jquery.pagenavigator.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/moa/util/moa-ajax-selectbox-list.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/moa/util/moa-readyFunc.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/moa/bible/bibleList.js' />"></script>
<script>
    
    // 검색조건
    var _searchVoJson = eval( ${dto.searchVoJson} );

</script>
</head>
<body>



        <%@ include file="../include/header.jsp" %>
        <%@ include file="../include/pageNavigationTop.jsp" %>


        <form id="bibleForm" name="bibleForm" action="${pageContext.request.contextPath}/moa/bible/bibleList.do" method="post" >
        	<input type="hidden" name="searchVo.pageIndex" value="1" />
        	<input type="hidden" name="searchVo.chapter" value="1" />
    
    		<select name="searchVo.translateSeqNo"></select>
			<select name="searchVo.sortSeqNo"></select>

			<p></p>

			<div id="listArea">
				<ol id="repeatArea">
					<li id="list.words"></li>
				</ol>
			</div>
			
        </form>
		

        <%@ include file="../include/pageNavigationBottom.jsp" %>
        <%@ include file="../include/footer.jsp" %>
        


<script type="text/javascript" src="<c:url value='/js/moa/util/moa-stringUtil.js'/>"></script>
</body>
</html>

