# Frontend - Bolsa de Trabajo

Frontend desarrollado en React para el sistema de Bolsa de Trabajo.

## Características

- ✅ Autenticación con JWT
- ✅ Registro de Postulantes y Empresas
- ✅ Gestión de Ofertas Laborales
- ✅ Sistema de Postulaciones
- ✅ Notificaciones en tiempo real
- ✅ Panel de Administración
- ✅ Diseño responsive con Material-UI

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Configuración

El frontend está configurado para conectarse al backend en `http://localhost:8080`.

Si necesitas cambiar la URL del backend, edita `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080', // Cambia esta URL
    changeOrigin: true
  }
}
```

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── services/       # Servicios API
│   ├── context/        # Context API (Auth)
│   └── App.jsx         # Componente principal
├── public/             # Archivos estáticos
└── package.json        # Dependencias
```

## Funcionalidades por Rol

### Postulante
- Ver ofertas disponibles
- Postularse a ofertas
- Ver historial de postulaciones
- Gestionar perfil

### Empresa
- Crear y gestionar ofertas
- Ver postulaciones recibidas
- Cambiar estado de postulaciones
- Gestionar perfil

### Administrador
- Ver todos los usuarios
- Generar reportes
- Gestionar sistema

## Tecnologías Utilizadas

- React 18
- React Router DOM
- Material-UI (MUI)
- Axios
- Vite

