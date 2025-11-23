package com.bolsa.bolsa_trabajo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "postulantes")
public class Postulante extends Usuario {
    private String fotoUrl;
    private String direccion;
    private String telefono;
    private String cvNombre;
    private String cvTipo;
    @JsonIgnore
    private byte[] cvContenido;
    
    @DocumentReference(lazy = true)
    private List<Postulacion> historial = new ArrayList<>();
}

