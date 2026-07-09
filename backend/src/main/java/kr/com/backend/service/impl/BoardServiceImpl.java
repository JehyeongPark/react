package kr.com.backend.service.impl;

import kr.com.backend.mapper.BoardMapper;
import kr.com.backend.service.BoardService;
import kr.com.backend.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    // 게시판 리스트
    @Override
    public List<BoardVO> selectBoardList() {
        return boardMapper.selectBoardList();
    }

    // 게시판 상세보기
    @Override
    public BoardVO selectBoard(int boardNo) {
        return boardMapper.selectBoard(boardNo);
    }

    // 게시판 등록
    @Override
    public void insertBoard(BoardVO board) {
        boardMapper.insertBoard(board);
    }

    // 게시판 수정
    @Override
    public void updateBoard(BoardVO board) {
        boardMapper.updateBoard(board);
    }

    // 게시판 삭제
    @Override
    public void deleteBoard(int boardNo) {
        boardMapper.deleteBoard(boardNo);
    }

}