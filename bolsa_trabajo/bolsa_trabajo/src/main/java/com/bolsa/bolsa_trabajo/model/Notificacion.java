package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.enums.TipoNotificacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notificaciones")
public class Notificacion {
    @Id
    private String id;
    
    private String titulo;
    private String mensaje;
    private LocalDateTime fecha;
    private boolean leida;
    private TipoNotificacion tipo;
    
    @DocumentReference(lazy = true)
    private Usuario usuario;
    
    public void remarcarComoLeida() {
        this.leida = true;
    }
}

