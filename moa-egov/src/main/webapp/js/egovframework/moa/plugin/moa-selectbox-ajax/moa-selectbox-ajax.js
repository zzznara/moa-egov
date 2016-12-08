/*
 * selectbox에 리스트를 ajax로 받아와서 뿌려주는 jQuery Plugin
 * 작성자 : 최우진(woojin.choi)
 * 작성일 : 2015.0702
 * 
 * #사용법
 * $("[name='selectbox명']").moaAjaxSelectboxList(실행할 url, 파라미터);
 * 
 * - name이 'modifyVo.dicType'인 selectbox에 리스트를 출력한다. 
 * $("[name='modifyVo.dicType']").moaAjaxSelectboxList("dicTypeListAjax.do", $("[name=wordDicVOSet]").serialize());
 * 
 * - name이 'modifyVo.dicType'인 selectbox에 리스트를 출력하고 맨 위쪽에 빈값의 리스트를 추가한다. * 
 * $("[name='modifyVo.dicType']").moaAjaxSelectboxList("dicTypeListAjax.do", $("[name=wordDicVOSet]").serialize(), "blank");
 */


jQuery(function($)
{
	$.fn.moaAjaxSelectboxList = function( url, data, firstOption, callbackfunc, selectedVal )
	{	
		var $thisObj = this;

		return this.each( function()
		{
			/* 한글 디코딩 */
			var funcDecodeUri = function( str ) {
				// decodeURIComponent()만 하면 공백이 +로 보이는 문제가 있어서 +를 공백으로 치환한다.
				if( str ) str = decodeURIComponent( str.replace(/\+/g, " ") );
				return str;
			},
			
			/* selectbox 태그 안에 들어갈 내용 만들기 */
			getSelectOptionList = function( optionListJson, selectedVal )
			{
				var optionListStr = "";
				for(var i = 0; i < optionListJson.length; i++ )
				{
					var addSelected = "";
					var code = optionListJson[i].code;
					var value = funcDecodeUri( optionListJson[i].value );
					if( selectedVal == code ) {
						addSelected = "selected";
					}
					optionListStr += "<option value='"+ code +"' "+ addSelected +">"+ value +"</option> \n";
				}
				
				if( firstOption) {
					if( firstOption == "blank" ) {
						optionListStr = "<option></option>"+ optionListStr;
					} else if( firstOption == "all" ) {
						optionListStr = "<option value=''>전체</option>"+ optionListStr;
					} else if( firstOption == "select" ) {
						optionListStr = "<option value=''>선택</option>"+ optionListStr;
					}
				}
				
				return optionListStr;
			};

			/* option 목록 ajax로 불러오기 */
		    $.ajax({
		        type: "POST",
		        url: url,
		        data: data,
		        dataType: "json",
		        success: function(result)
		        {
			        	var optionListStr = getSelectOptionList( result, selectedVal );
			        	$thisObj.html("");
			        	$thisObj.append( optionListStr );
			        	
			        	if( callbackfunc ) eval( callbackfunc );
		        },
		        error: function() {
		            alert("호출에 실패했습니다.");
		        }
		    });
		});
	}
});




