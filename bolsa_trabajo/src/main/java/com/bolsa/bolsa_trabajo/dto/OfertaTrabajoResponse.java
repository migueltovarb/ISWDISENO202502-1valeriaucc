package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.Modalidad;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfertaTrabajoResponse {
    private String id;
    private String titulo;
    private String descripcion;
    private List<String> requisitos;
    private String ubicacion;
    private Modalidad modalidad;
    private String rangoSalarial;
    private LocalDateTime fechaPublicacion;
    private boolean activa;
    private boolean borrador;
    private String empresaId;
    private String empresaNombre;
    private int numPostulaciones;
}

