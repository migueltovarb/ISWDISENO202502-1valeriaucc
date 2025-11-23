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
  CardMedia,
  Card,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import { Person, Email, Lock, Phone, LocationOn, Image } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

export default function RegisterPostulante() {
  const navigate = useNavigate()
  const { registerPostulante } = useAuth()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    fotoUrl: "",
    direccion: "",
    telefono: "",
  })
  const [cvFile, setCvFile] = useState(null)
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if (!cvFile) {
      setError("Adjunta tu CV en formato PDF o DOCX")
      setLoading(false)
      return
    }
    if (!allowedTypes.includes(cvFile.type)) {
      setError("Formato de archivo no permitido. Solo PDF o DOCX")
      setLoading(false)
      return
    }
    const fd = new FormData()
    fd.append(
      "data",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    )
    fd.append("cv", cvFile)

    const result = await registerPostulante(fd)
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

  const handleCvChange = (e) => {
    const file = e.target.files?.[0] || null
    if (!file) {
      setCvFile(null)
      return
    }
    if (!allowedTypes.includes(file.type)) {
      setError("Formato de archivo no permitido. Solo PDF o DOCX")
      e.target.value = ""
      setCvFile(null)
      return
    }
    setError("")
    setCvFile(file)
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
            Únete como Postulante
          </Typography>
          <Typography color="text.secondary">
            Completa tu perfil y comienza a buscar las mejores oportunidades laborales
          </Typography>
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
            <Grid container spacing={2.5}>
              {formData.fotoUrl && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Card
                    sx={{
                      width: 120,
                      height: 120,
                      boxShadow: "0 4px 12px rgba(31, 111, 235, 0.15)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia component="img" height="120" image={formData.fotoUrl} alt="preview" />
                  </Card>
                </Grid>
              )}

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
                        <Person sx={{ color: "#1F6FEB", fontSize: 20 }} />
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
                        <Person sx={{ color: "#1F6FEB", fontSize: 20 }} />
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

              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                >
                  Adjuntar CV (PDF/DOCX)
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                    hidden
                    required
                    onChange={handleCvChange}
                  />
                </Button>
                {cvFile && (
                  <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                    {cvFile.name}
                  </Typography>
                )}
                {!cvFile && (
                  <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                    Formato digital requerido: PDF o DOCX
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Foto de perfil (URL)"
                  name="fotoUrl"
                  value={formData.fotoUrl}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/foto.jpg"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image sx={{ color: "#FF6B35", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Pega aquí la URL de tu foto de perfil"
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
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: "#1F6FEB", fontSize: 20 }} />
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
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#1F6FEB", fontSize: 20 }} />
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
                background: loading ? "#CCCCCC" : "linear-gradient(135deg, #1F6FEB 0%, #FF6B35 100%)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(31, 111, 235, 0.3)",
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "white" }} />
                  Registrando...
                </Box>
              ) : (
                "Registrarse"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography color="text.secondary" variant="body2">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#1F6FEB",
                    fontWeight: 600,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
                  onMouseLeave={(e) => (e.target.style.color = "#1F6FEB")}
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
