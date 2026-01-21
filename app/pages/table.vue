<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Orders
        </h1>
        <p class="mt-2 text-sm sm:text-base text-slate-500">
          Track customer orders, payment status, and items.
        </p>
        <div class="mx-auto mt-4 h-1.5 w-16 bg-gradient-to-r from-slate-950 to-orange-500 rounded-full"></div>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-100">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Order #</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Customer</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Payment</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Total</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-700">Shipping (CM)</th>
              <th class="px-4 py-3 text-right font-semibold text-slate-700">Products</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <template v-for="order in ordersWithDetails" :key="order.order_id">
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-3 font-semibold text-slate-900">#{{ order.order_id }}</td>

<td class="px-4 py-3">
  <div class="font-semibold text-slate-900">
    {{ order.user.name }}
  </div>
  <div class="text-sm text-slate-500">
    {{ order.user.email }}
  </div>
</td>

                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                    :class="statusPillClass(order.info.status)"
                  >
                    {{ order.info.status }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <span
                    class="font-semibold"
                    :class="order.info.payment_status === 'full' ? 'text-emerald-700' : 'text-orange-700'"
                  >
                    {{ order.info.payment_status }}
                  </span>

                  <div
                    v-if="order.info.payment_status === 'partial'"
                    class="mt-1 text-xs text-slate-500"
                  >
                    Paid {{ order.info.amount_paid }} · Due {{ order.info.amount_due }}
                  </div>
                </td>

                <td class="px-4 py-3 text-slate-700 font-semibold">
                  {{ order.info.type || '—' }}
                </td>

                <td class="px-4 py-3 font-extrabold text-slate-950">
                  {{ order.info.total_price }} <span class="text-xs font-semibold text-slate-500">FCFA</span>
                </td>

                <td class="px-4 py-3">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-semibold text-slate-900"> Address</span>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset"
                      :class="shippingPillClass(order.shipping.status)"
                    >
                      {{ order.shipping.status }}
                    </span>
                  </div>

                  <div class="mt-1 text-xs text-slate-700 font-semibold">
                    {{ order.shipping.address.phone }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    {{ order.shipping.address.street }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    {{ order.shipping.address.quarter }}, {{ order.shipping.address.city }} • {{ order.shipping.address.region }}
                  </div>
                </td>

                <td class="px-4 py-3 text-right">
                  <button
                    @click="toggleProducts(order.order_id)"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800
                           shadow-sm transition hover:border-orange-200 hover:text-orange-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <span>{{ openOrders.includes(order.order_id) ? 'Hide' : 'View' }}</span>
                    <span class="inline-flex h-6 min-w-[2.25rem] items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold text-slate-700">
                      {{ order.products.length }}
                    </span>
                    <svg
                      class="h-4 w-4 transition"
                      :class="openOrders.includes(order.order_id) ? 'rotate-180 text-orange-600' : 'text-slate-400'"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr v-if="openOrders.includes(order.order_id)">
                <td colspan="9" class="bg-slate-50 px-6 py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            Qty: <span class="font-semibold text-slate-800">{{ prod.quantity }}</span>
                          </span>
                          <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                          <span class="text-xs text-slate-500">
                            Unit: <span class="font-semibold text-slate-800">{{ prod.price }} FCFA</span>
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
                </td>
              </tr>
            </template>
          </tbody>
        </table>
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
  { order_id: 4, products: [ { product_id: 2, quantity: 1, price: 50.0 }, { product_id: 4, quantity: 2, price: 30.0 } ] },
  { order_id: 5, products: [ { product_id: 1, quantity: 1, price: 50.0 }, { product_id: 3, quantity: 1, price: 60.0 } ] },
  { order_id: 6, products: [ { product_id: 5, quantity: 3, price: 15.0 }, { product_id: 2, quantity: 1, price: 50.0 } ] },
]

const orderInfo = [
  { id: 1, total_price: 39.98, user_id: 10, order_date: "2026-01-21", type: "paid", status: "shipped", payment_status: "full", amount_paid: 39.98, amount_due: 0.0 },
  { id: 2, total_price: 15.99, user_id: 9,  order_date: "2026-01-21", type: "pay_on_delivery", status: "processing", payment_status: "partial", amount_paid: 0.0, amount_due: 15.99 },
  { id: 3, total_price: 79.96, user_id: 6,  order_date: "2026-01-21", type: "pay_on_delivery", status: "delivered", payment_status: "partial", amount_paid: 0.0, amount_due: 79.96 },
  { id: 4, total_price: 55.50, user_id: 10, order_date: "2026-01-21", type: "paid", status: "processing", payment_status: "partial", amount_paid: 20.0, amount_due: 35.50 },
  { id: 5, total_price: 110.00, user_id: 9, order_date: "2026-01-21", type: "paid", status: "shipped", payment_status: "full", amount_paid: 110.0, amount_due: 0.0 },
  { id: 6, total_price: 95.00, user_id: 6,  order_date: "2026-01-21", type: "pay_on_delivery", status: "processing", payment_status: "partial", amount_paid: 0.0, amount_due: 95.0 },
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
      postal_code: ''
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
      postal_code: ''
    }
  },
  {
    order_id: 4,
    status: 'in_transit',
    address: {
      full_name: 'Jane Smith',
      phone: '+237 673909858',
      street: 'Carrefour Market, Opposite Total Station',
      quarter: 'Bonamoussadi',
      city: 'Douala',
      region: 'Littoral',
      country: 'Cameroon',
      postal_code: ''
    }
  },
  {
    order_id: 5,
    status: 'pending_pickup',
    address: {
      full_name: 'Jane Smith',
      phone: '+237 673909858',
      street: 'Montée Jouvence, Near Carrefour',
      quarter: 'Jouvence',
      city: 'Yaoundé',
      region: 'Centre',
      country: 'Cameroon',
      postal_code: ''
    }
  },
  {
    order_id: 6,
    status: 'processing',
    address: {
      full_name: 'Jane Smith',
      phone: '+237 673909858',
      street: 'Entrée Bepanda, Bloc A, Door 2',
      quarter: 'Bepanda',
      city: 'Douala',
      region: 'Littoral',
      country: 'Cameroon',
      postal_code: ''
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
  if (s === 'processing') return 'bg-slate-100 text-slate-700 ring-slate-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}
</script>

<style scoped>
</style>
