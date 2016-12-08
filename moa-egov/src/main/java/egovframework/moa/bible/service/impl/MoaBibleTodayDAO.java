package egovframework.moa.bible.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;

/**
 * 오늘의 말씀
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@Repository("moaBibleTodayDAO")
public class MoaBibleTodayDAO extends EgovComAbstractDAO {

    /**
     * 오늘의 말씀 목록(ajax)
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleTodayListAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleTodayDAO.getBibleTodayListAjax", dto.getSearchVo());
    }
	
    /**
     * 오늘의 말씀 목록 갯수(ajax)
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int getBibleTodayListCountAjax(MoaBibleDto dto) throws Exception {
    	return (Integer) select("MoaBibleTodayDAO.getBibleTodayListCountAjax", dto.getSearchVo());
    }
	
    /**
     * 오늘의 말씀에 이미 존재하는지 확인
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int existsBibleTodayCount(MoaBibleVO vo) throws Exception {
    	return (Integer) select("MoaBibleTodayDAO.getExistsBibleTodayCount", vo);
    }
	
    /**
     * 오늘의 말씀 저장
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int saveBibleToday(MoaBibleVO vo) throws Exception {
    	return update("MoaBibleTodayDAO.saveBibleToday", vo);
    }
	
    /**
     * 오늘의 말씀에서 삭제
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int deleteBibleToday(MoaBibleVO vo) throws Exception {
    	return delete("MoaBibleTodayDAO.deleteBibleToday", vo);
    }

}
