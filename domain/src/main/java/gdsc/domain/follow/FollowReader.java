package gdsc.domain.follow;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class FollowReader {
    public boolean isFollowing(long requestMemberId, long targetMemberId) {
        return false;
    }
}
