package kr.com.backend.mapper;

import kr.com.backend.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserVO selectUser(String userId);

    // 회원 가입 (일반)
    void insertUser(UserVO user);
}