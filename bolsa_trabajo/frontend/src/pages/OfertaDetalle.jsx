"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  Divider,
  Grid,
} from "@mui/material"
import { LocationOn, AttachMoney, Business, ArrowBack, Bookmark } from "@mui/icons-material"
import { ofertaService, postulacionService } from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function OfertaDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [oferta, setOferta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [yaPostulado, setYaPostulado] = useState(false)

  useEffect(() => {
    cargarOferta()
  }, [id])

  const cargarOferta = async () => {
    try {
      const response = await ofertaService.obtenerPorId(id)
      setOferta(response.data)
      if (user?.rol === "POSTULANTE") {
        try {
          const mis = await postulacionService.obtenerMisPostulaciones()
          const existe = (mis.data || []).some((p) => p.ofertaId === id)
          setYaPostulado(existe)
        } catch (e) {}
      }
    } catch (error) {
      setError("Error al cargar la oferta")
    } finally {
      setLoading(false)
    }
  }

  const handlePostular = async () => {
    if (!user || user.rol !== "POSTULANTE") {
      setError("Debes ser un postulante para postularte")
      return
    }

    try {
      await postulacionService.postular(id)
      setSuccess("Te has postulado exitosamente a esta oferta")
      setTimeout(() => {
        navigate("/mis-postulaciones")
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al postularse")
    }
  }

  if (loading) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography>Cargando...</Typography>
        </Box>
      </Container>
    )
  }

  if (!oferta) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography>Oferta no encontrada</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/ofertas")}
          sx={{ mb: 3, color: "#1F6FEB", fontWeight: 600 }}
        >
          Volver a ofertas
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 2, border: "1px solid #E8F1FF" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {oferta.titulo}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    bgcolor: "#E8F1FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Business sx={{ color: "#1F6FEB", fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Empresa
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {oferta.empresaNombre}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                <Chip icon={<LocationOn />} label={oferta.ubicacion} sx={{ bgcolor: "#E8F1FF", color: "#1F6FEB" }} />
                <Chip label={oferta.modalidad} variant="outlined" />
                {oferta.rangoSalarial && (
                  <Chip
                    icon={<AttachMoney />}
                    label={oferta.rangoSalarial}
                    sx={{ bgcolor: "#FFF3E0", color: "#E65100" }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Descripción
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                {oferta.descripcion}
              </Typography>

              {oferta.requisitos && oferta.requisitos.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
                    Requisitos
                  </Typography>
                  <List>
                    {oferta.requisitos.map((req, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText
                          primary={req}
                          primaryTypographyProps={{ variant: "body2", sx: { pl: 2 } }}
                          sx={{ "&::before": { content: '"✓"', color: "#FF6B35", fontWeight: 700, mr: 1 } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 3, borderRadius: 1.5 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 3, borderRadius: 1.5 }}>
                  {success}
                </Alert>
              )}

              {user?.rol === "POSTULANTE" && !success && (
                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePostular}
                    sx={{
                      borderRadius: 1.5,
                      fontWeight: 600,
                      bgcolor: "#FF6B35",
                      "&:hover": { bgcolor: "#E85A26" },
                    }}
                    disabled={yaPostulado}
                  >
                    {yaPostulado ? "Ya postulado" : "Postularme"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Bookmark />}
                    sx={{ borderRadius: 1.5, fontWeight: 600 }}
                  >
                    Guardar
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #E8F1FF", position: "sticky", top: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Información
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                  Tipo de contrato
                </Typography>
                <Chip label={oferta.modalidad} size="small" variant="outlined" />
              </Box>

              {oferta.rangoSalarial && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                    Rango salarial
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#FF6B35" }}>
                    {oferta.rangoSalarial}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                  Ubicación
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {oferta.ubicacion}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
