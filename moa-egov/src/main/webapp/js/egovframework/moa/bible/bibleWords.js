/**
 *
 * 파일명 : bibleWords.js
 * 설 명 : 성경 한구절 자바스크립트
 *
 *       수정일         수정자     Version      내용
 * ---------------  ---------  ----------  ----------------------------
 *  2016.08.06     최우진        1.0        최초생성
 *
 */


/*****************************************************************************
 * 여기부터는 공통으로 넣어주는 함수 (페이지에 맞게 함수 안의 내용은 바꿔주어야 한다.)
 *****************************************************************************/

		var _pageKeyBig = _pageKey.substring(0, 1).toUpperCase() + _pageKey.substring(1);
		var _isInitDoSearch = false; 		// 화면로드시 조회할지 여부
		var _idDoSearchCount = false;		// 조회시 count 가져오는 퀴리도 실행할지 여부
		var _doSaveAfterAlert = true;
		var _doSaveAfterRefresh = true;
		

		/* $(document).ready() 메소드 안에서 제일 먼저 시작될 함수 */
		function funcReadyFirst()
		{
			// 이벤트 함수 셋팅
			funcEventsCustom();
			
			// 역본 목록 > 성경 목록 > 검색 순으로 실행된다.
			// comboBibleByTranslateListAjax() > comboBibleBySortListAjax() > doSearch(1)
			comboBibleByTranslateListAjax();
		}

		/* $(document).ready() 함수의 마지막에 시작될 함수 */
		function funcReadyLast() {
		}

/*****************************************************************************
 * 여기까지는 공통으로 넣어주는 함수 (추가할 함수는 아래쪽에 입력해 주세요.)
 *****************************************************************************/

		function doWordsAjax( pageIndex )
		{
				if( !_searchVoJson.translateSeqNo ) _searchVoJson.translateSeqNo = 1;
				if( !_searchVoJson.sortSeqNo ) _searchVoJson.sortSeqNo = 1;
				if( !_searchVoJson.chapter ) _searchVoJson.chapter = 1;
				if( !_searchVoJson.verse ) _searchVoJson.verse = 1;
				
				var searchVoStr = "searchVo.translateSeqNo="+ _searchVoJson.translateSeqNo
									   + "searchVo.sortSeqNo="+ _searchVoJson.sortSeqNo
									   + "searchVo.chapter="+ _searchVoJson.chapter
									   + "searchVo.verse="+ _searchVoJson.verse
									   ;
				
			    $.ajax({
			        type: "post",
			        url: _pageKey +".do",
			        data: searchVoStr,
			        dataType: "json",
			        success: function( listJson )
			        {
			        	var wordsIndexName = listJson.sortBibleName +" "
			        								  + listJson.chapter +":"
			        								  + listJson.verse
			        								   ;
			        	
			        	$("#words").find("dt").html( wordsIndexName );
			        	$("#words").find("dd").html( listJson.words );
			        },
			        error: function() {
			        	hideLoadingImage();
			            alert( message.alert.ajaxFail );
			        }
			    });
		}
		