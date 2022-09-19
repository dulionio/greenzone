package com.dulion.verte.server.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    mockMvc.perform(get("/readings"))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  public void whenPost() throws Exception {
    mockMvc.perform(post("/readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{}".replace('\'', '"')))
        .andDo(print())
        .andExpect(status().isOk());
  }
}
