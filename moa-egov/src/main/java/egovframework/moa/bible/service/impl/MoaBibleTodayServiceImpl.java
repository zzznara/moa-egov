package egovframework.moa.bible.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.service.MoaBibleTodayService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : MoaBibleTodayServiceImpl.java
 * @Description : 오늘의 말씀
 * @author 최우진(zzznara@gmail.com)
 * @since 2016.08.25.
 * @version
 *
 */
@Service("moaBibleTodayService")
public class MoaBibleTodayServiceImpl extends EgovAbstractServiceImpl implements MoaBibleTodayService {

	@Resource(name = "moaBibleTodayDAO")
	private MoaBibleTodayDAO moaBibleTodayDAO;


	@SuppressWarnings("unchecked")
	public List<?> getBibleTodayListAjax( MoaBibleDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaBibleTodayDAO.getBibleTodayListAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "name", MoaStringUtil.funcUrlEncode( (String) map.get("name") ) );	
					map.put( "words", MoaStringUtil.funcUrlEncode( (String) map.get("words") ) );	
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}

	/**
	 * 오늘의 말씀 목록 갯수(ajax)
	 * @param MoaBibleDto
	 * @return int
	 * @exception Exception
	 */
	public int getBibleTodayListCountAjax( MoaBibleDto dto ) throws Exception {
		return (Integer) moaBibleTodayDAO.getBibleTodayListCountAjax( dto );
	}
	
	/**
	 * 오늘의 말씀에 이미 존재하는지 확인
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int existsBibleTodayCount( MoaBibleDto dto ) throws Exception {
		return moaBibleTodayDAO.existsBibleTodayCount( dto.getBibleVo() );
	}

	/**
	 * 오늘의 말씀으로 저장한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int saveBibleToday( MoaBibleDto dto ) throws Exception {
		return moaBibleTodayDAO.saveBibleToday( dto.getBibleVo() );
	}

	/**
	 * 오늘의 말씀에서 삭제한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int deleteBibleToday( MoaBibleDto dto ) throws Exception {
		return moaBibleTodayDAO.deleteBibleToday( dto.getBibleVo() );
	}
}
