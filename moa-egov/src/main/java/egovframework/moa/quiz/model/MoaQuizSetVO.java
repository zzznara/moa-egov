package egovframework.moa.quiz.model;

import java.io.Serializable;
import java.util.Date;

import egovframework.moa.util.model.MoaVO;

/**
 * 퀴즈셋 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaQuizSetVO extends MoaVO implements Serializable {

	private long seqNo;
	private String title;
	private String explain;
	private long quizSeqNo;
	private int sortOrder;
	private long readCount;
	private long resolveCount;
	private String createUser;
	private Date createDate;
	private String updateUser;
	private Date updateDate;
	
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public long getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(long seqNo) {
		this.seqNo = seqNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getExplain() {
		return explain;
	}
	public void setExplain(String explain) {
		this.explain = explain;
	}
	public long getQuizSeqNo() {
		return quizSeqNo;
	}
	public void setQuizSeqNo(long quizSeqNo) {
		this.quizSeqNo = quizSeqNo;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	public long getReadCount() {
		return readCount;
	}
	public void setReadCount(long readCount) {
		this.readCount = readCount;
	}
	public long getResolveCount() {
		return resolveCount;
	}
	public void setResolveCount(long resolveCount) {
		this.resolveCount = resolveCount;
	}
}