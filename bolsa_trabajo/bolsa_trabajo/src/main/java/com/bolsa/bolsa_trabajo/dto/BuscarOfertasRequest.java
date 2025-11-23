package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.Modalidad;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuscarOfertasRequest {
    private String titulo;
    private String ubicacion;
    private Modalidad modalidad;
    private String rangoSalarial;
    private String empresaNombre;
    private Integer page = 0;
    private Integer size = 10;
}

