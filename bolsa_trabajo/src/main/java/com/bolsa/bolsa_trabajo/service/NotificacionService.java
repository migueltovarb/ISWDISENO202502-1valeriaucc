package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.NotificacionResponse;
import com.bolsa.bolsa_trabajo.model.Notificacion;
import com.bolsa.bolsa_trabajo.repository.NotificacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificacionService {
    
    private final NotificacionRepository notificacionRepository;
    
    public List<NotificacionResponse> obtenerNotificacionesPorUsuario(String usuarioId) {
        return notificacionRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public List<NotificacionResponse> obtenerNotificacionesNoLeidas(String usuarioId) {
        return notificacionRepository.findByUsuarioIdAndLeida(usuarioId, false)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public void marcarComoLeida(String notificacionId, String usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(notificacionId)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        
        if (!notificacion.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para esta notificación");
        }
        
        notificacion.remarcarComoLeida();
        notificacionRepository.save(notificacion);
    }
    
    public long contarNotificacionesNoLeidas(String usuarioId) {
        return notificacionRepository.countByUsuarioIdAndLeida(usuarioId, false);
    }
    
    private NotificacionResponse convertirAResponse(Notificacion notificacion) {
        NotificacionResponse response = new NotificacionResponse();
        response.setId(notificacion.getId());
        response.setTitulo(notificacion.getTitulo());
        response.setMensaje(notificacion.getMensaje());
        response.setFecha(notificacion.getFecha());
        response.setLeida(notificacion.isLeida());
        response.setTipo(notificacion.getTipo());
        return response;
    }
}

