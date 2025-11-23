"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Grid, Paper, Typography, Card, CardContent, Button, Box } from "@mui/material"
import { Work, Person, Business, TrendingUp, Notifications, ArrowForward } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"
import { ofertaService, postulacionService, notificacionService } from "../services/api"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    ofertas: 0,
    postulaciones: 0,
    notificaciones: 0,
  })

  useEffect(() => {
    loadStats()
  }, [user])

  const loadStats = async () => {
    try {
      if (user?.rol === "POSTULANTE") {
        const response = await postulacionService.obtenerMisPostulaciones()
        const notif = await notificacionService.contarNoLeidas()
        setStats({ postulaciones: response.data.length, notificaciones: notif.data || 0 })
      } else if (user?.rol === "EMPRESA") {
        const response = await ofertaService.obtenerMisOfertas({ page: 0, size: 100 })
        const notif = await notificacionService.contarNoLeidas()
        setStats({ ofertas: response.data.totalElements || 0, notificaciones: notif.data || 0 })
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error)
    }
  }

  const getWelcomeMessage = () => {
    if (user?.rol === "POSTULANTE") {
      return `¡Bienvenido ${user.nombre}! Explora nuevas oportunidades laborales.`
    } else if (user?.rol === "EMPRESA") {
      return `¡Bienvenida ${user.nombreEmpresa || user.nombre}! Gestiona tus ofertas.`
    } else if (user?.rol === "ADMINISTRADOR") {
      return `¡Bienvenido Administrador ${user.nombre}!`
    }
    return "Bienvenido"
  }

  const getQuickActions = () => {
    if (user?.rol === "POSTULANTE") {
      return [
        { label: "Explorar Ofertas", path: "/ofertas", icon: <Work /> },
        { label: "Mis Postulaciones", path: "/mis-postulaciones", icon: <Person /> },
      ]
    } else if (user?.rol === "EMPRESA") {
      return [
        { label: "Mis Ofertas", path: "/mis-ofertas", icon: <Business /> },
        { label: "Crear Oferta", path: "/mis-ofertas", icon: <Work /> },
      ]
    } else if (user?.rol === "ADMINISTRADOR") {
      return [
        { label: "Panel Admin", path: "/admin", icon: <TrendingUp /> },
        { label: "Ver Ofertas", path: "/ofertas", icon: <Work /> },
      ]
    }
    return []
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Panel de Control
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {getWelcomeMessage()}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {user?.rol === "POSTULANTE" && (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600 }}>
                        Mis Postulaciones
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: "#1F6FEB" }}>
                        {stats.postulaciones}
                      </Typography>
                    </Box>
                    <Person sx={{ fontSize: 32, color: "#E8F1FF" }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {user?.rol === "EMPRESA" && (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600 }}>
                        Mis Ofertas
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: "#FF6B35" }}>
                        {stats.ofertas}
                      </Typography>
                    </Box>
                    <Business sx={{ fontSize: 32, color: "#FFF3E0" }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <Box>
                    <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600 }}>
                      Notificaciones
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: "#2E7D32" }}>
                      {stats.notificaciones}
                    </Typography>
                  </Box>
                  <Notifications sx={{ fontSize: 32, color: "#E8F5E9" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #E8F1FF" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Acciones Rápidas
          </Typography>
          <Grid container spacing={2}>
            {getQuickActions().map((action) => (
              <Grid item xs={12} sm={6} key={action.path}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate(action.path)}
                  sx={{
                    py: 1.5,
                    justifyContent: "flex-start",
                    borderRadius: 1.5,
                    fontWeight: 600,
                    bgcolor: "#1F6FEB",
                    "&:hover": { bgcolor: "#1553C1" },
                  }}
                  startIcon={action.icon}
                >
                  {action.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
