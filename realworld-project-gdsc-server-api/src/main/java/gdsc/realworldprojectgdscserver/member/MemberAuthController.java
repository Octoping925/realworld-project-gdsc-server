package gdsc.realworldprojectgdscserver.member;

import gdsc.domain.member.MemberAuthUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "auth", description = "회원 인증 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class MemberAuthController {
    private final MemberAuthUseCase memberAuthUseCase;

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public void login() {

    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public void logout() {

    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public void signup() {

    }
}
