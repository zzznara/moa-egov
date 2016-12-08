
/* 
 * # moa-search.js 파일 설명
 * -------------------------------------------------------------------------------
 * - 목록(list) 화면에 공통으로 실행할 함수들의 모음입니다.
 * -------------------------------------------------------------------------------
 * 생성자 : 최우진
 * 생성일 : 2016.10.05
 * 
 */

var MoaSearch = {
		_totalCount : null
}

jQuery(function($)
{
	$.fn.moaSearch = function( options )
	{
			var defaults = {
				listObj : $("#repeatArea", this),
				notExistsObj : $("#notExistsArea", this),
				layoutObj : $("#layout", this).clone(),
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
			};
			
			options = $.extend(defaults, options);
		
			var $thisObj = this;

			var Moa = {

					/* 리스트 레이어 초기화 */
					initListLayer : function()
					{
						// 기존 목록 제거
						options.listObj.empty().append( options.notExistsObj.html() );
					},
					
					viewListValues : function ( jsonObj, layoutObj )
					{
							if( options.keyJson )
							{
								var keyJsonLength = options.keyJson.length;
								for( var i = 0; i < keyJsonLength; i++ ) {
									var val = jsonObj[ options.keyJson[i].jsonKey ];
									if( options.keyJson[i].type == "numberComma" ) val = Number( val ).toLocaleString();
									layoutObj.find( options.keyJson[i].obj ).html( MoaStringUtil.funcDecodeUri( val ) );
								}
							}

							return layoutObj;
					},
					
					viewList : function( jsonObj )
					{
							// 리스트 레이어 초기화
							options.listObj.empty();
						
							// 리스트 출력
							var listJsonLength = jsonObj.length;
							if( listJsonLength == 0 )
							{
								options.listObj.html( options.notExistsObj.html() );
							}
							else
							{
								for(var i = 0; i < listJsonLength; i++ )
								{
									var layoutObj = options.layoutObj.clone();
									layoutObj = Moa.viewListValues( jsonObj[i], layoutObj );
									options.listObj.append( layoutObj.html() );
								}
							}
					},
					
					viewListCount : function()
					{
							// 리스트 갯수 출력 (세자리 콤마도 함께)
							var totalCount = Number( options.totalCount ).toLocaleString().split(".")[0];
							if( options.totalCountObj ) options.totalCountObj.html( totalCount );
					},
			
					doListJson : function( jsonObj )
					{
				        	Moa.viewList( jsonObj );
	
				        	// 목록 갯수 가져오는 쿼리를 따로 실행하지 않을 경우 목록의 총갯수를 셋팅하자. 
				        	if( options.isSearchCount == false ) {
				            	options.totalCount = jsonObj.length;
				            	Moa.viewListCount();
				        	}
	
				        	if( options.callListAfter ) options.callListAfter.call();
					},
			
					doListAjax : function()
					{
				        	if( options.callListBefore ) options.callListBefore.call();
				        	
						    $.ajax({
						        type: "post",
						        url: options.listUrl,
						        data: options.form.serialize(),
						        dataType: "json",
						        success: function( jsonObj )
						        {
							        	Moa.doListJson( jsonObj );
						        },
						        error: function() {
						            	alert( message.alert.ajaxFail );
						        }
						    });
					},
					
					doListCountAjax : function()
					{
				        	if( options.callListCountBefore )  options.callListCountBefore.call();
							
						    $.ajax({
						        type: "post",
						        url: options.listCountUrl,
						        data: options.form.serialize(),
						        dataType: "text",
						        success: function( totalCount )
						        {
						        		MoaSearch._totalCount = totalCount;
							        	options.totalCount = totalCount;
							        	Moa.viewListCount();
										if( typeof( MoaPagenavi.view ) == "function" ) {
											MoaPagenavi.view( options.totalCount, $("[name='searchVo.pageUnit']").val() );
										}
							        	if( options.callListCountAfter )  options.callListCountAfter.call();
						        },
						        error: function() {
						            	alert( message.alert.ajaxFail );
						        }
						    });
					},
			
					/* 검색조건을 입력하고 조회 버튼을 누르면 조건에 맞는 목록을 가져와 화면에 출력한다. */
					search : function()
					{
							if( options.callBefore ) {
								options.callBefore.call();
							}

							$("[name='searchVo.pageIndex']").val( options.pageIndex );
							
							// 레이아웃 초기화
							Moa.initListLayer();
							
							if( options.validate ) {
								if( options.validate() == false ) return;
							}
						
							// 검색 갯수 호출 (검색 결과를 모르는 1페이지일 때만 실행)
							if( options.pageIndex == "1" )
							{
								if( options.isSearchCount ) Moa.doListCountAjax();
							}
							else
							{
								if( !options.totalCount ) options.totalCount = MoaSearch._totalCount;
								Moa.viewListCount();
								
								if( typeof( MoaPagenavi.view ) == "function" ) {
									MoaPagenavi.view( options.totalCount, $("[name='searchVo.pageUnit']").val() );
								}
							}
							
							// 검색 목록 호출
							if( options.listJson ) {
								Moa.doListJson( options.listJson );
							} else if( options.listUrl ) {
								Moa.doListAjax();
							}
					}
			};
			
			return this.each( function()
			{
					Moa.search();
			});
	}
});
