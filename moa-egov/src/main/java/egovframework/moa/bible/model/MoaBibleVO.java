package egovframework.moa.bible.model;

import java.io.Serializable;

import egovframework.moa.util.model.MoaVO;

/**
 * 성경말씀 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaBibleVO extends MoaVO implements Serializable {

	private long seqNo;
	private int everSeqNo;
	private int translateSeqNo;
	private int sortSeqNo;
	private String testament;
	private int chapter;
	private int verse;
	private String words;
	
	public long getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(long seqNo) {
		this.seqNo = seqNo;
	}
	public int getEverSeqNo() {
		return everSeqNo;
	}
	public void setEverSeqNo(int everSeqNo) {
		this.everSeqNo = everSeqNo;
	}
	public int getTranslateSeqNo() {
		return translateSeqNo;
	}
	public void setTranslateSeqNo(int translateSeqNo) {
		this.translateSeqNo = translateSeqNo;
	}
	public int getSortSeqNo() {
		return sortSeqNo;
	}
	public void setSortSeqNo(int sortSeqNo) {
		this.sortSeqNo = sortSeqNo;
	}
	public String getTestament() {
		return testament;
	}
	public void setTestament(String testament) {
		this.testament = testament;
	}
	public int getChapter() {
		return chapter;
	}
	public void setChapter(int chapter) {
		this.chapter = chapter;
	}
	public int getVerse() {
		return verse;
	}
	public void setVerse(int verse) {
		this.verse = verse;
	}
	public String getWords() {
		return words;
	}
	public void setWords(String words) {
		this.words = words;
	}
}