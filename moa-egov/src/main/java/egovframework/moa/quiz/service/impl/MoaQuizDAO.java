package egovframework.moa.quiz.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.quiz.model.MoaQuizDto;
import egovframework.moa.quiz.model.MoaQuizVO;

/**
 * 성경
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@Repository("moaQuizDAO")
public class MoaQuizDAO extends EgovComAbstractDAO {
	
    /**
     * 퀴즈 저장
     *
     * @param MoaQuizDto
     * @return int
     * @throws Exception
     */
	public int saveQuiz(MoaQuizVO vo) throws Exception {
    	return update("MoaQuizDAO.saveQuiz", vo);
    }
	
    /**
     * 퀴즈 목록
     *
     * @param MoaQuizDto
     * @return List<EgovMap>
     * @throws Exception
     */
	public List<?> getQuizListAjax(MoaQuizDto dto) throws Exception {
    	return list("MoaQuizDAO.getQuizListAjax", dto.getSearchVo());
    }
	
    /**
     * 퀴즈 목록 갯수
     *
     * @param MoaQuizDto
     * @return int
     * @throws Exception
     */
	public List<?> getQuizListCountAjax(MoaQuizDto dto) throws Exception {
    	return list("MoaQuizDAO.getQuizListCountAjax", dto.getSearchVo());
    }

}
