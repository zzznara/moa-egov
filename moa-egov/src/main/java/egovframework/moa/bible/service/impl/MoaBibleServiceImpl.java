package egovframework.moa.bible.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.moa.bible.model.MoaBibleBySortChapterVO;
import egovframework.moa.bible.model.MoaBibleBySortVO;
import egovframework.moa.bible.model.MoaBibleByTranslateVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;
import egovframework.moa.bible.service.MoaBibleService;
import egovframework.moa.util.util.MoaBibleEnum;
import egovframework.moa.util.util.MoaBibleEnum.BibleShortNew;
import egovframework.moa.util.util.MoaBibleEnum.BibleShortOld;
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
@Service("moaBibleService")
public class MoaBibleServiceImpl extends EgovAbstractServiceImpl implements MoaBibleService {

	@Resource(name = "moaBibleDAO")
	private MoaBibleDAO moaBibleDAO;
	
	@Resource(name = "moaBibleTranslateSortDAO")
	private MoaBibleTranslateSortDAO moaBibleTranslateSortDAO;

	@SuppressWarnings("unchecked")
	public List<?> getBibleListAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleDAO.getBibleListAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "words", MoaStringUtil.funcUrlEncode( (String) map.get("words") ) );	
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}
	
	public List<?> getBibleListCountAjax( MoaBibleDto dto ) throws Exception {
		return moaBibleDAO.getBibleListCountAjax( dto );
	}

	public EgovMap getBibleWordsAjax( MoaBibleDto dto ) throws Exception {
		
		EgovMap map = (EgovMap) moaBibleDAO.getBibleListAjax( dto );

		/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
			map.put( "sortBibleName", MoaStringUtil.funcUrlEncode( (String) map.get("sortBibleName") ) );	
			map.put( "words", MoaStringUtil.funcUrlEncode( (String) map.get("words") ) );	
		/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
		
		return map;
	}


	@SuppressWarnings("unchecked")
	public List<?> getBibleSearchListAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleDAO.getBibleSearchListAjax( dto );
		
		for( EgovMap map : list )
		{
				String bibleIndexName = (String) map.get("bibleIndexName");
				String words = (String) map.get("words");
				bibleIndexName = "<span class='text-danger'>"+ bibleIndexName +"</span>";
				words = words.replaceAll( dto.getSearchVo().getWords(),  "<span class='keyword'>"+ dto.getSearchVo().getWords() +"</span>");
				words = bibleIndexName +" "+ words;
			
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "sortName", MoaStringUtil.funcUrlEncode( (String) map.get("sortName") ) );	
					map.put( "words", MoaStringUtil.funcUrlEncode( words ) );
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}
	
	public int getBibleSearchListCountAjax( MoaBibleDto dto ) throws Exception {
		return moaBibleDAO.getBibleSearchListCountAjax( dto );
	}
}
