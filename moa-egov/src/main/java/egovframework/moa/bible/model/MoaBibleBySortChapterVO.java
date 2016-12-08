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
public class MoaBibleBySortChapterVO implements Serializable {

	private int seqNo;
	private int bibleBySortSeqNo;
	private int chapter;
	private int verseNum;
	
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	public int getBibleBySortSeqNo() {
		return bibleBySortSeqNo;
	}
	public void setBibleBySortSeqNo(int bibleBySortSeqNo) {
		this.bibleBySortSeqNo = bibleBySortSeqNo;
	}
	public int getChapter() {
		return chapter;
	}
	public void setChapter(int chapter) {
		this.chapter = chapter;
	}
	public int getVerseNum() {
		return verseNum;
	}
	public void setVerseNum(int verseNum) {
		this.verseNum = verseNum;
	}
	
}