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

**Actualización 1**

Implementación Técnica

Durante esta fase se implementó la lógica core de la aplicación siguiendo los estándares de Vue 3 (Composition API):

- Composables (Patrón Custom Hook): Se desarrolló useApi.js, un composable encargado de gestionar peticiones asíncronas de forma genérica. Este maneja tres estados reactivos críticos:
    - data: Almacena la respuesta del servidor.
    - loading: Estado booleano para mostrar indicadores de carga al usuario.
    - error: Captura y expone mensajes de error en caso de fallos de red o de API.

- Filtrado Reactivo con Computed Properties: El catálogo utiliza una propiedad computada (filteredProducts) que sincroniza en tiempo real el buscador de texto y el filtro por categorías, optimizando el rendimiento al no realizar peticiones innecesarias al servidor durante la búsqueda.

Componentización y Comunicación:

- Props: Se utilizan para pasar los datos de los productos desde la vista principal hacia el componente ProductCard.
- Custom Events: El componente ProductCard comunica la intención de compra hacia el padre mediante eventos personalizados, manteniendo el flujo de datos unidireccional.

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

Para iniciar la API, es necesario ejecutar ambos comandos en terminales separadas:
Si usas json-server o tu script de node

    npx json-server --watch backend/db.json --port 3000 --cors

Para iniciar el Frontend o Modo Desarrollo:

    npm run dev