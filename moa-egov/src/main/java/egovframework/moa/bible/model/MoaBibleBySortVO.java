package egovframework.moa.bible.model;

import java.io.Serializable;

/**
 * 성경말씀 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaBibleBySortVO implements Serializable {

	private int seqNo;
	private int chapterNum;
	private String enumName;
	private String nameShortKo;
	private String nameKo;
	private String nameShortEn;
	private String nameEn;
	private String language;
	
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	public int getChapterNum() {
		return chapterNum;
	}
	public void setChapterNum(int chapterNum) {
		this.chapterNum = chapterNum;
	}
	public String getEnumName() {
		return enumName;
	}
	public void setEnumName(String enumName) {
		this.enumName = enumName;
	}
	public String getNameShortKo() {
		return nameShortKo;
	}
	public void setNameShortKo(String nameShortKo) {
		this.nameShortKo = nameShortKo;
	}
	public String getNameKo() {
		return nameKo;
	}
	public void setNameKo(String nameKo) {
		this.nameKo = nameKo;
	}
	public String getNameShortEn() {
		return nameShortEn;
	}
	public void setNameShortEn(String nameShortEn) {
		this.nameShortEn = nameShortEn;
	}
	public String getNameEn() {
		return nameEn;
	}
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
}