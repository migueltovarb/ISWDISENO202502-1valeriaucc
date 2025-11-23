package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.LoginRequest;
import com.bolsa.bolsa_trabajo.dto.LoginResponse;
import com.bolsa.bolsa_trabajo.dto.RegistroEmpresaRequest;
import com.bolsa.bolsa_trabajo.dto.RegistroPostulanteRequest;
import com.bolsa.bolsa_trabajo.dto.RegistroAdministradorRequest;
import com.bolsa.bolsa_trabajo.model.Administrador;
import com.bolsa.bolsa_trabajo.model.Empresa;
import com.bolsa.bolsa_trabajo.model.Postulante;
import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.model.enums.Rol;
import com.bolsa.bolsa_trabajo.repository.AdministradorRepository;
import com.bolsa.bolsa_trabajo.repository.EmpresaRepository;
import com.bolsa.bolsa_trabajo.repository.PostulanteRepository;
import com.bolsa.bolsa_trabajo.repository.UsuarioRepository;
import com.bolsa.bolsa_trabajo.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final PostulanteRepository postulanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    @Value("${app.admin.signup.code:}")
    private String adminSignupCode;
    
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = null;
        String nombreCompleto = null;
        
        // Buscar en todas las colecciones posibles
        // Primero en Postulantes
        Postulante postulante = postulanteRepository.findByEmail(request.getEmail()).orElse(null);
        if (postulante != null) {
            usuario = postulante;
            nombreCompleto = postulante.getNombre();
        } else {
            // Buscar en Empresas
            Empresa empresa = empresaRepository.findByEmail(request.getEmail()).orElse(null);
            if (empresa != null) {
                usuario = empresa;
                nombreCompleto = empresa.getNombre();
            } else {
                // Buscar en Administradores
                Administrador admin = administradorRepository.findByEmail(request.getEmail()).orElse(null);
                if (admin != null) {
                    usuario = admin;
                    nombreCompleto = admin.getNombre();
                } else {
                    // Buscar en Usuarios genéricos
                    usuario = usuarioRepository.findByEmail(request.getEmail()).orElse(null);
                    if (usuario != null) {
                        nombreCompleto = usuario.getNombre();
                    }
                }
            }
        }
        
        if (usuario == null) {
            throw new RuntimeException("Credenciales inválidas");
        }
        
        if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Credenciales inválidas");
        }
        
        if (!usuario.isActivo()) {
            throw new RuntimeException("Usuario inactivo");
        }
        
        String token = jwtTokenProvider.generateToken(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRol().name()
        );
        
        return new LoginResponse(
                token,
                "Bearer",
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRol(),
                nombreCompleto != null ? nombreCompleto : usuario.getNombre()
        );
    }
    
    public Postulante registrarPostulante(RegistroPostulanteRequest request) {
        if (postulanteRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        Postulante postulante = new Postulante();
        postulante.setNombre(request.getNombre());
        postulante.setApellido(request.getApellido());
        postulante.setEmail(request.getEmail());
        postulante.setContrasena(passwordEncoder.encode(request.getContrasena()));
        postulante.setFotoUrl(request.getFotoUrl());
        postulante.setDireccion(request.getDireccion());
        postulante.setTelefono(request.getTelefono());
        postulante.setRol(Rol.POSTULANTE);
        postulante.setActivo(true);
        postulante.setFechaCreacion(LocalDateTime.now());
        postulante.setFechaActualizacion(LocalDateTime.now());
        
        return postulanteRepository.save(postulante);
    }

    public Postulante registrarPostulante(RegistroPostulanteRequest request, org.springframework.web.multipart.MultipartFile cvFile) {
        if (postulanteRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (cvFile == null || cvFile.isEmpty()) {
            throw new RuntimeException("El currículum es obligatorio");
        }
        String ct = cvFile.getContentType();
        String fn = cvFile.getOriginalFilename() != null ? cvFile.getOriginalFilename().toLowerCase() : "";
        boolean tipoValido = "application/pdf".equals(ct)
                || "application/msword".equals(ct)
                || "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(ct)
                || fn.endsWith(".pdf")
                || fn.endsWith(".doc")
                || fn.endsWith(".docx");
        if (!tipoValido) {
            throw new RuntimeException("Formato de currículum no permitido. Solo PDF o DOCX");
        }

        Postulante postulante = new Postulante();
        postulante.setNombre(request.getNombre());
        postulante.setApellido(request.getApellido());
        postulante.setEmail(request.getEmail());
        postulante.setContrasena(passwordEncoder.encode(request.getContrasena()));
        postulante.setFotoUrl(request.getFotoUrl());
        postulante.setDireccion(request.getDireccion());
        postulante.setTelefono(request.getTelefono());
        postulante.setRol(Rol.POSTULANTE);
        postulante.setActivo(true);
        postulante.setFechaCreacion(LocalDateTime.now());
        postulante.setFechaActualizacion(LocalDateTime.now());
        try {
            postulante.setCvNombre(cvFile.getOriginalFilename());
            postulante.setCvTipo(cvFile.getContentType());
            postulante.setCvContenido(cvFile.getBytes());
        } catch (java.io.IOException e) {
            throw new RuntimeException("Error al procesar el currículum");
        }
        
        return postulanteRepository.save(postulante);
    }
    
    public Empresa registrarEmpresa(RegistroEmpresaRequest request) {
        if (empresaRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        if (empresaRepository.existsByNit(request.getNit())) {
            throw new RuntimeException("El NIT ya está registrado");
        }
        String nombreEmp = request.getNombreEmpresa() != null ? request.getNombreEmpresa().trim() : "";
        if (nombreEmp.isBlank()) {
            throw new RuntimeException("El nombre de la empresa es obligatorio");
        }
        if (empresaRepository.existsByNombreEmpresa(nombreEmp)) {
            throw new RuntimeException("El nombre de la empresa ya está registrado");
        }
        
        Empresa empresa = new Empresa();
        empresa.setNombre(request.getNombre());
        empresa.setApellido(request.getApellido());
        empresa.setEmail(request.getEmail());
        empresa.setContrasena(passwordEncoder.encode(request.getContrasena()));
        empresa.setNombreEmpresa(nombreEmp);
        empresa.setNit(request.getNit());
        empresa.setDescripcion(request.getDescripcion());
        empresa.setUbicacion(request.getUbicacion());
        empresa.setFotoUrl(request.getFotoUrl());
        empresa.setSector(request.getSector());
        empresa.setTelefonoContacto(request.getTelefonoContacto());
        empresa.setRol(Rol.EMPRESA);
        empresa.setActivo(true);
        empresa.setFechaCreacion(LocalDateTime.now());
        empresa.setFechaActualizacion(LocalDateTime.now());
        
        return empresaRepository.save(empresa);
    }

    public Administrador registrarAdministrador(RegistroAdministradorRequest request) {
        if (administradorRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (adminSignupCode == null || adminSignupCode.isBlank()) {
            throw new RuntimeException("Registro de administradores no permitido");
        }
        if (!adminSignupCode.equals(request.getCodigoAdmin())) {
            throw new RuntimeException("Código de administrador inválido");
        }

        Administrador admin = new Administrador();
        admin.setNombre(request.getNombre());
        admin.setApellido(request.getApellido());
        admin.setEmail(request.getEmail());
        admin.setContrasena(passwordEncoder.encode(request.getContrasena()));
        admin.setCodigoAdmin(request.getCodigoAdmin());
        admin.setFotoUrl(request.getFotoUrl());
        admin.setRol(Rol.ADMINISTRADOR);
        admin.setActivo(true);
        admin.setFechaCreacion(LocalDateTime.now());
        admin.setFechaActualizacion(LocalDateTime.now());
        return administradorRepository.save(admin);
    }
}

