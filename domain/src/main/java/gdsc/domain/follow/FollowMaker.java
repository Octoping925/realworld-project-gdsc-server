package gdsc.domain.follow;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class FollowMaker {

    public void save(Follow follow) {
    }

    public void removeFollow(long requestMemberId, long memberId) {

    }
}
