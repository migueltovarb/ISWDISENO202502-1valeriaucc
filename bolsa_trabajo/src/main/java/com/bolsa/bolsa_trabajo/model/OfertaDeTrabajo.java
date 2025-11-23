package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.enums.Modalidad;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ofertas_trabajo")
public class OfertaDeTrabajo {
    @Id
    private String id;
    
    private String titulo;
    private String descripcion;
    private List<String> requisitos = new ArrayList<>();
    private String ubicacion;
    private Modalidad modalidad;
    private String rangoSalarial;
    private LocalDateTime fechaPublicacion;
    private boolean activa;
    private boolean borrador;
    private int numConformidad;
    private String empresaNombre;
    
    @DocumentReference(lazy = true)
    private Empresa empresa;
    
    @DocumentReference(lazy = true)
    private List<Postulacion> postulaciones = new ArrayList<>();
    
    public void actualizar() {
        // Lógica de actualización
    }
}

