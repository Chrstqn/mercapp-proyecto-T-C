<template>
  <div class="home">
    <header class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar por nombre o descripción..."
        class="input-text"
      >
      
      <select v-model="selectedCategory" class="input-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </header>

    <div v-if="loading" class="status">Cargando catálogo de productos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>


    <div v-else class="product-grid">
      <ProductCard 
        v-for="prod in filteredProducts" 
        :key="prod.id" 
        :product="prod"
        @added-to-cart="handleAddToCart"
      />
      <div v-if="filteredProducts.length === 0" class="status">
        No se encontraron productos que coincidan con la búsqueda.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useCart } from '@/composables/useCart' // Importación necesaria
import ProductCard from '@/components/ProductCard.vue'

// Tarea 8: Instancias separadas para evitar colisión de estados
const { data: products, loading, error, fetchApi: fetchProducts } = useApi()
const { data: categories, fetchApi: fetchCategories } = useApi()

// Tarea 11: Lógica del carrito
const { addToCart } = useCart()

const searchQuery = ref('')
const selectedCategory = ref('')

onMounted(async () => {
  // Carga paralela de datos
  await Promise.all([
    fetchProducts('http://localhost:3000/products'),
    fetchCategories('http://localhost:3000/categories')
  ])
})

// Tarea 6: Propiedad computada para búsqueda y filtrado
const filteredProducts = computed(() => {
  if (!products.value) return []
  
  return products.value.filter(p => {
    // Búsqueda por nombre o descripción (Requisito Tarea 6)
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    
    // Filtro por categoría (usando comparación flexible ==)
    const matchesCat = selectedCategory.value 
      ? p.categoryId == selectedCategory.value 
      : true
      
    return matchesSearch && matchesCat
  })
})

// Manejo del evento personalizado (Tarea 7)
const handleAddToCart = (product) => {
  addToCart(product)
  // Opcional: Podrías añadir una notificación de "Producto añadido" aquí
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.input-text {
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.input-select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.status {
  text-align: center;
  grid-column: 1 / -1;
  color: #666;
  margin-top: 20px;
}

.error {
  color: #d9534f;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  background: #fdf7f7;
  border-radius: 8px;
}
</style>