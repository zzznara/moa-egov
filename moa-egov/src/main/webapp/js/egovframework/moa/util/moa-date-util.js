/****************************************************************
 *
 * 파일명 : moa-dateUtil.js
 * 설 명 : 날짜 관련 유틸
 *
 *     수정일       수정자      Version      내용
 * -----------  ---------  ----------  ----------------------------
 *  2015.06.16    최우진        1.0        최초생성
 *
 */

var MoaDateUtil = {

		addPrevYearFromBirth : function( yyMMdd )
		{
			if( yyMMdd.length != 6 ) {
				return yyMMdd;
			}
		
			var yy = yyMMdd.substring( 0, 2 );
			var mm = yyMMdd.substring( 2, 4 );
			var dd = yyMMdd.substring( 4, 6 );
			var yyyy = parseInt( "20"+ yy );
		
			var date = new Date();
			if( yyyy >= date.getFullYear() ) {
				yyyy = parseInt( "19" + yy );
			}
		
			return yyyy +""+ mm +""+ dd;
		},
		
		addFlagYyyyMmDd : function( yyyyMMdd, flag )
		{
			if( yyyyMMdd.length != 8 ) {
				return yyyyMMdd;
			}
		
			var yyyy = yyyyMMdd.substring( 0, 4 );
			var mm = yyyyMMdd.substring( 4, 6 );
			var dd = yyyyMMdd.substring( 6, 8 );
			
			return yyyy + flag + mm + flag + dd;
		},
		
		/* 날짜를 yyyyMMdd로 return */
		getYmdFromDate : function( dateObj, flag )
		{
			var dateYear = dateObj.getFullYear();
			var dateMonth = "0" +(dateObj.getMonth() + 1);
			var dateDay = "0"+ dateObj.getDate();
		
			return dateYear + flag + dateMonth.substring( dateMonth.length - 2 ) + flag + dateDay.substring( dateDay.length - 2 );
		}
}
