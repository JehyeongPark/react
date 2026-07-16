package kr.com.backend.service.impl;

import kr.com.backend.mapper.CommentMapper;
import kr.com.backend.service.CommentService;
import kr.com.backend.vo.CommentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;

    // 댓글 리스트
    @Override
    public List<CommentVO> selectCommentList(int boardNo) {
        return commentMapper.selectCommentList(boardNo);
    }

    // 댓글 등록
    @Override
    public void insertComment(CommentVO comment) {
        commentMapper.insertComment(comment);
    }

    // 댓글 수정
    @Override
    public void updateComment(CommentVO comment) {
        commentMapper.updateComment(comment);
    }

    // 댓글 삭제
    @Override
    public void deleteComment(int commentNo) {
        commentMapper.deleteComment(commentNo);
    }

}