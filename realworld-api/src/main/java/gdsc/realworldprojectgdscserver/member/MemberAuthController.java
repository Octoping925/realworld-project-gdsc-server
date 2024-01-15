package gdsc.realworldprojectgdscserver.member;

import gdsc.domain.member.MemberAuthUseCase;
import gdsc.realworldprojectgdscserver.member.schema.LoginUser;
import gdsc.realworldprojectgdscserver.member.schema.NewUser;
import gdsc.realworldprojectgdscserver.member.schema.UpdateUser;
import gdsc.realworldprojectgdscserver.member.schema.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User and Authentication", description = "회원 인증 관련 API")
@RequiredArgsConstructor
@RestController
public class MemberAuthController {
    private static final User DUMMY_USER = new User(
            "fake@fake.com",
            "token",
            "username",
            "bio",
            "https://static.productionready.io/images/smiley-cyrus.jpg"
    );

    private final MemberAuthUseCase memberAuthUseCase;

    @Operation(summary = "회원가입")
    @PostMapping("/users")
    public User signup(
            @Valid @RequestBody NewUser user
    ) {
        return DUMMY_USER;
    }

    @Operation(summary = "로그인")
    @PostMapping("/users/login")
    public User login(
            @Valid @RequestBody LoginUser user
    ) {
        return DUMMY_USER;
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/users/logout")
    public void logout() {

    }

    @Operation(summary = "회원정보 변경")
    @PutMapping("/user")
    public User update(
            @Valid @RequestBody UpdateUser user
    ) {
        return DUMMY_USER;
    }
}
