package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.Modalidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfertaTrabajoRequest {
    private String titulo;
    
    private String descripcion;
    
    private List<String> requisitos;
    
    private String ubicacion;
    
    private Modalidad modalidad;
    
    private String rangoSalarial;
    private boolean borrador = false;
}

