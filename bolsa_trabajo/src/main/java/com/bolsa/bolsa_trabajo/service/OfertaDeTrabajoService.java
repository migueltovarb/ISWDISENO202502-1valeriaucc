package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.BuscarOfertasRequest;
import com.bolsa.bolsa_trabajo.dto.OfertaTrabajoRequest;
import com.bolsa.bolsa_trabajo.dto.OfertaTrabajoResponse;
import com.bolsa.bolsa_trabajo.model.Empresa;
import com.bolsa.bolsa_trabajo.model.OfertaDeTrabajo;
import com.bolsa.bolsa_trabajo.repository.EmpresaRepository;
import com.bolsa.bolsa_trabajo.repository.OfertaDeTrabajoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfertaDeTrabajoService {
    
    private final OfertaDeTrabajoRepository ofertaRepository;
    private final EmpresaRepository empresaRepository;
    
    public OfertaDeTrabajo crearOferta(String empresaId, OfertaTrabajoRequest request) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
        
        if (!request.isBorrador()) {
            validarCamposObligatorios(request);
        }
        OfertaDeTrabajo oferta = new OfertaDeTrabajo();
        oferta.setTitulo(request.getTitulo());
        oferta.setDescripcion(request.getDescripcion());
        oferta.setRequisitos(request.getRequisitos());
        oferta.setUbicacion(request.getUbicacion());
        oferta.setModalidad(request.getModalidad());
        oferta.setRangoSalarial(request.getRangoSalarial());
        oferta.setFechaPublicacion(LocalDateTime.now());
        oferta.setActiva(!request.isBorrador());
        oferta.setBorrador(request.isBorrador());
        oferta.setEmpresa(empresa);
        oferta.setEmpresaNombre(empresa.getNombreEmpresa());
        oferta.setNumConformidad(0);
        
        return ofertaRepository.save(oferta);
    }
    
    public OfertaDeTrabajo actualizarOferta(String ofertaId, String empresaId, OfertaTrabajoRequest request) {
        OfertaDeTrabajo oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        
        if (!oferta.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("No tienes permiso para modificar esta oferta");
        }
        
        if (!request.isBorrador()) {
            validarCamposObligatorios(request);
        }
        oferta.setTitulo(request.getTitulo());
        oferta.setDescripcion(request.getDescripcion());
        oferta.setRequisitos(request.getRequisitos());
        oferta.setUbicacion(request.getUbicacion());
        oferta.setModalidad(request.getModalidad());
        oferta.setRangoSalarial(request.getRangoSalarial());
        oferta.setBorrador(request.isBorrador());
        oferta.setActiva(!request.isBorrador());
        oferta.setEmpresaNombre(oferta.getEmpresa() != null ? oferta.getEmpresa().getNombreEmpresa() : null);
        
        return ofertaRepository.save(oferta);
    }
    
    public void eliminarOferta(String ofertaId, String empresaId) {
        OfertaDeTrabajo oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        
        if (!oferta.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("No tienes permiso para eliminar esta oferta");
        }
        
        ofertaRepository.delete(oferta);
    }
    
    public Page<OfertaTrabajoResponse> buscarOfertas(BuscarOfertasRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<OfertaDeTrabajo> ofertas;
        
        if (request.getTitulo() != null && request.getUbicacion() != null && request.getModalidad() != null && request.getEmpresaNombre() != null) {
            ofertas = ofertaRepository.buscarConFiltrosEmpresa(
                    request.getTitulo(),
                    request.getUbicacion(),
                    request.getModalidad(),
                    request.getEmpresaNombre(),
                    pageable
            );
        } else if (request.getTitulo() != null && request.getUbicacion() != null && request.getModalidad() != null) {
            ofertas = ofertaRepository.buscarConFiltros(
                    request.getTitulo(),
                    request.getUbicacion(),
                    request.getModalidad(),
                    pageable
            );
        } else if (request.getEmpresaNombre() != null) {
            ofertas = ofertaRepository.buscarPorEmpresaNombre(request.getEmpresaNombre(), pageable);
        } else if (request.getTitulo() != null) {
            ofertas = ofertaRepository.buscarPorTitulo(request.getTitulo(), pageable);
        } else if (request.getUbicacion() != null) {
            ofertas = ofertaRepository.buscarPorUbicacion(request.getUbicacion(), pageable);
        } else if (request.getModalidad() != null) {
            ofertas = ofertaRepository.buscarPorModalidad(request.getModalidad(), pageable);
        } else {
            ofertas = ofertaRepository.findByActivaAndBorrador(true, false, pageable);
        }
        
        return ofertas.map(this::convertirAResponse);
    }
    
    public OfertaTrabajoResponse obtenerOfertaPorId(String id) {
        OfertaDeTrabajo oferta = ofertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));
        return convertirAResponse(oferta);
    }
    
    public Page<OfertaTrabajoResponse> obtenerOfertasPorEmpresa(String empresaId, Pageable pageable) {
        List<OfertaDeTrabajo> ofertas = ofertaRepository.findByEmpresaId(empresaId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), ofertas.size());
        List<OfertaDeTrabajo> pageContent = ofertas.subList(start, end);
        Page<OfertaDeTrabajo> page = new org.springframework.data.domain.PageImpl<>(pageContent, pageable, ofertas.size());
        return page.map(this::convertirAResponse);
    }
    
    public OfertaTrabajoResponse convertirAResponse(OfertaDeTrabajo oferta) {
        OfertaTrabajoResponse response = new OfertaTrabajoResponse();
        response.setId(oferta.getId());
        response.setTitulo(oferta.getTitulo());
        response.setDescripcion(oferta.getDescripcion());
        response.setRequisitos(oferta.getRequisitos());
        response.setUbicacion(oferta.getUbicacion());
        response.setModalidad(oferta.getModalidad());
        response.setRangoSalarial(oferta.getRangoSalarial());
        response.setFechaPublicacion(oferta.getFechaPublicacion());
        response.setActiva(oferta.isActiva());
        response.setBorrador(oferta.isBorrador());
        if (oferta.getEmpresa() != null) {
            response.setEmpresaId(oferta.getEmpresa().getId());
            response.setEmpresaNombre(oferta.getEmpresaNombre() != null ? oferta.getEmpresaNombre() : oferta.getEmpresa().getNombreEmpresa());
        }
        response.setNumPostulaciones(oferta.getPostulaciones() != null ? oferta.getPostulaciones().size() : 0);
        return response;
    }

    private void validarCamposObligatorios(OfertaTrabajoRequest request) {
        if (isBlank(request.getTitulo()) || isBlank(request.getDescripcion()) || isBlank(request.getUbicacion())
                || request.getModalidad() == null || isBlank(request.getRangoSalarial())) {
            throw new IllegalArgumentException("Campos obligatorios incompletos para publicación");
        }
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}

