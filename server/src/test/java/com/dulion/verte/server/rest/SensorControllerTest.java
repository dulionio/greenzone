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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class SensorControllerTest {

    private static final Logger LOG = LoggerFactory.getLogger(SensorControllerTest.class);

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        String json = ("{'sensorId':'"
            + UUID.randomUUID()
            + "','dateTime':'"
            + ZonedDateTime.now(ZoneOffset.UTC).format(formatter)
            + "','temperature':"
            + "24.3"
            + ",'humidity':"
            + "74.4"
            + ",'pressure':"
            + "1000.4"
            + "}").replace('\'', '"');
        LOG.info(json);
        mockMvc.perform(post("/api/readings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andDo(print())
            .andExpect(status().isOk());
        // And get
        mockMvc.perform(get("/api/readings"))
            .andDo(print())
            .andExpect(status().isOk());
    }
}
