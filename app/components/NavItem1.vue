<template>
  <NuxtLink
    :to="to"
    class="group relative w-full flex items-center gap-3 h-12 rounded-md transition"
    :class="[
      collapsed ? 'px-3 justify-center' : 'px-4',
      isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white',
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

    <span class="shrink-0 w-6 h-6 grid place-items-center">
      <slot name="icon" />
    </span>

    <span v-if="!collapsed" class="text-sm font-medium leading-none truncate">
      {{ label }}
    </span>

    <span v-if="!collapsed && $slots.trailing" class="ml-auto flex items-center">
      <slot name="trailing" />
    </span>

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
  to: { type: [String, Object], default: "#" },
  exact: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
})

const route = useRoute()

const isActive = computed(() => {
  if (!props.to || props.to === "#") return false
  const path = typeof props.to === "string" ? props.to : props.to.path
  if (!path) return false
  return props.exact ? route.path === path : route.path.startsWith(path)
})
</script>
