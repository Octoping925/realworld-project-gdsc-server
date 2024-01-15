package gdsc.domain.article;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "article_tag")
@Entity
public class ArticleTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "article_id", nullable = false)
    private long articleId;

    @Column(name = "tag_id", nullable = false)
    private long tagId;

    public ArticleTag(long articleId, long tagId) {
        this.articleId = articleId;
        this.tagId = tagId;
    }
}
