package egovframework.moa.util.util;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

import twitter4j.JSONArray;
import twitter4j.JSONObject;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;



/**
 *  MoaStringUtil class
 * @author 최우진
 * @since 2015.07.28
 * @version 1.0
 */

public class MoaStringUtil {
	
	/**
	 * 한글을 utf-8로 인코딩한다.
	 * ajax로 호출시 한글깨지는 문제로 인해 utf-8로 인코딩 후, js 파일에서 decodeURIComponent()로 디코딩해서 사용한다.
	 */
	public static String funcUrlEncode( String str ) throws Exception {

		String returnStr = EgovStringUtil.isNullToString( str );
		if( !"".equals( returnStr ) ) returnStr = URLEncoder.encode(returnStr , "UTF-8");
			
		return returnStr;
	}
    
    /**
     * 한글을 utf-8로 디코딩한다.
     * 파일 다운로드시 한글파일명 깨지는 문제로 인해 디코딩
     */
    public static String funcUrlDecode( String str ) throws Exception {

        String returnStr = EgovStringUtil.isNullToString( str );
        if( !"".equals( returnStr ) ) returnStr = URLDecoder.decode(returnStr , "UTF-8");
        
            
        return returnStr;
    }
	
	/**
	 * VO를 json 객체로 변환
	 */
	public static String changeJsonFromVo( Object vo ) throws Exception {

		JSONObject jsonObject = new JSONObject( vo );
		String searchVoJson = jsonObject.toString();
			
		return searchVoJson;
	}
	
	/**
	 * List를 json 객체로 변환
	 */
	public static String changeJsonFromList( List<EgovMap> list ) throws Exception {

		JSONArray listJson = new JSONArray();
		if( list != null ) listJson = new JSONArray( list.toArray() );
		String jsonString = listJson.toString();
			
		return jsonString;
	}
}