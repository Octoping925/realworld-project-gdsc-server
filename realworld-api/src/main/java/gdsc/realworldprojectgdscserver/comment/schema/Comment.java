package gdsc.realworldprojectgdscserver.comment.schema;

import gdsc.realworldprojectgdscserver.profile.schema.Profile;

import java.time.LocalDateTime;

public record Comment(
        long id,
        String body,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Profile author
) {
}
