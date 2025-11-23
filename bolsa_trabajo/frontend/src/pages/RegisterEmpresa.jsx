"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import { Business, Email, Lock, Description, LocationOn, PhoneIphone } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

export default function RegisterEmpresa() {
  const navigate = useNavigate()
  const { registerEmpresa } = useAuth()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    nombreEmpresa: "",
    nit: "",
    descripcion: "",
    ubicacion: "",
    sector: "",
    telefonoContacto: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await registerEmpresa(formData)
    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } else {
      setError(result.error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Business
              sx={{
                fontSize: 48,
                background: "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
          </Box>
          <Typography
            component="h1"
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
            Registra tu Empresa
          </Typography>
          <Typography color="text.secondary">Publica ofertas laborales y encuentra los mejores talentos</Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            background: "linear-gradient(135deg, #F7F9FC 0%, #E8F1FF 100%)",
            border: "1px solid rgba(31, 111, 235, 0.1)",
            borderRadius: 2,
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: 1.5,
                backgroundColor: "#FEE2E2",
                color: "#991B1B",
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: 1.5,
                backgroundColor: "#DBEAFE",
                color: "#1E40AF",
              }}
            >
              Registro exitoso. Redirigiendo al login...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#1F6FEB" }}>
              Información personal del contacto
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#1F6FEB", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#1F6FEB" },
                      "&.Mui-focused fieldset": { borderColor: "#1F6FEB" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#1F6FEB", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#1F6FEB" },
                      "&.Mui-focused fieldset": { borderColor: "#1F6FEB" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#1F6FEB", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#1F6FEB" },
                      "&.Mui-focused fieldset": { borderColor: "#1F6FEB" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Contraseña"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#1F6FEB", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#1F6FEB" },
                      "&.Mui-focused fieldset": { borderColor: "#1F6FEB" },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 3, color: "#FF6B35" }}>
              Información de la empresa
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nombre de la Empresa"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="NIT"
                  name="nit"
                  value={formData.nit}
                  onChange={handleInputChange}
                  placeholder="Ej: 123456789"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Ubicación"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Teléfono de contacto"
                  name="telefonoContacto"
                  value={formData.telefonoContacto}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  multiline
                  rows={3}
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tu empresa..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: "white",
                      "&:hover fieldset": { borderColor: "#FF6B35" },
                      "&.Mui-focused fieldset": { borderColor: "#FF6B35" },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 1.5,
                background: loading ? "#CCCCCC" : "linear-gradient(135deg, #FF6B35 0%, #1F6FEB 100%)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(255, 107, 53, 0.3)",
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "white" }} />
                  Registrando...
                </Box>
              ) : (
                "Registrar Empresa"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography color="text.secondary" variant="body2">
                ¿Ya tienes cuenta? {""}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#FF6B35",
                    fontWeight: 600,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#1F6FEB")}
                  onMouseLeave={(e) => (e.target.style.color = "#FF6B35")}
                >
                  Inicia sesión aquí
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
