package kr.com.backend.service.impl;

import kr.com.backend.mapper.UserMapper;
import kr.com.backend.service.UserService;
import kr.com.backend.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String userId) {
        UserVO user = userMapper.selectUser(userId);
        if (user == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + userId);
        }

        return User.withUsername(user.getUserId())
                .password(user.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }

    // 회원 가입 (일반)
    @Override
    public void insertUser(UserVO user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userMapper.insertUser(user);
    }
}
