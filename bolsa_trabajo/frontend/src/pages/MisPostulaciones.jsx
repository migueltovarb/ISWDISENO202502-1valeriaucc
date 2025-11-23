"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material"
import { Visibility, TrendingUp } from "@mui/icons-material"
import { postulacionService } from "../services/api"

export default function MisPostulaciones() {
  const navigate = useNavigate()
  const [postulaciones, setPostulaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarPostulaciones()
  }, [])

  const cargarPostulaciones = async () => {
    try {
      const response = await postulacionService.obtenerMisPostulaciones()
      setPostulaciones(response.data)
    } catch (error) {
      console.error("Error al cargar postulaciones:", error)
    } finally {
      setLoading(false)
    }
  }

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

  const metrics = {
    total: postulaciones.length,
    pendientes: postulaciones.filter((p) => p.estado === "PENDIENTE").length,
    aceptadas: postulaciones.filter((p) => p.estado === "ACEPTADA").length,
    rechazadas: postulaciones.filter((p) => p.estado === "RECHAZADA").length,
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <TrendingUp sx={{ color: "#FF6B35" }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Mis Postulaciones
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1F6FEB" }}>
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100" }}>
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#2E7D32" }}>
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#C62828" }}>
                  {metrics.rechazadas}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {loading ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography>Cargando postulaciones...</Typography>
          </Paper>
        ) : postulaciones.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, border: "1px solid #E8F1FF" }}>
            <Typography color="text.secondary">No tienes postulaciones aún</Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, border: "1px solid #E8F1FF" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#F7F9FC" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Oferta</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Fecha de Postulación</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: "right" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulaciones.map((postulacion) => {
                  const estadoColors = getEstadoColor(postulacion.estado)
                  return (
                    <TableRow key={postulacion.id} sx={{ "&:hover": { bgcolor: "#F7F9FC" } }}>
                      <TableCell>
                        <Chip size="small" label={postulacion.ofertaTitulo} variant="outlined" />
                      </TableCell>
                      <TableCell>{formatFecha(postulacion.fechaHoraPostulacion)}</TableCell>
                      <TableCell>
                        <Chip
                          label={postulacion.estado}
                          size="small"
                          sx={{
                            bgcolor: estadoColors.bg,
                            color: estadoColors.text,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => navigate(`/ofertas/${postulacion.ofertaId}`)}
                          sx={{ color: "#1F6FEB", fontWeight: 600 }}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  )
}
