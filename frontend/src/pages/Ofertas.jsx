"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Box,
  Pagination,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material"
import { Search, LocationOn, AttachMoney, WorkOutline } from "@mui/icons-material"
import { ofertaService } from "../services/api"

export default function Ofertas() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtros, setFiltros] = useState({
    titulo: "",
    ubicacion: "",
    empresa: "",
    modalidad: "",
    page: 0,
    size: 12,
  })
  const [pagination, setPagination] = useState({ totalPages: 0, totalElements: 0 })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const titulo = params.get("titulo") || ""
    const ubicacion = params.get("ubicacion") || ""
    setFiltros((prev) => ({ ...prev, titulo, ubicacion, page: 0 }))
  }, [location.search])

  useEffect(() => {
    buscarOfertas()
  }, [filtros.page, filtros.titulo, filtros.ubicacion, filtros.modalidad, filtros.empresa])

  const buscarOfertas = async () => {
    setLoading(true)
    try {
      const params = {
        page: filtros.page,
        size: filtros.size,
      }
      if (filtros.titulo) params.titulo = filtros.titulo
      if (filtros.ubicacion) params.ubicacion = filtros.ubicacion
      if (filtros.modalidad) params.modalidad = filtros.modalidad
      if (filtros.empresa) params.empresa = filtros.empresa

      const response = await ofertaService.buscarPublicas(params)
      setOfertas(response.data.content)
      setPagination({
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      })
    } catch (error) {
      console.error("Error al buscar ofertas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setFiltros({ ...filtros, page: 0 })
  }

  const getModalidadColor = (modalidad) => {
    const colors = {
      REMOTO: { bg: "#E8F5E9", text: "#2E7D32" },
      PRESENCIAL: { bg: "#E3F2FD", text: "#1565C0" },
      HIBRIDO: { bg: "#FFF3E0", text: "#E65100" },
    }
    return colors[modalidad] || { bg: "#F5F5F5", text: "#616161" }
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Ofertas de Trabajo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pagination.totalElements} oportunidades disponibles
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, border: "1px solid #E8F1FF" }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cargo o área"
                placeholder="Ej: Desarrollador"
                value={filtros.titulo}
                onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value, page: 0 })}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Ubicación"
                placeholder="Ej: Bogotá"
                value={filtros.ubicacion}
                onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value, page: 0 })}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Empresa"
                placeholder="Ej: Acme Corp"
                value={filtros.empresa}
                onChange={(e) => setFiltros({ ...filtros, empresa: e.target.value, page: 0 })}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Modalidad</InputLabel>
                <Select
                  value={filtros.modalidad}
                  label="Modalidad"
                  onChange={(e) => setFiltros({ ...filtros, modalidad: e.target.value, page: 0 })}
                  sx={{ borderRadius: 1.5 }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="REMOTO">Remoto</MenuItem>
                  <MenuItem value="PRESENCIAL">Presencial</MenuItem>
                  <MenuItem value="HIBRIDO">Híbrido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Search />}
                onClick={handleSearch}
                sx={{
                  borderRadius: 1.5,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: "#FF6B35",
                  "&:hover": { bgcolor: "#E85A26" },
                }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
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
          <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#FFFFFF", borderRadius: 2 }}>
            <WorkOutline sx={{ fontSize: 48, color: "#CCCCCC", mb: 2 }} />
            <Typography variant="h6">No se encontraron ofertas</Typography>
            <Typography variant="body2" color="text.secondary">
              Intenta ajustar tus filtros de búsqueda
            </Typography>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {ofertas.map((oferta) => {
                const modalidadColors = getModalidadColor(oferta.modalidad)
                return (
                  <Grid item xs={12} sm={6} md={4} key={oferta.id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        border: "1px solid #E8F1FF",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(31, 111, 235, 0.15)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {oferta.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {oferta.empresaNombre}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                          <Chip icon={<LocationOn />} label={oferta.ubicacion} size="small" variant="outlined" />
                          <Chip
                            label={oferta.modalidad}
                            size="small"
                            sx={{
                              bgcolor: modalidadColors.bg,
                              color: modalidadColors.text,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        {oferta.rangoSalarial && (
                          <Typography
                            variant="body2"
                            sx={{ display: "flex", alignItems: "center", mb: 1, color: "#FF6B35", fontWeight: 600 }}
                          >
                            <AttachMoney fontSize="small" />
                            {oferta.rangoSalarial}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                          {oferta.descripcion}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => navigate(`/ofertas/${oferta.id}`)}
                          sx={{ color: "#1F6FEB", fontWeight: 600 }}
                        >
                          Ver detalles →
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {pagination.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={filtros.page + 1}
                  onChange={(e, page) => setFiltros({ ...filtros, page: page - 1 })}
                  color="primary"
                  sx={{ "& .MuiPaginationItem-root": { borderRadius: 1 } }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
