package kr.com.backend.service;

import kr.com.backend.vo.BoardListVO;
import kr.com.backend.vo.BoardSearchVO;
import kr.com.backend.vo.BoardVO;

public interface BoardService {

    // 게시판 리스트
    BoardListVO selectBoardList(BoardSearchVO boardSearchVO);

    // 게시판 상세보기
    BoardVO selectBoard(int boardNo);

    // 게시판 등록
    void insertBoard(BoardVO board);

    // 게시판 수정
    void updateBoard(BoardVO board);

    // 게시판 삭제
    void deleteBoard(int boardNo);
}