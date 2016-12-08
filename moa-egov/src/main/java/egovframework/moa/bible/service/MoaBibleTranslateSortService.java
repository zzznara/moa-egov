package egovframework.moa.bible.service;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import egovframework.moa.bible.model.MoaBibleDto;



/**
 * 성경
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 */
public interface MoaBibleTranslateSortService
{
    public String saveBible(MoaBibleDto dto, File file) throws Exception;

    public void dropBible(MoaBibleDto dto) throws Exception;
    
    public List<?> getBibleByTranslateList( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleByTranslateListAjax( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleByTranslateListComboAjax( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleBySortList( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleBySortListAjax( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleBySortListByLang( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleBySortListComboAjax( MoaBibleDto dto ) throws Exception;
    
    public List<?> getBibleFileLIstAjax( MoaBibleDto dto, HttpServletRequest request ) throws Exception;
    
}
