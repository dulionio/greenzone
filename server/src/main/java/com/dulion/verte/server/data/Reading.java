package com.dulion.verte.server.data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import org.springframework.data.annotation.Id;

public class Reading {

    @Id
    private Long id;

    private UUID sensorId;

    private Instant dateTime;

    private BigDecimal temperature;

    private BigDecimal humidity;

    private BigDecimal pressure;

    public Reading() {
    }

    public Reading(
        Long id,
        UUID sensorId,
        Instant dateTime,
        BigDecimal temperature,
        BigDecimal humidity,
        BigDecimal pressure
    ) {
        this.id = id;
        this.sensorId = sensorId;
        this.dateTime = dateTime;
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getSensorId() {
        return sensorId;
    }

    public void setSensorId(UUID sensorId) {
        this.sensorId = sensorId;
    }

    public Instant getDateTime() {
        return dateTime;
    }

    public void setDateTime(Instant dateTime) {
        this.dateTime = dateTime;
    }

    public BigDecimal getTemperature() {
        return temperature;
    }

    public void setTemperature(BigDecimal temperature) {
        this.temperature = temperature;
    }

    public BigDecimal getHumidity() {
        return humidity;
    }

    public void setHumidity(BigDecimal humidity) {
        this.humidity = humidity;
    }

    public BigDecimal getPressure() {
        return pressure;
    }

    public void setPressure(BigDecimal pressure) {
        this.pressure = pressure;
    }
}
