<template>
  <div class="space-y-3 max-h-56 overflow-y-auto pr-1">
    <NuxtLink
      v-for="(item, i) in items"
      :key="i"
      :to="item.link ?? `/products/${item.slug ?? item.id ?? i}`"
      class="block"
    >
      <div
        class="flex items-start gap-3 sm:items-center sm:gap-4 p-3 border rounded-xl
               hover:border-orange-500  hover:shadow-sm
               transition cursor-pointer"
      >
        <NuxtImg
          :src="item.image"
          :alt="item.name"
          width="64"
          height="64"
          format="webp"
          loading="lazy"
          class="h-14 w-14 sm:h-16 sm:w-16 object-contain bg-white
                 rounded-lg border flex-none"
        />

        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm sm:text-base leading-5 truncate text-slate-900">
            {{ item.name }}
          </p>

          <div class="mt-1 hidden sm:flex text-xs sm:text-sm text-slate-500 flex-wrap gap-x-2 gap-y-1">
            <span class="min-w-0">
              SKU:
              <span class="font-semibold text-slate-700 truncate inline-block max-w-[220px] align-bottom">
                {{ item.sku }}
              </span>
            </span>

            <span class="hidden sm:inline">•</span>

            <span>
              Qty:
              <span class="font-semibold text-slate-700">{{ item.qty }}</span>
            </span>

            <span class="hidden sm:inline">•</span>

            <span>
              Unit:
              <span class="font-semibold text-slate-700">{{ fmt(item.unitPrice) }}</span>
              FCFA
            </span>
          </div>

          <div class="mt-1 sm:hidden text-xs text-slate-500 space-y-1">
            <div class="flex items-center gap-2 min-w-0">
              <span class="shrink-0">SKU:</span>
              <span class="font-semibold text-slate-700 truncate min-w-0">
                {{ item.sku }}
              </span>
            </div>

             <div class="text-slate-600 text-xs">
            <span class="text-slate-500">Qty × Unit:</span>
            <span class="ml-1 font-semibold text-slate-700">
                {{ item.qty }} × {{ fmt(item.unitPrice) }} FCFA
            </span>
            </div>


            <div class="text-sm font-semibold text-slate-900">
              Total: {{ fmt(item.unitPrice * item.qty) }} FCFA
            </div>
          </div>
        </div>

        <!-- Desktop total -->
        <div class="hidden sm:block text-right font-semibold text-slate-900 whitespace-nowrap">
          {{ fmt(item.unitPrice * item.qty) }} FCFA
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  fmt: { type: Function, required: true },
})
</script>
