package gdsc.realworldprojectgdscserver.config.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(info = @Info(title = "Realworld Project GDSC Server API", version = "v1"))
@Configuration
public class SwaggerConfig {
    @Bean
    GroupedOpenApi chatOpenApi() {
        return GroupedOpenApi.builder()
                .group("realworld-project")
                .pathsToMatch("/**")
                .build();
    }
}
