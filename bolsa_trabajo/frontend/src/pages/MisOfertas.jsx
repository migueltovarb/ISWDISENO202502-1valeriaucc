"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Pagination,
} from "@mui/material"
import { Add, Edit, Delete, MoreVert, TrendingUp } from "@mui/icons-material"
import { ofertaService, postulacionService, usuarioService } from "../services/api"

export default function MisOfertas() {
  const navigate = useNavigate()
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingOferta, setEditingOferta] = useState(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    requisitos: "",
    ubicacion: "",
    modalidad: "PRESENCIAL",
    rangoSalarial: "",
    borrador: false,
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOferta, setSelectedOferta] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [openPostulaciones, setOpenPostulaciones] = useState(false)
  const [postulaciones, setPostulaciones] = useState([])
  const [openPerfil, setOpenPerfil] = useState(false)
  const [perfilPostulante, setPerfilPostulante] = useState(null)
  const [postPag, setPostPag] = useState({ page: 0, size: 8, totalPages: 0 })
  const [estadoFiltro, setEstadoFiltro] = useState("")
  const [metrics, setMetrics] = useState({ total: 0, pendientes: 0, aceptadas: 0, rechazadas: 0 })
  const getEstadoColor = (estado) => {
    const colors = {
      PENDIENTE: { bg: "#FFF3E0", text: "#E65100" },
      ACEPTADA: { bg: "#E8F5E9", text: "#2E7D32" },
      RECHAZADA: { bg: "#FFEBEE", text: "#C62828" },
    }
    return colors[estado] || { bg: "#F5F5F5", text: "#616161" }
  }
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    cargarOfertas()
  }, [])

  const cargarOfertas = async () => {
    try {
      const response = await ofertaService.obtenerMisOfertas({ page: 0, size: 100 })
      setOfertas(response.data.content || [])
    } catch (error) {
      console.error("Error al cargar ofertas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (oferta = null) => {
    if (oferta) {
      setEditingOferta(oferta)
      setFormData({
        titulo: oferta.titulo,
        descripcion: oferta.descripcion,
        requisitos: oferta.requisitos?.join("\n") || "",
        ubicacion: oferta.ubicacion,
        modalidad: oferta.modalidad,
        rangoSalarial: oferta.rangoSalarial || "",
        borrador: oferta.borrador,
      })
    } else {
      setEditingOferta(null)
      setFormData({
        titulo: "",
        descripcion: "",
        requisitos: "",
        ubicacion: "",
        modalidad: "PRESENCIAL",
        rangoSalarial: "",
        borrador: false,
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingOferta(null)
  }

  const handleSubmit = async (publicar = false) => {
    try {
      const data = {
        ...formData,
        requisitos: formData.requisitos.split("\n").filter((r) => r.trim()),
        borrador: !publicar,
      }

      if (publicar) {
        if (!data.titulo || !data.descripcion || !data.ubicacion || !data.modalidad || !data.rangoSalarial) {
          alert("Completa todos los campos obligatorios para publicar")
          return
        }
      }

      if (editingOferta) {
        await ofertaService.actualizar(editingOferta.id, data)
        setSuccessMessage(publicar ? "Oferta publicada exitosamente" : "Borrador guardado")
      } else {
        await ofertaService.crear(data)
        setSuccessMessage(publicar ? "Oferta publicada exitosamente" : "Borrador guardado")
      }
      handleCloseDialog()
      setTimeout(() => setSuccessMessage(""), 3000)
      cargarOfertas()
    } catch (error) {
      console.error("Error al guardar oferta:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta oferta?")) {
      try {
        await ofertaService.eliminar(id)
        setSuccessMessage("Oferta eliminada exitosamente")
        setTimeout(() => setSuccessMessage(""), 3000)
        cargarOfertas()
      } catch (error) {
        console.error("Error al eliminar oferta:", error)
      }
    }
    setAnchorEl(null)
  }

  const handleMenuOpen = (event, oferta) => {
    setAnchorEl(event.currentTarget)
    setSelectedOferta(oferta)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedOferta(null)
  }

  const verPostulaciones = async (oferta) => {
    try {
      setSelectedOferta(oferta)
      setEstadoFiltro("")
      const resp = await postulacionService.obtenerPorOferta(oferta.id, { page: 0, size: postPag.size })
      setPostulaciones(resp.data.content || [])
      setPostPag({ ...postPag, page: 0, totalPages: resp.data.totalPages || 0 })
      const m = await postulacionService.obtenerMetrics(oferta.id)
      setMetrics(m.data || { total: 0, pendientes: 0, aceptadas: 0, rechazadas: 0 })
      setOpenPostulaciones(true)
    } catch (e) {
      console.error("Error al cargar postulaciones", e)
    }
  }

  const descargarCv = async (id, nombre) => {
    try {
      const resp = await postulacionService.descargarCvPostulacion(id)
      const blob = new Blob([resp.data], { type: resp.headers["content-type"] || "application/octet-stream" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = nombre || "cv"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error("Error al descargar CV", e)
    }
  }

  const verPerfilPostulante = async (postulanteId) => {
    try {
      const resp = await usuarioService.obtenerPerfilPostulante(postulanteId)
      setPerfilPostulante(resp.data)
      setOpenPerfil(true)
    } catch (e) {
      console.error("Error al cargar perfil del postulante", e)
    }
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUp sx={{ color: "#FF6B35" }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Mis Ofertas
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              bgcolor: "#FF6B35",
              "&:hover": { bgcolor: "#E85A26" },
            }}
          >
            Crear Oferta
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1F6FEB" }}>
                  {ofertas.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Activas
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#2E7D32" }}>
                  {ofertas.filter((o) => o.activa && !o.borrador).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Borradores
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100" }}>
                  {ofertas.filter((o) => o.borrador).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Postulaciones
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565C0" }}>
                  {ofertas.reduce((acc, o) => acc + (o.numPostulaciones || 0), 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {successMessage && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: "#E8F5E9", borderRadius: 2, border: "1px solid #C8E6C9" }}>
            <Typography color="#2E7D32" sx={{ fontWeight: 600 }}>
              ✓ {successMessage}
            </Typography>
          </Paper>
        )}

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ height: 24, bgcolor: "action.hover", mb: 1, borderRadius: 1 }} />
                    <Box sx={{ height: 16, width: "60%", bgcolor: "action.hover", mb: 2, borderRadius: 1 }} />
                    <Box sx={{ height: 20, bgcolor: "action.hover", mb: 1, borderRadius: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : ofertas.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, border: "1px solid #E8F1FF" }}>
            <Typography color="text.secondary">No tienes ofertas creadas</Typography>
            <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mt: 2, borderRadius: 1.5 }}>
              Crear primera oferta
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {ofertas.map((oferta) => (
              <Grid item xs={12} md={6} key={oferta.id}>
                <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                        {oferta.titulo}
                      </Typography>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, oferta)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {oferta.descripcion.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                      <Chip label={oferta.modalidad} size="small" variant="outlined" />
                      {oferta.borrador && (
                        <Chip label="Borrador" size="small" sx={{ bgcolor: "#FFF3E0", color: "#E65100" }} />
                      )}
                      {oferta.activa && !oferta.borrador && (
                        <Chip label="Activa" size="small" sx={{ bgcolor: "#E8F5E9", color: "#2E7D32" }} />
                      )}
                    </Box>
                  <Typography variant="body2" color="text.secondary">
                    {oferta.numPostulaciones || 0} postulaciones
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/ofertas/${oferta.id}`)}
                    sx={{ color: "#1F6FEB", fontWeight: 600 }}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    size="small"
                    onClick={() => verPostulaciones(oferta)}
                    sx={{ color: "#1565C0", fontWeight: 600 }}
                  >
                    Ver postulaciones
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleOpenDialog(selectedOferta)
              handleMenuClose()
            }}
          >
            <Edit sx={{ mr: 1, fontSize: 20 }} /> Editar
          </MenuItem>
          <MenuItem onClick={() => handleDelete(selectedOferta?.id)}>
            <Delete sx={{ mr: 1, fontSize: 20 }} /> Eliminar
          </MenuItem>
        </Menu>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingOferta ? "Editar Oferta" : "Crear Nueva Oferta"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  required
                  multiline
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requisitos (uno por línea)"
                  multiline
                  rows={4}
                  value={formData.requisitos}
                  onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
                  helperText="Escribe cada requisito en una línea separada"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  required
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Modalidad"
                  required
                  SelectProps={{ native: true }}
                  value={formData.modalidad}
                  onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                >
                  <option value="REMOTO">Remoto</option>
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="HIBRIDO">Híbrido</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rango Salarial"
                  value={formData.rangoSalarial}
                  onChange={(e) => setFormData({ ...formData, rangoSalarial: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={() => handleSubmit(false)} variant="outlined" sx={{ mr: 1 }}>
            Guardar borrador
          </Button>
          <Button onClick={() => handleSubmit(true)} variant="contained" sx={{ bgcolor: "#1F6FEB" }}>
            {editingOferta ? "Publicar" : "Publicar"}
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={openPostulaciones} onClose={() => setOpenPostulaciones(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Postulaciones</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#1F6FEB" }}>
                      {metrics.total}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Pendientes
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#E65100" }}>
                      {metrics.pendientes}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Aceptadas
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#2E7D32" }}>
                      {metrics.aceptadas}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Rechazadas
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#C62828" }}>
                      {metrics.rechazadas}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Estado"
                  SelectProps={{ native: true }}
                  value={estadoFiltro}
                  onChange={async (e) => {
                    const value = e.target.value
                    setEstadoFiltro(value)
                    const params = { page: 0, size: postPag.size }
                    if (value) params.estado = value
                    const resp = await postulacionService.obtenerPorOferta(selectedOferta.id, params)
                    setPostulaciones(resp.data.content || [])
                    setPostPag({ ...postPag, page: 0, totalPages: resp.data.totalPages || 0 })
                  }}
                >
                  <option value="">Todos</option>
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="ACEPTADA">Aceptada</option>
                  <option value="RECHAZADA">Rechazada</option>
                </TextField>
              </Grid>
            </Grid>

            {postulaciones.length === 0 ? (
              <Typography color="text.secondary">No hay postulaciones</Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {postulaciones.map((p) => (
                  <Grid item xs={12} key={p.id}>
                    <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{p.postulanteNombre}</Typography>
                          <Typography variant="caption" color="text.secondary">{formatFecha(p.fechaHoraPostulacion)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip
                            label={p.estado}
                            size="small"
                            sx={{ bgcolor: getEstadoColor(p.estado).bg, color: getEstadoColor(p.estado).text, fontWeight: 600 }}
                          />
                          <select
                            value={p.estado}
                          onChange={async (e) => {
                            try {
                              await postulacionService.cambiarEstado(p.id, e.target.value)
                              const params = { page: postPag.page, size: postPag.size }
                              if (estadoFiltro) params.estado = estadoFiltro
                              const resp = await postulacionService.obtenerPorOferta(selectedOferta.id, params)
                              setPostulaciones(resp.data.content || [])
                              setPostPag({ ...postPag, totalPages: resp.data.totalPages || 0 })
                              const m = await postulacionService.obtenerMetrics(selectedOferta.id)
                              setMetrics(m.data || { total: 0, pendientes: 0, aceptadas: 0, rechazadas: 0 })
                            } catch (err) {
                              console.error("Error al cambiar estado", err)
                            }
                          }}
                            style={{ padding: 6, borderRadius: 6, border: "1px solid #E0E0E0" }}
                          >
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="ACEPTADA">Aceptada</option>
                            <option value="RECHAZADA">Rechazada</option>
                          </select>
                          <Button variant="outlined" onClick={() => descargarCv(p.id, `${p.postulanteNombre}-cv`)}>
                            Descargar CV
                          </Button>
                          <Button variant="contained" onClick={() => verPerfilPostulante(p.postulanteId)}>
                            Ver perfil
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                {postPag.totalPages > 1 && (
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                      <Pagination
                        count={postPag.totalPages}
                        page={postPag.page + 1}
                        onChange={async (e, page) => {
                          const params = { page: page - 1, size: postPag.size }
                          if (estadoFiltro) params.estado = estadoFiltro
                          const resp = await postulacionService.obtenerPorOferta(selectedOferta.id, params)
                          setPostulaciones(resp.data.content || [])
                          setPostPag({ ...postPag, page: page - 1, totalPages: resp.data.totalPages || 0 })
                        }}
                        color="primary"
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPostulaciones(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openPerfil} onClose={() => setOpenPerfil(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Perfil del postulante</DialogTitle>
          <DialogContent>
            {perfilPostulante ? (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  {perfilPostulante.fotoUrl && (
                    <img src={perfilPostulante.fotoUrl} alt="Foto" width={56} height={56} style={{ borderRadius: 12, objectFit: "cover" }} />
                  )}
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{perfilPostulante.nombre} {perfilPostulante.apellido}</Typography>
                    <Typography variant="body2" color="text.secondary">{perfilPostulante.email}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">{perfilPostulante.email}</Typography>
                {perfilPostulante.telefono && (
                  <Typography variant="body2">Teléfono: {perfilPostulante.telefono}</Typography>
                )}
                {perfilPostulante.direccion && (
                  <Typography variant="body2">Dirección: {perfilPostulante.direccion}</Typography>
                )}
              </Box>
            ) : (
              <Typography color="text.secondary">Cargando perfil...</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPerfil(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
