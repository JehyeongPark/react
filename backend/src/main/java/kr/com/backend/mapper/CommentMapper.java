package kr.com.backend.mapper;

import kr.com.backend.vo.CommentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    // 댓글 리스트
    List<CommentVO> selectCommentList(int boardNo);

    // 대댓글
    CommentVO selectComment(int commentNo);   // 추가

    // 댓글 등록
    void insertComment(CommentVO comment);

    // 댓글 수정
    void updateComment(CommentVO comment);

    // 댓글 삭제
    void deleteComment(int commentNo);

}