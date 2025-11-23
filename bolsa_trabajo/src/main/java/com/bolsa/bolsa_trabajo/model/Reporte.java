package com.bolsa.bolsa_trabajo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reportes")
public class Reporte {
    @Id
    private String id;
    
    private String tipoReporte;
    private String descripcion;
    private LocalDate fechaGeneracion;
    private int totalUsuarios;
    private int totalOfertasActivas;
    private int totalPostulaciones;
    private Map<String, Object> datosDetalle;
}

