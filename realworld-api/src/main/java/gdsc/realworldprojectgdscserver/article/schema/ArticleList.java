package gdsc.realworldprojectgdscserver.article.schema;

import java.util.List;

public record ArticleList(
        List<Article> articles,
        int articlesCount
) {
}
