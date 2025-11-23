package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.LoginRequest;
import com.bolsa.bolsa_trabajo.dto.LoginResponse;
import com.bolsa.bolsa_trabajo.dto.RegistroEmpresaRequest;
import com.bolsa.bolsa_trabajo.dto.RegistroAdministradorRequest;
import com.bolsa.bolsa_trabajo.dto.RegistroPostulanteRequest;
import com.bolsa.bolsa_trabajo.model.Empresa;
import com.bolsa.bolsa_trabajo.model.Administrador;
import com.bolsa.bolsa_trabajo.model.Postulante;
import com.bolsa.bolsa_trabajo.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping(value = "/registro/postulante", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Postulante> registrarPostulante(
            @Valid @RequestPart("data") RegistroPostulanteRequest request,
            @RequestPart("cv") MultipartFile cvFile) {
        Postulante postulante = authService.registrarPostulante(request, cvFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(postulante);
    }
    
    @PostMapping("/registro/empresa")
    public ResponseEntity<Empresa> registrarEmpresa(@Valid @RequestBody RegistroEmpresaRequest request) {
        Empresa empresa = authService.registrarEmpresa(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
    }

    @PostMapping("/registro/administrador")
    public ResponseEntity<Administrador> registrarAdministrador(@Valid @RequestBody RegistroAdministradorRequest request) {
        Administrador admin = authService.registrarAdministrador(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(admin);
    }
}

