/**
 *
 * 파일명 : bibleSearchList.js
 * 설 명 : 성경 검색 목록 자바스크립트
 *
 *       수정일        수정자      Version      내용
 * --------------  ---------  ------------  ----------------------------
 *  2015.06.23    최우진        1.0        최초생성
 *
 */


/*****************************************************************************
 * 여기부터는 공통으로 넣어주는 함수 (페이지에 맞게 함수 안의 내용은 바꿔주어야 한다.)
 *****************************************************************************/

		var _pageKeyBig = _pageKey.substring(0, 1).toUpperCase() + _pageKey.substring(1);
		var _isInitDoSearch = false; 		// 화면로드시 조회할지 여부
		var _idDoSearchCount = true;		// 조회시 count 가져오는 퀴리도 실행할지 여부
		var _doSaveAfterAlert = true;
		var _doSaveAfterRefresh = true;
		var _isSetDtoCombo = true;		// DTO의 combo를 변수에 담을지 여부
		
		/* 목록에 해당 값을 뿌려준다. */
		function viewListValues( listJson, listLayout, i )
		{
			listJson[i].sortBibleName = moaStringUtil.funcDecodeUri( listJson[i].sortBibleName );
			var wordsIndex = listJson[i].sortBibleName +" "+ listJson[i].chapter +":"+ listJson[i].verse;

			listLayout.find("[id='list.wordsIndex']").html( wordsIndex );
			moaStringUtil.setListColumnValues( "words", listJson, listLayout, i );
		}

		/* $(document).ready() 메소드 안에서 제일 먼저 시작될 함수 */
		function funcReadyFirst()
		{
			// 번역본 성경 combo 채우기
			funcMakeTransCombo();
			
			// 성경 목록 combo 채우기
			funcMakeSortCombo();
			
			// 이벤트 함수 셋팅
			funcEventsCustom();
			
			// 검색어 셋팅
			$("[name='searchVo.words']").val( _searchVoJson.words );
			
			// 검색하자.
			doSearchCustomReturn(1);
		}

		/* $(document).ready() 함수의 마지막에 시작될 함수 */
		function funcReadyLast() {
		}

/*****************************************************************************
 * 여기까지는 공통으로 넣어주는 함수 (추가할 함수는 아래쪽에 입력해 주세요.)
 *****************************************************************************/

		function funcMakeTransCombo()
		{
			if( _searchVoJson.translateSeqNo == 0 ) {
				_searchVoJson.translateSeqNo = 1;
			}
			
			// 번역본 성경 combo 만들기
			var transObj = $("[name='searchVo.translateSeqNo']");
			if( _dto.comboList ) {
				for( var i = 0; i < _dto.comboList[0].length; i++ ) {
					var optionObj = $("<option/>").val( _dto.comboList[0][i].code ).text( moaStringUtil.funcDecodeUri( _dto.comboList[0][i].value ) );
					if( _searchVoJson.translateSeqNo == optionObj.val() ) {
						optionObj.prop("selected", true);
					}
					transObj.append( optionObj  )
				}
			}
		}
		
		function funcMakeSortCombo()
		{
			// 성경 목록 combo 만들기
			var sortObj = $("[name='searchVo.sortSeqNo']");
			if( _dto.comboList ) {
				for( i = 0; i < _dto.comboList[1].length; i++ ) {
					var optionObj = $("<option/>").val( _dto.comboList[1][i].code ).text( moaStringUtil.funcDecodeUri( _dto.comboList[1][i].value ) );
					if( _searchVoJson.sortSeqNo == optionObj.val() ) {
						optionObj.prop("selected", true);
					}
					sortObj.append( optionObj )
				}
			}			
		}
		
		function funcEventsCustom() {
			$("[name='searchVo.translateSeqNo']").change(function(){
				doSearchCustom(1);
			});
			$("[name='searchVo.sortSeqNo']").change(function(){
				doSearchCustom(1);
			});
		}
		
		function doSearchCustomReturn( pageIndex )
		{
			// 페이지번호 셋팅
			pageIndex = moaStringUtil.nvl( pageIndex, 1 );
			if( pageIndex ) $("[name='searchVo.pageIndex']").val( pageIndex );
			_pageIndex = pageIndex;
			
			if( typeof( validateSearch ) == "function" ) {
				if( validateSearch() == false ) return;
			}
			
			$("[name='searchVo.chapter']").val( pageIndex );

			// 검색어가 없다면 말씀모드로
			var keywords = $.trim( $("[name='searchVo.words']").val() );
			if( !keywords ) {
				$("[name="+ _pageKey +"Form]").attr("action", "bibleList.do");
				$("[name="+ _pageKey +"Form]").submit();
				return;
			}
			
			// 검색 갯수 호출 (검색 결과를 모르는 1페이지일 때만 실행)
			if( pageIndex == 1 ) doListCountAjaxCustom();
			else viewPageNavigation( _totalCount, 10 );
			
			// 검색 목록 호출
			doListAjaxCustom();
			
			_searchClickNum++;
			
			return false;
		}
		
		function doListCountAjaxCustom()
		{
		    $.ajax({
		        type: "post",
		        url: _pageKey +"ListCountAjax.do",
		        data: $("[name="+ _pageKey +"Form]").serialize(),
		        dataType: "json",
		        success: function( jsonObj )
		        {
		        	if( jsonObj.length > 0 )
		        	{
			        	_totalCount = parseInt( jsonObj[0].chapterNum ) * 10;
			        	viewPageNavigation( _totalCount, 10 );
		        	}
		        },
		        error: function() {
		            alert( message.alert.ajaxFail );
		        }
		    });
		}
		
		function doListAjaxCustom()
		{
		    $.ajax({
		        type: "post",
		        url: _pageKey +"ListAjax.do",
		        data: $("[name="+ _pageKey +"Form]").serialize(),
		        dataType: "json",
		        success: function( listJson )
		        {
		        	viewList( listJson );
		        },
		        error: function() {
		        	hideLoadingImage();
		            alert( message.alert.ajaxFail );
		        }
		    });
		}
		