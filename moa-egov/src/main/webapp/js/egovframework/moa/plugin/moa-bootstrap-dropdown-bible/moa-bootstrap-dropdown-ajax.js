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
				json : null,
				url : null,
				params : null,
				hiddenName : null,
				selectedVal : null,
				widthCount : 1,
				onclick : null,
				callback : null,
				margin : null
			};
			
			options = $.extend(defaults, options);

			var $thisObj = this;

			var _layout = "<div class='dropdown form-group'>"
							 + "	<input type='hidden' name='"+ options.hiddenName +"' value='1' />"
							 + "	<a class='btn btn-default dropdown-toggle' type='button' id='"+ options.hiddenName +"' data-toggle='dropdown' aria-expanded='true' role='button' aria-expanded='false'>"
							 + "		<!--선택된 목록의 Text가 출력될 곳 -->"
							 + "		<span class='caret'></span>"
							 + "	</a>"
							 + "	<div class='dropdown-menu' role='menu' aria-labelledby='"+ options.hiddenName +"'>"
							 + "		<table>"
							 + "			<tbody>"
							 + "				<tr>"
							 + "					<td role='presentation'><a role='menuitem' class='default' tabindex='-1' href='#' seq-no='' code='' text='' language='' enum-name='' chapter-num='' class-name='defalut'></a></td>"
							 + "				</tr>"
							 + "			</tbody>"
							 + "		</table>"
							 + "	</div>"
							 + "</div>"
							 ;
			
			var MoaEvent = {
					
					/* 클릭시 */
					listClick : function( $obj )
					{
							$obj.find(".dropdown-menu [role=presentation] a").each(function(){
								$(this).click(function(){
									$obj.find("input").val( $(this).attr("seq-no") );
									if( $(this).attr("testament") ) $("[name='searchVo.testament']").val( $(this).attr("testament") );
									else $("[name='searchVo.testament']").val( "" );
									$obj.find("a[type=button]").empty().append(
											$(this).html() +"\n",
											$( _layout ).find(".btn > span")
									);
									MoaUtil.funcSelected( $(this) );
									if( options.onclick ) options.onclick.call();
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
					
					/* 선택된 목록 */
					funcSelected : function( obj )
					{
							obj.parents(".dropdown-menu").find(".active").removeClass("active").addClass("default");
							obj.removeClass("default").addClass("active");
					},
					
					/* selectbox 태그 안에 들어갈 내용 만들기 */
					getDropdownList : function( jsonObj, selectedVal )
					{
							var $obj = $( _layout ).clone();	
							var str = "";
							var jsonLength = jsonObj.length;

							for(var i = 0; i < jsonLength; i++ )
							{
									$objUl = $( _layout ).find(".dropdown-menu table tr").clone();
									
									// name 값이 없으면 <td></td>만 만들고 건너뛴다.
									if( jsonObj[i]["name"] == "" ) {
										str += "<td></td>";
										continue;
									}
									
									var name = MoaUtil.funcDecodeUri( jsonObj[i].name );

									$objUl.find("a").attr("seq-no", jsonObj[i].seqNo)
														 .attr("code", jsonObj[i].code)
														 .attr("text", MoaUtil.funcDecodeUri( name ))
														 .attr("language", jsonObj[i].language)
														 .attr("testament", jsonObj[i].testament)
														 .html( MoaUtil.funcDecodeUri( name ) )
									;
									
									if( jsonObj[i].enumName ) $objUl.find("a").attr("enum-name", jsonObj[i].enumName);
									if( jsonObj[i].chapterNum ) $objUl.find("a").attr("chapter-num", jsonObj[i].chapterNum);
									if( jsonObj[i].className ) {
										$objUl.find("a").attr("class-name", jsonObj[i].className);
										$objUl.find("a").removeClass().addClass( jsonObj[i].className );
									}

									// 선택된 값이 있을 경우
									if( selectedVal ) {
										if( selectedVal == jsonObj[i].seqNo ) {
											$obj.find("input[name='"+ options.hiddenName +"']").val( jsonObj[i].seqNo );
											$obj.find("a[type=button]").prepend( name );
											MoaUtil.funcSelected( $objUl.find("a") );
										}
									}
									else
									{
										if( i == 0 ) {
											$obj.find("input[name='"+ options.hiddenName +"']").val( jsonObj[i].seqNo );
											$obj.find("a[type=button]").prepend( name );
											MoaUtil.funcSelected( $objUl.find("a") );
										}
									}
									
									str += $objUl.html();
							}

							if( str )
							{
									var $listObj = $("<table><tr>"+ str +"</tr></table>");
									var tdLength = $listObj.find("td").length;

									// 부족한 td 추가하기
									if( tdLength % options.widthCount != 0 ) {
										for(var i = 0; i < ( options.widthCount - tdLength % options.widthCount); i++ ) {
											$listObj.append( $( _layout ).find(".dropdown-menu table tr td").clone().empty() );
										}
									}

									// 가로 갯수에 맞춰 tr 넣기
									var $tableObj = $("<table/>");
									$listObj.find("td").each(function( index ){
										if( index % options.widthCount == 0 ) {
											$tableObj.append( $("<tr/>") );
										}
										$tableObj.find("tr:last").append( $(this) );
									});
									
									$obj.find(".dropdown-menu").empty().append( $tableObj );
							}

							return $obj;
					},
					
					/* data를 목록에 출력하기 */
					viewData : function( jsonObj )
					{
							if( jsonObj )
							{
						        	var $obj = MoaUtil.getDropdownList( jsonObj, options.selectedVal );
						        	if( options.margin ) $obj.css( options.margin );
						        	$thisObj.empty().append( $obj.html() );
						        	MoaEvent.listClick( $thisObj );
							}
							
							if( options.callback ) options.callback.call();
					},
					
					/* ajax로 목록 불러오기 */
					callAjax : function()
					{
						    $.ajax({
						        type: "POST",
						        url: options.url,
						        data: options.params,
						        dataType: "json",
						        success: function( jsonObj )
						        {
							        	MoaUtil.viewData( jsonObj );
						        },
						        error: function() {
						            	alert("호출에 실패했습니다.");
						        }
						    });
					}
			};
	
			return this.each( function()
			{
					if( options.json ) {
						MoaUtil.viewData( options.json );
					} else if( options.url ) {
						MoaUtil.callAjax();
					} else if( options.isOnlyEvent ) {
						if( options.eventTarget ) MoaEvent.listClick( options.eventTarget );
					}
			});
	}
});

jQuery(function($)
{
	$.moaBootstrapDropdown = function( options )
	{
			var defaults = {
				target : null,
				hiddenObj : null,
				callback : null
			};

			options = $.extend(defaults, options);
			
			var $obj = options.target;

			if( $obj )
			{
				var $layout = $obj.clone();

				$obj.find(".dropdown-menu [role=presentation] a").each(function(){
					
					if( options.hiddenObj.val() == $(this).attr("seq-no") ) {
						$(this).removeClass().addClass("active");
					}
					
					$(this).click(function(){

						var isChange = false;
						if( options.hiddenObj.val() != $(this).attr("seq-no") ) {
							isChange = true;
						}

						$obj.find("input").val( $(this).attr("seq-no") );
						$obj.find("a[type=button]").empty().append(
								$(this).html() +"\n",
								$layout.find(".btn > span")
						);

						$(this).parents(".dropdown-menu").find(".active").each(function(){
							$(this).removeClass().addClass( $(this).attr("class-name") );
						});
						$(this).removeClass().addClass("active");

						// 선택한 값이 바꼈다면 callback을 실행한다.
						//if( isChange ) {
							if( options.callback ) options.callback.call();
						//}
					});
				});
			}
	}
});