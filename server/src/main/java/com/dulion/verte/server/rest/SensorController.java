package com.dulion.verte.server.rest;

import com.dulion.verte.server.data.Reading;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/readings")
public class SensorController {

  @Autowired
  private ObjectMapper mapper;

  @GetMapping
  public List<Reading> getReadings() {
    List<Reading> readings = new ArrayList<>();
    readings.add(
        new Reading(
            UUID.randomUUID(),
            Instant.parse("2022-01-01T12:00:00Z"),
            new BigDecimal("73.1"),
            new BigDecimal("50.0"),
            new BigDecimal("1000.1")));
    readings.add(
        new Reading(
            UUID.randomUUID(),
            Instant.parse("2022-01-02T12:00:00Z"),
            new BigDecimal("74.1"),
            new BigDecimal("60.0"),
            new BigDecimal("1015.1")));
    readings.add(
        new Reading(
            UUID.randomUUID(),
            Instant.parse("2022-01-03T12:00:00Z"),
            new BigDecimal("75.1"),
            new BigDecimal("70.0"),
            new BigDecimal("1025.1")));
    return readings;
  }

  @PostMapping
  public ResponseEntity<Void> postReading(Reading value) {
    try {
      System.out.println(mapper.writeValueAsString(value));
    } catch (JsonProcessingException e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }
}
