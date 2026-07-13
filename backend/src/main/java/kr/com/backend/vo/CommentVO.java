package kr.com.backend.vo;

import lombok.Data;

@Data
public class CommentVO {

    private int commentNo;
    private int boardNo;
    private Integer parentCommentNo;
    private String writer;
    private String content;
    private String regDt;
    private String updateDt;
    private String delYn;

}