package kr.com.backend.controller;

import kr.com.backend.service.BoardService;
import kr.com.backend.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public List<BoardVO> selectBoardList() {
        return boardService.selectBoardList();
    }
}