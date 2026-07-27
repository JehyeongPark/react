package kr.com.backend.service;

import kr.com.backend.vo.UserVO;

public interface UserService {

    // 회원 가입 (일반)
    void insertUser(UserVO user);
}
