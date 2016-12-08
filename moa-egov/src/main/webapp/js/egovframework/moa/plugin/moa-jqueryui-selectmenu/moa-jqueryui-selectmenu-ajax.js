/*
 * 리스트를 ajax로 받아와서 bootstrap dropdown 버튼을 만들어주는 jQuery Plugin
 * 작성자 : 최우진(woojin.choi)
 * 작성일 : 2016.09.20
 * 
 * #사용법
 * $("#실행할곳id").moaBootstrapDropdown(실행할 url, 파라미터, hidden객체명, 선택된값, 출력할위치, 콜백함수);
 * 
 * - id가 'dropdown'인 곳에 dropdown 메뉴를 출력한다. 
 * $("#dropdown").moaBootstrapDropdown("bibleListAjax.do", $("[name=searchForm]").serialize(), "searchVo.translateSeqNo");
 * 
 */


jQuery(function($)
{
	$.fn.moaBootstrapDropdown = function( options )
	{
			var defaults = {
				url : null,
				params : null,
				hiddenName : null,
				selectedVal : null,
				position : null,
				callback : null
			};
			
			options = $.extend(defaults, options);
		
			var $thisObj = this;

			var _layout = "<div class='dropdown' id='"+ options.hiddenName +".layer'>"
							 + "	<input type='hidden' name='"+ options.hiddenName +"' />"
							 + "	<button class='btn btn-default dropdown-toggle' type='button' id='"+ options.hiddenName +"' data-toggle='dropdown' aria-expanded='true'>"
							 + "		<!--선택된 목록의 Text가 출력될 곳 -->"
							 + "		<span class='caret'></span>"
							 + "	</button>"
							 + "	<ul class='dropdown-menu' role='menu' aria-labelledby='"+ options.hiddenName +"'>"
							 + "		<li role='presentation'><a role='menuitem' tabindex='-1' href='#' code='' text=''></a></li>"
							 + "	</ul>"
							 + "</div>"
							 ;
			
			var MoaEvent = {
					
					/* 클릭시 */
					listClick : function( $obj )
					{
							$obj.find("ul > li").each(function(){
								$(this).click(function(){
									$obj.find("input").val( $(this).find("a").attr("code") );
									$obj.find("button").empty().append(
											$(this).find("a").html() +"\n",
											$( _layout ).find("button > span")
									);
								});
							});
					}
					
			};
			
			var MoaUtil = {
					
					/* 한글 디코딩 */
					funcDecodeUri : function( str )
					{
						// decodeURIComponent()만 하면 공백이 +로 보이는 문제가 있어서 +를 공백으로 치환한다.
						if( str ) str = decodeURIComponent( str.replace(/\+/g, " ") );
						return str;
					},
					
					/* selectbox 태그 안에 들어갈 내용 만들기 */
					getDropdownList : function( jsonObj, selectedVal )
					{
							var $obj = $( _layout ).clone();					
							var str = "";
							var jsonLength = jsonObj.length;
							
							for(var i = 0; i < jsonLength; i++ )
							{
									$objUl = $( _layout ).find("ul").clone();
									var code = jsonObj[i].code
									var name = MoaUtil.funcDecodeUri( jsonObj[i].name );

									$objUl.find("a").attr("code", code).attr("text", name).html( name )

									if( selectedVal ) {
										if( selectedVal == code ) {
											$obj.find("input[name='"+ options.hiddenName +"']").val( code );
											$obj.find("button").prepend( name );
										}
									}
									else
									{
										if( i == 0 ) {
											$obj.find("input[name='"+ options.hiddenName +"']").val( code );
											$obj.find("button").prepend( name );
										}
									}
									
									str += $objUl.html();
							}

							if( str ) $obj.find("ul").empty().html( str );
							
							if( jsonLength > 0 ) {
								MoaEvent.listClick( $obj );
							}
							
							return $obj;
					}
			};
	
			return this.each( function()
			{
					/* ajax로 데이타 불러오기 */
				    $.ajax({
				        type: "POST",
				        url: options.url,
				        data: options.params,
				        dataType: "json",
				        success: function( jsonObj )
				        {
					        	var $obj = MoaUtil.getDropdownList( jsonObj, options.selectedVal );

					        	if( $thisObj.find("[id='"+ options.hiddenName +".layer']").length > 0) {
					        		$thisObj.find("[id='"+ options.hiddenName +".layer']").remove();
					        	}
					        	
					        	if( options.position == "left") $thisObj.prepend( $obj );
					        	else $thisObj.append( $obj );
					        	
					        	if( options.callback ) eval( options.callback );
				        },
				        error: function() {
				            	alert("호출에 실패했습니다.");
				        }
				    });
			});
	}
});




