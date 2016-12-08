package egovframework.moa.bible.service;

import java.util.List;

import egovframework.moa.bible.model.MoaBibleDto;



/**
 * 오늘의 말씀
 * @author 최우진(zzznara@gmail.com)
 * @since 2016.08.25
 * @version 1.0
 */
public interface MoaBibleTodayService {

	public List<?> getBibleTodayListAjax( MoaBibleDto dto ) throws Exception;
	
	public int getBibleTodayListCountAjax( MoaBibleDto dto ) throws Exception;
	
    public int existsBibleTodayCount( MoaBibleDto dto ) throws Exception;
    
    public int saveBibleToday( MoaBibleDto dto ) throws Exception;
    
    public int deleteBibleToday( MoaBibleDto dto ) throws Exception;
}
