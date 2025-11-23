package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.EstadoPostulacion;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CambiarEstadoPostulacionRequest {
    @NotNull(message = "El estado es obligatorio")
    private EstadoPostulacion estado;
}

