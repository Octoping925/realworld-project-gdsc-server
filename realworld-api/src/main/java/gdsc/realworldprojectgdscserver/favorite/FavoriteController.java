package gdsc.realworldprojectgdscserver.favorite;

import gdsc.realworldprojectgdscserver.article.schema.Article;
import gdsc.realworldprojectgdscserver.profile.schema.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Favorite", description = "좋아요 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/articles/{slug}/favorite")
public class FavoriteController {
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

    @Operation(summary = "게시글에 좋아요하기")
    @PostMapping
    public Article favoriteArticle() {
        return DUMMY_ARTICLE;
    }

    @Operation(summary = "게시글 좋아요 취소하기")
    @DeleteMapping
    public Article unfavoriteArticle() {
        return DUMMY_ARTICLE;
    }
}
