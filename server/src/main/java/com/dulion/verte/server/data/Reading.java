package com.dulion.verte.server.data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Reading {

    @Id
    private Long id;

    private UUID sensorId;

    private Instant dateTime;

    private BigDecimal temperature;

    private BigDecimal humidity;

    private BigDecimal pressure;

}
