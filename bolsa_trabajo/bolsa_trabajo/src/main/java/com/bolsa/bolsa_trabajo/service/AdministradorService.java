package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.ReporteResponse;
import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.model.enums.Rol;
import com.bolsa.bolsa_trabajo.repository.AdministradorRepository;
import com.bolsa.bolsa_trabajo.repository.OfertaDeTrabajoRepository;
import com.bolsa.bolsa_trabajo.repository.PostulacionRepository;
import com.bolsa.bolsa_trabajo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdministradorService {
    
    private final UsuarioRepository usuarioRepository;
    private final OfertaDeTrabajoRepository ofertaRepository;
    private final PostulacionRepository postulacionRepository;
    
    public void eliminarOfertaPorAdmin(String ofertaId) {
        ofertaRepository.deleteById(ofertaId);
    }
    
    public void eliminarUsuario(String id) {
        usuarioRepository.deleteById(id);
    }
    
    public void activarUsuario(String id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setActivo(true);
        usuarioRepository.save(usuario);
    }
    
    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        return usuarioRepository.save(usuario);
    }
    
    public Usuario modificarUsuario(String id, Usuario usuarioActualizado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        if (!usuario.getEmail().equals(usuarioActualizado.getEmail()) && 
            usuarioRepository.existsByEmail(usuarioActualizado.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }
        usuario.setEmail(usuarioActualizado.getEmail());
        
        return usuarioRepository.save(usuario);
    }
    
    public void desactivarUsuario(String id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.desactivarCuenta();
        usuarioRepository.save(usuario);
    }
    
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> listarUsuariosPorRol(Rol rol) {
        return usuarioRepository.findByRol(rol);
    }

    public Usuario cambiarRolUsuario(String id, Rol nuevoRol) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setRol(nuevoRol);
        return usuarioRepository.save(usuario);
    }
    
    public ReporteResponse generarReporteUsuarios() {
        long totalUsuarios = usuarioRepository.count();
        long totalPostulantes = usuarioRepository.findByRol(Rol.POSTULANTE).size();
        long totalEmpresas = usuarioRepository.findByRol(Rol.EMPRESA).size();
        long totalAdministradores = usuarioRepository.findByRol(Rol.ADMINISTRADOR).size();
        
        Map<String, Object> datosDetalle = new HashMap<>();
        datosDetalle.put("totalPostulantes", totalPostulantes);
        datosDetalle.put("totalEmpresas", totalEmpresas);
        datosDetalle.put("totalAdministradores", totalAdministradores);
        
        ReporteResponse reporte = new ReporteResponse();
        reporte.setTipoReporte("REPORTE_USUARIOS");
        reporte.setDescripcion("Reporte de usuarios del sistema");
        reporte.setFechaGeneracion(LocalDate.now());
        reporte.setTotalUsuarios((int) totalUsuarios);
        reporte.setDatosDetalle(datosDetalle);
        
        return reporte;
    }
    
    public ReporteResponse generarReporteOfertas() {
        long totalOfertas = ofertaRepository.count();
        long totalOfertasActivas = ofertaRepository.findByActiva(true).size();
        long totalOfertasBorrador = ofertaRepository.findByBorrador(true).size();
        
        Map<String, Object> datosDetalle = new HashMap<>();
        datosDetalle.put("totalOfertas", totalOfertas);
        datosDetalle.put("totalOfertasActivas", totalOfertasActivas);
        datosDetalle.put("totalOfertasBorrador", totalOfertasBorrador);
        
        ReporteResponse reporte = new ReporteResponse();
        reporte.setTipoReporte("REPORTE_OFERTAS");
        reporte.setDescripcion("Reporte de ofertas laborales");
        reporte.setFechaGeneracion(LocalDate.now());
        reporte.setTotalOfertasActivas((int) totalOfertasActivas);
        reporte.setDatosDetalle(datosDetalle);
        
        return reporte;
    }
    
    public ReporteResponse generarReportePostulaciones() {
        long totalPostulaciones = postulacionRepository.count();
        
        Map<String, Object> datosDetalle = new HashMap<>();
        datosDetalle.put("totalPostulaciones", totalPostulaciones);
        
        ReporteResponse reporte = new ReporteResponse();
        reporte.setTipoReporte("REPORTE_POSTULACIONES");
        reporte.setDescripcion("Reporte de postulaciones");
        reporte.setFechaGeneracion(LocalDate.now());
        reporte.setTotalPostulaciones((int) totalPostulaciones);
        reporte.setDatosDetalle(datosDetalle);
        
        return reporte;
    }
    
    public ReporteResponse generarReporteGeneral() {
        long totalUsuarios = usuarioRepository.count();
        long totalOfertasActivas = ofertaRepository.findByActiva(true).size();
        long totalPostulaciones = postulacionRepository.count();
        
        Map<String, Object> datosDetalle = new HashMap<>();
        datosDetalle.put("totalPostulantes", usuarioRepository.findByRol(Rol.POSTULANTE).size());
        datosDetalle.put("totalEmpresas", usuarioRepository.findByRol(Rol.EMPRESA).size());
        datosDetalle.put("totalOfertas", ofertaRepository.count());
        
        ReporteResponse reporte = new ReporteResponse();
        reporte.setTipoReporte("REPORTE_GENERAL");
        reporte.setDescripcion("Reporte general del sistema");
        reporte.setFechaGeneracion(LocalDate.now());
        reporte.setTotalUsuarios((int) totalUsuarios);
        reporte.setTotalOfertasActivas((int) totalOfertasActivas);
        reporte.setTotalPostulaciones((int) totalPostulaciones);
        reporte.setDatosDetalle(datosDetalle);
        
        return reporte;
    }
}

