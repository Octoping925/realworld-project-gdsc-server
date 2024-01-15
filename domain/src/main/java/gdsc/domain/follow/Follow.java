package gdsc.domain.follow;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "follow")
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "follower_id", nullable = false)
    private long followerId;

    @Column(name = "followee_id", nullable = false)
    private long followeeId;

    public Follow(long followerId, long followeeId) {
        validate(followerId, followeeId);
        this.followerId = followerId;
        this.followeeId = followeeId;
    }

    private void validate(long followerId, long followeeId) {
        if (followerId == followeeId) {
            throw new IllegalArgumentException("자기 자신을 팔로우할 수 없습니다.");
        }
    }
}
