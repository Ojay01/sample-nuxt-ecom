<template>
  <div
    class="bg-white p-4 sm:p-6 shadow-lg rounded-xl border-2 transition duration-300 hover:border-orange-500
           lg:sticky lg:top-24"
  >
    <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight">Make a Payment</h2>
    <p class="text-xs sm:text-sm text-slate-500 mt-1">
      Choose your payment option and enter your mobile number.
    </p>

    <form class="mt-5 sm:mt-6 space-y-4" @submit.prevent="$emit('submit')">
      <div>
        <label class="text-xs sm:text-sm font-semibold mb-1 block">Payment Amount (FCFA)</label>
        <input
          type="number"
          :value="payment.amount"
          readonly
          class="w-full rounded-xl border-2 bg-slate-50 px-4 py-2.5 sm:py-3 font-semibold"
        />
      </div>

      <div>
        <label class="text-xs sm:text-sm font-semibold mb-1 block">Payment Option</label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="text-base"
            @click="$emit('setMethod', 'MTN')"
            :class="methodClass(payment.method === 'MTN')"
          >
            MTN MOMO
          </button>

          <button
            type="button"
            class="text-base"
            @click="$emit('setMethod', 'ORANGE')"
            :class="methodClass(payment.method === 'ORANGE')"
          >
            ORANGE MOMO
          </button>
        </div>
      </div>

      <div>
        <label class="text-xs sm:text-sm font-semibold mb-1 block">Mobile Number</label>
        <input
          type="tel"
          :value="payment.phone"
          @input="$emit('setPhone', $event.target.value)"
          placeholder="6XXXXXXXX"
          class="w-full rounded-xl border-2 px-4 py-2.5 sm:py-3 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-xl bg-orange-600 py-2.5 sm:py-3 font-semibold text-white hover:bg-orange-700 transition
               disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="disabled"
      >
        Make Payment
      </button>

      <p class="text-[11px] sm:text-xs text-slate-500 text-center">
        You’ll receive a prompt on your phone to confirm the payment.
      </p>
    </form>
  </div>
</template>

<script setup>
defineEmits(['submit', 'setMethod', 'setPhone'])

defineProps({
  payment: { type: Object, required: true },
  disabled: { type: Boolean, default: false },
  methodClass: { type: Function, required: true },
})
</script>
