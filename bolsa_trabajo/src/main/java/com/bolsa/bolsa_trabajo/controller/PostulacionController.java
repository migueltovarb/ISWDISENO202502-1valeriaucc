package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.CambiarEstadoPostulacionRequest;
import com.bolsa.bolsa_trabajo.dto.PostulacionRequest;
import com.bolsa.bolsa_trabajo.dto.PostulacionResponse;
import com.bolsa.bolsa_trabajo.service.PostulacionService;
import com.bolsa.bolsa_trabajo.repository.PostulacionRepository;
import org.springframework.http.MediaType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postulaciones")
@RequiredArgsConstructor
public class PostulacionController {
    
    private final PostulacionService postulacionService;
    private final PostulacionRepository postulacionRepository;
    
    @PostMapping
    public ResponseEntity<PostulacionResponse> postularAOferta(
            Authentication authentication,
            @Valid @RequestBody PostulacionRequest request) {
        String postulanteId = authentication.getName();
        var postulacion = postulacionService.postularAOferta(postulanteId, request);
        
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
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/mis-postulaciones")
    public ResponseEntity<List<PostulacionResponse>> obtenerMisPostulaciones(Authentication authentication) {
        String postulanteId = authentication.getName();
        List<PostulacionResponse> postulaciones = postulacionService.obtenerPostulacionesPorPostulante(postulanteId);
        return ResponseEntity.ok(postulaciones);
    }
    
    @GetMapping("/oferta/{ofertaId}")
    public ResponseEntity<org.springframework.data.domain.Page<PostulacionResponse>> obtenerPostulacionesPorOferta(
            Authentication authentication,
            @PathVariable String ofertaId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String estado) {
        String empresaId = authentication.getName();
        var postulaciones = postulacionService.obtenerPostulacionesPorOferta(ofertaId, empresaId, page, size, estado);
        return ResponseEntity.ok(postulaciones);
    }

    @GetMapping("/oferta/{ofertaId}/metrics")
    public ResponseEntity<com.bolsa.bolsa_trabajo.dto.PostulacionesMetricsResponse> obtenerMetricasPorOferta(
            Authentication authentication,
            @PathVariable String ofertaId) {
        String empresaId = authentication.getName();
        var metrics = postulacionService.obtenerMetricasPorOferta(ofertaId, empresaId);
        return ResponseEntity.ok(metrics);
    }
    
    @PutMapping("/{id}/estado")
    public ResponseEntity<PostulacionResponse> cambiarEstadoPostulacion(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody CambiarEstadoPostulacionRequest request) {
        String empresaId = authentication.getName();
        var postulacion = postulacionService.cambiarEstadoPostulacion(id, empresaId, request);
        
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
        
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{id}/cv")
    public ResponseEntity<byte[]> descargarCvPostulacion(
            Authentication authentication,
            @PathVariable String id) {
        String empresaId = authentication.getName();
        var postulacion = postulacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Postulación no encontrada"));
        if (postulacion.getOferta() == null || postulacion.getOferta().getEmpresa() == null
                || !postulacion.getOferta().getEmpresa().getId().equals(empresaId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        var postulante = postulacion.getPostulante();
        if (postulante == null || postulante.getCvContenido() == null || postulante.getCvContenido().length == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        String tipo = postulante.getCvTipo() != null ? postulante.getCvTipo() : MediaType.APPLICATION_OCTET_STREAM_VALUE;
        return ResponseEntity.ok()
                .header("Content-Type", tipo)
                .header("Content-Disposition", "attachment; filename=" + (postulante.getCvNombre() != null ? postulante.getCvNombre() : "cv"))
                .body(postulante.getCvContenido());
    }
}

