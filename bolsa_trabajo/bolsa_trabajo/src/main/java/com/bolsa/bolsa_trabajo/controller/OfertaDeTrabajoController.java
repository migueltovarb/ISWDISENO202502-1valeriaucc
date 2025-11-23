package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.BuscarOfertasRequest;
import com.bolsa.bolsa_trabajo.dto.OfertaTrabajoRequest;
import com.bolsa.bolsa_trabajo.dto.OfertaTrabajoResponse;
import com.bolsa.bolsa_trabajo.service.OfertaDeTrabajoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ofertas")
@RequiredArgsConstructor
public class OfertaDeTrabajoController {
    
    private final OfertaDeTrabajoService ofertaService;
    
    @PostMapping
    public ResponseEntity<OfertaTrabajoResponse> crearOferta(
            Authentication authentication,
            @Valid @RequestBody OfertaTrabajoRequest request) {
        String empresaId = authentication.getName();
        var oferta = ofertaService.crearOferta(empresaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ofertaService.convertirAResponse(oferta)
        );
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<OfertaTrabajoResponse> actualizarOferta(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody OfertaTrabajoRequest request) {
        String empresaId = authentication.getName();
        var oferta = ofertaService.actualizarOferta(id, empresaId, request);
        return ResponseEntity.ok(ofertaService.convertirAResponse(oferta));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(
            Authentication authentication,
            @PathVariable String id) {
        String empresaId = authentication.getName();
        ofertaService.eliminarOferta(id, empresaId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/public")
    public ResponseEntity<Page<OfertaTrabajoResponse>> buscarOfertasPublicas(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String ubicacion,
            @RequestParam(required = false) String modalidad,
            @RequestParam(required = false) String empresa,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        BuscarOfertasRequest request = new BuscarOfertasRequest();
        request.setTitulo(titulo);
        request.setUbicacion(ubicacion);
        if (modalidad != null) {
            try {
                request.setModalidad(com.bolsa.bolsa_trabajo.model.enums.Modalidad.valueOf(modalidad.toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Si el valor no es válido, se ignora
            }
        }
        request.setEmpresaNombre(empresa);
        request.setPage(page);
        request.setSize(size);
        
        Page<OfertaTrabajoResponse> ofertas = ofertaService.buscarOfertas(request);
        return ResponseEntity.ok(ofertas);
    }
    
    @GetMapping("/public/{id}")
    public ResponseEntity<OfertaTrabajoResponse> obtenerOfertaPublica(@PathVariable String id) {
        OfertaTrabajoResponse oferta = ofertaService.obtenerOfertaPorId(id);
        return ResponseEntity.ok(oferta);
    }
    
    @GetMapping("/mis-ofertas")
    public ResponseEntity<Page<OfertaTrabajoResponse>> obtenerMisOfertas(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String empresaId = authentication.getName();
        Pageable pageable = PageRequest.of(page, size);
        Page<OfertaTrabajoResponse> ofertas = ofertaService.obtenerOfertasPorEmpresa(empresaId, pageable);
        return ResponseEntity.ok(ofertas);
    }
}

