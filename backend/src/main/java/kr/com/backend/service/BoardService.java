package kr.com.backend.service;

import kr.com.backend.vo.BoardVO;

import java.util.List;

public interface BoardService {

    // 게시판 리스트
    List<BoardVO> selectBoardList();

    // 게시판 상세보기
    BoardVO selectBoard(int boardNo);

    // 게시판 등록
    void insertBoard(BoardVO board);

    // 게시판 수정
    void updateBoard(BoardVO board);
}