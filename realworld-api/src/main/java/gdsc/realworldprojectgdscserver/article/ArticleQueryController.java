package gdsc.realworldprojectgdscserver.article;

import gdsc.realworldprojectgdscserver.article.schema.Article;
import gdsc.realworldprojectgdscserver.article.schema.ArticleList;
import gdsc.realworldprojectgdscserver.profile.schema.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Article", description = "게시물 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/articles")
public class ArticleQueryController {
    private static final ArticleList DUMMY_ARTICLES = new ArticleList(
            List.of(
                    new Article(
                            "how-to-train-your-dragon",
                            "How to train your dragon",
                            "Ever wonder how?",
                            "It takes a Jacobian",
                            List.of("dragons", "training"),
                            LocalDateTime.now(),
                            LocalDateTime.now(),
                            false,
                            0,
                            new Profile(
                                    "jake",
                                    "I work at statefarm",
                                    "https://i.stack.imgur.com/xHWG8.jpg",
                                    false
                            )
                    ),
                    new Article(
                            "how-to-train-your-dragon-2",
                            "How to train your dragon 2",
                            "So toothless",
                            "It a dragon",
                            List.of("dragons", "training"),
                            LocalDateTime.now(),
                            LocalDateTime.now(),
                            false,
                            0,
                            new Profile(
                                    "jake",
                                    "I work at statefarm",
                                    "https://i.stack.imgur.com/xHWG8.jpg",
                                    false
                            )
                    )
            ),
            2
    );

    @Operation(summary = "최신 게시물 조회")
    @GetMapping
    public ArticleList getRecentArticles() {
        return DUMMY_ARTICLES;
    }

    @Operation(summary = "팔로워들의 게시물 조회")
    @GetMapping("/feed")
    public ArticleList getFeedArticles() {
        return DUMMY_ARTICLES;
    }

    @Operation(summary = "게시물 상세 조회")
    @GetMapping("/{slug}")
    public Article getArticle(
            @PathVariable(name = "slug") String slug
    ) {
        return DUMMY_ARTICLES.articles().get(0);
    }
}
