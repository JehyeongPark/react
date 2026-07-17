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
        if (comment.getParentCommentNo() != null) {
            CommentVO parent = commentMapper.selectComment(comment.getParentCommentNo());
            if (parent == null) {
                throw new IllegalArgumentException("존재하지 않는 댓글입니다.");
            }
            if (parent.getParentCommentNo() != null) {
                throw new IllegalArgumentException("대댓글에는 답글을 작성할 수 없습니다.");
            }
        }
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