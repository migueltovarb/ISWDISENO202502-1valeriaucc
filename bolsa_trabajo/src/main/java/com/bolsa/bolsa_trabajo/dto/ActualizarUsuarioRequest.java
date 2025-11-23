package com.bolsa.bolsa_trabajo.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarUsuarioRequest {
    private String nombre;
    private String apellido;
    
    @Email(message = "El email debe ser válido")
    private String email;
    
    private String fotoUrl;
    private String direccion;
    private String telefono;
    private String descripcion;
    private String ubicacion;
    private String sector;
    private String telefonoContacto;
    private Double fotoOffsetX;
    private Double fotoOffsetY;
    private Double fotoScale;
}
