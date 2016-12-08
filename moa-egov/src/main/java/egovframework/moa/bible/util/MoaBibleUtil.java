package egovframework.moa.bible.util;

import egovframework.com.utl.fcc.service.EgovNumberUtil;
import egovframework.com.utl.fcc.service.EgovStringUtil;

/**
 * @Class Name : MoaBibleUtil.java
 * @Description : MoaBible에 필요한 공통 메소드들
 * @author 최우진(zzznara@gmail.com)
 * @since 2016.12.08.
 * @version
 *
 */
public class MoaBibleUtil {

	/**
	 * 해당 파일의 해당 라인의 헤더가 성경이름을 제외하고 장:절로 돼 있는지 확인한다.
	 * (장:절은 숫자이므로 :를 제외했을 때 숫자인지를 체크해서 확인한다.)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	public boolean isCorrectBibleMapping( String bibleHead, String bibleName ) throws Exception
	{
		boolean isResult = false;
		
		if( !EgovStringUtil.isEmpty( bibleHead ) && !EgovStringUtil.isEmpty( bibleName ) )
		{
			// 공백 제거 후 비교한다.
			bibleName = bibleName.replaceAll(" ", "");
			bibleHead = bibleHead.replaceAll(" ", "");
			
			// 장:절의 :을 제거한다.
			bibleHead = bibleHead.replace(bibleName, "").replace(":", "");
			
			// 숫자만 남았는지 확인한다.
			isResult = EgovNumberUtil.getNumberValidCheck( bibleHead );
		}
		
		return isResult;
	}
}
