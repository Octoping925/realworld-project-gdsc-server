package gdsc.realworldprojectgdscserver.tags;

import gdsc.realworldprojectgdscserver.tags.schema.Tags;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Tag", description = "태그 관련 API")
@RequiredArgsConstructor
@RestController
public class TagController {
    @Operation(summary = "모든 태그 조회")
    @GetMapping("/tags")
    public Tags getTags() {
        return new Tags(List.of("reactjs", "angularjs", "dragons", "football", "baseball", "ruby", "java"));
    }
}
