package com.bolsa.bolsa_trabajo.repository;

import com.bolsa.bolsa_trabajo.model.Notificacion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends MongoRepository<Notificacion, String> {
    List<Notificacion> findByUsuarioId(String usuarioId);
    List<Notificacion> findByUsuarioIdAndLeida(String usuarioId, boolean leida);
    long countByUsuarioIdAndLeida(String usuarioId, boolean leida);
}

