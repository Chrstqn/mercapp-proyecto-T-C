<template>
  <div v-if="product" class="detail-container">
    <button @click="$router.back()">⬅️ Volver</button>
    <div class="content">
      <img :src="product.imageUrl || 'https://via.placeholder.com/300'" :alt="product.name">
      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="category">Categoría ID: {{ product.categoryId }}</p>
        <p class="description">{{ product.description }}</p>
        <p class="price">Precio: {{ formatPrice(product.price) }}</p>
        <p class="stock">Disponibles: {{ product.stock }} unidades</p>
        <button 
          @click="addToCart(product)" 
          :disabled="product.stock <= 0"
        >
          {{ added ? '✅ ¡Añadido!' : (product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock') }}
        </button>
        <button @click="goToEdit">Editar Producto</button>
      </div>
    </div>
  </div>
  <div v-else-if="loading">Cargando detalles...</div>
  <div v-else>Producto no encontrado.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()
const { data: product, loading, fetchApi } = useApi()
const { addProduct } = useCart()

const added = ref(false)

onMounted(() => {
  fetchApi(`http://localhost:3000/products/${route.params.id}`)
})

const addToCart = (item) => {
  addProduct(item)
  added.value = true
  setTimeout(() => {
    added.value = false
  }, 2000)
  console.log("Añadido al carrito:", item.name)
}

const goToEdit = () => {
  router.push({ name: 'ProductEdit', params: { id: route.params.id } })
}

const formatPrice = (value) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
}
</script>

<style scoped>
.detail-container { padding: 20px; max-width: 800px; margin: auto; }
.content { display: flex; gap: 40px; margin-top: 20px; }
img { width: 300px; border-radius: 10px; }
.price { font-size: 1.5rem; font-weight: bold; color: #2c3e50; }
button { 
  margin-top: 10px; 
  margin-right: 10px; 
  padding: 10px 15px; 
  border: none; 
  background-color: #3498db; 
  color: white; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s ease;
}
button:hover:not(:disabled) { background-color: #2980b9; }
button:disabled { background-color: #95a5a6; cursor: not-allowed; }
button:nth-of-type(2) {
  background-color: #f39c12; /* Naranja para editar */
}
button:nth-of-type(2):hover {
  background-color: #e67e22;
}
</style>
