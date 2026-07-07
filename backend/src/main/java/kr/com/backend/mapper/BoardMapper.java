package kr.com.backend.mapper;

import kr.com.backend.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    // 게시판 리스트
    List<BoardVO> selectBoardList();

    // 게시판 상세보기
    BoardVO selectBoard(int boardNo);

    // 게시판 등록
    void insertBoard(BoardVO board);






}