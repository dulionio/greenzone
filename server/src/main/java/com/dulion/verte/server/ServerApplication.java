package com.dulion.verte.server;

import com.dulion.verte.server.rest.SensorController;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.Instant;

@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
@ComponentScan(basePackageClasses = {
    SensorController.class
})
public class ServerApplication {

    private final RequestMappingHandlerAdapter handlerAdapter;

    public ServerApplication(RequestMappingHandlerAdapter handlerAdapter) {
        this.handlerAdapter = handlerAdapter;
    }

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        handlerAdapter
            .getMessageConverters()
            .stream()
            .filter(MappingJackson2HttpMessageConverter.class::isInstance)
            .map(MappingJackson2HttpMessageConverter.class::cast)
            .forEach(c -> c.getObjectMapper().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS));
    }

    @Bean
    public Docket sensorApi() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build();
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
