/**
 *
 * 파일명 : bibleByTranslateList.js
 * 설 명 : 성경DB 생성 자바스크립트
 *
 *     수정일           수정자      Version     내용
 * ---------------  ---------  ----------  ----------------------------
 *  2016.08.06     최우진        1.0        최초생성
 *
 */


$(function(){
	
	MoaSearch.search({
		listUrl: "/moa/bible/bibleFileLIstAjax.do",
		form: $("#saveForm"),
		isSearchCount: false,
		isUsePage: false
	});
	
});

// 목록을 뿌려주기
function funcCustomLayout( jsonObj, layoutObj )
{
	layoutObj.find("[id='list.name']").html( MoaStringUtil.funcDecodeUri( jsonObj.name ) );
	layoutObj.find("[id='list.create']").attr( "href", "javascript:createBible('"+ jsonObj.name +"')" );
	layoutObj.find("[id='list.drop']").attr( "href", "javascript:dropBible('"+ jsonObj.name +"')" );
	return layoutObj;
}

function validate( fileName )
{
	var splitName = fileName.split("-");
	
	if( fileName.indexOf("-") == -1 ) {
		alert("파일명[번역본명-코드.txt]이 형식에 맞지 않습니다.");
		return false;
	}
	
	if( splitName.length < 3) {
		alert("파일명[번역본명-코드-국가코드.txt]이 형식에 맞지 않습니다.");
		return false;
	}
	
	if( splitName[0] == "" || splitName[1] == "" || splitName[2] == "" ) {
		alert("파일명[번역본명-코드-국가코드.txt]이 형식에 맞지 않습니다.");
		return false;
	}
	
	return true;
}

// 선택된 성경 DB (재)생성하기
function createBible( fileName )
{
	if( validate( fileName ) == false ) {
		return;
	}
	
	var splitName = fileName.split("-");
	var bibleName = splitName[0];
	var bibleCode = splitName[1];
	var bibleLang = splitName[2].replace(/.txt/, "");
	
	$("[name=fileName]").val( fileName );
	$("[name='bibleByTranslateVo.code']").val( bibleCode );
	$("[name='bibleByTranslateVo.name']").val( bibleName );
	$("[name='bibleByTranslateVo.language']").val( bibleLang );
	
	if( confirm("기존 성경데이터를 모두 삭제하고 다시 생성합니다.\n"+ bibleName +" 데이타를 다시 생성하시겠습니까?") == false ) {
		return;
	}
	
	$.ajax({
	    type: "post",
	    url: "saveBible.do",
	    data: $("[name=saveForm]").serialize(),
	    dataType: "text",
	    success: function( result )
	    {
	    	if( result == "SUCCESS" ) {
		        alert( bibleName +" 성경DB 생성을 완료했습니다." );
	    	} else {
		        alert( bibleName +" 성경DB 생성에 실패했습니다." );
	    	}
	    },
	    error: function() {
	        alert( bibleName +" 성경DB 생성에 실패했습니다." );
	    }
	});
}

//선택된 성경 DB 삭제하기
function dropBible( fileName )
{
	if( validate( fileName ) == false ) {
		return;
	}

	var splitName = fileName.split("-");
	var bibleName = splitName[0];
	var bibleCode = splitName[1];
	var bibleLang = splitName[2].replace(/.txt/, "");
	
	$("[name=fileName]").val( fileName );
	$("[name='bibleByTranslateVo.code']").val( bibleCode );
	$("[name='bibleByTranslateVo.name']").val( bibleName );
	$("[name='bibleByTranslateVo.language']").val( bibleLang );
	
	if( confirm(bibleName +" 성경 데이터를 모두 삭제하시겠습니까?") == false ) {
		return;
	}
	
	$.ajax({
	    type: "post",
	    url: "dropBible.do",
	    data: $("[name=saveForm]").serialize(),
	    dataType: "text",
	    success: function( result )
	    {
	    	if( result == "SUCCESS" ) {
		        alert( bibleName +" 성경DB를 삭제했습니다." );
	    	} else {
		        alert( bibleName +" 성경DB 삭제에 실패했습니다." );
	    	}
	    },
	    error: function() {
	        alert( bibleName +" 성경DB 삭제에 실패했습니다." );
	    }
	});
}

