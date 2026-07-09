package kr.com.backend.controller;

import kr.com.backend.service.BoardService;
import kr.com.backend.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시판 리스트
    @GetMapping
    public List<BoardVO> selectBoardList() {
        return boardService.selectBoardList();
    }

    // 게시판 상세보기
    @GetMapping("/{boardNo}")
    public BoardVO selectBoard(@PathVariable int boardNo) {
        return boardService.selectBoard(boardNo);
    }

    // 게시판 등록
    @PostMapping
    public void insertBoard(@RequestBody BoardVO board) {
        boardService.insertBoard(board);
    }

    // 게시판 수정
    @PutMapping("/{boardNo}")
    public void updateBoard(@PathVariable int boardNo, @RequestBody BoardVO board) {
        board.setBoardNo(boardNo);
        boardService.updateBoard(board);
    }

    // 게시판 삭제
    @DeleteMapping("/{boardNo}")
    public void deleteBoard(@PathVariable int boardNo) {
        boardService.deleteBoard(boardNo);
    }


}