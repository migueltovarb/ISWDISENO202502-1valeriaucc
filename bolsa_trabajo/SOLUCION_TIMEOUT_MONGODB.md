# Solución para Problemas de Timeout con MongoDB Atlas

## Cambios Realizados

### 1. Configuración de MongoDB (application.properties)
Se agregaron parámetros de timeout y retry a la URI de MongoDB:
- `connectTimeoutMS=60000` - Timeout de conexión de 60 segundos
- `socketTimeoutMS=60000` - Timeout de socket de 60 segundos
- `serverSelectionTimeoutMS=60000` - Timeout de selección de servidor
- `retryWrites=true` - Reintentos automáticos para escrituras
- `retryReads=true` - Reintentos automáticos para lecturas
- `maxPoolSize=10` - Tamaño máximo del pool de conexiones

### 2. Configuración Java (MongoConfig.java)
Se creó una clase de configuración personalizada para MongoDB con timeouts aumentados.

### 3. Frontend - Campo Foto URL
Se agregó soporte para pegar URLs en el campo de Foto URL.

### 4. Frontend - Manejo de Errores
Se mejoró el manejo de errores de timeout y conexión en el frontend.

## Verificaciones Adicionales en MongoDB Atlas

Si el problema persiste, verifica lo siguiente en MongoDB Atlas:

### 1. Network Access (Acceso de Red)
1. Ve a MongoDB Atlas → Network Access
2. Asegúrate de que tu IP esté en la lista blanca
3. O agrega `0.0.0.0/0` para permitir acceso desde cualquier IP (solo para desarrollo)

### 2. Database Access (Acceso a Base de Datos)
1. Ve a MongoDB Atlas → Database Access
2. Verifica que el usuario `trabajobolsa` tenga permisos de:
   - `readWrite` en la base de datos `bolsa_trabajo`
   - O `atlasAdmin` para acceso completo

### 3. Cluster Status
1. Verifica que el cluster esté activo y no pausado
2. Si está pausado, reactívalo

### 4. Connection String
Asegúrate de que la URI en `application.properties` sea correcta:
```
mongodb+srv://trabajobolsa:Vale3026@cluster0.nuvl75c.mongodb.net/bolsa_trabajo?appName=Cluster0&connectTimeoutMS=60000&socketTimeoutMS=60000&serverSelectionTimeoutMS=60000&retryWrites=true&retryReads=true&maxPoolSize=10&w=majority
```

## Solución Alternativa: Usar MongoDB Local

Si los problemas de timeout persisten, puedes usar MongoDB local para desarrollo:

```properties
# En application.properties, comenta la línea de Atlas y descomenta estas:
# spring.data.mongodb.host=localhost
# spring.data.mongodb.port=27017
# spring.data.mongodb.database=bolsa_trabajo
```

## Pruebas

Después de hacer los cambios:

1. Reinicia el backend completamente
2. Intenta registrarte nuevamente
3. Intenta iniciar sesión

Si el problema persiste, revisa los logs del backend para ver el error exacto.

