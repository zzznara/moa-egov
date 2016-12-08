package egovframework.moa.bible.model;

import java.io.Serializable;
import java.util.List;

import egovframework.com.cmm.LoginVO;
import egovframework.moa.util.model.MoaDto;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 성경말씀 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaBibleDto extends MoaDto implements Serializable {

	private LoginVO loginVo;
	private MoaBibleVO searchVo;
	private String searchVoJson;
	private MoaBibleVO bibleVo;
	private MoaBibleVO modifyVo;
	private MoaBibleByTranslateVO bibleByTranslateVo;
	private MoaBibleBySortVO bibleBySortVo;
	private MoaBibleBySortChapterVO bibleBySortChapterVo;
	private List<MoaBibleVO> bibleVoList;
	private List<MoaBibleByTranslateVO> bibleByTranslateVoList;
	private List<MoaBibleBySortVO> bibleBySortVoList;
	private List<?> bibleByTranslateList;
	private List<?> bibleBySortList;
	private List<String> verse;
	
	private String fileName;
	
	public LoginVO getLoginVo() {
		return loginVo;
	}
	public void setLoginVo(LoginVO loginVo) {
		this.loginVo = loginVo;
	}
	public MoaBibleVO getSearchVo() {
		return searchVo;
	}
	public void setSearchVo(MoaBibleVO searchVo) {
		this.searchVo = searchVo;
	}
	public MoaBibleVO getModifyVo() {
		return modifyVo;
	}
	public void setModifyVo(MoaBibleVO modifyVo) {
		this.modifyVo = modifyVo;
	}
	public String getSearchVoJson() {
		return searchVoJson;
	}
	public void setSearchVoJson(String searchVoJson) {
		this.searchVoJson = searchVoJson;
	}
	public MoaBibleVO getBibleVo() {
		return bibleVo;
	}
	public void setBibleVo(MoaBibleVO bibleVo) {
		this.bibleVo = bibleVo;
	}
	public MoaBibleByTranslateVO getBibleByTranslateVo() {
		return bibleByTranslateVo;
	}
	public void setBibleByTranslateVo(MoaBibleByTranslateVO bibleByTranslateVo) {
		this.bibleByTranslateVo = bibleByTranslateVo;
	}
	public MoaBibleBySortVO getBibleBySortVo() {
		return bibleBySortVo;
	}
	public void setBibleBySortVo(MoaBibleBySortVO bibleBySortVo) {
		this.bibleBySortVo = bibleBySortVo;
	}
	public List<MoaBibleVO> getBibleVoList() {
		return bibleVoList;
	}
	public void setBibleVoList(List<MoaBibleVO> bibleVoList) {
		this.bibleVoList = bibleVoList;
	}
	public List<MoaBibleByTranslateVO> getBibleByTranslateVoList() {
		return bibleByTranslateVoList;
	}
	public void setBibleByTranslateVoList(
			List<MoaBibleByTranslateVO> bibleByTranslateVoList) {
		this.bibleByTranslateVoList = bibleByTranslateVoList;
	}
	public List<MoaBibleBySortVO> getBibleBySortVoList() {
		return bibleBySortVoList;
	}
	public void setBibleBySortVoList(List<MoaBibleBySortVO> bibleBySortVoList) {
		this.bibleBySortVoList = bibleBySortVoList;
	}
	public MoaBibleBySortChapterVO getBibleBySortChapterVo() {
		return bibleBySortChapterVo;
	}
	public void setBibleBySortChapterVo(MoaBibleBySortChapterVO bibleBySortChapterVo) {
		this.bibleBySortChapterVo = bibleBySortChapterVo;
	}
	public List<?> getBibleByTranslateList() {
		return bibleByTranslateList;
	}
	public void setBibleByTranslateList(List<?> bibleByTranslateList) {
		this.bibleByTranslateList = bibleByTranslateList;
	}
	public List<?> getBibleBySortList() {
		return bibleBySortList;
	}
	public void setBibleBySortList(List<?> bibleBySortList) {
		this.bibleBySortList = bibleBySortList;
	}
	public List<String> getVerse() {
		return verse;
	}
	public void setVerse(List<String> verse) {
		this.verse = verse;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}