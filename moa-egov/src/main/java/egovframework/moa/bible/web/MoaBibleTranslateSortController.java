package egovframework.moa.bible.web;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.moa.bible.model.MoaBibleDto;
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
public class MoaBibleTranslateSortController {

	@Resource(name = "moaBibleTranslateSortService")
	protected MoaBibleTranslateSortService moaBibleTranslateSortService;
	
	/**
	 * 성경파일 목록
	 * @param BibleDto
	 */
	@RequestMapping("/moa/bible/bibleByTranslate.do")
	public String bibleByTranslateList(MoaBibleDto dto, Model model) throws Exception
	{
		// 페이지 기본값 셋팅
		dto.setModule( "bible" );
		dto.setPageKey( "bibleByTranslate" );
		dto.setTitle( "성경 번역본" );
		
		model.addAttribute("dto", dto);
		return "egovframework/moa/bible/bibleByTranslate";
	}

	/**
	 * 역본 리스트 가져오기
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleByTranslateListAjax.do")
	@SuppressWarnings({ "unchecked" })
	public @ResponseBody String bibleByTranslateListAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleByTranslateListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 구약/신약 성경 리스트 가져오기
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleBySortListAjax.do")
	@SuppressWarnings({ "unchecked" })
	public @ResponseBody String bibleBySortListAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleBySortListAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 구약/신약 성경 리스트 가져오기 (by 언어)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/getBibleBySortListByLang.do")
	@SuppressWarnings({ "unchecked" })
	public @ResponseBody String getBibleBySortListByLang(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleBySortListByLang( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 역본 리스트 가져오기 (Combo용)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleByTranslateListComboAjax.do")
	@SuppressWarnings({ "unchecked" })
	public @ResponseBody String bibleByTranslateListComboAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleByTranslateListComboAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}

	/**
	 * 구약/신약 성경 리스트 가져오기 (Combo용)
	 * @param MoaBibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/moa/bible/bibleBySortListComboAjax.do")
	@SuppressWarnings({ "unchecked" })
	public @ResponseBody String bibleBySortListComboAjax(MoaBibleDto dto, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleBySortListComboAjax( dto );
		return MoaStringUtil.changeJsonFromList( list );
	}
	
	/**
	 * 성경파일의 내용을 DB에 생성한다.
	 * @param BibleDto
	 */
	@RequestMapping("/moa/bible/saveBible.do")
	@ResponseBody
	protected String saveBible(HttpServletRequest request, MoaBibleDto dto) throws Exception
	{
		String result = "SUCCESS";
		
		try
		{
			@SuppressWarnings("deprecation")
			String defaultPath = request.getRealPath("/");		
			File file = new File( defaultPath +"WEB-INF/classes/egovframework/FILE/moa/bible/"+ dto.getFileName() );
			
			result = moaBibleTranslateSortService.saveBible( dto, file );
		}
		catch( ClassNotFoundException e )
		{
			result = "FAIL";
		}
		
		return result;
	}
	
	/**
	 * 해당 성경 삭제하기
	 * 
	 * @param BibleDto
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping("/moa/bible/dropBible.do")
	@ResponseBody
	protected String dropBible(HttpServletRequest request, MoaBibleDto dto) throws Exception {

		String result = "SUCCESS";
		
		try
		{
			moaBibleTranslateSortService.dropBible( dto );
		}
		catch( ClassNotFoundException e )
		{
			result = "FAIL";
		}
		
		return result;
	}

	/**
	 * 구약/신약 성경 파일 목록 가져오기
	 * @param MoaBibleDto
	 * @param HttpServletRequest
	 * @return String
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/moa/bible/bibleFileLIstAjax.do")
	public @ResponseBody String bibleFileLIstAjax(MoaBibleDto dto, HttpServletRequest request, ModelMap model) throws Exception
	{
		List<EgovMap> list = (List<EgovMap>) moaBibleTranslateSortService.getBibleFileLIstAjax( dto, request );
		return MoaStringUtil.changeJsonFromList( list );
	}
}
