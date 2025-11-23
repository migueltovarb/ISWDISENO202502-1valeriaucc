package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.OfertaDeTrabajo;
import com.bolsa.bolsa_trabajo.model.enums.Modalidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfertaDeTrabajoRepository extends MongoRepository<OfertaDeTrabajo, String> {
    List<OfertaDeTrabajo> findByEmpresaId(String empresaId);
    List<OfertaDeTrabajo> findByActiva(boolean activa);
    List<OfertaDeTrabajo> findByBorrador(boolean borrador);
    Page<OfertaDeTrabajo> findByActivaAndBorrador(boolean activa, boolean borrador, Pageable pageable);
    
    @Query("{'titulo': {$regex: ?0, $options: 'i'}, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarPorTitulo(String titulo, Pageable pageable);
    
    @Query("{'ubicacion': {$regex: ?0, $options: 'i'}, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarPorUbicacion(String ubicacion, Pageable pageable);
    
    @Query("{'modalidad': ?0, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarPorModalidad(Modalidad modalidad, Pageable pageable);
    
    @Query("{'titulo': {$regex: ?0, $options: 'i'}, 'ubicacion': {$regex: ?1, $options: 'i'}, 'modalidad': ?2, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarConFiltros(String titulo, String ubicacion, Modalidad modalidad, Pageable pageable);

    @Query("{'empresaNombre': {$regex: ?0, $options: 'i'}, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarPorEmpresaNombre(String empresaNombre, Pageable pageable);

    @Query("{'titulo': {$regex: ?0, $options: 'i'}, 'ubicacion': {$regex: ?1, $options: 'i'}, 'modalidad': ?2, 'empresaNombre': {$regex: ?3, $options: 'i'}, 'activa': true, 'borrador': false}")
    Page<OfertaDeTrabajo> buscarConFiltrosEmpresa(String titulo, String ubicacion, Modalidad modalidad, String empresaNombre, Pageable pageable);
}

