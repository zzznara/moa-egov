package egovframework.moa.quiz.model;

import java.io.Serializable;
import java.util.Date;

import egovframework.moa.util.model.MoaVO;

/**
 * 퀴즈 VO
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaQuizVO extends MoaVO implements Serializable {

	private long seqNo;
	private String title;
	private String type;
	private String answer;
	private String hint;
	private String explain;
	private String linkUrl;
	private String imageUrl;
	private long resolveCount;
	private long correctCount;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getHint() {
		return hint;
	}
	public void setHint(String hint) {
		this.hint = hint;
	}
	public String getExplain() {
		return explain;
	}
	public void setExplain(String explain) {
		this.explain = explain;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public long getResolveCount() {
		return resolveCount;
	}
	public void setResolveCount(long resolveCount) {
		this.resolveCount = resolveCount;
	}
	public long getCorrectCount() {
		return correctCount;
	}
	public void setCorrectCount(long correctCount) {
		this.correctCount = correctCount;
	}
}