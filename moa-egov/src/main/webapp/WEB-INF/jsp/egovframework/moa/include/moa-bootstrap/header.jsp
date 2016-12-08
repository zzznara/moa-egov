<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
 /**
  *  --------------------------------------------
  *  @ header.jsp
  *  --------------------------------------------
  *  @author 최우진
  *  @since 2016.08.01
  *  @version 1.0
  *  --------------------------------------------
  *
  */
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>${dto.title}</title>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css${dto.addVersion}">
<link rel="stylesheet" href="<c:url value='/css/egovframework/moa/moa-bootstrap.css'/>${dto.addVersion}">
<script>
    
	// 페이지 정보
	var _module = "${dto.module}";
	var _pageKey = "${dto.pageKey}";

    // 검색조건
    var _searchVoJson = eval( ${dto.searchVoJson} );

</script>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js${dto.addVersion}"></script>
<script type="text/javascript" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-string-util.js'/>${dto.addVersion}"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/util/moa-message.js'/>${dto.addVersion}"></script>
</head>
<body>


<header class="navbar navbar-inverse !navbar-fixed-top">
   <div class="container">
      <div class="navbar-header">
         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         </button>
         <a class="navbar-brand hidden-xs" href="/">Moa Bible</a>
         <a class="navbar-brand visible-xs" href="/">M</a>
         <form class="navbar-form pull-left" role="search">
            <div class="input-group" style="display:none">
               <input type="text" class="form-control" placeholder="Search">
               <div class="input-group-btn">
                  <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
               </div>
            </div>
         </form>
      </div>
      <div class="navbar-collapse collapse">
         <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="/">Home</a></li>
            <li><a href="/moa/bible/bibleList.do">성경읽기</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="/moa/bible/bibleByTranslate.do">성경 생성</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Egov Menu</li>
                <li><a href="/index.do">전체 메뉴</a></li>
              </ul>
            </li>
         </ul>
      </div>
   </div>
</header>


<!-- content -->
<div class="container">
	<div class="row">
	  <div class="col-md-9 col-lg-9 col-sm-9">
