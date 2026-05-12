<template>
  <div class="card">
    <img :src="product.imageUrl" :alt="product.name">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p class="price">${{ product.price }}</p>
    <button @click="$emit('added-to-cart', product)">Añadir al carrito</button>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['added-to-cart'])
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
}
.card:hover { transform: scale(1.02); }
img { max-width: 100%; height: 150px; object-fit: cover; }
.price { font-weight: bold; color: #2c3e50; }
</style>