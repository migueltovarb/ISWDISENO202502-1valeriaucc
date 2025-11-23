# Sistema de Bolsa de Trabajo

Sistema completo de gestión de ofertas laborales con backend en Spring Boot y frontend en React.

## 🏗️ Estructura del Proyecto

```
bolsa_trabajo/
├── bolsa_trabajo/          # Backend (Spring Boot)
│   ├── src/
│   └── pom.xml
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   └── package.json
└── README.md
```

## 🚀 Inicio Rápido

### Cómo compilar y ejecutar (Windows PowerShell)

1) Backend (Spring Boot)
- `cd bolsa_trabajo`
- Compilar: `mvn clean package -DskipTests`
- Ejecutar (desarrollo): `mvn spring-boot:run`
- Ejecutar JAR (alternativa):
  - `cd target`
  - `java -jar bolsa-trabajo-1.0.0.jar`
- Verificar: abre `http://localhost:8080/swagger-ui/index.html`

2) Frontend (React + Vite)
- `cd frontend`
- Instalar deps: `npm install`
- Compilar build: `npm run build`
- Ejecutar en desarrollo: `npm run dev` (abre `http://localhost:5173/`)
- Previsualizar el build: `npm run preview -- --port 5174` (abre `http://localhost:5174/`)

### Backend (Spring Boot)

1. **Asegúrate de tener Java 17 instalado**
```bash
java -version
   ```

2. **Configura MongoDB Atlas**
   - Edita `bolsa_trabajo/src/main/resources/application.properties`
   - Actualiza la URI de MongoDB con tus credenciales:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://usuario:contraseña@cluster.mongodb.net/bolsa_trabajo?appName=Cluster0
   ```

3. **Compilar backend (JAR)**
   ```bash
   cd bolsa_trabajo
   mvn -q -DskipTests package
   ```
   - Artefacto: `bolsa_trabajo/target/bolsa-trabajo-1.0.0.jar`

4. **Ejecutar backend (modo desarrollo)**
   ```bash
   mvn spring-boot:run
   ```
   El backend estará disponible en: `http://localhost:8080`

### Frontend (React)

1. **Instalar dependencias**
   ```bash
   cd frontend
   npm install
   ```

2. **Compilar frontend (build de producción)**
   ```bash
   npm run build
   ```
   - Carpeta resultante: `frontend/dist`

3. **Ejecutar frontend (modo desarrollo)**
   ```bash
   npm run dev
   ```
   El frontend estará disponible en: `http://localhost:5173`

4. **Previsualizar el build**
   ```bash
   npm run preview -- --port 5174
   ```
   Previsualización en: `http://localhost:5174`

## 📋 Funcionalidades Implementadas

### Autenticación
- ✅ Login con JWT
- ✅ Registro de Postulantes
- ✅ Registro de Empresas
- ✅ Gestión de sesión

### Postulantes
- ✅ Ver ofertas disponibles
- ✅ Buscar y filtrar ofertas
- ✅ Postularse a ofertas
- ✅ Ver historial de postulaciones
- ✅ Gestionar perfil

### Empresas
- ✅ Crear ofertas laborales
- ✅ Editar y eliminar ofertas
- ✅ Ver postulaciones recibidas
- ✅ Cambiar estado de postulaciones
- ✅ Gestionar perfil

### Administradores
- ✅ Ver todos los usuarios
- ✅ Generar reportes
- ✅ Estadísticas del sistema

### Notificaciones
- ✅ Notificaciones automáticas
- ✅ Contador de no leídas
- ✅ Marcar como leídas

## 🛠️ Tecnologías

## 🗣️ Lenguajes de Programación

- Backend: Java 17
- Frontend: JavaScript (ES2020+) con React

### Backend
- Spring Boot 3.2.12
- Spring Security + JWT
- Spring Data MongoDB
- Lombok
- Java 17

### Frontend
- React 18
- React Router DOM
- Material-UI (MUI)
- Axios
- Vite

## 📚 Documentación API

Todos los endpoints están documentados en `ENDPOINTS_POSTMAN.md`

## 🔐 Roles del Sistema

- **POSTULANTE**: Puede ver ofertas y postularse
- **EMPRESA**: Puede crear y gestionar ofertas
- **ADMINISTRADOR**: Acceso completo al sistema

## 📝 Notas Importantes

1. El backend debe estar ejecutándose antes de usar el frontend
2. Asegúrate de configurar correctamente MongoDB Atlas
3. Los tokens JWT expiran después de 24 horas
4. Las contraseñas se encriptan automáticamente con BCrypt

## 🐛 Solución de Problemas

### Backend no inicia
- Verifica que Java 17 esté instalado
- Revisa las credenciales de MongoDB Atlas
- Asegúrate de que el puerto 8080 esté libre

### Frontend no se conecta al backend
- Verifica que el backend esté ejecutándose
- Revisa la configuración del proxy en `vite.config.js`
- Verifica CORS en el backend

## 📄 Licencia

Este proyecto es de uso educativo.

