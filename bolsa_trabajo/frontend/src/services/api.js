import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error("[API] Error en request:", error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const userMessage = {}

    // Manejo de autenticación
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      userMessage.userMessage = "Sesión expirada. Por favor inicia sesión nuevamente."
      window.location.href = "/login"
    }
    // Errores de validación
    else if (error.response?.status === 400) {
      userMessage.userMessage = error.response.data?.message || "Datos inválidos. Verifica los campos."
    }
    // Errores de permisos
    else if (error.response?.status === 403) {
      userMessage.userMessage = "No tienes permiso para realizar esta acción."
    }
    // Errores de servidor
    else if (error.response?.status === 500) {
      userMessage.userMessage = "Error del servidor. Intenta más tarde."
    }
    // Errores de timeout
    else if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      userMessage.userMessage = "Tiempo de espera agotado. Verifica tu conexión e intenta nuevamente."
    }
    // Errores de conexión
    else if (error.message === "Network Error") {
      userMessage.userMessage = "Error de conexión. Verifica que el servidor esté ejecutándose."
    }

    return Promise.reject({ ...error, ...userMessage })
  },
)

export const authService = {
  login: (email, contrasena) => api.post("/auth/login", { email, contrasena }),
  registroPostulante: (data) =>
    api.post("/auth/registro/postulante", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  registroEmpresa: (data) => api.post("/auth/registro/empresa", data),
  registroAdministrador: (data) => api.post("/auth/registro/administrador", data),
}

export const usuarioService = {
  obtenerPerfil: () => api.get("/usuarios/perfil"),
  actualizarPerfil: (data) => api.put("/usuarios/perfil", data),
  desactivarCuenta: () => api.delete("/usuarios/cuenta"),
  descargarCv: () => api.get("/usuarios/cv", { responseType: "blob" }),
  obtenerPerfilPostulante: (id) => api.get(`/usuarios/postulantes/${id}`),
}

export const ofertaService = {
  crear: (data) => api.post("/ofertas", data),
  actualizar: (id, data) => api.put(`/ofertas/${id}`, data),
  eliminar: (id) => api.delete(`/ofertas/${id}`),
  buscarPublicas: (params) => api.get("/ofertas/public", { params }),
  obtenerPorId: (id) => api.get(`/ofertas/public/${id}`),
  obtenerMisOfertas: (params) => api.get("/ofertas/mis-ofertas", { params }),
}

export const postulacionService = {
  postular: (ofertaId) => api.post("/postulaciones", { ofertaId }),
  obtenerMisPostulaciones: () => api.get("/postulaciones/mis-postulaciones"),
  obtenerPorOferta: (ofertaId, params) => api.get(`/postulaciones/oferta/${ofertaId}`, { params }),
  cambiarEstado: (id, estado) => api.put(`/postulaciones/${id}/estado`, { estado }),
  obtenerMetrics: (ofertaId) => api.get(`/postulaciones/oferta/${ofertaId}/metrics`),
  descargarCvPostulacion: (id) => api.get(`/postulaciones/${id}/cv`, { responseType: "blob" }),
}

export const notificacionService = {
  obtenerTodas: () => api.get("/notificaciones"),
  obtenerNoLeidas: () => api.get("/notificaciones/no-leidas"),
  contarNoLeidas: () => api.get("/notificaciones/contador"),
  marcarLeida: (id) => api.put(`/notificaciones/${id}/marcar-leida`),
}

export const adminService = {
  crearUsuario: (data) => api.post("/admin/usuarios", data),
  modificarUsuario: (id, data) => api.put(`/admin/usuarios/${id}`, data),
  desactivarUsuario: (id) => api.delete(`/admin/usuarios/${id}`),
  activarUsuario: (id) => api.put(`/admin/usuarios/${id}/activar`),
  eliminarUsuario: (id) => api.delete(`/admin/usuarios/${id}/eliminar`),
  listarUsuarios: (rol) => api.get("/admin/usuarios", { params: { rol } }),
  cambiarRol: (id, rol) => api.put(`/admin/usuarios/${id}/rol`, rol),
  reporteUsuarios: () => api.get("/admin/reportes/usuarios"),
  reporteOfertas: () => api.get("/admin/reportes/ofertas"),
  reportePostulaciones: () => api.get("/admin/reportes/postulaciones"),
  reporteGeneral: () => api.get("/admin/reportes/general"),
  exportUsuariosPdf: () => api.get("/admin/reportes/usuarios/pdf", { responseType: "blob" }),
  exportOfertasPdf: () => api.get("/admin/reportes/ofertas/pdf", { responseType: "blob" }),
  exportPostulacionesPdf: () => api.get("/admin/reportes/postulaciones/pdf", { responseType: "blob" }),
  exportGeneralPdf: () => api.get("/admin/reportes/general/pdf", { responseType: "blob" }),
  eliminarOfertaPorAdmin: (id) => api.delete(`/admin/ofertas/${id}`),
}

export default api
