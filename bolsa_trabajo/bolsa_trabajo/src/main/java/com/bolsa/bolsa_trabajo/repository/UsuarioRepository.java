package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.model.enums.Rol;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByRol(Rol rol);
    List<Usuario> findByActivo(boolean activo);
}

