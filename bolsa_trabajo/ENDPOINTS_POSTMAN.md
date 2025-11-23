# Documentación de Endpoints - Bolsa de Trabajo

## Base URL
```
http://localhost:8080
```

## Autenticación
Todos los endpoints protegidos requieren el header:
```
Authorization: Bearer {token}
```

El token se obtiene del endpoint de login.

---

## 🔐 Módulo de Autenticación

### 1. Registro de Postulante
**POST** `/api/auth/registro/postulante`

**Body (JSON):**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "contrasena": "password123",
  "fotoUrl": "https://example.com/foto.jpg",
  "direccion": "Calle 123, Ciudad",
  "telefono": "3001234567"
}
```

**Respuesta:** 201 Created
```json
{
  "id": "...",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "rol": "POSTULANTE",
  ...
}
```

---

### 2. Registro de Empresa
**POST** `/api/auth/registro/empresa`

**Body (JSON):**
```json
{
  "nombre": "María",
  "apellido": "González",
  "email": "maria@empresa.com",
  "contrasena": "password123",
  "nombreEmpresa": "Tech Solutions S.A.",
  "nit": "900123456-7",
  "descripcion": "Empresa de tecnología",
  "ubicacion": "Bogotá, Colombia"
}
```

**Respuesta:** 201 Created

---

### 3. Login
**POST** `/api/auth/login`

**Body (JSON):**
```json
{
  "email": "juan.perez@example.com",
  "contrasena": "password123"
}
```

**Respuesta:** 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipoToken": "Bearer",
  "id": "...",
  "email": "juan.perez@example.com",
  "rol": "POSTULANTE",
  "nombre": "Juan"
}
```

---

## 👤 Módulo de Usuarios

### 4. Obtener Perfil
**GET** `/api/usuarios/perfil`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 200 OK

---

### 5. Actualizar Perfil
**PUT** `/api/usuarios/perfil`

**Headers:**
```
Authorization: Bearer {token}
```

**Body (JSON):**
```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez",
  "email": "juan.carlos@example.com",
  "fotoUrl": "https://example.com/nueva-foto.jpg",
  "direccion": "Nueva dirección",
  "telefono": "3009876543"
}
```

**Respuesta:** 200 OK

---

### 6. Desactivar Cuenta
**DELETE** `/api/usuarios/cuenta`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 204 No Content

---

## 💼 Módulo de Ofertas Laborales

### 7. Crear Oferta Laboral
**POST** `/api/ofertas`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Body (JSON):**
```json
{
  "titulo": "Desarrollador Java Senior",
  "descripcion": "Buscamos desarrollador con experiencia en Spring Boot",
  "requisitos": [
    "5+ años de experiencia en Java",
    "Conocimiento en Spring Boot",
    "Experiencia con MongoDB"
  ],
  "ubicacion": "Bogotá",
  "modalidad": "HIBRIDO",
  "rangoSalarial": "$5.000.000 - $7.000.000",
  "borrador": false
}
```

**Valores de modalidad:** `REMOTO`, `PRESENCIAL`, `HIBRIDO`

**Respuesta:** 201 Created

---

### 8. Actualizar Oferta
**PUT** `/api/ofertas/{id}`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Body (JSON):** (Igual que crear oferta)

**Respuesta:** 200 OK

---

### 9. Eliminar Oferta
**DELETE** `/api/ofertas/{id}`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Respuesta:** 204 No Content

---

### 10. Buscar Ofertas Públicas
**GET** `/api/ofertas/public?titulo=desarrollador&ubicacion=Bogotá&modalidad=HIBRIDO&page=0&size=10`

**Query Parameters:**
- `titulo` (opcional): Título de la oferta
- `ubicacion` (opcional): Ubicación
- `modalidad` (opcional): REMOTO, PRESENCIAL, HIBRIDO
- `page` (opcional, default: 0): Número de página
- `size` (opcional, default: 10): Tamaño de página

**Respuesta:** 200 OK (Paginada)

---

### 11. Obtener Oferta por ID
**GET** `/api/ofertas/public/{id}`

**Respuesta:** 200 OK

---

### 12. Obtener Mis Ofertas (Empresa)
**GET** `/api/ofertas/mis-ofertas?page=0&size=10`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Respuesta:** 200 OK (Paginada)

---

## 📝 Módulo de Postulaciones

### 13. Postularse a una Oferta
**POST** `/api/postulaciones`

**Headers:**
```
Authorization: Bearer {token_postulante}
```

**Body (JSON):**
```json
{
  "ofertaId": "oferta_id_aqui"
}
```

**Respuesta:** 201 Created
```json
{
  "id": "...",
  "fechaHoraPostulacion": "2024-01-15T10:30:00",
  "estado": "PENDIENTE",
  "postulanteId": "...",
  "postulanteNombre": "Juan Pérez",
  "ofertaId": "...",
  "ofertaTitulo": "Desarrollador Java Senior"
}
```

---

### 14. Obtener Mis Postulaciones
**GET** `/api/postulaciones/mis-postulaciones`

**Headers:**
```
Authorization: Bearer {token_postulante}
```

**Respuesta:** 200 OK
```json
[
  {
    "id": "...",
    "fechaHoraPostulacion": "2024-01-15T10:30:00",
    "estado": "PENDIENTE",
    "ofertaTitulo": "Desarrollador Java Senior",
    ...
  }
]
```

---

### 15. Obtener Postulaciones de una Oferta
**GET** `/api/postulaciones/oferta/{ofertaId}`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Respuesta:** 200 OK

---

### 16. Cambiar Estado de Postulación
**PUT** `/api/postulaciones/{id}/estado`

**Headers:**
```
Authorization: Bearer {token_empresa}
```

**Body (JSON):**
```json
{
  "estado": "ACEPTADA"
}
```

**Valores de estado:** `PENDIENTE`, `ACEPTADA`, `RECHAZADA`

**Respuesta:** 200 OK

---

## 🔔 Módulo de Notificaciones

### 17. Obtener Todas las Notificaciones
**GET** `/api/notificaciones`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 200 OK
```json
[
  {
    "id": "...",
    "titulo": "Postulación realizada",
    "mensaje": "Te has postulado a la oferta: Desarrollador Java",
    "fecha": "2024-01-15T10:30:00",
    "leida": false,
    "tipo": "POSTULACION_REALIZADA"
  }
]
```

---

### 18. Obtener Notificaciones No Leídas
**GET** `/api/notificaciones/no-leidas`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 200 OK

---

### 19. Contar Notificaciones No Leídas
**GET** `/api/notificaciones/contador`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 200 OK
```json
5
```

---

### 20. Marcar Notificación como Leída
**PUT** `/api/notificaciones/{id}/marcar-leida`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:** 204 No Content

---

## 👨‍💼 Módulo de Administración

### 21. Crear Usuario (Admin)
**POST** `/api/admin/usuarios`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Body (JSON):**
```json
{
  "nombre": "Admin",
  "apellido": "Sistema",
  "email": "admin@bolsa.com",
  "contrasena": "admin123",
  "rol": "ADMINISTRADOR",
  "activo": true
}
```

**Respuesta:** 201 Created

---

### 22. Modificar Usuario (Admin)
**PUT** `/api/admin/usuarios/{id}`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Body (JSON):** (Igual que crear usuario)

**Respuesta:** 200 OK

---

### 23. Desactivar Usuario (Admin)
**DELETE** `/api/admin/usuarios/{id}`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Respuesta:** 204 No Content

---

### 24. Listar Usuarios (Admin)
**GET** `/api/admin/usuarios?rol=POSTULANTE`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Query Parameters:**
- `rol` (opcional): POSTULANTE, EMPRESA, ADMINISTRADOR

**Respuesta:** 200 OK

---

### 25. Generar Reporte de Usuarios
**GET** `/api/admin/reportes/usuarios`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Respuesta:** 200 OK
```json
{
  "tipoReporte": "REPORTE_USUARIOS",
  "descripcion": "Reporte de usuarios del sistema",
  "fechaGeneracion": "2024-01-15",
  "totalUsuarios": 150,
  "datosDetalle": {
    "totalPostulantes": 100,
    "totalEmpresas": 45,
    "totalAdministradores": 5
  }
}
```

---

### 26. Generar Reporte de Ofertas
**GET** `/api/admin/reportes/ofertas`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Respuesta:** 200 OK

---

### 27. Generar Reporte de Postulaciones
**GET** `/api/admin/reportes/postulaciones`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Respuesta:** 200 OK

---

### 28. Generar Reporte General
**GET** `/api/admin/reportes/general`

**Headers:**
```
Authorization: Bearer {token_admin}
```

**Respuesta:** 200 OK
```json
{
  "tipoReporte": "REPORTE_GENERAL",
  "descripcion": "Reporte general del sistema",
  "fechaGeneracion": "2024-01-15",
  "totalUsuarios": 150,
  "totalOfertasActivas": 45,
  "totalPostulaciones": 320,
  "datosDetalle": {
    "totalPostulantes": 100,
    "totalEmpresas": 45,
    "totalOfertas": 50
  }
}
```

---

## 📋 Flujo de Ejemplo Completo

### 1. Registrar Postulante
```
POST /api/auth/registro/postulante
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan@example.com", "contrasena": "pass123", ... }
```

### 2. Login Postulante
```
POST /api/auth/login
Body: { "email": "juan@example.com", "contrasena": "pass123" }
Guardar el token recibido
```

### 3. Buscar Ofertas
```
GET /api/ofertas/public?titulo=desarrollador
```

### 4. Ver Detalle de Oferta
```
GET /api/ofertas/public/{oferta_id}
```

### 5. Postularse
```
POST /api/postulaciones
Headers: Authorization: Bearer {token}
Body: { "ofertaId": "oferta_id" }
```

### 6. Ver Mis Postulaciones
```
GET /api/postulaciones/mis-postulaciones
Headers: Authorization: Bearer {token}
```

### 7. Ver Notificaciones
```
GET /api/notificaciones
Headers: Authorization: Bearer {token}
```

---

## ⚠️ Códigos de Estado HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Operación exitosa sin contenido
- **400 Bad Request**: Error en la solicitud (validación, datos inválidos)
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: No tiene permisos para la operación
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

---

## 🔑 Notas Importantes

1. **Tokens JWT**: Los tokens expiran después de 24 horas (86400000 ms)
2. **Contraseñas**: Se almacenan encriptadas con BCrypt
3. **Validación de Email**: Los emails deben ser únicos en el sistema
4. **NIT de Empresa**: Debe ser único
5. **Postulaciones Duplicadas**: No se permite postularse dos veces a la misma oferta
6. **Ofertas Borrador**: Las ofertas en borrador no son visibles públicamente
7. **Roles**: POSTULANTE, EMPRESA, ADMINISTRADOR

---

## 🧪 Colección de Postman

Para facilitar las pruebas, puedes importar esta colección en Postman. Crea una nueva colección y agrega las siguientes variables de entorno:

- `base_url`: `http://localhost:8080`
- `token_postulante`: (se actualiza después del login)
- `token_empresa`: (se actualiza después del login)
- `token_admin`: (se actualiza después del login)

