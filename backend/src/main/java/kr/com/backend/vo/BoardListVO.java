package kr.com.backend.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BoardListVO {

    private List<BoardVO> list;
    private int totalCount;

}