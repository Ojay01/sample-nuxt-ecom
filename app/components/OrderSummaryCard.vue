<template>
  <div
    class="bg-white p-4 sm:p-6 shadow-xl border-2 rounded-xl transition duration-300 
           lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p class="text-xs sm:text-sm text-slate-500">Order ID</p>

        <div class="flex items-center gap-3 mt-1">
          <p class="text-lg sm:text-xl font-semibold text-slate-900">#{{ order.id }}</p>

          <span
            class="text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full border"
            :class="statusPillClass(order.status)"
          >
            {{ prettyStatus(order.status) }}
          </span>
        </div>
      </div>

      <div class="sm:text-right">
        <p class="text-xs sm:text-sm text-slate-500">Client</p>
        <p class="text-lg sm:text-xl font-semibold truncate sm:max-w-48 text-slate-900">
          {{ order.clientName }}
        </p>
      </div>
    </div>

    <div class="mt-5 p-3 sm:p-4 rounded-xl border bg-slate-50">
      <p class="text-xs sm:text-sm text-slate-500">Delivery Address</p>
      <p class="mt-1 text-sm sm:text-base font-semibold text-slate-900 leading-snug">
        {{ order.address }}
      </p>
    </div>

    <div class="mt-6">
      <h2 class="text-base sm:text-lg font-semibold mb-2">Order Items  ({{ order.items.length }})</h2>
      <OrderItemsList :items="order.items" :fmt="fmt" />
    </div>

    <AmountSummary
      class="mt-6"
      :order="order"
      :coupon-display-amount="couponDisplayAmount"
      :total-payable="totalPayable"
      :remaining="remaining"
      :fmt="fmt"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  order: { type: Object, required: true },
  couponDisplayAmount: { type: Number, required: true },
  totalPayable: { type: Number, required: true },
  remaining: { type: Number, required: true },
  fmt: { type: Function, required: true },
  prettyStatus: { type: Function, required: true },
  statusPillClass: { type: Function, required: true },
})
</script>
