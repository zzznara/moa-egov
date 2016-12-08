package egovframework.moa.util.model;

import java.util.Date;

import egovframework.com.cmm.ComDefaultVO;


/**
 *  Vo 클래스를 정의한다.
 * @author 최우진
 * @since 2015.06.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *      수정일              수정자           수정내용
 *  ------------ --------  ---------------------------
 *   2015.06.12    최우진          최초 생성
 *
 * </pre>
 */

public class MoaVO extends ComDefaultVO {

	private static final long serialVersionUID = 1L;
	
	private String createUser;
	
	private Date createDate;
	
	private String updateUser;
	
	private Date updateDate;
	
	private String createDateYmd;
	
	private String updateDateYmd;
	
	public int getFirstIndex() {
		super.setFirstIndex( ( getPageIndex() - 1 ) * getPageUnit() );
		return super.getFirstIndex();
	}
	
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

	public String getCreateDateYmd() {
		return createDateYmd;
	}

	public void setCreateDateYmd(String createDateYmd) {
		this.createDateYmd = createDateYmd;
	}

	public String getUpdateDateYmd() {
		return updateDateYmd;
	}

	public void setUpdateDateYmd(String updateDateYmd) {
		this.updateDateYmd = updateDateYmd;
	}

}