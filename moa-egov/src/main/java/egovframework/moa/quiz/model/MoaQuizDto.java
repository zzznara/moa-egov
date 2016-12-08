package egovframework.moa.quiz.model;

import java.io.Serializable;

import egovframework.com.cmm.LoginVO;

/**
 * 퀴즈 Dto
 * @author 최우진(zzznara)
 * @since 2015.12.27
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class MoaQuizDto implements Serializable {

	private LoginVO loginVo;
	private MoaQuizVO searchVo;
	private String searchVoJson;
	private MoaQuizSetVO quizSetVo;
	private MoaQuizVO quizVo;
	
	public LoginVO getLoginVo() {
		return loginVo;
	}
	public void setLoginVo(LoginVO loginVo) {
		this.loginVo = loginVo;
	}
	public MoaQuizVO getSearchVo() {
		return searchVo;
	}
	public void setSearchVo(MoaQuizVO searchVo) {
		this.searchVo = searchVo;
	}
	public String getSearchVoJson() {
		return searchVoJson;
	}
	public void setSearchVoJson(String searchVoJson) {
		this.searchVoJson = searchVoJson;
	}
	public MoaQuizSetVO getQuizSetVo() {
		return quizSetVo;
	}
	public void setQuizSetVo(MoaQuizSetVO quizSetVo) {
		this.quizSetVo = quizSetVo;
	}
	public MoaQuizVO getQuizVo() {
		return quizVo;
	}
	public void setQuizVo(MoaQuizVO quizVo) {
		this.quizVo = quizVo;
	}
}