
/* 
 * # readyFunc.js 파일 설명
 * -------------------------------------------------------------------------------
 * - 검색/신규/수정/삭제가 있는 리스트 화면에 공통으로 실행할 함수들의 모음입니다.
 * - 이 함수는 jsp 페이지에서 <head></head> 맨 아랫쪽에 링크시키세요.
 * -------------------------------------------------------------------------------
 * 생성자 : 최우진
 * 생성일 : 2015.07.03
 * 
 */

/* 
 * 공통으로 사용하는 전역변수임
 * 전역변수는 변수 앞에 언더바(_)를 붙였음)
 * 여기서 선언되는 전역변수는 readyFunc.js 파일에서 사용되어진다.
 */
var _listJson;
var _selectedIndex = -1;
var _selectedJson;
var _listLayout;
var _viewLayout;
var _tagsLayout;
var _searchClickNum = 0;
var _pageLayout;
var _pageIndex = 1;
var _totalCount = 0;


/* 
 * 1. 화면에 있는 모든 버튼에 event 함수를 셋팅한다.
 *    - [버튼 종류 : 조회/신규/수정/삭제/엑셀업로드 등..]
 * 2. 조회 조건 중 type="text"인 것은 엔터를 치면 검색이 실행되도록 event를 추가한다.
 * 3. 탭이 있는 화면이라면 tab 클릭시 해당 화면을 호출하도록 한다.
 * 
 */
function funcEvents()
{
	// 버튼에 event 함수를 셋팅한다.
	$("[id=searchButton]").click(function(){
		if( typeof( doSearchEnter ) == "function" ) {
			doSearchEnter();
		}
		doSearch();
	});
	$("[id=resetButton]").click(function(){
		doReset();
	});
	$("[id=modifyButton]").click(function(){
		doModify();
	});
	$("[id=deleteButton]").click(function(){
		doDelete();
	});
	$("[id=addButton]").click(function(){
		doAdd();
	});
	$("[id=saveButton]").click(function(){
		doSave();
	});
	$("[id=cancelButton]").click(function(){
		doCancel();
	});
	$("[id=cancelViewButton]").click(function(){
		doCancelView();
	});
	$("[id=appendButton]").click(function(){
		appendCode();
	});
	$("[id=checkDuplicateButton]").click(function(){
		checkDuplicate();
	});
	
	// 조회조건 중 type="text"인 것은 엔터 치면 조회가 실행되도록 event 추가
	$("input[name^=searchVo][type=text]").each(function(){
		$(this).keyup(function(){
			if( event.keyCode == 13 ) {
				$("[id=searchButton]").trigger("click");
			}
		});
	});
	
	// 신규/수정의 입력값 중 type="text"인 것은 엔터 치면 저장이 실행되도록 event 추가
	$("input[name^=modifyVo][type=text]").each(function(){
		$(this).keyup(function(){
			if( event.keyCode == 13 ) {
				doSave();
			}
		});
	});
	
	// 전체선택
	$("input[name=allCheck]").click(function(){
		$("input[name=uniqId][type=checkbox]:not(:disabled)").prop("checked", $(this).is(":checked"));
		$("input[name=seqNo][type=checkbox]:not(:disabled)").prop("checked", $(this).is(":checked"));

		var checkedLength = $("input[name=uniqId][type=checkbox]:checked").length;
		if( checkedLength == 0 ) {
			checkedLength = $("input[name=seqNo][type=checkbox]:checked").length;
		}
		
		showHideTopButtons( checkedLength );
	});
	
	// 레이어 마우스로 이동할 수 있게
	if( document.getElementById("modifyLayer") ) $("#modifyLayer").draggable();
	if( document.getElementById("viewLayer") ) $("#viewLayer").draggable();
	if( document.getElementById("excelUploadLayer") ) $("#excelUploadLayer").draggable();
}

/* 
 * 1. pageKey값을 파라미터로 받는다. (단어사전:wordDic, 질병조회:disease, 한글사전:koDic, 인과관계표:ceRelation, 수정준칙표:modifyRule 등)
 * 2. pageKey +"ListAjax.do"를 호출하여 목록을 호출한다. (단어사전:wordDicListAjax.do, 질병조회:diseaseListAjax 등)
 * 3. pageKey +"VOSet" 폼의 객체들을 파라미터로 가져온다. (단어사전:wordDicVOSet, 질병조회:diseaseVOSet 등)
 * 4. 결과를 json 객체로 받아서 목록을 불러온다.
 * 5. json으로 받아온 목록을 화면에 뿌려주는 viewList() 함수를 실행한다.
 * 
 */
function doListCountAjax()
{
	if( typeof( doListCountAjaxCustom ) == "function" ) {
		doListCountAjaxCustom();
		return;
	}
	
    $.ajax({
        type: "post",
        url: _pageKey +"ListCountAjax.do",
        data: $("[name="+ _pageKey +"Form]").serialize(),
        dataType: "text",
        success: function( totalCount )
        {
        	_totalCount = totalCount;
        	viewListCount( totalCount );
        	viewPageNavigation( totalCount );
        },
        error: function() {
            alert( message.alert.ajaxFail );
        }
    });
}
function doListAjax()
{
	if( typeof( doListAjaxCustom ) == "function" ) {
		doListAjaxCustom();
		return;
	}

	showLoadingImage();

    $.ajax({
        type: "post",
        url: _pageKey +"ListAjax.do",
        data: $("[name="+ _pageKey +"Form]").serialize(),
        dataType: "json",
        success: function( listJson )
        {
        	hideLoadingImage();
        	
        	viewList( listJson );
        	    
        	// 목록 갯수 가져오는 쿼리를 따로 실행하지 않을 경우 목록의 총갯수를 셋팅하자. 
        	if( _idDoSearchCount == false ) {
            	_totalCount = listJson.length;
            	
            	if( typeof( viewListCountCustom ) == "function" ) {
            		viewListCountCustom( _totalCount );
            	} else {
            		viewListCount( _totalCount );
            	}
        	}
        	
        	if( typeof( doListAjaxAfter ) == "function" ) {
        		doListAjaxAfter();
        	}
        },
        error: function() {
        	hideLoadingImage();
            alert( message.alert.ajaxFail );
        }
    });
}

/* 
 * 리스트 레이어 초기화
 */
function initListLayer()
{
	var repeatObj = $("#repeatArea");

	// 초기의 빈 리스트가 사라지므로 전역변수에 담아놓는다.
	if( _listLayout == null || _listLayout == undefined) {
		_listLayout = repeatObj.clone();
	}

	// 기존 목록 제거
	repeatObj.html( viewListNoExists( _listLayout ) );
}

/* 
 * 1. json 객체에 담긴 list를 화면에 출력한다.
 * 2. 실제 화면에 출력하는 viewListValues() 함수는 각 화면을 담당하는 js 파일에 들어 있다.
 */
function viewListNoExists( layoutObj )
{	
	var viewText = message.text.noDoSearch;
	if( _searchClickNum > 0 ) viewText = message.text.noExistsSearchResult;
	
	var str = "<tr>"
			   + "	<td colspan='"+ layoutObj.children().children().length +"'>"+ viewText +"</td>"
			   + "</tr>"
				;
	
	return str;
}
function viewList( listJson )
{
	// 리스트 레이어 초기화
	$("#repeatArea").html("");

	// 리스트 출력
	var listJsonLength = listJson.length;

	if( listJsonLength == 0 ) {
		$("#repeatArea").html( viewListNoExists( _listLayout ) );
	} else {
		for(var i = 0; i < listJsonLength; i++ )
		{
			var listLayoutCopy = _listLayout.clone();
			viewListValues( listJson, listLayoutCopy, i );
			$("#repeatArea").append( listLayoutCopy.html() );
		}
	}
	
	// 한글변환이 완료된 이곳에서 전역변수에 담아야 한다.
	// 한글변환은 viewListValues() 함수에서 하고 있음(한글이 있을 경우에만 변환)
	_listJson = listJson;

	// 목록을 선택하는 체크박스에 event 함수를 셋팅한다.
	setCheckboxEvent();
	
	// 목록 출력이 완료된 이후에 실행할 함수
	if( typeof( doAfterViewList ) == "function" ) {
		doAfterViewList();
	}
}
function viewListCount( totalCount )
{
	// 리스트 갯수 출력
	totalCount = Number( totalCount ).toLocaleString().split(".")[0];
	$("#totalCount").html( totalCount );
}

/* 태그 레이어 초기화 */
function resetTagsLayer()
{
	if( document.getElementById("tagsLayer") )
	{
		var tagsObj = $("#tagsLayer");
		var tagsLayout = tagsObj.clone();

		// 초기의 빈 리스트를 변수에 담았다면 그 변수의 값을 가져온다.
		if( _tagsLayout ) tagsLayout = _tagsLayout;

		// 초기의 빈 리스트가 사라지므로 전역변수에 담아놓는다.
		if( _tagsLayout == null || _tagsLayout == undefined ) {
			_tagsLayout = tagsObj.clone();
		}

		// 기존 목록 제거
		tagsObj.html("");
	}
}

/* 선택된 목록 찾아내기 */
function findSelectedJson() {
	var selectedIndex = $("input[type=checkbox][name=uniqId]").index( $("input[type=checkbox][name=uniqId]:checked") );
	if( $("input[type=checkbox][name=seqNo]").length > 0 ) {
		selectedIndex = $("input[type=checkbox][name=seqNo]").index( $("input[type=checkbox][name=seqNo]:checked") );
	}
	_selectedJson = _listJson[ selectedIndex ];
}

/* 선택된 목록의 값을 modifyLayer에 출력한다. */
function setSelectedModifyValues()
{
	findSelectedJson();	
	viewModifyValues( _selectedJson );
}

/* 선택된 목록의 값을 viewLayer에 출력한다. */
function setSelectedViewValues( selectedIndex ) {
	_selectedIndex = selectedIndex;
	_selectedJson = _listJson[ selectedIndex ];
	
	if( typeof(viewViewValues) == "function" ) {
		viewViewValues( _selectedJson );
	}
	
	if( typeof( doViewSearch ) == "function" ) {
		doViewSearch();
	}
}


/* 저장 버튼을 클릭하면 해당 데이타를 ajax로 저장하고 화면을 refresh한다. */
function doSave()
{
	if( typeof( "validate"+ _pageKeyBig +"VOSet" ) == "function" )
	{
		// validation 체크함수를 실행한다.
		var validateResult = eval( "validate"+ _pageKeyBig +"VOSet( document."+ _pageKey +"VOSet )" );

		// validation 체크를 실패하면 함수 실행을 중지하고 나간다.
		if( validateResult == false ) return;
	}
	
	// 사용자단의 validation 체크함수에서 실패하면 함수 실행을 중지하고 나간다.
	if( typeof( validateCheckAdd ) == "function" ) {
		if( validateCheckAdd() == false ) return;
	}

	// 저장 전에 실행할 함수
	if( typeof( doSaveBefore ) == "function" ) {
		doSaveBefore();
	}

	// 저장하기
    $.ajax({
        type: "POST",
        url: "save"+ _pageKeyBig +".do",
        data: $("[name="+ _pageKey +"Form]").serialize(),
        dataType: "text",
        success: function(resultText)
        {
           if( resultText == "SUCCESS" )
           {   
        	   if( _doSaveAfterAlert ) alert( message.alert.saveComplete );
        	   if( _doSaveAfterRefresh ) {
        		   refreshThis();
        	   }
        	   
        	   if( typeof( doSaveAfter ) == "function" ) {
        		   doSaveAfter();
        	   }
           }
           else
           {
               alert( message.alert.ajaxFail );
           }
        },
        error: function() {
            alert( message.alert.ajaxFail );
        }
    });
}


/* 검색조건을 입력하고 조회 버튼을 누르면 조건에 맞는 목록을 가져와 화면에 출력한다. */
function doSearch( pageIndex )
{	
	if( typeof( doSearchCustom ) == "function" ) {
		doSearchCustom( pageIndex );
	}

	if( typeof( doSearchCustomReturn ) == "function" ) {
		doSearchCustomReturn( pageIndex );
		return;
	}

	if( pageIndex == undefined || pageIndex == null ) pageIndex = 1;
	if( pageIndex ) $("[name='searchVo.pageIndex']").val( pageIndex );
	_pageIndex = pageIndex;
	
	if( typeof( validateSearch ) == "function" ) {
		if( validateSearch() == false ) return;
	}

	if( typeof( doSearchBefore ) == "function" ) {
		doSearchBefore();
	}

	// 검색 갯수 호출 (검색 결과를 모르는 1페이지일 때만 실행)
	if( pageIndex == 1 ) {
		if( _idDoSearchCount ) doListCountAjax();
	} else {
    	viewPageNavigation( _totalCount );
	}
	
	// 검색 목록 호출
	doListAjax();
	
	_searchClickNum++;
	
}

/* 초기화버튼 클릭시 */
function doReset()
{
	$("select[name^=searchVo]").each(function() {
		$(this).val("");
	});
	$("input[name^=searchVo][type=text]").each(function() {
		$(this).val("");
	});
	
	if( typeof( doResetAfter ) == "function" ) {
		doResetAfter();
	}
}

/* 선택된 목록을 삭제한다. */
function doDelete()
{
	if( confirm( message.alert.isDelete ) == false) {
		return;
	}
	
	if( typeof( doDeleteBeforeCheck ) == "function" ) {
		if( doDeleteBeforeCheck() == false) return;
	}
	
    $.ajax({
        type: "POST",
        url: "delete"+ _pageKeyBig +".do",
        data: $("[name="+ _pageKey +"Form]").serialize(),
        dataType: "text",
        success: function(resultText)
        {
           if( resultText == "SUCCESS" ) {
        	   alert( message.alert.deleteComplete );
        	   refreshThis();
           } else {
               alert( message.alert.ajaxFail );
           }
        },
        error: function() {
            alert( message.alert.ajaxFail );
        }
    });
}


/* 중복데이타를 체크합니다. */
function checkDuplicate( obj )
{
	// 저장하기
    $.ajax({
        type: "POST",
        url: "checkDuplicate"+ _pageKeyBig +".do",
        data: $("[name="+ _pageKey +"Form]").serialize(),
        dataType: "text",
        success: function(resultText)
        {
           if( resultText == "SUCCESS" ) {
        	   // 성공
           } else if( resultText == "EXISTS" ) {
        	   alert( message.alert.existsValue );
        	   $(obj).val("");
        	   $(obj).focus();
           } else {
               alert( message.alert.ajaxFail );
           }
        },
        error: function() {
            alert( message.alert.ajaxFail );
        }
    });
}

/* 신규버튼 클릭시 */
function doAdd()
{
	$("[id=addModifyTitle]").html( message.title.add );
	
	modifyInputReset();
	showLayerStandard( $("#modifyLayer") );
	resetTagsLayer();
	
	if( typeof( viewTagValues ) == "function" ) viewTagValues();
	if( typeof( showAddLayerAfter ) == "function" ) showAddLayerAfter();
	
	// 첫번째 textbox에 포커스
	$("input[name^=modifyVo][type=text]:first").focus();
}

/* 수정버튼 클릭시 */
function doModify()
{
	$("[id=addModifyTitle]").html( message.title.modify );
	
	setSelectedModifyValues();
	showLayerStandard( $("#modifyLayer") );
	$("[name='modifyVo.uniqId']").val( $("input[name=uniqId][type=checkbox]:checked").val() );
	resetTagsLayer();
	
	if( typeof( viewTagValues ) == "function" ) viewTagValues();
	if( typeof( showModifyLayerAfter ) == "function" ) showModifyLayerAfter();
	
	// 첫번째 textbox에 포커스
	$("input[name^=modifyVo][type=text]:first").focus();
}

/* 상세화면 레이어 보기 */
function doView( selectedIndex )
{
	setSelectedViewValues( selectedIndex );
	showLayerStandard( $("#viewLayer") );
	$("#viewLayer").show();
}

/* 닫기 버튼 클릭시 */
function doCancel()
{
	modifyInputReset();
	hideAddLayer();
}

/* 상세보기의 닫기버튼 클릭시 */
function doCancelView()
{
	hideViewLayer();
	if( typeof( doCancelViewAfter ) == "function" ) doCancelViewAfter();
}

/* 화면을 refresh한다. */
function refreshThis()
{
	if( typeof( _pageKey ) == "string" ) {
		$("[name="+ _pageKey +"Form]").submit();
	} else {
		document.location.href = document.location.href;
	}
}

/* 체크박스 클릭시 수정/삭제 버튼 보이고 안보이게 하기 */
function setCheckboxEvent()
{
	$("input[name=uniqId][type=checkbox]").each(function(){
		$(this).click(function(){
			var checkedLength = $("input[name=uniqId][type=checkbox]:checked").length;
			showHideTopButtons( checkedLength );
		});
	});
	$("input[name=seqNo][type=checkbox]").each(function(){
		$(this).click(function(){
			var checkedLength = $("input[name=seqNo][type=checkbox]:checked").length;
			showHideTopButtons( checkedLength );
		});
	});
}
function showHideTopButtons( checkedLength )
{
	if( checkedLength == 0 ) {
		hideCheckedButtons();
	} else if( checkedLength == 1 ) {
		showCheckedButtons();
	} else {
		hideShowCheckedButtons();
	}
}

/* 넘어온 검색조건이 있다면 해당 검색조건에 출력한다. */
function setSearchValues()
{
	if( _searchVoJson ) {
		$("input[name^=searchVo]").each(function(){
			var jsonName = $(this).attr("name").replace("searchVo.", "");
			if( _searchVoJson[ jsonName ] ) {
				$(this).val( _searchVoJson[ jsonName ] );
			}
		});
		
	}
}

/* 신규/수정레이어의 객체의 값을 초기화한다. */
function modifyInputReset()
{
	$("[name='modifyVo.uniqId']").val( "" );
	$("[name='modifyVo.seqNo']").val( "" );
	$("input[name^=modifyVo][type=text]").each(function(){ $(this).val( "" ); });
	$("input[name^=modifyVo][type=checkbox]").prop( "checked", false );
	$("select[name^=modifyVo]").each(function(){ $(this).val( "" ); });
	$("textarea[name^=modifyVo]").each(function(){ $(this).val( "" ); });
	
	resetTagsLayer();
	if( typeof( viewTagValues ) == "function" ) viewTagValues();
	if( typeof( addButtonFunc ) == "function" ) addButtonFunc();
}

/* 신규추가 레이어 감추기 */
function hideAddLayer() {
	$("#modifyLayer").hide();
}

/* 상세보기 레이어 감추기 */
function hideViewLayer() {
	$("#viewLayer").hide();
}

/* 목록에서 체크박스를 하나만 클릭했을 때 신규/수정 버튼 보이게 하기 */
function showCheckedButtons() {
	$("#modifyButton").show();
	$("#deleteButton").show();
	$("#changePassButton").show();
}

/* 목록에서체크박스를 모두 해제했을 때 신규/수정 버튼 안 보이게 하기 */
function hideCheckedButtons() {
	$("#modifyButton").hide();
	$("#deleteButton").hide();
	$("#changePassButton").hide();
}

/* 목록에서 체크박스를 두개 이상 선택했을 때 수정 버튼은 숨기고, 삭제 버튼은 보이게 하기 */
function hideShowCheckedButtons() {
	$("#modifyButton").hide();
	$("#changePassButton").hide();
	$("#deleteButton").show();
}

/* 레이어를 보여주는 위치 셋팅(공통) */
function showLayerStandard( obj )
{	
	$(obj).show();

	var layerLeft = ( $("#Wrap").width() - $(obj).width() ) / 2;
	var layerTop = 80;
	$(obj).offset({left:layerLeft, top:layerTop});
}

/* contextPath 가져오기 */
function getUrlContextPath() {
	var offset = location.href.indexOf( location.host ) + location.host.length;
	var uniPath = location.href.substring( offset, location.href.indexOf("/", offset + 1) );
	return uniPath;
}

/*
 * ajax 로딩바 보이기
 */
function showLoadingImage()
{
	if( $("#ajaxLoadingLayer").length > 0 )
	{
		var leftPos = ( $("body").width() - $("#ajaxLoadingLayer").width() ) / 2;
		var topPos = 300;
		
		$("#ajaxLoadingLayer").css("position", "absolute")
										 .css("left", leftPos)
										 .css("top", topPos)
										 .width( $("#ajaxLoadingLayer > img").width() )
										 .height( $("#ajaxLoadingLayer > img").height() )
										 .fadeIn(300)
		;
	}
}

/*
 * ajax 로딩바 숨기기
 */
function hideLoadingImage() {
	$("#ajaxLoadingLayer").fadeOut(300);
}

$(document).ready(function(){

	// 페이지별로 앞부분에 실행할 함수
	if( typeof(funcReadyFirst) == "function" ) {
		funcReadyFirst();
	}
	
	// pageKey 셋팅
	$("[name=pageKey]").val( _pageKey );
	
	// 리스트 레이어 초기화
	initListLayer();
	
	// 페이지 레이어 초기화
	initPageLayer();
	
	// 버튼 이벤트 셋팅
	funcEvents();

	// 수정/삭제 버튼을 숨긴다.
	hideCheckedButtons();
	
	// 검색조건 값 셋팅
	setSearchValues();

	// 목록 출력
	if( _isInitDoSearch ) doSearch();

	// 페이지별로 뒷부분에 실행할 함수
	if( typeof( funcReadyLast ) == "function" ) {
		funcReadyLast();
	}
});
