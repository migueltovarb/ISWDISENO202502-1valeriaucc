package com.bolsa.bolsa_trabajo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostulacionRequest {
    @NotBlank(message = "El ID de la oferta es obligatorio")
    private String ofertaId;
}

