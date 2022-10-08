package com.dulion.verte.server.rest;

import com.dulion.verte.server.data.Reading;
import com.dulion.verte.server.data.ReadingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/readings")
public class SensorController {

    private static final Logger LOG = LoggerFactory.getLogger(SensorController.class);

    private final ObjectMapper mapper;

    private final ReadingRepository readings;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public SensorController(ObjectMapper mapper, ReadingRepository readings) {
        this.mapper = mapper;
        this.readings = readings;
    }

    @GetMapping
    public Iterable<Reading> getReadings() {
        return readings.findAll();
    }

    @PostMapping
    public ResponseEntity<Void> postReading(@RequestBody Reading value) {
        try {
            readings.save(value);
            LOG.info(mapper.writeValueAsString(value));
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
