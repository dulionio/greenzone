package com.dulion.verte.server.rest;

import com.dulion.verte.server.data.Reading;
import com.dulion.verte.server.data.ReadingRepository;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final ReadingRepository readings;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public SensorController(ReadingRepository readings) {
        this.readings = readings;
    }

    @GetMapping
    public Iterable<Reading> getReadings() {
        List<Reading> all = new ArrayList<>();
        readings.findAll().forEach(all::add);
        return all;
    }

    @PostMapping
    public ResponseEntity<Void> postReading(@RequestBody Reading value) {
        // Ignore attempts to pass reading ID when posting.
        value.setId(null);
        // TODO 1. Verify registered sensor, 2. Compare to prior value
        readings.save(value);
        return ResponseEntity.ok().build();
    }
}
