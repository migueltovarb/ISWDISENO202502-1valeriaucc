"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Container, Paper, TextField, Button, Typography, Box, Alert, Divider, CircularProgress } from "@mui/material"
import { Email, Lock, Work } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: "", contrasena: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(formData.email, formData.contrasena)
    setLoading(false)

    if (result.success) {
      navigate("/dashboard")
    } else {
      setError(result.error)
    }
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
          <Box sx={{ textAlign: "center", mb: 4 }}>
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
              JobBoard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inicia sesión en tu cuenta
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
              <Typography variant="body2">{error}</Typography>
              {error.includes("timeout") && (
                <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                  Verifica tu conexión a internet y que el servidor esté ejecutándose
                </Typography>
              )}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1.5, color: "#0A66C2", fontSize: "1.2rem" }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  "&:hover fieldset": { borderColor: "#0A66C2" },
                  "&.Mui-focused fieldset": { borderColor: "#0A66C2" },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              name="contrasena"
              autoComplete="current-password"
              value={formData.contrasena}
              onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1.5, color: "#0A66C2", fontSize: "1.2rem" }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  "&:hover fieldset": { borderColor: "#0A66C2" },
                  "&.Mui-focused fieldset": { borderColor: "#0A66C2" },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 1.5,
                backgroundColor: "#0A66C2",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#004182" },
                textTransform: "none",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Iniciar Sesión"}
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }}>o</Divider>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 1.5,
                borderColor: "#0A66C2",
                color: "#0A66C2",
                fontWeight: 600,
                py: 1.2,
                "&:hover": { backgroundColor: "rgba(10, 102, 194, 0.04)", borderColor: "#0A66C2" },
                textTransform: "none",
                fontSize: "0.95rem",
              }}
            >
              Crear una cuenta
            </Button>
          </Link>

          <Typography
            variant="caption"
            display="block"
            sx={{
              textAlign: "center",
              mt: 3,
              color: "#65676B",
            }}
          >
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              style={{
                color: "#0A66C2",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Regístrate
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
