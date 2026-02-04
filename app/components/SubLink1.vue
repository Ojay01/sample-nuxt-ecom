<template>
  <NuxtLink
    :to="to"
    class="
      group relative flex items-center
      rounded-lg
      py-3
      text-[15px] font-medium
      transition-colors duration-200
      text-white/65
      hover:text-white
      hover:bg-white/5
    "
    :class="[
      collapsed ? 'px-3 justify-center' : 'px-4',
      isActive ? 'bg-white/8 text-white' : '',
    ]"
    :title="collapsed ? label : undefined"
  >
    <span
      class="
        absolute left-0 top-2 bottom-2 w-[3px]
        rounded-r-full
        bg-gray-200
        transition-opacity duration-200
      "
      :class="isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'"
    />

    <span v-if="!collapsed" class="pl-4 truncate">{{ label }}</span>

    <span
      v-if="collapsed"
      class="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2
             whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1.5 text-xs text-white
             opacity-0 translate-x-[-4px] transition duration-150
             group-hover:opacity-100 group-hover:translate-x-0"
    >
      {{ label }}
    </span>
  </NuxtLink>
</template>

<script setup>

const props = defineProps({
  label: { type: String, required: true },
  to: { type: String, required: true },
  collapsed: { type: Boolean, default: false },
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
