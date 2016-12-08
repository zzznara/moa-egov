
/* 
 * # moa-search.js 파일 설명
 * -------------------------------------------------------------------------------
 * - 목록(list) 화면에 공통으로 실행할 함수들의 모음입니다.
 * -------------------------------------------------------------------------------
 * 생성자 : 최우진
 * 생성일 : 2016.10.05
 * 
 */

var MoaSearch =
{
		options :
		{
				listObj : $("#repeatArea"),
				notExistsObj : $("#notExistsArea"),
				layoutObj : $("#layout").clone(),
				pageIndex : 1,
				isSearchCount : true,
				isUsePage : true,
				keyJson : null,
				listUrl : null,
				listJson : null,
				listCountUrl : null,
				totalCount : null,
				totalCountObj : null,
				callViewValues : null,
				callBefore : null,
				callListBefore : null,
				callListAfter : null,
				callListCountBefore : null,
				callListCountAfter : null
		},

		/* 리스트 레이어 초기화 */
		initListLayer : function()
		{
			// 기존 목록 제거
			MoaSearch.options.listObj.empty().append( MoaSearch.options.notExistsObj.html() );
		},
		
		viewListValues : function ( jsonObj, layoutObj )
		{
				if( MoaSearch.options.keyJson )
				{
					var keyJsonLength = MoaSearch.options.keyJson.length;
					for( var i = 0; i < keyJsonLength; i++ ) {
						var val = jsonObj[ MoaSearch.options.keyJson[i].jsonKey ];
						if( MoaSearch.options.keyJson[i].type == "numberComma" ) val = Number( val ).toLocaleString();
						layoutObj.find( MoaSearch.options.keyJson[i].obj ).html( MoaStringUtil.funcDecodeUri( val ) );
					}
				}
				else
				{
					if( $.isFunction( funcCustomLayout ) ) {
						layoutObj = funcCustomLayout( jsonObj, layoutObj );
					}
				}

				return layoutObj;
		},
			
		viewList : function( jsonObj )
		{
				// 리스트 레이어 초기화
				MoaSearch.options.listObj.empty();
			
				// 리스트 출력
				var listJsonLength = jsonObj.length;
				if( listJsonLength == 0 )
				{
					MoaSearch.options.listObj.html( MoaSearch.options.notExistsObj.html() );
				}
				else
				{
					for(var i = 0; i < listJsonLength; i++ )
					{
						var layoutObj = MoaSearch.options.layoutObj.clone();
						layoutObj = MoaSearch.viewListValues( jsonObj[i], layoutObj );
						MoaSearch.options.listObj.append( layoutObj.html() );
					}
				}
		},
		
		viewListCount : function()
		{
				// 리스트 갯수 출력 (세자리 콤마도 함께)
				var totalCount = Number( MoaSearch.options.totalCount ).toLocaleString().split(".")[0];
				if( MoaSearch.options.totalCountObj ) MoaSearch.options.totalCountObj.html( totalCount );
		},
	
		doListJson : function( jsonObj )
		{
				MoaSearch.viewList( jsonObj );

	        	// 목록 갯수 가져오는 쿼리를 따로 실행하지 않을 경우 목록의 총갯수를 셋팅하자. 
	        	if( MoaSearch.options.isSearchCount == false ) {
	        		MoaSearch.options.totalCount = jsonObj.length;
	        		MoaSearch.viewListCount();
	        	}

	        	if( MoaSearch.options.callListAfter ) MoaSearch.options.callListAfter.call();
		},

		doListAjax : function()
		{
	        	if( MoaSearch.options.callListBefore ) MoaSearch.options.callListBefore.call();
	        	
			    $.ajax({
			        type: "post",
			        url: MoaSearch.options.listUrl,
			        data: MoaSearch.options.form.serialize(),
			        dataType: "json",
			        success: function( jsonObj )
			        {
			        		MoaSearch.doListJson( jsonObj );
			        },
			        error: function() {
			            	alert( message.alert.ajaxFail );
			        }
			    });
		},
			
		doListCountAjax : function()
		{
	        	if( MoaSearch.options.callListCountBefore )  MoaSearch.options.callListCountBefore.call();
				
			    $.ajax({
			        type: "post",
			        url: MoaSearch.options.listCountUrl,
			        data: MoaSearch.options.form.serialize(),
			        dataType: "text",
			        success: function( totalCount )
			        {
			        		MoaSearch.options.totalCount = totalCount;
			        		MoaSearch.viewListCount();
							if( typeof( MoaPagenavi.view ) == "function" ) {
								MoaPagenavi.view( MoaSearch.options.totalCount, $("[name='searchVo.pageUnit']").val() );
							}
				        	if( MoaSearch.options.callListCountAfter )  MoaSearch.options.callListCountAfter.call();
			        },
			        error: function() {
			            	alert( message.alert.ajaxFail );
			        }
			    });
		},
	
		/* 검색조건을 입력하고 조회 버튼을 누르면 조건에 맞는 목록을 가져와 화면에 출력한다. */
		search : function( options )
		{
				MoaSearch.options = $.extend(MoaSearch.options, options);
			
				if( MoaSearch.options.callBefore ) {
					MoaSearch.options.callBefore.call();
				}

				$("[name='searchVo.pageIndex']").val( MoaSearch.options.pageIndex );
				
				// 레이아웃 초기화
				MoaSearch.initListLayer();
				
				if( MoaSearch.options.validate ) {
					if( MoaSearch.options.validate() == false ) return;
				}

				// 검색 갯수 호출 (검색 결과를 모르는 1페이지일 때만 실행)
				if( MoaSearch.options.isUsePage && MoaSearch.options.pageIndex == "1" )
				{
					if( MoaSearch.options.isSearchCount ) MoaSearch.doListCountAjax();
				}
				else
				{
					if( !MoaSearch.options.totalCount ) MoaSearch.options.totalCount = MoaSearch.totalCount;
					MoaSearch.viewListCount();
					
					if( typeof( MoaPagenavi ) == "object" ) {
						if( typeof( MoaPagenavi.view ) == "function" ) {
							MoaPagenavi.view( MoaSearch.options.totalCount, $("[name='searchVo.pageUnit']").val() );
						}
					}
				}
				
				// 검색 목록 호출
				if( MoaSearch.options.listJson ) {
					MoaSearch.doListJson( MoaSearch.options.listJson );
				} else if( MoaSearch.options.listUrl ) {
					MoaSearch.doListAjax();
				}
		}
};
