package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.NotificacionResponse;
import com.bolsa.bolsa_trabajo.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
public class NotificacionController {
    
    private final NotificacionService notificacionService;
    
    @GetMapping
    public ResponseEntity<List<NotificacionResponse>> obtenerNotificaciones(Authentication authentication) {
        String usuarioId = authentication.getName();
        List<NotificacionResponse> notificaciones = notificacionService.obtenerNotificacionesPorUsuario(usuarioId);
        return ResponseEntity.ok(notificaciones);
    }
    
    @GetMapping("/no-leidas")
    public ResponseEntity<List<NotificacionResponse>> obtenerNotificacionesNoLeidas(Authentication authentication) {
        String usuarioId = authentication.getName();
        List<NotificacionResponse> notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuarioId);
        return ResponseEntity.ok(notificaciones);
    }
    
    @GetMapping("/contador")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(Authentication authentication) {
        String usuarioId = authentication.getName();
        long contador = notificacionService.contarNotificacionesNoLeidas(usuarioId);
        return ResponseEntity.ok(contador);
    }
    
    @PutMapping("/{id}/marcar-leida")
    public ResponseEntity<Void> marcarComoLeida(
            Authentication authentication,
            @PathVariable String id) {
        String usuarioId = authentication.getName();
        notificacionService.marcarComoLeida(id, usuarioId);
        return ResponseEntity.noContent().build();
    }
}

