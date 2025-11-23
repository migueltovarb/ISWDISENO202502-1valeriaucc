package com.bolsa.bolsa_trabajo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostulacionesMetricsResponse {
    private int total;
    private int pendientes;
    private int aceptadas;
    private int rechazadas;
}

