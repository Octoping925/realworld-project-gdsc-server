package gdsc.domain.member;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class UserName {
    @Column(name = "username", nullable = false)
    private String value;

    public UserName(String username) {
        validate(username);
        this.value = username;
    }

    private void validate(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("username은 null이거나 빈 문자열일 수 없습니다.");
        }
    }
}
