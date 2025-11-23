package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.EstadoPostulacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostulacionResponse {
    private String id;
    private LocalDateTime fechaHoraPostulacion;
    private EstadoPostulacion estado;
    private String postulanteId;
    private String postulanteNombre;
    private String ofertaId;
    private String ofertaTitulo;
}

