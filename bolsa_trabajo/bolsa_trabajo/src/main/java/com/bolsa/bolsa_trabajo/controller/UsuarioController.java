package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.ActualizarUsuarioRequest;
import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.dto.PerfilPostulanteResponse;
import com.bolsa.bolsa_trabajo.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(Authentication authentication) {
        String userId = authentication.getName();
        Usuario usuario = usuarioService.obtenerUsuarioPorId(userId);
        return ResponseEntity.ok(usuario);
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<Usuario> actualizarPerfil(
            Authentication authentication,
            @Valid @RequestBody ActualizarUsuarioRequest request) {
        String userId = authentication.getName();
        Usuario usuario = usuarioService.actualizarUsuario(userId, request);
        return ResponseEntity.ok(usuario);
    }
    
    @DeleteMapping("/cuenta")
    public ResponseEntity<Void> desactivarCuenta(Authentication authentication) {
        String userId = authentication.getName();
        usuarioService.desactivarCuenta(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/postulantes/{postulanteId}")
    public ResponseEntity<PerfilPostulanteResponse> obtenerPerfilPostulanteParaEmpresa(
            Authentication authentication,
            @PathVariable String postulanteId) {
        String empresaId = authentication.getName();
        PerfilPostulanteResponse perfil = usuarioService.obtenerPerfilPostulanteParaEmpresa(empresaId, postulanteId);
        return ResponseEntity.ok(perfil);
    }

    @GetMapping(value = "/cv")
    public ResponseEntity<byte[]> descargarCv(Authentication authentication) {
        String userId = authentication.getName();
        Usuario usuario = usuarioService.obtenerUsuarioPorId(userId);
        if (usuario instanceof com.bolsa.bolsa_trabajo.model.Postulante) {
            com.bolsa.bolsa_trabajo.model.Postulante p = (com.bolsa.bolsa_trabajo.model.Postulante) usuario;
            if (p.getCvContenido() != null && p.getCvContenido().length > 0) {
                String tipo = p.getCvTipo() != null ? p.getCvTipo() : MediaType.APPLICATION_OCTET_STREAM_VALUE;
                return ResponseEntity.ok()
                        .header("Content-Type", tipo)
                        .header("Content-Disposition", "attachment; filename=" + (p.getCvNombre() != null ? p.getCvNombre() : "cv"))
                        .body(p.getCvContenido());
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

