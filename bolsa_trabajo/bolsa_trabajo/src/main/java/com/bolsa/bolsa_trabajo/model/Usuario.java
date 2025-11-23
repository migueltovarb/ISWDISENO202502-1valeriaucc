package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.enums.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
    
    private String nombre;
    private String apellido;
    
    @Indexed(unique = true)
    private String email;
    
    private String contrasena;
    private boolean activo;
    private Rol rol;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private Double fotoOffsetX;
    private Double fotoOffsetY;
    private Double fotoScale;
    
    public boolean validarCredenciales(String correo, String pass) {
        return this.email.equals(correo) && this.contrasena.equals(pass) && this.activo;
    }
    
    public void desactivarCuenta() {
        this.activo = false;
    }
}

