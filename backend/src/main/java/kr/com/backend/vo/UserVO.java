package kr.com.backend.vo;

import lombok.Data;

@Data
public class UserVO {
    private String userId;
    private String password;   // DB에는 BCrypt 해시로 저장
    private String userName;
}