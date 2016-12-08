package egovframework.moa.bible.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.moa.bible.model.MoaBibleBySortChapterVO;
import egovframework.moa.bible.model.MoaBibleBySortVO;
import egovframework.moa.bible.model.MoaBibleByTranslateVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 성경
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@Repository("moaBibleDAO")
public class MoaBibleDAO extends EgovComAbstractDAO {
	
    /**
     * 성경 말씀 한장씩 가져오기
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleListAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleDAO.getBibleListAjax", dto.getSearchVo());
    }
	
    /**
     * 성경 말씀 한장씩 가져오기 (갯수)
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public List<?> getBibleListCountAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleDAO.getBibleListCountAjax", dto.getSearchVo());
    }
	
    /**
     * 성경 한 말씀 가져오기
     *
     * @param MoaBibleDto
     * @return EgovMap
     * @throws Exception
     */
	public EgovMap getBibleWordsAjax(MoaBibleDto dto) throws Exception {
    	return (EgovMap) select("MoaBibleDAO.getBibleWordsAjax", dto.getSearchVo());
    }
	
    /**
     * 성경 검색 목록
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleSearchListAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleDAO.getBibleSearchListAjax", dto.getSearchVo());
    }
	
    /**
     * 성경 검색 목록 (갯수)
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int getBibleSearchListCountAjax(MoaBibleDto dto) throws Exception {
    	return (Integer) select("MoaBibleDAO.getBibleSearchListCountAjax", dto.getSearchVo());
    }
}
