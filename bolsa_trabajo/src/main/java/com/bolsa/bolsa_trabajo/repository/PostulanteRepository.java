package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Postulante;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostulanteRepository extends MongoRepository<Postulante, String> {
    Optional<Postulante> findByEmail(String email);
    boolean existsByEmail(String email);
}

