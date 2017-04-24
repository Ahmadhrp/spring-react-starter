package com.harahap.ibrahim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@SpringBootApplication
public class ReportApplication extends RepositoryRestConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication.run(ReportApplication.class, args);
	}

}
