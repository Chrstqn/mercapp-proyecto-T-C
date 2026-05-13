<template>
  <div class="not-found">
    <h1>404 - No encontrado</h1>
    <p>La página que buscas no existe o ha sido movida.</p>
    <!-- Botón para regresar al catálogo principal -->
    <router-link to="/" class="btn-home">Volver al Inicio</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}
h1 { color: #d9534f; font-size: 3rem; }
.btn-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>