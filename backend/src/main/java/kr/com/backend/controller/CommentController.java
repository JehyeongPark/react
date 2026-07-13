package kr.com.backend.controller;

import kr.com.backend.service.CommentService;
import kr.com.backend.vo.CommentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 리스트
    @GetMapping("/board/{boardNo}/comment")
    public List<CommentVO> selectCommentList(@PathVariable int boardNo) {
        return commentService.selectCommentList(boardNo);
    }

    // 댓글 등록
    @PostMapping("/board/{boardNo}/comment")
    public void insertComment(@PathVariable int boardNo, @RequestBody CommentVO comment) {
        comment.setBoardNo(boardNo);
        commentService.insertComment(comment);
    }

}