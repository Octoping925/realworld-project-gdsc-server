package gdsc.domain.article;

import gdsc.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "article")
@Entity
public class Article extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "slug", nullable = false)
    private String slug;

    @Column(name = "author", nullable = false)
    private long authorId;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    public Article(
            String title,
            String content,
            String slug,
            long authorId
    ) {
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.authorId = authorId;
        this.isDeleted = false;
    }

    public void delete(long requestMemberId) {
        if (this.authorId != requestMemberId) {
            throw new IllegalStateException("작성자만 삭제할 수 있습니다.");
        }

        if (isDeleted) {
            throw new IllegalStateException("이미 삭제된 게시물입니다.");
        }

        isDeleted = true;
    }
}
