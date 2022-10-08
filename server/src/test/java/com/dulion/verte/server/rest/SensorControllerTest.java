package com.dulion.verte.server.rest;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.dulion.verte.server.data.Reading;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
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

    private final MockMvc mockMvc;
    private final ObjectMapper mapper;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public SensorControllerTest(MockMvc mockMvc, ObjectMapper mapper) {
        this.mockMvc = mockMvc;
        this.mapper = mapper;
    }

    @Test
    public void whenGetList() throws Exception {
        mockMvc.perform(get("/api/readings"))
            .andDo(print())
            .andExpect(status().isOk());
    }

    @Test
    public void whenPost() throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        UUID uuid = UUID.randomUUID();
        String json = (
            "{'sensorId':'" + uuid
                + "','dateTime':'" + ZonedDateTime.now(ZoneOffset.UTC).format(formatter)
                + "','temperature':" + "24.3"
                + ",'humidity':" + "74.4"
                + ",'pressure':" + "1004.5}")
            .replace('\'', '"');
        LOG.info(json);

        mockMvc.perform(post("/api/readings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andDo(print())
            .andExpect(status().isOk());

        String content = mockMvc.perform(get("/api/readings"))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
        LOG.info(content);
        Reading[] readings = mapper.createParser(content).readValueAs(Reading[].class);
        assertEquals(readings.length, 1);
        assertEquals(readings[0].getSensorId(), uuid);
        assertEquals(readings[0].getTemperature(), new BigDecimal("24.3"));
        assertEquals(readings[0].getHumidity(), new BigDecimal("74.4"));
        assertEquals(readings[0].getPressure(), new BigDecimal("1004.5"));
    }
}
