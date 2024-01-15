package gdsc.realworldprojectgdscserver.profile.schema;

public record Profile(
        String username,
        String bio,
        String image,
        boolean following
) {
}
