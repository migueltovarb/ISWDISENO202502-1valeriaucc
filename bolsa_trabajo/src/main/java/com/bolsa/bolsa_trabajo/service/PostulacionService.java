package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.CambiarEstadoPostulacionRequest;
import com.bolsa.bolsa_trabajo.dto.PostulacionRequest;
import com.bolsa.bolsa_trabajo.dto.PostulacionesMetricsResponse;
import com.bolsa.bolsa_trabajo.dto.PostulacionResponse;
import com.bolsa.bolsa_trabajo.model.Notificacion;
import com.bolsa.bolsa_trabajo.model.OfertaDeTrabajo;
import com.bolsa.bolsa_trabajo.model.Postulacion;
import com.bolsa.bolsa_trabajo.model.Postulante;
import com.bolsa.bolsa_trabajo.model.enums.EstadoPostulacion;
import com.bolsa.bolsa_trabajo.model.enums.TipoNotificacion;
import com.bolsa.bolsa_trabajo.repository.NotificacionRepository;
import com.bolsa.bolsa_trabajo.repository.OfertaDeTrabajoRepository;
import com.bolsa.bolsa_trabajo.repository.PostulacionRepository;
import com.bolsa.bolsa_trabajo.repository.PostulanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostulacionService {
    
    private final PostulacionRepository postulacionRepository;
    private final PostulanteRepository postulanteRepository;
    private final OfertaDeTrabajoRepository ofertaRepository;
    private final NotificacionRepository notificacionRepository;
    
    public Postulacion postularAOferta(String postulanteId, PostulacionRequest request) {
        Postulante postulante = postulanteRepository.findById(postulanteId)
                .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));
        
        OfertaDeTrabajo oferta = ofertaRepository.findById(request.getOfertaId())
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        
        if (!oferta.isActiva() || oferta.isBorrador()) {
            throw new RuntimeException("La oferta no está disponible");
        }
        
        if (postulacionRepository.existsByPostulanteIdAndOfertaId(postulanteId, request.getOfertaId())) {
            throw new RuntimeException("Ya te has postulado a esta oferta");
        }
        
        Postulacion postulacion = new Postulacion();
        postulacion.setPostulante(postulante);
        postulacion.setOferta(oferta);
        postulacion.setFechaHoraPostulacion(LocalDateTime.now());
        postulacion.setEstado(EstadoPostulacion.PENDIENTE);
        
        Postulacion saved = postulacionRepository.save(postulacion);
        
        // Crear notificación para el postulante
        Notificacion notificacionPostulante = new Notificacion();
        notificacionPostulante.setTitulo("Postulación realizada");
        notificacionPostulante.setMensaje("Te has postulado a la oferta: " + oferta.getTitulo());
        notificacionPostulante.setTipo(TipoNotificacion.POSTULACION_REALIZADA);
        notificacionPostulante.setFecha(LocalDateTime.now());
        notificacionPostulante.setLeida(false);
        notificacionPostulante.setUsuario(postulante);
        notificacionRepository.save(notificacionPostulante);
        
        // Crear notificación para la empresa
        Notificacion notificacionEmpresa = new Notificacion();
        notificacionEmpresa.setTitulo("Nueva postulación recibida");
        notificacionEmpresa.setMensaje("Nueva postulación a la oferta: " + oferta.getTitulo());
        notificacionEmpresa.setTipo(TipoNotificacion.NUEVA_POSTULACION_RECIBIDA);
        notificacionEmpresa.setFecha(LocalDateTime.now());
        notificacionEmpresa.setLeida(false);
        notificacionEmpresa.setUsuario(oferta.getEmpresa());
        notificacionRepository.save(notificacionEmpresa);
        
        return saved;
    }
    
    public List<PostulacionResponse> obtenerPostulacionesPorPostulante(String postulanteId) {
        return postulacionRepository.findByPostulanteId(postulanteId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public Page<PostulacionResponse> obtenerPostulacionesPorOferta(String ofertaId, String empresaId, int page, int size, String estadoStr) {
        OfertaDeTrabajo oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        if (oferta.getEmpresa() == null || !oferta.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("No tienes permiso para ver las postulaciones de esta oferta");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "fechaHoraPostulacion"));
        Page<Postulacion> pageData;
        if (estadoStr != null && !estadoStr.isBlank()) {
            try {
                EstadoPostulacion estado = EstadoPostulacion.valueOf(estadoStr.toUpperCase());
                pageData = postulacionRepository.findByOfertaIdAndEstado(ofertaId, estado, pageable);
            } catch (IllegalArgumentException e) {
                pageData = postulacionRepository.findByOfertaId(ofertaId, pageable);
            }
        } else {
            pageData = postulacionRepository.findByOfertaId(ofertaId, pageable);
        }
        return pageData.map(this::convertirAResponse);
    }

    public PostulacionesMetricsResponse obtenerMetricasPorOferta(String ofertaId, String empresaId) {
        OfertaDeTrabajo oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        if (oferta.getEmpresa() == null || !oferta.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("No tienes permiso para ver las métricas de esta oferta");
        }
        long total = postulacionRepository.countByOfertaId(ofertaId);
        long pendientes = postulacionRepository.countByOfertaIdAndEstado(ofertaId, EstadoPostulacion.PENDIENTE);
        long aceptadas = postulacionRepository.countByOfertaIdAndEstado(ofertaId, EstadoPostulacion.ACEPTADA);
        long rechazadas = postulacionRepository.countByOfertaIdAndEstado(ofertaId, EstadoPostulacion.RECHAZADA);
        return new PostulacionesMetricsResponse((int) total, (int) pendientes, (int) aceptadas, (int) rechazadas);
    }
    
    public Postulacion cambiarEstadoPostulacion(String postulacionId, String empresaId, CambiarEstadoPostulacionRequest request) {
        Postulacion postulacion = postulacionRepository.findById(postulacionId)
                .orElseThrow(() -> new RuntimeException("Postulación no encontrada"));
        
        if (!postulacion.getOferta().getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("No tienes permiso para cambiar el estado de esta postulación");
        }
        
        postulacion.cambiarEstado(request.getEstado());
        Postulacion updated = postulacionRepository.save(postulacion);

        Notificacion notificacionEstado = new Notificacion();
        notificacionEstado.setTitulo("Estado de postulación actualizado");
        String nombreOferta = updated.getOferta() != null ? updated.getOferta().getTitulo() : "oferta";
        notificacionEstado.setMensaje("Tu postulación a la oferta '" + nombreOferta + "' fue actualizada a: " + request.getEstado());
        notificacionEstado.setTipo(TipoNotificacion.SISTEMA);
        notificacionEstado.setFecha(LocalDateTime.now());
        notificacionEstado.setLeida(false);
        notificacionEstado.setUsuario(updated.getPostulante());
        notificacionRepository.save(notificacionEstado);

        return updated;
    }
    
    private PostulacionResponse convertirAResponse(Postulacion postulacion) {
        PostulacionResponse response = new PostulacionResponse();
        response.setId(postulacion.getId());
        response.setFechaHoraPostulacion(postulacion.getFechaHoraPostulacion());
        response.setEstado(postulacion.getEstado());
        if (postulacion.getPostulante() != null) {
            response.setPostulanteId(postulacion.getPostulante().getId());
            response.setPostulanteNombre(postulacion.getPostulante().getNombre() + " " + postulacion.getPostulante().getApellido());
        }
        if (postulacion.getOferta() != null) {
            response.setOfertaId(postulacion.getOferta().getId());
            response.setOfertaTitulo(postulacion.getOferta().getTitulo());
        }
        return response;
    }
}

