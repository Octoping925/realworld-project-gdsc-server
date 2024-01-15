package gdsc.domain.tag;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tag")
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    public Tag(String tag) {
        validate(tag);
        this.name = tag;
    }

    private void validate(String name) {
        if (name == null || name.contains(" ")) {
            throw new IllegalArgumentException("태그는 공백을 포함할 수 없습니다.");
        }
    }
}
