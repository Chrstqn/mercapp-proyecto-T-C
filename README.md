**MercApp - Catálogo de Diseño y Fabricación Digital**

Este proyecto es una Single Page Application (SPA) desarrollada con Vue 3, diseñada para la gestión y visualización de productos que en este caso son productos decorativos fabricados mediante corte láser, impresión 3D y arreglos en MDF.

**Realizado por:**

Nombre: Christian Taipe

Institución: Universidad Politécnica Salesiana

Carrera: Ingeniería de Software

Asignatura: Aplicaciones Web

**Funcionalidades Implementadas**

- Catálogo Interactivo: Visualización de productos con filtros por categoría y búsqueda en tiempo real.
- Gestión de Productos: CRUD completo (Crear, Leer, Actualizar, Eliminar) consumiendo una API REST propia.
- Carrito de Compras: Sistema de gestión en memoria con persistencia en localStorage.
- Arquitectura Moderna: Uso de Vue 3 (Composition API), SFC, Composables personalizados y carga perezosa (Lazy Loading) para optimizar el rendimiento.
- Diseño Responsivo: Interfaz adaptativa orientada a la experiencia de usuario.

**Tecnologías Utilizadas**

- Frontend: Vue 3, Vite, Vue Router.
- Backend: [Node.js + Express / JSON-Server] para el API REST.
- Estado: Reactividad nativa de Vue 3 y Composables.

**Instrucciones de Uso**

Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

**Instalación**

Para clonar el repositorio se utiliza:

    git clone https://github.com/TU_USUARIO/mercapp.git

Para instalar dependencias se utiliza:

    npm install

**Ejecución**

Para iniciar la API:
Si usas json-server o tu script de node

    npm run api 

Para iniciar el Frontend o Modo Desarrollo:

    npm run dev