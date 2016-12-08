package egovframework.moa.bible.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.moa.bible.model.MoaBibleBySortChapterVO;
import egovframework.moa.bible.model.MoaBibleBySortVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;
import egovframework.moa.bible.service.MoaBibleTranslateSortService;
import egovframework.moa.bible.util.MoaBibleUtil;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : MoaBibleServiceImpl.java
 * @Description : 성경
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27.
 * @version
 *
 */
@Service("moaBibleTranslateSortService")
public class MoaBibleTranslateSortServiceImpl extends EgovAbstractServiceImpl implements MoaBibleTranslateSortService {

	@Resource(name = "moaBibleTranslateSortDAO")
	private MoaBibleTranslateSortDAO moaBibleTranslateSortDAO;

	/**
	 * 성경데이타를 생성한다.
	 *
	 * @param MoaBibleDto
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String saveBible(MoaBibleDto dto, File file) throws Exception {

		String result = "FAIL";
		Scanner in = null;
		
		try
		{
			int sortSeqNo = 0;
			String flag = "";
			
			Map<String, Object> biblePrev = new HashMap<String, Object>();
			List<EgovMap> sortList = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleBySortListByLang( dto.getBibleByTranslateVo() );
		
			// 번역본 성경 seqNo를 가져온다.
			int translateSeqNo = moaBibleTranslateSortDAO.getBibleByTranslateSeqNo( dto.getBibleByTranslateVo() );
			if( translateSeqNo == 0 ) {
				moaBibleTranslateSortDAO.insertBibleByTranslate( dto.getBibleByTranslateVo() );
				translateSeqNo = moaBibleTranslateSortDAO.getBibleByTranslateSeqNo( dto.getBibleByTranslateVo() );
			}
			
			// 먼저 기존 성경을 삭제한다.
			moaBibleTranslateSortDAO.dropTranslateBible( dto.getBibleByTranslateVo() );
			
			in = new Scanner( file );
			int inLength = 0;
			MoaBibleUtil moaBibleUtil = new MoaBibleUtil();
			
			while( in.hasNext() )
			{
					String strLine = in.nextLine().trim();
					if( !"".equals( flag ) ) strLine = strLine.replace(flag, "");
					String[] columnName = {"name", "nameShort", "enumName", "nameEtc1"};
					
					if( !"".equals( strLine ) )
					{
						String headStr = strLine.substring(0, strLine.indexOf(" ")).replace(".", "");
						String words = strLine.substring( strLine.indexOf(" ") + 1 );
						String bibleFirst = "";
						String enumName = "";
						String testament = "";
						
						if( !EgovStringUtil.isEmpty( headStr ) ) headStr = headStr.replaceAll(" ", "");
						
						for( EgovMap map : sortList )
						{
							for( int i = 0; i < columnName.length; i++ )
							{
								String bibleName = (String) map.get( columnName[i] );
								if( EgovStringUtil.isEmpty( bibleName ) ) continue;
								bibleName = bibleName.replaceAll(" ", "");
								
								if( headStr.indexOf("Ex") == 0 ) {
									if( bibleName.equals("Ex") ) {
										System.out.println("");
									}
								}
								
								if( headStr.indexOf( bibleName ) == 0) {
									if( moaBibleUtil.isCorrectBibleMapping( headStr, bibleName) ) {
										bibleFirst = bibleName;
										enumName = bibleName;
										testament = (String) map.get("testament");
										sortSeqNo = ((Integer) map.get("seqNo")).intValue();
										
										break;
									}
								}
							}
							
							// 일치하는 부분이 있다면 for문을 빠져나가자.
							if( !EgovStringUtil.isEmpty( bibleFirst ) ) break;
						}
						
						if( !"".equals( bibleFirst ) )
						{
							headStr = headStr.replace( bibleFirst, "");
							String[] headStrSplit = headStr.split(":");
							int chapter = Integer.parseInt( headStrSplit[0] );
							int verse = Integer.parseInt( headStrSplit[1] );
							
							// DB에 장별 절 갯수 저장하기
							String enumNamePrev = EgovStringUtil.isNullToString( biblePrev.get("enumName") );
							String chapterPrev = EgovStringUtil.isNullToString( biblePrev.get("chapter") );
							if( !"".equals( enumNamePrev ) && 
								(
										!enumName.equals( enumNamePrev ) ||
										!chapterPrev.equals( String.valueOf( chapter ) )
								)
							) {
									moaBibleTranslateSortDAO.saveBibleVerseNum( dto.getBibleBySortChapterVo() );
							}
							
							// DB에 말씀 저장하기
							if( dto.getBibleVo() == null ) dto.setBibleVo( new MoaBibleVO() );
							dto.getBibleVo().setTranslateSeqNo( translateSeqNo );
							dto.getBibleVo().setSortSeqNo( sortSeqNo );
							dto.getBibleVo().setTestament( testament );
							dto.getBibleVo().setChapter( chapter );
							dto.getBibleVo().setVerse( verse );
							dto.getBibleVo().setWords( words.trim() );
							dto.getBibleVo().setEverSeqNo( inLength + 1 );
		
							if( dto.getBibleBySortChapterVo() == null ) dto.setBibleBySortChapterVo( new MoaBibleBySortChapterVO() );
							dto.getBibleBySortChapterVo().setBibleBySortSeqNo( sortSeqNo );
							dto.getBibleBySortChapterVo().setChapter( chapter );
							dto.getBibleBySortChapterVo().setVerseNum( verse );
							
							moaBibleTranslateSortDAO.saveBible( dto.getBibleVo() );
	
							if( sortSeqNo == 16 && chapter == 13 && verse == 31 ) {
								System.out.println("ok");
							}
							
							// 이전 변수에 저장
							biblePrev.put("enumName", enumName);
							biblePrev.put("chapter", chapter);
							biblePrev.put("verse", verse);
						}
					
						inLength++;
					}
			}
			
			if( inLength > 0 ) {
				moaBibleTranslateSortDAO.saveBibleVerseNum( dto.getBibleBySortChapterVo() );
			}
			
			result = "SUCCESS";
			
		} catch(Exception e) {
			if( in != null ) {
				in.close();
			}
		}
		
		return result;
	}

	/**
	 * 번역성경을 통째로 삭제한다.
	 *
	 * @param MoaBibleDtovo
	 * @return
	 * @throws Exception
	 */
	public void dropBible(MoaBibleDto dto) throws Exception {
		moaBibleTranslateSortDAO.dropTranslateBible( dto.getBibleByTranslateVo() );
		moaBibleTranslateSortDAO.deleteBibleByTranslate( dto.getBibleByTranslateVo() );
	}
	
	public List<?> getBibleByTranslateList( MoaBibleDto dto ) throws Exception {
		return moaBibleTranslateSortDAO.getBibleByTranslateListAjax( dto );
	}
	
	@SuppressWarnings("unchecked")
	public List<?> getBibleByTranslateListAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleByTranslateListAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}
	
	@SuppressWarnings("unchecked")
	public List<?> getBibleByTranslateListComboAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleByTranslateListComboAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}

	@SuppressWarnings("unchecked")
	public List<?> getBibleBySortList( MoaBibleDto dto ) throws Exception {
		return (List<EgovMap>) moaBibleTranslateSortDAO.getBibleBySortListAjax( dto );
	}

	@SuppressWarnings("unchecked")
	public List<?> getBibleBySortListAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleBySortListAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );
					map.put( "nameShort", MoaStringUtil.funcUrlEncode( (String) map.get("nameShort") ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}

	@SuppressWarnings("unchecked")
	public List<?> getBibleBySortListByLang( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleBySortListByLang( dto.getBibleByTranslateVo() );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );
					map.put( "nameShort", MoaStringUtil.funcUrlEncode( (String) map.get("nameShort") ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}

	@SuppressWarnings("unchecked")
	public List<?> getBibleBySortListComboAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortDAO.getBibleBySortListComboAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );
					map.put( "nameShort", MoaStringUtil.funcUrlEncode( (String) map.get("nameShort") ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}

	public List<?> getBibleFileLIstAjax( MoaBibleDto dto, HttpServletRequest request ) throws Exception
	{
		List<EgovMap> bibleList = new ArrayList<EgovMap>();
		
		@SuppressWarnings("deprecation")
		String defaultPath = request.getRealPath("/");	
		String path = defaultPath +"WEB-INF/classes/egovframework/FILE/moa/bible/";
		File[] fileList=new File( path ).listFiles();
		
		for( File tempFile : fileList ) {
			if( tempFile.isFile() ) {
				EgovMap map = new EgovMap();
				map.put( "name", MoaStringUtil.funcUrlEncode( tempFile.getName() ) );
				bibleList.add( map );
			}
		}
		
		return bibleList;
	}
}
