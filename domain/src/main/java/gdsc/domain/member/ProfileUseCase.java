package gdsc.domain.member;

import gdsc.domain.follow.Follow;
import gdsc.domain.follow.FollowMaker;
import gdsc.domain.follow.FollowReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class ProfileUseCase {
    private final MemberReader memberReader;
    private final FollowReader followReader;
    private final FollowMaker followMaker;

    public Profile getProfile(Long requestMemberId, String username) {
        var user = memberReader.findByUsername(username);
        var isFollowing = followReader.isFollowing(requestMemberId, user.getId());

        return new Profile(
                user.getUsername().value(),
                user.getBio(),
                user.getImage(),
                isFollowing
        );
    }

    public void follow(long requestMemberId, String username) {
        var user = memberReader.findByUsername(username);

        Follow follow = new Follow(requestMemberId, user.getId());
        followMaker.save(follow);
    }

    public void unfollow(long requestMemberId, String username) {
        var user = memberReader.findByUsername(username);

        followMaker.removeFollow(requestMemberId, user.getId());
    }
}
