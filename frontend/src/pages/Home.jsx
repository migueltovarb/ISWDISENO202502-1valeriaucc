"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
} from "@mui/material"
import { Search, LocationOn, TrendingUp, Work } from "@mui/icons-material"
import { ofertaService } from "../services/api"

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [destacadas, setDestacadas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDestacadas()
  }, [])

  const cargarDestacadas = async () => {
    try {
      const resp = await ofertaService.buscarPublicas({ page: 0, size: 6 })
      setDestacadas(resp.data.content || [])
    } catch (error) {
      console.error("Error cargando ofertas:", error)
    } finally {
      setLoading(false)
    }
  }

  const buscar = () => {
    if (!query && !city) {
      navigate("/ofertas")
      return
    }
    const params = new URLSearchParams()
    if (query) params.set("titulo", query)
    if (city) params.set("ubicacion", city)
    navigate(`/ofertas?${params.toString()}`)
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #E7F1F8 0%, #FFFFFF 100%)",
          position: "relative",
          overflow: "hidden",
          py: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            backgroundColor: "rgba(0, 165, 0, 0.05)",
            borderRadius: "50%",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#0A66C2",
                mb: 1,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Encuentra tu próximo empleo
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#65676B",
                fontWeight: 400,
                mb: 3,
                maxWidth: "600px",
              }}
            >
              Conecta con las mejores oportunidades laborales y desarrolla tu carrera profesional
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="¿Qué puesto buscas?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && buscar()}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1.5, color: "#65676B" }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    backgroundColor: "#FFFFFF",
                    "&:hover fieldset": { borderColor: "#0A66C2" },
                    "&.Mui-focused fieldset": { borderColor: "#0A66C2" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Ciudad o región"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && buscar()}
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1.5, color: "#65676B" }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    backgroundColor: "#FFFFFF",
                    "&:hover fieldset": { borderColor: "#0A66C2" },
                    "&.Mui-focused fieldset": { borderColor: "#0A66C2" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Search />}
                onClick={buscar}
                sx={{
                  py: 1.5,
                  borderRadius: 1.5,
                  fontWeight: 600,
                  backgroundColor: "#00A500",
                  "&:hover": { backgroundColor: "#008A00" },
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Ofertas Destacadas */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <TrendingUp sx={{ color: "#00A500", fontSize: "1.8rem" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Ofertas destacadas
          </Typography>
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{ p: 2, height: 200, background: "#F5F5F5" }} />
              </Grid>
            ))}
          </Grid>
        ) : destacadas.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#F5F5F5" }}>
            <Typography color="text.secondary">No hay ofertas disponibles en este momento</Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {destacadas.map((oferta) => (
              <Grid item xs={12} sm={6} md={4} key={oferta.id}>
                <Card
                  sx={{
                    height: "100%",
                    border: "1px solid #E4E6EB",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(10, 102, 194, 0.15)",
                      transform: "translateY(-4px)",
                      borderColor: "#0A66C2",
                    },
                  }}
                  onClick={() => navigate(`/ofertas/${oferta.id}`)}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "#1D2125",
                          flex: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {oferta.titulo}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#65676B",
                        mb: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {oferta.empresaNombre}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: "wrap" }}>
                      <Chip
                        icon={<LocationOn />}
                        label={oferta.ubicacion}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: "#E4E6EB" }}
                      />
                      <Chip
                        label={oferta.modalidad}
                        size="small"
                        sx={{
                          backgroundColor: "#E7F1F8",
                          color: "#0A66C2",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    {oferta.rangoSalarial && (
                      <Typography variant="body2" sx={{ color: "#00A500", fontWeight: 600, mb: 1 }}>
                        {oferta.rangoSalarial}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#65676B",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {oferta.descripcion}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Categorías */}
      <Box sx={{ backgroundColor: "#F5F5F5", py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Work sx={{ color: "#0A66C2", fontSize: "1.8rem" }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Explorar por categoría
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {["Tecnología", "Marketing", "Ventas", "Diseño", "Administración", "Finanzas"].map((cat) => (
              <Grid item xs={6} md={2} key={cat}>
                <Paper
                  sx={{
                    p: 2.5,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid #E4E6EB",
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                      borderColor: "#00A500",
                      boxShadow: "0 4px 12px rgba(0, 165, 0, 0.12)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => {
                    setQuery(cat)
                    buscar()
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: "#0A66C2" }}>{cat}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
