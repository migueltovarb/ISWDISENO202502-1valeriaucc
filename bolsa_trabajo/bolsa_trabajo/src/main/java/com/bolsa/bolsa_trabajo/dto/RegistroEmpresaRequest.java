package com.bolsa.bolsa_trabajo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroEmpresaRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe ser válido")
    private String email;
    
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String contrasena;
    
    @NotBlank(message = "El nombre de la empresa es obligatorio")
    private String nombreEmpresa;
    
    @NotBlank(message = "El NIT es obligatorio")
    private String nit;
    
    private String descripcion;
    @NotBlank(message = "La ubicación es obligatoria")
    private String ubicacion;
    private String fotoUrl;
    @NotBlank(message = "El sector es obligatorio")
    private String sector;
    @NotBlank(message = "El teléfono de contacto es obligatorio")
    private String telefonoContacto;
}

