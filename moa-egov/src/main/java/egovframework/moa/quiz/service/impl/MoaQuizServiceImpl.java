package egovframework.moa.quiz.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.moa.quiz.model.MoaQuizDto;
import egovframework.moa.quiz.service.MoaQuizService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : MoaQuizServiceImpl.java
 * @Description : 퀴즈
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27.
 * @version
 *
 */
@Service("moaQuizService")
public class MoaQuizServiceImpl extends EgovAbstractServiceImpl implements MoaQuizService {

	@Resource(name = "moaQuizDAO")
	private MoaQuizDAO moaQuizDAO;

	@SuppressWarnings("unchecked")
	public List<?> getQuizListAjax( MoaQuizDto dto ) throws Exception {
		
		List<EgovMap> listNew = new ArrayList<EgovMap>();
		List<EgovMap> list = (List<EgovMap>) moaQuizDAO.getQuizListAjax( dto );
		
		for( EgovMap map : list )
		{
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
					map.put( "words", MoaStringUtil.funcUrlEncode( (String) map.get("words") ) );					
				/* 한글깨짐을 방지하기 위해 UTF-8로 인코딩 후 ajax로 값을 받은 후, decodeURIComponent()로 디코딩한다. */
				
				listNew.add( map );
		}
		
		return listNew;
	}
	
	public List<?> getQuizListCountAjax( MoaQuizDto dto ) throws Exception {
		return moaQuizDAO.getQuizListCountAjax( dto );
	}
}
