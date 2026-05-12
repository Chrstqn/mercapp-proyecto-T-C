<template>
  <div class="home">
    <header>
      <input v-model="searchQuery" type="text" placeholder="Buscar productos láser/3D...">
      <select v-model="selectedCategory">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </header>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="product-grid">
      <ProductCard 
        v-for="prod in filteredProducts" 
        :key="prod.id" 
        :product="prod"
        @added-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import ProductCard from '@/components/ProductCard.vue'

const { data: products, loading, error, fetchApi: fetchProducts } = useApi()
const { data: categories, fetchApi: fetchCategories } = useApi()

const searchQuery = ref('')
const selectedCategory = ref('')

onMounted(async () => {
  await fetchProducts('http://localhost:3000/products')
  await fetchCategories('http://localhost:3000/categories')
})

const filteredProducts = computed(() => {
  if (!products.value) return []
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCat = selectedCategory.value ? p.categoryId == selectedCategory.value : true
    return matchesSearch && matchesCat
  })
})

const handleAddToCart = (product) => {
  console.log('Añadido:', product.name)
  // Lógica del carrito vendrá en el Día 3
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
header { display: flex; gap: 10px; padding: 20px; justify-content: center; }
.error { color: red; font-weight: bold; }
</style>