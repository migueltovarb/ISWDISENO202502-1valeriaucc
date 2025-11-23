"use client"

import React, { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material"
import { Chip } from "@mui/material"
import { usuarioService, notificacionService } from "../services/api"
import {
  Menu as MenuIcon,
  Work,
  Person,
  Business,
  Notifications,
  Dashboard as DashboardIcon,
  AdminPanelSettings,
  ExitToApp,
} from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"

const drawerWidth = 260

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificacionesCount, setNotificacionesCount] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState("")

  React.useEffect(() => {
    if (user) {
      loadNotificacionesCount()
      loadPerfil()
      const interval = setInterval(loadNotificacionesCount, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  React.useEffect(() => {
    const handler = () => loadPerfil()
    window.addEventListener("perfilUpdated", handler)
    return () => window.removeEventListener("perfilUpdated", handler)
  }, [])

  const loadNotificacionesCount = async () => {
    try {
      const response = await notificacionService.contarNoLeidas()
      setNotificacionesCount(response.data || 0)
    } catch (error) {
      console.error("Error al cargar notificaciones:", error)
    }
  }

  const loadPerfil = async () => {
    try {
      const response = await usuarioService.obtenerPerfil()
      const d = response.data || {}
      setAvatarUrl(d.fotoUrl || "")
    } catch (error) {
      console.error("Error al cargar perfil:", error)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getMenuItems = () => {
    const items = [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Ofertas", icon: <Work />, path: "/ofertas" },
    ]

    if (user?.rol === "POSTULANTE") {
      items.push({ text: "Mis Postulaciones", icon: <Person />, path: "/mis-postulaciones" })
    }

    if (user?.rol === "EMPRESA") {
      items.push({ text: "Mis Ofertas", icon: <Business />, path: "/mis-ofertas" })
    }

    if (user?.rol === "ADMINISTRADOR") {
      items.push({ text: "Panel Admin", icon: <AdminPanelSettings />, path: "/admin" })
    }

    return items
  }

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ py: 2, px: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0A66C2 0%, #00A500 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.2rem",
              boxShadow: "0 2px 8px rgba(10, 102, 194, 0.3)",
            }}
          >
            J
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1D2125", fontSize: "1.1rem", lineHeight: 1 }}>
              JobBoard
            </Typography>
            <Typography variant="caption" sx={{ color: "#65676B", fontSize: "0.7rem" }}>
              Bolsa de Trabajo
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />

      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {getMenuItems().map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path)
                  setMobileOpen(false)
                }}
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  color: isActive ? "#fff" : "#1D2125",
                  backgroundColor: isActive ? "#0A66C2" : "transparent",
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "#fff" : "#65676B",
                    minWidth: 40,
                  },
                  "&:hover": {
                    backgroundColor: isActive ? "#0A66C2" : "#F0F2F5",
                  },
                  boxShadow: isActive ? "0 2px 8px rgba(10, 102, 194, 0.2)" : "none",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2, backgroundColor: "#F5F5F5" }}>
        <Typography variant="caption" sx={{ color: "#65676B", display: "block", mb: 1, fontWeight: 600 }}>
          Tu rol
        </Typography>
        <Chip
          label={user?.rol || "Usuario"}
          size="small"
          sx={{
            backgroundColor: "#00A500",
            color: "#fff",
            fontWeight: 600,
            width: "100%",
          }}
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#FFFFFF",
          color: "#1D2125",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid #E4E6EB",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, color: "#1D2125" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: "#1D2125", fontWeight: 600, fontSize: "1rem" }}>
              {getMenuItems().find((item) => item.path === location.pathname)?.text || "Dashboard"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/perfil")}
              sx={{
                color: "#65676B",
                transition: "all 0.2s ease",
                "&:hover": { color: "#0A66C2" },
              }}
            >
              <Badge badgeContent={notificacionesCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {user?.rol && (
              <Chip
                label={user.rol}
                size="small"
                sx={{
                  backgroundColor: "#00A500",
                  color: "#fff",
                  fontWeight: 600,
                  display: { xs: "none", md: "flex" },
                }}
              />
            )}

            <Avatar
              src={avatarUrl}
              alt={user?.nombre}
              sx={{
                width: 36,
                height: 36,
                border: "2px solid #0A66C2",
                cursor: "pointer",
                backgroundColor: "#E7F1F8",
              }}
            />

            <Button
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                textTransform: "none",
                color: "#1D2125",
                display: { xs: "none", md: "block" },
                fontSize: "0.9rem",
                "&:hover": { backgroundColor: "rgba(10, 102, 194, 0.04)" },
              }}
            >
              {user?.nombre}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/perfil")
                  handleMenuClose()
                }}
                sx={{ fontSize: "0.9rem", "&:hover": { backgroundColor: "#F5F5F5" } }}
              >
                <Person sx={{ mr: 1.5, color: "#0A66C2", fontSize: "1.2rem" }} />
                Mi Perfil
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={handleLogout}
                sx={{ fontSize: "0.9rem", color: "#E74C3C", "&:hover": { backgroundColor: "#FEE2E2" } }}
              >
                <ExitToApp sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFFFF",
              borderRight: "1px solid #E4E6EB",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFFFF",
              borderRight: "1px solid #E4E6EB",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
