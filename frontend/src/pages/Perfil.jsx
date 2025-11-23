"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material"
import { CheckCircle, Notifications } from "@mui/icons-material"
import { Chip } from "@mui/material"
import { usuarioService, notificacionService } from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function Perfil() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fotoUrl: "",
    direccion: "",
    telefono: "",
    cvNombre: "",
  })
  const [notificaciones, setNotificaciones] = useState([])
  const [imageEditorOpen, setImageEditorOpen] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [scale, setScale] = useState(1)
  const [tabValue, setTabValue] = useState(0)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [deactivateOpen, setDeactivateOpen] = useState(false)

  useEffect(() => {
    cargarPerfil()
    if (tabValue === 1) {
      cargarNotificaciones()
    }
  }, [tabValue])

  const cargarPerfil = async () => {
    try {
      const response = await usuarioService.obtenerPerfil()
      const data = response.data
      setFormData({
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        email: data.email || "",
        fotoUrl: data.fotoUrl || "",
        direccion: data.direccion || "",
        telefono: data.telefono || "",
        descripcion: data.descripcion || "",
        ubicacion: data.ubicacion || "",
        cvNombre: data.cvNombre || "",
        sector: data.sector || "",
        telefonoContacto: data.telefonoContacto || "",
      })
      setOffsetX(data.fotoOffsetX || 0)
      setOffsetY(data.fotoOffsetY || 0)
      setScale(data.fotoScale || 1)
    } catch (error) {
      console.error("Error al cargar perfil:", error)
    }
  }

  const cargarNotificaciones = async () => {
    try {
      const response = await notificacionService.obtenerTodas()
      setNotificaciones(response.data)
    } catch (error) {
      console.error("Error al cargar notificaciones:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await usuarioService.actualizarPerfil({
        ...formData,
        fotoOffsetX: offsetX,
        fotoOffsetY: offsetY,
        fotoScale: scale,
      })
      setSuccess("Perfil actualizado exitosamente")
      setTimeout(() => setSuccess(""), 3000)
      window.dispatchEvent(new Event("perfilUpdated"))
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al actualizar perfil")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleMarcarLeida = async (id) => {
    try {
      await notificacionService.marcarLeida(id)
      cargarNotificaciones()
    } catch (error) {
      console.error("Error al marcar notificación:", error)
    }
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, position: "relative" }}>
          <Box
            onClick={() => setImageEditorOpen(true)}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              mr: 3,
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "#E8F1FF",
              backgroundImage: `url(${formData.fotoUrl || ""})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${scale * 100}%`,
              backgroundPosition: `${offsetX}% ${offsetY}%`,
              border: "3px solid #1F6FEB",
              position: "relative",
              "&:hover::after": {
                content: '"✎"',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                fontSize: 24,
              },
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {formData.nombre} {formData.apellido}
            </Typography>
            <Chip
              label={user?.rol}
              size="small"
              sx={{ mt: 0.5, bgcolor: "#E8F1FF", color: "#1F6FEB", fontWeight: 600 }}
            />
          </Box>
        </Box>

        <Paper sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: "1px solid #E8F1FF",
              "& .MuiTab-root": { fontWeight: 600, textTransform: "none" },
              "& .Mui-selected": { color: "#1F6FEB" },
              "& .MuiTabs-indicator": { bgcolor: "#1F6FEB" },
            }}
          >
            <Tab label="Información Personal" />
            <Tab label="Notificaciones" icon={<Notifications sx={{ mr: 1 }} />} />
          </Tabs>

          {tabValue === 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
              {success && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 1.5 }}>
                  {success}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Foto URL"
                  value={formData.fotoUrl}
                  onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                  helperText="Pega aquí la URL de tu foto de perfil"
                />
              </Grid>
              {user?.rol === "POSTULANTE" && (
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={async () => {
                        try {
                          const resp = await usuarioService.descargarCv()
                          const blob = new Blob([resp.data], { type: resp.headers["content-type"] || "application/octet-stream" })
                          const url = window.URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = formData.cvNombre || "cv"
                          a.click()
                          window.URL.revokeObjectURL(url)
                        } catch (e) {}
                      }}
                    >
                      Descargar CV
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      {formData.cvNombre}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {user?.rol === "EMPRESA" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sector"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Teléfono de contacto"
                      value={formData.telefonoContacto}
                      onChange={(e) => setFormData({ ...formData, telefonoContacto: e.target.value })}
                    />
                  </Grid>
                </>
              )}
                {user?.rol === "POSTULANTE" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Dirección"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, borderRadius: 1.5, fontWeight: 600, bgcolor: "#1F6FEB" }}
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 3, ml: 2, borderRadius: 1.5, fontWeight: 600 }}
                onClick={() => setDeactivateOpen(true)}
              >
                Desactivar cuenta
              </Button>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              {notificaciones.length === 0 ? (
                <Typography color="text.secondary">No tienes notificaciones</Typography>
              ) : (
                <List>
                  {notificaciones.map((notif) => (
                    <ListItem
                      key={notif.id}
                      sx={{
                        bgcolor: notif.leida ? "background.paper" : "#E8F1FF",
                        mb: 1,
                        borderRadius: 1.5,
                        border: "1px solid #E8F1FF",
                      }}
                      secondaryAction={
                        !notif.leida && (
                          <IconButton onClick={() => handleMarcarLeida(notif.id)}>
                            <CheckCircle sx={{ color: "#2E7D32" }} />
                          </IconButton>
                        )
                      }
                    >
                      <ListItemText
                        primary={notif.titulo}
                        secondary={
                          <>
                            <Typography variant="body2">{notif.mensaje}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(notif.fecha).toLocaleString("es-ES")}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}
        </Paper>

        <Dialog open={imageEditorOpen} onClose={() => setImageEditorOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Editar imagen de perfil</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 2 }}>
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#E8F1FF",
                  backgroundImage: `url(${formData.fotoUrl || ""})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${scale * 100}%`,
                  backgroundPosition: `${offsetX}% ${offsetY}%`,
                  border: "3px solid #1F6FEB",
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Zoom
            </Typography>
            <Slider min={1} max={3} step={0.01} value={scale} onChange={(_, v) => setScale(v)} sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Posición X
            </Typography>
            <Slider min={-100} max={100} step={1} value={offsetX} onChange={(_, v) => setOffsetX(v)} sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Posición Y
            </Typography>
            <Slider min={-100} max={100} step={1} value={offsetY} onChange={(_, v) => setOffsetY(v)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setImageEditorOpen(false)}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  await usuarioService.actualizarPerfil({
                    ...formData,
                    fotoOffsetX: offsetX,
                    fotoOffsetY: offsetY,
                    fotoScale: scale,
                  })
                  setImageEditorOpen(false)
                  setSuccess("Foto actualizada exitosamente")
                  setTimeout(() => setSuccess(""), 3000)
                  window.dispatchEvent(new Event("perfilUpdated"))
                } catch (e) {
                  setError("Error al actualizar imagen")
                  setTimeout(() => setError(""), 3000)
                }
              }}
              sx={{ bgcolor: "#1F6FEB" }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deactivateOpen} onClose={() => setDeactivateOpen(false)}>
          <DialogTitle sx={{ fontWeight: 700 }}>Confirmar desactivación</DialogTitle>
          <DialogContent>
            <Typography>
              Esta acción desactivará tu cuenta. Podrás reactivarla contactando al soporte. ¿Deseas continuar?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeactivateOpen(false)}>Cancelar</Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                try {
                  await usuarioService.desactivarCuenta()
                  logout()
                  navigate("/login")
                } catch (e) {
                  setError("Error al desactivar la cuenta")
                  setTimeout(() => setError(""), 3000)
                }
              }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
