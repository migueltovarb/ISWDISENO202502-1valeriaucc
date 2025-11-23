"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Snackbar,
  Alert as MuiAlert,
  CircularProgress,
} from "@mui/material"
import { TrendingUp, People, Work, Assignment, Download, Edit, Delete } from "@mui/icons-material"
import { ofertaService, adminService } from "../services/api"

export default function AdminPanel() {
  const [tabValue, setTabValue] = useState(0)
  const [usuarios, setUsuarios] = useState([])
  const [reportes, setReportes] = useState({})
  const [ofertas, setOfertas] = useState([])
  const [loadingOfertas, setLoadingOfertas] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState("create")
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUserRole, setNewUserRole] = useState("POSTULANTE")
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nombreEmpresa: "",
    nit: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (tabValue === 0) cargarUsuarios()
    if (tabValue === 1) cargarEmpresas()
    if (tabValue === 2) cargarAdministradores()
    if (tabValue === 3) cargarReporteGeneral()
    if (tabValue === 4) cargarOfertasModeracion()
  }, [tabValue])

  const cargarUsuarios = async () => {
    setLoadingData(true)
    try {
      const response = await adminService.listarUsuarios()
      setUsuarios((response.data || []).filter((u) => u.activo))
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
      setSuccessMessage(error.userMessage || "Error al cargar usuarios")
    } finally {
      setLoadingData(false)
    }
  }

  const cargarEmpresas = async () => {
    setLoadingData(true)
    try {
      const response = await adminService.listarUsuarios("EMPRESA")
      setUsuarios((response.data || []).filter((u) => u.activo))
    } catch (error) {
      console.error("Error al cargar empresas:", error)
      setSuccessMessage(error.userMessage || "Error al cargar empresas")
    } finally {
      setLoadingData(false)
    }
  }

  const cargarAdministradores = async () => {
    setLoadingData(true)
    try {
      const response = await adminService.listarUsuarios("ADMINISTRADOR")
      setUsuarios((response.data || []).filter((u) => u.activo))
    } catch (error) {
      console.error("Error al cargar administradores:", error)
      setSuccessMessage(error.userMessage || "Error al cargar administradores")
    } finally {
      setLoadingData(false)
    }
  }

  const cargarReporteGeneral = async () => {
    setLoadingData(true)
    try {
      const response = await adminService.reporteGeneral()
      setReportes(response.data)
    } catch (error) {
      console.error("Error al cargar reporte:", error)
      setSuccessMessage("Error al cargar reporte")
    } finally {
      setLoadingData(false)
    }
  }

  const abrirCrear = () => {
    setDialogMode("create")
    setSelectedUser(null)
    setFormData({ nombre: "", apellido: "", email: "", nombreEmpresa: "", nit: "" })
    setNewUserRole("POSTULANTE")
    setDialogOpen(true)
  }

  const abrirEditar = (user) => {
    setDialogMode("edit")
    setSelectedUser(user)
    setFormData({
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      email: user.email || "",
    })
    setDialogOpen(true)
  }

  const guardarUsuario = async () => {
    try {
      if (dialogMode === "create") {
        if (newUserRole === "ADMINISTRADOR") {
          await adminService.crearUsuario({
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            rol: "ADMINISTRADOR",
            activo: true,
          })
        } else if (newUserRole === "POSTULANTE") {
          await adminService.crearUsuario({
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            rol: "POSTULANTE",
            activo: true,
          })
        } else if (newUserRole === "EMPRESA") {
          await adminService.crearUsuario({
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            rol: "EMPRESA",
            activo: true,
          })
        }
      } else {
        await adminService.modificarUsuario(selectedUser.id, {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
        })
        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id
              ? {
                  ...u,
                  nombre: formData.nombre,
                  apellido: formData.apellido,
                  email: formData.email,
                }
              : u,
          ),
        )
      }
      setDialogOpen(false)
      setSuccessMessage("Cambio exitoso")
      setTimeout(() => setSuccessMessage(""), 3000)
      if (tabValue === 0) cargarUsuarios()
      if (tabValue === 1) cargarEmpresas()
      if (tabValue === 2) cargarAdministradores()
    } catch (error) {
      console.error("Error al guardar usuario:", error)
      setSuccessMessage("Error al guardar usuario")
    }
  }

  const desactivarUsuario = async (user) => {
    try {
      await adminService.desactivarUsuario(user.id)
      setUsuarios((prev) => prev.map((u) => (u.id === user.id ? { ...u, activo: false } : u)))
      setSuccessMessage("Usuario desactivado")
      setTimeout(() => setSuccessMessage(""), 3000)
      if (tabValue === 0) cargarUsuarios()
      if (tabValue === 1) cargarEmpresas()
      if (tabValue === 2) cargarAdministradores()
    } catch (error) {
      console.error("Error al desactivar usuario:", error)
      setSuccessMessage("Error al desactivar usuario")
    }
  }

  const activarUsuario = async (user) => {
    try {
      await adminService.activarUsuario(user.id)
      setUsuarios((prev) => prev.map((u) => (u.id === user.id ? { ...u, activo: true } : u)))
      setSuccessMessage("Usuario activado")
      setTimeout(() => setSuccessMessage(""), 3000)
      if (tabValue === 0) cargarUsuarios()
      if (tabValue === 1) cargarEmpresas()
      if (tabValue === 2) cargarAdministradores()
    } catch (error) {
      console.error("Error al activar usuario:", error)
      setSuccessMessage("Error al activar usuario")
    }
  }

  const eliminarUsuario = async (user) => {
    try {
      await adminService.eliminarUsuario(user.id)
      setUsuarios((prev) => prev.filter((u) => u.id !== user.id))
      setSuccessMessage("Usuario eliminado")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      setSuccessMessage("Error al eliminar usuario")
    }
  }

  const cargarOfertasModeracion = async () => {
    setLoadingOfertas(true)
    try {
      const response = await ofertaService.buscarPublicas({ page: 0, size: 50 })
      setOfertas(response.data.content || [])
    } catch (error) {
      console.error("Error al cargar ofertas:", error)
    } finally {
      setLoadingOfertas(false)
    }
  }

  const eliminarOferta = async (id) => {
    try {
      await adminService.eliminarOfertaPorAdmin(id)
      setOfertas((prev) => prev.filter((o) => o.id !== id))
      setSuccessMessage("Oferta eliminada")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error al eliminar oferta:", error)
      setSuccessMessage("Error al eliminar oferta")
    }
  }

  const cambiarRol = async (user, rol) => {
    try {
      await adminService.cambiarRol(user.id, rol)
      setUsuarios((prev) => prev.map((u) => (u.id === user.id ? { ...u, rol } : u)))
      if (tabValue === 0) cargarUsuarios()
      if (tabValue === 1) cargarEmpresas()
      if (tabValue === 2) cargarAdministradores()
    } catch (error) {
      console.error("Error al cambiar rol:", error)
    }
  }

  const descargarPdf = async (tipo) => {
    try {
      let resp
      if (tipo === "usuarios") resp = await adminService.exportUsuariosPdf()
      else if (tipo === "ofertas") resp = await adminService.exportOfertasPdf()
      else if (tipo === "postulaciones") resp = await adminService.exportPostulacionesPdf()
      else resp = await adminService.exportGeneralPdf()
      const url = window.URL.createObjectURL(new Blob([resp.data], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href = url
      link.download = `${tipo}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar PDF:", error)
    }
  }

  const getRoleColor = (rol) => {
    switch (rol) {
      case "ADMINISTRADOR":
        return "#FF6B35"
      case "EMPRESA":
        return "#1F6FEB"
      case "POSTULANTE":
        return "#10B981"
      default:
        return "#6B7280"
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Panel de Administración
        </Typography>
        <Typography color="text.secondary">Gestiona usuarios, empresas y reportes</Typography>
      </Box>

      <Paper
        sx={{
          p: 0,
          mb: 3,
          borderRadius: 2,
          border: "1px solid rgba(31, 111, 235, 0.1)",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              color: "#6B7280",
              "&.Mui-selected": {
                color: "#1F6FEB",
              },
            },
            "& .MuiTabs-indicator": {
              background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
              height: 3,
            },
          }}
        >
          <Tab label="Usuarios" icon={<People sx={{ mr: 1 }} />} iconPosition="start" />
          <Tab label="Empresas" icon={<Work sx={{ mr: 1 }} />} iconPosition="start" />
          <Tab label="Administradores" icon={<Edit sx={{ mr: 1 }} />} iconPosition="start" />
          <Tab label="Reportes" icon={<TrendingUp sx={{ mr: 1 }} />} iconPosition="start" />
          <Tab label="Ofertas" icon={<Assignment sx={{ mr: 1 }} />} iconPosition="start" />
        </Tabs>
      </Paper>

      {tabValue <= 2 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {loadingData ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Estado</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#1F6FEB" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow
                    key={usuario.id}
                    sx={{
                      "&:hover": { backgroundColor: "#F9FAFB" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          src={usuario.fotoUrl}
                          alt={usuario.nombre}
                          sx={{
                            width: 36,
                            height: 36,
                            background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {usuario.nombre} {usuario.apellido}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {usuario.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={usuario.rol}
                        size="small"
                        sx={{
                          backgroundColor: getRoleColor(usuario.rol) + "20",
                          color: getRoleColor(usuario.rol),
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={usuario.activo ? "Activo" : "Inactivo"}
                        size="small"
                        variant="outlined"
                        color={usuario.activo ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Edit />}
                          onClick={() => abrirEditar(usuario)}
                          sx={{
                            color: "#1F6FEB",
                            borderColor: "#1F6FEB",
                            "&:hover": { backgroundColor: "#E8F1FF" },
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color={usuario.activo ? "error" : "success"}
                          onClick={() => (usuario.activo ? desactivarUsuario(usuario) : activarUsuario(usuario))}
                        >
                          {usuario.activo ? "Desactivar" : "Activar"}
                        </Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => eliminarUsuario(usuario)} startIcon={<Delete />}>Eliminar</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}

      {tabValue === 3 && (
        <>
          {loadingData ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(31, 111, 235, 0.1)",
                      boxShadow: "0 4px 12px rgba(31, 111, 235, 0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(31, 111, 235, 0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <People sx={{ fontSize: 40, color: "#1F6FEB", mb: 1 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {reportes.totalUsuarios || 0}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Total Usuarios
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(16, 185, 129, 0.1)",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Work sx={{ fontSize: 40, color: "#10B981", mb: 1 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {reportes.totalOfertasActivas || 0}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Ofertas Activas
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(255, 107, 53, 0.1)",
                      boxShadow: "0 4px 12px rgba(255, 107, 53, 0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(255, 107, 53, 0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Assignment sx={{ fontSize: 40, color: "#FF6B35", mb: 1 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {reportes.totalPostulaciones || 0}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Postulaciones
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(59, 130, 246, 0.1)",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <TrendingUp sx={{ fontSize: 40, color: "#3B82F6", mb: 1 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {reportes.datosDetalle?.totalPostulantes || 0}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Postulantes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(31, 111, 235, 0.1)",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#1F6FEB" }}>
                  Exportar Reportes
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => descargarPdf("usuarios")}
                      sx={{
                        background: "linear-gradient(135deg, #1F6FEB 0%, #3B82F6 100%)",
                        borderRadius: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Usuarios PDF
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => descargarPdf("ofertas")}
                      sx={{
                        background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                        borderRadius: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Ofertas PDF
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => descargarPdf("postulaciones")}
                      sx={{
                        background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
                        borderRadius: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Postulaciones PDF
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => descargarPdf("general")}
                      sx={{
                        background: "linear-gradient(135deg, #9333EA 0%, #C084FC 100%)",
                        borderRadius: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      General PDF
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </>
      )}

      {tabValue === 4 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {loadingOfertas ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Empresa</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1F6FEB" }}>Estado</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#1F6FEB" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ofertas.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.titulo}</TableCell>
                    <TableCell>{o.empresaNombre || o.empresaId}</TableCell>
                    <TableCell>
                      <Chip label={o.activa && !o.borrador ? "Activa" : o.borrador ? "Borrador" : "Inactiva"} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error" onClick={() => eliminarOferta(o.id)} startIcon={<Delete />}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {dialogMode === "create" ? "Crear usuario" : "Editar usuario"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {dialogMode === "create" && (
            <Select fullWidth value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} sx={{ mb: 2 }}>
              <MenuItem value="POSTULANTE">Postulante</MenuItem>
              <MenuItem value="EMPRESA">Empresa</MenuItem>
              <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
            </Select>
          )}
          <TextField
            fullWidth
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={guardarUsuario}
            sx={{
              background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
              borderRadius: 1.5,
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert severity={successMessage.includes("Error") ? "error" : "success"}>{successMessage}</MuiAlert>
      </Snackbar>
    </Container>
  )
}
