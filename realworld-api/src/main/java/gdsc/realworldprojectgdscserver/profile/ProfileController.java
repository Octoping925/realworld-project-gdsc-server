package gdsc.realworldprojectgdscserver.profile;

import gdsc.realworldprojectgdscserver.profile.schema.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Profile", description = "프로필 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Operation(summary = "프로필 조회")
    @GetMapping("/{username}")
    public Profile getProfile(
            @PathVariable(name = "username") String username
    ) {
        return new Profile(
                "username",
                "bio",
                "https://static.productionready.io/images/smiley-cyrus.jpg",
                false
        );
    }

    @Operation(summary = "팔로우")
    @PostMapping("/{username}/follow")
    public Profile follow(
            @PathVariable(name = "username") String username
    ) {
        return new Profile(
                "username",
                "bio",
                "https://static.productionready.io/images/smiley-cyrus.jpg",
                true
        );
    }

    @Operation(summary = "언팔로우")
    @DeleteMapping("/{username}/follow")
    public Profile unfollow(
            @PathVariable(name = "username") String username
    ) {
        return new Profile(
                "username",
                "bio",
                "https://static.productionready.io/images/smiley-cyrus.jpg",
                false
        );
    }
}
