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

    @Override
    public List<BoardVO> selectBoardList() {
        return boardMapper.selectBoardList();
    }
}