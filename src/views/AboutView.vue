<template>
  <div class="about-container">
    <h1>Sobre Nosotros</h1>
    <div class="content">
      <p>
        <strong>MercApp</strong> es una plataforma diseñada para la gestión y visualización 
        de catálogos de productos decorativos personalizados, especializados en:
      </p>
      <ul class="highlights">
        <li>Corte Láser en MDF</li>
        <li>Impresión 3D</li>
        <li>Diseños personalizados</li>
      </ul>
      <p class="mission">
        Nuestro objetivo es reducir la fricción tecnológica y ofrecer soluciones 
        eficientes mediante software de alta optimización.
      </p>
      <router-link to="/" class="btn-back">Explorar Catálogo</router-link>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  text-align: center;
  padding: 50px 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.content {
  line-height: 1.6;
  color: #444;
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  font-weight: bold;
  color: #42b983;
}

.mission {
  font-style: italic;
  margin: 20px 0;
}

.btn-back {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 25px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
}

.btn-back:hover {
  background-color: #3aa876;
}
</style>