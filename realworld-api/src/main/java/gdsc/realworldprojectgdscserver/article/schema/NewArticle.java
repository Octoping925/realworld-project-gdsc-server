package gdsc.realworldprojectgdscserver.article.schema;

import java.util.List;

public record NewArticle(
        String title,
        String description,
        String body,
        List<String> tagList
) {
}
