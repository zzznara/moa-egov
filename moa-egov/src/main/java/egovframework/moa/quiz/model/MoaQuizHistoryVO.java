package egovframework.moa.quiz.model;

import java.io.Serializable;
import java.util.Date;

import egovframework.moa.util.model.MoaVO;

/**
 * 퀴즈 푼 내역 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaQuizHistoryVO extends MoaVO implements Serializable {

	private long seqNo;
	private String userId;
	private long quizSeqNo;
	private long choiceSeqNo;
	private String isCorrect;
	private Date createDate;
	
	public long getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(long seqNo) {
		this.seqNo = seqNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public long getQuizSeqNo() {
		return quizSeqNo;
	}
	public void setQuizSeqNo(long quizSeqNo) {
		this.quizSeqNo = quizSeqNo;
	}
	public long getChoiceSeqNo() {
		return choiceSeqNo;
	}
	public void setChoiceSeqNo(long choiceSeqNo) {
		this.choiceSeqNo = choiceSeqNo;
	}
	public String getIsCorrect() {
		return isCorrect;
	}
	public void setIsCorrect(String isCorrect) {
		this.isCorrect = isCorrect;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
}