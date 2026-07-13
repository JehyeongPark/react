package kr.com.backend.service;

import kr.com.backend.vo.CommentVO;

import java.util.List;

public interface CommentService {

    // 댓글 리스트
    List<CommentVO> selectCommentList(int boardNo);

    // 댓글 등록
    void insertComment(CommentVO comment);

}