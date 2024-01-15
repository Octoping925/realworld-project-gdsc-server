package gdsc.realworldprojectgdscserver.member.schema;

public record NewUser(
        String username,
        String email,
        String password
) {
}
