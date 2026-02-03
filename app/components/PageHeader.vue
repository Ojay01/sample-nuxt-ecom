<template>
  <div>
    <h1
      class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mt-8 sm:mt-10 lg:mt-12 tracking-tight"
    >
      {{ title }}
    </h1>
    <div
      class="mx-auto mt-3 sm:mt-4 h-1.5 w-14 sm:w-16 bg-gradient-to-l from-orange-500 to-slate-950 rounded"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Pay Your Order' },
})
</script>
