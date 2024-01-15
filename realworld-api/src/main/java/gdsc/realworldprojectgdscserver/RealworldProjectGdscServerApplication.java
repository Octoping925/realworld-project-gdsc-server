package gdsc.realworldprojectgdscserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = "gdsc")
@SpringBootApplication(scanBasePackages = "gdsc")
public class RealworldProjectGdscServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(RealworldProjectGdscServerApplication.class, args);
    }

}
