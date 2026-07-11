package kr.com.backend.vo;

import lombok.Data;

@Data
public class BoardSearchVO {

    private String searchType;
    private String keyword;

    private int page = 1;
    private int size = 10;

    public int getOffset() {
        return (page - 1) * size;
    }

}
