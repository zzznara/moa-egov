package egovframework.moa.util.model;

import java.util.List;
import java.util.Random;


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

@SuppressWarnings("unused")
public class MoaDto {

	private static final long serialVersionUID = 1L;
	
	private String module;					// 모듈
	
	private String pageKey;				// 페이지별 key값

	private String title;						// 상단 <head>안의 <title>명
	
	private List<String> comboList;	// 콤보 목록을 JsonString변수에 담아서 사용한다. 
	
	private String isExistsJsFile;			// 해당 모듈의 *-js.jsp 파일이 존재하는지 여부
	
	private int randomNumber = 0;
	
	private String addVersion;
	
	public String getModule() {
		return module;
	}
	
	public void setModule(String module) {
		this.module = module;
	}
	
	public String getPageKey() {
		return pageKey;
	}
	
	public void setPageKey(String pageKey) {
		this.pageKey = pageKey;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}

	public List<String> getComboList() {
		return comboList;
	}

	public void setComboList(List<String> comboList) {
		this.comboList = comboList;
	}

	public String getIsExistsJsFile() {
		return isExistsJsFile;
	}

	public void setIsExistsJsFile(String isExistsJsFile) {
		this.isExistsJsFile = isExistsJsFile;
	}

	public int getRandomNumber() {
		if( randomNumber == 0 ) {
			Random random = new Random();
			randomNumber = random.nextInt();
		}
		return randomNumber;
	}

	public void setRandomNumber(int randomNumber) {
		this.randomNumber = randomNumber;
	}

	public String getAddVersion() {
		if( addVersion == null ) {
			addVersion = "?v="+ this.getRandomNumber();
		}
		return addVersion;
	}

	public void setAddVersion(String addVersion) {
		this.addVersion = addVersion;
	}
}