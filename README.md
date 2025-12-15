# 🚀 Proyecto Inicial Angular Academy 2025: Mini Web App de Autenticación

Este proyecto implementa una aplicación de autenticación completa (registro, login y gestión de sesión protegida) utilizando el stack **Angular** (Frontend) y **Node/Express** (Backend).

## 🎯 Objetivo del Proyecto

Construir en un plazo de ~18 horas una mini web app que cubra la funcionalidad clave de autenticación y autorización, midiendo la aplicación de buenas prácticas y la capacidad para resolver problemas con el apoyo de herramientas de IA.

## 🧪 Stack Técnico y Restricciones

| Componente | Tecnología | Requisitos Clave |
| :--- | :--- | :--- |
| **Frontend** | Angular 21 | Componentes *Standalone*, Reactive Forms, HttpInterceptor. |
| **Backend** | Node + Express | Uso de servicios y middlewares, Rutas separadas, Manejo de errores. |
| **Autenticación** | JWT (JSON Web Tokens) | Gestión de sesión y autorización. |
| **Almacenamiento** | [Elegir: Arreglo en Memoria / Archivo JSON / MySQL] | Base de datos para guardar usuarios. |

---

## 📋 Features Implementadas (Alcance Funcional)

A continuación se detalla la lista de funcionalidades alcanzadas (Frontend + Backend):

### 1. Registro de Usuario (`POST /api/auth/register`)

* **Campos:** Nombre, Email, Contraseña, Confirmar Contraseña.
* **Validaciones:** Email válido, contraseña mínima (ej. 8 caracteres, 1 número), y coincidencia de confirmación.
* Guarda el usuario en la BD.

### 2. Login de Usuario (`POST /api/auth/login`)

* **Proceso:** Envío de Email y Contraseña.
* **Respuesta Exitosa:** Devuelve **JWT** y datos básicos del usuario.
* **Fallo:** Muestra un mensaje de error amigable.

### 3. Sesión y Autorización

* **Persistencia:** El Frontend guarda el token en `localStorage` o `sessionStorage`.
* **Protección de Ruta:** La ruta `/dashboard` está protegida por un **AuthGuard**.
* **Intercepción:** Un **HttpInterceptor** inyecta el token en el *header* `Authorization` de todas las peticiones a `/api/*`.
* **Vencimiento de Token:** Si el token no es válido o expira, el usuario es redirigido a `/login`.

### 4. Dashboard Protegido (`/dashboard`)

* Solo accesible con token válido.
* **Contenido:**
    * Bienvenida: "Hola, {nombre}".
    * Datos del usuario logueado.
    * Métricas personales (ej. Último login, Total de logins exitosos).

### 5. Logout

* Botón "Cerrar sesión" que borra el token y redirige a `/login`.

---

## ⚙️ Cómo Correr el Proyecto

El proyecto está diseñado como un *monorepo* simplificado. Se recomienda usar `concurrently` o una herramienta similar para iniciar ambos servicios a la vez.

### 1. Instalación de Dependencias

Ejecuta lo siguiente desde la **carpeta raíz** del proyecto:

```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..