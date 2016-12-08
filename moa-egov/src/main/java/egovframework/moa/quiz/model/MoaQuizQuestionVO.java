package egovframework.moa.quiz.model;

import java.io.Serializable;

import egovframework.moa.util.model.MoaVO;

/**
 * 퀴즈 항목 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaQuizQuestionVO extends MoaVO implements Serializable {

	private long seqNo;
	private long quizSeqNo;
	private String question;
	private int sortOrder;
	private long choiceCount;
	
	public long getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(long seqNo) {
		this.seqNo = seqNo;
	}
	public long getQuizSeqNo() {
		return quizSeqNo;
	}
	public void setQuizSeqNo(long quizSeqNo) {
		this.quizSeqNo = quizSeqNo;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	public long getChoiceCount() {
		return choiceCount;
	}
	public void setChoiceCount(long choiceCount) {
		this.choiceCount = choiceCount;
	}
}