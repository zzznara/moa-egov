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
@Repository("moaBibleTranslateSortDAO")
public class MoaBibleTranslateSortDAO extends EgovComAbstractDAO {

    /**
     * 성경 seqNo 가져오기
     *
     * @param MoaBibleDto
     * @return EgovMap
     * @throws Exception
     */
	public int getBibleBySortSeqNo(MoaBibleBySortVO vo) throws Exception {
		int count = 0;
    	Integer seqNo = (Integer) select("MoaBibleTranslateSortDAO.getBibleBySortSeqNo", vo);
    	if( seqNo != null ) count = seqNo.intValue();
    	
    	return count;
    }
	
    /**
     * 성경 역본 seqNo 가져오기
     *
     * @param MoaBibleDto
     * @return EgovMap
     * @throws Exception
     */
	public int getBibleByTranslateSeqNo(MoaBibleByTranslateVO vo) throws Exception {
		int count = 0;
    	Integer seqNo = (Integer) select("MoaBibleTranslateSortDAO.getBibleByTranslateSeqNo", vo);
    	if( seqNo != null ) count = seqNo.intValue();
    	
    	return count;
    }
	
    /**
     * 성경번역본 정보 저장하기
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int insertBibleByTranslate(MoaBibleByTranslateVO vo) throws Exception {
    	return update("MoaBibleTranslateSortDAO.insertBibleByTranslate", vo);
    }
	
    /**
     * 성경번역본 정보 삭제하기
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int deleteBibleByTranslate(MoaBibleByTranslateVO vo) throws Exception {
    	return delete("MoaBibleTranslateSortDAO.deleteBibleByTranslate", vo);
    }
	
    /**
     * 성경말씀 저장
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int saveBible(MoaBibleVO vo) throws Exception {
    	return update("MoaBibleDAO.saveBible", vo);
    }
	
    /**
     * 번역성경 통째로 삭제
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int dropTranslateBible(MoaBibleByTranslateVO vo) throws Exception {
    	return delete("MoaBibleTranslateSortDAO.dropTranslateBible", vo);
    }
	
    /**
     * 성경 장별 절의 수 저장
     *
     * @param MoaBibleDto
     * @return int
     * @throws Exception
     */
	public int saveBibleVerseNum(MoaBibleBySortChapterVO vo) throws Exception
	{
		int resultCount = 0;
		
		int cnt = (Integer) select("MoaBibleTranslateSortDAO.selectCountBibleVerseNum", vo);
		if( cnt == 0 ) {
			resultCount =  update("MoaBibleTranslateSortDAO.insertBibleVerseNum", vo);
		} else {
			resultCount =  update("MoaBibleTranslateSortDAO.updateBibleVerseNum", vo);
		}
		
		return resultCount;
    }
	
    /**
     * 역본 리스트 가져오기
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleByTranslateListAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleTranslateSortDAO.getBibleByTranslateListAjax", dto.getSearchVo());
    }
	
    /**
     * 역본 리스트 가져오기(Combo)
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleByTranslateListComboAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleTranslateSortDAO.getBibleByTranslateListComboAjax", dto.getSearchVo());
    }
	
    /**
     * 구약/신약 성경 리스트 가져오기
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleBySortListAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleTranslateSortDAO.getBibleBySortListAjax", dto.getSearchVo());
    }
	
    /**
     * 구약/신약 성경 리스트 가져오기 (by 언어)
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleBySortListByLang(MoaBibleByTranslateVO vo) throws Exception {
    	return list("MoaBibleTranslateSortDAO.getBibleBySortListByLang", vo);
    }
	
    /**
     * 구약/신약 성경 리스트 가져오기(Combo)
     *
     * @param MoaBibleDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getBibleBySortListComboAjax(MoaBibleDto dto) throws Exception {
    	return list("MoaBibleTranslateSortDAO.getBibleBySortListComboAjax", dto.getSearchVo());
    }
}
