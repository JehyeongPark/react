package kr.com.backend.service;

import kr.com.backend.vo.BoardVO;

import java.util.List;

public interface BoardService {
    List<BoardVO> selectBoardList();
}