package kr.com.backend.controller;

import kr.com.backend.config.JwtTokenProvider;
import kr.com.backend.service.UserService;
import kr.com.backend.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserVO user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUserId(), user.getPassword()));

        String token = jwtTokenProvider.createToken(user.getUserId());
        return Map.of("token", token);
    }

    // 회원 가입 (일반)
    @PostMapping("/signup")
    public void insertUser(@RequestBody UserVO user) {
        userService.insertUser(user);
    }
}
