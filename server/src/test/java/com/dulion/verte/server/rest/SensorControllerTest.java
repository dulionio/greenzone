package com.dulion.verte.server.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class SensorControllerTest {

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private MockMvc mockMvc;

    @Test
    public void whenGetList() throws Exception {
        mockMvc.perform(get("/api/readings"))
            .andDo(print())
            .andExpect(status().isOk());
    }

    @Test
    public void whenPost() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"sensorId\":\"");
        sb.append(UUID.randomUUID().toString());
        sb.append("\",\"dateTime\":\"");
        sb.append(ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT));
        sb.append("\",\"temperature\":");
        sb.append("24.3");
        sb.append(",\"humidity\":");
        sb.append("74.4");
        sb.append(",\"pressure\":");
        sb.append("1000.4");
        sb.append("}");
        mockMvc.perform(post("/api/readings")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}".replace('\'', '"')))
            .andDo(print())
            .andExpect(status().isOk());
    }
}
