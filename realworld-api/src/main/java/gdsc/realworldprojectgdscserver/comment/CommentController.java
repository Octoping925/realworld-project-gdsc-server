package gdsc.realworldprojectgdscserver.comment;

import gdsc.realworldprojectgdscserver.comment.schema.Comment;
import gdsc.realworldprojectgdscserver.comment.schema.CommentList;
import gdsc.realworldprojectgdscserver.profile.schema.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Comment", description = "댓글 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/articles/{slug}/comments")
public class CommentController {
    private static final CommentList DUMMY_COMMENT_LIST = new CommentList(
            List.of(
                    new Comment(
                            1,
                            "It takes a Jacobian",
                            LocalDateTime.now(),
                            LocalDateTime.now(),
                            new Profile(
                                    "jake",
                                    "I work at statefarm",
                                    "https://i.stack.imgur.com/xHWG8.jpg",
                                    false
                            )
                    ),
                    new Comment(
                            2,
                            "It takes a Jacobian",
                            LocalDateTime.now(),
                            LocalDateTime.now(),
                            new Profile(
                                    "jake",
                                    "I work at statefarm",
                                    "https://i.stack.imgur.com/xHWG8.jpg",
                                    false
                            )
                    )
            )
    );

    @Operation(summary = "댓글 조회")
    @GetMapping
    public CommentList getComments(
            @PathVariable(name = "slug") String slug
    ) {
        return DUMMY_COMMENT_LIST;
    }

    @Operation(summary = "댓글 생성")
    @PostMapping
    public Comment createComment(
            @PathVariable(name = "slug") String slug
    ) {
        return DUMMY_COMMENT_LIST.comments().get(0);
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping("/{id}")
    public void deleteComment(
            @PathVariable(name = "slug") String slug,
            @PathVariable(name = "id") long id
    ) {
    }
}
