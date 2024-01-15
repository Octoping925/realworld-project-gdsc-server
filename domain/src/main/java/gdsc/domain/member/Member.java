package gdsc.domain.member;

import gdsc.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "member")
@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private UserName username;

    @Embedded
    private Email email;

    @Column(name = "bio")
    private String bio;

    @Column(name = "image")
    private String image;

    @Embedded
    @Column(name = "password", nullable = false)
    private Password password;

    public Member(
            String username,
            String email,
            String bio,
            String image,
            String password
    ) {
        this.username = new UserName(username);
        this.email = new Email(email);
        this.bio = bio;
        this.image = image;
        this.password = new Password(password);
    }

    public boolean isPasswordMatch(String password) {
        return this.password.isMatch(password);
    }
}
