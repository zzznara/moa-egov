package egovframework.moa.bible.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.LoginVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;
import egovframework.moa.bible.service.MoaBibleService;
import egovframework.moa.bible.service.MoaBibleTranslateSortService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 성경말씀 Controller
 * @author 최우진(zzznara@gmail.com)
 * @since 2016.09.28
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   	  수정일      	 수정자          수정내용
 *  -------------    --------    ---------------------------
 *  2016.09.28	 최우진          최초 생성
 *
 *  </pre>
 */
@Controller
public class MoaBibleController {

	@Resource(name = "moaBibleService")
	protected MoaBibleService moaBibleService;
	
	@Resource(name = "moaBibleTranslateSortService")
	protected MoaBibleTranslateSortService moaBibleTranslateSortService;

	/**
	 * 성경 목록
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleList.do")
	public String bibleList(MoaBibleDto dto, HttpServletRequest request, ModelMap model) throws Exception
	{
		LoginVO loginVo = (LoginVO) request.getSession().getAttribute("loginVO");
		dto.setLoginVo( loginVo );
		
		// 검색조건 셋팅
		if( dto.getSearchVo() == null ) dto.setSearchVo( new MoaBibleVO() );
		
		// 번역본 목록
		dto.setBibleByTranslateList( moaBibleTranslateSortService.getBibleByTranslateList( dto ) );
		
		// 넘어온 번역본 번호가 없다면 번역본 첫번째 목록으로 셋팅한다.
		if( dto.getSearchVo().getTranslateSeqNo() == 0 ) {
			dto.getSearchVo().setTranslateSeqNo(1);
			if( dto.getBibleByTranslateList() != null ) {
				if( dto.getBibleByTranslateList().size() > 0 ) {
					EgovMap map = (EgovMap) dto.getBibleByTranslateList().get(0);
					dto.getSearchVo().setTranslateSeqNo( (Integer) map.get("seqNo") );					
				}
			}
		}
		
		// 성경 목록 가져오기
		dto.setBibleBySortList( moaBibleTranslateSortService.getBibleBySortList( dto ) );
		
		// 넘어온 성경 번호가 없다면 '창세기'로 셋팅하기
		if( dto.getSearchVo().getSortSeqNo() == 0 ) {
			dto.getSearchVo().setSortSeqNo(1);
		}
		// 넘어온 chapter가 없다면 '1장'으로 셋팅하기
		if( dto.getSearchVo().getChapter() == 0 ) {
			dto.getSearchVo().setChapter(1);
		}
		
		// 검색조건 json 변환 셋팅
		dto.setSearchVoJson( MoaStringUtil.changeJsonFromVo( dto.getSearchVo() ) );
		
        model.addAttribute("dto", dto);
		
		return "egovframework/moa/bible/bibleList";
	}

	/**
	 * 성경 말씀 한장씩 가져오기
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleListAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String bibleListAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleService.getBibleListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 성경 말씀 한장씩 가져오기
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleListCountAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String bibleListCountAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleService.getBibleListCountAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}
	
	/**
	 * 성경 한말씀
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleWords.do")
	public String bibleWords(MoaBibleDto dto, HttpServletRequest request, ModelMap model) throws Exception
	{
		LoginVO loginVo = (LoginVO) request.getSession().getAttribute("loginVO");
		dto.setLoginVo( loginVo );
		
		// 검색조건 셋팅
		if( dto.getSearchVo() == null ) dto.setSearchVo( new MoaBibleVO() );
		dto.setSearchVoJson( MoaStringUtil.changeJsonFromVo( dto.getSearchVo() ) );
		
        model.addAttribute("dto", dto);
		
		return "egovframework/moa/bible/bibleWords";
	}

	/**
	 * 성경 말씀 한장씩 가져오기
	 * @param AutoUcodSelectionVOSet
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleWordsAjax.do")
	@ResponseBody
	public String bibleWordsAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		EgovMap map = (EgovMap) moaBibleService.getBibleWordsAjax( dto );
		return MoaStringUtil.changeJsonFromVo( map );
	}

	/**
	 * 성경 검색 목록(Ajax)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleSearchListAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String bibleSearchListAjax(MoaBibleDto dto, ModelMap model) throws Exception {
		
		List<EgovMap> list = (List<EgovMap>) moaBibleService.getBibleSearchListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 성경 검색 목록 갯수(Ajax)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleSearchListCountAjax.do")
	@ResponseBody
	public String bibleSearchListCountAjax(MoaBibleDto dto, ModelMap model) throws Exception {

		int count = moaBibleService.getBibleSearchListCountAjax( dto );
		return String.valueOf( count );
	}
}
