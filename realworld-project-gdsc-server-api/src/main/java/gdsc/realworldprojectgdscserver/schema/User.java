package gdsc.realworldprojectgdscserver.schema;

public record User(
        String email,
        String token,
        String username,
        String bio,
        String image
) {
}
