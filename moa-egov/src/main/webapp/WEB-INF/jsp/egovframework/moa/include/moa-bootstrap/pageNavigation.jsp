<%@ page contentType="text/html; charset=utf-8"%>


<center>
	<ul class="pagination pagination-sm">
	  <li class="prev"><a href="#">&laquo;</a></li>
	  <li class="disabled prevx"><a href="#">&laquo;</a></li>
	  <span class="pageaction"></span>
	  <li class="num"><a href="#">{page}</a></li>
	  <li class="active now"><a href="#">{page} <span class="sr-only">(current)</span></a></li>
	  <li class="next"><a href="#">&raquo;</a></li>
	  <li class="disabled nextx"><a href="#">&raquo;</a></li>
	</ul>
</center>


<style>
	.pagination {margin-top:0px;}
</style>
<script type="text/javascript" src="<c:url value='/js/egovframework/moa/plugin/moa-pagenavigator/moa-pagenavigator.js'/>${dto.addVersion}"></script>