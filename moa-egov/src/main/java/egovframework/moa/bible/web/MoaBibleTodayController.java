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
import egovframework.moa.bible.service.MoaBibleTodayService;
import egovframework.moa.bible.service.MoaBibleTranslateSortService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 오늘의 성경말씀 Controller
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
public class MoaBibleTodayController {

	@Resource(name = "moaBibleTodayService")
	protected MoaBibleTodayService moaBibleTodayService;
	
	@Resource(name = "moaBibleTranslateSortService")
	protected MoaBibleTranslateSortService moaBibleTranslateSortService;
	
	/**
	 * 오늘의 말씀 목록
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleTodayList.do")
	public String bibleTodayList(MoaBibleDto dto, HttpServletRequest request, ModelMap model) throws Exception
	{
		LoginVO loginVo = (LoginVO) request.getSession().getAttribute("loginVO");
		dto.setLoginVo( loginVo );
		
		// 검색조건 셋팅
		if( dto.getSearchVo() == null ) dto.setSearchVo( new MoaBibleVO() );
		dto.setSearchVoJson( MoaStringUtil.changeJsonFromVo( dto.getSearchVo() ) );
		
		// 넘어온 번역본 번호가 없다면 '개역개정'으로 셋팅하기
		if( dto.getSearchVo().getTranslateSeqNo() == 0 ) {
			dto.getSearchVo().setTranslateSeqNo(1);
		}
		// 넘어온 성경 번호가 없다면 '창세기'로 셋팅하기
		if( dto.getSearchVo().getSortSeqNo() == 0 ) {
			dto.getSearchVo().setSortSeqNo(1);
		}
		// 넘어온 chapter가 없다면 '1장'으로 셋팅하기
		if( dto.getSearchVo().getChapter() == 0 ) {
			dto.getSearchVo().setChapter(1);
		}
		
		// 번역본 목록, 성경 목록 가져오기
		dto.setBibleByTranslateList( moaBibleTranslateSortService.getBibleByTranslateList( dto ) );
		dto.setBibleBySortList( moaBibleTranslateSortService.getBibleBySortList( dto ) );
		
        model.addAttribute("dto", dto);
		
		return "egovframework/moa/bible/bibleTodayList";
	}

	/**
	 * 오늘의 말씀 목록(ajax)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleTodayListAjax.do")
	@ResponseBody
	@SuppressWarnings({ "unchecked" })
	public String bibleTodayListAjax(MoaBibleDto dto, ModelMap model) throws Exception {
		
		List<EgovMap> list = (List<EgovMap>) moaBibleTodayService.getBibleTodayListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 오늘의 말씀 목록 갯수(ajax)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleTodayListCountAjax.do")
	@ResponseBody
	public String bibleTodayListCountAjax(MoaBibleDto dto, ModelMap model) throws Exception {

		int count = (Integer) moaBibleTodayService.getBibleTodayListCountAjax( dto );
		return String.valueOf( count );
	}

	/**
	 * 오늘의 말씀에 이미 존재하는지 확인
	 * 
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/existsBibleTodayCount.do")
	@ResponseBody
	public String existsBibleTodayCount(MoaBibleDto dto, ModelMap model) throws Exception {
		
		int count = moaBibleTodayService.existsBibleTodayCount( dto );
		return String.valueOf( count );
	}
	
	/**
	 * 오늘의 말씀 저장하기
	 * 
	 * @param BibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping("/moa/bible/saveBibleTodayAjax.do")
	@ResponseBody
	protected String saveBibleTodayAjax(HttpServletRequest request, MoaBibleDto dto) throws Exception {

		String result = "SUCCESS";
		
		try
		{
			moaBibleTodayService.saveBibleToday( dto );
		}
		catch( ClassNotFoundException e )
		{
			result = "FAIL";
		}
		
		return result;
	}
	
	/**
	 * 오늘의 말씀에서 삭제하기
	 * 
	 * @param BibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping("/moa/bible/deleteBibleTodayAjax.do")
	@ResponseBody
	protected String deleteBibleTodayAjax(HttpServletRequest request, MoaBibleDto dto) throws Exception {

		String result = "SUCCESS";
		
		try
		{
			moaBibleTodayService.deleteBibleToday( dto );
		}
		catch( ClassNotFoundException e )
		{
			result = "FAIL";
		}
		
		return result;
	}
}
