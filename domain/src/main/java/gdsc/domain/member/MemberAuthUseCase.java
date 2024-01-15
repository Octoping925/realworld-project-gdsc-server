package gdsc.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class MemberAuthUseCase {
    private final MemberReader memberReader;

    public void login(String email, String password) {
        Member member = memberReader.findByEmail(email);

        if (!member.isPasswordMatch(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // TODO: 로그인 처리
    }

    public void logout(String accessToken) {

    }

    public void signup(String username, String email, String password) {
        if (memberReader.findByEmail(email) != null) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        if (memberReader.findByUsername(username) != null) {
            throw new IllegalArgumentException("이미 존재하는 유저네임입니다.");
        }

        // TODO: 회원가입 처리
    }
}
