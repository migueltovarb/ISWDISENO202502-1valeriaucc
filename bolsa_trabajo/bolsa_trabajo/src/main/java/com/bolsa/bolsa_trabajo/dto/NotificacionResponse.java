package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.TipoNotificacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificacionResponse {
    private String id;
    private String titulo;
    private String mensaje;
    private LocalDateTime fecha;
    private boolean leida;
    private TipoNotificacion tipo;
}

