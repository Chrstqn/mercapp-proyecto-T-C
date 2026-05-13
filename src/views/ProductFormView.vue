<template>
  <div class="form-page">
    <header class="form-header">
      <h1>{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h1>
      <button @click="$router.back()" class="btn-secondary">Cancelar</button>
    </header>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-group">
          <label>Nombre del Producto *</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Ej. Lámpara 3D" 
            required
          >
        </div>

        <div class="form-group">
          <label>Categoría *</label>
          <select v-model="form.categoryId" required>
            <option value="">Seleccione una categoría</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Precio ($) *</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              step="0.01" 
              min="0.01" 
              required
            >
          </div>

          <div class="form-group">
            <label>Stock inicial *</label>
            <input 
              v-model.number="form.stock" 
              type="number" 
              min="0" 
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label>URL de la Imagen *</label>
          <input 
            v-model="form.imageUrl" 
            type="url" 
            placeholder="https://ejemplo.com/foto.jpg" 
            required
          >
        </div>

        <div class="form-group">
          <label>Descripción</label>
          <textarea 
            v-model="form.description" 
            rows="4" 
            placeholder="Detalles del producto..."
          ></textarea>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" class="btn-submit" :disabled="submitting">
          {{ submitting ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto') }}
        </button>
      </form>

      <div class="preview-card" v-if="form.imageUrl">
        <p>Vista previa:</p>
        <img :src="form.imageUrl" alt="Vista previa">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

const route = useRoute()
const router = useRouter()
const { data: categories, fetchApi: fetchCategories } = useApi()

// Estado local del formulario
const form = ref({
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  categoryId: '',
  stock: 0
})

const submitting = ref(false)
const error = ref(null)

// Determinar si estamos editando según la URL
const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
  // Cargar categorías para el select
  await fetchCategories('http://localhost:3000/categories')

  // Si es edición, cargar los datos actuales del producto
  if (isEditing.value) {
    try {
      const res = await fetch(`http://localhost:3000/products/${route.params.id}`)
      if (res.ok) {
        const data = await res.json()
        form.value = { ...data }
      }
    } catch (err) {
      error.value = "Error al cargar los datos del producto."
    }
  }
})

const handleSubmit = async () => {
  submitting.value = true
  error.value = null

  const url = isEditing.value 
    ? `http://localhost:3000/products/${route.params.id}` 
    : 'http://localhost:3000/products'
  
  const method = isEditing.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Error al guardar el producto')

    alert(isEditing.value ? 'Producto actualizado' : 'Producto creado con éxito')
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-page { padding: 20px; max-width: 900px; margin: auto; }
.form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

.form-container {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .form-container { grid-template-columns: 1fr; }
}

.product-form { display: flex; flex-direction: column; gap: 15px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-weight: bold; color: #444; }

input, select, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.btn-submit {
  background: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:disabled { background: #ccc; }

.preview-card img { width: 100%; border-radius: 8px; margin-top: 10px; border: 1px solid #eee; }
.error-msg { color: #d9534f; background: #fee; padding: 10px; border-radius: 6px; }

.btn-secondary { background: none; border: 1px solid #999; padding: 8px 15px; border-radius: 6px; cursor: pointer; }
</style>