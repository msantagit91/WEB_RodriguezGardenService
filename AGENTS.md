<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Proyecto Jardin Admin

## Descripción

Aplicación web para administración y gestión de jardines.

---

## Stack Tecnológico

* Next.js
* React
* TypeScript
* Node.js
* Supabase
* Vercel
* Twilio
* Git
* GitHub
* Visual Studio Code
* Windows PowerShell

---

## Reglas para el Agente

* Leer este archivo antes de realizar cualquier cambio.
* Analizar la estructura actual del proyecto antes de programar.
* No cambiar el stack tecnológico sin autorización.
* No instalar dependencias nuevas sin explicar claramente por qué son necesarias.
* No eliminar archivos existentes sin autorización.
* Realizar cambios pequeños, controlados y fáciles de validar.
* Explicar siempre qué archivos serán modificados.
* Indicar cómo probar cada cambio en localhost.
* Mantener diseño responsive para móvil, tablet y escritorio.
* Utilizar TypeScript.
* Mantener comentarios únicamente donde aporten valor.
* Priorizar código limpio, simple, fácil de mantener y bien documentado.
* Evitar complejidad innecesaria.
* Seguir las convenciones definidas en este documento.

---

## Convención de Idioma

Utilizar un protocolo mixto.

### Código técnico en inglés

Aplicar inglés para:

* Componentes React
* Clases
* Interfaces
* Servicios
* Repositorios
* Archivos
* Carpetas
* Endpoints API
* Hooks
* Helpers
* Utilidades

Ejemplos:

```ts
CustomerService
UserRepository
DashboardPage
LoginForm
/api/customers
useAuth
```

### Lógica de negocio en español

Aplicar español para:

* Variables
* Parámetros
* Funciones de negocio
* Procesos específicos del sistema

Ejemplos:

```ts
const nombreCliente
const telefonoCliente
const fechaCita

function guardarCliente()
function enviarMensajeWhatsApp()
function registrarVisita()
```

### Interfaz de usuario

Todo el texto visible para el usuario debe mostrarse en español.

Ejemplos:

```txt
Guardar
Cancelar
Clientes
Reportes
Administración de Jardines
Iniciar Sesión
```

---

## Convenciones de Código

### Variables

Utilizar camelCase.

Correcto:

```ts
nombreCliente
telefonoCliente
totalAmount
createdDate
```

Incorrecto:

```ts
NombreCliente
nombre_cliente
NOMBRE_CLIENTE
```

---

### Funciones

Utilizar camelCase.

Correcto:

```ts
guardarCliente()
enviarMensajeWhatsApp()
getUserData()
calculateTotal()
```

---

### Clases

Utilizar PascalCase.

Correcto:

```ts
CustomerService
UserRepository
SupabaseProvider
TwilioService
```

---

### Interfaces

Utilizar PascalCase con prefijo I.

Correcto:

```ts
IUser
ICustomer
IAppointment
```

---

### Componentes React

Utilizar PascalCase.

Correcto:

```ts
LoginForm.tsx
DashboardPage.tsx
CustomerCard.tsx
AppointmentModal.tsx
```

---

### Archivos

Componentes:

```txt
LoginForm.tsx
DashboardPage.tsx
```

Utilidades:

```txt
dateHelper.ts
phoneFormatter.ts
apiClient.ts
```

---

### Carpetas

Utilizar nombres cortos y en minúsculas.

```txt
components
services
hooks
lib
types
utils
```

---

## Base de Datos

### Tablas

Utilizar minúsculas con snake_case.

```sql
users
customers
appointments
message_logs
```

### Columnas

```sql
id
first_name
last_name
phone_number
created_at
updated_at
```

---

## API Endpoints

Utilizar minúsculas y guiones.

```txt
/api/users
/api/customers
/api/appointments
/api/send-message
```

---

## Git Commits

Formato recomendado:

```txt
feat: add customer registration
fix: correct login validation
refactor: improve dashboard layout
docs: update project documentation
```

---

## Principios Generales

* Mantener funciones pequeñas y reutilizables.
* Evitar duplicación de código.
* Utilizar TypeScript estrictamente.
* Utilizar async/await.
* Manejar errores mediante try/catch.
* Crear componentes reutilizables.
* Priorizar legibilidad sobre complejidad.
* No utilizar código obsoleto o deprecated.
* Mantener la aplicación responsive desde el inicio.
* Mantener una arquitectura limpia y fácil de entender.

---

## Filosofía de Desarrollo

* Trabajar paso a paso.
* No generar grandes bloques de código sin autorización.
* Explicar antes de modificar archivos.
* Priorizar funcionalidad antes que estética.
* Mantener el proyecto simple y entendible para un desarrollador junior.
* Confirmar que cada fase funciona antes de continuar.
* Si existen varias soluciones posibles, proponer primero la más simple.
* Evitar sobreingeniería.
* Resolver un problema a la vez.

---

## Flujo de Trabajo

### Antes de programar

1. Explicar qué entendiste.
2. Indicar qué archivos serán modificados.
3. Explicar qué cambios se realizarán.
4. Esperar aprobación cuando el cambio sea grande.

### Después de programar

1. Explicar qué se modificó.
2. Indicar cómo probarlo.
3. Mostrar posibles errores esperados.
4. Recomendar el siguiente paso.

---

## Orden de Desarrollo

1. Diseño base.
2. Navegación.
3. Base de datos Supabase.
4. Autenticación.
5. CRUD principal.
6. Reportes.
7. Integración Twilio.
8. Pruebas.
9. GitHub.
10. Deploy en Vercel.

---

## Comandos

### Instalar dependencias

```bash
npm install
```

### Ejecutar proyecto

```bash
npm run dev
```

### Generar build

```bash
npm run build
```

---

## Importante

No avanzar a la siguiente fase hasta que el usuario confirme que la fase actual funciona correctamente.


