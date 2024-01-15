package gdsc.domain.member;

public record Profile(
        String username,
        String bio,
        String image,
        boolean following
) {
}
