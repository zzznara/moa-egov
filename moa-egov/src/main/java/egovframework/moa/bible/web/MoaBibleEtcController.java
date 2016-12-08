package egovframework.moa.bible.web;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.LoginVO;
import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.moa.bible.model.MoaBibleVO;
import egovframework.moa.bible.service.MoaBibleService;
import egovframework.moa.util.util.MoaStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 성경 기타 Controller
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
public class MoaBibleEtcController {

	
	/**
	 * 성경 DropDown
	 * @param BibleDto
	 */
	@RequestMapping("/moa/bible/bibleDropdown.do")
	public String bibleByTranslateList(HttpServletRequest request, MoaBibleDto dto, Model model) throws Exception {

		// 페이지 기본값 셋팅
		dto.setModule( "bible" );
		dto.setPageKey( "bibleDropdown" );
		dto.setTitle( "성경 기타" );

		model.addAttribute("dto", dto);
		return "egovframework/moa/bible/bibleDropdown";
	}
}
