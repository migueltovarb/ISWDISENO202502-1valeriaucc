package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Administrador;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends MongoRepository<Administrador, String> {
    Optional<Administrador> findByEmail(String email);
    Optional<Administrador> findByCodigoAdmin(String codigoAdmin);
    boolean existsByEmail(String email);
}

