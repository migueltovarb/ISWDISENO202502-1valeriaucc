package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Postulacion;
import com.bolsa.bolsa_trabajo.model.enums.EstadoPostulacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostulacionRepository extends MongoRepository<Postulacion, String> {
    List<Postulacion> findByPostulanteId(String postulanteId);
    List<Postulacion> findByOfertaId(String ofertaId);
    Page<Postulacion> findByOfertaId(String ofertaId, Pageable pageable);
    Page<Postulacion> findByOfertaIdAndEstado(String ofertaId, EstadoPostulacion estado, Pageable pageable);
    List<Postulacion> findByEstado(EstadoPostulacion estado);
    Optional<Postulacion> findByPostulanteIdAndOfertaId(String postulanteId, String ofertaId);
    boolean existsByPostulanteIdAndOfertaId(String postulanteId, String ofertaId);
    long countByOfertaId(String ofertaId);
    long countByOfertaIdAndEstado(String ofertaId, EstadoPostulacion estado);
}

