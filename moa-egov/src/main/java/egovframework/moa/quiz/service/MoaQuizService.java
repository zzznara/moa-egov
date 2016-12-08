package egovframework.moa.quiz.service;

import java.util.List;

import egovframework.moa.quiz.model.MoaQuizDto;



/**
 * 퀴즈
 * @author 최우진(zzznara@gmail.com)
 * @since 2015.12.27
 * @version 1.0
 */
public interface MoaQuizService {
    
    public List<?> getQuizListAjax( MoaQuizDto dto ) throws Exception;
    
    public List<?> getQuizListCountAjax( MoaQuizDto dto ) throws Exception;
}
