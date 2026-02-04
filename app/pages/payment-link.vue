<template>
  <div class="mx-auto max-w-6xl p-4 font-sans">
    <PageHeader title="Pay Your Order" />

    <div class="grid lg:grid-cols-12 gap-6 py-10 sm:py-12 items-start">
      <div class="lg:col-span-7">
        <OrderSummaryCard
          :order="order"
          :coupon-display-amount="couponDisplayAmount"
          :total-payable="totalPayable"
          :remaining="remaining"
          :fmt="fmt"
          :pretty-status="prettyStatus"
          :status-pill-class="statusPillClass"
        />
      </div>

      <div class="lg:col-span-5">
        <PaymentCard
          :payment="payment"
          :method-class="methodClass"
          :disabled="remaining <= 0"
          @setMethod="payment.method = $event"
          @setPhone="payment.phone = $event"
          @submit="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>


const order = ref({
  id: '000123456',
  clientName: 'Ojong Kelly-Kingston',
  status: 'PARTIALLY_PAID',
  address: 'Bonapriso, Rue 123, Douala, Cameroon',
  subtotal: 4500000,
  shippingFee: 2500,
  paid: 15000,
  coupon: { code: 'NEW10', discountApplied: 5000 },
  items: [
    { sku: 'DR-001', name: 'Diamond Ring', qty: 1, unitPrice: 15000, image: '/img2.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
    { sku: 'MCJ-204', name: 'Men Cotton Jacket', qty: 2, unitPrice: 15000, image: '/img.png' },
  ],
})

const couponDisplayAmount = computed(() => {
  return order.value.coupon?.discountApplied ?? order.value.coupon?.value ?? 0
})

const totalPayable = computed(() => {
  return Math.max(0, order.value.subtotal + order.value.shippingFee - couponDisplayAmount.value)
})

const remaining = computed(() => totalPayable.value - order.value.paid)

const payment = ref({
  amount: 5000,
  method: 'MTN',
  phone: '',
})

function fmt(v) {
  return new Intl.NumberFormat('fr-FR').format(v)
}

function prettyStatus(s) {
  return String(s || '').replaceAll('_', ' ')
}

function methodClass(active) {
  return [
    'rounded-xl border-2 px-4 py-2.5 sm:py-3 font-semibold transition',
    active
      ? 'border-orange-500 bg-orange-50 text-orange-700'
      : 'border-slate-200 hover:border-orange-500',
  ].join(' ')
}

function statusPillClass(status) {
  const base = 'border-slate-200 text-slate-700 bg-slate-50'
  if (!status) return base
  const s = String(status).toUpperCase()

  if (s === 'PAID' || s === 'DELIVERED') return 'border-green-200 bg-green-50 text-green-700'
  if (s === 'PARTIALLY_PAID') return 'border-amber-200 bg-amber-50 text-amber-700'
  if (s === 'SHIPPED') return 'border-blue-200 bg-blue-50 text-blue-700'
  if (s === 'CANCELED') return 'border-red-200 bg-red-50 text-red-700'
  return base
}

function submit() {
  alert('Payment request sent')
}
</script>
