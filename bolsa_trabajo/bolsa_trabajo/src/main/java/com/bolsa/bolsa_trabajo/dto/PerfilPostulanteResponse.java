package com.bolsa.bolsa_trabajo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerfilPostulanteResponse {
    private String id;
    private String nombre;
    private String apellido;
    private String email;
    private String fotoUrl;
    private String direccion;
    private String telefono;
}

