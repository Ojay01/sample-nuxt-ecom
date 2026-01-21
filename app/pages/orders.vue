<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Orders
        </h1>
        <p class="mt-2 text-sm sm:text-base text-slate-500">
          Track customer orders, payment status, and items.
        </p>
        <div class="mx-auto mt-4 h-1.5 w-16 bg-gradient-to-r from-slate-950 to-orange-500 rounded-full"></div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="order in ordersWithDetails"
          :key="order.order_id"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition
                 hover:shadow-xl hover:border-orange-200"
        >
          <div class="h-1 w-full bg-gradient-to-r from-orange-500 to-slate-950 opacity-70"></div>

          <div class="p-5 sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="truncate text-lg font-semibold text-slate-900">
                    {{ order.user.name }}
                  </h3>
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                    :class="statusPillClass(order.info.status)"
                  >
                    {{ order.info.status }}
                  </span>
                </div>

                <p class="mt-1 truncate text-sm text-slate-500">
                  {{ order.user.email }}
                </p>

                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                    {{ formatDate(order.info.order_date) }}
                  </span>

                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    <span class="text-slate-500">Payment</span>
                    <span
                      class="font-semibold"
                      :class="order.info.payment_status === 'full' ? 'text-emerald-700' : 'text-orange-700'"
                    >
                      {{ order.info.payment_status }}
                    </span>
                  </span>

                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    <span class="text-slate-500">Type</span>
                    <span class="font-semibold text-slate-900">
                      {{ order.info.type || '—' }}
                    </span>
                  </span>
                </div>

                <div
                  v-if="order.info.payment_status === 'partial'"
                  class="mt-3 rounded-xl border border-orange-100 bg-orange-50/70 px-4 py-3 text-sm"
                >
                  <div class="flex flex-wrap gap-3">
                    <p class="text-slate-700">
                      Paid:
                      <span class="font-semibold text-slate-900">{{ order.info.amount_paid }} FCFA</span>
                    </p>
                    <p class="text-slate-700">
                      Due:
                      <span class="font-semibold text-orange-800">{{ order.info.amount_due }} FCFA</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="shrink-0 text-right">
                <p class="text-xs font-medium text-slate-500">Total</p>
                <p class="mt-1 text-xl font-extrabold text-slate-950">
                  {{ order.info.total_price }} <span class="text-sm font-semibold text-slate-500">FCFA</span>
                </p>

                <p class="mt-2 text-xs text-slate-500">
                  Order #
                  <span class="font-semibold text-slate-900">{{ order.order_id }}</span>
                </p>
              </div>
            </div>

            <div class="my-5 h-px w-full bg-slate-100"></div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold text-slate-900">Shipping</p>
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                    :class="shippingPillClass(order.shipping.status)"
                  >
                    {{ order.shipping.status }}
                  </span>
                </div>


                <div class="mt-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <p class="mt-1 text-sm font-semibold text-slate-900 truncate">
                    <span class="font-semibold text-slate-900">{{ order.shipping.address.phone }}</span>
                  </p>
                  <p class="mt-1 text-sm text-slate-700">
                    {{ order.shipping.address.street }}
                  </p>
                  <p class="text-sm text-slate-700">
                    {{ order.shipping.address.quarter }}, {{ order.shipping.address.city }}
                    <span class="font-normal text-slate-500">•</span>
                    {{ order.shipping.address.region }}
                  </p>
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <button
                  @click="toggleProducts(order.order_id)"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800
                         shadow-sm transition hover:border-orange-200 hover:text-orange-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <span>
                    {{ openOrders.includes(order.order_id) ? 'Hide products' : 'Show products' }}
                  </span>
                  <span
                    class="inline-flex h-6 min-w-[2.25rem] items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold text-slate-700"
                  >
                    {{ order.products.length }}
                  </span>
                  <svg
                    class="ml-1 h-4 w-4 transition"
                    :class="openOrders.includes(order.order_id) ? 'rotate-180 text-orange-600' : 'text-slate-400'"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>

                <div
                  v-if="openOrders.includes(order.order_id)"
                  class="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4"
                >
                  <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
                    <div
                      v-for="prod in order.products"
                      :key="prod.id"
                      class="flex items-start justify-between gap-4 rounded-xl bg-white p-3 ring-1 ring-slate-200 transition hover:ring-orange-200"
                    >
                      <div class="min-w-0">
                        <NuxtLink
                          :to="`/products/${prod.id}`"
                          class="block truncate text-sm font-semibold text-slate-900 hover:text-orange-700"
                        >
                          {{ prod.title }}
                        </NuxtLink>

                        <div class="mt-1 flex flex-wrap items-center gap-2">
                          <span class="text-xs text-slate-500">
                            Qty:
                            <span class="font-semibold text-slate-800">{{ prod.quantity }}</span>
                          </span>

                          <span class="h-1 w-1 rounded-full bg-slate-300"></span>

                          <span class="text-xs text-slate-500">
                            Unit:
                            <span class="font-semibold text-slate-800">{{ prod.price }} FCFA</span>
                          </span>
                        </div>
                      </div>

                      <div class="shrink-0 text-right">
                        <p class="text-sm font-extrabold text-slate-950">
                          {{ (prod.price * prod.quantity).toFixed(2) }} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const orders = [
  { order_id: 1, products: [ { product_id: 1, quantity: 2, price: 50.0 }, { product_id: 2, quantity: 3, price: 50.0 } ] },
  { order_id: 2, products: [ { product_id: 3, quantity: 1, price: 60.0 }, { product_id: 4, quantity: 2, price: 30.0 } ] },
  { order_id: 3, products: [ { product_id: 5, quantity: 5, price: 15.0 } ] },
]

const orderInfo = [
  { id: 1, total_price: 39.98, user_id: 10, order_date: "2026-01-21", type: "paid", status: "shipped", payment_status: "full", amount_paid: 39.98, amount_due: 0.0 },
  { id: 2, total_price: 15.99, user_id: 9, type: "pay_on_delivery", order_date: "2026-01-21", status: "processing", payment_status: "partial", amount_paid: 0.0, amount_due: 15.99 },
  { id: 3, total_price: 79.96, user_id: 6, type: "pay_on_delivery", order_date: "2026-01-21", status: "delivered", payment_status: "partial", amount_paid: 0.0, amount_due: 79.96 },
]

const users = [
  { id: 6, name: "Jane Smith", email: "email@eg12.com" },
  { id: 9, name: "Jane Smith", email: "email@eg124.com" },
  { id: 10, name: "Jane Smith", email: "email@eg102.com" },
]

const products = [
  { id: 1, title: "Fjallraven Backpack", price: 109.95 },
  { id: 2, title: "Mens Casual T-Shirt", price: 22.3 },
  { id: 3, title: "Mens Cotton Jacket", price: 55.99 },
  { id: 4, title: "Mens Casual Slim Fit", price: 15.99 },
  { id: 5, title: "Mens Casual Slim Fit", price: 15.99 },
]

const shippingByOrderId = [
  {
    order_id: 1,
    status: 'in_transit',
    address: {
      full_name: 'Jane Smith',
      phone: '+237 673909858',
      street: 'Avenue Charles Atangana, Immeuble 2, 2nd Floor',
      quarter: 'Bastos',
      city: 'Yaoundé',
      region: 'Centre',
      country: 'Cameroon',
      postal_code: ''
    }
  },
  {
    order_id: 2,
    status: 'pending_pickup',
    address: {
      full_name: 'Jane Smith',
       phone: '+237 673909858',
      street: 'Rue Joffre, Near Poste Centrale',
      quarter: 'Akwa',
      city: 'Douala',
      region: 'Littoral',
      country: 'Cameroon',
    }
  },
  {
    order_id: 3,
    status: 'delivered',
    address: {
      full_name: 'Jane Smith',
      phone: '+237 673909858',
      street: 'Carrefour TKC, Building B, Door 4',
      quarter: 'Biyem-Assi',
      city: 'Yaoundé',
      region: 'Centre',
      country: 'Cameroon',
    }
  }
]

const ordersWithDetails = computed(() =>
  orders.map(o => {
    const info = orderInfo.find(i => i.id === o.order_id) || {}
    const user = users.find(u => u.id === info.user_id) || { name: "Unknown", email: "-" }
    const detailedProducts = o.products.map(p => {
      const prod = products.find(pr => pr.id === p.product_id) || {}
      return { ...prod, quantity: p.quantity, price: p.price }
    })
    const shipping = shippingByOrderId.find(s => s.order_id === o.order_id) || {
      status: '—',
      carrier: '',
      tracking: '',
      fee: 0,
      eta: '',
      address: {
        full_name: user.name || '—',
        phone: '—',
        street: '—',
        quarter: '—',
        city: '—',
        region: '—',
        country: 'Cameroon',
        postal_code: ''
      }
    }
    return { order_id: o.order_id, info, user, products: detailedProducts, shipping }
  })
)

const openOrders = ref([])

const toggleProducts = (orderId) => {
  if (openOrders.value.includes(orderId)) {
    openOrders.value = openOrders.value.filter(id => id !== orderId)
  } else {
    openOrders.value.push(orderId)
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return dateStr
}

const statusPillClass = (status = '') => {
  const s = String(status).toLowerCase()
  if (s === 'delivered') return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (s === 'shipped') return 'bg-slate-900 text-white ring-slate-900'
  if (s === 'processing') return 'bg-orange-50 text-orange-700 ring-orange-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

const shippingPillClass = (status = '') => {
  const s = String(status).toLowerCase()
  if (s === 'delivered') return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (s === 'in_transit') return 'bg-slate-900 text-white ring-slate-900'
  if (s === 'pending_pickup') return 'bg-orange-50 text-orange-700 ring-orange-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}
</script>

<style scoped>
.max-h-72::-webkit-scrollbar {
  width: 8px;
}
.max-h-72::-webkit-scrollbar-thumb {
  background: rgba(15, 23, 42, 0.15);
  border-radius: 999px;
}
.max-h-72::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 115, 22, 0.35);
}
</style>
