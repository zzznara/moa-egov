/**
 *
 * 파일명 : bibleList.js
 * 설 명 : 성경 목록 자바스크립트
 *
 *     수정일       수정자      Version      내용
 * -----------  ---------  ----------  ----------------------------
 *  2015.06.23    최우진        1.0        최초생성
 *
 */


/*****************************************************************************
 * 여기부터는 공통으로 넣어주는 함수 (페이지에 맞게 함수 안의 내용은 바꿔주어야 한다.)
 *****************************************************************************/

		var _pageKeyBig = _pageKey.substring(0, 1).toUpperCase() + _pageKey.substring(1);
		var _isInitDoSearch = false;	 		// 화면로드시 조회할지 여부
		var _idDoSearchCount = true;		// 조회시 count 가져오는 퀴리도 실행할지 여부
		var _doSaveAfterAlert = true;
		var _doSaveAfterRefresh = true;
		var _isSetDtoCombo = true;		// DTO의 combo를 변수에 담을지 여부
		
		/* 목록에 해당 값을 뿌려준다. */
		function viewListValues( listJson, listLayout, i )
		{
			var words = "["+ moaStringUtil.funcDecodeUri( listJson[i].name ) +" "+ listJson[i].chapter +":"+ listJson[i].verse +"] "
						   + moaStringUtil.funcDecodeUri( listJson[i].words )
						   ;
			
			listLayout.find("[id='list.words']").html( words );
		}

		/* $(document).ready() 메소드 안에서 제일 먼저 시작될 함수 */
		function funcReadyFirst()
		{
			funcSetBibleDropDown();
		}

		/* $(document).ready() 함수의 마지막에 시작될 함수 */
		function funcReadyLast() {
		    
		}

/*****************************************************************************
 * 여기까지는 공통으로 넣어주는 함수 (추가할 함수는 아래쪽에 입력해 주세요.)
 *****************************************************************************/

		/* 번역본/성경 목록을 dropdown 메뉴로 보여준다. */
		function funcSetBibleDropDown()
		{
			MoaBibleDropDown.params.target = $("#searchArea");
			MoaBibleDropDown.callTranslate();
		}