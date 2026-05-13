<template>
  <div class="cart-page">
    <header class="cart-header">
      <h1>Tu Carrito de Compras</h1>
      <button @click="$router.push('/')" class="btn-secondary">Volver al Catálogo</button>
    </header>

    <div v-if="cart.length === 0" class="status-container">
      <p class="status">Tu carrito está vacío actualmente.</p>
      <button @click="$router.push('/')" class="btn-primary">Ir a buscar productos</button>
    </div>

    <div v-else class="cart-container">
      <div class="cart-grid">
        <!-- Tarea 11: Listado de items con persistencia -->
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-img">
          
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="price">Precio unitario: ${{ item.price }}</p>
            <div class="quantity-controls">
              <span>Cantidad: <strong>{{ item.quantity }}</strong></span>
            </div>
            <p class="subtotal">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>

          <button @click="removeFromCart(item.id)" class="btn-remove" title="Eliminar producto">
            Eliminar
          </button>
        </div>
      </div>

      <!-- Resumen del Carrito -->
      <aside class="cart-summary">
        <h2>Resumen de Compra</h2>
        <div class="summary-details">
          <p>Total de productos: {{ cart.reduce((acc, item) => acc + item.quantity, 0) }}</p>
          <hr>
          <p class="total-amount">Total a pagar: <span>${{ total.toFixed(2) }}</span></p>
        </div>
        <button class="btn-checkout" @click="processCheckout">Finalizar Pedido</button>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart'
import { useRouter } from 'vue-router'

const { cart, removeFromCart, total } = useCart()
const router = useRouter()

const processCheckout = () => {
  alert('Funcionalidad de pago no implementada (Simulación)')
}
</script>

<style scoped>
.cart-page {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

@media (max-width: 850px) {
  .cart-container { grid-template-columns: 1fr; }
}

.cart-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
}

.item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex-grow: 1;
}

.item-info h3 { margin: 0 0 5px 0; color: #2c3e50; }

.subtotal {
  font-weight: bold;
  color: #42b983;
  margin-top: 5px;
}

.cart-summary {
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.total-amount {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 15px;
}

.total-amount span { color: #42b983; }

/* Botones con estilo coherente */
.btn-primary, .btn-checkout {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

.btn-secondary {
  background: transparent;
  border: 1px solid #42b983;
  color: #42b983;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-remove {
  background: #ffeded;
  color: #d9534f;
  border: 1px solid #ffcccc;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.status-container {
  text-align: center;
  margin-top: 50px;
}

.status {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}
</style>