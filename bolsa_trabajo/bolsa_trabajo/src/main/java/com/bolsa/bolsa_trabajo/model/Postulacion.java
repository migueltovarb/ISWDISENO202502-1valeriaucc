package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.enums.EstadoPostulacion;
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
@Document(collection = "postulaciones")
public class Postulacion {
    @Id
    private String id;
    
    private LocalDateTime fechaHoraPostulacion;
    private EstadoPostulacion estado;
    
    @DocumentReference(lazy = true)
    private Postulante postulante;
    
    @DocumentReference(lazy = true)
    private OfertaDeTrabajo oferta;
    
    public void cambiarEstado(EstadoPostulacion nuevoEstado) {
        this.estado = nuevoEstado;
    }
    
    public boolean esDuplicada() {
        // Lógica para verificar duplicados
        return false;
    }
}

