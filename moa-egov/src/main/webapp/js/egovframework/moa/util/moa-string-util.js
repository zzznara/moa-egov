/****************************************************************
 *
 * 파일명 : moa-stringUtil.js
 * 설 명 : 문자 관련 유틸
 *
 *     수정일       수정자      Version      내용
 * -----------  ---------  ----------  ----------------------------
 *  2015.06.16    최우진        1.0        최초생성
 *
 */

var MoaStringUtil = {

		/* 한글 인코딩 */
		funcEncodeUri : function( str ) {
			// encodeURIComponent()만 하면 공백이 +로 보이는 문제가 있어서 +를 공백으로 치환한다.
			if( str ) str = encodeURIComponent( str.replace(/\+/g, " ") );
			return str;
		},
		
		/* 한글 디코딩 */
		funcDecodeUri : function( str ) {
			// decodeURIComponent()만 하면 공백이 +로 보이는 문제가 있어서 +를 공백으로 치환한다.
			if( typeof( str ) == "string") {
				if( str ) str = decodeURIComponent( str.replace(/\+/g, " ") );
			}
			return str;
		},
		
		/* nvl 함수 */
		nvl : function( param, val ) {
			if( param == undefined || param == null ) param = val;
			return param;
		},
		
		/* 컬럼에 value값 넣기 */
		setListColumnValues : function(idName, listJson, listLayout, i ) {
			listJson[i][idName] = moaStringUtil.funcDecodeUri( listJson[i][idName] );
			listLayout.find("[id='list."+ idName +"']").html( listJson[i][idName] );
		},
	
		/* contextPath 가져오기 */
		getUrlContextPath : function() {
			var offset = location.href.indexOf( location.host ) + location.host.length;
			var uniPath = location.href.substring( offset, location.href.indexOf("/", offset + 1) );
			return uniPath;
		},
	
		/* font-size 숫자와 문자 분리하기 */
		getFontSize : function( fontSizeStr ) {
			var typeArray = ["px", "pt"];
			var fontArray = new Array();

			if( fontSizeStr ) {
				for( i = 0; i < typeArray.length; i++ ) {
					if( fontSizeStr.indexOf( typeArray[i] ) != -1 ) {
						fontArray[0] = parseInt( fontSizeStr.replace(typeArray[i], "") );
						fontArray[1] = typeArray[i];
					}
				}
			}
			
			return fontArray;
		},
		
		/* 세자리마다 콤마 찍어주기 */
		getNumberComma : function( val )
		{
			return Number( val ).toLocaleString();
		}
}