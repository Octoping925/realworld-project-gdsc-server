package gdsc.domain.comment;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "comment")
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "article_id", nullable = false)
    private long articleId;

    @Column(name = "member_id", nullable = false)
    private long memberId;

    public Comment(String content, long articleId, long memberId) {
        this.content = content;
        this.articleId = articleId;
        this.memberId = memberId;
    }
}
