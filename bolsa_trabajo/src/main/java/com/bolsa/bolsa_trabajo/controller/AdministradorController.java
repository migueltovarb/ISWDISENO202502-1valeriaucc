package com.bolsa.bolsa_trabajo.controller;

import com.bolsa.bolsa_trabajo.dto.ReporteResponse;
import com.bolsa.bolsa_trabajo.dto.ActualizarUsuarioRequest;
import com.bolsa.bolsa_trabajo.model.Usuario;
import com.bolsa.bolsa_trabajo.model.Postulante;
import com.bolsa.bolsa_trabajo.model.Empresa;
import com.bolsa.bolsa_trabajo.model.Administrador;
import com.bolsa.bolsa_trabajo.model.enums.Rol;
import com.bolsa.bolsa_trabajo.repository.UsuarioRepository;
import com.bolsa.bolsa_trabajo.repository.PostulanteRepository;
import com.bolsa.bolsa_trabajo.repository.EmpresaRepository;
import com.bolsa.bolsa_trabajo.repository.AdministradorRepository;
import com.bolsa.bolsa_trabajo.repository.OfertaDeTrabajoRepository;
import com.bolsa.bolsa_trabajo.service.AdministradorService;
import com.bolsa.bolsa_trabajo.service.ReportePdfService;
import com.bolsa.bolsa_trabajo.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdministradorController {

    private final AdministradorService administradorService;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final PostulanteRepository postulanteRepository;
    private final EmpresaRepository empresaRepository;
    private final AdministradorRepository administradorRepository;
    private final OfertaDeTrabajoRepository ofertaRepository;

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = administradorService.crearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> modificarUsuario(@PathVariable String id, @RequestBody ActualizarUsuarioRequest request) {
        Usuario actualizado = usuarioService.actualizarUsuario(id, request);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> desactivarUsuario(@PathVariable String id) {
        usuarioService.desactivarCuenta(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/usuarios/{id}/activar")
    public ResponseEntity<Void> activarUsuario(@PathVariable String id) {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        usuario.setActivo(true);
        if (usuario instanceof Postulante) {
            postulanteRepository.save((Postulante) usuario);
        } else if (usuario instanceof Empresa) {
            empresaRepository.save((Empresa) usuario);
        } else if (usuario instanceof Administrador) {
            administradorRepository.save((Administrador) usuario);
        } else {
            usuarioRepository.save(usuario);
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/usuarios/{id}/eliminar")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        } else if (postulanteRepository.existsById(id)) {
            postulanteRepository.deleteById(id);
        } else if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
        } else if (administradorRepository.existsById(id)) {
            administradorRepository.deleteById(id);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuarios")
    public ResponseEntity<java.util.List<Usuario>> listarUsuarios(@RequestParam(required = false) String rol) {
        java.util.List<Usuario> out = new java.util.ArrayList<>();
        if (rol == null || rol.isBlank()) {
            out.addAll(usuarioRepository.findAll());
            out.addAll(postulanteRepository.findAll());
            out.addAll(empresaRepository.findAll());
            out.addAll(administradorRepository.findAll());
        } else {
            try {
                Rol r = Rol.valueOf(rol.toUpperCase());
                switch (r) {
                    case POSTULANTE -> out.addAll(postulanteRepository.findAll());
                    case EMPRESA -> out.addAll(empresaRepository.findAll());
                    case ADMINISTRADOR -> out.addAll(administradorRepository.findAll());
                    default -> out.addAll(usuarioRepository.findAll());
                }
            } catch (IllegalArgumentException e) {
                out.addAll(usuarioRepository.findAll());
                out.addAll(postulanteRepository.findAll());
                out.addAll(empresaRepository.findAll());
                out.addAll(administradorRepository.findAll());
            }
        }
        return ResponseEntity.ok(out);
    }

    @PutMapping("/usuarios/{id}/rol")
    public ResponseEntity<Usuario> cambiarRol(@PathVariable String id, @RequestBody String rol) {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        try {
            Rol nuevoRol = Rol.valueOf(rol.replace("\"", "").trim().toUpperCase());
            usuario.setRol(nuevoRol);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        if (usuario instanceof Postulante) {
            postulanteRepository.save((Postulante) usuario);
        } else if (usuario instanceof Empresa) {
            empresaRepository.save((Empresa) usuario);
        } else if (usuario instanceof Administrador) {
            administradorRepository.save((Administrador) usuario);
        } else {
            usuarioRepository.save(usuario);
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/reportes/usuarios")
    public ResponseEntity<ReporteResponse> generarReporteUsuarios() {
        ReporteResponse reporte = administradorService.generarReporteUsuarios();
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/reportes/ofertas")
    public ResponseEntity<ReporteResponse> generarReporteOfertas() {
        ReporteResponse reporte = administradorService.generarReporteOfertas();
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/reportes/postulaciones")
    public ResponseEntity<ReporteResponse> generarReportePostulaciones() {
        ReporteResponse reporte = administradorService.generarReportePostulaciones();
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/reportes/general")
    public ResponseEntity<ReporteResponse> generarReporteGeneral() {
        ReporteResponse reporte = administradorService.generarReporteGeneral();
        return ResponseEntity.ok(reporte);
    }

    @GetMapping(value = "/reportes/usuarios/pdf", produces = "application/pdf")
    public ResponseEntity<byte[]> exportarReporteUsuariosPdf() {
        ReporteResponse reporte = administradorService.generarReporteUsuarios();
        byte[] pdf = ReportePdfService.generarUsuariosPdf(reporte);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=usuarios.pdf")
                .body(pdf);
    }

    @GetMapping(value = "/reportes/ofertas/pdf", produces = "application/pdf")
    public ResponseEntity<byte[]> exportarReporteOfertasPdf() {
        ReporteResponse reporte = administradorService.generarReporteOfertas();
        byte[] pdf = ReportePdfService.generarOfertasPdf(reporte);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=ofertas.pdf")
                .body(pdf);
    }

    @GetMapping(value = "/reportes/postulaciones/pdf", produces = "application/pdf")
    public ResponseEntity<byte[]> exportarReportePostulacionesPdf() {
        ReporteResponse reporte = administradorService.generarReportePostulaciones();
        byte[] pdf = ReportePdfService.generarPostulacionesPdf(reporte);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=postulaciones.pdf")
                .body(pdf);
    }

    @GetMapping(value = "/reportes/general/pdf", produces = "application/pdf")
    public ResponseEntity<byte[]> exportarReporteGeneralPdf() {
        ReporteResponse reporte = administradorService.generarReporteGeneral();
        byte[] pdf = ReportePdfService.generarGeneralPdf(reporte);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=general.pdf")
                .body(pdf);
    }

    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Void> eliminarOfertaPorAdmin(@PathVariable String id) {
        if (ofertaRepository.existsById(id)) {
            ofertaRepository.deleteById(id);
        }
        return ResponseEntity.noContent().build();
    }
}
