"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { AuthProvider, useAuth } from "./context/AuthContext"

import Login from "./pages/Login"
import RegisterPostulante from "./pages/RegisterPostulante"
import RegisterEmpresa from "./pages/RegisterEmpresa"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Ofertas from "./pages/Ofertas"
import OfertaDetalle from "./pages/OfertaDetalle"
import MisPostulaciones from "./pages/MisPostulaciones"
import MisOfertas from "./pages/MisOfertas"
import Perfil from "./pages/Perfil"
import AdminPanel from "./pages/AdminPanel"
import Layout from "./components/Layout"

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A66C2", // LinkedIn Blue
      light: "#E7F1F8",
      dark: "#004182",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00A500", // Professional Green
      light: "#E8F5E9",
      contrastText: "#FFFFFF",
    },
    success: { main: "#05A854" },
    error: { main: "#E74C3C" },
    warning: { main: "#FFA500" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#1D2125", secondary: "#65676B" },
    divider: "#E4E6EB",
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Segoe UI', 'Inter', 'Roboto', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.5px" },
    h2: { fontSize: "2rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    h4: { fontSize: "1.25rem", fontWeight: 600 },
    h5: { fontSize: "1.1rem", fontWeight: 500 },
    body1: { fontSize: "0.95rem", lineHeight: 1.6, color: "#1D2125" },
    body2: { fontSize: "0.875rem", lineHeight: 1.5, color: "#65676B" },
    button: { fontWeight: 600, textTransform: "none", fontSize: "0.95rem" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1D2125",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid #E4E6EB",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, textTransform: "none" },
        contained: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
        },
        outlined: {
          "&:hover": { backgroundColor: "rgba(10, 102, 194, 0.04)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": { borderColor: "#0A66C2" },
            "&.Mui-focused fieldset": { borderColor: "#0A66C2", borderWidth: 2 },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#FFFFFF", borderRight: "1px solid #E4E6EB" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { "& .MuiTableCell-head": { fontWeight: 600, backgroundColor: "#F5F5F5" } },
      },
    },
  },
})

const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#F5F5F5",
    }}
  >
    <div
      style={{
        textAlign: "center",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    >
      <h2 style={{ color: "#0A66C2", marginBottom: "1rem" }}>Cargando...</h2>
    </div>
  </div>
)

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" />
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/dashboard" />
  }

  return children
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route
        path="/register/postulante"
        element={!isAuthenticated ? <RegisterPostulante /> : <Navigate to="/dashboard" />}
      />
      <Route path="/register/empresa" element={!isAuthenticated ? <RegisterEmpresa /> : <Navigate to="/dashboard" />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/ofertas/:id" element={<OfertaDetalle />} />
        <Route
          path="/mis-postulaciones"
          element={
            <PrivateRoute allowedRoles={["POSTULANTE"]}>
              <MisPostulaciones />
            </PrivateRoute>
          }
        />
        <Route
          path="/mis-ofertas"
          element={
            <PrivateRoute allowedRoles={["EMPRESA"]}>
              <MisOfertas />
            </PrivateRoute>
          }
        />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMINISTRADOR"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
