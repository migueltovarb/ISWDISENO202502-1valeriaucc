package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Empresa;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaRepository extends MongoRepository<Empresa, String> {
    Optional<Empresa> findByEmail(String email);
    Optional<Empresa> findByNit(String nit);
    boolean existsByEmail(String email);
    boolean existsByNit(String nit);
    boolean existsByNombreEmpresa(String nombreEmpresa);
}

