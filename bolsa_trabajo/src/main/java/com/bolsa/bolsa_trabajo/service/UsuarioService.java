package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.ActualizarUsuarioRequest;
import com.bolsa.bolsa_trabajo.model.Postulante;
import com.bolsa.bolsa_trabajo.model.Postulacion;
import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.model.Empresa;
import com.bolsa.bolsa_trabajo.model.Administrador;
import com.bolsa.bolsa_trabajo.repository.PostulanteRepository;
import com.bolsa.bolsa_trabajo.repository.UsuarioRepository;
import com.bolsa.bolsa_trabajo.repository.PostulacionRepository;
import com.bolsa.bolsa_trabajo.repository.EmpresaRepository;
import com.bolsa.bolsa_trabajo.repository.AdministradorRepository;
import com.bolsa.bolsa_trabajo.dto.PerfilPostulanteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final PostulanteRepository postulanteRepository;
    private final PostulacionRepository postulacionRepository;
    private final EmpresaRepository empresaRepository;
    private final AdministradorRepository administradorRepository;
    
    public Usuario obtenerUsuarioPorId(String id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) usuario = postulanteRepository.findById(id).orElse(null);
        if (usuario == null) usuario = empresaRepository.findById(id).orElse(null);
        if (usuario == null) usuario = administradorRepository.findById(id).orElse(null);
        if (usuario == null) throw new RuntimeException("Usuario no encontrado");
        return usuario;
    }
    
    public Usuario actualizarUsuario(String id, ActualizarUsuarioRequest request) {
        Usuario usuario = obtenerUsuarioPorId(id);
        
        if (request.getNombre() != null) usuario.setNombre(request.getNombre());
        if (request.getApellido() != null) usuario.setApellido(request.getApellido());
        if (request.getEmail() != null && !request.getEmail().equals(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("El email ya está en uso");
            }
            usuario.setEmail(request.getEmail());
        }
        
        usuario.setFechaActualizacion(LocalDateTime.now());
        if (request.getFotoOffsetX() != null) usuario.setFotoOffsetX(request.getFotoOffsetX());
        if (request.getFotoOffsetY() != null) usuario.setFotoOffsetY(request.getFotoOffsetY());
        if (request.getFotoScale() != null) usuario.setFotoScale(request.getFotoScale());
        
        // Si es postulante, actualizar campos adicionales
        if (usuario instanceof Postulante) {
            Postulante postulante = (Postulante) usuario;
            if (request.getFotoUrl() != null) postulante.setFotoUrl(request.getFotoUrl());
            if (request.getDireccion() != null) postulante.setDireccion(request.getDireccion());
            if (request.getTelefono() != null) postulante.setTelefono(request.getTelefono());
            return postulanteRepository.save(postulante);
        }

        // Si es empresa, actualizar descripción, ubicación y foto
        if (usuario instanceof Empresa) {
            Empresa empresa = (Empresa) usuario;
            if (request.getDescripcion() != null) empresa.setDescripcion(request.getDescripcion());
            if (request.getUbicacion() != null) empresa.setUbicacion(request.getUbicacion());
            if (request.getFotoUrl() != null) empresa.setFotoUrl(request.getFotoUrl());
            if (request.getSector() != null) empresa.setSector(request.getSector());
            if (request.getTelefonoContacto() != null) empresa.setTelefonoContacto(request.getTelefonoContacto());
            return empresaRepository.save(empresa);
        }

        // Si es administrador, actualizar foto
        if (usuario instanceof Administrador) {
            Administrador admin = (Administrador) usuario;
            if (request.getFotoUrl() != null) admin.setFotoUrl(request.getFotoUrl());
            return administradorRepository.save(admin);
        }
        
        return usuarioRepository.save(usuario);
    }
    
    public void desactivarCuenta(String id) {
        Usuario usuario = obtenerUsuarioPorId(id);
        usuario.desactivarCuenta();
        if (usuario instanceof Postulante) {
            postulanteRepository.save((Postulante) usuario);
        } else if (usuario instanceof Empresa) {
            empresaRepository.save((Empresa) usuario);
        } else if (usuario instanceof Administrador) {
            administradorRepository.save((Administrador) usuario);
        } else {
            usuarioRepository.save(usuario);
        }
    }
    
    public List<Usuario> listarTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public PerfilPostulanteResponse obtenerPerfilPostulanteParaEmpresa(String empresaId, String postulanteId) {
        Postulante postulante = postulanteRepository.findById(postulanteId)
                .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));

        boolean autorizado = postulacionRepository.findByPostulanteId(postulanteId)
                .stream()
                .map(Postulacion::getOferta)
                .filter(oferta -> oferta != null && oferta.getEmpresa() != null)
                .anyMatch(oferta -> empresaId.equals(oferta.getEmpresa().getId()));

        if (!autorizado) {
            throw new RuntimeException("No tienes permiso para acceder a este perfil");
        }

        PerfilPostulanteResponse perfil = new PerfilPostulanteResponse();
        perfil.setId(postulante.getId());
        perfil.setNombre(postulante.getNombre());
        perfil.setApellido(postulante.getApellido());
        perfil.setEmail(postulante.getEmail());
        perfil.setFotoUrl(postulante.getFotoUrl());
        perfil.setDireccion(postulante.getDireccion());
        perfil.setTelefono(postulante.getTelefono());
        return perfil;
    }
}

