package com.dulion.verte.server.rest;

import com.dulion.verte.server.data.Reading;
import com.dulion.verte.server.data.ReadingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Sensor {

    private static final Logger LOG = LoggerFactory.getLogger(Sensor.class);

    private final ReadingRepository readings;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public Sensor(ReadingRepository readings) {
        this.readings = readings;
    }

    @GetMapping("/readings")
    public Iterable<Reading> getReadings() {
        return readings.findAll();
    }

    @PostMapping("/readings")
    public ResponseEntity<Void> postReading(@RequestBody Reading value) {
        // Ignore attempts to pass reading ID when posting.
        value.setId(null);
        // TODO 1. Verify registered sensor, 2. Compare to prior value
        readings.save(value);
        return ResponseEntity.ok().build();
    }
}
