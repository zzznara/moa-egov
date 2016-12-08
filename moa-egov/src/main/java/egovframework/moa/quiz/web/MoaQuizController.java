package egovframework.moa.quiz.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.LoginVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.quiz.model.MoaQuizDto;
import egovframework.moa.quiz.model.MoaQuizVO;
import egovframework.moa.quiz.service.MoaQuizService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 게시판 속성관리를 위한 컨트롤러  클래스
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009.03.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.12  이삼섭          최초 생성
 *  2009.06.26	한성곤		2단계 기능 추가 (댓글관리, 만족도조사)
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
@Controller
public class MoaQuizController {

	@Resource(name = "moaQuizService")
	protected MoaQuizService moaQuizService;

	/**
	 * 퀴즈 목록
	 * @param MoaQuizDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/quiz/quizList.do")
	public String quizList(MoaQuizDto dto, HttpServletRequest request, ModelMap model) throws Exception {

		LoginVO loginVo = (LoginVO) request.getSession().getAttribute("loginVO");
		dto.setLoginVo( loginVo );

		if( dto.getSearchVo() == null ) dto.setSearchVo( new MoaQuizVO() );
		dto.setSearchVoJson( MoaStringUtil.changeJsonFromVo( dto.getSearchVo() ) );
		
        model.addAttribute("dto", dto);
		
		return "egovframework/moa/quiz/quizList";
	}

	/**
	 * 퀴즈 목록 Ajax
	 * @param MoaQuizDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/quiz/quizListAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String quizListAjax(MoaQuizDto dto, ModelMap model) throws Exception {
		
		List<EgovMap> list = (List<EgovMap>) moaQuizService.getQuizListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 퀴즈 목록 갯수 Ajax
	 * @param MoaQuizDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/quiz/quizListCountAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String quizListCountAjax(MoaQuizDto dto, ModelMap model) throws Exception {

		List<EgovMap> list = (List<EgovMap>) moaQuizService.getQuizListCountAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}
}
