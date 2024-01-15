package gdsc.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberReader {
    public Member findById(long id) {
        return null;
    }

    public Member findByEmail(String email) {
        return null;
    }

    public Member findByUsername(String username) {
        return null;
    }
}
