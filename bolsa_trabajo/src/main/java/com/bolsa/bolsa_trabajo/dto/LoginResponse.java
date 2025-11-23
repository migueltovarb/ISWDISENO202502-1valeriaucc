package com.bolsa.bolsa_trabajo.dto;

import com.bolsa.bolsa_trabajo.model.enums.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tipoToken = "Bearer";
    private String id;
    private String email;
    private Rol rol;
    private String nombre;
}

