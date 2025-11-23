"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material"
import { Work } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const navigate = useNavigate()
  const { registerPostulante, registerEmpresa, registerAdministrador } = useAuth()
  const [role, setRole] = useState("POSTULANTE")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    fotoUrl: "",
    direccion: "",
    telefono: "",
    nombreEmpresa: "",
    nit: "",
    descripcion: "",
    ubicacion: "",
    sector: "",
    telefonoContacto: "",
    codigoAdmin: "",
  })
  const [cvFile, setCvFile] = useState(null)
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      if (role === "POSTULANTE") {
        if (!cvFile) {
          throw new Error("Adjunta tu CV en formato PDF o DOCX")
        }
        if (!allowedTypes.includes(cvFile.type)) {
          throw new Error("Formato de archivo no permitido. Solo PDF o DOCX")
        }

        const fd = new FormData()
        fd.append(
          "data",
          new Blob([
            JSON.stringify({
              nombre: formData.nombre,
              apellido: formData.apellido,
              email: formData.email,
              contrasena: formData.contrasena,
              fotoUrl: formData.fotoUrl,
              direccion: formData.direccion,
              telefono: formData.telefono,
            }),
          ], { type: "application/json" })
        )
        fd.append("cv", cvFile)
        const result = await registerPostulante(fd)
        if (!result.success) throw new Error(result.error)
      } else if (role === "EMPRESA") {
        const result = await registerEmpresa({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          contrasena: formData.contrasena,
          nombreEmpresa: formData.nombreEmpresa,
          nit: formData.nit,
          descripcion: formData.descripcion,
          ubicacion: formData.ubicacion,
          fotoUrl: formData.fotoUrl,
          sector: formData.sector,
          telefonoContacto: formData.telefonoContacto,
        })
        if (!result.success) throw new Error(result.error)
      } else if (role === "ADMINISTRADOR") {
        const result = await registerAdministrador({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          contrasena: formData.contrasena,
          codigoAdmin: formData.codigoAdmin,
          fotoUrl: formData.fotoUrl,
        })
        if (!result.success) throw new Error(result.error)
      }

      setSuccess(true)
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setError(err.message || "Error en el registro")
    } finally {
      setLoading(false)
    }
  }

  const renderFields = () => {
    const common = (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            required
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            required
            value={formData.contrasena}
            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
          />
        </Grid>
      </>
    )

    if (role === "POSTULANTE") {
      return (
        <>
          {common}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Foto de perfil (URL)"
              value={formData.fotoUrl}
              onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button component="label" variant="outlined" sx={{ borderRadius: 1.5 }}>
              Adjuntar CV (PDF/DOCX)
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                hidden
                onChange={(e) => setCvFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
              />
            </Button>
            {cvFile && (
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                {cvFile.name}
              </Typography>
            )}
            {!cvFile && (
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                Formato requerido: PDF o DOCX
              </Typography>
            )}
          </Grid>
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
      )
    }

    if (role === "EMPRESA") {
      return (
        <>
          {common}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Logo de empresa (URL)"
              value={formData.fotoUrl}
              onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de la Empresa"
              required
              value={formData.nombreEmpresa}
              onChange={(e) => setFormData({ ...formData, nombreEmpresa: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="NIT"
              required
              value={formData.nit}
              onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción de la empresa"
              multiline
              rows={3}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ubicación principal"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sector"
              required
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono de contacto"
              required
              value={formData.telefonoContacto}
              onChange={(e) => setFormData({ ...formData, telefonoContacto: e.target.value })}
            />
          </Grid>
        </>
      )
    }

    return (
      <>
        {common}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Foto de perfil (URL)"
            value={formData.fotoUrl}
            onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Código de administrador"
            type="password"
            required
            value={formData.codigoAdmin}
            onChange={(e) => setFormData({ ...formData, codigoAdmin: e.target.value })}
          />
        </Grid>
      </>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        backgroundImage: "linear-gradient(135deg, #E7F1F8 0%, #F5F5F5 100%)",
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E6EB",
            boxShadow: "0 4px 12px rgba(10, 102, 194, 0.08)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0A66C2 0%, #00A500 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 2,
                boxShadow: "0 4px 12px rgba(10, 102, 194, 0.2)",
              }}
            >
              <Work sx={{ color: "#fff", fontSize: "2rem" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1D2125", mb: 0.5 }}>
              Crear cuenta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecciona tu tipo de perfil
            </Typography>
          </Box>

          <Tabs
            value={role}
            onChange={(_, v) => setRole(v)}
            variant="fullWidth"
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                color: "#65676B",
              },
              "& .Mui-selected": { color: "#0A66C2" },
              "& .MuiTabs-indicator": { backgroundColor: "#0A66C2" },
            }}
          >
            <Tab value="POSTULANTE" label="Postulante" />
            <Tab value="EMPRESA" label="Empresa" />
            <Tab value="ADMINISTRADOR" label="Admin" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 1.5 }}>
              ¡Registro exitoso! Redirigiendo...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {renderFields()}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{ borderRadius: 1.5, borderColor: "#E4E6EB", color: "#1D2125" }}
                >
                  Volver
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    borderRadius: 1.5,
                    fontWeight: 600,
                    backgroundColor: "#0A66C2",
                    "&:hover": { backgroundColor: "#004182" },
                    textTransform: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Registrarse"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
