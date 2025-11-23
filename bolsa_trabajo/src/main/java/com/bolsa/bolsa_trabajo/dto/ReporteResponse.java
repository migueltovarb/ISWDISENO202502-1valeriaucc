package com.bolsa.bolsa_trabajo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReporteResponse {
    private String id;
    private String tipoReporte;
    private String descripcion;
    private LocalDate fechaGeneracion;
    private int totalUsuarios;
    private int totalOfertasActivas;
    private int totalPostulaciones;
    private Map<String, Object> datosDetalle;
}

