<template>
  <div class="border-t pt-4 space-y-3">
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
      <div class="flex items-center justify-between gap-3">
        <span class="text-slate-500">Order cost</span>
        <span class="font-semibold text-slate-900 text-sm whitespace-nowrap">
          {{ fmt(order.subtotal) }} FCFA
        </span>
      </div>

      <div class="flex items-center justify-between gap-3">
        <span class="text-slate-500">Shipping fee</span>
        <span class="font-semibold text-slate-900 text-sm whitespace-nowrap">
          {{ fmt(order.shippingFee) }} FCFA
        </span>
      </div>

      <div v-if="couponDisplayAmount > 0" class="flex items-center justify-between gap-3">
        <span class="text-slate-500">
          Coupon <span class="text-slate-400">({{ order.coupon?.code }})</span>
        </span>
        <span class="font-semibold text-green-700 text-sm whitespace-nowrap">
          - {{ fmt(couponDisplayAmount) }} FCFA
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs sm:text-sm border-t pt-3 mt-2">
      <span class="text-slate-700 font-semibold">Total payable</span>
      <span class="font-bold text-sm text-slate-900">{{ fmt(totalPayable) }} FCFA</span>
    </div>

    <div class="flex items-center justify-between text-xs sm:text-sm">
      <span class="text-slate-500 ">Amount paid</span>
      <span class="font-semibold text-sm text-green-600">{{ fmt(order.paid) }} FCFA</span>
    </div>

    <div class="flex items-center justify-between border-t pt-3 mt-2">
      <span class="text-sm sm:text-base font-semibold text-slate-700">Amount remaining</span>
      <span class="text-lg sm:text-xl font-extrabold text-red-600">
        {{ fmt(remaining) }} FCFA
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: { type: Object, required: true },
  couponDisplayAmount: { type: Number, required: true },
  totalPayable: { type: Number, required: true },
  remaining: { type: Number, required: true },
  fmt: { type: Function, required: true },
})
</script>
