import { ref, computed, watch } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('mercapp_cart')) || [])

export function useCart() {
  const addToCart = (product) => {
    const index = cart.value.findIndex(item => item.id === product.id)
    if (index !== -1) {
      cart.value[index].quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const total = computed(() => {
    return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  })

  watch(cart, (newCart) => {
    localStorage.setItem('mercapp_cart', JSON.stringify(newCart))
  }, { deep: true })

  return { cart, addToCart, removeFromCart, total }
}