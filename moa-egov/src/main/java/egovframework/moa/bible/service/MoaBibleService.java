package egovframework.moa.bible.service;

import java.io.File;
import java.util.List;

import egovframework.moa.bible.model.MoaBibleDto;
import egovframework.rte.psl.dataaccess.util.EgovMap;



/**
 * 성경
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 */
public interface MoaBibleService {

    public List<?> getBibleListAjax( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleListCountAjax( MoaBibleDto dto ) throws Exception;
    
    public EgovMap getBibleWordsAjax( MoaBibleDto dto ) throws Exception;

    public List<?> getBibleSearchListAjax( MoaBibleDto dto ) throws Exception;
    
    public int getBibleSearchListCountAjax( MoaBibleDto dto ) throws Exception;
}
