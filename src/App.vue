<template>
  <nav>
    <router-link to="/">Inicio</router-link> |
    <router-link to="/cart">Carrito</router-link> |
    <router-link to="/about">Acerca de</router-link>
  </nav>

  <router-view />
</template>

<style>
nav {
  padding: 20px;
  background-color: #f4f4f4;
  margin-bottom: 20px;
}
nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
</style>