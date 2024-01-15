package gdsc.domain.member;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Password {
    private String value;

    public Password(String password) {
        validate(password);
        this.value = password;
    }

    private void validate(String password) {
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("password는 null이거나 빈 문자열일 수 없습니다.");
        }
    }

    public boolean isMatch(String password) {
        return value.equals(password);
    }
}
