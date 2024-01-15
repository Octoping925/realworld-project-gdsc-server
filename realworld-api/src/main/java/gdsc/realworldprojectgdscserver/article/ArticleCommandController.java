package gdsc.realworldprojectgdscserver.article;

import gdsc.realworldprojectgdscserver.article.schema.Article;
import gdsc.realworldprojectgdscserver.article.schema.NewArticle;
import gdsc.realworldprojectgdscserver.article.schema.UpdateArticle;
import gdsc.realworldprojectgdscserver.profile.schema.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Article", description = "게시물 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/articles")
public class ArticleCommandController {
    private static final Article DUMMY_ARTICLE = new Article(
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
    );

    @Operation(summary = "게시물 생성")
    @PostMapping
    public Article createArticle(
            @Valid @RequestBody NewArticle article
    ) {
        return DUMMY_ARTICLE;
    }

    @Operation(summary = "게시물 수정")
    @PutMapping("/{slug}")
    public Article updateArticle(
            @PathVariable(name = "slug") String slug,
            @Valid @RequestBody UpdateArticle article
    ) {
        return DUMMY_ARTICLE;
    }

    @Operation(summary = "게시물 삭제")
    @DeleteMapping("/{slug}")
    public void deleteArticle(
            @PathVariable(name = "slug") String slug
    ) {
    }
}
